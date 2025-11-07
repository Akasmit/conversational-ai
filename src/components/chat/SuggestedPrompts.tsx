const prompts = [
    "Summarize this article from a URL",
    "Compare React Query vs Redux Toolkit",
    "Generate a study plan for DSA in 4 weeks",
    "Draft a cold email for internship"
];


function prefillComposer(text: string) {
    // Try to find the Thread composer textarea by placeholder
    const el = document.querySelector<HTMLTextAreaElement>("textarea");
    if (!el) return;
    el.focus();
    el.value = text;
    el.dispatchEvent(new Event("input", { bubbles: true }));
}


export function SuggestedPrompts() {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => prefillComposer(p)}
            className="block w-full text-left rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800
                       focus:ring-2 focus:ring-neutral-400 focus:outline-none px-4 py-3 text-sm shadow-sm
                       whitespace-normal min-h-[56px]"
          >
            <span className="xl:pr-32 line-clamp-2 break-normal leading-snug">{p}</span>
          </button>
        ))}
      </div>
    );
  }