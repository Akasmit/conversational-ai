"use client";
import type { ReactNode } from "react";
import {
AssistantRuntimeProvider,
useLocalRuntime,
type ChatModelAdapter,
} from "@assistant-ui/react";


const MockAdapter: ChatModelAdapter = {
async *run({ messages }) {
const lastUser = [...messages].reverse().find((m) => m.role === "user");
const userText =
lastUser?.content?.map?.((p: any) => ("text" in p ? p.text : ""))?.join("") ||
"Tell me something interesting about frontend dev.";


const reply = `Mocked response for: "${userText}" — streaming without a backend.\n\n- You can customize layout, colors, and spacing.\n- Replace this mock with a real adapter later.`;


let out = "";
for (const token of reply.split(" ")) {
out += (out ? " " : "") + token;
await new Promise((r) => setTimeout(r, 30));
yield { content: [{ type: "text" as const, text: out }] };
}
},
};


export function MockRuntimeProvider({ children }: { children: ReactNode }) {
const runtime = useLocalRuntime(MockAdapter);
return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}