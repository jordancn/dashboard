import classNames from "classnames";
import styles from "./Tag.module.css";

export const Tag = (props: {
  title: string;
  variant?: "Primary" | "Secondary";
  onClick?: () => void;
}) => {
  return (
    <div
      className={classNames(styles.tag, {
        [styles.primary]: props.variant === "Primary",
        [styles.secondary]: props.variant === "Secondary",
      })}
      onClick={props.onClick}
    >
      {props.title}
    </div>
  );
};
