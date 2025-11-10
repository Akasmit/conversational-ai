import type { FC } from "react";
import {
  ThreadListItemPrimitive,
  ThreadListPrimitive,
  useAssistantState,
  useThreadListItemRuntime,
} from "@assistant-ui/react";
import { Trash2, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useThreadStore } from "~/stores/threadStore";

type ThreadListProps = {
  searchQuery?: string;
};

export const ThreadList: FC<ThreadListProps> = ({ searchQuery = "" }) => {
  return (
    <ThreadListPrimitive.Root className="aui-root aui-thread-list-root flex flex-col items-stretch gap-1 p-2">
      <ThreadListNew />
      <ThreadListItems searchQuery={searchQuery} />
    </ThreadListPrimitive.Root>
  );
};

const ThreadListNew: FC = () => {
  return (
    <ThreadListPrimitive.New asChild>
      <Button
        className="flex items-center justify-start gap-2 rounded-lg px-3 py-2.5 text-start
                   bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600
                   text-white font-medium shadow-sm transition-colors"
        variant="ghost"
      >
        <PlusIcon className="size-4" />
        New Chat
      </Button>
    </ThreadListPrimitive.New>
  );
};

const ThreadListItems: FC<ThreadListProps> = ({ searchQuery = "" }) => {
  const isLoading = useAssistantState(({ threads }) => threads.isLoading);
  const threads = useThreadStore((state) => state.threads);

  if (isLoading) {
    return <ThreadListSkeleton />;
  }

  // Filter function to check if thread matches search
  const threadMatchesSearch = (threadId: string) => {
    if (!searchQuery.trim()) return true;
    const title = threads[threadId]?.title || "New Chat";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <ThreadListPrimitive.Items 
      components={{ 
        ThreadListItem: () => {
          const itemRuntime = useThreadListItemRuntime();
          const threadId = itemRuntime.getState().threadId;
          
          // Hide if doesn't match search
          if (!threadMatchesSearch(threadId)) {
            return null;
          }
          
          return <ThreadListItem />;
        }
      }} 
    />
  );
};

const ThreadListSkeleton: FC = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          role="status"
          aria-label="Loading threads"
          aria-live="polite"
          className="aui-thread-list-skeleton-wrapper flex items-center gap-2 rounded-md px-3 py-2"
        >
          <Skeleton className="aui-thread-list-skeleton h-[22px] grow" />
        </div>
      ))}
    </>
  );
};

const ThreadListItem: FC = () => {
  // aui-thread-list-item group flex items-center gap-2 rounded-xl mb-1 transition-all
  //            hover:bg-neutral-800/30 dark:hover:bg-neutral-100/10
  //            data-active:bg-neutral-800/50 dark:data-active:bg-neutral-100/20
  //            focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none
  //            hover:shadow-sm
  return (
    <ThreadListItemPrimitive.Root
  className="group flex items-center gap-2 rounded-xl mb-1 transition-all
            hover:bg-neutral-800/30 dark:hover:bg-neutral-100/10
            data-active:bg-neutral-800/50 dark:data-active:bg-neutral-100/20
            focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none
            hover:shadow-sm cursor-pointer"
>
      <ThreadListItemPrimitive.Trigger className="aui-thread-list-item-trigger grow px-3 py-2.5 text-start">
        <ThreadListItemTitle />
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemArchive />
    </ThreadListItemPrimitive.Root>
  );
};

const ThreadListItemTitle: FC = () => {
  const threads = useThreadStore((state) => state.threads);
  const itemRuntime = useThreadListItemRuntime();
  
  // Get the specific thread ID for this list item
  const threadId = itemRuntime.getState().threadId;
  
  // Get title from our store for this specific thread
  const title = threads[threadId]?.title || "New Chat";

  return (
    <span className="aui-thread-list-item-title text-sm font-medium 
                     text-neutral-700 dark:text-neutral-200
                     truncate block max-w-full"
          title={title}>
      {title}
    </span>
  );
};

const ThreadListItemArchive: FC = () => {
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <button
        className="aui-thread-list-item-delete mr-2 p-1 
                   text-neutral-400 hover:text-red-500 dark:hover:text-red-400
                   opacity-0 group-hover:opacity-100 transition-opacity
                   flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-900/20"
        title="Delete thread"
      >
        <Trash2 className="size-4" />
      </button>
    </ThreadListItemPrimitive.Archive>
  );
};
