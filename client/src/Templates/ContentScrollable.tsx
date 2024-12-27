import classNames from "classnames";
import styles from "./ContentScrollable.module.css";

export const ContentScrollable = ({
  type,
  direction,
  hasNavigationBar,
  fullHeight,
  children,
  fullWidth,
}: {
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
          [styles.contentScrollableFullWidth]: fullWidth,
          [styles.contentScrollableFullHeight]: fullHeight,
          [styles.wrapCards]: type === "wrap-cards",
          [styles.navigationBar]: hasNavigationBar,
          [styles.wrapCardsColumn]:
            type === "wrap-cards" && direction === "column",
          [styles.wrapCardsRow]: type === "wrap-cards" && direction === "row",
          [styles.withNavigationBar]: hasNavigationBar,
          [styles.withoutNavigationBar]: !hasNavigationBar,
        })}
      >
        {children}
      </div>
    </div>
  );
};
