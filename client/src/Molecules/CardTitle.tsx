import styles from "./CardTitle.module.css";

export const CardTitle = ({ title }: { title?: string }) => {
  if (!title) {
    return null;
  }

  return <div className={styles.cardTitle}>{title}</div>;
};
