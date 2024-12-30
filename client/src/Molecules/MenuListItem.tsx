import Link from "next/link";
import styles from "./MenuListItem.module.css";

export const MenuListItem = ({
  title,
  path,
}: {
  title: string;
  path: string;
}) => {
  return (
    <Link href={path} className={styles.menuListItem}>
      <div className={styles.title}>{title}</div>
    </Link>
  );
};
