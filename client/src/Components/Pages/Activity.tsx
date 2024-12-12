import {
  CategoryType,
  useEntityActivityOverviewQuery,
  useEntityActivityQuery,
} from "@/app/client.gen";
import {
  DateIso,
  toMonthAndYear,
  toShortMonthAndDate,
  toYear,
} from "@/Utils/date-iso";
import { formatCurrency } from "@/Utils/formatters";
import {
  getActivityGroupBy,
  getActivitySubGroup,
  getRelativePosition,
  useRelativeSize,
  useRouteParams,
} from "@/Utils/helpers";
import _ from "lodash";
import React from "react";
import { Caption1 } from "../Atoms/Caption1";
import { Empty } from "../Atoms/Empty";
import { Spinner } from "../Atoms/Spinner";
import { Subheadline } from "../Atoms/Subheadline";
import { Title } from "../Atoms/Title";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import { CardTitle } from "../Molecules/CardTitle";
import { EntityInsightActivityCard } from "../Molecules/EntityInsightActivityCard";
import { NavigationBar } from "../Molecules/NavigationBar";
import { Selector } from "../Molecules/Selector";
import {
  ActivityGroup,
  useActivityGroup,
  useSetActivityGroup,
  useSetGroupIndex,
} from "../Providers/AppStateProvider";
import { ContentScrollable } from "../Templates/Content";
import styles from "./Activity.module.css";
import { TransactionGroup } from "./TransactionGroup";

// const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

// const styles = {
//   root: {
//     // paddingLeft: '16px',
//     // paddingRight: '16px',
//   },
//   slideContainer: {
//     // paddingLeft: '8px',
//     // paddingRight: '8px',
//   },
// };

export const TestActivityContainer = (props: {
  index: number;
  type: ActivityGroup;
  start: DateIso;
  end: DateIso;
}) => {
  const size = useRelativeSize("single");
  const activityGroup = useActivityGroup();

  const title =
    activityGroup === "Month"
      ? toMonthAndYear(props.start)
      : activityGroup === "Year"
        ? toYear(props.start)
        : `${toShortMonthAndDate(props.start)} – ${toShortMonthAndDate(props.end)}`;

  return (
    <div
      style={{ width: `${size}px` }}
      className={styles.testActivityContainer}
    >
      <div className={styles.titleContainer}>
        <Title title={title} />
      </div>

      <TestActivity
        end={props.end}
        index={props.index}
        start={props.start}
        type={activityGroup}
      />
    </div>
  );
};

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
      activityGroupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: !isEntity,
  });

  const overallResults = useEntityActivityOverviewQuery({
    variables: {
      dateRange: {
        start: args.start,
        end: args.end,
      },
      activityGroupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

export const TestActivity = (props: {
  index: number;
  type: ActivityGroup;
  start: DateIso;
  end: DateIso;
}) => {
  const size = useRelativeSize("single");
  const activityGroup = useActivityGroup();

  // const navigate = useNavigate();

  const params = useRouteParams<{ entityId?: string | "overview" }>();

  // const dateRange = {
  //   start: props.start,
  //   end: props.end,
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = React.useCallback((categoryId: string) => {
    // TODO
    // navigate(
    //   `/entity/${params.entityId || "overview"}/insights/category/${categoryId}/${dateRange.start}/${dateRange.end}`,
    // );
  }, []);

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
      <Empty>
        <div>
          <Card size="single">
            <CardTitle />
            <CardContents variant="transparent">
              <div className={styles.testActivityLoadingContainer}>
                <Spinner />
              </div>
            </CardContents>
          </Card>
        </div>
      </Empty>
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
    <Empty>
      <div>
        <EntityInsightActivityCard
          size="single"
          entityId={params.entityId}
          activity={activity}
          activityGroup={getActivitySubGroup(activityGroup)}
        />

        <Card size="single">
          <CardTitle />
          <CardContents variant="transparent">
            <div className={styles.testActivityIncomeContainer}>
              <div className={styles.testActivityIncomeTextContainer}>
                <div className={styles.testActivityIncomeText}>
                  <Subheadline title="Income" />
                </div>
              </div>
              <div className={styles.testActivityIncomeValueContainer}>
                <div>{formatCurrency.format(totalIncome || 0)}</div>
                <div>
                  <Caption1
                    title={`${totalIncomeCount || 0} transactions`}
                    color="Secondary"
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
            <TransactionGroup
              relativePosition={getRelativePosition(index, list)}
              key={category.categoryId}
              title={category.name}
              id={category.categoryId}
              total={category.total}
              transactionCount={category.count}
              onClick={() => onClick(category.categoryId)}
            />
          );
        })}
      </div>

      {/* subtitle='Show Merchants' /> */}

      <div
        style={{ width: `${size}px` }}
        className={styles.testContainerExpenses}
      >
        <Card size="single">
          <CardTitle />
          <CardContents variant="transparent">
            <div className={styles.testActivityExpenseContainer}>
              <div className={styles.testActivityExpenseTextContainer}>
                <div className={styles.testActivityExpenseText}>
                  <Subheadline title="Expenses" />
                </div>
              </div>
              <div className={styles.testActivityExpenseValueContainer}>
                <div>{formatCurrency.format(totalExpense || 0)}</div>
                <div>
                  <Caption1
                    title={`${totalExpenseCount || 0} transactions`}
                    color="Secondary"
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
            <TransactionGroup
              relativePosition={getRelativePosition(index, list)}
              key={category.categoryId}
              title={category.name}
              id={category.categoryId}
              total={category.total}
              transactionCount={category.count}
              onClick={() => onClick(category.categoryId)}
            />
          );
        })}
      </div>
    </Empty>
  );
};

export const Activity = () => {
  // const params = useRouteParams<{
  //   entityId?: string | "overview";
  //   groupType: string;
  //   start?: string;
  // }>();
  const activityGroup = useActivityGroup();
  const setActivityGroup = useSetActivityGroup();
  // const navigate = useNavigate();
  // const groupIndex = useGroupIndex();
  const setGroupIndex = useSetGroupIndex();

  const options = React.useMemo(() => {
    return [
      {
        label: "Week",
        onClick: () => {
          setActivityGroup("Week");
          setGroupIndex(0);

          // TODO
          // navigate(`/entity/${params.entityId || "overview"}/activity/Week#1`);
        },
      },
      {
        label: "Month",
        onClick: () => {
          setActivityGroup("Month");
          setGroupIndex(0);

          // TODO
          // navigate(`/entity/${params.entityId || "overview"}/activity/Month#1`);
        },
      },
      {
        label: "Year",
        onClick: () => {
          setActivityGroup("Year");
          setGroupIndex(0);

          // TODO
          // navigate(`/entity/${params.entityId || "overview"}/activity/Year#1`);
        },
      },
    ];
  }, []);

  return (
    <Empty>
      <NavigationBar>
        <Selector
          size="half"
          options={options}
          selectedOptionLabel={activityGroup}
        />
      </NavigationBar>
      <ContentScrollable type="wrap-cards" fullHeight fullWidth navigationBar>
        {/* <VirtualizeSwipeableViews
          style={styles.root}
          slideStyle={styles.slideContainer}
          overscanSlideBefore={1}
          overscanSlideAfter={1}
          index={groupIndex}
          onChangeIndex={setGroupIndex}
          slideRenderer={slideRenderer}
        /> */}
      </ContentScrollable>
    </Empty>
  );
};

// const Thing = (props: { index: number }) => {
//   const activityGroup = useActivityGroup();

//   const date = today();

//   const dateRange = React.useMemo(() => {
//     switch (activityGroup) {
//       case "Week": {
//         const dayOfWeek = getWeekDayFromIsoDate(date);

//         const start = addDays(date, -dayOfWeek + 7 * props.index);
//         const end = addDays(date, 6 - dayOfWeek + 7 * props.index);

//         return { start, end };
//       }
//       case "Month": {
//         const start = getFirstDayOfMonth(addMonths(date, props.index));
//         const end = getLastDayOfMonth(addMonths(date, props.index));

//         return { start, end };
//       }
//       case "Year":
//         const start = getFirstDayOfYear(addYears(date, props.index));
//         const end = getLastDayOfYear(addYears(date, props.index));

//         return { start, end };

//       default:
//         return;
//     }
//   }, [activityGroup]);

//   if (!dateRange) {
//     return null;
//   }

//   return (
//     <TestActivityContainer
//       index={props.index}
//       start={dateRange.start}
//       end={dateRange.end}
//       type={activityGroup}
//     />
//   );
// };

// function slideRenderer(params: { index: number; key: number }) {
//   return <Thing key={params.key} index={params.index} />;
// }
