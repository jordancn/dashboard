import classNames from "classnames";
import styles from "./TargetIndicator.module.css";

export const TargetIndicator = (props: { percent: number }) => {
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
          [styles.targetIndicatorCircle]:
            props.percent >= 1 && props.percent < 1.25,
          [styles.targetWarningIndicatorCircle]:
            props.percent >= 1.25 && props.percent < 1.5,
          [styles.targetDangerIndicatorCircle]: props.percent >= 1.5,
        })}
      />
    </svg>
  );
};
