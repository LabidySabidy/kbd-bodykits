import { chromium } from 'playwright';
import { readFileSync } from 'fs';

const PROJECT = 'C:/Users/Kasim Alam/Downloads/KBD-v1.1';
const PAGES = ['KBD_Homepage.html', 'KBD_Results.html', 'KBD_Product.html', 'KBD_Equipped.html', 'KBD_Will_Make_It.html'];

(async () => {
  const browser = await chromium.launch();
  for (const pageFile of PAGES) {
    const p = await browser.newPage();
    await p.setViewportSize({ width: 375, height: 812 });
    await p.route('**/tweaks-panel.jsx', (route) => {
      route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
    });
    await p.goto(`file://${PROJECT}/${pageFile}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    const order = await p.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return 'no nav';
      const container = nav.querySelector(':scope > div');
      if (!container) return 'no container';
      const children = Array.from(container.children);
      return children.map((c, i) => ({
        index: i,
        tag: c.tagName,
        class: c.className.substring(0, 30),
        text: (c.textContent || '').substring(0, 20).trim(),
        order: getComputedStyle(c).order,
        display: getComputedStyle(c).display,
        right: Math.round(c.getBoundingClientRect().right),
      }));
    });
    
    console.log(`\n${pageFile}:`);
    order.forEach(o => console.log(`  [${o.index}] order=${o.order} display=${o.display} right=${o.right}px ${o.tag}.${o.class} "${o.text}"`));
    await p.close();
  }
  await browser.close();
})();
