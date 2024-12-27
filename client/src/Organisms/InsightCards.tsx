import { ScrollMarker } from "@/Atoms/ScrollMarker";
import { CategoryType, DateRange } from "@/GraphQL/client.gen";
import { InsightCard } from "@/Molecules/InsightCard";
import { filterInsights, sortInsights } from "@/Organisms/InsightCards.helpers";
import classNames from "classnames";
import { useMemo } from "react";
import styles from "./InsightCards.module.css";

export const InsightCards = ({
  entityId,
  insights,
  dateRange,
}: {
  entityId?: string;
  insights: Array<{
    id: string;
    categoryId: string;
    categoryName: string;
    categoryType: CategoryType;
    changePercent: number | null | undefined;
    currentTotal: number;
    previousTotal: number;
  }>;
  dateRange: DateRange;
}) => {
  const insightCards = useMemo(() => {
    return sortInsights(filterInsights(insights)).map((category) => {
      return (
        <ScrollMarker key={category.id}>
          <InsightCard
            entityId={entityId}
            categoryId={category.categoryId}
            categoryName={category.categoryName}
            categoryType={category.categoryType}
            changePercent={category.changePercent}
            currentTotal={category.currentTotal}
            previousTotal={category.previousTotal}
            dateRange={dateRange}
          />
        </ScrollMarker>
      );
    });
  }, [entityId, insights, dateRange]);

  return (
    <div
      className={classNames(styles.insightCards, {
        [styles.short]: insights.length <= 2,
      })}
    >
      {insightCards}
      <ScrollMarker fullHeight>
        <div className={styles.scrollMarker}></div>
      </ScrollMarker>
    </div>
  );
};
