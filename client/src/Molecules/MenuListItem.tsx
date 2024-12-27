import Link from "next/link";
import styles from "./MenuListItem.module.css";

export const MenuListItem = ({
  title,
  icon,
  path,
}: {
  title: string;
  icon?: string | ((props: { className: string }) => React.ReactNode);
  path: string;
}) => {
  return (
    <Link href={path} className={styles.menuListItem}>
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
      <div className={styles.title}>{title}</div>
    </Link>
  );
};
