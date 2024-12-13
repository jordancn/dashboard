import classNames from "classnames";
import React from "react";
import styles from "./CardContents.module.css";

export const CardContents = (props: {
  state?: "normal" | "error";
  position?: "start" | "middle" | "end" | "single";
  variant?: "transparent" | "translucent";
  children?: React.ReactNode;
}) => {
  return (
    <div className={styles.cardContentsContainer}>
      <div
        className={classNames(styles.cardContents, {
          [styles.start]: props.position === "start",
          [styles.middle]: props.position === "middle",
          [styles.end]: props.position === "end",
          [styles.single]:
            props.position === "single" || props.position === undefined,
          [styles.opaque]: props.variant !== "transparent",
          [styles.transparent]: props.variant === "transparent",
          [styles.translucent]: props.variant === "translucent",
          [styles.error]: props.state === "error",
        })}
      >
        {props.children}
      </div>
    </div>
  );
};
