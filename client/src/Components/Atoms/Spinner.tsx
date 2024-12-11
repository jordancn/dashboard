import { Empty } from "./Empty";
import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <Empty>
      <div className={styles.spinner} />
    </Empty>
  );
};
