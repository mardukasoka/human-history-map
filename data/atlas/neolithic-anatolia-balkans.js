// Calibration dataset v0.1: early Neolithic dispersal from Anatolia into the Balkans.
// Dates are conservative active intervals for the demonstrator, not claims of exact foundation.
// Route edges represent evidence-supported corridor hypotheses and retain provenance/confidence.

import { createSite, createEdge, createFlow, EPISTEMIC_STATUS } from '../../js/atlas-network.js';

export const sources = Object.freeze({
  aegeanMaritime: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4939275/',
  aegeanFarmers: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4922144/',
  greekDanubian: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9356035/',
  centralBalkansTempo: 'https://doi.org/10.1016/j.jasrep.2020.102528',
  vardarMorava: 'https://www.oeaw.ac.at/en/oeai/research/prehistory-wana-archaeology/prehistoric-phenomena/neosol',
  middleStruma: 'https://doi.org/10.1515/opar-2020-0170',
  westernBalkans: 'https://doi.org/10.5334/oq.28',
  cukuriciChronology: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11666786/',
  barcinDairying: 'https://doi.org/10.1371/journal.pone.0302788',
});

export const sites = Object.freeze([
  createSite({id:'barcin-hoyuk',name:'Barcın Höyük',kind:'settlement',coordinates:[29.27,40.42],from:-6600,to:-6000,evidence:[sources.aegeanFarmers,sources.barcinDairying],confidence:'high'}),
  createSite({id:'cukuroici-hoyuk',name:'Çukuriçi Höyük',kind:'settlement',coordinates:[27.36,37.95],from:-6680,to:-5970,evidence:[sources.aegeanMaritime,sources.cukuriciChronology],confidence:'high'}),
  createSite({id:'ulucak-hoyuk',name:'Ulucak Höyük',kind:'settlement',coordinates:[27.34,38.43],from:-6630,to:-6000,evidence:[sources.aegeanMaritime,sources.aegeanFarmers],confidence:'high'}),
  createSite({id:'paliambela-kolindrou',name:'Paliambela Kolindrou',kind:'settlement',coordinates:[22.48,40.43],from:-6700,to:-6000,evidence:[sources.greekDanubian],confidence:'medium'}),
  createSite({id:'svinjaricka-cuka',name:'Svinjarička Čuka',kind:'settlement',coordinates:[21.72,42.95],from:-6100,to:-5500,evidence:[sources.vardarMorava,'https://www.cambridge.org/core/journals/antiquity/article/fresh-light-on-balkan-prehistory-highlights-from-svinjaricka-cuka-serbia/F23BE95435EA40B85E5EC6D4FC092034'],confidence:'high'}),
  createSite({id:'lepenski-vir',name:'Lepenski Vir',kind:'settlement',coordinates:[22.02,44.55],from:-9500,to:-5500,evidence:['https://www.nature.com/articles/s41598-018-31884-7'],confidence:'high'}),
]);

export const edges = Object.freeze([
  createEdge({id:'west-anatolia-aegean-maritime',from:'cukuroici-hoyuk',to:'paliambela-kolindrou',mode:'sea',validFrom:-6700,validTo:-6000,evidence:[sources.aegeanMaritime,sources.aegeanFarmers],confidence:'medium'}),
  createEdge({id:'nw-anatolia-thrace-corridor',from:'barcin-hoyuk',to:'paliambela-kolindrou',mode:'land',validFrom:-6600,validTo:-6000,evidence:[sources.greekDanubian,sources.aegeanFarmers],confidence:'low'}),
  createEdge({id:'vardar-morava-south',from:'paliambela-kolindrou',to:'svinjaricka-cuka',mode:'migration',validFrom:-6250,validTo:-5900,evidence:[sources.vardarMorava,sources.centralBalkansTempo],confidence:'medium'}),
  createEdge({id:'morava-danube-gorges',from:'svinjaricka-cuka',to:'lepenski-vir',mode:'migration',validFrom:-6100,validTo:-5700,evidence:[sources.vardarMorava,sources.westernBalkans],confidence:'medium'}),
]);

export const flows = Object.freeze([
  createFlow({id:'early-farming-aegean',kind:'technology',subject:'Neolithic farming package',from:'west-anatolia',to:'aegean-and-northern-greece',fromYear:-6700,toYear:-6400,mechanism:'migration-and-interaction',evidence:[sources.aegeanMaritime,sources.aegeanFarmers],confidence:'medium'}),
  createFlow({id:'early-farming-central-balkans',kind:'technology',subject:'Neolithic farming package',from:'northern-greece-and-thrace',to:'central-balkans',fromYear:-6250,toYear:-5900,mechanism:'migration-and-interaction',evidence:[sources.greekDanubian,sources.centralBalkansTempo],confidence:'medium'}),
]);

// Negative evidence matters too: the Middle Struma study cautions that a modern-looking
// river corridor can have functioned as a barrier. Keep this constraint available to routing.
export const routeConstraints = Object.freeze([
  Object.freeze({id:'middle-struma-barrier',region:'middle-struma',from:-6500,to:-5800,effect:'penalize-river-axis',alternatives:['mountain-passes'],evidence:[sources.middleStruma],confidence:'medium'}),
]);

// Later historical and modern corridors are useful priors, never proof of prehistoric use.
export const corridorPriors = Object.freeze([
  Object.freeze({id:'persistent-vardar-morava',kind:'long-duration-corridor',basis:['archaeological-neolithic','later-historical','modern-transport'],status:'hypothesis-prior'}),
  Object.freeze({id:'persistent-danube',kind:'river-corridor',basis:['palaeolithic','neolithic','later-historical','modern-transport'],status:'hypothesis-prior'}),
]);

export const epistemicStatus = EPISTEMIC_STATUS.RECONSTRUCTED;
