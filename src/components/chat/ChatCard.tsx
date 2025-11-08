import { Thread } from "~/components/assistant-ui/thread";
import { FooterTips } from "./FooterTips";

export function ChatCard() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm dark:text-white w-full max-w-4xl mx-auto overflow-hidden">

      {/* Only the thread + footer; the “hero” now lives inside Thread when empty */}
      <div className="flex-1 min-h-0">
        <Thread />
      </div>

      <div className="shrink-0 px-2 sm:px-4 md:px-6 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-3 pt-2 bg-white dark:bg-neutral-900 w-full">
        <FooterTips />
      </div>
    </div>
  );
}
