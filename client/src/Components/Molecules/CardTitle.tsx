import React from "react";
import styles from "./CardTitle.module.css";

export const CardTitle = (props: { title?: string }) => {
  if (!props.title) {
    return null;
  }

  return <div className={styles.cardTitle}>{props.title}</div>;
};
