import {
  isAccountsQuery,
  isCategoriesQuery,
  isDataQuery,
  isNoAdditionalInformationNeededQuery,
  isTransactionQuery,
  isTransactionsQuery,
  isVendorsQuery,
} from "@/chat/chat-type-helpers";
import { QueryMessage } from "@/chat/chat-types";
import { Context } from "@/context";
import * as TransactionUtils from "@/utils/transaction-utils";
import { response } from "express";
import _ from "lodash";

export const getAccounts = async (context: Context) => {
  return await context.model.Account.findMany.load({});
};

export const getTransactions = async (context: Context, query: any) => {
  const transactionIds = await TransactionUtils.getTransactions(
    context,
    {},
    {
      dateRange: {
        start: query.start,
        end: query.end,
      },
    }
  );

  return _.compact(
    await Promise.all(
      transactionIds.map((transaction) =>
        context.model.Transaction.findById.load(transaction.id)
      )
    )
  );
};

export const getTransaction = async (context: Context, id: string) => {
  return await context.model.Transaction.findById.load(id);
};

export const getCategories = async (context: Context) => {
  return await context.model.Category.findMany.load({});
};

export const getVendors = async (context: Context) => {
  return await context.model.Vendor.findMany.load({});
};

// --

const getQueryMessage = (content: QueryMessage["content"]) => {
  const query = content
    .match(/\[##Q##](.*?)\[\/##Q##]/)?.[1]
    ?.trim()
    ?.replace(/^"/, "")
    ?.replace(/"$/, "")
    ?.replace(/\\"/g, '"')
    ?.replace(/\\n/g, "\n");

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

  if (!isDataQuery(parsed)) {
    return parsed;
  }

  return parsed;
};

// --

export const getDataQueryResponse = async (
  context: Context,
  message: QueryMessage
): Promise<object[] | object | undefined> => {
  const query = getQueryMessage(message.content);

  if (isNoAdditionalInformationNeededQuery(query)) {
    return response;
  }

  if (isAccountsQuery(query)) {
    const accounts = await getAccounts(context);

    return accounts;
  }

  if (isTransactionsQuery(query)) {
    const transactions = await getTransactions(context, query);

    return transactions;
  }

  if (isTransactionQuery(query)) {
    const transaction = await getTransaction(context, query.id);

    return transaction ?? undefined;
  }

  if (isCategoriesQuery(query)) {
    const categories = await getCategories(context);

    return categories;
  }

  if (isVendorsQuery(query)) {
    const vendors = await getVendors(context);

    return vendors;
  }

  return;
};
