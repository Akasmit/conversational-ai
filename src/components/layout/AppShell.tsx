import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
      <Topbar />
      <div className="flex-1 min-h-0 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
