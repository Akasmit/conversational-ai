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
    <div className="sticky bottom-0 mx-auto flex w-full max-w-[44rem] flex-col gap-3 bg-background px-3 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <TypingIndicator />
      <ComposerPrimitive.Root
        className="group relative flex w-full flex-col rounded-2xl border border-input bg-background px-1 pt-2 shadow-xs
                   outline-none has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-[3px]
                   has-[textarea:focus-visible]:ring-ring/50"
      >
        {/* Attachments slot (kept for future) */}
        {/* <ComposerAttachments /> */}

        {/* Left + icon */}
        <button
          type="button"
          className="absolute left-3 bottom-3 text-neutral-500 dark:text-neutral-400 hover:text-foreground transition-colors"
          aria-label="Add"
        >
          <Plus className="size-5" />
        </button>

        {/* The actual input, auto-expanding */}
        <ComposerPrimitive.Input
          placeholder="Message..."
          rows={1}
          className="mb-1 max-h-32 min-h-16 w-full resize-none bg-transparent
                     pl-10 pr-20 pt-1.5 pb-3 text-sm sm:text-base
                     text-foreground placeholder:text-muted-foreground
                     outline-none"
        />

        {/* Right mic + send area */}
        <div className="absolute right-3 bottom-3 flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
          <button type="button" className="hover:text-foreground transition-colors" aria-label="Mic">
            <Mic className="size-5" />
          </button>

          {/* When NOT running → show Send */}
          <ThreadPrimitive.If running={false}>
            <ComposerPrimitive.Send asChild>
              <button
                type="submit"
                aria-label="Send message"
                className="rounded-full p-1 bg-primary text-primary-foreground hover:opacity-90"
              >
                <ArrowUpIcon className="size-5" />
              </button>
            </ComposerPrimitive.Send>
          </ThreadPrimitive.If>

          {/* When running → show Stop */}
          <ThreadPrimitive.If running>
            <ComposerPrimitive.Cancel asChild>
              <button
                type="button"
                aria-label="Stop generating"
                className="rounded-full p-1 border border-muted-foreground/60 hover:bg-primary/75"
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
      className="@container flex h-full flex-col bg-background"
      style={{ ["--thread-max-width" as any]: "44rem" }}
    >
      {/* Messages area */}
      <ThreadPrimitive.Viewport className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-3 sm:px-4">
        <ThreadPrimitive.If empty>
          <div className="mx-auto my-auto w-full max-w-[44rem] px-6 sm:px-8 text-center sm:text-left">
            {/* <div className="text-xl sm:text-2xl font-semibold">Hello there!</div>
            <div className="text-sm sm:text-base text-muted-foreground/70">How can I help you today?</div> */}
          </div>
        </ThreadPrimitive.If>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      {/* Composer pinned at bottom */}
      <Composer />
    </ThreadPrimitive.Root>
  );
};
