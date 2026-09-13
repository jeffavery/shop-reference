import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pipeChoice,metricArea,filterRows,drillLabel} from '../dist/lib/reference.js';
import {parseDimension} from '../dist/lib/keys.js';
const names=['unified','metric-taps','pipe-taps','counterbores-inch','counterbores-metric','inch-strength','metric-strength','stainless-strength','gears'];
const datasets=Object.fromEntries(await Promise.all(names.map(async n=>[n,JSON.parse(await readFile(new URL(`../dist/data/${n}.json`,import.meta.url)))])));
test('all reference datasets contain source provenance and finite numeric values',()=>{
 for(const [name,d]of Object.entries(datasets)){assert.ok(d.source.startsWith('https://'));assert.ok(d.rows.length>0);for(const r of d.rows)for(const v of Object.values(r))if(typeof v==='number')assert.ok(Number.isFinite(v),name);}
 assert.equal(datasets.unified.rows.length,73);assert.equal(datasets['metric-strength'].rows.length,198);assert.equal(datasets['stainless-strength'].rows.length,11);assert.equal(datasets.gears.rows.length,11);
});
test('tap drill examples, unique selections and usable minor limits',()=>{
 const u=datasets.unified.rows;assert.equal(u.find(r=>r.thread==='1/4-20').diameter,.201);assert.equal(u.find(r=>r.thread==='#10-32').diameter,.159);assert.equal(u.find(r=>r.thread==='1-9/16-18').drill,'1-1/2');
 const m=datasets['metric-taps'].rows;assert.equal(new Set(m.map(r=>r.thread)).size,m.length);assert.equal(m.find(r=>r.thread==='M6x1').drill,5);assert.equal(m.find(r=>r.thread==='M8x1.25').drill,6.8);assert.equal(m.find(r=>r.thread==='M39x3').min,null);
 for(const r of m){if(r.drill!==null)assert.ok(r.drill>0&&r.drill<r.major);for(const key of ['max5','max6','max7'])if(r.min!==null&&r[key]!==null)assert.ok(r.min<=r[key],r.thread);}
});
test('pipe reamer choice is ignored for NPSC',()=>{
 const r=datasets['pipe-taps'].rows.find(r=>r.size==='1/2');assert.deepEqual(pipeChoice(r,'NPT','yes'),{drill:'11/16',diameter:.688});assert.deepEqual(pipeChoice(r,'NPT','no'),{drill:'45/64',diameter:.703});assert.deepEqual(pipeChoice(r,'NPSC','yes'),pipeChoice(r,'NPSC','no'));
});
test('counterbore tables preserve both fits and sensible dimensions',()=>{
 for(const n of ['counterbores-inch','counterbores-metric']){const rows=datasets[n].rows;assert.equal(rows.length,n.endsWith('inch')?44:36);for(const r of rows){const cb=parseDimension(r.counterbore);assert.ok(cb>r.clearance&&r.clearance>r.body,JSON.stringify(r));assert.ok(r.head>0);const other=rows.find(x=>x.size===r.size&&x.fit==='Close');if(r.fit==='Normal')assert.ok(r.clearance>=other.clearance);}}
});
test('metric stress areas and loads agree within published rounding',()=>{
 for(const r of datasets['metric-strength'].rows){if(r.area===null)continue;const [d,p]=r.thread.match(/[\d.]+/g).map(Number);const area=metricArea(d,p);assert.ok(Math.abs(r.area-area)/area<.005,JSON.stringify(r));for(const [load,stress]of [['ultimate','tensile'],['proofLoad','proof']])assert.ok(Math.abs(r[load]-r.area*r[stress])/(r.area*r[stress])<.015,JSON.stringify(r));assert.ok(r.proof<=r.tensile);assert.ok(r.hvMin<=r.hvMax);if(d>10)assert.equal(r.torque,null);}
 const r=datasets['metric-strength'].rows.find(r=>r.thread==='M6 x 1'&&r.grade==='8.8');assert.equal(r.area,20.1);assert.equal(r.tensile,800);assert.equal(r.proof,580);
});
test('strength scope restrictions and stainless combinations',()=>{
 const rows=datasets['metric-strength'].rows;for(const r of rows.filter(r=>r.grade==='9.8'&&Number(r.thread.match(/^M([\d.]+)/)[1])>16)){assert.equal(r.tensile,null);assert.ok(r.note);}
 const a=datasets['stainless-strength'].rows.find(r=>r.grade==='A1,A2,A3,A4,A5'&&r.property==='70');assert.equal(a.tensile,700);assert.equal(a.yield,450);
 const s=datasets['inch-strength'].rows.find(r=>r.grade==='ASTM A307');assert.equal(s.proof,null);assert.equal(s.yield,null);
 assert.equal(datasets['inch-strength'].rows.find(r=>r.grade==='SAE Grade 8').tensile,150);
});
test('chart filtering is case insensitive and empty results are handled',()=>{assert.ok(filterRows(datasets.unified.rows,'unef').length>0);assert.deepEqual(filterRows(datasets.unified.rows,'does-not-exist'),[]);});
test('number drills and whole-inch drills remain distinct',()=>{assert.equal(drillLabel('7',.201),'#7');assert.equal(drillLabel('1',1),'1');assert.equal(drillLabel('F',.257),'F');assert.equal(drillLabel('1 1/16',1.062),'1 1/16');});
