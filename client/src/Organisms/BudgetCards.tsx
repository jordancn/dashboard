import { ScrollMarker } from "@/Atoms/ScrollMarker";
import { DateRange } from "@/GraphQL/client.gen";
import { BudgetCard } from "@/Molecules/BudgetCard";
import _ from "lodash";
import * as React from "react";
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
  return (
    <div className={styles.budgetCards}>
      {/* TODO memoize */}
      {_.orderBy(props.budget, (c) => Math.abs(c.percent), "desc").map(
        (category) => {
          return (
            <ScrollMarker key={category.categoryId}>
              <BudgetCard
                entityId={props.entityId}
                categoryId={category.categoryId}
                categoryName={category.categoryName}
                amount={category.amount}
                budget={category.budget}
                percent={category.percent}
                dateRange={props.dateRange}
              />
            </ScrollMarker>
          );
        },
      )}
    </div>
  );
};
