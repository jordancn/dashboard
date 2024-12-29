import { ReactNode } from "react";
import styles from "./MenuListGroup.module.css";

export const MenuListGroup = ({ children }: { children: ReactNode }) => {
  return <div className={styles.menuListGroup}>{children}</div>;
};
