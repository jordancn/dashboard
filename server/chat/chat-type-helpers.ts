import { getTransientMessageIdentifier } from "@/chat/chat-helpers";
import {
  AccountsDataQueryRequest,
  CategoriesDataQueryRequest,
  ChatRequest,
  DataQuery,
  Message,
  NoAdditionalInformationNeededDataQueryRequest,
  QueryMessage,
  QueryMessageContent,
  QueryResponseMessageContent,
  TransactionDataQueryRequest,
  TransactionsDataQueryRequest,
  TransientMessageContent,
  UserMessageContent,
  VendorsDataQueryRequest,
} from "@/chat/chat-types";
import { isDateIso } from "@/utils/date-iso";

export function isAccountsQuery(
  query: unknown
): query is AccountsDataQueryRequest {
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

export function isTransactionsQuery(
  query: unknown
): query is TransactionsDataQueryRequest {
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

export function isTransactionQuery(
  query: unknown
): query is TransactionDataQueryRequest {
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

export function isCategoriesQuery(
  query: unknown
): query is CategoriesDataQueryRequest {
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

export function isVendorsQuery(
  query: unknown
): query is VendorsDataQueryRequest {
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

export function isNoAdditionalInformationNeededQuery(
  query: unknown
): query is NoAdditionalInformationNeededDataQueryRequest {
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

  return query.type === "no-additional-information-needed";
}

export function isDataQuery(query: unknown): query is DataQuery {
  return (
    isAccountsQuery(query) ||
    isTransactionsQuery(query) ||
    isTransactionQuery(query) ||
    isCategoriesQuery(query) ||
    isVendorsQuery(query)
  );
}

export function isChatRequest(data: unknown): data is ChatRequest {
  if (data === null) {
    return false;
  }

  if (data === undefined) {
    return false;
  }

  if (typeof data !== "object") {
    return false;
  }

  if (!("message" in data)) {
    return false;
  }

  if (!isUserMessageContent(data.message)) {
    return false;
  }

  return true;
}

export const isTransientMessageContent = (
  content: string
): content is TransientMessageContent =>
  content.trim().startsWith(getTransientMessageIdentifier());

export const isQueryMessage = (message: Message): message is QueryMessage =>
  message.role === "assistant" && isQueryMessageContent(message.content);

export const isQueryMessageContent = (
  content: string | undefined
): content is QueryMessageContent => {
  if (content === null) {
    return false;
  }

  if (content === undefined) {
    return false;
  }

  const match = /\[##Q##].*[\/]##Q##\]/.test(content);

  if (!match) {
    return false;
  }

  return true;
};

export const isQueryResponseMessageContent = (
  content: string
): content is QueryResponseMessageContent => {
  const match = /\[##R##].*[\/]##R##\]/.test(content);

  if (!match) {
    return false;
  }

  return true;
};

export const isUserMessageContent = (
  content: unknown
): content is UserMessageContent => {
  if (content === null) {
    return false;
  }

  if (content === undefined) {
    return false;
  }

  if (typeof content !== "string") {
    return false;
  }

  return true;
};
