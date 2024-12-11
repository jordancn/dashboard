import * as React from "react";
import styles from "./ScrollMarker.module.css";
import classNames from "classnames";

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
      <a id={props.id}>{props.children}</a>
    </div>
  );
};
