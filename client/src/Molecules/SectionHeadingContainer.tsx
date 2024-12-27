import classNames from "classnames";
import styles from "./SectionHeadingContainer.module.css";

export const SectionHeadingContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames(styles.sectionHeadingContainer)}>{children}</div>
  );
};
