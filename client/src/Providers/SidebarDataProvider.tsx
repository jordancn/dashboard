"use client";

import { Empty } from "@/Atoms/Empty";
import { SidebarButton } from "@/Molecules/SidebarButton";
import { useDeviceData } from "@/Providers/DeviceDataProvider";
import classNames from "classnames";
import React from "react";
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

const Context = React.createContext<ContextState | null>(null);

export const useSidebarData = (): ContextState => {
  const contextState = React.useContext(Context);

  if (contextState === null) {
    throw new Error(
      "useSidebarData must be used within a SidebarDataProvider tag",
    );
  }

  return contextState;
};

const FloatingSidebar = (props: {
  visible: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div
      id="floating-sidebar"
      className={classNames(styles.floatingSidebar, {
        visible: props.visible,
      })}
    >
      {props.children}
    </div>
  );
};

const FixedSidebar = (props: {
  visible: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div
      id="fixed-sidebar"
      style={{
        width: props.visible ? 0 : "var(--sidebar-width)",
      }}
    >
      {props.children}
    </div>
  );
};

const SidebarAction = (props: {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div className={styles.sidebarAction}>
      <SidebarButton onClick={props.onClick} />
    </div>
  );
};

export const Sidebar = (props: { children?: React.ReactNode }) => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return null;
  }

  return (
    <div>
      <FloatingSidebar visible={sidebarData.value.visible}>
        <SidebarAction onClick={sidebarData.value.hide} />
        {props.children}
      </FloatingSidebar>
      <FixedSidebar visible={sidebarData.value.visible}>
        <SidebarAction onClick={sidebarData.value.hide} />
        {props.children}
      </FixedSidebar>
    </div>
  );
};

export const SidebarDataProvider = (props: { children?: React.ReactNode }) => {
  const device = useDeviceData();

  const [state, setState] = React.useState<ContextState>({
    status: "LOADING",
  });

  const [visible, setVisible] = React.useState(true);

  const show = React.useCallback(() => {
    setVisible(true);
  }, []);

  const hide = React.useCallback(() => {
    setVisible(false);
  }, []);

  React.useEffect(() => {
    if (device.status !== "LOADED") {
      return;
    }

    setState({
      status: "LOADED",
      value: {
        type:
          device.value.isMobile || device.value.orientation === "portrait"
            ? "floating"
            : "fixed",
        button: visible ? "hide" : "show",
        visible,
        show,
        hide,
      },
    });
  }, [device, visible, show, hide]);

  return (
    <Empty>
      <Context.Provider value={state}>{props.children}</Context.Provider>
    </Empty>
  );
};
