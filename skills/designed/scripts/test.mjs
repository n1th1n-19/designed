// Self-check for contrast.mjs and drift.mjs. Run: node scripts/test.mjs
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { check, parseColor, ratio, oklchToSrgb } from "./contrast.mjs";
import { drift, walk } from "./drift.mjs";
import { build, merge } from "./palette.mjs";

// Known WCAG values
assert.equal(ratio(parseColor("#000"), parseColor("#fff")).toFixed(1), "21.0");
assert.equal(ratio(parseColor("#777777"), parseColor("#ffffff")).toFixed(2), "4.48");
// OKLCH white and black round trip
assert.deepEqual(oklchToSrgb(1, 0, 0).map((c) => Math.round(c * 255)), [255, 255, 255]);
assert.deepEqual(parseColor("oklch(0 0 0)").map((c) => Math.round(c * 255)), [0, 0, 0]);

const tokens = {
  color: { neutral: { 50: { $type: "color", $value: "#f7f8fa" }, 900: { $type: "color", $value: "#17191e" }, 400: { $type: "color", $value: "#a0a4ab" } } },
  space: { 4: { $type: "dimension", $value: "16px" }, 2: { $type: "dimension", $value: "0.5rem" } },
  font: { body: { $type: "fontFamily", $value: ["Inter", "sans-serif"] } },
  theme: {
    light: { text: { $value: "{color.neutral.900}" }, muted: { $value: "{color.neutral.400}" }, bg: { $value: "{color.neutral.50}" } },
  },
  contrast: [["text", "bg"], ["muted", "bg"]],
};

const res = check(tokens);
assert.equal(res.find((r) => r.fg === "text").pass, true, "dark text on light bg passes");
assert.equal(res.find((r) => r.fg === "muted").pass, false, "light gray on light bg fails");
assert.equal(check({ ...tokens, theme: { light: { text: { $value: "{color.nope}" }, bg: "#fff" } }, contrast: [["text", "bg"]] })[0].pass, false, "bad alias reported as failure");

const dir = mkdtempSync(join(tmpdir(), "designed-test-"));
writeFileSync(join(dir, "a.css"), ".a { color: #17191E; padding: 16px 8px; font-family: Inter, sans-serif; }\n.b { background: #ff0055; margin: 13px; font-family: \"Comic Sans MS\"; }\n");
writeFileSync(join(dir, "gen.css"), "/* Generated from tokens.json. Edit tokens.json, not this file. */\n.c { color: #123456; }\n");
const off = drift(tokens, walk(dir)).map((h) => h.raw);
assert.deepEqual(off.sort(), ["#ff0055", "13px", "Comic Sans MS"].sort(), "only off-token values flagged, generated files skipped");

// Generated palettes pass their own contrast pairs, for several seed hues
for (const h of [27, 75, 150, 262, 330]) {
  const t = build({ primary: [h, 0.15], secondary: [h, 0.05], accent: [(h + 180) % 360, 0.15], neutral: [h, 0.012], success: [150, 0.14], warning: [75, 0.15], error: [27, 0.18], info: [240, 0.12] });
  const failed = check(t).filter((r) => !r.pass);
  assert.equal(failed.length, 0, `hue ${h}: ${failed.map((r) => `${r.theme} ${r.fg}/${r.bg} ${r.ratio?.toFixed(2)}`).join(", ")}`);
}

// Re-running palette keeps custom roles and pairs
const seeds = { primary: [262, 0.15], neutral: [262, 0.012], accent: [80, 0.15], secondary: [262, 0.05], success: [150, 0.14], warning: [75, 0.15], error: [27, 0.18], info: [240, 0.12] };
const merged = merge({ font: { body: 1 }, theme: { light: { brand: { $value: "#000" } } }, contrast: [["brand", "bg"]] }, build(seeds));
assert.ok(merged.font && merged.theme.light.brand && merged.theme.light.text, "custom role kept, generated roles added");
assert.ok(merged.contrast.some((p) => p[0] === "brand"), "custom pair kept");

// Drift accepts object dimensions, comma font strings and typography font sizes
const t2 = { s: { $type: "dimension", $value: { value: 13, unit: "px" } }, f: { $type: "fontFamily", $value: "Comic Sans MS, cursive" }, ty: { $type: "typography", $value: { fontSize: "22px" } } };
writeFileSync(join(dir, "b.css"), ".x { margin: 13px; font-size: 22px; font-family: \"Comic Sans MS\"; }\n");
assert.deepEqual(drift(t2, [join(dir, "b.css")]).map((h) => h.raw), [], "alternate token shapes accepted");

console.log("All checks pass.");
