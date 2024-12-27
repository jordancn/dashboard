import classNames from "classnames";
import styles from "./Label.module.css";

export const Label = ({
  title,
  variant,
  onClick,
}: {
  title: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {
  return (
    <div
      className={classNames(styles.label, {
        [styles.primary]: variant === "primary" || !variant,
        [styles.secondary]: variant === "secondary",
        [styles.clickable]: onClick,
      })}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
