import { Caption1 } from "@/Atoms/Caption1";
import { ActivityGraph } from "@/Molecules/ActivityGraph";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { ActivityGroup } from "@/Providers/AppStateProvider";
import {
  DateIso,
  getDayFromIsoDate,
  toDayOfWeek,
  toShortMonth,
  toYear,
} from "@/Utils/date-iso";
import {
  getActivityGroupDate,
  getActivityGroupName,
  getActivityParentGroup,
} from "@/Utils/helpers";
import _ from "lodash";
import React from "react";
import styles from "./ActivityCard.module.css";

export const ActivityCard = (props: {
  entityId?: string;
  activityGroup: ActivityGroup;
  activity: Array<{
    groupIndex: number;
    start: DateIso;
    end: DateIso;
    value: number;
    totalIncome: number;
    totalExpenses: number;
  }>;
  size?: "half" | "full";
}) => {
  const maxActivity = React.useMemo(() => {
    return (
      _.max([
        ...props.activity.map((activity) => activity.totalIncome),
        ...props.activity.map((activity) => activity.totalExpenses),
      ]) || 1
    );
  }, [props.activity]);

  const activity = React.useMemo(() => {
    return props.activity.map((act) => ({
      ...act,
      incomePercentage: (act.totalIncome * 1.0) / maxActivity,
      expensePercentage: (act.totalExpenses * 1.0) / maxActivity,
    }));
  }, [props.activity, maxActivity]);

  const getLabel = React.useCallback(
    (start: DateIso, end: DateIso, groupIndex: number) => {
      switch (props.activityGroup) {
        case "Weekday":
          return toDayOfWeek(
            getActivityGroupDate({
              activityGroup: props.activityGroup,
              start,
              groupIndex,
            }),
          );
        case "Week": {
          return `${getDayFromIsoDate(start)}–${getDayFromIsoDate(end)}`;
        }
        case "Month":
          return toShortMonth(start);
        case "Year":
          return toYear(start);
        default:
          throw new Error("Invalid ActivityGroup");
      }
    },
    [props.activityGroup],
  );

  if (!props.activity || props.activity.length === 0) {
    return null;
  }

  const title = getActivityGroupName({
    activityGroup: getActivityParentGroup(props.activityGroup),
    start: props.activity[0].start,
    end: props.activity[props.activity.length - 1].end,
  });

  return (
    <Card
      size={props.size ?? "half"}
      href={`/entity/${props.entityId}/activity/${props.activityGroup}`}
    >
      <CardContents>
        <div className={styles.cardContents}>
          {props.size === "half" && (
            <Caption1 title={title} ordinal="Secondary" />
          )}

          {props.size === "full" && (
            <Caption1 title="Total Income/Expenses" ordinal="Secondary" />
          )}

          <div className={styles.activityContainer}>
            {activity.map((act) => {
              return (
                <div key={act.groupIndex} className={styles.activity}>
                  <div>
                    <ActivityGraph
                      size={props.size ?? "half"}
                      key={act.groupIndex}
                      activityGroup={props.activityGroup}
                      groupIndex={act.groupIndex}
                      incomePercentage={act.incomePercentage}
                      expensePercentage={act.expensePercentage}
                      start={act.start}
                      end={act.end}
                    />
                  </div>
                  <div>
                    <Caption1
                      title={getLabel(act.start, act.end, act.groupIndex)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
