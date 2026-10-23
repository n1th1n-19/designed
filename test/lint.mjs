// Fails on em dashes or emojis in any tracked text file. Run: node test/lint.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SKIP = new Set(["node_modules", ".git", ".remember"]);
const BAD = /[\u2014\u{1F000}-\u{1FAFF}\u{2300}-\u{23FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u;
const files = [];
const walk = (d) => readdirSync(d).forEach((n) => {
  if (SKIP.has(n)) return;
  const p = join(d, n);
  statSync(p).isDirectory() ? walk(p) : /\.(md|mjs|js|json|sh|ya?ml|html|css)$/.test(n) && files.push(p);
});
walk(process.argv[2] || ".");

let bad = 0;
for (const f of files) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (BAD.test(line)) { bad++; console.log(`${f}:${i + 1}: ${line.trim().slice(0, 100)}`); }
  });
}
console.log(bad ? `\n${bad} lines with em dashes or emojis.` : `No em dashes or emojis in ${files.length} files.`);
process.exit(bad ? 1 : 0);
