import { asUserMessage } from "@/chat/chat-helpers";
import { handleChatRequest } from "@/chat/chat-processor";
import { isChatRequest } from "@/chat/chat-type-helpers";
import { Message } from "@/chat/chat-types";
import { Context } from "@/context";
import { ApolloServer } from "@apollo/server";
import { Server } from "socket.io";

const ChannelName = "chat";

export const attachChatChannel = async (args: {
  apolloServer: ApolloServer<Context>;
  ioServer: Server;
}) => {
  const statefulMessages: Message[] = [];

  args.ioServer.on("connection", async (socket) => {
    socket.on(ChannelName, async (chatRequest) => {
      if (!isChatRequest(chatRequest)) {
        throw new Error("Invalid chat request");
      }

      statefulMessages.push(asUserMessage(chatRequest.message));

      const response = await handleChatRequest({
        messages: statefulMessages,
      });

      const newMessages = response.slice(statefulMessages.length - 1);

      statefulMessages.push(...newMessages);

      socket.emit(ChannelName, {
        message: newMessages[newMessages.length - 1].content,
        date: new Date(),
      });
    });
  });
};
