import { ThreadList } from "@/components/assistant-ui/thread-list";


export function Sidebar() {
    return (
        <aside className="hidden lg:flex lg:flex-col w-64 xl:w-80 border-r border-neutral-200 dark:border-neutral-700 bg-linear-to-b from-indigo-50 to-white dark:from-neutral-800 dark:to-neutral-900 h-full overflow-hidden">
            <div className="shrink-0 p-3 border-b border-neutral-200 dark:border-neutral-700">
                <input
                    placeholder="Search conversations"
                    className="w-full h-9 px-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none dark:text-white"
                />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
                <ThreadList />
            </div>
        </aside>
    );
}