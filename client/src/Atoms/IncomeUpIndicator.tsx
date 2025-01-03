import classNames from "classnames";
import styles from "./IncomeUpIndicator.module.css";

export const IncomeUpIndicator = ({
  size,
  desaturated,
}: {
  size?: "small" | "medium";
  desaturated?: boolean;
}) => {
  return (
    <svg
      className={classNames(styles.indicator, {
        [styles.small]: size === "small",
        [styles.medium]: size === "medium" || !size,
      })}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.92 19.92"
    >
      <path
        className={classNames({
          [styles.saturated]: desaturated !== true,
          [styles.desaturated]: desaturated === true,
        })}
        d="M6.12,19.14A10.24,10.24,0,0,1,.78,13.8,9.55,9.55,0,0,1,0,10,9.55,9.55,0,0,1,.78,6.12,10.32,10.32,0,0,1,2.93,2.94,10.18,10.18,0,0,1,6.11.78,9.55,9.55,0,0,1,10,0,9.64,9.64,0,0,1,13.8.78a10.24,10.24,0,0,1,5.34,5.34A9.55,9.55,0,0,1,19.92,10a9.55,9.55,0,0,1-.78,3.84,10.24,10.24,0,0,1-5.34,5.34,9.55,9.55,0,0,1-3.84.78A9.55,9.55,0,0,1,6.12,19.14Zm4.4-4.36a.74.74,0,0,0,.21-.55v-5l-.08-2.15,1,1.22,1.18,1.2a.71.71,0,0,0,.54.23.74.74,0,0,0,.53-.21A.72.72,0,0,0,14.13,9a.75.75,0,0,0-.2-.52L10.57,5.12a.73.73,0,0,0-1.18,0L6,8.46A.69.69,0,0,0,5.83,9,.72.72,0,0,0,6,9.51a.7.7,0,0,0,.52.21.74.74,0,0,0,.54-.23l1.19-1.2,1-1.21L9.22,9.22v5a.74.74,0,0,0,.21.55A.77.77,0,0,0,10,15,.73.73,0,0,0,10.52,14.78Z"
      />
    </svg>
  );
};
