"use client";

import type { Counter } from "@/lib/types";
import type { Action } from "@/lib/reducer";

type Props = {
	counter: Counter;
	dispatch: React.Dispatch<Action>;
};

export default function CounterRow({ counter, dispatch }: Props) {
	return (
		<div className="flex items-center bg-zinc-900 rounded-2xl px-3 py-2 gap-2">
			<div className="flex-1 min-w-0">
				<p className="text-sm font-bold text-zinc-100 truncate">{counter.label}</p>
				<p className="text-xs text-zinc-500">{counter.scope}</p>
			</div>
			<button
				onClick={() => dispatch({ type: "ADJUST_COUNTER", id: counter.id, delta: -1 })}
				className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-300 text-3xl font-black hover:bg-zinc-700 active:scale-95 transition-all flex items-center justify-center select-none leading-none"
			>
				−
			</button>
			<span className="w-10 text-center text-2xl font-black text-green-400 tabular-nums">
				{counter.count}
			</span>
			<button
				onClick={() => dispatch({ type: "ADJUST_COUNTER", id: counter.id, delta: 1 })}
				className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-300 text-3xl font-black hover:bg-zinc-700 active:scale-95 transition-all flex items-center justify-center select-none leading-none"
			>
				+
			</button>
			<button
				onClick={() => dispatch({ type: "DELETE_COUNTER", id: counter.id })}
				className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-600 hover:bg-red-950 hover:text-red-400 active:scale-95 transition-all flex items-center justify-center select-none text-sm"
			>
				✕
			</button>
		</div>
	);
}
