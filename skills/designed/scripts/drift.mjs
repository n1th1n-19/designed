#!/usr/bin/env node
// Finds raw design values in code that are not defined in tokens.json.
// Usage:
//   node drift.mjs tokens.json <dir> [<dir> ...]   list off-token colors, fonts, px values (exit 1 if any)
//   node drift.mjs --report <dir> [<dir> ...]      inventory of every raw value with counts (for audits)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseColor } from "./contrast.mjs";

const EXTS = new Set([".css", ".scss", ".sass", ".less", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".vue", ".svelte", ".astro", ".html", ".swift", ".kt", ".xml", ".dart"]);
const SKIP = new Set(["node_modules", ".git", "dist", "build", ".next", ".nuxt", ".svelte-kit", "out", "coverage", "Pods", ".gradle", "vendor"]);
const GENERATED = "Generated from tokens.json";

const COLOR_RE = /#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3,4}\b|\b(?:rgba?|hsla?|oklch)\([^)]*\)|\b0x[0-9a-fA-F]{8}\b/g;
const FONT_RE = /font-?family\s*[:=]\s*["'`]?([^;"'`,\n}]+)/gi;
const PX_RE = /(?<![\w.-])(\d+(?:\.\d+)?)px\b/g;
const ALWAYS_OK_PX = new Set(["0", "1"]);

export function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name) || name.startsWith(".")) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXTS.has(extname(name)) && !/tokens\.json$|design-demo\.html$/.test(name)) out.push(p);
  }
  return out;
}

// Normalise any color string to lowercase 6-digit hex (alpha ignored) for comparison.
export function normColor(str) {
  let s = str.trim();
  if (/^0x[0-9a-f]{8}$/i.test(s)) s = "#" + s.slice(4); // Android/Flutter 0xAARRGGBB
  const rgb = parseColor(s);
  if (!rgb) return s.toLowerCase();
  return "#" + rgb.map((c) => Math.round(c * 255).toString(16).padStart(2, "0")).join("");
}

export function allowedFrom(tokens) {
  const colors = new Set(), fonts = new Set(), px = new Set(ALWAYS_OK_PX);
  const visit = (node) => {
    if (node && typeof node === "object") {
      if ("$value" in node) {
        const v = node.$value;
        const type = node.$type;
        if (typeof v === "string" && v.startsWith("{")) return; // alias, the target is collected anyway
        if (type === "color" || (typeof v === "string" && parseColor(v))) colors.add(normColor(String(v)));
        if (type === "fontFamily") [].concat(v).forEach((f) => fonts.add(String(f).replace(/["']/g, "").trim().toLowerCase()));
        if (type === "dimension" || (typeof v === "string" && /^\d/.test(v))) {
          const m = String(v).match(/^(\d+(?:\.\d+)?)(px|rem)?$/);
          if (m) px.add(m[2] === "rem" ? String(parseFloat(m[1]) * 16) : m[1]);
        }
        if (node.$extensions) visit(node.$extensions);
        return;
      }
      Object.values(node).forEach(visit);
    }
  };
  visit(tokens);
  return { colors, fonts, px };
}

export function scan(files) {
  const hits = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    if (text.slice(0, 400).includes(GENERATED)) continue;
    text.split("\n").forEach((line, i) => {
      const at = `${file}:${i + 1}`;
      for (const m of line.matchAll(COLOR_RE)) hits.push({ kind: "color", raw: m[0], key: normColor(m[0]), at });
      for (const m of line.matchAll(FONT_RE)) {
        const f = m[1].trim().replace(/["']/g, "");
        if (f && !f.startsWith("var(") && !f.startsWith("$") && !f.startsWith("{")) hits.push({ kind: "font", raw: f, key: f.toLowerCase(), at });
      }
      for (const m of line.matchAll(PX_RE)) hits.push({ kind: "px", raw: m[0], key: m[1], at });
    });
  }
  return hits;
}

export function drift(tokens, files) {
  const ok = allowedFrom(tokens);
  return scan(files).filter((h) =>
    h.kind === "color" ? !ok.colors.has(h.key) : h.kind === "font" ? !ok.fonts.has(h.key) : !ok.px.has(h.key)
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const report = args[0] === "--report";
  const dirs = args.slice(1);
  if ((!report && !args[0]) || !dirs.length) {
    console.error("Usage: node drift.mjs tokens.json <dir>...  |  node drift.mjs --report <dir>...");
    process.exit(2);
  }
  const files = dirs.flatMap((d) => (statSync(d).isDirectory() ? walk(d) : [d]));
  if (report) {
    const groups = {};
    for (const h of scan(files)) {
      const g = (groups[h.kind] ??= {});
      (g[h.key] ??= []).push(h.at);
    }
    for (const [kind, vals] of Object.entries(groups)) {
      console.log(`\n## ${kind} (${Object.keys(vals).length} distinct)`);
      for (const [v, ats] of Object.entries(vals).sort((a, b) => b[1].length - a[1].length))
        console.log(`${String(ats.length).padStart(5)}  ${v}  ${ats.slice(0, 3).join(", ")}${ats.length > 3 ? " ..." : ""}`);
    }
    process.exit(0);
  }
  const tokens = JSON.parse(readFileSync(args[0], "utf8"));
  const off = drift(tokens, files);
  for (const h of off) console.log(`${h.at}  ${h.kind}  ${h.raw}`);
  console.log(off.length ? `\n${off.length} off-token values in ${files.length} files.` : `\nNo drift in ${files.length} files.`);
  process.exit(off.length ? 1 : 0);
}
