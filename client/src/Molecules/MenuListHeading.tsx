import styles from "./MenuListHeading.module.css";

export const MenuListHeading = ({ title }: { title: string }) => {
  return <div className={styles.menuListHeading}>{title}</div>;
};
