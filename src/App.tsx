import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { InputPhase } from "./components/InputPhase";
import { RankingPhase } from "./components/RankingPhase";
import { ResultsPhase } from "./components/ResultsPhase";
import { mergeSortAsync } from "./lib/sort";

type Phase = "input" | "ranking" | "results";

function App() {
    const [phase, setPhase] = useState<Phase>("input");

    // Persist items and timeframe to local storage
    const [items, setItems] = useState<string[]>(() => {
        const saved = localStorage.getItem("tradeoff-items");
        return saved ? JSON.parse(saved) : [];
    });

    const [windowDays, setWindowDays] = useState<number>(() => {
        const saved = localStorage.getItem("tradeoff-window");
        return saved ? parseInt(saved) : 30;
    });

    useEffect(() => {
        localStorage.setItem("tradeoff-items", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem("tradeoff-window", windowDays.toString());
    }, [windowDays]);

    const [pair, setPair] = useState<{ a: string; b: string } | null>(null);
    const [results, setResults] = useState<string[]>([]);

    const resolveRef = useRef<((value: number) => void) | null>(null);

    const startRanking = async () => {
        if (items.length < 2) return;

        setPhase("ranking");

        const compareFn = (a: string, b: string): Promise<number> => {
            return new Promise((resolve) => {
                setPair({ a, b });
                resolveRef.current = resolve;
            });
        };

        const sorted = await mergeSortAsync([...items], compareFn);

        setResults(sorted);
        setPhase("results");
        setPair(null);
    };

    const handleChoice = (winnerIndex: -1 | 1) => {
        if (resolveRef.current) {
            resolveRef.current(winnerIndex);
            resolveRef.current = null;
        }
    };

    const reset = () => {
        setPhase("input");
        setResults([]);
        setPair(null);
    };

    return (
        <div className="w-full flex flex-col min-h-screen">
            <header className="w-full flex items-center justify-between pb-6 pt-6 px-6 sm:px-12 border-b border-slate-200 dark:border-slate-800 mb-6 font-sans">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-slate-50">
                    Tradeoff
                </h1>
                <ThemeToggle />
            </header>

            <div className="w-full max-w-lg mx-auto flex flex-col flex-1 px-4">
                <main className="flex flex-col flex-1 pb-10">
                    {phase === "input" && (
                        <InputPhase
                            items={items}
                            setItems={setItems}
                            onStart={startRanking}
                            windowDays={windowDays}
                            setWindowDays={setWindowDays}
                        />
                    )}

                    {phase === "ranking" && pair && (
                        <RankingPhase pair={pair} onChoice={handleChoice} windowDays={windowDays} />
                    )}

                    {phase === "results" && (
                        <ResultsPhase results={results} onReset={reset} windowDays={windowDays} />
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;
