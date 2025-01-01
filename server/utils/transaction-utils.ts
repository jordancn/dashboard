import { Context, prisma } from "@/context";
import {
  asIds,
  scopeKey,
  whereDateRange,
  withScope,
} from "@/resolvers/helpers";
import { Scope } from "@/scope";
import { GroupBy } from "@/types/graphql/server.gen";
import { DateRange, Pagination } from "@/types/interface";
import { required } from "@/utils/core";
import {
  addDays,
  addMonths,
  DateIso,
  differenceInDays,
  differenceInMonths,
  getMonthGroups,
  getPreviousDateRange,
  getWeekdayGroups,
  getWeekGroups,
  getYearGroups,
  lastDayOfMonth,
  parseToDate,
  toIsoDate,
} from "@/utils/date-iso";
import { Category } from "@prisma/client";
import * as _ from "lodash";
import * as uuid from "uuid";

export type Utilities = {
  getDailyBalance: GetDailyBalance;
  getMonthlyBalance: GetMonthlyBalance;
  getTransactions: GetTransactions;
  getTotal: GetTotal;
  getCount: GetCount;
  getTransactionGroups: GetTransactionGroups;
  getChangePercent: GetChangePercent;
  getCategories: GetCategories;
  getTotalIncome: GetTotalIncome;
  getTotalExpenses: GetTotalExpenses;
};

type GetDailyBalance = (
  context: Context,
  scope: Scope,
  args: {
    accountIds: string[];
    dateRange: DateRange;
  }
) => Promise<
  Array<{
    id: string;
    date: DateIso;
    balance: number;
  }>
>;

export const getDailyBalance: GetDailyBalance = async (
  context,
  scope,
  args
) => {
  const daysBetween = differenceInDays(
    toIsoDate(args.dateRange.end),
    toIsoDate(args.dateRange.start)
  );

  const datesBetween = _.range(0, daysBetween + 1).map((index) =>
    addDays(toIsoDate(args.dateRange.start), index)
  );

  const dailyBalance = await Promise.all(
    datesBetween.map(async (date) => {
      const accountBalances = await Promise.all(
        args.accountIds.map(async (accountId) => {
          const accountType = required(
            await context.model.Account.findById.load(accountId)
          )?.accountType;

          if (accountType === "Credit") {
            const balance = await context.prisma.balance.findFirst({
              select: { balance: true },
              where: {
                addedAt: { lte: parseToDate(date) },
                accountId,
              },
              orderBy: [{ addedAt: "desc" }],
              take: 1,
            });

            return balance?.balance.toNumber() || 0;
          }

          const transaction = await context.model.Transaction.findFirst.load({
            select: { availableBalance: true },
            where: {
              date: { lte: parseToDate(date) },
              accountId,
            },
            orderBy: [{ date: "desc" }, { addedAt: "asc" }],
            take: 1,
          });

          return transaction ? transaction.availableBalance.toNumber() : 0;
        })
      );

      return {
        id: scopeKey(scope, `date("${date}")`),
        date,
        balance: _.sum(accountBalances),
      };
    })
  );

  return dailyBalance;
};

type GetMonthlyBalance = (
  context: Context,
  scope: Scope,
  args: {
    accountIds: string[];
    dateRange: DateRange;
  }
) => Promise<
  Array<{
    id: string;
    month: string;
    balance: number;
  }>
>;

export const getMonthlyBalance: GetMonthlyBalance = async (
  context,
  scope,
  args
) => {
  const monthsBetweenNumber = differenceInMonths(
    toIsoDate(args.dateRange.end),
    toIsoDate(args.dateRange.start)
  );

  const monthsBetween = _.range(0, monthsBetweenNumber + 1).map((index) =>
    lastDayOfMonth(addMonths(toIsoDate(args.dateRange.start), index))
  );

  const monthlyBalance = await Promise.all(
    monthsBetween.map(async (date) => {
      const accountBalances = await Promise.all(
        args.accountIds.map(async (accountId) => {
          const transaction = await context.model.Transaction.findFirst.load({
            select: { availableBalance: true },
            where: {
              date: { lte: parseToDate(date) },
              accountId,
            },
            orderBy: [{ date: "desc" }, { addedAt: "asc" }],
            take: 1,
          });

          return transaction ? transaction.availableBalance.toNumber() : 0;
        })
      );

      return {
        id: scopeKey(scope, `date("${date}")`),
        month: date.substr(0, 7),
        balance: _.sum(accountBalances),
      };
    })
  );

  return monthlyBalance;
};

type GetTransactions = (
  context: Context,
  scope: Scope,
  args: {
    dateRange: DateRange;
    pagination?: Pagination;
  }
) => Promise<
  Array<{
    id: any;
    scope: Scope;
  }>
>;

export const getTransactions: GetTransactions = async (
  context,
  scope,
  args
) => {
  const accountIds = scope.accountId
    ? [scope.accountId]
    : scope.entityId
    ? asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          where: {
            id: scope.accountId,
            entityId: scope.entityId,
          },
          orderBy: [{ id: "asc" }],
        })
      )
    : asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          orderBy: [{ id: "asc" }],
        })
      );

  return withScope(
    await context.model.Transaction.findMany.load({
      select: { id: true },
      where: {
        accountId: { in: accountIds },
        vendorId: scope.vendorId,
        categoryId: scope.categoryId,
        ...whereDateRange(args.dateRange),
      },
      orderBy: [{ date: "desc" }, { addedAt: "asc" }],
      skip: args.pagination?.offset,
      take: args.pagination?.limit,
    }),
    scope,
    (transaction) => ({ transactionId: transaction.id })
  );
};

type GetTotal = (
  context: Context,
  scope: Scope,
  args: {
    dateRange: DateRange;
  }
) => Promise<number>;

export const getTotal: GetTotal = async (context, scope, args) => {
  const accountIds = scope.accountId
    ? [scope.accountId]
    : scope.entityId
    ? asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          where: {
            id: scope.accountId,
            entityId: scope.entityId,
          },
          orderBy: [{ id: "asc" }],
        })
      )
    : asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          orderBy: [{ id: "asc" }],
        })
      );

  return (
    (
      await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          accountId: { in: accountIds },
          vendorId: scope.vendorId,
          categoryId: scope.categoryId,
          ...whereDateRange(args.dateRange),
        },
        orderBy: [{ date: "desc" }, { addedAt: "asc" }],
      })
    )._sum.amount?.toNumber() || 0
  );
};

type GetTotalExpenses = (
  context: Context,
  scope: Scope,
  args: {
    dateRange: DateRange;
  }
) => Promise<number>;

export const getTotalExpenses: GetTotalExpenses = async (
  context,
  scope,
  args
) => {
  const accountIds = scope.accountId
    ? [scope.accountId]
    : scope.entityId
    ? asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          where: {
            id: scope.accountId,
            entityId: scope.entityId,
          },
          orderBy: [{ id: "asc" }],
        })
      )
    : asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          orderBy: [{ id: "asc" }],
        })
      );

  return (
    (
      await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          accountId: { in: accountIds },
          vendorId: scope.vendorId,
          categoryId: scope.categoryId,
          category: {
            categoryType: "Expense",
          },
          ...whereDateRange(args.dateRange),
        },
        orderBy: [{ date: "desc" }, { addedAt: "asc" }],
      })
    )._sum.amount?.toNumber() || 0
  );
};

type GetTotalIncome = (
  context: Context,
  scope: Scope,
  args: {
    dateRange: DateRange;
  }
) => Promise<number>;

export const getTotalIncome: GetTotalIncome = async (context, scope, args) => {
  const accountIds = scope.accountId
    ? [scope.accountId]
    : scope.entityId
    ? asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          where: {
            id: scope.accountId,
            entityId: scope.entityId,
          },
          orderBy: [{ id: "asc" }],
        })
      )
    : asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          orderBy: [{ id: "asc" }],
        })
      );

  return (
    (
      await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          accountId: { in: accountIds },
          vendorId: scope.vendorId,
          categoryId: scope.categoryId,
          category: {
            categoryType: "Income",
          },
          ...whereDateRange(args.dateRange),
        },
        orderBy: [{ date: "desc" }, { addedAt: "asc" }],
      })
    )._sum.amount?.toNumber() || 0
  );
};

type GetCount = (
  context: Context,
  scope: Scope,
  args: {
    dateRange: DateRange;
  }
) => Promise<number>;

export const getCount: GetTotal = async (context, scope, args) => {
  const accountIds = scope.accountId
    ? [scope.accountId]
    : scope.entityId
    ? asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          where: {
            id: scope.accountId,
            entityId: scope.entityId,
          },
          orderBy: [{ id: "asc" }],
        })
      )
    : asIds(
        await context.model.Account.findMany.load({
          select: { id: true },
          orderBy: [{ id: "asc" }],
        })
      );

  return (
    (await prisma.transaction.count({
      where: {
        accountId: { in: accountIds },
        vendorId: scope.vendorId,
        categoryId: scope.categoryId,
        ...whereDateRange(args.dateRange),
      },
      orderBy: [{ date: "desc" }, { addedAt: "asc" }],
    })) || 0
  );
};

type GetTransactionGroups = (
  scope: Scope,
  dateRange: DateRange
) => Array<{
  id: string;
  scope: Scope;
}>;

export const getTransactionGroups: GetTransactionGroups = (
  scope: Scope,
  dateRange: DateRange
) => {
  const getGroups = () => {
    switch (required(scope.groupBy)) {
      case GroupBy.Year:
        return getYearGroups(dateRange);
      case GroupBy.Month:
        return getMonthGroups(dateRange);
      case GroupBy.Week:
        return getWeekGroups(dateRange);
      case GroupBy.Weekday:
        return getWeekdayGroups(dateRange);
      default:
        throw new Error("Invalid GroupBy");
    }
  };

  const groups = getGroups().map((group) => ({ ...group, id: uuid.v4() }));

  return withScope(groups, scope, (group) => ({
    groupIndex: group.groupIndex,
    dateRange: { start: group.start, end: group.end },
  }));
};

type GetChangePercent = (
  context: Context,
  scope: Scope,
  previousDateRange?: DateRange
) => Promise<number | null>;

const getChangePercent = async (
  context: Context,
  scope: Scope,
  previousDateRange?: DateRange
) => {
  const currentTotal = await context.utilities.getTotal(context, scope, {
    dateRange: required(scope.dateRange),
  });

  const { start, end } =
    previousDateRange || getPreviousDateRange(required(scope.dateRange));

  const previousTotal = await context.utilities.getTotal(context, scope, {
    dateRange: { start, end },
  });

  const current = Math.abs(currentTotal);
  const previous = Math.abs(previousTotal);

  if (current === 0 && previous === 0) {
    return 0;
  }

  if (previous === 0) {
    return null;
  }

  return current / previous - 1;
};

type GetCategories = (
  context: Context,
  scope: Scope,
  where?: {
    changeThreshold?: number;
  }
) => Promise<Category[]>;

export const getCategories = async (
  context: Context,
  scope: Scope,
  where?: {
    changeThreshold?: number;
  }
) => {
  const categories = await context.model.Category.findMany.load({
    select: { id: true },
    orderBy: [{ id: "asc" }],
  });

  const taggedCategories = await Promise.all(
    categories.map(async (category) => {
      const changePercent = await context.utilities.getChangePercent(context, {
        ...scope,
        categoryId: category.id,
      });

      if (where?.changeThreshold) {
        if (changePercent === null) {
          return { category, include: true };
        }

        if (Math.abs(changePercent) >= where.changeThreshold) {
          return { category, include: true };
        }

        return { category, include: false };
      }

      return { category, include: true };
    })
  );

  return taggedCategories
    .filter((taggedCategory) => taggedCategory.include)
    .map((taggedCategory) => taggedCategory.category);
};

export const utilities: Utilities = {
  getDailyBalance,
  getMonthlyBalance,
  getTotal,
  getCount,
  getTransactions,
  getTransactionGroups,
  getChangePercent,
  getCategories,
  getTotalIncome,
  getTotalExpenses,
};
