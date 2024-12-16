import classNames from "classnames";
import * as React from "react";
import styles from "./Label.module.css";

export const Label = (props: {
  title: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {
  return (
    <div
      className={classNames(styles.label, {
        [styles.primary]: props.variant === "primary" || !props.variant,
        [styles.secondary]: props.variant === "secondary",
        [styles.clickable]: props.onClick,
      })}
      onClick={props.onClick}
    >
      {props.title}
    </div>
  );
};
