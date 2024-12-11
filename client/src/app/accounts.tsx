"use client";

import Link from "next/link";
import { useAccountsQuery } from "./client.gen";
import styles from "./accounts.module.css";

const Accounts = () => {
  const results = useAccountsQuery();

  if (results.loading) {
    return <div>Loading...</div>;
  }

  if (results.error) {
    return <div>Error: {results.error.message}</div>;
  }

  if (!results.data) {
    return <div>No data</div>;
  }

  return (
    <div className={styles.accounts}>
      {results.data.accounts.map((account) => {
        return (
          <div key={account.id} className={styles.account}>
            <Link href={`/account/${account.id}`}>
              <div className={styles.accountName}>{account.name}</div>
            </Link>
            <div className={styles.accountBalance}>
              {account.currentBalance}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accounts;
