import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageProvider } from "./services/context/message.propvider.tsx";

const quryClinet = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={quryClinet}>
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </QueryClientProvider>
  </StrictMode>
);
