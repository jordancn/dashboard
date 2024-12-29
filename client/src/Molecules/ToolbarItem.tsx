import classNames from "classnames";
import { ReactNode, useCallback } from "react";
import styles from "./ToolbarItem.module.css";

export const ToolbarItem = ({
  title,
  icon,
  path,
  base,
  entityId,
}: {
  title: string;
  icon?: string | ((props: { className: string }) => ReactNode);
  path: string;
  base: string;
  entityId: string | "overview";
}) => {
  // const navigate = useNavigate();

  const Icon = icon;

  const match = entityId ? window.location.href.includes(entityId) : false;

  const onClick = useCallback(() => {
    // TODO
    // navigate(props.path);
  }, []);

  return (
    <div
      className={classNames(styles.toolbarItem, { match })}
      onClick={onClick}
    >
      <div className={classNames(styles.icon, { match })}>
        <div>
          {Icon && typeof Icon === "string" && (
            <i className={`las la-${Icon}`}></i>
          )}
          {Icon && typeof Icon !== "string" && (
            <Icon className={match ? "icon-selected" : "icon"} />
          )}
        </div>
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
