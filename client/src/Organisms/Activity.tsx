import { Spinner } from "@/Atoms/Spinner";
import {
  CategoryType,
  useEntityActivityOverviewQuery,
  useEntityActivityQuery,
} from "@/GraphQL/client.gen";
import { ActivityCard } from "@/Molecules/ActivityCard";
import { ActivityHeading } from "@/Molecules/ActivityHeading";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { TransactionGroupCard } from "@/Molecules/TransactionGroupCard";
import { ActivityGroup, useActivityGroup } from "@/Providers/AppStateProvider";
import { DateIso } from "@/Utils/date-iso";
import {
  getActivitySubGroup,
  getActivitySubGroupBy,
  getRelativePosition,
  useRouteParams,
} from "@/Utils/helpers";
import { assertIsEntityParams } from "@/Utils/param-helpers";
import _ from "lodash";
import React from "react";
import styles from "./Activity.module.css";

const useQuery = (args: {
  entityId?: string;
  start: DateIso;
  end: DateIso;
  activityGroup: ActivityGroup;
}) => {
  const isEntity = !!args.entityId && args.entityId !== "overview";

  const entityResults = useEntityActivityQuery({
    variables: {
      entityId: args.entityId || "",
      dateRange: {
        start: args.start,
        end: args.end,
      },
      activityGroupBy: getActivitySubGroupBy(args.activityGroup),
    },
    skip: !isEntity,
  });

  const overallResults = useEntityActivityOverviewQuery({
    variables: {
      dateRange: {
        start: args.start,
        end: args.end,
      },
      activityGroupBy: getActivitySubGroupBy(args.activityGroup),
    },
    skip: isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

export const Activity = ({ start, end }: { start: DateIso; end: DateIso }) => {
  const activityGroup = useActivityGroup();

  const { entityId } = useRouteParams(assertIsEntityParams);

  const results = useQuery({
    entityId,
    start,
    end,
    activityGroup: activityGroup,
  });

  const categories = React.useMemo(() => {
    if (results.loading || !results.data) {
      return;
    }

    if ("entity" in results.data) {
      return results.data.entity?.categories;
    }

    if ("categories" in results.data) {
      return results.data.categories;
    }
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

    const activities = getActivity();

    return activities.map((activity) => ({
      groupIndex: activity.groupIndex,
      start: activity.start,
      end: activity.end,
      value: Math.abs(activity.total),
      totalIncome: Math.abs(activity.totalIncome),
      totalExpenses: Math.abs(activity.totalExpenses),
    }));
  }, [results]);

  const totalIncome = React.useMemo(
    () =>
      _.sum(
        (categories || [])
          .filter(
            (category) =>
              category.total !== 0 &&
              category.categoryType === CategoryType.Income,
          )
          .map((category) => category.total),
      ),
    [categories],
  );

  const totalIncomeCount = React.useMemo(
    () =>
      _.sum(
        (categories || [])
          .filter(
            (category) =>
              category.total !== 0 &&
              category.categoryType === CategoryType.Income,
          )
          .map((category) => category.count),
      ),
    [categories],
  );

  const totalExpense = React.useMemo(
    () =>
      _.sum(
        (categories || [])
          .filter(
            (category) =>
              category.total !== 0 &&
              category.categoryType === CategoryType.Expense,
          )
          .map((category) => category.total),
      ),
    [categories],
  );

  const totalExpenseCount = React.useMemo(
    () =>
      _.sum(
        (categories || [])
          .filter(
            (category) =>
              category.total !== 0 &&
              category.categoryType === CategoryType.Expense,
          )
          .map((category) => category.count),
      ),
    [categories],
  );

  const incomeCards = React.useMemo(
    () =>
      _.orderBy(
        (categories || []).filter(
          (category) =>
            category.total !== 0 &&
            category.categoryType === CategoryType.Income,
        ),
        (category) => category.total,
        "desc",
      ).map((category, index, list) => {
        return (
          <TransactionGroupCard
            relativePosition={getRelativePosition(index, list)}
            key={category.categoryId}
            title={category.name}
            id={category.categoryId}
            total={category.total}
            transactionCount={category.count}
            changePercent={category.change.changePercent}
            categoryType={CategoryType.Expense}
            href={`/entity/${entityId || "overview"}/activity/${activityGroup}/${category.categoryId}/${start}/${end}`}
          />
        );
      }),
    [categories, entityId, activityGroup, start, end],
  );

  const expenseCards = React.useMemo(
    () =>
      _.orderBy(
        (categories || []).filter(
          (category) =>
            category.total !== 0 &&
            category.categoryType === CategoryType.Expense,
        ),
        (category) => category.total,
        "asc",
      ).map((category, index, list) => {
        return (
          <TransactionGroupCard
            relativePosition={getRelativePosition(index, list)}
            key={category.categoryId}
            title={category.name}
            id={category.categoryId}
            total={category.total}
            transactionCount={category.count}
            changePercent={category.change.changePercent}
            categoryType={CategoryType.Expense}
            href={`/entity/${entityId || "overview"}/activity/${activityGroup}/${category.categoryId}/${start}/${end}`}
          />
        );
      }),
    [categories, entityId, activityGroup, start, end],
  );

  if (results.loading) {
    return (
      <div>
        <Card>
          <CardTitle />
          <CardContents variant="transparent">
            <div className={styles.loading}>
              <Spinner />
            </div>
          </CardContents>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ActivityCard
        entityId={entityId}
        activity={activity}
        activityGroup={getActivitySubGroup(activityGroup)}
        size="full"
      />

      <ActivityHeading
        title="Income"
        value={totalIncome}
        count={totalIncomeCount}
      />
      {incomeCards}

      <ActivityHeading
        title="Expenses"
        value={totalExpense}
        count={totalExpenseCount}
      />
      {expenseCards}
    </>
  );
};
