import { Base64Url } from "GraphQL/Base64Url";
import { Context } from "../context";
import { VendorResolvers } from "../types/graphql/server.gen";
import { optional, required } from "../utils/core";
import { narrowScope, Parent } from "./helpers";

export const vendorResolvers: VendorResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.vendorId);
  },
  name: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Vendor.findById.load(required(scope.vendorId))
    ).name;
  },
  image: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const buffer = required(
      await context.model.Vendor.findById.load(required(scope.vendorId))
    ).image;

    if (buffer) {
      return buffer.toString("base64") as Base64Url;
    }

    return null;
  },
  transactions: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return context.utilities.getTransactions(context, scope, {
      dateRange: required(args.dateRange),
      pagination: optional(args.pagination),
    });
  },
  total: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return context.utilities.getTotal(context, scope, {
      dateRange: args.dateRange,
    });
  },
  transactionGroups: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      groupBy: required(args.groupBy),
    });

    return context.utilities.getTransactionGroups(scope, args.dateRange);
  },
};
