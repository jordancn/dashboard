import {
  getActivityGraphHeight,
  getActivityGraphX,
  getActivityGraphY,
} from "@/Molecules/ActivityGraph.helpers";
import { ActivityGroup } from "@/Providers/AppStateProvider";
import { DateIso } from "@/Utils/date-iso";
import { useMemo } from "react";
import styles from "./ActivityGraph.module.css";

export const ActivityGraph = (props: {
  activityGroup: ActivityGroup;
  groupIndex: number;
  incomePercentage: number;
  expensePercentage: number;
  start: DateIso;
  end: DateIso;
  size: "half" | "full";
}) => {
  const barDimensions = useMemo(() => {
    if (props.size === "half") {
      return {
        width: 5,
        height: 35,
      };
    }

    return {
      width: 10,
      height: 100,
    };
  }, [props.size]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={barDimensions.width * 2}
      height={barDimensions.height}
      viewBox={`0 0 ${barDimensions.width * 2} ${barDimensions.height}`}
    >
      <g>
        <rect
          width={barDimensions.width * 2}
          height={barDimensions.height}
          rx="2"
          transform={`translate(${getActivityGraphX(barDimensions.width, "background")} ${getActivityGraphY(barDimensions.height, 1)} )`}
          className={styles.background}
        />
        <rect
          width={barDimensions.width}
          height={`${getActivityGraphHeight(barDimensions.height, props.incomePercentage)}`}
          rx="2"
          transform={`translate(${getActivityGraphX(barDimensions.width, "income")} ${getActivityGraphY(barDimensions.height, props.incomePercentage)} )`}
          className={styles.income}
        />
        <rect
          width={barDimensions.width}
          height={`${getActivityGraphHeight(barDimensions.height, props.expensePercentage)}`}
          rx="2"
          transform={`translate(${getActivityGraphX(barDimensions.width, "expense")} ${getActivityGraphY(barDimensions.height, props.expensePercentage)} )`}
          className={styles.expense}
        />
      </g>
    </svg>
  );
};
