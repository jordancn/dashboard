"use client";

import { GroupBy } from "@/GraphQL/client.gen";
import { ActivityGroup } from "@/Providers/AppStateProvider";
import { useDeviceData } from "@/Providers/DeviceDataProvider";
import { useParams } from "next/navigation";

export const useSize = (
  size?: "half" | "single" | "double" | "triple" | "quadruple",
) => {
  const deviceData = useDeviceData();

  if (deviceData.status !== "LOADED") {
    return "single";
  }

  if (deviceData.value.isMobile) {
    if (size === "half") {
      return "half";
    }

    return "single";
  }

  if (deviceData.value.orientation === "landscape") {
    switch (size) {
      case "half":
        return "single";
      case "single":
        return "double";
      case "double":
      case "triple":
      case "quadruple":
        return "quadruple";
    }
  }

  switch (size) {
    case "half":
      return "half";
    case "single":
      return "single";
    case "double":
      return "double";
    case "triple":
      return "triple";
    case "quadruple":
      return "quadruple";
  }

  return "single";
};

export const getWidthClassName = (
  size: "half" | "single" | "double" | "triple" | "quadruple",
) => {
  switch (size) {
    case "half":
      return {
        halfWidth: true,
      };
    case "single":
      return {
        singleWidth: true,
      };
    case "double":
      return {
        singleWidth: false,
      };
    case "triple":
      return {
        tripleWidth: true,
      };
    case "quadruple":
      return {
        quadrupleWidth: true,
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
