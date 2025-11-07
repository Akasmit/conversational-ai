import { ThreadList } from "@/components/assistant-ui/thread-list";


export function Sidebar() {
    return (
        <aside className="hidden lg:block border-r bg-neutral-50/60">
            <div className="p-3">
                <input
                    placeholder="Search conversations"
                    className="w-full h-9 px-3 rounded-xl border bg-white text-sm"
                />
            </div>
            <div className="h-[calc(100dvh-56px)] overflow-y-auto">
                <ThreadList />
            </div>
        </aside>
    );
}