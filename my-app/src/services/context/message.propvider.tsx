import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

type MessageType = "warning" | "success" | "error" | "info";

interface MessageContextProps {
  message: ReactNode | null;
  type: MessageType | null;
  setMessage: (message: ReactNode, type: MessageType) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

export const MessageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessageState] = useState<ReactNode | null>(null);
  const [type, setType] = useState<MessageType | null>(null);

  const setMessage = (msg: ReactNode, msgType: MessageType) => {
    setMessageState(msg);
    setType(msgType);
  };

  const clearMessage = () => {
    setMessageState(null);
    setType(null);
  };

  return (
    <MessageContext.Provider
      value={{ message, type, setMessage, clearMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
