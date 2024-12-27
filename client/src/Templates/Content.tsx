import { useSidebarData } from "@/Providers/SidebarDataProvider";
import classNames from "classnames";
import styles from "./Content.module.css";

export const Content = ({ children }: { children?: React.ReactNode }) => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return null;
  }

  return (
    <div
      id="content"
      className={classNames(styles.content, {
        [styles.contentFixed]:
          sidebarData.value.type === "fixed" && sidebarData.value.visible,
      })}
    >
      <div id="content-container" className={styles.contentContainer}>
        {children}
      </div>
    </div>
  );
};
