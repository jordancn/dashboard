"use client";

import { NetworkError } from "@apollo/client/errors";
import { GraphQLFormattedError } from "graphql";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

type ErrorState =
  | {
      state: "error";
      error: Array<GraphQLFormattedError | NetworkError | string>;
    }
  | {
      state: "clear";
    };

type SetErrorStateAction = {
  type: "error";
  error: Array<GraphQLFormattedError | NetworkError | string>;
};

type ClearErrorStateAction = {
  type: "clear";
};

type Action = SetErrorStateAction | ClearErrorStateAction;

const Context = createContext<[ErrorState, Dispatch<Action>] | null>(null);

const reducer = (state: ErrorState, action: Action): ErrorState => {
  switch (action.type) {
    case "error":
      return {
        state: "error",
        error: action.error,
      };
    case "clear":
      return {
        state: "clear",
      };
  }
};

export const useErrorState = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error(
      "useErrorState must be used within a ErrorStateProvider tag",
    );
  }

  return context[0];
};

export const useErrorReducer = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error(
      "useErrorReducer must be used within a ErrorStateProvider tag",
    );
  }

  return context[1];
};

export const useError = () => {
  const state = useErrorState();

  if (state.state !== "error") {
    return;
  }

  return state.error;
};

export const useSetError = () => {
  const reducer = useErrorReducer();

  const setError = useCallback(
    (error: Array<GraphQLFormattedError | NetworkError | string>) => {
      reducer({
        type: "error",
        error,
      });
    },
    [reducer],
  );

  return setError;
};

export const useClearError = () => {
  const reducer = useErrorReducer();

  const clearError = useCallback(() => {
    reducer({
      type: "clear",
    });
  }, [reducer]);

  return clearError;
};

export const ErrorStateProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    state: "clear",
  });

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
