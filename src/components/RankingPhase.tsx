export interface RankingPhaseProps {
    pair: { a: string; b: string };
    onChoice: (choice: -1 | 1) => void;
    windowDays: number;
}

export function RankingPhase({ pair, onChoice, windowDays }: RankingPhaseProps) {
    return (
        <div className="flex flex-col flex-1 animate-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-bold text-center mb-8 mt-4 text-slate-800 dark:text-slate-100">
                Which matters more in the next <span className="text-slate-900 dark:text-white underline decoration-slate-400 dark:decoration-slate-600 underline-offset-4 decoration-2">{windowDays} {windowDays > 1 ? 'days' : 'day'}</span>?
            </h2>

            <div className="flex flex-row gap-3 sm:gap-6 items-stretch mb-8 justify-center w-full max-h-[50vh]">
                <button
                    onClick={() => onChoice(-1)}
                    className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 p-4 sm:p-8 text-xl sm:text-2xl font-semibold rounded-2xl shadow-sm hover:border-slate-900 dark:hover:border-white hover:shadow-md hover:-translate-y-1 transition-all break-words active:scale-95 flex items-center justify-center text-center overflow-y-auto"
                >
                    <span className="line-clamp-6">{pair.a}</span>
                </button>

                <div className="flex items-center justify-center shrink-0 self-center text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    vs
                </div>

                <button
                    onClick={() => onChoice(1)}
                    className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 p-4 sm:p-8 text-xl sm:text-2xl font-semibold rounded-2xl shadow-sm hover:border-slate-900 dark:hover:border-white hover:shadow-md hover:-translate-y-1 transition-all break-words active:scale-95 flex items-center justify-center text-center overflow-y-auto"
                >
                    <span className="line-clamp-6">{pair.b}</span>
                </button>
            </div>

        </div>
    );
}
