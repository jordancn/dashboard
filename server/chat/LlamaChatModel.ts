import * as AgenticCore from "@agentic/core";
import _ from "lodash";
import ollama, * as Ollama from "ollama";
import * as OpenAIFetch from "openai-fetch";
import * as OpenAIFetchChatCompletions from "openai-fetch/openai-types/resources/chat/completions";
import * as OpenAIChatCompletions from "openai/resources/chat/completions";

const getMessages = (messages: AgenticCore.Msg[]): Ollama.Message[] => {
  const processedMessages = _.uniqBy(
    _.compact(
      messages.map((message) => {
        if (!message.content) {
          return undefined;
        }

        return {
          role: message.role,
          content: message.content,
        };
      })
    ),
    JSON.stringify
  );

  console.log("==> messages", JSON.stringify(processedMessages, null, 2));

  return processedMessages;
};

const getTools = (
  tools: OpenAIChatCompletions.ChatCompletionTool[] | undefined
): Ollama.Tool[] => {
  const processedTools = _.compact(
    tools?.map((tool): Ollama.Tool | undefined => {
      const getRequired = () => {
        if (!tool.function.parameters?.required) {
          return [];
        }

        if (!Array.isArray(tool.function.parameters.required)) {
          return [];
        }

        return _.compact(
          tool.function.parameters.required.map((key) => {
            if (typeof key !== "string") {
              return;
            }

            return key;
          })
        );
      };

      return {
        type: "function",
        function: {
          name: tool.function.name,
          description: tool.function.description ?? "",
          parameters: {
            type: "object",
            required: getRequired(),
            properties: Object.keys(
              tool.function.parameters?.properties ?? {}
            ).reduce((acc, key) => {
              acc[key] = {
                type: "string",
                description: "",
              };

              return acc;
            }, {} as Record<string, { type: string; description: string }>),
          },
        },
      };
    })
  );

  console.log("==> tools", JSON.stringify(processedTools, null, 2));

  return processedTools;
};

const getHasToolCalls = (response: Ollama.ChatResponse): boolean => {
  return (response.message.tool_calls ?? []).length > 0;
};

const getFinishReason = (response: Ollama.ChatResponse) => {
  return getHasToolCalls(response)
    ? ("tool_calls" as const)
    : ("stop" as const);
};

const getChatCompletion = (
  response: Ollama.ChatResponse
): OpenAIFetchChatCompletions.ChatCompletion => {
  return {
    id: _.uniqueId(),
    choices: [
      {
        finish_reason: getFinishReason(response),
        index: 0,
        logprobs: null,
        message: {
          content: response.message.content,
          role: "assistant",
          tool_calls: response.message.tool_calls?.map((toolCall, index) => ({
            id: index.toString(),
            type: "function",
            function: {
              name: toolCall.function.name,
              arguments: JSON.stringify(toolCall.function.arguments),
            },
          })),
          function_call: undefined,
        },
      },
    ],
    created: 0,
    model: response.model,
    object: "chat.completion",
  };
};

export const getOllamaClient = () => {
  const createChatCompletion: OpenAIFetch.OpenAIClient["createChatCompletion"] =
    async (params) => {
      const messages = getMessages(params.messages);
      const tools = getTools(params.tools);

      const response = await ollama.chat({
        model: params.model,
        messages,
        tools,
      });

      console.log("==> response", JSON.stringify(response, null, 2));

      const chatCompletion = getChatCompletion(response);

      return chatCompletion;
    };

  const streamChatCompletion: OpenAIFetch.OpenAIClient["streamChatCompletion"] =
    async (params) => {
      throw new Error("Not implemented");
    };

  return {
    createChatCompletion,
    streamChatCompletion,
  };
};
