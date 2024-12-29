import { ReactNode } from "react";

export const Toolbar = ({ children }: { children?: ReactNode }) => {
  return <div id="toolbar">{children}</div>;
};
