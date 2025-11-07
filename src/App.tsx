import { AppShell } from "@/components/layout/AppShell";
import { ChatCard } from "@/components/chat/ChatCard";
import { MockRuntimeProvider } from "@/lib/MockRuntimeProvider";


export default function App() {
  return (
    <MockRuntimeProvider>
      <AppShell>
        <ChatCard />
      </AppShell>
    </MockRuntimeProvider>
  );
}