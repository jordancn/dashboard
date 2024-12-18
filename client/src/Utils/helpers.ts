"use client";

import { GroupBy } from "@/GraphQL/client.gen";
import { ActivityGroup } from "@/Providers/AppStateProvider";
import { useParams } from "next/navigation";

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
    case "WeekDay":
      return GroupBy.WeekDay;
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
    case "WeekDay":
      return GroupBy.WeekDay;
    case "Week":
      return GroupBy.WeekDay;
    case "Month":
      return GroupBy.Week;
    case "Year":
      return GroupBy.Month;
  }
};

export const getActivitySubGroup = (
  activityGroup: ActivityGroup,
): ActivityGroup => {
  switch (activityGroup) {
    case "WeekDay":
      return "WeekDay";
    case "Week":
      return "WeekDay";
    case "Month":
      return "Week";
    case "Year":
      return "Month";
  }
};

export function useRouteParams<T>(
  assertIsFn: (params: unknown) => asserts params is T,
  defaultParams?: T,
): T {
  const actualParams = useParams();

  const params =
    actualParams && Object.keys(actualParams).length > 0
      ? actualParams
      : defaultParams;

  assertIsFn(params);

  return params;
}
