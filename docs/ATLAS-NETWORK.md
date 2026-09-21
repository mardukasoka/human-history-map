# Atlas spatiotemporal network v0.1

This is an additive contract between Human History Map evidence/presentation and later simulation systems. Existing polity polygons remain presentation/evidence and are not converted into a movement grid.

## Layers

1. Historical map: dated polity/culture/region geometry and research metadata.
2. AtlasState: a shareable world observation at one historical year.
3. Sites: settlements, cities, ports, fortresses and other nodes.
4. Edges: dated geographic connections between sites.
5. Flows: people, goods, technologies, religions, languages, pathogens, information and military movement.
6. Strategic simulation: consumes an AtlasState and may create a counterfactual branch.
7. Tactical combat: a strategic encounter can be passed to the separate CombatProfile/Combat Chess subsystem and its result returned to the strategic simulation.

## Core invariant

Canonical evidence is immutable input. Simulation never overwrites the historical map. A counterfactual branch may inherit canonical geography and evidence, then diverge.

## Flow primitive

A flow records what moves, origin, destination, time interval, mechanism, magnitude, evidence, confidence and epistemic status. Propagation speed is therefore derived from dated site/edge topology rather than painted polygon growth.

## OpenFront integration

OpenFront-derived machinery should consume sites, edges, flows, forces and encounters. Its territory/economy/conflict mechanics must not become historical evidence. Real route geometry should replace or augment abstract transport geometry wherever evidence permits.

## First calibration target

Neolithic propagation from Anatolia through the Balkans into Central and Western Europe. Populate archaeological sites and plausible dated land/sea connections first, then test whether observed chronology emerges from network propagation. Do not tune by inventing historical facts.

## Epistemic statuses

- real: directly observed/documented entity or relationship
- reconstructed: evidence-based historical reconstruction
- counterfactual: simulation branch
- synthetic: authored fictional content

A name does not determine status; the claim and its provenance do.

## Corridor inference

Modern roads, railways, ports, river crossings and old cities may be used as hypothesis priors because durable geography can repeatedly channel movement. They are not evidence by themselves that the same route existed in an earlier period. A candidate edge should combine independent evidence where possible: archaeological sites, dated finds, historical itineraries/maps, terrain and passes, navigability, palaeoenvironment, settlement longevity and later route persistence.

Routing must also encode friction and barriers. Productive farmland may attract settlement while mountains, marshes, dangerous rivers, hostile polities, tolls, frontier zones and conflict can divert movement. Battle locations and fortified chokepoints may provide evidence about strategic corridors, but must be interpreted for their own period before being projected backward or forward.

Use later/modern corridors as priors to investigate, not as automatic historical edges. Negative evidence is first-class: for example, research on the Middle Struma warns that an apparently natural river corridor may instead have impeded movement while mountain passes carried contacts.
