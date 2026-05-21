# Plan — Cross-Page Header Standardization + Mobile Fixes

> Standardize cart/hamburger layout across all pages, fix Blog/Order-Status mobile, fix About hero clipping.

## Goal
Every page with a nav bar has: Cart icon at far right, hamburger just to its left. All pages with unique grid layouts get mobile collapse. No horizontal overflow or clipped text at 375px.

## Approach
Four independent work streams, all mechanical (copy established patterns). Header fix is a one-line inline style addition (`marginLeft:'auto'`) to 4 pages missing it. Blog and Order-Status get the same enhanced MutationObserver pattern T-015 established for About. About hero gets font-size reduction + padding reduction in the existing MO. Tests added for all new behavior.

## Files that will change

| File | Change | Stream |
|---|---|---|
| `KBD_Homepage.html` | Add `marginLeft:'auto'` to hamburger button style | A — Header |
| `KBD_Product.html` | Add `marginLeft:'auto'` to hamburger button style | A — Header |
| `KBD_Equipped.html` | Add `marginLeft:'auto'` to hamburger button style | A — Header |
| `KBD_Equipped-print.html` | Add `marginLeft:'auto'` to hamburger button style | A — Header |
| `KBD_About.html` | Reduce hero h1 clamp min to 36px, reduce vertical padding; add to existing MO | B — About hero |
| `KBD_Blog.html` | Replace old MO with enhanced MO (nav + grid collapse); add content-width test | C — Blog mobile |
| `KBD_Order_Status.html` | Replace old MO with enhanced MO (nav + grid collapse); add content-width test | D — Order-Status mobile |
| `tests/mobile.spec.mjs` | Add Blog/Order-Status layout tests, header hamburger position test, About hero width test | All |

## Phases (execution order)

### Stream A — Header standardization (mechanical, 4 pages)
1. Add `marginLeft:'auto'` to hamburger inline style in Homepage, Product, Equipped, Equipped-print
2. Add Playwright test: hamburger is to the left of Cart on all PAGES_WITH_NAV

### Stream B — About hero clipping
1. In existing MO: also reduce h1 font-size and hero section padding at ≤640px
2. Add Playwright test: no heading width exceeds viewport width

### Stream C — Blog mobile
1. Replace old MO with enhanced MO collapsing: `1.4fr 1fr`→`1fr`, `1fr 240px`→`1fr`, `200px 1fr`→`1fr`
2. Remove duplicated @media blocks from `<style>`
3. Add Playwright tests: grid collapse + content readable

### Stream D — Order Status mobile
1. Replace old MO with enhanced MO collapsing: `1fr 320px`→`1fr`, `1fr 1fr auto`→`1fr`
2. Remove duplicated @media blocks from `<style>`
3. Add Playwright tests: grid collapse + content readable

### Final — Gate
- Run full `npx playwright test --reporter=line`
- Commit + push all changes

## Acceptance criteria
- [ ] Homepage hamburger has `marginLeft:'auto'` (flush right, Cart to its right)
- [ ] Product hamburger has `marginLeft:'auto'`
- [ ] Equipped hamburger has `marginLeft:'auto'`
- [ ] Equipped-print hamburger has `marginLeft:'auto'`
- [ ] About hero h1 fits within viewport at 375px (no clipped text)
- [ ] Blog featured article grid collapses to 1 column at 375px
- [ ] Blog post layout (1fr 240px) collapses to 1 column at 375px
- [ ] Blog related article cards (200px 1fr) collapse to 1 column at 375px
- [ ] Order Status main layout (1fr 320px) collapses to 1 column at 375px
- [ ] Order Status form row (1fr 1fr auto) collapses to 1 column at 375px
- [ ] All PAGES_WITH_NAV: hamburger visible, nav-links hidden on mobile
- [ ] No pages broken, 0 console errors
- [ ] All Playwright tests pass

## Not in scope
- Checkout page — it has a minimal checkout Nav with no hamburger; it's a flow, not a browse page
- Full CSS dedup on all pages (Blog/Order-Status only; others have pre-existing dupes tracked separately)
- Desktop layout changes — all changes are mobile-only (≤640px)
