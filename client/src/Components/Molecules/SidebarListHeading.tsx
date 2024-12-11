import styles from "./SidebarListHeading.module.css";

export const SidebarListHeading = (props: { title: string }) => {
  return <div className={styles.sidebarListHeading}>{props.title}</div>;
};
