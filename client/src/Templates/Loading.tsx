import { ReactNode } from "react";
import styles from "./Loading.module.css";

export const Loading = ({ children }: { children?: ReactNode }) => {
  return (
    <div id="content-scrollable" className={styles.loading}>
      {children}
    </div>
  );
};
