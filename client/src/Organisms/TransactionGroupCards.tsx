import { TransactionGroupCard } from "@/Molecules/TransactionGroupCard";
import { DateIso, formatLongMonth } from "@/Utils/date-iso";
import { getRelativePosition, getWidthClassName } from "@/Utils/helpers";
import classNames from "classnames";
import _ from "lodash";
import { useMemo } from "react";
import styles from "./TransactionGroupCards.module.css";

export const TransactionGroupCards = ({
  transactionGroups: transactionGroupsProp,
  entityId,
}: {
  transactionGroups: Array<{
    id: string;
    count: number;
    total: number;
    start: DateIso;
    end: DateIso;
  }>;
  entityId?: string;
}) => {
  const transactionGroups = useMemo(() => {
    return _.orderBy(transactionGroupsProp, (t) => t.start, "desc").map(
      (transactionGroup, index) => {
        return (
          <TransactionGroupCard
            key={transactionGroup.id}
            id={transactionGroup.id}
            title={`${formatLongMonth(transactionGroup.start)}`}
            total={transactionGroup.total}
            transactionCount={transactionGroup.count}
            relativePosition={getRelativePosition(index, transactionGroupsProp)}
            href={`/entity/${entityId || "overview"}/insights/transactionGroup/${transactionGroup.start}/${transactionGroup.end}`}
          />
        );
      },
    );
  }, [transactionGroupsProp, entityId]);

  return (
    <div
      className={classNames(styles.transactionGroupCards, {
        ...getWidthClassName("full"),
      })}
    >
      {transactionGroups}
    </div>
  );
};
