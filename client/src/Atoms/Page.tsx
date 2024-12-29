import { ReactNode } from "react";
import styles from "./Page.module.css";

export const Page = ({ children }: { children?: ReactNode }) => {
  return (
    <div id="page" className={styles.page}>
      {children}
    </div>
  );
};
