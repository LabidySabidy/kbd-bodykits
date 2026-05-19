import { chromium } from 'playwright';
import { readFileSync } from 'fs';

const PROJECT = 'C:/Users/Kasim Alam/Downloads/KBD-v1.1';

(async () => {
  const browser = await chromium.launch();
  const p = await browser.newPage();
  await p.setViewportSize({ width: 375, height: 812 });
  
  p.on('console', msg => { if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text().substring(0, 120)); });
  p.on('pageerror', err => console.log('PAGE ERROR:', err.message.substring(0, 120)));
  
  await p.route('**/tweaks-panel.jsx', (route) => {
    route.fulfill({ contentType: 'text/javascript', body: readFileSync(`${PROJECT}/tweaks-panel.jsx`, 'utf-8') });
  });
  
  await p.goto(`file://${PROJECT}/KBD_Results.html`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);

  // Analyze layout issues
  const layout = await p.evaluate(() => {
    const issues = [];
    const vw = window.innerWidth;
    
    // Check ALL elements wider than viewport
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > vw + 5) {
        issues.push({
          type: 'wide_element',
          tag: el.tagName,
          class: (el.className && typeof el.className === 'string') ? el.className.substring(0, 40) : '',
          width: Math.round(r.width),
          text: (el.textContent || '').trim().substring(0, 40),
        });
      }
    });
    
    // Check nav children
    const nav = document.querySelector('nav');
    const navChildren = nav ? Array.from(nav.querySelector(':scope > div').children).map((c, i) => ({
      index: i,
      tag: c.tagName,
      text: (c.textContent || '').trim().substring(0, 25),
      display: getComputedStyle(c).display,
      right: Math.round(c.getBoundingClientRect().right),
      width: Math.round(c.getBoundingClientRect().width),
    })) : [];
    
    // Check main content area
    const main = document.querySelector('main, section, [class*="kbd-page"]');
    const mainInfo = main ? {
      tag: main.tagName,
      width: Math.round(main.getBoundingClientRect().width),
      paddingLeft: getComputedStyle(main).paddingLeft,
      paddingRight: getComputedStyle(main).paddingRight,
    } : null;
    
    // Check for grid layouts
    const grids = [];
    document.querySelectorAll('[style*="grid"]').forEach(el => {
      const style = el.getAttribute('style') || '';
      if (style.includes('grid-template-columns')) {
        grids.push({
          tag: el.tagName,
          columns: getComputedStyle(el).gridTemplateColumns,
          width: Math.round(el.getBoundingClientRect().width),
          text: (el.textContent || '').trim().substring(0, 30),
        });
      }
    });
    
    return { 
      viewport: vw,
      htmlOverflow: document.documentElement.scrollWidth > vw,
      navChildren,
      mainInfo,
      wideElements: issues.filter((_, i) => i < 10),
      grids: grids.filter((_, i) => i < 10),
    };
  });
  
  console.log(JSON.stringify(layout, null, 2));
  await p.screenshot({ path: 'results-mobile.png' });
  console.log('\nScreenshot saved: results-mobile.png');
  await browser.close();
})();
