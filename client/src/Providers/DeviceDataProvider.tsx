"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import isMobile from "is-mobile";
import _ from "lodash";

type ContextState =
  | { status: "LOADING" | "ERROR" }
  | {
      status: "LOADED";
      value: {
        isMobile: boolean;
        orientation: "landscape" | "portrait";
        canScroll: boolean;
      };
    };

const Context = createContext<ContextState | null>(null);

export const useDeviceData = (): ContextState => {
  const contextState = useContext(Context);

  if (contextState === null) {
    throw new Error(
      "useDeviceData must be used within a DeviceDataProvider tag",
    );
  }

  return contextState;
};

const isPortrait = (type: ScreenOrientation["type"]) => {
  return type === "portrait-primary" || type === "portrait-secondary";
};

const getOrientation = (orientation: ScreenOrientation) => {
  return isPortrait(orientation.type)
    ? ("portrait" as const)
    : ("landscape" as const);
};

export const DeviceDataProvider = ({ children }: { children?: ReactNode }) => {
  const [state, setState] = useState<ContextState>({
    status: "LOADING",
  });

  const isMobileTablet = isMobile({ tablet: true });
  const isMobilePhone = isMobile({ tablet: false });

  const orientationChangeEventHandler = useCallback(
    () =>
      _.throttle((event: Event) => {
        setState((prevState) => {
          if (!(event.target instanceof ScreenOrientation)) {
            return prevState;
          }

          const newOrientation = getOrientation(event.target);

          if (
            prevState.status === "LOADED" &&
            prevState.value.orientation === newOrientation
          ) {
            return prevState;
          }

          return {
            status: "LOADED",
            value: {
              isMobile: isMobilePhone || isMobileTablet,
              orientation: newOrientation,
              canScroll:
                prevState.status === "LOADED" && prevState.value.canScroll,
            },
          };
        });
      }, 500),
    [setState, state],
  );

  useEffect(() => {
    screen.orientation.addEventListener(
      "change",
      orientationChangeEventHandler,
    );

    const orientation = window.screen.orientation;

    setState({
      status: "LOADED",
      value: {
        isMobile: isMobilePhone || isMobileTablet,
        orientation: getOrientation(orientation),
        canScroll: true,
      },
    });
  }, [isMobileTablet, isMobilePhone]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
