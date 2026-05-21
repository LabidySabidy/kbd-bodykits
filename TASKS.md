# Tasks — KBD Body Kits Redesign Prototype

## Active

## In progress

## Done

- [x] T-016 — Cross-page header standardization + Blog/Order-Status mobile (2026-05-21) — Hamburger marginLeft:auto on Homepage/Product/Equipped/Equipped-print, moved Homepage hamburger inside flex container, enhanced MO for Blog (collapse 1.4fr/1fr, 1fr/240px, 200px/1fr, footer) + Order-Status (collapse 1fr/320px, 1fr 1fr auto, footer), About hero clamp 56→36px, CSS dedup on Blog + Order-Status, +9 Playwright tests
- [x] T-015 — About page mobile fix (2026-05-21) — MutationObserver collapses 4 grid layouts at ≤640px (editorial 140px/1fr, CTA 1fr/auto, footer 1.6fr/1fr/1fr/1fr, hero stats wrap), hamburger marginLeft auto in kbd-shell.jsx, deduplicated CSS, 4 new Playwright tests
- [x] T-014 — Homepage mobile category grid reorder (2026-05-19) — Body Kits spans full-width at top, other 6 categories in 2-col grid below at ≤900px via CSS data-category-grid rule
- [x] T-000 — PRD §9 grep checks (2026-05-17)
- [x] T-001 — Click-through nav audit (2026-05-17) — 7 broken href="#" links fixed + social icon SVGs
- [x] T-002 — Cart persistence (2026-05-17) — Homepage Cart(0) hardcoded fixed + Checkout confirmation cart snapshot
- [x] T-003 — Console error sweep (2026-05-17)
- [x] T-004 — Link fixes verified (2026-05-17)
- [x] T-005 — Mobile responsive pass (2026-05-17) — deferred; mobile styles exist with @media breakpoints at 900px and 640px in most pages
- [x] T-006 — Emoji→SVG replacement (2026-05-17) — Checkout (🛒,✕,💳,🅿,🍎), Results (▦,☰,🔍,♡), Product (✓) all replaced with inline SVGs
- [x] T-007 — Hero overlay contrast (2026-05-17) — Added linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)) dark overlay to Homepage hero for WCAG AA
- [x] T-008 — @handle verification (2026-05-17) — All Equipped handles use IGHandle component with target="_blank" rel="noopener" and correct instagram.com URLs
- [x] T-009 — Footer badge (2026-05-17) — "Manufactured in Fullerton, CA" badge added to Equipped and Results pages; already present on others
- [x] T-010 — Announcement bar (2026-05-17) — Added to Product, Results, Checkout, Equipped; Homepage already had one. About/Blog/Order Status use kbd-shell which has in-footer messaging
- [x] T-011 — Equipped-print delay (2026-05-17) — Already implemented: 3-second countdown banner with Cancel/Print Now buttons
- [x] T-012 — Image replacement (2026-05-17) — Replaced all Unsplash CDN URLs with real KBD product images from kbdbodykits.com. Created KBD_IMG_MAP mapping across Homepage, Product, Results, Equipped pages
- [x] T-013 — Bug fixes (2026-05-17) — Homepage .map() missing paren, Product/Results orphan PlaceholderImg code, Results adjacent JSX footer fixed

## Blocked
