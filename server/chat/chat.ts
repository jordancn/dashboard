import { handleChatRequest } from "@/chat/chat-processor";
import { Context } from "@/context";
import { ApolloServer } from "@apollo/server";
import fs from "fs";
import gql from "graphql-tag";
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
  const statefulMessages: Message[] = [];

  // const schema = await getSchema();

  statefulMessages.push({
    role: "system",
    content: getInitialSystemMessageContent(),
  });

  args.ioServer.on("connection", async (socket) => {
    socket.on(ChannelName, async (chatRequest) => {
      const { response, statefulMessages: newStatefulMessages } =
        await handleChatRequest({
          messages: statefulMessages,
          chatRequest,
        });

      statefulMessages.splice(0, statefulMessages.length);
      statefulMessages.push(...newStatefulMessages);

      socket.emit(ChannelName, {
        message: response.message.content,
        date: new Date(),
      });
    });
  });
};
