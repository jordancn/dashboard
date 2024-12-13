import { Caption1 } from "@/Atoms/Caption1";
import { Subheadline } from "@/Atoms/Subheadline";
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
import _ from "lodash";
import * as React from "react";
import styles from "./EntityInsightActivityCard.module.css";

export const EntityInsightActivityCard = (props: {
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
  size?: "half" | "single";
}) => {
  const maxActivity =
    _.max([
      ...props.activity.map((activity) => activity.totalIncome),
      ...props.activity.map((activity) => activity.totalExpenses),
    ]) || 1;

  const activity = props.activity.map((act) => ({
    ...act,
    incomePercentage: (act.totalIncome * 1.0) / maxActivity,
    expensePercentage: (act.totalExpenses * 1.0) / maxActivity,
  }));

  const getLabel = React.useCallback(
    (start: DateIso, end: DateIso) => {
      switch (props.activityGroup) {
        case "WeekDay":
          return `${toDayOfWeek(start)}`;
        case "Week": {
          if (props.size !== "single") {
            return `${getDayFromIsoDate(start)}`;
          }
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
    [props.activityGroup, props.size],
  );

  return (
    <Card
      size={props.size || "half"}
      href={`/entity/${props.entityId}/insights/activity/${props.activityGroup}`}
    >
      <CardContents>
        <div className={styles.cardContents}>
          {props.size !== "single" && (
            <Subheadline title={`${props.activityGroup}ly Activity`} />
          )}
          <div className={styles.activityContainer}>
            {activity.map((act) => {
              return (
                <div key={act.groupIndex} className={styles.activity}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="35"
                      viewBox="0 0 10 35"
                    >
                      <g transform="translate(-204 -136)">
                        <g>
                          <rect
                            width="10"
                            height="35"
                            rx="2"
                            transform="translate(204 136)"
                            fill="#f4f4f5"
                          />
                          <rect
                            width="5"
                            height={`${35 * act.incomePercentage}`}
                            rx="2"
                            transform={`translate(204 ${136 + 35 - 35 * act.incomePercentage} )`}
                            fill="#1ED555"
                          />
                          <rect
                            id="Rectangle_141"
                            data-name="Rectangle 141"
                            width="5"
                            height={`${35 * act.expensePercentage}`}
                            rx="2"
                            transform={`translate(209 ${136 + 35 - 35 * act.expensePercentage} )`}
                            fill="#3478f6"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <Caption1 title={getLabel(act.start, act.end)} />
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
