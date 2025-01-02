import {
  InitialSystemMessageContent,
  QueryMessageIdentifier,
  TransientMessageIdentifier,
} from "@/chat/chat-constants";

import { QueryResponseMessageIdentifier } from "@/chat/chat-constants";

import { SystemMessageIdentifier } from "@/chat/chat-constants";
import {
  isTransientMessageContent,
  isUserMessageContent,
} from "@/chat/chat-type-helpers";
import {
  Message,
  QueryResponseMessage,
  QueryResponseMessageContent,
  SystemMessage,
  SystemMessageContent,
  TransientMessage,
  TransientMessageContent,
  UserMessage,
  UserMessageContent,
} from "@/chat/chat-types";
import OpenAI from "openai";

export const getSystemMessageIdentifier = () => SystemMessageIdentifier;
export const getTransientMessageIdentifier = () => TransientMessageIdentifier;
export const getQueryMessageIdentifier = () => QueryMessageIdentifier;
export const getQueryResponseMessageIdentifier = () =>
  QueryResponseMessageIdentifier;

export const getInitialSystemMessageContent = () => InitialSystemMessageContent;

export const inSystemMessageContent = (content: string): SystemMessageContent =>
  `${getSystemMessageIdentifier()} ${content}` as SystemMessageContent;

const asSystemMessage = (content: string): SystemMessage => ({
  role: "user",
  content: inSystemMessageContent(content),
});

export const withSystemMessage = () =>
  asSystemMessage(InitialSystemMessageContent);

export const inTransientMessageContent = (
  content: string
): TransientMessageContent =>
  `${getTransientMessageIdentifier()} ${content}` as TransientMessageContent;

export const isSystemMessageContent = (
  content: string
): content is SystemMessageContent =>
  content.trim().startsWith(SystemMessageIdentifier);

export const withResidentMessages = (messages: Message[]) =>
  messages.filter(
    (m) =>
      !isTransientMessageContent(m.content) &&
      !isSystemMessageContent(m.content)
  );

export const asTransientMessage = (content: string): TransientMessage => ({
  role: "user",
  content: inTransientMessageContent(content),
});

export const asTransientMessages = (messages: string[]) =>
  messages.map(asTransientMessage);

export const asQueryResponseMessageContent = (
  dataQueryResponse: object | object[]
): QueryResponseMessage => ({
  role: "user",
  content: `Luna, here is the response to your query: [##R##] ${JSON.stringify(
    dataQueryResponse
  )} [/##R##].` as QueryResponseMessageContent,
});

// export const asQueryResponseMessage = (
//   prefix: string,
//   content: string,
//   originalRequest: string
// ): QueryResponseMessage => ({
//   role: "user",
//   content: asQueryResponseMessageContent(prefix, content, originalRequest),
// });

export const asUserMessage = (content: string): UserMessage => {
  if (!isUserMessageContent(content)) {
    throw new Error("Invalid user message content");
  }

  return {
    role: "user" as const,
    content: content as UserMessageContent,
  };
};

export const asAssistantMessage = (content: string) => ({
  role: "assistant" as const,
  content,
});

export const sendRequest = async (
  dependencies: {
    openai: OpenAI;
  },
  args: {
    messages: Message[];
  }
) => {
  const response = await dependencies.openai.chat.completions.create({
    model: "o1-mini",
    store: true,
    messages: args.messages,
  });

  const responseMessage = response.choices[0].message;

  if (!responseMessage.content) {
    throw new Error("Failed to get a response message");
  }

  return asAssistantMessage(responseMessage.content);
};
