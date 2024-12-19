import { SidebarButton } from "@/Molecules/SidebarButton";
import { useSidebarData } from "@/Providers/SidebarDataProvider";
import classNames from "classnames";
import styles from "./NavigationBar.module.css";

export const NavigationBar = (props: {
  mode?: "space-between" | "center-left";
  children?: React.ReactNode;
}) => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return null;
  }

  return (
    <div
      className={classNames(styles.navigationBar, {
        [styles.spaceBetween]: props.mode === "space-between" || !props.mode,
        [styles.centerLeft]: props.mode === "center-left",
      })}
    >
      {sidebarData.value.button === "show" && (
        <div
          className={classNames(styles.toggleButton, {
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
      )}
      {props.children}
    </div>
  );
};
