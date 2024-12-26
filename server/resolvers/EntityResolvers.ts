import { Context } from "@/context";
import { asId, narrowScope, Parent, withScope } from "@/resolvers/helpers";
import { EntityResolvers } from "@/types/graphql/server.gen";
import { optional, required } from "@/utils/core";
import { today } from "@/utils/date-iso";

export const entityResolvers: EntityResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.entityId);
  },
  name: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return (
      await required(
        await context.model.Entity.findById.load(required(scope.entityId))
      )
    ).name;
  },
  accounts: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      await context.model.Account.findMany.load({
        select: { id: true },
        where: { entityId: required(scope.entityId) },
        orderBy: [{ id: "asc" }],
      }),
      scope,
      (account) => ({ accountId: account.id })
    );
  },
  transactions: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      categoryId: optional(args.categoryId),
      vendorId: optional(args.vendorId),
    });

    const result = context.utilities.getTransactions(context, scope, {
      dateRange: required(args.dateRange),
      pagination: optional(args.pagination),
    });

    console.table(result);

    return result;
  },
  transactionGroups: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      groupBy: required(args.groupBy),
    });

    return context.utilities.getTransactionGroups(scope, args.dateRange);
  },
  category: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      dateRange: required(args.dateRange),
      categoryId: args.categoryId,
    });

    return withScope(
      {
        id: args.categoryId,
      },
      scope,
      (category) => ({ categoryId: args.categoryId })
    );
  },
  categories: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      dateRange: required(args.dateRange),
    });

    return withScope(
      await context.utilities.getCategories(context, scope, {
        changeThreshold: optional(args.changeThreshold),
      }),
      scope,
      (category) => ({ categoryId: category.id })
    );
  },
  currentBalance: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const accountIds = (
      await context.model.Account.findMany.load({
        select: { id: true },
        where: {
          entityId: required(scope.entityId),
        },
        orderBy: [{ id: "asc" }],
      })
    ).map(asId);

    const balance = await context.utilities.getDailyBalance(context, scope, {
      accountIds,
      dateRange: { start: today(), end: today() },
    });

    return balance.length > 0 ? balance[0].balance : 0;
  },
  monthlyBalance: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const accountIds = (
      await context.model.Account.findMany.load({
        select: { id: true },
        where: {
          entityId: required(scope.entityId),
        },
        orderBy: [{ id: "asc" }],
      })
    ).map(asId);

    const balances = await context.utilities.getMonthlyBalance(context, scope, {
      accountIds,
      dateRange: args.dateRange,
    });

    return withScope(balances, scope, (balance) => ({
      monthlyBalanceId: balance.id,
    }));
  },
  dailyBalance: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const accountIds = (
      await context.model.Account.findMany.load({
        select: { id: true },
        where: {
          entityId: required(scope.entityId),
        },
        orderBy: [{ id: "asc" }],
      })
    ).map(asId);

    const balances = await context.utilities.getDailyBalance(context, scope, {
      accountIds,
      dateRange: args.dateRange,
    });

    return withScope(balances, scope, (balance) => ({
      dailyBalanceId: balance.id,
    }));
  },
};
