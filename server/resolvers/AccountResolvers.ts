import { Context } from "@/context";
import { narrowScope, Parent, withScope } from "@/resolvers/helpers";
import { AccountResolvers, AccountType } from "@/types/graphql/server.gen";
import { optional, required } from "@/utils/core";
import { today } from "@/utils/date-iso";
import { toIsoDateTime } from "@/utils/date-time-iso";

export const accountResolvers: AccountResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.accountId);
  },
  externalId: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Account.findById.load(required(scope.accountId))
    ).externalId;
  },
  name: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Account.findById.load(required(scope.accountId))
    ).name;
  },
  number: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Account.findById.load(required(scope.accountId))
    ).number;
  },
  institution: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Account.findById.load(required(scope.accountId))
        ).institutionId,
      },
      scope,
      (id) => ({ institutionId: id })
    );
  },
  lastRefreshed: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const date = await context.model.RefreshLog.accountLastRefreshed.load(
      required(scope.accountId)
    );

    if (!date) {
      return null;
    }

    return toIsoDateTime(date);
  },
  transactions: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      categoryId: optional(args.categoryId),
      vendorId: optional(args.vendorId),
    });

    return context.utilities.getTransactions(context, scope, {
      dateRange: required(args.dateRange),
      pagination: optional(args.pagination),
    });
  },
  entity: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Account.findById.load(required(scope.accountId))
        ).entityId,
      },
      scope,
      (id) => ({ entityId: id })
    );
  },
  currentBalance: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const accountType = required(
      await context.model.Account.findById.load(required(scope.accountId))
    )?.accountType;

    if (accountType === "Credit") {
      const balance = await context.prisma.balance.findFirst({
        select: { balance: true },
        where: {
          accountId: required(scope.accountId),
        },
        orderBy: [{ addedAt: "desc" }],
        take: 1,
      });

      return balance?.balance.toNumber() || 0;
    }

    const balance = await context.utilities.getDailyBalance(context, scope, {
      accountIds: [required(scope.accountId)],
      dateRange: { start: today(), end: today() },
    });

    return balance.length > 0 ? balance[0].balance : 0;
  },
  accountType: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Account.findById.load(required(scope.accountId))
    ).accountType as AccountType;
  },
  monthlyBalance: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const balances = await context.utilities.getMonthlyBalance(context, scope, {
      accountIds: [required(scope.accountId)],
      dateRange: args.dateRange,
    });

    return withScope(balances, scope, (balance) => ({
      monthlyBalanceId: balance.id,
    }));
  },
  dailyBalance: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const balances = await context.utilities.getDailyBalance(context, scope, {
      accountIds: [required(scope.accountId)],
      dateRange: args.dateRange,
    });

    return withScope(balances, scope, (balance) => ({
      dailyBalanceId: balance.id,
    }));
  },
  transactionGroups: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      groupBy: required(args.groupBy),
    });

    return context.utilities.getTransactionGroups(scope, args.dateRange);
  },
};
