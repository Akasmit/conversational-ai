import { Sparkles, MessageSquarePlus, Trash2, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";


export function Topbar() {
    const [model, setModel] = useState("gpt-4o-mini (mock)");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-20 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 border-b border-indigo-700 dark:border-indigo-900 shadow-md">
            <div className="mx-auto max-w-7xl px-3 sm:px-4 h-14 flex items-center justify-between">
                {/* Left side - Logo and Title */}
                <div className="flex items-center gap-2 min-w-0">
                    <div className="size-8 rounded-xl bg-white text-indigo-600 grid place-items-center shadow shrink-0">
                        <Sparkles className="size-4" />
                    </div>
                    <h1 className="text-sm font-semibold tracking-wide truncate text-white">Conversational AI</h1>
                </div>

                {/* Desktop Navigation - Hidden on mobile, visible from md onwards */}
                <div className="hidden md:flex items-center gap-3">
                    <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="h-9 rounded-xl border border-white/20 px-3 text-sm bg-white/10 backdrop-blur shadow-sm text-white focus:ring-2 focus:ring-white/50 outline-none"
                    >
                        <option className="text-black">gpt-4o-mini (mock)</option>
                        <option className="text-black">gpt-4.1-mini (mock)</option>
                        <option className="text-black">llama-3.1 (mock)</option>
                    </select>
                    <button
                        title="New chat"
                        className="h-9 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-sm inline-flex items-center gap-2 text-white backdrop-blur"
                        onClick={() => window.location.reload()}
                    >
                        <MessageSquarePlus className="size-4" /> New
                    </button>
                    <button
                        title="Clear"
                        className="h-9 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-sm inline-flex items-center gap-2 text-white backdrop-blur"
                        onClick={() => window.location.reload()}
                    >
                        <Trash2 className="size-4" /> Clear
                    </button>
                    <ThemeToggle />
                </div>

                {/* Mobile Hamburger - Visible only on mobile, hidden from md onwards */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden h-9 w-9 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 inline-flex items-center justify-center text-white"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            {/* Mobile Menu - Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-indigo-700 dark:border-indigo-900 bg-indigo-500 dark:bg-indigo-900">
                    <div className="px-3 py-3 space-y-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-white">Model</label>
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="h-9 rounded-xl border border-white/20 px-3 text-sm bg-white/10 text-white shadow-sm w-full focus:ring-2 focus:ring-white/50 outline-none"
                            >
                                <option className="text-black">gpt-4o-mini (mock)</option>
                                <option className="text-black">gpt-4.1-mini (mock)</option>
                                <option className="text-black">llama-3.1 (mock)</option>
                            </select>
                        </div>
                        <button
                            title="New chat"
                            className="w-full h-9 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-sm inline-flex items-center justify-center gap-2 text-white"
                            onClick={() => {
                                window.location.reload();
                                setIsMenuOpen(false);
                            }}
                        >
                            <MessageSquarePlus className="size-4" /> New Chat
                        </button>
                        <button
                            title="Clear"
                            className="w-full h-9 px-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-sm inline-flex items-center justify-center gap-2 text-white"
                            onClick={() => {
                                window.location.reload();
                                setIsMenuOpen(false);
                            }}
                        >
                            <Trash2 className="size-4" /> Clear
                        </button>
                        <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                            <span className="text-xs font-medium text-white">Theme</span>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}