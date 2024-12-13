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
}) => {
  const size = useSize("single");

  return (
    <div
      className={classNames(styles.sectionHeading, {
        ...getWidthClassName(size),
      })}
    >
      {props.href && (
        <Link href={props.href}>
          <Headline title={props.title} />
          {props.subtitle && <Label title={props.subtitle} />}
        </Link>
      )}

      {!props.href && (
        <>
          <Headline title={props.title} />
          {props.subtitle && <Label title={props.subtitle} />}
        </>
      )}
    </div>
  );
};
