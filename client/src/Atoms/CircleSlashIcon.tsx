import classNames from "classnames";
import styles from "./CircleSlashIcon.module.css";

export const CircleSlashIcon = ({
  variant,
}: {
  variant: "neutral" | "positive" | "negative";
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22.0776 21.7188"
      width="20.99"
      height="21.194"
    >
      <g>
        <rect height="21.7188" opacity="0" width="22.0776" x="0" y="0" />
        <path
          d="M3.80389 6.49867C3.01358 7.76012 2.56226 9.25387 2.56226 10.8545C2.56226 15.4444 6.2732 19.1553 10.863 19.1553C12.4653 19.1553 13.9605 18.7031 15.2228 17.9113L16.4276 19.1155C14.8384 20.1887 12.9234 20.8155 10.863 20.8155C5.365 20.8155 0.902106 16.3526 0.902106 10.8545C0.902106 8.7961 1.52766 6.88278 2.59926 5.29469ZM20.824 10.8545C20.824 12.9227 20.1925 14.8444 19.1112 16.4367L17.9081 15.2336C18.707 13.9671 19.1638 12.4649 19.1638 10.8545C19.1638 6.26467 15.4529 2.55374 10.863 2.55374C9.25267 2.55374 7.75049 3.01055 6.48399 3.80945L5.28087 2.60633C6.87314 1.52509 8.79485 0.893579 10.863 0.893579C16.3611 0.893579 20.824 5.35647 20.824 10.8545Z"
          className={classNames({
            [styles.active]: variant === "positive",
            [styles.neutral]: variant === "neutral",
            [styles.negative]: variant === "negative",
          })}
        />
        <path
          d="M19.2712 20.3565C19.5642 20.6494 20.0525 20.6397 20.3357 20.3467C20.6287 20.044 20.6287 19.5752 20.3357 19.2823L2.42554 1.36233C2.13257 1.06936 1.65406 1.06936 1.35132 1.36233C1.06812 1.64553 1.06812 2.14358 1.35132 2.42678Z"
          className={classNames({
            [styles.active]: variant === "positive",
            [styles.neutral]: variant === "neutral",
            [styles.negative]: variant === "negative",
          })}
        />
      </g>
    </svg>
  );
};
