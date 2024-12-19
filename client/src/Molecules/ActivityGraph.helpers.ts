export const getActivityGraphHeight = (
  barHeight: number,
  percentage: number,
) => {
  return barHeight * percentage;
};

export const getActivityGraphX = (
  barWidth: number,
  type: "background" | "income" | "expense",
) => {
  if (type === "background") {
    return 0;
  }

  if (type === "income") {
    return 0;
  }

  return barWidth;
};

export const getActivityGraphY = (barHeight: number, percentage: number) => {
  return barHeight - barHeight * percentage;
};
