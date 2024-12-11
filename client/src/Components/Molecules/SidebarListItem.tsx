import classNames from "classnames";
import { useCallback } from "react";
import styles from "./SidebarListItem.module.css";

export const SidebarListItem = (props: {
  title: string;
  icon?: string | React.FC<{ className: string }>;
  path: string;
  entityId: string | "overview";
}) => {
  // const navigate = useNavigate();

  const Icon = props.icon;

  const match = props.entityId
    ? window.location.href.includes(props.entityId)
    : false;

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
          <i className={`las la-${props.icon}`}></i>
        )}
        {Icon && typeof Icon !== "string" && (
          <Icon className={match ? "sidebar-icon-selected" : "sidebar-icon"} />
        )}
      </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
};
