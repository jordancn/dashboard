import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./SectionHeadingContainer.module.css";

export const SectionHeadingContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className={classNames(styles.sectionHeadingContainer)}>{children}</div>
  );
};
