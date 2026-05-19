// Shared Nav + Footer used by KBD_About, KBD_Order_Status, KBD_Blog.
// Loaded via <script type="text/babel" src="kbd-shell.jsx"></script>.

function Nav({ active }) {
  const items = [
    ['KBD_Homepage.html',     'Shop By Vehicle'],
    ['KBD_Results.html',      'Body Kits'],
    ['KBD_Equipped.html',     'KBD Equipped'],
    ['KBD_Will_Make_It.html', 'Will Make It'],
    ['KBD_About.html',        'About'],
    ['KBD_Blog.html',         'Blog'],
  ];
  const cartCount = (()=>{ try { return JSON.parse(localStorage.getItem('kbd_cart')||'[]').reduce((s,i)=>s+(i.qty||1),0); } catch { return 0; } })();

  return (
    <nav style={{ position:'sticky', top:0, zIndex:1000, background:'var(--black)', borderBottom:'1px solid #222' }}>
      <div style={{ maxWidth:'1440px', margin:'0 auto', display:'flex', alignItems:'center', padding:'0 40px', height:'64px', gap:'24px' }}>
        <a href="KBD_Homepage.html" style={{display:'flex',alignItems:'center',height:'40px',textDecoration:'none',flexShrink:0}} aria-label="KBD Body Kits home">
          <img src="assets/kbd-logo.png" alt="KBD Body Kits" style={{height:'72px',width:'auto',display:'block'}}/>
        </a>
        <div style={{flex:1, display:'flex', gap:0, alignItems:'center'}}>
          {items.map(([href, label]) => {
            const isActive = active === label;
            return (
              <a key={label} href={href} style={{
                color: isActive ? 'white' : '#aaa',
                textDecoration:'none', padding:'0 14px', height:'64px',
                display:'flex', alignItems:'center', fontSize:'13px', fontWeight:500, letterSpacing:'0.04em',
                borderBottom: isActive ? '2px solid var(--red)' : '2px solid transparent',
                transition:'color 0.15s'
              }}
              onMouseEnter={e=>e.currentTarget.style.color='white'}
              onMouseLeave={e=>{if(!isActive)e.currentTarget.style.color='#aaa';}}
              >{label}</a>
            );
          })}
        </div>
        <a href="KBD_Order_Status.html" style={{ color:'#aaa', fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'6px' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Track Order
        </a>
        <button onClick={()=>window.location.href='KBD_Checkout.html'} style={{ background:'var(--red)', border:'none', cursor:'pointer', color:'white', padding:'8px 18px', borderRadius:'6px', fontWeight:600, fontSize:'13px', display:'flex', alignItems:'center', gap:'6px', fontFamily:'DM Sans, sans-serif' }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  const linkHref = (l) => {
    if (l === 'KBD Equipped') return 'KBD_Equipped.html';
    if (l === 'Will Make It' || l === 'Will Call Request') return 'KBD_Will_Make_It.html';
    if (l === 'About KBD') return 'KBD_About.html';
    if (l === 'Order Status') return 'KBD_Order_Status.html';
    return '#';
  };
  return (
    <footer style={{ background:'#080808', color:'rgba(255,255,255,0.5)' }}>
      <div style={{ maxWidth:'1440px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr', gap:'48px', padding:'56px 40px 48px', borderBottom:'1px solid #1a1a1a' }}>
          <div>
            <div style={{ marginBottom:'12px' }}>
              <img src="assets/kbd-logo.png" alt="KBD Body Kits" style={{height:'112px',width:'auto',display:'block'}}/>
            </div>
            <div style={{ fontSize:'12px', color:'#444', marginBottom:'4px' }}>Manufactured in Fullerton, CA</div>
            <a href="tel:18773993794" style={{display:'block',marginTop:'12px',marginBottom:'18px',color:'#aaa',fontFamily:'Barlow Condensed, sans-serif',fontWeight:700,fontSize:'18px',letterSpacing:'0.04em',textDecoration:'none'}}>(877) 399-3794</a>

            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'8px 12px', marginBottom:'18px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24"><defs><clipPath id="c1"><circle cx="12" cy="12" r="11"/></clipPath></defs><g clipPath="url(#c1)"><rect width="24" height="24" fill="#B22234"/><rect y="1.85" width="24" height="1.85" fill="#fff"/><rect y="5.54" width="24" height="1.85" fill="#fff"/><rect y="9.23" width="24" height="1.85" fill="#fff"/><rect y="12.92" width="24" height="1.85" fill="#fff"/><rect y="16.62" width="24" height="1.85" fill="#fff"/><rect y="20.31" width="24" height="1.85" fill="#fff"/><rect width="10" height="13" fill="#3C3B6E"/></g></svg>
              <div>
                <div style={{ color:'white', fontWeight:700, fontSize:'11px', letterSpacing:'0.06em', textTransform:'uppercase' }}>Proudly American Made</div>
              </div>
            </div>

            <div style={{display:'flex', gap:'8px'}}>
              {[
                { name:'Instagram', href:'https://instagram.com/kbdbodykits', icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>) },
                { name:'Facebook',  href:'https://facebook.com/kbdbodykits',  icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>) },
                { name:'YouTube',   href:'https://youtube.com/@kbdbodykits',  icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/></svg>) },
                { name:'TikTok',    href:'https://tiktok.com/@kbdbodykits',   icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V7.6a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.99z"/></svg>) },
              ].map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener" aria-label={`KBD on ${s.name}`} title={s.name} style={{width:'34px',height:'34px',borderRadius:'8px',background:'#1a1a1a',border:'1px solid #2a2a2a',display:'flex',alignItems:'center',justifyContent:'center',color:'#888',textDecoration:'none',transition:'all 0.15s'}}>{s.icon}</a>
              ))}
            </div>
          </div>

          {[
            { title:'Shop',    links:['Body Kits','Front Bumpers','Rear Bumpers','Side Skirts','Roof & Spoilers','Fender Flares','Universal'] },
            { title:'Company', links:['About KBD','KBD Equipped','Will Make It','Dealers & Distributors','Limited Lifetime Warranty'] },
            { title:'Support', links:['Order Status','Contact Us','Returns & Cancellations','Unfolding Guide','Paint Prep Guide','File A Claim'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ color:'white', fontWeight:700, fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'18px' }}>{col.title}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {col.links.map(l => (
                  <a key={l} href={linkHref(l)} style={{ color:'rgba(255,255,255,0.35)', fontSize:'13px', textDecoration:'none', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.target.style.color='rgba(255,255,255,0.85)'}
                    onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 40px', fontSize:'12px', color:'#333', flexWrap:'wrap', gap:'12px' }}>
          <span>© {new Date().getFullYear()} KBD Body Kits. All rights reserved. Manufactured in Fullerton, CA.</span>
          <div style={{ display:'flex', gap:'24px' }}>
            {['Privacy Policy','Terms of Service','Accessibility'].map(l => (
              <a key={l} href="#" style={{ color:'#333', textDecoration:'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
