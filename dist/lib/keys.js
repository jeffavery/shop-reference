export function parseDimension(value) {
  const text = String(value).trim();
  if (/^\d+(?:\.\d+)?$/.test(text)) return Number(text);
  const match = text.match(/^(?:(\d+)[ -])?(\d+)\/(\d+)$/);
  if (!match || Number(match[3]) === 0) return NaN;
  return Number(match[1] || 0) + Number(match[2]) / Number(match[3]);
}

export function findKey(rows, diameter) {
  if (!Number.isFinite(diameter)) return null;
  return rows.find(row => diameter > row.over && diameter <= row.through) || null;
}

export function keyResult(row, shape) {
  if (!row || !['square', 'rectangular'].includes(shape) || row[shape] === null) return null;
  const height = parseDimension(row[shape]);
  return { width: parseDimension(row.width), height, nominalHalfHeight: height / 2 };
}
