# PLAN — Homepage Category Grid Mobile Reorder

**Goal:** On mobile, show Body Kits at top (full width, prominent), with the other 6 category cards in a 2-column grid below.

## Approach
Add a `data-category-grid` attribute to the category grid container. Target it with a mobile CSS rule that overrides the desktop `2fr 1fr 1fr` layout: first child spans full width, remaining items flow as a 2-column grid. Reset `grid-row` span and `grid-template-rows`. No JS changes needed — CSS-only, surgical.

## Phases

### Phase 1 — Add data attribute + mobile CSS rule
- Add `data-category-grid` attribute to the grid `div` in `CategoryGrid()`
- Add `@media (max-width: 900px)` rule targeting `[data-category-grid]`:
  - `grid-template-columns: 1fr 1fr`
  - `grid-template-rows: auto`
  - First child: `grid-column: 1 / -1`, `grid-row: auto`, `min-height: 260px`
- This overrides the general `[style*="grid-template-columns: 1fr 1"]` rule via specificity and `!important` on the general rule, but the new rule also needs `!important` to beat the inline style

**Files:** `KBD_Homepage.html`

## Acceptance criteria
- [ ] Desktop: layout unchanged (2fr 1fr 1fr, Body Kits spans 3 rows at left)
- [ ] Mobile (≤900px): Body Kits is full-width at top (~260px tall)
- [ ] Mobile: remaining 6 categories form a 2×3 grid below
- [ ] No console errors

## Not in scope
- Other pages' category grids (only Homepage has this component)
- Tablet-specific tweaks
