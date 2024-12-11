import { DateIso, formatLongMonth } from "@/Utils/date-iso";
import { getRelativePosition, useRelativeSize } from "@/Utils/helpers";
import _ from "lodash";
import { useCallback } from "react";
import { TransactionGroup } from "../Molecules/TransactionGroupCard";
import styles from "./TransactionGroupCards.module.css";

export const TransactionGroupCards = (props: {
  transactionGroups: Array<{
    id: string;
    count: number;
    total: number;
    start: DateIso;
    end: DateIso;
  }>;
  entityId?: string;
}) => {
  const size = useRelativeSize("single");
  // const navigate = useNavigate();

  const onClick = useCallback(
    (transactionGroup: {
      id: string;
      count: number;
      total: number;
      start: DateIso;
      end: DateIso;
    }) => {
      // console.log('transactionGroupId', transactionGroup);
      // TODO
      // navigate(`/entity/${props.entityId || 'overview'}/insights/transactionGroup/${transactionGroup.start}/${transactionGroup.end}`);
    },
    [],
  );

  return (
    <div
      style={{ width: `${size}px` }}
      className={styles.transactionGroupCards}
    >
      {/* TODO memoize */}
      {_.orderBy(props.transactionGroups, (t) => t.start, "desc").map(
        (transactionGroup, index) => {
          return (
            <TransactionGroup
              key={transactionGroup.id}
              id={transactionGroup.id}
              title={`${formatLongMonth(transactionGroup.start)}`}
              total={transactionGroup.total}
              transactionCount={transactionGroup.count}
              relativePosition={getRelativePosition(
                index,
                props.transactionGroups,
              )}
              onClick={() => onClick(transactionGroup)}
            />
          );
        },
      )}
    </div>
  );
};
