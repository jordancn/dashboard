import {
  MOBILE_LANDSCAPE_MEDIA_LOGIC,
  MOBILE_PORTRAIT_MEDIA_LOGIC,
  TABLET_LANDSCAPE_MEDIA_LOGIC,
  TABLET_PORTRAIT_MEDIA_LOGIC,
} from "@/Components/Configuration/Configuration";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextState =
  | { status: "LOADING" | "ERROR" }
  | {
      status: "LOADED";
      value: {
        isMobile: boolean;
        orientation: "landscape" | "portrait";
        size: "small" | "large";
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

function useMediaQuery(initalQuery: string) {
  const [query, setQuery] = useState(initalQuery);
  const [matches, setMatches] = useState(false);

  // check query and listen for media change.
  useEffect(() => {
    if (!query) return;

    const _onChange = (mql: MediaQueryListEvent) => {
      setMatches(mql.matches);
    };

    const mql = window.matchMedia(query);

    setMatches(mql.matches);

    try {
      mql.addEventListener("change", _onChange);
    } catch {
      mql.addListener(_onChange);
    }

    return () => {
      try {
        mql.removeEventListener("change", _onChange);
      } catch {
        mql.removeListener(_onChange);
      }
    };
  }, [query]);

  return [matches, setQuery] as const;
}

export const DeviceDataProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, setState] = useState<ContextState>({
    status: "LOADING",
  });

  const [isPortraitMobile] = useMediaQuery(MOBILE_PORTRAIT_MEDIA_LOGIC);
  const [isPortraitTablet] = useMediaQuery(TABLET_PORTRAIT_MEDIA_LOGIC);
  const [isLandscapeMobile] = useMediaQuery(MOBILE_LANDSCAPE_MEDIA_LOGIC);
  const [isLandscapeTablet] = useMediaQuery(TABLET_LANDSCAPE_MEDIA_LOGIC);

  useEffect(() => {
    const isMobile = isPortraitMobile || isLandscapeMobile;
    const isPortrait = isPortraitMobile || isPortraitTablet;

    setState({
      status: "LOADED",
      value: {
        isMobile,
        orientation: isPortrait
          ? ("portrait" as const)
          : ("landscape" as const),
        size: isMobile ? ("small" as const) : ("large" as const),
      },
    });
  }, [
    // media,
    isPortraitMobile,
    isPortraitTablet,
    isLandscapeMobile,
    isLandscapeTablet,
  ]);

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};
