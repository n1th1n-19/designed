#!/usr/bin/env node
// designed-skill installer. Copies skills/designed into your AI agents' skills folders.
// Usage: npx designed-skill [install|update|uninstall] [--claude --codex --cursor --gemini --agents --project --all] [--dir <path>] [--force]
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const SRC = path.join(__dirname, "..", "skills", "designed");
const PKG = require("../package.json");
const HOME = os.homedir();
const AGENTS = {
  claude: path.join(HOME, ".claude", "skills"),
  codex: path.join(HOME, ".codex", "skills"),
  cursor: path.join(HOME, ".cursor", "skills"),
  gemini: path.join(HOME, ".gemini", "skills"),
  agents: path.join(HOME, ".agents", "skills"),
};

const args = process.argv.slice(2);
const cmd = ["install", "update", "uninstall", "help"].includes(args[0]) ? args.shift() : "install";
const has = (f) => args.includes(`--${f}`);
const dirArg = args.includes("--dir") ? args[args.indexOf("--dir") + 1] : null;

if (cmd === "help" || has("help") || has("h")) {
  console.log(`designed-skill ${PKG.version}

  npx designed-skill                install for every agent found on this machine
  npx designed-skill --claude       only Claude Code (also --codex --cursor --gemini --agents)
  npx designed-skill --project      into ./.claude/skills of the current folder
  npx designed-skill --dir <path>   into <path>/designed
  npx designed-skill update         refresh every existing install
  npx designed-skill uninstall      remove every existing install
  --force                           overwrite a different folder named designed`);
  process.exit(0);
}

function targets() {
  if (dirArg) return [path.resolve(dirArg)];
  const picked = Object.keys(AGENTS).filter(has);
  if (has("project")) return [path.resolve(".claude", "skills")];
  if (has("all")) return Object.values(AGENTS);
  if (picked.length) return picked.map((k) => AGENTS[k]);
  // Auto: every agent whose home folder exists, else Claude Code.
  const found = Object.values(AGENTS).filter((d) => fs.existsSync(path.dirname(d)));
  return found.length ? found : [AGENTS.claude];
}

const isOurs = (dest) => {
  try { return /^name:\s*designed\s*$/m.test(fs.readFileSync(path.join(dest, "SKILL.md"), "utf8")); } catch { return false; }
};

let failed = 0;
for (const parent of targets()) {
  const dest = path.join(parent, "designed");
  const exists = fs.existsSync(dest);
  if (cmd === "uninstall" || cmd === "update") {
    if (!exists || !isOurs(dest)) continue;
  }
  if (cmd === "uninstall") {
    fs.rmSync(dest, { recursive: true, force: true });
    console.log(`removed  ${dest}`);
    continue;
  }
  if (exists && !isOurs(dest) && !has("force")) {
    console.error(`skipped  ${dest} (a different folder exists, use --force to replace it)`);
    failed++;
    continue;
  }
  if (exists && fs.lstatSync(dest).isSymbolicLink()) {
    console.log(`skipped  ${dest} (symlink, development install)`);
    continue;
  }
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(parent, { recursive: true });
  fs.cpSync(SRC, dest, { recursive: true });
  console.log(`${exists ? "updated " : "installed"} ${dest}`);
}
if (cmd !== "uninstall") console.log(failed ? "" : "\nDone. Start a new agent session and run /designed.");

// One quick check for a newer version. Silent when offline.
function newer(a, b) {
  const [x, y] = [a, b].map((v) => v.split("-")[0].split(".").map(Number));
  for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  return false;
}
if (typeof fetch === "function" && !process.env.DESIGNED_NO_UPDATE_CHECK) {
  fetch("https://registry.npmjs.org/designed-skill/latest", { signal: AbortSignal.timeout(1500) })
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => { if (j && j.version && newer(j.version, PKG.version)) console.log(`\nNewer version ${j.version} available: npx designed-skill@latest update`); })
    .catch(() => {})
    .finally(() => process.exit(failed ? 1 : 0));
} else {
  process.exit(failed ? 1 : 0);
}
