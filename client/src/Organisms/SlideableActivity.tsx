import {
  addDays,
  addMonths,
  addYears,
  getFirstDayOfMonth,
  getFirstDayOfYear,
  getLastDayOfMonth,
  getLastDayOfYear,
  getWeekdayFromIsoDate,
} from "@/Utils/date-iso";

import { ActivityContainer } from "@/Organisms/ActivityContainer";
import { useActivityGroup } from "@/Providers/AppStateProvider";
import { today } from "@/Utils/date-iso";
import React from "react";

export const SlideableActivity = (props: { index: number }) => {
  const activityGroup = useActivityGroup();

  const date = today();

  const dateRange = React.useMemo(() => {
    switch (activityGroup) {
      case "Week": {
        const dayOfWeek = getWeekdayFromIsoDate(date);

        const start = addDays(date, -dayOfWeek + 7 * props.index);
        const end = addDays(date, 6 - dayOfWeek + 7 * props.index);

        return { start, end };
      }
      case "Month": {
        const start = getFirstDayOfMonth(addMonths(date, props.index));
        const end = getLastDayOfMonth(addMonths(date, props.index));

        return { start, end };
      }
      case "Year":
        const start = getFirstDayOfYear(addYears(date, props.index));
        const end = getLastDayOfYear(addYears(date, props.index));

        return { start, end };

      default:
        return;
    }
  }, [activityGroup, date, props.index]);

  if (!dateRange) {
    return null;
  }

  return (
    <ActivityContainer
      index={props.index}
      start={dateRange.start}
      end={dateRange.end}
      type={activityGroup}
    />
  );
};

export const ActivitySlideRenderer = (props: {
  index: number;
  key: number;
}) => {
  return <SlideableActivity key={props.key} index={props.index} />;
};
