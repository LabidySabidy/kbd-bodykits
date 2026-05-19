import { chromium } from 'playwright';
import { readFileSync } from 'fs';
const PROJECT = 'C:/Users/Kasim Alam/Downloads/KBD-v1.1';

(async () => {
  const browser = await chromium.launch();
  const p = await browser.newPage();
  await p.setViewportSize({ width: 375, height: 812 });
  await p.route('**/tweaks-panel.jsx', (route) => {
    route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
  });
  await p.goto(`file://${PROJECT}/KBD_Results.html`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);

  const info = await p.evaluate(() => {
    // Find the main layout grid (sidebar + content)
    const grids = document.querySelectorAll('[style*="240px"]');
    const results = [];
    grids.forEach(g => {
      const style = g.getAttribute('style') || '';
      const cs = getComputedStyle(g);
      results.push({
        inlineStyle: style.substring(0, 150),
        computedColumns: cs.gridTemplateColumns,
        computedGap: cs.gap,
        width: Math.round(g.getBoundingClientRect().width),
        children: g.children.length,
        firstChildWidth: g.children[0] ? Math.round(g.children[0].getBoundingClientRect().width) : 0,
        secondChildWidth: g.children[1] ? Math.round(g.children[1].getBoundingClientRect().width) : 0,
      });
    });
    
    // Check ALL active CSS rules on the main grid
    const mainGrid = document.querySelector('[style*="240px 1fr"]');
    const rules = [];
    if (mainGrid) {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && mainGrid.matches(rule.selectorText)) {
              rules.push(rule.cssText.substring(0, 120));
            }
          }
        } catch(e) {}
      }
    }
    
    return { grids: results, matchingCSSRules: rules };
  });
  
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
