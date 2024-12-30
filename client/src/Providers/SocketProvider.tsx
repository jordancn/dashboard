"use client";

import { useSetError } from "@/Providers/ErrorStateProvider";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Socket, io as socketIo } from "socket.io-client";

type SocketState =
  | {
      state: "connected";
      socket: Socket;
      transportName: string;
    }
  | {
      state: "disconnected";
    };

type SocketConnectedAction = {
  type: "connected";
  socket: Socket;
  transportName: string;
};

type SocketDisconnectedAction = {
  type: "disconnected";
};

type Action = SocketConnectedAction | SocketDisconnectedAction;

const Context = createContext<[SocketState, Dispatch<Action>] | null>(null);

const reducer = (state: SocketState, action: Action): SocketState => {
  switch (action.type) {
    case "connected":
      return {
        state: "connected",
        socket: action.socket,
        transportName: action.transportName,
      };
    case "disconnected":
      return {
        state: "disconnected",
      };
  }
};

export const useSocketState = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error(
      "useSocketState must be used within a SocketStateProvider tag",
    );
  }

  return context[0];
};

export const useSocketReducer = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error(
      "useSocketReducer must be used within a SocketStateProvider tag",
    );
  }

  return context[1];
};

export const useSocket = () => {
  const state = useSocketState();

  if (state.state !== "connected") {
    return;
  }

  return state;
};

export const useIsSocketConnected = () => {
  const state = useSocketState();

  return state.state === "connected";
};

type AssertionFn<T> = (params: unknown) => asserts params is T;

type AssertedType<A extends AssertionFn<unknown>> =
  A extends AssertionFn<infer U> ? U : never;

export type UseSocketChannel<TSend, TReceive> =
  | {
      state: "connected";
      on: (callback: (data: TReceive) => void) => void;
      emit: (data: TSend) => void;
      off: () => void;
    }
  | {
      state: "disconnected";
    };

export const useSocketChannel = <
  TSend = unknown,
  TAssertionFn extends AssertionFn<unknown> = AssertionFn<unknown>,
>(
  channel: string,
  assertionFn: TAssertionFn,
): UseSocketChannel<TSend, AssertedType<TAssertionFn>> => {
  const state = useSocketState();
  const isConnected = state.state === "connected";

  const on = useCallback(
    (fn: (data: AssertedType<TAssertionFn>) => void) => {
      if (!isConnected) return;

      const assertedFn = (data: unknown) => {
        assertionFn(data);
        return fn(data as AssertedType<TAssertionFn>);
      };

      return state.socket.on(channel, assertedFn);
    },
    [isConnected, state, assertionFn, channel],
  );

  const emit = useCallback(
    (data: TSend) => {
      if (!isConnected) {
        return;
      }

      state.socket.emit(channel, data);
    },
    [isConnected, state, channel],
  );

  const off = useCallback(() => {
    if (!isConnected) {
      return;
    }

    state.socket.off(channel);
  }, [isConnected, state, channel]);

  // Return an object that knows if the socket is connected
  if (!isConnected) {
    return { state: "disconnected" };
  }

  return {
    state: "connected",
    on,
    emit,
    off,
  };
};

const initialSocket = socketIo("http://localhost:4000");

export const SocketProvider = ({ children }: { children?: ReactNode }) => {
  const [socket] = useState<Socket | null>(initialSocket);
  const setError = useSetError();

  const [state, dispatch] = useReducer(reducer, {
    state: "disconnected",
  });

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      if (!socket) {
        return;
      }

      dispatch({
        type: "connected",
        socket,
        transportName: socket.io.engine.transport.name,
      });

      socket.io.on("error", (error) => {
        setError([error]);
      });

      socket.io.engine.on("error", (error) => {
        setError([error]);
      });

      socket.io.engine.on("upgrade", (transport: { name: string }) => {
        dispatch({
          type: "connected",
          socket,
          transportName: transport.name,
        });
      });
    }

    function onDisconnect() {
      dispatch({
        type: "disconnected",
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket, setError]);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
