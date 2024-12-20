import classNames from "classnames";
import styles from "./ExpenseDownIndicator.module.css";

export const ExpenseDownIndicator = (props: {
  size?: "small" | "medium";
  desaturated?: boolean;
}) => {
  return (
    <svg
      className={classNames(styles.indicator, {
        [styles.small]: props.size === "small",
        [styles.medium]: props.size === "medium" || !props.size,
      })}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.92 19.92"
    >
      <path
        className={classNames({
          [styles.saturated]: props.desaturated !== true,
          [styles.desaturated]: props.desaturated === true,
        })}
        d="M13.8.78a10.24,10.24,0,0,1,5.34,5.34A9.55,9.55,0,0,1,19.92,10a9.55,9.55,0,0,1-.78,3.84A10.32,10.32,0,0,1,17,17a10.18,10.18,0,0,1-3.18,2.16,9.55,9.55,0,0,1-3.84.78,9.64,9.64,0,0,1-3.85-.78A10.24,10.24,0,0,1,.78,13.8,9.55,9.55,0,0,1,0,10,9.55,9.55,0,0,1,.78,6.12,10.24,10.24,0,0,1,6.12.78,9.55,9.55,0,0,1,10,0,9.55,9.55,0,0,1,13.8.78ZM9.4,5.14a.75.75,0,0,0-.21.55v5l.08,2.15-1-1.22-1.18-1.2a.7.7,0,0,0-.54-.22.67.67,0,0,0-.52.21.67.67,0,0,0-.22.52.7.7,0,0,0,.21.52L9.35,14.8a.73.73,0,0,0,1.18,0l3.36-3.34a.72.72,0,0,0,.2-.52.7.7,0,0,0-.21-.52.67.67,0,0,0-.52-.21.73.73,0,0,0-.54.22l-1.19,1.2-1,1.21.08-2.14v-5a.75.75,0,0,0-.21-.55.77.77,0,0,0-.55-.21A.73.73,0,0,0,9.4,5.14Z"
      />
    </svg>
  );
};
