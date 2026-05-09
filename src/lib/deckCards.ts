import type { CardDef, DeckCardKey } from './types';

export const DECK_CARDS: Record<DeckCardKey, CardDef> = {
  'altar-of-the-goyf': {
    name: 'Altar of the Goyf',
    trackedType: null,
    trackedLocations: [],
    ownCounter: false,
    pt: ({ activeTypeCount: n }) => ({ p: `+${n}`, t: `+${n}`, note: 'solo attacker buff' }),
  },

  'barrowgoyf': {
    name: 'Barrowgoyf',
    trackedType: null,
    trackedLocations: [],
    ownCounter: false,
    pt: ({ activeTypeCount: n }) => ({ p: String(n), t: String(n + 1) }),
  },

  'detritivore': {
    name: 'Detritivore',
    trackedType: 'Land',
    trackedLocations: ['inOpponentGraveyard'],
    ownCounter: false,
    pt: ({ oppGY: n }) => ({ p: String(n), t: String(n) }),
  },

  'golgari-grave-troll': {
    name: 'Golgari Grave-Troll',
    trackedType: null,
    trackedLocations: [],
    ownCounter: true,
    ownCounterLabel: '+1/+1 counters on it',
    pt: ({ ownCounter: n }) => ({ p: String(n), t: String(n + 2), note: 'base 0/2' }),
  },

  'lhurgoyf': {
    name: 'Lhurgoyf',
    trackedType: 'Creature',
    trackedLocations: ['inMyGraveyard', 'inOpponentGraveyard'],
    ownCounter: false,
    pt: ({ myGY, oppGY }) => { const n = myGY + oppGY; return { p: String(n), t: String(n + 1) }; },
  },

  'mortivore': {
    name: 'Mortivore',
    trackedType: 'Creature',
    trackedLocations: ['inMyGraveyard', 'inOpponentGraveyard'],
    ownCounter: false,
    pt: ({ myGY, oppGY }) => { const n = myGY + oppGY; return { p: String(n), t: String(n) }; },
  },

  'necrogoyf': {
    name: 'Necrogoyf',
    trackedType: 'Creature',
    trackedLocations: ['inMyGraveyard', 'inOpponentGraveyard'],
    ownCounter: false,
    pt: ({ myGY, oppGY }) => { const n = myGY + oppGY; return { p: String(n), t: String(n) }; },
  },

  'polygoyf': {
    name: 'Polygoyf',
    trackedType: null,
    trackedLocations: [],
    ownCounter: false,
    pt: ({ activeTypeCount: n }) => ({ p: String(n), t: String(n + 1) }),
  },

  'pyrogoyf': {
    name: 'Pyrogoyf',
    trackedType: null,
    trackedLocations: [],
    ownCounter: false,
    pt: ({ activeTypeCount: n }) => ({ p: String(n), t: String(n + 1), note: `ETB deals ${n}` }),
  },

  'terravore': {
    name: 'Terravore',
    trackedType: 'Land',
    trackedLocations: ['inMyGraveyard', 'inOpponentGraveyard'],
    ownCounter: false,
    pt: ({ myGY, oppGY }) => { const n = myGY + oppGY; return { p: String(n), t: String(n) }; },
  },
};
