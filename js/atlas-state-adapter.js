// Adapter from the existing Human History Map state into AtlasState.
// It does not mutate HistoryData or reinterpret map coverage as historical fact.

import { createAtlasState } from './atlas-network.js';

export function atlasStateFromHistory({ data, year, view = null, sites = [], edges = [], flows = [], branch = 'canonical' }) {
  if (!data || typeof data.polities !== 'function') throw new TypeError('HistoryData instance required');
  const polityIds = [...new Set(data.polities(year).map(feature => feature?._civ?.id).filter(Boolean))];
  return createAtlasState({ year, view, polityIds, sites, edges, flows, branch });
}

export function strategicEncounter({ atlasState, location, forces, cause = null }) {
  if (!atlasState) throw new TypeError('AtlasState required');
  if (!Array.isArray(forces) || forces.length < 2) throw new TypeError('at least two forces required');
  return Object.freeze({
    kind: 'atlas-strategic-encounter',
    version: 1,
    year: atlasState.year,
    branch: atlasState.branch,
    location: location ? Object.freeze({ ...location }) : null,
    forces: Object.freeze(forces.map(force => Object.freeze({ ...force }))),
    cause,
  });
}
