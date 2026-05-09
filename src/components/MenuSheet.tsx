"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CardTypeStore } from "@/lib/types";
import type { Action } from "@/lib/reducer";

import MasterGraveyard from "./MasterGraveyard";
import ResetRow from "./ResetRow";
import AddDeckCard from "./AddDeckCard";
import AddCustomCounter from "./AddCustomCounter";

type Props = {
	open: boolean;
	cardTypes: CardTypeStore;
	dispatch: React.Dispatch<Action>;
	onClose: () => void;
};

export default function MenuSheet({ open, cardTypes, dispatch, onClose }: Props) {
	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={onClose}
						className="fixed inset-0 bg-black/65 z-20"
					/>

					<motion.div
						key="sheet"
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", damping: 30, stiffness: 320, mass: 0.9 }}
						className="fixed bottom-0 inset-x-0 z-30 bg-zinc-900 rounded-t-3xl flex flex-col"
						style={{ maxHeight: "85dvh" }}
					>
						{/* Handle */}
						<div className="shrink-0 flex justify-center py-3">
							<div className="w-10 h-1 rounded-full bg-zinc-700" />
						</div>

						<div className="overflow-y-auto px-4 pt-0 pb-12">
							<AddDeckCard dispatch={dispatch} onClose={onClose} />
							<AddCustomCounter dispatch={dispatch} onClose={onClose} />
							<ResetRow dispatch={dispatch} onClose={onClose} />
							<MasterGraveyard cardTypes={cardTypes} dispatch={dispatch} />
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
