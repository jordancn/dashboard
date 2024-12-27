import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import styles from "./TextInput.module.css";

export const TextInput = ({
  placeholder,
  value: initialValue,
  onChange: propOnChange,
  multiline,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [propOnChange],
  );

  const onBlur = useCallback(() => {
    propOnChange(value);
  }, [value, propOnChange]);

  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        propOnChange(value);
      }

      if (event.key === "Escape") {
        setValue(initialValue);
      }
    },
    [value, propOnChange, initialValue],
  );

  if (multiline) {
    return (
      <textarea className={styles.textarea} placeholder={placeholder}>
        {value}
      </textarea>
    );
  }

  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
    />
  );
};
