import { asUserMessage } from "@/chat/chat-helpers";
import { handleChatRequest } from "@/chat/chat-processor";

describe("Chat", () => {
  describe("handleChatRequest", () => {
    const subject = handleChatRequest;

    it(
      "should handle a chat request",
      async () => {
        //  const expected = {};

        const actual = await subject({
          messages: [
            asUserMessage(
              "Give me a list of all transactions for the first week of November 2024, complete with category names. Please clean up the transaction descriptions. Then summarize the total amount spent per category. Also generate me a dolphin chart of the total amount spent per category."
            ),
          ],
        });

        // console.log("==> actual", actual);

        expect(actual).toBeTruthy();
      },
      60 * 10 * 1000
    );
  });
});
