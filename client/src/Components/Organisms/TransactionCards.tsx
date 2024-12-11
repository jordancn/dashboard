import { Base64Url } from "@/app/Base64Url";
import { getRelativePosition, useRelativeSize } from "@/Utils/helpers";
import { useCallback } from "react";
import { TransactionCard } from "../Molecules/TransactionCard";
import styles from "./TransactionCards.module.css";

export const TransactionCards = (props: {
  transactions: Array<{
    id: string;
    date: any;
    vendorName: string | undefined;
    categoryName: string | undefined;
    amount: number;
    pending: boolean;
    image?: Base64Url;
  }>;
  entityId?: string;
}) => {
  const size = useRelativeSize("single");
  // const navigate = useNavigate();

  const onClick = useCallback((transactionId: string) => {
    // TODO
    // navigate(`/entity/${props.entityId || 'overview'}/insights/transaction/${transactionId}`);
  }, []);

  return (
    <div style={{ width: `${size}px` }} className={styles.transactionCards}>
      {/* TODO memoize */}
      {props.transactions.map((transaction, index) => {
        return (
          <TransactionCard
            relativePosition={getRelativePosition(index, props.transactions)}
            key={transaction.id}
            categoryName={transaction.categoryName}
            date={transaction.date}
            id={transaction.id}
            vendorName={transaction.vendorName}
            amount={transaction.amount}
            onClick={() => onClick(transaction.id)}
            pending={transaction.pending}
            image={transaction.image}
          />
        );
      })}
    </div>
  );
};
