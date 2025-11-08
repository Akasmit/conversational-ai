import {
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  ActionBarPrimitive,
  ErrorPrimitive,
} from "@assistant-ui/react";
import { ArrowUpIcon, Mic, Plus, CheckIcon, CopyIcon, RefreshCwIcon, Square } from "lucide-react";
import type { FC } from "react";

// OPTIONAL: message error component (styled)
const MessageError: FC = () => (
  <MessagePrimitive.Error>
    <ErrorPrimitive.Root className="mt-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive dark:bg-destructive/5 dark:text-red-200">
      <ErrorPrimitive.Message className="line-clamp-2" />
    </ErrorPrimitive.Root>
  </MessagePrimitive.Error>
);

// OPTIONAL: basic assistant/user message renderers
const AssistantMessage: FC = () => (
  <MessagePrimitive.Root asChild>
    <div className="relative mx-auto w-full max-w-[44rem] py-4 last:mb-6" data-role="assistant">
      <div className="mx-2 leading-7 break-words text-foreground">
        <MessagePrimitive.Parts />
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

const UserMessage: FC = () => (
  <MessagePrimitive.Root asChild>
    <div
      className="mx-auto w-full max-w-[44rem] px-2 py-3 first:mt-3 last:mb-4"
      data-role="user"
    >
      <div className="rounded-3xl bg-muted px-5 py-2.5 text-foreground break-words">
        <MessagePrimitive.Parts />
      </div>
    </div>
  </MessagePrimitive.Root>
);

// “Thinking…” indicator while a response is being generated
const TypingIndicator: FC = () => (
  <ThreadPrimitive.If running>
    <div className="mx-auto w-full max-w-[44rem] px-3 pb-2 text-sm text-muted-foreground">
      <span className="animate-pulse">Thinking…</span>
    </div>
  </ThreadPrimitive.If>
);

// The composer: styled like your custom one, but wired to Assistant UI
const Composer: FC = () => {
  return (
    <div
      className="sticky bottom-0 mx-auto flex w-full max-w-[44rem] flex-col gap-3 bg-background
                 px-3 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]
                 pointer-events-auto z-50"
    >
      <TypingIndicator />

      {/* Remove asChild - let ComposerPrimitive.Root render its own form */}
      <ComposerPrimitive.Root 
        className="relative flex w-full flex-col rounded-2xl border border-input bg-background px-1 pt-2 shadow-xs
                   outline-none has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-[3px]
                   has-[textarea:focus-visible]:ring-ring/50 transition-all"
      >
        {/* Left + icon */}
        <button
          type="button"
          className="absolute left-3 bottom-3 text-neutral-500 dark:text-neutral-400 hover:text-foreground
                     transition-colors cursor-pointer z-20 pointer-events-auto"
          aria-label="Add attachment"
        >
          <Plus className="size-5" />
        </button>

        {/* Input */}
        <ComposerPrimitive.Input
          placeholder="Message..."
          rows={1}
          autoFocus
          className="mb-1 max-h-32 min-h-16 w-full resize-none bg-transparent
                     pl-10 pr-28 pt-1.5 pb-3 text-sm sm:text-base
                     text-foreground placeholder:text-muted-foreground outline-none"
        />

        {/* Right controls */}
        <div
          className="absolute right-3 bottom-3 flex items-center gap-2
                     text-neutral-500 dark:text-neutral-400
                     pointer-events-auto z-30"
        >
          <button
            type="button"
            className="hover:text-foreground transition-colors cursor-pointer"
            aria-label="Mic input"
          >
            <Mic className="size-5" />
          </button>

          {/* Wrap button with ComposerPrimitive.Send */}
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

          {/* Stop button while generating */}
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

// Main Thread component: messages + composer
export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="flex h-full flex-col bg-background"
    >
      {/* Messages area */}
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto">
        <ThreadPrimitive.If empty>
          <div className="flex h-full items-center justify-center">
            {/* Empty state - you can customize this */}
          </div>
        </ThreadPrimitive.If>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      {/* Composer at bottom */}
      <Composer />
    </ThreadPrimitive.Root>
  );
};
