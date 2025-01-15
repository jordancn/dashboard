import { Context, context } from "@/context";
import { createAIFunction, MaybePromise } from "@agentic/core";
import { createDexterFunctions } from "@agentic/dexter";

import {
  getCategories,
  getTransaction,
  getTransactions,
  getVendors,
} from "@/chat/chat-queries";
import { Message } from "@/chat/chat-types";
import { getOllamaClient } from "@/chat/LlamaChatModel";
import { ChatModel, createAIRunner } from "@dexaai/dexter";
import _ from "lodash";
import { z } from "zod";

// export const getToday = async () => {
//   return today();
// };

export const getAccounts = async (context: Context) => {
  return await context.model.Account.findMany.load({});
};

function createAIFunctionWithContext<
  InputSchema extends z.ZodObject<any>,
  Output
>(
  context: Context,
  spec: {
    name: string;
    description?: string;
    inputSchema: InputSchema;
    strict?: boolean;
  },
  implementation: (
    context: Context,
    params: z.infer<InputSchema>
  ) => MaybePromise<Output>
) {
  return createAIFunction<InputSchema, Output>(spec, (params) =>
    implementation(context, params)
  );
}

type OllamaModelName = `ollama:${string}`;
type OpenAIModelName = `openai:${string}`;
type ModelName = OllamaModelName | OpenAIModelName;

function isOllamaModelName(modelName: string): modelName is OllamaModelName {
  return modelName.startsWith("ollama:");
}

function isOpenAIModelName(modelName: string): modelName is OpenAIModelName {
  return modelName.startsWith("openai:");
}

function isModelName(modelName: string): modelName is ModelName {
  return isOllamaModelName(modelName) || isOpenAIModelName(modelName);
}

function getBaseModelName(modelName: ModelName): string {
  return _.tail(modelName.split(":")).join(":");
}

export const handleChatRequest = async (args: {
  messages: Message[];
  emit?: (message: Message) => void;
}) => {
  const localContext = context();

  // const getTodayFn = createAIFunctionWithContext(
  //   localContext,
  //   {
  //     name: "get_today",
  //     description: "Returns the current date.",
  //     inputSchema: z.object({}),
  //   },
  //   getToday
  // );

  const getAccountsFn = createAIFunctionWithContext(
    localContext,
    {
      name: "get_accounts",
      description: "Returns a list of accounts.",
      inputSchema: z.object({}),
    },
    getAccounts
  );

  const getTransactionsFn = createAIFunctionWithContext(
    localContext,
    {
      name: "get_transactions",
      description: "Returns a list of transactions.",
      inputSchema: z.object({
        start: z.string(),
        end: z.string(),
      }),
    },
    getTransactions
  );

  const getTransactionFn = createAIFunctionWithContext(
    localContext,
    {
      name: "get_transaction",
      description: "Returns a transaction.",
      inputSchema: z.object({
        id: z.string(),
      }),
    },
    getTransaction
  );

  const getCategoriesFn = createAIFunctionWithContext(
    localContext,
    {
      name: "get_categories",
      description: "Returns a list of categories.",
      inputSchema: z.object({}),
    },
    getCategories
  );

  const getVendorsFn = createAIFunctionWithContext(
    localContext,
    {
      name: "get_vendors",
      description: "Returns a list of vendors.",
      inputSchema: z.object({}),
    },
    getVendors
  );

  const getChatModel = (modelName: ModelName) => {
    if (isOllamaModelName(modelName)) {
      return new ChatModel({
        client: getOllamaClient(),
        params: {
          model: getBaseModelName(modelName),
          temperature: 0,
        },
        debug: true,
      });
    }

    if (isOpenAIModelName(modelName)) {
      return new ChatModel({
        params: {
          model: getBaseModelName(modelName),
          temperature: 0,
        },
        debug: true,
      });
    }

    throw new Error(`Unknown model: ${modelName}`);
  };

  // const modelName = "ollama:llama3-groq-tool-use:latest";
  const modelName = "openai:gpt-4o-mini";

  if (!isModelName(modelName)) {
    throw new Error(`Unknown model: ${modelName}`);
  }

  console.log(`💖 USING MODEL: ${modelName}`);

  const chatModel = getChatModel(modelName);

  const runner = createAIRunner({
    chatModel,
    functions: createDexterFunctions(
      // getTodayFn,
      getAccountsFn,
      getTransactionsFn,
      getTransactionFn,
      getCategoriesFn,
      getVendorsFn
    ),
    maxIterations: 20,
    systemMessage:
      "You are a helpful assistant. Be as concise as possible. You have the ability to get accounts, get transactions, get a transaction, get categories, and get vendors. Please format dates as MM/DD/YYYY or relative (like today, yesterday, last week, etc). Please format numbers as currency with two decimal places, commas and dollar signs. All currency is in USD. Please format tables as markdown tables. You will provide complete answers and will not abbreviate or truncate result data. You will not hallucinate. You will use the tools provided to you to get the data you need. You will always answer in English. You will provide complete answers based on the prompts and only ask the user for follow-up when you have exhausted all the tools you have available.",
  });

  const result = await runner({
    messages: args.messages,
  });

  return result.messages;
};
