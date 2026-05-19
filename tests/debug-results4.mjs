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
    // Find all grid containers
    const all = document.querySelectorAll('div');
    const grids = [];
    all.forEach(d => {
      const cs = getComputedStyle(d);
      if (cs.display === 'grid' || cs.display === 'inline-grid') {
        grids.push({
          columns: cs.gridTemplateColumns,
          width: Math.round(d.getBoundingClientRect().width),
          children: d.children.length,
          firstChild: d.children[0] ? {
            tag: d.children[0].tagName,
            width: Math.round(d.children[0].getBoundingClientRect().width),
            text: (d.children[0].textContent || '').substring(0, 30),
          } : null,
          secondChild: d.children[1] ? {
            tag: d.children[1].tagName,
            width: Math.round(d.children[1].getBoundingClientRect().width),
            text: (d.children[1].textContent || '').substring(0, 30),
          } : null,
        });
      }
    });
    return grids;
  });
  
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
