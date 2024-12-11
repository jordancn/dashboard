import classNames from "classnames";
import { useSidebarData } from "../Providers/SidebarDataProvider";
import styles from "./NavigationBar.module.css";
import { SidebarButton } from "./SidebarButton";

export const NavigationBar = (props: { children?: React.ReactNode }) => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return null;
  }

  return (
    <div id="navigation-bar" className={styles.navigationBarContainer}>
      <div
        id="navigation-bar"
        className={classNames(styles.navigationBar, {
          [styles.show]: sidebarData.value.button === "show",
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
