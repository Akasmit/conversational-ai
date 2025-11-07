import { Thread } from "@/components/assistant-ui/thread";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { FooterTips } from "./FooterTips";

export function ChatCard() {
  return (
    <div className="relative flex flex-col justify-end bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden h-full dark:text-white">
      {/* Center heading */}
      <div className="absolute p-4 sm:p-6 md:p-10 inset-x-0 top-1/3 text-left transform -translate-y-1/2 pointer-events-none">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 font-serif tracking-wide">Hello there</h2>
        {/* suggested prompts */}
        <div className="mb-2 pt-3 sm:pt-4 text-left">
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Ask anything. Try one:</p>
        </div>
        <div className="pointer-events-auto">
          <SuggestedPrompts />
        </div>
      </div>

      {/* Thread input section at the bottom */}
      <div className="z-10 px-2 sm:px-4 md:px-6 pb-2 sm:pb-3 border-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <Thread />
        <FooterTips />
      </div>
    </div>
  );
}