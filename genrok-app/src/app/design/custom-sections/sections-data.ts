import { Section } from './types';

// Helper to generate unique IDs for scoped CSS
const uid = (prefix: string) => `qs-${prefix}`;

export const sectionsData: Section[] = [
  // ========== PREMIUM ANNOUNCEMENT BARS / MARQUEES ==========
  {
    id: 'marquee-gold-shimmer',
    name: 'Marquee - Gold Shimmer',
    category: 'Announcement',
    description: 'Luxurious gold gradient with animated shimmer effect',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'FREE SHIPPING ON ORDERS $100+' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'PREMIUM QUALITY GUARANTEED' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'EASY 30-DAY RETURNS' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '25' },
    ],
    generateHtml: (v) => `<div class="${uid('mgshim')}" style="background:linear-gradient(180deg,#000 0%,#0a0a0a 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;position:relative;">
  <style>
    .${uid('mgshim')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mgshim')}::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(191,149,63,0.3), transparent); }
    .${uid('mgshim')}::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(191,149,63,0.2), transparent); }
    .${uid('mgshim')}-track { display: flex; animation: ${uid('mgshim')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mgshim')}-track:hover { animation-play-state: paused; }
    .${uid('mgshim')}-item { display: flex; align-items: center; gap: 40px; padding: 16px 40px; white-space: nowrap; }
    .${uid('mgshim')}-item span {
      font-size: 11px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase;
      background: linear-gradient(90deg, #BF953F, #FCF6BA, #FBF5B7, #AA771C, #BF953F);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('mgshim')}-shimmer 3s ease-in-out infinite;
      text-shadow: 0 0 30px rgba(191,149,63,0.3);
    }
    .${uid('mgshim')}-sep { color: rgba(191,149,63,0.4); font-size: 6px; }
    @keyframes ${uid('mgshim')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mgshim')}-shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  </style>
  <div class="${uid('mgshim')}-track">
    <div class="${uid('mgshim')}-item"><span>${v.text1}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text2}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text3}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text1}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text2}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text3}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text1}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text2}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text3}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text1}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text2}</span><span class="${uid('mgshim')}-sep">✦</span></div>
    <div class="${uid('mgshim')}-item"><span>${v.text3}</span><span class="${uid('mgshim')}-sep">✦</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-platinum-shine',
    name: 'Marquee - Platinum Shine',
    category: 'Announcement',
    description: 'Sophisticated platinum with light sweep animation',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'COMPLIMENTARY WORLDWIDE SHIPPING' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'HANDCRAFTED WITH PRECISION' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'LIFETIME WARRANTY INCLUDED' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '28' },
    ],
    generateHtml: (v) => `<div class="${uid('mplat')}" style="background:#050505;overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;">
  <style>
    .${uid('mplat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mplat')}::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
    .${uid('mplat')}-track { display: flex; animation: ${uid('mplat')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mplat')}-item { display: flex; align-items: center; gap: 48px; padding: 14px 48px; white-space: nowrap; position: relative; }
    .${uid('mplat')}-item span {
      font-size: 10px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase;
      background: linear-gradient(90deg, #888, #fff, #ccc, #fff, #888);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('mplat')}-shine 4s ease-in-out infinite;
    }
    .${uid('mplat')}-dot { width: 3px; height: 3px; background: linear-gradient(135deg, #666, #aaa); border-radius: 50%; opacity: 0.6; }
    @keyframes ${uid('mplat')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mplat')}-shine { 0%, 100% { background-position: 200% 50%; } 50% { background-position: 0% 50%; } }
  </style>
  <div class="${uid('mplat')}-track">
    <div class="${uid('mplat')}-item"><span>${v.text1}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text2}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text3}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text1}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text2}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text3}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text1}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text2}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text3}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text1}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text2}</span><span class="${uid('mplat')}-dot"></span></div>
    <div class="${uid('mplat')}-item"><span>${v.text3}</span><span class="${uid('mplat')}-dot"></span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-rose-luxe',
    name: 'Marquee - Rose Gold Luxe',
    category: 'Announcement',
    description: 'Elegant rose gold with soft glow effect',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'NEW COLLECTION NOW AVAILABLE' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'EXCLUSIVE MEMBERS GET 15% OFF' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'FREE EXPRESS DELIVERY' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '24' },
    ],
    generateHtml: (v) => `<div class="${uid('mrose2')}" style="background:linear-gradient(180deg,#1a1516 0%,#120f10 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;">
  <style>
    .${uid('mrose2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mrose2')}::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(183,110,121,0.4), transparent); }
    .${uid('mrose2')}-track { display: flex; animation: ${uid('mrose2')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mrose2')}-item { display: flex; align-items: center; gap: 36px; padding: 15px 36px; white-space: nowrap; }
    .${uid('mrose2')}-item span {
      font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
      background: linear-gradient(90deg, #B76E79, #E8B4B8, #F5D0D0, #E8B4B8, #B76E79);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('mrose2')}-glow 3s ease-in-out infinite;
      filter: drop-shadow(0 0 8px rgba(183,110,121,0.3));
    }
    .${uid('mrose2')}-sep { color: rgba(183,110,121,0.5); font-size: 8px; }
    @keyframes ${uid('mrose2')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mrose2')}-glow { 0%, 100% { background-position: 0% 50%; filter: drop-shadow(0 0 8px rgba(183,110,121,0.3)); } 50% { background-position: 100% 50%; filter: drop-shadow(0 0 12px rgba(183,110,121,0.5)); } }
  </style>
  <div class="${uid('mrose2')}-track">
    <div class="${uid('mrose2')}-item"><span>${v.text1}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text2}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text3}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text1}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text2}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text3}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text1}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text2}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text3}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text1}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text2}</span><span class="${uid('mrose2')}-sep">◇</span></div>
    <div class="${uid('mrose2')}-item"><span>${v.text3}</span><span class="${uid('mrose2')}-sep">◇</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-emerald',
    name: 'Marquee - Emerald Elite',
    category: 'Announcement',
    description: 'Rich emerald green with premium glow',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'SUSTAINABLE LUXURY' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'ETHICALLY SOURCED' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'CARBON NEUTRAL SHIPPING' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '26' },
    ],
    generateHtml: (v) => `<div class="${uid('memer')}" style="background:linear-gradient(180deg,#0a0f0a 0%,#050805 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;">
  <style>
    .${uid('memer')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('memer')}::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(80,200,120,0.3), transparent); }
    .${uid('memer')}-track { display: flex; animation: ${uid('memer')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('memer')}-item { display: flex; align-items: center; gap: 44px; padding: 15px 44px; white-space: nowrap; }
    .${uid('memer')}-item span {
      font-size: 10px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase;
      background: linear-gradient(90deg, #2E8B57, #50C878, #98FB98, #50C878, #2E8B57);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('memer')}-pulse 4s ease-in-out infinite;
    }
    .${uid('memer')}-leaf { color: rgba(80,200,120,0.4); font-size: 10px; }
    @keyframes ${uid('memer')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('memer')}-pulse { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  </style>
  <div class="${uid('memer')}-track">
    <div class="${uid('memer')}-item"><span>${v.text1}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text2}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text3}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text1}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text2}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text3}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text1}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text2}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text3}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text1}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text2}</span><span class="${uid('memer')}-leaf">❖</span></div>
    <div class="${uid('memer')}-item"><span>${v.text3}</span><span class="${uid('memer')}-leaf">❖</span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-minimal-clean',
    name: 'Marquee - Clean Minimal',
    category: 'Announcement',
    description: 'Ultra-minimal white on white with subtle animation',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'FREE SHIPPING OVER $150' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'HASSLE-FREE RETURNS' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'SECURE CHECKOUT' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '35' },
    ],
    generateHtml: (v) => `<div class="${uid('mclean')}" style="background:#fafafa;border-bottom:1px solid #f0f0f0;overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('mclean')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mclean')}-track { display: flex; animation: ${uid('mclean')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mclean')}-item { display: flex; align-items: center; gap: 56px; padding: 12px 56px; white-space: nowrap; }
    .${uid('mclean')}-item span { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #1a1a1a; }
    .${uid('mclean')}-sep { width: 4px; height: 4px; background: #e0e0e0; border-radius: 50%; }
    @keyframes ${uid('mclean')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('mclean')}-track">
    <div class="${uid('mclean')}-item"><span>${v.text1}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text2}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text3}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text1}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text2}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text3}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text1}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text2}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text3}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text1}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text2}</span><span class="${uid('mclean')}-sep"></span></div>
    <div class="${uid('mclean')}-item"><span>${v.text3}</span><span class="${uid('mclean')}-sep"></span></div>
  </div>
</div>`
  },
  {
    id: 'marquee-dual-luxe',
    name: 'Marquee - Dual Direction Luxe',
    category: 'Announcement',
    description: 'Two rows scrolling opposite with premium styling',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Row 1', type: 'text', defaultValue: 'PREMIUM QUALITY  ✦  HANDCRAFTED  ✦  SUSTAINABLE  ✦  TIMELESS' },
      { id: 'text2', label: 'Row 2', type: 'text', defaultValue: 'FREE SHIPPING  ✦  EASY RETURNS  ✦  SECURE CHECKOUT  ✦  24/7 SUPPORT' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '20' },
    ],
    generateHtml: (v) => `<div class="${uid('mdual2')}" style="background:#000;overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('mdual2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mdual2')}-row { display: flex; width: max-content; padding: 10px 0; }
    .${uid('mdual2')}-row:first-child { animation: ${uid('mdual2')}-left ${v.speed}s linear infinite; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .${uid('mdual2')}-row:last-child { animation: ${uid('mdual2')}-right ${v.speed}s linear infinite; }
    .${uid('mdual2')}-row span {
      font-size: 10px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase;
      color: rgba(255,255,255,0.4); padding: 0 24px; white-space: nowrap;
      transition: color 0.3s;
    }
    .${uid('mdual2')}-row:hover span { color: rgba(255,255,255,0.7); }
    @keyframes ${uid('mdual2')}-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mdual2')}-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  </style>
  <div class="${uid('mdual2')}-row"><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span><span>${v.text1}</span></div>
  <div class="${uid('mdual2')}-row"><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span><span>${v.text2}</span></div>
</div>`
  },

  // ========== PREMIUM TRUST & SOCIAL PROOF ==========
  {
    id: 'trust-logos-premium',
    name: 'Trust - Featured In Premium',
    category: 'Trust',
    description: 'Elegant "As Featured In" with refined styling',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'AS FEATURED IN' },
      { id: 'logo1Text', label: 'Brand 1', type: 'text', defaultValue: 'VOGUE' },
      { id: 'logo2Text', label: 'Brand 2', type: 'text', defaultValue: 'FORBES' },
      { id: 'logo3Text', label: 'Brand 3', type: 'text', defaultValue: 'ELLE' },
      { id: 'logo4Text', label: 'Brand 4', type: 'text', defaultValue: 'GQ' },
      { id: 'logo5Text', label: 'Brand 5', type: 'text', defaultValue: 'HYPEBEAST' },
    ],
    generateHtml: (v) => `<div class="${uid('tlogop')}" style="background:linear-gradient(180deg,#fafafa 0%,#f5f5f5 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tlogop')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tlogop')}-wrap { max-width: 1200px; margin: 0 auto; padding: 56px 48px; text-align: center; }
    .${uid('tlogop')} h3 { font-size: 10px; font-weight: 500; letter-spacing: 0.3em; color: #999; margin-bottom: 40px; }
    .${uid('tlogop')}-logos { display: flex; justify-content: center; align-items: center; gap: 64px; flex-wrap: wrap; }
    .${uid('tlogop')}-logos span {
      font-size: 14px; font-weight: 600; letter-spacing: 0.15em; color: #bbb;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
      cursor: default;
    }
    .${uid('tlogop')}-logos span:hover { color: #666; transform: scale(1.05); }
    @media (max-width: 768px) { .${uid('tlogop')}-logos { gap: 40px; } }
  </style>
  <div class="${uid('tlogop')}-wrap">
    <h3>${v.headline}</h3>
    <div class="${uid('tlogop')}-logos">
      <span>${v.logo1Text}</span>
      <span>${v.logo2Text}</span>
      <span>${v.logo3Text}</span>
      <span>${v.logo4Text}</span>
      <span>${v.logo5Text}</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'trust-stats-premium',
    name: 'Trust - Stats Elegant',
    category: 'Trust',
    description: 'Premium statistics display with refined typography',
    thumbnail: '',
    fields: [
      { id: 'stat1Num', label: 'Stat 1 Number', type: 'text', defaultValue: '50K+' },
      { id: 'stat1Label', label: 'Stat 1 Label', type: 'text', defaultValue: 'Happy Customers' },
      { id: 'stat2Num', label: 'Stat 2 Number', type: 'text', defaultValue: '4.9' },
      { id: 'stat2Label', label: 'Stat 2 Label', type: 'text', defaultValue: 'Average Rating' },
      { id: 'stat3Num', label: 'Stat 3 Number', type: 'text', defaultValue: '50+' },
      { id: 'stat3Label', label: 'Stat 3 Label', type: 'text', defaultValue: 'Countries' },
      { id: 'stat4Num', label: 'Stat 4 Number', type: 'text', defaultValue: '100%' },
      { id: 'stat4Label', label: 'Stat 4 Label', type: 'text', defaultValue: 'Satisfaction' },
    ],
    generateHtml: (v) => `<div class="${uid('tstatsp')}" style="background:#fff;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tstatsp')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tstatsp')}-wrap { max-width: 1100px; margin: 0 auto; padding: 56px 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
    .${uid('tstatsp')}-item { text-align: center; position: relative; }
    .${uid('tstatsp')}-item:not(:last-child)::after { content: ''; position: absolute; right: -20px; top: 50%; transform: translateY(-50%); width: 1px; height: 40px; background: linear-gradient(180deg, transparent, #e5e5e5, transparent); }
    .${uid('tstatsp')}-item strong { display: block; font-size: 36px; font-weight: 300; color: #1a1a1a; letter-spacing: -0.02em; margin-bottom: 8px; }
    .${uid('tstatsp')}-item span { font-size: 11px; font-weight: 500; color: #888; letter-spacing: 0.1em; text-transform: uppercase; }
    @media (max-width: 768px) { .${uid('tstatsp')}-wrap { grid-template-columns: repeat(2, 1fr); } .${uid('tstatsp')}-item::after { display: none; } .${uid('tstatsp')}-item strong { font-size: 28px; } }
  </style>
  <div class="${uid('tstatsp')}-wrap">
    <div class="${uid('tstatsp')}-item"><strong>${v.stat1Num}</strong><span>${v.stat1Label}</span></div>
    <div class="${uid('tstatsp')}-item"><strong>${v.stat2Num}</strong><span>${v.stat2Label}</span></div>
    <div class="${uid('tstatsp')}-item"><strong>${v.stat3Num}</strong><span>${v.stat3Label}</span></div>
    <div class="${uid('tstatsp')}-item"><strong>${v.stat4Num}</strong><span>${v.stat4Label}</span></div>
  </div>
</div>`
  },
  {
    id: 'trust-review-elegant',
    name: 'Trust - Review Elegant',
    category: 'Trust',
    description: 'Sophisticated review summary with gold stars',
    thumbnail: '',
    fields: [
      { id: 'rating', label: 'Rating', type: 'text', defaultValue: '4.9' },
      { id: 'count', label: 'Review Count', type: 'text', defaultValue: '2,847' },
      { id: 'platform', label: 'Subtitle', type: 'text', defaultValue: 'Based on verified customer reviews' },
    ],
    generateHtml: (v) => `<div class="${uid('treview')}" style="background:linear-gradient(180deg,#fafafa 0%,#f7f7f7 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('treview')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('treview')}-wrap { padding: 40px; display: flex; justify-content: center; align-items: center; gap: 32px; flex-wrap: wrap; }
    .${uid('treview')}-stars {
      font-size: 20px; letter-spacing: 4px;
      background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .${uid('treview')}-info { text-align: left; }
    .${uid('treview')}-rating { font-size: 28px; font-weight: 300; color: #1a1a1a; letter-spacing: -0.01em; }
    .${uid('treview')}-rating span { font-size: 15px; font-weight: 400; color: #666; }
    .${uid('treview')}-platform { font-size: 11px; color: #999; letter-spacing: 0.05em; margin-top: 4px; }
  </style>
  <div class="${uid('treview')}-wrap">
    <div class="${uid('treview')}-stars">★★★★★</div>
    <div class="${uid('treview')}-info">
      <div class="${uid('treview')}-rating">${v.rating} <span>/ 5 from ${v.count} reviews</span></div>
      <div class="${uid('treview')}-platform">${v.platform}</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'trust-guarantees',
    name: 'Trust - Guarantees Bar',
    category: 'Trust',
    description: 'Minimal guarantee badges with icons',
    thumbnail: '',
    fields: [
      { id: 'item1', label: 'Guarantee 1', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'item2', label: 'Guarantee 2', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'item3', label: 'Guarantee 3', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'item4', label: 'Guarantee 4', type: 'text', defaultValue: 'Quality Guarantee' },
    ],
    generateHtml: (v) => `<div class="${uid('tguar')}" style="background:#000;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tguar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tguar')}-wrap { max-width: 1200px; margin: 0 auto; padding: 20px 40px; display: flex; justify-content: center; gap: 56px; flex-wrap: wrap; }
    .${uid('tguar')}-item { display: flex; align-items: center; gap: 10px; }
    .${uid('tguar')}-item::before { content: '✓'; font-size: 10px; color: rgba(191,149,63,0.8); }
    .${uid('tguar')}-item span { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.8); letter-spacing: 0.05em; }
    @media (max-width: 768px) { .${uid('tguar')}-wrap { gap: 32px; } }
  </style>
  <div class="${uid('tguar')}-wrap">
    <div class="${uid('tguar')}-item"><span>${v.item1}</span></div>
    <div class="${uid('tguar')}-item"><span>${v.item2}</span></div>
    <div class="${uid('tguar')}-item"><span>${v.item3}</span></div>
    <div class="${uid('tguar')}-item"><span>${v.item4}</span></div>
  </div>
</div>`
  },

  // ========== PREMIUM FEATURES ==========
  {
    id: 'features-numbered',
    name: 'Features - Numbered Premium',
    category: 'Features',
    description: 'Elegant numbered features with refined typography',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'f1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Premium Materials' },
      { id: 'f1Desc', label: 'Feature 1 Description', type: 'textarea', defaultValue: 'Sourced from the finest suppliers worldwide, each piece meets our exacting standards for quality and durability.' },
      { id: 'f2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Expert Craftsmanship' },
      { id: 'f2Desc', label: 'Feature 2 Description', type: 'textarea', defaultValue: 'Handcrafted by skilled artisans with decades of experience, ensuring every detail is perfect.' },
      { id: 'f3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Timeless Design' },
      { id: 'f3Desc', label: 'Feature 3 Description', type: 'textarea', defaultValue: 'Classic aesthetics that transcend trends, designed to remain relevant for generations.' },
    ],
    generateHtml: (v) => `<div class="${uid('fnump')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fnump')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fnump')}-wrap { max-width: 1100px; margin: 0 auto; padding: 100px 48px; }
    .${uid('fnump')} h2 { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; text-align: center; color: #999; margin-bottom: 72px; }
    .${uid('fnump')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 64px; }
    .${uid('fnump')}-item { text-align: center; }
    .${uid('fnump')}-num { font-size: 64px; font-weight: 200; color: #f0f0f0; line-height: 1; margin-bottom: 20px; }
    .${uid('fnump')}-item h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; letter-spacing: -0.01em; }
    .${uid('fnump')}-item p { font-size: 14px; line-height: 1.7; color: #666; }
    @media (max-width: 768px) { .${uid('fnump')}-grid { grid-template-columns: 1fr; gap: 48px; } }
  </style>
  <div class="${uid('fnump')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('fnump')}-grid">
      <div class="${uid('fnump')}-item"><div class="${uid('fnump')}-num">01</div><h3>${v.f1Title}</h3><p>${v.f1Desc}</p></div>
      <div class="${uid('fnump')}-item"><div class="${uid('fnump')}-num">02</div><h3>${v.f2Title}</h3><p>${v.f2Desc}</p></div>
      <div class="${uid('fnump')}-item"><div class="${uid('fnump')}-num">03</div><h3>${v.f3Title}</h3><p>${v.f3Desc}</p></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'features-split-premium',
    name: 'Features - Split Elegant',
    category: 'Features',
    description: 'Large headline with stacked features',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Designed for Excellence' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Every detail matters. From concept to creation, we obsess over quality to deliver products that exceed expectations.' },
      { id: 'f1', label: 'Feature 1', type: 'text', defaultValue: 'Precision Engineering' },
      { id: 'f2', label: 'Feature 2', type: 'text', defaultValue: 'Sustainable Materials' },
      { id: 'f3', label: 'Feature 3', type: 'text', defaultValue: 'Lifetime Warranty' },
      { id: 'f4', label: 'Feature 4', type: 'text', defaultValue: 'Global Shipping' },
    ],
    generateHtml: (v) => `<div class="${uid('fsplitp')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fsplitp')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fsplitp')}-wrap { max-width: 1200px; margin: 0 auto; padding: 100px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
    .${uid('fsplitp')} h2 { font-size: 44px; font-weight: 600; color: #1a1a1a; line-height: 1.15; letter-spacing: -0.025em; margin-bottom: 24px; }
    .${uid('fsplitp')}-left p { font-size: 16px; line-height: 1.7; color: #666; }
    .${uid('fsplitp')}-list { display: flex; flex-direction: column; gap: 16px; }
    .${uid('fsplitp')}-list li { display: flex; align-items: center; gap: 20px; font-size: 16px; color: #1a1a1a; padding: 20px 28px; background: #fff; border-radius: 12px; border: 1px solid #eee; transition: all 0.3s; }
    .${uid('fsplitp')}-list li:hover { border-color: #ddd; transform: translateX(4px); }
    .${uid('fsplitp')}-list li::before { content: '→'; color: #bbb; font-size: 14px; }
    @media (max-width: 768px) { .${uid('fsplitp')}-wrap { grid-template-columns: 1fr; gap: 48px; } .${uid('fsplitp')} h2 { font-size: 32px; } }
  </style>
  <div class="${uid('fsplitp')}-wrap">
    <div class="${uid('fsplitp')}-left"><h2>${v.headline}</h2><p>${v.subheadline}</p></div>
    <ul class="${uid('fsplitp')}-list">
      <li>${v.f1}</li>
      <li>${v.f2}</li>
      <li>${v.f3}</li>
      <li>${v.f4}</li>
    </ul>
  </div>
</div>`
  },
  {
    id: 'features-bar-dark',
    name: 'Features - Dark Bar',
    category: 'Features',
    description: 'Sleek dark bar with gold accents',
    thumbnail: '',
    fields: [
      { id: 'f1', label: 'Feature 1', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'f2', label: 'Feature 2', type: 'text', defaultValue: 'Easy Returns' },
      { id: 'f3', label: 'Feature 3', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'f4', label: 'Feature 4', type: 'text', defaultValue: 'Premium Quality' },
    ],
    generateHtml: (v) => `<div class="${uid('fbardark')}" style="background:linear-gradient(180deg,#0a0a0a 0%,#000 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fbardark')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fbardark')}-wrap { max-width: 1200px; margin: 0 auto; padding: 28px 48px; display: flex; justify-content: center; gap: 64px; flex-wrap: wrap; }
    .${uid('fbardark')}-item { display: flex; align-items: center; gap: 12px; }
    .${uid('fbardark')}-item::before {
      content: '✓'; font-size: 10px;
      background: linear-gradient(135deg, #BF953F, #FCF6BA);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .${uid('fbardark')}-item span { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); letter-spacing: 0.03em; }
    @media (max-width: 768px) { .${uid('fbardark')}-wrap { gap: 32px; } }
  </style>
  <div class="${uid('fbardark')}-wrap">
    <div class="${uid('fbardark')}-item"><span>${v.f1}</span></div>
    <div class="${uid('fbardark')}-item"><span>${v.f2}</span></div>
    <div class="${uid('fbardark')}-item"><span>${v.f3}</span></div>
    <div class="${uid('fbardark')}-item"><span>${v.f4}</span></div>
  </div>
</div>`
  },

  // ========== PREMIUM TESTIMONIALS ==========
  {
    id: 'testimonial-elegant',
    name: 'Testimonial - Elegant Center',
    category: 'Testimonials',
    description: 'Large centered quote with refined styling',
    thumbnail: '',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'The attention to detail is remarkable. Every piece feels like it was made specifically for me. This is what true luxury should feel like.' },
      { id: 'name', label: 'Customer Name', type: 'text', defaultValue: 'Alexandra Chen' },
      { id: 'title', label: 'Title', type: 'text', defaultValue: 'Verified Buyer' },
    ],
    generateHtml: (v) => `<div class="${uid('testi1')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('testi1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('testi1')}-wrap { max-width: 800px; margin: 0 auto; padding: 100px 48px; text-align: center; }
    .${uid('testi1')}-stars {
      font-size: 14px; letter-spacing: 6px; margin-bottom: 36px;
      background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .${uid('testi1')} blockquote { font-size: 26px; line-height: 1.5; color: #1a1a1a; font-weight: 300; margin-bottom: 40px; font-style: italic; letter-spacing: -0.01em; }
    .${uid('testi1')}-author { font-size: 14px; }
    .${uid('testi1')}-name { font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
    .${uid('testi1')}-title { color: #888; font-size: 12px; letter-spacing: 0.05em; }
    @media (max-width: 768px) { .${uid('testi1')} blockquote { font-size: 20px; } }
  </style>
  <div class="${uid('testi1')}-wrap">
    <div class="${uid('testi1')}-stars">★★★★★</div>
    <blockquote>"${v.quote}"</blockquote>
    <div class="${uid('testi1')}-author">
      <div class="${uid('testi1')}-name">${v.name}</div>
      <div class="${uid('testi1')}-title">${v.title}</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'testimonial-cards-premium',
    name: 'Testimonial - Cards Premium',
    category: 'Testimonials',
    description: 'Three elegant testimonial cards',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'What Our Customers Say' },
      { id: 'q1', label: 'Quote 1', type: 'textarea', defaultValue: 'Exceptional quality and fast shipping. This exceeded all my expectations.' },
      { id: 'n1', label: 'Name 1', type: 'text', defaultValue: 'Michael R.' },
      { id: 'q2', label: 'Quote 2', type: 'textarea', defaultValue: 'The best purchase I have made this year. Worth every single penny.' },
      { id: 'n2', label: 'Name 2', type: 'text', defaultValue: 'Sarah L.' },
      { id: 'q3', label: 'Quote 3', type: 'textarea', defaultValue: 'Customer service was incredible. They truly care about their customers.' },
      { id: 'n3', label: 'Name 3', type: 'text', defaultValue: 'James K.' },
    ],
    generateHtml: (v) => `<div class="${uid('testi2')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('testi2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('testi2')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
    .${uid('testi2')} h2 { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; text-align: center; color: #999; margin-bottom: 56px; }
    .${uid('testi2')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .${uid('testi2')}-card { background: #fff; padding: 36px; border-radius: 16px; border: 1px solid #eee; transition: all 0.3s; }
    .${uid('testi2')}-card:hover { border-color: #ddd; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
    .${uid('testi2')}-stars { color: #1a1a1a; font-size: 11px; letter-spacing: 4px; margin-bottom: 20px; }
    .${uid('testi2')}-card p { font-size: 15px; line-height: 1.7; color: #444; margin-bottom: 24px; font-style: italic; }
    .${uid('testi2')}-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
    @media (max-width: 768px) { .${uid('testi2')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('testi2')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('testi2')}-grid">
      <div class="${uid('testi2')}-card"><div class="${uid('testi2')}-stars">★★★★★</div><p>"${v.q1}"</p><div class="${uid('testi2')}-name">${v.n1}</div></div>
      <div class="${uid('testi2')}-card"><div class="${uid('testi2')}-stars">★★★★★</div><p>"${v.q2}"</p><div class="${uid('testi2')}-name">${v.n2}</div></div>
      <div class="${uid('testi2')}-card"><div class="${uid('testi2')}-stars">★★★★★</div><p>"${v.q3}"</p><div class="${uid('testi2')}-name">${v.n3}</div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'testimonial-marquee',
    name: 'Testimonial - Scrolling',
    category: 'Testimonials',
    description: 'Auto-scrolling review marquee',
    thumbnail: '',
    fields: [
      { id: 'r1', label: 'Review 1', type: 'text', defaultValue: '"Absolutely love it!" — Sarah M.' },
      { id: 'r2', label: 'Review 2', type: 'text', defaultValue: '"Best purchase ever" — Mike R.' },
      { id: 'r3', label: 'Review 3', type: 'text', defaultValue: '"Exceptional quality" — Emma L.' },
      { id: 'r4', label: 'Review 4', type: 'text', defaultValue: '"Highly recommend" — James K.' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '35' },
    ],
    generateHtml: (v) => `<div class="${uid('tmarq2')}" style="background:#000;overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tmarq2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tmarq2')}-track { display: flex; animation: ${uid('tmarq2')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('tmarq2')}-item { padding: 18px 48px; white-space: nowrap; display: flex; align-items: center; gap: 40px; }
    .${uid('tmarq2')}-item span { font-size: 14px; color: rgba(255,255,255,0.7); font-style: italic; letter-spacing: 0.02em; }
    .${uid('tmarq2')}-sep {
      font-size: 8px;
      background: linear-gradient(135deg, #BF953F, #FCF6BA);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    @keyframes ${uid('tmarq2')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('tmarq2')}-track">
    <div class="${uid('tmarq2')}-item"><span>${v.r1}</span><span class="${uid('tmarq2')}-sep">★</span></div>
    <div class="${uid('tmarq2')}-item"><span>${v.r2}</span><span class="${uid('tmarq2')}-sep">★</span></div>
    <div class="${uid('tmarq2')}-item"><span>${v.r3}</span><span class="${uid('tmarq2')}-sep">★</span></div>
    <div class="${uid('tmarq2')}-item"><span>${v.r4}</span><span class="${uid('tmarq2')}-sep">★</span></div>
    <div class="${uid('tmarq2')}-item"><span>${v.r1}</span><span class="${uid('tmarq2')}-sep">★</span></div>
    <div class="${uid('tmarq2')}-item"><span>${v.r2}</span><span class="${uid('tmarq2')}-sep">★</span></div>
    <div class="${uid('tmarq2')}-item"><span>${v.r3}</span><span class="${uid('tmarq2')}-sep">★</span></div>
    <div class="${uid('tmarq2')}-item"><span>${v.r4}</span><span class="${uid('tmarq2')}-sep">★</span></div>
  </div>
</div>`
  },

  // ========== PREMIUM CTA & NEWSLETTER ==========
  {
    id: 'cta-newsletter-minimal',
    name: 'CTA - Newsletter Minimal',
    category: 'CTA',
    description: 'Clean minimal email signup',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Stay in the Know' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Subscribe for exclusive access to new releases and special offers.' },
      { id: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Enter your email' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Subscribe' },
    ],
    generateHtml: (v) => `<div class="${uid('ctanews')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctanews')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctanews')}-wrap { max-width: 560px; margin: 0 auto; padding: 80px 48px; text-align: center; }
    .${uid('ctanews')} h2 { font-size: 28px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; letter-spacing: -0.02em; }
    .${uid('ctanews')} p { font-size: 15px; color: #666; margin-bottom: 32px; line-height: 1.6; }
    .${uid('ctanews')}-form { display: flex; gap: 12px; }
    .${uid('ctanews')}-form input { flex: 1; padding: 16px 20px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #fff; transition: border-color 0.2s; }
    .${uid('ctanews')}-form input:focus { outline: none; border-color: #1a1a1a; }
    .${uid('ctanews')}-form button { padding: 16px 32px; background: #1a1a1a; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    .${uid('ctanews')}-form button:hover { background: #333; }
    @media (max-width: 480px) { .${uid('ctanews')}-form { flex-direction: column; } }
  </style>
  <div class="${uid('ctanews')}-wrap">
    <h2>${v.headline}</h2>
    <p>${v.subheadline}</p>
    <form class="${uid('ctanews')}-form" onsubmit="return false;">
      <input type="email" placeholder="${v.placeholder}" required>
      <button type="submit">${v.buttonText}</button>
    </form>
  </div>
</div>`
  },
  {
    id: 'cta-dark-gold',
    name: 'CTA - Dark Gold Luxe',
    category: 'CTA',
    description: 'Premium dark CTA with gold button',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Join the Inner Circle' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Be the first to know about exclusive drops and members-only offers.' },
      { id: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Your email address' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Get Access' },
    ],
    generateHtml: (v) => `<div class="${uid('ctadg')}" style="background:linear-gradient(180deg,#0a0a0a 0%,#000 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctadg')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctadg')}-wrap { max-width: 560px; margin: 0 auto; padding: 100px 48px; text-align: center; }
    .${uid('ctadg')} h2 { font-size: 32px; font-weight: 600; color: #fff; margin-bottom: 16px; letter-spacing: -0.02em; }
    .${uid('ctadg')} p { font-size: 15px; color: rgba(255,255,255,0.6); margin-bottom: 40px; line-height: 1.6; }
    .${uid('ctadg')}-form { display: flex; gap: 12px; }
    .${uid('ctadg')}-form input { flex: 1; padding: 18px 24px; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; font-size: 14px; background: transparent; color: #fff; transition: border-color 0.2s; }
    .${uid('ctadg')}-form input:focus { outline: none; border-color: rgba(255,255,255,0.4); }
    .${uid('ctadg')}-form input::placeholder { color: rgba(255,255,255,0.4); }
    .${uid('ctadg')}-form button {
      padding: 18px 36px; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer;
      letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s;
      background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728);
      color: #000;
    }
    .${uid('ctadg')}-form button:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(191,149,63,0.3); }
    @media (max-width: 480px) { .${uid('ctadg')}-form { flex-direction: column; } }
  </style>
  <div class="${uid('ctadg')}-wrap">
    <h2>${v.headline}</h2>
    <p>${v.subheadline}</p>
    <form class="${uid('ctadg')}-form" onsubmit="return false;">
      <input type="email" placeholder="${v.placeholder}" required>
      <button type="submit">${v.buttonText}</button>
    </form>
  </div>
</div>`
  },
  {
    id: 'cta-split-premium',
    name: 'CTA - Split Banner',
    category: 'CTA',
    description: 'Two-column CTA with elegant styling',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ready to elevate your style?' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('ctasplit2')}" style="background:#1a1a1a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctasplit2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctasplit2')}-wrap { max-width: 1200px; margin: 0 auto; padding: 64px 48px; display: flex; justify-content: space-between; align-items: center; gap: 48px; }
    .${uid('ctasplit2')} h2 { font-size: 32px; font-weight: 500; color: #fff; letter-spacing: -0.02em; }
    .${uid('ctasplit2')} a {
      display: inline-block; padding: 18px 48px; border: 1px solid rgba(255,255,255,0.3); color: #fff;
      text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
      transition: all 0.3s;
    }
    .${uid('ctasplit2')} a:hover { background: #fff; color: #1a1a1a; border-color: #fff; }
    @media (max-width: 768px) { .${uid('ctasplit2')}-wrap { flex-direction: column; text-align: center; } .${uid('ctasplit2')} h2 { font-size: 24px; } }
  </style>
  <div class="${uid('ctasplit2')}-wrap">
    <h2>${v.headline}</h2>
    <a href="${v.buttonUrl}">${v.buttonText}</a>
  </div>
</div>`
  },

  // ========== PREMIUM FAQ ==========
  {
    id: 'faq-accordion-premium',
    name: 'FAQ - Premium Accordion',
    category: 'FAQ',
    description: 'Elegant expandable FAQ',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'Frequently Asked Questions' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'What is your shipping policy?' },
      { id: 'a1', label: 'Answer 1', type: 'textarea', defaultValue: 'We offer complimentary standard shipping on all orders over $100. Express shipping is available for an additional fee. All orders are processed within 1-2 business days.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'What is your return policy?' },
      { id: 'a2', label: 'Answer 2', type: 'textarea', defaultValue: 'We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with all tags attached.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'How can I track my order?' },
      { id: 'a3', label: 'Answer 3', type: 'textarea', defaultValue: 'Once your order ships, you will receive an email with tracking information. You can also track your order through your account dashboard.' },
      { id: 'q4', label: 'Question 4', type: 'text', defaultValue: 'Do you ship internationally?' },
      { id: 'a4', label: 'Answer 4', type: 'textarea', defaultValue: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location.' },
    ],
    generateHtml: (v) => `<div class="${uid('faqacc')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('faqacc')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faqacc')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 48px; }
    .${uid('faqacc')} h2 { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; text-align: center; color: #999; margin-bottom: 56px; }
    .${uid('faqacc')}-item { border-bottom: 1px solid #f0f0f0; }
    .${uid('faqacc')}-q { padding: 28px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: color 0.2s; }
    .${uid('faqacc')}-q:hover { color: #666; }
    .${uid('faqacc')}-q h3 { font-size: 16px; font-weight: 500; color: inherit; letter-spacing: -0.01em; }
    .${uid('faqacc')}-q span { font-size: 18px; color: #ccc; transition: transform 0.3s; }
    .${uid('faqacc')}-a { max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out; }
    .${uid('faqacc')}-a p { padding: 0 0 28px; font-size: 15px; line-height: 1.7; color: #666; }
    .${uid('faqacc')}-item.open .${uid('faqacc')}-q span { transform: rotate(45deg); }
    .${uid('faqacc')}-item.open .${uid('faqacc')}-a { max-height: 300px; }
  </style>
  <div class="${uid('faqacc')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faqacc')}-item"><div class="${uid('faqacc')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q1}</h3><span>+</span></div><div class="${uid('faqacc')}-a"><p>${v.a1}</p></div></div>
    <div class="${uid('faqacc')}-item"><div class="${uid('faqacc')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q2}</h3><span>+</span></div><div class="${uid('faqacc')}-a"><p>${v.a2}</p></div></div>
    <div class="${uid('faqacc')}-item"><div class="${uid('faqacc')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q3}</h3><span>+</span></div><div class="${uid('faqacc')}-a"><p>${v.a3}</p></div></div>
    <div class="${uid('faqacc')}-item"><div class="${uid('faqacc')}-q" onclick="this.parentElement.classList.toggle('open')"><h3>${v.q4}</h3><span>+</span></div><div class="${uid('faqacc')}-a"><p>${v.a4}</p></div></div>
  </div>
</div>`
  },
  {
    id: 'faq-grid-premium',
    name: 'FAQ - Card Grid',
    category: 'FAQ',
    description: 'FAQ in elegant card layout',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'Common Questions' },
      { id: 'q1', label: 'Card 1 Title', type: 'text', defaultValue: 'Shipping' },
      { id: 'a1', label: 'Card 1 Text', type: 'textarea', defaultValue: 'Complimentary shipping on orders over $100. Standard delivery takes 3-5 business days.' },
      { id: 'q2', label: 'Card 2 Title', type: 'text', defaultValue: 'Returns' },
      { id: 'a2', label: 'Card 2 Text', type: 'textarea', defaultValue: '30-day hassle-free returns on all unworn items in original packaging.' },
      { id: 'q3', label: 'Card 3 Title', type: 'text', defaultValue: 'Sizing' },
      { id: 'a3', label: 'Card 3 Text', type: 'textarea', defaultValue: 'Check our detailed size guide or contact us for personalized recommendations.' },
      { id: 'q4', label: 'Card 4 Title', type: 'text', defaultValue: 'Support' },
      { id: 'a4', label: 'Card 4 Text', type: 'textarea', defaultValue: '24/7 customer support via chat, email, or phone. We are here to help.' },
    ],
    generateHtml: (v) => `<div class="${uid('faqgrid')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('faqgrid')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faqgrid')}-wrap { max-width: 1000px; margin: 0 auto; padding: 80px 48px; }
    .${uid('faqgrid')} h2 { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; text-align: center; color: #999; margin-bottom: 56px; }
    .${uid('faqgrid')}-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .${uid('faqgrid')}-card { background: #fff; padding: 32px; border-radius: 16px; border: 1px solid #eee; transition: all 0.3s; }
    .${uid('faqgrid')}-card:hover { border-color: #ddd; transform: translateY(-2px); }
    .${uid('faqgrid')}-card h3 { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('faqgrid')}-card p { font-size: 14px; line-height: 1.6; color: #666; }
    @media (max-width: 768px) { .${uid('faqgrid')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('faqgrid')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faqgrid')}-grid">
      <div class="${uid('faqgrid')}-card"><h3>${v.q1}</h3><p>${v.a1}</p></div>
      <div class="${uid('faqgrid')}-card"><h3>${v.q2}</h3><p>${v.a2}</p></div>
      <div class="${uid('faqgrid')}-card"><h3>${v.q3}</h3><p>${v.a3}</p></div>
      <div class="${uid('faqgrid')}-card"><h3>${v.q4}</h3><p>${v.a4}</p></div>
    </div>
  </div>
</div>`
  },

  // ========== PREMIUM HERO (Limited - 10% of total) ==========
  {
    id: 'hero-minimal-premium',
    name: 'Hero - Minimal Text',
    category: 'Hero',
    description: 'Ultra-clean typography-focused hero',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Elevate Your Everyday' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Premium essentials designed for modern living' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Explore Collection' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('heromin2')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('heromin2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('heromin2')}-wrap { max-width: 900px; margin: 0 auto; padding: 140px 48px; text-align: center; }
    .${uid('heromin2')} h1 { font-size: 56px; font-weight: 500; color: #1a1a1a; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px; }
    .${uid('heromin2')} p { font-size: 18px; color: #666; margin-bottom: 48px; letter-spacing: 0.01em; }
    .${uid('heromin2')} a {
      display: inline-block; padding: 18px 52px; background: #1a1a1a; color: #fff; text-decoration: none;
      font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
      transition: all 0.3s; border-radius: 4px;
    }
    .${uid('heromin2')} a:hover { background: #000; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
    @media (max-width: 768px) { .${uid('heromin2')} h1 { font-size: 36px; } .${uid('heromin2')}-wrap { padding: 100px 32px; } }
  </style>
  <div class="${uid('heromin2')}-wrap">
    <h1>${v.headline}</h1>
    <p>${v.subheadline}</p>
    <a href="${v.buttonUrl}">${v.buttonText}</a>
  </div>
</div>`
  },
  {
    id: 'hero-split-premium',
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
    generateHtml: (v) => `<div class="${uid('herosplit2')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('herosplit2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('herosplit2')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
    .${uid('herosplit2')}-content { display: flex; flex-direction: column; justify-content: center; padding: 80px; }
    .${uid('herosplit2')} h1 { font-size: 48px; font-weight: 500; color: #1a1a1a; letter-spacing: -0.02em; margin-bottom: 24px; line-height: 1.1; }
    .${uid('herosplit2')} p { font-size: 16px; line-height: 1.7; color: #666; margin-bottom: 40px; max-width: 420px; }
    .${uid('herosplit2')} a {
      display: inline-block; padding: 18px 44px; background: #1a1a1a; color: #fff; text-decoration: none;
      font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; align-self: flex-start;
      transition: all 0.3s;
    }
    .${uid('herosplit2')} a:hover { background: #000; }
    .${uid('herosplit2')}-img { background-image: url('${v.image}'); background-size: cover; background-position: center; }
    @media (max-width: 768px) { .${uid('herosplit2')}-wrap { grid-template-columns: 1fr; } .${uid('herosplit2')}-content { padding: 64px 32px; } .${uid('herosplit2')} h1 { font-size: 36px; } .${uid('herosplit2')}-img { min-height: 400px; } }
  </style>
  <div class="${uid('herosplit2')}-wrap">
    <div class="${uid('herosplit2')}-content">
      <h1>${v.headline}</h1>
      <p>${v.subheadline}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
    <div class="${uid('herosplit2')}-img"></div>
  </div>
</div>`
  },

  // ========== PREMIUM BRAND ==========
  {
    id: 'brand-statement-premium',
    name: 'Brand - Statement',
    category: 'Brand',
    description: 'Large elegant brand statement',
    thumbnail: '',
    fields: [
      { id: 'statement', label: 'Statement', type: 'textarea', defaultValue: 'We believe in the power of simplicity. Every piece is designed with intention, crafted with care, and made to last a lifetime.' },
    ],
    generateHtml: (v) => `<div class="${uid('brandst2')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('brandst2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('brandst2')}-wrap { max-width: 900px; margin: 0 auto; padding: 120px 48px; text-align: center; }
    .${uid('brandst2')} p { font-size: 32px; line-height: 1.5; color: #1a1a1a; font-weight: 300; letter-spacing: -0.01em; }
    @media (max-width: 768px) { .${uid('brandst2')} p { font-size: 24px; } .${uid('brandst2')}-wrap { padding: 80px 32px; } }
  </style>
  <div class="${uid('brandst2')}-wrap">
    <p>${v.statement}</p>
  </div>
</div>`
  },
  {
    id: 'brand-values-premium',
    name: 'Brand - Values',
    category: 'Brand',
    description: 'Three-column brand values',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Values' },
      { id: 'v1Title', label: 'Value 1 Title', type: 'text', defaultValue: 'Quality' },
      { id: 'v1Desc', label: 'Value 1 Description', type: 'textarea', defaultValue: 'We source only the finest materials and work with skilled artisans who share our commitment to excellence.' },
      { id: 'v2Title', label: 'Value 2 Title', type: 'text', defaultValue: 'Sustainability' },
      { id: 'v2Desc', label: 'Value 2 Description', type: 'textarea', defaultValue: 'Every decision we make considers our impact on the planet. From materials to packaging, we choose responsibly.' },
      { id: 'v3Title', label: 'Value 3 Title', type: 'text', defaultValue: 'Timelessness' },
      { id: 'v3Desc', label: 'Value 3 Description', type: 'textarea', defaultValue: 'We design pieces that transcend trends. Classic aesthetics that look as relevant today as they will in decades.' },
    ],
    generateHtml: (v) => `<div class="${uid('brandval2')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('brandval2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('brandval2')}-wrap { max-width: 1100px; margin: 0 auto; padding: 100px 48px; }
    .${uid('brandval2')} h2 { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; text-align: center; color: #999; margin-bottom: 72px; }
    .${uid('brandval2')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 56px; }
    .${uid('brandval2')}-item h3 { font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; letter-spacing: -0.01em; }
    .${uid('brandval2')}-item p { font-size: 15px; line-height: 1.7; color: #666; }
    @media (max-width: 768px) { .${uid('brandval2')}-grid { grid-template-columns: 1fr; gap: 40px; } }
  </style>
  <div class="${uid('brandval2')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('brandval2')}-grid">
      <div class="${uid('brandval2')}-item"><h3>${v.v1Title}</h3><p>${v.v1Desc}</p></div>
      <div class="${uid('brandval2')}-item"><h3>${v.v2Title}</h3><p>${v.v2Desc}</p></div>
      <div class="${uid('brandval2')}-item"><h3>${v.v3Title}</h3><p>${v.v3Desc}</p></div>
    </div>
  </div>
</div>`
  },

  // ========== PREMIUM PRODUCT ==========
  {
    id: 'product-spotlight-premium',
    name: 'Product - Spotlight',
    category: 'Product',
    description: 'Single product feature',
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
    generateHtml: (v) => `<div class="${uid('prodspot2')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('prodspot2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('prodspot2')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .${uid('prodspot2')}-img img { width: 100%; height: auto; border-radius: 12px; }
    .${uid('prodspot2')}-tag { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #888; margin-bottom: 16px; }
    .${uid('prodspot2')} h2 { font-size: 40px; font-weight: 500; color: #1a1a1a; letter-spacing: -0.02em; margin-bottom: 20px; }
    .${uid('prodspot2')} p { font-size: 16px; line-height: 1.7; color: #666; margin-bottom: 24px; }
    .${uid('prodspot2')}-price { font-size: 24px; font-weight: 500; color: #1a1a1a; margin-bottom: 32px; }
    .${uid('prodspot2')} a {
      display: inline-block; padding: 18px 44px; background: #1a1a1a; color: #fff; text-decoration: none;
      font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s;
    }
    .${uid('prodspot2')} a:hover { background: #000; }
    @media (max-width: 768px) { .${uid('prodspot2')}-wrap { grid-template-columns: 1fr; gap: 40px; } .${uid('prodspot2')} h2 { font-size: 32px; } }
  </style>
  <div class="${uid('prodspot2')}-wrap">
    <div class="${uid('prodspot2')}-img"><img src="${v.image}" alt="Product"></div>
    <div class="${uid('prodspot2')}-content">
      <div class="${uid('prodspot2')}-tag">${v.tagline}</div>
      <h2>${v.headline}</h2>
      <p>${v.description}</p>
      <div class="${uid('prodspot2')}-price">${v.price}</div>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },

  // ========== PREMIUM DIVIDERS ==========
  {
    id: 'divider-elegant',
    name: 'Divider - Elegant Line',
    category: 'Divider',
    description: 'Minimal gradient line divider',
    thumbnail: '',
    fields: [
      { id: 'spacing', label: 'Vertical Spacing (px)', type: 'number', defaultValue: '64' },
    ],
    generateHtml: (v) => `<div style="padding:${v.spacing}px 48px;background:#fff;">
  <div style="max-width:400px;margin:0 auto;height:1px;background:linear-gradient(90deg,transparent,#e0e0e0,transparent);"></div>
</div>`
  },
  {
    id: 'divider-text-premium',
    name: 'Divider - With Text',
    category: 'Divider',
    description: 'Line divider with centered text',
    thumbnail: '',
    fields: [
      { id: 'text', label: 'Text', type: 'text', defaultValue: 'Featured Products' },
      { id: 'spacing', label: 'Vertical Spacing (px)', type: 'number', defaultValue: '56' },
    ],
    generateHtml: (v) => `<div class="${uid('divtext2')}" style="padding:${v.spacing}px 48px;background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('divtext2')}-wrap { display: flex; align-items: center; gap: 32px; max-width: 800px; margin: 0 auto; }
    .${uid('divtext2')}-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #e0e0e0); }
    .${uid('divtext2')}-line:last-child { background: linear-gradient(90deg, #e0e0e0, transparent); }
    .${uid('divtext2')}-text { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #999; white-space: nowrap; }
  </style>
  <div class="${uid('divtext2')}-wrap">
    <div class="${uid('divtext2')}-line"></div>
    <span class="${uid('divtext2')}-text">${v.text}</span>
    <div class="${uid('divtext2')}-line"></div>
  </div>
</div>`
  },
  {
    id: 'spacer-premium',
    name: 'Spacer - Empty Space',
    category: 'Divider',
    description: 'Configurable empty vertical space',
    thumbnail: '',
    fields: [
      { id: 'height', label: 'Height (px)', type: 'number', defaultValue: '80' },
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
