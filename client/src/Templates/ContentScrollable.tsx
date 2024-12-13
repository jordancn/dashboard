import classNames from "classnames";
import styles from "./ContentScrollable.module.css";

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
          [styles.wrapCardsRow]:
            props.type === "wrap-cards" && props.direction === "row",
          [styles.withNavigationBar]: props.navigationBar,
          [styles.withoutNavigationBar]: !props.navigationBar,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};
