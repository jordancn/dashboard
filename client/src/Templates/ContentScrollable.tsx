import classNames from "classnames";
import styles from "./ContentScrollable.module.css";

export const ContentScrollable = (props: {
  type?: "block" | "wrap-cards";
  direction?: "row" | "column";
  hasNavigationBar?: boolean;
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
          [styles.navigationBar]: props.hasNavigationBar,
          [styles.wrapCardsColumn]:
            props.type === "wrap-cards" && props.direction === "column",
          [styles.wrapCardsRow]:
            props.type === "wrap-cards" && props.direction === "row",
          [styles.withNavigationBar]: props.hasNavigationBar,
          [styles.withoutNavigationBar]: !props.hasNavigationBar,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};
