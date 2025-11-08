import { useEffect, useRef } from "react";
import {
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  ActionBarPrimitive,
  ErrorPrimitive,
  useComposerRuntime,
  useThreadRuntime,
} from "@assistant-ui/react";
import { ArrowUpIcon, Mic, Plus, CheckIcon, CopyIcon, RefreshCwIcon, Square } from "lucide-react";
import type { FC } from "react";
import { SuggestedPrompts } from "~/components/chat/SuggestedPrompts";
import ReactMarkdown from "react-markdown";
import { useThreadStore } from "~/stores/threadStore";

// Message Error Component
const MessageError: FC = () => (
  <MessagePrimitive.Error>
    <ErrorPrimitive.Root className="mt-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive dark:bg-destructive/5 dark:text-red-200">
      <ErrorPrimitive.Message className="line-clamp-2" />
    </ErrorPrimitive.Root>
  </MessagePrimitive.Error>
);

// Assistant Message with Markdown Support
const AssistantMessage: FC = () => (
  <MessagePrimitive.Root asChild>
    <div className="relative mx-auto w-full max-w-176 py-4 last:mb-6" data-role="assistant">
      <div className="mx-2 leading-7 wrap-break-word text-foreground prose prose-sm dark:prose-invert max-w-none">
        <MessagePrimitive.Content
          components={{
            Text: ({ text }) => (
              <ReactMarkdown
                components={{
                  // Style the markdown elements
                  p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold mb-2 mt-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-2">{children}</h3>,
                  code: ({ children, className }) => {
                    const isInline = !className?.includes('language-');
                    return isInline ? (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                    ) : (
                      <code className="block bg-muted p-3 rounded-lg text-sm font-mono overflow-x-auto mb-4">{children}</code>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic my-4">{children}</blockquote>
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            ),
          }}
        />
        <MessageError />
      </div>
      <div className="mt-2 ml-2 flex gap-1 text-muted-foreground">
        <ActionBarPrimitive.Copy asChild>
          <button className="rounded-md px-2 py-1 hover:bg-accent">
            <MessagePrimitive.If copied><CheckIcon className="size-4" /></MessagePrimitive.If>
            <MessagePrimitive.If copied={false}><CopyIcon className="size-4" /></MessagePrimitive.If>
          </button>
        </ActionBarPrimitive.Copy>
        <ActionBarPrimitive.Reload asChild>
          <button className="rounded-md px-2 py-1 hover:bg-accent">
            <RefreshCwIcon className="size-4" />
          </button>
        </ActionBarPrimitive.Reload>
      </div>
    </div>
  </MessagePrimitive.Root>
);

// User Message
const UserMessage: FC = () => (
  <MessagePrimitive.Root asChild>
    <div
      className="mx-auto w-full max-w-176 px-2 py-3 first:mt-3 last:mb-4 flex justify-end"
      data-role="user"
    >
      <div className="rounded-2xl bg-indigo-600 dark:bg-indigo-700 px-5 py-2.5 text-white wrap-break-word shadow-sm max-w-[85%]">
        <MessagePrimitive.Content />
      </div>
    </div>
  </MessagePrimitive.Root>
);

// Typing Indicator
const TypingIndicator: FC = () => (
  <ThreadPrimitive.If running>
    <div className="mx-auto w-full max-w-176 px-3 pb-2 text-sm text-muted-foreground">
      <span className="animate-pulse">Thinking…</span>
    </div>
  </ThreadPrimitive.If>
);

// Composer
const Composer: FC = () => {
  const threadRuntime = useThreadRuntime();
  const composerRuntime = useComposerRuntime();
  const setTitleIfEmpty = useThreadStore((state) => state.setTitleIfEmpty);

  const handleSubmit = () => {
    // Get the current input value before it's cleared
    const text = composerRuntime.getState().text.trim();
    
    if (text) {
      // Get thread ID from runtime state
      const threadId = threadRuntime.getState().threadId || 'default';
      
      // Truncate to first 50 chars for title
      const title = text.length > 50 ? text.substring(0, 50) + '...' : text;
      
      // Set title only if it's empty (first message)
      setTitleIfEmpty(threadId, title);
    }
  };

  return (
    <div
      className="sticky bottom-0 mx-auto flex w-full max-w-176 flex-col gap-3 bg-background
                 px-3 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]
                 pointer-events-auto z-50"
    >
      <TypingIndicator />
      <ComposerPrimitive.Root
        onSubmit={handleSubmit}
        className="relative flex w-full flex-col rounded-2xl border border-input bg-background px-1 pt-2 shadow-xs
                   outline-none has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-[3px]
                   has-[textarea:focus-visible]:ring-ring/50 transition-all"
      >
        <button
          type="button"
          className="absolute left-3 bottom-3 text-neutral-500 dark:text-neutral-400 hover:text-foreground
                     transition-colors cursor-pointer z-20 pointer-events-auto"
          aria-label="Add attachment"
        >
          <Plus className="size-5" />
        </button>

        <ComposerPrimitive.Input
          placeholder="Message..."
          rows={1}
          autoFocus
          className="mb-1 max-h-32 min-h-16 w-full resize-none bg-transparent
                     pl-10 pr-28 pt-1.5 pb-3 text-sm sm:text-base
                     text-foreground placeholder:text-muted-foreground outline-none"
        />

        <div
          className="absolute right-3 bottom-3 flex items-center gap-2
                     text-neutral-500 dark:text-neutral-400
                     pointer-events-auto z-30"
        >
          <button type="button" className="hover:text-foreground transition-colors cursor-pointer" aria-label="Mic input">
            <Mic className="size-5" />
          </button>

          <ComposerPrimitive.Send asChild>
            <button
              type="submit"
              aria-label="Send message"
              className="rounded-full p-1.5 bg-primary text-primary-foreground
                         hover:bg-primary/90 transition-transform cursor-pointer active:scale-95"
            >
              <ArrowUpIcon className="size-5" />
            </button>
          </ComposerPrimitive.Send>

          <ThreadPrimitive.If running>
            <ComposerPrimitive.Cancel asChild>
              <button
                type="button"
                aria-label="Stop generating"
                className="rounded-full p-1 border border-muted-foreground/60 hover:bg-accent cursor-pointer"
              >
                <Square className="size-4" />
              </button>
            </ComposerPrimitive.Cancel>
          </ThreadPrimitive.If>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
};

// Main Thread Component
export const Thread: FC = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const scrollToEnd = () => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    // initial scroll
    scrollToEnd();

    // keep pinned to bottom while content grows
    const obs = new MutationObserver(scrollToEnd);
    obs.observe(vp, { childList: true, subtree: true });

    return () => obs.disconnect();
  }, []);

  return (
    <ThreadPrimitive.Root className="flex min-h-0 h-full flex-col bg-background">
      <ThreadPrimitive.Viewport
        ref={viewportRef}
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ scrollbarGutter: "stable" }}
      >
        {/* Empty State - Centered */}
        <ThreadPrimitive.If empty>
          <div className="flex flex-col items-center justify-center min-h-full px-4 sm:px-6 py-10">
            <div className="w-full max-w-176 text-center">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 font-serif tracking-wide">
                Hello there
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Ask anything. Try one:
              </p>
              <div className="mt-4">
                <SuggestedPrompts />
              </div>
            </div>
          </div>
        </ThreadPrimitive.If>

        {/* Messages - Left aligned with max-width container */}
        <div className="px-3 sm:px-4 pt-4">
          <ThreadPrimitive.Messages
            components={{
              UserMessage,
              AssistantMessage,
            }}
          />
        </div>

        {/* Anchor for auto-scroll */}
        <div ref={endRef} />
      </ThreadPrimitive.Viewport>

      <Composer />
    </ThreadPrimitive.Root>
  );
};