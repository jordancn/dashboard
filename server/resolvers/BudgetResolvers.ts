import { Context } from "../context";
import { BudgetResolvers } from "../types/graphql/server.gen";
import { required } from "../utils/core";
import { narrowScope, Parent, withScope } from "./helpers";

export const budgetResolvers: BudgetResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.budgetId);
  },
  entity: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Budget.findById.load(required(scope.budgetId))
        ).entityId,
      },
      scope,
      (id) => ({ entityId: id })
    );
  },
  category: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Budget.findById.load(required(scope.budgetId))
        ).categoryId,
      },
      scope,
      (id) => ({ categoryId: id })
    );
  },
  performance: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, { groupBy: args.groupBy });

    const groups = context.utilities.getTransactionGroups(
      scope,
      required(scope.dateRange)
    );

    return groups;
  },
  currentBudgeted: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return 0;
  },
};
