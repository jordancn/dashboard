import { Redirect } from "@/Atoms/Redirect";
import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Card.module.css";

export const Card = ({
  size,
  href,
  onClick,
  children,
  className,
  withSeparators,
}: {
  size?: "full" | "half" | "quarter";
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  withSeparators?: boolean;
}) => {
  return (
    <div
      className={classNames(styles.card, className, {
        [styles.clickable]: href,
        fullWidth: (!className && size === "full") || (!className && !size),
        halfWidth: !className && size === "half",
        quarterWidth: !className && size === "quarter",
        [styles.withSeparators]: withSeparators,
      })}
      onClick={onClick}
    >
      {href ? <Redirect href={href}>{children}</Redirect> : children}
    </div>
  );
};
