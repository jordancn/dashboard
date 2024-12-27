import classNames from "classnames";
import styles from "./NoChangeIndicator.module.css";

export const NoChangeIndicator = ({
  size,
  desaturated,
}: {
  size?: "small" | "medium";
  desaturated?: boolean;
}) => {
  return (
    <>
      <svg
        className={classNames(styles.indicator, {
          [styles.small]: size === "small",
          [styles.medium]: size === "medium" || !size,
        })}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 19.92 19.92"
      >
        <circle
          cx="9.96"
          cy="9.96"
          r="9.96"
          className={classNames({
            [styles.saturated]: desaturated !== true,
            [styles.desaturated]: desaturated === true,
          })}
        />
      </svg>
    </>
  );
};
