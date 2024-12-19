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

// function useMediaQuery(initalQuery: string) {
//   const [query, setQuery] = useState(initalQuery);
//   const [matches, setMatches] = useState(false);

//   // check query and listen for media change.
//   useEffect(() => {
//     if (!query) return;

//     const _onChange = (mql: MediaQueryListEvent) => {
//       setMatches(mql.matches);
//     };

//     const mql = window.matchMedia(query);

//     setMatches(mql.matches);

//     try {
//       mql.addEventListener("change", _onChange);
//     } catch {
//       mql.addListener(_onChange);
//     }

//     return () => {
//       try {
//         mql.removeEventListener("change", _onChange);
//       } catch {
//         mql.removeListener(_onChange);
//       }
//     };
//   }, [query]);

//   return [matches, setQuery] as const;
// }

// consider using react-device-detect

const isPortrait = (type: ScreenOrientation["type"]) => {
  return type === "portrait-primary" || type === "portrait-secondary";
};

const getOrientation = (orientation: ScreenOrientation) => {
  return isPortrait(orientation.type)
    ? ("portrait" as const)
    : ("landscape" as const);
};

export const DeviceDataProvider = (props: { children?: ReactNode }) => {
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
  }, [isMobileTablet, isMobilePhone, orientationChangeEventHandler]);

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};
