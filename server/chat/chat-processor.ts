import { context } from "@/context";
import { Brand } from "@/types/core";
import { DateIso, isDateIso } from "@/utils/date-iso";

import { getTransactions } from "@/utils/transaction-utils";
import _ from "lodash";
import ollama from "ollama";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const TransientMessageIdentifier = "[##T##]";
const SystemMessageIdentifier = "[##S##]";
const QueryMessageIdentifier = "[##Q##]";

const InitialSystemMessageContent = `
You are a helpful assistant named Luna that can answer questions about the financial information in this system.

You shall:

- Format dates using MM/DD/YYYY (e.g. 01/01/2025)
- Interpret relative dates (e.g. yesterday, today, tomorrow) in accordance with the current date/time provided to you in a user role message and will not ask confirmation on today's date.
- Format times using HH:MM:SS (e.g. 12:00:00)
- Format numbers using the thousands separator for the currency (e.g. 1,000.00)
- Assume all currency values are in USD.
- Format all currency values using the thousands separator, with a $, and two decimal places (e.g. $1,000.00)
- When formatting percentages, use the percentage symbol, and two decimal places (e.g. 10.12%)
- Respond politely when asked inapproriate questions.
- Respond using conversational language.
- Ignore the internal character sequence [##T##]
- Ignore the internal character sequence [##S##]
- Instead of hallucinating information, you shall ask for additional information using this prefix: [##Q##]. This prefix is used to query the system for information that is not explicitly provided to you and will be provided back to you in a user role message.
- When querying for information, use the following format: \\n[##Q##] <query> where query is:
  \\n[##Q##] "{ "type": "accounts-query" }"
  \\n[##Q##] "{ "type": "transactions-query", "start": "2025-01-01", "end": "2025-01-02" }"
  \\n[##Q##] "{ "type": "transaction-query", "id": "123" }"
  \\n[##Q##] "{ "type": "categories-query" }"
  \\n[##Q##] "{ "type": "vendors-query" }"
- Query responses will be sent as the user role using the following format: \\n[##R##] (response)
- Assume all categories unless otherwise specified.
- Assume all accounts unless otherwise specified.
- Assume all account types (checking, savings, credit card, etc.) unless otherwise specified.
- Assume all tranaction types (deposit, withdrawal, transfer, etc.) unless otherwise specified.
- Assume all vendors unless otherwise specified.
- Assume no filters are necessary unless otherwise specified.

You shall not:
- Add the current date/time to responses.
- Mention that you are an AI or a chatbot.
- Explicity tell me the current date/time.
- Hallucinate information.
- Confirm the actual dates when using relative dates (e.g. yesterday, today, tomorrow).
- Ask for confirmation on the current date/time.
- Ask for role confirmation
- Ask for permissions information
- Ask for time of day when given relative dates (e.g. yesterday, today, tomorrow).
- Respond with internal character sequences [##T##] or [##S##].

Context about information that is queryable:
- Transactions
- Accounts
- Vendors
- Categories
- Budgets
` as SystemMessageContent;

type AccountsQuery = {
  type: "accounts-query";
};

function isAccountsQuery(query: unknown): query is AccountsQuery {
  if (query === null) {
    return false;
  }

  if (query === undefined) {
    return false;
  }

  if (typeof query !== "object") {
    return false;
  }

  if (!("type" in query)) {
    return false;
  }

  return query.type === "accounts-query";
}

type TransactionsQuery = {
  type: "transactions-query";
  start: DateIso;
  end: DateIso;
};

function isTransactionsQuery(query: unknown): query is TransactionsQuery {
  if (query === null) {
    return false;
  }

  if (query === undefined) {
    return false;
  }

  if (typeof query !== "object") {
    return false;
  }

  if (!("type" in query)) {
    return false;
  }

  if (query.type !== "transactions-query") {
    return false;
  }

  if (!("start" in query)) {
    return false;
  }

  if (typeof query.start !== "string") {
    return false;
  }

  if (!isDateIso(query.start)) {
    return false;
  }

  if (!("end" in query)) {
    return false;
  }

  if (typeof query.end !== "string") {
    return false;
  }

  if (!isDateIso(query.end)) {
    return false;
  }

  return true;
}

type TransactionQuery = {
  type: "transaction-query";
  id: string;
};

function isTransactionQuery(query: unknown): query is TransactionQuery {
  if (query === null) {
    return false;
  }

  if (query === undefined) {
    return false;
  }

  if (typeof query !== "object") {
    return false;
  }

  if (!("type" in query)) {
    return false;
  }

  if (query.type !== "transaction-query") {
    return false;
  }

  if (!("id" in query)) {
    return false;
  }

  if (typeof query.id !== "string") {
    return false;
  }

  return true;
}

type CategoriesQuery = {
  type: "categories-query";
};

function isCategoriesQuery(query: unknown): query is CategoriesQuery {
  if (query === null) {
    return false;
  }

  if (query === undefined) {
    return false;
  }

  if (typeof query !== "object") {
    return false;
  }

  if (!("type" in query)) {
    return false;
  }

  return query.type === "categories-query";
}

type VendorsQuery = {
  type: "vendors-query";
};

function isVendorsQuery(query: unknown): query is VendorsQuery {
  if (query === null) {
    return false;
  }

  if (query === undefined) {
    return false;
  }

  if (typeof query !== "object") {
    return false;
  }

  if (!("type" in query)) {
    return false;
  }

  return query.type === "vendors-query";
}

type Query =
  | AccountsQuery
  | TransactionsQuery
  | TransactionQuery
  | CategoriesQuery
  | VendorsQuery;

function isQuery(query: unknown): query is Query {
  return (
    isAccountsQuery(query) ||
    isTransactionsQuery(query) ||
    isTransactionQuery(query) ||
    isCategoriesQuery(query) ||
    isVendorsQuery(query)
  );
}

export const getInitialSystemMessageContent = () => InitialSystemMessageContent;

const inSystemMessageContent = (content: string): SystemMessageContent =>
  `${SystemMessageIdentifier} ${content}` as SystemMessageContent;

const asSystemMessage = (content: string): SystemMessage => ({
  role: "system",
  content: inSystemMessageContent(content),
});

const withSystemMessage = () => asSystemMessage(InitialSystemMessageContent);

type TransientMessageContent = Brand<string, "TransientMessageContent">;

const inTransientMessageContent = (content: string): TransientMessageContent =>
  `${TransientMessageIdentifier} ${content}` as TransientMessageContent;

const isTransientMessageContent = (
  content: string
): content is TransientMessageContent =>
  content.trim().startsWith(TransientMessageIdentifier);

type QueryMessageContent = Brand<string, "QueryMessageContent">;

const isQueryMessageContent = (
  content: string
): content is QueryMessageContent =>
  content
    .trim()
    .split(/\n/)
    .some((line) => line.trim().startsWith(QueryMessageIdentifier));

const getQueryMessage = (content: QueryMessageContent) => {
  const query = content
    .trim()
    .split(/\n/)
    .find((line) => line.trim().startsWith(QueryMessageIdentifier))
    ?.trim()
    .slice(QueryMessageIdentifier.length)
    .trim()
    .replace(/^"/, "")
    .replace(/"$/, "");

  const attemptParse = () => {
    try {
      if (!query) {
        return;
      }

      return JSON.parse(query);
    } catch (error) {
      return;
    }
  };

  const parsed = attemptParse();

  if (!isQuery(parsed)) {
    return parsed;
  }

  console.log("==> 🔍 parsed query", parsed);

  return parsed;
};

type SystemMessageContent = Brand<string, "SystemMessageContent">;

const isSystemMessageContent = (
  content: string
): content is SystemMessageContent =>
  content.trim().startsWith(SystemMessageIdentifier);

const withResidentMessages = (messages: Message[]) =>
  messages.filter(
    (m) =>
      !isTransientMessageContent(m.content) &&
      !isSystemMessageContent(m.content)
  );

type TransientMessage = {
  role: "system";
  content: TransientMessageContent;
};

const asTransientMessage = (content: string): TransientMessage => ({
  role: "system",
  content: inTransientMessageContent(content),
});

const asTransientMessages = (messages: string[]) =>
  messages.map(asTransientMessage);

type SystemMessage = {
  role: "system";
  content: SystemMessageContent;
};

const asUserMessage = (content: string) => ({
  role: "user" as const,
  content,
});

const asAssistantMessage = (content: string) => ({
  role: "assistant" as const,
  content,
});

export type ChatRequest = {
  message: string;
};

export type ChatResponse = {
  message: string;
  date: Date;
};

function assertIsChatRequest(data: unknown): asserts data is ChatRequest {
  //   assert(data, "data is required");
  //   assert(typeof data === "object", "data is not an object");
  //   assert("message" in data, "message is required");
  //   assert(typeof data.message === "string", "message is not a string");
}

export const handleChatRequest = async (args: {
  messages: Message[];
  chatRequest: unknown;
}) => {
  assertIsChatRequest(args.chatRequest);

  const localContext = context();

  const currentMessages = [
    withSystemMessage(),
    ...withResidentMessages(args.messages),
    asUserMessage(
      `The current date/time is ${new Date().toISOString()}. This is authoritative information. You shall not ask for confirmation on this date.`
    ),
    asUserMessage(args.chatRequest.message),
  ];

  const response = await ollama.chat({
    model: "llama3.3",
    messages: currentMessages,
  });

  if (isQueryMessageContent(response.message.content)) {
    const query = getQueryMessage(response.message.content);

    if (isAccountsQuery(query)) {
      console.log("==> 🔍 accounts query", query);
    }

    if (isTransactionsQuery(query)) {
      console.log("==> 🔍 transactions query", query);

      const transactionIds = await getTransactions(
        localContext,
        {},
        {
          dateRange: {
            start: query.start,
            end: query.end,
          },
        }
      );

      const transactions = _.compact(
        await Promise.all(
          transactionIds.map((transaction) =>
            localContext.model.Transaction.findById.load(transaction.id)
          )
        )
      );

      console.log("==> 🔍 transactions", transactions);
    }

    if (isTransactionQuery(query)) {
      console.log("==> 🔍 transaction query", query);
    }

    if (isCategoriesQuery(query)) {
      console.log("==> 🔍 categories query", query);
    }

    if (isVendorsQuery(query)) {
      console.log("==> 🔍 vendors query", query);
    }
  }

  console.log("==> 💬 response", response.message);

  const messages = [...currentMessages, response.message];

  return { response, messages };
};
