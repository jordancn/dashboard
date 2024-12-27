import classNames from "classnames";
import styles from "./SearchIcon.module.css";

export const SearchIcon = ({ disabled }: { disabled?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.99"
      height="21.194"
      viewBox="0 0 20.99 21.194"
    >
      <path
        id="Symbol"
        d="M-10.5-9.775A8.582,8.582,0,0,0-1.923-1.2,8.5,8.5,0,0,0,3.062-2.814l5.285,5.3a1.265,1.265,0,0,0,.913.365A1.211,1.211,0,0,0,10.5,1.579,1.233,1.233,0,0,0,10.141.7L4.888-4.587A8.472,8.472,0,0,0,6.649-9.775a8.582,8.582,0,0,0-8.572-8.572A8.582,8.582,0,0,0-10.5-9.775Zm1.837,0a6.739,6.739,0,0,1,6.735-6.735A6.739,6.739,0,0,1,4.813-9.775,6.739,6.739,0,0,1-1.923-3.04,6.739,6.739,0,0,1-8.658-9.775Z"
        transform="translate(10.495 18.348)"
        className={classNames({
          [styles.disabled]: disabled === true,
          [styles.enabled]: disabled === false,
        })}
      />
    </svg>
  );
};
