"use client";

import {
  FONT,
  MOBILE_LANDSCAPE_MEDIA_SELECTOR,
  MOBILE_PORTRAIT_MEDIA_SELECTOR,
  SIDEBAR_WIDTH,
  TABLET_LANDSCAPE_MEDIA_SELECTOR,
  TABLET_PORTRAIT_MEDIA_SELECTOR,
} from "@/Components/Configuration/Configuration";
import classNames from "classnames";
import React from "react";
import { Empty } from "../Atoms/Empty";
import { SidebarButton } from "../Molecules/SidebarButton";
import { useDeviceData } from "./DeviceDataProvider";
import styles from "./SidebarDataProvider.module.css";

// TODO: move to global styles
const sidebarCss = `
  ${MOBILE_PORTRAIT_MEDIA_SELECTOR} {
    #fixed-sidebar {
      display: hidden;
      opacity: 0;
    }

    #floating-sidebar {
      display: hidden;
      opacity: 0;
    }
  }

  ${TABLET_PORTRAIT_MEDIA_SELECTOR} {
    #fixed-sidebar {
      display: hidden;
      opacity: 0;
    }

    #floating-sidebar {
      position: fixed;
      top: 0;
      width: ${SIDEBAR_WIDTH}px;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
  }

  ${MOBILE_LANDSCAPE_MEDIA_SELECTOR} {
    #fixed-sidebar {
      display: hidden;
      opacity: 0;
    }

    #floating-sidebar {
      display: hidden;
      opacity: 0;
    }
  }

  ${TABLET_LANDSCAPE_MEDIA_SELECTOR} {
    #fixed-sidebar {
      position: fixed;
      top: 0;
      width: ${SIDEBAR_WIDTH}px;
      bottom: 0;
      left: 0;
    }

    #floating-sidebar {
      display: hidden;
      opacity: 0;
    }
  }

  @media (prefers-color-scheme: dark) {
    #fixed-sidebar,
    #floating-sidebar {
      background-color: rgb(28, 29, 30);
      color: white;
      backdrop-filter: blur(8px);
    }
  }

  @media (prefers-color-scheme: light) {
    #fixed-sidebar,
    #floating-sidebar {
      background-color: rgb(242, 242, 246);
      color: #333333;
      backdrop-filter: blur(8px);
    }
  }

  #fixed-sidebar {
    z-index: 0;
  }

  #fixed-sidebar,
  #floating-sidebar {
    font-family: ${FONT}; // -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-y: auto;
  }
`;

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

const FloatingSidebar: React.FC<{
  visible: boolean;
  children?: React.ReactNode;
}> = (props) => {
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

const FixedSidebar: React.FC<{
  visible: boolean;
  children?: React.ReactNode;
}> = (props) => {
  return (
    <div
      id="fixed-sidebar"
      style={{
        width: props.visible ? 0 : SIDEBAR_WIDTH,
      }}
    >
      {props.children}
    </div>
  );
};

const SidebarAction: React.FC<{
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = (props) => {
  return (
    <div className={styles.sidebarAction}>
      <SidebarButton onClick={props.onClick} />
    </div>
  );
};

export const Sidebar: React.FC<{ children?: React.ReactNode }> = (props) => {
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

export const SidebarDataProvider: React.FC<{ children?: React.ReactNode }> = (
  props,
) => {
  console.debug("sidebarCss", sidebarCss);

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
