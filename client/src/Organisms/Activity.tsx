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
import {
  shouldSkipEntityQuery,
  shouldSkipOverviewQuery,
  shouldUseOverviewQuery,
} from "@/Molecules/Entity.helpers";
import { TransactionGroupCard } from "@/Molecules/TransactionGroupCard";
import { ActivityGroup, useActivityGroup } from "@/Providers/AppStateProvider";
import { DateIso } from "@/Utils/date-iso";
import {
  getActivitySubGroup,
  getActivitySubGroupBy,
  getRelativePosition,
} from "@/Utils/helpers";
import { hasEntityId, useRouteParams } from "@/Utils/param-helpers";
import _ from "lodash";
import { useMemo } from "react";
import styles from "./Activity.module.css";

const useQuery = (args: {
  entityId?: string;
  start: DateIso;
  end: DateIso;
  activityGroup: ActivityGroup;
}) => {
  const overallResults = useEntityActivityOverviewQuery({
    variables: {
      dateRange: {
        start: args.start,
        end: args.end,
      },
      activityGroupBy: getActivitySubGroupBy(args.activityGroup),
    },
    skip: shouldSkipOverviewQuery(args.entityId),
  });

  const entityResults = useEntityActivityQuery({
    variables: {
      entityId: args.entityId || "",
      dateRange: {
        start: args.start,
        end: args.end,
      },
      activityGroupBy: getActivitySubGroupBy(args.activityGroup),
    },
    skip: shouldSkipEntityQuery(args.entityId),
  });

  if (shouldUseOverviewQuery(args.entityId)) {
    return overallResults;
  }

  return entityResults;
};

export const Activity = ({ start, end }: { start: DateIso; end: DateIso }) => {
  const activityGroup = useActivityGroup();

  const { entityId } = useRouteParams({ entityId: "overview" }, hasEntityId);

  const results = useQuery({
    entityId,
    start,
    end,
    activityGroup: activityGroup,
  });

  const categories = useMemo(() => {
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

  const totalIncome = useMemo(
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

  const totalIncomeCount = useMemo(
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

  const totalExpense = useMemo(
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

  const totalExpenseCount = useMemo(
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

  const incomeCards = useMemo(
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

  const expenseCards = useMemo(
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
