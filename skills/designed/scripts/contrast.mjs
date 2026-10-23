#!/usr/bin/env node
// WCAG contrast check for tokens.json (W3C Design Tokens format).
// Usage: node contrast.mjs tokens.json [--aaa]
// Checks every pair in tokens.contrast ([fg, bg] or [fg, bg, minRatio]) in every theme under tokens.theme.
// Exits 1 if any pair fails.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

export function resolve(tokens, value, seen = new Set()) {
  if (typeof value === "object" && value !== null && "$value" in value) value = value.$value;
  if (typeof value !== "string") return value;
  const m = value.match(/^\{([^}]+)\}$/);
  if (!m) return value;
  if (seen.has(m[1])) throw new Error(`Alias loop at {${m[1]}}`);
  seen.add(m[1]);
  const target = get(tokens, m[1]);
  if (target === undefined) throw new Error(`Unknown alias {${m[1]}}`);
  return resolve(tokens, target, seen);
}

// Returns [r, g, b] in 0..1 sRGB, or null if the format is unknown.
export function parseColor(str) {
  const s = String(str).trim().toLowerCase();
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  }
  m = s.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*[\d.%]+\s*)?\)$/);
  if (m) {
    const L = parseFloat(m[1]) / (m[2] ? 100 : 1);
    return oklchToSrgb(L, parseFloat(m[3]), parseFloat(m[4]));
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (m) return [m[1], m[2], m[3]].map((v) => parseFloat(v) / 255);
  return null;
}

export function oklchToSrgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  const gamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
  return lin.map((x) => Math.min(1, Math.max(0, gamma(x)))); // clamp to sRGB gamut
}

export function luminance([r, g, b]) {
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function ratio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// Returns [{ theme, fg, bg, ratio, min, pass, error? }]
export function check(tokens, { aaa = false } = {}) {
  const themes = tokens.theme ?? {};
  const pairs = tokens.contrast ?? [];
  const results = [];
  for (const [themeName, theme] of Object.entries(themes)) {
    for (const [fgRole, bgRole, min] of pairs) {
      const need = min ?? (aaa ? 7 : 4.5);
      const row = { theme: themeName, fg: fgRole, bg: bgRole, min: need };
      try {
        if (!(fgRole in theme) || !(bgRole in theme)) throw new Error("role missing in theme");
        const fg = parseColor(resolve(tokens, theme[fgRole]));
        const bg = parseColor(resolve(tokens, theme[bgRole]));
        if (!fg || !bg) throw new Error("unsupported color format");
        row.ratio = ratio(fg, bg);
        row.pass = row.ratio >= need;
      } catch (e) {
        row.error = e.message;
        row.pass = false;
      }
      results.push(row);
    }
  }
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node contrast.mjs tokens.json [--aaa]");
    process.exit(2);
  }
  const tokens = JSON.parse(readFileSync(file, "utf8"));
  if (!tokens.contrast?.length) {
    console.error('tokens.json has no "contrast" pairs. Add e.g. "contrast": [["text", "bg"]]');
    process.exit(2);
  }
  const results = check(tokens, { aaa: process.argv.includes("--aaa") });
  for (const r of results) {
    const status = r.pass ? "pass" : "FAIL";
    const detail = r.error ? r.error : `${r.ratio.toFixed(2)}:1 (need ${r.min})`;
    console.log(`${status}  ${r.theme.padEnd(8)} ${r.fg} on ${r.bg}  ${detail}`);
  }
  const failed = results.filter((r) => !r.pass).length;
  console.log(failed ? `\n${failed} of ${results.length} pairs failed.` : `\nAll ${results.length} pairs pass.`);
  process.exit(failed ? 1 : 0);
}
