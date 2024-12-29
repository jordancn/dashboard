"use client";

import { SidebarButton } from "@/Molecules/SidebarButton";
import { useDeviceData } from "@/Providers/DeviceDataProvider";
import classNames from "classnames";
import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./SidebarDataProvider.module.css";

type ContextState =
  | { status: "LOADING" | "ERROR" }
  | {
      status: "LOADED";
      value: {
        visible: boolean;
        button: "hide" | "show";
        type: "floating" | "fixed";
        show: () => void;
        hide: () => void;
      };
    };

const Context = createContext<ContextState | null>(null);

export const useSidebarData = (): ContextState => {
  const contextState = useContext(Context);

  if (contextState === null) {
    throw new Error(
      "useSidebarData must be used within a SidebarDataProvider tag",
    );
  }

  return contextState;
};

const FloatingSidebar = ({
  visible,
  children,
}: {
  visible: boolean;
  children?: ReactNode;
}) => {
  return (
    <div
      id="floating-sidebar"
      className={classNames(styles.floatingSidebar, {
        visible,
      })}
    >
      {children}
    </div>
  );
};

const FixedSidebar = ({
  visible,
  children,
}: {
  visible: boolean;
  children?: ReactNode;
}) => {
  return (
    <div
      id="fixed-sidebar"
      style={{
        width: visible ? 0 : "var(--sidebar-width)",
      }}
    >
      {children}
    </div>
  );
};

const SidebarAction = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div className={styles.sidebarAction}>
      <SidebarButton onClick={onClick} />
    </div>
  );
};

export const Sidebar = ({ children }: { children?: ReactNode }) => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return null;
  }

  return (
    <div>
      <FloatingSidebar visible={sidebarData.value.visible}>
        <SidebarAction onClick={sidebarData.value.hide} />
        {children}
      </FloatingSidebar>
      <FixedSidebar visible={sidebarData.value.visible}>
        <SidebarAction onClick={sidebarData.value.hide} />
        {children}
      </FixedSidebar>
    </div>
  );
};

export const SidebarDataProvider = ({ children }: { children?: ReactNode }) => {
  const device = useDeviceData();

  const [state, setState] = useState<ContextState>({
    status: "LOADING",
  });

  const [visible, setVisible] = useState(true);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const { isMobile, orientation } =
    device.status === "LOADED"
      ? device.value
      : { isMobile: false, orientation: "landscape" };

  useEffect(() => {
    setState({
      status: "LOADED",
      value: {
        type: isMobile || orientation === "portrait" ? "floating" : "fixed",
        button: visible ? "hide" : "show",
        visible,
        show,
        hide,
      },
    });
  }, [isMobile, orientation, visible, show, hide]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
