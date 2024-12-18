import { ScrollMarker } from "@/Atoms/ScrollMarker";
import { CategoryType, DateRange } from "@/GraphQL/client.gen";
import { InsightCard } from "@/Molecules/InsightCard";
import { filterInsights, sortInsights } from "@/Organisms/InsightCards.helpers";
import classNames from "classnames";
import { useMemo } from "react";
import styles from "./InsightCards.module.css";

export const InsightCards = (props: {
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
  const insights = useMemo(() => {
    return sortInsights(filterInsights(props.insights)).map((category) => {
      return (
        <ScrollMarker key={category.id}>
          <InsightCard
            entityId={props.entityId}
            categoryId={category.categoryId}
            categoryName={category.categoryName}
            categoryType={category.categoryType}
            changePercent={category.changePercent}
            currentTotal={category.currentTotal}
            previousTotal={category.previousTotal}
            dateRange={props.dateRange}
          />
        </ScrollMarker>
      );
    });
  }, [props.insights, props.dateRange]);

  return (
    <div
      className={classNames(styles.insightCards, {
        [styles.short]: props.insights.length <= 2,
      })}
    >
      {insights}
      <ScrollMarker fullHeight>
        <div className={styles.scrollMarker}></div>
      </ScrollMarker>
    </div>
  );
};
