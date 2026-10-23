#!/usr/bin/env node
// Builds the color part of tokens.json from seed hues, following references/brand.md.
// Usage:
//   node palette.mjs --primary 262:0.15 [--secondary 240:0.06] [--accent 30:0.18] [--neutral 262:0.012]
//                    [--success 150:0.14] [--warning 75:0.15] [--error 27:0.18] [--info 240:0.12]
//                    [--out tokens.json]
// Each value is hue:peakChroma in OKLCH. With --out, merges into an existing file (keeps other keys).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { check } from "./contrast.mjs";

export const STEPS = [
  [50, 0.975, 0.12], [100, 0.945, 0.25], [200, 0.885, 0.45], [300, 0.805, 0.7], [400, 0.715, 0.9],
  [500, 0.625, 1], [600, 0.545, 1], [700, 0.465, 0.9], [800, 0.385, 0.75], [900, 0.305, 0.6], [950, 0.225, 0.45],
];

function toLinear(L, C, H) {
  const h = (H * Math.PI) / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}

// Lowers chroma until the color fits in sRGB, so hue and lightness stay true.
export function toHex(L, C, H) {
  let c = C, rgb = toLinear(L, c, H);
  while (c > 0 && rgb.some((x) => x < -0.0001 || x > 1.0001)) rgb = toLinear(L, (c = Math.max(0, c - 0.002)), H);
  const g = (x) => Math.round(255 * Math.min(1, Math.max(0, x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)));
  return { hex: "#" + rgb.map((x) => g(x).toString(16).padStart(2, "0")).join(""), c };
}

export function scale(H, C) {
  // Yellow to cyan hues look muddy at mid steps, lift 400 and 500 slightly.
  // Not 600 and up (those carry text contrast) and not near-gray scales.
  const lift = H >= 70 && H <= 200 && C >= 0.04 ? 0.03 : 0;
  const out = {};
  for (const [step, L, f] of STEPS) {
    const l = step === 400 || step === 500 ? L + lift : L;
    const { hex, c } = toHex(l, C * f, H);
    out[step] = { $type: "color", $value: hex, $extensions: { oklch: `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${H})` } };
  }
  return out;
}

const ROLES = {
  light: { bg: "neutral.50", surface: "neutral.50", "surface-raised": "#ffffff", "surface-sunken": "neutral.100", border: "neutral.200", "border-strong": "neutral.300", text: "neutral.900", "text-muted": "neutral.600", primary: "primary.600", "on-primary": "#ffffff", "primary-container": "primary.100", "on-primary-container": "primary.900", accent: "accent.600", "focus-ring": "primary.500", success: "success.700", warning: "warning.700", error: "error.600", info: "info.600", "on-status": "#ffffff" },
  dark: { bg: "neutral.950", surface: "neutral.900", "surface-raised": "neutral.800", "surface-sunken": "neutral.950", border: "neutral.800", "border-strong": "neutral.700", text: "neutral.50", "text-muted": "neutral.400", primary: "primary.400", "on-primary": "primary.950", "primary-container": "primary.900", "on-primary-container": "primary.100", accent: "accent.400", "focus-ring": "primary.400", success: "success.400", warning: "warning.400", error: "error.400", info: "info.400", "on-status": "neutral.950" },
};

export const CONTRAST = [
  ["text", "bg"], ["text", "surface"], ["text", "surface-raised"], ["text-muted", "bg"], ["text-muted", "surface"],
  ["on-primary", "primary"], ["on-primary-container", "primary-container"], ["primary", "bg"],
  ["on-status", "success"], ["on-status", "error"], ["on-status", "info"], ["on-status", "warning"],
  ["focus-ring", "bg", 3], ["border-strong", "bg", 1.5],
];

export function build(seeds) {
  const color = {};
  for (const [name, [h, c]] of Object.entries(seeds)) color[name] = scale(h, c);
  const ref = (v) => (v.startsWith("#") ? v : `{color.${v}}`);
  const theme = Object.fromEntries(
    Object.entries(ROLES).map(([t, roles]) => [t, Object.fromEntries(Object.entries(roles).map(([r, v]) => [r, { $type: "color", $value: ref(v) }]))])
  );
  const tokens = { color, theme, contrast: CONTRAST };
  fixRoles(tokens);
  return tokens;
}

// OKLCH lightness is close to, not equal to, WCAG luminance (greens read brighter), so a fixed
// step can miss 4.5:1. Move the failing non-surface role one step toward more contrast
// (darker in light themes, lighter in dark) until every pair passes. Surfaces never move.
const SURFACES = new Set(["bg", "surface", "surface-raised", "surface-sunken"]);
const ORDER = STEPS.map(([s]) => String(s));
export function fixRoles(tokens, log = () => {}) {
  for (let pass = 0; pass < 4; pass++) {
    const failing = check(tokens).filter((r) => !r.pass && !r.error);
    if (!failing.length) return;
    for (const r of failing) {
      const theme = tokens.theme[r.theme];
      const role = [r.fg, r.bg].find((x) => !SURFACES.has(x) && /^\{color\.\w+\.\d+\}$/.test(theme[x].$value));
      if (!role) continue;
      const [, scaleName, step] = theme[role].$value.match(/^\{color\.(\w+)\.(\d+)\}$/);
      const i = ORDER.indexOf(step) + (r.theme === "dark" ? -1 : 1);
      if (i < 0 || i >= ORDER.length) continue;
      theme[role].$value = `{color.${scaleName}.${ORDER[i]}}`;
      log(`${r.theme}: ${role} moved to ${scaleName}.${ORDER[i]} for ${r.fg} on ${r.bg}`);
    }
  }
}

const parse = (v) => v.split(":").map(Number);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const opt = (k) => (args.includes(`--${k}`) ? args[args.indexOf(`--${k}`) + 1] : null);
  if (!opt("primary")) {
    console.error("Usage: node palette.mjs --primary <hue:chroma> [--accent ...] [--out tokens.json]");
    process.exit(2);
  }
  const [ph, pc] = parse(opt("primary"));
  const seeds = {
    primary: [ph, pc],
    secondary: opt("secondary") ? parse(opt("secondary")) : [ph, Math.min(0.06, pc / 2)],
    accent: opt("accent") ? parse(opt("accent")) : [(ph + 180) % 360, pc],
    neutral: opt("neutral") ? parse(opt("neutral")) : [ph, 0.012],
    success: opt("success") ? parse(opt("success")) : [150, 0.14],
    warning: opt("warning") ? parse(opt("warning")) : [75, 0.15],
    error: opt("error") ? parse(opt("error")) : [27, 0.18],
    info: opt("info") ? parse(opt("info")) : [240, 0.12],
  };
  const built = build(seeds);
  const out = opt("out");
  if (!out) {
    console.log(JSON.stringify(built, null, 2));
  } else {
    const base = existsSync(out) ? JSON.parse(readFileSync(out, "utf8")) : {};
    writeFileSync(out, JSON.stringify({ ...base, ...built, color: { ...base.color, ...built.color } }, null, 2) + "\n");
    console.log(`Wrote colors, themes and contrast pairs to ${out}. Next: node contrast.mjs ${out}`);
  }
}
