import { Section } from './types';

// Helper to generate unique IDs for scoped CSS
const uid = (prefix: string) => `qs-${prefix}`;

export const sectionsData: Section[] = [
  // ========== ANNOUNCEMENT BARS / MARQUEES (Premium Scrolling Text) ==========
  {
    id: 'marquee-gold',
    name: 'Marquee - Gold Luxe',
    category: 'Announcement',
    description: 'Premium scrolling text with gold gradient on black',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'FREE SHIPPING ON ORDERS $100+' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'PREMIUM QUALITY GUARANTEED' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'EASY 30-DAY RETURNS' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '20' },
    ],
    generateHtml: (v) => `<div class="${uid('mgold')}" style="background:#000;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('mgold')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mgold')}-track { display: flex; animation: ${uid('mgold')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mgold')}-track:hover { animation-play-state: paused; }
    .${uid('mgold')}-item { display: flex; align-items: center; gap: 48px; padding: 14px 48px; white-space: nowrap; }
    .${uid('mgold')}-item span { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .${uid('mgold')}-item::after { content: '✦'; font-size: 8px; background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    @keyframes ${uid('mgold')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('mgold')}-track">
    <div class="${uid('mgold')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mgold')}-item"><span>${v.text3}</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-silver',
    name: 'Marquee - Platinum',
    category: 'Announcement',
    description: 'Elegant scrolling text with silver/platinum gradient',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'COMPLIMENTARY SHIPPING WORLDWIDE' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'HANDCRAFTED WITH PRECISION' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'LIFETIME WARRANTY' },
      { id: 'bgColor', label: 'Background', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '25' },
    ],
    generateHtml: (v) => `<div class="${uid('msilv')}" style="background:${v.bgColor};overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('msilv')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('msilv')}-track { display: flex; animation: ${uid('msilv')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('msilv')}-item { display: flex; align-items: center; gap: 40px; padding: 12px 40px; white-space: nowrap; }
    .${uid('msilv')}-item span { font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; background: linear-gradient(135deg, #C0C0C0, #FFFFFF, #A8A8A8, #E8E8E8, #B0B0B0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .${uid('msilv')}-item::after { content: '—'; padding: 0 20px; background: linear-gradient(135deg, #C0C0C0, #FFFFFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    @keyframes ${uid('msilv')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('msilv')}-track">
    <div class="${uid('msilv')}-item"><span>${v.text1}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text2}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text3}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text1}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text2}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text3}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text1}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text2}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text3}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text1}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text2}</span></div>
    <div class="${uid('msilv')}-item"><span>${v.text3}</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-rose',
    name: 'Marquee - Rose Gold',
    category: 'Announcement',
    description: 'Luxurious rose gold gradient scrolling text',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'NEW COLLECTION NOW LIVE' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'EXCLUSIVE MEMBERS RECEIVE 15% OFF' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'FREE EXPRESS SHIPPING' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '22' },
    ],
    generateHtml: (v) => `<div class="${uid('mrose')}" style="background:#1a1a1a;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('mrose')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mrose')}-track { display: flex; animation: ${uid('mrose')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mrose')}-item { display: flex; align-items: center; gap: 36px; padding: 13px 36px; white-space: nowrap; }
    .${uid('mrose')}-item span { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; background: linear-gradient(135deg, #B76E79, #E8B4B8, #DDA0A0, #F5D0D0, #C9A0A0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .${uid('mrose')}-item::after { content: '◆'; font-size: 6px; background: linear-gradient(135deg, #B76E79, #E8B4B8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    @keyframes ${uid('mrose')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('mrose')}-track">
    <div class="${uid('mrose')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mrose')}-item"><span>${v.text3}</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-bronze',
    name: 'Marquee - Bronze',
    category: 'Announcement',
    description: 'Rich bronze gradient on deep brown background',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'ARTISAN CRAFTSMANSHIP' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'SUSTAINABLE MATERIALS' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'HERITAGE SINCE 1985' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '24' },
    ],
    generateHtml: (v) => `<div class="${uid('mbrnz')}" style="background:#1c1410;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('mbrnz')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mbrnz')}-track { display: flex; animation: ${uid('mbrnz')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mbrnz')}-item { display: flex; align-items: center; gap: 44px; padding: 14px 44px; white-space: nowrap; }
    .${uid('mbrnz')}-item span { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; background: linear-gradient(135deg, #CD7F32, #E6BE8A, #B87333, #DAA06D, #8B4513); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .${uid('mbrnz')}-item::after { content: '●'; font-size: 5px; background: linear-gradient(135deg, #CD7F32, #E6BE8A); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    @keyframes ${uid('mbrnz')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('mbrnz')}-track">
    <div class="${uid('mbrnz')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mbrnz')}-item"><span>${v.text3}</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-minimal',
    name: 'Marquee - Clean White',
    category: 'Announcement',
    description: 'Minimal white bar with elegant black text',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'FREE SHIPPING OVER $150' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'EASY RETURNS' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'SECURE CHECKOUT' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '30' },
    ],
    generateHtml: (v) => `<div class="${uid('mmin')}" style="background:#fff;border-bottom:1px solid #eee;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('mmin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mmin')}-track { display: flex; animation: ${uid('mmin')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mmin')}-item { display: flex; align-items: center; gap: 48px; padding: 10px 48px; white-space: nowrap; }
    .${uid('mmin')}-item span { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #1a1a1a; }
    .${uid('mmin')}-item::after { content: '·'; font-size: 16px; color: #ccc; }
    @keyframes ${uid('mmin')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('mmin')}-track">
    <div class="${uid('mmin')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text3}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text1}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text2}</span></div>
    <div class="${uid('mmin')}-item"><span>${v.text3}</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-reverse',
    name: 'Marquee - Dual Direction',
    category: 'Announcement',
    description: 'Two rows scrolling in opposite directions',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Row 1 Text', type: 'text', defaultValue: 'PREMIUM QUALITY ✦ HANDCRAFTED ✦ SUSTAINABLE ✦ TIMELESS DESIGN ✦' },
      { id: 'text2', label: 'Row 2 Text', type: 'text', defaultValue: 'FREE SHIPPING ✦ EASY RETURNS ✦ SECURE CHECKOUT ✦ 24/7 SUPPORT ✦' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '15' },
    ],
    generateHtml: (v) => `<div class="${uid('mdual')}" style="background:#000;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('mdual')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mdual')}-row { display: flex; width: max-content; padding: 8px 0; }
    .${uid('mdual')}-row:first-child { animation: ${uid('mdual')}-left ${v.speed}s linear infinite; border-bottom: 1px solid #222; }
    .${uid('mdual')}-row:last-child { animation: ${uid('mdual')}-right ${v.speed}s linear infinite; }
    .${uid('mdual')}-row span { font-size: 10px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #888; padding: 0 16px; white-space: nowrap; }
    @keyframes ${uid('mdual')}-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mdual')}-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  </style>
  <div class="${uid('mdual')}-row"><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span></div>
  <div class="${uid('mdual')}-row"><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span></div>
</div>`
  },

  // ========== STATIC ANNOUNCEMENT BARS ==========
  {
    id: 'bar-gradient',
    name: 'Bar - Gradient Accent',
    category: 'Announcement',
    description: 'Static announcement with subtle gradient border',
    thumbnail: '',
    fields: [
      { id: 'text', label: 'Announcement Text', type: 'text', defaultValue: 'Use code WELCOME15 for 15% off your first order' },
      { id: 'linkText', label: 'Link Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'linkUrl', label: 'Link URL', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('bgrad')}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('bgrad')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bgrad')}-wrap { background: linear-gradient(90deg, #000, #1a1a1a, #000); padding: 12px 24px; display: flex; justify-content: center; align-items: center; gap: 16px; border-bottom: 1px solid; border-image: linear-gradient(90deg, transparent, #333, transparent) 1; }
    .${uid('bgrad')}-wrap span { font-size: 13px; color: #fff; letter-spacing: 0.02em; }
    .${uid('bgrad')}-wrap a { font-size: 13px; color: #fff; text-decoration: underline; text-underline-offset: 3px; font-weight: 500; transition: opacity 0.2s; }
    .${uid('bgrad')}-wrap a:hover { opacity: 0.7; }
  </style>
  <div class="${uid('bgrad')}-wrap">
    <span>${v.text}</span>
    <a href="${v.linkUrl}">${v.linkText}</a>
  </div>
</div>`
  },

  // ========== TRUST & SOCIAL PROOF ==========
  {
    id: 'trust-logos',
    name: 'Trust - Featured In',
    category: 'Trust',
    description: 'Premium "As Seen In" logo showcase',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'AS FEATURED IN' },
      { id: 'logo1', label: 'Logo 1 URL', type: 'image', defaultValue: '' },
      { id: 'logo2', label: 'Logo 2 URL', type: 'image', defaultValue: '' },
      { id: 'logo3', label: 'Logo 3 URL', type: 'image', defaultValue: '' },
      { id: 'logo4', label: 'Logo 4 URL', type: 'image', defaultValue: '' },
      { id: 'logo5', label: 'Logo 5 URL', type: 'image', defaultValue: '' },
    ],
    generateHtml: (v) => `<div class="${uid('tlogo')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('tlogo')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tlogo')}-wrap { max-width: 1200px; margin: 0 auto; padding: 48px 40px; text-align: center; }
    .${uid('tlogo')} h3 { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; color: #999; margin-bottom: 32px; }
    .${uid('tlogo')}-logos { display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; }
    .${uid('tlogo')}-logos img { height: 24px; width: auto; opacity: 0.4; filter: grayscale(100%); transition: all 0.3s; }
    .${uid('tlogo')}-logos img:hover { opacity: 0.8; }
    @media (max-width: 768px) { .${uid('tlogo')}-logos { gap: 32px; } .${uid('tlogo')}-logos img { height: 20px; } }
  </style>
  <div class="${uid('tlogo')}-wrap">
    <h3>${v.headline}</h3>
    <div class="${uid('tlogo')}-logos">
      ${v.logo1 ? `<img src="${v.logo1}" alt="Featured">` : '<span style="color:#ccc;font-size:11px;letter-spacing:0.1em;">VOGUE</span>'}
      ${v.logo2 ? `<img src="${v.logo2}" alt="Featured">` : '<span style="color:#ccc;font-size:11px;letter-spacing:0.1em;">FORBES</span>'}
      ${v.logo3 ? `<img src="${v.logo3}" alt="Featured">` : '<span style="color:#ccc;font-size:11px;letter-spacing:0.1em;">ELLE</span>'}
      ${v.logo4 ? `<img src="${v.logo4}" alt="Featured">` : '<span style="color:#ccc;font-size:11px;letter-spacing:0.1em;">GQ</span>'}
      ${v.logo5 ? `<img src="${v.logo5}" alt="Featured">` : '<span style="color:#ccc;font-size:11px;letter-spacing:0.1em;">HYPEBEAST</span>'}
    </div>
  </div>
</div>`
  },
  {
    id: 'trust-stats',
    name: 'Trust - Stats Bar',
    category: 'Trust',
    description: 'Clean statistics display with numbers',
    thumbnail: '',
    fields: [
      { id: 'stat1Num', label: 'Stat 1 Number', type: 'text', defaultValue: '50K+' },
      { id: 'stat1Label', label: 'Stat 1 Label', type: 'text', defaultValue: 'Happy Customers' },
      { id: 'stat2Num', label: 'Stat 2 Number', type: 'text', defaultValue: '4.9' },
      { id: 'stat2Label', label: 'Stat 2 Label', type: 'text', defaultValue: 'Average Rating' },
      { id: 'stat3Num', label: 'Stat 3 Number', type: 'text', defaultValue: '12' },
      { id: 'stat3Label', label: 'Stat 3 Label', type: 'text', defaultValue: 'Countries' },
      { id: 'stat4Num', label: 'Stat 4 Number', type: 'text', defaultValue: '100%' },
      { id: 'stat4Label', label: 'Stat 4 Label', type: 'text', defaultValue: 'Satisfaction' },
    ],
    generateHtml: (v) => `<div class="${uid('tstats')}" style="background:#fff;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('tstats')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tstats')}-wrap { max-width: 1000px; margin: 0 auto; padding: 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
    .${uid('tstats')}-item strong { display: block; font-size: 32px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.02em; }
    .${uid('tstats')}-item span { font-size: 12px; color: #888; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 4px; display: block; }
    @media (max-width: 768px) { .${uid('tstats')}-wrap { grid-template-columns: repeat(2, 1fr); gap: 24px; } .${uid('tstats')}-item strong { font-size: 24px; } }
  </style>
  <div class="${uid('tstats')}-wrap">
    <div class="${uid('tstats')}-item"><strong>${v.stat1Num}</strong><span>${v.stat1Label}</span></div>
    <div class="${uid('tstats')}-item"><strong>${v.stat2Num}</strong><span>${v.stat2Label}</span></div>
    <div class="${uid('tstats')}-item"><strong>${v.stat3Num}</strong><span>${v.stat3Label}</span></div>
    <div class="${uid('tstats')}-item"><strong>${v.stat4Num}</strong><span>${v.stat4Label}</span></div>
  </div>
</div>`
  },
  {
    id: 'trust-badges',
    name: 'Trust - Icon Badges',
    category: 'Trust',
    description: 'Minimalist trust badges with clean icons',
    thumbnail: '',
    fields: [
      { id: 'badge1', label: 'Badge 1 Text', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'badge2', label: 'Badge 2 Text', type: 'text', defaultValue: 'Secure Payment' },
      { id: 'badge3', label: 'Badge 3 Text', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'badge4', label: 'Badge 4 Text', type: 'text', defaultValue: '24/7 Support' },
    ],
    generateHtml: (v) => `<div class="${uid('tbadge')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('tbadge')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tbadge')}-wrap { max-width: 1200px; margin: 0 auto; padding: 48px 40px; display: flex; justify-content: center; gap: 64px; flex-wrap: wrap; }
    .${uid('tbadge')}-item { display: flex; align-items: center; gap: 12px; }
    .${uid('tbadge')}-icon { width: 40px; height: 40px; border: 1px solid #e5e5e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .${uid('tbadge')}-item span { font-size: 13px; font-weight: 500; color: #1a1a1a; }
    @media (max-width: 768px) { .${uid('tbadge')}-wrap { gap: 32px; } }
  </style>
  <div class="${uid('tbadge')}-wrap">
    <div class="${uid('tbadge')}-item"><div class="${uid('tbadge')}-icon">🚚</div><span>${v.badge1}</span></div>
    <div class="${uid('tbadge')}-item"><div class="${uid('tbadge')}-icon">🔒</div><span>${v.badge2}</span></div>
    <div class="${uid('tbadge')}-item"><div class="${uid('tbadge')}-icon">↩️</div><span>${v.badge3}</span></div>
    <div class="${uid('tbadge')}-item"><div class="${uid('tbadge')}-icon">💬</div><span>${v.badge4}</span></div>
  </div>
</div>`
  },
  {
    id: 'trust-reviews-count',
    name: 'Trust - Review Summary',
    category: 'Trust',
    description: 'Elegant review count with star rating',
    thumbnail: '',
    fields: [
      { id: 'rating', label: 'Rating', type: 'text', defaultValue: '4.9' },
      { id: 'count', label: 'Review Count', type: 'text', defaultValue: '2,847' },
      { id: 'platform', label: 'Platform', type: 'text', defaultValue: 'Based on verified reviews' },
    ],
    generateHtml: (v) => `<div class="${uid('trev')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('trev')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('trev')}-wrap { padding: 32px 40px; display: flex; justify-content: center; align-items: center; gap: 24px; }
    .${uid('trev')}-stars { color: #1a1a1a; font-size: 18px; letter-spacing: 2px; }
    .${uid('trev')}-info { display: flex; flex-direction: column; gap: 2px; }
    .${uid('trev')}-rating { font-size: 24px; font-weight: 700; color: #1a1a1a; }
    .${uid('trev')}-rating span { font-size: 14px; font-weight: 400; color: #666; }
    .${uid('trev')}-platform { font-size: 11px; color: #999; letter-spacing: 0.05em; }
  </style>
  <div class="${uid('trev')}-wrap">
    <div class="${uid('trev')}-stars">★★★★★</div>
    <div class="${uid('trev')}-info">
      <div class="${uid('trev')}-rating">${v.rating} <span>/ 5 from ${v.count} reviews</span></div>
      <div class="${uid('trev')}-platform">${v.platform}</div>
    </div>
  </div>
</div>`
  },

  // ========== FEATURES ==========
  {
    id: 'features-minimal',
    name: 'Features - Minimal Grid',
    category: 'Features',
    description: 'Clean 3-column feature grid with numbers',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Premium Materials' },
      { id: 'feature1Desc', label: 'Feature 1 Description', type: 'textarea', defaultValue: 'Sourced from the finest suppliers worldwide, each piece meets our exacting standards.' },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Expert Craftsmanship' },
      { id: 'feature2Desc', label: 'Feature 2 Description', type: 'textarea', defaultValue: 'Handcrafted by skilled artisans with decades of experience in their craft.' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Timeless Design' },
      { id: 'feature3Desc', label: 'Feature 3 Description', type: 'textarea', defaultValue: 'Classic aesthetics that transcend trends, designed to last for generations.' },
    ],
    generateHtml: (v) => `<div class="${uid('fmin')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('fmin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fmin')}-wrap { max-width: 1100px; margin: 0 auto; padding: 80px 40px; }
    .${uid('fmin')} h2 { font-size: 32px; font-weight: 600; text-align: center; margin-bottom: 64px; color: #1a1a1a; letter-spacing: -0.02em; }
    .${uid('fmin')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }
    .${uid('fmin')}-item { text-align: center; }
    .${uid('fmin')}-num { font-size: 48px; font-weight: 200; color: #e5e5e5; margin-bottom: 16px; }
    .${uid('fmin')}-item h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('fmin')}-item p { font-size: 14px; line-height: 1.7; color: #666; }
    @media (max-width: 768px) { .${uid('fmin')}-grid { grid-template-columns: 1fr; gap: 40px; } }
  </style>
  <div class="${uid('fmin')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('fmin')}-grid">
      <div class="${uid('fmin')}-item"><div class="${uid('fmin')}-num">01</div><h3>${v.feature1Title}</h3><p>${v.feature1Desc}</p></div>
      <div class="${uid('fmin')}-item"><div class="${uid('fmin')}-num">02</div><h3>${v.feature2Title}</h3><p>${v.feature2Desc}</p></div>
      <div class="${uid('fmin')}-item"><div class="${uid('fmin')}-num">03</div><h3>${v.feature3Title}</h3><p>${v.feature3Desc}</p></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'features-split',
    name: 'Features - Split Layout',
    category: 'Features',
    description: 'Large headline with stacked features on the right',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Designed for Excellence' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Every detail matters. From concept to creation, we obsess over quality.' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Precision Engineering' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Sustainable Materials' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Lifetime Warranty' },
      { id: 'feature4', label: 'Feature 4', type: 'text', defaultValue: 'Global Shipping' },
    ],
    generateHtml: (v) => `<div class="${uid('fsplit')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('fsplit')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fsplit')}-wrap { max-width: 1200px; margin: 0 auto; padding: 100px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .${uid('fsplit')} h2 { font-size: 48px; font-weight: 600; color: #1a1a1a; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 24px; }
    .${uid('fsplit')}-left p { font-size: 16px; line-height: 1.7; color: #666; }
    .${uid('fsplit')}-list { display: flex; flex-direction: column; gap: 20px; }
    .${uid('fsplit')}-list li { display: flex; align-items: center; gap: 16px; font-size: 16px; color: #1a1a1a; padding: 20px 24px; background: #fff; border-radius: 8px; }
    .${uid('fsplit')}-list li::before { content: '→'; color: #999; }
    @media (max-width: 768px) { .${uid('fsplit')}-wrap { grid-template-columns: 1fr; gap: 48px; } .${uid('fsplit')} h2 { font-size: 36px; } }
  </style>
  <div class="${uid('fsplit')}-wrap">
    <div class="${uid('fsplit')}-left">
      <h2>${v.headline}</h2>
      <p>${v.subheadline}</p>
    </div>
    <ul class="${uid('fsplit')}-list">
      <li>${v.feature1}</li>
      <li>${v.feature2}</li>
      <li>${v.feature3}</li>
      <li>${v.feature4}</li>
    </ul>
  </div>
</div>`
  },
  {
    id: 'features-icons',
    name: 'Features - Icon Row',
    category: 'Features',
    description: 'Horizontal row of features with subtle icons',
    thumbnail: '',
    fields: [
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Easy Returns' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'feature4', label: 'Feature 4', type: 'text', defaultValue: 'Quality Guarantee' },
    ],
    generateHtml: (v) => `<div class="${uid('ficon')}" style="background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('ficon')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ficon')}-wrap { max-width: 1200px; margin: 0 auto; padding: 24px 40px; display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
    .${uid('ficon')}-item { display: flex; align-items: center; gap: 10px; color: #fff; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; }
    .${uid('ficon')}-item::before { content: '✓'; font-size: 11px; opacity: 0.6; }
    @media (max-width: 768px) { .${uid('ficon')}-wrap { gap: 24px; } .${uid('ficon')}-item { font-size: 12px; } }
  </style>
  <div class="${uid('ficon')}-wrap">
    <div class="${uid('ficon')}-item">${v.feature1}</div>
    <div class="${uid('ficon')}-item">${v.feature2}</div>
    <div class="${uid('ficon')}-item">${v.feature3}</div>
    <div class="${uid('ficon')}-item">${v.feature4}</div>
  </div>
</div>`
  },

  // ========== TESTIMONIALS ==========
  {
    id: 'testimonial-single',
    name: 'Testimonial - Elegant Single',
    category: 'Testimonials',
    description: 'Large centered testimonial with refined typography',
    thumbnail: '',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'The attention to detail is remarkable. Every piece feels like it was made specifically for me. This is what luxury should feel like.' },
      { id: 'name', label: 'Customer Name', type: 'text', defaultValue: 'Alexandra Chen' },
      { id: 'title', label: 'Title', type: 'text', defaultValue: 'Verified Buyer' },
    ],
    generateHtml: (v) => `<div class="${uid('tsing')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('tsing')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tsing')}-wrap { max-width: 800px; margin: 0 auto; padding: 100px 40px; text-align: center; }
    .${uid('tsing')}-quote { font-size: 11px; letter-spacing: 0.2em; color: #999; margin-bottom: 32px; }
    .${uid('tsing')} blockquote { font-size: 28px; line-height: 1.5; color: #1a1a1a; font-weight: 300; margin-bottom: 40px; font-style: italic; }
    .${uid('tsing')}-author { font-size: 14px; }
    .${uid('tsing')}-name { font-weight: 600; color: #1a1a1a; }
    .${uid('tsing')}-title { color: #888; margin-top: 4px; }
    @media (max-width: 768px) { .${uid('tsing')} blockquote { font-size: 22px; } }
  </style>
  <div class="${uid('tsing')}-wrap">
    <div class="${uid('tsing')}-quote">★★★★★</div>
    <blockquote>"${v.quote}"</blockquote>
    <div class="${uid('tsing')}-author">
      <div class="${uid('tsing')}-name">${v.name}</div>
      <div class="${uid('tsing')}-title">${v.title}</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'testimonial-cards',
    name: 'Testimonial - Card Grid',
    category: 'Testimonials',
    description: 'Three elegant testimonial cards',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'What Our Customers Say' },
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'Exceptional quality and fast shipping. Exceeded all expectations.' },
      { id: 'name1', label: 'Name 1', type: 'text', defaultValue: 'Michael R.' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'The best purchase I\'ve made this year. Worth every penny.' },
      { id: 'name2', label: 'Name 2', type: 'text', defaultValue: 'Sarah L.' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'Customer service was incredible. They truly care about their customers.' },
      { id: 'name3', label: 'Name 3', type: 'text', defaultValue: 'James K.' },
    ],
    generateHtml: (v) => `<div class="${uid('tcard')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('tcard')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tcard')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
    .${uid('tcard')} h2 { font-size: 32px; font-weight: 600; text-align: center; margin-bottom: 56px; color: #1a1a1a; }
    .${uid('tcard')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('tcard')}-item { background: #fff; padding: 32px; border-radius: 12px; border: 1px solid #eee; }
    .${uid('tcard')}-stars { color: #1a1a1a; font-size: 12px; letter-spacing: 4px; margin-bottom: 20px; }
    .${uid('tcard')}-item p { font-size: 15px; line-height: 1.7; color: #444; margin-bottom: 24px; }
    .${uid('tcard')}-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
    @media (max-width: 768px) { .${uid('tcard')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('tcard')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('tcard')}-grid">
      <div class="${uid('tcard')}-item"><div class="${uid('tcard')}-stars">★★★★★</div><p>"${v.quote1}"</p><div class="${uid('tcard')}-name">${v.name1}</div></div>
      <div class="${uid('tcard')}-item"><div class="${uid('tcard')}-stars">★★★★★</div><p>"${v.quote2}"</p><div class="${uid('tcard')}-name">${v.name2}</div></div>
      <div class="${uid('tcard')}-item"><div class="${uid('tcard')}-stars">★★★★★</div><p>"${v.quote3}"</p><div class="${uid('tcard')}-name">${v.name3}</div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'testimonial-marquee',
    name: 'Testimonial - Scrolling Reviews',
    category: 'Testimonials',
    description: 'Auto-scrolling testimonial marquee',
    thumbnail: '',
    fields: [
      { id: 'quote1', label: 'Review 1', type: 'text', defaultValue: '"Absolutely love it!" — Sarah M.' },
      { id: 'quote2', label: 'Review 2', type: 'text', defaultValue: '"Best purchase ever" — Mike R.' },
      { id: 'quote3', label: 'Review 3', type: 'text', defaultValue: '"Exceptional quality" — Emma L.' },
      { id: 'quote4', label: 'Review 4', type: 'text', defaultValue: '"Highly recommend" — James K.' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '30' },
    ],
    generateHtml: (v) => `<div class="${uid('tmarq')}" style="background:#000;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('tmarq')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tmarq')}-track { display: flex; animation: ${uid('tmarq')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('tmarq')}-item { padding: 16px 40px; white-space: nowrap; display: flex; align-items: center; gap: 32px; }
    .${uid('tmarq')}-item span { font-size: 14px; color: #fff; font-style: italic; }
    .${uid('tmarq')}-item::after { content: '★'; font-size: 10px; color: #444; }
    @keyframes ${uid('tmarq')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('tmarq')}-track">
    <div class="${uid('tmarq')}-item"><span>${v.quote1}</span></div>
    <div class="${uid('tmarq')}-item"><span>${v.quote2}</span></div>
    <div class="${uid('tmarq')}-item"><span>${v.quote3}</span></div>
    <div class="${uid('tmarq')}-item"><span>${v.quote4}</span></div>
    <div class="${uid('tmarq')}-item"><span>${v.quote1}</span></div>
    <div class="${uid('tmarq')}-item"><span>${v.quote2}</span></div>
    <div class="${uid('tmarq')}-item"><span>${v.quote3}</span></div>
    <div class="${uid('tmarq')}-item"><span>${v.quote4}</span></div>
  </div>
</div>`
  },

  // ========== CTA & NEWSLETTER ==========
  {
    id: 'cta-minimal',
    name: 'CTA - Minimal Newsletter',
    category: 'CTA',
    description: 'Clean email signup with elegant styling',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Stay in the Know' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Subscribe for exclusive access to new releases and special offers.' },
      { id: 'placeholder', label: 'Input Placeholder', type: 'text', defaultValue: 'Enter your email' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Subscribe' },
    ],
    generateHtml: (v) => `<div class="${uid('ctamin')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('ctamin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctamin')}-wrap { max-width: 600px; margin: 0 auto; padding: 80px 40px; text-align: center; }
    .${uid('ctamin')} h2 { font-size: 28px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('ctamin')} p { font-size: 15px; color: #666; margin-bottom: 32px; }
    .${uid('ctamin')}-form { display: flex; gap: 12px; max-width: 440px; margin: 0 auto; }
    .${uid('ctamin')}-form input { flex: 1; padding: 16px 20px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #fff; }
    .${uid('ctamin')}-form input:focus { outline: none; border-color: #1a1a1a; }
    .${uid('ctamin')}-form button { padding: 16px 32px; background: #1a1a1a; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    .${uid('ctamin')}-form button:hover { background: #333; }
    @media (max-width: 480px) { .${uid('ctamin')}-form { flex-direction: column; } }
  </style>
  <div class="${uid('ctamin')}-wrap">
    <h2>${v.headline}</h2>
    <p>${v.subheadline}</p>
    <form class="${uid('ctamin')}-form" onsubmit="return false;">
      <input type="email" placeholder="${v.placeholder}" required>
      <button type="submit">${v.buttonText}</button>
    </form>
  </div>
</div>`
  },
  {
    id: 'cta-dark',
    name: 'CTA - Dark Luxe',
    category: 'CTA',
    description: 'Premium dark CTA with gold accents',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Join the Inner Circle' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Be first to know about exclusive drops and members-only offers.' },
      { id: 'placeholder', label: 'Input Placeholder', type: 'text', defaultValue: 'Your email address' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Get Access' },
    ],
    generateHtml: (v) => `<div class="${uid('ctadark')}" style="background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('ctadark')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctadark')}-wrap { max-width: 600px; margin: 0 auto; padding: 100px 40px; text-align: center; }
    .${uid('ctadark')} h2 { font-size: 32px; font-weight: 600; color: #fff; margin-bottom: 16px; letter-spacing: -0.01em; }
    .${uid('ctadark')} p { font-size: 15px; color: #888; margin-bottom: 40px; }
    .${uid('ctadark')}-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; }
    .${uid('ctadark')}-form input { flex: 1; padding: 18px 24px; border: 1px solid #333; border-radius: 4px; font-size: 14px; background: transparent; color: #fff; }
    .${uid('ctadark')}-form input:focus { outline: none; border-color: #666; }
    .${uid('ctadark')}-form input::placeholder { color: #666; }
    .${uid('ctadark')}-form button { padding: 18px 36px; background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728); color: #000; border: none; border-radius: 4px; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.05em; text-transform: uppercase; transition: opacity 0.2s; }
    .${uid('ctadark')}-form button:hover { opacity: 0.9; }
    @media (max-width: 480px) { .${uid('ctadark')}-form { flex-direction: column; } }
  </style>
  <div class="${uid('ctadark')}-wrap">
    <h2>${v.headline}</h2>
    <p>${v.subheadline}</p>
    <form class="${uid('ctadark')}-form" onsubmit="return false;">
      <input type="email" placeholder="${v.placeholder}" required>
      <button type="submit">${v.buttonText}</button>
    </form>
  </div>
</div>`
  },
  {
    id: 'cta-split',
    name: 'CTA - Split Banner',
    category: 'CTA',
    description: 'Two-column CTA with bold typography',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ready to elevate your style?' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('ctasplit')}" style="background:#1a1a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('ctasplit')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctasplit')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
    .${uid('ctasplit')} h2 { font-size: 32px; font-weight: 600; color: #fff; letter-spacing: -0.01em; }
    .${uid('ctasplit')} a { display: inline-block; padding: 18px 48px; border: 1px solid #fff; color: #fff; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; }
    .${uid('ctasplit')} a:hover { background: #fff; color: #1a1a1a; }
    @media (max-width: 768px) { .${uid('ctasplit')}-wrap { flex-direction: column; text-align: center; } .${uid('ctasplit')} h2 { font-size: 24px; } }
  </style>
  <div class="${uid('ctasplit')}-wrap">
    <h2>${v.headline}</h2>
    <a href="${v.buttonUrl}">${v.buttonText}</a>
  </div>
</div>`
  },

  // ========== FAQ ==========
  {
    id: 'faq-minimal',
    name: 'FAQ - Minimal Accordion',
    category: 'FAQ',
    description: 'Clean expandable FAQ with smooth animations',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'Frequently Asked Questions' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'What is your shipping policy?' },
      { id: 'a1', label: 'Answer 1', type: 'textarea', defaultValue: 'We offer free standard shipping on all orders over $100. Express shipping is available for an additional fee. All orders are processed within 1-2 business days.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'What is your return policy?' },
      { id: 'a2', label: 'Answer 2', type: 'textarea', defaultValue: 'We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging. Contact our support team to initiate a return.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'How can I track my order?' },
      { id: 'a3', label: 'Answer 3', type: 'textarea', defaultValue: 'Once your order ships, you\'ll receive an email with tracking information. You can also track your order through your account dashboard.' },
      { id: 'q4', label: 'Question 4', type: 'text', defaultValue: 'Do you ship internationally?' },
      { id: 'a4', label: 'Answer 4', type: 'textarea', defaultValue: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Duties and taxes may apply.' },
    ],
    generateHtml: (v) => `<div class="${uid('faqmin')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('faqmin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faqmin')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 40px; }
    .${uid('faqmin')} h2 { font-size: 32px; font-weight: 600; text-align: center; margin-bottom: 56px; color: #1a1a1a; }
    .${uid('faqmin')}-item { border-bottom: 1px solid #eee; }
    .${uid('faqmin')}-q { padding: 24px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
    .${uid('faqmin')}-q h3 { font-size: 16px; font-weight: 500; color: #1a1a1a; }
    .${uid('faqmin')}-q span { font-size: 20px; color: #999; transition: transform 0.3s; }
    .${uid('faqmin')}-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
    .${uid('faqmin')}-a p { padding: 0 0 24px; font-size: 15px; line-height: 1.7; color: #666; }
    .${uid('faqmin')}-item.open .${uid('faqmin')}-q span { transform: rotate(45deg); }
    .${uid('faqmin')}-item.open .${uid('faqmin')}-a { max-height: 200px; }
  </style>
  <div class="${uid('faqmin')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faqmin')}-item"><div class="${uid('faqmin')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q1}</h3><span>+</span></div><div class="${uid('faqmin')}-a"><p>${v.a1}</p></div></div>
    <div class="${uid('faqmin')}-item"><div class="${uid('faqmin')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q2}</h3><span>+</span></div><div class="${uid('faqmin')}-a"><p>${v.a2}</p></div></div>
    <div class="${uid('faqmin')}-item"><div class="${uid('faqmin')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q3}</h3><span>+</span></div><div class="${uid('faqmin')}-a"><p>${v.a3}</p></div></div>
    <div class="${uid('faqmin')}-item"><div class="${uid('faqmin')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q4}</h3><span>+</span></div><div class="${uid('faqmin')}-a"><p>${v.a4}</p></div></div>
  </div>
</div>`
  },
  {
    id: 'faq-cards',
    name: 'FAQ - Card Grid',
    category: 'FAQ',
    description: 'FAQ displayed in a clean card layout',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'Common Questions' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'Shipping' },
      { id: 'a1', label: 'Answer 1', type: 'textarea', defaultValue: 'Free shipping on orders over $100. Standard delivery 3-5 business days.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'Returns' },
      { id: 'a2', label: 'Answer 2', type: 'textarea', defaultValue: '30-day hassle-free returns on all unworn items in original packaging.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'Sizing' },
      { id: 'a3', label: 'Answer 3', type: 'textarea', defaultValue: 'Check our detailed size guide or contact us for personalized recommendations.' },
      { id: 'q4', label: 'Question 4', type: 'text', defaultValue: 'Support' },
      { id: 'a4', label: 'Answer 4', type: 'textarea', defaultValue: '24/7 customer support via chat, email, or phone. We\'re here to help.' },
    ],
    generateHtml: (v) => `<div class="${uid('faqcard')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('faqcard')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faqcard')}-wrap { max-width: 1000px; margin: 0 auto; padding: 80px 40px; }
    .${uid('faqcard')} h2 { font-size: 32px; font-weight: 600; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('faqcard')}-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .${uid('faqcard')}-item { background: #fff; padding: 28px; border-radius: 12px; border: 1px solid #eee; }
    .${uid('faqcard')}-item h3 { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('faqcard')}-item p { font-size: 14px; line-height: 1.6; color: #666; }
    @media (max-width: 768px) { .${uid('faqcard')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('faqcard')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faqcard')}-grid">
      <div class="${uid('faqcard')}-item"><h3>${v.q1}</h3><p>${v.a1}</p></div>
      <div class="${uid('faqcard')}-item"><h3>${v.q2}</h3><p>${v.a2}</p></div>
      <div class="${uid('faqcard')}-item"><h3>${v.q3}</h3><p>${v.a3}</p></div>
      <div class="${uid('faqcard')}-item"><h3>${v.q4}</h3><p>${v.a4}</p></div>
    </div>
  </div>
</div>`
  },

  // ========== HERO SECTIONS (Only 3 - 10% of total) ==========
  {
    id: 'hero-minimal',
    name: 'Hero - Minimal Text',
    category: 'Hero',
    description: 'Ultra-clean hero with large typography, no image',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Elevate Your Everyday' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Premium essentials designed for modern living' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Explore Collection' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('heromin')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('heromin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('heromin')}-wrap { max-width: 900px; margin: 0 auto; padding: 120px 40px; text-align: center; }
    .${uid('heromin')} h1 { font-size: 64px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px; }
    .${uid('heromin')} p { font-size: 18px; color: #666; margin-bottom: 40px; }
    .${uid('heromin')} a { display: inline-block; padding: 18px 48px; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; transition: background 0.2s; }
    .${uid('heromin')} a:hover { background: #333; }
    @media (max-width: 768px) { .${uid('heromin')} h1 { font-size: 40px; } .${uid('heromin')}-wrap { padding: 80px 24px; } }
  </style>
  <div class="${uid('heromin')}-wrap">
    <h1>${v.headline}</h1>
    <p>${v.subheadline}</p>
    <a href="${v.buttonUrl}">${v.buttonText}</a>
  </div>
</div>`
  },
  {
    id: 'hero-split',
    name: 'Hero - Split Image',
    category: 'Hero',
    description: 'Clean split layout with image',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'New Arrivals' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Discover our latest collection of premium essentials. Quality craftsmanship meets timeless design.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Image URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('herosplit')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('herosplit')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('herosplit')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
    .${uid('herosplit')}-content { display: flex; flex-direction: column; justify-content: center; padding: 80px; }
    .${uid('herosplit')} h1 { font-size: 52px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.02em; margin-bottom: 24px; }
    .${uid('herosplit')} p { font-size: 16px; line-height: 1.7; color: #666; margin-bottom: 40px; max-width: 420px; }
    .${uid('herosplit')} a { display: inline-block; padding: 18px 40px; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; transition: background 0.2s; align-self: flex-start; }
    .${uid('herosplit')} a:hover { background: #333; }
    .${uid('herosplit')}-img { background-image: url('${v.image}'); background-size: cover; background-position: center; }
    @media (max-width: 768px) { .${uid('herosplit')}-wrap { grid-template-columns: 1fr; } .${uid('herosplit')}-content { padding: 60px 24px; } .${uid('herosplit')} h1 { font-size: 36px; } .${uid('herosplit')}-img { min-height: 400px; } }
  </style>
  <div class="${uid('herosplit')}-wrap">
    <div class="${uid('herosplit')}-content">
      <h1>${v.headline}</h1>
      <p>${v.subheadline}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
    <div class="${uid('herosplit')}-img"></div>
  </div>
</div>`
  },
  {
    id: 'hero-fullwidth',
    name: 'Hero - Full Width Image',
    category: 'Hero',
    description: 'Full-width hero with centered text overlay',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Summer Collection' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Explore the season\'s most coveted pieces' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Background Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop' },
      { id: 'overlay', label: 'Overlay Opacity (0-100)', type: 'number', defaultValue: '30' },
    ],
    generateHtml: (v) => `<div class="${uid('herofull')}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('herofull')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('herofull')}-wrap { position: relative; min-height: 600px; display: flex; align-items: center; justify-content: center; background-image: url('${v.image}'); background-size: cover; background-position: center; }
    .${uid('herofull')}-overlay { position: absolute; inset: 0; background: rgba(0,0,0,${parseInt(v.overlay)/100}); }
    .${uid('herofull')}-content { position: relative; z-index: 1; text-align: center; padding: 40px; color: #fff; }
    .${uid('herofull')} h1 { font-size: 56px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 16px; }
    .${uid('herofull')} p { font-size: 18px; opacity: 0.9; margin-bottom: 40px; }
    .${uid('herofull')} a { display: inline-block; padding: 18px 48px; background: #fff; color: #1a1a1a; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.2s; }
    .${uid('herofull')} a:hover { background: #1a1a1a; color: #fff; }
    @media (max-width: 768px) { .${uid('herofull')} h1 { font-size: 36px; } .${uid('herofull')}-wrap { min-height: 500px; } }
  </style>
  <div class="${uid('herofull')}-wrap">
    <div class="${uid('herofull')}-overlay"></div>
    <div class="${uid('herofull')}-content">
      <h1>${v.headline}</h1>
      <p>${v.subheadline}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },

  // ========== BRAND / ABOUT ==========
  {
    id: 'brand-statement',
    name: 'Brand - Statement',
    category: 'Brand',
    description: 'Large brand statement with elegant typography',
    thumbnail: '',
    fields: [
      { id: 'statement', label: 'Statement', type: 'textarea', defaultValue: 'We believe in the power of simplicity. Every piece is designed with intention, crafted with care, and made to last a lifetime.' },
    ],
    generateHtml: (v) => `<div class="${uid('brandst')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('brandst')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('brandst')}-wrap { max-width: 900px; margin: 0 auto; padding: 120px 40px; text-align: center; }
    .${uid('brandst')} p { font-size: 32px; line-height: 1.5; color: #1a1a1a; font-weight: 300; letter-spacing: -0.01em; }
    @media (max-width: 768px) { .${uid('brandst')} p { font-size: 24px; } .${uid('brandst')}-wrap { padding: 80px 24px; } }
  </style>
  <div class="${uid('brandst')}-wrap">
    <p>${v.statement}</p>
  </div>
</div>`
  },
  {
    id: 'brand-values',
    name: 'Brand - Values',
    category: 'Brand',
    description: 'Three-column brand values display',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Values' },
      { id: 'value1Title', label: 'Value 1 Title', type: 'text', defaultValue: 'Quality' },
      { id: 'value1Desc', label: 'Value 1 Description', type: 'textarea', defaultValue: 'We source only the finest materials and work with skilled artisans who share our commitment to excellence.' },
      { id: 'value2Title', label: 'Value 2 Title', type: 'text', defaultValue: 'Sustainability' },
      { id: 'value2Desc', label: 'Value 2 Description', type: 'textarea', defaultValue: 'Every decision we make considers our impact on the planet. From materials to packaging, we choose responsibly.' },
      { id: 'value3Title', label: 'Value 3 Title', type: 'text', defaultValue: 'Timelessness' },
      { id: 'value3Desc', label: 'Value 3 Description', type: 'textarea', defaultValue: 'We design pieces that transcend trends. Classic aesthetics that look as relevant today as they will in decades.' },
    ],
    generateHtml: (v) => `<div class="${uid('brandval')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('brandval')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('brandval')}-wrap { max-width: 1100px; margin: 0 auto; padding: 100px 40px; }
    .${uid('brandval')} h2 { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; text-align: center; color: #888; margin-bottom: 64px; }
    .${uid('brandval')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }
    .${uid('brandval')}-item h3 { font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('brandval')}-item p { font-size: 15px; line-height: 1.7; color: #666; }
    @media (max-width: 768px) { .${uid('brandval')}-grid { grid-template-columns: 1fr; gap: 40px; } }
  </style>
  <div class="${uid('brandval')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('brandval')}-grid">
      <div class="${uid('brandval')}-item"><h3>${v.value1Title}</h3><p>${v.value1Desc}</p></div>
      <div class="${uid('brandval')}-item"><h3>${v.value2Title}</h3><p>${v.value2Desc}</p></div>
      <div class="${uid('brandval')}-item"><h3>${v.value3Title}</h3><p>${v.value3Desc}</p></div>
    </div>
  </div>
</div>`
  },

  // ========== PRODUCT HIGHLIGHT ==========
  {
    id: 'product-spotlight',
    name: 'Product - Spotlight',
    category: 'Product',
    description: 'Single product feature with large image',
    thumbnail: '',
    fields: [
      { id: 'tagline', label: 'Tagline', type: 'text', defaultValue: 'Featured' },
      { id: 'headline', label: 'Product Name', type: 'text', defaultValue: 'The Essential Collection' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Crafted from premium materials with meticulous attention to detail. A timeless piece designed to elevate your everyday.' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: 'From $149' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'View Details' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('prodspot')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('prodspot')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('prodspot')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .${uid('prodspot')}-img img { width: 100%; height: auto; border-radius: 8px; }
    .${uid('prodspot')}-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #888; margin-bottom: 16px; }
    .${uid('prodspot')} h2 { font-size: 40px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.02em; margin-bottom: 20px; }
    .${uid('prodspot')} p { font-size: 16px; line-height: 1.7; color: #666; margin-bottom: 24px; }
    .${uid('prodspot')}-price { font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 32px; }
    .${uid('prodspot')} a { display: inline-block; padding: 16px 40px; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; transition: background 0.2s; }
    .${uid('prodspot')} a:hover { background: #333; }
    @media (max-width: 768px) { .${uid('prodspot')}-wrap { grid-template-columns: 1fr; gap: 40px; } .${uid('prodspot')} h2 { font-size: 32px; } }
  </style>
  <div class="${uid('prodspot')}-wrap">
    <div class="${uid('prodspot')}-img"><img src="${v.image}" alt="Product"></div>
    <div class="${uid('prodspot')}-content">
      <div class="${uid('prodspot')}-tag">${v.tagline}</div>
      <h2>${v.headline}</h2>
      <p>${v.description}</p>
      <div class="${uid('prodspot')}-price">${v.price}</div>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },

  // ========== DIVIDERS ==========
  {
    id: 'divider-line',
    name: 'Divider - Simple Line',
    category: 'Divider',
    description: 'Minimal horizontal line divider',
    thumbnail: '',
    fields: [
      { id: 'color', label: 'Line Color', type: 'color', defaultValue: '#e5e5e5' },
      { id: 'width', label: 'Width (%)', type: 'number', defaultValue: '100' },
      { id: 'spacing', label: 'Vertical Spacing (px)', type: 'number', defaultValue: '48' },
    ],
    generateHtml: (v) => `<div style="padding:${v.spacing}px 40px;background:#fff;">
  <hr style="border:none;border-top:1px solid ${v.color};width:${v.width}%;margin:0 auto;">
</div>`
  },
  {
    id: 'divider-text',
    name: 'Divider - With Text',
    category: 'Divider',
    description: 'Divider line with centered text',
    thumbnail: '',
    fields: [
      { id: 'text', label: 'Text', type: 'text', defaultValue: 'Featured Products' },
      { id: 'spacing', label: 'Vertical Spacing (px)', type: 'number', defaultValue: '48' },
    ],
    generateHtml: (v) => `<div class="${uid('divtext')}" style="padding:${v.spacing}px 40px;background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('divtext')}-wrap { display: flex; align-items: center; gap: 24px; max-width: 800px; margin: 0 auto; }
    .${uid('divtext')}-line { flex: 1; height: 1px; background: #e5e5e5; }
    .${uid('divtext')}-text { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #888; white-space: nowrap; }
  </style>
  <div class="${uid('divtext')}-wrap">
    <div class="${uid('divtext')}-line"></div>
    <span class="${uid('divtext')}-text">${v.text}</span>
    <div class="${uid('divtext')}-line"></div>
  </div>
</div>`
  },
  {
    id: 'spacer',
    name: 'Spacer - Empty Space',
    category: 'Divider',
    description: 'Configurable empty vertical space',
    thumbnail: '',
    fields: [
      { id: 'height', label: 'Height (px)', type: 'number', defaultValue: '64' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div style="height:${v.height}px;background:${v.bgColor};"></div>`
  },
];

// Categories based on actual sections
export const categories = [
  { id: 'all', name: 'All', count: sectionsData.length },
  { id: 'Announcement', name: 'Announcement', count: sectionsData.filter(s => s.category === 'Announcement').length },
  { id: 'Trust', name: 'Trust', count: sectionsData.filter(s => s.category === 'Trust').length },
  { id: 'Features', name: 'Features', count: sectionsData.filter(s => s.category === 'Features').length },
  { id: 'Testimonials', name: 'Testimonials', count: sectionsData.filter(s => s.category === 'Testimonials').length },
  { id: 'CTA', name: 'CTA', count: sectionsData.filter(s => s.category === 'CTA').length },
  { id: 'FAQ', name: 'FAQ', count: sectionsData.filter(s => s.category === 'FAQ').length },
  { id: 'Hero', name: 'Hero', count: sectionsData.filter(s => s.category === 'Hero').length },
  { id: 'Brand', name: 'Brand', count: sectionsData.filter(s => s.category === 'Brand').length },
  { id: 'Product', name: 'Product', count: sectionsData.filter(s => s.category === 'Product').length },
  { id: 'Divider', name: 'Divider', count: sectionsData.filter(s => s.category === 'Divider').length },
];
