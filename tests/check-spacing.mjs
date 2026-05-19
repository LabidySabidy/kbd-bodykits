import { chromium } from 'playwright';
import { readFileSync } from 'fs';

const PROJECT = 'C:/Users/Kasim Alam/Downloads/KBD-v1.1';
const PAGES = ['KBD_Homepage.html', 'KBD_Results.html', 'KBD_Product.html', 'KBD_Equipped.html', 'KBD_Will_Make_It.html'];

(async () => {
  const browser = await chromium.launch();
  for (const pf of PAGES) {
    const p = await browser.newPage();
    await p.setViewportSize({ width: 375, height: 812 });
    await p.route('**/tweaks-panel.jsx', (route) => {
      route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
    });
    await p.goto(`file://${PROJECT}/${pf}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    const info = await p.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return { error: 'no nav' };
      const container = nav.querySelector(':scope > div');
      if (!container) return { error: 'no container' };
      
      const cs = getComputedStyle(container);
      const hamburger = container.querySelector('.nav-hamburger');
      const navRect = nav.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const result = {
        navWidth: Math.round(navRect.width),
        containerPaddingLeft: cs.paddingLeft,
        containerPaddingRight: cs.paddingRight,
        containerGap: cs.gap,
        containerRightEdge: Math.round(containerRect.right),
        viewport: window.innerWidth,
      };
      
      if (hamburger) {
        const hRect = hamburger.getBoundingClientRect();
        result.hamburger = {
          right: Math.round(hRect.right),
          width: Math.round(hRect.width),
          marginRight: getComputedStyle(hamburger).marginRight,
          paddingRight: getComputedStyle(hamburger).paddingRight,
          gapFromViewportEdge: window.innerWidth - Math.round(hRect.right),
        };
      }
      
      // Check all right-side children for their contribution
      const rightActions = container.querySelector(':scope > div:last-of-type') || container.children[container.children.length - 1];
      if (rightActions && rightActions !== hamburger) {
        const raRect = rightActions.getBoundingClientRect();
        result.rightGroup = {
          tag: rightActions.tagName,
          right: Math.round(raRect.right),
          width: Math.round(raRect.width),
        };
      }
      
      return result;
    });
    
    console.log(`\n${pf}:`);
    console.log(JSON.stringify(info, null, 2));
    await p.close();
  }
  await browser.close();
})();
