import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseDimension,findKey,keyResult} from '../dist/lib/keys.js';
const {rows} = JSON.parse(await readFile(new URL('../dist/data/keys.json',import.meta.url)));
test('fractions, mixed fractions and invalid input',()=>{
  for(const s of ['1.25','1-1/4','1 1/4']) assert.equal(parseDimension(s),1.25);
  assert.equal(parseDimension('1/2'),.5);
  for(const s of ['', '1/0','-1','1abc','Infinity']) assert.ok(Number.isNaN(parseDimension(s)));
});
test('each range excludes lower limit and includes upper limit',()=>{
  assert.equal(rows.length,22);
  assert.equal(findKey(rows,rows[0].over),null);
  rows.forEach((r,i)=>{
    assert.equal(findKey(rows,r.through),r);
    assert.equal(findKey(rows,r.over),i ? rows[i-1] : null);
    assert.equal(findKey(rows,(r.over+r.through)/2),r);
  });
  assert.equal(findKey(rows,30.001),null);
});
test('known dimensions and unsupported sections',()=>{
  assert.deepEqual(keyResult(findKey(rows,1),'square'),{width:.25,height:.25,nominalHalfHeight:.125});
  assert.equal(keyResult(findKey(rows,1),'rectangular').height,.1875);
  assert.equal(keyResult(findKey(rows,.375),'rectangular'),null);
  assert.equal(keyResult(findKey(rows,18),'square'),null);
  assert.equal(keyResult(findKey(rows,30),'rectangular').height,5);
});
