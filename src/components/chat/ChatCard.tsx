import { Thread } from "@/components/assistant-ui/thread";
import { FooterTips } from "./FooterTips";
import { SuggestedPrompts } from "./SuggestedPRompts";


export function ChatCard() {
return (
<div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
<div className="p-4 md:p-6 border-b">
<div className="mb-3">
<h2 className="text-lg font-semibold">Start a conversation</h2>
<p className="text-sm text-neutral-500">Ask anything. Try one:</p>
</div>
<SuggestedPrompts />
</div>
<div className="min-h-[60dvh]">
<Thread />
</div>
<FooterTips />
</div>
);
}