# Plan: Fix Brand Name Inconsistency — "Vital Drops" → "Cruor"

**Finding:** #1 from landing page UI audit
**Current commit:** `846b499`
**Confidence:** High
**Scope:** 2 files, 2 string changes

---

## Problem

The design system comment in `globals.css` and the `HowItWorks` section heading reference "Vital Drops", but the actual product name is "Cruor" — used consistently in `layout.tsx` metadata, `Navbar.tsx` brand text, `Footer.tsx` brand text, and `Hero.tsx` logo alt text. This creates a user-facing contradiction on the landing page.

## Affected surfaces

| File | What changes | Line(s) |
|------|-------------|---------|
| `frontend/src/app/globals.css` | CSS comment only | Line 7 |
| `frontend/src/components/landing/HowItWorks.tsx` | Section heading text | Line ~73 |

## Changes

### 1. `frontend/src/app/globals.css`

**Line 7** — Update the design system comment:

```
- DESIGN SYSTEM — Vital Drops
+ DESIGN SYSTEM — Cruor
```

This is a code comment only. No CSS rules, tokens, or selectors change.

### 2. `frontend/src/components/landing/HowItWorks.tsx`

**Line ~73** — Update the `<h2>` heading text:

```
- How Vital Drops Works
+ How Cruor Works
```

This is a string literal in JSX. No props, tokens, classes, or component structure changes.

## Verification

1. Run `npm run build` (or `next build`) in the `frontend/` directory to confirm no build errors.
2. Visually confirm the landing page heading reads "How Cruor Works" and the CSS comment reads "DESIGN SYSTEM — Cruor".
3. No other files reference "Vital Drops" — a project-wide search for "Vital Drops" should return zero results after this change.

## What does NOT change

- No tokens, CSS variables, or theme values are modified.
- No component props, variants, or styling classes are modified.
- No other files or surfaces are affected.
- The product's visual identity, color system, typography, and layout remain unchanged.
