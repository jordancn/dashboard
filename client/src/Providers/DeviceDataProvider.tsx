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
        if (event.target instanceof ScreenOrientation) {
          if (state.status !== "LOADED") {
            return;
          }

          const newOrientation = getOrientation(event.target);

          if (state.value.orientation === newOrientation) {
            return;
          }

          setState((prevState) => {
            if (prevState.status !== "LOADED") {
              return prevState;
            }

            return {
              ...prevState,
              value: {
                ...prevState.value,
                orientation: newOrientation,
              },
            };
          });
        }
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
      },
    });
  }, [isMobileTablet, isMobilePhone]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
