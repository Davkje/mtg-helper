"use client";

import { RiMenuLine } from "@remixicon/react";
import { motion } from "framer-motion";

type HeaderProps = {
	activeTypeCount: number;
	onMenuOpen: () => void;
};

export default function Header({ activeTypeCount, onMenuOpen }: HeaderProps) {
	return (
		<div className="sticky top-0 bg-zinc-950 z-10 py-2">
			<div className="flex items-center justify-between gap-2">
				<div>
					<p className="text-xl font-semibold flex gap-2">
						<span>Card Types in Graveyards:</span>
						<span className="text-green-400 ">{activeTypeCount}</span>
					</p>
					{/* <p className="mt-0.5">
						<span className="text-zinc-400 text-lg font-semibold">Tarmogoyf </span>
						<span className="text-3xl font-black text-emerald-400 tabular-nums">
							{activeTypeCount} / {activeTypeCount + 1}
						</span>
					</p> */}
				</div>

				<motion.button
					onClick={onMenuOpen}
					whileTap={{ scale: 0.9 }}
					className="hover:text-zinc-200 transition-colors flex items-center justify-center"
				>
					<RiMenuLine />
				</motion.button>
			</div>
		</div>
	);
}
