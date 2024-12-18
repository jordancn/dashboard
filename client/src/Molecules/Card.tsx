import classNames from "classnames";
import Link from "next/link";
import React from "react";
import styles from "./Card.module.css";

export const Card = (props: {
  size?: "full" | "half" | "quarter";
  href?: string;
  children?: React.ReactNode;
  className?: string;
  withSeparators?: boolean;
}) => {
  return (
    <div
      className={classNames(styles.card, props.className, {
        [styles.clickable]: props.href,
        fullWidth:
          (!props.className && props.size === "full") ||
          (!props.className && !props.size),
        halfWidth: !props.className && props.size === "half",
        quarterWidth: !props.className && props.size === "quarter",
        [styles.withSeparators]: props.withSeparators,
      })}
    >
      {props.href ? (
        <Link href={props.href}>{props.children}</Link>
      ) : (
        props.children
      )}
    </div>
  );
};
