import { useState } from "react";
import { ThreadList } from "@/components/assistant-ui/thread-list";


export function Sidebar() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <aside className="hidden lg:flex lg:flex-col w-64 xl:w-80 border-r border-border bg-card h-full overflow-hidden">
            <div className="shrink-0 p-3 border-b border-border">
                <input
                    type="text"
                    placeholder="Search conversations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
                />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
                <ThreadList searchQuery={searchQuery} />
            </div>
        </aside>
    );
}