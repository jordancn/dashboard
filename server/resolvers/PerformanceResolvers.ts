import { Context } from "@/context";
import { narrowScope, Parent } from "@/resolvers/helpers";
import { PerformanceResolvers } from "@/types/graphql/server.gen";
import { required } from "@/utils/core";
import { parseToDate } from "@/utils/date-iso";

export const performanceResolvers: PerformanceResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.budgetId);
  },
  month: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.dateRange?.start);
  },
  spent: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return Math.abs(
      await context.utilities.getTotal(context, scope, {
        dateRange: required(scope.dateRange),
      })
    );
  },
  budgeted: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const budgetAmount = await context.model.BudgetAmount.findFirst.load({
      select: { amount: true },
      where: {
        startingAt: { lte: parseToDate(required(scope.dateRange?.end)) },
        budgetId: required(scope.budgetId),
      },
      orderBy: [{ startingAt: "desc" }],
      take: 1,
    });

    return budgetAmount?.amount.toNumber() || 0;
  },
};
