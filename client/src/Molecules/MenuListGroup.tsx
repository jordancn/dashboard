import * as React from "react";
import styles from "./MenuListGroup.module.css";

export const MenuListGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.menuListGroup}>{children}</div>;
};
