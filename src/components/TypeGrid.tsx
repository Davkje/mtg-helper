"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CARD_TYPES, type CardTypeStore, type CardType, type GraveyardLocation } from "@/lib/types";
import { isTypeInAnyGraveyard } from "@/lib/reducer";
import type { Action } from "@/lib/reducer";

type TypeGridProps = {
	cardTypes: CardTypeStore;
	dispatch: React.Dispatch<Action>;
};

export default function TypeGrid({ cardTypes, dispatch }: TypeGridProps) {
	const [pickerType, setPickerType] = useState<CardType | null>(null);

	const handleTap = (type: CardType) => {
		if (isTypeInAnyGraveyard(cardTypes[type])) {
			dispatch({ type: "CLEAR_TYPE", cardType: type });
			setPickerType(null);
		} else if (pickerType === type) {
			setPickerType(null);
		} else {
			setPickerType(type);
		}
	};

	const pick = (location: GraveyardLocation) => {
		if (!pickerType) return;
		dispatch({ type: "ADJUST_LOCATION", cardType: pickerType, location, delta: 1 });
		setPickerType(null);
	};

	return (
		<div className="flex grow">
			<div className="grid grid-cols-1 gap-2 w-full">
				{CARD_TYPES.map((type: CardType) => {
					const active = isTypeInAnyGraveyard(cardTypes[type]);
					const picking = pickerType === type;

					// ── Picker state: button splits into two halves ──────────────────
					if (picking) {
						return (
							<div key={type} className="grid grid-cols-2 gap-2">
								<motion.button
									whileTap={{ scale: 0.91 }}
									onClick={() => pick("inMyGraveyard")}
									className="bg-zinc-700 rounded-lg p-2 grow text-white text-lg font-bold flex items-center justify-center hover:bg-green-600 active:opacity-75 transition-opacity"
								>
									Mine
								</motion.button>

								<motion.button
									whileTap={{ scale: 0.91 }}
									onClick={() => pick("inOpponentGraveyard")}
									className="bg-zinc-700 rounded-lg p-2 grow text-white text-lg font-bold flex items-center justify-center hover:bg-green-600 active:opacity-75 transition-opacity"
								>
									Opponent
								</motion.button>
							</div>
						);
					}

					// ── Normal state ─────────────────────────────────────────────────
					return (
						<motion.button
							key={type}
							onClick={() => handleTap(type)}
							whileTap={{ scale: 0.91 }}
							className={[
								"rounded-lg p-2 text-lg font-bold tracking-wide select-none transition-colors",
								active ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-400",
							].join(" ")}
						>
							{type}
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
