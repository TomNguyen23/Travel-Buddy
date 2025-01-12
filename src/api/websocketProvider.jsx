import { createContext, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSelector } from "react-redux";

const WebSocketContext = createContext();
export const useWebSocket = () => useContext(WebSocketContext);

const RECONNECT_INTERVAL = 5000; // Thời gian chờ để kết nối lại (ms)

const WebSocketProvider = ({ children }) => {
  const { toast } = useToast();
  const jwtToken = useSelector((state) => state.auth.login?.token);
  const userId = useSelector((state) => state.auth.login?.user?.id);
  const [processedMessageIds, setProcessedMessageIds] = useState(new Set());
  const [notifications, setNotifications] = useState([]);
  const stompClient = useRef(null);
  const reconnectTimeout = useRef(null);

  const connect = () => {
    if (!jwtToken || !userId) {
      console.warn("User is not logged in. WebSocket will not be initialized.");
      return;
    }

    const socket = new SockJS(`https://travel-buddy-production-6a3f.up.railway.app/ws?token=${jwtToken}`, null, {
      withCredentials: true,
    });
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {},
      (frame) => {
        console.log("Connected:", frame);

        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
          reconnectTimeout.current = null;
        }

        stompClient.current.subscribe("/user/queue/notifications", (message) => {
          const messageBody = JSON.parse(message.body);
          const messageId = messageBody.id;

          if (!processedMessageIds.has(messageId)) {
            setProcessedMessageIds((prev) => new Set(prev).add(messageId));
            setNotifications((prev) => [
              ...prev,
              {
                id: messageId,
                title: messageBody.userName,
                description: messageBody.fullMessage,
              },
            ]);

            toast({
              title: "Bạn có thông báo mới",
              description: messageBody.fullMessage,
              action: <ToastAction altText="Try again">OK</ToastAction>,
            });
          } else {
            console.log("Duplicate message ignored:", messageId);
          }
        });
      },
      (error) => {
        console.error("Connection error:", error);
        reconnect();
      }
    );

    socket.onclose = () => {
      console.warn("WebSocket closed. Attempting to reconnect...");
      reconnect();
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      reconnect();
    };
  };

  const reconnect = () => {
    if (reconnectTimeout.current) return;
    reconnectTimeout.current = setTimeout(() => {
      console.log("Attempting to reconnect...");
      connect();
    }, RECONNECT_INTERVAL);
  };

  const sendMessage = (destination, body) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(destination, {}, JSON.stringify(body));
    } else {
      console.warn("Cannot send message: STOMP client is not connected.");
    }
  };

  const subscribe = (destination, callback) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.subscribe(destination, callback);
    } else {
      console.warn("Cannot subscribe: STOMP client is not connected.");
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          console.log("Disconnected successfully.");
        });
      } else {
        console.warn("STOMP client is not connected.");
      }

      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [jwtToken, userId]);

  return (
    <WebSocketContext.Provider
      value={{
        stompClient: stompClient.current,
        sendMessage,
        subscribe,
        notifications,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WebSocketProvider;
