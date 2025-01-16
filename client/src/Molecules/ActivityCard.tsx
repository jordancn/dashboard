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
import { useCallback, useMemo } from "react";
import styles from "./ActivityCard.module.css";

export const ActivityCard = ({
  entityId,
  activityGroup,
  activity: activityProp,
  size,
}: {
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
  const maxActivity = useMemo(() => {
    return (
      _.max([
        ...activityProp.map((activity) => activity.totalIncome),
        ...activityProp.map((activity) => activity.totalExpenses),
      ]) || 1
    );
  }, [activityProp]);

  const activity = useMemo(() => {
    return activityProp.map((act) => ({
      ...act,
      incomePercentage: (act.totalIncome * 1.0) / maxActivity,
      expensePercentage: (act.totalExpenses * 1.0) / maxActivity,
    }));
  }, [activityProp, maxActivity]);

  const getLabel = useCallback(
    (start: DateIso, end: DateIso, groupIndex: number) => {
      switch (activityGroup) {
        case "Weekday":
          return toDayOfWeek(
            getActivityGroupDate({
              activityGroup,
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
    [activityGroup],
  );

  if (!activity || activity.length === 0) {
    return null;
  }

  const title = getActivityGroupName({
    activityGroup: getActivityParentGroup(activityGroup),
    start: activity[0].start,
    end: activity[activity.length - 1].end,
  });

  return (
    <Card
      size={size ?? "half"}
      href={`/entity/${entityId}/activity/${activityGroup}`}
    >
      <CardContents>
        <div className={styles.cardContents}>
          {size === "half" && <Caption1 title={title} ordinal="Secondary" />}

          {size === "full" && (
            <Caption1 title="Total Income/Expenses" ordinal="Secondary" />
          )}

          <div className={styles.activityContainer}>
            {activity.map((act) => {
              return (
                <div key={act.groupIndex} className={styles.activity}>
                  <div>
                    <ActivityGraph
                      size={size ?? "half"}
                      key={act.groupIndex}
                      incomePercentage={act.incomePercentage}
                      expensePercentage={act.expensePercentage}
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

export default ActivityCard;
