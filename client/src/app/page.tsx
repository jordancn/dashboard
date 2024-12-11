import Accounts from "./accounts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Accounts />
      </main>
    </div>
  );
}
