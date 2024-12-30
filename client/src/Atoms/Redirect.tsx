import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./Redirect.module.css";

export const Redirect = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();

  const onClicked = useCallback(() => {
    router.push(href);
  }, [href]);

  return (
    <div onClick={onClicked} className={classNames(styles.redirect, className)}>
      {children}
    </div>
  );
};
