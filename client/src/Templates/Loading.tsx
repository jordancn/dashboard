import styles from "./Loading.module.css";

export const Loading = (props: { children?: React.ReactNode }) => {
  return (
    <div id="content-scrollable" className={styles.loading}>
      {props.children}
    </div>
  );
};
