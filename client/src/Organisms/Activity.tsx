import { Caption1 } from "@/Atoms/Caption1";
import { Spinner } from "@/Atoms/Spinner";
import { Subheadline } from "@/Atoms/Subheadline";
import {
  CategoryType,
  useEntityActivityOverviewQuery,
  useEntityActivityQuery,
} from "@/GraphQL/client.gen";
import { ActivityCard } from "@/Molecules/ActivityCard";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { TransactionGroupCard } from "@/Molecules/TransactionGroupCard";
import { ActivityGroup, useActivityGroup } from "@/Providers/AppStateProvider";
import { DateIso } from "@/Utils/date-iso";
import { formatCurrency } from "@/Utils/formatters";
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

export const Activity = (props: {
  index: number;
  type: ActivityGroup;
  start: DateIso;
  end: DateIso;
}) => {
  const activityGroup = useActivityGroup();

  const params = useRouteParams(assertIsEntityParams);

  const results = useQuery({
    entityId: params.entityId,
    start: props.start,
    end: props.end,
    activityGroup: props.type,
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

  if (results.loading) {
    return (
      <>
        <div>
          <Card size="full">
            <CardTitle />
            <CardContents variant="transparent">
              <div className={styles.loading}>
                <Spinner />
              </div>
            </CardContents>
          </Card>
        </div>
      </>
    );
  }

  const totalIncome = _.sum(
    (categories || [])
      .filter(
        (category) =>
          category.total !== 0 && category.categoryType === CategoryType.Income,
      )
      .map((category) => category.total),
  );
  const totalIncomeCount = _.sum(
    (categories || [])
      .filter(
        (category) =>
          category.total !== 0 && category.categoryType === CategoryType.Income,
      )
      .map((category) => category.count),
  );

  const totalExpense = _.sum(
    (categories || [])
      .filter(
        (category) =>
          category.total !== 0 &&
          category.categoryType === CategoryType.Expense,
      )
      .map((category) => category.total),
  );
  const totalExpenseCount = _.sum(
    (categories || [])
      .filter(
        (category) =>
          category.total !== 0 &&
          category.categoryType === CategoryType.Expense,
      )
      .map((category) => category.count),
  );

  return (
    <>
      <ActivityCard
        entityId={params.entityId}
        activity={activity}
        activityGroup={getActivitySubGroup(activityGroup)}
        size="full"
      />

      <Card size="full">
        <CardTitle />
        <CardContents variant="transparent">
          <div className={styles.sectionContainer}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <Subheadline title="Income" />
              </div>
            </div>
            <div className={styles.sectionValueAndCount}>
              <div>{formatCurrency.format(totalIncome || 0)}</div>
              <div>
                <Caption1
                  title={`${totalIncomeCount || 0} transactions`}
                  ordinal="Secondary"
                />
              </div>
            </div>
          </div>
        </CardContents>
      </Card>

      {_.orderBy(
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
            href={`/entity/${params.entityId || "overview"}/activity/${props.type}/${category.categoryId}/${props.start}/${props.end}`}
          />
        );
      })}

      {/* subtitle='Show Merchants' /> */}

      <Card size="full">
        <CardTitle />
        <CardContents variant="transparent">
          <div className={styles.sectionContainer}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <Subheadline title="Expenses" />
              </div>
            </div>
            <div className={styles.sectionValueAndCount}>
              <div>{formatCurrency.format(totalExpense || 0)}</div>
              <div>
                <Caption1
                  title={`${totalExpenseCount || 0} transactions`}
                  ordinal="Secondary"
                />
              </div>
            </div>
          </div>
        </CardContents>
      </Card>

      {_.orderBy(
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
            href={`/entity/${params.entityId || "overview"}/activity/${props.type}/${category.categoryId}/${props.start}/${props.end}`}
          />
        );
      })}
    </>
  );
};
