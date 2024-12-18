import { ScrollMarker } from "@/Atoms/ScrollMarker";
import { DateRange } from "@/GraphQL/client.gen";
import { BudgetCard } from "@/Molecules/BudgetCard";
import _ from "lodash";
import { useMemo } from "react";
import styles from "./BudgetCards.module.css";

export const BudgetCards = (props: {
  entityId?: string;
  budget: Array<{
    id: string;
    categoryId: string;
    categoryName: string;
    budget: number | undefined;
    amount: number;
    percent: number;
  }>;
  dateRange: DateRange;
}) => {
  const { entityId, budget, dateRange } = props;

  const bugdetCards = useMemo(() => {
    return _.orderBy(budget, (c) => Math.abs(c.percent), "desc").map(
      (category) => {
        return (
          <ScrollMarker key={category.categoryId}>
            <BudgetCard
              entityId={entityId}
              categoryId={category.categoryId}
              categoryName={category.categoryName}
              amount={category.amount}
              budget={category.budget}
              percent={category.percent}
              dateRange={dateRange}
            />
          </ScrollMarker>
        );
      },
    );
  }, [entityId, budget, dateRange]);

  return (
    <div className={styles.budgetCards}>
      {bugdetCards}
      <ScrollMarker fullHeight>
        <div className={styles.scrollMarker}></div>
      </ScrollMarker>
    </div>
  );
};
