import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(__dirname, '..');

const PAGES_WITH_NAV = [
  'KBD_Homepage.html',
  'KBD_Results.html',
  'KBD_Product.html',
  'KBD_Equipped.html',
  'KBD_Will_Make_It.html',
];

const PAGES_WITHOUT_NAV = [
  'KBD_About.html',
  'KBD_Blog.html',
  'KBD_Order_Status.html',
  'KBD_Equipped-print.html',
  'KBD_Checkout.html',
];

const ALL_PAGES = [...PAGES_WITH_NAV, ...PAGES_WITHOUT_NAV];
const VIEWPORT = { width: 375, height: 812 }; // iPhone

ALL_PAGES.forEach((page) => {
  test.describe(page, () => {
    let consoleErrors = [];

    test.beforeEach(async ({ page: p }) => {
      consoleErrors = [];
      p.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      p.on('pageerror', (err) => consoleErrors.push(err.message));

      // Serve local JSX files blocked by Chrome CORS on file:// protocol
      await p.route('**/tweaks-panel.jsx', (route) => {
        route.fulfill({
          contentType: 'text/javascript',
          body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8'),
        });
      });
      await p.route('**/kbd-shell.jsx', (route) => {
        route.fulfill({
          contentType: 'text/javascript',
          body: existsSync(`${PROJECT}/kbd-shell.jsx`)
            ? readFileSync(`${PROJECT}/kbd-shell.jsx`, 'utf-8')
            : '',
        });
      });
    });

    test('renders without console errors', async ({ page: p }) => {
      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1500);

      const realErrors = consoleErrors.filter((e) =>
        !e.includes('Access to XMLHttpRequest') &&
        !e.includes('Failed to load resource: net::ERR_FAILED')
      );

      expect(realErrors, `Console errors in ${page}:\n${realErrors.join('\n')}`).toEqual([]);
    });

    test('no horizontal overflow', async ({ page: p }) => {
      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1500);

      const overflow = await p.evaluate(() => {
        const html = document.documentElement;
        return html.scrollWidth > html.clientWidth;
      });

      expect(overflow, `HTML overflow in ${page}`).toBe(false);
    });
  });
});

// Hamburger + trust bar tests (only on pages with nav)
PAGES_WITH_NAV.forEach((page) => {
  test.describe(`${page} — hamburger`, () => {
    test.beforeEach(async ({ page: p }) => {
      // Route mocks needed for these standalone tests too
      await p.route('**/tweaks-panel.jsx', (route) => {
        route.fulfill({
          contentType: 'text/javascript',
          body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8'),
        });
      });
      await p.route('**/kbd-shell.jsx', (route) => {
        route.fulfill({
          contentType: 'text/javascript',
          body: existsSync(`${PROJECT}/kbd-shell.jsx`)
            ? readFileSync(`${PROJECT}/kbd-shell.jsx`, 'utf-8')
            : '',
        });
      });
    });

    test('hamburger visible at mobile', async ({ page: p }) => {
      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1500);

      const hamburger = p.locator('.nav-hamburger');
      await expect(hamburger).toBeVisible();
    });

    test('nav links hidden on mobile', async ({ page: p }) => {
      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1500);

      const navLinks = p.locator('.nav-links');
      await expect(navLinks).not.toBeVisible();
    });
  });
});

// Homepage-specific feature tests
test.describe('Homepage — trust bar', () => {
  test.beforeEach(async ({ page: p }) => {
    await p.route('**/tweaks-panel.jsx', (route) => {
      route.fulfill({
        contentType: 'text/javascript',
        body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8'),
      });
    });
  });

  test('trust bar auto-scrolls on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/KBD_Homepage.html`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    const trustBar = p.locator('[data-trust-bar]');
    await expect(trustBar).toBeVisible();

    // Check animation is applied on first child
    const firstItem = trustBar.locator('> div').first();
    const animation = await firstItem.evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toContain('trust-scroll');
  });
});
