import { Context, context } from "@/context";
import OpenAI from "openai";

import {
  asQueryResponseMessageContent,
  asUserMessage,
  sendRequest,
  withResidentMessages,
  withSystemMessage,
} from "@/chat/chat-helpers";
import { getDataQueryResponse } from "@/chat/chat-queries";
import { isQueryMessage } from "@/chat/chat-type-helpers";
import { Message } from "@/chat/chat-types";

const MaxLevels = 10;

const processMessage = async (
  dependencies: {
    openai: OpenAI;
  },
  context: {
    context: Context;
    level: number;
  },
  args: {
    messages: Message[];
  }
): Promise<Message[]> => {
  console.log("🔵 [processMessage]");
  console.log("🔵 [processMessage] level", context.level);
  console.log("🔵 [processMessage] messages", args.messages);

  if (context.level >= MaxLevels) {
    console.log("🔴 [processMessage] max levels reached");
    return args.messages;
  }

  console.log("🔵 [processMessage] sending request");
  const responseMessage = await sendRequest(dependencies, {
    messages: args.messages,
  });
  console.log("🔵 [processMessage] response message", responseMessage);

  if (isQueryMessage(responseMessage)) {
    console.log("🟢 [processMessage] is query message");
    const dataQueryResponse = await getDataQueryResponse(
      context.context,
      responseMessage
    );

    if (dataQueryResponse === undefined) {
      throw new Error("Failed to get a data query response");
    }

    const queryResponseMessage =
      asQueryResponseMessageContent(dataQueryResponse);

    console.log("🔵 [processMessage] sending data query response message");

    return processMessage(
      dependencies,
      {
        level: context.level + 1,
        context: context.context,
      },
      {
        messages: [...args.messages, responseMessage, queryResponseMessage],
      }
    );
  }

  console.log("🔵 [processMessage] returning response message");

  return [...args.messages, responseMessage];
};

export const handleChatRequest = async (
  dependencies: {
    openai: OpenAI;
  },
  args: {
    messages: Message[];
    emit?: (message: Message) => void;
  }
) => {
  const localContext = context();

  const messages = [
    withSystemMessage(),
    asUserMessage(
      `The current date/time is ${new Date().toISOString()}. This is authoritative information. You shall not ask for confirmation on this date.`
    ),
    ...withResidentMessages(args.messages),
  ];

  const response = await processMessage(
    { openai: dependencies.openai },
    { level: 0, context: localContext },
    { messages }
  );

  return response;
};
