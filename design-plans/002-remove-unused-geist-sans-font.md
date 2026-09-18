# Plan: Remove Unused Geist Sans Font Loading

**Finding:** #2 from landing page UI audit
**Current commit:** `846b499`
**Confidence:** Medium
**Scope:** 1 file, ~3 line changes

---

## Problem

`layout.tsx` loads the `Geist` font via `next/font/google` and assigns it to the CSS variable `--font-geist-sans`, applying the class to `<html>`. However, the design system in `globals.css` declares `--font-sans: "Poppins"` as the sole sans-serif font token, and all components use `font-sans` (resolved to Poppins). The `--font-geist-sans` variable is never referenced by any design token, CSS rule, or component class. This is dead code that adds an unnecessary network request.

## Affected surfaces

| File | What changes | Line(s) |
|------|-------------|---------|
| `frontend/src/app/layout.tsx` | Remove `Geist` import, `geistSans` variable, and its class from `<html>` | Lines 3, 12–15, 33 |

## Prerequisites

Verify that `--font-geist-sans` is not referenced anywhere in the project:

```bash
grep -r "font-geist-sans\|font-geist" frontend/src/ --include="*.css" --include="*.tsx" --include="*.ts"
```

Expected: only `layout.tsx` references it (the assignment itself). No other file uses it.

## Changes

### 1. `frontend/src/app/layout.tsx`

**Step A — Remove the `Geist` import (line 3):**

```diff
- import { Geist, Geist_Mono, Poppins } from "next/font/google";
+ import { Geist_Mono, Poppins } from "next/font/google";
```

**Step B — Remove the `geistSans` font definition (lines 12–15):**

```diff
- const geistSans = Geist({
-   variable: "--font-geist-sans",
-   subsets: ["latin"],
- });
-
  const geistMono = Geist_Mono({
```

Keep the `geistMono` definition — it provides `--font-mono` which IS referenced by the design system (`globals.css` `@theme inline`: `--font-mono: "Geist Mono"`).

**Step C — Remove `geistSans.variable` from the `<html>` class list (line ~33):**

```diff
  className={cn(
    "h-full",
    "antialiased",
-   geistSans.variable,
    geistMono.variable,
    "font-sans",
    poppins.variable,
  )}
```

## Verification

1. Run `npm run build` (or `next build`) in the `frontend/` directory to confirm no build errors.
2. Run `grep -r "font-geist-sans" frontend/src/` — should return zero results.
3. The landing page should render identically: Poppins remains the active font via `--font-sans`.

## What does NOT change

- `Geist_Mono` import and `--font-mono` variable are preserved (they are used by the design system).
- `Poppins` import and `--font-sans` variable are preserved (they are the primary font).
- No tokens, CSS variables, or theme values in `globals.css` are modified.
- No component props, variants, or styling classes are modified.
- The product's visual identity, typography, and layout remain unchanged.
