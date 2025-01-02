import { Brand } from "@/types/core";
import { DateIso } from "@/utils/date-iso";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type AccountsDataQueryRequest = {
  type: "accounts-query";
};

export type TransactionsDataQueryRequest = {
  type: "transactions-query";
  start: DateIso;
  end: DateIso;
};

export type TransactionDataQueryRequest = {
  type: "transaction-query";
  id: string;
};

export type CategoriesDataQueryRequest = {
  type: "categories-query";
};

export type VendorsDataQueryRequest = {
  type: "vendors-query";
};

export type NoAdditionalInformationNeededDataQueryRequest = {
  type: "no-additional-information-needed";
};

export type DataQuery =
  | AccountsDataQueryRequest
  | TransactionsDataQueryRequest
  | TransactionDataQueryRequest
  | CategoriesDataQueryRequest
  | VendorsDataQueryRequest
  | NoAdditionalInformationNeededDataQueryRequest;

export type TransientMessageContent = Brand<string, "TransientMessageContent">;
export type QueryMessageContent = Brand<string, "QueryMessageContent">;

export type SystemMessageContent = Brand<string, "SystemMessageContent">;

export type UserMessageContent = Brand<string, "UserMessageContent">;

export type UserMessage = {
  role: "user";
  content: UserMessageContent;
};

export type QueryMessage = {
  role: "assistant";
  content: QueryMessageContent;
};

export type TransientMessage = {
  role: "user";
  content: TransientMessageContent;
};

export type QueryResponseMessageContent = Brand<
  string,
  "QueryResponseMessageContent"
>;

export type QueryResponseMessage = {
  role: "user";
  content: QueryResponseMessageContent;
};

export type SystemMessage = {
  role: "user";
  content: SystemMessageContent;
};

export type ChatRequest = {
  message: UserMessageContent;
};

export type ChatResponse = {
  message: string;
  date: Date;
};
