import { useEntityQuery, useOverviewQuery } from "@/app/client.gen";
import {
  addDays,
  addMonths,
  addYears,
  DateIso,
  getFirstDayOfMonth,
  getFirstDayOfYear,
  getYearFromIsoDate,
  lastDayOfMonth,
  today,
} from "@/Utils/date-iso";
import { getActivityGroupBy } from "@/Utils/helpers";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Empty } from "../Components/Atoms/Empty";
import { Spinner } from "../Components/Atoms/Spinner";
import { EntityInsightActivityCard } from "../Components/Molecules/EntityInsightActivityCard";
import { EntityInsightBalanceCard } from "../Components/Molecules/EntityInsightBalanceCard";
import { NavigationBar } from "../Components/Molecules/NavigationBar";
import { SectionHeading } from "../Components/Molecules/SectionHeading";
import { BudgetCards } from "../Components/Organisms/BudgetCards";
import { InsightCards } from "../Components/Organisms/InsightCards";
import { TransactionCards } from "../Components/Organisms/TransactionCards";
import { TransactionGroupCards } from "../Components/Organisms/TransactionGroupCards";
import {
  ActivityGroup,
  useActivityGroup,
} from "../Components/Providers/AppStateProvider";
import { ContentScrollable } from "../Components/Templates/Content";
import styles from "./Entity.module.css";

const useQuery = (args: {
  entityId?: string;
  insightsDateRange: { start: DateIso; end: DateIso };
  activityDateRange: { start: DateIso; end: DateIso };
  activityGroup: ActivityGroup;
}) => {
  const isEntity = !!args.entityId && args.entityId !== "overview";

  const entityResults = useEntityQuery({
    variables: {
      entityId: args.entityId || "",
      insightsDateRange: args.insightsDateRange,
      transactionsDateRange: {
        start: addDays(today(), -3),
        end: today(),
      },
      transactionGroupsDateRange: {
        start: getFirstDayOfYear(today()),
        end: today(),
      },
      activityDateRange: args.activityDateRange,
      activityGroupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: !isEntity,
  });

  const overallResults = useOverviewQuery({
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
      activityDateRange: args.activityDateRange,
      activityGroupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

export const Entity = (props: { mode: "insights" | "budget" }) => {
  // const navigate = useNavigate();

  const params = useParams<{ entityId?: string }>();

  const insightsDateRange = {
    start: getFirstDayOfMonth(today()),
    end: lastDayOfMonth(today()),
  };

  const activityGroup = useActivityGroup();

  const activityDateRange = useMemo(() => {
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
    }
  }, []);

  const results = useQuery({
    entityId: params.entityId,
    insightsDateRange,
    activityDateRange,
    activityGroup,
  });

  const insights = useMemo(() => {
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

  const budget = useMemo(() => {
    return _.compact(
      insights.map((category) => {
        const budget = category.budget;

        if (!budget) {
          return;
        }

        if (!("performance" in budget)) {
          return;
        }

        const performance = _.first(budget.performance);

        if (!performance) {
          return;
        }

        return {
          categoryName: category.categoryName,
          id: category.id,
          categoryId: category.categoryId,
          budget: performance.budgeted,
          amount: performance.spent,
          percent: performance.budgeted
            ? performance.spent / performance.budgeted
            : Number.POSITIVE_INFINITY,
        };
      }),
    );
  }, [insights, results]);

  const pendingTransactions = useMemo(() => {
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

  const latestTransactions = useMemo(() => {
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

  const groupedTransactions = useMemo(() => {
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

  const activity = useMemo(() => {
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

  const onShowBudgetClicked = useCallback(() => {
    // TODO
    // navigate(`/entity/${params.entityId || 'overview'}/budget`);
  }, [params.entityId]);

  const onShowInsightsClicked = useCallback(() => {
    // TODO
    // navigate(`/entity/${params.entityId || 'overview'}/insights`);
  }, [params.entityId]);

  const onAccountsClicked = useCallback(() => {
    // TODO
    // navigate(`/entity/${params.entityId || 'overview'}/accounts`);
  }, [params.entityId]);

  const currentBalance = useMemo(() => {
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

  // if (!results.data?.entity) {
  //   return <NotFound />;
  // }

  return (
    <Empty>
      <NavigationBar>
        <div className={styles.entity}>
          {/* <div>
            <svg xmlns='http://www.w3.org/2000/svg' width='20.99' height='21.194' viewBox='0 0 20.99 21.194'>
              <path
                id='Symbol'
                d='M-10.5-9.775A8.582,8.582,0,0,0-1.923-1.2,8.5,8.5,0,0,0,3.062-2.814l5.285,5.3a1.265,1.265,0,0,0,.913.365A1.211,1.211,0,0,0,10.5,1.579,1.233,1.233,0,0,0,10.141.7L4.888-4.587A8.472,8.472,0,0,0,6.649-9.775a8.582,8.582,0,0,0-8.572-8.572A8.582,8.582,0,0,0-10.5-9.775Zm1.837,0a6.739,6.739,0,0,1,6.735-6.735A6.739,6.739,0,0,1,4.813-9.775,6.739,6.739,0,0,1-1.923-3.04,6.739,6.739,0,0,1-8.658-9.775Z'
                transform='translate(10.495 18.348)'
                fill='#007aff'
              />
            </svg>
          </div> */}
          <div onClick={onAccountsClicked}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27.221"
              height="19.411"
              viewBox="0 0 27.221 19.411"
            >
              <path
                id="Symbol"
                d="M-9.254,1.429H-.521V-.3h-8.7A1.506,1.506,0,0,1-10.9-1.987v-8.218H10.887V-6.6a4.8,4.8,0,0,1,.881-.086,4.377,4.377,0,0,1,.849.075v-6.982c0-2.213-1.117-3.33-3.373-3.33h-18.5c-2.234,0-3.373,1.117-3.373,3.33v11.7C-12.627.322-11.489,1.429-9.254,1.429ZM-10.9-13.492a1.514,1.514,0,0,1,1.676-1.7H9.222a1.511,1.511,0,0,1,1.665,1.7v.849H-10.9ZM3.969,2.385H8.008a.627.627,0,0,0,.655-.634.641.641,0,0,0-.655-.666H5.452V1.031l1.407-1.4C8.051-1.536,8.427-2.181,8.427-3A2.356,2.356,0,0,0,5.86-5.221a2.524,2.524,0,0,0-2.449,1.6,1.561,1.561,0,0,0-.1.5.612.612,0,0,0,.634.645A.6.6,0,0,0,4.582-3a1.521,1.521,0,0,1,.075-.236,1.269,1.269,0,0,1,1.2-.709,1.107,1.107,0,0,1,1.171,1c0,.483-.215.816-1.128,1.719L3.625,1.042a.907.907,0,0,0-.344.688A.641.641,0,0,0,3.969,2.385Zm7.81.107c1.622,0,2.814-.978,2.814-2.31A1.875,1.875,0,0,0,13.455-1.59a1.759,1.759,0,0,0,.838-1.558,2.254,2.254,0,0,0-2.524-2.073,2.539,2.539,0,0,0-2.4,1.311,1.53,1.53,0,0,0-.15.645.6.6,0,0,0,.634.634.585.585,0,0,0,.623-.473,1.212,1.212,0,0,1,1.257-.838c.73,0,1.171.354,1.171.913,0,.58-.473.945-1.214.945h-.537a.6.6,0,0,0-.623.623.6.6,0,0,0,.623.612H11.7c.945,0,1.461.365,1.461,1.031,0,.612-.548,1.021-1.375,1.021A1.361,1.361,0,0,1,10.361.365a.6.6,0,0,0-.634-.473.635.635,0,0,0-.666.655,1.313,1.313,0,0,0,.161.623A2.738,2.738,0,0,0,11.779,2.492ZM1.627,2.481a.663.663,0,0,0,.709-.7v-6.22a.711.711,0,0,0-.763-.741A1.1,1.1,0,0,0,.9-4.931L-.725-3.878a.7.7,0,0,0-.376.612.591.591,0,0,0,.623.591.694.694,0,0,0,.408-.14l.956-.6H.951v5.2A.654.654,0,0,0,1.627,2.481Z"
                transform="translate(12.627 16.919)"
                fill="#007aff"
              />
            </svg>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <EntityInsightBalanceCard
          balance={currentBalance}
          date={results.data?.lastRefreshed}
        />

        <EntityInsightActivityCard
          activityGroup={activityGroup}
          activity={activity}
          entityId={params.entityId}
        />

        {props.mode === "insights" && (
          <Empty>
            {!params.entityId && <SectionHeading title="Insights" />}
            {params.entityId && (
              <SectionHeading
                title="Insights"
                subtitle="Show Budget"
                onClick={onShowBudgetClicked}
              />
            )}

            <InsightCards
              entityId={params.entityId}
              insights={insights}
              dateRange={insightsDateRange}
            />
          </Empty>
        )}

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
        )}

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
