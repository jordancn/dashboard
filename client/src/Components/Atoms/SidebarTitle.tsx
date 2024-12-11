import styles from "./SidebarTitle.module.css";

export const SidebarTitle = (props: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.children}>{props.children}</div>
    </div>
  );
};
