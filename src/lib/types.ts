export const CARD_TYPES = [
	"Land",
	"Creature",
	"Sorcery",
	"Instant",
	"Enchantment",
	"Artifact",
	"Planeswalker",
	"Battle",
	"Kindred",
] as const;
export type CardType = (typeof CARD_TYPES)[number];

export const DECK_CARD_KEYS = [
	"altar-of-the-goyf",
	"barrowgoyf",
	"detritivore",
	"golgari-grave-troll",
	"lhurgoyf",
	"mortivore",
	"necrogoyf",
	"polygoyf",
	"pyrogoyf",
	"terravore",
] as const;
export type DeckCardKey = (typeof DECK_CARD_KEYS)[number];

export const COUNTER_OPTIONS = [
	"Lands",
	"Nonbasic Lands",
	"Creatures",
	"Artifacts",
	"Enchantments",
	"Planeswalkers",
	"Battles",
	"Instants",
	"Sorceries",
	"Kindred",
] as const;

export type GraveyardLocation = "inMyGraveyard" | "inOpponentGraveyard";

export type LocationData = { active: boolean; count: number };

export type CardTypeData = {
	inPlay: LocationData;
	inMyGraveyard: LocationData;
	inOpponentGraveyard: LocationData;
};

export type CardTypeStore = Record<CardType, CardTypeData>;

export type CardStat = { p: string; t: string; note?: string };

export type PtParams = {
	activeTypeCount: number;
	myGY: number;
	oppGY: number;
	ownCounter: number;
};

export type CardDef = {
	name: string;
	trackedType: CardType | null;
	trackedLocations: GraveyardLocation[];
	ownCounter: boolean;
	ownCounterLabel?: string;
	pt: (params: PtParams) => CardStat;
};

export type TrackedCard = { id: string; cardKey: DeckCardKey; ownCounter: number };

export type Scope = "Mine" | "Opponents'" | "All";
export type Counter = { id: string; label: string; scope: Scope; count: number };
