import classNames from "classnames";
import * as React from "react";
import styles from "./ScrollMarker.module.css";

export const ScrollMarker = ({
  id,
  fullHeight,
  children,
}: {
  id?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(styles.scrollMarker, {
        [styles.fullHeight]: fullHeight,
      })}
    >
      <span id={id}>{children}</span>
    </div>
  );
};
