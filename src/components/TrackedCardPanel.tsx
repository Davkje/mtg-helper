"use client";

import type { TrackedCard, CardDef, CardTypeStore, GraveyardLocation } from "@/lib/types";
import type { Action } from "@/lib/reducer";
import { RiAddLine, RiCloseLine, RiSubtractLine } from "@remixicon/react";

const LOCATION_LABEL: Record<GraveyardLocation, string> = {
	inMyGraveyard: "Mine",
	inOpponentGraveyard: "Opponent",
};

type Props = {
	tc: TrackedCard;
	def: CardDef;
	cardTypes: CardTypeStore;
	activeTypeCount: number;
	dispatch: React.Dispatch<Action>;
};

export default function TrackedCardPanel({ tc, def, cardTypes, activeTypeCount, dispatch }: Props) {
	const myGY = def.trackedType ? cardTypes[def.trackedType].inMyGraveyard.count : 0;
	const oppGY = def.trackedType ? cardTypes[def.trackedType].inOpponentGraveyard.count : 0;
	const stat = def.pt({ activeTypeCount, myGY, oppGY, ownCounter: tc.ownCounter });

	return (
		<div className="bg-zinc-800 rounded-lg p-3 flex flex-col gap-2">
			{/* Name + remove */}
			<div className="flex items-center justify-between gap-2">
				<div className="flex gap-2 justify-center items-center">
					<p className="text-lg font-bold text-zinc-100 leading-tight">{def.name}</p>
					<p className="text-lg font-bold text-zinc-500 leading-tight">{def.trackedType}</p>
				</div>

				<div className="flex gap-2">
					<div className="flex gap-2 items-center">
						<span className="text-lg font-black text-green-400 tabular-nums leading-none">
							{stat.p}
						</span>
						<span className="text-lg font-bold text-green-400">/</span>
						<span className="text-lg font-black text-green-400 tabular-nums leading-none">
							{stat.t}
						</span>
					</div>
					<button
						onClick={() => dispatch({ type: "REMOVE_CARD", id: tc.id })}
						className="shrink-0 w-6 aspect-square rounded-lg bg-zinc-800 text-zinc-600 hover:bg-red-950 hover:text-red-400 active:scale-95 transition-all flex items-center justify-center text-xs"
					>
						<RiCloseLine />
					</button>
				</div>
			</div>

			{/* Per-location controls (e.g. Terravore, Lhurgoyf) */}
			{def.trackedLocations.length > 0 && def.trackedType && (
				<div className="grid grid-cols-2 gap-3">
					{def.trackedLocations.map((loc) => {
						const count = cardTypes[def.trackedType!][loc].count;
						return (
							<div
								key={loc}
								className="py-1 px-2 flex flex-col rounded-lg items-center justify-between gap-0 bg-zinc-700/30"
							>
								<span className="text-md font-medium text-zinc-500 shrink-0">
									{LOCATION_LABEL[loc]}
								</span>
								<div className="w-full flex justify-between gap-4">
									<button
										onClick={() =>
											dispatch({
												type: "ADJUST_LOCATION",
												cardType: def.trackedType!,
												location: loc,
												delta: -1,
											})
										}
										className="w-6 aspect-square rounded-md text-zinc-200 text-2xl font-black active:scale-95 transition-all"
									>
										<RiSubtractLine className="text-zinc-500" />
									</button>
									<span className="flex-1 text-center text-lg font-bold text-zinc-200 tabular-nums">
										{count}
									</span>
									<button
										onClick={() =>
											dispatch({
												type: "ADJUST_LOCATION",
												cardType: def.trackedType!,
												location: loc,
												delta: 1,
											})
										}
										className="w-6 aspect-square rounded-md text-zinc-200 text-2xl font-black active:scale-95 transition-all"
									>
										<RiAddLine className="text-zinc-500" />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* Own counter (Golgari Grave-Troll) */}
			{def.ownCounter && (
				<div className="">
					<div className="flex items-center justify-between gap-2">
						<p className="text-md font-medium text-zinc-500 shrink-0">{def.ownCounterLabel}</p>
						<div className="flex gap-2">
							<button
								onClick={() => dispatch({ type: "ADJUST_OWN_COUNTER", id: tc.id, delta: -1 })}
								className="w-6 aspect-square rounded-md text-zinc-200 text-2xl font-black active:scale-95 transition-all"
							>
								<RiSubtractLine className="text-zinc-500" />
							</button>
							<span className="flex-1 text-center text-lg font-bold text-zinc-200 tabular-nums">
								{tc.ownCounter}
							</span>
							<button
								onClick={() => dispatch({ type: "ADJUST_OWN_COUNTER", id: tc.id, delta: 1 })}
								className="w-6 aspect-square rounded-md text-zinc-200 text-2xl font-black active:scale-95 transition-all"
							>
								<RiAddLine className="text-zinc-500" />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
