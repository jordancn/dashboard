import classNames from "classnames";
import styles from "./SectionHeadingContainer.module.css";

export const SectionHeadingContainer = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames(styles.sectionHeadingContainer)}>
      {props.children}
    </div>
  );
};
