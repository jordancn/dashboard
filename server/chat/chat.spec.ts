import { handleChatRequest } from "@/chat/chat-processor";

describe("Chat", () => {
  describe("handleChatRequest", () => {
    const subject = handleChatRequest;

    it(
      "should handle a chat request",
      async () => {
        // const expected = {
        //   message: "Hi",
        //   date: new Date(),
        // };

        const { response, messages } = await subject({
          messages: [],
          chatRequest: {
            message: "Give me a list of all transactions yesterday.",
          },
        });

        // console.log("==> messages", messages);

        expect(response.message.content).toBeTruthy();
      },
      60 * 10 * 1000
    );
  });
});
