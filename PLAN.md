# PLAN — Mobile Cross-Page Fixes

**Goal:** Every page renders correctly on mobile (375px+), navigation works via hamburger, and Results page filters move to top.

## Approach
Audit revealed two categories of issues: (1) stale CSS collapse rules on 9 non-homepage files, (2) page-specific layout problems. Fix CSS globally first (single pattern applied to all files), then fix per-page JSX issues. No new dependencies.

## Phases

### Phase 1 — Sync CSS across all 9 non-homepage files
Apply the homepage's updated media query rules to every other page:
- Add `repeat(5,` multi-column collapse
- Add `1.8fr 1fr 1fr 1fr` footer collapse
- Broaden two-column rule from `1fr 1fr` → `1fr 1` (catches `1fr 1.2fr`, etc.)
- Add `h2[style*="nowrap"]` wrap override

**Files:** KBD_About.html, KBD_Blog.html, KBD_Checkout.html, KBD_Equipped.html, KBD_Equipped-print.html, KBD_Order_Status.html, KBD_Product.html, KBD_Results.html, KBD_Will_Make_It.html

### Phase 2 — Hamburger nav on all pages with Nav
Replace current mobile behavior (hide-all-nav-links) with:
- Hamburger icon (☰) visible at ≤640px
- Click toggles a dropdown with all nav links
- Cart icon stays visible alongside hamburger

**Files:** KBD_Checkout.html, KBD_Equipped.html, KBD_Equipped-print.html, KBD_Homepage.html, KBD_Product.html, KBD_Results.html, KBD_Will_Make_It.html

### Phase 3 — Remove Y/M/M labels from Homepage hero
Delete the `<label>` elements above Year/Make/Model selects.

**Files:** KBD_Homepage.html

### Phase 4 — Results page mobile redesign
Change `240px 1fr` sidebar+content grid to stack (filters → results at mobile). Options:
- A: CSS-only — collapse grid to 1 column, sidebar moves above results
- B: JS-driven — accordion/collapsible filter panel at top (more mobile-native)
- Recommend A for simplicity; filters render as a scrollable strip or stacked list above product cards.

**Files:** KBD_Results.html

### Phase 5 — Final audit pass
Spot-check each page at 375px viewport via Playwright for overflow, layout sanity. Log remaining issues as follow-ups.

## Not in scope
- Tablet layout (768-1024px) — mobile-first only
- New visual design — keeping existing aesthetic
- Performance optimization
- Pages without Nav (About, Blog, Order_Status) navigation — they have no Nav component to add hamburger to; separate task TBD

## Acceptance criteria
- [ ] All 10 pages have synchronized CSS collapse rules
- [ ] All pages with Nav show hamburger menu at ≤640px
- [ ] Hamburger opens/closes nav links on tap
- [ ] Homepage hero: no Year/Make/Model labels
- [ ] Results page: filters above product grid at ≤900px
- [ ] Playwright: 0 horizontal overflow failures across all pages at 375px
- [ ] Playwright: 0 side-by-side grid items at 375px
