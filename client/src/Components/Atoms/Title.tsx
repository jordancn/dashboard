import * as React from "react";
import styles from "./Title.module.css";
import { Title1 } from "./Title1";

export const Title = (props: {
  myRef?: React.Ref<HTMLDivElement>;
  title: string;
}) => {
  return (
    <div ref={props.myRef} className={styles.title}>
      <Title1 title={props.title} />
    </div>
  );
};
