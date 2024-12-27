import classNames from "classnames";
import styles from "./TargetIndicator.module.css";

export const TargetIndicator = ({ percent }: { percent: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 19.92 19.92"
      className={styles.targetIndicator}
    >
      <circle
        cx="9.96"
        cy="9.96"
        r="9.96"
        className={classNames({
          [styles.targetIndicatorCircle]: percent >= 1 && percent < 1.25,
          [styles.targetWarningIndicatorCircle]:
            percent >= 1.25 && percent < 1.5,
          [styles.targetDangerIndicatorCircle]: percent >= 1.5,
        })}
      />
    </svg>
  );
};
