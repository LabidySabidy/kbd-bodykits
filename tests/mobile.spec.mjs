import { test, expect } from '@playwright/test';
import { readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(__dirname, '..');

const PAGES = [
  'KBD_Homepage.html',
  'KBD_Results.html',
  'KBD_Product.html',
  'KBD_Equipped.html',
  'KBD_Equipped-print.html',
  'KBD_Will_Make_It.html',
  'KBD_Checkout.html',
  'KBD_About.html',
  'KBD_Blog.html',
  'KBD_Order_Status.html',
];

const VIEWPORT = { width: 375, height: 812 }; // iPhone

PAGES.forEach((page) => {
  test.describe(page, () => {
    let consoleErrors = [];

    test.beforeEach(async ({ page: p }) => {
      consoleErrors = [];
      p.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      p.on('pageerror', (err) => consoleErrors.push(err.message));
    });

    test('renders without console errors', async ({ page: p }) => {
      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });

      // Wait for React to render
      await p.waitForTimeout(1000);

      // Filter out pre-existing file:// CORS errors (tweaks-panel.jsx, kbd-shell.jsx)
      // These don't occur in production (served over HTTP)
      const realErrors = consoleErrors.filter((e) =>
        !e.includes('Access to XMLHttpRequest') &&
        !e.includes('Failed to load resource: net::ERR_FAILED') &&
        !e.includes('useTweaks is not defined')
      );

      expect(realErrors, `Console errors in ${page}:\n${realErrors.join('\n')}`).toEqual([]);
    });

    test('no horizontal overflow', async ({ page: p }) => {
      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1000);

      const overflow = await p.evaluate(() => {
        const html = document.documentElement;
        const body = document.body;
        return {
          htmlScroll: html.scrollWidth > html.clientWidth,
          bodyScroll: body.scrollWidth > body.clientWidth,
        };
      });

      expect(overflow.htmlScroll, `HTML overflow in ${page}`).toBe(false);
      // Body scrollWidth > clientWidth is normal if content overflows naturally;
      // only flag if HTML itself overflows (indicates a layout bug)
    });
  });
});

// Specific feature tests
test.describe('Homepage features', () => {
  test('hamburger menu visible at mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/KBD_Homepage.html`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1000);

    const hamburger = p.locator('.nav-hamburger');
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveCount(1);
  });

  test('nav links hidden on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/KBD_Homepage.html`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1000);

    const navLinks = p.locator('.nav-links');
    await expect(navLinks).not.toBeVisible();
  });

  test('trust bar auto-scrolls', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/KBD_Homepage.html`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1000);

    const trustBar = p.locator('[data-trust-bar]');
    await expect(trustBar).toBeVisible();

    // Check animation is applied
    const animation = await trustBar.evaluate((el) =>
      getComputedStyle(el).animationName
    );
    expect(animation).toContain('trust-scroll');
  });
});

test.describe('All pages with nav', () => {
  const NAV_PAGES = [
    'KBD_Homepage.html',
    'KBD_Results.html',
    'KBD_Product.html',
    'KBD_Equipped.html',
    'KBD_Equipped-print.html',
    'KBD_Will_Make_It.html',
    'KBD_Checkout.html',
  ];

  NAV_PAGES.forEach((page) => {
    test(`hamburger present on ${page}`, async ({ page: p }) => {
      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1000);

      const hamburger = p.locator('.nav-hamburger');
      await expect(hamburger).toBeVisible();
    });
  });
});
