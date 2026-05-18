# Plan — Prototype Stabilization (v1.2 → Pitch-Ready)

## Goal
Get the prototype pitch-ready by closing all Priority 1–3 defects from PRD §9 and verifying against the §10 definition of done.

## Approach
Work priority-ordered: audit and fix demo-critical bugs first (broken links, console errors, cart breakage), then mobile responsive pass, then polish (emoji→SVG, contrast, badges). Each phase produces a shippable increment — the prototype must open without errors at every checkpoint.

## Phases

1. **Audit & baseline** — click-through every nav link across all 10 pages, verify cart persistence, sweep console for errors. Fix anything broken. Output: a confirmed-clean link graph and cart flow.
2. **Mobile responsive pass** — test and fix layout at 375px, 414px, 768px viewports. Smushed grids, overflow, untappable tap targets. Output: all 10 pages render without horizontal overflow at 375px.
3. **Iconography & contrast** — replace any remaining emoji or low-effort icons with inline SVGs. Strengthen hero overlay to WCAG AA. Verify all Equipped @handle links. Output: zero emoji in UI, hero headlines pass contrast check.
4. **Footer badge & announcement bar** — add "Made in Fullerton, CA" footer badge to every page missing it. Add global rotating announcement bar to every page missing it. Output: badge + bar present on all 10 pages.
5. **Equipped-print delay** — add 3-second delay + "Cancel print / Print Now" banner to Equipped-print page. Output: print dialog does not fire immediately on page load.
6. **Priority 4 enhancements** (optional, time-permitting) — real review submission UX on Product page, "Past Crowd-Funded Wins" on Will Make It, Nav standardization onto kbd-shell.jsx where safe.

## Files that will change

| File | Change | Phase |
|---|---|---|
| `KBD_Homepage.html` | Hero overlay contrast, announcement bar, mobile fixes, footer badge | 2, 3, 4 |
| `KBD_Results.html` | Mobile fixes, announcement bar, footer badge | 2, 4 |
| `KBD_Product.html` | Mobile fixes, announcement bar, footer badge | 2, 4 |
| `KBD_Equipped.html` | @handle link audit, mobile fixes, announcement bar, footer badge | 2, 3, 4 |
| `KBD_Equipped-print.html` | Print delay + cancel banner, mobile fixes, announcement bar, footer badge | 2, 4, 5 |
| `KBD_Will_Make_It.html` | Mobile fixes, announcement bar, footer badge | 2, 4 |
| `KBD_Checkout.html` | Mobile fixes, announcement bar, footer badge | 2, 4 |
| `KBD_About.html` | Mobile fixes, announcement bar, footer badge | 2, 4 |
| `KBD_Blog.html` | Mobile fixes, announcement bar, footer badge | 2, 4 |
| `KBD_Order_Status.html` | Mobile fixes, announcement bar, footer badge | 2, 4 |
| `kbd-shell.jsx` | Possible Nav standardization (Phase 6 only) | 6 |

## Acceptance criteria

- [ ] All 10 HTML files open in a browser without console errors
- [ ] Every nav link resolves to a real page (no `href="#"` in primary nav)
- [ ] Cart persists across pages via localStorage
- [ ] Every form submission resolves to a visible success state
- [ ] Page renders correctly at 375px wide (no horizontal overflow)
- [ ] No emoji visible in UI elements
- [ ] No `{{TOKEN}}` placeholders visible to the user
- [ ] No fake reviewer names anywhere
- [ ] All `@handle` references on Equipped link to Instagram
- [ ] Limited Lifetime Warranty wording is consistent
- [ ] "Made in Fullerton, CA" footer badge on all 10 pages
- [ ] Global announcement bar on all 10 pages
- [ ] Equipped-print shows delay banner before print dialog
- [ ] Hero headline meets WCAG AA contrast on Homepage

## Not in scope

- Production build (headless WordPress + Next.js + Stripe)
- Admin pages, dealer portal, gift cards, FAQ system
- Real backend / API / payment processing
- SEO metadata beyond `<title>` tags
- Priority 4 Nav standardization unless explicitly approved mid-phase
- Replacing or restyling the KBD logo

## Open questions

- None — PRD §9 is explicit and the technical constraint set is locked.

## References

- `PRD.md` §9 (known issues / open work), §10 (definition of done), §8 (technical constraints)
