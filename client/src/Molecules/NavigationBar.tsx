import { SidebarButton } from "@/Molecules/SidebarButton";
import { useSidebarData } from "@/Providers/SidebarDataProvider";
import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./NavigationBar.module.css";

export const NavigationBar = ({
  mode,
  children,
}: {
  mode?: "space-between" | "center-left";
  children?: ReactNode;
}) => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return null;
  }

  return (
    <div
      className={classNames(styles.navigationBar, {
        [styles.spaceBetween]: mode === "space-between" || !mode,
        [styles.centerLeft]: mode === "center-left",
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
      {children}
    </div>
  );
};
