import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThreadMeta = {
  id: string;
  title?: string;
  createdAt: number;
};

type ThreadState = {
  threads: Record<string, ThreadMeta>;
  upsertThread: (id: string, patch: Partial<ThreadMeta>) => void;
  setTitleIfEmpty: (id: string, title: string) => void;
};

export const useThreadStore = create<ThreadState>()(
  persist(
    (set) => ({
      threads: {},
      upsertThread: (id, patch) =>
        set((s) => ({
          threads: {
            ...s.threads,
            [id]: {
              ...s.threads[id],
              id,
              createdAt: s.threads[id]?.createdAt ?? Date.now(),
              ...patch,
            },
          },
        })),
      setTitleIfEmpty: (id, title) =>
        set((s) => {
          const t = s.threads[id];
          if (t?.title) return s; // already titled
          return {
            threads: {
              ...s.threads,
              [id]: {
                ...t,
                id,
                createdAt: t?.createdAt ?? Date.now(),
                title,
              },
            },
          };
        }),
    }),
    { name: "chat-threads" }
  )
);

// Utility to build a nice title from the prompt
export function makeTitleFromPrompt(raw: string, max = 60) {
  const txt = raw.replace(/\s+/g, " ").replace(/[#*_`]/g, "").trim();
  return txt.length > max ? txt.slice(0, max - 1) + "…" : txt || "New chat";
}
