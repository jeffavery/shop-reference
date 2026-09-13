import { findDepth } from './lib/depths.js';
const el = id => document.getElementById(id);
try {
  const response = await fetch('./data/depths.json');
  if (!response.ok) throw new Error('Missing depth dataset');
  const { rows, diameters } = await response.json();
  el('depth-diameter').replaceChildren(...diameters.map(d => {
    const option = document.createElement('option');
    option.value = d; option.textContent = d; return option;
  }));
  el('depth-diameter').value = '1';
  function update() {
    const type = el('depth-type').value;
    const row = findDepth(rows, el('depth-diameter').value, el('depth-shape').value, type);
    const valid = row && row.s !== null && row.t !== null;
    el('depth-key').textContent = valid ? row.key : 'Not tabulated';
    el('depth-summary').textContent = valid ? `${el('depth-diameter').value} in shaft · ${type === 'parallel' ? 'Parallel' : 'Taper'} key` : 'Choose another shaft size or cross-section.';
    el('depth-s').textContent = valid ? `${row.s.toFixed(3)} in` : '—';
    el('depth-t').textContent = valid ? `${row.t.toFixed(3)} in` : '—';
    el('depth-error').hidden = Boolean(valid);
    el('depth-error').textContent = valid ? '' : (row?.note || 'No tabulated result is available for this combination.');
    el('depth-type-note').textContent = type === 'taper' ? 'T is measured at the deeper end of the tapered hub keyway.' : 'Parallel-key hub dimensions include the source’s clearance allowance.';
  }
  ['depth-diameter','depth-shape','depth-type'].forEach(id => el(id).addEventListener('change', update));
  el('depth-form').addEventListener('submit', event => event.preventDefault());
  update();
} catch {
  el('depth-key').textContent = 'Dimensions unavailable';
  el('depth-error').textContent = 'Could not load the local depth dataset. Refresh the page to try again.';
  el('depth-error').hidden = false;
}
