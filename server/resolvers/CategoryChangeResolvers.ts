import * as uuid from "uuid";
import { Context } from "../context";
import { Scope } from "../scope";
import { CategoryChangeResolvers } from "../types/graphql/server.gen";
import { required } from "../utils/core";
import {
  addDays,
  differenceInDays,
  getPreviousDateRange,
  today,
} from "../utils/date-iso";
import { narrowScope, Parent, scopeKey, withScope } from "./helpers";

export const categoryChangeResolvers: CategoryChangeResolvers<Context, Parent> =
  {
    id: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      return scopeKey(scope, "change");
    },
    category: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      return withScope(
        {
          id: required(scope.categoryId),
        },
        scope,
        (id) => ({})
      );
    },
    currentDateRange: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      return withScope(
        {
          id: uuid.v4(),
          start: required(scope.dateRange?.start),
          end: required(scope.dateRange?.end),
        },
        scope,
        (id) => ({})
      );
    },
    previousDateRange: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      const dateRange = getPreviousDateRange(required(scope.dateRange));

      return withScope(
        {
          id: uuid.v4(),
          start: required(dateRange.start),
          end: required(dateRange.end),
        },
        scope,
        (id) => ({})
      );
    },
    currentTotal: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      const proratedPeviousDateRange = getProratedPreviousDateRange(scope);

      return Math.abs(
        await context.utilities.getTotal(context, scope, {
          dateRange: required(scope.dateRange),
        })
      );
    },
    previousTotal: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      const { start, end } = getPreviousDateRange(required(scope.dateRange));

      return Math.abs(
        await context.utilities.getTotal(context, scope, {
          dateRange: { start, end },
        })
      );
    },
    changePercent: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      return context.utilities.getChangePercent(context, scope);
    },

    proratedPreviousTotal: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      const { start, end } = getProratedPreviousDateRange(scope);

      return Math.abs(
        await context.utilities.getTotal(context, scope, {
          dateRange: { start, end },
        })
      );
    },

    proratedPreviousDateRange: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      return withScope(
        {
          id: "TBD",
          ...getProratedPreviousDateRange(scope),
        },
        scope,
        (id) => ({})
      );
    },

    proratedChangePercent: async (parent, args, context, info) => {
      const scope = narrowScope(parent.scope);

      const proratedPeviousDateRange = getProratedPreviousDateRange(scope);

      return context.utilities.getChangePercent(
        context,
        scope,
        proratedPeviousDateRange
      );
    },
  };

const getProratedPreviousDateRange = (scope: Scope) => {
  // const currentDateRange = {
  //   start: required(scope.dateRange?.start),
  //   end: required(scope.dateRange?.end),
  // };

  const previousDateRange = getPreviousDateRange(required(scope.dateRange));

  const daysInMonth =
    differenceInDays(
      required(scope.dateRange?.end),
      required(scope.dateRange?.start)
    ) + 1;
  const daysSoFar = differenceInDays(today(), required(scope.dateRange?.start));

  const daysInPreviousMonth =
    differenceInDays(previousDateRange.end, previousDateRange.start) + 1;

  const percentageThroughMonth = (daysSoFar * 1.0) / daysInMonth;

  const daysToConsiderInPreviousMonth =
    daysInPreviousMonth * percentageThroughMonth;

  const dateRangeToConsiderInPreviousMonth = {
    start: previousDateRange.start,
    end: addDays(previousDateRange.start, daysToConsiderInPreviousMonth),
  };

  return previousDateRange;

  // return dateRangeToConsiderInPreviousMonth;
};
