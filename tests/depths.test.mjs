import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {findDepth} from '../dist/lib/depths.js';
import {parseDimension,findKey,keyResult} from '../dist/lib/keys.js';
const {rows,diameters}=JSON.parse(await readFile(new URL('../dist/data/depths.json',import.meta.url)));
const {rows:keys}=JSON.parse(await readFile(new URL('../dist/data/keys.json',import.meta.url)));
test('complete nominal lookup without interpolation',()=>{
 assert.equal(diameters.length,88);assert.equal(rows.length,352);
 assert.equal(new Set(rows.map(r=>[r.diameter,r.shape,r.type].join('|'))).size,352);
 assert.equal(findDepth(rows,'1.01','square','parallel'),null);
 assert.equal(findDepth(rows,'4-15/16','rectangular','parallel').s,null);
 assert.equal(findDepth(rows,'4-15/16','rectangular','taper').s,null);
});
test('independent JW Winco inch reference nominal checks',()=>{
 for(const [d,s,t] of [['1/2',.430,.560],['5/8',.517,.709],['3/4',.644,.837],['7/8',.771,.964],['1',.859,1.114]]){
 const r=findDepth(rows,d,'square','parallel');assert.equal(r.s,s);assert.equal(r.t,t);
 }
 assert.equal(findDepth(rows,'1/2','square','parallel').key,'1/8 × 1/8');
});
test('all available values agree with key geometry within source rounding',()=>{
 for(const r of rows){if(r.s===null)continue;const d=parseDimension(r.diameter);const k=keyResult(findKey(keys,d),r.shape);
 const y=(d-Math.sqrt(d*d-k.width*k.width))/2;
 assert.ok(Math.abs(r.s-(d-y-k.height/2))<=.0011,JSON.stringify(r));
 assert.ok(Math.abs(r.t-(d-y+k.height/2+(r.type==='parallel'?.005:-.020)))<=.0011,JSON.stringify(r));
 }
});
