"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUNTER_OPTIONS, type Scope } from "@/lib/types";
import type { Action } from "@/lib/reducer";
import { RiAddLine } from "@remixicon/react";

type Props = {
	dispatch: React.Dispatch<Action>;
	onClose: () => void;
};

export default function AddCustomCounter({ dispatch, onClose }: Props) {
	const [adding, setAdding] = useState(false);
	const [label, setLabel] = useState<string>(COUNTER_OPTIONS[0]);
	const [scope, setScope] = useState<Scope>("All");

	const add = () => {
		dispatch({ type: "ADD_COUNTER", label, scope });
		setLabel(COUNTER_OPTIONS[0]);
		setScope("All");
		setAdding(false);
		onClose();
	};

	return (
		<div className="py-3">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold text-zinc-400">Custom Counters</h2>
				{!adding && (
					<button
						onClick={() => setAdding(true)}
						className="flex justify-center gap-2 max-w-36 grow py-2 rounded-lg bg-zinc-800 text-zinc-200 text-md font-bold hover:text-zinc-200 hover:bg-zinc-700 active:scale-95 transition-all"
					>
						<RiAddLine className="w-5" />
						<span>Add</span>
					</button>
				)}
			</div>

			<AnimatePresence initial={false}>
				{adding && (
					<motion.div
						key="form"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden"
					>
						<div className="pt-3 bg-zinc-800 rounded-lg p-3 mt-2">
							<p className="text-md font-medium text-zinc-500 mb-2">Card Type</p>
							<select
								value={label}
								onChange={(e) => setLabel(e.target.value)}
								className="w-full bg-zinc-700 text-zinc-100 rounded-lg px-3 py-3 text-md mb-4 border border-zinc-600"
							>
								{COUNTER_OPTIONS.map((opt) => (
									<option key={opt} value={opt}>
										{opt}
									</option>
								))}
							</select>

							<p className="text-md font-medium text-zinc-500 mb-2">Scope</p>
							<div className="flex gap-2 mb-4">
								{(["Mine", "Opponents'", "All"] as Scope[]).map((s) => (
									<button
										key={s}
										onClick={() => setScope(s)}
										className={[
											"flex-1 py-3 rounded-lg text-md font-bold transition-all active:scale-95",
											scope === s
												? "bg-green-600 text-white"
												: "bg-zinc-700 text-zinc-400 hover:bg-zinc-600",
										].join(" ")}
									>
										{s}
									</button>
								))}
							</div>

							<div className="grid grid-cols-2 gap-2">
								<button
									onClick={() => setAdding(false)}
									className="py-3 rounded-lg bg-zinc-700 text-zinc-400 text-md font-bold hover:bg-zinc-600 active:scale-95 transition-all"
								>
									Cancel
								</button>
								<button
									onClick={add}
									className="py-3 rounded-lg bg-green-600 text-white text-md font-bold hover:bg-green-500 active:scale-95 transition-all"
								>
									Add
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
