"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiAddLine, RiCloseLine } from "@remixicon/react";
import { DECK_CARD_KEYS, type DeckCardKey } from "@/lib/types";
import { DECK_CARDS } from "@/lib/deckCards";
import type { Action } from "@/lib/reducer";

type Props = {
	dispatch: React.Dispatch<Action>;
	onClose: () => void;
};

export default function AddDeckCard({ dispatch, onClose }: Props) {
	const [adding, setAdding] = useState(false);
	const [selected, setSelected] = useState<DeckCardKey>("altar-of-the-goyf");

	const track = () => {
		dispatch({ type: "TRACK_CARD", cardKey: selected });
		setAdding(false);
		onClose();
	};

	return (
		<div className="py-4">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold text-zinc-300">Deck Cards</h2>
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
						<div className="flex gap-2 pt-3">
							<select
								value={selected}
								onChange={(e) => setSelected(e.target.value as DeckCardKey)}
								className="flex-1 bg-zinc-800 text-zinc-100 rounded-lg px-3 py-3 text-md"
							>
								{DECK_CARD_KEYS.map((key) => (
									<option key={key} value={key}>
										{DECK_CARDS[key].name}
									</option>
								))}
							</select>
							<button
								onClick={track}
								className="px-5 py-3 rounded-lg bg-green-600 text-white text-md font-bold hover:bg-green-500 active:scale-95 transition-all shrink-0"
							>
								Track
							</button>
							<button
								onClick={() => setAdding(false)}
								className="w-12 rounded-lg bg-zinc-800 text-zinc-500 font-bold hover:bg-zinc-700 active:scale-95 transition-all shrink-0 flex items-center justify-center"
							>
								<RiCloseLine />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
