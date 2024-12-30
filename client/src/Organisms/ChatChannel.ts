import { useSocketChannel } from "@/Providers/SocketProvider";
import { assertIsDateTimeIso, DateTimeIso } from "@/Utils/date-time-iso";
import assert from "assert";

export type ChatRequest = {
  message: string;
};

export type ChatResponse = {
  message: string;
  date: DateTimeIso;
};

function assertIsChatResponse(data: unknown): asserts data is ChatResponse {
  assert(data, "data is required");
  assert(typeof data === "object", "data is not an object");
  assert("message" in data, "message is required");
  assert(typeof data.message === "string", "message is not a string");
  assert("date" in data, "date is required");
  assert(typeof data.date === "string", "date is not a string");
  assertIsDateTimeIso(data.date);
}

export const useChatChannel = () => {
  const channel = useSocketChannel<ChatRequest, typeof assertIsChatResponse>(
    "chat",
    assertIsChatResponse,
  );

  return channel;
};
