# Progress

> Rolling session summaries, newest first.







<!-- session-in-progress:start=2026-05-21T20:41:46.027Z -->
## 2026-05-21 15:48 — Done _(in progress)_
Done. `2ac4885` on `main`.

**Changed:** 7 Nav components + kbd-shell.jsx — added `useEffect` with document-level `click`/`touchstart` handlers that close the hamburger dropdown when tapping outside. Results page got a second handler for the YMM vehicle selector dropdown.

**Verified:** 52/52 Playwright tests pass. No regressions.

**Next:** Nothing pending.
<!-- end-session-in-progress -->
## 2026-05-21 15:41 — ## Step 2 — Summarize

```
Observed: On mobile, when the vehicle selector dropdo...
## Step 2 — Summarize

```
Observed: On mobile, when the vehicle selector dropdown is open (the "Viewing: Year Make Model" pill on Results page), tapping outside the dropdown does nothing. You must tap the dropdown toggle button again or the "Update Vehicle" button to close it.
Expected: Tapping anywhere outside the dropdown closes it.
Reproduction: Open KBD_Results.html at 375px, click "Viewing:" pill to open dropdown, then tap elsewhere on page.
Environment: Mobile viewport, all browsers
Se...
## 2026-05-21 14:28 — **Next:** Nothing in queue
**Next:** Nothing in queue. All pages have nav + mobile MOs. Only Equipped-print lacks full mobile testing (no nav, different concerns).
## 2026-05-21 14:11 — Plan written
Plan written. Grill trigger fires (9 files), but every change is mechanical — the Track Order removal + hamburger addition is identical across 6 files, and the other fixes follow established patterns.

**Summary of what changes where:**

| What | Pages | Action |
|---|---|---|
| **Track Order → hamburger** | Homepage, Results, Product, Equipped, Will_Make_It, kbd-shell.jsx (3) | Remove icon+label from nav, add `['KBD_Order_Status.html','Track Order']` to dropdown |
| **Homepage header restruc...
## 2026-05-21 14:00 — All tasks in TASKS.md are done
All tasks in TASKS.md are done. The remaining known issues from STANDARDS.md are:

- **Horizontal overflow** on some pages at 375px — pre-existing, tracked separately
- **Hamburger missing on Checkout/Equipped-print** — by design (no nav on those pages)

No remaining planned work. Want me to tackle horizontal overflow? Or is there another feature/page you have in mind?
## 2026-05-21 13:51 — Done
Done. Here's the recap:

---

**Changed:** 7 HTML pages + test file. Header standardization on 4 pages (hamburger `marginLeft:'auto'`, Homepage hamburger moved inside flex container). Enhanced MO for Blog (collapse 3 grids + footer) and Order-Status (collapse 2 grids + footer). About hero h1 clamp 56→36px. CSS dedup on Blog + Order-Status. 9 new Playwright tests including hamburger-left-of-cart on all 8 nav pages.

**Verified:** 52/52 Playwright tests pass. All 8 pages with nav have Cart far ...
## 2026-05-21 13:20 — Cross-page header standardization + Blog/Order-Status mobile — T-016
**Changed:** 7 HTML pages + test file. Added `marginLeft:'auto'` to hamburger on Homepage/Product/Equipped/Equipped-print; moved Homepage hamburger inside nav flex container (was outside causing wrong position). Enhanced MO for Blog (collapse `1.4fr 1fr`, `1fr 240px`, `200px 1fr`, footer) and Order-Status (collapse `1fr 320px`, `1fr 1fr auto`, footer). Reduced About hero h1 clamp min 56→36px + padding. Deduplicated CSS on Blog + Order-Status. Moved Blog + Order-Status to PAGES_WITH_NAV. Added 9 Playwright tests (hamburger-left-of-cart ×8 pages, Blog/OS content width, About hero width).
**Verified:** 52/52 Playwright tests pass — all 8 PAGES_WITH_NAV have hamburger visible left of Cart, all pages console-error-free, no horizontal overflow.
**Next:** Only remaining untested pages: Equipped-print and Checkout (no nav, different concerns).

## 2026-05-21 12:35 — About page mobile fix — T-015
**Changed:** `KBD_About.html` — added MutationObserver JS collapsing editorial articles (140px/1fr→1fr), CTA grid (1fr/auto→1fr), footer grid (1.6fr/1fr/1fr/1fr→1fr), hero stats wrap; removed duplicated @media CSS blocks. `kbd-shell.jsx` — added marginLeft:'auto' to hamburger button. `tests/mobile.spec.mjs` — moved About to PAGES_WITH_NAV, added 4 content-layout tests (grid collapse, content width ≥280px, footer 1-col, CTA 1-col).
**Verified:** 37/37 Playwright tests pass — all pages console-error-free, About hamburger visible/nav hidden, editorial/footer/CTA grids all single column.
**Next:** Blog and Order Status pages share kbd-shell.jsx — same footer-column issue applies to them.

## 2026-05-20 15:44 — Trust bar duplication fix
The rule was inside the first `@media (max-width: 900px)` block the whole time — it was only hiding duplicates on mobile, where we need them FOR the marquee. Restructured: first `@media` now closes before the trust bar CSS, `display: none !important` lives at global scope (desktop), separate `@media` block handles mobile override.
