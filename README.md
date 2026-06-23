# KBD Body Kits — Website Redesign Prototype

> A clickable 10-page HTML/React prototype pitching a modern motorsport storefront to KBD Body Kits — a ~50-year-old polyurethane body kit manufacturer in Fullerton, CA.

---

## What this is

A high-fidelity **pitch artifact** built to win the website redesign contract from Irving, owner of KBD Body Kits. The prototype demonstrates a credible path from their current WordPress/WPBakery site to a modern, drift-forward motorsport storefront — editorial photography, clear differentiators, accessible product browsing, and community integration.

This is **not** a production e-commerce site. No real backend, no payment processing, no user accounts. Production (headless WordPress + Next.js + Stripe) comes after Irving signs.

---

## Why

Irving's current site looks 15 years old and is losing customers to better-presented competitors. His real differentiators:

- **Made in USA** — manufactured in Fullerton, CA
- **Almost 50 years** of polyurethane body kit heritage
- **Limited Lifetime Warranty** — flexible PU that won't crack
- **Real drift-community presence** — Equipped gallery, Will Make It voting program
- **Unique style names** — Kyouki, Zenki, Kouki, VTX, PMZ, Deuce

...are buried or invisible. This prototype brings them front and center.

---

## Pages (10 total)

| Page | What it shows |
|---|---|
| **Homepage** | Hero with editorial photography, USP cards, Equipped gallery teaser, Will Make It CTA |
| **Product** | Single product page with imagery, fitment info, warranty badge, add-to-cart |
| **Results** | Year/Make/Model filtered product grid with visual cards |
| **Checkout** | Multi-step cart review → shipping → payment (simulated) |
| **Equipped** | Community build gallery — real builder cars with tagged KBD parts |
| **Equipped (print)** | Print-optimized version of the gallery |
| **Will Make It** | Community-driven product voting — customers request vehicles, KBD builds winners |
| **About** | Heritage, manufacturing, team, and values |
| **Blog** | Editorial content and build features |
| **Order Status** | Order lookup (simulated) |

---

## Tech approach

Deliberately zero-build for the prototype phase — React 18 + Babel standalone via CDN. All 10 pages are self-contained HTML files with inline JSX. No `node_modules`, no bundler, no TypeScript. This keeps the prototype instantly shareable (open in any browser) and easy to iterate with the client.

| Layer | Approach |
|---|---|
| UI | React 18 + Babel-Standalone (CDN) |
| Styles | Inline CSS / `<style>` blocks — no frameworks |
| State | `useState` / `useEffect` / `useRef` only |
| Cart | `localStorage` — persists across pages |
| Routing | Plain `<a href>` and `window.location.href` |
| Navigation | Shared via `kbd-shell.jsx` (About, Blog, Order Status) |
| Form submissions | Fake success states — no network calls |
| Testing | Playwright |

---

## Project structure

```
kbd-bodykits/
├── KBD_Homepage.html         # Hero, USP cards, community CTAs
├── KBD_Product.html          # Single product page
├── KBD_Results.html          # YMM-filtered grid
├── KBD_Checkout.html         # Multi-step cart → shipping → payment
├── KBD_Equipped.html         # Build gallery
├── KBD_Equipped-print.html   # Print-optimized gallery
├── KBD_Will_Make_It.html     # Community voting
├── KBD_About.html            # Heritage and team
├── KBD_Blog.html             # Editorial
├── KBD_Order_Status.html     # Order lookup
├── kbd-shell.jsx             # Shared Nav + Footer
├── tweaks-panel.jsx          # Design iteration bridge (do not remove)
├── assets/                   # Product photos, logos, builder shots
├── tests/                    # Playwright E2E tests
├── vercel.json               # Vercel deployment config
└── package.json              # Minimal — only Playwright + Vercel Analytics
```

---

## Setup

```bash
# 1. Clone
git clone https://github.com/LabidySabidy/kbd-bodykits.git
cd kbd-bodykits

# 2. Open any .html file in a browser — no build step
# Or serve locally:
npx serve .

# 3. Run Playwright tests
npx playwright test
```

---

## Design constraints

- No build step, no `node_modules` for the app itself
- No external CSS frameworks (Tailwind, Bootstrap)
- No state management libraries
- No TypeScript — plain JSX
- Color palette and typography locked per PRD §5
- `tweaks-panel.jsx` must stay intact (Claude Design bridge)
- 375px minimum width — no horizontal scroll

---

## Deploy

```bash
# Vercel (configured via vercel.json)
vercel deploy --prod
```

---

## Success criteria

- Irving says yes to the redesign contract
- All 10 pages open without console errors at 375px+
- Every nav link resolves
- Cart persists across pages
- Every form submits to a visible success state
- No `{{TOKEN}}` placeholders or fake reviewer names visible

---

## Production path (post-contract)

Headless WordPress + Next.js + Stripe. The prototype establishes visual direction, information architecture, and interaction patterns. Production rebuilds on a real stack.

---

## Author

Pitch prototype by **Kasim Alam** for KBD Body Kits.

---

## License

Proprietary — pitch artifact for KBD Body Kits. Not for redistribution.
