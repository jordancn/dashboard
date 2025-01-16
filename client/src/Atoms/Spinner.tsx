import classNames from "classnames";
import styles from "./Spinner.module.css";

export const Spinner = ({ size }: { size?: "small" | "medium" | "large" }) => {
  return (
    <>
      <div
        className={classNames(styles.spinner, {
          [styles.small]: size === "small",
          [styles.medium]: size === "medium",
          [styles.large]: size === "large" || !size,
        })}
      />
    </>
  );
};
