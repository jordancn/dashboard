import classNames from "classnames";
import styles from "./CircleIcon.module.css";

export const CircleIcon = ({
  variant,
}: {
  variant: "neutral" | "positive" | "negative";
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20.2832 19.9316"
      width="20.99"
      height="21.194"
    >
      <g>
        <rect height="19.9316" opacity="0" width="20.2832" x="0" y="0" />
        <path
          d="M9.96094 19.9219C15.459 19.9219 19.9219 15.459 19.9219 9.96094C19.9219 4.46289 15.459 0 9.96094 0C4.46289 0 0 4.46289 0 9.96094C0 15.459 4.46289 19.9219 9.96094 19.9219ZM9.96094 18.2617C5.37109 18.2617 1.66016 14.5508 1.66016 9.96094C1.66016 5.37109 5.37109 1.66016 9.96094 1.66016C14.5508 1.66016 18.2617 5.37109 18.2617 9.96094C18.2617 14.5508 14.5508 18.2617 9.96094 18.2617Z"
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
