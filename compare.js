// Compare one "cover" list against several "item" lists of values pasted from a cell
// (separated by ; tabs or new lines, or by commas when none of those are present). Case-insensitive, trims spaces, drops duplicates.
function parse(text) {
  const seen = new Map();
  text = String(text);
  // Commas split only when there is no ; tab or newline, since names like "Korea, Republic of" contain commas.
  const sep = /[;\t\n\r]/.test(text) ? /[;\t\n\r]+/ : /,/;
  for (const part of text.split(sep)) {
    const v = part.trim().replace(/\s+/g, " ");
    if (v && !seen.has(v.toLowerCase())) seen.set(v.toLowerCase(), v);
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}
function compare(coverText, itemTexts) {
  const cover = parse(coverText);
  const items = itemTexts.map(parse);
  const key = (s) => s.toLowerCase();
  const coverSet = new Set(cover.map(key));
  const union = new Map();
  items.forEach((l) => l.forEach((v) => { if (!union.has(key(v))) union.set(key(v), v); }));
  const sortLoc = (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" });
  return {
    cover,
    onlyInCover: cover.filter((v) => !union.has(key(v))),
    onlyInItems: [...union.values()].filter((v) => !coverSet.has(key(v))).sort(sortLoc),
    perItemMissingFromCover: items.map((l) => l.filter((v) => !coverSet.has(key(v)))),
    perItemNotInItem: items.map((l) => { const s = new Set(l.map(key)); return cover.filter((v) => !s.has(key(v))); }),
  };
}
if (typeof module !== "undefined") module.exports = { parse, compare };
