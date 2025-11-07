import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <Topbar />
      <main className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col">
        {children}
      </main>
    </div>
  );
}
