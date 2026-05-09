"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiAddLine, RiSubtractLine, RiArrowDownSLine } from "@remixicon/react";
import { CARD_TYPES, type CardType, type CardTypeStore } from "@/lib/types";
import type { Action, AnyLocation } from "@/lib/reducer";

const LOCATIONS: { key: AnyLocation; label: string }[] = [
	{ key: "inMyGraveyard", label: "Mine" },
	{ key: "inOpponentGraveyard", label: "Opponent" },
	{ key: "inPlay", label: "In Play" },
];

type Props = {
	cardTypes: CardTypeStore;
	dispatch: React.Dispatch<Action>;
};

export default function MasterGraveyard({ cardTypes, dispatch }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<div className="border-b border-zinc-800 py-4">
			<button
				onClick={() => setOpen((v) => !v)}
				className="flex items-center justify-between w-full"
			>
				<span className="text-lg font-bold text-zinc-300">Master Graveyard</span>
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2 }}
					className="text-zinc-500"
				>
					<RiArrowDownSLine />
				</motion.span>
			</button>

			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						key="master"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.22 }}
						className="overflow-hidden"
					>
						<div className="pt-3 space-y-2">
							{CARD_TYPES.map((type: CardType) => {
								const data = cardTypes[type];
								return (
									<div key={type} className="bg-zinc-800 rounded-lg p-3">
										<p className="text-lg font-bold text-zinc-100 mb-2">{type}</p>
										{LOCATIONS.map(({ key, label }) => {
											const count = data[key].count;
											return (
												<div key={key} className="flex items-center gap-2 mb-1 last:mb-0">
													<span className="text-md font-medium text-zinc-500 w-20 shrink-0">
														{label}
													</span>
													<button
														onClick={() =>
															dispatch({
																type: "ADJUST_LOCATION",
																cardType: type,
																location: key,
																delta: -1,
															})
														}
														className="w-6 aspect-square rounded-md text-zinc-500 flex items-center justify-center active:scale-95 transition-all"
													>
														<RiSubtractLine />
													</button>
													<span className="flex-1 text-center text-lg font-bold tabular-nums text-zinc-200">
														{count}
													</span>
													<button
														onClick={() =>
															dispatch({
																type: "ADJUST_LOCATION",
																cardType: type,
																location: key,
																delta: 1,
															})
														}
														className="w-6 aspect-square rounded-md text-zinc-500 flex items-center justify-center active:scale-95 transition-all"
													>
														<RiAddLine />
													</button>
												</div>
											);
										})}
									</div>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
