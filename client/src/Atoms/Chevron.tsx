import classNames from "classnames";
import styles from "./Chevron.module.css";

export const Chevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7.163"
      height="12.715"
      viewBox="0 0 7.163 12.715"
    >
      <path
        d="M9.968,8.712a.655.655,0,0,0-.212-.483l-5.8-5.684a.681.681,0,0,0-.483-.19.655.655,0,0,0-.667.667A.7.7,0,0,0,3,3.5L8.328,8.712,3,13.927a.682.682,0,0,0-.19.476.673.673,0,0,0,1.15.469L9.756,9.2A.667.667,0,0,0,9.968,8.712Z"
        transform="translate(-2.805 -2.354)"
        className={classNames(styles.chevron)}
      />
    </svg>
  );
};
