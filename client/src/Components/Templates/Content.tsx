import { useContenWidth } from "@/Utils/helpers";
import classNames from "classnames";
import { useSidebarData } from "../Providers/SidebarDataProvider";
import styles from "./Content.module.css";

export const Content = (props: { children?: React.ReactNode }) => {
  const sidebarData = useSidebarData();

  const contentWidth = useContenWidth();

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
      <div
        id="content-container"
        style={{ width: `${contentWidth}px` }}
        className={styles.contentContainer}
      >
        {props.children}
      </div>
    </div>
  );
};

export const ContentScrollable = (props: {
  type?: "block" | "wrap-cards";
  direction?: "row" | "column";
  navigationBar?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <div id="content-scrollable">
      <div
        className={classNames(styles.contentScrollable, {
          [styles.contentScrollableFullWidth]: props.fullWidth,
          [styles.contentScrollableFullHeight]: props.fullHeight,
          [styles.wrapCards]: props.type === "wrap-cards",
          [styles.navigationBar]: props.navigationBar,
          [styles.wrapCardsColumn]:
            props.type === "wrap-cards" && props.direction === "column",
        })}
      >
        {props.children}
      </div>
    </div>
  );
};
