import styles from "./SidebarListHeading.module.css";

export const SidebarListHeading = ({ title }: { title: string }) => {
  return <div className={styles.sidebarListHeading}>{title}</div>;
};
