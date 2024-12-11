// adapted from https://github.com/zebateira/react-use-system-theme/

import { useState, useEffect } from "react";

import useLayoutEffect from "./use-isomorphic-layout-effect";

export const colorSchemes = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
};

function onThemeChange(callback: Function) {
  return (event: MediaQueryListEvent) => {
    if (!event || !event.matches) {
      return;
    }

    callback();
  };
}

export function useSystemTheme(initialTheme?: "light" | "dark" | null) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(
    initialTheme || null,
  );

  useEffect(() => {
    // SSR or matchMedia not supported
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const lightMatch = window.matchMedia(colorSchemes.light);
    const onLightMatches = onThemeChange(() => setTheme("light"));

    lightMatch.addListener(onLightMatches);

    const darkMatch = window.matchMedia(colorSchemes.dark);
    const onDarkMatches = onThemeChange(() => setTheme("dark"));

    darkMatch.addListener(onDarkMatches);

    return () => {
      lightMatch.removeListener(onLightMatches);
      darkMatch.removeListener(onDarkMatches);
    };
  }, []);

  useLayoutEffect(() => {
    // SSR or matchMedia not supported
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    if (window.matchMedia(colorSchemes.dark).matches && theme !== "dark") {
      setTheme("dark");
    } else if (
      window.matchMedia(colorSchemes.light).matches &&
      theme !== "light"
    ) {
      setTheme("light");
    }
  }, [theme]);

  return theme;
}
