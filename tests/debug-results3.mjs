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
    const mainGrid = document.querySelector('[style*="240px 1fr"], [style*="grid-template-columns"]');
    if (!mainGrid) return { found: false, note: 'grid not found by attribute' };
    
    // Try finding by content
    const allDivs = document.querySelectorAll('div');
    let gridEl = null;
    allDivs.forEach(d => {
      const s = d.getAttribute('style') || '';
      if (s.includes('240px') && s.includes('grid')) gridEl = d;
    });
    
    if (!gridEl) return { found: false };
    
    const cs = getComputedStyle(gridEl);
    const children = Array.from(gridEl.children).map(c => ({
      tag: c.tagName,
      width: Math.round(c.getBoundingClientRect().width),
      text: (c.textContent || '').substring(0, 30),
    }));
    
    return {
      inlineStyle: gridEl.getAttribute('style'),
      computedColumns: cs.gridTemplateColumns,
      computedWidth: Math.round(gridEl.getBoundingClientRect().width),
      children,
    };
  });
  
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
