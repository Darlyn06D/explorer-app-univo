import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseCountries } from '../src/api/countries';
import { filterCountries } from '../src/utils/filter';
import { debounce } from '../src/utils/debounce';
import { renderEmpty, renderLoading } from '../src/render/states';
import { getCapital, formatPopulation } from '../src/utils/format';
const data = JSON.parse(fs.readFileSync('public/data/countries.json', 'utf8'));
const countries = parseCountries(data);
test('valida los 254 registros y normaliza campos ausentes', () => {
 assert.equal(countries.length,254);
 const c = parseCountries([{names:{common:'Prueba'},region:'Asia',population:null,capitals:null,flag:null,codes:null}])[0]!;
 assert.equal(getCapital(c),'Sin capital registrada'); assert.equal(formatPopulation(c.population),'No registrada');
 assert.throws(()=>parseCountries({})); assert.throws(()=>parseCountries([{names:{common:4}}]));
});
test('combina región y nombre sin modificar la colección', () => {
 const before=JSON.stringify(countries);
 assert.equal(filterCountries(countries,'  BELIZE  ','Americas').length,1);
 assert.equal(filterCountries(countries,'Belize','Europe').length,0);
 assert.ok(filterCountries(countries,'','Europe').every(c=>c.region==='Europe'));
 assert.equal(filterCountries(countries,'','').length,254);
 assert.equal(JSON.stringify(countries),before);
});
test('debounce cancela entradas anteriores y espera 300 ms', async () => {
 let calls=0; const d=debounce(()=>calls++,300); d.run();
 await new Promise(r=>setTimeout(r,180)); d.run();
 await new Promise(r=>setTimeout(r,180)); assert.equal(calls,0);
 await new Promise(r=>setTimeout(r,160)); assert.equal(calls,1);
 d.run();d.cancel();await new Promise(r=>setTimeout(r,320));assert.equal(calls,1);
});
test('skeleton tiene ocho tarjetas y el mensaje escapa texto del usuario',()=> {
 assert.equal((renderLoading().match(/<article/g)||[]).length,8);
 assert.ok(renderEmpty('<img src=x onerror=alert(1)>').includes('&lt;img'));
});
