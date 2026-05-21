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
  'KBD_About.html',
  'KBD_Blog.html',
  'KBD_Order_Status.html',
];

const PAGES_WITHOUT_NAV = [
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

// About page — mobile content layout
const ABOUT_PAGE = 'KBD_About.html';
test.describe(`${ABOUT_PAGE} — mobile layout`, () => {
  test.beforeEach(async ({ page: p }) => {
    await p.route('**/tweaks-panel.jsx', (route) => {
      route.fulfill({
        contentType: 'text/javascript',
        body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8'),
      });
    });
    await p.route('**/kbd-shell.jsx', (route) => {
      route.fulfill({
        contentType: 'text/javascript',
        body: readFileSync(`${PROJECT}/kbd-shell.jsx`, 'utf-8'),
      });
    });
  });

  test('editorial articles stack vertically on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/${ABOUT_PAGE}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    // Articles should be 1-column grid after MO collapses them
    const columns = await p.evaluate(() => {
      const articles = document.querySelectorAll('article');
      if (articles.length === 0) return [];
      return Array.from(articles).map(el => getComputedStyle(el).gridTemplateColumns);
    });
    expect(columns.length).toBeGreaterThanOrEqual(3);
    columns.forEach(col => {
      // getComputedStyle resolves fr to px; single-column means 1 track
      const tracks = col.trim().split(/\s+/);
      expect(tracks.length, `Article grid should be 1 column, got ${tracks.length}: ${col}`).toBe(1);
    });
  });

  test('editorial content column is readable width on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/${ABOUT_PAGE}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    // Editorial section headings should be at least 280px wide (not squished by 140px sidebar)
    const widths = await p.evaluate(() => {
      const headings = document.querySelectorAll('h2');
      return Array.from(headings).map(el => el.getBoundingClientRect().width);
    });
    widths.forEach(w => {
      expect(w, `Heading width ${w}px is too narrow`).toBeGreaterThanOrEqual(280);
    });
  });

  test('footer columns stack on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/${ABOUT_PAGE}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    // Footer grid should collapse to 1 column
    const footerCols = await p.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;
      // Footer grid is the first grid child inside footer > div
      const grids = footer.querySelectorAll('[style*="grid"]');
      for (const g of grids) {
        const cols = getComputedStyle(g).gridTemplateColumns;
        // The main column grid will have multiple columns on desktop
        if (cols && cols !== 'none') return cols;
      }
      return null;
    });
    expect(footerCols).not.toBeNull();
    const footerTracks = footerCols.trim().split(/\s+/);
    expect(footerTracks.length, `Footer grid should be 1 column, got ${footerTracks.length}: ${footerCols}`).toBe(1);
  });

  test('CTA section stacks vertically on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/${ABOUT_PAGE}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    // CTA section: the grid with the phone number + "Get In Touch" button
    const ctaCols = await p.evaluate(() => {
      // Find the section that contains the phone number
      const phoneLink = document.querySelector('a[href="tel:18773993794"]');
      if (!phoneLink) return null;
      // Walk up to find the grid parent
      let el = phoneLink.parentElement;
      while (el) {
        const cols = getComputedStyle(el).gridTemplateColumns;
        if (cols && cols !== 'none') return cols;
        el = el.parentElement;
      }
      return null;
    });
    expect(ctaCols).not.toBeNull();
    const ctaTracks = ctaCols.trim().split(/\s+/);
    expect(ctaTracks.length, `CTA grid should be 1 column, got ${ctaTracks.length}: ${ctaCols}`).toBe(1);
  });

  test('hero heading fits within viewport on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/${ABOUT_PAGE}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    const h1Width = await p.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.getBoundingClientRect().width : 0;
    });
    // h1 should not exceed viewport width minus padding
    expect(h1Width, `Hero h1 width ${h1Width}px exceeds viewport`).toBeLessThanOrEqual(375);
  });
});

// Blog page — mobile content layout
const BLOG_PAGE = 'KBD_Blog.html';
test.describe(`${BLOG_PAGE} — mobile layout`, () => {
  test.beforeEach(async ({ page: p }) => {
    await p.route('**/tweaks-panel.jsx', (route) => {
      route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
    });
    await p.route('**/kbd-shell.jsx', (route) => {
      route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/kbd-shell.jsx`, 'utf-8') });
    });
  });

  test('blog content is readable width on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/${BLOG_PAGE}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    // Blog article headings should be readable width
    const widths = await p.evaluate(() => {
      const headings = document.querySelectorAll('h2, h3');
      return Array.from(headings).map(el => el.getBoundingClientRect().width);
    });
    expect(widths.length).toBeGreaterThan(0);
    widths.forEach(w => {
      expect(w, `Heading width ${w}px is too narrow`).toBeGreaterThanOrEqual(200);
    });
  });
});

// Order Status page — mobile content layout
const OS_PAGE = 'KBD_Order_Status.html';
test.describe(`${OS_PAGE} — mobile layout`, () => {
  test.beforeEach(async ({ page: p }) => {
    await p.route('**/tweaks-panel.jsx', (route) => {
      route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
    });
    await p.route('**/kbd-shell.jsx', (route) => {
      route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/kbd-shell.jsx`, 'utf-8') });
    });
  });

  test('order-status content is readable width on mobile', async ({ page: p }) => {
    await p.setViewportSize(VIEWPORT);
    await p.goto(`file://${PROJECT}/${OS_PAGE}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    // Check that main content area is not squished by sidebar
    const widths = await p.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2');
      return Array.from(headings).map(el => el.getBoundingClientRect().width);
    });
    expect(widths.length).toBeGreaterThan(0);
    widths.forEach(w => {
      expect(w, `Heading width ${w}px is too narrow`).toBeGreaterThanOrEqual(200);
    });
  });
});

// Header layout: hamburger left of Cart on all nav pages
test.describe('Header — hamburger position', () => {
  PAGES_WITH_NAV.forEach((page) => {
    test(`${page} hamburger is left of cart on mobile`, async ({ page: p }) => {
      await p.route('**/tweaks-panel.jsx', (route) => {
        route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
      });
      await p.route('**/kbd-shell.jsx', (route) => {
        route.fulfill({ contentType: 'text/javascript', body: existsSync(`${PROJECT}/kbd-shell.jsx`) ? readFileSync(`${PROJECT}/kbd-shell.jsx`, 'utf-8') : '' });
      });

      await p.setViewportSize(VIEWPORT);
      await p.goto(`file://${PROJECT}/${page}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1500);

      const pos = await p.evaluate(() => {
        const hamburger = document.querySelector('.nav-hamburger');
        if (!hamburger) return null;
        const hRect = hamburger.getBoundingClientRect();
        // Find cart button (contains "Cart" text, is the last button in nav)
        const buttons = document.querySelectorAll('nav button');
        let cartBtn = null;
        buttons.forEach(b => { if (b.textContent.includes('Cart')) cartBtn = b; });
        if (!cartBtn) {
          // Try link with cart icon
          const cartLinks = document.querySelectorAll('nav a[href*="Checkout"]');
          cartLinks.forEach(a => { if (a.textContent.includes('Cart')) cartBtn = a; });
        }
        if (!cartBtn) return { hLeft: hRect.left, hRight: hRect.right };
        const cRect = cartBtn.getBoundingClientRect();
        return {
          hLeft: hRect.left, hRight: hRect.right,
          cLeft: cRect.left, cRight: cRect.right,
          hamburgerLeftOfCart: hRect.right <= cRect.left
        };
      });

      expect(pos).not.toBeNull();
      if (pos.cLeft !== undefined) {
        expect(pos.hamburgerLeftOfCart,
          `Hamburger right edge ${pos.hRight} should be <= cart left edge ${pos.cLeft}`
        ).toBe(true);
      }
    });
  });
});
