import { useRelativeSize } from "@/Utils/helpers";
import classNames from "classnames";
import React from "react";
import styles from "./Card.module.css";

export const Card = (props: {
  size?: "half" | "single" | "double" | "triple" | "quadruple";
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  const size = useRelativeSize(props.size);

  return (
    <div
      className={classNames({
        [styles.clickable]: props.onClick,
      })}
      style={{ width: `${size}px` }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
