import classNames from "classnames";
import styles from "./Monospace.module.css";

export const Monospace = (props: {
  title: string;
  variant?: "primary" | "secondary";
}) => {
  return (
    <div
      className={classNames(styles.monospace, {
        [styles.primary]: props.variant === "primary",
        [styles.secondary]: props.variant === "secondary",
      })}
    >
      {props.title}
    </div>
  );
};
