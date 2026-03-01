import { useState } from "react";

export interface InputPhaseProps {
    items: string[];
    setItems: React.Dispatch<React.SetStateAction<string[]>>;
    onStart: () => void;
    windowDays: number;
    setWindowDays: React.Dispatch<React.SetStateAction<number>>;
}

export function InputPhase({
    items,
    setItems,
    onStart,
    windowDays,
    setWindowDays
}: InputPhaseProps) {
    const [inputValue, setInputValue] = useState("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed && !items.includes(trimmed)) {
            setItems([...items, trimmed]);
            setInputValue("");
        } else if (items.includes(trimmed)) {
            alert("Item already exists!");
        }
    };

    const removeItem = (indexToRemove: number) => {
        setItems(items.filter((_, index) => index !== indexToRemove));
    };

    const startEdit = (index: number, value: string) => {
        setEditingIndex(index);
        setEditValue(value);
    };

    const saveEdit = (e: React.FormEvent, index: number) => {
        e.preventDefault();
        const trimmed = editValue.trim();
        if (!trimmed) {
            removeItem(index);
        } else {
            const newItems = [...items];
            // Note: we can warn if saving text that exists somewhere else, 
            // but for tradeoff simplicity we'll just allow setting.
            newItems[index] = trimmed;
            setItems(newItems);
        }
        setEditingIndex(null);
    };

    return (
        <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center mb-6">
                <p className="text-slate-900 dark:text-slate-100 text-xl font-bold text-center mb-2">
                    Add your goals.
                </p>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span>What matters in the next</span>
                    <input
                        type="number"
                        value={windowDays}
                        onChange={(e) => setWindowDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 bg-transparent border-b border-slate-300 dark:border-slate-800 text-center font-bold text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                    />
                    <span>days?</span>
                </div>
            </div>

            <form onSubmit={handleAddItem} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. Learn AI, Hit the Gym..."
                    autoFocus
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 transition-all shadow-sm"
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                    Add
                </button>
            </form>

            {items.length > 0 ? (
                <ul className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pb-4 custom-scrollbar">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm"
                        >
                            {editingIndex === index ? (
                                <form onSubmit={(e) => saveEdit(e, index)} className="flex-1 flex gap-2">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={(e) => saveEdit(e, index)}
                                        className="flex-1 bg-transparent border-b border-slate-900 dark:border-slate-100 outline-none text-lg px-2"
                                    />
                                    <button type="submit" className="text-slate-900 dark:text-white hover:opacity-70 font-bold">Save</button>
                                </form>
                            ) : (
                                <>
                                    <span
                                        className="text-lg flex-1 cursor-pointer truncate mr-4"
                                        onClick={() => startEdit(index, item)}
                                        title="Click to edit"
                                    >
                                        {item}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => startEdit(index, item)}
                                            className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 transition-colors"
                                            aria-label="Edit item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400">
                        No items added yet.<br />Add at least two to start your tradeoff.
                    </p>
                </div>
            )}

            <button
                className="mt-auto w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xl font-bold rounded-xl py-4 shadow-lg hover:translate-y-[-2px] disabled:hover:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                onClick={onStart}
                disabled={items.length < 2}
            >
                Force The Tradeoff
            </button>
        </div>
    );
}
