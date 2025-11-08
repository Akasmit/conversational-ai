import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // tailwind
import "@assistant-ui/styles/index.css";
import "@assistant-ui/styles/markdown.css";
import "./styles/globals.css";
import App from "./App";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";

function RuntimeProvider({ children }: { children: React.ReactNode }) {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({ api: "/api/chat" }),
  });

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RuntimeProvider>
    <App />
  </RuntimeProvider>
);