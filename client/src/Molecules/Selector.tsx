"use client";

import classNames from "classnames";
import styles from "./Selector.module.css";

export const Selector = ({
  options,
  selectedOptionLabel,
}: {
  options: Array<{ label: string; onClick: () => void; disabled?: boolean }>;
  selectedOptionLabel: string;
}) => {
  return (
    <div className={styles.optionsContainer}>
      {options.map((option, index) => (
        <div
          key={index}
          onClick={!option.disabled ? option.onClick : undefined}
          className={classNames(styles.option, {
            [styles.selected]: option.label === selectedOptionLabel,
            [styles.disabled]: option.disabled,
            [styles.enabled]: !option.disabled,
          })}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};
