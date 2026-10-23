# designed

This repository is the `designed` agent skill. The skill itself is `skills/designed/SKILL.md` with references in `skills/designed/references/`.

Rules for changes in this repo:
- No emojis and no em dashes in any file. CI fails on them (`npm run lint`).
- Keep SKILL.md under 200 lines; put detail in references.
- Scripts are zero dependency Node. Run `npm test` before committing.
