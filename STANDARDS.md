# KBD Body Kits — Acceptance Gates

Run these before claiming work is complete. Failure output is input to your next attempt.

## HTML / JSX changes

```
Playwright: npx playwright test --reporter=line
```

**Gate:** All 10 pages must pass "renders without console errors" test. Zero real console errors allowed.

**Known issues (do not block):**
- Horizontal overflow on 9 pages at 375px (pre-existing, tracked separately)
- `.nav-links` visibility on some pages at mobile (CSS sync gap)
- Hamburger missing on Checkout/Equipped-print (pages without nav links or missing CSS)

## Push gate

Before pushing to `main`, run the Playwright gate. If the console-error test fails, fix the failures and re-run. Known-issue test failures are documented above — do not treat them as regressions.
