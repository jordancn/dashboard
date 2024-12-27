import classNames from "classnames";
import styles from "./Monospace.module.css";

export const Monospace = ({
  title,
  variant,
}: {
  title: string;
  variant?: "primary" | "secondary";
}) => {
  return (
    <div
      className={classNames(styles.monospace, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
      })}
    >
      {title}
    </div>
  );
};
