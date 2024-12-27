import styles from "./Page.module.css";

export const Page = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div id="page" className={styles.page}>
      {children}
    </div>
  );
};
