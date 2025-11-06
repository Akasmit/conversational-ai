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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
    {prompts.map((p) => (
    <button
    key={p}
    onClick={() => prefillComposer(p)}
    className="text-left rounded-2xl border bg-white hover:bg-neutral-50 px-3 py-2 text-sm shadow-sm"
    >
    {p}
    </button>
    ))}
    </div>
    );
    }