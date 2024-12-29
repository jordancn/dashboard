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

export type UseSocketChannel<TSend, TReceive> = {
  state: "connected" | "disconnected";
  on?: (callback: (data: TReceive) => void) => void;
  emit?: (data: TSend) => void;
};

export const useSocketChannel = <TSend, TReceive>(
  channel: string,
): UseSocketChannel<TSend, TReceive> => {
  const state = useSocketState();

  const isConnected = state.state === "connected";

  const on = useCallback(
    (fn: (data: TReceive) => void) => {
      if (!isConnected) {
        return;
      }

      return state.socket.on(channel, fn);
    },
    [isConnected, state],
  );

  const emit = useCallback(
    (data: TSend) => {
      if (!isConnected) {
        return;
      }

      state.socket.emit(channel, data);
    },
    [isConnected, state],
  );

  if (!isConnected) {
    return {
      state: "disconnected",
    };
  }

  return {
    state: "connected",
    on,
    emit,
  };
};

const initialSocket = socketIo("http://localhost:4000");

export const SocketProvider = ({ children }: { children?: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(initialSocket);
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
