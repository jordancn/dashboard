import { Base64Url } from "@/GraphQL/Base64Url";
import { TransactionCard } from "@/Molecules/TransactionCard";
import { DateIso } from "@/Utils/date-iso";
import {
  getRelativePosition,
  getWidthClassName,
  useSize,
} from "@/Utils/helpers";
import classNames from "classnames";
import { useCallback } from "react";
import styles from "./TransactionCards.module.css";

export const TransactionCards = (props: {
  transactions: Array<{
    id: string;
    date: DateIso;
    vendorName: string | undefined;
    categoryName: string | undefined;
    amount: number;
    pending: boolean;
    image?: Base64Url;
  }>;
  entityId?: string;
}) => {
  const size = useSize("single");
  // const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = useCallback((transactionId: string) => {
    // TODO
    // navigate(`/entity/${props.entityId || 'overview'}/insights/transaction/${transactionId}`);
  }, []);

  return (
    <div
      className={classNames(styles.transactionCards, {
        ...getWidthClassName(size),
      })}
    >
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
            entityId={props.entityId}
            pending={transaction.pending}
            image={transaction.image}
          />
        );
      })}
    </div>
  );
};
