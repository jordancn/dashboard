"use client";

import { GroupBy } from "@/GraphQL/client.gen";
import { ActivityGroup } from "@/Providers/AppStateProvider";
import {
  addDays,
  addMonths,
  addYears,
  DateIso,
  toMonthAndYear,
  toYear,
} from "@/Utils/date-iso";

import { toShortMonthAndDate } from "@/Utils/date-iso";

export const getWidthClassName = (size?: "full" | "half" | "quarter") => {
  if (!size) {
    return {};
  }

  switch (size) {
    case "half":
      return {
        halfWidth: true,
      };
    case "quarter":
      return {
        quarterWidth: true,
      };
    case "full":
      return {
        fullWidth: true,
      };
  }
};

export const getRelativePosition = <T>(index: number, list: T[]) => {
  if (list.length === 1) {
    return "single";
  }

  return index === 0 ? "start" : index === list.length - 1 ? "end" : "middle";
};

export const getActivityGroupBy = (activityGroup: ActivityGroup): GroupBy => {
  switch (activityGroup) {
    case "Weekday":
      return GroupBy.Weekday;
    case "Week":
      return GroupBy.Week;
    case "Month":
      return GroupBy.Month;
    case "Year":
      return GroupBy.Year;
  }
};

export const getActivitySubGroupBy = (
  activityGroup: ActivityGroup,
): GroupBy => {
  switch (activityGroup) {
    case "Weekday":
      return GroupBy.Weekday;
    case "Week":
      return GroupBy.Weekday;
    case "Month":
      return GroupBy.Week;
    case "Year":
      return GroupBy.Month;
  }
};

export const getActivityParentGroup = (
  activityGroup: ActivityGroup,
): ActivityGroup => {
  switch (activityGroup) {
    case "Weekday":
      return "Week";
    case "Week":
      return "Month";
    case "Month":
      return "Year";
    case "Year":
      return "Year";
  }
};

export const getActivitySubGroup = (
  activityGroup: ActivityGroup,
): ActivityGroup => {
  switch (activityGroup) {
    case "Weekday":
      return "Weekday";
    case "Week":
      return "Weekday";
    case "Month":
      return "Week";
    case "Year":
      return "Month";
  }
};

export const getActivityGroupDate = (args: {
  activityGroup: ActivityGroup;
  start: DateIso;
  groupIndex: number;
}) => {
  switch (args.activityGroup) {
    case "Weekday":
      return addDays(args.start, args.groupIndex);
    case "Week":
      return addDays(args.start, args.groupIndex * 7);
    case "Month":
      return addMonths(args.start, args.groupIndex);
    case "Year":
      return addYears(args.start, args.groupIndex);
  }
};

export const getActivityGroupName = (args: {
  activityGroup: ActivityGroup;
  start: DateIso;
  end: DateIso;
}) => {
  const title =
    args.activityGroup === "Month"
      ? toMonthAndYear(args.start)
      : args.activityGroup === "Year"
        ? toYear(args.start)
        : `${toShortMonthAndDate(args.start)} – ${toShortMonthAndDate(args.end)}`;

  return title;
};
