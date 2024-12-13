import { getWidthClassName, useSize } from "@/Utils/helpers";
import classNames from "classnames";
import styles from "./Selector.module.css";

export const Selector = (props: {
  size: "half" | "single" | "double" | "triple" | "quadruple";
  options: Array<{ label: string; onClick: () => void; disabled?: boolean }>;
  selectedOptionLabel: string;
}) => {
  const size = useSize(props.size);

  return (
    <div
      className={classNames(styles.selectorContainer, {
        ...getWidthClassName(size),
      })}
    >
      <div className={styles.optionsContainer}>
        {props.options.map((option, index) => (
          <div
            key={index}
            onClick={!option.disabled ? option.onClick : undefined}
            className={classNames(styles.option, {
              [styles.selected]: option.label === props.selectedOptionLabel,
              [styles.disabled]: option.disabled,
            })}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
