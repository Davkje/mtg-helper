"use client";

import { useReducer, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { reducer, initialState, computeActiveTypeCount } from "@/lib/reducer";
import { loadState, saveState } from "@/lib/storage";
import { DECK_CARDS } from "@/lib/deckCards";

import Header from "@/components/Header";
import TypeGrid from "@/components/TypeGrid";
import TrackedCardPanel from "@/components/TrackedCardPanel";
import CounterRow from "@/components/CounterRow";
import MenuSheet from "@/components/MenuSheet";

const listItem = {
	initial: { opacity: 0, y: -8 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
	exit: { opacity: 0, x: 32, transition: { duration: 0.15 } },
};

export default function GraveyardTracker() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [menuOpen, setMenuOpen] = useState(false);

	// Hydrate from localStorage — single dispatch
	useEffect(() => {
		dispatch({ type: "HYDRATE", payload: loadState() });
	}, []);

	// Persist after hydration
	useEffect(() => {
		if (!state._loaded) return;
		saveState({
			cardTypes: state.cardTypes,
			trackedCards: state.trackedCards,
			counters: state.counters,
		});
	}, [state]);

	// Lock body scroll while menu is open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	const activeTypeCount = computeActiveTypeCount(state.cardTypes);

	return (
		<>
			<div className="h-screen bg-zinc-950 text-white">
				<div className="max-w-107.5 flex flex-col mx-auto px-2 h-full grow">
					<Header activeTypeCount={activeTypeCount} onMenuOpen={() => setMenuOpen(true)} />

					<TypeGrid cardTypes={state.cardTypes} dispatch={dispatch} />

					{/* Tracked deck card panels */}
					<AnimatePresence initial={false}>
						<div className="flex flex-col gap-2 py-2">
							{state.trackedCards.map((tc) => (
								<motion.div
									key={tc.id}
									variants={listItem}
									initial="initial"
									animate="animate"
									exit="exit"
								>
									<TrackedCardPanel
										tc={tc}
										def={DECK_CARDS[tc.cardKey]}
										cardTypes={state.cardTypes}
										activeTypeCount={activeTypeCount}
										dispatch={dispatch}
									/>
								</motion.div>
							))}
						</div>
					</AnimatePresence>

					{/* Custom counter rows */}
					<AnimatePresence initial={false}>
						{state.counters.map((counter) => (
							<motion.div
								key={counter.id}
								variants={listItem}
								initial="initial"
								animate="animate"
								exit="exit"
								className=""
							>
								<CounterRow counter={counter} dispatch={dispatch} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>

			<MenuSheet
				open={menuOpen}
				cardTypes={state.cardTypes}
				dispatch={dispatch}
				onClose={() => setMenuOpen(false)}
			/>
		</>
	);
}
