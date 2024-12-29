import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./CardContents.module.css";

export const CardContents = ({
  state,
  position,
  variant,
  children,
}: {
  state?: "normal" | "error";
  position?: "start" | "middle" | "end" | "single";
  variant?: "transparent" | "translucent";
  children?: ReactNode;
}) => {
  return (
    <div className={styles.cardContentsContainer}>
      <div
        className={classNames(styles.cardContents, {
          [styles.start]: position === "start",
          [styles.middle]: position === "middle",
          [styles.end]: position === "end",
          [styles.single]: position === "single" || position === undefined,
          [styles.opaque]: variant !== "transparent",
          [styles.transparent]: variant === "transparent",
          [styles.translucent]: variant === "translucent",
          [styles.error]: state === "error",
        })}
      >
        {children}
      </div>
    </div>
  );
};
