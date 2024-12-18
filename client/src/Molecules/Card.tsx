import { useSize } from "@/Utils/helpers";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import styles from "./Card.module.css";

export const Card = (props: {
  size?: "half" | "single" | "double" | "triple" | "quadruple";
  href?: string;
  children?: React.ReactNode;
  className?: string;
  withSeparators?: boolean;
}) => {
  const size = useSize(props.size);

  return (
    <div
      className={classNames(props.className, {
        [styles.clickable]: props.href,
        halfWidth: !props.className && props.size === "half",
        singleWidth: !props.className && size === "single",
        doubleWidth: !props.className && size === "double",
        tripleWidth: !props.className && size === "triple",
        quadrupleWidth: !props.className && size === "quadruple",
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
