import classNames from "classnames";
import styles from "./TransactionAmount.module.css";

export const TransactionAmount = (props: {
  value: number | null | undefined;
  size?: "small" | "large" | "medium";
  formatter: (value: number | null | undefined) => string;
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
      {props.formatter(props.value)}
    </div>
  );
};
