// Installer self-check. Run: node test/install.test.mjs
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const bin = new URL("../bin/install.js", import.meta.url).pathname;
const env = { ...process.env, DESIGNED_NO_UPDATE_CHECK: "1" };
const run = (...a) => execFileSync("node", [bin, ...a], { env, encoding: "utf8" });
const dir = mkdtempSync(join(tmpdir(), "designed-install-"));

run("--dir", dir);
assert.ok(existsSync(join(dir, "designed", "SKILL.md")), "install copies SKILL.md");
assert.ok(existsSync(join(dir, "designed", "scripts", "contrast.mjs")), "install copies scripts");

run("update", "--dir", dir);
assert.ok(existsSync(join(dir, "designed", "SKILL.md")), "update keeps install");

const other = mkdtempSync(join(tmpdir(), "designed-other-"));
mkdirSync(join(other, "designed"));
writeFileSync(join(other, "designed", "SKILL.md"), "---\nname: something-else\n---\n");
assert.throws(() => execFileSync("node", [bin, "--dir", other], { env, stdio: "pipe" }), "refuses to overwrite a different skill");

run("uninstall", "--dir", dir);
assert.ok(!existsSync(join(dir, "designed")), "uninstall removes it");

console.log("Installer checks pass.");
