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

export const SlideableActivity = ({ index }: { index: number }) => {
  const activityGroup = useActivityGroup();

  const date = today();

  const dateRange = React.useMemo(() => {
    switch (activityGroup) {
      case "Week": {
        const dayOfWeek = getWeekdayFromIsoDate(date);

        const start = addDays(date, -dayOfWeek + 7 * index);
        const end = addDays(date, 6 - dayOfWeek + 7 * index);

        return { start, end };
      }
      case "Month": {
        const start = getFirstDayOfMonth(addMonths(date, index));
        const end = getLastDayOfMonth(addMonths(date, index));

        return { start, end };
      }
      case "Year":
        const start = getFirstDayOfYear(addYears(date, index));
        const end = getLastDayOfYear(addYears(date, index));

        return { start, end };

      default:
        return;
    }
  }, [activityGroup, date, index]);

  if (!dateRange) {
    return null;
  }

  return (
    <ActivityContainer
      index={index}
      start={dateRange.start}
      end={dateRange.end}
    />
  );
};

export const ActivitySlideRenderer = ({
  index,
  key,
}: {
  index: number;
  key: number;
}) => {
  return <SlideableActivity key={key} index={index} />;
};
