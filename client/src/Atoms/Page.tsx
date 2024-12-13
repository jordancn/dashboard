import styles from "./Page.module.css";

export const Page = (props: { children?: React.ReactNode }) => {
  return (
    <div id="page" className={styles.page}>
      {props.children}
    </div>
  );
};
