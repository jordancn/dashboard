import { SidebarIcon } from "@/Atoms/SidebarIcon";
import { MouseEventHandler } from "react";
import styles from "./SidebarButton.module.css";

export const SidebarButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div className={styles.sidebarButton} onClick={onClick}>
      <SidebarIcon />
    </div>
  );
};
