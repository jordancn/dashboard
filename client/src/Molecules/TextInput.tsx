import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import styles from "./TextInput.module.css";

export const TextInput = ({
  placeholder,
  value: initialValue,
  onChange: propOnChange,
  onEnter,
  clearOnEnter,
  multiline,
}: {
  placeholder: string;
  value: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  clearOnEnter?: boolean;
  multiline?: boolean;
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  const onBlur = useCallback(() => {
    propOnChange?.(value);
  }, [value, propOnChange]);

  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onEnter?.(value);

        if (clearOnEnter) {
          setValue("");
        }
      }

      if (event.key === "Escape") {
        setValue(initialValue);
      }
    },
    [value, onEnter, initialValue, clearOnEnter],
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
