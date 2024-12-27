import { generateColor } from "@marko19907/string-to-color";
import styles from "./MonogramIcon.module.css";

export const MonogramIcon = ({ name }: { name: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      viewBox="0 0 90 90"
    >
      <g>
        <rect width="90" height="90" rx="10" fill={generateColor(name)} />
        <text className={styles.text} id="W" x="50%" y="50%">
          <tspan y="69">{name.substring(0, 1).toUpperCase()}</tspan>
        </text>
      </g>
    </svg>
  );
};
