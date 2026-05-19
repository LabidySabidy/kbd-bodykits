import { chromium } from 'playwright';
import { readFileSync } from 'fs';
const PROJECT = 'C:/Users/Kasim Alam/Downloads/KBD-v1.1';

(async () => {
  const browser = await chromium.launch();
  const p = await browser.newPage();
  await p.setViewportSize({ width: 375, height: 812 });
  p.on('pageerror', err => console.log('ERR:', err.message.substring(0, 100)));
  await p.route('**/tweaks-panel.jsx', (route) => {
    route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
  });
  await p.goto(`file://${PROJECT}/KBD_Will_Make_It.html`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);

  const info = await p.evaluate(() => {
    const vw = window.innerWidth;
    
    // Find ALL grid containers
    const grids = [];
    document.querySelectorAll('div').forEach(d => {
      const cs = getComputedStyle(d);
      if ((cs.display === 'grid' || cs.display === 'inline-grid') && d.children.length >= 2) {
        const cols = cs.gridTemplateColumns.split(' ').length;
        grids.push({
          columns: cs.gridTemplateColumns,
          colCount: cols,
          width: Math.round(d.getBoundingClientRect().width),
          gap: cs.gap,
          padding: cs.padding,
          children: Array.from(d.children).map(c => ({
            tag: c.tagName,
            width: Math.round(c.getBoundingClientRect().width),
            text: (c.textContent || '').trim().substring(0, 40),
          })),
        });
      }
    });
    
    // Find wide elements
    const wide = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > vw + 5) {
        wide.push({
          tag: el.tagName,
          width: Math.round(r.width),
          class: (el.className && typeof el.className === 'string') ? el.className.substring(0, 30) : '',
          text: (el.textContent || '').trim().substring(0, 40),
        });
      }
    });
    
    // Check sections
    const sections = [];
    document.querySelectorAll('section, main, [class*="kbd-page"]').forEach(s => {
      sections.push({
        tag: s.tagName,
        width: Math.round(s.getBoundingClientRect().width),
        padding: getComputedStyle(s).padding,
      });
    });
    
    return { viewport: vw, grids: grids.slice(0, 10), wideElements: wide.slice(0, 10), sections };
  });
  
  console.log(JSON.stringify(info, null, 2));
  await p.screenshot({ path: 'will-make-it-mobile.png' });
  console.log('\nScreenshot saved');
  await browser.close();
})();
