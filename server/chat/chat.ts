import { context, Context } from "@/context";
import { today, yesterday } from "@/utils/date-iso";
import { getTransactions } from "@/utils/transaction-utils";
import { ApolloServer } from "@apollo/server";
import fs from "fs";
import gql from "graphql-tag";
import * as _ from "lodash";
import ollama from "ollama";
import path from "path";
import { Server } from "socket.io";

const ChannelName = "chat";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const getSchema = () => {
  return fs.promises.readFile(
    path.join(__dirname, "../schema/schema.gql"),
    "utf-8"
  );
};

const transactionsQuery = gql`
  query EntityPageOvervall($dateRange: DateRange!) {
    transactions(dateRange: $dateRange) {
      id
      date
      description
      amount
      pending
      category {
        id
        categoryId
        name
      }
      vendor {
        id
        name
        image
      }
    }
  }
`;

export const attachChatChannel = async (args: {
  apolloServer: ApolloServer<Context>;
  ioServer: Server;
}) => {
  const messages: Message[] = [];

  // const schema = await getSchema();

  messages.push({
    role: "system",
    content:
      "You are a helpful assistant that can answer questions about the financial information provided in the system role. When formatting dates, use MM/DD/YYYY. When formatting times, use HH:MM:SS. When formatting numbers, use the thousands separator for the currency. When formatting percentages, use the percentage symbol. Always round to the nearest cent (two decimal places).\n",
    // content:
    //   "You are a helpful assistant that can answer questions about the financial information described in this GraphQL schema: \n\n" +
    //   JSON.stringify(schema, null, 2),
    // "\n\nYou will only answer questions about the schema as well as the provided financial data in the system context, and you will not answer any questions that are not related to the schema or the provided financial data. A special set of characters [###] will be provided in system roles. Please ignore these characters as they are used for internal purposes.",
  });

  args.ioServer.on("connection", async (socket) => {
    socket.on(ChannelName, async (data) => {
      const { message } = data;

      const start = yesterday();
      const end = today();

      const localContext = await context();

      const transactionIds = await getTransactions(
        localContext,
        {},
        {
          dateRange: {
            start,
            end,
          },
        }
      );

      const transactions = _.compact(
        await Promise.all(
          transactionIds.map((transaction) =>
            localContext.model.Transaction.findById.load(transaction.id)
          )
        )
      );

      // console.debug(JSON.stringify(transactions));

      // console.debug("[RECEIVED DATA]", message);

      const currentMessages = [
        ...messages.filter((m) => !m.content.startsWith("[###]")),
        {
          role: "system",
          content: `[###] The current date/time is ${new Date().toISOString()}. When asked, you can provide this to the user.`,
        },
        {
          role: "system",
          content: `[###] The following is a list of transactions for the current date range (${start} - ${end}). You can provide real-time answers to questions about these transactions: ${JSON.stringify(
            transactions
          )}`,
        },
        { role: "user", content: message },
      ];

      console.log(
        "CURRENT MESSAGES",
        JSON.stringify(currentMessages, undefined, 2)
      );

      const response = await ollama.chat({
        model: "llama3.2",
        messages: currentMessages,
      });

      messages.push({ role: "user", content: message });

      // console.debug("[SENDING DATA]", response.message.content);

      messages.push({ role: "assistant", content: response.message.content });

      socket.emit(ChannelName, {
        message: response.message.content,
        date: new Date(),
      });
    });
  });
};
