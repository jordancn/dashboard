"use client";

import { AccountsIcon } from "@/Atoms/AccountsIcon";
import { Empty } from "@/Atoms/Empty";
import { SearchIcon } from "@/Atoms/SearchIcon";
import { Spinner } from "@/Atoms/Spinner";
import {
  DateRange,
  useEntityPageByEntityIdQuery,
  useEntityPageOvervallQuery,
} from "@/GraphQL/client.gen";
import { EntityInsightActivityCard } from "@/Molecules/EntityInsightActivityCard";
import { EntityInsightBalanceCard } from "@/Molecules/EntityInsightBalanceCard";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { SectionHeading } from "@/Molecules/SectionHeading";
import { InsightCards } from "@/Organisms/InsightCards";
import { TransactionCards } from "@/Organisms/TransactionCards";
import { TransactionGroupCards } from "@/Organisms/TransactionGroupCards";
import { ActivityGroup, useActivityGroup } from "@/Providers/AppStateProvider";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import {
  addDays,
  addMonths,
  addYears,
  getFirstDayOfMonth,
  getFirstDayOfYear,
  getYearFromIsoDate,
  lastDayOfMonth,
  today,
} from "@/Utils/date-iso";
import { getActivityGroupBy, useRouteParams } from "@/Utils/helpers";
import { assertIsEntityParams } from "@/Utils/param-helpers";
import _ from "lodash";
import Link from "next/link";
import * as React from "react";
import styles from "./page.module.css";

const useQuery = (args: {
  entityId?: string;
  insightsDateRange: DateRange;
  activityDateRange: DateRange;
  activityGroup: ActivityGroup;
}) => {
  const isEntity = !!args.entityId && args.entityId !== "overview";

  const entityResults = useEntityPageByEntityIdQuery({
    variables: {
      entityId: args.entityId,
      insightsDateRange: args.insightsDateRange,
      transactionsDateRange: {
        start: addDays(today(), -3),
        end: today(),
      },
      transactionGroupsDateRange: {
        start: getFirstDayOfYear(today()),
        end: today(),
      },
      changeThreshold: 0.1,
      activityDateRange: args.activityDateRange,
      activityGroupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: !isEntity,
  });

  const overallResults = useEntityPageOvervallQuery({
    variables: {
      insightsDateRange: args.insightsDateRange,
      transactionsDateRange: {
        start: addDays(today(), -3),
        end: today(),
      },
      transactionGroupsDateRange: {
        start: getFirstDayOfYear(today()),
        end: today(),
      },
      changeThreshold: 0.1,
      activityDateRange: args.activityDateRange,
      activityGroupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

const EntityPage = () => {
  const params = useRouteParams(assertIsEntityParams, { entityId: "overview" });

  const insightsDateRange = {
    start: getFirstDayOfMonth(today()),
    end: lastDayOfMonth(today()),
  };

  const activityGroup = useActivityGroup();

  const activityDateRange = React.useMemo(() => {
    switch (activityGroup) {
      case "WeekDay":
        return {
          start: today(),
          end: today(),
        };
      case "Week":
        return {
          start: addDays(today(), -28),
          end: today(),
        };
      case "Month":
        return {
          start: addMonths(getFirstDayOfMonth(today()), -4),
          end: today(),
        };
      case "Year":
        return {
          start: addYears(today(), -3),
          end: today(),
        };
      default:
        throw new Error("Invalid activity group");
    }
  }, [activityGroup]);

  const results = useQuery({
    entityId: params.entityId,
    insightsDateRange,
    activityDateRange,
    activityGroup,
  });

  const insights = React.useMemo(() => {
    if (results.loading || !results.data) {
      return [];
    }

    const getInsights = () => {
      if (!results.data) {
        return [];
      }

      if ("entity" in results.data) {
        return results.data.entity?.insights || [];
      }

      if ("insights" in results.data) {
        return results.data.insights || [];
      }

      return [];
    };

    const insights = getInsights();

    return insights
      .map((category) => ({
        categoryName: category.name,
        categoryType: category.categoryType,
        changePercent: category.change.proratedChangePercent,
        currentTotal: category.change.currentTotal,
        categoryId: category.categoryId,
        id: category.id,
        previousTotal: category.change.proratedPreviousTotal,
        budget: category.budget || [],
      }))
      .filter(
        (insight) => insight.currentTotal > 100 || insight.previousTotal > 100,
      );
  }, [results]);

  // const budget = React.useMemo(() => {
  //   return _.compact(
  //     insights.map((category) => {
  //       const budget = category.budget;

  //       if (!budget) {
  //         return;
  //       }

  //       if (!("performance" in budget)) {
  //         return;
  //       }

  //       const performance = _.first(budget.performance);

  //       if (!performance) {
  //         return;
  //       }

  //       return {
  //         categoryName: category.categoryName,
  //         id: category.id,
  //         categoryId: category.categoryId,
  //         budget: performance.budgeted,
  //         amount: performance.spent,
  //         percent: performance.budgeted
  //           ? performance.spent / performance.budgeted
  //           : Number.POSITIVE_INFINITY,
  //       };
  //     }),
  //   );
  // }, [insights, results]);

  const pendingTransactions = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    const getTransactions = () => {
      if (!results.data) {
        return [];
      }

      if ("entity" in results.data) {
        return results.data.entity?.transactions || [];
      }

      if ("transactions" in results.data) {
        return results.data.transactions || [];
      }

      return [];
    };

    const transactions = getTransactions();

    return _.compact(
      transactions.map((transaction) => {
        if (!transaction.pending) {
          return;
        }

        return {
          id: transaction.id,
          date: transaction.date,
          vendorName: transaction.vendor?.name || transaction.description,
          categoryName: transaction.category?.name,
          amount: transaction.amount,
          pending: transaction.pending,
          image: transaction.vendor?.image || undefined,
        };
      }),
    );
  }, [results]);

  const latestTransactions = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    const getTransactions = () => {
      if (!results.data) {
        return [];
      }

      if ("entity" in results.data) {
        return results.data.entity?.transactions || [];
      }

      if ("transactions" in results.data) {
        return results.data.transactions || [];
      }

      return [];
    };

    const transactions = getTransactions();

    return _.compact(
      transactions.map((transaction) => {
        if (transaction.pending) {
          return;
        }

        return {
          id: transaction.id,
          date: transaction.date,
          vendorName: transaction.vendor?.name || transaction.description,
          categoryName: transaction.category?.name,
          amount: transaction.amount,
          pending: transaction.pending,
          image: transaction.vendor?.image || undefined,
        };
      }),
    );
  }, [results]);

  const groupedTransactions = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    const getTransactionGroups = () => {
      if (!results.data) {
        return [];
      }

      if ("entity" in results.data) {
        return results.data.entity?.transactionGroups || [];
      }

      if ("transactionGroups" in results.data) {
        return results.data.transactionGroups || [];
      }

      return [];
    };

    const transactionGroups = getTransactionGroups();

    return transactionGroups.map((transaction) => ({
      id: transaction.id,
      count: transaction.count,
      total: transaction.total,
      start: transaction.start,
      end: transaction.end,
    }));
  }, [results]);

  const activity = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    const getActivity = () => {
      if (!results.data) {
        return [];
      }

      if ("entity" in results.data) {
        return results.data.entity?.activity || [];
      }

      if ("activity" in results.data) {
        return results.data.activity || [];
      }

      return [];
    };

    const act = getActivity();

    return act.map((activity) => ({
      groupIndex: activity.groupIndex,
      start: activity.start,
      end: activity.end,
      value: Math.abs(activity.total),
      totalIncome: Math.abs(activity.totalIncome),
      totalExpenses: Math.abs(activity.totalExpenses),
    }));
  }, [results]);

  const currentBalance = React.useMemo(() => {
    if (!results.data) {
      return 0;
    }

    if ("entity" in results.data) {
      return results.data.entity?.currentBalance || 0;
    }

    if ("currentBalance" in results.data) {
      return results.data.currentBalance;
    }

    return 0;
  }, [results]);

  if (results.loading) {
    return (
      <Empty>
        <NavigationBar></NavigationBar>
        <ContentScrollable type="wrap-cards">
          <Spinner />
        </ContentScrollable>
      </Empty>
    );
  }

  return (
    <Empty>
      <NavigationBar>
        <div className={styles.navigationBarContents}>
          <div>
            <SearchIcon disabled />
          </div>
          <Link href={`/entity/${params.entityId}/accounts`}>
            <AccountsIcon disabled />
          </Link>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards" navigationBar>
        <EntityInsightBalanceCard
          balance={currentBalance}
          date={results.data?.lastRefreshed}
        />
        <EntityInsightActivityCard
          activityGroup={activityGroup}
          activity={activity}
          entityId={params.entityId}
        />
        <>
          {!params.entityId && (
            <SectionHeading title="Insights" size="inline" />
          )}

          {params.entityId && (
            <SectionHeading
              title="Insights"
              subtitle="Show Budget"
              href={`/entity/${params.entityId}/budget`}
              size="inline"
            />
          )}

          <InsightCards
            entityId={params.entityId}
            insights={insights}
            dateRange={insightsDateRange}
          />
        </>
        {/* 
        {props.mode === "budget" && budget && params.entityId && (
          <Empty>
            <SectionHeading
              title="Budget"
              subtitle="Show Insights"
              onClick={onShowInsightsClicked}
            />

            <BudgetCards
              budget={budget}
              entityId={params.entityId}
              dateRange={insightsDateRange}
            />
          </Empty>
        )} */}
        {pendingTransactions.length > 0 && (
          <Empty>
            <SectionHeading title="Pending Transactions" />

            <TransactionCards
              transactions={pendingTransactions}
              entityId={params.entityId}
            />
          </Empty>
        )}
        {latestTransactions.length > 0 && (
          <SectionHeading title="Latest Transactions" />
        )}
        <TransactionCards
          transactions={latestTransactions}
          entityId={params.entityId}
        />
        <SectionHeading title={getYearFromIsoDate(today())} />
        <TransactionGroupCards
          transactionGroups={groupedTransactions}
          entityId={params.entityId}
        />
      </ContentScrollable>
    </Empty>
  );
};

export default EntityPage;
