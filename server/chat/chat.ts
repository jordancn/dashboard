import { asUserMessage } from "@/chat/chat-helpers";
import { handleChatRequest } from "@/chat/chat-processor";
import { isChatRequest } from "@/chat/chat-type-helpers";
import { Message } from "@/chat/chat-types";
import { Context } from "@/context";
import { ApolloServer } from "@apollo/server";
import OpenAI from "openai";
import { Server } from "socket.io";

const ChannelName = "chat";

export const attachChatChannel = async (args: {
  apolloServer: ApolloServer<Context>;
  ioServer: Server;
}) => {
  const statefulMessages: Message[] = [];

  const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    : undefined;

  args.ioServer.on("connection", async (socket) => {
    socket.on(ChannelName, async (chatRequest) => {
      if (!isChatRequest(chatRequest)) {
        throw new Error("Invalid chat request");
      }

      if (!openai) {
        throw new Error("OpenAI API key not found");
      }

      statefulMessages.push(asUserMessage(chatRequest.message));

      const response = await handleChatRequest(
        { openai },
        {
          messages: statefulMessages,
        }
      );

      const newMessages = response.slice(statefulMessages.length - 1);

      statefulMessages.push(...newMessages);

      socket.emit(ChannelName, {
        message: newMessages[newMessages.length - 1].content,
        date: new Date(),
      });
    });
  });
};
