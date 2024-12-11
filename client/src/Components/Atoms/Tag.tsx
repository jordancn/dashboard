import classNames from "classnames";
import styles from "./Tag.module.css";

export const Tag = (props: {
  title: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {
  return (
    <div
      className={classNames(styles.tag, {
        [styles.primary]: props.variant === "primary",
        [styles.secondary]: props.variant === "secondary",
      })}
      onClick={props.onClick}
    >
      {props.title}
    </div>
  );
};
