import { Base64Url } from "@/GraphQL/Base64Url";
import { TransactionCard } from "@/Molecules/TransactionCard";
import { DateIso } from "@/Utils/date-iso";
import { getRelativePosition, getWidthClassName } from "@/Utils/helpers";
import classNames from "classnames";
import { useMemo } from "react";
import styles from "./TransactionCards.module.css";

export const TransactionCards = ({
  transactions: transactionsProp,
  entityId,
}: {
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
  const transactionCards = useMemo(
    () =>
      transactionsProp.map((transaction, index) => {
        return (
          <TransactionCard
            relativePosition={getRelativePosition(index, transactionsProp)}
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
    [entityId, transactionsProp],
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
