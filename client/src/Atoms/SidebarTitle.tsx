import { ReactNode } from "react";
import styles from "./SidebarTitle.module.css";

export const SidebarTitle = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};
