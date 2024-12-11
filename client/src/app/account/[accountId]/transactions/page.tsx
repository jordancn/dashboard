"use client";

import { useTransactionsQuery } from "@/app/client.gen";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

export default function TransactionsPage() {
  const params = useParams();

  const transactions = useTransactionsQuery({
    variables: {
      accountId: params.accountId as string,
      dateRange: {
        start: "2022-01-01",
        end: "2022-01-31",
      },
    },
  });

  if (transactions.loading) {
    return <div>Loading...</div>;
  }

  if (transactions.error) {
    return <div>Error: {transactions.error.message}</div>;
  }

  if (!transactions.data) {
    return <div>No data</div>;
  }

  if (!transactions.data.account) {
    return <div>No account</div>;
  }

  console.log("params", params);
  return (
    <div>
      <h1>Transactions</h1>

      <div className={styles.transactions}>
        {transactions.data.account.transactions.map((transaction) => {
          return (
            <div key={transaction.id} className={styles.transaction}>
              <div>{transaction.date}</div>
              <div>{transaction.description}</div>
              <div>{transaction.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
