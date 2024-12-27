import { Headline } from "@/Atoms/Headline";
import { Label } from "@/Atoms/Label";
import { getWidthClassName } from "@/Utils/helpers";
import classNames from "classnames";
import Link from "next/link";
import styles from "./SectionHeading.module.css";

export const SectionHeading = ({
  title,
  subtitle,
  href,
  onClick,
  size,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  size?: "full" | "half" | "quarter";
}) => {
  return (
    <>
      {href && (
        <Link
          href={href}
          className={classNames(styles.sectionHeading, {
            ...getWidthClassName(size),
          })}
        >
          <Headline weight="Bold" title={title} />
          {subtitle && <Label title={subtitle} />}
        </Link>
      )}

      {!href && (
        <div
          className={classNames(styles.sectionHeading, {
            ...getWidthClassName(size),
          })}
          onClick={onClick}
        >
          <Headline weight="Bold" title={title} />
          {subtitle && <Label title={subtitle} />}
        </div>
      )}
    </>
  );
};
