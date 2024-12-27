import classNames from "classnames";
import styles from "./Tag.module.css";

export const Tag = ({
  title,
  variant,
  onClick,
}: {
  title: string;
  variant?: "Primary" | "Secondary";
  onClick?: () => void;
}) => {
  return (
    <div
      className={classNames(styles.tag, {
        [styles.primary]: variant === "Primary",
        [styles.secondary]: variant === "Secondary",
      })}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
