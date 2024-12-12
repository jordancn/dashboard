import { useCallback } from "react";
import styles from "./MenuListItem.module.css";
export const MenuListItem = (props: {
  title: string;
  icon?: string | ((props: { className: string }) => React.ReactNode);
  path: string;
}) => {
  // const navigate = useNavigate();
  // const theme = useSystemTheme();

  // const Icon = props.icon;

  const onClick = useCallback(() => {
    // TODO
    // navigate(props.path);
  }, []);

  return (
    <div className={styles.menuListItem} onClick={onClick}>
      {/* <div
        css={css`
          margin-right: 0px;
          width: 28px;
          align-self: center;
        `}
      >
        {Icon && typeof Icon === "string" && (
          <i
            css={[
              css`
                font-size: 32px;
                color: #007aff;
              `,
            ]}
            className={`las la-${props.icon}`}
          ></i>
        )}
        {Icon && typeof Icon !== "string" && <Icon className="sidebar-icon" />}
      </div> */}
      <div className={styles.title}>{props.title}</div>
    </div>
  );
};
