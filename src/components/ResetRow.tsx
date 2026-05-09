"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Action } from "@/lib/reducer";

type Props = {
	dispatch: React.Dispatch<Action>;
	onClose: () => void;
};

export default function ResetRow({ dispatch, onClose }: Props) {
	const [confirming, setConfirming] = useState(false);

	const reset = () => {
		dispatch({ type: "RESET" });
		onClose();
	};

	return (
		<div className="flex items-center justify-between py-3">
			<p className="text-lg font-bold text-zinc-200">Reset everything</p>

			<AnimatePresence mode="wait" initial={false}>
				{confirming ? (
					<motion.div
						key="confirm"
						initial={{ opacity: 0, x: 12 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 12 }}
						transition={{ duration: 0.15 }}
						className="flex items-center gap-2"
					>
						<span className="text-md font-medium text-zinc-400">Are you sure?</span>
						<button
							onClick={reset}
							className="w-16 py-2 rounded-lg bg-red-700 text-white text-md font-bold hover:bg-red-600 active:scale-95 transition-all"
						>
							Yes
						</button>
						<button
							onClick={() => setConfirming(false)}
							className="w-16 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-md font-bold hover:bg-zinc-700 active:scale-95 transition-all"
						>
							No
						</button>
					</motion.div>
				) : (
					<motion.button
						key="reset-btn"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
						onClick={() => setConfirming(true)}
						className="max-w-36 grow py-2 rounded-lg bg-zinc-800 text-zinc-200 text-md font-bold hover:bg-red-950 hover:text-red-400 active:scale-95 transition-all"
					>
						Reset
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	);
}
