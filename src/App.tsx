import { MockRuntimeProvider } from "./lib/MockRuntimeProvider";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";

export default function App() {
  return (
    <MockRuntimeProvider>
      <div className="mx-auto max-w-6xl p-4 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        <aside className="hidden lg:block">
          <ThreadList />
        </aside>
        <main className="min-h-[70vh] border rounded-2xl p-4">
          <Thread />
        </main>
      </div>
    </MockRuntimeProvider>
  );
}
