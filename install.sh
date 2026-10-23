#!/usr/bin/env bash
# One-line installer for the designed skill.
#   curl -fsSL https://raw.githubusercontent.com/n1th1n-19/designed/main/install.sh | bash
#   curl -fsSL .../install.sh | bash -s -- --claude      (pass installer flags after --)
set -euo pipefail

REPO="${DESIGNED_REPO:-https://github.com/n1th1n-19/designed}"
REF="${DESIGNED_REF:-main}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

if command -v git >/dev/null 2>&1; then
  git clone --quiet --depth 1 --branch "$REF" "$REPO" "$TMP/designed"
else
  curl -fsSL "$REPO/archive/refs/heads/$REF.tar.gz" | tar -xz -C "$TMP"
  mv "$TMP"/designed-* "$TMP/designed"
fi

if command -v node >/dev/null 2>&1; then
  node "$TMP/designed/bin/install.js" "$@"
else
  # No Node: copy into Claude Code's skills folder, or --dir <path>.
  DEST="$HOME/.claude/skills"
  if [ "${1:-}" = "--dir" ] && [ -n "${2:-}" ]; then DEST="$2"; fi
  mkdir -p "$DEST"
  rm -rf "$DEST/designed"
  cp -R "$TMP/designed/skills/designed" "$DEST/designed"
  echo "installed $DEST/designed"
fi
