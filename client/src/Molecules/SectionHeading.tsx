import { Headline } from "@/Atoms/Headline";
import { Label } from "@/Atoms/Label";
import { getWidthClassName, useSize } from "@/Utils/helpers";
import classNames from "classnames";
import Link from "next/link";
import styles from "./SectionHeading.module.css";

export const SectionHeading = (props: {
  title: string;
  subtitle?: string;
  href?: string;
  size?: "single" | "inline";
}) => {
  const size = props.size !== "inline" ? useSize("single") : undefined;

  return (
    <>
      {props.href && (
        <Link
          href={props.href}
          className={classNames(styles.sectionHeading, {
            ...getWidthClassName(size),
          })}
        >
          <Headline weight="Bold" title={props.title} />
          {props.subtitle && <Label title={props.subtitle} />}
        </Link>
      )}

      {!props.href && (
        <div
          className={classNames(styles.sectionHeading, {
            ...getWidthClassName(size),
          })}
        >
          <Headline weight="Bold" title={props.title} />
          {props.subtitle && <Label title={props.subtitle} />}
        </div>
      )}
    </>
  );
};
