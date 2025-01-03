import { asUserMessage } from "@/chat/chat-helpers";
import { handleChatRequest } from "@/chat/chat-processor";
import OpenAI from "openai";

describe("Chat", () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  describe("handleChatRequest", () => {
    const subject = handleChatRequest;

    it(
      "should handle a chat request",
      async () => {
        //  const expected = {};

        const actual = await subject(
          {
            openai,
          },
          {
            messages: [
              asUserMessage(
                "Give me a list of all transactions last week, complete with category names. Please clean up the transaction descriptions. Then summarize the total amount spent per category."
              ),
            ],
          }
        );

        console.log("==> actual", actual);

        expect(actual).toBeTruthy();
      },
      60 * 10 * 1000
    );
  });
});
