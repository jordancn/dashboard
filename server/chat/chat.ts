import fs from "fs";
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

export const attachChatChannel = async (ioServer: Server) => {
  const messages: Message[] = [];

  const schema = await getSchema();

  messages.push({
    role: "system",
    content:
      "You are a helpful assistant that can answer questions about the financial information described in this GraphQL schema: \n\n" +
      JSON.stringify(schema, null, 2) +
      "\n\nYou will only answer questions about the schema, and you will not answer any questions that are not related to the schema.",
  });

  ioServer.on("connection", async (socket) => {
    socket.on(ChannelName, async (data) => {
      const { message } = data;

      console.debug("[RECEIVED DATA]", message);

      messages.push({ role: "user", content: message });

      const response = await ollama.chat({
        model: "llama3.2",
        messages,
      });

      console.debug("[SENDING DATA]", response.message.content);

      messages.push({ role: "assistant", content: response.message.content });

      socket.emit(ChannelName, {
        message: response.message.content,
        date: new Date(),
      });
    });
  });
};
