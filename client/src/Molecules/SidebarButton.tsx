import { SidebarIcon } from "@/Atoms/SidebarIcon";
import { MouseEventHandler } from "react";
import styles from "./SidebarButton.module.css";

export const SidebarButton = (props: {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div className={styles.sidebarButton} onClick={props.onClick}>
      <SidebarIcon />
    </div>
  );
};
