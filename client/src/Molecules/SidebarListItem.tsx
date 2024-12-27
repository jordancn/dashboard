import classNames from "classnames";
import { useCallback } from "react";
import styles from "./SidebarListItem.module.css";

export const SidebarListItem = ({
  title,
  icon,
  path,
  entityId,
}: {
  title: string;
  icon?: string | ((props: { className: string }) => React.ReactNode);
  path: string;
  entityId: string | "overview";
}) => {
  // const navigate = useNavigate();

  const Icon = icon;

  const match = entityId ? window.location.href.includes(entityId) : false;

  const onClick = useCallback(() => {
    // navigate(props.path);
  }, []); // TODO remember the deps (prop.path)

  return (
    <div
      className={classNames(styles.sidebarListItem, {
        [styles.match]: match,
      })}
      onClick={onClick}
    >
      <div
        className={classNames(styles.icon, {
          [styles.match]: match,
        })}
      >
        {Icon && typeof Icon === "string" && (
          <i className={`las la-${icon}`}></i>
        )}
        {Icon && typeof Icon !== "string" && (
          <Icon className={match ? "sidebar-icon-selected" : "sidebar-icon"} />
        )}
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
