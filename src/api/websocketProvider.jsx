import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';

const WebSocketContext = createContext();
export const useWebSocket = () => useContext(WebSocketContext);

const WebSocketProvider = ({ children }) => {
  const { toast } = useToast();
  const jwtToken = useSelector((state) => state.auth.login?.token);
  const userId = useSelector((state) => state.auth.login?.user?.id);
  const stompClient = useRef(null);

  useEffect(() => {
    if (!jwtToken || !userId) {
      console.warn("User is not logged in. WebSocket will not be initialized.");
      return;
    }

    // const socket = new SockJS(`http://localhost:8080/ws?userId=${userId}&token=${jwtToken}`);
    const socket = new SockJS(`http://localhost:8080/ws?token=${jwtToken}`, null, {
      withCredentials: true, // Đảm bảo gửi thông tin xác thực
    });
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {},
      (frame) => {
        console.log("Connected:", frame);

        // Subscribe to user's queue
        stompClient.current.subscribe(`/queue/user-${userId}`, (message) => {
          console.log("Message from server:", message.body);
        });
      },
      // (error) => {
      //   console.error("Connection error:", error);
      // }
    );

    // Cleanup when component is unmounted
    // return () => {
    //   if (stompClient.current) {
    //     stompClient.current.disconnect();
    //   }
    // };
  }, [jwtToken, userId]);

  return (
    <WebSocketContext.Provider value={stompClient.current}>
      {children}
    </WebSocketContext.Provider>
  );
};


WebSocketProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default WebSocketProvider;