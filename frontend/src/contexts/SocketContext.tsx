import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "../types/interfaces/user.interace";
import { useSelectAuthUser } from "../store/auth/selector";
import { API_URL } from "../constants";
import { Socket, io } from "socket.io-client";

export interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<ISocketContext | undefined>(
  undefined
);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const user = useSelectAuthUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (user) {
      const newSocket = io(API_URL || "http://localhost:3001", {
        transports: ["websocket"],
        query: {
          userId: user?._id!,
        },
      });
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);
  useEffect(() => {
    if (socket === null) return;
    socket?.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket phải được sử dụng trong SocketProvider");
  }
  return context;
};
