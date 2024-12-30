import { useRouter } from "next/navigation";

import { useCallback } from "react";

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
    // TODO: This doesn't always work for some reason. Also Link doesn't always work.

    router.push(href);

    // window.location.replace(href);
  }, [href]);

  return (
    <div onClick={onClicked} className={className}>
      {children}
    </div>
  );
};
