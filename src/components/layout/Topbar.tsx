import { Sparkles, MessageSquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";


export function Topbar() {
const [model, setModel] = useState("gpt-4o-mini (mock)");
return (
<header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
<div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="size-8 rounded-xl bg-black text-white grid place-items-center shadow">
<Sparkles className="size-4" />
</div>
<h1 className="text-sm font-semibold tracking-wide">Conversational AI</h1>
</div>
<div className="flex items-center gap-3">
<select
value={model}
onChange={(e) => setModel(e.target.value)}
className="h-9 rounded-xl border px-3 text-sm bg-white shadow-sm"
>
<option>gpt-4o-mini (mock)</option>
<option>gpt-4.1-mini (mock)</option>
<option>llama-3.1 (mock)</option>
</select>
<button
title="New chat"
className="h-9 px-3 rounded-xl border bg-white hover:bg-neutral-50 text-sm inline-flex items-center gap-2"
onClick={() => window.location.reload()}
>
<MessageSquarePlus className="size-4" /> New
</button>
<button
title="Clear"
className="h-9 px-3 rounded-xl border bg-white hover:bg-neutral-50 text-sm inline-flex items-center gap-2"
onClick={() => window.location.reload()}
>
<Trash2 className="size-4" /> Clear
</button>
</div>
</div>
</header>
);
}