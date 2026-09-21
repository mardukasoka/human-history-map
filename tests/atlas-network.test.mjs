import assert from 'node:assert/strict';
import { createSite, createEdge, createFlow, createAtlasState, canWriteCanonical, EPISTEMIC_STATUS } from '../js/atlas-network.js';

const siteA=createSite({id:'site-a',name:'Site A',kind:'settlement',coordinates:[20,40],from:-7000,to:-6000,evidence:['test'],confidence:'high'});
const siteB=createSite({id:'site-b',name:'Site B',kind:'settlement',coordinates:[21,41],from:-6500,to:-5500,evidence:['test'],confidence:'medium'});
const edge=createEdge({id:'edge-a-b',from:'site-a',to:'site-b',mode:'land',validFrom:-6500,validTo:-6000,evidence:['test'],confidence:'low'});
const flow=createFlow({id:'flow-farming',kind:'technology',subject:'farming',from:'site-a',to:'site-b',fromYear:-6400,toYear:-6100,mechanism:'diffusion',evidence:['test'],confidence:'low'});

const state=createAtlasState({year:-6250,sites:[siteA,siteB],edges:[edge],flows:[flow]});
assert.equal(state.sites.length,2);
assert.equal(state.edges.length,1);
assert.equal(state.flows.length,1);
assert.equal(state.branch,'canonical');
assert.equal(canWriteCanonical(siteA),true);
assert.equal(canWriteCanonical({...siteA,epistemicStatus:EPISTEMIC_STATUS.COUNTERFACTUAL}),false);
assert.throws(()=>createAtlasState({year:0}),/nonzero/);
assert.throws(()=>createSite({id:'x',name:'X',kind:'unknown',coordinates:[0,0]}),/unsupported/);
console.log('Atlas network tests passed');
