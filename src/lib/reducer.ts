import {
  CARD_TYPES,
  type CardType, type CardTypeData, type CardTypeStore,
  type TrackedCard, type Counter, type Scope, type DeckCardKey,
} from './types';

// ── Helpers ──────────────────────────────────────────────────────────────────

export function isTypeInAnyGraveyard(data: CardTypeData): boolean {
  return data.inMyGraveyard.active || data.inOpponentGraveyard.active;
}

export function computeActiveTypeCount(store: CardTypeStore): number {
  return CARD_TYPES.filter(t => isTypeInAnyGraveyard(store[t])).length;
}

function syncCount(count: number) {
  const clamped = Math.max(0, count);
  return { count: clamped, active: clamped > 0 };
}

// ── State ────────────────────────────────────────────────────────────────────

export type State = {
  cardTypes: CardTypeStore;
  trackedCards: TrackedCard[];
  counters: Counter[];
  _loaded: boolean;
};

function defaultStore(): CardTypeStore {
  return Object.fromEntries(
    CARD_TYPES.map(t => [t, {
      inPlay: { active: false, count: 0 },
      inMyGraveyard: { active: false, count: 0 },
      inOpponentGraveyard: { active: false, count: 0 },
    }])
  ) as CardTypeStore;
}

export const initialState: State = {
  cardTypes: defaultStore(),
  trackedCards: [],
  counters: [],
  _loaded: false,
};

export type AnyLocation = 'inPlay' | 'inMyGraveyard' | 'inOpponentGraveyard';

// ── Actions ──────────────────────────────────────────────────────────────────

export type Action =
  | { type: 'HYDRATE'; payload: Omit<State, '_loaded'> }
  | { type: 'ADJUST_LOCATION'; cardType: CardType; location: AnyLocation; delta: number }
  | { type: 'CLEAR_TYPE'; cardType: CardType }
  | { type: 'TRACK_CARD'; cardKey: DeckCardKey }
  | { type: 'REMOVE_CARD'; id: string }
  | { type: 'ADJUST_OWN_COUNTER'; id: string; delta: number }
  | { type: 'ADD_COUNTER'; label: string; scope: Scope }
  | { type: 'ADJUST_COUNTER'; id: string; delta: number }
  | { type: 'DELETE_COUNTER'; id: string }
  | { type: 'RESET' };

// ── Reducer ──────────────────────────────────────────────────────────────────

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { ...action.payload, _loaded: true };

    case 'ADJUST_LOCATION': {
      const typeData = state.cardTypes[action.cardType];
      const current = typeData[action.location];
      return {
        ...state,
        cardTypes: {
          ...state.cardTypes,
          [action.cardType]: {
            ...typeData,
            [action.location]: syncCount(current.count + action.delta),
          },
        },
      };
    }

    case 'CLEAR_TYPE': {
      const typeData = state.cardTypes[action.cardType];
      return {
        ...state,
        cardTypes: {
          ...state.cardTypes,
          [action.cardType]: {
            ...typeData,
            inMyGraveyard: { active: false, count: 0 },
            inOpponentGraveyard: { active: false, count: 0 },
          },
        },
      };
    }

    case 'TRACK_CARD':
      return {
        ...state,
        trackedCards: [
          ...state.trackedCards,
          { id: crypto.randomUUID(), cardKey: action.cardKey, ownCounter: 0 },
        ],
      };

    case 'REMOVE_CARD':
      return { ...state, trackedCards: state.trackedCards.filter(c => c.id !== action.id) };

    case 'ADJUST_OWN_COUNTER':
      return {
        ...state,
        trackedCards: state.trackedCards.map(c =>
          c.id === action.id
            ? { ...c, ownCounter: Math.max(0, c.ownCounter + action.delta) }
            : c
        ),
      };

    case 'ADD_COUNTER':
      return {
        ...state,
        counters: [
          ...state.counters,
          { id: crypto.randomUUID(), label: action.label, scope: action.scope, count: 0 },
        ],
      };

    case 'ADJUST_COUNTER':
      return {
        ...state,
        counters: state.counters.map(c =>
          c.id === action.id ? { ...c, count: Math.max(0, c.count + action.delta) } : c
        ),
      };

    case 'DELETE_COUNTER':
      return { ...state, counters: state.counters.filter(c => c.id !== action.id) };

    case 'RESET':
      return { ...initialState, _loaded: true };
  }
}
