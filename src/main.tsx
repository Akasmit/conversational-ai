import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@assistant-ui/styles/index.css";
import "@assistant-ui/styles/markdown.css";
import "./styles/globals.css";
import App from "./App";
import { AssistantRuntimeProvider, useLocalRuntime } from "@assistant-ui/react";
import type { ChatModelRunOptions, ChatModelRunResult } from "@assistant-ui/react";

function RuntimeProvider({ children }: { children: React.ReactNode }) {
  const runtime = useLocalRuntime({
    run: async (options: ChatModelRunOptions): Promise<ChatModelRunResult> => {
      const { messages, abortSignal } = options;
      console.log('[ChatAdapter] Sending messages:', messages);
      
      const response = await fetch("http://localhost:8787/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal: abortSignal,
      });

      console.log('[ChatAdapter] Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';
      const chunks: string[] = [];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('[ChatAdapter] Stream done. Total chunks:', chunks.length);
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        
        // Parse data stream format: 0:"text"\n
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('0:')) {
            const json = line.substring(2);
            try {
              const text = JSON.parse(json);
              chunks.push(text);
              if (chunks.length <= 5) {
                console.log('[ChatAdapter] Chunk', chunks.length, ':', text);
              }
            } catch (e) {
              console.error('[ChatAdapter] Parse error:', e);
            }
          }
        }
      }

      // Return the full text as a single message
      const fullText = chunks.join('');
      console.log('[ChatAdapter] Returning full text, length:', fullText.length);
      console.log('[ChatAdapter] First 100 chars:', fullText.substring(0, 100));
      
      return {
        content: [{ type: "text", text: fullText }],
      };
    }
  });

  console.log('[RuntimeProvider] Runtime created');

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RuntimeProvider>
      <App />
    </RuntimeProvider>
  </React.StrictMode>
);