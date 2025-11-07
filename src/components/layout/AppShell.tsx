import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr] bg-neutral-50 dark:bg-neutral-900">
            <Topbar />
            <main className="p-2 sm:p-4 md:p-6 min-h-0 overflow-hidden">{children}</main>
        </div>
    );
}