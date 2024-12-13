import { SidebarButton } from "@/Molecules/SidebarButton";
import { useSidebarData } from "@/Providers/SidebarDataProvider";
import classNames from "classnames";
import styles from "./NavigationBar.module.css";

export const NavigationBar = (props: { children?: React.ReactNode }) => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return null;
  }

  return (
    <div id="navigation-bar" className={styles.navigationBarContainer}>
      <div
        className={classNames(styles.navigationBar, {
          [styles.show]: sidebarData.value.button === "show",
          [styles.hide]: sidebarData.value.button !== "show",
        })}
      >
        <SidebarButton
          onClick={
            sidebarData.value.button === "show"
              ? sidebarData.value.show
              : undefined
          }
        />
      </div>
      {props.children}
    </div>
  );
};
