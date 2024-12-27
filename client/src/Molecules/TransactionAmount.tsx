import classNames from "classnames";
import styles from "./TransactionAmount.module.css";

export const TransactionAmount = ({
  value,
  size,
  formatter,
}: {
  value: number | null | undefined;
  size?: "small" | "large" | "medium";
  formatter: (value: number | null | undefined) => string;
}) => {
  const sizeClass = size ?? "medium";

  return (
    <div
      className={classNames(styles.transactionAmount, {
        [styles.small]: sizeClass === "small",
        [styles.large]: sizeClass === "large",
        [styles.medium]: sizeClass === "medium",
      })}
    >
      {formatter(value)}
    </div>
  );
};
