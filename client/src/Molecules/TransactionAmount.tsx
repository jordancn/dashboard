import classNames from "classnames";
import styles from "./TransactionAmount.module.css";

export const TransactionAmount = (props: {
  title: string;
  size?: "small" | "large" | "medium";
}) => {
  const sizeClass = props.size ?? "medium";

  return (
    <div
      className={classNames(styles.transactionAmount, {
        [styles.small]: sizeClass === "small",
        [styles.large]: sizeClass === "large",
        [styles.medium]: sizeClass === "medium",
      })}
    >
      {props.title}
    </div>
  );
};
