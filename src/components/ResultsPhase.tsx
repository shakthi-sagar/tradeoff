export interface ResultsPhaseProps {
    results: string[];
    onReset: () => void;
    windowDays: number;
}

export function ResultsPhase({ results, onReset, windowDays }: ResultsPhaseProps) {
    return (
        <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-slate-900 dark:text-slate-50">
                Priorities for next {windowDays} {windowDays > 1 ? 'days' : 'day'}.
            </h2>

            <ol className="flex flex-col gap-3">
                {results.map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 shadow-sm ${index === 0
                            ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white scale-[1.02] transition-transform"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50"
                            }`}
                    >
                        <span
                            className={`font-black text-xl min-w-[2rem] text-center ${index === 0 ? "opacity-70" : "text-slate-400 dark:text-slate-500"
                                }`}
                        >
                            {index + 1}
                        </span>
                        <span className={`text-lg font-bold truncate`}>
                            {item}
                        </span>
                    </li>
                ))}
            </ol>

            <button
                onClick={onReset}
                className="mt-auto w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xl font-bold rounded-xl py-4 shadow-lg hover:translate-y-[-2px] transition-all"
            >
                Start Over
            </button>
        </div>
    );
}
