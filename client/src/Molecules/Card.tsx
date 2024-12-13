import { useSize } from "@/Utils/helpers";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import styles from "./Card.module.css";

export const Card = (props: {
  size?: "half" | "single" | "double" | "triple" | "quadruple";
  href?: string;
  children?: React.ReactNode;
}) => {
  const size = useSize(props.size);

  return (
    <div
      className={classNames({
        [styles.clickable]: props.href,
        halfWidth: size === "half",
        singleWidth: size === "single",
        doubleWidth: size === "double",
        tripleWidth: size === "triple",
        quadrupleWidth: size === "quadruple",
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
