import { initialState, type State } from './reducer';

export const LS_KEY = 'mtg-tracker-v3';

type PersistedState = Omit<State, '_loaded'>;

export function loadState(): PersistedState {
  if (typeof window === 'undefined') {
    return { cardTypes: initialState.cardTypes, trackedCards: [], counters: [] };
  }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState;
      // Basic shape guard — reject old formats that lack cardTypes
      if (parsed.cardTypes) return parsed;
    }
  } catch {}
  return { cardTypes: initialState.cardTypes, trackedCards: [], counters: [] };
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {}
}
