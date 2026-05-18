# Progress

> Rolling session summaries, newest first.



<!-- session-in-progress:start=2026-05-18T17:15:34.221Z -->
## 2026-05-18 12:34 — Now harness files are in git but Vercel won't serve them _(in progress)_
Now harness files are in git but Vercel won't serve them. One caveat: Vercel Git integration has been flaky about `.vercelignore` historically — if someone can still hit `kbd-bodykits.vercel.app/VISION.md`, switch to CLI deploys (`npx vercel --prod`) which always respect it.
<!-- end-session-in-progress -->
## 2026-05-17 21:13 — **Changed:** `KBD_Homepage.html` (hash links), `KBD_Equipped.html` (hash-based a...
**Changed:** `KBD_Homepage.html` (hash links), `KBD_Equipped.html` (hash-based auto-open)  
**Verified:** Playwright — navigating to `#build=1` opens lightbox with Zenki caption  
**Next:** Refresh Homepage, click a gallery card — should land on Equipped with that build open
## 2026-05-17 09:45 — Full Phase 1-5 execution + KBD image replacement
Completed all priority phases from PRD §9: nav audit & link fixes (7 href="#" → real links, social icon SVGs), cart persistence (Homepage Cart(0) → dynamic, checkout confirmation uses useRef snapshot), console sweep, emoji→SVG across Checkout/Results/Product (🛒✕💳🅿🍎▦☰🔍♡→ inline SVGs), hero overlay contrast (WCAG AA overlay added), @handle verification (all use IGHandle with proper links), Fullerton footer badges on Equipped/Results, announcement bars on Product/Results/Checkout/Equipped. Equipped-print delay already implemented. Replaced all Unsplash CDN images with real KBD product images from kbdbodykits.com via KBD_IMG_MAP across Homepage, Product, Results, and Equipped pages. Fixed 3 Babel parse errors: Homepage .map() missing paren, Product/Results orphan PlaceholderImg zombie code, Results adjacent JSX footer. All 10 pages verified rendering via Playwright (10/10 pass).
