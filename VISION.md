# Vision — KBD Body Kits Redesign Prototype

## What this app is
A clickable HTML/React prototype that pitches a website redesign to KBD Body Kits — a ~50-year-old polyurethane body kit manufacturer in Fullerton, CA. The prototype is the pitch artifact to win the redesign contract; production comes after Irving signs.

## Who it's for
- **Primary**: Irving, KBD Body Kits owner. Needs to see a credible, high-fidelity vision of a modernized storefront he can imagine showing his team and customers.
- **Secondary**: KBD's end customers — drift builders, JDM tuners, Jeep/Mustang owners. Mostly male, 22-45, already in the aftermarket ecosystem. They know what fitment means and recognize KBD style names.

## What problem it solves
Irving's current WordPress/WPBakery site looks 15 years old and is losing customers to better-presented competitors. His product catalog is buried behind a clunky Year/Make/Model drilldown, and his real differentiators — Made in USA, almost 50 years of heritage, real drift-community presence, Limited Lifetime Warranty, flexible polyurethane that won't crack — are nearly invisible. The prototype demonstrates a credible path to fixing all of this.

## How a user gets value
Irving opens the prototype in a browser, clicks through 10 pages of a modern, drift-forward motorsport storefront, and sees his business presented the way his competitors present theirs — editorial photography, clear differentiators, accessible product browsing, community integration. He decides it's worth the investment to rebuild on headless WordPress.

## What it's not
- Not a production e-commerce site — no real backend, no payment processing, no user accounts
- Not a creative exploration — the visual direction is locked (Kith/Carhartt WIP/motorsport heritage)
- Not the full redesign — admin pages, dealer portal, gift cards, FAQ system are all deferred to production

## Success looks like
- Irving says yes to the redesign contract
- All 10 pages open without console errors at 375px minimum width
- Every nav link resolves, cart persists across pages, every form submits to a visible success state
- No emoji, no `{{TOKEN}}` placeholders, no fake reviewer names visible to users

## Current phase
**v1.2 / prototype iteration** — stabilizing the existing prototype per PRD §9 priority list. The production build (headless WordPress + Next.js + Stripe) is out of scope.

## Architecture

**Components:**
- `KBD_Homepage.html` through `KBD_Order_Status.html` — 10 self-contained React pages (React 18 + Babel-Standalone CDN, inline JSX)
- `kbd-shell.jsx` — shared Nav + Footer for About, Blog, Order Status (other pages have inline Nav/Footer)
- `tweaks-panel.jsx` — Claude Design live-editing bridge (do not delete or refactor)

**Data flow:** Browser → loads HTML → Babel transpiles inline JSX → React renders page. Cart state → localStorage (persists across pages). Form submissions → fake success states (no network calls). YMM selection → localStorage → filters on Results page.

**Key tech choices:** React 18 + Babel-Standalone via CDN, no build step, no npm, no TypeScript. All styles inline or in `<style>` blocks. No CSS frameworks. No state management libs.

## Constraints worth knowing
- No build step, no package.json, no node_modules in this directory
- No external CSS frameworks (Tailwind, Bootstrap)
- No state management libraries — useState/useEffect/useRef only
- No routing libraries — plain `<a href>` and `window.location.href`
- No TypeScript — plain JSX
- Color palette and typography locked (§5 of PRD)
- tweaks-panel.jsx must stay intact for Claude Design compatibility
- KBD brand bible (§4) is non-negotiable factual content

## Domain glossary

| Term | Definition |
|---|---|
| YMM | Year/Make/Model — the vehicle selection drilldown for finding compatible body kits |
| KBD | KBD Body Kits — the company, a polyurethane body kit manufacturer in Fullerton, CA |
| PU | Polyurethane — the flexible material KBD uses (never "urethane" alone, never "plastic") |
| Style name | KBD's product line names (Kyouki, Zenki, Kouki, VTX, PMZ, Deuce, etc.) — real, never invent |
| Equipped | KBD's community build gallery — real builder cars with tagged parts |
| Will Make It | KBD's community-driven product voting program — customers request vehicles, KBD builds kits for winners |
| Claude Design | The visual iteration tool previously used for this prototype — its bridge (tweaks-panel.jsx) must stay intact |

**Avoided terms:** "Duraflex" (competitor), "Lifetime Warranty" without "Limited" prefix, specific founding year (use "almost 50 years")
