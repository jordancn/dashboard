import { ScrollMarker } from "@/Atoms/ScrollMarker";
import { CategoryType, DateRange } from "@/GraphQL/client.gen";
import { InsightCard } from "@/Molecules/InsightCard";
import { useSize } from "@/Utils/helpers";
import classNames from "classnames";
import _ from "lodash";
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
  const width = useSize("single");

  return (
    <div
      style={{ width: `${width}px` }}
      className={classNames(styles.insightCards, {
        [styles.short]: props.insights.length <= 2,
      })}
    >
      {/* TODO memoize */}
      {_.orderBy(
        props.insights,
        [
          (c) => Math.abs(c.currentTotal - c.previousTotal),
          (c) => Math.abs(c.changePercent || 0),
          (c) => Math.abs(c.currentTotal),
        ],
        ["desc", "desc", "desc"],
      ).map((category) => {
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
      })}
      <ScrollMarker fullHeight>
        <div className={styles.scrollMarker}></div>
      </ScrollMarker>
    </div>
  );
};
