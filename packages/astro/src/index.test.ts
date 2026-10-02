import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateChart, calculatePanchang, scoreMatch } from './index.js';
const birth={date:'1995-08-15',time:'07:24',utcOffsetMinutes:330,latitude:18.5204,longitude:73.8567};
test('birth chart returns nine sidereal grahas and finite placements',()=>{const chart=calculateChart({...birth,name:'Test'});assert.equal(chart.planets.length,9);assert.ok(chart.ascendant.longitude>=0&&chart.ascendant.longitude<360);assert.equal(chart.planets.find(p=>p.name==='Moon')?.nakshatra,'Revati');assert.ok(Number.isFinite(chart.dasha.balanceYears));});
test('panchang preview explicitly identifies its limits',()=>{const day=calculatePanchang('2026-10-03');assert.ok(day.tithi.number>=1&&day.tithi.number<=30);assert.ok(day.nakshatra);assert.equal(day.sunrise,null);});
test('compatibility preview is not misrepresented as complete',()=>{const a=calculateChart(birth),b=calculateChart({...birth,time:'10:15',latitude:19.076,longitude:72.8777});const match=scoreMatch(a,b);assert.equal(match.max,36);assert.equal(match.complete,false);assert.match(match.notice,/remaining six kootas/);});
