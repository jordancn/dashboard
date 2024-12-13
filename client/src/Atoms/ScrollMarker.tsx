import classNames from "classnames";
import * as React from "react";
import styles from "./ScrollMarker.module.css";

export const ScrollMarker = (props: {
  id?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(styles.scrollMarker, {
        [styles.fullHeight]: props.fullHeight,
      })}
    >
      <span id={props.id}>{props.children}</span>
    </div>
  );
};
