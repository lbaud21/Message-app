import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ username, children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { username } });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
