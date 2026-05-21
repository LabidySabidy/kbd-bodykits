# Plan — Mobile Polish: Header, Cart, About Hero, Track Order, Dropdown

> Fix 6 mobile issues across the prototype: header spacing, hero stats clipping, cart mobile, Track Order relocation, dropdown positioning.

## Goal
All pages have Cart flush-right with hamburger adjacent-left, Track Order lives in hamburger dropdown only, hamburger dropdown opens cleanly below nav bar, About hero stats fit without clipping, Cart page is mobile-usable.

## Issues

### 1. Homepage header spacing
**Root cause:** Cart + hamburger sit inside a right-actions wrapper `div` with `gap:'12px'` adding extra padding. On mobile the nav padding is 12px but the wrapper gap adds more. Other pages have Track Order/Cart/hamburger as direct children of the nav flex container — no extra wrapper.
**Fix:** Remove the right-actions wrapper on Homepage, place children directly in nav flex container (same structure as all other pages).

### 2. About hero stats row clipping
**Root cause:** The MO selector `[style*="gap: 40px"]` matches the first editorial article (which also has `gap:'40px'`), not the hero stats row. The wrap/reduce-gap never fires. Also the stat values at `fontSize:'52px'` are too large for mobile even when wrapped.
**Fix:** Replace with data-attribute targeting. Reduce stat font-size on mobile in the MO.

### 3. Cart page mobile
**Root cause:** Checkout has no responsive rules — form grid, cart items, step bar, and security badges all overflow on 375px. The nav has 4 security badges in a row that don't collapse. The Order Summary sidebar doesn't stack. No hamburger (by design — it's a flow page).
**Fix:** Add page-specific MO collapsing main layout grid (`1fr 320px`?), security badges to wrap, cart items to stack. Keep nav minimal (no hamburger needed on checkout flow).

### 4. Track Order → hamburger
**Root cause:** Track Order is a visible icon+label in the nav on all pages. User wants it only in the hamburger dropdown.
**Fix:** Remove Track Order `<a>` from nav on all pages. Add `['KBD_Order_Status.html','Track Order']` to each hamburger dropdown menu. Affects: Homepage, Results, Product, Equipped, Will_Make_It, kbd-shell.jsx (About/Blog/Order-Status).

### 5. Hamburger dropdown positioning
**Root cause:** On Homepage, the dropdown is rendered inside the right-actions wrapper div, making `position:absolute, top:64px` relative to the wrapper (which is already 64px down inside the nav). It opens 128px from the nav top — midway through the header.
**Fix:** Move dropdown to be a direct child of `<nav>` (same position as all other pages).

### 6. Equipped-print — untested
**Root cause:** Not in PAGES_WITH_NAV, not in PAGES_WITHOUT_NAV with proper tests. Has its own inline nav with hardcoded hamburger CSS that may not work.
**Fix:** Verify its current state, add to test coverage if applicable.

## Files that will change

| File | Change | Issue |
|---|---|---|
| `KBD_Homepage.html` | Remove right-actions wrapper, move dropdown outside it, remove Track Order, add to hamburger items | 1, 4, 5 |
| `KBD_Results.html` | Remove Track Order link, add to hamburger dropdown | 4 |
| `KBD_Product.html` | Remove Track Order link, add to hamburger dropdown | 4 |
| `KBD_Equipped.html` | Remove Track Order link, add to hamburger dropdown | 4 |
| `KBD_Will_Make_It.html` | Remove Track Order link, add to hamburger dropdown | 4 |
| `kbd-shell.jsx` | Remove Track Order link, add to hamburger dropdown | 4 |
| `KBD_About.html` | Fix hero stats MO selector, reduce stat font-size on mobile | 2 |
| `KBD_Checkout.html` | Add mobile MO, collapse layouts, wrap security badges | 3 |
| `tests/mobile.spec.mjs` | Add Checkout mobile tests, update hamburger tests for Track Order removal, add About stats test | All |

## Phases

### Phase 1 — Track Order → hamburger (6 files, mechanical)
- Remove `<a href="KBD_Order_Status.html">...Track Order</a>` from nav in all inline navs + kbd-shell.jsx
- Add `['KBD_Order_Status.html','Track Order']` to each hamburger dropdown items array
- Update any MO that references `nav-desktop-only` Track Order elements (they'll be removed)

### Phase 2 — Homepage header restructure
- Remove right-actions wrapper div, flatten children into nav flex container
- Move dropdown {menuOpen && ...} to be direct child of `<nav>`
- Ensure hamburger + Cart are the last two children

### Phase 3 — Cart page mobile
- Add MO collapsing checkout layouts + security badges wrapping
- TBD after deeper code read

### Phase 4 — About hero stats fix
- Fix MO to target hero stats row specifically (use parent section selector)
- Reduce stat font-size to `clamp(24px,5vw,52px)` in MO

### Phase 5 — Tests + gate
- Update hamburger dropdown tests to include "Track Order" item
- Add Checkout mobile content-width test
- Add About hero stats no-clip test
- Run full Playwright suite

## Acceptance criteria
- [ ] Track Order absent from visible nav on all 7 pages (Homepage/Results/Product/Equipped/Will_Make_It/About/Blog)
- [ ] "Track Order" present in hamburger dropdown on all 7 pages
- [ ] Homepage Cart + hamburger flush right (no extra spacing)
- [ ] Homepage dropdown opens directly below nav bar
- [ ] About hero stats row wraps and fits within viewport at 375px
- [ ] Cart page no horizontal overflow at 375px
- [ ] Cart page content readable widths at 375px
- [ ] 0 Playwright failures, 0 console errors

## Not in scope
- Order Status page already uses the shell; its Track Order link is in-content, not nav
- Checkout hamburger (by design — checkout flow should be distraction-free)
- Equipped-print — has no hamburger nor nav links; add basic test coverage only
- Full Equipped-print mobile overhaul
