import { Redirect } from "@/Atoms/Redirect";
import styles from "./MenuListItem.module.css";

export const MenuListItem = ({
  title,
  path,
}: {
  title: string;
  path: string;
}) => {
  return (
    <Redirect href={path} className={styles.menuListItem}>
      <div className={styles.title}>{title}</div>
    </Redirect>
  );
};
