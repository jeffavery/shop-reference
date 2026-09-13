export const unique = values => [...new Set(values)];
export const display = (value, unit='') => value === null || value === undefined || value === '' ? '—' : `${value}${unit ? ' '+unit : ''}`;
export function drillLabel(label, diameter) {
  return /^\d+$/.test(label) && Number(label) !== diameter ? `#${label}` : label;
}
export function pipeChoice(row, type, reamer) {
  if (!row) return null;
  const prefix=type==='NPSC'?'npsc':reamer==='yes'?'nptReamer':'nptNoReamer';
  return {drill:row[prefix+'Bit'],diameter:row[prefix+'Dec']};
}
export function metricArea(d,p) {return Math.PI/4 * (d-.938194*p)**2;}
export function filterRows(rows,query) {const q=query.trim().toLowerCase();return rows.filter(r=>Object.values(r).some(v=>v!==null&&String(v).toLowerCase().includes(q)));}
