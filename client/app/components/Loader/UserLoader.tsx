import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { ReactNode, useEffect } from "react";
import Loader from "./Loader";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserLoader = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    if (!socketId) return;

    socketId.on("connection", () => {
      console.log("Socket connected with id:", socketId.id);
    });

    return () => {
      socketId.disconnect(); // cleanup on unmount
    };
  }, [socketId]);

  return <>{isLoading ? <Loader /> : <div>{children}</div>}</>;
};

export default UserLoader;
