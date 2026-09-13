import { parseDimension, findKey, keyResult } from './lib/keys.js';
const $ = id => document.getElementById(id);
const sections = {
  threads: ['Threads & Tap Drills', 'Unified inch threads, metric threads, and NPT / NPSC pipe tap drills.'],
  counterbores: ['Counterbores', 'Clearance and counterbore dimensions for inch and metric socket head cap screws.'],
  strength: ['Bolt/Material Strength', 'Inch bolt grades, metric property classes, and stainless fastener strength.'],
  gears: ['Gears', 'Gear families, shaft arrangements, motion, and application characteristics.']
};
const parents = {'metric-taps':'threads','pipe-taps':'threads','metric-counterbores':'counterbores','metric-strength':'strength','stainless-strength':'strength'};
function route() {
  const key = location.hash.slice(1);
  const planned = sections[parents[key] || key];
  $('keys-page').hidden = Boolean(planned) || key === 'depths';
  $('depths-page').hidden = key !== 'depths';
  document.querySelector('.key-tools').hidden = Boolean(planned);
  document.querySelectorAll('[data-key-tool]').forEach(a => {
    if (a.dataset.keyTool === (key === 'depths' ? 'depths' : 'keys')) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  $('planned-page').hidden = !planned;
  document.title = `${planned?.[0] || (key === 'depths' ? 'Shaft & Hub Depths' : 'Keys & Keyways')} · Shop Reference`;
  document.querySelectorAll('[data-section]').forEach(a => {
    if (a.dataset.section === (planned ? (parents[key] || key) : 'keys')) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
route(); window.addEventListener('hashchange', route);
try {
  const response = await fetch('./data/keys.json');
  if (!response.ok) throw new Error('Data unavailable');
  const { rows } = await response.json();
  $('key-rows').innerHTML = rows.map((r, i) => `<tr data-row="${i}"><td>${r.range.replace(' to ', ' → ')}</td><td>${r.width}</td><td>${r.square ?? '—'}</td><td>${r.rectangular ?? '—'}</td></tr>`).join('');
  function update() {
    const d = parseDimension($('diameter').value);
    const row = findKey(rows, d);
    const result = keyResult(row, $('shape').value);
    let error = !Number.isFinite(d) ? 'Enter a positive decimal or fraction, such as 1-1/4.' : !row ? 'Supported shaft diameters are greater than 5/16 in and no more than 30 in.' : !result ? 'This cross-section is not listed for this range. Choose the other key cross-section.' : '';
    $('error').textContent = error; $('error').hidden = !error;
    $('diameter').setAttribute('aria-invalid', String(!row));
    $('shape').setAttribute('aria-invalid', String(Boolean(row && !result)));
    $('size').textContent = result ? `${row.width} × ${row[$('shape').value]}` : 'No matching size';
    $('band').textContent = row ? `Shaft range: over ${row.range.split(' to ')[0]} through ${row.range.split(' to ')[1]} in` : 'Check the shaft diameter.';
    for (const [id, value] of [['width',result?.width],['height',result?.height],['half',result?.nominalHalfHeight]]) $(id).textContent = value === undefined ? '—' : `${value.toFixed(5).replace(/0+$/, '').replace(/\.$/, '')} in`;
    document.querySelector('figure').hidden = !result;
    if (result) { const h = 140 * result.height / result.width; $('key-outline').setAttribute('height', h); $('height-line').setAttribute('d', `M212 60H242M212 ${60+h}H242M233 60V${60+h}M228 65l10-10M228 ${65+h}l10-10`); }
    document.querySelectorAll('[data-row]').forEach(tr => tr.classList.toggle('selected', rows[Number(tr.dataset.row)] === row));
  }
  $('key-form').addEventListener('submit', e => { e.preventDefault(); update(); });
  $('shape').addEventListener('change', update);
  $('diameter').addEventListener('input', update);
  update();
} catch {
  $('size').textContent = 'Dimensions unavailable';
  $('error').textContent = 'Could not load the local dataset. Run the site with the included local server and refresh.';
  $('error').hidden = false;
}
