# KBD Body Kits Redesign — PRD (Prototype Phase)

> **Read this first, agent.** This document exists to bring you up to speed on a project that is already in progress. The work has been bouncing between Claude Design (for visual iteration) and Claude (for audit, planning, and patching). I'm handing it to you because Claude credits run out fast and you're cheaper to operate at scale. Your job is to take over the prototype iteration without losing the design coherence or strategic direction that's already been established.
>
> Treat this PRD as truthful context, not as a creative brief asking for your interpretation. Where I want you to make decisions, I'll say so explicitly.

---

## 1. What this project is, in one paragraph

I'm building a clickable HTML/React prototype that pitches a website redesign to **KBD Body Kits**, a ~50-year-old polyurethane body kit manufacturer in Orange County, California. The owner (Irving) is a friend from the DFW drift community. His current website is a dated WordPress + WPBakery build that's hurting his business. I'm proposing a headless WordPress redesign (keeping his existing admin/data layer, swapping the frontend for a modern React/Next.js implementation). The prototype is the pitch artifact — I'll show it to him to win the contract, then build the production version on Path B headless WordPress.

**The prototype is the deliverable for this phase.** Production-build work comes after Irving signs.

---

## 2. Who this is for (per scaffold skill discovery)

**Customer (pre-answered, don't re-ask):**
- **Primary**: Irving, owner of KBD Body Kits. NY-roots, CA-based. He needs to see a credible vision of what his business could look like, fast, with enough fidelity that he can imagine showing it to his team and customers.
- **Secondary**: KBD's end customers — drift builders, JDM tuners, Jeep/Mustang owners. Mostly male, mostly 22-45, mostly already in the aftermarket ecosystem. They know what a body kit is, what fitment means, and they recognize KBD's style names (Kyouki, Zenki, VTX, PMZ, etc.).

**Problem (pre-answered):**
- Irving's current site looks 15 years old. It's losing customers to better-presented competitors (Extreme Dimensions/Duraflex). His product catalog is buried behind a clunky Year/Make/Model drilldown. His real differentiators (Made in USA, almost-50-years heritage, real drift-community presence, Limited Lifetime Warranty, real polyurethane that won't crack) are barely visible on his current site.
- The redesign needs to surface those differentiators, modernize the e-commerce flow, and lean into KBD's actual customer base — the drift community — while not alienating the Jeep/Mustang segment.

**Solution shape (pre-answered):**
- A multi-page React/HTML clickable prototype. Each page is a standalone HTML file with inline React (via Babel-standalone CDN) that opens in a browser. Cart state persists across pages via localStorage. No backend, no API, no database. Submissions resolve to fake success states.
- Production target (out of scope for this phase but informs decisions): headless WordPress + Next.js + Stripe.

**Core functionality (pre-answered):**
- See §6 for the page inventory and §7 for what's in/out of scope for the prototype.

**Constraints (pre-answered):**
- See §8 for the technical constraints (file structure, libraries, prohibited patterns).

---

## 3. Strategic positioning — DO NOT DRIFT FROM THIS

Two things to internalize before you touch anything:

**3.1 Drift-forward but inclusive.**
The hero, KBD Equipped community gallery, and primary imagery lean drift. The Jeep/Mustang/Bronco audience gets equal-class browsing experience in the Results page and category nav. Don't pigeonhole into drift-only; don't dilute the drift identity either.

**3.2 Aesthetic: Kith / Carhartt WIP / motorsport heritage.**
- Warm off-whites over pure white.
- Condensed display type (Barlow Condensed) + clean sans body (DM Sans). Two fonts. That's the budget. Don't add a third.
- Editorial photography over product-cutout-on-white.
- Vintage motorsport poster influence in number callouts (big condensed digits, small caps labels).
- Generous whitespace. Sharp corners or ≤8px radii. No big consumer-app rounded corners.
- Slight texture/grain in dark sections. Not loud.

If something you're considering wouldn't fit on a Stüssy lookbook or a Formula Drift poster, it doesn't belong here.

---

## 4. Brand bible (factual, do not invent contradictions)

| Field | Value |
|---|---|
| Company | KBD Body Kits |
| Parent entity | American Plastic Technologies |
| Founded | "Almost 50 years" — use this phrasing, never a specific year |
| Manufactured in | Orange County, CA (Fullerton specifically) |
| Material | Flexible polyurethane (PU). Never "urethane" alone. Never "plastic." Fiberglass mentioned only as contrast. |
| Warranty | **Limited Lifetime Warranty** — the word "Limited" is non-negotiable |
| Phone | (877) 399-3794 |
| Instagram | @kbdbodykits |
| Facebook | kbdbodykits |
| TikTok | @kbdbodykits |
| YouTube | @kbdbodykits |

**Key product attributes** (order of marketing importance):
1. Virtually indestructible — won't crack on impact, PU flexes back
2. OEM-quality fitment — injection-molded, test-fitted to real cars
3. Made in the USA — full in-house manufacturing
4. Limited Lifetime Warranty
5. Community-driven product development (Will Make It program)

**Brand voice:** direct, technical, builder-to-builder. Treats the reader as someone who knows what they're doing. Proud of manufacturing, proud of American-made, proud of the community. Never flowery. Never "our amazing products." Never "shop now and save."

---

## 5. Color palette and typography (locked)

```css
--red: #CC0000;       /* primary KBD red */
--white: #FFFFFF;     /* product pages, results pages */
--black: #0C0C0C;     /* hero, nav, footer */
--cream: #F5F2EC;     /* warm off-white section backgrounds */
--concrete: #1A1A1A;  /* dark surface cards */
--steel: #2A2825;     /* body text on light */
--ash: #7A7570;       /* muted secondary text */
--fog: #E8E6E2;       /* light gray borders */
--rust: #8B2C1C;      /* deep oxidized red — hover/secondary ONLY */
```

**Typography:**
- Display: Barlow Condensed (900 weight for headlines, italic for emphasis)
- Body: DM Sans (400/500/600)

**Rules:**
- Do not introduce a new color outside the palette without explicit approval
- Do not introduce a new font
- Do not change `--red` — that's the KBD red, sacred
- Rust accent (`#8B2C1C`) is for hover states and vintage-poster moments only, never primary

---

## 6. File inventory and page purposes

Working directory contains:

| File | Purpose |
|---|---|
| `KBD_Homepage.html` | Hero with YMM (Year/Make/Model) selector, trust bar, category grid, featured products, Why KBD, Show Us Your Ride banner, build gallery, reviews, Will Make It banner, footer |
| `KBD_Results.html` | Product listing with category filters, price/rating sort, side filter panel |
| `KBD_Product.html` | Product detail with gallery, specs, reviews, related products, cross-sell |
| `KBD_Equipped.html` | Community build gallery — real builder Instagram handles, lightbox with parts-tagged-per-build, submission form |
| `KBD_Equipped-print.html` | Print-styled PDF lookbook version of Equipped (auto-prints on load — original creative addition KBD doesn't currently have) |
| `KBD_Will_Make_It.html` | Community vehicle request page with leaderboard ticker, 4-step "how it works," submission form |
| `KBD_Checkout.html` | Cart → Shipping → Payment → Confirmation stepper |
| `KBD_About.html` | "Almost 50 years" heritage story page |
| `KBD_Blog.html` | Blog index with sample posts (drift culture, build guides, material science, KBD news) |
| `KBD_Order_Status.html` | Track order page (form + sample timeline result) |
| `kbd-shell.jsx` | Shared Nav + Footer used by About, Blog, Order Status. Other pages have their own inline Nav/Footer (intentional, do not consolidate without asking) |
| `tweaks-panel.jsx` | **Critical infrastructure** — Claude Design's live-editing UI. Reads `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` blocks from each HTML file. **DO NOT DELETE OR REFACTOR.** Even though you (the agent) can't use it interactively, removing it breaks the file's compatibility with Claude Design if I bring it back into the loop. |
| `assets/kbd-logo.png` | The KBD logo. Don't replace, don't crop, don't restyle. |

---

## 7. Scope — what's in and out for this prototype phase

**In scope (the prototype must demonstrate):**
- Visual fidelity across all 10 pages
- Working navigation between all pages (every link resolves)
- Working YMM selector that affects browse experience
- Working cart with localStorage persistence across pages
- Working filters on Results page
- Working lightbox on Equipped page
- Working tabs/galleries on Product page
- Working stepper on Checkout (forms accept input, "submit" resolves to success state)
- Working form submissions on Will Make It and Equipped (resolve to fake success)
- Mobile responsive at 375px viewport width minimum
- Real builder Instagram handles on Equipped, real KBD product style names everywhere

**Out of scope (do not build, but design as if they exist):**
- Real backend / API / database
- Real payment processing (Stripe integration is for production phase)
- Real user accounts (sign-in is a stub)
- Real product search
- Real order tracking
- Real email submission
- Admin pages
- SEO metadata beyond `<title>` tags
- Analytics
- Internationalization
- Multi-currency

**Explicitly deferred to v1.1+ (the production build, not this prototype):**
- Dealers & Distributors B2B portal
- Gift cards
- Full Unfolding Guide / Paint Prep Guide videos
- Dedicated Polyurethane Material info page
- Full FAQ system
- Review moderation flow
- Account / profile / order history pages

---

## 8. Technical constraints (the agent's rules of engagement)

### 8.1 Stack and patterns

- **No build step.** Each HTML file is self-contained. React 18 + Babel-Standalone loaded via CDN at the top of each file. JSX inline in `<script type="text/babel">` blocks.
- **No npm install, no package.json, no node_modules in this folder.**
- **No external CSS frameworks.** Tailwind classes won't work. Bootstrap won't work. All styling is inline React `style={{...}}` objects or `<style>` blocks at the top of the file.
- **No state management libraries.** `useState`, `useEffect`, and `useRef` are the toolkit. localStorage for cross-page state.
- **No routing libraries.** Plain `<a href="KBD_Foo.html">` and `window.location.href = '...'`.
- **No TypeScript.** Plain JSX.

### 8.2 File hygiene rules

- All inter-page links use underscores: `KBD_Homepage.html`, never `KBD Homepage.html`. (v1 originally had spaces; this is fixed but easy to regress.)
- Every page must keep its `tweaks-panel.jsx` script tag and `TWEAK_DEFAULTS` block if it has one. Do not delete.
- Image references use the Unsplash CDN pattern: `https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w={width}&q={quality}`. Always have a fallback path (`PlaceholderImg` or equivalent) for when an image fails to load.
- The `assets/kbd-logo.png` reference stays as `assets/kbd-logo.png` — relative path.

### 8.3 Icons and emoji

- **No emoji in UI elements.** Use inline SVGs. The patch we just applied removed most of them but watch for regression.
- Stroke-weight 1.5–2px on outline SVGs.
- American flag uses the inline striped circle SVG (see Checkout nav, About page, Product page) — do not substitute the 🇺🇸 emoji.

### 8.4 Things you can change without asking

- Copy refinement on any non-factual text
- Layout polish, spacing, micro-interactions
- Adding new inline SVG icons that match the existing icon system
- Fixing accessibility issues (focus states, aria-labels, contrast)
- Performance improvements (image lazy-loading, debouncing)
- Bug fixes
- Adding mobile responsive breakpoints

### 8.5 Things you must ask before changing

- Adding a new page
- Removing a section or page
- Changing the color palette, typography, or logo treatment
- Changing the YMM selector behavior or vehicle catalog
- Changing the page-by-page nav structure
- Refactoring `kbd-shell.jsx` or `tweaks-panel.jsx`
- Introducing a new library (CDN-loaded or otherwise)
- Changing any factual content in §4 (brand bible)
- Replacing the KBD logo or restyling it

### 8.6 Things you must never do

- Use the word "Duraflex" anywhere. It's a competing brand (Extreme Dimensions). Never reference, never compare, never mention.
- Invent KBD product names. The style names are real: Kyouki, Zenki, Kouki, VTX, N-1, PMZ, Deuce, Stalker, V-Speed, Cobra-R, 2Fordy, Bsport, GP1, BN, Premier Series. See §11.
- Invent customer names. Use real Instagram handles from §12.
- Claim a specific founding year. "Almost 50 years" is the phrasing.
- Say "Lifetime Warranty" without "Limited" prefix.
- Reproduce song lyrics, copyrighted text, or other people's branded content in copy.

---

## 9. Known issues / open work (what to do next)

The prototype is at **v1.2** — a Claude Code patch was just applied to fix Claude Design's incomplete v1.1. Remaining known issues, in priority order:

**Priority 1 — Demo-critical**
1. Verify the v1.2 patch landed cleanly. Run:
   ```bash
   grep -nE "photoId\s*:\s*null" *.html
   grep -nE "\{\{[A-Z_]+\}\}" *.html
   grep -nE "(Marcus T\.|Derek S\.|Priya M\.)" *.html
   ```
   All three should return zero matches. If any return matches, fix them per the v1.2 patch document.

2. Open each HTML file in a browser, click through every nav link, verify no 404s and no console errors. Document any issues found.

3. Verify cart persistence works: add an item on Product page, navigate to Homepage, navigate to Checkout — cart should survive. Document failures.

**Priority 2 — Polish before pitch**
4. Mobile responsive pass. Test at 375px (iPhone SE), 414px (iPhone Pro Max), 768px (iPad). Fix overflow, smushed grids, untappable elements.
5. Replace any remaining lookalike-emoji or low-effort iconography with proper inline SVG.
6. The hero background image on Homepage hurts headline legibility per Kasim's earlier feedback. Strengthen the dark overlay (`linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75))` minimum) so headlines pass WCAG AA.
7. Verify all `@handle` references on the Equipped page actually link to `https://instagram.com/{handle}` with `target="_blank" rel="noopener"`.

**Priority 3 — Pitch enhancements**
8. Add a small "Made in Fullerton, CA" footer badge to every page that doesn't have one yet (Homepage and About already do).
9. Add a global rotating announcement bar to the top of every page (currently only Homepage has it).
10. The Equipped-print page auto-prints on page load. Add a 3-second delay + a "Cancel print" / "Print Now" banner so a reviewer can read the page before the dialog fires.

**Priority 4 — Nice to have**
11. Standardize the page-by-page Nav components onto `kbd-shell.jsx`. Right now only About, Blog, and Order Status use it. Don't do this if it risks breaking page-specific Nav behavior (Results has a vehicle pill, Product has product context, Checkout is intentionally minimal).
12. Add real review submission UX to Product page (currently the textarea exists but no clear submission flow).
13. Add a "Past Crowd-Funded Wins" callout to Will Make It with thumbnails of the PMZ 300ZX, Deuce Miata, BN S13/S14 kits.

---

## 10. Definition of done (prototype phase)

The prototype is "done enough to pitch" when:

- [ ] All 10 HTML files open in a browser without console errors
- [ ] Every nav link resolves to a real page (no `href="#"` in primary nav)
- [ ] Every product card on Homepage and Results shows a car image (no broken placeholder)
- [ ] Every product detail page shows 4 gallery images + 3 reviews
- [ ] Cart persists across pages via localStorage
- [ ] Every "submit" form resolves to a visible success state
- [ ] Page renders correctly at 375px wide
- [ ] No emoji visible in UI elements (form placeholders OK)
- [ ] No `{{TOKEN}}` placeholders visible to the user
- [ ] No fake reviewer names ("Marcus T.", "Derek S.", "Priya M.") anywhere
- [ ] KBD logo (`assets/kbd-logo.png`) appears in Nav and Footer on every page
- [ ] All `@handle` references on Equipped link to Instagram
- [ ] Show Us Your Ride banner uses the Instagram brand gradient (not purple/pink/orange random)
- [ ] Limited Lifetime Warranty wording is consistent (never just "Lifetime Warranty")
- [ ] Vehicle catalog (`VEHICLE_DATA`) is identical between Homepage YMM and Results filter

---

## 11. Real KBD product style names (use these, never invent)

| Style | Platform(s) | Type |
|---|---|---|
| Kyouki | Chevrolet Corvette C5 | Full body kit |
| Zenki | Nissan 240SX S14 (pre-facelift) | Full body kit |
| Kouki | Nissan 240SX S14 (post-facelift) | Full body kit |
| PMZ | Nissan 300ZX Z32 | Wide body kit |
| VTX | Nissan 350Z Z33, Lexus IS300 | Front bumper |
| N-1 / NISMO-2 | Nissan 350Z Z33 | Front bumper |
| N3R | Nissan 350Z Z33 | Front bumper |
| Deuce | Mazda Miata NA | Full body kit |
| Stalker | Multiple (Integra DC2 popular) | Front bumper |
| V-Speed | Multiple | Front lip |
| Cobra-R | Ford Mustang | Front bumper |
| 2Fordy | Ford Mustang SN95 | Full body kit |
| GP1 | Nissan 240SX 1989-1994 | Full body kit |
| BN | Nissan 240SX S13/S14 | Full body kit |
| Bsport / B-Sport | Lexus GS300/GS400 | Full body kit |
| Premier Series | General | Full kit line |

---

## 12. Real builder Instagram handles (use these on Equipped and reviews)

| Handle | Vehicle |
|---|---|
| @rob_nappyboyautomotive | Nissan 240SX S14 Zenki |
| @anthony.e36 | BMW E36 3 Series |
| @kaida_brz | Scion FRS / Subaru BRZ / Toyota 86 |
| @trippy_z33 | Nissan 350Z |
| @miraimoto | Lexus SC300/SC400 |
| @tyler_mayer | Nissan 240SX Hatchback |
| @jeeepbro | Jeep Wrangler JL |
| @whitewidow_jku | Jeep Gladiator JT |
| @bbk.cayy | Infiniti G35 4DR |
| @xs.yata | Mazda Miata |
| @sirstancystang | Ford Mustang |
| @greeenz33 | Nissan 350Z |
| @conejos_z32 | Nissan 300ZX |
| @thedriftyeti | Chevrolet Corvette C5 |
| @clapped_is300 | Lexus IS300 |
| @kirby_fc | Nissan 240SX S13 Silvia |
| @modclubshop | BMW E46 |
| @r3vivecrew | BMW E46 |
| @jasondriftz | Mazda RX7 |
| @drift-mansino | Nissan 370Z |
| @jl.drifts | Nissan 350Z |
| @kendyl_xoxo | Mazda Miata |

Each handle links to `https://instagram.com/{handle_without_at}` with `target="_blank" rel="noopener"`.

---

## 13. Vehicle catalog (single source of truth — use exactly this object)

This must be identical on Homepage hero YMM selector and Results page filter. Do not maintain two copies. Do not invent makes/models not on this list.

```javascript
const VEHICLE_DATA = {
  Acura:      { years: [1990, 2024], models: ['Integra', 'Integra Type-R DC2', 'NSX', 'RSX', 'TL', 'TSX'] },
  Audi:       { years: [1995, 2024], models: ['A4', 'B5', 'B7', 'S4'] },
  BMW:        { years: [1990, 2024], models: ['3 Series E36', '3 Series E46', '3 Series E90', 'M3', '5 Series', 'Z3', 'Z4'] },
  Chevrolet:  { years: [1990, 2024], models: ['Camaro', 'Corvette C5', 'Corvette C6', 'Cobalt SS', 'Impala'] },
  Dodge:      { years: [1990, 2024], models: ['Challenger', 'Charger', 'Neon SRT-4', 'Viper'] },
  Ford:       { years: [1990, 2024], models: ['Bronco (2dr)', 'Bronco (4dr)', 'Focus ST', 'Mustang SN95', 'Mustang S197', 'Mustang S550'] },
  Honda:      { years: [1990, 2024], models: ['Civic EG', 'Civic EK', 'Civic EM2', 'CRX', 'Del Sol', 'Prelude', 'S2000'] },
  Infiniti:   { years: [2003, 2013], models: ['G35 Coupe', 'G35 Sedan', 'G37 Coupe', 'G37 Sedan'] },
  Jeep:       { years: [2007, 2024], models: ['Cherokee XJ', 'Gladiator JT', 'Wrangler JK', 'Wrangler JL'] },
  Lexus:      { years: [1991, 2024], models: ['GS300', 'GS400', 'GS430', 'IS300', 'IS250', 'IS350', 'SC300', 'SC400'] },
  Mazda:      { years: [1990, 2024], models: ['Miata NA', 'Miata NB', 'Miata NC', 'RX-7 FC', 'RX-7 FD', 'RX-8'] },
  Mitsubishi: { years: [1990, 2024], models: ['3000GT', 'Eclipse', 'Lancer Evo VIII', 'Lancer Evo IX', 'Lancer Evo X'] },
  Nissan:     { years: [1990, 2024], models: ['240SX S13 Coupe', '240SX S13 Hatchback', '240SX S14 Zenki', '240SX S14 Kouki', '300ZX Z32', '350Z Z33', '370Z Z34', 'Skyline R32', 'Skyline R33', 'Skyline R34'] },
  Pontiac:    { years: [1990, 2006], models: ['Firebird', 'Grand Am', 'GTO', 'Trans Am'] },
  Porsche:    { years: [1998, 2012], models: ['996', '997', 'Boxster 986', 'Boxster 987'] },
  Scion:      { years: [2004, 2016], models: ['FR-S', 'tC', 'xB'] },
  Subaru:     { years: [1993, 2024], models: ['BRZ', 'Impreza', 'WRX', 'WRX STI'] },
  Toyota:     { years: [1990, 2024], models: ['86 / GR86', 'AE86', 'Celica', 'Corolla', 'MR2', 'Supra MK4', 'Supra MK5'] },
};
```

---

## 14. Spoofed numbers (use these as-is; real numbers come from Irving later)

| Token | Spoofed value |
|---|---|
| Average rating | 4.9 |
| Review count | 8,400+ |
| New kits per year | 40+ |
| Community votes | 12K+ |
| Vehicles in catalog | "Hundreds" (use word, not number) |
| Free shipping threshold | $150 |
| Phone | (877) 399-3794 (this one is real, not spoofed) |

If you find any `{{TOKEN}}` placeholders still in the files, replace them with the value above. Do not invent additional numerical claims that aren't on this list.

---

## 15. After you read this — first action

Do not start making changes yet. Your first move is:

1. Read the file inventory (§6) by `ls`-ing the working directory.
2. Run the three grep checks in §9 Priority 1, item 1.
3. Report back to me with:
   - Confirmation that all 10 HTML files plus the two JSX files are present
   - The output of the three grep checks
   - Any console errors you see if you can open a file
   - Your understanding of what this project is, in your own words, in 3-4 sentences (to confirm you've internalized the brief)

Once I confirm your understanding, we'll trigger the scaffold skill or jump straight to Priority 1 work depending on whether VISION/PLAN/TASKS files exist yet.

---

## 16. Notes for the agent

- **Don't be precious.** Most of this prototype is straightforward HTML/JSX. If you see a bug, fix it. If you see emoji, replace with SVG. If you see a broken link, fix it. You don't need permission for low-stakes corrections.
- **Do flag tradeoffs.** When you face a judgment call between two approaches, do one and tell me what you considered. Don't ask me to pick between two options unless they have meaningfully different consequences.
- **Don't overthink design choices.** The visual direction is locked. Match what's already there. If you find yourself wanting to "improve" the aesthetic, stop — that's out of scope for you on this project. Defer visual judgment calls to me.
- **Keep the prototype shippable.** At any given moment, all 10 pages should open in a browser without errors. If you're mid-refactor and a page breaks, finish or revert before stopping.
- **Burn cycles on the unsexy stuff.** Mobile responsive passes, accessibility fixes, broken-link audits, console-error cleanup, image fallback paths — this is where you earn your keep. Claude Design does the visual work; you do the rigor work.