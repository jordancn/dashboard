import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./ScrollMarker.module.css";

export const ScrollMarker = ({
  id,
  fullHeight,
  children,
}: {
  id?: string;
  fullHeight?: boolean;
  children?: ReactNode;
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
