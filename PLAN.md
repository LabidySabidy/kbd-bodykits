# Plan — About Page Mobile Fix

> Fix squished content on KBD_About.html at mobile viewport (≤640px).

## Goal
All sections on the About page stack vertically on mobile, content uses full viewport width, no text is forced narrower than ~280px.

## Approach
Add a page-specific MutationObserver JS block (same pattern as Results and Will_Make_It) that collapses the four grid/flex layouts not caught by existing CSS rules: editorial articles (`140px 1fr`), CTA section (`1fr auto`), footer (`1.6fr 1fr 1fr 1fr`), and hero stats row (`display:flex` with no wrap). Clean up duplicated `@media` blocks. Add Playwright tests verifying mobile content width ≥280px for editorial sections.

## Phases

### Phase 1 — Add mobile grid-collapse MutationObserver
- Add JS block (same pattern as Results page) that:
  - Collapses `[style*="140px 1fr"]` → `1fr` on ≤640px
  - Collapses `[style*="1fr auto"]` → `1fr` on ≤640px
  - Collapses `[style*="1.6fr 1fr 1fr 1fr"]` → `1fr` on ≤640px
  - Sets `flexWrap: 'wrap'` and `gap: '16px'` on hero stats row at ≤640px
  - Handles hamburger visibility (already partially present but incomplete)

### Phase 2 — Clean up duplicated CSS
- Remove the duplicated `@media (max-width: 640px)` block from `<style>` — there are two identical copies concatenated
- Remove the duplicated `@media (max-width: 900px)` block and its orphaned fragment
- Verify no loss of CSS coverage

### Phase 3 — Add Playwright tests
- Add `KBD_About.html` to `PAGES_WITH_NAV` list (it has hamburger nav via kbd-shell.jsx + MutationObserver)
- Add test: "editorial content width ≥280px on mobile" — checks each article content column isn't squished
- Add test: "footer columns stack on mobile" — checks footer grid is 1 column
- Add test: "hamburger visible at mobile on About" — since it's now in PAGES_WITH_NAV, gets the standard hamburger tests

## Files that will change

| File | Change | Phase |
|---|---|---|
| `KBD_About.html` | Add MutationObserver JS block; remove duplicated CSS blocks | 1, 2 |
| `kbd-shell.jsx` | Maybe: add `marginLeft: "auto"` to hamburger inline style so it flushes right | 1 |
| `tests/mobile.spec.mjs` | Add About-specific content-width tests; move About to PAGES_WITH_NAV | 3 |

## Acceptance criteria
- [ ] Mobile (375px): editorial article content column ≥280px wide (3 instances)
- [ ] Mobile: hero stats row wraps to 2-3 items per row, no squishing
- [ ] Mobile: CTA button stacks below text
- [ ] Mobile: footer columns stack in 1 column
- [ ] Mobile: hamburger visible, nav-links hidden
- [ ] Desktop (1440px): layout visually unchanged
- [ ] 0 Playwright test failures
- [ ] 0 console errors

## Not in scope
- KBD_Blog.html or KBD_Order_Status.html mobile fixes (same shell, different content)
- Footer redesign — just stacking columns
- Fixing the duplicated CSS in other pages (they all have similar issues)

## References
- Results page MutationObserver pattern (bottom of `KBD_Results.html`)
- Will_Make_It MutationObserver pattern (bottom of `KBD_Will_Make_It.html`)
- Investigate-bug analysis from this session — root cause: no page-specific JS handles About's unique grid templates

## Current step
PLAN.md written — awaiting approval before implementation.
