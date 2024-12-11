import styles from "./TransactionAmount.module.css";

export const TransactionAmount = (props: { title: string }) => {
  return <div className={styles.transactionAmount}>{props.title}</div>;
};
