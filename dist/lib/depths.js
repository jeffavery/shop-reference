export function findDepth(rows, diameter, shape, type) {
  return rows.find(row => row.diameter === diameter && row.shape === shape && row.type === type) ?? null;
}
