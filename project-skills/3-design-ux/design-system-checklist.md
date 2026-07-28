# Design System Starter Checklist

> **How to use:** Work through this before building the second screen — that's when inconsistency starts. You don't need a full design system; you need *tokens and decisions written down* so every screen pulls from the same small set.

## Color

- [ ] Define a palette as named tokens, not hex values sprinkled in code:
  - `primary` (+ hover/pressed variant)
  - `secondary` / `accent`
  - `background` and `surface`
  - `text-primary`, `text-secondary`, `text-disabled`
  - Semantic: `success`, `warning`, `error`, `info`
- [ ] Every text/background pair passes WCAG AA contrast (4.5:1 normal text, 3:1 large) — check with a contrast tool
- [ ] Dark mode: decided (supported now / later / never) and tokens structured to allow it
- [ ] Rule: no raw hex codes in components — tokens only

## Typography

- [ ] Font family chosen ([1] primary, max 2 total) with fallback stack
- [ ] Type scale defined (pick ~5-6 sizes, e.g. 12 / 14 / 16 / 20 / 24 / 32) with named roles: caption, body, subtitle, title, headline
- [ ] Line heights set per size (≈1.4-1.6 for body text)
- [ ] Weights limited (regular, medium, bold — not seven)
- [ ] Minimum body size decided ([16]px web, [14-16]sp mobile — young readers/accessibility may need larger)

## Spacing & layout

- [ ] Spacing scale on a base unit (4 or 8px): 4 / 8 / 12 / 16 / 24 / 32 / 48 — no arbitrary values
- [ ] Corner radius scale (e.g. 4 / 8 / 16 / full) chosen and reused
- [ ] Standard screen padding / max content width defined
- [ ] Breakpoints defined (web) or size classes handled (mobile)
- [ ] Elevation/shadow levels defined (e.g. none / card / modal)

## Core components

> Build these once, reuse everywhere. Each needs: default, hover/pressed, disabled, and (where relevant) error state.

- [ ] Button (primary, secondary, destructive; loading state)
- [ ] Text input (label, placeholder, error message, disabled)
- [ ] Card / list item
- [ ] Modal / dialog / bottom sheet
- [ ] Toast / snackbar for feedback
- [ ] Loading indicator (spinner + skeleton pattern chosen)
- [ ] Empty-state pattern (illustration/icon + message + action)

## Icons & imagery

- [ ] One icon library chosen ([Lucide / Material Symbols / Heroicons / SF Symbols]) — no mixing sets
- [ ] Icon sizes standardized (e.g. 16 / 20 / 24)
- [ ] Icons always paired with labels or `aria-label`s — never meaning by icon alone
- [ ] Image style rules (photography vs. illustration, corner radius, aspect ratios)

## Consistency guardrails

- [ ] Tokens live in one file (`theme.ts` / `tokens.xml` / CSS variables) — single source of truth
- [ ] A "kitchen sink" screen/storybook page shows every component in every state
- [ ] Rule of thumb: before styling anything new, check if a token/component already exists
