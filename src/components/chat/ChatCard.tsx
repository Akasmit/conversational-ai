import { Thread } from "@/components/assistant-ui/thread";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { FooterTips } from "./FooterTips";
import { useThreadRuntime } from "@assistant-ui/react";

export function ChatCard() {
  const threadRuntime = useThreadRuntime();

  const testSendMessage = () => {
    console.log('[ChatCard] Test button clicked');
    
    try {
      // Use the correct API for sending messages
      threadRuntime.composer.setText('Hello, this is a test message!');
      console.log('[ChatCard] Text set in composer');
      
      threadRuntime.composer.send();
      console.log('[ChatCard] Message sent!');
    } catch (error) {
      console.error('[ChatCard] Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm dark:text-white w-full max-w-4xl mx-auto overflow-hidden">
      {/* TEST BUTTON - Remove after debugging */}
      <div className="p-4 bg-yellow-100 dark:bg-yellow-900">
        <button 
          onClick={testSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🧪 Test Send Message
        </button>
      </div>

      {/* Heading & prompts section */}
      <div className="flex-1 min-h-0 flex flex-col justify-center p-4 sm:p-6 md:p-10 text-left pointer-events-none overflow-y-auto">
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 font-serif tracking-wide">Hello there</h2>
        <div className="mb-2 pt-3 sm:pt-4 text-left">
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Ask anything. Try one:</p>
        </div>
        <div className="pointer-events-auto w-full">
          <SuggestedPrompts />
        </div>
      </div>
      
      {/* Thread input section at the bottom */}
      <div className="shrink-0 px-2 sm:px-4 md:px-6 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-3 pt-2 bg-white dark:bg-neutral-900 w-full">
        <Thread />
        <FooterTips />
      </div>
    </div>
  );
}