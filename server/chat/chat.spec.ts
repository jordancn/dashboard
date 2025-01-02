import { handleChatRequest } from "@/chat/chat-processor";

describe("Chat", () => {
  describe("handleChatRequest", () => {
    const subject = handleChatRequest;

    it(
      "should handle a chat request",
      async () => {
        //  const expected = {};

        const actual = await subject({
          messages: [],
          chatRequest: {
            message:
              "Give me a list of all transactions last week, complete with category names. Please clean up the transaction descriptions. Then summarize the total amount spent per category.",
          },
        });

        console.log("==> actual", actual);

        expect(actual).toBeTruthy();
      },
      60 * 10 * 1000
    );
  });
});
