import * as React from "react";
import styles from "./MenuListGroup.module.css";

export const MenuListGroup = (props: { children: React.ReactNode }) => {
  return <div className={styles.menuListGroup}>{props.children}</div>;
};
