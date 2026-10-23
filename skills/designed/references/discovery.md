# Discovery

Design starts with the product, not with colors. Finish this before any visual decision.

## 1. Read before asking

Look at what already exists so you only ask what you cannot find:

| Source | What it tells you |
|---|---|
| README, docs, landing copy | What the product is, who it is for, tone of voice |
| package.json, Podfile, build.gradle, pubspec.yaml | Platforms and stack |
| Routes, screens, navigation files | Scope, main flows, how many screens |
| Data models, API schemas | Real content: names, numbers, lengths, density |
| Existing CSS, theme files, assets | Current brand, if any (consider `/designed audit`) |
| Issues, TODOs, user feedback | Pain points |

For a large codebase, `graphify` (if installed) maps screens and flows quickly.

## 2. Ask what is still unknown

Ask in one message, grouped, only the questions you could not answer. Offer sensible defaults so the user can just confirm.

**Product**
- In one sentence, what does it do and for whom?
- What is the one job a user must be able to do in under a minute?
- What does success look like for a user after their first session?

**People**
- Who are the main users? Age range, expertise, how often they use it, where (desk, on the move, one hand, outdoors)?
- Any accessibility needs known up front (low vision, older users, motor limits)?

**Platforms**
- Which platforms first: web, iOS, Android, desktop, all? Native or cross-platform?
- Phone, tablet, desktop, TV, watch?

**Feel**
- Three words for how it should feel (e.g. calm, precise, warm).
- Three words for how it must not feel.
- Products they admire, in or out of their industry, and why.

**Content and constraints**
- Existing brand: logo, colors, fonts that must stay?
- Languages and regions, any right-to-left?
- Deadlines, compliance (finance, health, kids), performance limits, dark mode required?

## 3. Competitor research

When web search is available, look at 3 to 5 competitors or close analogues. For each, note:
- Conventions users will expect (navigation, terms, key screen layout)
- What they do well
- Where they all look the same, which is where this product can differ

Keep it to a short table in the brief. Match expectations on structure, differ on character.

## 4. Brief template

Write this, show it to the user, and get a yes before step 2.

```
# Design brief: <product>

Product: <one sentence>
Core job: <the one task>
Users: <who, context of use, expertise>
Platforms: <list, first one first>
Feel: <3 words> / not: <3 words>
References: <products admired and why>
Existing brand: <keep / evolve / none>
Content: <real examples of data, longest names, typical numbers>
Constraints: <languages, RTL, compliance, dark mode, performance>
Competitors: <table: name | expected conventions | gap to own>
Preset: <industry preset used as starting point, if any>
Mode: <unified or flavor, with one line why>
Signature detail: <the one memorable thing this design will own>
```

## 5. From brief to decisions

| If the brief says | Lean toward |
|---|---|
| Dense data, pro users, long sessions | Carbon density, productive type, tables over cards, 4px grid steps |
| Consumer iOS-first | Apple flavor, large titles, SF Pro system font, sheets, haptics |
| Android-first or Google ecosystem | Material 3 flavor, dynamic color option, FAB only if one primary action |
| One-handed phone use, large phones | One UI reachability: content in top half, actions in bottom half, bottom sheets |
| Windows app or Microsoft 365 users | Fluent 2 flavor, Mica backgrounds, Segoe UI Variable, compact density |
| Merchant or admin back office | Polaris patterns: index tables, resource pages, clear primary action per page |
| Team collaboration, issue tracking | Atlassian patterns: lozenges, inline edit, side panels |
| Developer tool, technical audience | Modern web flavor: dark first, mono accents, keyboard shortcuts, command menu |
| Kids, education | Large targets, rounded type, high contrast, no dark patterns |
| Older audience | Larger base type (18px), stronger contrast, fewer gestures, labels on icons |
| Outdoor or glare | High contrast light theme, heavier weights |
| Trust critical (money, health) | Restrained palette, plain language, visible confirmation and undo |

The brief wins over any preset or flavor default.
