import _ from "lodash";

export const filterInsights = <
  T extends {
    currentTotal: number;
    previousTotal: number;
    changePercent: number | null | undefined;
  },
>(
  insights: T[],
) => {
  return insights
    .filter((insight) => insight.currentTotal !== 0)
    .filter((insight) => insight.previousTotal !== 0)
    .filter(
      (insight) =>
        insight.changePercent !== null &&
        insight.changePercent !== undefined &&
        insight.changePercent !== 0,
    );
};

export const sortInsights = <
  T extends {
    currentTotal: number;
    previousTotal: number;
    changePercent: number | null | undefined;
  },
>(
  insights: T[],
) => {
  return _.orderBy(
    insights,
    [
      (insight) => Math.abs(insight.currentTotal - insight.previousTotal),
      (insight) => Math.abs(insight.changePercent || 0),
      (insight) => Math.abs(insight.currentTotal),
    ],
    ["desc", "desc", "desc"],
  );
};
