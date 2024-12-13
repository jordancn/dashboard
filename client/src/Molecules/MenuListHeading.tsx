import styles from "./MenuListHeading.module.css";

export const MenuListHeading = (props: { title: string }) => {
  return <div className={styles.menuListHeading}>{props.title}</div>;
};
