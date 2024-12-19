"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

export type ActivityGroup = "Weekday" | "Week" | "Month" | "Year";

type ContextState = { activityGroup: ActivityGroup; groupIndex: number };

type SetActivityGroupAction = {
  type: "setActivityGroup";
  activityGroup: ActivityGroup;
};

type SetGroupIndexAction = {
  type: "setGroupIndex";
  groupIndex: number;
};

type Action = SetActivityGroupAction | SetGroupIndexAction;

const Context = createContext<[ContextState, Dispatch<Action>] | null>(null);

const reducer = (state: ContextState, action: Action): ContextState => {
  switch (action.type) {
    case "setActivityGroup":
      return {
        ...state,
        activityGroup: action.activityGroup,
      };
    case "setGroupIndex":
      return {
        ...state,
        groupIndex: action.groupIndex,
      };
  }
};

export const useAppState = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useAppState must be used within a AppStateProvider tag");
  }

  return context[0];
};

export const useAppReducer = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useAppState must be used within a AppStateProvider tag");
  }

  return context[1];
};

export const useActivityGroup = () => {
  const state = useAppState();

  return state.activityGroup;
};

export const useGroupIndex = () => {
  const state = useAppState();

  return state.groupIndex;
};

export const useSetActivityGroup = () => {
  const reducer = useAppReducer();

  const setActivityGroup = useCallback(
    (activityGroup: ActivityGroup) => {
      reducer({
        type: "setActivityGroup",
        activityGroup,
      });
    },
    [reducer],
  );

  return setActivityGroup;
};

export const useSetGroupIndex = () => {
  const reducer = useAppReducer();

  const setGroupIndex = useCallback(
    (groupIndex: number) => {
      reducer({
        type: "setGroupIndex",
        groupIndex,
      });
    },
    [reducer],
  );

  return setGroupIndex;
};

export const AppStateProvider = (props: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    activityGroup: "Month",
    groupIndex: 0,
  });

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
