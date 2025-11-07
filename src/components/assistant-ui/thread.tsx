import { useState, useRef, useEffect } from "react";
import { Plus, Mic, ArrowUpCircle } from "lucide-react";

export function Thread() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const maxHeight = 200; // px
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Sending:", input);
    setInput("");
  };

  return (
    <div className="z-10 border-0x bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm p-3">
      <div className="relative flex items-end w-full max-w-4xl mx-auto">
        {/* Plus icon */}
        <button className="absolute left-3 bottom-3 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
          <Plus className="w-5 h-5" />
        </button>

        {/* Input box (auto-expand) */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Message..."
          rows={1}
          className="w-full resize-none rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-neutral-400 focus:outline-none pl-10 pr-20 py-3 text-sm shadow-sm max-h-[200px] transition-all duration-200 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          style={{ scrollbarGutter: "stable" }}
        />

        {/* Mic and send icons */}
        <div className="absolute right-3 bottom-3 flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
          <button className="hover:text-black dark:hover:text-white transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            className="hover:text-black dark:hover:text-white transition-transform transform hover:-translate-y-0.5"
          >
            <ArrowUpCircle className="w-6 h-6" fill="black" stroke="white" />
          </button>
        </div>
      </div>
    </div>
  );
}