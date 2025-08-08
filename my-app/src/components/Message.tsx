import { useEffect, useRef, useState } from "react";
import { useMessage } from "../services/context/message.propvider";

const typeClasses: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
};

const Message = () => {
  const { message, type, clearMessage } = useMessage();
  const [visible, setVisible] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (message && type) {
      setVisible(false);
      // Wait for DOM update before fading in
      setTimeout(() => setVisible(true), 10);
    }
    // Reset fade when message/type changes
    return () => setVisible(false);
  }, [message, type]);

  if (!message || !type) return null;

  return (
    <div
      className={`p-4 pl-10 rounded-md my-4 shadow-sm w-fit absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } ${typeClasses[type] || "bg-gray-100 text-gray-800"}`}
    >
      <span>{message}</span>
      <button
        onClick={clearMessage}
        className="absolute top-1/2 -translate-y-1/2 left-3 bg-transparent border-none text-xl cursor-pointer"
        aria-label="Close message"
        type="button"
      >
        ×
      </button>
    </div>
  );
};

export default Message;
