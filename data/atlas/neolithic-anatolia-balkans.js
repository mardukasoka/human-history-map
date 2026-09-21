// Calibration dataset v0.1: early Neolithic dispersal from Anatolia into the Balkans.
// Dates are conservative active intervals for the demonstrator, not claims of exact foundation.
// Route edges represent evidence-supported corridor hypotheses and retain provenance/confidence.

import { createSite, createEdge, createFlow, EPISTEMIC_STATUS } from '../../js/atlas-network.js';

export const sources = Object.freeze({
  aegeanMaritime: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4939275/',
  aegeanFarmers: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4922144/',
  greekDanubian: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9356035/',
  centralBalkansTempo: 'https://doi.org/10.1016/j.jasrep.2020.102528',
  cukuriciChronology: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11666786/',
  barcinDairying: 'https://doi.org/10.1371/journal.pone.0302788',
});

export const sites = Object.freeze([
  createSite({id:'barcin-hoyuk',name:'Barcın Höyük',kind:'settlement',coordinates:[29.27,40.42],from:-6600,to:-6000,evidence:[sources.aegeanFarmers,sources.barcinDairying],confidence:'high'}),
  createSite({id:'cukuroici-hoyuk',name:'Çukuriçi Höyük',kind:'settlement',coordinates:[27.36,37.95],from:-6680,to:-5970,evidence:[sources.aegeanMaritime,sources.cukuriciChronology],confidence:'high'}),
  createSite({id:'ulucak-hoyuk',name:'Ulucak Höyük',kind:'settlement',coordinates:[27.34,38.43],from:-6630,to:-6000,evidence:[sources.aegeanMaritime,sources.aegeanFarmers],confidence:'high'}),
  createSite({id:'paliambela-kolindrou',name:'Paliambela Kolindrou',kind:'settlement',coordinates:[22.48,40.43],from:-6700,to:-6000,evidence:[sources.greekDanubian],confidence:'medium'}),
  createSite({id:'lepenski-vir',name:'Lepenski Vir',kind:'settlement',coordinates:[22.02,44.55],from:-9500,to:-5500,evidence:['https://www.nature.com/articles/s41598-018-31884-7'],confidence:'high'}),
]);

export const edges = Object.freeze([
  createEdge({id:'west-anatolia-aegean-maritime',from:'cukuroici-hoyuk',to:'paliambela-kolindrou',mode:'sea',validFrom:-6700,validTo:-6000,evidence:[sources.aegeanMaritime,sources.aegeanFarmers],confidence:'medium'}),
  createEdge({id:'nw-anatolia-thrace-corridor',from:'barcin-hoyuk',to:'paliambela-kolindrou',mode:'land',validFrom:-6600,validTo:-6000,evidence:[sources.greekDanubian,sources.aegeanFarmers],confidence:'low'}),
  createEdge({id:'north-greece-central-balkans-corridor',from:'paliambela-kolindrou',to:'lepenski-vir',mode:'migration',validFrom:-6400,validTo:-5900,evidence:[sources.greekDanubian,sources.centralBalkansTempo],confidence:'low'}),
]);

export const flows = Object.freeze([
  createFlow({id:'early-farming-aegean',kind:'technology',subject:'Neolithic farming package',from:'west-anatolia',to:'aegean-and-northern-greece',fromYear:-6700,toYear:-6400,mechanism:'migration-and-interaction',evidence:[sources.aegeanMaritime,sources.aegeanFarmers],confidence:'medium'}),
  createFlow({id:'early-farming-central-balkans',kind:'technology',subject:'Neolithic farming package',from:'northern-greece-and-thrace',to:'central-balkans',fromYear:-6250,toYear:-5900,mechanism:'migration-and-interaction',evidence:[sources.greekDanubian,sources.centralBalkansTempo],confidence:'medium'}),
]);

export const epistemicStatus = EPISTEMIC_STATUS.RECONSTRUCTED;
