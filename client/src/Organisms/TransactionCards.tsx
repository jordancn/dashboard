import { Base64Url } from "@/GraphQL/Base64Url";
import { TransactionCard } from "@/Molecules/TransactionCard";
import { DateIso } from "@/Utils/date-iso";
import { getRelativePosition, getWidthClassName } from "@/Utils/helpers";
import classNames from "classnames";
import { useMemo } from "react";
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
  const { entityId, transactions } = props;

  const transactionCards = useMemo(
    () =>
      transactions.map((transaction, index) => {
        return (
          <TransactionCard
            relativePosition={getRelativePosition(index, transactions)}
            key={transaction.id}
            categoryName={transaction.categoryName}
            date={transaction.date}
            id={transaction.id}
            vendorName={transaction.vendorName}
            amount={transaction.amount}
            entityId={entityId}
            pending={transaction.pending}
            image={transaction.image}
          />
        );
      }),
    [entityId, transactions],
  );

  return (
    <div
      className={classNames(styles.transactionCards, {
        ...getWidthClassName("full"),
      })}
    >
      {transactionCards}
    </div>
  );
};
