import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";


export function AppShell({ children }: { children: React.ReactNode }) {
return (
<div className="min-h-dvh grid grid-rows-[auto_1fr] bg-neutral-25">
<Topbar />
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] max-w-7xl mx-auto w-full">
<Sidebar />
<main className="p-4 md:p-6">{children}</main>
</div>
</div>
);
}