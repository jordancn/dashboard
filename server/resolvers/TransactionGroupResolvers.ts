import { Context } from "@/context";
import { narrowScope, Parent, scopeKey } from "@/resolvers/helpers";
import { TransactionGroupResolvers } from "@/types/graphql/server.gen";
import { optional, required } from "@/utils/core";

export const transactionGroupResolvers: TransactionGroupResolvers<
  Context,
  Parent
> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return scopeKey(scope);
  },
  groupedBy: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.groupBy);
  },
  groupIndex: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.groupIndex);
  },
  groupIdentifier: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return scopeKey(scope);
  },
  start: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.dateRange?.start);
  },
  end: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.dateRange?.end);
  },
  transactions: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      ...(args.categoryId ? { categoryId: optional(args.categoryId) } : {}),
      ...(args.vendorId ? { vendorId: optional(args.vendorId) } : {}),
    });

    return context.utilities.getTransactions(context, scope, {
      dateRange: required(scope.dateRange),
      pagination: optional(args.pagination),
    });
  },
  total: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return context.utilities.getTotal(context, scope, {
      dateRange: required(scope.dateRange),
    });
  },
  count: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return context.utilities.getCount(context, scope, {
      dateRange: required(scope.dateRange),
    });
  },
  totalIncome: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return context.utilities.getTotalIncome(context, scope, {
      dateRange: required(scope.dateRange),
    });
  },
  totalExpenses: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return context.utilities.getTotalExpenses(context, scope, {
      dateRange: required(scope.dateRange),
    });
  },
};
