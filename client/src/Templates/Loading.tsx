import styles from "./Loading.module.css";

export const Loading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div id="content-scrollable" className={styles.loading}>
      {children}
    </div>
  );
};
