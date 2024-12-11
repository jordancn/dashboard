import { ChangeEvent, useCallback, useState } from "react";
import styles from "./TextInput.module.css";

export const TextInput = (props: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) => {
  const [value, setValue] = useState(props.value);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        props.onChange(value);
      }
    },
    [props.onChange, value],
  );

  if (props.multiline) {
    return (
      <textarea
        className={styles.textarea}
        placeholder={props.placeholder}
        // onChange={onChange}
        // onKeyDown={onKeyDown}
      >
        {value}
      </textarea>
    );
  }

  return (
    <input
      className={styles.input}
      placeholder={props.placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
