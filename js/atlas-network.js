// Atlas spatiotemporal network v0.1.
// Additive simulation/evidence contract: historical border rendering remains untouched.

export const EPISTEMIC_STATUS = Object.freeze({
  REAL: 'real',
  RECONSTRUCTED: 'reconstructed',
  COUNTERFACTUAL: 'counterfactual',
  SYNTHETIC: 'synthetic',
});

export const SITE_KINDS = Object.freeze(['settlement','city','village','port','fortress','caravanserai','station','other']);
export const EDGE_MODES = Object.freeze(['land','road','river','sea','rail','migration','other']);
export const FLOW_KINDS = Object.freeze(['people','goods','technology','religion','language','pathogen','information','military']);

function intervalActive(x, year) {
  const from = x.from == null ? -Infinity : x.from;
  const to = x.to == null ? Infinity : x.to;
  return from <= year && year < to;
}

function freezeArray(value) { return Object.freeze([...(value || [])]); }

export function createSite(input) {
  if (!input?.id || !input?.name) throw new TypeError('site id and name are required');
  if (!SITE_KINDS.includes(input.kind)) throw new TypeError('unsupported site kind');
  if (!Array.isArray(input.coordinates) || input.coordinates.length !== 2) throw new TypeError('site coordinates [lon, lat] required');
  return Object.freeze({
    id: input.id, name: input.name, kind: input.kind,
    coordinates: Object.freeze([...input.coordinates]),
    from: input.from ?? null, to: input.to ?? null,
    polityIds: freezeArray(input.polityIds),
    population: input.population ?? null,
    evidence: freezeArray(input.evidence),
    confidence: input.confidence ?? null,
    epistemicStatus: input.epistemicStatus || EPISTEMIC_STATUS.RECONSTRUCTED,
  });
}

export function createEdge(input) {
  if (!input?.id || !input?.from || !input?.to) throw new TypeError('edge id/from/to are required');
  if (!EDGE_MODES.includes(input.mode)) throw new TypeError('unsupported edge mode');
  return Object.freeze({
    id: input.id, from: input.from, to: input.to, mode: input.mode,
    geometry: input.geometry || null,
    validFrom: input.validFrom ?? null, validTo: input.validTo ?? null,
    season: input.season ?? null, direction: input.direction || 'both',
    cost: input.cost ?? null, capacity: input.capacity ?? null,
    goods: freezeArray(input.goods), people: freezeArray(input.people),
    evidence: freezeArray(input.evidence), confidence: input.confidence ?? null,
    epistemicStatus: input.epistemicStatus || EPISTEMIC_STATUS.RECONSTRUCTED,
  });
}

export function createFlow(input) {
  if (!input?.id || !FLOW_KINDS.includes(input.kind)) throw new TypeError('valid flow id/kind required');
  return Object.freeze({
    id: input.id, kind: input.kind, subject: input.subject ?? null,
    from: input.from, to: input.to, fromYear: input.fromYear ?? null, toYear: input.toYear ?? null,
    mechanism: input.mechanism ?? null, magnitude: input.magnitude ?? null,
    evidence: freezeArray(input.evidence), confidence: input.confidence ?? null,
    epistemicStatus: input.epistemicStatus || EPISTEMIC_STATUS.RECONSTRUCTED,
  });
}

export function createAtlasState({ year, view = null, polityIds = [], sites = [], edges = [], flows = [], branch = 'canonical' }) {
  if (!Number.isInteger(year) || year === 0) throw new TypeError('historical year must be a nonzero integer');
  return Object.freeze({
    version: 1, year, view: view ? Object.freeze({ ...view }) : null, branch,
    polityIds: freezeArray(polityIds),
    sites: freezeArray(sites.filter(x => intervalActive({ from: x.from, to: x.to }, year))),
    edges: freezeArray(edges.filter(x => intervalActive({ from: x.validFrom, to: x.validTo }, year))),
    flows: freezeArray(flows.filter(x => intervalActive({ from: x.fromYear, to: x.toYear }, year))),
  });
}

export function canWriteCanonical(item) {
  return item?.epistemicStatus === EPISTEMIC_STATUS.REAL || item?.epistemicStatus === EPISTEMIC_STATUS.RECONSTRUCTED;
}
