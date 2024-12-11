import { GroupBy } from "@/app/client.gen";
import {
  CARD_SIZE_DOUBLE_WIDTH,
  CARD_SIZE_HALF_WIDTH,
  CARD_SIZE_QUADRUPLE_WIDTH,
  CARD_SIZE_SINGLE_WIDTH,
  CARD_SIZE_TRIPLE_WIDTH,
  CONTENT_WIDTH,
} from "@/Components/Configuration/Configuration";
import { ActivityGroup } from "@/Components/Providers/AppStateProvider";
import { useDeviceData } from "@/Components/Providers/DeviceDataProvider";
import { useParams } from "next/navigation";

export const useContenWidth = () => {
  const deviceData = useDeviceData();

  if (deviceData.status !== "LOADED") {
    return CONTENT_WIDTH;
  }

  if (deviceData.value.orientation === "landscape") {
    return CONTENT_WIDTH * 2;
  }

  return CONTENT_WIDTH;
};

// TODO use stylesheets to do this?
export const useRelativeSize = (
  size?: "half" | "single" | "double" | "triple" | "quadruple",
) => {
  const deviceData = useDeviceData();

  if (deviceData.status !== "LOADED") {
    return CARD_SIZE_SINGLE_WIDTH;
  }

  if (deviceData.value.isMobile) {
    if (size === "half") {
      return CARD_SIZE_HALF_WIDTH;
    }

    return CARD_SIZE_SINGLE_WIDTH;
  }

  if (deviceData.value.orientation === "landscape") {
    switch (size) {
      case "half":
        return CARD_SIZE_SINGLE_WIDTH;
      case "single":
        return CARD_SIZE_DOUBLE_WIDTH;
      case "double":
      case "triple":
      case "quadruple":
        return CARD_SIZE_QUADRUPLE_WIDTH;
    }
  }

  switch (size) {
    case "half":
      return CARD_SIZE_HALF_WIDTH;
    case "single":
      return CARD_SIZE_SINGLE_WIDTH;
    case "double":
      return CARD_SIZE_DOUBLE_WIDTH;
    case "triple":
      return CARD_SIZE_TRIPLE_WIDTH;
    case "quadruple":
      return CARD_SIZE_QUADRUPLE_WIDTH;
  }

  return CARD_SIZE_SINGLE_WIDTH;
};

export const getRelativePosition = <T extends {}>(index: number, list: T[]) => {
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

// TODO remove?
export function useRouteParams<T>(): T {
  const params = useParams();

  return params as any as T;
}
