# Progress

> Rolling session summaries, newest first.



## 2026-05-21 13:26 — All done — T-015 is complete
All done — T-015 is complete.

**What changed:**
- `KBD_About.html` — added MutationObserver that collapses 4 layouts on mobile (editorial `140px 1fr`→`1fr`, CTA `1fr auto`→`1fr`, footer `1.6fr 1fr 1fr 1fr`→`1fr`, hero stats wrap). Removed duplicated `@media` CSS blocks.
- `kbd-shell.jsx` — hamburger now has `marginLeft:'auto'` so it flushes right like other pages.
- `tests/mobile.spec.mjs` — About moved to `PAGES_WITH_NAV` (gets hamburger tests), +4 new content-layout tests.

**Gate:** 37/37...
## 2026-05-21 13:02 — **Next:** Blog and Order Status share kbd-shell.jsx — same footer column issue a...
**Next:** Blog and Order Status share kbd-shell.jsx — same footer column issue applies to them (but their content layouts differ, so each needs its own investigation)
## 2026-05-21 12:35 — About page mobile fix — T-015
**Changed:** `KBD_About.html` — added MutationObserver JS collapsing editorial articles (140px/1fr→1fr), CTA grid (1fr/auto→1fr), footer grid (1.6fr/1fr/1fr/1fr→1fr), hero stats wrap; removed duplicated @media CSS blocks. `kbd-shell.jsx` — added marginLeft:'auto' to hamburger button. `tests/mobile.spec.mjs` — moved About to PAGES_WITH_NAV, added 4 content-layout tests (grid collapse, content width ≥280px, footer 1-col, CTA 1-col).
**Verified:** 37/37 Playwright tests pass — all pages console-error-free, About hamburger visible/nav hidden, editorial/footer/CTA grids all single column.
**Next:** Blog and Order Status pages share kbd-shell.jsx — same footer-column issue applies to them.

## 2026-05-20 15:44 — Trust bar duplication fix
The rule was inside the first `@media (max-width: 900px)` block the whole time — it was only hiding duplicates on mobile, where we need them FOR the marquee. Restructured: first `@media` now closes before the trust bar CSS, `display: none !important` lives at global scope (desktop), separate `@media` block handles mobile override.