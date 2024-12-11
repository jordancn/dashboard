import { Context } from "../context";
import { CategoryResolvers, CategoryType } from "../types/graphql/server.gen";
import { optional, required } from "../utils/core";
import { narrowScope, Parent, scopeKey, withScope } from "./helpers";

export const categoryResolvers: CategoryResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return scopeKey(scope);
  },
  categoryId: async (parent, args, context, info) => {
    return required(parent.scope.categoryId);
  },
  name: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Category.findById.load(required(scope.categoryId))
    ).name;
  },
  transactions: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

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
  budget: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const budget = await context.model.Budget.findFirst.load({
      select: { id: true },
      where: {
        entityId: scope.entityId,
        categoryId: required(scope.categoryId),
      },
      orderBy: [{ id: "asc" }],
      rejectOnNotFound: false,
    });

    if (!budget) {
      return null;
    }

    return withScope(budget, scope, () => ({ budgetId: budget.id }));
  },
  transactionGroups: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      groupBy: required(args.groupBy),
    });

    return context.utilities.getTransactionGroups(
      scope,
      required(scope.dateRange)
    );
  },
  change: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {});

    return withScope(
      {
        id: required(scope.categoryId),
      },
      scope,
      (id) => ({})
    );
  },
  categoryType: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {});

    return required(
      await context.model.Category.findById.load(required(scope.categoryId))
    ).categoryType as CategoryType;
  },
};
