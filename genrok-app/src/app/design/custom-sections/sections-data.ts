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
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '40' },
    ],
    generateHtml: (v) => `<div class="${uid('mgshim')}" style="background:linear-gradient(135deg,#0c0c0c 0%,#1a1a1a 50%,#0c0c0c 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;position:relative;">
  <style>
    .${uid('mgshim')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mgshim')}::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.6) 50%, transparent 100%); }
    .${uid('mgshim')}::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 50%, transparent 100%); }
    .${uid('mgshim')}-track { display: flex; animation: ${uid('mgshim')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mgshim')}-track:hover { animation-play-state: paused; }
    .${uid('mgshim')}-item { display: flex; align-items: center; gap: 60px; padding: 20px 60px; white-space: nowrap; }
    .${uid('mgshim')}-item span {
      font-size: 14px; font-weight: 600; letter-spacing: 0.35em; text-transform: uppercase;
      background: linear-gradient(90deg, #D4AF37 0%, #F5E7A3 25%, #D4AF37 50%, #F5E7A3 75%, #D4AF37 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('mgshim')}-shimmer 2.5s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(212,175,55,0.4));
    }
    .${uid('mgshim')}-sep { color: #D4AF37; font-size: 10px; opacity: 0.6; filter: drop-shadow(0 0 8px rgba(212,175,55,0.8)); }
    @keyframes ${uid('mgshim')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mgshim')}-shimmer { 0%, 100% { background-position: 200% 50%; } 50% { background-position: 0% 50%; } }
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
    name: 'Marquee - Platinum Elite',
    category: 'Announcement',
    description: 'Sophisticated platinum with crystalline sweep animation',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'COMPLIMENTARY WORLDWIDE SHIPPING' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'HANDCRAFTED WITH PRECISION' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'LIFETIME WARRANTY INCLUDED' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '45' },
    ],
    generateHtml: (v) => `<div class="${uid('mplat')}" style="background:linear-gradient(180deg,#080808 0%,#0f0f0f 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;">
  <style>
    .${uid('mplat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mplat')}::before { content: ''; position: absolute; top: 0; left: -100%; width: 300%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent); animation: ${uid('mplat')}-sweep 8s ease-in-out infinite; }
    .${uid('mplat')}-track { display: flex; animation: ${uid('mplat')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mplat')}-item { display: flex; align-items: center; gap: 56px; padding: 22px 56px; white-space: nowrap; position: relative; }
    .${uid('mplat')}-item span {
      font-size: 13px; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase;
      background: linear-gradient(90deg, #666 0%, #E8E8E8 20%, #FFFFFF 50%, #E8E8E8 80%, #666 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('mplat')}-shine 3s ease-in-out infinite;
    }
    .${uid('mplat')}-dot { width: 4px; height: 4px; background: linear-gradient(135deg, #888 0%, #fff 50%, #888 100%); border-radius: 50%; box-shadow: 0 0 10px rgba(255,255,255,0.3); }
    @keyframes ${uid('mplat')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mplat')}-shine { 0%, 100% { background-position: 200% 50%; } 50% { background-position: 0% 50%; } }
    @keyframes ${uid('mplat')}-sweep { 0%, 100% { transform: translateX(-33%); } 50% { transform: translateX(33%); } }
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
    description: 'Elegant rose gold with soft aurora glow',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'NEW COLLECTION NOW AVAILABLE' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'EXCLUSIVE MEMBERS GET 15% OFF' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'FREE EXPRESS DELIVERY' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '38' },
    ],
    generateHtml: (v) => `<div class="${uid('mrose2')}" style="background:linear-gradient(135deg,#1a1214 0%,#0d0a0b 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;">
  <style>
    .${uid('mrose2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mrose2')}::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(183,110,121,0.08) 0%, transparent 70%); animation: ${uid('mrose2')}-aurora 6s ease-in-out infinite; }
    .${uid('mrose2')}-track { display: flex; animation: ${uid('mrose2')}-scroll ${v.speed}s linear infinite; width: max-content; position: relative; z-index: 1; }
    .${uid('mrose2')}-item { display: flex; align-items: center; gap: 50px; padding: 20px 50px; white-space: nowrap; }
    .${uid('mrose2')}-item span {
      font-size: 13px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase;
      background: linear-gradient(90deg, #B76E79 0%, #E8B4B8 30%, #F5D0D0 50%, #E8B4B8 70%, #B76E79 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('mrose2')}-glow 3s ease-in-out infinite;
      filter: drop-shadow(0 0 15px rgba(183,110,121,0.5));
    }
    .${uid('mrose2')}-sep { color: #B76E79; font-size: 12px; opacity: 0.7; filter: drop-shadow(0 0 10px rgba(183,110,121,0.8)); }
    @keyframes ${uid('mrose2')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ${uid('mrose2')}-glow { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes ${uid('mrose2')}-aurora { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
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
    name: 'Marquee - Emerald Prestige',
    category: 'Announcement',
    description: 'Rich emerald with holographic reflection',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'SUSTAINABLE LUXURY' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'ETHICALLY SOURCED' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'CARBON NEUTRAL SHIPPING' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '42' },
    ],
    generateHtml: (v) => `<div class="${uid('memer')}" style="background:linear-gradient(135deg,#050a07 0%,#0a120e 50%,#050a07 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;">
  <style>
    .${uid('memer')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('memer')}::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(80,200,120,0.5), transparent); }
    .${uid('memer')}::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(80,200,120,0.3), transparent); }
    .${uid('memer')}-track { display: flex; animation: ${uid('memer')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('memer')}-item { display: flex; align-items: center; gap: 52px; padding: 20px 52px; white-space: nowrap; }
    .${uid('memer')}-item span {
      font-size: 13px; font-weight: 600; letter-spacing: 0.35em; text-transform: uppercase;
      background: linear-gradient(90deg, #1B5E20 0%, #4CAF50 25%, #81C784 50%, #4CAF50 75%, #1B5E20 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: ${uid('memer')}-pulse 3s ease-in-out infinite;
      filter: drop-shadow(0 0 12px rgba(76,175,80,0.4));
    }
    .${uid('memer')}-leaf { color: #4CAF50; font-size: 14px; opacity: 0.8; filter: drop-shadow(0 0 8px rgba(76,175,80,0.6)); }
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
    name: 'Marquee - Minimal Pure',
    category: 'Announcement',
    description: 'Ultra-refined minimal with crisp typography',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'FREE SHIPPING OVER $150' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: 'HASSLE-FREE RETURNS' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'SECURE CHECKOUT' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '44' },
    ],
    generateHtml: (v) => `<div class="${uid('mclean')}" style="background:#ffffff;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('mclean')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mclean')}-track { display: flex; animation: ${uid('mclean')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('mclean')}-item { display: flex; align-items: center; gap: 64px; padding: 18px 64px; white-space: nowrap; }
    .${uid('mclean')}-item span { font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #1a1a1a; transition: color 0.3s ease; }
    .${uid('mclean')}-sep { width: 6px; height: 6px; background: linear-gradient(135deg, #e0e0e0, #f5f5f5); border-radius: 50%; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); }
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
    name: 'Marquee - Dual Flow',
    category: 'Announcement',
    description: 'Two rows scrolling in opposite directions',
    thumbnail: '',
    fields: [
      { id: 'text1', label: 'Row 1', type: 'text', defaultValue: 'PREMIUM QUALITY  ✦  HANDCRAFTED  ✦  SUSTAINABLE  ✦  TIMELESS' },
      { id: 'text2', label: 'Row 2', type: 'text', defaultValue: 'FREE SHIPPING  ✦  EASY RETURNS  ✦  SECURE CHECKOUT  ✦  24/7 SUPPORT' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '30' },
    ],
    generateHtml: (v) => `<div class="${uid('mdual2')}" style="background:linear-gradient(180deg,#000 0%,#0a0a0a 100%);overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('mdual2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mdual2')}-row { display: flex; width: max-content; padding: 14px 0; }
    .${uid('mdual2')}-row:first-child { animation: ${uid('mdual2')}-left ${v.speed}s linear infinite; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .${uid('mdual2')}-row:last-child { animation: ${uid('mdual2')}-right ${v.speed}s linear infinite; }
    .${uid('mdual2')}-row span {
      font-size: 12px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase;
      color: rgba(255,255,255,0.5); padding: 0 32px; white-space: nowrap;
      transition: color 0.3s ease;
    }
    .${uid('mdual2')}-row:hover span { color: rgba(255,255,255,0.85); }
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
    name: 'Trust - Featured In',
    category: 'Trust',
    description: 'Premium "As Featured In" with hover effects',
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
    .${uid('tlogop')}-wrap { max-width: 1200px; margin: 0 auto; padding: 72px 48px; text-align: center; }
    .${uid('tlogop')} h3 { font-size: 11px; font-weight: 500; letter-spacing: 0.4em; color: #999; margin-bottom: 48px; }
    .${uid('tlogop')}-logos { display: flex; justify-content: center; align-items: center; gap: 72px; flex-wrap: wrap; }
    .${uid('tlogop')}-logos span {
      font-size: 18px; font-weight: 700; letter-spacing: 0.15em; color: #ccc;
      transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
      cursor: default; position: relative;
    }
    .${uid('tlogop')}-logos span::after {
      content: ''; position: absolute; bottom: -8px; left: 0; width: 0; height: 2px;
      background: linear-gradient(90deg, #D4AF37, #F5E7A3); transition: width 0.4s ease;
    }
    .${uid('tlogop')}-logos span:hover { color: #1a1a1a; transform: translateY(-2px); }
    .${uid('tlogop')}-logos span:hover::after { width: 100%; }
    @media (max-width: 768px) { .${uid('tlogop')}-wrap { padding: 48px 24px; } .${uid('tlogop')}-logos { gap: 40px; } .${uid('tlogop')}-logos span { font-size: 14px; } }
    @media (max-width: 480px) { .${uid('tlogop')}-logos { gap: 24px; flex-direction: column; } .${uid('tlogop')}-logos span { font-size: 16px; } .${uid('tlogop')} h3 { margin-bottom: 32px; } }
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
    id: 'trust-stats-elegant',
    name: 'Trust - Stats Counter',
    category: 'Trust',
    description: 'Elegant statistics with premium styling',
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
    generateHtml: (v) => `<div class="${uid('tstat')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#151515 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tstat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tstat')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; display: flex; justify-content: center; gap: 80px; flex-wrap: wrap; }
    .${uid('tstat')}-item { text-align: center; position: relative; }
    .${uid('tstat')}-item::after { content: ''; position: absolute; right: -40px; top: 50%; transform: translateY(-50%); width: 1px; height: 60px; background: linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent); }
    .${uid('tstat')}-item:last-child::after { display: none; }
    .${uid('tstat')}-item strong {
      display: block; font-size: 48px; font-weight: 300; letter-spacing: -0.02em;
      background: linear-gradient(135deg, #fff 0%, #D4AF37 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      margin-bottom: 12px;
    }
    .${uid('tstat')}-item span { font-size: 13px; font-weight: 500; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); text-transform: uppercase; }
    @media (max-width: 768px) { .${uid('tstat')}-wrap { gap: 48px; padding: 60px 24px; } .${uid('tstat')}-item strong { font-size: 36px; } .${uid('tstat')}-item::after { display: none; } }
    @media (max-width: 480px) { .${uid('tstat')}-wrap { gap: 32px; flex-direction: column; } .${uid('tstat')}-item strong { font-size: 40px; } }
  </style>
  <div class="${uid('tstat')}-wrap">
    <div class="${uid('tstat')}-item"><strong>${v.stat1Num}</strong><span>${v.stat1Label}</span></div>
    <div class="${uid('tstat')}-item"><strong>${v.stat2Num}</strong><span>${v.stat2Label}</span></div>
    <div class="${uid('tstat')}-item"><strong>${v.stat3Num}</strong><span>${v.stat3Label}</span></div>
    <div class="${uid('tstat')}-item"><strong>${v.stat4Num}</strong><span>${v.stat4Label}</span></div>
  </div>
</div>`
  },
  {
    id: 'trust-guarantees-bar',
    name: 'Trust - Guarantees',
    category: 'Trust',
    description: 'Trust bar with guarantee icons',
    thumbnail: '',
    fields: [
      { id: 'item1', label: 'Item 1', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'item2', label: 'Item 2', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'item3', label: 'Item 3', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'item4', label: 'Item 4', type: 'text', defaultValue: 'Quality Guarantee' },
    ],
    generateHtml: (v) => `<div class="${uid('tguar')}" style="background:#000;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tguar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tguar')}-wrap { max-width: 1200px; margin: 0 auto; padding: 28px 48px; display: flex; justify-content: center; gap: 64px; flex-wrap: wrap; }
    .${uid('tguar')}-item { display: flex; align-items: center; gap: 14px; }
    .${uid('tguar')}-item::before {
      content: '✓'; display: flex; align-items: center; justify-content: center;
      width: 24px; height: 24px; border-radius: 50%;
      background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%);
      color: #000; font-size: 12px; font-weight: 700;
    }
    .${uid('tguar')}-item span { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); letter-spacing: 0.05em; }
    @media (max-width: 768px) { .${uid('tguar')}-wrap { gap: 32px; padding: 24px; } }
    @media (max-width: 480px) { .${uid('tguar')}-wrap { flex-direction: column; gap: 16px; } .${uid('tguar')}-item { justify-content: center; } }
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
    id: 'features-dark-bar',
    name: 'Features - Dark Bar',
    category: 'Features',
    description: 'Dark feature bar with icons',
    thumbnail: '',
    fields: [
      { id: 'item1', label: 'Item 1', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'item2', label: 'Item 2', type: 'text', defaultValue: 'Easy Returns' },
      { id: 'item3', label: 'Item 3', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'item4', label: 'Item 4', type: 'text', defaultValue: 'Premium Quality' },
    ],
    generateHtml: (v) => `<div class="${uid('fbar')}" style="background:linear-gradient(135deg,#1a1a1a 0%,#0a0a0a 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fbar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fbar')}-wrap { max-width: 1200px; margin: 0 auto; padding: 32px 48px; display: flex; justify-content: center; gap: 72px; flex-wrap: wrap; }
    .${uid('fbar')}-item { display: flex; align-items: center; gap: 14px; }
    .${uid('fbar')}-icon {
      width: 20px; height: 20px; border-radius: 50%; border: 2px solid #D4AF37;
      display: flex; align-items: center; justify-content: center;
      color: #D4AF37; font-size: 10px; font-weight: 700;
    }
    .${uid('fbar')}-item span { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.9); letter-spacing: 0.03em; }
    @media (max-width: 768px) { .${uid('fbar')}-wrap { gap: 40px; padding: 24px; } }
    @media (max-width: 480px) { .${uid('fbar')}-wrap { flex-direction: column; gap: 20px; } .${uid('fbar')}-item { justify-content: center; } }
  </style>
  <div class="${uid('fbar')}-wrap">
    <div class="${uid('fbar')}-item"><span class="${uid('fbar')}-icon">✓</span><span>${v.item1}</span></div>
    <div class="${uid('fbar')}-item"><span class="${uid('fbar')}-icon">✓</span><span>${v.item2}</span></div>
    <div class="${uid('fbar')}-item"><span class="${uid('fbar')}-icon">✓</span><span>${v.item3}</span></div>
    <div class="${uid('fbar')}-item"><span class="${uid('fbar')}-icon">✓</span><span>${v.item4}</span></div>
  </div>
</div>`
  },

  // ========== PREMIUM TESTIMONIALS ==========
  {
    id: 'testimonial-cards-premium',
    name: 'Testimonial - Cards',
    category: 'Testimonials',
    description: 'Three testimonial cards with premium design',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'What Our Customers Say' },
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'Exceptional quality and fast shipping. This exceeded all my expectations.' },
      { id: 'author1', label: 'Author 1', type: 'text', defaultValue: 'Michael R.' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'The best purchase I have made this year. Worth every single penny.' },
      { id: 'author2', label: 'Author 2', type: 'text', defaultValue: 'Sarah L.' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'Customer service was incredible. They truly care about their customers.' },
      { id: 'author3', label: 'Author 3', type: 'text', defaultValue: 'James K.' },
    ],
    generateHtml: (v) => `<div class="${uid('tcards')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tcards')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tcards')}-wrap { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }
    .${uid('tcards')} h2 { font-size: 36px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 64px; letter-spacing: -0.02em; }
    .${uid('tcards')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('tcards')}-card {
      background: linear-gradient(135deg, #fafafa 0%, #fff 100%);
      padding: 40px 32px; border-radius: 16px;
      border: 1px solid #f0f0f0;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    }
    .${uid('tcards')}-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); border-color: transparent; }
    .${uid('tcards')}-stars { font-size: 14px; color: #D4AF37; letter-spacing: 4px; margin-bottom: 20px; }
    .${uid('tcards')}-card p { font-size: 16px; line-height: 1.7; color: #444; margin-bottom: 24px; font-style: italic; }
    .${uid('tcards')}-card strong { font-size: 14px; color: #1a1a1a; letter-spacing: 0.05em; }
    @media (max-width: 768px) { .${uid('tcards')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('tcards')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('tcards')}-grid">
      <div class="${uid('tcards')}-card"><div class="${uid('tcards')}-stars">★★★★★</div><p>"${v.quote1}"</p><strong>${v.author1}</strong></div>
      <div class="${uid('tcards')}-card"><div class="${uid('tcards')}-stars">★★★★★</div><p>"${v.quote2}"</p><strong>${v.author2}</strong></div>
      <div class="${uid('tcards')}-card"><div class="${uid('tcards')}-stars">★★★★★</div><p>"${v.quote3}"</p><strong>${v.author3}</strong></div>
    </div>
  </div>
</div>`
  },

  // ========== PREMIUM CTA ==========
  {
    id: 'cta-dark-gold',
    name: 'CTA - Dark Gold',
    category: 'CTA',
    description: 'Premium dark CTA with gold accents',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Join the Inner Circle' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Be the first to know about exclusive drops and members-only offers.' },
      { id: 'placeholder', label: 'Input Placeholder', type: 'text', defaultValue: 'Your email address' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Get Access' },
    ],
    generateHtml: (v) => `<div class="${uid('ctadg')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctadg')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctadg')}-wrap { max-width: 600px; margin: 0 auto; padding: 80px 32px; text-align: center; }
    .${uid('ctadg')} h2 { font-size: 32px; font-weight: 300; color: #fff; margin-bottom: 16px; letter-spacing: -0.02em; }
    .${uid('ctadg')} p { font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 32px; }
    .${uid('ctadg')}-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; }
    .${uid('ctadg')}-form input {
      flex: 1; padding: 16px 20px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px;
      font-size: 15px; outline: none; background: rgba(255,255,255,0.05); color: #fff;
      transition: all 0.3s ease;
    }
    .${uid('ctadg')}-form input::placeholder { color: rgba(255,255,255,0.4); }
    .${uid('ctadg')}-form input:focus { border-color: #D4AF37; background: rgba(255,255,255,0.08); }
    .${uid('ctadg')}-form button {
      padding: 16px 32px; background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%); color: #000; border: none; border-radius: 8px;
      font-size: 14px; font-weight: 600; letter-spacing: 0.05em; cursor: pointer;
      transition: all 0.3s ease;
    }
    .${uid('ctadg')}-form button:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.3); }
    @media (max-width: 768px) { .${uid('ctadg')}-wrap { padding: 60px 24px; } .${uid('ctadg')} h2 { font-size: 26px; } }
    @media (max-width: 480px) { .${uid('ctadg')}-wrap { padding: 48px 16px; } .${uid('ctadg')} h2 { font-size: 22px; } .${uid('ctadg')}-form { flex-direction: column; } .${uid('ctadg')}-form button { width: 100%; } }
  </style>
  <div class="${uid('ctadg')}-wrap">
    <h2>${v.headline}</h2>
    <p>${v.description}</p>
    <div class="${uid('ctadg')}-form">
      <input type="email" placeholder="${v.placeholder}" />
      <button>${v.buttonText}</button>
    </div>
  </div>
</div>`
  },
  // ========== PREMIUM FAQ ==========
  {
    id: 'faq-card-grid',
    name: 'FAQ - Card Grid',
    category: 'FAQ',
    description: 'FAQ in card grid layout',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Common Questions' },
      { id: 'q1', label: 'Topic 1', type: 'text', defaultValue: 'Shipping' },
      { id: 'a1', label: 'Answer 1', type: 'text', defaultValue: 'Complimentary shipping on orders over $100. Standard delivery takes 3-5 business days.' },
      { id: 'q2', label: 'Topic 2', type: 'text', defaultValue: 'Returns' },
      { id: 'a2', label: 'Answer 2', type: 'text', defaultValue: '30-day hassle-free returns on all unworn items in original packaging.' },
      { id: 'q3', label: 'Topic 3', type: 'text', defaultValue: 'Sizing' },
      { id: 'a3', label: 'Answer 3', type: 'text', defaultValue: 'Check our detailed size guide or contact us for personalized recommendations.' },
      { id: 'q4', label: 'Topic 4', type: 'text', defaultValue: 'Support' },
      { id: 'a4', label: 'Answer 4', type: 'text', defaultValue: '24/7 customer support via chat, email, or phone. We are here to help.' },
    ],
    generateHtml: (v) => `<div class="${uid('faqcg')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('faqcg')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faqcg')}-wrap { max-width: 1000px; margin: 0 auto; padding: 100px 32px; }
    .${uid('faqcg')} h2 { font-size: 36px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 64px; letter-spacing: -0.02em; }
    .${uid('faqcg')}-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .${uid('faqcg')}-card { background: #fff; padding: 32px; border-radius: 12px; border: 1px solid #eee; transition: all 0.3s ease; }
    .${uid('faqcg')}-card:hover { border-color: transparent; box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
    .${uid('faqcg')}-card h3 { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('faqcg')}-card p { font-size: 14px; line-height: 1.6; color: #666; }
    @media (max-width: 768px) { .${uid('faqcg')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('faqcg')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faqcg')}-grid">
      <div class="${uid('faqcg')}-card"><h3>${v.q1}</h3><p>${v.a1}</p></div>
      <div class="${uid('faqcg')}-card"><h3>${v.q2}</h3><p>${v.a2}</p></div>
      <div class="${uid('faqcg')}-card"><h3>${v.q3}</h3><p>${v.a3}</p></div>
      <div class="${uid('faqcg')}-card"><h3>${v.q4}</h3><p>${v.a4}</p></div>
    </div>
  </div>
</div>`
  },

  {
    id: 'hero-split-image',
    name: 'Hero - Split Image',
    category: 'Hero',
    description: 'Hero with image on right',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'New Arrivals' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Discover our latest collection of premium essentials. Quality craftsmanship meets timeless design.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
      { id: 'imageUrl', label: 'Image URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
    ],
    generateHtml: (v) => `<div class="${uid('herosi')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('herosi')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('herosi')}-wrap { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
    .${uid('herosi')}-content { padding: 100px 80px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('herosi')} h1 { font-size: 56px; font-weight: 300; color: #1a1a1a; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.03em; }
    .${uid('herosi')} p { font-size: 18px; color: #666; line-height: 1.7; margin-bottom: 40px; }
    .${uid('herosi')} a {
      display: inline-block; padding: 18px 48px; background: #1a1a1a; color: #fff; width: fit-content;
      text-decoration: none; border-radius: 8px;
      font-size: 14px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
      transition: all 0.3s ease;
    }
    .${uid('herosi')} a:hover { background: #000; transform: translateY(-2px); }
    .${uid('herosi')}-img { background: url('${v.imageUrl}') center/cover; }
    @media (max-width: 768px) { .${uid('herosi')}-wrap { grid-template-columns: 1fr; } .${uid('herosi')}-img { height: 400px; } }
  </style>
  <div class="${uid('herosi')}-wrap">
    <div class="${uid('herosi')}-content">
      <h1>${v.headline}</h1>
      <p>${v.description}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
    <div class="${uid('herosi')}-img"></div>
  </div>
</div>`
  },

  // ========== PRODUCT SECTION ==========
  {
    id: 'product-spotlight',
    name: 'Product - Spotlight',
    category: 'Product',
    description: 'Featured product spotlight',
    thumbnail: '',
    fields: [
      { id: 'imageUrl', label: 'Image URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'badge', label: 'Badge Text', type: 'text', defaultValue: 'Featured' },
      { id: 'title', label: 'Product Title', type: 'text', defaultValue: 'The Essential Collection' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Crafted from premium materials with meticulous attention to detail. A timeless piece designed to elevate your everyday.' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: 'From $149' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'View Details' },
      { id: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('pspot')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pspot')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pspot')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .${uid('pspot')}-img { aspect-ratio: 1; border-radius: 16px; overflow: hidden; }
    .${uid('pspot')}-img img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('pspot')}-badge { display: inline-block; padding: 8px 16px; background: #1a1a1a; color: #fff; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; border-radius: 4px; margin-bottom: 24px; }
    .${uid('pspot')}-content h2 { font-size: 36px; font-weight: 300; color: #1a1a1a; margin-bottom: 20px; letter-spacing: -0.02em; }
    .${uid('pspot')}-content p { font-size: 16px; line-height: 1.7; color: #666; margin-bottom: 24px; }
    .${uid('pspot')}-price { font-size: 24px; font-weight: 500; color: #1a1a1a; margin-bottom: 32px; }
    .${uid('pspot')}-content a {
      display: inline-block; padding: 16px 40px; background: #1a1a1a; color: #fff;
      text-decoration: none; border-radius: 8px;
      font-size: 14px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
      transition: all 0.3s ease;
    }
    .${uid('pspot')}-content a:hover { background: #000; transform: translateY(-2px); }
    @media (max-width: 768px) { .${uid('pspot')}-wrap { grid-template-columns: 1fr; gap: 40px; } }
  </style>
  <div class="${uid('pspot')}-wrap">
    <div class="${uid('pspot')}-img"><img src="${v.imageUrl}" alt="Product" /></div>
    <div class="${uid('pspot')}-content">
      <span class="${uid('pspot')}-badge">${v.badge}</span>
      <h2>${v.title}</h2>
      <p>${v.description}</p>
      <div class="${uid('pspot')}-price">${v.price}</div>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },

  // ========== DIVIDERS ==========

  // ========== COUNTDOWN & TIMER SECTIONS ==========

  // ========== MORE PRODUCT SECTIONS ==========
  {
    id: 'product-grid-3up',
    name: 'Product - Grid 3-Up',
    category: 'Product',
    description: 'Elegant 3-product grid with hover effects',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Best Sellers' },
      { id: 'prod1Image', label: 'Product 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'prod1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Classic Watch' },
      { id: 'prod1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$295' },
      { id: 'prod2Image', label: 'Product 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'prod2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Leather Bag' },
      { id: 'prod2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$450' },
      { id: 'prod3Image', label: 'Product 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'prod3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Sunglasses' },
      { id: 'prod3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$180' },
    ],
    generateHtml: (v) => `<div class="${uid('pgrid3')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pgrid3')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pgrid3')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
    .${uid('pgrid3')} h2 { font-size: 32px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 56px; letter-spacing: -0.02em; }
    .${uid('pgrid3')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('pgrid3')}-item { position: relative; cursor: pointer; }
    .${uid('pgrid3')}-img { aspect-ratio: 4/5; overflow: hidden; border-radius: 12px; margin-bottom: 20px; }
    .${uid('pgrid3')}-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
    .${uid('pgrid3')}-item:hover img { transform: scale(1.05); }
    .${uid('pgrid3')}-name { font-size: 16px; font-weight: 500; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('pgrid3')}-price { font-size: 15px; color: #666; }
    .${uid('pgrid3')}-quick { position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(20px); opacity: 0; padding: 12px 32px; background: #fff; color: #1a1a1a; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); transition: all 0.3s ease; white-space: nowrap; }
    .${uid('pgrid3')}-item:hover .${uid('pgrid3')}-quick { opacity: 1; transform: translateX(-50%) translateY(0); }
    @media (max-width: 768px) { .${uid('pgrid3')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('pgrid3')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('pgrid3')}-grid">
      <div class="${uid('pgrid3')}-item">
        <div class="${uid('pgrid3')}-img"><img src="${v.prod1Image}" alt="${v.prod1Name}" /></div>
        <div class="${uid('pgrid3')}-name">${v.prod1Name}</div>
        <div class="${uid('pgrid3')}-price">${v.prod1Price}</div>
        <span class="${uid('pgrid3')}-quick">Quick View</span>
      </div>
      <div class="${uid('pgrid3')}-item">
        <div class="${uid('pgrid3')}-img"><img src="${v.prod2Image}" alt="${v.prod2Name}" /></div>
        <div class="${uid('pgrid3')}-name">${v.prod2Name}</div>
        <div class="${uid('pgrid3')}-price">${v.prod2Price}</div>
        <span class="${uid('pgrid3')}-quick">Quick View</span>
      </div>
      <div class="${uid('pgrid3')}-item">
        <div class="${uid('pgrid3')}-img"><img src="${v.prod3Image}" alt="${v.prod3Name}" /></div>
        <div class="${uid('pgrid3')}-name">${v.prod3Name}</div>
        <div class="${uid('pgrid3')}-price">${v.prod3Price}</div>
        <span class="${uid('pgrid3')}-quick">Quick View</span>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'product-comparison',
    name: 'Product - Comparison',
    category: 'Product',
    description: 'Side-by-side product comparison table',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Compare Our Products' },
      { id: 'prod1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Essential' },
      { id: 'prod1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$99' },
      { id: 'prod2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Premium' },
      { id: 'prod2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$199' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Premium Materials' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Lifetime Warranty' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Free Shipping' },
    ],
    generateHtml: (v) => `<div class="${uid('pcomp')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pcomp')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pcomp')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 48px; }
    .${uid('pcomp')} h2 { font-size: 32px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('pcomp')}-table { width: 100%; border-collapse: collapse; }
    .${uid('pcomp')}-table th, .${uid('pcomp')}-table td { padding: 20px 24px; text-align: center; border-bottom: 1px solid #eee; }
    .${uid('pcomp')}-table th { font-size: 18px; font-weight: 600; color: #1a1a1a; }
    .${uid('pcomp')}-table th.${uid('pcomp')}-featured { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); color: #fff; border-radius: 12px 12px 0 0; }
    .${uid('pcomp')}-price { font-size: 24px; font-weight: 300; color: #D4AF37; }
    .${uid('pcomp')}-table td:first-child { text-align: left; font-size: 14px; color: #666; }
    .${uid('pcomp')}-check { color: #22c55e; font-size: 18px; }
    .${uid('pcomp')}-x { color: #ccc; font-size: 18px; }
    .${uid('pcomp')}-btn { display: inline-block; margin-top: 16px; padding: 12px 32px; background: #1a1a1a; color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 6px; text-decoration: none; transition: all 0.3s ease; }
    .${uid('pcomp')}-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    @media (max-width: 768px) { .${uid('pcomp')}-wrap { padding: 60px 24px; } .${uid('pcomp')} h2 { font-size: 26px; } .${uid('pcomp')}-table th, .${uid('pcomp')}-table td { padding: 16px 12px; } .${uid('pcomp')}-price { font-size: 20px; } }
    @media (max-width: 480px) { .${uid('pcomp')}-wrap { padding: 40px 12px; } .${uid('pcomp')}-table th { font-size: 14px; } .${uid('pcomp')}-table td:first-child { font-size: 12px; } .${uid('pcomp')}-btn { padding: 10px 20px; font-size: 11px; } }
  </style>
  <div class="${uid('pcomp')}-wrap">
    <h2>${v.headline}</h2>
    <table class="${uid('pcomp')}-table">
      <thead>
        <tr><th></th><th>${v.prod1Name}</th><th class="${uid('pcomp')}-featured">${v.prod2Name}</th></tr>
      </thead>
      <tbody>
        <tr><td></td><td class="${uid('pcomp')}-price">${v.prod1Price}</td><td class="${uid('pcomp')}-price">${v.prod2Price}</td></tr>
        <tr><td>${v.feature1}</td><td><span class="${uid('pcomp')}-check">✓</span></td><td><span class="${uid('pcomp')}-check">✓</span></td></tr>
        <tr><td>${v.feature2}</td><td><span class="${uid('pcomp')}-x">—</span></td><td><span class="${uid('pcomp')}-check">✓</span></td></tr>
        <tr><td>${v.feature3}</td><td><span class="${uid('pcomp')}-x">—</span></td><td><span class="${uid('pcomp')}-check">✓</span></td></tr>
        <tr><td></td><td><a href="#" class="${uid('pcomp')}-btn">Select</a></td><td><a href="#" class="${uid('pcomp')}-btn">Select</a></td></tr>
      </tbody>
    </table>
  </div>
</div>`
  },
  {
    id: 'product-featured-row',
    name: 'Product - Featured Row',
    category: 'Product',
    description: 'Horizontal scrolling featured products',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'New Arrivals' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '35' },
    ],
    generateHtml: (v) => `<div class="${uid('pfrow')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;overflow:hidden;">
  <style>
    .${uid('pfrow')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pfrow')}-wrap { padding: 64px 0; }
    .${uid('pfrow')} h2 { font-size: 28px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 48px; letter-spacing: -0.01em; }
    .${uid('pfrow')}-track { display: flex; animation: ${uid('pfrow')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('pfrow')}-track:hover { animation-play-state: paused; }
    .${uid('pfrow')}-item { flex-shrink: 0; width: 280px; margin: 0 16px; }
    .${uid('pfrow')}-img { aspect-ratio: 3/4; background: linear-gradient(135deg, #f5f5f5 0%, #eee 100%); border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 13px; }
    .${uid('pfrow')}-name { font-size: 15px; font-weight: 500; color: #1a1a1a; margin-bottom: 6px; }
    .${uid('pfrow')}-price { font-size: 14px; color: #666; }
    @keyframes ${uid('pfrow')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @media (max-width: 768px) { .${uid('pfrow')}-wrap { padding: 48px 0; } .${uid('pfrow')} h2 { font-size: 24px; margin-bottom: 32px; } .${uid('pfrow')}-item { width: 220px; margin: 0 12px; } }
    @media (max-width: 480px) { .${uid('pfrow')}-item { width: 180px; margin: 0 8px; } .${uid('pfrow')}-name { font-size: 13px; } .${uid('pfrow')}-price { font-size: 12px; } }
  </style>
  <div class="${uid('pfrow')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('pfrow')}-track">
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Essential Tee</div><div class="${uid('pfrow')}-price">$45</div></div>
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Classic Hoodie</div><div class="${uid('pfrow')}-price">$95</div></div>
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Premium Jacket</div><div class="${uid('pfrow')}-price">$195</div></div>
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Leather Belt</div><div class="${uid('pfrow')}-price">$75</div></div>
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Essential Tee</div><div class="${uid('pfrow')}-price">$45</div></div>
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Classic Hoodie</div><div class="${uid('pfrow')}-price">$95</div></div>
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Premium Jacket</div><div class="${uid('pfrow')}-price">$195</div></div>
      <div class="${uid('pfrow')}-item"><div class="${uid('pfrow')}-img">Product Image</div><div class="${uid('pfrow')}-name">Leather Belt</div><div class="${uid('pfrow')}-price">$75</div></div>
    </div>
  </div>
</div>`
  },

  // ========== GALLERY SECTIONS ==========
  {
    id: 'gallery-grid',
    name: 'Gallery - Image Grid',
    category: 'Gallery',
    description: 'Elegant image gallery with hover effects',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Gallery' },
    ],
    generateHtml: (v) => `<div class="${uid('gallgrid')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('gallgrid')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('gallgrid')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
    .${uid('gallgrid')} h2 { font-size: 32px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('gallgrid')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .${uid('gallgrid')}-item { aspect-ratio: 1; background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%); border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px; }
    .${uid('gallgrid')}-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.3) 100%); opacity: 0; transition: opacity 0.4s ease; }
    .${uid('gallgrid')}-item:hover::after { opacity: 1; }
    .${uid('gallgrid')}-item:nth-child(1) { grid-column: span 2; grid-row: span 2; aspect-ratio: auto; }
    @media (max-width: 768px) { .${uid('gallgrid')}-grid { grid-template-columns: repeat(2, 1fr); } .${uid('gallgrid')}-item:nth-child(1) { grid-column: span 2; } }
  </style>
  <div class="${uid('gallgrid')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('gallgrid')}-grid">
      <div class="${uid('gallgrid')}-item">Image 1</div>
      <div class="${uid('gallgrid')}-item">Image 2</div>
      <div class="${uid('gallgrid')}-item">Image 3</div>
      <div class="${uid('gallgrid')}-item">Image 4</div>
      <div class="${uid('gallgrid')}-item">Image 5</div>
      <div class="${uid('gallgrid')}-item">Image 6</div>
      <div class="${uid('gallgrid')}-item">Image 7</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'gallery-instagram',
    name: 'Gallery - Instagram Feed',
    category: 'Gallery',
    description: 'Instagram-style social feed',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Follow Us @yourbrand' },
      { id: 'handle', label: 'Instagram Handle', type: 'text', defaultValue: '@yourbrand' },
    ],
    generateHtml: (v) => `<div class="${uid('gallinsta')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('gallinsta')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('gallinsta')}-wrap { padding: 64px 0; text-align: center; }
    .${uid('gallinsta')} h2 { font-size: 28px; font-weight: 300; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('gallinsta')}-handle { font-size: 14px; color: #D4AF37; margin-bottom: 40px; display: inline-block; text-decoration: none; font-weight: 500; }
    .${uid('gallinsta')}-grid { display: flex; gap: 4px; overflow: hidden; }
    .${uid('gallinsta')}-item { flex: 1; aspect-ratio: 1; background: linear-gradient(135deg, #f0f0f0 0%, #e5e5e5 100%); position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #999; font-size: 11px; }
    .${uid('gallinsta')}-item::after { content: '♥'; position: absolute; inset: 0; background: rgba(0,0,0,0.4); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; opacity: 0; transition: opacity 0.3s ease; }
    .${uid('gallinsta')}-item:hover::after { opacity: 1; }
    @media (max-width: 768px) { .${uid('gallinsta')}-wrap { padding: 48px 0; } .${uid('gallinsta')} h2 { font-size: 24px; } .${uid('gallinsta')}-grid { flex-wrap: wrap; } .${uid('gallinsta')}-item { flex: 0 0 calc(33.333% - 3px); } }
    @media (max-width: 480px) { .${uid('gallinsta')}-item { flex: 0 0 calc(50% - 2px); } .${uid('gallinsta')}-grid { gap: 2px; } }
  </style>
  <div class="${uid('gallinsta')}-wrap">
    <h2>${v.headline}</h2>
    <a href="#" class="${uid('gallinsta')}-handle">${v.handle}</a>
    <div class="${uid('gallinsta')}-grid">
      <div class="${uid('gallinsta')}-item">Post 1</div>
      <div class="${uid('gallinsta')}-item">Post 2</div>
      <div class="${uid('gallinsta')}-item">Post 3</div>
      <div class="${uid('gallinsta')}-item">Post 4</div>
      <div class="${uid('gallinsta')}-item">Post 5</div>
      <div class="${uid('gallinsta')}-item">Post 6</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'gallery-lookbook',
    name: 'Gallery - Lookbook',
    category: 'Gallery',
    description: 'Magazine-style lookbook layout',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Collection Name', type: 'text', defaultValue: 'SPRING / SUMMER 2025' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'A celebration of modern minimalism and timeless elegance.' },
    ],
    generateHtml: (v) => `<div class="${uid('galllook')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('galllook')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('galllook')}-wrap { max-width: 1400px; margin: 0 auto; padding: 80px 48px; }
    .${uid('galllook')}-header { text-align: center; margin-bottom: 64px; }
    .${uid('galllook')}-header h2 { font-size: 14px; font-weight: 500; letter-spacing: 0.4em; color: #D4AF37; margin-bottom: 16px; }
    .${uid('galllook')}-header p { font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.6); max-width: 500px; margin: 0 auto; }
    .${uid('galllook')}-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 300px 200px; gap: 16px; }
    .${uid('galllook')}-item { background: linear-gradient(135deg, #1a1a1a 0%, #222 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666; font-size: 12px; position: relative; overflow: hidden; }
    .${uid('galllook')}-item:nth-child(1) { grid-row: span 2; }
    .${uid('galllook')}-item::before { content: ''; position: absolute; inset: 0; border: 1px solid rgba(212,175,55,0); transition: border-color 0.4s ease; }
    .${uid('galllook')}-item:hover::before { border-color: rgba(212,175,55,0.5); }
    @media (max-width: 768px) { .${uid('galllook')}-grid { grid-template-columns: 1fr; grid-template-rows: auto; } .${uid('galllook')}-item { min-height: 250px; } .${uid('galllook')}-item:nth-child(1) { grid-row: auto; } }
  </style>
  <div class="${uid('galllook')}-wrap">
    <div class="${uid('galllook')}-header">
      <h2>${v.headline}</h2>
      <p>${v.description}</p>
    </div>
    <div class="${uid('galllook')}-grid">
      <div class="${uid('galllook')}-item">Look 1</div>
      <div class="${uid('galllook')}-item">Look 2</div>
      <div class="${uid('galllook')}-item">Look 3</div>
      <div class="${uid('galllook')}-item">Look 4</div>
      <div class="${uid('galllook')}-item">Look 5</div>
    </div>
  </div>
</div>`
  },

  // ========== PRICING SECTIONS ==========
  {
    id: 'pricing-table',
    name: 'Pricing - Membership Tiers',
    category: 'Pricing',
    description: 'Premium membership pricing table',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Choose Your Membership' },
      { id: 'tier1Name', label: 'Tier 1 Name', type: 'text', defaultValue: 'Essential' },
      { id: 'tier1Price', label: 'Tier 1 Price', type: 'text', defaultValue: '$29/mo' },
      { id: 'tier2Name', label: 'Tier 2 Name', type: 'text', defaultValue: 'Premium' },
      { id: 'tier2Price', label: 'Tier 2 Price', type: 'text', defaultValue: '$79/mo' },
      { id: 'tier3Name', label: 'Tier 3 Name', type: 'text', defaultValue: 'Elite' },
      { id: 'tier3Price', label: 'Tier 3 Price', type: 'text', defaultValue: '$149/mo' },
    ],
    generateHtml: (v) => `<div class="${uid('prictbl')}" style="background:linear-gradient(180deg,#fafafa 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('prictbl')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('prictbl')}-wrap { max-width: 1100px; margin: 0 auto; padding: 80px 48px; }
    .${uid('prictbl')} h2 { font-size: 36px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 56px; }
    .${uid('prictbl')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('prictbl')}-card { background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 40px 32px; text-align: center; transition: all 0.4s ease; }
    .${uid('prictbl')}-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
    .${uid('prictbl')}-card.${uid('prictbl')}-featured { background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border: none; transform: scale(1.05); }
    .${uid('prictbl')}-card.${uid('prictbl')}-featured:hover { transform: scale(1.05) translateY(-8px); }
    .${uid('prictbl')}-name { font-size: 14px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #666; margin-bottom: 16px; }
    .${uid('prictbl')}-featured .${uid('prictbl')}-name { color: #D4AF37; }
    .${uid('prictbl')}-price { font-size: 48px; font-weight: 200; color: #1a1a1a; margin-bottom: 24px; }
    .${uid('prictbl')}-featured .${uid('prictbl')}-price { color: #fff; }
    .${uid('prictbl')}-features { list-style: none; margin-bottom: 32px; }
    .${uid('prictbl')}-features li { font-size: 14px; color: #666; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
    .${uid('prictbl')}-featured .${uid('prictbl')}-features li { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.1); }
    .${uid('prictbl')}-btn { display: inline-block; padding: 14px 40px; background: #1a1a1a; color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 8px; text-decoration: none; transition: all 0.3s ease; }
    .${uid('prictbl')}-featured .${uid('prictbl')}-btn { background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%); color: #000; }
    @media (max-width: 768px) { .${uid('prictbl')}-grid { grid-template-columns: 1fr; } .${uid('prictbl')}-card.${uid('prictbl')}-featured { transform: none; } }
  </style>
  <div class="${uid('prictbl')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('prictbl')}-grid">
      <div class="${uid('prictbl')}-card">
        <div class="${uid('prictbl')}-name">${v.tier1Name}</div>
        <div class="${uid('prictbl')}-price">${v.tier1Price}</div>
        <ul class="${uid('prictbl')}-features"><li>Free Shipping</li><li>Member Discounts</li><li>Early Access</li></ul>
        <a href="#" class="${uid('prictbl')}-btn">Get Started</a>
      </div>
      <div class="${uid('prictbl')}-card ${uid('prictbl')}-featured">
        <div class="${uid('prictbl')}-name">${v.tier2Name}</div>
        <div class="${uid('prictbl')}-price">${v.tier2Price}</div>
        <ul class="${uid('prictbl')}-features"><li>Everything in Essential</li><li>Priority Support</li><li>Exclusive Products</li></ul>
        <a href="#" class="${uid('prictbl')}-btn">Get Started</a>
      </div>
      <div class="${uid('prictbl')}-card">
        <div class="${uid('prictbl')}-name">${v.tier3Name}</div>
        <div class="${uid('prictbl')}-price">${v.tier3Price}</div>
        <ul class="${uid('prictbl')}-features"><li>Everything in Premium</li><li>Concierge Service</li><li>VIP Events</li></ul>
        <a href="#" class="${uid('prictbl')}-btn">Get Started</a>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'pricing-simple',
    name: 'Pricing - Simple Cards',
    category: 'Pricing',
    description: 'Clean simple pricing display',
    thumbnail: '',
    fields: [
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Monthly' },
      { id: 'plan1Price', label: 'Plan 1 Price', type: 'text', defaultValue: '$19' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Annual' },
      { id: 'plan2Price', label: 'Plan 2 Price', type: 'text', defaultValue: '$149' },
      { id: 'plan2Badge', label: 'Plan 2 Badge', type: 'text', defaultValue: 'Save 35%' },
    ],
    generateHtml: (v) => `<div class="${uid('pricsimple')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pricsimple')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pricsimple')}-wrap { max-width: 700px; margin: 0 auto; padding: 64px 48px; display: flex; gap: 24px; justify-content: center; }
    .${uid('pricsimple')}-card { flex: 1; max-width: 280px; padding: 40px 32px; border: 1px solid #eee; border-radius: 16px; text-align: center; position: relative; transition: all 0.3s ease; }
    .${uid('pricsimple')}-card:hover { border-color: #D4AF37; }
    .${uid('pricsimple')}-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); padding: 6px 16px; background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%); color: #000; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; border-radius: 20px; white-space: nowrap; }
    .${uid('pricsimple')}-name { font-size: 13px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #666; margin-bottom: 16px; }
    .${uid('pricsimple')}-price { font-size: 56px; font-weight: 200; color: #1a1a1a; }
    .${uid('pricsimple')}-period { font-size: 14px; color: #999; }
    @media (max-width: 768px) { .${uid('pricsimple')}-wrap { padding: 48px 24px; } .${uid('pricsimple')}-card { padding: 32px 24px; } .${uid('pricsimple')}-price { font-size: 44px; } }
    @media (max-width: 480px) { .${uid('pricsimple')}-wrap { flex-direction: column; align-items: center; } .${uid('pricsimple')}-card { max-width: 100%; width: 100%; } }
  </style>
  <div class="${uid('pricsimple')}-wrap">
    <div class="${uid('pricsimple')}-card">
      <div class="${uid('pricsimple')}-name">${v.plan1Name}</div>
      <div class="${uid('pricsimple')}-price">${v.plan1Price}</div>
      <div class="${uid('pricsimple')}-period">per month</div>
    </div>
    <div class="${uid('pricsimple')}-card">
      <span class="${uid('pricsimple')}-badge">${v.plan2Badge}</span>
      <div class="${uid('pricsimple')}-name">${v.plan2Name}</div>
      <div class="${uid('pricsimple')}-price">${v.plan2Price}</div>
      <div class="${uid('pricsimple')}-period">per year</div>
    </div>
  </div>
</div>`
  },

  // ========== ABOUT/STORY SECTIONS ==========
  {
    id: 'story-timeline',
    name: 'Story - Timeline',
    category: 'Story',
    description: 'Brand story timeline with milestones',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Journey' },
      { id: 'year1', label: 'Year 1', type: 'text', defaultValue: '2018' },
      { id: 'event1', label: 'Event 1', type: 'text', defaultValue: 'Founded with a vision to redefine quality' },
      { id: 'year2', label: 'Year 2', type: 'text', defaultValue: '2020' },
      { id: 'event2', label: 'Event 2', type: 'text', defaultValue: 'Launched our flagship collection' },
      { id: 'year3', label: 'Year 3', type: 'text', defaultValue: '2023' },
      { id: 'event3', label: 'Event 3', type: 'text', defaultValue: 'Expanded to 50+ countries worldwide' },
    ],
    generateHtml: (v) => `<div class="${uid('storytime')}" style="background:linear-gradient(180deg,#0a0a0a 0%,#111 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('storytime')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('storytime')}-wrap { max-width: 900px; margin: 0 auto; padding: 80px 48px; }
    .${uid('storytime')} h2 { font-size: 36px; font-weight: 300; color: #fff; text-align: center; margin-bottom: 64px; }
    .${uid('storytime')}-line { position: relative; padding-left: 48px; }
    .${uid('storytime')}-line::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0; width: 1px; background: linear-gradient(180deg, #D4AF37 0%, rgba(212,175,55,0.2) 100%); }
    .${uid('storytime')}-item { position: relative; padding-bottom: 48px; }
    .${uid('storytime')}-item::before { content: ''; position: absolute; left: -44px; top: 4px; width: 12px; height: 12px; background: #D4AF37; border-radius: 50%; box-shadow: 0 0 20px rgba(212,175,55,0.5); }
    .${uid('storytime')}-year { font-size: 14px; font-weight: 600; letter-spacing: 0.2em; color: #D4AF37; margin-bottom: 8px; }
    .${uid('storytime')}-event { font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.8); line-height: 1.5; }
    @media (max-width: 768px) { .${uid('storytime')}-wrap { padding: 60px 24px; } .${uid('storytime')} h2 { font-size: 28px; margin-bottom: 48px; } .${uid('storytime')}-event { font-size: 16px; } }
    @media (max-width: 480px) { .${uid('storytime')}-wrap { padding: 48px 16px; } .${uid('storytime')}-line { padding-left: 32px; } .${uid('storytime')}-item::before { left: -28px; width: 10px; height: 10px; } }
  </style>
  <div class="${uid('storytime')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('storytime')}-line">
      <div class="${uid('storytime')}-item"><div class="${uid('storytime')}-year">${v.year1}</div><div class="${uid('storytime')}-event">${v.event1}</div></div>
      <div class="${uid('storytime')}-item"><div class="${uid('storytime')}-year">${v.year2}</div><div class="${uid('storytime')}-event">${v.event2}</div></div>
      <div class="${uid('storytime')}-item"><div class="${uid('storytime')}-year">${v.year3}</div><div class="${uid('storytime')}-event">${v.event3}</div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'story-founder',
    name: 'Story - Founder Message',
    category: 'Story',
    description: 'Personal founder message section',
    thumbnail: '',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'We started this company with a simple belief: that everyone deserves access to exceptional quality without compromise. Every product we create is a reflection of our commitment to that promise.' },
      { id: 'name', label: 'Founder Name', type: 'text', defaultValue: 'Alexander Mitchell' },
      { id: 'title', label: 'Title', type: 'text', defaultValue: 'Founder & CEO' },
    ],
    generateHtml: (v) => `<div class="${uid('storyfounder')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('storyfounder')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('storyfounder')}-wrap { max-width: 900px; margin: 0 auto; padding: 100px 48px; display: grid; grid-template-columns: 200px 1fr; gap: 64px; align-items: center; }
    .${uid('storyfounder')}-img { width: 200px; height: 200px; background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px; }
    .${uid('storyfounder')}-quote { font-size: 24px; font-weight: 300; line-height: 1.6; color: #1a1a1a; font-style: italic; margin-bottom: 32px; position: relative; padding-left: 32px; }
    .${uid('storyfounder')}-quote::before { content: '"'; position: absolute; left: 0; top: -10px; font-size: 60px; color: #D4AF37; font-style: normal; line-height: 1; }
    .${uid('storyfounder')}-name { font-size: 16px; font-weight: 600; color: #1a1a1a; }
    .${uid('storyfounder')}-title { font-size: 14px; color: #666; margin-top: 4px; }
    @media (max-width: 768px) { .${uid('storyfounder')}-wrap { grid-template-columns: 1fr; text-align: center; } .${uid('storyfounder')}-img { margin: 0 auto; } .${uid('storyfounder')}-quote { padding-left: 0; } .${uid('storyfounder')}-quote::before { position: static; display: block; margin-bottom: 16px; } }
  </style>
  <div class="${uid('storyfounder')}-wrap">
    <div class="${uid('storyfounder')}-img">Photo</div>
    <div class="${uid('storyfounder')}-content">
      <p class="${uid('storyfounder')}-quote">${v.quote}</p>
      <div class="${uid('storyfounder')}-name">${v.name}</div>
      <div class="${uid('storyfounder')}-title">${v.title}</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'story-mission',
    name: 'Story - Mission Statement',
    category: 'Story',
    description: 'Bold mission statement with visual impact',
    thumbnail: '',
    fields: [
      { id: 'label', label: 'Label', type: 'text', defaultValue: 'OUR MISSION' },
      { id: 'statement', label: 'Statement', type: 'textarea', defaultValue: 'To create products that inspire, endure, and elevate everyday life through uncompromising quality and timeless design.' },
    ],
    generateHtml: (v) => `<div class="${uid('storymiss')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#151515 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('storymiss')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('storymiss')}-wrap { max-width: 1000px; margin: 0 auto; padding: 120px 48px; text-align: center; }
    .${uid('storymiss')}-label { font-size: 12px; font-weight: 600; letter-spacing: 0.4em; color: #D4AF37; margin-bottom: 32px; }
    .${uid('storymiss')}-statement { font-size: 42px; font-weight: 200; line-height: 1.4; color: #fff; letter-spacing: -0.01em; }
    @media (max-width: 768px) { .${uid('storymiss')}-statement { font-size: 28px; } }
  </style>
  <div class="${uid('storymiss')}-wrap">
    <div class="${uid('storymiss')}-label">${v.label}</div>
    <p class="${uid('storymiss')}-statement">${v.statement}</p>
  </div>
</div>`
  },

  // ========== CONTACT SECTIONS ==========
  {
    id: 'contact-info-bar',
    name: 'Contact - Info Bar',
    category: 'Contact',
    description: 'Contact information bar',
    thumbnail: '',
    fields: [
      { id: 'email', label: 'Email', type: 'text', defaultValue: 'hello@yourbrand.com' },
      { id: 'phone', label: 'Phone', type: 'text', defaultValue: '+1 (800) 123-4567' },
      { id: 'hours', label: 'Hours', type: 'text', defaultValue: 'Mon-Fri 9AM-6PM EST' },
    ],
    generateHtml: (v) => `<div class="${uid('contbar')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('contbar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('contbar')}-wrap { max-width: 1200px; margin: 0 auto; padding: 32px 48px; display: flex; justify-content: center; gap: 64px; flex-wrap: wrap; }
    .${uid('contbar')}-item { display: flex; align-items: center; gap: 12px; }
    .${uid('contbar')}-label { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; color: rgba(255,255,255,0.4); text-transform: uppercase; }
    .${uid('contbar')}-value { font-size: 14px; color: #fff; }
    .${uid('contbar')}-value a { color: #D4AF37; text-decoration: none; }
    @media (max-width: 768px) { .${uid('contbar')}-wrap { gap: 32px; padding: 24px; } }
    @media (max-width: 480px) { .${uid('contbar')}-wrap { flex-direction: column; gap: 20px; text-align: center; } }
  </style>
  <div class="${uid('contbar')}-wrap">
    <div class="${uid('contbar')}-item"><div><div class="${uid('contbar')}-label">Email</div><div class="${uid('contbar')}-value"><a href="mailto:${v.email}">${v.email}</a></div></div></div>
    <div class="${uid('contbar')}-item"><div><div class="${uid('contbar')}-label">Phone</div><div class="${uid('contbar')}-value">${v.phone}</div></div></div>
    <div class="${uid('contbar')}-item"><div><div class="${uid('contbar')}-label">Hours</div><div class="${uid('contbar')}-value">${v.hours}</div></div></div>
  </div>
</div>`
  },

  // ========== SOCIAL PROOF SECTIONS ==========
  {
    id: 'social-press',
    name: 'Social - Press Mentions',
    category: 'Social',
    description: 'Press quotes and mentions',
    thumbnail: '',
    fields: [
      { id: 'quote1', label: 'Quote 1', type: 'text', defaultValue: '"The gold standard in premium goods"' },
      { id: 'source1', label: 'Source 1', type: 'text', defaultValue: 'Forbes' },
      { id: 'quote2', label: 'Quote 2', type: 'text', defaultValue: '"Redefining modern luxury"' },
      { id: 'source2', label: 'Source 2', type: 'text', defaultValue: 'Vogue' },
    ],
    generateHtml: (v) => `<div class="${uid('socpress')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('socpress')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('socpress')}-wrap { max-width: 1000px; margin: 0 auto; padding: 64px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
    .${uid('socpress')}-item { text-align: center; padding: 32px; border-left: 1px solid #f0f0f0; }
    .${uid('socpress')}-item:first-child { border-left: none; }
    .${uid('socpress')}-quote { font-size: 20px; font-weight: 300; font-style: italic; color: #1a1a1a; margin-bottom: 16px; line-height: 1.4; }
    .${uid('socpress')}-source { font-size: 12px; font-weight: 600; letter-spacing: 0.2em; color: #D4AF37; text-transform: uppercase; }
    @media (max-width: 768px) { .${uid('socpress')}-wrap { grid-template-columns: 1fr; } .${uid('socpress')}-item { border-left: none; border-top: 1px solid #f0f0f0; padding-top: 32px; } .${uid('socpress')}-item:first-child { border-top: none; } }
  </style>
  <div class="${uid('socpress')}-wrap">
    <div class="${uid('socpress')}-item"><div class="${uid('socpress')}-quote">${v.quote1}</div><div class="${uid('socpress')}-source">— ${v.source1}</div></div>
    <div class="${uid('socpress')}-item"><div class="${uid('socpress')}-quote">${v.quote2}</div><div class="${uid('socpress')}-source">— ${v.source2}</div></div>
  </div>
</div>`
  },

  // ========== BANNER/PROMO SECTIONS ==========

  // ========== COLLECTION SECTIONS ==========
  {
    id: 'collection-grid',
    name: 'Collection - Grid',
    category: 'Collection',
    description: 'Collection categories grid',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Shop by Category' },
      { id: 'cat1', label: 'Category 1', type: 'text', defaultValue: 'New Arrivals' },
      { id: 'cat2', label: 'Category 2', type: 'text', defaultValue: 'Best Sellers' },
      { id: 'cat3', label: 'Category 3', type: 'text', defaultValue: 'Sale' },
      { id: 'cat4', label: 'Category 4', type: 'text', defaultValue: 'Accessories' },
    ],
    generateHtml: (v) => `<div class="${uid('collgrid')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('collgrid')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('collgrid')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
    .${uid('collgrid')} h2 { font-size: 32px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('collgrid')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .${uid('collgrid')}-item { aspect-ratio: 3/4; background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); border-radius: 16px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 32px; position: relative; overflow: hidden; cursor: pointer; transition: all 0.4s ease; }
    .${uid('collgrid')}-item::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%); opacity: 0; transition: opacity 0.4s ease; }
    .${uid('collgrid')}-item:hover::before { opacity: 1; }
    .${uid('collgrid')}-item:hover { transform: translateY(-8px); }
    .${uid('collgrid')}-name { font-size: 16px; font-weight: 600; color: #1a1a1a; position: relative; z-index: 1; transition: color 0.4s ease; }
    .${uid('collgrid')}-item:hover .${uid('collgrid')}-name { color: #fff; }
    @media (max-width: 768px) { .${uid('collgrid')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('collgrid')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('collgrid')}-grid">
      <div class="${uid('collgrid')}-item"><span class="${uid('collgrid')}-name">${v.cat1}</span></div>
      <div class="${uid('collgrid')}-item"><span class="${uid('collgrid')}-name">${v.cat2}</span></div>
      <div class="${uid('collgrid')}-item"><span class="${uid('collgrid')}-name">${v.cat3}</span></div>
      <div class="${uid('collgrid')}-item"><span class="${uid('collgrid')}-name">${v.cat4}</span></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'collection-featured',
    name: 'Collection - Featured',
    category: 'Collection',
    description: 'Featured collection with large image',
    thumbnail: '',
    fields: [
      { id: 'label', label: 'Label', type: 'text', defaultValue: 'NEW COLLECTION' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'The Essentials' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Timeless pieces designed to form the foundation of your wardrobe. Quality that speaks for itself.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Explore Collection' },
    ],
    generateHtml: (v) => `<div class="${uid('collfeat')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('collfeat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('collfeat')}-wrap { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; min-height: 500px; }
    .${uid('collfeat')}-img { background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); display: flex; align-items: center; justify-content: center; color: #666; font-size: 14px; }
    .${uid('collfeat')}-content { display: flex; flex-direction: column; justify-content: center; padding: 80px 64px; }
    .${uid('collfeat')}-label { font-size: 11px; font-weight: 600; letter-spacing: 0.3em; color: #D4AF37; margin-bottom: 20px; }
    .${uid('collfeat')} h2 { font-size: 48px; font-weight: 200; color: #fff; margin-bottom: 20px; letter-spacing: -0.02em; }
    .${uid('collfeat')} p { font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 40px; max-width: 400px; }
    .${uid('collfeat')}-btn { display: inline-block; width: fit-content; padding: 16px 40px; background: #fff; color: #0a0a0a; font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; transition: all 0.3s ease; }
    .${uid('collfeat')}-btn:hover { background: #D4AF37; }
    @media (max-width: 768px) { .${uid('collfeat')}-wrap { grid-template-columns: 1fr; } .${uid('collfeat')}-img { min-height: 300px; } .${uid('collfeat')}-content { padding: 48px 32px; } }
  </style>
  <div class="${uid('collfeat')}-wrap">
    <div class="${uid('collfeat')}-img">Collection Image</div>
    <div class="${uid('collfeat')}-content">
      <div class="${uid('collfeat')}-label">${v.label}</div>
      <h2>${v.headline}</h2>
      <p>${v.description}</p>
      <a href="#" class="${uid('collfeat')}-btn">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },

  // ========== FOOTER SECTIONS ==========
  {
    id: 'footer-premium',
    name: 'Footer - Premium',
    category: 'Footer',
    description: 'Full-featured premium footer',
    thumbnail: '',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'YOURBRAND' },
      { id: 'tagline', label: 'Tagline', type: 'text', defaultValue: 'Crafting excellence since 2018' },
      { id: 'email', label: 'Email', type: 'text', defaultValue: 'hello@yourbrand.com' },
    ],
    generateHtml: (v) => `<div class="${uid('footprem')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('footprem')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('footprem')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px 48px; }
    .${uid('footprem')}-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 64px; margin-bottom: 64px; }
    .${uid('footprem')}-brand h3 { font-size: 18px; font-weight: 600; letter-spacing: 0.2em; color: #fff; margin-bottom: 12px; }
    .${uid('footprem')}-brand p { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 24px; }
    .${uid('footprem')}-brand a { font-size: 14px; color: #D4AF37; text-decoration: none; }
    .${uid('footprem')}-col h4 { font-size: 12px; font-weight: 600; letter-spacing: 0.15em; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 24px; }
    .${uid('footprem')}-col ul { list-style: none; }
    .${uid('footprem')}-col li { margin-bottom: 12px; }
    .${uid('footprem')}-col a { font-size: 14px; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s ease; }
    .${uid('footprem')}-col a:hover { color: #D4AF37; }
    .${uid('footprem')}-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; display: flex; justify-content: space-between; align-items: center; }
    .${uid('footprem')}-copy { font-size: 13px; color: rgba(255,255,255,0.4); }
    .${uid('footprem')}-social { display: flex; gap: 16px; }
    .${uid('footprem')}-social a { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); font-size: 12px; text-decoration: none; transition: all 0.3s ease; }
    .${uid('footprem')}-social a:hover { border-color: #D4AF37; color: #D4AF37; }
    @media (max-width: 768px) { .${uid('footprem')}-top { grid-template-columns: 1fr 1fr; gap: 32px; } .${uid('footprem')}-bottom { flex-direction: column; gap: 24px; text-align: center; } }
  </style>
  <div class="${uid('footprem')}-wrap">
    <div class="${uid('footprem')}-top">
      <div class="${uid('footprem')}-brand">
        <h3>${v.brandName}</h3>
        <p>${v.tagline}</p>
        <a href="mailto:${v.email}">${v.email}</a>
      </div>
      <div class="${uid('footprem')}-col">
        <h4>Shop</h4>
        <ul><li><a href="#">New Arrivals</a></li><li><a href="#">Best Sellers</a></li><li><a href="#">Sale</a></li><li><a href="#">All Products</a></li></ul>
      </div>
      <div class="${uid('footprem')}-col">
        <h4>Support</h4>
        <ul><li><a href="#">Contact</a></li><li><a href="#">Shipping</a></li><li><a href="#">Returns</a></li><li><a href="#">FAQ</a></li></ul>
      </div>
      <div class="${uid('footprem')}-col">
        <h4>Company</h4>
        <ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Stores</a></li></ul>
      </div>
    </div>
    <div class="${uid('footprem')}-bottom">
      <div class="${uid('footprem')}-copy">© 2025 ${v.brandName}. All rights reserved.</div>
      <div class="${uid('footprem')}-social">
        <a href="#">IG</a>
        <a href="#">TW</a>
        <a href="#">FB</a>
        <a href="#">YT</a>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'footer-minimal',
    name: 'Footer - Minimal',
    category: 'Footer',
    description: 'Clean minimal footer',
    thumbnail: '',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'YOURBRAND' },
      { id: 'year', label: 'Year', type: 'text', defaultValue: '2025' },
    ],
    generateHtml: (v) => `<div class="${uid('footmin')}" style="background:#fff;border-top:1px solid #f0f0f0;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('footmin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('footmin')}-wrap { max-width: 1200px; margin: 0 auto; padding: 48px; display: flex; justify-content: space-between; align-items: center; }
    .${uid('footmin')}-brand { font-size: 14px; font-weight: 600; letter-spacing: 0.15em; color: #1a1a1a; }
    .${uid('footmin')}-links { display: flex; gap: 32px; }
    .${uid('footmin')}-links a { font-size: 13px; color: #666; text-decoration: none; transition: color 0.3s ease; }
    .${uid('footmin')}-links a:hover { color: #1a1a1a; }
    .${uid('footmin')}-copy { font-size: 12px; color: #999; }
    @media (max-width: 768px) { .${uid('footmin')}-wrap { flex-direction: column; gap: 24px; text-align: center; } .${uid('footmin')}-links { flex-wrap: wrap; justify-content: center; } }
  </style>
  <div class="${uid('footmin')}-wrap">
    <div class="${uid('footmin')}-brand">${v.brandName}</div>
    <div class="${uid('footmin')}-links">
      <a href="#">Shop</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </div>
    <div class="${uid('footmin')}-copy">© ${v.year}</div>
  </div>
</div>`
  },

  // ========== PREMIUM HERO SECTIONS (21st.dev inspired) ==========
  {
    id: 'hero-typewriter',
    name: 'Hero - Typewriter Effect',
    category: 'Hero',
    description: 'Animated typing text with blinking cursor on dark gradient',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Build fast. Ship clean.' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'A minimal React starter focused on clarity, speed, and maintainability.' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Get Started' },
    ],
    generateHtml: (v) => `<div class="${uid('htw')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);min-height:500px;display:flex;align-items:center;justify-content:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('htw')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('htw')}-wrap { text-align: center; padding: 80px 24px; max-width: 800px; }
    .${uid('htw')}-title { font-size: 56px; font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 24px; }
    .${uid('htw')}-cursor { display: inline-block; width: 3px; height: 56px; background: #fff; margin-left: 4px; animation: ${uid('htw')}-blink 1s step-end infinite; vertical-align: middle; }
    .${uid('htw')}-sub { font-size: 18px; color: rgba(255,255,255,0.6); margin-bottom: 40px; line-height: 1.6; }
    .${uid('htw')}-btn { display: inline-block; padding: 16px 32px; background: #fff; color: #0a0a0a; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('htw')}-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(255,255,255,0.2); }
    @keyframes ${uid('htw')}-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @media (max-width: 768px) { .${uid('htw')}-title { font-size: 36px; } .${uid('htw')}-cursor { height: 36px; } }
  </style>
  <div class="${uid('htw')}-wrap">
    <h1 class="${uid('htw')}-title">${v.headline}<span class="${uid('htw')}-cursor"></span></h1>
    <p class="${uid('htw')}-sub">${v.subtext}</p>
    <a href="#" class="${uid('htw')}-btn">${v.btnText}</a>
  </div>
</div>`
  },
  {
    id: 'hero-floating-images',
    name: 'Hero - Floating Images',
    category: 'Hero',
    description: 'Multiple floating images around centered text',
    thumbnail: '',
    fields: [
      { id: 'image1', label: 'Image 1 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/close-up-shot-of-mans-legs%20(1).png' },
      { id: 'image2', label: 'Image 2 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png' },
      { id: 'image3', label: 'Image 3 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'A new way to learn & get knowledge' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'EduFlex is here for you with various courses & materials from skilled tutors all around the world.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Join the Class' },
      { id: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('hfloat')}" style="background:${v.bgColor};min-height:550px;display:flex;align-items:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('hfloat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hfloat')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 24px; align-items: center; }
    .${uid('hfloat')}-content { max-width: 500px; }
    .${uid('hfloat')}-title { font-size: 48px; font-weight: 700; color: ${v.textColor}; line-height: 1.1; margin-bottom: 20px; }
    .${uid('hfloat')}-sub { font-size: 16px; color: ${v.textColor}; opacity: 0.7; line-height: 1.7; margin-bottom: 32px; }
    .${uid('hfloat')}-btns { display: flex; gap: 16px; margin-bottom: 40px; }
    .${uid('hfloat')}-btn { padding: 14px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('hfloat')}-btn.primary { background: ${v.textColor}; color: ${v.bgColor}; }
    .${uid('hfloat')}-btn.primary:hover { opacity: 0.9; transform: translateY(-2px); }
    .${uid('hfloat')}-images { position: relative; height: 400px; }
    .${uid('hfloat')}-img { position: absolute; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); animation: ${uid('hfloat')}-bob 4s ease-in-out infinite; }
    .${uid('hfloat')}-img:nth-child(1) { width: 200px; height: 200px; top: 0; right: 60px; animation-delay: 0s; }
    .${uid('hfloat')}-img:nth-child(2) { width: 180px; height: 180px; top: 100px; right: 0; animation-delay: 1s; }
    .${uid('hfloat')}-img:nth-child(3) { width: 160px; height: 160px; bottom: 40px; right: 80px; animation-delay: 2s; }
    .${uid('hfloat')}-img img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; }
    @keyframes ${uid('hfloat')}-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    @media (max-width: 768px) {
      .${uid('hfloat')}-wrap { grid-template-columns: 1fr; gap: 40px; padding: 40px 20px; text-align: center; }
      .${uid('hfloat')}-content { max-width: 100%; }
      .${uid('hfloat')}-title { font-size: 32px; }
      .${uid('hfloat')}-sub { font-size: 14px; }
      .${uid('hfloat')}-btns { justify-content: center; }
      .${uid('hfloat')}-images { position: relative; height: auto; display: flex; flex-direction: row; justify-content: center; gap: 12px; flex-wrap: wrap; }
      .${uid('hfloat')}-img { position: relative !important; top: auto !important; right: auto !important; bottom: auto !important; left: auto !important; width: 100px !important; height: 100px !important; animation: ${uid('hfloat')}-bob-mobile 5s ease-in-out infinite; }
      .${uid('hfloat')}-img:nth-child(2) { animation-delay: 0.5s; }
      .${uid('hfloat')}-img:nth-child(3) { animation-delay: 1s; }
    }
    @keyframes ${uid('hfloat')}-bob-mobile { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  </style>
  <div class="${uid('hfloat')}-wrap">
    <div class="${uid('hfloat')}-content">
      <h1 class="${uid('hfloat')}-title">${v.headline}</h1>
      <p class="${uid('hfloat')}-sub">${v.subheadline}</p>
      <div class="${uid('hfloat')}-btns">
        <a href="${v.buttonUrl}" class="${uid('hfloat')}-btn primary">${v.buttonText}</a>
      </div>
    </div>
    <div class="${uid('hfloat')}-images">
      <div class="${uid('hfloat')}-img"><img src="${v.image1}" alt="Floating image 1"></div>
      <div class="${uid('hfloat')}-img"><img src="${v.image2}" alt="Floating image 2"></div>
      <div class="${uid('hfloat')}-img"><img src="${v.image3}" alt="Floating image 3"></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-split-fashion',
    name: 'Hero - Split Fashion',
    category: 'Hero',
    description: 'Minimalist 50/50 layout with category links and large image',
    thumbnail: '',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'Kokonut.' },
      { id: 'collection', label: 'Collection Name', type: 'text', defaultValue: 'SUMMER 2025' },
      { id: 'desc', label: 'Description', type: 'text', defaultValue: '"The Bright Young" draws inspiration from Anglomania, redefining sartorial elegance and school uniforms with a nod to British heritage.' },
      { id: 'image', label: 'Hero Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png' },
    ],
    generateHtml: (v) => `<div class="${uid('hsplit')}" style="background:#f5f5f0;min-height:550px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('hsplit')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hsplit')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 550px; }
    .${uid('hsplit')}-content { padding: 80px 60px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('hsplit')}-brand { font-size: 48px; font-weight: 700; color: #1a1a1a; margin-bottom: 40px; }
    .${uid('hsplit')}-nav { display: flex; flex-direction: column; gap: 12px; margin-bottom: 60px; }
    .${uid('hsplit')}-nav a { font-size: 15px; color: #666; text-decoration: none; transition: color 0.3s; }
    .${uid('hsplit')}-nav a:hover { color: #1a1a1a; }
    .${uid('hsplit')}-coll { font-size: 14px; font-weight: 600; letter-spacing: 0.1em; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('hsplit')}-desc { font-size: 14px; color: #666; line-height: 1.8; max-width: 350px; }
    .${uid('hsplit')}-image { position: relative; overflow: hidden; }
    .${uid('hsplit')}-image img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 900px) { .${uid('hsplit')}-wrap { grid-template-columns: 1fr; } .${uid('hsplit')}-image { height: 400px; } }
  </style>
  <div class="${uid('hsplit')}-wrap">
    <div class="${uid('hsplit')}-content">
      <div class="${uid('hsplit')}-brand">${v.brandName}</div>
      <nav class="${uid('hsplit')}-nav">
        <a href="#">Ready-to-wear</a>
        <a href="#">Accessories</a>
        <a href="#">Footwear</a>
        <a href="#">Leather goods</a>
        <a href="#">Jewelry</a>
      </nav>
      <div class="${uid('hsplit')}-coll">${v.collection}</div>
      <p class="${uid('hsplit')}-desc">${v.desc}</p>
    </div>
    <div class="${uid('hsplit')}-image">
      <img src="${v.image}" alt="Fashion">
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-particles',
    name: 'Hero - Particle Animation',
    category: 'Hero',
    description: 'Floating glowing particles with dark background',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Elevate your creative workflow to an art form.' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Manage all of your media and assets in videos, photos, design files, docs, PDFs, and more.' },
      { id: 'btn1', label: 'Button 1 Text', type: 'text', defaultValue: 'Start Free Trial' },
      { id: 'btn2', label: 'Button 2 Text', type: 'text', defaultValue: 'Watch the Video' },
    ],
    generateHtml: (v) => `<div class="${uid('hpart')}" style="background:#0a0a0a;min-height:500px;display:flex;align-items:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('hpart')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hpart')}-particle { position: absolute; width: 4px; height: 4px; background: rgba(100,200,255,0.6); border-radius: 50%; box-shadow: 0 0 10px rgba(100,200,255,0.8); }
    .${uid('hpart')}-particle:nth-child(1) { top: 20%; left: 10%; animation: ${uid('hpart')}-float 8s ease-in-out infinite; }
    .${uid('hpart')}-particle:nth-child(2) { top: 60%; left: 20%; animation: ${uid('hpart')}-float 10s ease-in-out infinite 1s; }
    .${uid('hpart')}-particle:nth-child(3) { top: 30%; right: 15%; animation: ${uid('hpart')}-float 9s ease-in-out infinite 2s; }
    .${uid('hpart')}-particle:nth-child(4) { top: 70%; right: 25%; animation: ${uid('hpart')}-float 7s ease-in-out infinite 0.5s; }
    .${uid('hpart')}-particle:nth-child(5) { top: 45%; left: 5%; animation: ${uid('hpart')}-float 11s ease-in-out infinite 1.5s; }
    .${uid('hpart')}-particle:nth-child(6) { top: 80%; right: 10%; animation: ${uid('hpart')}-float 8s ease-in-out infinite 3s; }
    .${uid('hpart')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; position: relative; z-index: 1; }
    .${uid('hpart')}-content { max-width: 500px; }
    .${uid('hpart')}-label { font-size: 12px; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; margin-bottom: 16px; }
    .${uid('hpart')}-title { font-size: 44px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 20px; }
    .${uid('hpart')}-sub { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 32px; }
    .${uid('hpart')}-btns { display: flex; gap: 16px; }
    .${uid('hpart')}-btn { padding: 14px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('hpart')}-btn.primary { background: #fff; color: #0a0a0a; }
    .${uid('hpart')}-btn.secondary { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; gap: 8px; }
    .${uid('hpart')}-btn.secondary::before { content: '▶'; font-size: 10px; }
    .${uid('hpart')}-visual { height: 300px; background: linear-gradient(135deg, rgba(100,200,255,0.1) 0%, rgba(150,100,255,0.1) 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; }
    .${uid('hpart')}-visual-text { color: rgba(255,255,255,0.3); font-size: 14px; }
    @keyframes ${uid('hpart')}-float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; } 25% { transform: translateY(-20px) translateX(10px); opacity: 1; } 50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; } 75% { transform: translateY(-25px) translateX(5px); opacity: 1; } }
    @media (max-width: 900px) { .${uid('hpart')}-wrap { grid-template-columns: 1fr; } .${uid('hpart')}-visual { display: none; } }
  </style>
  <div class="${uid('hpart')}-particle"></div>
  <div class="${uid('hpart')}-particle"></div>
  <div class="${uid('hpart')}-particle"></div>
  <div class="${uid('hpart')}-particle"></div>
  <div class="${uid('hpart')}-particle"></div>
  <div class="${uid('hpart')}-particle"></div>
  <div class="${uid('hpart')}-wrap">
    <div class="${uid('hpart')}-content">
      <div class="${uid('hpart')}-label">Collaborate</div>
      <h1 class="${uid('hpart')}-title">${v.headline}</h1>
      <p class="${uid('hpart')}-sub">${v.subtext}</p>
      <div class="${uid('hpart')}-btns">
        <a href="#" class="${uid('hpart')}-btn primary">${v.btn1}</a>
        <a href="#" class="${uid('hpart')}-btn secondary">${v.btn2}</a>
      </div>
    </div>
    <div class="${uid('hpart')}-visual">
      <span class="${uid('hpart')}-visual-text">Video Preview</span>
    </div>
  </div>
</div>`
  },

  // ========== BENTO/GRID LAYOUTS (21st.dev inspired) ==========
  {
    id: 'bento-grid-4',
    name: 'Bento Grid - 4 Panel',
    category: 'Gallery',
    description: 'Modern 2x2 asymmetric bento-style grid',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Let\'s change it up a bit' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Find a class' },
      { id: 'image1Url', label: 'Image 1 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png' },
      { id: 'image1Alt', label: 'Image 1 Alt Text', type: 'text', defaultValue: '' },
      { id: 'image2Url', label: 'Image 2 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png' },
      { id: 'image2Alt', label: 'Image 2 Alt Text', type: 'text', defaultValue: '' },
      { id: 'image3Url', label: 'Image 3 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(14).png' },
      { id: 'image3Alt', label: 'Image 3 Alt Text', type: 'text', defaultValue: '' },
      { id: 'image4Url', label: 'Image 4 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(15).png' },
      { id: 'image4Alt', label: 'Image 4 Alt Text', type: 'text', defaultValue: '' },
      { id: 'gap', label: 'Gap between items (px)', type: 'number', defaultValue: '12' },
      { id: 'borderRadius', label: 'Border Radius (px)', type: 'number', defaultValue: '12' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('bento4')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('bento4')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bento4')}-wrap { display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; }
    .${uid('bento4')}-content { padding-right: 40px; }
    .${uid('bento4')}-label { font-size: 13px; color: #22c55e; font-weight: 600; margin-bottom: 16px; }
    .${uid('bento4')}-title { font-size: 48px; font-weight: 700; color: #1a1a1a; line-height: 1.1; margin-bottom: 20px; }
    .${uid('bento4')}-sub { font-size: 16px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('bento4')}-btn { display: inline-block; padding: 14px 28px; background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('bento4')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 80px); gap: ${v.gap}px; }
    .${uid('bento4')}-item { border-radius: ${v.borderRadius}px; overflow: hidden; transition: transform 0.3s ease; }
    .${uid('bento4')}-item:hover { transform: scale(1.02); }
    .${uid('bento4')}-item img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('bento4')}-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
    .${uid('bento4')}-item:nth-child(2) { grid-column: span 2; grid-row: span 2; }
    .${uid('bento4')}-item:nth-child(3) { grid-column: span 2; grid-row: span 2; }
    .${uid('bento4')}-item:nth-child(4) { grid-column: span 2; grid-row: span 2; }
    @media (max-width: 900px) { .${uid('bento4')}-wrap { grid-template-columns: 1fr; } .${uid('bento4')}-content { padding-right: 0; } }
    @media (max-width: 768px) { .${uid('bento4')}-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 150px); } .${uid('bento4')}-item { grid-column: span 1 !important; grid-row: span 1 !important; } }
    @media (max-width: 480px) { .${uid('bento4')}-grid { grid-template-columns: 1fr; grid-template-rows: repeat(4, 180px); } .${uid('bento4')}-title { font-size: 32px; } .${uid('bento4')}-wrap { padding: 48px 16px; } }
  </style>
  <div class="${uid('bento4')}-wrap">
    <div class="${uid('bento4')}-content">
      <div class="${uid('bento4')}-label">Better every day</div>
      <h2 class="${uid('bento4')}-title">${v.headline}</h2>
      <p class="${uid('bento4')}-sub">${v.subtext}</p>
      <a href="#" class="${uid('bento4')}-btn">${v.btnText}</a>
    </div>
    <div class="${uid('bento4')}-grid">
      <div class="${uid('bento4')}-item"><img src="${v.image1Url}" alt="${v.image1Alt}"></div>
      <div class="${uid('bento4')}-item"><img src="${v.image2Url}" alt="${v.image2Alt}"></div>
      <div class="${uid('bento4')}-item"><img src="${v.image3Url}" alt="${v.image3Alt}"></div>
      <div class="${uid('bento4')}-item"><img src="${v.image4Url}" alt="${v.image4Alt}"></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'shuffle-grid',
    name: 'Image Shuffle Grid',
    category: 'Gallery',
    description: '4x4 image grid with hover zoom effects',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Explore Our Gallery' },
      { id: 'image1', label: 'Image 1 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'image2', label: 'Image 2 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'image3', label: 'Image 3 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'image4', label: 'Image 4 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'image5', label: 'Image 5 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'image6', label: 'Image 6 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/close-up-shot-of-mans-legs%20(1).png' },
      { id: 'image7', label: 'Image 7 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png' },
      { id: 'image8', label: 'Image 8 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png' },
      { id: 'gridGap', label: 'Grid Gap (px)', type: 'number', defaultValue: '8' },
      { id: 'borderRadius', label: 'Border Radius (px)', type: 'number', defaultValue: '8' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'sectionPadding', label: 'Section Padding (px)', type: 'number', defaultValue: '80' },
    ],
    generateHtml: (v) => `<div class="${uid('shuf')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('shuf')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('shuf')}-wrap { max-width: 1200px; margin: 0 auto; padding: ${v.sectionPadding}px 24px; }
    .${uid('shuf')}-title { font-size: 36px; font-weight: 700; color: #fff; text-align: center; margin-bottom: 48px; }
    .${uid('shuf')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: ${v.gridGap}px; }
    .${uid('shuf')}-item { aspect-ratio: 1; position: relative; overflow: hidden; border-radius: ${v.borderRadius}px; cursor: pointer; }
    .${uid('shuf')}-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .${uid('shuf')}-item:hover img { transform: scale(1.15); }
    .${uid('shuf')}-item::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s ease; z-index: 1; }
    .${uid('shuf')}-item:hover::before { opacity: 1; }
    @media (max-width: 768px) { .${uid('shuf')}-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 480px) { .${uid('shuf')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('shuf')}-wrap">
    <h2 class="${uid('shuf')}-title">${v.headline}</h2>
    <div class="${uid('shuf')}-grid">
      <div class="${uid('shuf')}-item"><img src="${v.image1}" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="${v.image2}" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="${v.image3}" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="${v.image4}" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="${v.image5}" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="${v.image6}" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="${v.image7}" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="${v.image8}" alt=""></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'image-mosaic',
    name: 'Image Mosaic',
    category: 'Gallery',
    description: 'Overlapping image mosaic with depth effect',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Rediscover Your Memories with AI' },
      { id: 'subtext', label: 'Subtext', type: 'textarea', defaultValue: 'Our intelligent platform finds, organizes, and brings your most cherished moments back to life.' },
      { id: 'primaryBtnText', label: 'Primary Button Text', type: 'text', defaultValue: 'Explore Your Past' },
      { id: 'secondaryBtnText', label: 'Secondary Button Text', type: 'text', defaultValue: 'How It Works' },
      { id: 'image1', label: 'Image 1 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png' },
      { id: 'image2', label: 'Image 2 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png' },
      { id: 'image3', label: 'Image 3 URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png' },
      { id: 'gridGap', label: 'Grid Gap (px)', type: 'number', defaultValue: '60' },
      { id: 'borderRadius', label: 'Border Radius (px)', type: 'number', defaultValue: '16' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
    ],
    generateHtml: (v) => `<div class="${uid('mosaic')}" style="background:linear-gradient(135deg,${v.bgColor} 0%,#1a1a2e 100%);min-height:500px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('mosaic')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mosaic')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: ${v.gridGap}px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; }
    .${uid('mosaic')}-content { max-width: 450px; }
    .${uid('mosaic')}-title { font-size: 40px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 20px; }
    .${uid('mosaic')}-sub { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 32px; }
    .${uid('mosaic')}-btns { display: flex; gap: 16px; flex-wrap: wrap; }
    .${uid('mosaic')}-btn { padding: 12px 24px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('mosaic')}-btn.primary { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #fff; }
    .${uid('mosaic')}-btn.secondary { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); }
    .${uid('mosaic')}-images { position: relative; height: 350px; perspective: 1000px; }
    .${uid('mosaic')}-img { position: absolute; border-radius: ${v.borderRadius}px; box-shadow: 0 25px 50px rgba(0,0,0,0.4); overflow: hidden; }
    .${uid('mosaic')}-img img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('mosaic')}-img:nth-child(1) { width: 180px; height: 180px; top: 20px; left: 0; transform: rotate(-8deg); animation: ${uid('mosaic')}-float1 5s ease-in-out infinite; }
    .${uid('mosaic')}-img:nth-child(2) { width: 200px; height: 200px; top: 60px; left: 120px; z-index: 2; animation: ${uid('mosaic')}-float2 6s ease-in-out infinite; }
    .${uid('mosaic')}-img:nth-child(3) { width: 160px; height: 160px; bottom: 20px; left: 40px; transform: rotate(5deg); animation: ${uid('mosaic')}-float3 5.5s ease-in-out infinite; }
    @keyframes ${uid('mosaic')}-float1 { 0%, 100% { transform: rotate(-8deg) translateY(0); } 50% { transform: rotate(-8deg) translateY(-10px); } }
    @keyframes ${uid('mosaic')}-float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    @keyframes ${uid('mosaic')}-float3 { 0%, 100% { transform: rotate(5deg) translateY(0); } 50% { transform: rotate(5deg) translateY(-8px); } }
    @media (max-width: 900px) {
      .${uid('mosaic')}-wrap { grid-template-columns: 1fr; gap: 40px; text-align: center; }
      .${uid('mosaic')}-content { max-width: 100%; margin: 0 auto; }
      .${uid('mosaic')}-title { font-size: 32px; }
      .${uid('mosaic')}-btns { justify-content: center; }
      .${uid('mosaic')}-images { height: 280px; max-width: 340px; margin: 0 auto; }
      .${uid('mosaic')}-img:nth-child(1) { width: 140px; height: 140px; top: 10px; left: 0; }
      .${uid('mosaic')}-img:nth-child(2) { width: 160px; height: 160px; top: 40px; left: 100px; }
      .${uid('mosaic')}-img:nth-child(3) { width: 120px; height: 120px; bottom: 10px; left: 30px; }
    }
    @media (max-width: 480px) {
      .${uid('mosaic')}-wrap { padding: 60px 16px; }
      .${uid('mosaic')}-title { font-size: 28px; }
      .${uid('mosaic')}-sub { font-size: 14px; }
      .${uid('mosaic')}-images { height: 220px; max-width: 280px; }
      .${uid('mosaic')}-img:nth-child(1) { width: 110px; height: 110px; top: 5px; left: 0; }
      .${uid('mosaic')}-img:nth-child(2) { width: 130px; height: 130px; top: 30px; left: 80px; }
      .${uid('mosaic')}-img:nth-child(3) { width: 100px; height: 100px; bottom: 5px; left: 20px; }
      .${uid('mosaic')}-btn { padding: 10px 20px; font-size: 12px; width: 100%; text-align: center; }
    }
  </style>
  <div class="${uid('mosaic')}-wrap">
    <div class="${uid('mosaic')}-content">
      <h2 class="${uid('mosaic')}-title">${v.headline}</h2>
      <p class="${uid('mosaic')}-sub">${v.subtext}</p>
      <div class="${uid('mosaic')}-btns">
        <a href="#" class="${uid('mosaic')}-btn primary">${v.primaryBtnText}</a>
        <a href="#" class="${uid('mosaic')}-btn secondary">${v.secondaryBtnText}</a>
      </div>
    </div>
    <div class="${uid('mosaic')}-images">
      <div class="${uid('mosaic')}-img"><img src="${v.image1}" alt="Mosaic image 1"></div>
      <div class="${uid('mosaic')}-img"><img src="${v.image2}" alt="Mosaic image 2"></div>
      <div class="${uid('mosaic')}-img"><img src="${v.image3}" alt="Mosaic image 3"></div>
    </div>
  </div>
</div>`
  },

  // ========== FEATURE SECTIONS (21st.dev inspired) ==========
  {
    id: 'features-counter',
    name: 'Features - Animated Counter',
    category: 'Features',
    description: 'Stats section with large animated numbers',
    thumbnail: '',
    fields: [
      { id: 'stat1', label: 'Stat 1 Value', type: 'text', defaultValue: '10M+' },
      { id: 'stat1Label', label: 'Stat 1 Label', type: 'text', defaultValue: 'Active Users' },
      { id: 'stat2', label: 'Stat 2 Value', type: 'text', defaultValue: '99.9%' },
      { id: 'stat2Label', label: 'Stat 2 Label', type: 'text', defaultValue: 'Uptime' },
      { id: 'stat3', label: 'Stat 3 Value', type: 'text', defaultValue: '150+' },
      { id: 'stat3Label', label: 'Stat 3 Label', type: 'text', defaultValue: 'Countries' },
      { id: 'stat4', label: 'Stat 4 Value', type: 'text', defaultValue: '4.9' },
      { id: 'stat4Label', label: 'Stat 4 Label', type: 'text', defaultValue: 'User Rating' },
    ],
    generateHtml: (v) => `<div class="${uid('fcnt')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fcnt')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fcnt')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('fcnt')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
    .${uid('fcnt')}-item { text-align: center; }
    .${uid('fcnt')}-value { font-size: 56px; font-weight: 800; background: linear-gradient(135deg, #fff 0%, #888 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 12px; animation: ${uid('fcnt')}-pulse 3s ease-in-out infinite; }
    .${uid('fcnt')}-label { font-size: 14px; color: rgba(255,255,255,0.6); letter-spacing: 0.05em; }
    @keyframes ${uid('fcnt')}-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
    @media (max-width: 768px) { .${uid('fcnt')}-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; } .${uid('fcnt')}-value { font-size: 40px; } }
  </style>
  <div class="${uid('fcnt')}-wrap">
    <div class="${uid('fcnt')}-grid">
      <div class="${uid('fcnt')}-item"><div class="${uid('fcnt')}-value">${v.stat1}</div><div class="${uid('fcnt')}-label">${v.stat1Label}</div></div>
      <div class="${uid('fcnt')}-item"><div class="${uid('fcnt')}-value">${v.stat2}</div><div class="${uid('fcnt')}-label">${v.stat2Label}</div></div>
      <div class="${uid('fcnt')}-item"><div class="${uid('fcnt')}-value">${v.stat3}</div><div class="${uid('fcnt')}-label">${v.stat3Label}</div></div>
      <div class="${uid('fcnt')}-item"><div class="${uid('fcnt')}-value">${v.stat4}</div><div class="${uid('fcnt')}-label">${v.stat4Label}</div></div>
    </div>
  </div>
</div>`
  },

  // ========== TESTIMONIAL SECTIONS (21st.dev inspired) ==========
  {
    id: 'testimonial-carousel',
    name: 'Testimonials - Card Carousel',
    category: 'Testimonials',
    description: 'Horizontal scrolling testimonial cards',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'What Our Customers Say' },
    ],
    generateHtml: (v) => `<div class="${uid('tcar')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tcar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tcar')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('tcar')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('tcar')}-track { display: flex; gap: 24px; overflow-x: auto; padding-bottom: 16px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
    .${uid('tcar')}-track::-webkit-scrollbar { height: 6px; }
    .${uid('tcar')}-track::-webkit-scrollbar-track { background: #f0f0f0; border-radius: 3px; }
    .${uid('tcar')}-track::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
    .${uid('tcar')}-card { flex: 0 0 350px; background: #fafafa; border-radius: 16px; padding: 32px; scroll-snap-align: start; }
    .${uid('tcar')}-stars { color: #fbbf24; font-size: 16px; margin-bottom: 16px; }
    .${uid('tcar')}-quote { font-size: 15px; color: #333; line-height: 1.7; margin-bottom: 24px; }
    .${uid('tcar')}-author { display: flex; align-items: center; gap: 12px; }
    .${uid('tcar')}-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
    .${uid('tcar')}-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
    .${uid('tcar')}-role { font-size: 12px; color: #888; }
  </style>
  <div class="${uid('tcar')}-wrap">
    <h2 class="${uid('tcar')}-title">${v.headline}</h2>
    <div class="${uid('tcar')}-track">
      <div class="${uid('tcar')}-card"><div class="${uid('tcar')}-stars">★★★★★</div><div class="${uid('tcar')}-quote">"This product completely transformed how we handle our daily operations. Couldn't be happier!"</div><div class="${uid('tcar')}-author"><img class="${uid('tcar')}-avatar" src="https://i.pravatar.cc/100?img=1" alt=""><div><div class="${uid('tcar')}-name">Sarah Johnson</div><div class="${uid('tcar')}-role">Marketing Director</div></div></div></div>
      <div class="${uid('tcar')}-card"><div class="${uid('tcar')}-stars">★★★★★</div><div class="${uid('tcar')}-quote">"The best investment we've made this year. ROI was visible within the first month."</div><div class="${uid('tcar')}-author"><img class="${uid('tcar')}-avatar" src="https://i.pravatar.cc/100?img=2" alt=""><div><div class="${uid('tcar')}-name">Michael Chen</div><div class="${uid('tcar')}-role">CEO, TechStart</div></div></div></div>
      <div class="${uid('tcar')}-card"><div class="${uid('tcar')}-stars">★★★★★</div><div class="${uid('tcar')}-quote">"Outstanding support team and the features keep getting better. Highly recommend!"</div><div class="${uid('tcar')}-author"><img class="${uid('tcar')}-avatar" src="https://i.pravatar.cc/100?img=3" alt=""><div><div class="${uid('tcar')}-name">Emily Davis</div><div class="${uid('tcar')}-role">Product Manager</div></div></div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'reviews-star-grid',
    name: 'Reviews - Star Rating Grid',
    category: 'Testimonials',
    description: '3-column review cards with star ratings',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Customer Reviews' },
    ],
    generateHtml: (v) => `<div class="${uid('rstar')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('rstar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('rstar')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('rstar')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('rstar')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('rstar')}-card { background: #fafafa; border-radius: 16px; padding: 28px; border: 1px solid #f0f0f0; }
    .${uid('rstar')}-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .${uid('rstar')}-stars { color: #fbbf24; font-size: 14px; }
    .${uid('rstar')}-date { font-size: 12px; color: #999; }
    .${uid('rstar')}-text { font-size: 14px; color: #333; line-height: 1.7; margin-bottom: 20px; }
    .${uid('rstar')}-author { display: flex; align-items: center; gap: 12px; }
    .${uid('rstar')}-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
    .${uid('rstar')}-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
    .${uid('rstar')}-verified { font-size: 11px; color: #22c55e; display: flex; align-items: center; gap: 4px; }
    @media (max-width: 768px) { .${uid('rstar')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('rstar')}-wrap">
    <h2 class="${uid('rstar')}-title">${v.headline}</h2>
    <div class="${uid('rstar')}-grid">
      <div class="${uid('rstar')}-card"><div class="${uid('rstar')}-header"><div class="${uid('rstar')}-stars">★★★★★</div><div class="${uid('rstar')}-date">2 days ago</div></div><div class="${uid('rstar')}-text">"Absolutely love this product! The quality exceeded my expectations and shipping was super fast."</div><div class="${uid('rstar')}-author"><img class="${uid('rstar')}-avatar" src="https://i.pravatar.cc/100?img=5" alt=""><div><div class="${uid('rstar')}-name">Lisa M.</div><div class="${uid('rstar')}-verified">✓ Verified Purchase</div></div></div></div>
      <div class="${uid('rstar')}-card"><div class="${uid('rstar')}-header"><div class="${uid('rstar')}-stars">★★★★★</div><div class="${uid('rstar')}-date">1 week ago</div></div><div class="${uid('rstar')}-text">"Best purchase I've made this year. Customer service was incredibly helpful too!"</div><div class="${uid('rstar')}-author"><img class="${uid('rstar')}-avatar" src="https://i.pravatar.cc/100?img=12" alt=""><div><div class="${uid('rstar')}-name">Robert K.</div><div class="${uid('rstar')}-verified">✓ Verified Purchase</div></div></div></div>
      <div class="${uid('rstar')}-card"><div class="${uid('rstar')}-header"><div class="${uid('rstar')}-stars">★★★★☆</div><div class="${uid('rstar')}-date">2 weeks ago</div></div><div class="${uid('rstar')}-text">"Great value for money. Would definitely recommend to friends and family."</div><div class="${uid('rstar')}-author"><img class="${uid('rstar')}-avatar" src="https://i.pravatar.cc/100?img=9" alt=""><div><div class="${uid('rstar')}-name">Amanda T.</div><div class="${uid('rstar')}-verified">✓ Verified Purchase</div></div></div></div>
    </div>
  </div>
</div>`
  },

  // ========== CTA SECTIONS (21st.dev inspired) ==========
  {
    id: 'cta-split-image',
    name: 'CTA - Split Image',
    category: 'CTA',
    description: 'Half image, half CTA layout',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Transform Your Business Today' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Get access to all our premium features and start growing your revenue immediately.' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Get Started Now' },
      { id: 'image', label: 'Image URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png' },
    ],
    generateHtml: (v) => `<div class="${uid('ctasplit')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctasplit')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctasplit')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 450px; }
    .${uid('ctasplit')}-content { display: flex; flex-direction: column; justify-content: center; padding: 60px; background: #fafafa; }
    .${uid('ctasplit')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; line-height: 1.2; margin-bottom: 20px; }
    .${uid('ctasplit')}-sub { font-size: 16px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('ctasplit')}-btn { display: inline-block; padding: 16px 32px; background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; align-self: flex-start; }
    .${uid('ctasplit')}-btn:hover { background: #333; transform: translateY(-2px); }
    .${uid('ctasplit')}-image { background-size: cover; background-position: center; }
    @media (max-width: 768px) { .${uid('ctasplit')}-wrap { grid-template-columns: 1fr; } .${uid('ctasplit')}-image { min-height: 300px; } }
  </style>
  <div class="${uid('ctasplit')}-wrap">
    <div class="${uid('ctasplit')}-content">
      <h2 class="${uid('ctasplit')}-title">${v.headline}</h2>
      <p class="${uid('ctasplit')}-sub">${v.subtext}</p>
      <a href="#" class="${uid('ctasplit')}-btn">${v.btnText}</a>
    </div>
    <div class="${uid('ctasplit')}-image" style="background-image: url('${v.image}');"></div>
  </div>
</div>`
  },

  // ========== PRODUCT SECTIONS (21st.dev inspired) ==========
  {
    id: 'product-hover-reveal',
    name: 'Product - Hover Reveal',
    category: 'Product',
    description: 'Product cards with details revealed on hover',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'New Arrivals' },
      { id: 'product1Image', label: 'Product 1 Image URL', type: 'text', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'product1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Premium Watch' },
      { id: 'product1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$299.00' },
      { id: 'product2Image', label: 'Product 2 Image URL', type: 'text', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'product2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Wireless Headphones' },
      { id: 'product2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$199.00' },
      { id: 'product3Image', label: 'Product 3 Image URL', type: 'text', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'product3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Designer Sunglasses' },
      { id: 'product3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$149.00' },
      { id: 'product4Image', label: 'Product 4 Image URL', type: 'text', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'product4Name', label: 'Product 4 Name', type: 'text', defaultValue: 'Leather Bag' },
      { id: 'product4Price', label: 'Product 4 Price', type: 'text', defaultValue: '$349.00' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Quick View' },
      { id: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'cardBorderRadius', label: 'Card Border Radius', type: 'number', defaultValue: '16' },
    ],
    generateHtml: (v) => `<div class="${uid('phover')}" style="background:${v.backgroundColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('phover')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('phover')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('phover')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('phover')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .${uid('phover')}-card { position: relative; overflow: hidden; border-radius: ${v.cardBorderRadius}px; cursor: pointer; }
    .${uid('phover')}-card img { width: 100%; aspect-ratio: 3/4; object-fit: cover; transition: transform 0.5s ease; }
    .${uid('phover')}-card:hover img { transform: scale(1.1); }
    .${uid('phover')}-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; opacity: 0; transition: opacity 0.3s ease; }
    .${uid('phover')}-card:hover .${uid('phover')}-overlay { opacity: 1; }
    .${uid('phover')}-name { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 4px; }
    .${uid('phover')}-price { font-size: 14px; color: rgba(255,255,255,0.8); }
    .${uid('phover')}-btn { margin-top: 16px; padding: 10px 20px; background: #fff; color: #1a1a1a; font-size: 12px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; }
    @media (max-width: 768px) { .${uid('phover')}-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .${uid('phover')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('phover')}-wrap">
    <h2 class="${uid('phover')}-title">${v.headline}</h2>
    <div class="${uid('phover')}-grid">
      <div class="${uid('phover')}-card"><img src="${v.product1Image}" alt="${v.product1Name}"><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">${v.product1Name}</div><div class="${uid('phover')}-price">${v.product1Price}</div><button class="${uid('phover')}-btn">${v.buttonText}</button></div></div>
      <div class="${uid('phover')}-card"><img src="${v.product2Image}" alt="${v.product2Name}"><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">${v.product2Name}</div><div class="${uid('phover')}-price">${v.product2Price}</div><button class="${uid('phover')}-btn">${v.buttonText}</button></div></div>
      <div class="${uid('phover')}-card"><img src="${v.product3Image}" alt="${v.product3Name}"><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">${v.product3Name}</div><div class="${uid('phover')}-price">${v.product3Price}</div><button class="${uid('phover')}-btn">${v.buttonText}</button></div></div>
      <div class="${uid('phover')}-card"><img src="${v.product4Image}" alt="${v.product4Name}"><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">${v.product4Name}</div><div class="${uid('phover')}-price">${v.product4Price}</div><button class="${uid('phover')}-btn">${v.buttonText}</button></div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'product-before-after',
    name: 'Product - Before/After',
    category: 'Product',
    description: 'Visual comparison slider effect',
    thumbnail: '',
    fields: [
      { id: 'beforeImage', label: 'Before Image URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'afterImage', label: 'After Image URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'beforeLabel', label: 'Before Label', type: 'text', defaultValue: 'Before' },
      { id: 'afterLabel', label: 'After Label', type: 'text', defaultValue: 'After' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'See the Difference' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Drag to compare before and after results' },
      { id: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'imageBorderRadius', label: 'Image Border Radius', type: 'number', defaultValue: '16' },
    ],
    generateHtml: (v) => `<div class="${uid('pba')}" style="background:${v.backgroundColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pba')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pba')}-wrap { max-width: 900px; margin: 0 auto; padding: 80px 24px; text-align: center; }
    .${uid('pba')}-title { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .${uid('pba')}-sub { font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 40px; }
    .${uid('pba')}-compare { position: relative; border-radius: ${v.imageBorderRadius}px; overflow: hidden; aspect-ratio: 16/9; }
    .${uid('pba')}-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .${uid('pba')}-img.after { clip-path: inset(0 50% 0 0); }
    .${uid('pba')}-divider { position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; background: #fff; transform: translateX(-50%); cursor: ew-resize; }
    .${uid('pba')}-divider::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: #fff; border-radius: 50%; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
    .${uid('pba')}-labels { display: flex; justify-content: space-between; margin-top: 20px; }
    .${uid('pba')}-label { font-size: 14px; color: rgba(255,255,255,0.6); }
    @media (max-width: 640px) {
      .${uid('pba')}-wrap { padding: 48px 16px; }
      .${uid('pba')}-title { font-size: 28px; }
      .${uid('pba')}-sub { font-size: 14px; margin-bottom: 24px; }
      .${uid('pba')}-compare { aspect-ratio: 4/3; }
      .${uid('pba')}-divider::after { width: 32px; height: 32px; }
    }
  </style>
  <div class="${uid('pba')}-wrap">
    <h2 class="${uid('pba')}-title">${v.headline}</h2>
    <p class="${uid('pba')}-sub">${v.subheadline}</p>
    <div class="${uid('pba')}-compare">
      <img class="${uid('pba')}-img" src="${v.beforeImage}" alt="${v.beforeLabel}">
      <img class="${uid('pba')}-img after" src="${v.afterImage}" alt="${v.afterLabel}">
      <div class="${uid('pba')}-divider"></div>
    </div>
    <div class="${uid('pba')}-labels"><span class="${uid('pba')}-label">${v.beforeLabel}</span><span class="${uid('pba')}-label">${v.afterLabel}</span></div>
  </div>
</div>`
  },
  {
    id: 'product-quick-view',
    name: 'Product - Quick View Style',
    category: 'Product',
    description: 'Modal-style product preview card',
    thumbnail: '',
    fields: [
      { id: 'productName', label: 'Product Name', type: 'text', defaultValue: 'Premium Leather Jacket' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: '$449.00' },
      { id: 'desc', label: 'Description', type: 'text', defaultValue: 'Crafted from the finest Italian leather, this jacket combines timeless style with modern comfort.' },
    ],
    generateHtml: (v) => `<div class="${uid('pqv')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pqv')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pqv')}-wrap { max-width: 1000px; margin: 0 auto; padding: 60px 24px; }
    .${uid('pqv')}-card { display: grid; grid-template-columns: 1fr 1fr; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
    .${uid('pqv')}-image { position: relative; }
    .${uid('pqv')}-image img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('pqv')}-badge { position: absolute; top: 20px; left: 20px; background: #1a1a1a; color: #fff; font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 4px; }
    .${uid('pqv')}-content { padding: 48px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('pqv')}-name { font-size: 28px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('pqv')}-price { font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 20px; }
    .${uid('pqv')}-desc { font-size: 15px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('pqv')}-sizes { display: flex; gap: 10px; margin-bottom: 32px; }
    .${uid('pqv')}-size { width: 44px; height: 44px; border: 1px solid #e0e0e0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .${uid('pqv')}-size:hover { border-color: #1a1a1a; }
    .${uid('pqv')}-size.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
    .${uid('pqv')}-btn { padding: 16px 32px; background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
    .${uid('pqv')}-btn:hover { background: #333; }
    @media (max-width: 768px) { .${uid('pqv')}-card { grid-template-columns: 1fr; } .${uid('pqv')}-image { height: 350px; } }
  </style>
  <div class="${uid('pqv')}-wrap">
    <div class="${uid('pqv')}-card">
      <div class="${uid('pqv')}-image"><img src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png" alt=""><div class="${uid('pqv')}-badge">NEW</div></div>
      <div class="${uid('pqv')}-content">
        <h2 class="${uid('pqv')}-name">${v.productName}</h2>
        <div class="${uid('pqv')}-price">${v.price}</div>
        <p class="${uid('pqv')}-desc">${v.desc}</p>
        <div class="${uid('pqv')}-sizes"><div class="${uid('pqv')}-size">XS</div><div class="${uid('pqv')}-size">S</div><div class="${uid('pqv')}-size active">M</div><div class="${uid('pqv')}-size">L</div><div class="${uid('pqv')}-size">XL</div></div>
        <button class="${uid('pqv')}-btn">Add to Cart</button>
      </div>
    </div>
  </div>
</div>`
  },

  // ========== TEAM/ABOUT SECTIONS (21st.dev inspired) ==========
  {
    id: 'team-flip-cards',
    name: 'Team - Flip Cards',
    category: 'Story',
    description: '3D flip cards showing team members',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Meet Our Team' },
    ],
    generateHtml: (v) => `<div class="${uid('teamf')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('teamf')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('teamf')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('teamf')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('teamf')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('teamf')}-card { perspective: 1000px; height: 380px; cursor: pointer; }
    .${uid('teamf')}-inner { position: relative; width: 100%; height: 100%; transition: transform 0.8s; transform-style: preserve-3d; }
    .${uid('teamf')}-card:hover .${uid('teamf')}-inner { transform: rotateY(180deg); }
    .${uid('teamf')}-front, .${uid('teamf')}-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 16px; overflow: hidden; }
    .${uid('teamf')}-front img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('teamf')}-back { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 32px; text-align: center; }
    .${uid('teamf')}-name { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
    .${uid('teamf')}-role { font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 20px; }
    .${uid('teamf')}-bio { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6; }
    @media (max-width: 768px) { .${uid('teamf')}-grid { grid-template-columns: 1fr; max-width: 350px; margin: 0 auto; } }
  </style>
  <div class="${uid('teamf')}-wrap">
    <h2 class="${uid('teamf')}-title">${v.headline}</h2>
    <div class="${uid('teamf')}-grid">
      <div class="${uid('teamf')}-card"><div class="${uid('teamf')}-inner"><div class="${uid('teamf')}-front"><img src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png" alt=""></div><div class="${uid('teamf')}-back"><div class="${uid('teamf')}-name">John Smith</div><div class="${uid('teamf')}-role">CEO & Founder</div><div class="${uid('teamf')}-bio">15+ years of experience building world-class products.</div></div></div></div>
      <div class="${uid('teamf')}-card"><div class="${uid('teamf')}-inner"><div class="${uid('teamf')}-front"><img src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/close-up-shot-of-mans-legs%20(1).png" alt=""></div><div class="${uid('teamf')}-back"><div class="${uid('teamf')}-name">Sarah Chen</div><div class="${uid('teamf')}-role">CTO</div><div class="${uid('teamf')}-bio">Former Google engineer passionate about innovation.</div></div></div></div>
      <div class="${uid('teamf')}-card"><div class="${uid('teamf')}-inner"><div class="${uid('teamf')}-front"><img src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png" alt=""></div><div class="${uid('teamf')}-back"><div class="${uid('teamf')}-name">Michael Lee</div><div class="${uid('teamf')}-role">Head of Design</div><div class="${uid('teamf')}-bio">Award-winning designer with a keen eye for detail.</div></div></div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'about-timeline',
    name: 'About - Timeline',
    category: 'Story',
    description: 'Vertical timeline with milestone dots',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Journey' },
    ],
    generateHtml: (v) => `<div class="${uid('timeline')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('timeline')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('timeline')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 24px; }
    .${uid('timeline')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 60px; }
    .${uid('timeline')}-list { position: relative; padding-left: 40px; }
    .${uid('timeline')}-list::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #e0e0e0 0%, #1a1a1a 50%, #e0e0e0 100%); }
    .${uid('timeline')}-item { position: relative; margin-bottom: 40px; }
    .${uid('timeline')}-item::before { content: ''; position: absolute; left: -34px; top: 4px; width: 14px; height: 14px; background: #1a1a1a; border-radius: 50%; border: 3px solid #fafafa; }
    .${uid('timeline')}-year { font-size: 14px; font-weight: 700; color: #6366f1; margin-bottom: 8px; }
    .${uid('timeline')}-item-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('timeline')}-item-desc { font-size: 15px; color: #666; line-height: 1.6; }
    @media (max-width: 768px) { .${uid('timeline')}-wrap { padding: 60px 24px; } .${uid('timeline')}-title { font-size: 28px; margin-bottom: 48px; } .${uid('timeline')}-item-title { font-size: 18px; } }
    @media (max-width: 480px) { .${uid('timeline')}-list { padding-left: 32px; } .${uid('timeline')}-item::before { left: -26px; width: 12px; height: 12px; } }
  </style>
  <div class="${uid('timeline')}-wrap">
    <h2 class="${uid('timeline')}-title">${v.headline}</h2>
    <div class="${uid('timeline')}-list">
      <div class="${uid('timeline')}-item"><div class="${uid('timeline')}-year">2020</div><div class="${uid('timeline')}-item-title">Company Founded</div><div class="${uid('timeline')}-item-desc">Started in a small garage with a big dream and three passionate founders.</div></div>
      <div class="${uid('timeline')}-item"><div class="${uid('timeline')}-year">2021</div><div class="${uid('timeline')}-item-title">First Product Launch</div><div class="${uid('timeline')}-item-desc">Released our flagship product to overwhelming positive response.</div></div>
      <div class="${uid('timeline')}-item"><div class="${uid('timeline')}-year">2022</div><div class="${uid('timeline')}-item-title">Series A Funding</div><div class="${uid('timeline')}-item-desc">Raised $10M to accelerate growth and expand our team.</div></div>
      <div class="${uid('timeline')}-item"><div class="${uid('timeline')}-year">2024</div><div class="${uid('timeline')}-item-title">Global Expansion</div><div class="${uid('timeline')}-item-desc">Now serving customers in over 50 countries worldwide.</div></div>
    </div>
  </div>
</div>`
  },

  // ========== HEADER SECTIONS (21st.dev inspired) ==========

  // ========== FOOTER SECTIONS (21st.dev inspired) ==========
  {
    id: 'footer-dark-columns',
    name: 'Footer - Multi-Column Dark',
    category: 'Footer',
    description: '4-column dark footer with newsletter',
    thumbnail: '',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'BRAND' },
      { id: 'tagline', label: 'Tagline', type: 'text', defaultValue: 'Building the future of commerce.' },
    ],
    generateHtml: (v) => `<div class="${uid('fdark')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fdark')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fdark')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px 40px; }
    .${uid('fdark')}-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
    .${uid('fdark')}-brand { font-size: 20px; font-weight: 700; letter-spacing: 0.1em; color: #fff; margin-bottom: 16px; }
    .${uid('fdark')}-tagline { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 24px; }
    .${uid('fdark')}-social { display: flex; gap: 16px; }
    .${uid('fdark')}-social a { width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; font-size: 14px; transition: background 0.2s; }
    .${uid('fdark')}-social a:hover { background: rgba(255,255,255,0.2); }
    .${uid('fdark')}-col-title { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 20px; }
    .${uid('fdark')}-links { display: flex; flex-direction: column; gap: 12px; }
    .${uid('fdark')}-links a { font-size: 14px; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s; }
    .${uid('fdark')}-links a:hover { color: #fff; }
    .${uid('fdark')}-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
    .${uid('fdark')}-copy { font-size: 13px; color: rgba(255,255,255,0.4); }
    @media (max-width: 768px) { .${uid('fdark')}-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }
  </style>
  <div class="${uid('fdark')}-wrap">
    <div class="${uid('fdark')}-grid">
      <div><div class="${uid('fdark')}-brand">${v.brandName}</div><div class="${uid('fdark')}-tagline">${v.tagline}</div><div class="${uid('fdark')}-social"><a href="#">𝕏</a><a href="#">in</a><a href="#">ig</a></div></div>
      <div><div class="${uid('fdark')}-col-title">Product</div><div class="${uid('fdark')}-links"><a href="#">Features</a><a href="#">Pricing</a><a href="#">Integrations</a><a href="#">API</a></div></div>
      <div><div class="${uid('fdark')}-col-title">Company</div><div class="${uid('fdark')}-links"><a href="#">About</a><a href="#">Blog</a><a href="#">Careers</a><a href="#">Press</a></div></div>
      <div><div class="${uid('fdark')}-col-title">Support</div><div class="${uid('fdark')}-links"><a href="#">Help Center</a><a href="#">Contact</a><a href="#">Status</a><a href="#">Terms</a></div></div>
    </div>
    <div class="${uid('fdark')}-bottom"><div class="${uid('fdark')}-copy">© 2025 ${v.brandName}. All rights reserved.</div></div>
  </div>
</div>`
  },

  // ========== PREMIUM SOCIAL PROOF & REVIEWS ==========
  {
    id: 'social-proof-bar-avatars',
    name: 'Social Proof - Avatar Bar',
    category: 'Trust',
    description: 'Compact social proof bar with stacked avatars and customer count',
    thumbnail: '',
    fields: [
      { id: 'name', label: 'Featured Name', type: 'text', defaultValue: 'Davie' },
      { id: 'count', label: 'Customer Count', type: 'text', defaultValue: '1500+' },
      { id: 'message', label: 'Message', type: 'text', defaultValue: 'others love our products and purchased more than ones!' },
      { id: 'avatar1', label: 'Avatar 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'avatar2', label: 'Avatar 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'avatar3', label: 'Avatar 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'avatar4', label: 'Avatar 4', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
    ],
    generateHtml: (v) => `<div class="${uid('spbar')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('spbar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('spbar')}-outer { display: flex; justify-content: center; padding: 40px 24px; }
    .${uid('spbar')}-wrap { background: #f3f4f6; border-radius: 60px; padding: 16px 32px 16px 20px; display: inline-flex; align-items: center; gap: 16px; }
    .${uid('spbar')}-avatars { display: flex; }
    .${uid('spbar')}-avatar { width: 44px; height: 44px; border-radius: 50%; border: 3px solid #f3f4f6; margin-right: -12px; object-fit: cover; }
    .${uid('spbar')}-avatar:last-child { margin-right: 0; }
    .${uid('spbar')}-text { font-size: 18px; color: #374151; line-height: 1.4; }
    .${uid('spbar')}-text strong { font-weight: 700; color: #1f2937; }
    .${uid('spbar')}-badge { color: #3b82f6; font-size: 16px; margin-left: 4px; }
    @media (max-width: 600px) { .${uid('spbar')}-wrap { flex-direction: column; text-align: center; border-radius: 24px; padding: 20px; } .${uid('spbar')}-text { font-size: 15px; } }
  </style>
  <div class="${uid('spbar')}-outer">
    <div class="${uid('spbar')}-wrap">
      <div class="${uid('spbar')}-avatars">
        <img src="${v.avatar1}" alt="" class="${uid('spbar')}-avatar">
        <img src="${v.avatar2}" alt="" class="${uid('spbar')}-avatar">
        <img src="${v.avatar3}" alt="" class="${uid('spbar')}-avatar">
        <img src="${v.avatar4}" alt="" class="${uid('spbar')}-avatar">
      </div>
      <div class="${uid('spbar')}-text"><strong>${v.name}</strong><span class="${uid('spbar')}-badge">✓</span> and <strong>${v.count}</strong> ${v.message}</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'reviews-carousel-green',
    name: 'Reviews - Trustpilot Style Carousel',
    category: 'Testimonials',
    description: 'Trustpilot-style reviews with mint green background and star badges',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'Our customers tell it better than we do!' },
      { id: 'rating', label: 'Overall Rating', type: 'text', defaultValue: '4.7 / 5' },
      { id: 'reviewCount', label: 'Review Count', type: 'text', defaultValue: '12 067' },
      { id: 'review1Title', label: 'Review 1 Title', type: 'text', defaultValue: 'Very effective electric toothbrush...' },
      { id: 'review1Text', label: 'Review 1 Text', type: 'textarea', defaultValue: "Electric toothbrush that's very effective (gentle yet cleans teeth very well) and very convenient (no more constantly dirty toothbrush holders cluttering the bathroom counter)." },
      { id: 'review1Author', label: 'Review 1 Author', type: 'text', defaultValue: 'Miguel - 27 August' },
      { id: 'review2Title', label: 'Review 2 Title', type: 'text', defaultValue: 'I have very sensitive gums' },
      { id: 'review2Text', label: 'Review 2 Text', type: 'textarea', defaultValue: "I have very sensitive gums that bleed with every brushing. I was skeptical about switching from my more expensive Oral B to another brand. The result? Thrilled!" },
      { id: 'review2Author', label: 'Review 2 Author', type: 'text', defaultValue: 'Barbara - 30 September' },
      { id: 'review3Title', label: 'Review 3 Title', type: 'text', defaultValue: 'I adopted it!' },
      { id: 'review3Text', label: 'Review 3 Text', type: 'textarea', defaultValue: "I've been using an Oral B electric toothbrush for years, but I'm thrilled to have switched to this one: it's softer yet more effective, quieter, and cleaner." },
      { id: 'review3Author', label: 'Review 3 Author', type: 'text', defaultValue: 'Cathrine - 29 July' },
      { id: 'review4Title', label: 'Review 4 Title', type: 'text', defaultValue: 'Very good toothbrush' },
      { id: 'review4Text', label: 'Review 4 Text', type: 'textarea', defaultValue: "Very good toothbrush. I was skeptical at first because of the price, but it is indeed superb. It has a nice design, is easy to use, and the feature of changing sides every 30 seconds is great." },
      { id: 'review4Author', label: 'Review 4 Author', type: 'text', defaultValue: 'Franck - 30 June' },
      { id: 'review5Title', label: 'Review 5 Title', type: 'text', defaultValue: 'I love it!!!' },
      { id: 'review5Text', label: 'Review 5 Text', type: 'textarea', defaultValue: "At first, I thought I'd have to return it because the tickling sensation was bothering me, but after a few days, I got used to it and I'm really glad I persisted." },
      { id: 'review5Author', label: 'Review 5 Author', type: 'text', defaultValue: 'Gerard - 30 June' },
    ],
    generateHtml: (v) => `<div class="${uid('rvcar')}" style="background:#e8f5e9;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('rvcar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('rvcar')}-wrap { max-width: 1400px; margin: 0 auto; padding: 60px 24px 80px; }
    .${uid('rvcar')}-header { text-align: center; margin-bottom: 40px; }
    .${uid('rvcar')}-heading { font-size: 36px; font-weight: 700; font-style: italic; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('rvcar')}-rating-row { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px; }
    .${uid('rvcar')}-excellent { font-size: 18px; color: #1a1a1a; }
    .${uid('rvcar')}-score { font-size: 24px; font-weight: 700; color: #1a1a1a; }
    .${uid('rvcar')}-tp-stars { display: flex; gap: 3px; }
    .${uid('rvcar')}-tp-star { width: 24px; height: 24px; background: #00b67a; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; }
    .${uid('rvcar')}-count { font-size: 15px; color: #666; }
    .${uid('rvcar')}-count span { text-decoration: underline; font-weight: 600; color: #1a1a1a; }
    .${uid('rvcar')}-carousel { position: relative; }
    .${uid('rvcar')}-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
    .${uid('rvcar')}-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: #fff; border: 1px solid #e5e5e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; color: #666; z-index: 10; }
    .${uid('rvcar')}-nav:hover { background: #f5f5f5; }
    .${uid('rvcar')}-nav-left { left: -20px; }
    .${uid('rvcar')}-nav-right { right: -20px; }
    .${uid('rvcar')}-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); display: flex; flex-direction: column; }
    .${uid('rvcar')}-card-stars { display: flex; gap: 2px; margin-bottom: 16px; }
    .${uid('rvcar')}-card-star { width: 20px; height: 20px; background: #00b67a; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; }
    .${uid('rvcar')}-card-title { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; text-align: center; }
    .${uid('rvcar')}-card-text { font-size: 13px; color: #666; line-height: 1.6; text-align: center; flex: 1; margin-bottom: 20px; }
    .${uid('rvcar')}-card-author { font-size: 13px; color: #999; text-align: center; }
    .${uid('rvcar')}-btn-wrap { text-align: center; margin-top: 40px; }
    .${uid('rvcar')}-btn { display: inline-block; padding: 14px 32px; background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 4px; }
    .${uid('rvcar')}-btn:hover { background: #333; }
    @media (max-width: 1100px) { .${uid('rvcar')}-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 700px) { .${uid('rvcar')}-grid { grid-template-columns: 1fr; } .${uid('rvcar')}-nav { display: none; } }
  </style>
  <div class="${uid('rvcar')}-wrap">
    <div class="${uid('rvcar')}-header">
      <h2 class="${uid('rvcar')}-heading">${v.heading}</h2>
      <div class="${uid('rvcar')}-rating-row">
        <span class="${uid('rvcar')}-excellent">Excellent</span>
        <span class="${uid('rvcar')}-score">${v.rating}</span>
        <div class="${uid('rvcar')}-tp-stars"><span class="${uid('rvcar')}-tp-star">★</span><span class="${uid('rvcar')}-tp-star">★</span><span class="${uid('rvcar')}-tp-star">★</span><span class="${uid('rvcar')}-tp-star">★</span><span class="${uid('rvcar')}-tp-star">★</span></div>
      </div>
      <div class="${uid('rvcar')}-count">based on <span>${v.reviewCount}</span> reviews</div>
    </div>
    <div class="${uid('rvcar')}-carousel">
      <div class="${uid('rvcar')}-nav ${uid('rvcar')}-nav-left">‹</div>
      <div class="${uid('rvcar')}-nav ${uid('rvcar')}-nav-right">›</div>
      <div class="${uid('rvcar')}-grid">
        <div class="${uid('rvcar')}-card">
          <div class="${uid('rvcar')}-card-stars"><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span></div>
          <div class="${uid('rvcar')}-card-title">${v.review1Title}</div>
          <div class="${uid('rvcar')}-card-text">${v.review1Text}</div>
          <div class="${uid('rvcar')}-card-author">${v.review1Author}</div>
        </div>
        <div class="${uid('rvcar')}-card">
          <div class="${uid('rvcar')}-card-stars"><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span></div>
          <div class="${uid('rvcar')}-card-title">${v.review2Title}</div>
          <div class="${uid('rvcar')}-card-text">${v.review2Text}</div>
          <div class="${uid('rvcar')}-card-author">${v.review2Author}</div>
        </div>
        <div class="${uid('rvcar')}-card">
          <div class="${uid('rvcar')}-card-stars"><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star" style="background:#c4e8c4;">★</span></div>
          <div class="${uid('rvcar')}-card-title">${v.review3Title}</div>
          <div class="${uid('rvcar')}-card-text">${v.review3Text}</div>
          <div class="${uid('rvcar')}-card-author">${v.review3Author}</div>
        </div>
        <div class="${uid('rvcar')}-card">
          <div class="${uid('rvcar')}-card-stars"><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span></div>
          <div class="${uid('rvcar')}-card-title">${v.review4Title}</div>
          <div class="${uid('rvcar')}-card-text">${v.review4Text}</div>
          <div class="${uid('rvcar')}-card-author">${v.review4Author}</div>
        </div>
        <div class="${uid('rvcar')}-card">
          <div class="${uid('rvcar')}-card-stars"><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span><span class="${uid('rvcar')}-card-star">★</span></div>
          <div class="${uid('rvcar')}-card-title">${v.review5Title}</div>
          <div class="${uid('rvcar')}-card-text">${v.review5Text}</div>
          <div class="${uid('rvcar')}-card-author">${v.review5Author}</div>
        </div>
      </div>
    </div>
    <div class="${uid('rvcar')}-btn-wrap"><a href="#" class="${uid('rvcar')}-btn">View All</a></div>
  </div>
</div>`
  },
  {
    id: 'video-testimonials-grid',
    name: 'Testimonials - Video Grid',
    category: 'Testimonials',
    description: 'Vertical video testimonials with play buttons at bottom-left',
    thumbnail: '',
    fields: [
      { id: 'video1Thumb', label: 'Video 1 Thumbnail', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'video2Thumb', label: 'Video 2 Thumbnail', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'video3Thumb', label: 'Video 3 Thumbnail', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
    ],
    generateHtml: (v) => `<div class="${uid('vidtst')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('vidtst')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('vidtst')}-wrap { max-width: 600px; margin: 0 auto; padding: 40px 24px; position: relative; }
    .${uid('vidtst')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .${uid('vidtst')}-card { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 3/4; cursor: pointer; background: #f0f0f0; }
    .${uid('vidtst')}-card img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('vidtst')}-play { position: absolute; bottom: 12px; left: 12px; width: 36px; height: 36px; background: rgba(0,0,0,0.7); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .${uid('vidtst')}-play::after { content: ''; width: 0; height: 0; border-left: 10px solid #fff; border-top: 6px solid transparent; border-bottom: 6px solid transparent; margin-left: 2px; }
    .${uid('vidtst')}-nav { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; background: #fff; border: 1px solid #e5e5e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; color: #666; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    @media (max-width: 500px) { .${uid('vidtst')}-wrap { padding: 20px 12px; } }
  </style>
  <div class="${uid('vidtst')}-wrap">
    <div class="${uid('vidtst')}-grid">
      <div class="${uid('vidtst')}-card">
        <img src="${v.video1Thumb}" alt="">
        <div class="${uid('vidtst')}-play"></div>
      </div>
      <div class="${uid('vidtst')}-card">
        <img src="${v.video2Thumb}" alt="">
        <div class="${uid('vidtst')}-play"></div>
      </div>
      <div class="${uid('vidtst')}-card">
        <img src="${v.video3Thumb}" alt="">
        <div class="${uid('vidtst')}-play"></div>
      </div>
    </div>
    <div class="${uid('vidtst')}-nav">›</div>
  </div>
</div>`
  },
  {
    id: 'category-cards-scroll',
    name: 'Product - Category Cards Row',
    category: 'Product',
    description: 'Category cards with YOUR PERFECT FIT label on each card',
    thumbnail: '',
    fields: [
      { id: 'label', label: 'Card Label', type: 'text', defaultValue: 'YOUR PERFECT FIT' },
      { id: 'cat1Name', label: 'Category 1 Name', type: 'text', defaultValue: 'Under $50' },
      { id: 'cat1Image', label: 'Category 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png' },
      { id: 'cat2Name', label: 'Category 2 Name', type: 'text', defaultValue: 'Backpacks' },
      { id: 'cat2Image', label: 'Category 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png' },
      { id: 'cat3Name', label: 'Category 3 Name', type: 'text', defaultValue: 'Blazers' },
      { id: 'cat3Image', label: 'Category 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png' },
      { id: 'cat4Name', label: 'Category 4 Name', type: 'text', defaultValue: 'Home page' },
      { id: 'cat4Image', label: 'Category 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(14).png' },
      { id: 'cat5Name', label: 'Category 5 Name', type: 'text', defaultValue: 'Best Sellers' },
      { id: 'cat5Image', label: 'Category 5 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(15).png' },
    ],
    generateHtml: (v) => `<div class="${uid('catcrd')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('catcrd')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('catcrd')}-wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    .${uid('catcrd')}-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
    .${uid('catcrd')}-card { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 3/4; }
    .${uid('catcrd')}-card img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('catcrd')}-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%); }
    .${uid('catcrd')}-label { font-size: 9px; font-weight: 500; letter-spacing: 0.1em; color: rgba(255,255,255,0.85); margin-bottom: 6px; }
    .${uid('catcrd')}-name { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 14px; }
    .${uid('catcrd')}-btn { display: inline-block; padding: 10px 20px; background: #fff; color: #1a1a1a; font-size: 11px; font-weight: 600; text-decoration: none; border-radius: 4px; width: fit-content; }
    .${uid('catcrd')}-btn:hover { background: #f5f5f5; }
    @media (max-width: 900px) { .${uid('catcrd')}-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 600px) { .${uid('catcrd')}-grid { grid-template-columns: repeat(2, 1fr); } .${uid('catcrd')}-name { font-size: 16px; } }
  </style>
  <div class="${uid('catcrd')}-wrap">
    <div class="${uid('catcrd')}-grid">
      <div class="${uid('catcrd')}-card"><img src="${v.cat1Image}" alt="${v.cat1Name}"><div class="${uid('catcrd')}-content"><div class="${uid('catcrd')}-label">${v.label}</div><div class="${uid('catcrd')}-name">${v.cat1Name}</div><a href="#" class="${uid('catcrd')}-btn">SHOP NOW</a></div></div>
      <div class="${uid('catcrd')}-card"><img src="${v.cat2Image}" alt="${v.cat2Name}"><div class="${uid('catcrd')}-content"><div class="${uid('catcrd')}-label">${v.label}</div><div class="${uid('catcrd')}-name">${v.cat2Name}</div><a href="#" class="${uid('catcrd')}-btn">SHOP NOW</a></div></div>
      <div class="${uid('catcrd')}-card"><img src="${v.cat3Image}" alt="${v.cat3Name}"><div class="${uid('catcrd')}-content"><div class="${uid('catcrd')}-label">${v.label}</div><div class="${uid('catcrd')}-name">${v.cat3Name}</div><a href="#" class="${uid('catcrd')}-btn">SHOP NOW</a></div></div>
      <div class="${uid('catcrd')}-card"><img src="${v.cat4Image}" alt="${v.cat4Name}"><div class="${uid('catcrd')}-content"><div class="${uid('catcrd')}-label">${v.label}</div><div class="${uid('catcrd')}-name">${v.cat4Name}</div><a href="#" class="${uid('catcrd')}-btn">SHOP NOW</a></div></div>
      <div class="${uid('catcrd')}-card"><img src="${v.cat5Image}" alt="${v.cat5Name}"><div class="${uid('catcrd')}-content"><div class="${uid('catcrd')}-label">${v.label}</div><div class="${uid('catcrd')}-name">${v.cat5Name}</div><a href="#" class="${uid('catcrd')}-btn">SHOP NOW</a></div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-split-yellow-badge',
    name: 'Hero - Split Yellow with Badge',
    category: 'Hero',
    description: 'Split hero with yellow background and rotating starburst badge',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Consciously Created' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Most of our favorite ingredients come straight from Mother Nature. We love awakening antioxidants, nourishing oils and essential vitamins.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Learn more' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
    ],
    generateHtml: (v) => `<div class="${uid('hsyb')}" style="font-family:'Georgia',serif;">
  <style>
    .${uid('hsyb')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hsyb')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 450px; border-radius: 24px; overflow: hidden; margin: 20px; position: relative; }
    .${uid('hsyb')}-left { background: #f7e64a; padding: 60px 50px; display: flex; flex-direction: column; justify-content: center; border-radius: 24px 0 0 24px; }
    .${uid('hsyb')}-heading { font-size: 42px; font-weight: 400; font-style: italic; color: #1a1a1a; line-height: 1.15; margin-bottom: 20px; font-family: 'Georgia', serif; }
    .${uid('hsyb')}-desc { font-size: 14px; color: #333; line-height: 1.7; margin-bottom: 28px; max-width: 380px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    .${uid('hsyb')}-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 50px; width: fit-content; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    .${uid('hsyb')}-btn:hover { background: #333; }
    .${uid('hsyb')}-btn::after { content: '→'; }
    .${uid('hsyb')}-badge { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); width: 80px; height: 80px; z-index: 10; }
    .${uid('hsyb')}-badge svg { width: 100%; height: 100%; animation: ${uid('hsyb')}-rotate 15s linear infinite; }
    .${uid('hsyb')}-right { position: relative; overflow: hidden; background: #d4c4b5; }
    .${uid('hsyb')}-right img { width: 100%; height: 100%; object-fit: cover; }
    @keyframes ${uid('hsyb')}-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @media (max-width: 900px) { .${uid('hsyb')}-wrap { grid-template-columns: 1fr; margin: 12px; } .${uid('hsyb')}-left { padding: 40px 24px; border-radius: 24px 24px 0 0; } .${uid('hsyb')}-heading { font-size: 32px; } .${uid('hsyb')}-right { min-height: 350px; } .${uid('hsyb')}-badge { top: auto; bottom: 45%; } }
  </style>
  <div class="${uid('hsyb')}-wrap">
    <div class="${uid('hsyb')}-left">
      <h1 class="${uid('hsyb')}-heading">${v.heading}</h1>
      <p class="${uid('hsyb')}-desc">${v.description}</p>
      <a href="#" class="${uid('hsyb')}-btn">${v.buttonText}</a>
    </div>
    <div class="${uid('hsyb')}-badge">
      <svg viewBox="0 0 100 100">
        <defs><path id="${uid('hsyb')}-circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/></defs>
        <circle cx="50" cy="50" r="40" fill="#1a1a1a"/>
        <circle cx="50" cy="50" r="3" fill="#fff"/>
        <text fill="#fff" font-size="8" font-weight="600" letter-spacing="2">
          <textPath href="#${uid('hsyb')}-circ">FREE SHIPPING • WORLDWIDE •</textPath>
        </text>
      </svg>
    </div>
    <div class="${uid('hsyb')}-right">
      <img src="${v.image}" alt="">
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-pink-product',
    name: 'Hero - Pink Product Showcase',
    category: 'Hero',
    description: 'Pink hero with product, social proof badges and dual CTAs',
    thumbnail: '',
    fields: [
      { id: 'badgeText', label: 'Social Proof Badge', type: 'text', defaultValue: '50K+ Happy Customers' },
      { id: 'rating', label: 'Rating', type: 'text', defaultValue: '4.7' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: "It's all about the crave" },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Our products are easy to understand, made from organic, nutritious and delicious ingredients.' },
      { id: 'btn1Text', label: 'Button 1 Text', type: 'text', defaultValue: 'Shop bars' },
      { id: 'btn2Text', label: 'Button 2 Text', type: 'text', defaultValue: 'Shop chips' },
      { id: 'bottomText', label: 'Bottom Text', type: 'text', defaultValue: 'Over 50,000 Happy Customers' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'avatar1', label: 'Avatar 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'avatar2', label: 'Avatar 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'avatar3', label: 'Avatar 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
    ],
    generateHtml: (v) => `<div class="${uid('hpink')}" style="background:#f8c8c8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hpink')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hpink')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 420px; max-width: 1400px; margin: 0 auto; align-items: center; }
    .${uid('hpink')}-left { padding: 50px; }
    .${uid('hpink')}-social { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .${uid('hpink')}-avatars { display: flex; }
    .${uid('hpink')}-avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #f8c8c8; margin-right: -8px; object-fit: cover; }
    .${uid('hpink')}-social-text { font-size: 12px; color: #1a1a1a; }
    .${uid('hpink')}-tp { display: flex; align-items: center; gap: 2px; background: #00b67a; padding: 2px 6px; border-radius: 3px; }
    .${uid('hpink')}-tp-stars { color: #fff; font-size: 10px; }
    .${uid('hpink')}-tp-score { color: #fff; font-size: 11px; font-weight: 600; margin-left: 4px; }
    .${uid('hpink')}-heading { font-size: 44px; font-weight: 700; color: #1a1a1a; line-height: 1.1; margin-bottom: 16px; }
    .${uid('hpink')}-desc { font-size: 14px; color: #444; line-height: 1.6; margin-bottom: 24px; max-width: 380px; }
    .${uid('hpink')}-btns { display: flex; gap: 12px; margin-bottom: 28px; }
    .${uid('hpink')}-btn { padding: 12px 24px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 6px; border: 2px solid #1a1a1a; }
    .${uid('hpink')}-btn-primary { background: #1a1a1a; color: #fff; }
    .${uid('hpink')}-btn-secondary { background: transparent; color: #1a1a1a; }
    .${uid('hpink')}-bottom { font-size: 12px; font-weight: 700; color: #1a1a1a; }
    .${uid('hpink')}-right { position: relative; height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .${uid('hpink')}-right img { max-width: 100%; max-height: 380px; object-fit: contain; filter: drop-shadow(15px 15px 30px rgba(0,0,0,0.12)); }
    @media (max-width: 900px) { .${uid('hpink')}-wrap { grid-template-columns: 1fr; } .${uid('hpink')}-left { padding: 32px 24px; } .${uid('hpink')}-heading { font-size: 32px; } }
  </style>
  <div class="${uid('hpink')}-wrap">
    <div class="${uid('hpink')}-left">
      <div class="${uid('hpink')}-social">
        <div class="${uid('hpink')}-avatars">
          <img src="${v.avatar1}" alt="" class="${uid('hpink')}-avatar">
          <img src="${v.avatar2}" alt="" class="${uid('hpink')}-avatar">
          <img src="${v.avatar3}" alt="" class="${uid('hpink')}-avatar">
        </div>
        <span class="${uid('hpink')}-social-text">${v.badgeText}</span>
        <div class="${uid('hpink')}-tp"><span class="${uid('hpink')}-tp-stars">★★★★★</span><span class="${uid('hpink')}-tp-score">${v.rating}</span></div>
      </div>
      <h1 class="${uid('hpink')}-heading">${v.heading}</h1>
      <p class="${uid('hpink')}-desc">${v.description}</p>
      <div class="${uid('hpink')}-btns">
        <a href="#" class="${uid('hpink')}-btn ${uid('hpink')}-btn-primary">${v.btn1Text}</a>
        <a href="#" class="${uid('hpink')}-btn ${uid('hpink')}-btn-secondary">${v.btn2Text}</a>
      </div>
      <div class="${uid('hpink')}-bottom">${v.bottomText}</div>
    </div>
    <div class="${uid('hpink')}-right">
      <img src="${v.image}" alt="">
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-skincare-review',
    name: 'Hero - Skincare with Review',
    category: 'Hero',
    description: 'Beige hero with italic heading and embedded customer review',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Buy One, Get One Half Off' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: "Make Mother's Day twice as nice! Select skincare and bodycare is buy one, get one half off, so you can give more to the special women in your life." },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop now' },
      { id: 'reviewRating', label: 'Review Rating', type: 'text', defaultValue: '4.9' },
      { id: 'reviewCount', label: 'Review Count', type: 'text', defaultValue: '100,000+ Customers' },
      { id: 'reviewText', label: 'Review Text', type: 'textarea', defaultValue: '"My skin looks amazing now! This brand is truly the best I\'ve tried."' },
      { id: 'reviewAuthor', label: 'Review Author', type: 'text', defaultValue: 'Joanne' },
      { id: 'reviewProduct', label: 'Review Product', type: 'text', defaultValue: 'Rose Serum' },
      { id: 'reviewerAvatar', label: 'Reviewer Avatar', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'image', label: 'Hero Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
    ],
    generateHtml: (v) => `<div class="${uid('hskin')}" style="background:linear-gradient(135deg,#d4c4b5 0%,#c9b8a8 100%);font-family:'Georgia',serif;">
  <style>
    .${uid('hskin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hskin')}-wrap { display: grid; grid-template-columns: 0.9fr 1.1fr; min-height: 420px; max-width: 1400px; margin: 0 auto; border-radius: 20px; overflow: hidden; }
    .${uid('hskin')}-left { padding: 50px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('hskin')}-heading { font-size: 40px; font-weight: 400; font-style: italic; color: #1a1a1a; line-height: 1.15; margin-bottom: 14px; font-family: 'Georgia', serif; }
    .${uid('hskin')}-desc { font-size: 13px; color: #444; line-height: 1.6; margin-bottom: 24px; max-width: 340px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    .${uid('hskin')}-btn { display: inline-flex; padding: 12px 28px; background: #fff; color: #1a1a1a; font-size: 13px; font-weight: 500; text-decoration: none; border-radius: 50px; border: 1px solid #ccc; width: fit-content; margin-bottom: 32px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    .${uid('hskin')}-btn:hover { background: #f5f5f5; }
    .${uid('hskin')}-review-header { display: flex; align-items: center; gap: 6px; margin-bottom: 14px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    .${uid('hskin')}-review-rating { color: #b8860b; font-size: 13px; font-weight: 600; }
    .${uid('hskin')}-review-count { font-size: 12px; color: #666; }
    .${uid('hskin')}-review-stars { color: #ffc107; font-size: 13px; letter-spacing: 1px; }
    .${uid('hskin')}-review-body { display: flex; gap: 14px; align-items: flex-start; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    .${uid('hskin')}-review-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .${uid('hskin')}-review-text { font-size: 15px; color: #1a1a1a; line-height: 1.5; margin-bottom: 6px; }
    .${uid('hskin')}-review-author { font-size: 11px; color: #888; }
    .${uid('hskin')}-review-author span { color: #b8860b; }
    .${uid('hskin')}-right { position: relative; overflow: hidden; }
    .${uid('hskin')}-right img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 900px) { .${uid('hskin')}-wrap { grid-template-columns: 1fr; } .${uid('hskin')}-left { padding: 36px 24px; } .${uid('hskin')}-heading { font-size: 30px; } .${uid('hskin')}-right { min-height: 320px; } }
  </style>
  <div class="${uid('hskin')}-wrap">
    <div class="${uid('hskin')}-left">
      <h1 class="${uid('hskin')}-heading">${v.heading}</h1>
      <p class="${uid('hskin')}-desc">${v.description}</p>
      <a href="#" class="${uid('hskin')}-btn">${v.buttonText}</a>
      <div class="${uid('hskin')}-review-header">
        <span class="${uid('hskin')}-review-rating">Excellent ${v.reviewRating}</span>
        <span class="${uid('hskin')}-review-count">| ${v.reviewCount}</span>
        <span class="${uid('hskin')}-review-stars">★★★★★</span>
      </div>
      <div class="${uid('hskin')}-review-body">
        <img src="${v.reviewerAvatar}" alt="" class="${uid('hskin')}-review-avatar">
        <div>
          <div class="${uid('hskin')}-review-text">${v.reviewText}</div>
          <div class="${uid('hskin')}-review-author">- ${v.reviewAuthor} | <span>Review on ${v.reviewProduct}</span></div>
        </div>
      </div>
    </div>
    <div class="${uid('hskin')}-right">
      <img src="${v.image}" alt="">
    </div>
  </div>
</div>`
  },
  {
    id: 'faq-accordion-elegant',
    name: 'FAQ - Elegant Accordion',
    category: 'FAQ',
    description: 'Clean expandable FAQ sections with sizing button',
    thumbnail: '',
    fields: [
      { id: 'section1Title', label: 'Section 1 Title', type: 'text', defaultValue: 'Description' },
      { id: 'section1Content', label: 'Section 1 Content', type: 'textarea', defaultValue: 'Crafted from premium materials, this piece combines timeless design with modern functionality. Perfect for everyday wear or special occasions.' },
      { id: 'section2Title', label: 'Section 2 Title', type: 'text', defaultValue: 'Size & Fit' },
      { id: 'section2Content', label: 'Section 2 Content', type: 'textarea', defaultValue: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      { id: 'ctaText', label: 'CTA Button Text', type: 'text', defaultValue: 'Sizing' },
    ],
    generateHtml: (v) => `<div class="${uid('faqel')}" style="background:#f5f5f0;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('faqel')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faqel')}-wrap { max-width: 700px; margin: 0 auto; padding: 40px 24px; }
    .${uid('faqel')}-item { background: #fff; border-radius: 20px; margin-bottom: 16px; overflow: hidden; }
    .${uid('faqel')}-header { padding: 28px 32px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
    .${uid('faqel')}-title { font-size: 20px; font-weight: 600; color: #1a1a1a; }
    .${uid('faqel')}-icon { font-size: 18px; color: #1a1a1a; transition: transform 0.3s; }
    .${uid('faqel')}-item.active .${uid('faqel')}-icon { transform: rotate(180deg); }
    .${uid('faqel')}-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
    .${uid('faqel')}-item.active .${uid('faqel')}-content { max-height: 400px; }
    .${uid('faqel')}-content-inner { padding: 0 32px 32px; }
    .${uid('faqel')}-text { font-size: 18px; color: #1a1a1a; line-height: 1.7; margin-bottom: 28px; }
    .${uid('faqel')}-cta { display: inline-flex; align-items: center; gap: 10px; padding: 16px 28px; background: #1a1a1a; color: #fff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 12px; transition: all 0.3s; }
    .${uid('faqel')}-cta:hover { background: #333; }
    .${uid('faqel')}-cta svg { width: 18px; height: 18px; }
  </style>
  <div class="${uid('faqel')}-wrap">
    <div class="${uid('faqel')}-item">
      <div class="${uid('faqel')}-header" onclick="this.parentElement.classList.toggle('active')">
        <span class="${uid('faqel')}-title">${v.section1Title}</span>
        <span class="${uid('faqel')}-icon">▼</span>
      </div>
      <div class="${uid('faqel')}-content"><div class="${uid('faqel')}-content-inner"><p class="${uid('faqel')}-text">${v.section1Content}</p></div></div>
    </div>
    <div class="${uid('faqel')}-item active">
      <div class="${uid('faqel')}-header" onclick="this.parentElement.classList.toggle('active')">
        <span class="${uid('faqel')}-title">${v.section2Title}</span>
        <span class="${uid('faqel')}-icon">▲</span>
      </div>
      <div class="${uid('faqel')}-content"><div class="${uid('faqel')}-content-inner"><p class="${uid('faqel')}-text">${v.section2Content}</p><a href="#" class="${uid('faqel')}-cta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg> ${v.ctaText}</a></div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'reviews-carousel-minimal',
    name: 'Testimonials - Reviews Carousel',
    category: 'Testimonials',
    description: 'Minimal reviews carousel with navigation arrows and multiple slides',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'cardBgColor', label: 'Card Background', type: 'color', defaultValue: '#f8f8f8' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#374151' },
      { id: 'nameColor', label: 'Name Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'starsColor', label: 'Stars Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'arrowColor', label: 'Arrow Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'review1Name', label: 'Review 1 Name', type: 'text', defaultValue: 'Lori' },
      { id: 'review1Image', label: 'Review 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'review1Text', label: 'Review 1 Text', type: 'textarea', defaultValue: "Very pleased with this purchase! It's high-quality, easy to use, and reliable. Highly recommend for its efficiency and convenience." },
      { id: 'review1Stars', label: 'Review 1 Stars (1-5)', type: 'number', defaultValue: '5' },
      { id: 'review2Name', label: 'Review 2 Name', type: 'text', defaultValue: 'Marcus' },
      { id: 'review2Image', label: 'Review 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'review2Text', label: 'Review 2 Text', type: 'textarea', defaultValue: "Absolutely love this product! The quality exceeded my expectations and the delivery was super fast. Will definitely order again." },
      { id: 'review2Stars', label: 'Review 2 Stars (1-5)', type: 'number', defaultValue: '5' },
      { id: 'review3Name', label: 'Review 3 Name', type: 'text', defaultValue: 'Sarah' },
      { id: 'review3Image', label: 'Review 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'review3Text', label: 'Review 3 Text', type: 'textarea', defaultValue: "Best purchase I've made this year. The attention to detail is incredible and customer service was top-notch when I had questions." },
      { id: 'review3Stars', label: 'Review 3 Stars (1-5)', type: 'number', defaultValue: '5' },
      { id: 'review4Name', label: 'Review 4 Name', type: 'text', defaultValue: 'James' },
      { id: 'review4Image', label: 'Review 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'review4Text', label: 'Review 4 Text', type: 'textarea', defaultValue: "Outstanding quality and craftsmanship. I've recommended this to all my friends and family. You won't be disappointed!" },
      { id: 'review4Stars', label: 'Review 4 Stars (1-5)', type: 'number', defaultValue: '4' },
    ],
    generateHtml: (v) => {
      const getStars = (count: number) => '★'.repeat(Math.min(5, Math.max(1, count))) + '☆'.repeat(5 - Math.min(5, Math.max(1, count)));
      return `<div class="${uid('revcar')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('revcar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('revcar')}-wrap { max-width: 750px; margin: 0 auto; padding: 50px 24px; }
    .${uid('revcar')}-slider { position: relative; overflow: hidden; }
    .${uid('revcar')}-track { display: flex; transition: transform 0.4s ease; }
    .${uid('revcar')}-slide { min-width: 100%; padding: 0 8px; }
    .${uid('revcar')}-review { display: flex; align-items: center; gap: 24px; background: ${v.cardBgColor}; padding: 28px; border-radius: 20px; }
    .${uid('revcar')}-avatar { width: 100px; height: 100px; border-radius: 16px; object-fit: cover; flex-shrink: 0; }
    .${uid('revcar')}-content { flex: 1; }
    .${uid('revcar')}-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .${uid('revcar')}-name { font-size: 18px; font-weight: 700; font-style: italic; color: ${v.nameColor}; }
    .${uid('revcar')}-stars { color: ${v.starsColor}; font-size: 18px; letter-spacing: 2px; }
    .${uid('revcar')}-text { font-size: 16px; color: ${v.textColor}; line-height: 1.7; }
    .${uid('revcar')}-nav { display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 24px; }
    .${uid('revcar')}-arrow { width: 44px; height: 44px; border: 1px solid #e0e0e0; background: #fff; border-radius: 50%; font-size: 20px; color: ${v.arrowColor}; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
    .${uid('revcar')}-arrow:hover { background: ${v.arrowColor}; color: #fff; border-color: ${v.arrowColor}; }
    .${uid('revcar')}-dots { display: flex; gap: 8px; }
    .${uid('revcar')}-dot { width: 8px; height: 8px; border-radius: 50%; background: #d0d0d0; cursor: pointer; transition: all 0.2s; }
    .${uid('revcar')}-dot.active { background: ${v.arrowColor}; width: 24px; border-radius: 4px; }
    @media (max-width: 600px) { .${uid('revcar')}-review { flex-direction: column; text-align: center; } .${uid('revcar')}-header { justify-content: center; } .${uid('revcar')}-avatar { width: 80px; height: 80px; } }
  </style>
  <div class="${uid('revcar')}-wrap">
    <div class="${uid('revcar')}-slider">
      <div class="${uid('revcar')}-track">
        <div class="${uid('revcar')}-slide">
          <div class="${uid('revcar')}-review">
            <img src="${v.review1Image}" alt="${v.review1Name}" class="${uid('revcar')}-avatar">
            <div class="${uid('revcar')}-content">
              <div class="${uid('revcar')}-header">
                <span class="${uid('revcar')}-name">${v.review1Name}</span>
                <span class="${uid('revcar')}-stars">${getStars(parseInt(v.review1Stars) || 5)}</span>
              </div>
              <p class="${uid('revcar')}-text">${v.review1Text}</p>
            </div>
          </div>
        </div>
        <div class="${uid('revcar')}-slide">
          <div class="${uid('revcar')}-review">
            <img src="${v.review2Image}" alt="${v.review2Name}" class="${uid('revcar')}-avatar">
            <div class="${uid('revcar')}-content">
              <div class="${uid('revcar')}-header">
                <span class="${uid('revcar')}-name">${v.review2Name}</span>
                <span class="${uid('revcar')}-stars">${getStars(parseInt(v.review2Stars) || 5)}</span>
              </div>
              <p class="${uid('revcar')}-text">${v.review2Text}</p>
            </div>
          </div>
        </div>
        <div class="${uid('revcar')}-slide">
          <div class="${uid('revcar')}-review">
            <img src="${v.review3Image}" alt="${v.review3Name}" class="${uid('revcar')}-avatar">
            <div class="${uid('revcar')}-content">
              <div class="${uid('revcar')}-header">
                <span class="${uid('revcar')}-name">${v.review3Name}</span>
                <span class="${uid('revcar')}-stars">${getStars(parseInt(v.review3Stars) || 5)}</span>
              </div>
              <p class="${uid('revcar')}-text">${v.review3Text}</p>
            </div>
          </div>
        </div>
        <div class="${uid('revcar')}-slide">
          <div class="${uid('revcar')}-review">
            <img src="${v.review4Image}" alt="${v.review4Name}" class="${uid('revcar')}-avatar">
            <div class="${uid('revcar')}-content">
              <div class="${uid('revcar')}-header">
                <span class="${uid('revcar')}-name">${v.review4Name}</span>
                <span class="${uid('revcar')}-stars">${getStars(parseInt(v.review4Stars) || 5)}</span>
              </div>
              <p class="${uid('revcar')}-text">${v.review4Text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="${uid('revcar')}-nav">
      <button class="${uid('revcar')}-arrow" onclick="this.closest('.${uid('revcar')}-wrap').querySelector('.${uid('revcar')}-track').style.transform='translateX(-0%)'">‹</button>
      <div class="${uid('revcar')}-dots">
        <div class="${uid('revcar')}-dot active" onclick="this.closest('.${uid('revcar')}-wrap').querySelector('.${uid('revcar')}-track').style.transform='translateX(-0%)'"></div>
        <div class="${uid('revcar')}-dot" onclick="this.closest('.${uid('revcar')}-wrap').querySelector('.${uid('revcar')}-track').style.transform='translateX(-100%)'"></div>
        <div class="${uid('revcar')}-dot" onclick="this.closest('.${uid('revcar')}-wrap').querySelector('.${uid('revcar')}-track').style.transform='translateX(-200%)'"></div>
        <div class="${uid('revcar')}-dot" onclick="this.closest('.${uid('revcar')}-wrap').querySelector('.${uid('revcar')}-track').style.transform='translateX(-300%)'"></div>
      </div>
      <button class="${uid('revcar')}-arrow" onclick="this.closest('.${uid('revcar')}-wrap').querySelector('.${uid('revcar')}-track').style.transform='translateX(-100%)'">›</button>
    </div>
  </div>
</div>`;
    }
  },
  {
    id: 'features-connecting-lines',
    name: 'Features - Connecting Lines',
    category: 'Features',
    description: 'Split layout with image and feature points connected by lines',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'All glow. No gimmicks.' },
      { id: 'subheading', label: 'Subheading', type: 'text', defaultValue: 'Our skincare is crafted with the most effective ingredients out there, and nothing extra.' },
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Clean, vegan formulas' },
      { id: 'feature1Text', label: 'Feature 1 Text', type: 'textarea', defaultValue: "All the essentials your skin craves, and nothing you'd rather avoid. No harsh fillers, or fragrances." },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Packed with high-impact ingredients' },
      { id: 'feature2Text', label: 'Feature 2 Text', type: 'textarea', defaultValue: 'When actives work smarter, your skin does too. We choose the right ones for the job and truly perform.' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'In textures that guarantee absorption' },
      { id: 'feature3Text', label: 'Feature 3 Text', type: 'textarea', defaultValue: "We've designed our advanced, skin-friendly vehicles to deliver ingredients where they're needed most." },
      { id: 'feature4Title', label: 'Feature 4 Title', type: 'text', defaultValue: 'Backed by science' },
      { id: 'feature4Text', label: 'Feature 4 Text', type: 'textarea', defaultValue: 'Built on 2,100+ studies. Proven to work through independent testing, both on real skin (in vivo) and in controlled labs (in vitro).' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop now' },
      { id: 'image', label: 'Feature Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
    ],
    generateHtml: (v) => `<div class="${uid('ftln')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('ftln')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ftln')}-wrap { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; max-width: 1100px; margin: 0 auto; padding: 60px 24px; align-items: start; }
    .${uid('ftln')}-image { position: relative; }
    .${uid('ftln')}-image img { width: 100%; border-radius: 0; }
    .${uid('ftln')}-content { padding-top: 20px; }
    .${uid('ftln')}-heading { font-size: 36px; font-weight: 700; color: #1e3a5f; line-height: 1.2; margin-bottom: 16px; }
    .${uid('ftln')}-subheading { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 32px; }
    .${uid('ftln')}-features { display: flex; flex-direction: column; gap: 0; position: relative; padding-left: 24px; }
    .${uid('ftln')}-features::before { content: ''; position: absolute; left: 4px; top: 8px; bottom: 8px; width: 2px; background: #1e3a5f; }
    .${uid('ftln')}-item { display: flex; gap: 16px; align-items: flex-start; position: relative; padding: 12px 0; }
    .${uid('ftln')}-dot { position: absolute; left: -24px; top: 18px; width: 10px; height: 10px; background: #1e3a5f; border-radius: 50%; z-index: 1; }
    .${uid('ftln')}-item-content { }
    .${uid('ftln')}-item-title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 6px; }
    .${uid('ftln')}-item-text { font-size: 13px; color: #666; line-height: 1.6; }
    .${uid('ftln')}-btn { display: inline-flex; padding: 14px 28px; background: #1e3a5f; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 50px; margin-top: 28px; transition: all 0.3s; }
    .${uid('ftln')}-btn:hover { background: #152d4a; transform: translateY(-2px); }
    @media (max-width: 900px) { .${uid('ftln')}-wrap { grid-template-columns: 1fr; } .${uid('ftln')}-heading { font-size: 28px; } }
  </style>
  <div class="${uid('ftln')}-wrap">
    <div class="${uid('ftln')}-image"><img src="${v.image}" alt=""></div>
    <div class="${uid('ftln')}-content">
      <h2 class="${uid('ftln')}-heading">${v.heading}</h2>
      <p class="${uid('ftln')}-subheading">${v.subheading}</p>
      <div class="${uid('ftln')}-features">
        <div class="${uid('ftln')}-item"><div class="${uid('ftln')}-dot"></div><div class="${uid('ftln')}-item-content"><div class="${uid('ftln')}-item-title">${v.feature1Title}</div><div class="${uid('ftln')}-item-text">${v.feature1Text}</div></div></div>
        <div class="${uid('ftln')}-item"><div class="${uid('ftln')}-dot"></div><div class="${uid('ftln')}-item-content"><div class="${uid('ftln')}-item-title">${v.feature2Title}</div><div class="${uid('ftln')}-item-text">${v.feature2Text}</div></div></div>
        <div class="${uid('ftln')}-item"><div class="${uid('ftln')}-dot"></div><div class="${uid('ftln')}-item-content"><div class="${uid('ftln')}-item-title">${v.feature3Title}</div><div class="${uid('ftln')}-item-text">${v.feature3Text}</div></div></div>
        <div class="${uid('ftln')}-item"><div class="${uid('ftln')}-dot"></div><div class="${uid('ftln')}-item-content"><div class="${uid('ftln')}-item-title">${v.feature4Title}</div><div class="${uid('ftln')}-item-text">${v.feature4Text}</div></div></div>
      </div>
      <a href="#" class="${uid('ftln')}-btn">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'testimonials-brand-love',
    name: 'Testimonials - Brand Love Cards',
    category: 'Testimonials',
    description: 'Premium testimonial cards with urgency badge and Trustpilot ratings',
    thumbnail: '',
    fields: [
      { id: 'badgeText', label: 'Urgency Badge', type: 'text', defaultValue: 'Half if the stock is already sold!' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Why people love' },
      { id: 'headingAccent', label: 'Heading Accent', type: 'text', defaultValue: 'our brand.' },
      { id: 'subheading', label: 'Subheading', type: 'text', defaultValue: "Here's what they have to say" },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'View All Reviews' },
      { id: 'review1Name', label: 'Review 1 Name', type: 'text', defaultValue: 'Jessica Park' },
      { id: 'review1Role', label: 'Review 1 Role', type: 'text', defaultValue: 'Creative Lead' },
      { id: 'review1Text', label: 'Review 1 Text', type: 'textarea', defaultValue: 'I was terrified of moving our data over from our old legacy system. The onboarding team handled everything, and we were up and <u>running with zero downtime</u>. Incredible service. Our initial fear of data migration from the old legacy system was swiftly alleviated by the onboarding team\'s proficient handling. Not a moment of downtime was experienced, exemplifying impeccable service.' },
      { id: 'review2Name', label: 'Review 2 Name', type: 'text', defaultValue: 'Sarah Jenkins' },
      { id: 'review2Role', label: 'Review 2 Role', type: 'text', defaultValue: 'Operations Manager at...' },
      { id: 'review2Text', label: 'Review 2 Text', type: 'textarea', defaultValue: 'I was skeptical at first, but after the 14-day trial, I couldn\'t imagine going back to spreadsheets. <u>The UI is incredibly intuitive</u>, and the integration with Slack makes communication seamless. The advanced features have truly revolutionized my workflow, saving me valuable time and reducing errors.' },
      { id: 'review3Name', label: 'Review 3 Name', type: 'text', defaultValue: 'Marcus Thorne' },
      { id: 'review3Role', label: 'Review 3 Role', type: 'text', defaultValue: 'Founder & CEO, Thorne...' },
      { id: 'review3Text', label: 'Review 3 Text', type: 'textarea', defaultValue: 'We\'ve tried about five different platforms before landing on this one. It strikes the <strong>perfect balance</strong> between having advanced features and <u>keeping it simple</u> enough for new hires to learn in a day.' },
      { id: 'review4Name', label: 'Review 4 Name', type: 'text', defaultValue: 'David Chen' },
      { id: 'review4Role', label: 'Review 4 Role', type: 'text', defaultValue: 'Freelance Web Develo...' },
      { id: 'review4Text', label: 'Review 4 Text', type: 'textarea', defaultValue: 'Rarely do I leave reviews, but I had to give a shoutout to the support team. Had a syncing issue on a Saturday and Mark resolved it within 20 minutes. <strong>Great product</strong>, even better support. The exceptional support team at the store is always ready to assist customers with any technical issues they may encounter.' },
    ],
    generateHtml: (v) => `<div class="${uid('brlov')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('brlov')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('brlov')}-wrap { max-width: 1400px; margin: 0 auto; padding: 60px 24px; }
    .${uid('brlov')}-header { text-align: center; margin-bottom: 48px; }
    .${uid('brlov')}-badge { display: inline-block; background: #ff6b4a; color: #fff; padding: 10px 24px; border-radius: 50px; font-size: 14px; font-weight: 600; margin-bottom: 24px; }
    .${uid('brlov')}-heading { font-size: 48px; font-weight: 400; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('brlov')}-heading span { color: #ff6b4a; font-style: italic; }
    .${uid('brlov')}-subheading { font-size: 18px; color: #888; margin-bottom: 28px; font-style: italic; }
    .${uid('brlov')}-btn { display: inline-flex; padding: 16px 36px; background: #ff6b4a; color: #fff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 50px; transition: all 0.3s; }
    .${uid('brlov')}-btn:hover { background: #e55a3a; transform: translateY(-2px); }
    .${uid('brlov')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 48px; }
    .${uid('brlov')}-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
    .${uid('brlov')}-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .${uid('brlov')}-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%); flex-shrink: 0; }
    .${uid('brlov')}-author-info { overflow: hidden; }
    .${uid('brlov')}-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
    .${uid('brlov')}-role { font-size: 12px; color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .${uid('brlov')}-stars { display: flex; gap: 2px; margin-bottom: 14px; }
    .${uid('brlov')}-star { width: 22px; height: 22px; background: #00b67a; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; }
    .${uid('brlov')}-text { font-size: 14px; color: #374151; line-height: 1.7; }
    .${uid('brlov')}-text strong { font-weight: 700; }
    .${uid('brlov')}-text u { color: #00b67a; text-decoration: underline; }
    @media (max-width: 1100px) { .${uid('brlov')}-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .${uid('brlov')}-grid { grid-template-columns: 1fr; } .${uid('brlov')}-heading { font-size: 32px; } }
  </style>
  <div class="${uid('brlov')}-wrap">
    <div class="${uid('brlov')}-header">
      <div class="${uid('brlov')}-badge">${v.badgeText}</div>
      <h2 class="${uid('brlov')}-heading">${v.heading} <span>${v.headingAccent}</span></h2>
      <p class="${uid('brlov')}-subheading">${v.subheading}</p>
      <a href="#" class="${uid('brlov')}-btn">${v.buttonText}</a>
    </div>
    <div class="${uid('brlov')}-grid">
      <div class="${uid('brlov')}-card">
        <div class="${uid('brlov')}-card-header"><div class="${uid('brlov')}-avatar"></div><div class="${uid('brlov')}-author-info"><div class="${uid('brlov')}-name">${v.review1Name}</div><div class="${uid('brlov')}-role">${v.review1Role}</div></div></div>
        <div class="${uid('brlov')}-stars"><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span></div>
        <p class="${uid('brlov')}-text">${v.review1Text}</p>
      </div>
      <div class="${uid('brlov')}-card">
        <div class="${uid('brlov')}-card-header"><div class="${uid('brlov')}-avatar"></div><div class="${uid('brlov')}-author-info"><div class="${uid('brlov')}-name">${v.review2Name}</div><div class="${uid('brlov')}-role">${v.review2Role}</div></div></div>
        <div class="${uid('brlov')}-stars"><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star" style="opacity:0.5">★</span></div>
        <p class="${uid('brlov')}-text">${v.review2Text}</p>
      </div>
      <div class="${uid('brlov')}-card">
        <div class="${uid('brlov')}-card-header"><div class="${uid('brlov')}-avatar"></div><div class="${uid('brlov')}-author-info"><div class="${uid('brlov')}-name">${v.review3Name}</div><div class="${uid('brlov')}-role">${v.review3Role}</div></div></div>
        <div class="${uid('brlov')}-stars"><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span></div>
        <p class="${uid('brlov')}-text">${v.review3Text}</p>
      </div>
      <div class="${uid('brlov')}-card">
        <div class="${uid('brlov')}-card-header"><div class="${uid('brlov')}-avatar"></div><div class="${uid('brlov')}-author-info"><div class="${uid('brlov')}-name">${v.review4Name}</div><div class="${uid('brlov')}-role">${v.review4Role}</div></div></div>
        <div class="${uid('brlov')}-stars"><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span><span class="${uid('brlov')}-star">★</span></div>
        <p class="${uid('brlov')}-text">${v.review4Text}</p>
      </div>
    </div>
  </div>
</div>`
  },

  // ========== NEW SECTIONS BATCH 2 - 2026-01-16 ==========

  // 1. Collection Cards 3-Up (RUGS/TOWELS/THROWS)
  {
    id: 'collection-cards-3up',
    name: 'Collection - Cards 3-Up',
    category: 'Collection',
    description: 'Three collection cards with overlay text and shop buttons',
    thumbnail: '',
    fields: [
      { id: 'card1Image', label: 'Card 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'RUGS' },
      { id: 'card1ButtonText', label: 'Card 1 Button', type: 'text', defaultValue: 'SHOP' },
      { id: 'card1Link', label: 'Card 1 Link', type: 'url', defaultValue: '#' },
      { id: 'card2Image', label: 'Card 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'TOWELS' },
      { id: 'card2ButtonText', label: 'Card 2 Button', type: 'text', defaultValue: 'SHOP' },
      { id: 'card2Link', label: 'Card 2 Link', type: 'url', defaultValue: '#' },
      { id: 'card3Image', label: 'Card 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(16).png' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'THROWS' },
      { id: 'card3ButtonText', label: 'Card 3 Button', type: 'text', defaultValue: 'SHOP' },
      { id: 'card3Link', label: 'Card 3 Link', type: 'url', defaultValue: '#' },
      { id: 'titleColor', label: 'Title Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'buttonText', label: 'Button Text Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('col3up')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('col3up')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('col3up')}-wrap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    .${uid('col3up')}-card { position: relative; aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; }
    .${uid('col3up')}-card img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('col3up')}-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; }
    .${uid('col3up')}-title { font-size: 28px; font-weight: 300; color: ${v.titleColor}; letter-spacing: 0.15em; margin-bottom: 16px; }
    .${uid('col3up')}-btn { display: inline-block; padding: 10px 24px; background: ${v.buttonBg}; color: ${v.buttonText}; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-decoration: none; border-radius: 0; transition: all 0.3s; width: fit-content; }
    .${uid('col3up')}-btn:hover { opacity: 0.9; transform: translateY(-2px); }
    @media (max-width: 768px) { .${uid('col3up')}-wrap { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('col3up')}-wrap">
    <div class="${uid('col3up')}-card">
      <img src="${v.card1Image}" alt="${v.card1Title}">
      <div class="${uid('col3up')}-overlay">
        <div class="${uid('col3up')}-title">${v.card1Title}</div>
        <a href="${v.card1Link}" class="${uid('col3up')}-btn">${v.card1ButtonText}</a>
      </div>
    </div>
    <div class="${uid('col3up')}-card">
      <img src="${v.card2Image}" alt="${v.card2Title}">
      <div class="${uid('col3up')}-overlay">
        <div class="${uid('col3up')}-title">${v.card2Title}</div>
        <a href="${v.card2Link}" class="${uid('col3up')}-btn">${v.card2ButtonText}</a>
      </div>
    </div>
    <div class="${uid('col3up')}-card">
      <img src="${v.card3Image}" alt="${v.card3Title}">
      <div class="${uid('col3up')}-overlay">
        <div class="${uid('col3up')}-title">${v.card3Title}</div>
        <a href="${v.card3Link}" class="${uid('col3up')}-btn">${v.card3ButtonText}</a>
      </div>
    </div>
  </div>
</div>`
  },

  // 2. Adventure Image Carousel
  {
    id: 'adventure-image-carousel',
    name: 'Gallery - Adventure Carousel',
    category: 'Gallery',
    description: 'Overlapping image carousel with category labels and navigation',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Ready for adventure' },
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'label1', label: 'Label 1', type: 'text', defaultValue: 'For him and her' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png' },
      { id: 'label2', label: 'Label 2', type: 'text', defaultValue: 'For city life' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(17).png' },
      { id: 'label3', label: 'Label 3', type: 'text', defaultValue: 'For weekend escapes' },
      { id: 'image4', label: 'Image 4', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(18).png' },
      { id: 'label4', label: 'Label 4', type: 'text', defaultValue: 'For the outdoors' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('advcar')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('advcar')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('advcar')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('advcar')}-heading { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 32px; }
    .${uid('advcar')}-carousel { display: flex; align-items: center; position: relative; }
    .${uid('advcar')}-images { display: flex; gap: -40px; flex: 1; justify-content: center; }
    .${uid('advcar')}-item { position: relative; width: 200px; flex-shrink: 0; transition: transform 0.3s; }
    .${uid('advcar')}-item:nth-child(2) { transform: translateX(-20px); z-index: 2; }
    .${uid('advcar')}-item:nth-child(3) { transform: translateX(-40px); z-index: 3; }
    .${uid('advcar')}-item:nth-child(4) { transform: translateX(-60px); z-index: 2; }
    .${uid('advcar')}-item img { width: 100%; height: 280px; object-fit: cover; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
    .${uid('advcar')}-label { text-align: center; margin-top: 16px; font-size: 14px; color: #666; }
    .${uid('advcar')}-label strong { color: #1a1a1a; }
    .${uid('advcar')}-nav { width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; color: #666; position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; }
    .${uid('advcar')}-nav:hover { background: #f5f5f5; }
    .${uid('advcar')}-nav.prev { left: 0; }
    .${uid('advcar')}-nav.next { right: 0; }
    @media (max-width: 900px) { .${uid('advcar')}-item { width: 150px; } .${uid('advcar')}-item img { height: 200px; } }
  </style>
  <div class="${uid('advcar')}-wrap">
    <h2 class="${uid('advcar')}-heading">${v.heading}</h2>
    <div class="${uid('advcar')}-carousel">
      <div class="${uid('advcar')}-nav prev">‹</div>
      <div class="${uid('advcar')}-images">
        <div class="${uid('advcar')}-item"><img src="${v.image1}" alt=""><div class="${uid('advcar')}-label">For <strong>${v.label1.replace('For ', '')}</strong></div></div>
        <div class="${uid('advcar')}-item"><img src="${v.image2}" alt=""><div class="${uid('advcar')}-label">For <strong>${v.label2.replace('For ', '')}</strong></div></div>
        <div class="${uid('advcar')}-item"><img src="${v.image3}" alt=""><div class="${uid('advcar')}-label">For <strong>${v.label3.replace('For ', '')}</strong></div></div>
        <div class="${uid('advcar')}-item"><img src="${v.image4}" alt=""><div class="${uid('advcar')}-label">For <strong>${v.label4.replace('For ', '')}</strong></div></div>
      </div>
      <div class="${uid('advcar')}-nav next">›</div>
    </div>
  </div>
</div>`
  },

  // 3. Tennis Hero Asymmetric Layout
  {
    id: 'hero-asymmetric-gallery',
    name: 'Hero - Asymmetric Gallery',
    category: 'Hero',
    description: 'Hero with label, heading, description, and asymmetric image gallery with avatars',
    thumbnail: '',
    fields: [
      { id: 'label', label: 'Top Label', type: 'text', defaultValue: 'OWN THE COURT IN STYLE' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Find Your Perfect Match' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Explore our wide range of performance-driven tennis racquets, apparel crafted for comfort and movement, and innovative accessories that elevate your game.' },
      { id: 'mainImage', label: 'Main Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'smallImage1', label: 'Small Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'smallImage2', label: 'Small Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'avatar1', label: 'Avatar 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'avatar2', label: 'Avatar 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'avatar3', label: 'Avatar 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'bgColor', label: 'Background', type: 'color', defaultValue: '#f5f5f5' },
    ],
    generateHtml: (v) => `<div class="${uid('heroasym')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('heroasym')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('heroasym')}-wrap { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; }
    .${uid('heroasym')}-content { }
    .${uid('heroasym')}-label { font-size: 12px; font-weight: 600; letter-spacing: 0.15em; color: #666; margin-bottom: 16px; }
    .${uid('heroasym')}-heading { font-size: 48px; font-weight: 700; color: #1a1a1a; line-height: 1.1; margin-bottom: 20px; }
    .${uid('heroasym')}-desc { font-size: 15px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('heroasym')}-images { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; position: relative; }
    .${uid('heroasym')}-small { display: flex; flex-direction: column; gap: 16px; }
    .${uid('heroasym')}-small img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 16px; }
    .${uid('heroasym')}-main { grid-row: span 2; }
    .${uid('heroasym')}-main img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; }
    .${uid('heroasym')}-avatars { position: absolute; right: -30px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; }
    .${uid('heroasym')}-avatar { width: 50px; height: 50px; border-radius: 50%; border: 3px solid #fff; object-fit: cover; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    @media (max-width: 900px) { .${uid('heroasym')}-wrap { grid-template-columns: 1fr; } .${uid('heroasym')}-heading { font-size: 36px; } }
  </style>
  <div class="${uid('heroasym')}-wrap">
    <div class="${uid('heroasym')}-content">
      <div class="${uid('heroasym')}-label">${v.label}</div>
      <h1 class="${uid('heroasym')}-heading">${v.heading}</h1>
      <p class="${uid('heroasym')}-desc">${v.description}</p>
    </div>
    <div class="${uid('heroasym')}-images">
      <div class="${uid('heroasym')}-small">
        <img src="${v.smallImage1}" alt="">
        <img src="${v.smallImage2}" alt="">
      </div>
      <div class="${uid('heroasym')}-main">
        <img src="${v.mainImage}" alt="">
      </div>
      <div class="${uid('heroasym')}-avatars">
        <img src="${v.avatar1}" alt="" class="${uid('heroasym')}-avatar">
        <img src="${v.avatar2}" alt="" class="${uid('heroasym')}-avatar">
        <img src="${v.avatar3}" alt="" class="${uid('heroasym')}-avatar">
      </div>
    </div>
  </div>
</div>`
  },

  // 4. Social Media Video Cards ("As Seen on Social")
  {
    id: 'social-media-cards',
    name: 'Social - Media Cards',
    category: 'Social',
    description: 'Social media style cards with video controls, names, and star ratings',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'As Seen on Social' },
      { id: 'card1Image', label: 'Card 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'card1Name', label: 'Card 1 Name', type: 'text', defaultValue: 'Faith Anderson' },
      { id: 'card1Product', label: 'Card 1 Product', type: 'text', defaultValue: 'Gold Hoops' },
      { id: 'card1Stars', label: 'Card 1 Stars (1-5)', type: 'number', defaultValue: '5' },
      { id: 'card2Image', label: 'Card 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'card2Name', label: 'Card 2 Name', type: 'text', defaultValue: 'Jessica Moore' },
      { id: 'card2Product', label: 'Card 2 Product', type: 'text', defaultValue: 'Woven Shoulder Bag' },
      { id: 'card2Stars', label: 'Card 2 Stars (1-5)', type: 'number', defaultValue: '5' },
      { id: 'card3Image', label: 'Card 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(19).png' },
      { id: 'card3Name', label: 'Card 3 Name', type: 'text', defaultValue: 'Lisa Martin' },
      { id: 'card3Product', label: 'Card 3 Product', type: 'text', defaultValue: 'Recycled St. Sidekick' },
      { id: 'card3Stars', label: 'Card 3 Stars (1-5)', type: 'number', defaultValue: '5' },
      { id: 'card4Image', label: 'Card 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'card4Name', label: 'Card 4 Name', type: 'text', defaultValue: 'William Jones' },
      { id: 'card4Product', label: 'Card 4 Product', type: 'text', defaultValue: 'The Packable Tote' },
      { id: 'card4Stars', label: 'Card 4 Stars (1-5)', type: 'number', defaultValue: '4' },
      { id: 'starColor', label: 'Star Color', type: 'color', defaultValue: '#f59e0b' },
    ],
    generateHtml: (v) => {
      const genStars = (n: number) => '★'.repeat(Math.min(5, Math.max(1, n))) + '☆'.repeat(5 - Math.min(5, Math.max(1, n)));
      return `<div class="${uid('socmed')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('socmed')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('socmed')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('socmed')}-heading { font-size: 18px; font-weight: 500; color: #1a1a1a; margin-bottom: 24px; }
    .${uid('socmed')}-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
    .${uid('socmed')}-card { position: relative; aspect-ratio: 3/4; border-radius: 12px; overflow: hidden; }
    .${uid('socmed')}-card img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('socmed')}-controls { position: absolute; top: 12px; right: 12px; display: flex; gap: 8px; }
    .${uid('socmed')}-ctrl { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; font-size: 12px; color: #1a1a1a; }
    .${uid('socmed')}-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); }
    .${uid('socmed')}-stars { color: ${v.starColor}; font-size: 12px; letter-spacing: 1px; margin-bottom: 4px; }
    .${uid('socmed')}-name { font-size: 13px; font-weight: 600; color: #fff; display: flex; align-items: center; gap: 6px; }
    .${uid('socmed')}-badge { width: 14px; height: 14px; background: #1da1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 8px; }
    .${uid('socmed')}-product { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 2px; }
    .${uid('socmed')}-nav { display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
    .${uid('socmed')}-dot { width: 8px; height: 8px; border-radius: 50%; background: #e0e0e0; cursor: pointer; }
    .${uid('socmed')}-dot.active { background: #1a1a1a; }
    @media (max-width: 900px) { .${uid('socmed')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('socmed')}-wrap">
    <h3 class="${uid('socmed')}-heading">${v.heading}</h3>
    <div class="${uid('socmed')}-grid">
      <div class="${uid('socmed')}-card">
        <img src="${v.card1Image}" alt="">
        <div class="${uid('socmed')}-controls"><span class="${uid('socmed')}-ctrl">◀</span><span class="${uid('socmed')}-ctrl">▶</span></div>
        <div class="${uid('socmed')}-info">
          <div class="${uid('socmed')}-stars">${genStars(Number(v.card1Stars))}</div>
          <div class="${uid('socmed')}-name">${v.card1Name} <span class="${uid('socmed')}-badge">✓</span></div>
          <div class="${uid('socmed')}-product">${v.card1Product}</div>
        </div>
      </div>
      <div class="${uid('socmed')}-card">
        <img src="${v.card2Image}" alt="">
        <div class="${uid('socmed')}-controls"><span class="${uid('socmed')}-ctrl">◀</span><span class="${uid('socmed')}-ctrl">▶</span></div>
        <div class="${uid('socmed')}-info">
          <div class="${uid('socmed')}-stars">${genStars(Number(v.card2Stars))}</div>
          <div class="${uid('socmed')}-name">${v.card2Name} <span class="${uid('socmed')}-badge">✓</span></div>
          <div class="${uid('socmed')}-product">${v.card2Product}</div>
        </div>
      </div>
      <div class="${uid('socmed')}-card">
        <img src="${v.card3Image}" alt="">
        <div class="${uid('socmed')}-controls"><span class="${uid('socmed')}-ctrl">II</span><span class="${uid('socmed')}-ctrl">▶</span></div>
        <div class="${uid('socmed')}-info">
          <div class="${uid('socmed')}-stars">${genStars(Number(v.card3Stars))}</div>
          <div class="${uid('socmed')}-name">${v.card3Name} <span class="${uid('socmed')}-badge">✓</span></div>
          <div class="${uid('socmed')}-product">${v.card3Product}</div>
        </div>
      </div>
      <div class="${uid('socmed')}-card">
        <img src="${v.card4Image}" alt="">
        <div class="${uid('socmed')}-controls"><span class="${uid('socmed')}-ctrl">◀</span><span class="${uid('socmed')}-ctrl">▶</span></div>
        <div class="${uid('socmed')}-info">
          <div class="${uid('socmed')}-stars">${genStars(Number(v.card4Stars))}</div>
          <div class="${uid('socmed')}-name">${v.card4Name} <span class="${uid('socmed')}-badge">✓</span></div>
          <div class="${uid('socmed')}-product">${v.card4Product}</div>
        </div>
      </div>
    </div>
    <div class="${uid('socmed')}-nav"><span class="${uid('socmed')}-dot"></span><span class="${uid('socmed')}-dot active"></span></div>
  </div>
</div>`;
    }
  },

  // 5. Shop by Category with Toggle
  {
    id: 'shop-category-toggle',
    name: 'Category - Toggle Cards',
    category: 'Product',
    description: 'Category cards with Men/Women toggle button',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Shop by category' },
      { id: 'toggle1', label: 'Toggle Option 1', type: 'text', defaultValue: 'Men' },
      { id: 'toggle2', label: 'Toggle Option 2', type: 'text', defaultValue: 'Women' },
      { id: 'cat1Image', label: 'Category 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'cat1Name', label: 'Category 1 Name', type: 'text', defaultValue: "Men's shoes" },
      { id: 'cat2Image', label: 'Category 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png' },
      { id: 'cat2Name', label: 'Category 2 Name', type: 'text', defaultValue: 'Equipment' },
      { id: 'cat3Image', label: 'Category 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(20).png' },
      { id: 'cat3Name', label: 'Category 3 Name', type: 'text', defaultValue: 'Apparel' },
      { id: 'toggleBg', label: 'Toggle Background', type: 'color', defaultValue: '#f0f0f0' },
      { id: 'toggleActive', label: 'Toggle Active Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('shpcat')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('shpcat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('shpcat')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('shpcat')}-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .${uid('shpcat')}-heading { font-size: 32px; font-weight: 400; color: #1a1a1a; }
    .${uid('shpcat')}-toggle { display: flex; background: ${v.toggleBg}; border-radius: 50px; padding: 4px; }
    .${uid('shpcat')}-toggle-btn { padding: 10px 24px; border-radius: 50px; font-size: 14px; font-weight: 500; color: #666; cursor: pointer; transition: all 0.3s; background: transparent; border: none; }
    .${uid('shpcat')}-toggle-btn.active { background: ${v.toggleActive}; color: #fff; }
    .${uid('shpcat')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .${uid('shpcat')}-card { position: relative; aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; }
    .${uid('shpcat')}-card img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('shpcat')}-card-info { position: absolute; bottom: 20px; left: 20px; right: 20px; display: flex; justify-content: space-between; align-items: center; }
    .${uid('shpcat')}-card-name { font-size: 16px; font-weight: 500; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.3); }
    .${uid('shpcat')}-card-arrow { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; }
    @media (max-width: 768px) { .${uid('shpcat')}-grid { grid-template-columns: 1fr; } .${uid('shpcat')}-header { flex-direction: column; gap: 16px; } }
  </style>
  <div class="${uid('shpcat')}-wrap">
    <div class="${uid('shpcat')}-header">
      <h2 class="${uid('shpcat')}-heading">${v.heading}</h2>
      <div class="${uid('shpcat')}-toggle">
        <button class="${uid('shpcat')}-toggle-btn">${v.toggle1}</button>
        <button class="${uid('shpcat')}-toggle-btn active">${v.toggle2}</button>
      </div>
    </div>
    <div class="${uid('shpcat')}-grid">
      <div class="${uid('shpcat')}-card">
        <img src="${v.cat1Image}" alt="${v.cat1Name}">
        <div class="${uid('shpcat')}-card-info">
          <span class="${uid('shpcat')}-card-name">${v.cat1Name}</span>
          <span class="${uid('shpcat')}-card-arrow">→</span>
        </div>
      </div>
      <div class="${uid('shpcat')}-card">
        <img src="${v.cat2Image}" alt="${v.cat2Name}">
        <div class="${uid('shpcat')}-card-info">
          <span class="${uid('shpcat')}-card-name">${v.cat2Name}</span>
          <span class="${uid('shpcat')}-card-arrow">→</span>
        </div>
      </div>
      <div class="${uid('shpcat')}-card">
        <img src="${v.cat3Image}" alt="${v.cat3Name}">
        <div class="${uid('shpcat')}-card-info">
          <span class="${uid('shpcat')}-card-name">${v.cat3Name}</span>
          <span class="${uid('shpcat')}-card-arrow">→</span>
        </div>
      </div>
    </div>
  </div>
</div>`
  },

  // 6. Product Video Features Split (Hear Clearly Stay Protected)
  {
    id: 'product-video-features',
    name: 'Product - Video Features Split',
    category: 'Product',
    description: 'Split layout with video/image and gradient text heading with feature icons',
    thumbnail: '',
    fields: [
      { id: 'mediaImage', label: 'Media Image/Video Thumbnail', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'headingPart1', label: 'Heading Part 1', type: 'text', defaultValue: 'Hear Clearly.' },
      { id: 'headingPart2', label: 'Heading Part 2 (Gradient)', type: 'text', defaultValue: 'Stay Protected.' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Our patented acoustic filters reduce harmful noise while preserving clear, natural sound.' },
      { id: 'feature1Icon', label: 'Feature 1 Icon', type: 'text', defaultValue: '📊' },
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Enhanced sound clarity' },
      { id: 'feature1Desc', label: 'Feature 1 Description', type: 'text', defaultValue: 'Advanced noise-filtering for superior hearing quality.' },
      { id: 'feature2Icon', label: 'Feature 2 Icon', type: 'text', defaultValue: '🎯' },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Voice-enhancing technology' },
      { id: 'feature2Desc', label: 'Feature 2 Description', type: 'text', defaultValue: 'Maintains clarity in voices amidst loud environments.' },
      { id: 'feature3Icon', label: 'Feature 3 Icon', type: 'text', defaultValue: '🛡️' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Certified hearing protection' },
      { id: 'feature3Desc', label: 'Feature 3 Description', type: 'text', defaultValue: 'For ultimate protection against loud sounds.' },
      { id: 'gradientStart', label: 'Gradient Start Color', type: 'color', defaultValue: '#06b6d4' },
      { id: 'gradientEnd', label: 'Gradient End Color', type: 'color', defaultValue: '#ec4899' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('vidft')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('vidft')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('vidft')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; }
    .${uid('vidft')}-media { position: relative; background: #f0e6fa; border-radius: 20px; overflow: hidden; aspect-ratio: 4/5; }
    .${uid('vidft')}-media img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('vidft')}-controls { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; }
    .${uid('vidft')}-ctrl { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; font-size: 14px; color: #1a1a1a; cursor: pointer; }
    .${uid('vidft')}-content { }
    .${uid('vidft')}-heading { font-size: 42px; font-weight: 700; color: #1a1a1a; line-height: 1.2; margin-bottom: 20px; }
    .${uid('vidft')}-heading span { background: linear-gradient(90deg, ${v.gradientStart}, ${v.gradientEnd}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .${uid('vidft')}-desc { font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 40px; }
    .${uid('vidft')}-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('vidft')}-feature { }
    .${uid('vidft')}-feature-icon { font-size: 24px; margin-bottom: 12px; color: ${v.gradientStart}; }
    .${uid('vidft')}-feature-title { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; }
    .${uid('vidft')}-feature-desc { font-size: 12px; color: #888; line-height: 1.5; }
    @media (max-width: 900px) { .${uid('vidft')}-wrap { grid-template-columns: 1fr; } .${uid('vidft')}-heading { font-size: 32px; } .${uid('vidft')}-features { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('vidft')}-wrap">
    <div class="${uid('vidft')}-media">
      <img src="${v.mediaImage}" alt="">
      <div class="${uid('vidft')}-controls">
        <span class="${uid('vidft')}-ctrl">II</span>
        <span class="${uid('vidft')}-ctrl">🔊</span>
      </div>
    </div>
    <div class="${uid('vidft')}-content">
      <h2 class="${uid('vidft')}-heading">${v.headingPart1} <span>${v.headingPart2}</span></h2>
      <p class="${uid('vidft')}-desc">${v.description}</p>
      <div class="${uid('vidft')}-features">
        <div class="${uid('vidft')}-feature">
          <div class="${uid('vidft')}-feature-icon">${v.feature1Icon}</div>
          <div class="${uid('vidft')}-feature-title">${v.feature1Title}</div>
          <div class="${uid('vidft')}-feature-desc">${v.feature1Desc}</div>
        </div>
        <div class="${uid('vidft')}-feature">
          <div class="${uid('vidft')}-feature-icon">${v.feature2Icon}</div>
          <div class="${uid('vidft')}-feature-title">${v.feature2Title}</div>
          <div class="${uid('vidft')}-feature-desc">${v.feature2Desc}</div>
        </div>
        <div class="${uid('vidft')}-feature">
          <div class="${uid('vidft')}-feature-icon">${v.feature3Icon}</div>
          <div class="${uid('vidft')}-feature-title">${v.feature3Title}</div>
          <div class="${uid('vidft')}-feature-desc">${v.feature3Desc}</div>
        </div>
      </div>
    </div>
  </div>
</div>`
  },

  // 8. Skincare Tips Timeline
  {
    id: 'tips-timeline-blue',
    name: 'Content - Tips Timeline',
    category: 'Content',
    description: 'Tips with vertical timeline on colored background',
    thumbnail: '',
    fields: [
      { id: 'image', label: 'Side Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'tip1Label', label: 'Tip 1 Label', type: 'text', defaultValue: 'Tip #1' },
      { id: 'tip1Title', label: 'Tip 1 Title', type: 'text', defaultValue: 'Exfoliation' },
      { id: 'tip1Text', label: 'Tip 1 Text', type: 'textarea', defaultValue: 'Excess exfoliation is possible. When using Mask, avoid other exfoliants (such as retinol) on the same day.' },
      { id: 'tip2Label', label: 'Tip 2 Label', type: 'text', defaultValue: 'Tip #2' },
      { id: 'tip2Title', label: 'Tip 2 Title', type: 'text', defaultValue: 'Sensitive skin' },
      { id: 'tip2Text', label: 'Tip 2 Text', type: 'textarea', defaultValue: "Expect a tingle as Mask aligns with your skin's pH. For sensitive skin, test on a small area first." },
      { id: 'tip3Label', label: 'Tip 3 Label', type: 'text', defaultValue: 'Tip #3' },
      { id: 'tip3Title', label: 'Tip 3 Title', type: 'text', defaultValue: 'Daily use' },
      { id: 'tip3Text', label: 'Tip 3 Text', type: 'textarea', defaultValue: 'Use as a daily spot treatment for obstinate, aging acne marks.' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#2563eb' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#d9f99d' },
    ],
    generateHtml: (v) => `<div class="${uid('tptl')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('tptl')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tptl')}-wrap { display: grid; grid-template-columns: 1fr 1fr; max-width: 1200px; margin: 0 auto; min-height: 500px; }
    .${uid('tptl')}-content { padding: 60px; display: flex; align-items: center; }
    .${uid('tptl')}-timeline { position: relative; padding-left: 100px; }
    .${uid('tptl')}-timeline::before { content: ''; position: absolute; left: 60px; top: 20px; bottom: 20px; width: 2px; border-left: 2px dashed rgba(255,255,255,0.3); }
    .${uid('tptl')}-item { position: relative; margin-bottom: 36px; }
    .${uid('tptl')}-label { position: absolute; left: -100px; top: 0; padding: 6px 12px; background: ${v.accentColor}; color: #1a1a1a; font-size: 11px; font-weight: 600; border-radius: 4px; }
    .${uid('tptl')}-title { font-size: 20px; font-weight: 600; font-style: italic; color: ${v.accentColor}; margin-bottom: 8px; }
    .${uid('tptl')}-text { font-size: 14px; color: rgba(255,255,255,0.85); line-height: 1.6; }
    .${uid('tptl')}-image { }
    .${uid('tptl')}-image img { width: 100%; height: 100%; object-fit: cover; border-radius: 0 24px 24px 0; }
    @media (max-width: 900px) { .${uid('tptl')}-wrap { grid-template-columns: 1fr; } .${uid('tptl')}-image { display: none; } }
  </style>
  <div class="${uid('tptl')}-wrap">
    <div class="${uid('tptl')}-content">
      <div class="${uid('tptl')}-timeline">
        <div class="${uid('tptl')}-item"><div class="${uid('tptl')}-label">${v.tip1Label}</div><div class="${uid('tptl')}-title">${v.tip1Title}</div><p class="${uid('tptl')}-text">${v.tip1Text}</p></div>
        <div class="${uid('tptl')}-item"><div class="${uid('tptl')}-label">${v.tip2Label}</div><div class="${uid('tptl')}-title">${v.tip2Title}</div><p class="${uid('tptl')}-text">${v.tip2Text}</p></div>
        <div class="${uid('tptl')}-item"><div class="${uid('tptl')}-label">${v.tip3Label}</div><div class="${uid('tptl')}-title">${v.tip3Title}</div><p class="${uid('tptl')}-text">${v.tip3Text}</p></div>
      </div>
    </div>
    <div class="${uid('tptl')}-image"><img src="${v.image}" alt=""></div>
  </div>
</div>`
  },

  // 9. Bestsellers Product Grid
  {
    id: 'bestsellers-product-grid',
    name: 'Product - Bestsellers Grid',
    category: 'Product',
    description: 'Product grid with NEW badges, prices, and navigation',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Bestsellers' },
      { id: 'prod1Image', label: 'Product 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'prod1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Organic Cropped Utility Pullover' },
      { id: 'prod1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$148.00' },
      { id: 'prod1Badge', label: 'Product 1 Badge', type: 'text', defaultValue: 'NEW' },
      { id: 'prod2Image', label: 'Product 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'prod2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Bison Zip-Up Jacket' },
      { id: 'prod2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$128.00' },
      { id: 'prod2Badge', label: 'Product 2 Badge', type: 'text', defaultValue: 'NEW' },
      { id: 'prod3Image', label: 'Product 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(15).png' },
      { id: 'prod3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Organic Double Cloth Button Down' },
      { id: 'prod3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$98.00' },
      { id: 'prod3Badge', label: 'Product 3 Badge', type: 'text', defaultValue: '' },
      { id: 'prod4Image', label: 'Product 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'prod4Name', label: 'Product 4 Name', type: 'text', defaultValue: 'Chambray Summer Dress' },
      { id: 'prod4Price', label: 'Product 4 Price', type: 'text', defaultValue: '$108.00' },
      { id: 'prod4Badge', label: 'Product 4 Badge', type: 'text', defaultValue: '' },
      { id: 'badgeBg', label: 'Badge Background', type: 'color', defaultValue: '#fef3c7' },
    ],
    generateHtml: (v) => `<div class="${uid('bstsl')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('bstsl')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bstsl')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('bstsl')}-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .${uid('bstsl')}-heading { font-size: 28px; font-weight: 400; font-style: italic; color: #1a1a1a; }
    .${uid('bstsl')}-nav { display: flex; gap: 8px; }
    .${uid('bstsl')}-nav-btn { width: 36px; height: 36px; border-radius: 50%; background: #1a1a1a; color: #fff; border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
    .${uid('bstsl')}-nav-btn:first-child { background: #f0f0f0; color: #1a1a1a; }
    .${uid('bstsl')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .${uid('bstsl')}-card { }
    .${uid('bstsl')}-img { position: relative; aspect-ratio: 3/4; background: #f5f5f5; margin-bottom: 16px; overflow: hidden; }
    .${uid('bstsl')}-img img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('bstsl')}-badge { position: absolute; top: 12px; left: 12px; padding: 4px 10px; background: ${v.badgeBg}; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; }
    .${uid('bstsl')}-name { font-size: 14px; color: #1a1a1a; margin-bottom: 4px; }
    .${uid('bstsl')}-price { font-size: 14px; color: #666; }
    @media (max-width: 900px) { .${uid('bstsl')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('bstsl')}-wrap">
    <div class="${uid('bstsl')}-header">
      <h2 class="${uid('bstsl')}-heading">${v.heading}</h2>
      <div class="${uid('bstsl')}-nav"><button class="${uid('bstsl')}-nav-btn">‹</button><button class="${uid('bstsl')}-nav-btn">›</button></div>
    </div>
    <div class="${uid('bstsl')}-grid">
      <div class="${uid('bstsl')}-card"><div class="${uid('bstsl')}-img"><img src="${v.prod1Image}" alt="">${v.prod1Badge ? `<span class="${uid('bstsl')}-badge">${v.prod1Badge}</span>` : ''}</div><div class="${uid('bstsl')}-name">${v.prod1Name}</div><div class="${uid('bstsl')}-price">${v.prod1Price}</div></div>
      <div class="${uid('bstsl')}-card"><div class="${uid('bstsl')}-img"><img src="${v.prod2Image}" alt="">${v.prod2Badge ? `<span class="${uid('bstsl')}-badge">${v.prod2Badge}</span>` : ''}</div><div class="${uid('bstsl')}-name">${v.prod2Name}</div><div class="${uid('bstsl')}-price">${v.prod2Price}</div></div>
      <div class="${uid('bstsl')}-card"><div class="${uid('bstsl')}-img"><img src="${v.prod3Image}" alt="">${v.prod3Badge ? `<span class="${uid('bstsl')}-badge">${v.prod3Badge}</span>` : ''}</div><div class="${uid('bstsl')}-name">${v.prod3Name}</div><div class="${uid('bstsl')}-price">${v.prod3Price}</div></div>
      <div class="${uid('bstsl')}-card"><div class="${uid('bstsl')}-img"><img src="${v.prod4Image}" alt="">${v.prod4Badge ? `<span class="${uid('bstsl')}-badge">${v.prod4Badge}</span>` : ''}</div><div class="${uid('bstsl')}-name">${v.prod4Name}</div><div class="${uid('bstsl')}-price">${v.prod4Price}</div></div>
    </div>
  </div>
</div>`
  },

  // 10. Discover Category Accordion
  {
    id: 'discover-category-accordion',
    name: 'Category - Discover Accordion',
    category: 'Product',
    description: 'Featured category with expandable side categories',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Discover by Category' },
      { id: 'mainImage', label: 'Main Category Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(16).png' },
      { id: 'mainTitle', label: 'Main Category Title', type: 'text', defaultValue: 'BACKPACKS' },
      { id: 'mainRating', label: 'Main Rating (1-5 stars)', type: 'number', defaultValue: '4' },
      { id: 'mainDesc', label: 'Main Description', type: 'text', defaultValue: 'Show off your style and stay hydrated wherever you go.' },
      { id: 'mainButton', label: 'Main Button Text', type: 'text', defaultValue: 'Shop now' },
      { id: 'cat2Image', label: 'Category 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(17).png' },
      { id: 'cat2Name', label: 'Category 2 Name', type: 'text', defaultValue: 'CAPS' },
      { id: 'cat3Image', label: 'Category 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(18).png' },
      { id: 'cat3Name', label: 'Category 3 Name', type: 'text', defaultValue: 'CARDIGANS' },
      { id: 'cat4Image', label: 'Category 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(19).png' },
      { id: 'cat4Name', label: 'Category 4 Name', type: 'text', defaultValue: 'OVER $50' },
      { id: 'cat5Image', label: 'Category 5 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(20).png' },
      { id: 'cat5Name', label: 'Category 5 Name', type: 'text', defaultValue: 'PULLOVERS' },
    ],
    generateHtml: (v) => {
      const stars = '★'.repeat(Math.min(5, Number(v.mainRating))) + '☆'.repeat(5 - Math.min(5, Number(v.mainRating)));
      return `<div class="${uid('disccat')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('disccat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('disccat')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('disccat')}-heading { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 40px; }
    .${uid('disccat')}-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 12px; height: 450px; }
    .${uid('disccat')}-main { position: relative; border-radius: 12px; overflow: hidden; }
    .${uid('disccat')}-main img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('disccat')}-main-content { position: absolute; top: 24px; left: 24px; color: #fff; }
    .${uid('disccat')}-main-title { font-size: 28px; font-weight: 700; letter-spacing: 0.1em; border-bottom: 2px solid #fff; padding-bottom: 8px; margin-bottom: 8px; }
    .${uid('disccat')}-main-stars { font-size: 14px; color: #fff; letter-spacing: 2px; margin-bottom: 12px; }
    .${uid('disccat')}-main-desc { font-size: 13px; color: rgba(255,255,255,0.9); margin-bottom: 20px; max-width: 200px; }
    .${uid('disccat')}-main-btn { display: inline-block; padding: 10px 20px; background: #fff; color: #1a1a1a; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 4px; }
    .${uid('disccat')}-side { position: relative; border-radius: 12px; overflow: hidden; }
    .${uid('disccat')}-side img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); }
    .${uid('disccat')}-side-name { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%) rotate(-90deg); transform-origin: center; white-space: nowrap; font-size: 18px; font-weight: 700; color: #fff; letter-spacing: 0.1em; }
    @media (max-width: 900px) { .${uid('disccat')}-grid { grid-template-columns: 1fr 1fr; height: auto; } .${uid('disccat')}-main { grid-column: span 2; height: 350px; } .${uid('disccat')}-side { height: 200px; } }
  </style>
  <div class="${uid('disccat')}-wrap">
    <h2 class="${uid('disccat')}-heading">${v.heading}</h2>
    <div class="${uid('disccat')}-grid">
      <div class="${uid('disccat')}-main">
        <img src="${v.mainImage}" alt="">
        <div class="${uid('disccat')}-main-content">
          <div class="${uid('disccat')}-main-title">${v.mainTitle}</div>
          <div class="${uid('disccat')}-main-stars">${stars}</div>
          <p class="${uid('disccat')}-main-desc">${v.mainDesc}</p>
          <a href="#" class="${uid('disccat')}-main-btn">${v.mainButton}</a>
        </div>
      </div>
      <div class="${uid('disccat')}-side"><img src="${v.cat2Image}" alt=""><div class="${uid('disccat')}-side-name">${v.cat2Name}</div></div>
      <div class="${uid('disccat')}-side"><img src="${v.cat3Image}" alt=""><div class="${uid('disccat')}-side-name">${v.cat3Name}</div></div>
      <div class="${uid('disccat')}-side"><img src="${v.cat4Image}" alt=""><div class="${uid('disccat')}-side-name">${v.cat4Name}</div></div>
      <div class="${uid('disccat')}-side"><img src="${v.cat5Image}" alt=""><div class="${uid('disccat')}-side-name">${v.cat5Name}</div></div>
    </div>
  </div>
</div>`;
    }
  },

  // 11. Google Reviews Carousel
  {
    id: 'google-reviews-carousel',
    name: 'Testimonials - Google Reviews',
    category: 'Testimonials',
    description: 'Google-branded reviews with avatars, ratings, and carousel',
    thumbnail: '',
    fields: [
      { id: 'reviewCount', label: 'Review Count', type: 'text', defaultValue: '250+' },
      { id: 'avgRating', label: 'Average Rating', type: 'text', defaultValue: '4.8 / 5.0' },
      { id: 'headingPrefix', label: 'Heading Prefix', type: 'text', defaultValue: 'Over' },
      { id: 'headingSuffix', label: 'Heading Suffix', type: 'text', defaultValue: 'reviews on' },
      { id: 'subheading', label: 'Subheading', type: 'text', defaultValue: 'from our clients' },
      { id: 'review1Title', label: 'Review 1 Title', type: 'text', defaultValue: 'the mug' },
      { id: 'review1Text', label: 'Review 1 Text', type: 'textarea', defaultValue: 'The real gem is the integrated smartphone app with guided classes and body tracking. I really like it.' },
      { id: 'review1Name', label: 'Review 1 Name', type: 'text', defaultValue: 'Daniel R.' },
      { id: 'review1Avatar', label: 'Review 1 Avatar', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'review1Stars', label: 'Review 1 Stars (1-5)', type: 'number', defaultValue: '5' },
      { id: 'review2Title', label: 'Review 2 Title', type: 'text', defaultValue: 'Halo Jeans' },
      { id: 'review2Text', label: 'Review 2 Text', type: 'textarea', defaultValue: 'The real gem is the integrated smartphone app with guided classes and body tracking. I really like it.' },
      { id: 'review2Name', label: 'Review 2 Name', type: 'text', defaultValue: 'Sammi B.' },
      { id: 'review2Avatar', label: 'Review 2 Avatar', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'review2Stars', label: 'Review 2 Stars (1-5)', type: 'number', defaultValue: '4' },
      { id: 'review3Title', label: 'Review 3 Title', type: 'text', defaultValue: 'Black T-shirt' },
      { id: 'review3Text', label: 'Review 3 Text', type: 'textarea', defaultValue: 'The real gem is the integrated smartphone app with guided classes and body tracking. I really like it.' },
      { id: 'review3Name', label: 'Review 3 Name', type: 'text', defaultValue: 'Lara S.' },
      { id: 'review3Avatar', label: 'Review 3 Avatar', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'review3Stars', label: 'Review 3 Stars (1-5)', type: 'number', defaultValue: '5' },
    ],
    generateHtml: (v) => {
      const genStars = (n: number) => '★'.repeat(Math.min(5, Math.max(1, n)));
      return `<div class="${uid('grev')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('grev')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('grev')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; text-align: center; }
    .${uid('grev')}-heading { font-size: 42px; font-weight: 400; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('grev')}-heading strong { font-weight: 700; }
    .${uid('grev')}-heading .google { background: linear-gradient(90deg, #4285f4, #ea4335, #fbbc04, #34a853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .${uid('grev')}-heading .italic { font-style: italic; }
    .${uid('grev')}-rating { font-size: 16px; color: #666; margin-bottom: 48px; }
    .${uid('grev')}-rating .stars { color: #f59e0b; }
    .${uid('grev')}-cards { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }
    .${uid('grev')}-card { background: #f8f8f8; border-radius: 16px; padding: 24px; width: 240px; text-align: left; }
    .${uid('grev')}-card-title { font-size: 12px; color: #999; margin-bottom: 12px; }
    .${uid('grev')}-card-text { font-size: 14px; color: #374151; line-height: 1.6; margin-bottom: 16px; }
    .${uid('grev')}-card-author { display: flex; align-items: center; gap: 12px; }
    .${uid('grev')}-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
    .${uid('grev')}-author-info { }
    .${uid('grev')}-author-name { font-size: 14px; font-weight: 600; color: #1a1a1a; display: flex; align-items: center; gap: 8px; }
    .${uid('grev')}-quote { font-size: 24px; color: #ddd; }
    .${uid('grev')}-author-stars { font-size: 12px; color: #f59e0b; }
    .${uid('grev')}-nav { display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 24px; }
    .${uid('grev')}-nav-arrow { color: #ccc; cursor: pointer; font-size: 18px; }
    .${uid('grev')}-nav-bar { width: 200px; height: 4px; background: #e0e0e0; border-radius: 2px; position: relative; }
    .${uid('grev')}-nav-progress { position: absolute; left: 0; top: 0; height: 100%; width: 40%; background: #1a1a1a; border-radius: 2px; }
    .${uid('grev')}-link { font-size: 14px; color: #666; }
    .${uid('grev')}-link span { color: #4285f4; font-weight: 500; }
    @media (max-width: 768px) { .${uid('grev')}-heading { font-size: 28px; } .${uid('grev')}-cards { gap: 16px; } .${uid('grev')}-card { width: 100%; max-width: 280px; } }
    @media (max-width: 480px) { .${uid('grev')}-wrap { padding: 48px 16px; } .${uid('grev')}-heading { font-size: 24px; } }
  </style>
  <div class="${uid('grev')}-wrap">
    <h2 class="${uid('grev')}-heading">${v.headingPrefix} <strong>${v.reviewCount}</strong> ${v.headingSuffix} <span class="google">Google</span> <span class="italic">${v.subheading}</span></h2>
    <p class="${uid('grev')}-rating">${v.avgRating} <span class="stars">★★★★★</span></p>
    <div class="${uid('grev')}-cards">
      <div class="${uid('grev')}-card">
        <div class="${uid('grev')}-card-title">${v.review1Title}</div>
        <p class="${uid('grev')}-card-text">${v.review1Text}</p>
        <div class="${uid('grev')}-card-author">
          <img src="${v.review1Avatar}" alt="" class="${uid('grev')}-avatar">
          <div class="${uid('grev')}-author-info">
            <div class="${uid('grev')}-author-name">${v.review1Name} <span class="${uid('grev')}-quote">"</span></div>
            <div class="${uid('grev')}-author-stars">${genStars(Number(v.review1Stars))}</div>
          </div>
        </div>
      </div>
      <div class="${uid('grev')}-card">
        <div class="${uid('grev')}-card-title">${v.review2Title}</div>
        <p class="${uid('grev')}-card-text">${v.review2Text}</p>
        <div class="${uid('grev')}-card-author">
          <img src="${v.review2Avatar}" alt="" class="${uid('grev')}-avatar">
          <div class="${uid('grev')}-author-info">
            <div class="${uid('grev')}-author-name">${v.review2Name} <span class="${uid('grev')}-quote">"</span></div>
            <div class="${uid('grev')}-author-stars">${genStars(Number(v.review2Stars))}</div>
          </div>
        </div>
      </div>
      <div class="${uid('grev')}-card">
        <div class="${uid('grev')}-card-title">${v.review3Title}</div>
        <p class="${uid('grev')}-card-text">${v.review3Text}</p>
        <div class="${uid('grev')}-card-author">
          <img src="${v.review3Avatar}" alt="" class="${uid('grev')}-avatar">
          <div class="${uid('grev')}-author-info">
            <div class="${uid('grev')}-author-name">${v.review3Name} <span class="${uid('grev')}-quote">"</span></div>
            <div class="${uid('grev')}-author-stars">${genStars(Number(v.review3Stars))}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="${uid('grev')}-nav"><span class="${uid('grev')}-nav-arrow">‹</span><div class="${uid('grev')}-nav-bar"><div class="${uid('grev')}-nav-progress"></div></div><span class="${uid('grev')}-nav-arrow">›</span></div>
    <p class="${uid('grev')}-link">Read more on <span>Google</span></p>
  </div>
</div>`;
    }
  },

  // 12. Dark Product Card Neon
  {
    id: 'dark-product-card-neon',
    name: 'Product - Dark Neon Card',
    category: 'Product',
    description: 'Dark background product card with neon accent button',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Focus Reimagined.' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Seamlessly integrated HUD. Real-time translation, navigation, and biometrics projected directly onto your retina. The world, enhanced.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Explore Specs' },
      { id: 'buttonLink', label: 'Button Link', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'accentColor', label: 'Accent/Button Color', type: 'color', defaultValue: '#d4ff00' },
      { id: 'cardBorder', label: 'Card Border Color', type: 'color', defaultValue: '#333333' },
    ],
    generateHtml: (v) => `<div class="${uid('dkpn')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('dkpn')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('dkpn')}-wrap { max-width: 900px; margin: 0 auto; padding: 80px 24px; }
    .${uid('dkpn')}-card { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid ${v.cardBorder}; border-radius: 24px; overflow: hidden; }
    .${uid('dkpn')}-content { padding: 60px 48px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('dkpn')}-heading { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 20px; }
    .${uid('dkpn')}-desc { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 32px; }
    .${uid('dkpn')}-btn { display: inline-flex; width: fit-content; padding: 14px 28px; background: ${v.accentColor}; color: #0a0a0a; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s; }
    .${uid('dkpn')}-btn:hover { opacity: 0.9; transform: translateY(-2px); }
    .${uid('dkpn')}-image { position: relative; }
    .${uid('dkpn')}-image img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
    @media (max-width: 768px) { .${uid('dkpn')}-card { grid-template-columns: 1fr; } .${uid('dkpn')}-content { padding: 40px 24px; } }
  </style>
  <div class="${uid('dkpn')}-wrap">
    <div class="${uid('dkpn')}-card">
      <div class="${uid('dkpn')}-content">
        <h2 class="${uid('dkpn')}-heading">${v.heading}</h2>
        <p class="${uid('dkpn')}-desc">${v.description}</p>
        <a href="${v.buttonLink}" class="${uid('dkpn')}-btn">${v.buttonText}</a>
      </div>
      <div class="${uid('dkpn')}-image">
        <img src="${v.image}" alt="">
      </div>
    </div>
  </div>
</div>`
  },

  // 13. Product Hotspots Showcase
  {
    id: 'product-hotspots-showcase',
    name: 'Product - Hotspots Showcase',
    category: 'Product',
    description: 'Product image with interactive hotspot markers revealing product details',
    thumbnail: '',
    fields: [
      { id: 'mainImage', label: 'Main Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'hotspot1Top', label: 'Hotspot 1 Top %', type: 'text', defaultValue: '25' },
      { id: 'hotspot1Left', label: 'Hotspot 1 Left %', type: 'text', defaultValue: '30' },
      { id: 'hotspot1Title', label: 'Hotspot 1 Title', type: 'text', defaultValue: 'Nutrition Shake' },
      { id: 'hotspot1Desc', label: 'Hotspot 1 Description', type: 'text', defaultValue: '25g protein' },
      { id: 'hotspot1Price', label: 'Hotspot 1 Price', type: 'text', defaultValue: '$24.00' },
      { id: 'hotspot1Link', label: 'Hotspot 1 Link', type: 'url', defaultValue: '#' },
      { id: 'hotspot2Top', label: 'Hotspot 2 Top %', type: 'text', defaultValue: '60' },
      { id: 'hotspot2Left', label: 'Hotspot 2 Left %', type: 'text', defaultValue: '20' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Essentials Nutrition Shake' },
      { id: 'benefit1', label: 'Benefit 1', type: 'text', defaultValue: 'Clean Ingredients' },
      { id: 'benefit2', label: 'Benefit 2', type: 'text', defaultValue: 'Naturally Derived' },
      { id: 'benefit3', label: 'Benefit 3', type: 'text', defaultValue: 'No Sketchy Additives' },
      { id: 'benefit4', label: 'Benefit 4', type: 'text', defaultValue: 'Happiness Guarantee' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Achieving optimal health does not necessitate a plethora of supplements. Embrace nutrition in its natural form by forgoing isolated, synthetic nutrients for the myriad health benefits that only real, whole foods can offer.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW' },
      { id: 'buttonLink', label: 'Button Link', type: 'url', defaultValue: '#' },
      { id: 'hotspotColor', label: 'Hotspot Color', type: 'color', defaultValue: '#c4d600' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'buttonTextColor', label: 'Button Text Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('phot')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('phot')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('phot')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 24px; align-items: center; }
    .${uid('phot')}-image { position: relative; }
    .${uid('phot')}-image img { width: 100%; border-radius: 16px; }
    .${uid('phot')}-hotspot { position: absolute; width: 28px; height: 28px; background: ${v.hotspotColor}; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #1a1a1a; transition: all 0.3s; }
    .${uid('phot')}-hotspot:hover { transform: scale(1.2); }
    .${uid('phot')}-hotspot-popup { position: absolute; left: 40px; top: -20px; background: #fff; padding: 16px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); min-width: 200px; opacity: 0; visibility: hidden; transition: all 0.3s; z-index: 10; }
    .${uid('phot')}-hotspot:hover .${uid('phot')}-hotspot-popup { opacity: 1; visibility: visible; }
    .${uid('phot')}-popup-title { font-size: 14px; font-weight: 600; color: #1a1a1a; }
    .${uid('phot')}-popup-desc { font-size: 12px; color: #666; margin-top: 4px; }
    .${uid('phot')}-popup-price { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-top: 8px; }
    .${uid('phot')}-popup-link { font-size: 12px; color: #0066cc; text-decoration: none; }
    .${uid('phot')}-content { }
    .${uid('phot')}-heading { font-size: 36px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px; }
    .${uid('phot')}-benefits { margin-bottom: 24px; }
    .${uid('phot')}-benefit { display: flex; align-items: center; gap: 12px; padding: 8px 0; font-size: 15px; color: #1a1a1a; }
    .${uid('phot')}-benefit::before { content: "✓"; color: #1a1a1a; font-weight: 700; }
    .${uid('phot')}-desc { font-size: 15px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('phot')}-btn { display: inline-flex; align-items: center; gap: 8px; padding: 16px 32px; background: ${v.buttonBg}; color: ${v.buttonTextColor}; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 4px; transition: all 0.3s; }
    .${uid('phot')}-btn:hover { opacity: 0.9; }
    .${uid('phot')}-btn::after { content: "→"; }
    @media (max-width: 768px) { .${uid('phot')}-wrap { grid-template-columns: 1fr; gap: 40px; } }
  </style>
  <div class="${uid('phot')}-wrap">
    <div class="${uid('phot')}-image">
      <img src="${v.mainImage}" alt="">
      <div class="${uid('phot')}-hotspot" style="top:${v.hotspot1Top}%;left:${v.hotspot1Left}%;">
        +
        <div class="${uid('phot')}-hotspot-popup">
          <div class="${uid('phot')}-popup-title">${v.hotspot1Title}</div>
          <div class="${uid('phot')}-popup-desc">${v.hotspot1Desc}</div>
          <div class="${uid('phot')}-popup-price">${v.hotspot1Price}</div>
          <a href="${v.hotspot1Link}" class="${uid('phot')}-popup-link">View</a>
        </div>
      </div>
      <div class="${uid('phot')}-hotspot" style="top:${v.hotspot2Top}%;left:${v.hotspot2Left}%;">+</div>
    </div>
    <div class="${uid('phot')}-content">
      <h2 class="${uid('phot')}-heading">${v.heading}</h2>
      <div class="${uid('phot')}-benefits">
        <div class="${uid('phot')}-benefit">${v.benefit1}</div>
        <div class="${uid('phot')}-benefit">${v.benefit2}</div>
        <div class="${uid('phot')}-benefit">${v.benefit3}</div>
        <div class="${uid('phot')}-benefit">${v.benefit4}</div>
      </div>
      <p class="${uid('phot')}-desc">${v.description}</p>
      <a href="${v.buttonLink}" class="${uid('phot')}-btn">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },

  // 14. Trust Icons Bar
  {
    id: 'trust-icons-bar',
    name: 'Trust - Icons Bar',
    category: 'Trust',
    description: 'Horizontal bar with trust icons: Lifetime Guarantee, Secure Payment, Free Shipping, See In Action',
    thumbnail: '',
    fields: [
      { id: 'icon1Label', label: 'Icon 1 Label', type: 'text', defaultValue: 'Lifetime Guarantee' },
      { id: 'icon1Link', label: 'Icon 1 Link', type: 'url', defaultValue: '#' },
      { id: 'icon2Label', label: 'Icon 2 Label', type: 'text', defaultValue: 'Secure Payment' },
      { id: 'icon2Link', label: 'Icon 2 Link', type: 'url', defaultValue: '#' },
      { id: 'icon3Label', label: 'Icon 3 Label', type: 'text', defaultValue: 'Free Shipping & Returns' },
      { id: 'icon3Link', label: 'Icon 3 Link', type: 'url', defaultValue: '#' },
      { id: 'icon4Label', label: 'Icon 4 Label', type: 'text', defaultValue: 'See In Action' },
      { id: 'icon4Link', label: 'Icon 4 Link', type: 'url', defaultValue: '#' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'iconColor', label: 'Icon Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'underlineLink1', label: 'Underline Icon 1', type: 'text', defaultValue: 'true' },
      { id: 'underlineLink4', label: 'Underline Icon 4', type: 'text', defaultValue: 'true' },
    ],
    generateHtml: (v) => `<div class="${uid('ticn')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('ticn')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ticn')}-wrap { display: flex; justify-content: center; gap: 80px; padding: 40px 24px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; }
    .${uid('ticn')}-item { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
    .${uid('ticn')}-icon { font-size: 36px; color: ${v.iconColor}; }
    .${uid('ticn')}-label { font-size: 14px; color: ${v.textColor}; line-height: 1.4; }
    .${uid('ticn')}-label a { color: ${v.textColor}; text-decoration: none; }
    .${uid('ticn')}-label.underline a { text-decoration: underline; }
    @media (max-width: 768px) { .${uid('ticn')}-wrap { gap: 40px; } }
  </style>
  <div class="${uid('ticn')}-wrap">
    <div class="${uid('ticn')}-item">
      <div class="${uid('ticn')}-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2"/><circle cx="12" cy="13" r="2"/><path d="M12 15v2"/></svg>
      </div>
      <div class="${uid('ticn')}-label ${v.underlineLink1 === 'true' ? 'underline' : ''}"><a href="${v.icon1Link}">${v.icon1Label}</a></div>
    </div>
    <div class="${uid('ticn')}-item">
      <div class="${uid('ticn')}-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M12 12a3 3 0 100-6 3 3 0 000 6z"/><path d="M2 10h2M20 10h2"/></svg>
      </div>
      <div class="${uid('ticn')}-label"><a href="${v.icon2Link}">${v.icon2Label}</a></div>
    </div>
    <div class="${uid('ticn')}-item">
      <div class="${uid('ticn')}-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 10h4l3 3v5h-7V10z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>
      </div>
      <div class="${uid('ticn')}-label"><a href="${v.icon3Link}">${v.icon3Label}</a></div>
    </div>
    <div class="${uid('ticn')}-item">
      <div class="${uid('ticn')}-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      <div class="${uid('ticn')}-label ${v.underlineLink4 === 'true' ? 'underline' : ''}"><a href="${v.icon4Link}">${v.icon4Label}</a></div>
    </div>
  </div>
</div>`
  },

  // 15. As Seen On Dark Bar
  {
    id: 'as-seen-on-dark',
    name: 'Social - As Seen On (Dark)',
    category: 'Social',
    description: 'Dark background bar with "AS SEEN ON" and publication logos',
    thumbnail: '',
    fields: [
      { id: 'label', label: 'Label Text', type: 'text', defaultValue: 'AS SEEN ON' },
      { id: 'logo1', label: 'Logo 1 Name', type: 'text', defaultValue: 'NewScientist' },
      { id: 'logo2', label: 'Logo 2 Name', type: 'text', defaultValue: 'PureWow' },
      { id: 'logo3', label: 'Logo 3 Name', type: 'text', defaultValue: 'COSMOPOLITAN' },
      { id: 'logo4', label: 'Logo 4 Name', type: 'text', defaultValue: 'GLAMOUR' },
      { id: 'logo5', label: 'Logo 5 Name', type: 'text', defaultValue: 'Inc' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'labelColor', label: 'Label Color', type: 'color', defaultValue: '#888888' },
      { id: 'logoColor', label: 'Logo Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('asod')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('asod')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('asod')}-wrap { display: flex; align-items: center; justify-content: center; gap: 48px; padding: 20px 24px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; }
    .${uid('asod')}-label { font-size: 12px; font-weight: 500; color: ${v.labelColor}; letter-spacing: 0.1em; text-transform: uppercase; }
    .${uid('asod')}-logos { display: flex; align-items: center; gap: 40px; flex-wrap: wrap; }
    .${uid('asod')}-logo { font-size: 18px; font-weight: 600; color: ${v.logoColor}; white-space: nowrap; }
    .${uid('asod')}-logo.serif { font-family: Georgia, 'Times New Roman', serif; font-style: italic; }
    .${uid('asod')}-logo.caps { text-transform: uppercase; letter-spacing: 0.15em; font-size: 14px; }
    @media (max-width: 768px) { .${uid('asod')}-wrap { gap: 24px; } .${uid('asod')}-logos { gap: 24px; } }
  </style>
  <div class="${uid('asod')}-wrap">
    <span class="${uid('asod')}-label">${v.label}</span>
    <div class="${uid('asod')}-logos">
      <span class="${uid('asod')}-logo">${v.logo1}</span>
      <span class="${uid('asod')}-logo serif">${v.logo2}</span>
      <span class="${uid('asod')}-logo caps">${v.logo3}</span>
      <span class="${uid('asod')}-logo caps">${v.logo4}</span>
      <span class="${uid('asod')}-logo">${v.logo5}</span>
    </div>
  </div>
</div>`
  },

  // 16. As Seen On Light Bar
  {
    id: 'as-seen-on-light',
    name: 'Social - As Seen On (Light)',
    category: 'Social',
    description: 'Light background bar with "As seen on" and publication logos in grayscale',
    thumbnail: '',
    fields: [
      { id: 'label', label: 'Label Text', type: 'text', defaultValue: 'As seen on' },
      { id: 'logo1', label: 'Logo 1 Name', type: 'text', defaultValue: 'GLAMOUR' },
      { id: 'logo2', label: 'Logo 2 Name', type: 'text', defaultValue: 'healthline' },
      { id: 'logo3', label: 'Logo 3 Name', type: 'text', defaultValue: 'marie claire' },
      { id: 'logo4', label: 'Logo 4 Name', type: 'text', defaultValue: 'NewScientist' },
      { id: 'logo5', label: 'Logo 5 Name', type: 'text', defaultValue: 'PureWow' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f8f8f8' },
      { id: 'labelColor', label: 'Label Color', type: 'color', defaultValue: '#999999' },
      { id: 'logoColor', label: 'Logo Color', type: 'color', defaultValue: '#666666' },
    ],
    generateHtml: (v) => `<div class="${uid('asol')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('asol')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('asol')}-wrap { display: flex; align-items: center; justify-content: center; gap: 40px; padding: 24px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; border-radius: 100px; }
    .${uid('asol')}-label { font-size: 14px; color: ${v.labelColor}; }
    .${uid('asol')}-logos { display: flex; align-items: center; gap: 36px; flex-wrap: wrap; }
    .${uid('asol')}-logo { font-size: 16px; font-weight: 600; color: ${v.logoColor}; white-space: nowrap; }
    .${uid('asol')}-logo.caps { text-transform: uppercase; letter-spacing: 0.12em; font-size: 14px; }
    .${uid('asol')}-logo.serif { font-family: Georgia, 'Times New Roman', serif; font-style: italic; }
    .${uid('asol')}-logo.light { font-weight: 400; }
    @media (max-width: 768px) { .${uid('asol')}-wrap { gap: 20px; } .${uid('asol')}-logos { gap: 20px; } }
  </style>
  <div class="${uid('asol')}-wrap">
    <span class="${uid('asol')}-label">${v.label}</span>
    <div class="${uid('asol')}-logos">
      <span class="${uid('asol')}-logo caps">${v.logo1}</span>
      <span class="${uid('asol')}-logo light">${v.logo2}</span>
      <span class="${uid('asol')}-logo light">${v.logo3}</span>
      <span class="${uid('asol')}-logo">${v.logo4}</span>
      <span class="${uid('asol')}-logo serif">${v.logo5}</span>
    </div>
  </div>
</div>`
  },

  // 17. Beauty Hero Video Gallery
  {
    id: 'beauty-hero-video-gallery',
    name: 'Hero - Beauty Video Gallery',
    category: 'Hero',
    description: 'Pink background hero with main video, thumbnail gallery, testimonial, and benefit list',
    thumbnail: '',
    fields: [
      { id: 'mainVideo', label: 'Main Video/Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'thumb1', label: 'Thumbnail 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'thumb2', label: 'Thumbnail 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'thumb3', label: 'Thumbnail 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'headingLine1', label: 'Heading Line 1', type: 'text', defaultValue: '5 Reasons Why Beauty' },
      { id: 'headingLine2', label: 'Heading Line 2', type: 'text', defaultValue: 'Serum Will Improve Your' },
      { id: 'headingAccent', label: 'Heading Accent Text', type: 'text', defaultValue: 'sleep, skin & energy' },
      { id: 'testimonialText', label: 'Testimonial Text', type: 'text', defaultValue: '"They are truly the leading skincare brand"' },
      { id: 'testimonialName', label: 'Testimonial Name', type: 'text', defaultValue: 'Dr. Paula Wilson' },
      { id: 'testimonialAvatar', label: 'Testimonial Avatar', type: 'image', defaultValue: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'ORDER NEW' },
      { id: 'buttonLink', label: 'Button Link', type: 'url', defaultValue: '#' },
      { id: 'guarantee', label: 'Guarantee Text', type: 'text', defaultValue: '30-Day Money Back Guarantee' },
      { id: 'benefit1', label: 'Benefit 1', type: 'text', defaultValue: '2-in-1 formula' },
      { id: 'benefit2', label: 'Benefit 2', type: 'text', defaultValue: 'Restores skin longevity' },
      { id: 'benefit3', label: 'Benefit 3', type: 'text', defaultValue: 'Promotes skin regeneration' },
      { id: 'benefit4', label: 'Benefit 4', type: 'text', defaultValue: 'Refills deep wrinkles' },
      { id: 'benefit5', label: 'Benefit 5', type: 'text', defaultValue: 'Brightens & evens out skin tone' },
      { id: 'benefit6', label: 'Benefit 6', type: 'text', defaultValue: 'Safe for sensitive skin' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fce4ec' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#f06292' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#f48fb1' },
    ],
    generateHtml: (v) => `<div class="${uid('bhvg')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('bhvg')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bhvg')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 24px; align-items: center; }
    .${uid('bhvg')}-media { }
    .${uid('bhvg')}-main { position: relative; border-radius: 16px; overflow: hidden; margin-bottom: 16px; }
    .${uid('bhvg')}-main img { width: 100%; display: block; }
    .${uid('bhvg')}-controls { position: absolute; top: 16px; left: 16px; display: flex; gap: 8px; }
    .${uid('bhvg')}-ctrl-btn { width: 36px; height: 36px; background: rgba(0,0,0,0.5); border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; }
    .${uid('bhvg')}-thumbs { display: flex; gap: 12px; }
    .${uid('bhvg')}-thumb { width: 100px; height: 100px; border-radius: 12px; overflow: hidden; }
    .${uid('bhvg')}-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('bhvg')}-content { }
    .${uid('bhvg')}-heading { font-size: 36px; font-weight: 700; color: #1a1a1a; line-height: 1.2; margin-bottom: 24px; }
    .${uid('bhvg')}-heading .accent { font-style: italic; color: ${v.accentColor}; display: block; }
    .${uid('bhvg')}-testimonial { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .${uid('bhvg')}-test-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
    .${uid('bhvg')}-test-text { font-size: 14px; color: #333; }
    .${uid('bhvg')}-test-name { font-size: 12px; color: ${v.accentColor}; margin-top: 4px; }
    .${uid('bhvg')}-btn { display: inline-flex; align-items: center; gap: 8px; padding: 16px 32px; background: ${v.buttonBg}; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; margin-bottom: 16px; }
    .${uid('bhvg')}-guarantee { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #333; margin-bottom: 32px; }
    .${uid('bhvg')}-guarantee::before { content: "✓"; color: #333; }
    .${uid('bhvg')}-benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .${uid('bhvg')}-benefit { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #333; }
    .${uid('bhvg')}-benefit::before { content: "✓"; width: 20px; height: 20px; background: ${v.accentColor}; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; }
    @media (max-width: 768px) { .${uid('bhvg')}-wrap { grid-template-columns: 1fr; gap: 40px; } .${uid('bhvg')}-benefits { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('bhvg')}-wrap">
    <div class="${uid('bhvg')}-media">
      <div class="${uid('bhvg')}-main">
        <img src="${v.mainVideo}" alt="">
        <div class="${uid('bhvg')}-controls">
          <div class="${uid('bhvg')}-ctrl-btn">⏸</div>
          <div class="${uid('bhvg')}-ctrl-btn">🔊</div>
        </div>
      </div>
      <div class="${uid('bhvg')}-thumbs">
        <div class="${uid('bhvg')}-thumb"><img src="${v.thumb1}" alt=""></div>
        <div class="${uid('bhvg')}-thumb"><img src="${v.thumb2}" alt=""></div>
        <div class="${uid('bhvg')}-thumb"><img src="${v.thumb3}" alt=""></div>
      </div>
    </div>
    <div class="${uid('bhvg')}-content">
      <h2 class="${uid('bhvg')}-heading">${v.headingLine1}<br>${v.headingLine2}<span class="accent">${v.headingAccent}</span></h2>
      <div class="${uid('bhvg')}-testimonial">
        <img src="${v.testimonialAvatar}" alt="" class="${uid('bhvg')}-test-avatar">
        <div>
          <div class="${uid('bhvg')}-test-text">${v.testimonialText}</div>
          <div class="${uid('bhvg')}-test-name">${v.testimonialName}</div>
        </div>
      </div>
      <a href="${v.buttonLink}" class="${uid('bhvg')}-btn">${v.buttonText} →</a>
      <div class="${uid('bhvg')}-guarantee">${v.guarantee}</div>
      <div class="${uid('bhvg')}-benefits">
        <div class="${uid('bhvg')}-benefit">${v.benefit1}</div>
        <div class="${uid('bhvg')}-benefit">${v.benefit4}</div>
        <div class="${uid('bhvg')}-benefit">${v.benefit2}</div>
        <div class="${uid('bhvg')}-benefit">${v.benefit5}</div>
        <div class="${uid('bhvg')}-benefit">${v.benefit3}</div>
        <div class="${uid('bhvg')}-benefit">${v.benefit6}</div>
      </div>
    </div>
  </div>
</div>`
  },

  // 18. Product Upgrade Testimonial
  {
    id: 'product-upgrade-testimonial',
    name: 'Product - Upgrade Testimonial',
    category: 'Product',
    description: 'Product showcase with testimonial, video gallery, and feature icons',
    thumbnail: '',
    fields: [
      { id: 'headingLine1', label: 'Heading Line 1', type: 'text', defaultValue: 'Reasons to upgrade' },
      { id: 'headingAccent', label: 'Heading Accent Text', type: 'text', defaultValue: 'your water bottle' },
      { id: 'testimonialText', label: 'Testimonial Text', type: 'textarea', defaultValue: '"I bring this bottle everywhere I go. It contains 910 ml, stays cold forever and is so easy to carry around. Perfect for my active lifestyle."' },
      { id: 'testimonialAvatar', label: 'Testimonial Avatar', type: 'image', defaultValue: 'https://randomuser.me/api/portraits/women/65.jpg' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Learn More' },
      { id: 'buttonLink', label: 'Button Link', type: 'url', defaultValue: '#' },
      { id: 'deliveryText', label: 'Delivery Text', type: 'text', defaultValue: 'Fast delivery, within 1-2 days.' },
      { id: 'feature1Icon', label: 'Feature 1 Icon', type: 'text', defaultValue: '❄️' },
      { id: 'feature1Text', label: 'Feature 1 Text', type: 'text', defaultValue: 'Holds cold for 24 hours' },
      { id: 'feature2Icon', label: 'Feature 2 Icon', type: 'text', defaultValue: '🔥' },
      { id: 'feature2Text', label: 'Feature 2 Text', type: 'text', defaultValue: 'Stays hot for 12 hours' },
      { id: 'feature3Icon', label: 'Feature 3 Icon', type: 'text', defaultValue: '🛡️' },
      { id: 'feature3Text', label: 'Feature 3 Text', type: 'text', defaultValue: 'Double wall-isolated' },
      { id: 'feature4Icon', label: 'Feature 4 Icon', type: 'text', defaultValue: '💪' },
      { id: 'feature4Text', label: 'Feature 4 Text', type: 'text', defaultValue: 'Made to last' },
      { id: 'mainImage', label: 'Main Video/Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'thumb1', label: 'Thumbnail 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'thumb2', label: 'Thumbnail 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'thumb3', label: 'Thumbnail 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#8b0000' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('pupt')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('pupt')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pupt')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1100px; margin: 0 auto; padding: 60px 24px; align-items: center; }
    .${uid('pupt')}-content { }
    .${uid('pupt')}-heading { font-size: 36px; font-weight: 400; color: #1a1a1a; line-height: 1.2; margin-bottom: 24px; }
    .${uid('pupt')}-heading .accent { font-style: italic; color: ${v.accentColor}; }
    .${uid('pupt')}-testimonial { display: flex; gap: 16px; margin-bottom: 24px; }
    .${uid('pupt')}-test-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .${uid('pupt')}-test-text { font-size: 15px; font-style: italic; color: #333; line-height: 1.6; }
    .${uid('pupt')}-btn { display: inline-block; padding: 14px 28px; background: ${v.buttonBg}; color: #fff; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 4px; margin-bottom: 16px; }
    .${uid('pupt')}-delivery { font-size: 13px; color: #666; margin-bottom: 32px; display: flex; align-items: center; gap: 8px; }
    .${uid('pupt')}-delivery::before { content: "⏱"; }
    .${uid('pupt')}-features { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .${uid('pupt')}-feature { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #333; }
    .${uid('pupt')}-feature-icon { font-size: 16px; }
    .${uid('pupt')}-media { }
    .${uid('pupt')}-main { position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 12px; }
    .${uid('pupt')}-main img { width: 100%; display: block; }
    .${uid('pupt')}-controls { position: absolute; top: 12px; right: 12px; display: flex; gap: 6px; }
    .${uid('pupt')}-ctrl-btn { width: 32px; height: 32px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
    .${uid('pupt')}-thumbs { display: flex; gap: 8px; }
    .${uid('pupt')}-thumb { flex: 1; border-radius: 8px; overflow: hidden; }
    .${uid('pupt')}-thumb img { width: 100%; height: 80px; object-fit: cover; }
    @media (max-width: 768px) { .${uid('pupt')}-wrap { grid-template-columns: 1fr; gap: 40px; } .${uid('pupt')}-features { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('pupt')}-wrap">
    <div class="${uid('pupt')}-content">
      <h2 class="${uid('pupt')}-heading">${v.headingLine1}<br><span class="accent">${v.headingAccent}</span></h2>
      <div class="${uid('pupt')}-testimonial">
        <img src="${v.testimonialAvatar}" alt="" class="${uid('pupt')}-test-avatar">
        <p class="${uid('pupt')}-test-text">${v.testimonialText}</p>
      </div>
      <a href="${v.buttonLink}" class="${uid('pupt')}-btn">${v.buttonText}</a>
      <div class="${uid('pupt')}-delivery">${v.deliveryText}</div>
      <div class="${uid('pupt')}-features">
        <div class="${uid('pupt')}-feature"><span class="${uid('pupt')}-feature-icon">${v.feature1Icon}</span>${v.feature1Text}</div>
        <div class="${uid('pupt')}-feature"><span class="${uid('pupt')}-feature-icon">${v.feature2Icon}</span>${v.feature2Text}</div>
        <div class="${uid('pupt')}-feature"><span class="${uid('pupt')}-feature-icon">${v.feature3Icon}</span>${v.feature3Text}</div>
        <div class="${uid('pupt')}-feature"><span class="${uid('pupt')}-feature-icon">${v.feature4Icon}</span>${v.feature4Text}</div>
      </div>
    </div>
    <div class="${uid('pupt')}-media">
      <div class="${uid('pupt')}-main">
        <img src="${v.mainImage}" alt="">
        <div class="${uid('pupt')}-controls">
          <div class="${uid('pupt')}-ctrl-btn">⏸</div>
          <div class="${uid('pupt')}-ctrl-btn">🔊</div>
        </div>
      </div>
      <div class="${uid('pupt')}-thumbs">
        <div class="${uid('pupt')}-thumb"><img src="${v.thumb1}" alt=""></div>
        <div class="${uid('pupt')}-thumb"><img src="${v.thumb2}" alt=""></div>
        <div class="${uid('pupt')}-thumb"><img src="${v.thumb3}" alt=""></div>
      </div>
    </div>
  </div>
</div>`
  },

  // 19. FAQ Tabbed Accordion
  {
    id: 'faq-tabbed-accordion',
    name: 'FAQ - Tabbed Accordion',
    category: 'FAQ',
    description: 'FAQ section with category tabs and accordion items',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Frequently Asked Questions' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Please contact our Customer Support Team at support@ourstore.com for more information!' },
      { id: 'tab1', label: 'Tab 1 Label', type: 'text', defaultValue: 'General information' },
      { id: 'tab2', label: 'Tab 2 Label', type: 'text', defaultValue: 'Shipping & Delivery' },
      { id: 'tab3', label: 'Tab 3 Label', type: 'text', defaultValue: 'Returns & Exchanges' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'I placed an order where is it?' },
      { id: 'a1', label: 'Answer 1', type: 'textarea', defaultValue: 'You can track your order using the tracking link sent to your email after shipment.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'Where can I find a store?' },
      { id: 'a2', label: 'Answer 2', type: 'textarea', defaultValue: 'Visit our store locator page to find the nearest store to you.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'How can I sign in to my account?' },
      { id: 'a3', label: 'Answer 3', type: 'textarea', defaultValue: 'Click the account icon in the top right corner and enter your email and password.' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#1a237e' },
      { id: 'subtextColor', label: 'Subtext Color', type: 'color', defaultValue: '#1a237e' },
      { id: 'activeTabBg', label: 'Active Tab Background', type: 'color', defaultValue: '#1a237e' },
      { id: 'activeTabText', label: 'Active Tab Text', type: 'color', defaultValue: '#ffffff' },
      { id: 'tabBg', label: 'Tab Background', type: 'color', defaultValue: '#e8e8e8' },
    ],
    generateHtml: (v) => `<div class="${uid('fqta')}" style="font-family:Georgia,'Times New Roman',serif;">
  <style>
    .${uid('fqta')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fqta')}-wrap { max-width: 800px; margin: 0 auto; padding: 60px 24px; }
    .${uid('fqta')}-heading { font-size: 42px; font-style: italic; font-weight: 400; color: ${v.headingColor}; text-align: center; margin-bottom: 16px; }
    .${uid('fqta')}-subtext { font-size: 15px; color: ${v.subtextColor}; text-align: center; margin-bottom: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .${uid('fqta')}-tabs { display: flex; justify-content: center; gap: 0; margin-bottom: 40px; background: ${v.tabBg}; border-radius: 100px; padding: 4px; max-width: 600px; margin-left: auto; margin-right: auto; }
    .${uid('fqta')}-tab { padding: 14px 28px; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; cursor: pointer; border-radius: 100px; transition: all 0.3s; white-space: nowrap; }
    .${uid('fqta')}-tab.active { background: ${v.activeTabBg}; color: ${v.activeTabText}; }
    .${uid('fqta')}-items { }
    .${uid('fqta')}-item { border-bottom: 1px solid #e0e0e0; }
    .${uid('fqta')}-question { display: flex; justify-content: space-between; align-items: center; padding: 24px 0; cursor: pointer; font-size: 16px; font-weight: 600; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .${uid('fqta')}-icon { font-size: 20px; color: ${v.headingColor}; }
    .${uid('fqta')}-answer { padding: 0 0 24px 0; font-size: 15px; color: #666; line-height: 1.7; display: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
  <div class="${uid('fqta')}-wrap">
    <h2 class="${uid('fqta')}-heading">${v.heading}</h2>
    <p class="${uid('fqta')}-subtext">${v.subtext}</p>
    <div class="${uid('fqta')}-tabs">
      <div class="${uid('fqta')}-tab active">${v.tab1}</div>
      <div class="${uid('fqta')}-tab">${v.tab2}</div>
      <div class="${uid('fqta')}-tab">${v.tab3}</div>
    </div>
    <div class="${uid('fqta')}-items">
      <div class="${uid('fqta')}-item">
        <div class="${uid('fqta')}-question">${v.q1}<span class="${uid('fqta')}-icon">+</span></div>
        <div class="${uid('fqta')}-answer">${v.a1}</div>
      </div>
      <div class="${uid('fqta')}-item">
        <div class="${uid('fqta')}-question">${v.q2}<span class="${uid('fqta')}-icon">+</span></div>
        <div class="${uid('fqta')}-answer">${v.a2}</div>
      </div>
      <div class="${uid('fqta')}-item">
        <div class="${uid('fqta')}-question">${v.q3}<span class="${uid('fqta')}-icon">+</span></div>
        <div class="${uid('fqta')}-answer">${v.a3}</div>
      </div>
    </div>
  </div>
</div>`
  },

  // 20. Bento Gallery Grid
  {
    id: 'bento-gallery-grid',
    name: 'Gallery - Bento Grid',
    category: 'Gallery',
    description: 'Bento-style gallery grid with overlaid text and CTA buttons',
    thumbnail: '',
    fields: [
      { id: 'img1', label: 'Image 1 (Top Left)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'img1Title', label: 'Image 1 Title', type: 'text', defaultValue: 'Soft to the touch' },
      { id: 'img1Button', label: 'Image 1 Button', type: 'text', defaultValue: 'SHOP THROWS' },
      { id: 'img1Link', label: 'Image 1 Link', type: 'url', defaultValue: '#' },
      { id: 'img2', label: 'Image 2 (Top Center)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'img2Title', label: 'Image 2 Title', type: 'text', defaultValue: 'Bedsheet' },
      { id: 'img2Button', label: 'Image 2 Button', type: 'text', defaultValue: 'USAGE GUIDE' },
      { id: 'img2Link', label: 'Image 2 Link', type: 'url', defaultValue: '#' },
      { id: 'img3', label: 'Image 3 (Right Tall)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'img3Title', label: 'Image 3 Title', type: 'text', defaultValue: 'Thick as a towel' },
      { id: 'img3Button', label: 'Image 3 Button', type: 'text', defaultValue: 'SHOP RUGS' },
      { id: 'img3Link', label: 'Image 3 Link', type: 'url', defaultValue: '#' },
      { id: 'img4', label: 'Image 4 (Bottom Left)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'img4Title', label: 'Image 4 Title', type: 'text', defaultValue: 'Boost your home' },
      { id: 'img4Button', label: 'Image 4 Button', type: 'text', defaultValue: 'INSPIRATION' },
      { id: 'img4Link', label: 'Image 4 Link', type: 'url', defaultValue: '#' },
      { id: 'img5', label: 'Image 5 (Bottom Center)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'img5Title', label: 'Image 5 Title', type: 'text', defaultValue: 'Reversible design' },
      { id: 'img5Button', label: 'Image 5 Button', type: 'text', defaultValue: 'SEE HOW' },
      { id: 'img5Link', label: 'Image 5 Link', type: 'url', defaultValue: '#' },
      { id: 'titleColor', label: 'Title Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'buttonText', label: 'Button Text Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('bgrd')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('bgrd')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bgrd')}-wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    .${uid('bgrd')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 220px); gap: 12px; }
    .${uid('bgrd')}-item { position: relative; border-radius: 12px; overflow: hidden; }
    .${uid('bgrd')}-item img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('bgrd')}-item.tall { grid-row: span 2; }
    .${uid('bgrd')}-overlay { position: absolute; bottom: 20px; left: 20px; }
    .${uid('bgrd')}-title { font-size: 20px; font-style: italic; color: ${v.titleColor}; margin-bottom: 12px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    .${uid('bgrd')}-btn { display: inline-block; padding: 10px 20px; background: ${v.buttonBg}; color: ${v.buttonText}; font-size: 11px; font-weight: 600; text-decoration: none; letter-spacing: 0.05em; }
    @media (max-width: 768px) { .${uid('bgrd')}-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; } .${uid('bgrd')}-item.tall { grid-row: span 1; } }
  </style>
  <div class="${uid('bgrd')}-wrap">
    <div class="${uid('bgrd')}-grid">
      <div class="${uid('bgrd')}-item">
        <img src="${v.img1}" alt="">
        <div class="${uid('bgrd')}-overlay">
          <div class="${uid('bgrd')}-title">${v.img1Title}</div>
          <a href="${v.img1Link}" class="${uid('bgrd')}-btn">${v.img1Button}</a>
        </div>
      </div>
      <div class="${uid('bgrd')}-item">
        <img src="${v.img2}" alt="">
        <div class="${uid('bgrd')}-overlay">
          <div class="${uid('bgrd')}-title">${v.img2Title}</div>
          <a href="${v.img2Link}" class="${uid('bgrd')}-btn">${v.img2Button}</a>
        </div>
      </div>
      <div class="${uid('bgrd')}-item tall">
        <img src="${v.img3}" alt="">
        <div class="${uid('bgrd')}-overlay">
          <div class="${uid('bgrd')}-title">${v.img3Title}</div>
          <a href="${v.img3Link}" class="${uid('bgrd')}-btn">${v.img3Button}</a>
        </div>
      </div>
      <div class="${uid('bgrd')}-item">
        <img src="${v.img4}" alt="">
        <div class="${uid('bgrd')}-overlay">
          <div class="${uid('bgrd')}-title">${v.img4Title}</div>
          <a href="${v.img4Link}" class="${uid('bgrd')}-btn">${v.img4Button}</a>
        </div>
      </div>
      <div class="${uid('bgrd')}-item">
        <img src="${v.img5}" alt="">
        <div class="${uid('bgrd')}-overlay">
          <div class="${uid('bgrd')}-title">${v.img5Title}</div>
          <a href="${v.img5Link}" class="${uid('bgrd')}-btn">${v.img5Button}</a>
        </div>
      </div>
    </div>
  </div>
</div>`
  },

  // 21. Circular Category Icons
  {
    id: 'circular-category-icons',
    name: 'Category - Circular Icons',
    category: 'Collection',
    description: 'Row of circular category images with labels on beige background',
    thumbnail: '',
    fields: [
      { id: 'cat1Image', label: 'Category 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'cat1Label', label: 'Category 1 Label', type: 'text', defaultValue: 'Dresses' },
      { id: 'cat1Link', label: 'Category 1 Link', type: 'url', defaultValue: '#' },
      { id: 'cat2Image', label: 'Category 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'cat2Label', label: 'Category 2 Label', type: 'text', defaultValue: 'Suits & Tailoring' },
      { id: 'cat2Link', label: 'Category 2 Link', type: 'url', defaultValue: '#' },
      { id: 'cat3Image', label: 'Category 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'cat3Label', label: 'Category 3 Label', type: 'text', defaultValue: 'Loungewear' },
      { id: 'cat3Link', label: 'Category 3 Link', type: 'url', defaultValue: '#' },
      { id: 'cat4Image', label: 'Category 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'cat4Label', label: 'Category 4 Label', type: 'text', defaultValue: 'Accessories' },
      { id: 'cat4Link', label: 'Category 4 Link', type: 'url', defaultValue: '#' },
      { id: 'cat5Image', label: 'Category 5 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/close-up-shot-of-mans-legs%20(1).png' },
      { id: 'cat5Label', label: 'Category 5 Label', type: 'text', defaultValue: 'Jewelry' },
      { id: 'cat5Link', label: 'Category 5 Link', type: 'url', defaultValue: '#' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f5f0e8' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#333333' },
    ],
    generateHtml: (v) => `<div class="${uid('ccat')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('ccat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ccat')}-wrap { display: flex; justify-content: center; gap: 48px; padding: 48px 24px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; }
    .${uid('ccat')}-item { display: flex; flex-direction: column; align-items: center; gap: 16px; text-decoration: none; }
    .${uid('ccat')}-image { width: 140px; height: 140px; border-radius: 50%; overflow: hidden; transition: transform 0.3s; }
    .${uid('ccat')}-item:hover .${uid('ccat')}-image { transform: scale(1.05); }
    .${uid('ccat')}-image img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('ccat')}-label { font-size: 14px; color: ${v.textColor}; text-align: center; }
    @media (max-width: 768px) { .${uid('ccat')}-wrap { gap: 24px; } .${uid('ccat')}-image { width: 100px; height: 100px; } }
  </style>
  <div class="${uid('ccat')}-wrap">
    <a href="${v.cat1Link}" class="${uid('ccat')}-item">
      <div class="${uid('ccat')}-image"><img src="${v.cat1Image}" alt=""></div>
      <div class="${uid('ccat')}-label">${v.cat1Label}</div>
    </a>
    <a href="${v.cat2Link}" class="${uid('ccat')}-item">
      <div class="${uid('ccat')}-image"><img src="${v.cat2Image}" alt=""></div>
      <div class="${uid('ccat')}-label">${v.cat2Label}</div>
    </a>
    <a href="${v.cat3Link}" class="${uid('ccat')}-item">
      <div class="${uid('ccat')}-image"><img src="${v.cat3Image}" alt=""></div>
      <div class="${uid('ccat')}-label">${v.cat3Label}</div>
    </a>
    <a href="${v.cat4Link}" class="${uid('ccat')}-item">
      <div class="${uid('ccat')}-image"><img src="${v.cat4Image}" alt=""></div>
      <div class="${uid('ccat')}-label">${v.cat4Label}</div>
    </a>
    <a href="${v.cat5Link}" class="${uid('ccat')}-item">
      <div class="${uid('ccat')}-image"><img src="${v.cat5Image}" alt=""></div>
      <div class="${uid('ccat')}-label">${v.cat5Label}</div>
    </a>
  </div>
</div>`
  },

  // 22. Food Allergen Badges
  {
    id: 'food-allergen-badges',
    name: 'Product - Allergen Badges',
    category: 'Product',
    description: 'Product showcase with allergen/dietary badges on image background',
    thumbnail: '',
    fields: [
      { id: 'badge', label: 'Top Badge Text', type: 'text', defaultValue: 'gluten-free' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Energy cookies' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Formulated with a blend of high-quality ingredients to provide a convenient and healthy snack option.' },
      { id: 'productImage', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'bgImage', label: 'Background Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'allergen1', label: 'Allergen 1 Text', type: 'text', defaultValue: 'lactose-free' },
      { id: 'allergen1Color', label: 'Allergen 1 Color', type: 'color', defaultValue: '#f59e0b' },
      { id: 'allergen2', label: 'Allergen 2 Text', type: 'text', defaultValue: 'gluten-free' },
      { id: 'allergen2Color', label: 'Allergen 2 Color', type: 'color', defaultValue: '#84cc16' },
      { id: 'allergen3', label: 'Allergen 3 Text', type: 'text', defaultValue: 'nut-free' },
      { id: 'allergen3Color', label: 'Allergen 3 Color', type: 'color', defaultValue: '#f97316' },
      { id: 'allergen4', label: 'Allergen 4 Text', type: 'text', defaultValue: 'egg-free' },
      { id: 'allergen4Color', label: 'Allergen 4 Color', type: 'color', defaultValue: '#14b8a6' },
      { id: 'badgeBg', label: 'Badge Background', type: 'color', defaultValue: '#fef08a' },
      { id: 'badgeText', label: 'Badge Text Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('falb')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('falb')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('falb')}-wrap { display: grid; grid-template-columns: 1fr 1fr; max-width: 1000px; margin: 0 auto; min-height: 400px; }
    .${uid('falb')}-content { padding: 60px 48px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('falb')}-badge { display: inline-block; padding: 6px 16px; background: ${v.badgeBg}; color: ${v.badgeText}; font-size: 12px; font-weight: 500; border-radius: 20px; margin-bottom: 16px; width: fit-content; }
    .${uid('falb')}-heading { font-size: 36px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('falb')}-desc { font-size: 15px; color: #666; line-height: 1.7; font-style: italic; }
    .${uid('falb')}-visual { position: relative; display: flex; align-items: center; justify-content: center; }
    .${uid('falb')}-product { position: absolute; left: -40px; width: 120px; height: 120px; border-radius: 50%; overflow: hidden; z-index: 2; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
    .${uid('falb')}-product img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('falb')}-bg { width: 100%; height: 100%; position: relative; }
    .${uid('falb')}-bg img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('falb')}-allergens { position: absolute; right: 24px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 16px; }
    .${uid('falb')}-allergen { display: flex; align-items: center; gap: 12px; }
    .${uid('falb')}-allergen-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; }
    .${uid('falb')}-allergen-text { font-size: 14px; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
    @media (max-width: 768px) { .${uid('falb')}-wrap { grid-template-columns: 1fr; } .${uid('falb')}-product { left: 50%; transform: translateX(-50%); top: -60px; } }
  </style>
  <div class="${uid('falb')}-wrap">
    <div class="${uid('falb')}-content">
      <span class="${uid('falb')}-badge">${v.badge}</span>
      <h2 class="${uid('falb')}-heading">${v.heading}</h2>
      <p class="${uid('falb')}-desc">${v.description}</p>
    </div>
    <div class="${uid('falb')}-visual">
      <div class="${uid('falb')}-product"><img src="${v.productImage}" alt=""></div>
      <div class="${uid('falb')}-bg">
        <img src="${v.bgImage}" alt="">
        <div class="${uid('falb')}-allergens">
          <div class="${uid('falb')}-allergen">
            <div class="${uid('falb')}-allergen-icon" style="background:${v.allergen1Color}">🥛</div>
            <span class="${uid('falb')}-allergen-text">${v.allergen1}</span>
          </div>
          <div class="${uid('falb')}-allergen">
            <div class="${uid('falb')}-allergen-icon" style="background:${v.allergen2Color}">🌾</div>
            <span class="${uid('falb')}-allergen-text">${v.allergen2}</span>
          </div>
          <div class="${uid('falb')}-allergen">
            <div class="${uid('falb')}-allergen-icon" style="background:${v.allergen3Color}">🥜</div>
            <span class="${uid('falb')}-allergen-text">${v.allergen3}</span>
          </div>
          <div class="${uid('falb')}-allergen">
            <div class="${uid('falb')}-allergen-icon" style="background:${v.allergen4Color}">🥚</div>
            <span class="${uid('falb')}-allergen-text">${v.allergen4}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
  },

  // 23. Instagram Feed Grid
  {
    id: 'instagram-feed-grid',
    name: 'Social - Instagram Feed',
    category: 'Social',
    description: 'Instagram-style grid with heading and username button',
    thumbnail: '',
    fields: [
      { id: 'label', label: 'Top Label', type: 'text', defaultValue: 'FOLLOW US ON SOCIALS' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Tune in, for good stuff.' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Sales, music, events and more...' },
      { id: 'subtextAccent', label: 'Subtext Accent Word', type: 'text', defaultValue: 'music' },
      { id: 'username', label: 'Username', type: 'text', defaultValue: '@undabrand' },
      { id: 'usernameLink', label: 'Username Link', type: 'url', defaultValue: '#' },
      { id: 'img1', label: 'Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'img2', label: 'Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'img3', label: 'Image 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'img4', label: 'Image 4', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'img5', label: 'Image 5', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'img6', label: 'Image 6', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png' },
      { id: 'img7', label: 'Image 7', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png' },
      { id: 'img8', label: 'Image 8', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#d97706' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('igfd')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('igfd')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('igfd')}-wrap { max-width: 900px; margin: 0 auto; padding: 48px 24px; }
    .${uid('igfd')}-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .${uid('igfd')}-left { }
    .${uid('igfd')}-label { font-size: 11px; color: #999; letter-spacing: 0.1em; margin-bottom: 8px; }
    .${uid('igfd')}-heading { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('igfd')}-subtext { font-size: 14px; color: #666; }
    .${uid('igfd')}-subtext .accent { color: ${v.accentColor}; }
    .${uid('igfd')}-btn { display: inline-block; padding: 10px 20px; background: ${v.buttonBg}; color: #fff; font-size: 13px; text-decoration: none; border-radius: 4px; }
    .${uid('igfd')}-grid { display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(3, 100px); gap: 8px; }
    .${uid('igfd')}-img { border-radius: 8px; overflow: hidden; }
    .${uid('igfd')}-img img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('igfd')}-img.tall { grid-row: span 2; }
    .${uid('igfd')}-img.wide { grid-column: span 2; }
    @media (max-width: 768px) { .${uid('igfd')}-grid { grid-template-columns: repeat(3, 1fr); grid-template-rows: auto; } .${uid('igfd')}-img.tall, .${uid('igfd')}-img.wide { grid-row: span 1; grid-column: span 1; } }
  </style>
  <div class="${uid('igfd')}-wrap">
    <div class="${uid('igfd')}-header">
      <div class="${uid('igfd')}-left">
        <div class="${uid('igfd')}-label">${v.label}</div>
        <h2 class="${uid('igfd')}-heading">${v.heading}</h2>
        <p class="${uid('igfd')}-subtext">Sales, <span class="accent">${v.subtextAccent}</span>, events and more...</p>
      </div>
      <a href="${v.usernameLink}" class="${uid('igfd')}-btn">${v.username}</a>
    </div>
    <div class="${uid('igfd')}-grid">
      <div class="${uid('igfd')}-img"><img src="${v.img1}" alt=""></div>
      <div class="${uid('igfd')}-img tall"><img src="${v.img2}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img3}" alt=""></div>
      <div class="${uid('igfd')}-img tall"><img src="${v.img4}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img5}" alt=""></div>
      <div class="${uid('igfd')}-img tall"><img src="${v.img6}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img7}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img8}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img1}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img3}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img5}" alt=""></div>
      <div class="${uid('igfd')}-img"><img src="${v.img7}" alt=""></div>
    </div>
  </div>
</div>`
  },

  // 24. Split Hero Vertical Marquee
  {
    id: 'hero-vertical-marquee',
    name: 'Hero - Vertical Marquee',
    category: 'Hero',
    description: 'Split hero with vertical scrolling marquee text and product image',
    thumbnail: '',
    fields: [
      { id: 'marqueeText', label: 'Marquee Text', type: 'text', defaultValue: 'just in' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Targeted Solutions' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Whether you struggle with dryness, sensitivity, or acne, our brand has a targeted skincare solution for you. Achieve your healthiest, most balanced complexion.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'LEARN MORE' },
      { id: 'buttonLink', label: 'Button Link', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Hero Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'bgColor', label: 'Left Background', type: 'color', defaultValue: '#f5f5f0' },
      { id: 'marqueeColor', label: 'Marquee Text Color', type: 'color', defaultValue: '#d4d4c8' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: 'transparent' },
      { id: 'buttonBorder', label: 'Button Border', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'buttonTextColor', label: 'Button Text Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('hvmq')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hvmq')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hvmq')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
    .${uid('hvmq')}-left { background: ${v.bgColor}; display: flex; position: relative; overflow: hidden; }
    .${uid('hvmq')}-marquee { position: absolute; right: 0; top: 0; height: 100%; width: 80px; overflow: hidden; }
    .${uid('hvmq')}-marquee-inner { animation: ${uid('hvmq')}-scroll 10s linear infinite; display: flex; flex-direction: column; }
    @keyframes ${uid('hvmq')}-scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
    .${uid('hvmq')}-marquee-text { font-size: 48px; font-weight: 700; color: ${v.marqueeColor}; writing-mode: vertical-rl; text-orientation: mixed; padding: 20px 0; white-space: nowrap; }
    .${uid('hvmq')}-marquee-text::before { content: "• "; }
    .${uid('hvmq')}-content { padding: 80px 60px; display: flex; flex-direction: column; justify-content: flex-end; max-width: 400px; }
    .${uid('hvmq')}-heading { font-size: 36px; font-weight: 700; color: ${v.headingColor}; margin-bottom: 20px; }
    .${uid('hvmq')}-desc { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('hvmq')}-btn { display: inline-block; width: fit-content; padding: 14px 28px; background: ${v.buttonBg}; color: ${v.buttonTextColor}; border: 1px solid ${v.buttonBorder}; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-decoration: none; transition: all 0.3s; }
    .${uid('hvmq')}-btn:hover { background: ${v.buttonBorder}; color: #fff; }
    .${uid('hvmq')}-right { }
    .${uid('hvmq')}-right img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 768px) { .${uid('hvmq')}-wrap { grid-template-columns: 1fr; } .${uid('hvmq')}-left { min-height: 400px; } .${uid('hvmq')}-content { padding: 40px 24px; } }
  </style>
  <div class="${uid('hvmq')}-wrap">
    <div class="${uid('hvmq')}-left">
      <div class="${uid('hvmq')}-content">
        <h2 class="${uid('hvmq')}-heading">${v.heading}</h2>
        <p class="${uid('hvmq')}-desc">${v.description}</p>
        <a href="${v.buttonLink}" class="${uid('hvmq')}-btn">${v.buttonText}</a>
      </div>
      <div class="${uid('hvmq')}-marquee">
        <div class="${uid('hvmq')}-marquee-inner">
          <span class="${uid('hvmq')}-marquee-text">${v.marqueeText}</span>
          <span class="${uid('hvmq')}-marquee-text">${v.marqueeText}</span>
          <span class="${uid('hvmq')}-marquee-text">${v.marqueeText}</span>
          <span class="${uid('hvmq')}-marquee-text">${v.marqueeText}</span>
          <span class="${uid('hvmq')}-marquee-text">${v.marqueeText}</span>
          <span class="${uid('hvmq')}-marquee-text">${v.marqueeText}</span>
        </div>
      </div>
    </div>
    <div class="${uid('hvmq')}-right">
      <img src="${v.image}" alt="">
    </div>
  </div>
</div>`
  },

  // ========== 11 NEW SECTIONS ADDED 2026-01-17 ==========

  {
    id: 'results-before-after-grid',
    name: 'Results - Before/After Cards Grid',
    category: 'Product',
    description: 'Grid of before/after treatment result cards with time badges and toggle buttons',
    thumbnail: '',
    fields: [
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Visible results in weeks' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'badgeColor', label: 'Time Badge Color', type: 'color', defaultValue: '#8B7355' },
      { id: 'toggleActiveColor', label: 'Toggle Active Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'card1Image', label: 'Card 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Keratin treatment' },
      { id: 'card1Time', label: 'Card 1 Time Badge', type: 'text', defaultValue: '4 weeks' },
      { id: 'card2Image', label: 'Card 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Brazilian blowout' },
      { id: 'card2Time', label: 'Card 2 Time Badge', type: 'text', defaultValue: '4 weeks' },
      { id: 'card3Image', label: 'Card 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Keratin treatment' },
      { id: 'card3Time', label: 'Card 3 Time Badge', type: 'text', defaultValue: '2 weeks' },
      { id: 'card4Image', label: 'Card 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'card4Title', label: 'Card 4 Title', type: 'text', defaultValue: 'Botox treatment' },
      { id: 'card4Time', label: 'Card 4 Time Badge', type: 'text', defaultValue: '6 weeks' },
    ],
    generateHtml: (v) => `<div class="${uid('rbag')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('rbag')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('rbag')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('rbag')}-heading { font-size: 36px; font-weight: 600; color: ${v.headingColor}; text-align: center; margin-bottom: 48px; }
    .${uid('rbag')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .${uid('rbag')}-card { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 3/4; }
    .${uid('rbag')}-card img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('rbag')}-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: ${v.badgeColor}; color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; }
    .${uid('rbag')}-title { position: absolute; bottom: 70px; left: 20px; right: 20px; color: #fff; font-size: 18px; font-weight: 600; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
    .${uid('rbag')}-toggle { position: absolute; bottom: 20px; left: 20px; display: flex; background: rgba(255,255,255,0.9); border-radius: 25px; overflow: hidden; }
    .${uid('rbag')}-toggle-btn { padding: 8px 16px; font-size: 12px; font-weight: 500; border: none; background: transparent; cursor: pointer; transition: all 0.2s; }
    .${uid('rbag')}-toggle-btn.active { background: ${v.toggleActiveColor}; color: #fff; border-radius: 25px; }
    @media (max-width: 900px) { .${uid('rbag')}-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 500px) { .${uid('rbag')}-grid { grid-template-columns: 1fr; } .${uid('rbag')}-heading { font-size: 28px; } }
  </style>
  <div class="${uid('rbag')}-wrap">
    <h2 class="${uid('rbag')}-heading">${v.heading}</h2>
    <div class="${uid('rbag')}-grid">
      <div class="${uid('rbag')}-card">
        <img src="${v.card1Image}" alt="${v.card1Title}">
        <span class="${uid('rbag')}-badge">${v.card1Time}</span>
        <div class="${uid('rbag')}-title">${v.card1Title}</div>
        <div class="${uid('rbag')}-toggle"><button class="${uid('rbag')}-toggle-btn active">Before</button><button class="${uid('rbag')}-toggle-btn">After</button></div>
      </div>
      <div class="${uid('rbag')}-card">
        <img src="${v.card2Image}" alt="${v.card2Title}">
        <span class="${uid('rbag')}-badge">${v.card2Time}</span>
        <div class="${uid('rbag')}-title">${v.card2Title}</div>
        <div class="${uid('rbag')}-toggle"><button class="${uid('rbag')}-toggle-btn active">Before</button><button class="${uid('rbag')}-toggle-btn">After</button></div>
      </div>
      <div class="${uid('rbag')}-card">
        <img src="${v.card3Image}" alt="${v.card3Title}">
        <span class="${uid('rbag')}-badge">${v.card3Time}</span>
        <div class="${uid('rbag')}-title">${v.card3Title}</div>
        <div class="${uid('rbag')}-toggle"><button class="${uid('rbag')}-toggle-btn">Before</button><button class="${uid('rbag')}-toggle-btn active">After</button></div>
      </div>
      <div class="${uid('rbag')}-card">
        <img src="${v.card4Image}" alt="${v.card4Title}">
        <span class="${uid('rbag')}-badge">${v.card4Time}</span>
        <div class="${uid('rbag')}-title">${v.card4Title}</div>
        <div class="${uid('rbag')}-toggle"><button class="${uid('rbag')}-toggle-btn">Before</button><button class="${uid('rbag')}-toggle-btn active">After</button></div>
      </div>
    </div>
  </div>
</div>`
  },

  {
    id: 'lifestyle-mosaic-text',
    name: 'Gallery - Lifestyle Mosaic with Text',
    category: 'Gallery',
    description: 'Green sidebar with heading and CTA button plus 6-image mosaic grid',
    thumbnail: '',
    fields: [
      { id: 'sidebarColor', label: 'Sidebar Color', type: 'color', defaultValue: '#5B8C51' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Take it anywhere. Own for a lifetime.' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'NTL creates products that inspire conscious living. It rejects mindless consumerism, choosing not to participate in seasonal sales.' },
      { id: 'descColor', label: 'Description Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'GET IT NOW →' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'buttonColor', label: 'Button Text Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'image1', label: 'Image 1 (Top Left)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'image2', label: 'Image 2 (Top Middle)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'image3', label: 'Image 3 (Top Right)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'image4', label: 'Image 4 (Bottom Left)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'image5', label: 'Image 5 (Bottom Middle)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'image6', label: 'Image 6 (Bottom Right)', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png' },
    ],
    generateHtml: (v) => `<div class="${uid('lmtx')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('lmtx')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('lmtx')}-wrap { display: grid; grid-template-columns: 1fr 2fr; min-height: 500px; }
    .${uid('lmtx')}-sidebar { background: ${v.sidebarColor}; padding: 60px 40px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('lmtx')}-heading { font-size: 42px; font-weight: 400; color: ${v.headingColor}; line-height: 1.2; margin-bottom: 24px; }
    .${uid('lmtx')}-desc { font-size: 14px; color: ${v.descColor}; line-height: 1.7; margin-bottom: 32px; opacity: 0.9; }
    .${uid('lmtx')}-btn { display: inline-flex; align-items: center; gap: 8px; background: ${v.buttonBg}; color: ${v.buttonColor}; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; transition: all 0.3s; }
    .${uid('lmtx')}-btn:hover { transform: translateY(-2px); opacity: 0.9; }
    .${uid('lmtx')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); }
    .${uid('lmtx')}-grid img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 900px) { .${uid('lmtx')}-wrap { grid-template-columns: 1fr; } .${uid('lmtx')}-sidebar { padding: 40px 24px; } .${uid('lmtx')}-heading { font-size: 32px; } }
  </style>
  <div class="${uid('lmtx')}-wrap">
    <div class="${uid('lmtx')}-sidebar">
      <h2 class="${uid('lmtx')}-heading">${v.heading}</h2>
      <p class="${uid('lmtx')}-desc">${v.description}</p>
      <a href="#" class="${uid('lmtx')}-btn">${v.buttonText}</a>
    </div>
    <div class="${uid('lmtx')}-grid">
      <img src="${v.image1}" alt="">
      <img src="${v.image2}" alt="">
      <img src="${v.image3}" alt="">
      <img src="${v.image4}" alt="">
      <img src="${v.image5}" alt="">
      <img src="${v.image6}" alt="">
    </div>
  </div>
</div>`
  },

  {
    id: 'results-circular-stats',
    name: 'Trust - Results with Circular Stats',
    category: 'Trust',
    description: 'Split layout with product image and circular percentage progress indicators',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f5f5f5' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'headingLeft', label: 'Left Heading', type: 'text', defaultValue: 'Results' },
      { id: 'descLeft', label: 'Left Description', type: 'textarea', defaultValue: 'Talk about results of your customers and how your product improved their life.' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'headingRight', label: 'Right Heading', type: 'text', defaultValue: 'Results' },
      { id: 'circleColor', label: 'Circle Progress Color', type: 'color', defaultValue: '#6B7C5E' },
      { id: 'stat1Percent', label: 'Stat 1 Percentage', type: 'text', defaultValue: '92%' },
      { id: 'stat1Text', label: 'Stat 1 Text', type: 'text', defaultValue: 'Reported a noticeable reduction in fine lines and wrinkles.' },
      { id: 'stat2Percent', label: 'Stat 2 Percentage', type: 'text', defaultValue: '87%' },
      { id: 'stat2Text', label: 'Stat 2 Text', type: 'text', defaultValue: 'Saw a significant improvement in skin tone and texture.' },
      { id: 'stat3Percent', label: 'Stat 3 Percentage', type: 'text', defaultValue: '83%' },
      { id: 'stat3Text', label: 'Stat 3 Text', type: 'text', defaultValue: 'Experienced a reduction in blemishes and breakouts.' },
      { id: 'footnote', label: 'Footnote', type: 'text', defaultValue: '*These results are a testament to personalized skincare' },
    ],
    generateHtml: (v) => `<div class="${uid('rcst')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('rcst')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('rcst')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('rcst')}-card { background: ${v.cardBg}; border-radius: 20px; padding: 48px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center; }
    .${uid('rcst')}-left h2 { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('rcst')}-left p { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 24px; }
    .${uid('rcst')}-left img { width: 100%; max-width: 400px; border-radius: 12px; }
    .${uid('rcst')}-right h3 { font-size: 28px; font-weight: 700; color: #1a1a1a; margin-bottom: 32px; }
    .${uid('rcst')}-stat { display: flex; align-items: center; gap: 20px; padding: 20px 0; border-bottom: 1px solid #e5e5e5; }
    .${uid('rcst')}-stat:last-of-type { border-bottom: none; }
    .${uid('rcst')}-circle { width: 70px; height: 70px; border-radius: 50%; border: 4px solid #e5e5e5; border-top-color: ${v.circleColor}; border-right-color: ${v.circleColor}; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #1a1a1a; flex-shrink: 0; }
    .${uid('rcst')}-stat-text { font-size: 14px; color: #444; line-height: 1.5; }
    .${uid('rcst')}-footnote { font-size: 12px; color: #888; margin-top: 24px; font-style: italic; }
    @media (max-width: 900px) { .${uid('rcst')}-card { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('rcst')}-wrap">
    <div class="${uid('rcst')}-card">
      <div class="${uid('rcst')}-left">
        <h2>${v.headingLeft}</h2>
        <p>${v.descLeft}</p>
        <img src="${v.image}" alt="">
      </div>
      <div class="${uid('rcst')}-right">
        <h3>${v.headingRight}</h3>
        <div class="${uid('rcst')}-stat"><div class="${uid('rcst')}-circle">${v.stat1Percent}</div><div class="${uid('rcst')}-stat-text">${v.stat1Text}</div></div>
        <div class="${uid('rcst')}-stat"><div class="${uid('rcst')}-circle">${v.stat2Percent}</div><div class="${uid('rcst')}-stat-text">${v.stat2Text}</div></div>
        <div class="${uid('rcst')}-stat"><div class="${uid('rcst')}-circle">${v.stat3Percent}</div><div class="${uid('rcst')}-stat-text">${v.stat3Text}</div></div>
        <p class="${uid('rcst')}-footnote">${v.footnote}</p>
      </div>
    </div>
  </div>
</div>`
  },

  {
    id: 'before-after-tabs-slider',
    name: 'Product - Before/After Comparison Tabs',
    category: 'Product',
    description: 'Before/after comparison with week tabs and slider control',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'heading', label: 'Main Heading', type: 'text', defaultValue: '90% hair reduction in 4 weeks' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'tab1Text', label: 'Tab 1 Text', type: 'text', defaultValue: 'Weeks 1-4' },
      { id: 'tab2Text', label: 'Tab 2 Text', type: 'text', defaultValue: 'Weeks 4-8' },
      { id: 'tabActiveColor', label: 'Tab Active Background', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'subheading', label: 'Subheading', type: 'text', defaultValue: 'Weeks 1-4' },
      { id: 'treatments', label: 'Treatments Text', type: 'text', defaultValue: '3 treatments per week' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Experience a noticeable reduction in hair growth within just a few weeks.' },
      { id: 'beforeImage', label: 'Before Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'afterImage', label: 'After Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'beforeLabel', label: 'Before Label', type: 'text', defaultValue: 'Before' },
      { id: 'afterLabel', label: 'After Label', type: 'text', defaultValue: 'Week 4' },
      { id: 'disclaimer', label: 'Disclaimer Text', type: 'textarea', defaultValue: '*Individual results may vary based on factors such as hair and skin type, hair growth cycle, and frequency of use.' },
    ],
    generateHtml: (v) => `<div class="${uid('bats')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('bats')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bats')}-wrap { max-width: 1100px; margin: 0 auto; padding: 60px 24px; }
    .${uid('bats')}-heading { font-size: 36px; font-weight: 600; color: ${v.headingColor}; text-align: center; margin-bottom: 32px; }
    .${uid('bats')}-tabs { display: flex; justify-content: center; gap: 0; margin-bottom: 48px; }
    .${uid('bats')}-tab { padding: 14px 32px; font-size: 15px; font-weight: 500; border: 1px solid #ddd; background: #fff; cursor: pointer; transition: all 0.2s; }
    .${uid('bats')}-tab:first-child { border-radius: 30px 0 0 30px; }
    .${uid('bats')}-tab:last-child { border-radius: 0 30px 30px 0; border-left: none; }
    .${uid('bats')}-tab.active { background: ${v.tabActiveColor}; color: #fff; border-color: ${v.tabActiveColor}; }
    .${uid('bats')}-content { display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px; align-items: center; }
    .${uid('bats')}-info h3 { font-size: 28px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('bats')}-info .treatments { font-size: 16px; color: #888; margin-bottom: 20px; }
    .${uid('bats')}-info p { font-size: 15px; color: #444; line-height: 1.6; }
    .${uid('bats')}-comparison { position: relative; border-radius: 20px; overflow: hidden; background: linear-gradient(135deg, #d4c4b0 0%, #a89080 100%); }
    .${uid('bats')}-images { display: flex; }
    .${uid('bats')}-images img { width: 50%; height: 400px; object-fit: cover; }
    .${uid('bats')}-label { position: absolute; top: 16px; padding: 6px 12px; font-size: 12px; font-weight: 500; color: #fff; background: rgba(0,0,0,0.5); border-radius: 4px; }
    .${uid('bats')}-label.before { left: 16px; }
    .${uid('bats')}-label.after { right: 16px; }
    .${uid('bats')}-slider { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: ew-resize; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    .${uid('bats')}-slider::before, .${uid('bats')}-slider::after { content: ''; width: 8px; height: 8px; border: 2px solid #666; border-top: none; border-right: none; }
    .${uid('bats')}-slider::before { transform: rotate(45deg); margin-right: 4px; }
    .${uid('bats')}-slider::after { transform: rotate(-135deg); margin-left: 4px; }
    .${uid('bats')}-disclaimer { position: absolute; bottom: 16px; left: 16px; right: 16px; font-size: 11px; color: rgba(255,255,255,0.8); text-align: center; }
    @media (max-width: 800px) { .${uid('bats')}-content { grid-template-columns: 1fr; } .${uid('bats')}-heading { font-size: 28px; } }
  </style>
  <div class="${uid('bats')}-wrap">
    <h2 class="${uid('bats')}-heading">${v.heading}</h2>
    <div class="${uid('bats')}-tabs">
      <button class="${uid('bats')}-tab active">${v.tab1Text}</button>
      <button class="${uid('bats')}-tab">${v.tab2Text}</button>
    </div>
    <div class="${uid('bats')}-content">
      <div class="${uid('bats')}-info">
        <h3>${v.subheading}</h3>
        <div class="treatments">${v.treatments}</div>
        <p>${v.description}</p>
      </div>
      <div class="${uid('bats')}-comparison">
        <div class="${uid('bats')}-images">
          <img src="${v.beforeImage}" alt="Before">
          <img src="${v.afterImage}" alt="After">
        </div>
        <span class="${uid('bats')}-label before">${v.beforeLabel}</span>
        <span class="${uid('bats')}-label after">${v.afterLabel}</span>
        <div class="${uid('bats')}-slider"></div>
        <div class="${uid('bats')}-disclaimer">${v.disclaimer}</div>
      </div>
    </div>
  </div>
</div>`
  },

  {
    id: 'hero-sale-logo-marquee',
    name: 'Hero - Sale Banner with Logo Marquee',
    category: 'Hero',
    description: 'Hero banner with sale text, CTA button, and scrolling publication logos',
    thumbnail: '',
    fields: [
      { id: 'bgImage', label: 'Background Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png' },
      { id: 'overlayOpacity', label: 'Overlay Opacity (0-1)', type: 'text', defaultValue: '0.3' },
      { id: 'rating', label: 'Rating Stars', type: 'text', defaultValue: '★★★★★' },
      { id: 'ratingText', label: 'Rating Text', type: 'text', defaultValue: '4.9/5 from 2000+ reviews' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Get up to 35% off Fall Sale' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Be party ready with a festive new style. Get ready accessories and more. Shop now and save.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop sale' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'marqueeColor', label: 'Marquee Background', type: 'color', defaultValue: '#f5f5f5' },
      { id: 'logo1', label: 'Logo 1 Text', type: 'text', defaultValue: 'NewScientist' },
      { id: 'logo2', label: 'Logo 2 Text', type: 'text', defaultValue: 'marie claire' },
      { id: 'logo3', label: 'Logo 3 Text', type: 'text', defaultValue: 'COSMOPOLITAN' },
      { id: 'logo4', label: 'Logo 4 Text', type: 'text', defaultValue: 'GLAMOUR' },
    ],
    generateHtml: (v) => `<div class="${uid('hslm')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hslm')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hslm')}-hero { position: relative; min-height: 400px; background: url('${v.bgImage}') center/cover no-repeat; display: flex; align-items: center; }
    .${uid('hslm')}-hero::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,${v.overlayOpacity}); }
    .${uid('hslm')}-content { position: relative; z-index: 1; max-width: 500px; padding: 60px 48px; }
    .${uid('hslm')}-rating { font-size: 14px; color: #f5a623; margin-bottom: 8px; }
    .${uid('hslm')}-rating span { color: #666; margin-left: 8px; }
    .${uid('hslm')}-heading { font-size: 42px; font-weight: 600; color: ${v.headingColor}; line-height: 1.2; margin-bottom: 16px; }
    .${uid('hslm')}-desc { font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 24px; }
    .${uid('hslm')}-btn { display: inline-block; background: ${v.buttonBg}; color: #fff; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 600; transition: all 0.3s; }
    .${uid('hslm')}-btn:hover { transform: translateY(-2px); opacity: 0.9; }
    .${uid('hslm')}-marquee { background: ${v.marqueeColor}; padding: 16px 0; overflow: hidden; white-space: nowrap; }
    .${uid('hslm')}-marquee-inner { display: inline-flex; animation: ${uid('hslm')}-scroll 20s linear infinite; }
    .${uid('hslm')}-logo { padding: 0 40px; font-size: 14px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1px; }
    .${uid('hslm')}-logo.highlight { background: #1a1a1a; color: #fff; padding: 8px 20px; border-radius: 4px; margin: 0 20px; }
    @keyframes ${uid('hslm')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @media (max-width: 600px) { .${uid('hslm')}-heading { font-size: 32px; } .${uid('hslm')}-content { padding: 40px 24px; } }
  </style>
  <div class="${uid('hslm')}-hero">
    <div class="${uid('hslm')}-content">
      <div class="${uid('hslm')}-rating">${v.rating}<span>${v.ratingText}</span></div>
      <h1 class="${uid('hslm')}-heading">${v.heading}</h1>
      <p class="${uid('hslm')}-desc">${v.description}</p>
      <a href="#" class="${uid('hslm')}-btn">${v.buttonText}</a>
    </div>
  </div>
  <div class="${uid('hslm')}-marquee">
    <div class="${uid('hslm')}-marquee-inner">
      <span class="${uid('hslm')}-logo">${v.logo1}</span>
      <span class="${uid('hslm')}-logo highlight">${v.logo2}</span>
      <span class="${uid('hslm')}-logo">${v.logo3}</span>
      <span class="${uid('hslm')}-logo">${v.logo4}</span>
      <span class="${uid('hslm')}-logo">${v.logo1}</span>
      <span class="${uid('hslm')}-logo highlight">${v.logo2}</span>
      <span class="${uid('hslm')}-logo">${v.logo3}</span>
      <span class="${uid('hslm')}-logo">${v.logo4}</span>
    </div>
  </div>
</div>`
  },

  {
    id: 'how-it-works-split-accordion',
    name: 'Features - How It Works Split Accordion',
    category: 'Features',
    description: 'Split layout with large lifestyle image and numbered accordion features',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'image', label: 'Left Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'HOW IT WORKS' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'numberColor', label: 'Number Color', type: 'color', defaultValue: '#888' },
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'BREAKS DOWN FOOD' },
      { id: 'feature1Text', label: 'Feature 1 Description', type: 'textarea', defaultValue: 'Our proprietary enzyme blend helps break down proteins, carbs, and fats for better nutrient absorption.' },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'REDUCES GAS' },
      { id: 'feature2Text', label: 'Feature 2 Description', type: 'textarea', defaultValue: 'Specialized enzymes target gas-producing foods to minimize bloating and discomfort.' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'IMPROVES GUT HEALTH' },
      { id: 'feature3Text', label: 'Feature 3 Description', type: 'textarea', defaultValue: 'Supports a healthy digestive system and promotes beneficial gut bacteria growth.' },
    ],
    generateHtml: (v) => `<div class="${uid('hiwsa')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hiwsa')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hiwsa')}-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
    .${uid('hiwsa')}-image { position: relative; }
    .${uid('hiwsa')}-image img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('hiwsa')}-content { padding: 60px 48px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('hiwsa')}-heading { font-size: 36px; font-weight: 400; color: ${v.headingColor}; letter-spacing: 4px; margin-bottom: 48px; }
    .${uid('hiwsa')}-item { border-bottom: 1px solid #e5e5e5; }
    .${uid('hiwsa')}-item-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; cursor: pointer; }
    .${uid('hiwsa')}-item-title { display: flex; align-items: center; gap: 16px; }
    .${uid('hiwsa')}-num { font-size: 14px; color: ${v.numberColor}; font-weight: 500; }
    .${uid('hiwsa')}-title { font-size: 16px; font-weight: 600; color: #1a1a1a; letter-spacing: 1px; }
    .${uid('hiwsa')}-plus { font-size: 24px; color: #888; font-weight: 300; }
    .${uid('hiwsa')}-item-content { padding: 0 0 24px 36px; font-size: 14px; color: #666; line-height: 1.7; display: none; }
    .${uid('hiwsa')}-item.open .${uid('hiwsa')}-item-content { display: block; }
    .${uid('hiwsa')}-item.open .${uid('hiwsa')}-plus { transform: rotate(45deg); }
    @media (max-width: 900px) { .${uid('hiwsa')}-wrap { grid-template-columns: 1fr; } .${uid('hiwsa')}-image { height: 400px; } .${uid('hiwsa')}-content { padding: 40px 24px; } }
  </style>
  <div class="${uid('hiwsa')}-wrap">
    <div class="${uid('hiwsa')}-image"><img src="${v.image}" alt=""></div>
    <div class="${uid('hiwsa')}-content">
      <h2 class="${uid('hiwsa')}-heading">${v.heading}</h2>
      <div class="${uid('hiwsa')}-item">
        <div class="${uid('hiwsa')}-item-header"><div class="${uid('hiwsa')}-item-title"><span class="${uid('hiwsa')}-num">01</span><span class="${uid('hiwsa')}-title">${v.feature1Title}</span></div><span class="${uid('hiwsa')}-plus">+</span></div>
        <div class="${uid('hiwsa')}-item-content">${v.feature1Text}</div>
      </div>
      <div class="${uid('hiwsa')}-item">
        <div class="${uid('hiwsa')}-item-header"><div class="${uid('hiwsa')}-item-title"><span class="${uid('hiwsa')}-num">02</span><span class="${uid('hiwsa')}-title">${v.feature2Title}</span></div><span class="${uid('hiwsa')}-plus">+</span></div>
        <div class="${uid('hiwsa')}-item-content">${v.feature2Text}</div>
      </div>
      <div class="${uid('hiwsa')}-item">
        <div class="${uid('hiwsa')}-item-header"><div class="${uid('hiwsa')}-item-title"><span class="${uid('hiwsa')}-num">03</span><span class="${uid('hiwsa')}-title">${v.feature3Title}</span></div><span class="${uid('hiwsa')}-plus">+</span></div>
        <div class="${uid('hiwsa')}-item-content">${v.feature3Text}</div>
      </div>
    </div>
  </div>
</div>`
  },

  {
    id: 'black-friday-countdown-products',
    name: 'CTA - Black Friday Countdown with Products',
    category: 'CTA',
    description: 'Dark themed sale section with countdown timer, italic heading, and product grid',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'timerBg', label: 'Timer Badge Color', type: 'color', defaultValue: '#c8e600' },
      { id: 'timerText', label: 'Timer Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'hours', label: 'Hours', type: 'text', defaultValue: '00' },
      { id: 'minutes', label: 'Minutes', type: 'text', defaultValue: '00' },
      { id: 'seconds', label: 'Seconds', type: 'text', defaultValue: '00' },
      { id: 'expiredText', label: 'Expired Text', type: 'text', defaultValue: 'This offer has expired.' },
      { id: 'headingItalic', label: 'Heading (Italic Part)', type: 'text', defaultValue: 'Black Friday Event' },
      { id: 'headingNormal', label: 'Heading (Normal Part)', type: 'text', defaultValue: 'Up to 30% Off' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'product1Image', label: 'Product 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'product1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Bison Ultralight Jacket' },
      { id: 'product1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$220.00' },
      { id: 'product2Image', label: 'Product 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
      { id: 'product2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Bison Ultralight Vest' },
      { id: 'product2OldPrice', label: 'Product 2 Old Price', type: 'text', defaultValue: '$185.00' },
      { id: 'product2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$148.00' },
      { id: 'product3Image', label: 'Product 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'product3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Bison Zip-Up Jacket' },
      { id: 'product3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$128.00' },
    ],
    generateHtml: (v) => `<div class="${uid('bfcp')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('bfcp')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bfcp')}-wrap { display: grid; grid-template-columns: 1fr 1.2fr; min-height: 600px; }
    .${uid('bfcp')}-left { padding: 60px 48px; display: flex; flex-direction: column; justify-content: center; }
    .${uid('bfcp')}-timer { display: flex; gap: 12px; margin-bottom: 16px; }
    .${uid('bfcp')}-timer-box { background: ${v.timerBg}; color: ${v.timerText}; padding: 16px 20px; border-radius: 8px; text-align: center; min-width: 70px; }
    .${uid('bfcp')}-timer-num { font-size: 28px; font-weight: 700; display: block; }
    .${uid('bfcp')}-timer-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .${uid('bfcp')}-expired { color: #ff4444; font-size: 14px; margin-bottom: 24px; }
    .${uid('bfcp')}-heading { font-size: 56px; color: #fff; line-height: 1.1; margin-bottom: 32px; }
    .${uid('bfcp')}-heading em { font-style: italic; font-weight: 400; display: block; }
    .${uid('bfcp')}-btn { display: inline-block; background: ${v.buttonBg}; color: #1a1a1a; padding: 18px 48px; border-radius: 50px; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 1px; transition: all 0.3s; }
    .${uid('bfcp')}-btn:hover { transform: translateY(-2px); }
    .${uid('bfcp')}-right { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 24px; align-content: start; }
    .${uid('bfcp')}-product { background: #fff; border-radius: 12px; overflow: hidden; }
    .${uid('bfcp')}-product img { width: 100%; aspect-ratio: 1; object-fit: cover; }
    .${uid('bfcp')}-product-info { padding: 16px; }
    .${uid('bfcp')}-product-name { font-size: 14px; font-weight: 500; color: #1a1a1a; margin-bottom: 4px; }
    .${uid('bfcp')}-product-price { font-size: 14px; color: #1a1a1a; }
    .${uid('bfcp')}-product-price .old { text-decoration: line-through; color: #ff4444; margin-right: 8px; }
    @media (max-width: 900px) { .${uid('bfcp')}-wrap { grid-template-columns: 1fr; } .${uid('bfcp')}-heading { font-size: 40px; } }
  </style>
  <div class="${uid('bfcp')}-wrap">
    <div class="${uid('bfcp')}-left">
      <div class="${uid('bfcp')}-timer">
        <div class="${uid('bfcp')}-timer-box"><span class="${uid('bfcp')}-timer-num">${v.hours}</span><span class="${uid('bfcp')}-timer-label">Hours</span></div>
        <div class="${uid('bfcp')}-timer-box"><span class="${uid('bfcp')}-timer-num">${v.minutes}</span><span class="${uid('bfcp')}-timer-label">Minutes</span></div>
        <div class="${uid('bfcp')}-timer-box"><span class="${uid('bfcp')}-timer-num">${v.seconds}</span><span class="${uid('bfcp')}-timer-label">Seconds</span></div>
      </div>
      <p class="${uid('bfcp')}-expired">${v.expiredText}</p>
      <h2 class="${uid('bfcp')}-heading"><em>${v.headingItalic}</em> ${v.headingNormal}</h2>
      <a href="#" class="${uid('bfcp')}-btn">${v.buttonText}</a>
    </div>
    <div class="${uid('bfcp')}-right">
      <div class="${uid('bfcp')}-product"><img src="${v.product1Image}" alt="${v.product1Name}"><div class="${uid('bfcp')}-product-info"><div class="${uid('bfcp')}-product-name">${v.product1Name}</div><div class="${uid('bfcp')}-product-price">${v.product1Price}</div></div></div>
      <div class="${uid('bfcp')}-product"><img src="${v.product2Image}" alt="${v.product2Name}"><div class="${uid('bfcp')}-product-info"><div class="${uid('bfcp')}-product-name">${v.product2Name}</div><div class="${uid('bfcp')}-product-price"><span class="old">${v.product2OldPrice}</span>${v.product2Price}</div></div></div>
      <div class="${uid('bfcp')}-product"><img src="${v.product3Image}" alt="${v.product3Name}"><div class="${uid('bfcp')}-product-info"><div class="${uid('bfcp')}-product-name">${v.product3Name}</div><div class="${uid('bfcp')}-product-price">${v.product3Price}</div></div></div>
    </div>
  </div>
</div>`
  },

  {
    id: 'glow-up-before-after-features',
    name: 'Product - Glow-Up Before/After Features',
    category: 'Product',
    description: 'Product showcase with badge, heading with accent, numbered features, and dual before/after comparisons',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'badge', label: 'Badge Text', type: 'text', defaultValue: 'TEAM FAVOURITE' },
      { id: 'badgeBorder', label: 'Badge Border Color', type: 'color', defaultValue: '#888' },
      { id: 'headingDark', label: 'Heading (Dark)', type: 'text', defaultValue: 'Glow-Up' },
      { id: 'headingLight', label: 'Heading (Light)', type: 'text', defaultValue: 'Without Surgery' },
      { id: 'headingLightColor', label: 'Heading Light Color', type: 'color', defaultValue: '#8BA4A8' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'A second-generation hyaluronic acid serum formulated to deliver instant and long-lasting hydration.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now →' },
      { id: 'buttonBg', label: 'Button Background', type: 'color', defaultValue: '#4A5E60' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#f5f5f5' },
      { id: 'cardBorder', label: 'Card Border Color', type: 'color', defaultValue: '#8BA4A8' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Advanced, multi-layer hydration' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Barrier support with ceramides' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Pro-vitamin B5 (panthenol)' },
      { id: 'feature4', label: 'Feature 4', type: 'text', defaultValue: 'Lightweight, non-tacky texture' },
      { id: 'beforeImage1', label: 'Before Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'afterImage1', label: 'After Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'beforeImage2', label: 'Before Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'afterImage2', label: 'After Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png' },
    ],
    generateHtml: (v) => `<div class="${uid('gubaf')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('gubaf')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('gubaf')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; text-align: center; }
    .${uid('gubaf')}-badge { display: inline-block; border: 1px solid ${v.badgeBorder}; padding: 8px 20px; border-radius: 4px; font-size: 11px; letter-spacing: 2px; color: #666; margin-bottom: 24px; }
    .${uid('gubaf')}-heading { font-size: 48px; font-weight: 400; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('gubaf')}-heading span { color: ${v.headingLightColor}; }
    .${uid('gubaf')}-desc { font-size: 15px; color: #666; max-width: 600px; margin: 0 auto 24px; line-height: 1.6; }
    .${uid('gubaf')}-btn { display: inline-flex; align-items: center; gap: 8px; background: ${v.buttonBg}; color: #fff; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-size: 14px; font-weight: 500; transition: all 0.3s; margin-bottom: 48px; }
    .${uid('gubaf')}-btn:hover { transform: translateY(-2px); opacity: 0.9; }
    .${uid('gubaf')}-card { background: ${v.cardBg}; border-radius: 20px; padding: 40px; border: 2px solid ${v.cardBorder}; display: grid; grid-template-columns: 1fr 2fr; gap: 40px; text-align: left; }
    .${uid('gubaf')}-features { display: flex; flex-direction: column; justify-content: center; }
    .${uid('gubaf')}-feature { display: flex; gap: 16px; align-items: baseline; padding: 16px 0; border-bottom: 1px solid #ddd; }
    .${uid('gubaf')}-feature:last-child { border-bottom: none; }
    .${uid('gubaf')}-feature-num { font-size: 12px; color: ${v.headingLightColor}; }
    .${uid('gubaf')}-feature-text { font-size: 15px; color: #1a1a1a; font-weight: 500; }
    .${uid('gubaf')}-images { display: flex; gap: 16px; }
    .${uid('gubaf')}-comparison { position: relative; flex: 1; border-radius: 12px; overflow: hidden; }
    .${uid('gubaf')}-comparison img { width: 50%; height: 350px; object-fit: cover; float: left; }
    .${uid('gubaf')}-label { position: absolute; top: 12px; padding: 4px 12px; font-size: 11px; font-weight: 500; color: #fff; background: rgba(0,0,0,0.5); border-radius: 4px; text-transform: uppercase; }
    .${uid('gubaf')}-label.before { left: 12px; }
    .${uid('gubaf')}-label.after { right: 12px; }
    .${uid('gubaf')}-divider { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    @media (max-width: 900px) { .${uid('gubaf')}-card { grid-template-columns: 1fr; } .${uid('gubaf')}-heading { font-size: 36px; } }
  </style>
  <div class="${uid('gubaf')}-wrap">
    <div class="${uid('gubaf')}-badge">${v.badge}</div>
    <h2 class="${uid('gubaf')}-heading">${v.headingDark} <span>${v.headingLight}</span></h2>
    <p class="${uid('gubaf')}-desc">${v.description}</p>
    <a href="#" class="${uid('gubaf')}-btn">${v.buttonText}</a>
    <div class="${uid('gubaf')}-card">
      <div class="${uid('gubaf')}-features">
        <div class="${uid('gubaf')}-feature"><span class="${uid('gubaf')}-feature-num">01</span><span class="${uid('gubaf')}-feature-text">${v.feature1}</span></div>
        <div class="${uid('gubaf')}-feature"><span class="${uid('gubaf')}-feature-num">02</span><span class="${uid('gubaf')}-feature-text">${v.feature2}</span></div>
        <div class="${uid('gubaf')}-feature"><span class="${uid('gubaf')}-feature-num">03</span><span class="${uid('gubaf')}-feature-text">${v.feature3}</span></div>
        <div class="${uid('gubaf')}-feature"><span class="${uid('gubaf')}-feature-num">04</span><span class="${uid('gubaf')}-feature-text">${v.feature4}</span></div>
      </div>
      <div class="${uid('gubaf')}-images">
        <div class="${uid('gubaf')}-comparison"><img src="${v.beforeImage1}" alt="Before"><img src="${v.afterImage1}" alt="After"><span class="${uid('gubaf')}-label before">Before</span><span class="${uid('gubaf')}-label after">After</span><div class="${uid('gubaf')}-divider">◯</div></div>
        <div class="${uid('gubaf')}-comparison"><img src="${v.beforeImage2}" alt="Before"><img src="${v.afterImage2}" alt="After"><span class="${uid('gubaf')}-label before">Before</span><span class="${uid('gubaf')}-label after">After</span><div class="${uid('gubaf')}-divider">◯</div></div>
      </div>
    </div>
  </div>
</div>`
  },

  {
    id: 'product-features-icons-light',
    name: 'Product - Features with Icons (Light)',
    category: 'Product',
    description: 'Product showcase with image on left and icon-based feature list on right',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Pure Ceremonial Energy.' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Experience the vibrant flavor and focused calm that sets our stone-ground ceremonial grade matcha apart.' },
      { id: 'productImage', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'iconColor', label: 'Icon Color', type: 'color', defaultValue: '#4A6741' },
      { id: 'feature1Icon', label: 'Feature 1 Icon', type: 'text', defaultValue: '✓' },
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Authentic Japanese Origin' },
      { id: 'feature1Text', label: 'Feature 1 Description', type: 'textarea', defaultValue: 'Sourced directly from heritage organic farms in Uji, Japan, ensuring traditional cultivation and authentic taste.' },
      { id: 'feature2Icon', label: 'Feature 2 Icon', type: 'text', defaultValue: '★' },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Sustained Energy & Focus' },
      { id: 'feature2Text', label: 'Feature 2 Description', type: 'textarea', defaultValue: 'Rich in L-Theanine to promote relaxation and mental clarity without the crash associated with coffee.' },
      { id: 'feature3Icon', label: 'Feature 3 Icon', type: 'text', defaultValue: '🌿' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Ceremonial Grade Quality' },
      { id: 'feature3Text', label: 'Feature 3 Description', type: 'textarea', defaultValue: 'Only the youngest, shade-grown tea leaves are stone-ground to preserve vibrant color and nutrients.' },
      { id: 'feature4Icon', label: 'Feature 4 Icon', type: 'text', defaultValue: '♻' },
      { id: 'feature4Title', label: 'Feature 4 Title', type: 'text', defaultValue: 'Rich in Antioxidants' },
      { id: 'feature4Text', label: 'Feature 4 Description', type: 'textarea', defaultValue: 'Packed with catechins and EGCG to support metabolism, immunity, and overall cellular health.' },
    ],
    generateHtml: (v) => `<div class="${uid('pfil')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('pfil')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pfil')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 24px; align-items: center; }
    .${uid('pfil')}-image img { width: 100%; max-width: 400px; margin: 0 auto; display: block; }
    .${uid('pfil')}-content h2 { font-size: 42px; font-weight: 400; color: ${v.headingColor}; margin-bottom: 16px; }
    .${uid('pfil')}-content > p { font-size: 15px; color: #666; line-height: 1.6; margin-bottom: 40px; }
    .${uid('pfil')}-features { display: flex; flex-direction: column; gap: 24px; }
    .${uid('pfil')}-feature { display: flex; gap: 16px; }
    .${uid('pfil')}-icon { width: 32px; height: 32px; background: ${v.iconColor}; color: #fff; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
    .${uid('pfil')}-feature-content h4 { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; }
    .${uid('pfil')}-feature-content p { font-size: 13px; color: #666; line-height: 1.6; }
    @media (max-width: 800px) { .${uid('pfil')}-wrap { grid-template-columns: 1fr; } .${uid('pfil')}-content h2 { font-size: 32px; } }
  </style>
  <div class="${uid('pfil')}-wrap">
    <div class="${uid('pfil')}-image"><img src="${v.productImage}" alt=""></div>
    <div class="${uid('pfil')}-content">
      <h2>${v.heading}</h2>
      <p>${v.description}</p>
      <div class="${uid('pfil')}-features">
        <div class="${uid('pfil')}-feature"><div class="${uid('pfil')}-icon">${v.feature1Icon}</div><div class="${uid('pfil')}-feature-content"><h4>${v.feature1Title}</h4><p>${v.feature1Text}</p></div></div>
        <div class="${uid('pfil')}-feature"><div class="${uid('pfil')}-icon">${v.feature2Icon}</div><div class="${uid('pfil')}-feature-content"><h4>${v.feature2Title}</h4><p>${v.feature2Text}</p></div></div>
        <div class="${uid('pfil')}-feature"><div class="${uid('pfil')}-icon">${v.feature3Icon}</div><div class="${uid('pfil')}-feature-content"><h4>${v.feature3Title}</h4><p>${v.feature3Text}</p></div></div>
        <div class="${uid('pfil')}-feature"><div class="${uid('pfil')}-icon">${v.feature4Icon}</div><div class="${uid('pfil')}-feature-content"><h4>${v.feature4Title}</h4><p>${v.feature4Text}</p></div></div>
      </div>
    </div>
  </div>
</div>`
  },

  {
    id: 'dark-tech-features-card',
    name: 'Product - Dark Tech Features Card',
    category: 'Product',
    description: 'Dark themed product card with tech-style features and product image',
    thumbnail: '',
    fields: [
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f5f5f5' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'Engineering Grade 5.' },
      { id: 'headingColor', label: 'Heading Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Forged from aerospace titanium for a lightweight, ultra-durable carry that withstands the demands of the modern world.' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#00B4D8' },
      { id: 'feature1Icon', label: 'Feature 1 Icon', type: 'text', defaultValue: '⚙' },
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Grade 5 Titanium Body' },
      { id: 'feature1Text', label: 'Feature 1 Description', type: 'textarea', defaultValue: 'Twice as strong as steel but 45% lighter. Corrosion-resistant finish designed to last a lifetime.' },
      { id: 'feature2Icon', label: 'Feature 2 Icon', type: 'text', defaultValue: '📡' },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Seamless Integration' },
      { id: 'feature2Text', label: 'Feature 2 Description', type: 'textarea', defaultValue: 'Proprietary local-network sync capability ensures your data stays private and instant.' },
      { id: 'feature3Icon', label: 'Feature 3 Icon', type: 'text', defaultValue: '⚡' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Graphene Battery Tech' },
      { id: 'feature3Text', label: 'Feature 3 Description', type: 'textarea', defaultValue: 'Next-gen power cells provide 14 days of active tracking on a single 20-minute rapid charge.' },
      { id: 'feature4Icon', label: 'Feature 4 Icon', type: 'text', defaultValue: '🔒' },
      { id: 'feature4Title', label: 'Feature 4 Title', type: 'text', defaultValue: 'Biometric Security' },
      { id: 'feature4Text', label: 'Feature 4 Description', type: 'textarea', defaultValue: 'Encrypted pulse-authentication secures your device to your unique biological signature.' },
      { id: 'productImage', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
    ],
    generateHtml: (v) => `<div class="${uid('dtfc')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('dtfc')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('dtfc')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
    .${uid('dtfc')}-card { background: ${v.cardBg}; border-radius: 24px; padding: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
    .${uid('dtfc')}-content h2 { font-size: 42px; font-weight: 400; color: ${v.headingColor}; margin-bottom: 16px; }
    .${uid('dtfc')}-content > p { font-size: 14px; color: #888; line-height: 1.7; margin-bottom: 32px; }
    .${uid('dtfc')}-features { display: flex; flex-direction: column; gap: 24px; }
    .${uid('dtfc')}-feature { display: flex; gap: 16px; }
    .${uid('dtfc')}-icon { width: 28px; height: 28px; border: 1px solid ${v.accentColor}; color: ${v.accentColor}; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
    .${uid('dtfc')}-feature-content h4 { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px; }
    .${uid('dtfc')}-feature-content p { font-size: 13px; color: #888; line-height: 1.6; }
    .${uid('dtfc')}-image { display: flex; align-items: center; justify-content: center; }
    .${uid('dtfc')}-image img { width: 100%; max-width: 450px; border-radius: 16px; }
    @media (max-width: 900px) { .${uid('dtfc')}-card { grid-template-columns: 1fr; } .${uid('dtfc')}-content h2 { font-size: 32px; } }
  </style>
  <div class="${uid('dtfc')}-wrap">
    <div class="${uid('dtfc')}-card">
      <div class="${uid('dtfc')}-content">
        <h2>${v.heading}</h2>
        <p>${v.description}</p>
        <div class="${uid('dtfc')}-features">
          <div class="${uid('dtfc')}-feature"><div class="${uid('dtfc')}-icon">${v.feature1Icon}</div><div class="${uid('dtfc')}-feature-content"><h4>${v.feature1Title}</h4><p>${v.feature1Text}</p></div></div>
          <div class="${uid('dtfc')}-feature"><div class="${uid('dtfc')}-icon">${v.feature2Icon}</div><div class="${uid('dtfc')}-feature-content"><h4>${v.feature2Title}</h4><p>${v.feature2Text}</p></div></div>
          <div class="${uid('dtfc')}-feature"><div class="${uid('dtfc')}-icon">${v.feature3Icon}</div><div class="${uid('dtfc')}-feature-content"><h4>${v.feature3Title}</h4><p>${v.feature3Text}</p></div></div>
          <div class="${uid('dtfc')}-feature"><div class="${uid('dtfc')}-icon">${v.feature4Icon}</div><div class="${uid('dtfc')}-feature-content"><h4>${v.feature4Title}</h4><p>${v.feature4Text}</p></div></div>
        </div>
      </div>
      <div class="${uid('dtfc')}-image"><img src="${v.productImage}" alt=""></div>
    </div>
  </div>
</div>`
  },

  {
    id: 'sleep-wellness-hero',
    name: 'Hero - Sleep Wellness with Trust Badges',
    category: 'Hero',
    description: 'Wellness hero with gradient overlay, rating, trust badges, and dual CTAs',
    thumbnail: '',
    fields: [
      { id: 'bgImage', label: 'Background Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'overlayColor', label: 'Overlay Color', type: 'color', defaultValue: '#1a365d' },
      { id: 'badge', label: 'Top Badge', type: 'text', defaultValue: 'NOW ON SALE' },
      { id: 'badgeBg', label: 'Badge Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'heading1', label: 'Heading Line 1', type: 'text', defaultValue: 'Reduce stress.' },
      { id: 'heading2Italic', label: 'Heading Line 2 (Italic)', type: 'text', defaultValue: 'Sleep peacefully.' },
      { id: 'heading3', label: 'Heading Line 3', type: 'text', defaultValue: 'Carry peace.' },
      { id: 'rating', label: 'Rating', type: 'text', defaultValue: '★★★★★' },
      { id: 'ratingText', label: 'Rating Text', type: 'text', defaultValue: '4.8/5 based on 19,987 reviews' },
      { id: 'trust1', label: 'Trust Badge 1', type: 'text', defaultValue: '✓ Balance nervous system' },
      { id: 'trust2', label: 'Trust Badge 2', type: 'text', defaultValue: '✓ Instant pain relief' },
      { id: 'trust3', label: 'Trust Badge 3', type: 'text', defaultValue: '✓ Clinically tested' },
      { id: 'button1Text', label: 'Button 1 Text', type: 'text', defaultValue: 'SHOP NOW' },
      { id: 'button1Bg', label: 'Button 1 Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'button2Text', label: 'Button 2 Text', type: 'text', defaultValue: 'LEARN MORE' },
      { id: 'button2Border', label: 'Button 2 Border Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'guarantee', label: 'Guarantee Text', type: 'text', defaultValue: '30-Day Money-Back Guarantee' },
    ],
    generateHtml: (v) => `<div class="${uid('swh')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('swh')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('swh')}-wrap { position: relative; min-height: 500px; background: url('${v.bgImage}') right center/cover no-repeat; }
    .${uid('swh')}-wrap::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, ${v.overlayColor} 0%, ${v.overlayColor}dd 40%, transparent 70%); }
    .${uid('swh')}-content { position: relative; z-index: 1; max-width: 550px; padding: 60px 48px; }
    .${uid('swh')}-badge { display: inline-block; background: ${v.badgeBg}; color: #1a1a1a; padding: 6px 16px; border-radius: 4px; font-size: 11px; font-weight: 600; letter-spacing: 1px; margin-bottom: 20px; }
    .${uid('swh')}-heading { font-size: 42px; font-weight: 400; color: #fff; line-height: 1.2; margin-bottom: 16px; }
    .${uid('swh')}-heading em { font-style: italic; }
    .${uid('swh')}-rating { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .${uid('swh')}-stars { color: #ffc107; font-size: 16px; }
    .${uid('swh')}-rating-text { color: #fff; font-size: 13px; opacity: 0.9; }
    .${uid('swh')}-trust { display: flex; gap: 24px; margin-bottom: 28px; flex-wrap: wrap; }
    .${uid('swh')}-trust span { color: #fff; font-size: 13px; opacity: 0.9; }
    .${uid('swh')}-buttons { display: flex; gap: 16px; margin-bottom: 20px; }
    .${uid('swh')}-btn { padding: 14px 32px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; transition: all 0.3s; }
    .${uid('swh')}-btn.primary { background: ${v.button1Bg}; color: #1a1a1a; }
    .${uid('swh')}-btn.secondary { background: transparent; color: #fff; border: 1px solid ${v.button2Border}; }
    .${uid('swh')}-btn:hover { transform: translateY(-2px); }
    .${uid('swh')}-guarantee { display: flex; align-items: center; gap: 8px; color: #fff; font-size: 12px; opacity: 0.8; }
    .${uid('swh')}-guarantee::before { content: '🛡'; }
    @media (max-width: 700px) { .${uid('swh')}-heading { font-size: 32px; } .${uid('swh')}-content { padding: 40px 24px; } .${uid('swh')}-trust { flex-direction: column; gap: 8px; } }
  </style>
  <div class="${uid('swh')}-wrap">
    <div class="${uid('swh')}-content">
      <span class="${uid('swh')}-badge">${v.badge}</span>
      <h1 class="${uid('swh')}-heading">${v.heading1} <em>${v.heading2Italic}</em> ${v.heading3}</h1>
      <div class="${uid('swh')}-rating">
        <span class="${uid('swh')}-stars">${v.rating}</span>
        <span class="${uid('swh')}-rating-text">${v.ratingText}</span>
      </div>
      <div class="${uid('swh')}-trust">
        <span>${v.trust1}</span>
        <span>${v.trust2}</span>
        <span>${v.trust3}</span>
      </div>
      <div class="${uid('swh')}-buttons">
        <a href="#" class="${uid('swh')}-btn primary">${v.button1Text}</a>
        <a href="#" class="${uid('swh')}-btn secondary">${v.button2Text}</a>
      </div>
      <div class="${uid('swh')}-guarantee">${v.guarantee}</div>
    </div>
  </div>
</div>`
  },

  // ========== INTERACTIVE COMPONENTS (21st.dev) ==========
  {
    id: 'display-cards-stacked',
    name: 'Display Cards - Stacked',
    category: 'Interactive',
    description: 'Stacked skewed cards with beautiful hover animations',
    thumbnail: '',
    fields: [
      { id: 'card1Icon', label: 'Card 1 Icon', type: 'text', defaultValue: '✨' },
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Featured' },
      { id: 'card1Desc', label: 'Card 1 Description', type: 'text', defaultValue: 'Discover amazing content' },
      { id: 'card1Date', label: 'Card 1 Date', type: 'text', defaultValue: 'Just now' },
      { id: 'card2Icon', label: 'Card 2 Icon', type: 'text', defaultValue: '🚀' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Trending' },
      { id: 'card2Desc', label: 'Card 2 Description', type: 'text', defaultValue: 'Popular this week' },
      { id: 'card2Date', label: 'Card 2 Date', type: 'text', defaultValue: '2 hours ago' },
      { id: 'card3Icon', label: 'Card 3 Icon', type: 'text', defaultValue: '💎' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Premium' },
      { id: 'card3Desc', label: 'Card 3 Description', type: 'text', defaultValue: 'Exclusive premium content' },
      { id: 'card3Date', label: 'Card 3 Date', type: 'text', defaultValue: '1 day ago' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#3b82f6' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#1a1a2e' },
    ],
    generateHtml: (v) => `<div class="${uid('dcstack')}" style="background:${v.bgColor};min-height:500px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;padding:60px 20px;">
  <style>
    .${uid('dcstack')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('dcstack')}-grid { display: grid; grid-template-areas: 'stack'; place-items: center; }
    .${uid('dcstack')}-card {
      grid-area: stack;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 22rem;
      height: 9rem;
      padding: 16px 20px;
      background: ${v.cardBg};
      border: 2px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      transform: skewY(-8deg);
      transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      overflow: hidden;
    }
    .${uid('dcstack')}-card::after {
      content: '';
      position: absolute;
      right: -4px;
      top: -5%;
      height: 110%;
      width: 20rem;
      background: linear-gradient(to left, ${v.bgColor}, transparent);
      pointer-events: none;
    }
    .${uid('dcstack')}-card.c1 { z-index: 1; filter: grayscale(100%); }
    .${uid('dcstack')}-card.c1::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(10,10,10,0.5);
      border-radius: 14px;
      transition: opacity 0.7s;
    }
    .${uid('dcstack')}-card.c1:hover { transform: skewY(-8deg) translateY(-40px); filter: grayscale(0); }
    .${uid('dcstack')}-card.c1:hover::before { opacity: 0; }
    .${uid('dcstack')}-card.c2 { transform: skewY(-8deg) translateX(64px) translateY(40px); z-index: 2; filter: grayscale(100%); }
    .${uid('dcstack')}-card.c2::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(10,10,10,0.5);
      border-radius: 14px;
      transition: opacity 0.7s;
    }
    .${uid('dcstack')}-card.c2:hover { transform: skewY(-8deg) translateX(64px) translateY(-4px); filter: grayscale(0); }
    .${uid('dcstack')}-card.c2:hover::before { opacity: 0; }
    .${uid('dcstack')}-card.c3 { transform: skewY(-8deg) translateX(128px) translateY(80px); z-index: 3; }
    .${uid('dcstack')}-card.c3:hover { transform: skewY(-8deg) translateX(128px) translateY(40px); }
    .${uid('dcstack')}-row { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
    .${uid('dcstack')}-icon { width: 28px; height: 28px; background: ${v.accentColor}33; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; }
    .${uid('dcstack')}-title { font-size: 18px; font-weight: 600; color: ${v.accentColor}; }
    .${uid('dcstack')}-desc { font-size: 16px; color: #fff; white-space: nowrap; position: relative; z-index: 1; }
    .${uid('dcstack')}-date { font-size: 14px; color: rgba(255,255,255,0.5); position: relative; z-index: 1; }
    @media (max-width: 768px) {
      .${uid('dcstack')}-card { width: 18rem; height: 8rem; }
      .${uid('dcstack')}-card.c2 { transform: skewY(-8deg) translateX(40px) translateY(40px); }
      .${uid('dcstack')}-card.c2:hover { transform: skewY(-8deg) translateX(40px) translateY(-4px); }
      .${uid('dcstack')}-card.c3 { transform: skewY(-8deg) translateX(80px) translateY(80px); }
      .${uid('dcstack')}-card.c3:hover { transform: skewY(-8deg) translateX(80px) translateY(40px); }
    }
    @media (max-width: 480px) {
      .${uid('dcstack')}-card { width: 16rem; height: 7rem; padding: 12px 16px; }
      .${uid('dcstack')}-card.c2 { transform: skewY(-8deg) translateX(24px) translateY(32px); }
      .${uid('dcstack')}-card.c3 { transform: skewY(-8deg) translateX(48px) translateY(64px); }
      .${uid('dcstack')}-title { font-size: 16px; }
      .${uid('dcstack')}-desc { font-size: 14px; }
    }
  </style>
  <div class="${uid('dcstack')}-grid">
    <div class="${uid('dcstack')}-card c1">
      <div class="${uid('dcstack')}-row"><span class="${uid('dcstack')}-icon">${v.card1Icon}</span><span class="${uid('dcstack')}-title">${v.card1Title}</span></div>
      <div class="${uid('dcstack')}-desc">${v.card1Desc}</div>
      <div class="${uid('dcstack')}-date">${v.card1Date}</div>
    </div>
    <div class="${uid('dcstack')}-card c2">
      <div class="${uid('dcstack')}-row"><span class="${uid('dcstack')}-icon">${v.card2Icon}</span><span class="${uid('dcstack')}-title">${v.card2Title}</span></div>
      <div class="${uid('dcstack')}-desc">${v.card2Desc}</div>
      <div class="${uid('dcstack')}-date">${v.card2Date}</div>
    </div>
    <div class="${uid('dcstack')}-card c3">
      <div class="${uid('dcstack')}-row"><span class="${uid('dcstack')}-icon">${v.card3Icon}</span><span class="${uid('dcstack')}-title">${v.card3Title}</span></div>
      <div class="${uid('dcstack')}-desc">${v.card3Desc}</div>
      <div class="${uid('dcstack')}-date">${v.card3Date}</div>
    </div>
  </div>
</div>`
  },

  {
    id: 'animated-underline-text',
    name: 'Animated Underline Text',
    category: 'Interactive',
    description: 'Beautiful text with animated SVG underline effect',
    thumbnail: '',
    fields: [
      { id: 'text', label: 'Headline Text', type: 'text', defaultValue: 'Discover Something Amazing' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'underlineColor', label: 'Underline Color', type: 'color', defaultValue: '#3b82f6' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'fontSize', label: 'Font Size (px)', type: 'number', defaultValue: '48' },
      { id: 'animDuration', label: 'Animation Duration (s)', type: 'number', defaultValue: '1.5' },
    ],
    generateHtml: (v) => `<div class="${uid('anim-ul')}" style="background:${v.bgColor};min-height:400px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;padding:60px 20px;">
  <style>
    .${uid('anim-ul')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('anim-ul')}-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
    .${uid('anim-ul')}-inner { position: relative; display: inline-block; }
    .${uid('anim-ul')}-text {
      font-size: ${v.fontSize}px;
      font-weight: 700;
      color: ${v.textColor};
      text-align: center;
      animation: ${uid('anim-ul')}-fadeIn 0.6s ease-out forwards;
      transition: transform 0.3s ease;
    }
    .${uid('anim-ul')}-inner:hover .${uid('anim-ul')}-text { transform: scale(1.02); }
    .${uid('anim-ul')}-svg {
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 20px;
    }
    .${uid('anim-ul')}-path {
      stroke: ${v.underlineColor};
      stroke-width: 2;
      fill: none;
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      animation: ${uid('anim-ul')}-draw ${v.animDuration}s ease-in-out forwards;
      animation-delay: 0.3s;
    }
    .${uid('anim-ul')}-inner:hover .${uid('anim-ul')}-path {
      animation: ${uid('anim-ul')}-wave 0.8s ease-in-out;
    }
    @keyframes ${uid('anim-ul')}-fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ${uid('anim-ul')}-draw {
      to { stroke-dashoffset: 0; opacity: 1; }
    }
    @keyframes ${uid('anim-ul')}-wave {
      0%, 100% { d: path('M 0,10 Q 75,0 150,10 Q 225,20 300,10'); }
      50% { d: path('M 0,10 Q 75,20 150,10 Q 225,0 300,10'); }
    }
    @media (max-width: 768px) {
      .${uid('anim-ul')}-text { font-size: calc(${v.fontSize}px * 0.7); }
    }
    @media (max-width: 480px) {
      .${uid('anim-ul')}-text { font-size: calc(${v.fontSize}px * 0.5); }
    }
  </style>
  <div class="${uid('anim-ul')}-wrap">
    <div class="${uid('anim-ul')}-inner">
      <h1 class="${uid('anim-ul')}-text">${v.text}</h1>
      <svg class="${uid('anim-ul')}-svg" viewBox="0 0 300 20" preserveAspectRatio="none">
        <path class="${uid('anim-ul')}-path" d="M 0,10 Q 75,0 150,10 Q 225,20 300,10" />
      </svg>
    </div>
  </div>
</div>`
  },

  // ========== CREATIVE PRICING (21st.dev) ==========
  {
    id: 'creative-pricing-handwritten',
    name: 'Creative Pricing - Handwritten',
    category: 'Pricing',
    description: 'Playful hand-drawn style pricing cards with rotation effects',
    thumbnail: '',
    fields: [
      { id: 'tag', label: 'Tag Text', type: 'text', defaultValue: 'Simple Pricing' },
      { id: 'title', label: 'Title', type: 'text', defaultValue: 'Make Short Videos That Pop' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Edit, enhance, and go viral in minutes' },
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Basic' },
      { id: 'plan1Price', label: 'Plan 1 Price', type: 'text', defaultValue: '9' },
      { id: 'plan1Desc', label: 'Plan 1 Description', type: 'text', defaultValue: 'For casual creators' },
      { id: 'plan1Features', label: 'Plan 1 Features (comma separated)', type: 'textarea', defaultValue: '5 video exports/month,Basic templates,720p quality' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Pro' },
      { id: 'plan2Price', label: 'Plan 2 Price', type: 'text', defaultValue: '29' },
      { id: 'plan2Desc', label: 'Plan 2 Description', type: 'text', defaultValue: 'For serious creators' },
      { id: 'plan2Features', label: 'Plan 2 Features (comma separated)', type: 'textarea', defaultValue: 'Unlimited exports,Premium templates,4K quality,Priority support' },
      { id: 'plan3Name', label: 'Plan 3 Name', type: 'text', defaultValue: 'Team' },
      { id: 'plan3Price', label: 'Plan 3 Price', type: 'text', defaultValue: '79' },
      { id: 'plan3Desc', label: 'Plan 3 Description', type: 'text', defaultValue: 'For growing teams' },
      { id: 'plan3Features', label: 'Plan 3 Features (comma separated)', type: 'textarea', defaultValue: 'Everything in Pro,Team collaboration,Analytics dashboard,Custom branding' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#3b82f6' },
    ],
    generateHtml: (v) => `<div class="${uid('cphand')}" style="background:${v.bgColor};min-height:700px;font-family:'Caveat','Comic Sans MS',cursive,sans-serif;padding:60px 20px;">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
    .${uid('cphand')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('cphand')}-wrap { max-width: 1200px; margin: 0 auto; }
    .${uid('cphand')}-header { text-align: center; margin-bottom: 60px; }
    .${uid('cphand')}-tag { font-size: 24px; color: ${v.accentColor}; transform: rotate(-1deg); display: inline-block; margin-bottom: 16px; }
    .${uid('cphand')}-title { font-size: 48px; font-weight: 700; color: #1a1a1a; transform: rotate(-1deg); position: relative; display: inline-block; }
    .${uid('cphand')}-title::after { content: '✨'; position: absolute; right: -50px; top: -10px; font-size: 32px; transform: rotate(12deg); }
    .${uid('cphand')}-title::before { content: '⭐'; position: absolute; left: -40px; bottom: -10px; font-size: 28px; transform: rotate(-12deg); color: ${v.accentColor}; }
    .${uid('cphand')}-desc { font-size: 24px; color: #666; transform: rotate(-1deg); margin-top: 20px; }
    .${uid('cphand')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('cphand')}-card { position: relative; background: #fff; border: 3px solid #1a1a1a; border-radius: 16px; padding: 32px; transition: all 0.3s ease; box-shadow: 6px 6px 0 #1a1a1a; }
    .${uid('cphand')}-card:nth-child(1) { transform: rotate(-1deg); }
    .${uid('cphand')}-card:nth-child(2) { transform: rotate(1deg); }
    .${uid('cphand')}-card:nth-child(3) { transform: rotate(-2deg); }
    .${uid('cphand')}-card:hover { box-shadow: 10px 10px 0 #1a1a1a; transform: translate(-4px, -4px) rotate(0deg); }
    .${uid('cphand')}-card.popular::before { content: 'Popular!'; position: absolute; top: -12px; right: -12px; background: #fbbf24; color: #1a1a1a; padding: 6px 16px; border-radius: 20px; font-size: 16px; font-weight: 700; transform: rotate(12deg); border: 2px solid #1a1a1a; }
    .${uid('cphand')}-icon { width: 48px; height: 48px; border: 3px solid #1a1a1a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px; }
    .${uid('cphand')}-name { font-size: 28px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('cphand')}-pdesc { font-size: 18px; color: #666; margin-bottom: 24px; }
    .${uid('cphand')}-price { font-size: 48px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px; }
    .${uid('cphand')}-price span { font-size: 20px; color: #666; }
    .${uid('cphand')}-features { list-style: none; margin-bottom: 24px; }
    .${uid('cphand')}-features li { display: flex; align-items: center; gap: 12px; font-size: 20px; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('cphand')}-features li::before { content: '✓'; width: 24px; height: 24px; border: 2px solid #1a1a1a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
    .${uid('cphand')}-btn { width: 100%; padding: 16px; font-family: inherit; font-size: 20px; font-weight: 700; background: #f5f5f5; color: #1a1a1a; border: 3px solid #1a1a1a; border-radius: 12px; cursor: pointer; box-shadow: 4px 4px 0 #1a1a1a; transition: all 0.2s; }
    .${uid('cphand')}-btn:hover { box-shadow: 6px 6px 0 #1a1a1a; transform: translate(-2px, -2px); }
    .${uid('cphand')}-card.popular .${uid('cphand')}-btn { background: #fbbf24; }
    @media (max-width: 900px) { .${uid('cphand')}-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; } .${uid('cphand')}-card { transform: none !important; } }
    @media (max-width: 480px) { .${uid('cphand')}-title { font-size: 36px; } .${uid('cphand')}-price { font-size: 36px; } }
  </style>
  <div class="${uid('cphand')}-wrap">
    <div class="${uid('cphand')}-header">
      <div class="${uid('cphand')}-tag">${v.tag}</div>
      <h2 class="${uid('cphand')}-title">${v.title}</h2>
      <p class="${uid('cphand')}-desc">${v.description}</p>
    </div>
    <div class="${uid('cphand')}-grid">
      <div class="${uid('cphand')}-card">
        <div class="${uid('cphand')}-icon">✏️</div>
        <h3 class="${uid('cphand')}-name">${v.plan1Name}</h3>
        <p class="${uid('cphand')}-pdesc">${v.plan1Desc}</p>
        <div class="${uid('cphand')}-price">$${v.plan1Price}<span>/month</span></div>
        <ul class="${uid('cphand')}-features">${v.plan1Features.split(',').map((f: string) => '<li>' + f.trim() + '</li>').join('')}</ul>
        <button class="${uid('cphand')}-btn">Get Started</button>
      </div>
      <div class="${uid('cphand')}-card popular">
        <div class="${uid('cphand')}-icon">⭐</div>
        <h3 class="${uid('cphand')}-name">${v.plan2Name}</h3>
        <p class="${uid('cphand')}-pdesc">${v.plan2Desc}</p>
        <div class="${uid('cphand')}-price">$${v.plan2Price}<span>/month</span></div>
        <ul class="${uid('cphand')}-features">${v.plan2Features.split(',').map((f: string) => '<li>' + f.trim() + '</li>').join('')}</ul>
        <button class="${uid('cphand')}-btn">Get Started</button>
      </div>
      <div class="${uid('cphand')}-card">
        <div class="${uid('cphand')}-icon">✨</div>
        <h3 class="${uid('cphand')}-name">${v.plan3Name}</h3>
        <p class="${uid('cphand')}-pdesc">${v.plan3Desc}</p>
        <div class="${uid('cphand')}-price">$${v.plan3Price}<span>/month</span></div>
        <ul class="${uid('cphand')}-features">${v.plan3Features.split(',').map((f: string) => '<li>' + f.trim() + '</li>').join('')}</ul>
        <button class="${uid('cphand')}-btn">Get Started</button>
      </div>
    </div>
  </div>
</div>`
  },

  // ========== PRICING CONTAINER WITH 3D CARDS (21st.dev) ==========
  {
    id: 'pricing-container-3d',
    name: 'Pricing Container - 3D Cards',
    category: 'Pricing',
    description: 'Interactive 3D pricing cards with monthly/yearly toggle',
    thumbnail: '',
    fields: [
      { id: 'title', label: 'Title', type: 'text', defaultValue: 'Pricing Plans' },
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Starter' },
      { id: 'plan1Monthly', label: 'Plan 1 Monthly Price', type: 'text', defaultValue: '19' },
      { id: 'plan1Yearly', label: 'Plan 1 Yearly Price', type: 'text', defaultValue: '190' },
      { id: 'plan1Features', label: 'Plan 1 Features (comma separated)', type: 'textarea', defaultValue: '5 Projects,10GB Storage,Basic Support' },
      { id: 'plan1Color', label: 'Plan 1 Accent', type: 'color', defaultValue: '#3b82f6' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Professional' },
      { id: 'plan2Monthly', label: 'Plan 2 Monthly Price', type: 'text', defaultValue: '49' },
      { id: 'plan2Yearly', label: 'Plan 2 Yearly Price', type: 'text', defaultValue: '490' },
      { id: 'plan2Features', label: 'Plan 2 Features (comma separated)', type: 'textarea', defaultValue: 'Unlimited Projects,100GB Storage,Priority Support,API Access' },
      { id: 'plan2Color', label: 'Plan 2 Accent', type: 'color', defaultValue: '#8b5cf6' },
      { id: 'plan3Name', label: 'Plan 3 Name', type: 'text', defaultValue: 'Enterprise' },
      { id: 'plan3Monthly', label: 'Plan 3 Monthly Price', type: 'text', defaultValue: '99' },
      { id: 'plan3Yearly', label: 'Plan 3 Yearly Price', type: 'text', defaultValue: '990' },
      { id: 'plan3Features', label: 'Plan 3 Features (comma separated)', type: 'textarea', defaultValue: 'Everything in Pro,Dedicated Support,Custom Integrations,SLA Guarantee' },
      { id: 'plan3Color', label: 'Plan 3 Accent', type: 'color', defaultValue: '#ec4899' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f0f0f0' },
    ],
    generateHtml: (v) => `<div class="${uid('pc3d')}" style="background:${v.bgColor};min-height:700px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:48px 24px;border-radius:12px;">
  <style>
    .${uid('pc3d')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pc3d')}-header { text-align: center; margin-bottom: 32px; }
    .${uid('pc3d')}-title { font-size: 40px; font-weight: 900; color: #1a1a1a; background: linear-gradient(to right, #fff, #f3f4f6); padding: 16px 32px; border-radius: 12px; border: 4px solid #1a1a1a; box-shadow: 8px 8px 0 rgba(0,0,0,0.9); display: inline-block; transition: all 0.2s; }
    .${uid('pc3d')}-title:hover { transform: translate(2px, 2px); box-shadow: 6px 6px 0 rgba(0,0,0,0.9); }
    .${uid('pc3d')}-toggle { display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 32px; }
    .${uid('pc3d')}-toggle span { font-weight: 500; color: #666; }
    .${uid('pc3d')}-toggle span.active { color: #1a1a1a; font-weight: 700; }
    .${uid('pc3d')}-switch { width: 64px; height: 32px; background: #e5e7eb; border-radius: 16px; border: 2px solid #1a1a1a; position: relative; cursor: pointer; box-shadow: 2px 2px 0 rgba(0,0,0,0.9); }
    .${uid('pc3d')}-switch::after { content: ''; position: absolute; width: 24px; height: 24px; background: #fff; border-radius: 50%; border: 2px solid #1a1a1a; top: 2px; left: 2px; transition: transform 0.3s; }
    .${uid('pc3d')}-switch.yearly::after { transform: translateX(32px); }
    .${uid('pc3d')}-save { color: #22c55e; font-weight: 600; font-size: 14px; }
    .${uid('pc3d')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; }
    .${uid('pc3d')}-card { background: #fff; border-radius: 12px; padding: 24px; border: 3px solid #1a1a1a; box-shadow: 6px 6px 0 rgba(0,0,0,0.9); transition: all 0.2s; position: relative; }
    .${uid('pc3d')}-card:hover { box-shadow: 8px 8px 0 rgba(0,0,0,0.9); transform: translate(-2px, -2px); }
    .${uid('pc3d')}-badge { position: absolute; top: -12px; right: -12px; width: 64px; height: 64px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid #1a1a1a; box-shadow: 3px 3px 0 rgba(0,0,0,0.9); color: #fff; animation: ${uid('pc3d')}-bounce 2s infinite; }
    .${uid('pc3d')}-badge .price { font-size: 18px; font-weight: 900; }
    .${uid('pc3d')}-badge .period { font-size: 10px; font-weight: 700; }
    @keyframes ${uid('pc3d')}-bounce { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(5deg); } }
    .${uid('pc3d')}-name { font-size: 22px; font-weight: 900; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('pc3d')}-popular { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; color: #fff; border: 2px solid #1a1a1a; box-shadow: 2px 2px 0 rgba(0,0,0,0.9); animation: ${uid('pc3d')}-pulse 2s infinite; }
    @keyframes ${uid('pc3d')}-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    .${uid('pc3d')}-features { margin: 20px 0; }
    .${uid('pc3d')}-feature { display: flex; align-items: center; gap: 10px; padding: 10px; background: #f9fafb; border-radius: 8px; border: 2px solid #1a1a1a; box-shadow: 2px 2px 0 rgba(0,0,0,0.9); margin-bottom: 8px; font-size: 14px; font-weight: 700; color: #1a1a1a; transition: all 0.2s; }
    .${uid('pc3d')}-feature:hover { transform: translateX(5px); }
    .${uid('pc3d')}-feature .check { width: 20px; height: 20px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; border: 1px solid #1a1a1a; }
    .${uid('pc3d')}-btn { width: 100%; padding: 12px; font-size: 14px; font-weight: 900; color: #fff; border: 2px solid #1a1a1a; border-radius: 8px; cursor: pointer; box-shadow: 4px 4px 0 rgba(0,0,0,0.9); transition: all 0.2s; }
    .${uid('pc3d')}-btn:hover { box-shadow: 6px 6px 0 rgba(0,0,0,0.9); transform: translate(-2px, -2px); }
    .${uid('pc3d')}-btn:active { box-shadow: 2px 2px 0 rgba(0,0,0,0.9); transform: translate(2px, 2px); }
    @media (max-width: 900px) { .${uid('pc3d')}-grid { grid-template-columns: 1fr; max-width: 400px; } }
    @media (max-width: 480px) { .${uid('pc3d')}-title { font-size: 28px; padding: 12px 20px; } }
  </style>
  <div class="${uid('pc3d')}-header">
    <h1 class="${uid('pc3d')}-title">${v.title}</h1>
  </div>
  <div class="${uid('pc3d')}-toggle">
    <span class="active">Monthly</span>
    <div class="${uid('pc3d')}-switch" onclick="this.classList.toggle('yearly')"></div>
    <span>Yearly</span>
    <span class="${uid('pc3d')}-save">Save 20%</span>
  </div>
  <div class="${uid('pc3d')}-grid">
    <div class="${uid('pc3d')}-card">
      <div class="${uid('pc3d')}-badge" style="background:${v.plan1Color}"><span class="price">$${v.plan1Monthly}</span><span class="period">/mo</span></div>
      <h3 class="${uid('pc3d')}-name">${v.plan1Name}</h3>
      <div class="${uid('pc3d')}-features">${v.plan1Features.split(',').map((f: string) => '<div class="' + uid('pc3d') + '-feature"><span class="check" style="background:' + v.plan1Color + '">✓</span>' + f.trim() + '</div>').join('')}</div>
      <button class="${uid('pc3d')}-btn" style="background:${v.plan1Color}">GET STARTED →</button>
    </div>
    <div class="${uid('pc3d')}-card">
      <div class="${uid('pc3d')}-badge" style="background:${v.plan2Color}"><span class="price">$${v.plan2Monthly}</span><span class="period">/mo</span></div>
      <h3 class="${uid('pc3d')}-name">${v.plan2Name}</h3>
      <span class="${uid('pc3d')}-popular" style="background:${v.plan2Color}">POPULAR</span>
      <div class="${uid('pc3d')}-features">${v.plan2Features.split(',').map((f: string) => '<div class="' + uid('pc3d') + '-feature"><span class="check" style="background:' + v.plan2Color + '">✓</span>' + f.trim() + '</div>').join('')}</div>
      <button class="${uid('pc3d')}-btn" style="background:${v.plan2Color}">GET STARTED →</button>
    </div>
    <div class="${uid('pc3d')}-card">
      <div class="${uid('pc3d')}-badge" style="background:${v.plan3Color}"><span class="price">$${v.plan3Monthly}</span><span class="period">/mo</span></div>
      <h3 class="${uid('pc3d')}-name">${v.plan3Name}</h3>
      <div class="${uid('pc3d')}-features">${v.plan3Features.split(',').map((f: string) => '<div class="' + uid('pc3d') + '-feature"><span class="check" style="background:' + v.plan3Color + '">✓</span>' + f.trim() + '</div>').join('')}</div>
      <button class="${uid('pc3d')}-btn" style="background:${v.plan3Color}">GET STARTED →</button>
    </div>
  </div>
</div>`
  },

  // ========== GLOW EFFECT HERO (21st.dev) ==========
  {
    id: 'glow-effect-hero',
    name: 'Glow Effect Hero',
    category: 'Hero',
    description: 'Stunning animated glow background with rotating colors',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Experience the Future' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Immerse yourself in a world of endless possibilities' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Get Started' },
      { id: 'color1', label: 'Glow Color 1', type: 'color', defaultValue: '#ff5733' },
      { id: 'color2', label: 'Glow Color 2', type: 'color', defaultValue: '#33ff57' },
      { id: 'color3', label: 'Glow Color 3', type: 'color', defaultValue: '#3357ff' },
      { id: 'color4', label: 'Glow Color 4', type: 'color', defaultValue: '#f1c40f' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'animDuration', label: 'Animation Duration (s)', type: 'number', defaultValue: '5' },
    ],
    generateHtml: (v) => `<div class="${uid('glow')}" style="background:${v.bgColor};min-height:600px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;">
  <style>
    .${uid('glow')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('glow')}-bg {
      position: absolute;
      inset: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(from 0deg at 50% 50%, ${v.color1}, ${v.color2}, ${v.color3}, ${v.color4}, ${v.color1});
      animation: ${uid('glow')}-rotate ${v.animDuration}s linear infinite;
      filter: blur(80px);
      opacity: 0.6;
    }
    @keyframes ${uid('glow')}-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .${uid('glow')}-content { position: relative; z-index: 1; text-align: center; padding: 40px; }
    .${uid('glow')}-headline { font-size: 56px; font-weight: 700; color: #fff; margin-bottom: 20px; text-shadow: 0 4px 30px rgba(0,0,0,0.5); }
    .${uid('glow')}-sub { font-size: 20px; color: rgba(255,255,255,0.8); margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto; }
    .${uid('glow')}-btn { display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: 600; color: #0a0a0a; background: #fff; border: none; border-radius: 50px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 30px rgba(255,255,255,0.3); }
    .${uid('glow')}-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(255,255,255,0.4); }
    @media (max-width: 768px) { .${uid('glow')}-headline { font-size: 36px; } .${uid('glow')}-sub { font-size: 16px; } }
  </style>
  <div class="${uid('glow')}-bg"></div>
  <div class="${uid('glow')}-content">
    <h1 class="${uid('glow')}-headline">${v.headline}</h1>
    <p class="${uid('glow')}-sub">${v.subheadline}</p>
    <button class="${uid('glow')}-btn">${v.buttonText}</button>
  </div>
</div>`
  },

  // ========== TESTIMONIAL CAROUSEL CARDS (21st.dev) ==========
  {
    id: 'testimonial-carousel-stack',
    name: 'Testimonial Carousel - Stack',
    category: 'Testimonials',
    description: 'Draggable stacked card testimonials with smooth animations',
    thumbnail: '',
    fields: [
      { id: 'test1Name', label: 'Testimonial 1 Name', type: 'text', defaultValue: 'Sarah Johnson' },
      { id: 'test1Avatar', label: 'Testimonial 1 Avatar URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'test1Text', label: 'Testimonial 1 Text', type: 'textarea', defaultValue: 'This product completely transformed how I work. The attention to detail and quality is unmatched. Highly recommend!' },
      { id: 'test2Name', label: 'Testimonial 2 Name', type: 'text', defaultValue: 'Michael Chen' },
      { id: 'test2Avatar', label: 'Testimonial 2 Avatar URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Man%20in%20Blue%20Shirt.png' },
      { id: 'test2Text', label: 'Testimonial 2 Text', type: 'textarea', defaultValue: 'Incredible experience from start to finish. The team went above and beyond to ensure everything was perfect.' },
      { id: 'test3Name', label: 'Testimonial 3 Name', type: 'text', defaultValue: 'Emily Davis' },
      { id: 'test3Avatar', label: 'Testimonial 3 Avatar URL', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png' },
      { id: 'test3Text', label: 'Testimonial 3 Text', type: 'textarea', defaultValue: 'Best investment I have ever made. The results speak for themselves. 5 stars all the way!' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f5f5f5' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#3b82f6' },
    ],
    generateHtml: (v) => `<div class="${uid('tstack')}" style="background:${v.bgColor};min-height:500px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;padding:60px 20px;">
  <style>
    .${uid('tstack')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tstack')}-wrap { position: relative; width: 320px; height: 280px; perspective: 1000px; }
    .${uid('tstack')}-card {
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${v.cardBg};
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: grab;
    }
    .${uid('tstack')}-card:active { cursor: grabbing; }
    .${uid('tstack')}-card:nth-child(1) { z-index: 3; transform: translateY(0) scale(1); }
    .${uid('tstack')}-card:nth-child(2) { z-index: 2; transform: translateY(10px) scale(0.95) rotate(-2deg); opacity: 0.7; }
    .${uid('tstack')}-card:nth-child(3) { z-index: 1; transform: translateY(20px) scale(0.9) rotate(-4deg); opacity: 0.4; }
    .${uid('tstack')}-card:hover:nth-child(1) { transform: translateY(-10px) scale(1.02); box-shadow: 0 30px 60px rgba(0,0,0,0.15); }
    .${uid('tstack')}-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 3px solid ${v.accentColor}; }
    .${uid('tstack')}-name { font-size: 18px; font-weight: 700; color: #1a1a1a; }
    .${uid('tstack')}-text { font-size: 14px; color: #666; text-align: center; line-height: 1.6; }
    .${uid('tstack')}-arrows { position: absolute; top: 12px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 16px; pointer-events: none; }
    .${uid('tstack')}-arrow { font-size: 24px; color: #ccc; cursor: pointer; pointer-events: auto; transition: color 0.2s; }
    .${uid('tstack')}-arrow:hover { color: ${v.accentColor}; }
    .${uid('tstack')}-dots { display: flex; justify-content: center; gap: 8px; margin-top: 40px; }
    .${uid('tstack')}-dot { width: 10px; height: 10px; border-radius: 50%; background: #ddd; transition: background 0.3s; }
    .${uid('tstack')}-dot.active { background: ${v.accentColor}; }
    @media (max-width: 480px) { .${uid('tstack')}-wrap { width: 280px; height: 260px; } .${uid('tstack')}-card { padding: 24px; } }
  </style>
  <div>
    <div class="${uid('tstack')}-wrap">
      <div class="${uid('tstack')}-card">
        <div class="${uid('tstack')}-arrows"><span class="${uid('tstack')}-arrow">←</span><span class="${uid('tstack')}-arrow">→</span></div>
        <img src="${v.test1Avatar}" alt="${v.test1Name}" class="${uid('tstack')}-avatar" />
        <h3 class="${uid('tstack')}-name">${v.test1Name}</h3>
        <p class="${uid('tstack')}-text">${v.test1Text}</p>
      </div>
      <div class="${uid('tstack')}-card">
        <img src="${v.test2Avatar}" alt="${v.test2Name}" class="${uid('tstack')}-avatar" />
        <h3 class="${uid('tstack')}-name">${v.test2Name}</h3>
        <p class="${uid('tstack')}-text">${v.test2Text}</p>
      </div>
      <div class="${uid('tstack')}-card">
        <img src="${v.test3Avatar}" alt="${v.test3Name}" class="${uid('tstack')}-avatar" />
        <h3 class="${uid('tstack')}-name">${v.test3Name}</h3>
        <p class="${uid('tstack')}-text">${v.test3Text}</p>
      </div>
    </div>
    <div class="${uid('tstack')}-dots">
      <div class="${uid('tstack')}-dot active"></div>
      <div class="${uid('tstack')}-dot"></div>
      <div class="${uid('tstack')}-dot"></div>
    </div>
  </div>
</div>`
  },

  // ========== ANIMATED TABS (21st.dev) ==========
  {
    id: 'animated-tabs-content',
    name: 'Animated Tabs',
    category: 'Interactive',
    description: 'Beautiful animated tabs with smooth transitions and blur effects',
    thumbnail: '',
    fields: [
      { id: 'tab1Label', label: 'Tab 1 Label', type: 'text', defaultValue: 'Features' },
      { id: 'tab1Title', label: 'Tab 1 Title', type: 'text', defaultValue: 'Powerful Features' },
      { id: 'tab1Text', label: 'Tab 1 Text', type: 'textarea', defaultValue: 'Our platform offers cutting-edge features designed to streamline your workflow and boost productivity.' },
      { id: 'tab1Image', label: 'Tab 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'tab2Label', label: 'Tab 2 Label', type: 'text', defaultValue: 'Benefits' },
      { id: 'tab2Title', label: 'Tab 2 Title', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'tab2Text', label: 'Tab 2 Text', type: 'textarea', defaultValue: 'Experience the difference with our premium solutions that deliver real results for your business.' },
      { id: 'tab2Image', label: 'Tab 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'tab3Label', label: 'Tab 3 Label', type: 'text', defaultValue: 'Results' },
      { id: 'tab3Title', label: 'Tab 3 Title', type: 'text', defaultValue: 'Proven Results' },
      { id: 'tab3Text', label: 'Tab 3 Text', type: 'textarea', defaultValue: 'Join thousands of satisfied customers who have transformed their businesses with our solutions.' },
      { id: 'tab3Image', label: 'Tab 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#1a1a2e' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('atabs')}" style="background:linear-gradient(135deg,${v.bgColor} 0%,#0f0f1a 100%);min-height:500px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;padding:60px 20px;">
  <style>
    .${uid('atabs')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('atabs')}-wrap { width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 8px; }
    .${uid('atabs')}-nav { display: flex; gap: 8px; background: rgba(17,17,17,0.6); padding: 6px; border-radius: 12px; backdrop-filter: blur(10px); flex-wrap: wrap; }
    .${uid('atabs')}-tab { position: relative; padding: 10px 20px; font-size: 14px; font-weight: 500; color: #fff; background: transparent; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
    .${uid('atabs')}-tab.active { background: rgba(17,17,17,0.8); box-shadow: 0 0 20px rgba(0,0,0,0.2); }
    .${uid('atabs')}-tab:hover { background: rgba(255,255,255,0.1); }
    .${uid('atabs')}-content { background: rgba(17,17,17,0.6); border-radius: 12px; padding: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); min-height: 280px; box-shadow: 0 0 20px rgba(0,0,0,0.2); }
    .${uid('atabs')}-panel { display: none; animation: ${uid('atabs')}-fadeIn 0.5s ease; }
    .${uid('atabs')}-panel.active { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center; }
    @keyframes ${uid('atabs')}-fadeIn { from { opacity: 0; transform: translateX(-10px) scale(0.95); filter: blur(10px); } to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
    .${uid('atabs')}-img { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; box-shadow: 0 0 20px rgba(0,0,0,0.2); }
    .${uid('atabs')}-text h2 { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .${uid('atabs')}-text p { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.6; }
    @media (max-width: 600px) { .${uid('atabs')}-panel.active { grid-template-columns: 1fr; } .${uid('atabs')}-img { height: 160px; } }
  </style>
  <div class="${uid('atabs')}-wrap">
    <div class="${uid('atabs')}-nav">
      <button class="${uid('atabs')}-tab active" onclick="this.parentElement.querySelectorAll('.${uid('atabs')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');this.closest('.${uid('atabs')}-wrap').querySelectorAll('.${uid('atabs')}-panel').forEach((p,i)=>{p.classList.remove('active');if(i===0)p.classList.add('active');})">${v.tab1Label}</button>
      <button class="${uid('atabs')}-tab" onclick="this.parentElement.querySelectorAll('.${uid('atabs')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');this.closest('.${uid('atabs')}-wrap').querySelectorAll('.${uid('atabs')}-panel').forEach((p,i)=>{p.classList.remove('active');if(i===1)p.classList.add('active');})">${v.tab2Label}</button>
      <button class="${uid('atabs')}-tab" onclick="this.parentElement.querySelectorAll('.${uid('atabs')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');this.closest('.${uid('atabs')}-wrap').querySelectorAll('.${uid('atabs')}-panel').forEach((p,i)=>{p.classList.remove('active');if(i===2)p.classList.add('active');})">${v.tab3Label}</button>
    </div>
    <div class="${uid('atabs')}-content">
      <div class="${uid('atabs')}-panel active">
        <img src="${v.tab1Image}" alt="${v.tab1Title}" class="${uid('atabs')}-img" />
        <div class="${uid('atabs')}-text"><h2>${v.tab1Title}</h2><p>${v.tab1Text}</p></div>
      </div>
      <div class="${uid('atabs')}-panel">
        <img src="${v.tab2Image}" alt="${v.tab2Title}" class="${uid('atabs')}-img" />
        <div class="${uid('atabs')}-text"><h2>${v.tab2Title}</h2><p>${v.tab2Text}</p></div>
      </div>
      <div class="${uid('atabs')}-panel">
        <img src="${v.tab3Image}" alt="${v.tab3Title}" class="${uid('atabs')}-img" />
        <div class="${uid('atabs')}-text"><h2>${v.tab3Title}</h2><p>${v.tab3Text}</p></div>
      </div>
    </div>
  </div>
</div>`
  },

  // ========== PREMIUM 21st.dev STYLE SECTIONS - BATCH 1 ==========

  // 1. Luxury Hero with Feature Cards
  {
    id: 'hero-feature-cards',
    name: 'Hero - Feature Cards Grid',
    category: 'Hero',
    description: 'Elegant hero section with animated feature cards below',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/hero-feature-cards.jpg',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Curated for the Discerning Eye' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Where timeless elegance meets contemporary design. Discover collections that transform spaces into sanctuaries.' },
      { id: 'ctaText', label: 'CTA Button Text', type: 'text', defaultValue: 'Explore Collections' },
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Artisan Textiles' },
      { id: 'card1Image', label: 'Card 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Bespoke Tailoring' },
      { id: 'card2Image', label: 'Card 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Couture Essentials' },
      { id: 'card3Image', label: 'Card 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#faf9f7' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('hfc')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:80px 24px;">
  <style>
    .${uid('hfc')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hfc')}-wrap { max-width: 1100px; margin: 0 auto; }
    .${uid('hfc')}-hero { text-align: center; max-width: 700px; margin: 0 auto 60px; }
    .${uid('hfc')}-title { font-size: 48px; font-weight: 700; color: #1a1a1a; line-height: 1.1; margin-bottom: 20px; animation: ${uid('hfc')}-fadeUp 0.6s ease-out; }
    .${uid('hfc')}-sub { font-size: 18px; color: #666; line-height: 1.6; margin-bottom: 32px; animation: ${uid('hfc')}-fadeUp 0.6s ease-out 0.1s both; }
    .${uid('hfc')}-btn { display: inline-block; padding: 16px 32px; background: ${v.accentColor}; color: #fff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s; animation: ${uid('hfc')}-fadeUp 0.6s ease-out 0.2s both; }
    .${uid('hfc')}-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
    .${uid('hfc')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('hfc')}-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); animation: ${uid('hfc')}-fadeUp 0.6s ease-out both; }
    .${uid('hfc')}-card:nth-child(1) { animation-delay: 0.3s; }
    .${uid('hfc')}-card:nth-child(2) { animation-delay: 0.4s; }
    .${uid('hfc')}-card:nth-child(3) { animation-delay: 0.5s; }
    .${uid('hfc')}-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
    .${uid('hfc')}-card img { width: 100%; aspect-ratio: 1; object-fit: cover; transition: transform 0.4s; }
    .${uid('hfc')}-card:hover img { transform: scale(1.05); }
    .${uid('hfc')}-card-body { padding: 20px; display: flex; align-items: center; justify-content: space-between; }
    .${uid('hfc')}-card h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; }
    .${uid('hfc')}-arrow { width: 40px; height: 40px; background: rgba(0,0,0,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
    .${uid('hfc')}-card:hover .${uid('hfc')}-arrow { background: ${v.accentColor}; }
    .${uid('hfc')}-arrow svg { width: 20px; height: 20px; color: #666; transition: all 0.3s; }
    .${uid('hfc')}-card:hover .${uid('hfc')}-arrow svg { color: #fff; transform: translateX(2px); }
    @keyframes ${uid('hfc')}-fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 768px) { .${uid('hfc')}-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; } .${uid('hfc')}-title { font-size: 36px; } }
  </style>
  <div class="${uid('hfc')}-wrap">
    <div class="${uid('hfc')}-hero">
      <h1 class="${uid('hfc')}-title">${v.headline}</h1>
      <p class="${uid('hfc')}-sub">${v.subheadline}</p>
      <a href="#" class="${uid('hfc')}-btn">${v.ctaText}</a>
    </div>
    <div class="${uid('hfc')}-grid">
      <a href="#" class="${uid('hfc')}-card">
        <img src="${v.card1Image}" alt="${v.card1Title}" />
        <div class="${uid('hfc')}-card-body">
          <h3>${v.card1Title}</h3>
          <div class="${uid('hfc')}-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </div>
      </a>
      <a href="#" class="${uid('hfc')}-card">
        <img src="${v.card2Image}" alt="${v.card2Title}" />
        <div class="${uid('hfc')}-card-body">
          <h3>${v.card2Title}</h3>
          <div class="${uid('hfc')}-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </div>
      </a>
      <a href="#" class="${uid('hfc')}-card">
        <img src="${v.card3Image}" alt="${v.card3Title}" />
        <div class="${uid('hfc')}-card-body">
          <h3>${v.card3Title}</h3>
          <div class="${uid('hfc')}-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
        </div>
      </a>
    </div>
  </div>
</div>`
  },

  // 2. Logo Cloud with Infinite Slider
  {
    id: 'logo-cloud-infinite',
    name: 'Logo Cloud - Infinite Scroll',
    category: 'Trust',
    description: 'Smooth infinite scrolling logo carousel with fade edges',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/logo-cloud.jpg',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Featured in the World\'s Finest Publications' },
      { id: 'logo1', label: 'Logo 1 Text', type: 'text', defaultValue: 'VOGUE' },
      { id: 'logo2', label: 'Logo 2 Text', type: 'text', defaultValue: 'ARCHITECTURAL DIGEST' },
      { id: 'logo3', label: 'Logo 3 Text', type: 'text', defaultValue: 'ELLE DÉCOR' },
      { id: 'logo4', label: 'Logo 4 Text', type: 'text', defaultValue: 'HARPER\'S BAZAAR' },
      { id: 'logo5', label: 'Logo 5 Text', type: 'text', defaultValue: 'ROBB REPORT' },
      { id: 'logo6', label: 'Logo 6 Text', type: 'text', defaultValue: 'TOWN & COUNTRY' },
      { id: 'speed', label: 'Animation Speed (seconds)', type: 'number', defaultValue: '20' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Logo Text Color', type: 'color', defaultValue: '#9ca3af' },
    ],
    generateHtml: (v) => `<div class="${uid('lci')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:48px 0;overflow:hidden;">
  <style>
    .${uid('lci')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('lci')}-title { text-align: center; font-size: 14px; font-weight: 500; color: #666; letter-spacing: 0.5px; margin-bottom: 32px; text-transform: uppercase; }
    .${uid('lci')}-track { display: flex; width: max-content; animation: ${uid('lci')}-scroll ${v.speed}s linear infinite; }
    .${uid('lci')}-track:hover { animation-play-state: paused; }
    .${uid('lci')}-wrap { position: relative; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
    .${uid('lci')}-logo { display: flex; align-items: center; justify-content: center; padding: 0 42px; font-size: 20px; font-weight: 700; color: ${v.textColor}; letter-spacing: -0.5px; white-space: nowrap; transition: all 0.3s; }
    .${uid('lci')}-logo:hover { color: #1a1a1a; transform: scale(1.05); }
    @keyframes ${uid('lci')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <p class="${uid('lci')}-title">${v.title}</p>
  <div class="${uid('lci')}-wrap">
    <div class="${uid('lci')}-track">
      <span class="${uid('lci')}-logo">${v.logo1}</span>
      <span class="${uid('lci')}-logo">${v.logo2}</span>
      <span class="${uid('lci')}-logo">${v.logo3}</span>
      <span class="${uid('lci')}-logo">${v.logo4}</span>
      <span class="${uid('lci')}-logo">${v.logo5}</span>
      <span class="${uid('lci')}-logo">${v.logo6}</span>
      <span class="${uid('lci')}-logo">${v.logo1}</span>
      <span class="${uid('lci')}-logo">${v.logo2}</span>
      <span class="${uid('lci')}-logo">${v.logo3}</span>
      <span class="${uid('lci')}-logo">${v.logo4}</span>
      <span class="${uid('lci')}-logo">${v.logo5}</span>
      <span class="${uid('lci')}-logo">${v.logo6}</span>
    </div>
  </div>
</div>`
  },

  // 3. Interactive Numbered Accordion
  {
    id: 'interactive-numbered-accordion',
    name: 'Accordion - Numbered Interactive',
    category: 'Interactive',
    description: 'Sleek numbered accordion with animated indicators and hover effects',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/accordion.jpg',
    fields: [
      { id: 'item1Title', label: 'Item 1 Title', type: 'text', defaultValue: 'Consultation' },
      { id: 'item1Content', label: 'Item 1 Content', type: 'textarea', defaultValue: 'Our design consultants visit your space to understand its architecture, light, and your vision for living.' },
      { id: 'item2Title', label: 'Item 2 Title', type: 'text', defaultValue: 'Curation' },
      { id: 'item2Content', label: 'Item 2 Content', type: 'textarea', defaultValue: 'We present a bespoke selection of pieces from our global network of master artisans and heritage ateliers.' },
      { id: 'item3Title', label: 'Item 3 Title', type: 'text', defaultValue: 'Craftsmanship' },
      { id: 'item3Content', label: 'Item 3 Content', type: 'textarea', defaultValue: 'Each piece is handcrafted to your specifications using time-honored techniques passed down through generations.' },
      { id: 'item4Title', label: 'Item 4 Title', type: 'text', defaultValue: 'Installation' },
      { id: 'item4Content', label: 'Item 4 Content', type: 'textarea', defaultValue: 'White-glove delivery and installation ensure every piece is placed with precision and care.' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('ina')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:80px 24px;display:flex;align-items:center;justify-content:center;min-height:500px;">
  <style>
    .${uid('ina')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ina')}-wrap { width: 100%; max-width: 600px; }
    .${uid('ina')}-item { border-bottom: 1px solid #e5e7eb; }
    .${uid('ina')}-btn { width: 100%; display: flex; align-items: center; gap: 24px; padding: 20px 4px; background: none; border: none; cursor: pointer; text-align: left; position: relative; }
    .${uid('ina')}-num { position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
    .${uid('ina')}-num span { font-size: 14px; font-weight: 500; color: #9ca3af; transition: color 0.3s; z-index: 1; }
    .${uid('ina')}-num::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: ${v.accentColor}; transform: scale(0); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
    .${uid('ina')}-item.active .${uid('ina')}-num::before { transform: scale(1); }
    .${uid('ina')}-item.active .${uid('ina')}-num span { color: #fff; }
    .${uid('ina')}-title { flex: 1; font-size: 24px; font-weight: 500; color: #9ca3af; transition: all 0.3s; }
    .${uid('ina')}-item:hover .${uid('ina')}-title, .${uid('ina')}-item.active .${uid('ina')}-title { color: ${v.accentColor}; transform: translateX(4px); }
    .${uid('ina')}-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
    .${uid('ina')}-icon svg { width: 16px; height: 16px; color: ${v.accentColor}; opacity: 0.4; transition: all 0.3s; }
    .${uid('ina')}-item.active .${uid('ina')}-icon svg { transform: rotate(45deg); opacity: 1; }
    .${uid('ina')}-content { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1); }
    .${uid('ina')}-item.active .${uid('ina')}-content { max-height: 200px; }
    .${uid('ina')}-text { padding: 0 4px 24px 64px; font-size: 16px; color: #666; line-height: 1.7; }
    .${uid('ina')}-line { position: absolute; bottom: 0; left: 0; height: 1px; background: ${v.accentColor}; width: 0; transition: width 0.4s; }
    .${uid('ina')}-item.active .${uid('ina')}-line, .${uid('ina')}-item:hover .${uid('ina')}-line { width: 100%; }
    @media (max-width: 600px) { .${uid('ina')}-title { font-size: 20px; } .${uid('ina')}-text { padding-left: 64px; } }
  </style>
  <div class="${uid('ina')}-wrap">
    <div class="${uid('ina')}-item active" onclick="this.parentElement.querySelectorAll('.${uid('ina')}-item').forEach(i=>i.classList.remove('active'));this.classList.add('active')">
      <button class="${uid('ina')}-btn"><div class="${uid('ina')}-num"><span>01</span></div><h3 class="${uid('ina')}-title">${v.item1Title}</h3><div class="${uid('ina')}-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v14M1 8h14"/></svg></div><div class="${uid('ina')}-line"></div></button>
      <div class="${uid('ina')}-content"><p class="${uid('ina')}-text">${v.item1Content}</p></div>
    </div>
    <div class="${uid('ina')}-item" onclick="this.parentElement.querySelectorAll('.${uid('ina')}-item').forEach(i=>i.classList.remove('active'));this.classList.add('active')">
      <button class="${uid('ina')}-btn"><div class="${uid('ina')}-num"><span>02</span></div><h3 class="${uid('ina')}-title">${v.item2Title}</h3><div class="${uid('ina')}-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v14M1 8h14"/></svg></div><div class="${uid('ina')}-line"></div></button>
      <div class="${uid('ina')}-content"><p class="${uid('ina')}-text">${v.item2Content}</p></div>
    </div>
    <div class="${uid('ina')}-item" onclick="this.parentElement.querySelectorAll('.${uid('ina')}-item').forEach(i=>i.classList.remove('active'));this.classList.add('active')">
      <button class="${uid('ina')}-btn"><div class="${uid('ina')}-num"><span>03</span></div><h3 class="${uid('ina')}-title">${v.item3Title}</h3><div class="${uid('ina')}-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v14M1 8h14"/></svg></div><div class="${uid('ina')}-line"></div></button>
      <div class="${uid('ina')}-content"><p class="${uid('ina')}-text">${v.item3Content}</p></div>
    </div>
    <div class="${uid('ina')}-item" onclick="this.parentElement.querySelectorAll('.${uid('ina')}-item').forEach(i=>i.classList.remove('active'));this.classList.add('active')">
      <button class="${uid('ina')}-btn"><div class="${uid('ina')}-num"><span>04</span></div><h3 class="${uid('ina')}-title">${v.item4Title}</h3><div class="${uid('ina')}-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v14M1 8h14"/></svg></div><div class="${uid('ina')}-line"></div></button>
      <div class="${uid('ina')}-content"><p class="${uid('ina')}-text">${v.item4Content}</p></div>
    </div>
  </div>
</div>`
  },

  // 4. Editorial Testimonial with Navigation
  {
    id: 'testimonial-editorial',
    name: 'Testimonial - Editorial Style',
    category: 'Testimonials',
    description: 'Large format editorial testimonial with elegant navigation',
    thumbnail: '',
    fields: [
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'The attention to detail and creative vision transformed our entire brand identity completely.' },
      { id: 'author1', label: 'Author 1 Name', type: 'text', defaultValue: 'Sarah Chen' },
      { id: 'role1', label: 'Author 1 Role', type: 'text', defaultValue: 'Creative Director' },
      { id: 'company1', label: 'Author 1 Company', type: 'text', defaultValue: 'Studio Nova' },
      { id: 'image1', label: 'Author 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'Working with them felt like a true creative partnership from the very first conversation.' },
      { id: 'author2', label: 'Author 2 Name', type: 'text', defaultValue: 'Marcus Webb' },
      { id: 'role2', label: 'Author 2 Role', type: 'text', defaultValue: 'Head of Design' },
      { id: 'company2', label: 'Author 2 Company', type: 'text', defaultValue: 'Minimal Co' },
      { id: 'image2', label: 'Author 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('ted')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:80px 24px;">
  <style>
    .${uid('ted')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ted')}-wrap { max-width: 700px; margin: 0 auto; }
    .${uid('ted')}-main { display: flex; align-items: flex-start; gap: 32px; }
    .${uid('ted')}-num { font-size: 120px; font-weight: 200; color: rgba(0,0,0,0.08); line-height: 1; font-variant-numeric: tabular-nums; transition: all 0.5s; user-select: none; }
    .${uid('ted')}-content { flex: 1; padding-top: 24px; }
    .${uid('ted')}-quote { font-size: 28px; font-weight: 300; color: #1a1a1a; line-height: 1.4; letter-spacing: -0.5px; margin-bottom: 40px; transition: all 0.4s; }
    .${uid('ted')}-author { display: flex; align-items: center; gap: 16px; }
    .${uid('ted')}-avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(0,0,0,0.1); transition: all 0.3s; }
    .${uid('ted')}-avatar:hover { border-color: #1a1a1a; transform: scale(1.05); }
    .${uid('ted')}-avatar img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.3s; }
    .${uid('ted')}-avatar:hover img { filter: grayscale(0); }
    .${uid('ted')}-info p:first-child { font-weight: 500; color: #1a1a1a; }
    .${uid('ted')}-info p:last-child { font-size: 14px; color: #666; }
    .${uid('ted')}-info span { margin: 0 8px; color: rgba(0,0,0,0.2); }
    .${uid('ted')}-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 48px; }
    .${uid('ted')}-dots { display: flex; align-items: center; gap: 24px; }
    .${uid('ted')}-dots-inner { display: flex; gap: 12px; }
    .${uid('ted')}-dot { width: 24px; height: 1px; background: rgba(0,0,0,0.2); cursor: pointer; transition: all 0.4s; }
    .${uid('ted')}-dot.active { width: 48px; background: #1a1a1a; }
    .${uid('ted')}-dot:hover { background: rgba(0,0,0,0.5); }
    .${uid('ted')}-counter { font-size: 12px; color: #666; letter-spacing: 2px; text-transform: uppercase; }
    .${uid('ted')}-arrows { display: flex; gap: 4px; }
    .${uid('ted')}-arrow { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(0,0,0,0.4); cursor: pointer; transition: all 0.3s; }
    .${uid('ted')}-arrow:hover { color: #1a1a1a; background: rgba(0,0,0,0.05); }
    .${uid('ted')}-arrow svg { width: 20px; height: 20px; }
    .${uid('ted')}-slide { display: none; }
    .${uid('ted')}-slide.active { display: block; animation: ${uid('ted')}-fadeIn 0.5s ease; }
    @keyframes ${uid('ted')}-fadeIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
    @media (max-width: 600px) { .${uid('ted')}-num { font-size: 80px; } .${uid('ted')}-quote { font-size: 22px; } .${uid('ted')}-main { flex-direction: column; gap: 0; } }
  </style>
  <div class="${uid('ted')}-wrap">
    <div class="${uid('ted')}-main">
      <span class="${uid('ted')}-num" id="${uid('ted')}-numDisplay">01</span>
      <div class="${uid('ted')}-content">
        <div class="${uid('ted')}-slide active" data-index="0">
          <blockquote class="${uid('ted')}-quote">"${v.quote1}"</blockquote>
          <div class="${uid('ted')}-author">
            <div class="${uid('ted')}-avatar"><img src="${v.image1}" alt="${v.author1}"></div>
            <div class="${uid('ted')}-info"><p>${v.author1}</p><p>${v.role1}<span>/</span>${v.company1}</p></div>
          </div>
        </div>
        <div class="${uid('ted')}-slide" data-index="1">
          <blockquote class="${uid('ted')}-quote">"${v.quote2}"</blockquote>
          <div class="${uid('ted')}-author">
            <div class="${uid('ted')}-avatar"><img src="${v.image2}" alt="${v.author2}"></div>
            <div class="${uid('ted')}-info"><p>${v.author2}</p><p>${v.role2}<span>/</span>${v.company2}</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="${uid('ted')}-nav">
      <div class="${uid('ted')}-dots">
        <div class="${uid('ted')}-dots-inner">
          <div class="${uid('ted')}-dot active" onclick="document.querySelectorAll('.${uid('ted')}-slide').forEach(s=>s.classList.remove('active'));document.querySelectorAll('.${uid('ted')}-slide')[0].classList.add('active');document.querySelectorAll('.${uid('ted')}-dot').forEach(d=>d.classList.remove('active'));this.classList.add('active');document.getElementById('${uid('ted')}-numDisplay').textContent='01'"></div>
          <div class="${uid('ted')}-dot" onclick="document.querySelectorAll('.${uid('ted')}-slide').forEach(s=>s.classList.remove('active'));document.querySelectorAll('.${uid('ted')}-slide')[1].classList.add('active');document.querySelectorAll('.${uid('ted')}-dot').forEach(d=>d.classList.remove('active'));this.classList.add('active');document.getElementById('${uid('ted')}-numDisplay').textContent='02'"></div>
        </div>
        <span class="${uid('ted')}-counter">01 / 02</span>
      </div>
      <div class="${uid('ted')}-arrows">
        <div class="${uid('ted')}-arrow" onclick="document.querySelectorAll('.${uid('ted')}-slide').forEach(s=>s.classList.remove('active'));document.querySelectorAll('.${uid('ted')}-slide')[0].classList.add('active');document.querySelectorAll('.${uid('ted')}-dot').forEach(d=>d.classList.remove('active'));document.querySelectorAll('.${uid('ted')}-dot')[0].classList.add('active');document.getElementById('${uid('ted')}-numDisplay').textContent='01'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg></div>
        <div class="${uid('ted')}-arrow" onclick="document.querySelectorAll('.${uid('ted')}-slide').forEach(s=>s.classList.remove('active'));document.querySelectorAll('.${uid('ted')}-slide')[1].classList.add('active');document.querySelectorAll('.${uid('ted')}-dot').forEach(d=>d.classList.remove('active'));document.querySelectorAll('.${uid('ted')}-dot')[1].classList.add('active');document.getElementById('${uid('ted')}-numDisplay').textContent='02'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg></div>
      </div>
    </div>
  </div>
</div>`
  },

  // 5. Minimal Testimonial with Avatars
  {
    id: 'testimonial-minimal-avatars',
    name: 'Testimonial - Minimal Avatars',
    category: 'Testimonials',
    description: 'Clean minimal testimonial with clickable avatar selection',
    thumbnail: '',
    fields: [
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'Working with them transformed our entire brand identity. The attention to detail was exceptional.' },
      { id: 'name1', label: 'Name 1', type: 'text', defaultValue: 'Sarah Chen' },
      { id: 'role1', label: 'Role 1', type: 'text', defaultValue: 'CEO at Elevate' },
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'A rare talent who combines strategic thinking with flawless execution. Highly recommended.' },
      { id: 'name2', label: 'Name 2', type: 'text', defaultValue: 'Marcus Johnson' },
      { id: 'role2', label: 'Role 2', type: 'text', defaultValue: 'Design Lead at Scale' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'The most seamless collaboration I have experienced. They truly understand modern design.' },
      { id: 'name3', label: 'Name 3', type: 'text', defaultValue: 'Elena Voss' },
      { id: 'role3', label: 'Role 3', type: 'text', defaultValue: 'Founder at Craft' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('tma')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:80px 24px;">
  <style>
    .${uid('tma')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tma')}-wrap { max-width: 600px; margin: 0 auto; }
    .${uid('tma')}-quotes { position: relative; min-height: 80px; margin-bottom: 48px; }
    .${uid('tma')}-quote { position: absolute; inset: 0; font-size: 22px; font-weight: 300; color: #1a1a1a; line-height: 1.5; opacity: 0; transform: translateY(16px); filter: blur(4px); transition: all 0.5s ease; pointer-events: none; }
    .${uid('tma')}-quote.active { opacity: 1; transform: translateY(0); filter: blur(0); pointer-events: auto; }
    .${uid('tma')}-row { display: flex; align-items: center; gap: 24px; }
    .${uid('tma')}-avatars { display: flex; margin-left: -8px; }
    .${uid('tma')}-avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #fff; margin-left: -8px; cursor: pointer; transition: all 0.3s; filter: grayscale(100%); }
    .${uid('tma')}-avatar.active { transform: scale(1.15); z-index: 10; filter: grayscale(0); }
    .${uid('tma')}-avatar:hover { filter: grayscale(0); transform: scale(1.1); }
    .${uid('tma')}-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('tma')}-divider { width: 1px; height: 32px; background: #e5e7eb; }
    .${uid('tma')}-info { position: relative; flex: 1; min-height: 44px; }
    .${uid('tma')}-author { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; opacity: 0; transform: translateX(-8px); transition: all 0.4s; pointer-events: none; }
    .${uid('tma')}-author.active { opacity: 1; transform: translateX(0); pointer-events: auto; }
    .${uid('tma')}-author .name { font-size: 14px; font-weight: 500; color: #1a1a1a; }
    .${uid('tma')}-author .role { font-size: 12px; color: #666; }
  </style>
  <div class="${uid('tma')}-wrap">
    <div class="${uid('tma')}-quotes">
      <p class="${uid('tma')}-quote active" data-index="0">"${v.quote1}"</p>
      <p class="${uid('tma')}-quote" data-index="1">"${v.quote2}"</p>
      <p class="${uid('tma')}-quote" data-index="2">"${v.quote3}"</p>
    </div>
    <div class="${uid('tma')}-row">
      <div class="${uid('tma')}-avatars">
        <div class="${uid('tma')}-avatar active" onclick="const w=this.closest('.${uid('tma')}-wrap');w.querySelectorAll('.${uid('tma')}-quote').forEach(q=>q.classList.remove('active'));w.querySelectorAll('.${uid('tma')}-quote')[0].classList.add('active');w.querySelectorAll('.${uid('tma')}-avatar').forEach(a=>a.classList.remove('active'));this.classList.add('active');w.querySelectorAll('.${uid('tma')}-author').forEach(a=>a.classList.remove('active'));w.querySelectorAll('.${uid('tma')}-author')[0].classList.add('active')"><img src="${v.image1}" alt="${v.name1}"></div>
        <div class="${uid('tma')}-avatar" onclick="const w=this.closest('.${uid('tma')}-wrap');w.querySelectorAll('.${uid('tma')}-quote').forEach(q=>q.classList.remove('active'));w.querySelectorAll('.${uid('tma')}-quote')[1].classList.add('active');w.querySelectorAll('.${uid('tma')}-avatar').forEach(a=>a.classList.remove('active'));this.classList.add('active');w.querySelectorAll('.${uid('tma')}-author').forEach(a=>a.classList.remove('active'));w.querySelectorAll('.${uid('tma')}-author')[1].classList.add('active')"><img src="${v.image2}" alt="${v.name2}"></div>
        <div class="${uid('tma')}-avatar" onclick="const w=this.closest('.${uid('tma')}-wrap');w.querySelectorAll('.${uid('tma')}-quote').forEach(q=>q.classList.remove('active'));w.querySelectorAll('.${uid('tma')}-quote')[2].classList.add('active');w.querySelectorAll('.${uid('tma')}-avatar').forEach(a=>a.classList.remove('active'));this.classList.add('active');w.querySelectorAll('.${uid('tma')}-author').forEach(a=>a.classList.remove('active'));w.querySelectorAll('.${uid('tma')}-author')[2].classList.add('active')"><img src="${v.image3}" alt="${v.name3}"></div>
      </div>
      <div class="${uid('tma')}-divider"></div>
      <div class="${uid('tma')}-info">
        <div class="${uid('tma')}-author active"><span class="name">${v.name1}</span><span class="role">${v.role1}</span></div>
        <div class="${uid('tma')}-author"><span class="name">${v.name2}</span><span class="role">${v.role2}</span></div>
        <div class="${uid('tma')}-author"><span class="name">${v.name3}</span><span class="role">${v.role3}</span></div>
      </div>
    </div>
  </div>
</div>`
  },

  // 6. Feature Showcase with Tabs
  {
    id: 'feature-showcase-tabs',
    name: 'Feature Showcase - Tabs',
    category: 'Features',
    description: 'Split layout with accordion steps and tabbed image showcase',
    thumbnail: '',
    fields: [
      { id: 'eyebrow', label: 'Eyebrow Text', type: 'text', defaultValue: 'The Atelier Experience' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'From Vision to Heirloom' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Every masterpiece begins with understanding. Our bespoke process transforms your aspirations into pieces that transcend generations.' },
      { id: 'stat1', label: 'Stat Badge 1', type: 'text', defaultValue: 'Made to Order' },
      { id: 'stat2', label: 'Stat Badge 2', type: 'text', defaultValue: '6-8 Week Craft' },
      { id: 'stat3', label: 'Stat Badge 3', type: 'text', defaultValue: 'Lifetime Care' },
      { id: 'step1Title', label: 'Step 1 Title', type: 'text', defaultValue: 'Private Consultation' },
      { id: 'step1Text', label: 'Step 1 Text', type: 'textarea', defaultValue: 'Begin with an intimate session where our design director learns your aesthetic language, lifestyle, and the story you wish your space to tell.' },
      { id: 'step2Title', label: 'Step 2 Title', type: 'text', defaultValue: 'Material Selection' },
      { id: 'step2Text', label: 'Step 2 Text', type: 'textarea', defaultValue: 'Touch and experience our curated collection of rare textiles, aged leathers, and ethically-sourced materials from heritage mills worldwide.' },
      { id: 'step3Title', label: 'Step 3 Title', type: 'text', defaultValue: 'Artisan Creation' },
      { id: 'step3Text', label: 'Step 3 Text', type: 'textarea', defaultValue: 'Watch as master craftsmen bring your vision to life using techniques passed down through generations, with your name etched in our atelier records.' },
      { id: 'tab1Label', label: 'Tab 1 Label', type: 'text', defaultValue: 'Silks' },
      { id: 'tab1Image', label: 'Tab 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'tab2Label', label: 'Tab 2 Label', type: 'text', defaultValue: 'Leathers' },
      { id: 'tab2Image', label: 'Tab 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'tab3Label', label: 'Tab 3 Label', type: 'text', defaultValue: 'Linens' },
      { id: 'tab3Image', label: 'Tab 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('fst')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:80px 24px;">
  <style>
    .${uid('fst')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fst')}-wrap { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
    .${uid('fst')}-eyebrow { display: inline-block; font-size: 12px; font-weight: 500; color: #666; padding: 6px 12px; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 16px; }
    .${uid('fst')}-title { font-size: 42px; font-weight: 700; color: #1a1a1a; line-height: 1.1; margin-bottom: 16px; }
    .${uid('fst')}-desc { font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 20px; }
    .${uid('fst')}-stats { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
    .${uid('fst')}-stat { font-size: 13px; padding: 6px 12px; background: #f3f4f6; border-radius: 6px; color: #1a1a1a; }
    .${uid('fst')}-steps { border-top: 1px solid #e5e7eb; }
    .${uid('fst')}-step { border-bottom: 1px solid #e5e7eb; }
    .${uid('fst')}-step-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 16px 0; background: none; border: none; cursor: pointer; text-align: left; }
    .${uid('fst')}-step-title { font-size: 16px; font-weight: 500; color: #1a1a1a; }
    .${uid('fst')}-step-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; transition: transform 0.3s; }
    .${uid('fst')}-step.active .${uid('fst')}-step-icon { transform: rotate(180deg); }
    .${uid('fst')}-step-icon svg { width: 16px; height: 16px; color: #666; }
    .${uid('fst')}-step-content { max-height: 0; overflow: hidden; transition: max-height 0.3s; }
    .${uid('fst')}-step.active .${uid('fst')}-step-content { max-height: 120px; }
    .${uid('fst')}-step-text { padding-bottom: 16px; font-size: 14px; color: #666; line-height: 1.6; }
    .${uid('fst')}-btns { display: flex; gap: 12px; margin-top: 24px; }
    .${uid('fst')}-btn { padding: 12px 24px; font-size: 14px; font-weight: 500; border-radius: 8px; text-decoration: none; transition: all 0.3s; }
    .${uid('fst')}-btn.primary { background: #1a1a1a; color: #fff; }
    .${uid('fst')}-btn.secondary { background: transparent; color: #1a1a1a; border: 1px solid #e5e7eb; }
    .${uid('fst')}-btn:hover { transform: translateY(-2px); }
    .${uid('fst')}-panel { position: relative; background: rgba(0,0,0,0.02); border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; height: 500px; }
    .${uid('fst')}-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.4s; }
    .${uid('fst')}-img.active { opacity: 1; }
    .${uid('fst')}-tabs { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; padding: 6px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid #e5e7eb; }
    .${uid('fst')}-tab { padding: 8px 16px; font-size: 13px; font-weight: 500; color: #666; background: transparent; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
    .${uid('fst')}-tab.active { background: #1a1a1a; color: #fff; }
    @media (max-width: 900px) { .${uid('fst')}-wrap { grid-template-columns: 1fr; } .${uid('fst')}-panel { height: 400px; } .${uid('fst')}-title { font-size: 32px; } }
  </style>
  <div class="${uid('fst')}-wrap">
    <div class="${uid('fst')}-left">
      <span class="${uid('fst')}-eyebrow">${v.eyebrow}</span>
      <h2 class="${uid('fst')}-title">${v.headline}</h2>
      <p class="${uid('fst')}-desc">${v.description}</p>
      <div class="${uid('fst')}-stats"><span class="${uid('fst')}-stat">${v.stat1}</span><span class="${uid('fst')}-stat">${v.stat2}</span><span class="${uid('fst')}-stat">${v.stat3}</span></div>
      <div class="${uid('fst')}-steps">
        <div class="${uid('fst')}-step active" onclick="this.parentElement.querySelectorAll('.${uid('fst')}-step').forEach(s=>s.classList.remove('active'));this.classList.add('active')">
          <button class="${uid('fst')}-step-btn"><span class="${uid('fst')}-step-title">${v.step1Title}</span><div class="${uid('fst')}-step-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg></div></button>
          <div class="${uid('fst')}-step-content"><p class="${uid('fst')}-step-text">${v.step1Text}</p></div>
        </div>
        <div class="${uid('fst')}-step" onclick="this.parentElement.querySelectorAll('.${uid('fst')}-step').forEach(s=>s.classList.remove('active'));this.classList.add('active')">
          <button class="${uid('fst')}-step-btn"><span class="${uid('fst')}-step-title">${v.step2Title}</span><div class="${uid('fst')}-step-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg></div></button>
          <div class="${uid('fst')}-step-content"><p class="${uid('fst')}-step-text">${v.step2Text}</p></div>
        </div>
        <div class="${uid('fst')}-step" onclick="this.parentElement.querySelectorAll('.${uid('fst')}-step').forEach(s=>s.classList.remove('active'));this.classList.add('active')">
          <button class="${uid('fst')}-step-btn"><span class="${uid('fst')}-step-title">${v.step3Title}</span><div class="${uid('fst')}-step-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg></div></button>
          <div class="${uid('fst')}-step-content"><p class="${uid('fst')}-step-text">${v.step3Text}</p></div>
        </div>
      </div>
      <div class="${uid('fst')}-btns"><a href="#" class="${uid('fst')}-btn primary">Get Started</a><a href="#" class="${uid('fst')}-btn secondary">View Examples</a></div>
    </div>
    <div class="${uid('fst')}-panel">
      <img src="${v.tab1Image}" alt="${v.tab1Label}" class="${uid('fst')}-img active" data-tab="0">
      <img src="${v.tab2Image}" alt="${v.tab2Label}" class="${uid('fst')}-img" data-tab="1">
      <img src="${v.tab3Image}" alt="${v.tab3Label}" class="${uid('fst')}-img" data-tab="2">
      <div class="${uid('fst')}-tabs">
        <button class="${uid('fst')}-tab active" onclick="this.closest('.${uid('fst')}-panel').querySelectorAll('.${uid('fst')}-img').forEach(i=>i.classList.remove('active'));this.closest('.${uid('fst')}-panel').querySelectorAll('.${uid('fst')}-img')[0].classList.add('active');this.parentElement.querySelectorAll('.${uid('fst')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">${v.tab1Label}</button>
        <button class="${uid('fst')}-tab" onclick="this.closest('.${uid('fst')}-panel').querySelectorAll('.${uid('fst')}-img').forEach(i=>i.classList.remove('active'));this.closest('.${uid('fst')}-panel').querySelectorAll('.${uid('fst')}-img')[1].classList.add('active');this.parentElement.querySelectorAll('.${uid('fst')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">${v.tab2Label}</button>
        <button class="${uid('fst')}-tab" onclick="this.closest('.${uid('fst')}-panel').querySelectorAll('.${uid('fst')}-img').forEach(i=>i.classList.remove('active'));this.closest('.${uid('fst')}-panel').querySelectorAll('.${uid('fst')}-img')[2].classList.add('active');this.parentElement.querySelectorAll('.${uid('fst')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active')">${v.tab3Label}</button>
      </div>
    </div>
  </div>
</div>`
  },

  // 7. Animated Card Stack - EXACT 1:1 from 21st.dev/r/moazamtrade/animate-card-animation
  {
    id: 'animated-card-stack',
    name: 'Animated Card Stack',
    category: 'Interactive',
    description: 'Stacked cards with shuffle animation on button click',
    thumbnail: '',
    fields: [
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Cashmere Collection' },
      { id: 'card1Desc', label: 'Card 1 Description', type: 'text', defaultValue: 'Luxury Home Textiles' },
      { id: 'card1Image', label: 'Card 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Milano Furniture' },
      { id: 'card2Desc', label: 'Card 2 Description', type: 'text', defaultValue: 'Italian Design Excellence' },
      { id: 'card2Image', label: 'Card 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/hero-sofa-image.png' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Artisan Textiles' },
      { id: 'card3Desc', label: 'Card 3 Description', type: 'text', defaultValue: 'Heritage Craftsmanship' },
      { id: 'card3Image', label: 'Card 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('acs')}-section">
  <style>
    .${uid('acs')}-section { background: ${v.bgColor}; padding: 8px 0 0 0; font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; }
    .${uid('acs')}-stack { position: relative; height: 380px; width: 100%; max-width: 644px; overflow: hidden; }
    .${uid('acs')}-card { position: absolute; left: 50%; transform: translateX(-50%); bottom: 0; display: flex; height: 280px; width: 324px; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px 12px 0 0; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-top: 1px solid #e5e7eb; background: #fff; padding: 4px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); will-change: transform; transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1); }
    .${uid('acs')}-card:nth-child(1) { z-index: 3; transform: translateX(-50%) translateY(12px) scale(1); }
    .${uid('acs')}-card:nth-child(2) { z-index: 2; transform: translateX(-50%) translateY(-16px) scale(0.95); }
    .${uid('acs')}-card:nth-child(3) { z-index: 1; transform: translateX(-50%) translateY(-44px) scale(0.9); }
    .${uid('acs')}-card.exit { transform: translateX(-50%) translateY(340px) scale(1) !important; z-index: 10 !important; }
    .${uid('acs')}-card-inner { display: flex; height: 100%; width: 100%; flex-direction: column; gap: 16px; }
    .${uid('acs')}-img-wrap { display: flex; height: 200px; width: 100%; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; outline: 1px solid rgba(0,0,0,0.1); outline-offset: -1px; }
    .${uid('acs')}-img { height: 100%; width: 100%; object-fit: cover; user-select: none; }
    .${uid('acs')}-content { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 8px; padding: 0 12px 24px 12px; }
    .${uid('acs')}-info { display: flex; flex-direction: column; min-width: 0; flex: 1; }
    .${uid('acs')}-title { font-weight: 500; color: #1a1a1a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .${uid('acs')}-desc { color: #6b7280; }
    .${uid('acs')}-read { display: flex; height: 40px; flex-shrink: 0; cursor: pointer; user-select: none; align-items: center; gap: 2px; border-radius: 9999px; background: #1a1a1a; padding-left: 16px; padding-right: 12px; font-size: 14px; font-weight: 500; color: #fff; text-decoration: none; }
    .${uid('acs')}-read svg { width: 16px; height: 16px; }
    .${uid('acs')}-controls { position: relative; z-index: 10; margin-top: -1px; display: flex; width: 100%; max-width: 644px; align-items: center; justify-content: center; border-top: 1px solid #e5e7eb; padding: 16px 0; }
    .${uid('acs')}-btn { display: flex; height: 36px; cursor: pointer; user-select: none; align-items: center; justify-content: center; gap: 4px; overflow: hidden; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; padding: 0 12px; font-weight: 500; color: #6b7280; transition: all 0.2s; }
    .${uid('acs')}-btn:hover { background: #f9fafb; }
    .${uid('acs')}-btn:active { transform: scale(0.98); }
    @media (min-width: 640px) { .${uid('acs')}-card { width: 512px; } }
  </style>
  <div class="${uid('acs')}-stack" id="${uid('acs')}-stack">
    <div class="${uid('acs')}-card">
      <div class="${uid('acs')}-card-inner">
        <div class="${uid('acs')}-img-wrap">
          <img src="${v.card1Image}" alt="${v.card1Title}" class="${uid('acs')}-img" />
        </div>
        <div class="${uid('acs')}-content">
          <div class="${uid('acs')}-info">
            <span class="${uid('acs')}-title">${v.card1Title}</span>
            <span class="${uid('acs')}-desc">${v.card1Desc}</span>
          </div>
          <a href="#" class="${uid('acs')}-read">Read<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M9.5 18L15.5 12L9.5 6"/></svg></a>
        </div>
      </div>
    </div>
    <div class="${uid('acs')}-card">
      <div class="${uid('acs')}-card-inner">
        <div class="${uid('acs')}-img-wrap">
          <img src="${v.card2Image}" alt="${v.card2Title}" class="${uid('acs')}-img" />
        </div>
        <div class="${uid('acs')}-content">
          <div class="${uid('acs')}-info">
            <span class="${uid('acs')}-title">${v.card2Title}</span>
            <span class="${uid('acs')}-desc">${v.card2Desc}</span>
          </div>
          <a href="#" class="${uid('acs')}-read">Read<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M9.5 18L15.5 12L9.5 6"/></svg></a>
        </div>
      </div>
    </div>
    <div class="${uid('acs')}-card">
      <div class="${uid('acs')}-card-inner">
        <div class="${uid('acs')}-img-wrap">
          <img src="${v.card3Image}" alt="${v.card3Title}" class="${uid('acs')}-img" />
        </div>
        <div class="${uid('acs')}-content">
          <div class="${uid('acs')}-info">
            <span class="${uid('acs')}-title">${v.card3Title}</span>
            <span class="${uid('acs')}-desc">${v.card3Desc}</span>
          </div>
          <a href="#" class="${uid('acs')}-read">Read<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M9.5 18L15.5 12L9.5 6"/></svg></a>
        </div>
      </div>
    </div>
  </div>
  <div class="${uid('acs')}-controls">
    <button class="${uid('acs')}-btn" onclick="const stack=document.getElementById('${uid('acs')}-stack');const cards=Array.from(stack.children);const first=cards[0];first.classList.add('exit');setTimeout(()=>{first.classList.remove('exit');stack.appendChild(first);const newCards=Array.from(stack.children);newCards.forEach((c,i)=>{c.style.zIndex=3-i;c.style.transform=i===0?'translateX(-50%) translateY(12px) scale(1)':i===1?'translateX(-50%) translateY(-16px) scale(0.95)':'translateX(-50%) translateY(-44px) scale(0.9)'});},1000)">Animate</button>
  </div>
</div>`
  },

  // 8. Twitter/X Style Testimonial Cards
  {
    id: 'testimonial-twitter-cards',
    name: 'Testimonial - Social Cards',
    category: 'Testimonials',
    description: 'Stacked skewed testimonial cards with social media styling',
    thumbnail: '',
    fields: [
      { id: 'card1Name', label: 'Card 1 Name', type: 'text', defaultValue: 'Victoria St. Claire' },
      { id: 'card1Handle', label: 'Card 1 Handle', type: 'text', defaultValue: '@victoriastclaire' },
      { id: 'card1Content', label: 'Card 1 Content', type: 'textarea', defaultValue: 'The cashmere throw from @MaisonElegance arrived. I\'ve never felt anything this luxurious. This is what old-money quality feels like. Absolutely exquisite.' },
      { id: 'card1Date', label: 'Card 1 Date', type: 'text', defaultValue: 'Jan 15, 2025' },
      { id: 'card1Likes', label: 'Card 1 Likes', type: 'text', defaultValue: '2,847' },
      { id: 'card2Name', label: 'Card 2 Name', type: 'text', defaultValue: 'James Whitmore III' },
      { id: 'card2Handle', label: 'Card 2 Handle', type: 'text', defaultValue: '@jwhitmore' },
      { id: 'card2Content', label: 'Card 2 Content', type: 'textarea', defaultValue: 'My interior designer said she\'d never seen this level of craftsmanship. The bespoke velvet chairs exceeded every expectation. Worth the 8-week wait.' },
      { id: 'card2Date', label: 'Card 2 Date', type: 'text', defaultValue: 'Jan 14, 2025' },
      { id: 'card2Likes', label: 'Card 2 Likes', type: 'text', defaultValue: '1,923' },
      { id: 'card3Name', label: 'Card 3 Name', type: 'text', defaultValue: 'Alexandra Montague' },
      { id: 'card3Handle', label: 'Card 3 Handle', type: 'text', defaultValue: '@alexandra_m' },
      { id: 'card3Content', label: 'Card 3 Content', type: 'textarea', defaultValue: 'Finally, a brand that understands true luxury isn\'t loud—it\'s whispered. The quality speaks for itself. My Hamptons home is transformed.' },
      { id: 'card3Date', label: 'Card 3 Date', type: 'text', defaultValue: 'Jan 13, 2025' },
      { id: 'card3Likes', label: 'Card 3 Likes', type: 'text', defaultValue: '3,156' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('ttc')}" style="background:${v.bgColor};font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;padding:80px 24px;display:flex;align-items:center;justify-content:center;min-height:500px;">
  <style>
    .${uid('ttc')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ttc')}-stack { display: grid; grid-template-areas: 'stack'; place-items: center; }
    .${uid('ttc')}-card { grid-area: stack; position: relative; display: flex; flex-direction: column; width: 320px; min-height: 180px; padding: 16px 20px; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; transform: skewY(-8deg); transition: all 0.5s cubic-bezier(0.4,0,0.2,1); }
    .${uid('ttc')}-card::after { content: ''; position: absolute; right: -4px; top: -5%; height: 110%; width: 300px; background: linear-gradient(to left, ${v.bgColor}, transparent); pointer-events: none; }
    .${uid('ttc')}-card:nth-child(1) { z-index: 1; filter: grayscale(100%); }
    .${uid('ttc')}-card:nth-child(1)::before { content: ''; position: absolute; inset: 0; background: rgba(250,250,250,0.5); border-radius: 14px; transition: opacity 0.5s; }
    .${uid('ttc')}-card:nth-child(1):hover { transform: skewY(-8deg) translateY(-40px); filter: grayscale(0); }
    .${uid('ttc')}-card:nth-child(1):hover::before { opacity: 0; }
    .${uid('ttc')}-card:nth-child(2) { transform: skewY(-8deg) translateX(64px) translateY(40px); z-index: 2; filter: grayscale(100%); }
    .${uid('ttc')}-card:nth-child(2)::before { content: ''; position: absolute; inset: 0; background: rgba(250,250,250,0.5); border-radius: 14px; transition: opacity 0.5s; }
    .${uid('ttc')}-card:nth-child(2):hover { transform: skewY(-8deg) translateX(64px) translateY(0); filter: grayscale(0); }
    .${uid('ttc')}-card:nth-child(2):hover::before { opacity: 0; }
    .${uid('ttc')}-card:nth-child(3) { transform: skewY(-8deg) translateX(128px) translateY(80px); z-index: 3; }
    .${uid('ttc')}-card:nth-child(3):hover { transform: skewY(-8deg) translateX(128px) translateY(40px); }
    .${uid('ttc')}-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; position: relative; z-index: 1; }
    .${uid('ttc')}-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; font-weight: 600; flex-shrink: 0; }
    .${uid('ttc')}-meta { flex: 1; min-width: 0; }
    .${uid('ttc')}-name { display: flex; align-items: center; gap: 4px; font-weight: 600; color: #1a1a1a; font-size: 14px; }
    .${uid('ttc')}-verified { width: 16px; height: 16px; color: #1d9bf0; }
    .${uid('ttc')}-handle { font-size: 13px; color: #666; }
    .${uid('ttc')}-icon { color: #1a1a1a; }
    .${uid('ttc')}-icon svg { width: 18px; height: 18px; }
    .${uid('ttc')}-content { font-size: 14px; color: #1a1a1a; line-height: 1.5; margin-bottom: 12px; position: relative; z-index: 1; }
    .${uid('ttc')}-footer { display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #666; margin-top: auto; position: relative; z-index: 1; }
    .${uid('ttc')}-stats { display: flex; align-items: center; gap: 16px; }
    .${uid('ttc')}-stat { display: flex; align-items: center; gap: 4px; }
    .${uid('ttc')}-stat svg { width: 16px; height: 16px; }
    @media (max-width: 600px) { .${uid('ttc')}-card { width: 260px; } .${uid('ttc')}-card:nth-child(2) { transform: skewY(-8deg) translateX(40px) translateY(32px); } .${uid('ttc')}-card:nth-child(3) { transform: skewY(-8deg) translateX(80px) translateY(64px); } }
  </style>
  <div class="${uid('ttc')}-stack">
    <div class="${uid('ttc')}-card">
      <div class="${uid('ttc')}-header">
        <div class="${uid('ttc')}-avatar">${v.card1Name.charAt(0)}</div>
        <div class="${uid('ttc')}-meta"><div class="${uid('ttc')}-name">${v.card1Name}<svg class="${uid('ttc')}-verified" viewBox="0 0 22 22" fill="#1d9bf0"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg></div><span class="${uid('ttc')}-handle">${v.card1Handle}</span></div>
        <div class="${uid('ttc')}-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
      </div>
      <p class="${uid('ttc')}-content">${v.card1Content}</p>
      <div class="${uid('ttc')}-footer"><span>${v.card1Date}</span><div class="${uid('ttc')}-stats"><span class="${uid('ttc')}-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>${v.card1Likes}</span></div></div>
    </div>
    <div class="${uid('ttc')}-card">
      <div class="${uid('ttc')}-header">
        <div class="${uid('ttc')}-avatar">${v.card2Name.charAt(0)}</div>
        <div class="${uid('ttc')}-meta"><div class="${uid('ttc')}-name">${v.card2Name}<svg class="${uid('ttc')}-verified" viewBox="0 0 22 22" fill="#1d9bf0"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg></div><span class="${uid('ttc')}-handle">${v.card2Handle}</span></div>
        <div class="${uid('ttc')}-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
      </div>
      <p class="${uid('ttc')}-content">${v.card2Content}</p>
      <div class="${uid('ttc')}-footer"><span>${v.card2Date}</span><div class="${uid('ttc')}-stats"><span class="${uid('ttc')}-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>${v.card2Likes}</span></div></div>
    </div>
    <div class="${uid('ttc')}-card">
      <div class="${uid('ttc')}-header">
        <div class="${uid('ttc')}-avatar">${v.card3Name.charAt(0)}</div>
        <div class="${uid('ttc')}-meta"><div class="${uid('ttc')}-name">${v.card3Name}<svg class="${uid('ttc')}-verified" viewBox="0 0 22 22" fill="#1d9bf0"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg></div><span class="${uid('ttc')}-handle">${v.card3Handle}</span></div>
        <div class="${uid('ttc')}-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
      </div>
      <p class="${uid('ttc')}-content">${v.card3Content}</p>
      <div class="${uid('ttc')}-footer"><span>${v.card3Date}</span><div class="${uid('ttc')}-stats"><span class="${uid('ttc')}-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>${v.card3Likes}</span></div></div>
    </div>
  </div>
</div>`
  },

  // Image Carousel Hero - 21st.dev style
  {
    id: 'hero-image-carousel',
    name: 'Image Carousel Hero',
    category: 'Hero',
    description: 'Dynamic hero with auto-scrolling image showcase and gradient text',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/hero-carousel.jpg',
    fields: [
      { id: 'badge', label: 'Badge Text', type: 'text', defaultValue: 'The Spring Collection Has Arrived' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Where Heritage Meets Modern Elegance' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Discover pieces that tell a story—each creation born from centuries of craftsmanship, reimagined for the contemporary connoisseur.' },
      { id: 'primaryBtn', label: 'Primary Button', type: 'text', defaultValue: 'Explore Collection' },
      { id: 'secondaryBtn', label: 'Secondary Button', type: 'text', defaultValue: 'Book Private Viewing' },
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/carousel-1.jpg' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/carousel-2.jpg' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/carousel-3.jpg' },
      { id: 'image4', label: 'Image 4', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/carousel-4.jpg' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#000000' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#a855f7' },
    ],
    generateHtml: (v) => `<div class="${uid('hic')}-section">
  <style>
    .${uid('hic')}-section { min-height: 100vh; background: ${v.bgColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 24px; position: relative; overflow: hidden; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('hic')}-content { text-align: center; max-width: 800px; margin-bottom: 60px; position: relative; z-index: 2; }
    .${uid('hic')}-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); border-radius: 50px; padding: 8px 20px; font-size: 14px; color: ${v.accentColor}; margin-bottom: 32px; }
    .${uid('hic')}-badge::before { content: '✦'; }
    .${uid('hic')}-headline { font-size: clamp(40px, 8vw, 72px); font-weight: 700; color: #fff; line-height: 1.1; margin: 0 0 24px; background: linear-gradient(135deg, #fff 0%, ${v.accentColor} 50%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .${uid('hic')}-subheadline { font-size: 18px; color: rgba(255,255,255,0.7); line-height: 1.6; margin: 0 0 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
    .${uid('hic')}-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .${uid('hic')}-btn-primary { background: linear-gradient(135deg, ${v.accentColor}, #f472b6); color: #fff; padding: 16px 32px; border-radius: 50px; font-size: 16px; font-weight: 600; text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; }
    .${uid('hic')}-btn-primary:hover { transform: scale(1.05); box-shadow: 0 20px 40px rgba(168,85,247,0.4); }
    .${uid('hic')}-btn-secondary { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 16px 32px; border-radius: 50px; font-size: 16px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
    .${uid('hic')}-btn-secondary:hover { background: rgba(255,255,255,0.2); }
    .${uid('hic')}-carousel { display: flex; gap: 20px; animation: ${uid('hic')}-scroll 20s linear infinite; width: max-content; }
    .${uid('hic')}-carousel-wrapper { width: 100%; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
    .${uid('hic')}-image { width: 300px; height: 200px; border-radius: 16px; object-fit: cover; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
    @keyframes ${uid('hic')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @media (max-width: 600px) { .${uid('hic')}-image { width: 200px; height: 140px; } .${uid('hic')}-buttons { flex-direction: column; align-items: stretch; } }
  </style>
  <div class="${uid('hic')}-content">
    <div class="${uid('hic')}-badge">${v.badge}</div>
    <h1 class="${uid('hic')}-headline">${v.headline}</h1>
    <p class="${uid('hic')}-subheadline">${v.subheadline}</p>
    <div class="${uid('hic')}-buttons">
      <a href="#" class="${uid('hic')}-btn-primary">${v.primaryBtn}</a>
      <a href="#" class="${uid('hic')}-btn-secondary">${v.secondaryBtn}</a>
    </div>
  </div>
  <div class="${uid('hic')}-carousel-wrapper">
    <div class="${uid('hic')}-carousel">
      <img class="${uid('hic')}-image" src="${v.image1}" alt="Showcase 1" />
      <img class="${uid('hic')}-image" src="${v.image2}" alt="Showcase 2" />
      <img class="${uid('hic')}-image" src="${v.image3}" alt="Showcase 3" />
      <img class="${uid('hic')}-image" src="${v.image4}" alt="Showcase 4" />
      <img class="${uid('hic')}-image" src="${v.image1}" alt="Showcase 1" />
      <img class="${uid('hic')}-image" src="${v.image2}" alt="Showcase 2" />
      <img class="${uid('hic')}-image" src="${v.image3}" alt="Showcase 3" />
      <img class="${uid('hic')}-image" src="${v.image4}" alt="Showcase 4" />
    </div>
  </div>
</div>`
  },

  // 3D Folder - EXACT 1:1 from 21st.dev/r/jatin-yadav05/3d-folder
  {
    id: 'folder-3d-projects',
    name: '3D Animated Folder',
    category: 'Interactive',
    description: 'Folder that opens on hover to reveal project cards with images',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/folder-3d.jpg',
    fields: [
      { id: 'folderTitle', label: 'Folder Title', type: 'text', defaultValue: 'Collections' },
      { id: 'project1Title', label: 'Project 1 Title', type: 'text', defaultValue: 'Cashmere' },
      { id: 'project1Image', label: 'Project 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'project2Title', label: 'Project 2 Title', type: 'text', defaultValue: 'Furniture' },
      { id: 'project2Image', label: 'Project 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/hero-sofa-image.png' },
      { id: 'project3Title', label: 'Project 3 Title', type: 'text', defaultValue: 'Textiles' },
      { id: 'project3Image', label: 'Project 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'accentColor', label: 'Accent/Folder Color', type: 'color', defaultValue: '#B8860B' },
    ],
    generateHtml: (v) => `<div class="${uid('f3d')}-section">
  <style>
    .${uid('f3d')}-section { background: ${v.bgColor}; padding: 60px 24px; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('f3d')}-container { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; border-radius: 16px; cursor: pointer; background: #fff; border: 1px solid #e5e7eb; transition: all 0.5s ease-out; min-width: 280px; min-height: 320px; }
    .${uid('f3d')}-container:hover { box-shadow: 0 25px 50px -12px rgba(184,134,11,0.1); border-color: rgba(184,134,11,0.3); }
    .${uid('f3d')}-glow { position: absolute; inset: 0; border-radius: 16px; background: radial-gradient(circle at 50% 70%, ${v.accentColor} 0%, transparent 70%); opacity: 0; transition: opacity 0.5s; pointer-events: none; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-glow { opacity: 0.08; }
    .${uid('f3d')}-folder-area { position: relative; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; height: 160px; width: 200px; perspective: 1000px; }
    .${uid('f3d')}-folder-back { position: absolute; width: 128px; height: 96px; background: linear-gradient(135deg, ${v.accentColor} 0%, #d97706 100%); border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transform-origin: bottom center; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 10; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-folder-back { transform: rotateX(-15deg); }
    .${uid('f3d')}-folder-tab { position: absolute; width: 48px; height: 16px; background: ${v.accentColor}; border-radius: 6px 6px 0 0; top: calc(50% - 48px - 12px); left: calc(50% - 64px + 16px); transform-origin: bottom center; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 10; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-folder-tab { transform: rotateX(-25deg) translateY(-2px); }
    .${uid('f3d')}-cards-area { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20; }
    .${uid('f3d')}-card { position: absolute; width: 80px; height: 112px; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); background: #fff; border: 1px solid #e5e7eb; cursor: pointer; left: -40px; top: -56px; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; }
    .${uid('f3d')}-card:hover { box-shadow: 0 0 0 2px rgba(184,134,11,0.5); }
    .${uid('f3d')}-card:nth-child(1) { z-index: 10; }
    .${uid('f3d')}-card:nth-child(2) { z-index: 9; }
    .${uid('f3d')}-card:nth-child(3) { z-index: 8; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-card:nth-child(1) { opacity: 1; transform: translateY(-90px) translateX(-55px) rotate(-12deg) scale(1); transition-delay: 0ms; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-card:nth-child(2) { opacity: 1; transform: translateY(-90px) translateX(0px) rotate(0deg) scale(1); transition-delay: 80ms; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-card:nth-child(3) { opacity: 1; transform: translateY(-90px) translateX(55px) rotate(12deg) scale(1); transition-delay: 160ms; }
    .${uid('f3d')}-card-img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('f3d')}-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%); }
    .${uid('f3d')}-card-title { position: absolute; bottom: 6px; left: 6px; right: 6px; font-size: 10px; font-weight: 500; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .${uid('f3d')}-folder-front { position: absolute; width: 128px; height: 96px; background: linear-gradient(135deg, ${v.accentColor} 0%, #f59e0b 100%); border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); top: calc(50% - 48px + 4px); transform-origin: bottom center; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 30; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-folder-front { transform: rotateX(25deg) translateY(8px); }
    .${uid('f3d')}-folder-shine { position: absolute; width: 128px; height: 96px; border-radius: 8px; overflow: hidden; pointer-events: none; background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%); top: calc(50% - 48px + 4px); transform-origin: bottom center; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 31; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-folder-shine { transform: rotateX(25deg) translateY(8px); }
    .${uid('f3d')}-title { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-top: 16px; transition: transform 0.3s; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-title { transform: translateY(4px); }
    .${uid('f3d')}-count { font-size: 14px; color: #6b7280; transition: opacity 0.3s; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-count { opacity: 0.7; }
    .${uid('f3d')}-hint { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7280; opacity: 0.6; transition: all 0.3s; }
    .${uid('f3d')}-container:hover .${uid('f3d')}-hint { opacity: 0; transform: translateX(-50%) translateY(10px); }
  </style>
  <div class="${uid('f3d')}-container">
    <div class="${uid('f3d')}-glow"></div>
    <div class="${uid('f3d')}-folder-area">
      <div class="${uid('f3d')}-folder-back"></div>
      <div class="${uid('f3d')}-folder-tab"></div>
      <div class="${uid('f3d')}-cards-area">
        <div class="${uid('f3d')}-card">
          <img src="${v.project1Image}" alt="${v.project1Title}" class="${uid('f3d')}-card-img" />
          <div class="${uid('f3d')}-card-overlay"></div>
          <p class="${uid('f3d')}-card-title">${v.project1Title}</p>
        </div>
        <div class="${uid('f3d')}-card">
          <img src="${v.project2Image}" alt="${v.project2Title}" class="${uid('f3d')}-card-img" />
          <div class="${uid('f3d')}-card-overlay"></div>
          <p class="${uid('f3d')}-card-title">${v.project2Title}</p>
        </div>
        <div class="${uid('f3d')}-card">
          <img src="${v.project3Image}" alt="${v.project3Title}" class="${uid('f3d')}-card-img" />
          <div class="${uid('f3d')}-card-overlay"></div>
          <p class="${uid('f3d')}-card-title">${v.project3Title}</p>
        </div>
      </div>
      <div class="${uid('f3d')}-folder-front"></div>
      <div class="${uid('f3d')}-folder-shine"></div>
    </div>
    <h3 class="${uid('f3d')}-title">${v.folderTitle}</h3>
    <p class="${uid('f3d')}-count">3 projects</p>
    <div class="${uid('f3d')}-hint"><span>Hover to explore</span></div>
  </div>
</div>`
  },

  // Reports Carousel - 21st.dev style
  {
    id: 'reports-carousel',
    name: 'Reports Carousel',
    category: 'Interactive',
    description: 'Draggable horizontal carousel showcasing annual reports or documents',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/reports-carousel.jpg',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Seasonal Lookbooks' },
      { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'A journey through our design philosophy and collections' },
      { id: 'report1Year', label: 'Report 1 Year', type: 'text', defaultValue: '2025' },
      { id: 'report1Title', label: 'Report 1 Title', type: 'text', defaultValue: 'The Spring Awakening' },
      { id: 'report2Year', label: 'Report 2 Year', type: 'text', defaultValue: '2024' },
      { id: 'report2Title', label: 'Report 2 Title', type: 'text', defaultValue: 'Winter Opulence' },
      { id: 'report3Year', label: 'Report 3 Year', type: 'text', defaultValue: '2024' },
      { id: 'report3Title', label: 'Report 3 Title', type: 'text', defaultValue: 'Autumn Heritage' },
      { id: 'report4Year', label: 'Report 4 Year', type: 'text', defaultValue: '2024' },
      { id: 'report4Title', label: 'Report 4 Title', type: 'text', defaultValue: 'Summer Riviera' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('rpc')}-section">
  <style>
    .${uid('rpc')}-section { min-height: 80vh; background: ${v.bgColor}; padding: 80px 0; font-family: system-ui, -apple-system, sans-serif; overflow: hidden; }
    .${uid('rpc')}-header { text-align: center; padding: 0 24px; margin-bottom: 60px; }
    .${uid('rpc')}-title { font-size: clamp(32px, 5vw, 48px); font-weight: 700; color: #1a1a1a; margin: 0 0 16px; }
    .${uid('rpc')}-subtitle { font-size: 18px; color: #64748b; margin: 0; }
    .${uid('rpc')}-track { display: flex; gap: 32px; padding: 20px 60px; cursor: grab; user-select: none; }
    .${uid('rpc')}-track:active { cursor: grabbing; }
    .${uid('rpc')}-card { flex-shrink: 0; width: 280px; height: 380px; background: linear-gradient(145deg, #fff, #f1f5f9); border-radius: 20px; padding: 32px; display: flex; flex-direction: column; box-shadow: 0 10px 40px rgba(0,0,0,0.08); transition: transform 0.4s, box-shadow 0.4s; position: relative; overflow: hidden; }
    .${uid('rpc')}-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${v.accentColor}, #8b5cf6); }
    .${uid('rpc')}-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
    .${uid('rpc')}-year { font-size: 64px; font-weight: 800; color: ${v.accentColor}; opacity: 0.2; line-height: 1; margin-bottom: 20px; }
    .${uid('rpc')}-card-title { font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px; }
    .${uid('rpc')}-card-desc { font-size: 14px; color: #64748b; line-height: 1.6; margin: 0 0 auto; }
    .${uid('rpc')}-download { display: inline-flex; align-items: center; gap: 8px; color: ${v.accentColor}; font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 24px; }
    .${uid('rpc')}-download:hover { text-decoration: underline; }
    .${uid('rpc')}-download svg { width: 16px; height: 16px; }
    .${uid('rpc')}-hint { text-align: center; margin-top: 40px; font-size: 14px; color: #94a3b8; }
  </style>
  <div class="${uid('rpc')}-header">
    <h2 class="${uid('rpc')}-title">${v.title}</h2>
    <p class="${uid('rpc')}-subtitle">${v.subtitle}</p>
  </div>
  <div class="${uid('rpc')}-track">
    <div class="${uid('rpc')}-card">
      <span class="${uid('rpc')}-year">${v.report1Year}</span>
      <h3 class="${uid('rpc')}-card-title">${v.report1Title}</h3>
      <p class="${uid('rpc')}-card-desc">A comprehensive overview of our strategic initiatives, financial performance, and future outlook.</p>
      <a href="#" class="${uid('rpc')}-download"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>Download Report</a>
    </div>
    <div class="${uid('rpc')}-card">
      <span class="${uid('rpc')}-year">${v.report2Year}</span>
      <h3 class="${uid('rpc')}-card-title">${v.report2Title}</h3>
      <p class="${uid('rpc')}-card-desc">Key milestones achieved and lessons learned as we expanded into new markets.</p>
      <a href="#" class="${uid('rpc')}-download"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>Download Report</a>
    </div>
    <div class="${uid('rpc')}-card">
      <span class="${uid('rpc')}-year">${v.report3Year}</span>
      <h3 class="${uid('rpc')}-card-title">${v.report3Title}</h3>
      <p class="${uid('rpc')}-card-desc">How we embraced technology to revolutionize our operations and customer experience.</p>
      <a href="#" class="${uid('rpc')}-download"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>Download Report</a>
    </div>
    <div class="${uid('rpc')}-card">
      <span class="${uid('rpc')}-year">${v.report4Year}</span>
      <h3 class="${uid('rpc')}-card-title">${v.report4Title}</h3>
      <p class="${uid('rpc')}-card-desc">The beginning of our journey, establishing core values and building the foundation.</p>
      <a href="#" class="${uid('rpc')}-download"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>Download Report</a>
    </div>
  </div>
  <p class="${uid('rpc')}-hint">← Drag to explore →</p>
</div>`
  },

  // Product Detail Page - 21st.dev style
  {
    id: 'product-detail-showcase',
    name: 'Product Detail Showcase',
    category: 'Product',
    description: 'Full product detail page with image gallery and purchase options',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/product-detail.jpg',
    fields: [
      { id: 'productName', label: 'Product Name', type: 'text', defaultValue: 'Mongolian Cashmere Throw Blanket' },
      { id: 'productDesc', label: 'Product Description', type: 'textarea', defaultValue: 'Woven from the finest Grade-A Mongolian cashmere, this heirloom-quality throw represents 200 hours of artisan craftsmanship. Each piece is individually numbered and comes with a certificate of authenticity from our master weavers.' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: '$1,890' },
      { id: 'originalPrice', label: 'Original Price', type: 'text', defaultValue: '$2,450' },
      { id: 'rating', label: 'Rating', type: 'text', defaultValue: '5.0' },
      { id: 'reviews', label: 'Reviews Count', type: 'text', defaultValue: '847' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Grade-A Cashmere' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Hand-Finished Edges' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Lifetime Warranty' },
      { id: 'productImage', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/headphones.jpg' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#000000' },
    ],
    generateHtml: (v) => `<div class="${uid('pds')}-section">
  <style>
    .${uid('pds')}-section { min-height: 100vh; background: #fff; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('pds')}-container { max-width: 1200px; margin: 0 auto; padding: 60px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
    .${uid('pds')}-gallery { position: sticky; top: 40px; }
    .${uid('pds')}-main-image { width: 100%; aspect-ratio: 1; background: #f8f8f8; border-radius: 24px; overflow: hidden; margin-bottom: 16px; }
    .${uid('pds')}-main-image img { width: 100%; height: 100%; object-fit: contain; padding: 40px; }
    .${uid('pds')}-thumbnails { display: flex; gap: 12px; }
    .${uid('pds')}-thumb { width: 80px; height: 80px; background: #f8f8f8; border-radius: 12px; border: 2px solid transparent; cursor: pointer; transition: border-color 0.3s; }
    .${uid('pds')}-thumb.active, .${uid('pds')}-thumb:hover { border-color: ${v.accentColor}; }
    .${uid('pds')}-info { padding-top: 20px; }
    .${uid('pds')}-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 50px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
    .${uid('pds')}-name { font-size: clamp(28px, 4vw, 40px); font-weight: 700; color: #1a1a1a; margin: 0 0 16px; line-height: 1.2; }
    .${uid('pds')}-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
    .${uid('pds')}-stars { display: flex; gap: 2px; color: #fbbf24; }
    .${uid('pds')}-stars svg { width: 18px; height: 18px; }
    .${uid('pds')}-rating-text { font-size: 14px; color: #666; }
    .${uid('pds')}-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 24px; }
    .${uid('pds')}-price { font-size: 36px; font-weight: 700; color: ${v.accentColor}; }
    .${uid('pds')}-original { font-size: 20px; color: #999; text-decoration: line-through; }
    .${uid('pds')}-desc { font-size: 16px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('pds')}-features { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
    .${uid('pds')}-feature { display: flex; align-items: center; gap: 8px; background: #f8f8f8; padding: 12px 16px; border-radius: 12px; font-size: 14px; color: #1a1a1a; }
    .${uid('pds')}-feature svg { width: 18px; height: 18px; color: #22c55e; }
    .${uid('pds')}-actions { display: flex; gap: 12px; }
    .${uid('pds')}-btn-buy { flex: 1; background: ${v.accentColor}; color: #fff; padding: 18px 32px; border-radius: 14px; font-size: 16px; font-weight: 600; border: none; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; }
    .${uid('pds')}-btn-buy:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .${uid('pds')}-btn-cart { background: #f8f8f8; color: #1a1a1a; padding: 18px; border-radius: 14px; border: none; cursor: pointer; transition: background 0.3s; }
    .${uid('pds')}-btn-cart:hover { background: #f0f0f0; }
    .${uid('pds')}-btn-cart svg { width: 24px; height: 24px; }
    @media (max-width: 768px) { .${uid('pds')}-container { grid-template-columns: 1fr; gap: 40px; } .${uid('pds')}-gallery { position: static; } }
  </style>
  <div class="${uid('pds')}-container">
    <div class="${uid('pds')}-gallery">
      <div class="${uid('pds')}-main-image"><img src="${v.productImage}" alt="${v.productName}" /></div>
      <div class="${uid('pds')}-thumbnails">
        <div class="${uid('pds')}-thumb active"></div>
        <div class="${uid('pds')}-thumb"></div>
        <div class="${uid('pds')}-thumb"></div>
        <div class="${uid('pds')}-thumb"></div>
      </div>
    </div>
    <div class="${uid('pds')}-info">
      <span class="${uid('pds')}-badge">In Stock</span>
      <h1 class="${uid('pds')}-name">${v.productName}</h1>
      <div class="${uid('pds')}-rating">
        <div class="${uid('pds')}-stars">${Array(5).fill('<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>').join('')}</div>
        <span class="${uid('pds')}-rating-text">${v.rating} · ${v.reviews} reviews</span>
      </div>
      <div class="${uid('pds')}-price-row">
        <span class="${uid('pds')}-price">${v.price}</span>
        <span class="${uid('pds')}-original">${v.originalPrice}</span>
      </div>
      <p class="${uid('pds')}-desc">${v.productDesc}</p>
      <div class="${uid('pds')}-features">
        <div class="${uid('pds')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>${v.feature1}</div>
        <div class="${uid('pds')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>${v.feature2}</div>
        <div class="${uid('pds')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>${v.feature3}</div>
      </div>
      <div class="${uid('pds')}-actions">
        <button class="${uid('pds')}-btn-buy">Buy Now</button>
        <button class="${uid('pds')}-btn-cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg></button>
      </div>
    </div>
  </div>
</div>`
  },

  // Team Section Grid - 21st.dev style
  {
    id: 'team-section-grid',
    name: 'Team Section Grid',
    category: 'Features',
    description: 'Clean team grid with social links and role badges',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/team-grid.jpg',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Our Master Artisans' },
      { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'Generations of expertise dedicated to perfecting your vision' },
      { id: 'member1Name', label: 'Member 1 Name', type: 'text', defaultValue: 'Isabella Fontaine' },
      { id: 'member1Role', label: 'Member 1 Role', type: 'text', defaultValue: 'Creative Director' },
      { id: 'member1Image', label: 'Member 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/team-1.jpg' },
      { id: 'member2Name', label: 'Member 2 Name', type: 'text', defaultValue: 'Alessandro Ricci' },
      { id: 'member2Role', label: 'Member 2 Role', type: 'text', defaultValue: 'Master Upholsterer' },
      { id: 'member2Image', label: 'Member 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/team-2.jpg' },
      { id: 'member3Name', label: 'Member 3 Name', type: 'text', defaultValue: 'Marguerite Beaumont' },
      { id: 'member3Role', label: 'Member 3 Role', type: 'text', defaultValue: 'Textile Curator' },
      { id: 'member3Image', label: 'Member 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/team-3.jpg' },
      { id: 'member4Name', label: 'Member 4 Name', type: 'text', defaultValue: 'Henrik Larsson' },
      { id: 'member4Role', label: 'Member 4 Role', type: 'text', defaultValue: 'Heritage Craftsman' },
      { id: 'member4Image', label: 'Member 4 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/team-4.jpg' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
    ],
    generateHtml: (v) => `<div class="${uid('tsg')}-section">
  <style>
    .${uid('tsg')}-section { padding: 100px 24px; background: #fff; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('tsg')}-container { max-width: 1200px; margin: 0 auto; }
    .${uid('tsg')}-header { text-align: center; margin-bottom: 64px; }
    .${uid('tsg')}-title { font-size: clamp(32px, 5vw, 48px); font-weight: 700; color: #1a1a1a; margin: 0 0 16px; }
    .${uid('tsg')}-subtitle { font-size: 18px; color: #64748b; margin: 0; }
    .${uid('tsg')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
    .${uid('tsg')}-card { background: #f8fafc; border-radius: 20px; overflow: hidden; transition: transform 0.4s, box-shadow 0.4s; }
    .${uid('tsg')}-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .${uid('tsg')}-image { width: 100%; aspect-ratio: 1; background: linear-gradient(135deg, #e0e7ff, #c7d2fe); overflow: hidden; }
    .${uid('tsg')}-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .${uid('tsg')}-card:hover .${uid('tsg')}-image img { transform: scale(1.1); }
    .${uid('tsg')}-info { padding: 24px; text-align: center; }
    .${uid('tsg')}-name { font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 4px; }
    .${uid('tsg')}-role { font-size: 14px; color: ${v.accentColor}; font-weight: 500; margin: 0 0 16px; }
    .${uid('tsg')}-socials { display: flex; justify-content: center; gap: 12px; }
    .${uid('tsg')}-social { width: 36px; height: 36px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; color: #64748b; transition: all 0.3s; text-decoration: none; }
    .${uid('tsg')}-social:hover { background: ${v.accentColor}; color: #fff; }
    .${uid('tsg')}-social svg { width: 16px; height: 16px; }
    @media (max-width: 900px) { .${uid('tsg')}-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 500px) { .${uid('tsg')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('tsg')}-container">
    <div class="${uid('tsg')}-header">
      <h2 class="${uid('tsg')}-title">${v.title}</h2>
      <p class="${uid('tsg')}-subtitle">${v.subtitle}</p>
    </div>
    <div class="${uid('tsg')}-grid">
      <div class="${uid('tsg')}-card">
        <div class="${uid('tsg')}-image"><img src="${v.member1Image}" alt="${v.member1Name}" /></div>
        <div class="${uid('tsg')}-info">
          <h3 class="${uid('tsg')}-name">${v.member1Name}</h3>
          <p class="${uid('tsg')}-role">${v.member1Role}</p>
          <div class="${uid('tsg')}-socials">
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="${uid('tsg')}-card">
        <div class="${uid('tsg')}-image"><img src="${v.member2Image}" alt="${v.member2Name}" /></div>
        <div class="${uid('tsg')}-info">
          <h3 class="${uid('tsg')}-name">${v.member2Name}</h3>
          <p class="${uid('tsg')}-role">${v.member2Role}</p>
          <div class="${uid('tsg')}-socials">
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="${uid('tsg')}-card">
        <div class="${uid('tsg')}-image"><img src="${v.member3Image}" alt="${v.member3Name}" /></div>
        <div class="${uid('tsg')}-info">
          <h3 class="${uid('tsg')}-name">${v.member3Name}</h3>
          <p class="${uid('tsg')}-role">${v.member3Role}</p>
          <div class="${uid('tsg')}-socials">
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="${uid('tsg')}-card">
        <div class="${uid('tsg')}-image"><img src="${v.member4Image}" alt="${v.member4Name}" /></div>
        <div class="${uid('tsg')}-info">
          <h3 class="${uid('tsg')}-name">${v.member4Name}</h3>
          <p class="${uid('tsg')}-role">${v.member4Role}</p>
          <div class="${uid('tsg')}-socials">
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" class="${uid('tsg')}-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
  },

  // Product Drop Card - 21st.dev style
  {
    id: 'product-drop-card',
    name: 'Product Drop Card',
    category: 'Product',
    description: 'Premium product launch card with countdown and animated effects',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/product-drop.jpg',
    fields: [
      { id: 'dropLabel', label: 'Drop Label', type: 'text', defaultValue: 'Atelier Exclusive · Only 50 Made' },
      { id: 'productName', label: 'Product Name', type: 'text', defaultValue: 'The Venetian Silk Robe' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Hand-sewn from rare Venetian silk, this heirloom robe features 22k gold-thread embroidery by master artisans. Each numbered piece requires 180 hours of meticulous craftsmanship.' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: '$4,890' },
      { id: 'releaseDate', label: 'Release Date', type: 'text', defaultValue: 'March 15, 2025' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Reserve Your Piece' },
      { id: 'productImage', label: 'Product Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/product-drop-img.jpg' },
      { id: 'bgGradient1', label: 'Gradient Color 1', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'bgGradient2', label: 'Gradient Color 2', type: 'color', defaultValue: '#1a1510' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
    ],
    generateHtml: (v) => `<div class="${uid('pdc')}-section">
  <style>
    .${uid('pdc')}-section { min-height: 100vh; background: linear-gradient(135deg, ${v.bgGradient1} 0%, ${v.bgGradient2} 100%); display: flex; align-items: center; justify-content: center; padding: 60px 24px; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('pdc')}-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 32px; max-width: 500px; width: 100%; overflow: hidden; position: relative; }
    .${uid('pdc')}-card::before { content: ''; position: absolute; top: -100%; left: -100%; width: 300%; height: 300%; background: conic-gradient(from 0deg, transparent, ${v.accentColor}, transparent 30%); animation: ${uid('pdc')}-rotate 4s linear infinite; opacity: 0; transition: opacity 0.5s; }
    .${uid('pdc')}-card:hover::before { opacity: 1; }
    @keyframes ${uid('pdc')}-rotate { 100% { transform: rotate(360deg); } }
    .${uid('pdc')}-inner { position: relative; background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,27,75,0.9)); border-radius: 31px; padding: 40px; }
    .${uid('pdc')}-badge { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, ${v.accentColor}, #ec4899); padding: 8px 16px; border-radius: 50px; font-size: 12px; font-weight: 600; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 24px; }
    .${uid('pdc')}-badge::before { content: ''; width: 8px; height: 8px; background: #fff; border-radius: 50%; animation: ${uid('pdc')}-pulse 1.5s ease infinite; }
    @keyframes ${uid('pdc')}-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .${uid('pdc')}-image { width: 100%; aspect-ratio: 16/10; background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2)); border-radius: 20px; margin-bottom: 32px; overflow: hidden; }
    .${uid('pdc')}-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .${uid('pdc')}-card:hover .${uid('pdc')}-image img { transform: scale(1.05); }
    .${uid('pdc')}-name { font-size: 32px; font-weight: 700; color: #fff; margin: 0 0 12px; }
    .${uid('pdc')}-desc { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.6; margin: 0 0 24px; }
    .${uid('pdc')}-meta { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; }
    .${uid('pdc')}-price { font-size: 28px; font-weight: 700; color: #fff; }
    .${uid('pdc')}-date { font-size: 14px; color: rgba(255,255,255,0.5); }
    .${uid('pdc')}-date span { display: block; font-size: 16px; color: ${v.accentColor}; font-weight: 600; margin-top: 4px; }
    .${uid('pdc')}-cta { width: 100%; background: linear-gradient(135deg, ${v.accentColor}, #ec4899); color: #fff; padding: 18px; border-radius: 16px; font-size: 16px; font-weight: 600; border: none; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; }
    .${uid('pdc')}-cta:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(168,85,247,0.4); }
  </style>
  <div class="${uid('pdc')}-card">
    <div class="${uid('pdc')}-inner">
      <div class="${uid('pdc')}-badge">${v.dropLabel}</div>
      <div class="${uid('pdc')}-image"><img src="${v.productImage}" alt="${v.productName}" /></div>
      <h2 class="${uid('pdc')}-name">${v.productName}</h2>
      <p class="${uid('pdc')}-desc">${v.description}</p>
      <div class="${uid('pdc')}-meta">
        <div class="${uid('pdc')}-price">${v.price}</div>
        <div class="${uid('pdc')}-date">Drops on<span>${v.releaseDate}</span></div>
      </div>
      <button class="${uid('pdc')}-cta">${v.ctaText}</button>
    </div>
  </div>
</div>`
  },

  // Financial Hero - 21st.dev style
  {
    id: 'hero-financial',
    name: 'Financial Hero',
    category: 'Hero',
    description: 'Professional financial services hero with trust indicators and stats',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/financial-hero.jpg',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Invest in Pieces That Appreciate' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Our curated collection of investment-grade furniture and textiles has outperformed traditional assets by 340% over the past decade. True luxury doesn\'t depreciate—it becomes legacy.' },
      { id: 'primaryBtn', label: 'Primary Button', type: 'text', defaultValue: 'View Investment Pieces' },
      { id: 'secondaryBtn', label: 'Secondary Button', type: 'text', defaultValue: 'Speak to an Advisor' },
      { id: 'stat1Value', label: 'Stat 1 Value', type: 'text', defaultValue: '340%' },
      { id: 'stat1Label', label: 'Stat 1 Label', type: 'text', defaultValue: '10-Year Appreciation' },
      { id: 'stat2Value', label: 'Stat 2 Value', type: 'text', defaultValue: '47' },
      { id: 'stat2Label', label: 'Stat 2 Label', type: 'text', defaultValue: 'Heritage Craftsmen' },
      { id: 'stat3Value', label: 'Stat 3 Value', type: 'text', defaultValue: '1847' },
      { id: 'stat3Label', label: 'Stat 3 Label', type: 'text', defaultValue: 'Year Established' },
      { id: 'trustText', label: 'Trust Badge Text', type: 'text', defaultValue: 'Certified Authentic · Insured Worldwide · White Glove Service' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
    ],
    generateHtml: (v) => `<div class="${uid('fh')}-section">
  <style>
    .${uid('fh')}-section { min-height: 100vh; background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%); display: flex; flex-direction: column; justify-content: center; padding: 80px 24px; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('fh')}-container { max-width: 1200px; margin: 0 auto; width: 100%; }
    .${uid('fh')}-content { text-align: center; max-width: 800px; margin: 0 auto 60px; }
    .${uid('fh')}-trust { display: inline-flex; align-items: center; gap: 8px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 50px; padding: 10px 20px; font-size: 13px; color: ${v.accentColor}; margin-bottom: 32px; font-weight: 500; }
    .${uid('fh')}-trust svg { width: 16px; height: 16px; }
    .${uid('fh')}-headline { font-size: clamp(40px, 6vw, 64px); font-weight: 700; color: #1a1a1a; line-height: 1.1; margin: 0 0 24px; letter-spacing: -0.02em; }
    .${uid('fh')}-subheadline { font-size: 20px; color: #64748b; line-height: 1.6; margin: 0 0 40px; }
    .${uid('fh')}-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .${uid('fh')}-btn-primary { background: ${v.accentColor}; color: #fff; padding: 18px 36px; border-radius: 14px; font-size: 16px; font-weight: 600; text-decoration: none; transition: all 0.3s; box-shadow: 0 10px 30px rgba(16,185,129,0.3); }
    .${uid('fh')}-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 40px rgba(16,185,129,0.4); }
    .${uid('fh')}-btn-secondary { background: #fff; color: #1a1a1a; padding: 18px 36px; border-radius: 14px; font-size: 16px; font-weight: 600; text-decoration: none; border: 1px solid #e2e8f0; transition: all 0.3s; }
    .${uid('fh')}-btn-secondary:hover { border-color: #cbd5e1; background: #f8fafc; }
    .${uid('fh')}-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; max-width: 700px; margin: 0 auto; padding: 60px 40px; background: #fff; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.06); }
    .${uid('fh')}-stat { text-align: center; }
    .${uid('fh')}-stat-value { font-size: 36px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('fh')}-stat-label { font-size: 14px; color: #64748b; font-weight: 500; }
    @media (max-width: 600px) { .${uid('fh')}-stats { grid-template-columns: 1fr; gap: 32px; padding: 40px 24px; } .${uid('fh')}-buttons { flex-direction: column; align-items: stretch; } }
  </style>
  <div class="${uid('fh')}-container">
    <div class="${uid('fh')}-content">
      <div class="${uid('fh')}-trust"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>${v.trustText}</div>
      <h1 class="${uid('fh')}-headline">${v.headline}</h1>
      <p class="${uid('fh')}-subheadline">${v.subheadline}</p>
      <div class="${uid('fh')}-buttons">
        <a href="#" class="${uid('fh')}-btn-primary">${v.primaryBtn}</a>
        <a href="#" class="${uid('fh')}-btn-secondary">${v.secondaryBtn}</a>
      </div>
    </div>
    <div class="${uid('fh')}-stats">
      <div class="${uid('fh')}-stat">
        <div class="${uid('fh')}-stat-value">${v.stat1Value}</div>
        <div class="${uid('fh')}-stat-label">${v.stat1Label}</div>
      </div>
      <div class="${uid('fh')}-stat">
        <div class="${uid('fh')}-stat-value">${v.stat2Value}</div>
        <div class="${uid('fh')}-stat-label">${v.stat2Label}</div>
      </div>
      <div class="${uid('fh')}-stat">
        <div class="${uid('fh')}-stat-value">${v.stat3Value}</div>
        <div class="${uid('fh')}-stat-label">${v.stat3Label}</div>
      </div>
    </div>
  </div>
</div>`
  },

  // Statistics Card with Bar Charts - 21st.dev style
  {
    id: 'statistics-bar-chart',
    name: 'Statistics Bar Chart',
    category: 'Features',
    description: 'Animated statistics card with visual bar chart representation',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/stats-chart.jpg',
    fields: [
      { id: 'title', label: 'Card Title', type: 'text', defaultValue: 'Our Commitment to Excellence' },
      { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'What sets our atelier apart' },
      { id: 'metric1Label', label: 'Metric 1 Label', type: 'text', defaultValue: 'Client Satisfaction' },
      { id: 'metric1Value', label: 'Metric 1 Value', type: 'text', defaultValue: '98%' },
      { id: 'metric1Width', label: 'Metric 1 Bar Width (0-100)', type: 'number', defaultValue: '98' },
      { id: 'metric2Label', label: 'Metric 2 Label', type: 'text', defaultValue: 'Repeat Collectors' },
      { id: 'metric2Value', label: 'Metric 2 Value', type: 'text', defaultValue: '94%' },
      { id: 'metric2Width', label: 'Metric 2 Bar Width (0-100)', type: 'number', defaultValue: '94' },
      { id: 'metric3Label', label: 'Metric 3 Label', type: 'text', defaultValue: 'Artisan Retention' },
      { id: 'metric3Value', label: 'Metric 3 Value', type: 'text', defaultValue: '100%' },
      { id: 'metric3Width', label: 'Metric 3 Bar Width (0-100)', type: 'number', defaultValue: '100' },
      { id: 'metric4Label', label: 'Metric 4 Label', type: 'text', defaultValue: 'Heirloom Quality' },
      { id: 'metric4Value', label: 'Metric 4 Value', type: 'text', defaultValue: '100%' },
      { id: 'metric4Width', label: 'Metric 4 Bar Width (0-100)', type: 'number', defaultValue: '100' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('sbc')}-section">
  <style>
    .${uid('sbc')}-section { min-height: 60vh; background: ${v.bgColor}; display: flex; align-items: center; justify-content: center; padding: 60px 24px; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('sbc')}-card { background: #fff; border-radius: 24px; padding: 40px; max-width: 500px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
    .${uid('sbc')}-header { margin-bottom: 32px; }
    .${uid('sbc')}-title { font-size: 24px; font-weight: 700; color: #1a1a1a; margin: 0 0 8px; }
    .${uid('sbc')}-subtitle { font-size: 14px; color: #64748b; margin: 0; }
    .${uid('sbc')}-metrics { display: flex; flex-direction: column; gap: 24px; }
    .${uid('sbc')}-metric { }
    .${uid('sbc')}-metric-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .${uid('sbc')}-metric-label { font-size: 14px; font-weight: 500; color: #1a1a1a; }
    .${uid('sbc')}-metric-value { font-size: 14px; font-weight: 600; color: ${v.accentColor}; }
    .${uid('sbc')}-bar-bg { height: 12px; background: #f1f5f9; border-radius: 6px; overflow: hidden; }
    .${uid('sbc')}-bar { height: 100%; background: linear-gradient(90deg, ${v.accentColor}, #a855f7); border-radius: 6px; transition: width 1s ease-out; }
    .${uid('sbc')}-metric:nth-child(1) .${uid('sbc')}-bar { width: ${v.metric1Width}%; animation: ${uid('sbc')}-grow1 1.5s ease-out; }
    .${uid('sbc')}-metric:nth-child(2) .${uid('sbc')}-bar { width: ${v.metric2Width}%; animation: ${uid('sbc')}-grow2 1.5s ease-out 0.1s both; }
    .${uid('sbc')}-metric:nth-child(3) .${uid('sbc')}-bar { width: ${v.metric3Width}%; animation: ${uid('sbc')}-grow3 1.5s ease-out 0.2s both; }
    .${uid('sbc')}-metric:nth-child(4) .${uid('sbc')}-bar { width: ${v.metric4Width}%; animation: ${uid('sbc')}-grow4 1.5s ease-out 0.3s both; }
    @keyframes ${uid('sbc')}-grow1 { from { width: 0; } to { width: ${v.metric1Width}%; } }
    @keyframes ${uid('sbc')}-grow2 { from { width: 0; } to { width: ${v.metric2Width}%; } }
    @keyframes ${uid('sbc')}-grow3 { from { width: 0; } to { width: ${v.metric3Width}%; } }
    @keyframes ${uid('sbc')}-grow4 { from { width: 0; } to { width: ${v.metric4Width}%; } }
  </style>
  <div class="${uid('sbc')}-card">
    <div class="${uid('sbc')}-header">
      <h3 class="${uid('sbc')}-title">${v.title}</h3>
      <p class="${uid('sbc')}-subtitle">${v.subtitle}</p>
    </div>
    <div class="${uid('sbc')}-metrics">
      <div class="${uid('sbc')}-metric">
        <div class="${uid('sbc')}-metric-header">
          <span class="${uid('sbc')}-metric-label">${v.metric1Label}</span>
          <span class="${uid('sbc')}-metric-value">${v.metric1Value}</span>
        </div>
        <div class="${uid('sbc')}-bar-bg"><div class="${uid('sbc')}-bar"></div></div>
      </div>
      <div class="${uid('sbc')}-metric">
        <div class="${uid('sbc')}-metric-header">
          <span class="${uid('sbc')}-metric-label">${v.metric2Label}</span>
          <span class="${uid('sbc')}-metric-value">${v.metric2Value}</span>
        </div>
        <div class="${uid('sbc')}-bar-bg"><div class="${uid('sbc')}-bar"></div></div>
      </div>
      <div class="${uid('sbc')}-metric">
        <div class="${uid('sbc')}-metric-header">
          <span class="${uid('sbc')}-metric-label">${v.metric3Label}</span>
          <span class="${uid('sbc')}-metric-value">${v.metric3Value}</span>
        </div>
        <div class="${uid('sbc')}-bar-bg"><div class="${uid('sbc')}-bar"></div></div>
      </div>
      <div class="${uid('sbc')}-metric">
        <div class="${uid('sbc')}-metric-header">
          <span class="${uid('sbc')}-metric-label">${v.metric4Label}</span>
          <span class="${uid('sbc')}-metric-value">${v.metric4Value}</span>
        </div>
        <div class="${uid('sbc')}-bar-bg"><div class="${uid('sbc')}-bar"></div></div>
      </div>
    </div>
  </div>
</div>`
  },

  // ========== PREMIUM 21st.dev LUXURY SECTIONS - BATCH 3 ==========

  // 1. Statistics Card - Luxury Performance Metrics
  {
    id: 'luxury-stats-comparison',
    name: 'Statistics - Luxury Brand Comparison',
    category: 'Features',
    description: 'Animated bar chart comparing brand performance with elegant styling',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/stats-comparison.jpg',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Excellence Isn\'t Claimed. It\'s Proven.' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'When discerning clients compare, the numbers speak with unmistakable clarity.' },
      { id: 'brand1Name', label: 'Competitor 1 Name', type: 'text', defaultValue: 'Generic Imports' },
      { id: 'brand1Value', label: 'Competitor 1 Value', type: 'number', defaultValue: '35' },
      { id: 'brand2Name', label: 'Competitor 2 Name', type: 'text', defaultValue: 'Fast Fashion' },
      { id: 'brand2Value', label: 'Competitor 2 Value', type: 'number', defaultValue: '28' },
      { id: 'ourBrandName', label: 'Your Brand Name', type: 'text', defaultValue: 'MAISON ÉLÉGANCE' },
      { id: 'ourBrandValue', label: 'Your Brand Value', type: 'number', defaultValue: '97' },
      { id: 'brand4Name', label: 'Competitor 3 Name', type: 'text', defaultValue: 'Mass Market' },
      { id: 'brand4Value', label: 'Competitor 3 Value', type: 'number', defaultValue: '42' },
      { id: 'metricLabel', label: 'Metric Label', type: 'text', defaultValue: 'Customer Satisfaction' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
    ],
    generateHtml: (v) => `<div class="${uid('lsc')}-section">
  <style>
    .${uid('lsc')}-section { min-height: 100vh; background: ${v.bgColor}; padding: 100px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'SF Pro Display', -apple-system, sans-serif; }
    .${uid('lsc')}-header { text-align: center; max-width: 700px; margin-bottom: 80px; }
    .${uid('lsc')}-title { font-size: clamp(36px, 5vw, 56px); font-weight: 300; color: #fff; line-height: 1.2; margin: 0 0 24px; letter-spacing: -0.02em; }
    .${uid('lsc')}-sub { font-size: 18px; color: rgba(255,255,255,0.6); line-height: 1.7; margin: 0; }
    .${uid('lsc')}-chart { display: flex; align-items: flex-end; justify-content: center; gap: clamp(12px, 3vw, 32px); height: 400px; max-width: 900px; width: 100%; }
    .${uid('lsc')}-bar-wrap { flex: 1; max-width: 160px; display: flex; flex-direction: column; align-items: center; height: 100%; }
    .${uid('lsc')}-bar-container { width: 100%; height: 100%; background: rgba(255,255,255,0.03); border-radius: 24px; overflow: hidden; position: relative; display: flex; align-items: flex-end; }
    .${uid('lsc')}-bar { width: 100%; border-radius: 24px 24px 0 0; display: flex; align-items: flex-start; justify-content: center; padding-top: 20px; animation: ${uid('lsc')}-grow 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; transform-origin: bottom; }
    .${uid('lsc')}-bar.competitor { background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%); }
    .${uid('lsc')}-bar.highlight { background: linear-gradient(180deg, ${v.accentColor} 0%, rgba(184,134,11,0.6) 100%); box-shadow: 0 -20px 60px rgba(184,134,11,0.4); }
    .${uid('lsc')}-value { font-size: 28px; font-weight: 600; color: #fff; }
    .${uid('lsc')}-bar.highlight .${uid('lsc')}-value { color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
    .${uid('lsc')}-label { margin-top: 20px; font-size: 13px; color: rgba(255,255,255,0.5); text-align: center; text-transform: uppercase; letter-spacing: 0.1em; }
    .${uid('lsc')}-bar-wrap.highlight .${uid('lsc')}-label { color: ${v.accentColor}; font-weight: 600; }
    .${uid('lsc')}-tooltip { position: absolute; top: -60px; left: 50%; transform: translateX(-50%); background: ${v.accentColor}; color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; white-space: nowrap; opacity: 0; animation: ${uid('lsc')}-tooltip 0.5s ease-out 1.5s forwards; }
    .${uid('lsc')}-tooltip::after { content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); border: 8px solid transparent; border-top-color: ${v.accentColor}; }
    .${uid('lsc')}-metric { margin-top: 60px; font-size: 14px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.2em; }
    @keyframes ${uid('lsc')}-grow { from { height: 0; } }
    @keyframes ${uid('lsc')}-tooltip { to { opacity: 1; } }
    @media (max-width: 600px) { .${uid('lsc')}-chart { height: 300px; } .${uid('lsc')}-value { font-size: 20px; } }
  </style>
  <div class="${uid('lsc')}-header">
    <h2 class="${uid('lsc')}-title">${v.headline}</h2>
    <p class="${uid('lsc')}-sub">${v.subheadline}</p>
  </div>
  <div class="${uid('lsc')}-chart">
    <div class="${uid('lsc')}-bar-wrap">
      <div class="${uid('lsc')}-bar-container">
        <div class="${uid('lsc')}-bar competitor" style="height: ${v.brand1Value}%;">
          <span class="${uid('lsc')}-value">${v.brand1Value}%</span>
        </div>
      </div>
      <p class="${uid('lsc')}-label">${v.brand1Name}</p>
    </div>
    <div class="${uid('lsc')}-bar-wrap">
      <div class="${uid('lsc')}-bar-container">
        <div class="${uid('lsc')}-bar competitor" style="height: ${v.brand2Value}%;">
          <span class="${uid('lsc')}-value">${v.brand2Value}%</span>
        </div>
      </div>
      <p class="${uid('lsc')}-label">${v.brand2Name}</p>
    </div>
    <div class="${uid('lsc')}-bar-wrap highlight">
      <div class="${uid('lsc')}-bar-container">
        <div class="${uid('lsc')}-tooltip">${v.metricLabel}</div>
        <div class="${uid('lsc')}-bar highlight" style="height: ${v.ourBrandValue}%;">
          <span class="${uid('lsc')}-value">${v.ourBrandValue}%</span>
        </div>
      </div>
      <p class="${uid('lsc')}-label">${v.ourBrandName}</p>
    </div>
    <div class="${uid('lsc')}-bar-wrap">
      <div class="${uid('lsc')}-bar-container">
        <div class="${uid('lsc')}-bar competitor" style="height: ${v.brand4Value}%;">
          <span class="${uid('lsc')}-value">${v.brand4Value}%</span>
        </div>
      </div>
      <p class="${uid('lsc')}-label">${v.brand4Name}</p>
    </div>
  </div>
  <p class="${uid('lsc')}-metric">Measuring: ${v.metricLabel}</p>
</div>`
  },

  // 2. Offer Carousel - EXACT 1:1 from 21st.dev/r/ravikatiyar162/offer-carousel
  {
    id: 'offer-carousel',
    name: 'Offer Carousel',
    category: 'Product',
    description: 'Horizontal scrolling offer cards with hover animations',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/offers-carousel.jpg',
    fields: [
      { id: 'offer1Image', label: 'Offer 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'offer1Tag', label: 'Offer 1 Tag', type: 'text', defaultValue: 'Limited Edition' },
      { id: 'offer1Title', label: 'Offer 1 Title', type: 'text', defaultValue: 'Cashmere Collection' },
      { id: 'offer1Desc', label: 'Offer 1 Description', type: 'text', defaultValue: 'Hand-selected Grade-A Mongolian cashmere' },
      { id: 'offer1Brand', label: 'Offer 1 Brand', type: 'text', defaultValue: 'Maison Élite' },
      { id: 'offer1Code', label: 'Offer 1 Promo Code', type: 'text', defaultValue: 'LUXE40' },
      { id: 'offer1Logo', label: 'Offer 1 Brand Logo', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/brand-logo-1.png' },
      { id: 'offer2Image', label: 'Offer 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/hero-sofa-image.png' },
      { id: 'offer2Tag', label: 'Offer 2 Tag', type: 'text', defaultValue: 'New Arrival' },
      { id: 'offer2Title', label: 'Offer 2 Title', type: 'text', defaultValue: 'Milano Furniture' },
      { id: 'offer2Desc', label: 'Offer 2 Description', type: 'text', defaultValue: 'Italian-crafted velvet sofas and chairs' },
      { id: 'offer2Brand', label: 'Offer 2 Brand', type: 'text', defaultValue: 'Casa Moderna' },
      { id: 'offer2Code', label: 'Offer 2 Promo Code', type: 'text', defaultValue: 'MILANO25' },
      { id: 'offer2Logo', label: 'Offer 2 Brand Logo', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/brand-logo-2.png' },
      { id: 'offer3Image', label: 'Offer 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'offer3Tag', label: 'Offer 3 Tag', type: 'text', defaultValue: 'Exclusive' },
      { id: 'offer3Title', label: 'Offer 3 Title', type: 'text', defaultValue: 'Artisan Textiles' },
      { id: 'offer3Desc', label: 'Offer 3 Description', type: 'text', defaultValue: 'Hand-woven linens from heritage mills' },
      { id: 'offer3Brand', label: 'Offer 3 Brand', type: 'text', defaultValue: 'Heritage Home' },
      { id: 'offer3Code', label: 'Offer 3 Promo Code', type: 'text', defaultValue: 'ARTISAN30' },
      { id: 'offer3Logo', label: 'Offer 3 Brand Logo', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/brand-logo-3.png' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'cardBgColor', label: 'Card Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
    ],
    generateHtml: (v) => `<div class="${uid('ofc')}-section">
  <style>
    .${uid('ofc')}-section { background: ${v.bgColor}; padding: 60px 24px; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('ofc')}-wrapper { position: relative; width: 100%; }
    .${uid('ofc')}-wrapper:hover .${uid('ofc')}-nav { opacity: 1; }
    .${uid('ofc')}-nav { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.5); backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.3s, background 0.3s; }
    .${uid('ofc')}-nav:hover { background: rgba(255,255,255,0.8); }
    .${uid('ofc')}-nav-left { left: 0; }
    .${uid('ofc')}-nav-right { right: 0; }
    .${uid('ofc')}-nav svg { width: 24px; height: 24px; color: #1a1a1a; }
    .${uid('ofc')}-scroll { display: flex; gap: 24px; overflow-x: auto; padding: 16px 0; scroll-snap-type: x mandatory; scrollbar-width: none; }
    .${uid('ofc')}-scroll::-webkit-scrollbar { display: none; }
    .${uid('ofc')}-card { position: relative; flex-shrink: 0; width: 300px; height: 380px; border-radius: 16px; overflow: hidden; scroll-snap-align: start; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; }
    .${uid('ofc')}-card:hover { transform: translateY(-8px); }
    .${uid('ofc')}-card-img { position: absolute; inset: 0; width: 100%; height: 50%; object-fit: cover; transition: transform 0.5s; }
    .${uid('ofc')}-card:hover .${uid('ofc')}-card-img { transform: scale(1.1); }
    .${uid('ofc')}-card-content { position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: ${v.cardBgColor}; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; }
    .${uid('ofc')}-card-top { display: flex; flex-direction: column; gap: 8px; }
    .${uid('ofc')}-tag { display: flex; align-items: center; font-size: 12px; color: #6b7280; }
    .${uid('ofc')}-tag svg { width: 16px; height: 16px; margin-right: 8px; color: ${v.accentColor}; }
    .${uid('ofc')}-card-title { font-size: 20px; font-weight: 700; color: #1a1a1a; line-height: 1.2; margin: 0; }
    .${uid('ofc')}-card-desc { font-size: 14px; color: #6b7280; margin: 0; }
    .${uid('ofc')}-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid #e5e7eb; }
    .${uid('ofc')}-brand { display: flex; align-items: center; gap: 12px; }
    .${uid('ofc')}-brand-logo { width: 32px; height: 32px; border-radius: 50%; background: #f3f4f6; object-fit: cover; }
    .${uid('ofc')}-brand-info { display: flex; flex-direction: column; }
    .${uid('ofc')}-brand-name { font-size: 12px; font-weight: 600; color: #1a1a1a; }
    .${uid('ofc')}-brand-code { font-size: 12px; color: #6b7280; }
    .${uid('ofc')}-arrow { width: 32px; height: 32px; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #6b7280; transition: all 0.3s; }
    .${uid('ofc')}-card:hover .${uid('ofc')}-arrow { transform: rotate(-45deg); background: ${v.accentColor}; color: #fff; }
    .${uid('ofc')}-arrow svg { width: 16px; height: 16px; }
  </style>
  <div class="${uid('ofc')}-wrapper">
    <button class="${uid('ofc')}-nav ${uid('ofc')}-nav-left" onclick="this.parentElement.querySelector('.${uid('ofc')}-scroll').scrollBy({left:-240,behavior:'smooth'})">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <div class="${uid('ofc')}-scroll">
      <a href="#" class="${uid('ofc')}-card">
        <img src="${v.offer1Image}" alt="${v.offer1Title}" class="${uid('ofc')}-card-img" />
        <div class="${uid('ofc')}-card-content">
          <div class="${uid('ofc')}-card-top">
            <div class="${uid('ofc')}-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>${v.offer1Tag}</div>
            <h3 class="${uid('ofc')}-card-title">${v.offer1Title}</h3>
            <p class="${uid('ofc')}-card-desc">${v.offer1Desc}</p>
          </div>
          <div class="${uid('ofc')}-card-footer">
            <div class="${uid('ofc')}-brand">
              <img src="${v.offer1Logo}" alt="${v.offer1Brand}" class="${uid('ofc')}-brand-logo" />
              <div class="${uid('ofc')}-brand-info">
                <span class="${uid('ofc')}-brand-name">${v.offer1Brand}</span>
                <span class="${uid('ofc')}-brand-code">${v.offer1Code}</span>
              </div>
            </div>
            <div class="${uid('ofc')}-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </div>
        </div>
      </a>
      <a href="#" class="${uid('ofc')}-card">
        <img src="${v.offer2Image}" alt="${v.offer2Title}" class="${uid('ofc')}-card-img" />
        <div class="${uid('ofc')}-card-content">
          <div class="${uid('ofc')}-card-top">
            <div class="${uid('ofc')}-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>${v.offer2Tag}</div>
            <h3 class="${uid('ofc')}-card-title">${v.offer2Title}</h3>
            <p class="${uid('ofc')}-card-desc">${v.offer2Desc}</p>
          </div>
          <div class="${uid('ofc')}-card-footer">
            <div class="${uid('ofc')}-brand">
              <img src="${v.offer2Logo}" alt="${v.offer2Brand}" class="${uid('ofc')}-brand-logo" />
              <div class="${uid('ofc')}-brand-info">
                <span class="${uid('ofc')}-brand-name">${v.offer2Brand}</span>
                <span class="${uid('ofc')}-brand-code">${v.offer2Code}</span>
              </div>
            </div>
            <div class="${uid('ofc')}-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </div>
        </div>
      </a>
      <a href="#" class="${uid('ofc')}-card">
        <img src="${v.offer3Image}" alt="${v.offer3Title}" class="${uid('ofc')}-card-img" />
        <div class="${uid('ofc')}-card-content">
          <div class="${uid('ofc')}-card-top">
            <div class="${uid('ofc')}-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>${v.offer3Tag}</div>
            <h3 class="${uid('ofc')}-card-title">${v.offer3Title}</h3>
            <p class="${uid('ofc')}-card-desc">${v.offer3Desc}</p>
          </div>
          <div class="${uid('ofc')}-card-footer">
            <div class="${uid('ofc')}-brand">
              <img src="${v.offer3Logo}" alt="${v.offer3Brand}" class="${uid('ofc')}-brand-logo" />
              <div class="${uid('ofc')}-brand-info">
                <span class="${uid('ofc')}-brand-name">${v.offer3Brand}</span>
                <span class="${uid('ofc')}-brand-code">${v.offer3Code}</span>
              </div>
            </div>
            <div class="${uid('ofc')}-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </div>
        </div>
      </a>
    </div>
    <button class="${uid('ofc')}-nav ${uid('ofc')}-nav-right" onclick="this.parentElement.querySelector('.${uid('ofc')}-scroll').scrollBy({left:240,behavior:'smooth'})">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</div>`
  },

  // 3. Luxury Journey Roadmap
  {
    id: 'luxury-journey-roadmap',
    name: 'Journey - Craftsmanship Roadmap',
    category: 'Story',
    description: 'Animated milestone roadmap showcasing brand journey',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/roadmap.jpg',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'A Legacy of Craftsmanship' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'From raw material to your home—every piece tells a story of dedication, artistry, and uncompromising standards.' },
      { id: 'step1Title', label: 'Step 1 Title', type: 'text', defaultValue: 'Sourcing Excellence' },
      { id: 'step1Desc', label: 'Step 1 Description', type: 'text', defaultValue: 'Hand-selected materials from heritage suppliers' },
      { id: 'step2Title', label: 'Step 2 Title', type: 'text', defaultValue: 'Master Artisans' },
      { id: 'step2Desc', label: 'Step 2 Description', type: 'text', defaultValue: 'Crafted by third-generation specialists' },
      { id: 'step3Title', label: 'Step 3 Title', type: 'text', defaultValue: 'Quality Assurance' },
      { id: 'step3Desc', label: 'Step 3 Description', type: 'text', defaultValue: '47-point inspection before approval' },
      { id: 'step4Title', label: 'Step 4 Title', type: 'text', defaultValue: 'White Glove Delivery' },
      { id: 'step4Desc', label: 'Step 4 Description', type: 'text', defaultValue: 'Personally delivered and installed' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#faf9f7' },
    ],
    generateHtml: (v) => `<div class="${uid('ljr')}-section">
  <style>
    .${uid('ljr')}-section { min-height: 100vh; background: ${v.bgColor}; padding: 100px 24px; font-family: 'SF Pro Display', -apple-system, sans-serif; }
    .${uid('ljr')}-header { text-align: center; max-width: 650px; margin: 0 auto 80px; }
    .${uid('ljr')}-title { font-size: clamp(36px, 5vw, 52px); font-weight: 300; color: #1a1a1a; line-height: 1.2; margin: 0 0 20px; letter-spacing: -0.02em; }
    .${uid('ljr')}-sub { font-size: 18px; color: #666; line-height: 1.7; margin: 0; }
    .${uid('ljr')}-timeline { max-width: 900px; margin: 0 auto; position: relative; }
    .${uid('ljr')}-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, transparent 0%, ${v.accentColor} 10%, ${v.accentColor} 90%, transparent 100%); transform: translateX(-50%); }
    .${uid('ljr')}-step { display: flex; align-items: center; margin-bottom: 60px; opacity: 0; animation: ${uid('ljr')}-fadeIn 0.8s ease-out forwards; }
    .${uid('ljr')}-step:nth-child(1) { animation-delay: 0.2s; }
    .${uid('ljr')}-step:nth-child(2) { animation-delay: 0.4s; flex-direction: row-reverse; }
    .${uid('ljr')}-step:nth-child(3) { animation-delay: 0.6s; }
    .${uid('ljr')}-step:nth-child(4) { animation-delay: 0.8s; flex-direction: row-reverse; }
    .${uid('ljr')}-content { flex: 1; padding: 0 40px; }
    .${uid('ljr')}-step:nth-child(odd) .${uid('ljr')}-content { text-align: right; }
    .${uid('ljr')}-step:nth-child(even) .${uid('ljr')}-content { text-align: left; }
    .${uid('ljr')}-number { width: 60px; height: 60px; background: #fff; border: 2px solid ${v.accentColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 600; color: ${v.accentColor}; position: relative; z-index: 2; box-shadow: 0 10px 30px rgba(184,134,11,0.15); }
    .${uid('ljr')}-step-title { font-size: 24px; font-weight: 500; color: #1a1a1a; margin: 0 0 8px; }
    .${uid('ljr')}-step-desc { font-size: 16px; color: #666; margin: 0; line-height: 1.6; }
    .${uid('ljr')}-spacer { flex: 1; }
    @keyframes ${uid('ljr')}-fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 768px) {
      .${uid('ljr')}-line { left: 30px; }
      .${uid('ljr')}-step, .${uid('ljr')}-step:nth-child(2), .${uid('ljr')}-step:nth-child(4) { flex-direction: row; }
      .${uid('ljr')}-spacer { display: none; }
      .${uid('ljr')}-content, .${uid('ljr')}-step:nth-child(odd) .${uid('ljr')}-content { text-align: left; padding-left: 30px; }
      .${uid('ljr')}-number { flex-shrink: 0; }
    }
  </style>
  <div class="${uid('ljr')}-header">
    <h2 class="${uid('ljr')}-title">${v.headline}</h2>
    <p class="${uid('ljr')}-sub">${v.subheadline}</p>
  </div>
  <div class="${uid('ljr')}-timeline">
    <div class="${uid('ljr')}-line"></div>
    <div class="${uid('ljr')}-step">
      <div class="${uid('ljr')}-content">
        <h3 class="${uid('ljr')}-step-title">${v.step1Title}</h3>
        <p class="${uid('ljr')}-step-desc">${v.step1Desc}</p>
      </div>
      <div class="${uid('ljr')}-number">01</div>
      <div class="${uid('ljr')}-spacer"></div>
    </div>
    <div class="${uid('ljr')}-step">
      <div class="${uid('ljr')}-content">
        <h3 class="${uid('ljr')}-step-title">${v.step2Title}</h3>
        <p class="${uid('ljr')}-step-desc">${v.step2Desc}</p>
      </div>
      <div class="${uid('ljr')}-number">02</div>
      <div class="${uid('ljr')}-spacer"></div>
    </div>
    <div class="${uid('ljr')}-step">
      <div class="${uid('ljr')}-content">
        <h3 class="${uid('ljr')}-step-title">${v.step3Title}</h3>
        <p class="${uid('ljr')}-step-desc">${v.step3Desc}</p>
      </div>
      <div class="${uid('ljr')}-number">03</div>
      <div class="${uid('ljr')}-spacer"></div>
    </div>
    <div class="${uid('ljr')}-step">
      <div class="${uid('ljr')}-content">
        <h3 class="${uid('ljr')}-step-title">${v.step4Title}</h3>
        <p class="${uid('ljr')}-step-desc">${v.step4Desc}</p>
      </div>
      <div class="${uid('ljr')}-number">04</div>
      <div class="${uid('ljr')}-spacer"></div>
    </div>
  </div>
</div>`
  },

  // 4. Luxury Full-Bleed Hero
  {
    id: 'luxury-fullbleed-hero',
    name: 'Hero - Cinematic Full-Bleed',
    category: 'Hero',
    description: 'Full-screen hero with cinematic background and waitlist signup',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/fullbleed-hero.jpg',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'MAISON ÉLITE' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Where Luxury Meets Legacy' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Curated collections for those who understand that true elegance is timeless. Join 12,000+ connoisseurs who refuse to compromise.' },
      { id: 'userCount', label: 'User Count', type: 'text', defaultValue: '12,847' },
      { id: 'ctaText', label: 'CTA Button Text', type: 'text', defaultValue: 'Request Access' },
      { id: 'placeholder', label: 'Email Placeholder', type: 'text', defaultValue: 'Enter your email' },
      { id: 'bgImage', label: 'Background Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxury-living-room.jpg' },
      { id: 'overlayOpacity', label: 'Overlay Opacity (0-100)', type: 'number', defaultValue: '50' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
    ],
    generateHtml: (v) => `<div class="${uid('lfh')}-section">
  <style>
    .${uid('lfh')}-section { min-height: 100vh; position: relative; font-family: 'SF Pro Display', -apple-system, sans-serif; color: #fff; display: flex; flex-direction: column; }
    .${uid('lfh')}-bg { position: absolute; inset: 0; background: url('${v.bgImage}') center/cover no-repeat; }
    .${uid('lfh')}-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,${parseInt(v.overlayOpacity)/100}) 0%, rgba(0,0,0,${parseInt(v.overlayOpacity)/100 * 0.7}) 100%); }
    .${uid('lfh')}-header { position: relative; z-index: 10; padding: 32px 40px; display: flex; justify-content: space-between; align-items: center; }
    .${uid('lfh')}-brand { font-size: 28px; font-weight: 700; letter-spacing: 0.1em; }
    .${uid('lfh')}-nav { display: flex; gap: 40px; }
    .${uid('lfh')}-nav a { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; letter-spacing: 0.05em; transition: color 0.3s; }
    .${uid('lfh')}-nav a:hover { color: ${v.accentColor}; }
    .${uid('lfh')}-main { flex: 1; position: relative; z-index: 10; display: flex; align-items: center; padding: 60px 40px; }
    .${uid('lfh')}-content { max-width: 600px; }
    .${uid('lfh')}-social { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .${uid('lfh')}-avatars { display: flex; }
    .${uid('lfh')}-avatar { width: 36px; height: 36px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.8); margin-left: -10px; background: linear-gradient(135deg, ${v.accentColor}, #D4A853); }
    .${uid('lfh')}-avatar:first-child { margin-left: 0; }
    .${uid('lfh')}-social-text { font-size: 14px; color: rgba(255,255,255,0.7); }
    .${uid('lfh')}-title { font-size: clamp(42px, 7vw, 72px); font-weight: 300; line-height: 1.1; margin: 0 0 24px; letter-spacing: -0.02em; }
    .${uid('lfh')}-sub { font-size: 18px; color: rgba(255,255,255,0.75); line-height: 1.7; margin: 0 0 40px; max-width: 500px; }
    .${uid('lfh')}-form { display: flex; max-width: 450px; }
    .${uid('lfh')}-input { flex: 1; padding: 18px 24px; border: none; border-radius: 0; font-size: 16px; background: #fff; color: #1a1a1a; }
    .${uid('lfh')}-input::placeholder { color: #999; }
    .${uid('lfh')}-btn { padding: 18px 32px; background: ${v.accentColor}; color: #fff; border: none; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; white-space: nowrap; }
    .${uid('lfh')}-btn:hover { background: #9A7209; }
    .${uid('lfh')}-footer { position: relative; z-index: 10; padding: 32px 40px; display: flex; justify-content: space-between; align-items: center; }
    .${uid('lfh')}-version { font-size: 12px; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; }
    @media (max-width: 768px) {
      .${uid('lfh')}-nav { display: none; }
      .${uid('lfh')}-form { flex-direction: column; }
      .${uid('lfh')}-input, .${uid('lfh')}-btn { width: 100%; }
    }
  </style>
  <div class="${uid('lfh')}-bg"></div>
  <header class="${uid('lfh')}-header">
    <div class="${uid('lfh')}-brand">${v.brandName}</div>
    <nav class="${uid('lfh')}-nav">
      <a href="#">Collections</a>
      <a href="#">Heritage</a>
      <a href="#">Atelier</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <main class="${uid('lfh')}-main">
    <div class="${uid('lfh')}-content">
      <div class="${uid('lfh')}-social">
        <div class="${uid('lfh')}-avatars">
          <div class="${uid('lfh')}-avatar"></div>
          <div class="${uid('lfh')}-avatar"></div>
          <div class="${uid('lfh')}-avatar"></div>
        </div>
        <p class="${uid('lfh')}-social-text">${v.userCount} members have joined</p>
      </div>
      <h1 class="${uid('lfh')}-title">${v.headline}</h1>
      <p class="${uid('lfh')}-sub">${v.subheadline}</p>
      <form class="${uid('lfh')}-form">
        <input type="email" class="${uid('lfh')}-input" placeholder="${v.placeholder}" />
        <button type="submit" class="${uid('lfh')}-btn">${v.ctaText}</button>
      </form>
    </div>
  </main>
  <footer class="${uid('lfh')}-footer">
    <span class="${uid('lfh')}-version">SPRING COLLECTION 2025</span>
  </footer>
</div>`
  },

  // 5. Floating Elements Hero
  {
    id: 'floating-luxury-hero',
    name: 'Hero - Floating Elegance',
    category: 'Hero',
    description: 'Elegant hero with floating decorative elements and swirl lines',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/floating-hero.jpg',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'The Art of Living Beautifully' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Every piece in our collection is a conversation between heritage craftsmanship and contemporary elegance. Welcome to a world where your home becomes your sanctuary.' },
      { id: 'image1', label: 'Floating Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'image2', label: 'Floating Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/hero-sofa-image.png' },
      { id: 'image3', label: 'Floating Image 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#C4A77D' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fdfcfa' },
    ],
    generateHtml: (v) => `<div class="${uid('flh')}-section">
  <style>
    .${uid('flh')}-section { min-height: 80vh; background: ${v.bgColor}; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 80px 24px; font-family: 'SF Pro Display', -apple-system, sans-serif; }
    .${uid('flh')}-swirl { position: absolute; stroke: ${v.accentColor}; opacity: 0.15; }
    .${uid('flh')}-swirl-1 { top: 0; left: 0; transform: translate(-30%, -30%); width: 600px; height: 600px; }
    .${uid('flh')}-swirl-2 { bottom: 0; right: 0; transform: translate(30%, 30%); width: 700px; height: 700px; }
    .${uid('flh')}-float { position: absolute; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1); animation: ${uid('flh')}-float 6s ease-in-out infinite; }
    .${uid('flh')}-float img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('flh')}-float-1 { width: 180px; height: 220px; top: 10%; left: 8%; animation-delay: 0s; }
    .${uid('flh')}-float-2 { width: 200px; height: 250px; top: 15%; right: 10%; animation-delay: -2s; }
    .${uid('flh')}-float-3 { width: 160px; height: 200px; bottom: 15%; left: 15%; animation-delay: -4s; }
    .${uid('flh')}-content { position: relative; z-index: 10; text-align: center; max-width: 650px; }
    .${uid('flh')}-title { font-size: clamp(36px, 6vw, 60px); font-weight: 300; color: ${v.accentColor}; line-height: 1.2; margin: 0 0 24px; letter-spacing: -0.02em; }
    .${uid('flh')}-sub { font-size: 18px; color: #666; line-height: 1.8; margin: 0; }
    @keyframes ${uid('flh')}-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
    @media (max-width: 768px) { .${uid('flh')}-float { display: none; } }
  </style>
  <svg class="${uid('flh')}-swirl ${uid('flh')}-swirl-1" viewBox="0 0 600 600" fill="none">
    <path d="M515 181C378 52 129 136 51 294C-27 451 126 600 126 600" stroke-width="2" stroke-linecap="round"/>
  </svg>
  <svg class="${uid('flh')}-swirl ${uid('flh')}-swirl-2" viewBox="0 0 700 700" fill="none">
    <path d="M27 528C194 690 480 637 594 452C709 267 544 2 544 2" stroke-width="2" stroke-linecap="round"/>
  </svg>
  <div class="${uid('flh')}-float ${uid('flh')}-float-1"><img src="${v.image1}" alt="Luxury item" /></div>
  <div class="${uid('flh')}-float ${uid('flh')}-float-2"><img src="${v.image2}" alt="Luxury item" /></div>
  <div class="${uid('flh')}-float ${uid('flh')}-float-3"><img src="${v.image3}" alt="Luxury item" /></div>
  <div class="${uid('flh')}-content">
    <h1 class="${uid('flh')}-title">${v.headline}</h1>
    <p class="${uid('flh')}-sub">${v.subheadline}</p>
  </div>
</div>`
  },

  // 6. Animated Feature Card Grid
  {
    id: 'luxury-feature-cards',
    name: 'Features - Animated Luxury Cards',
    category: 'Features',
    description: 'Three animated feature cards with hover effects and gradient backgrounds',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/feature-cards.jpg',
    fields: [
      { id: 'card1Index', label: 'Card 1 Index', type: 'text', defaultValue: '001' },
      { id: 'card1Tag', label: 'Card 1 Tag', type: 'text', defaultValue: 'Heritage' },
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Materials sourced from century-old European mills' },
      { id: 'card1Image', label: 'Card 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'card2Index', label: 'Card 2 Index', type: 'text', defaultValue: '002' },
      { id: 'card2Tag', label: 'Card 2 Tag', type: 'text', defaultValue: 'Artisanship' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Each piece hand-finished by master craftsmen' },
      { id: 'card2Image', label: 'Card 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png' },
      { id: 'card3Index', label: 'Card 3 Index', type: 'text', defaultValue: '003' },
      { id: 'card3Tag', label: 'Card 3 Tag', type: 'text', defaultValue: 'Sustainability' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Eco-conscious production with zero-waste commitment' },
      { id: 'card3Image', label: 'Card 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'color1', label: 'Card 1 Color', type: 'color', defaultValue: '#B8860B' },
      { id: 'color2', label: 'Card 2 Color', type: 'color', defaultValue: '#7C3AED' },
      { id: 'color3', label: 'Card 3 Color', type: 'color', defaultValue: '#0EA5E9' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('lfc')}-section">
  <style>
    .${uid('lfc')}-section { background: ${v.bgColor}; padding: 100px 24px; font-family: 'SF Pro Display', -apple-system, sans-serif; }
    .${uid('lfc')}-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('lfc')}-card { position: relative; height: 420px; border-radius: 24px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); cursor: pointer; }
    .${uid('lfc')}-card:hover { transform: translateY(-12px); box-shadow: 0 24px 50px rgba(0,0,0,0.12); }
    .${uid('lfc')}-gradient { position: absolute; inset: 0; opacity: 0.15; transition: opacity 0.4s; }
    .${uid('lfc')}-card:hover .${uid('lfc')}-gradient { opacity: 0.25; }
    .${uid('lfc')}-card-1 .${uid('lfc')}-gradient { background: radial-gradient(circle at 50% 30%, ${v.color1} 0%, transparent 70%); }
    .${uid('lfc')}-card-2 .${uid('lfc')}-gradient { background: radial-gradient(circle at 50% 30%, ${v.color2} 0%, transparent 70%); }
    .${uid('lfc')}-card-3 .${uid('lfc')}-gradient { background: radial-gradient(circle at 50% 30%, ${v.color3} 0%, transparent 70%); }
    .${uid('lfc')}-index { position: absolute; top: 24px; left: 24px; font-family: monospace; font-size: 16px; font-weight: 700; color: #999; }
    .${uid('lfc')}-image { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%); width: 160px; height: 160px; object-fit: contain; transition: all 0.4s; }
    .${uid('lfc')}-card:hover .${uid('lfc')}-image { transform: translate(-50%, -70%) scale(1.15); }
    .${uid('lfc')}-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-radius: 16px; margin: 16px; }
    .${uid('lfc')}-tag { display: inline-block; padding: 6px 14px; border-radius: 50px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
    .${uid('lfc')}-card-1 .${uid('lfc')}-tag { background: rgba(184,134,11,0.1); color: ${v.color1}; }
    .${uid('lfc')}-card-2 .${uid('lfc')}-tag { background: rgba(124,58,237,0.1); color: ${v.color2}; }
    .${uid('lfc')}-card-3 .${uid('lfc')}-tag { background: rgba(14,165,233,0.1); color: ${v.color3}; }
    .${uid('lfc')}-title { font-size: 16px; color: #1a1a1a; line-height: 1.5; margin: 0; }
    @media (max-width: 900px) { .${uid('lfc')}-grid { grid-template-columns: 1fr; max-width: 380px; } }
  </style>
  <div class="${uid('lfc')}-grid">
    <div class="${uid('lfc')}-card ${uid('lfc')}-card-1">
      <div class="${uid('lfc')}-gradient"></div>
      <span class="${uid('lfc')}-index">${v.card1Index}</span>
      <img class="${uid('lfc')}-image" src="${v.card1Image}" alt="${v.card1Tag}" />
      <div class="${uid('lfc')}-content">
        <span class="${uid('lfc')}-tag">${v.card1Tag}</span>
        <p class="${uid('lfc')}-title">${v.card1Title}</p>
      </div>
    </div>
    <div class="${uid('lfc')}-card ${uid('lfc')}-card-2">
      <div class="${uid('lfc')}-gradient"></div>
      <span class="${uid('lfc')}-index">${v.card2Index}</span>
      <img class="${uid('lfc')}-image" src="${v.card2Image}" alt="${v.card2Tag}" />
      <div class="${uid('lfc')}-content">
        <span class="${uid('lfc')}-tag">${v.card2Tag}</span>
        <p class="${uid('lfc')}-title">${v.card2Title}</p>
      </div>
    </div>
    <div class="${uid('lfc')}-card ${uid('lfc')}-card-3">
      <div class="${uid('lfc')}-gradient"></div>
      <span class="${uid('lfc')}-index">${v.card3Index}</span>
      <img class="${uid('lfc')}-image" src="${v.card3Image}" alt="${v.card3Tag}" />
      <div class="${uid('lfc')}-content">
        <span class="${uid('lfc')}-tag">${v.card3Tag}</span>
        <p class="${uid('lfc')}-title">${v.card3Title}</p>
      </div>
    </div>
  </div>
</div>`
  },

  // 7. Vertical Offer Cards Carousel
  {
    id: 'luxury-offer-vertical',
    name: 'Carousel - Editorial Offers',
    category: 'Product',
    description: 'Vertical scrolling offer cards with editorial styling',
    thumbnail: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/offer-vertical.jpg',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'The Curator\'s Selection' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Hand-picked pieces chosen by our design team' },
      { id: 'offer1Image', label: 'Offer 1 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png' },
      { id: 'offer1Tag', label: 'Offer 1 Tag', type: 'text', defaultValue: 'New Arrival' },
      { id: 'offer1Title', label: 'Offer 1 Title', type: 'text', defaultValue: 'Milano Silk Collection' },
      { id: 'offer1Desc', label: 'Offer 1 Description', type: 'text', defaultValue: 'Hand-woven Italian silk with platinum thread accents' },
      { id: 'offer2Image', label: 'Offer 2 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/hero-sofa-image.png' },
      { id: 'offer2Tag', label: 'Offer 2 Tag', type: 'text', defaultValue: 'Limited Edition' },
      { id: 'offer2Title', label: 'Offer 2 Title', type: 'text', defaultValue: 'Artisan Velvet Sofa' },
      { id: 'offer2Desc', label: 'Offer 2 Description', type: 'text', defaultValue: 'Only 50 pieces worldwide. Museum-quality craftsmanship.' },
      { id: 'offer3Image', label: 'Offer 3 Image', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png' },
      { id: 'offer3Tag', label: 'Offer 3 Tag', type: 'text', defaultValue: 'Exclusive' },
      { id: 'offer3Title', label: 'Offer 3 Title', type: 'text', defaultValue: 'Couture Linen Ensemble' },
      { id: 'offer3Desc', label: 'Offer 3 Description', type: 'text', defaultValue: 'Belgian linen, tailored to perfection in Paris' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
    ],
    generateHtml: (v) => `<div class="${uid('lov')}-section">
  <style>
    .${uid('lov')}-section { background: ${v.bgColor}; padding: 100px 24px; font-family: 'SF Pro Display', -apple-system, sans-serif; }
    .${uid('lov')}-header { text-align: center; margin-bottom: 60px; }
    .${uid('lov')}-title { font-size: clamp(32px, 5vw, 48px); font-weight: 300; color: #fff; margin: 0 0 12px; letter-spacing: -0.02em; }
    .${uid('lov')}-sub { font-size: 16px; color: rgba(255,255,255,0.5); margin: 0; }
    .${uid('lov')}-carousel { display: flex; gap: 24px; overflow-x: auto; padding: 20px 0; max-width: 1200px; margin: 0 auto; scrollbar-width: none; scroll-snap-type: x mandatory; }
    .${uid('lov')}-carousel::-webkit-scrollbar { display: none; }
    .${uid('lov')}-card { flex: 0 0 320px; height: 450px; border-radius: 20px; overflow: hidden; position: relative; scroll-snap-align: start; cursor: pointer; }
    .${uid('lov')}-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.9) 100%); z-index: 1; }
    .${uid('lov')}-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .${uid('lov')}-card:hover img { transform: scale(1.08); }
    .${uid('lov')}-card-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 30px; z-index: 2; }
    .${uid('lov')}-tag { display: inline-flex; align-items: center; gap: 8px; background: ${v.accentColor}; color: #fff; padding: 6px 14px; border-radius: 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
    .${uid('lov')}-card-title { font-size: 24px; font-weight: 500; color: #fff; margin: 0 0 8px; line-height: 1.3; }
    .${uid('lov')}-card-desc { font-size: 14px; color: rgba(255,255,255,0.7); margin: 0 0 20px; line-height: 1.6; }
    .${uid('lov')}-arrow { width: 48px; height: 48px; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s; }
    .${uid('lov')}-card:hover .${uid('lov')}-arrow { background: ${v.accentColor}; border-color: ${v.accentColor}; transform: rotate(-45deg); }
    @media (max-width: 768px) { .${uid('lov')}-card { flex: 0 0 280px; height: 400px; } }
  </style>
  <div class="${uid('lov')}-header">
    <h2 class="${uid('lov')}-title">${v.headline}</h2>
    <p class="${uid('lov')}-sub">${v.subheadline}</p>
  </div>
  <div class="${uid('lov')}-carousel">
    <div class="${uid('lov')}-card">
      <img src="${v.offer1Image}" alt="${v.offer1Title}" />
      <div class="${uid('lov')}-card-content">
        <span class="${uid('lov')}-tag">✦ ${v.offer1Tag}</span>
        <h3 class="${uid('lov')}-card-title">${v.offer1Title}</h3>
        <p class="${uid('lov')}-card-desc">${v.offer1Desc}</p>
        <div class="${uid('lov')}-arrow">→</div>
      </div>
    </div>
    <div class="${uid('lov')}-card">
      <img src="${v.offer2Image}" alt="${v.offer2Title}" />
      <div class="${uid('lov')}-card-content">
        <span class="${uid('lov')}-tag">✦ ${v.offer2Tag}</span>
        <h3 class="${uid('lov')}-card-title">${v.offer2Title}</h3>
        <p class="${uid('lov')}-card-desc">${v.offer2Desc}</p>
        <div class="${uid('lov')}-arrow">→</div>
      </div>
    </div>
    <div class="${uid('lov')}-card">
      <img src="${v.offer3Image}" alt="${v.offer3Title}" />
      <div class="${uid('lov')}-card-content">
        <span class="${uid('lov')}-tag">✦ ${v.offer3Tag}</span>
        <h3 class="${uid('lov')}-card-title">${v.offer3Title}</h3>
        <p class="${uid('lov')}-card-desc">${v.offer3Desc}</p>
        <div class="${uid('lov')}-arrow">→</div>
      </div>
    </div>
  </div>
</div>`
  },

  // Split Testimonial - EXACT 1:1 from 21st.dev/r/jatin-yadav05/split-testimonial
  {
    id: 'split-testimonial',
    name: 'Split Testimonial',
    category: 'Testimonials',
    description: 'Quote on left, image on right with click to navigate between testimonials',
    thumbnail: '',
    fields: [
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'A rare talent who bridges the gap between aesthetics and functionality with remarkable precision.' },
      { id: 'name1', label: 'Name 1', type: 'text', defaultValue: 'Victoria Ashworth' },
      { id: 'role1', label: 'Role 1', type: 'text', defaultValue: 'Design Director' },
      { id: 'company1', label: 'Company 1', type: 'text', defaultValue: 'Maison Élite' },
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/testimonial-1.jpg' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'Every piece tells a story. Working together elevated our entire brand experience.' },
      { id: 'name2', label: 'Name 2', type: 'text', defaultValue: 'James Sterling' },
      { id: 'role2', label: 'Role 2', type: 'text', defaultValue: 'Creative Lead' },
      { id: 'company2', label: 'Company 2', type: 'text', defaultValue: 'Heritage Home' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/testimonial-2.jpg' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'Transforms complex problems into elegant, intuitive solutions that customers love.' },
      { id: 'name3', label: 'Name 3', type: 'text', defaultValue: 'Elena Beaumont' },
      { id: 'role3', label: 'Role 3', type: 'text', defaultValue: 'Head of Product' },
      { id: 'company3', label: 'Company 3', type: 'text', defaultValue: 'Casa Moderna' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/testimonial-3.jpg' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('spt')}-section" id="${uid('spt')}-section">
  <style>
    .${uid('spt')}-section { background: ${v.bgColor}; padding: 80px 24px; font-family: system-ui, -apple-system, sans-serif; }
    .${uid('spt')}-container { max-width: 1024px; margin: 0 auto; position: relative; }
    .${uid('spt')}-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; cursor: pointer; }
    .${uid('spt')}-content { display: flex; flex-direction: column; gap: 32px; }
    .${uid('spt')}-company { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #6b7280; }
    .${uid('spt')}-company-line { width: 32px; height: 1px; background: rgba(107,114,128,0.5); }
    .${uid('spt')}-quote { font-size: clamp(24px, 4vw, 36px); font-weight: 300; line-height: 1.3; letter-spacing: -0.01em; color: #1a1a1a; margin: 0; transition: opacity 0.5s, transform 0.5s; }
    .${uid('spt')}-author { display: flex; align-items: center; gap: 16px; }
    .${uid('spt')}-author-line { width: 40px; height: 1px; background: rgba(26,26,26,0.2); }
    .${uid('spt')}-author-info { display: flex; flex-direction: column; }
    .${uid('spt')}-name { font-size: 14px; font-weight: 500; color: #1a1a1a; }
    .${uid('spt')}-role { font-size: 12px; color: #6b7280; }
    .${uid('spt')}-visual { position: relative; width: 192px; height: 256px; }
    .${uid('spt')}-image-wrap { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; border: 1px solid rgba(229,231,235,0.5); }
    .${uid('spt')}-image { width: 100%; height: 100%; object-fit: cover; transition: filter 0.6s, transform 0.6s; }
    .${uid('spt')}-next { position: absolute; bottom: -48px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 8px; font-size: 12px; color: #6b7280; opacity: 0; transition: opacity 0.2s, transform 0.2s; }
    .${uid('spt')}-grid:hover .${uid('spt')}-next { opacity: 1; transform: translateX(-50%) translateY(0); }
    .${uid('spt')}-next svg { width: 12px; height: 12px; }
    .${uid('spt')}-dots { position: absolute; bottom: -64px; left: 0; display: flex; align-items: center; gap: 12px; }
    .${uid('spt')}-dot { position: relative; padding: 4px; cursor: pointer; background: none; border: none; }
    .${uid('spt')}-dot-inner { display: block; width: 8px; height: 8px; border-radius: 50%; background: rgba(107,114,128,0.3); transition: all 0.3s; transform: scale(0.75); }
    .${uid('spt')}-dot:hover .${uid('spt')}-dot-inner { background: rgba(107,114,128,0.5); transform: scale(1); }
    .${uid('spt')}-dot.active .${uid('spt')}-dot-inner { background: #1a1a1a; transform: scale(1); }
    .${uid('spt')}-dot.active::after { content: ''; position: absolute; inset: 0; border: 1px solid rgba(26,26,26,0.3); border-radius: 50%; }
    .${uid('spt')}-data { display: none; }
    @media (max-width: 768px) { .${uid('spt')}-grid { grid-template-columns: 1fr; gap: 32px; } .${uid('spt')}-visual { width: 100%; max-width: 280px; height: 320px; margin: 0 auto; } .${uid('spt')}-dots { bottom: -80px; left: 50%; transform: translateX(-50%); } }
  </style>
  <div class="${uid('spt')}-data" id="${uid('spt')}-data" data-testimonials='[{"quote":"${v.quote1.replace(/"/g, '\\"')}","name":"${v.name1}","role":"${v.role1}","company":"${v.company1}","image":"${v.image1}"},{"quote":"${v.quote2.replace(/"/g, '\\"')}","name":"${v.name2}","role":"${v.role2}","company":"${v.company2}","image":"${v.image2}"},{"quote":"${v.quote3.replace(/"/g, '\\"')}","name":"${v.name3}","role":"${v.role3}","company":"${v.company3}","image":"${v.image3}"}]'></div>
  <div class="${uid('spt')}-container">
    <div class="${uid('spt')}-grid" onclick="(function(){const section=document.getElementById('${uid('spt')}-section');const data=JSON.parse(document.getElementById('${uid('spt')}-data').dataset.testimonials);let idx=parseInt(section.dataset.idx||'0');idx=(idx+1)%data.length;section.dataset.idx=idx;const t=data[idx];section.querySelector('.${uid('spt')}-company-text').textContent=t.company;section.querySelector('.${uid('spt')}-quote').textContent=t.quote;section.querySelector('.${uid('spt')}-name').textContent=t.name;section.querySelector('.${uid('spt')}-role').textContent=t.role;section.querySelector('.${uid('spt')}-image').src=t.image;section.querySelectorAll('.${uid('spt')}-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));})()">
      <div class="${uid('spt')}-content">
        <div class="${uid('spt')}-company">
          <span class="${uid('spt')}-company-line"></span>
          <span class="${uid('spt')}-company-text">${v.company1}</span>
        </div>
        <blockquote class="${uid('spt')}-quote">${v.quote1}</blockquote>
        <div class="${uid('spt')}-author">
          <div class="${uid('spt')}-author-line"></div>
          <div class="${uid('spt')}-author-info">
            <p class="${uid('spt')}-name">${v.name1}</p>
            <p class="${uid('spt')}-role">${v.role1}</p>
          </div>
        </div>
      </div>
      <div class="${uid('spt')}-visual">
        <div class="${uid('spt')}-image-wrap">
          <img src="${v.image1}" alt="${v.name1}" class="${uid('spt')}-image" />
        </div>
        <div class="${uid('spt')}-next">
          <span>Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </div>
      </div>
    </div>
    <div class="${uid('spt')}-dots">
      <button class="${uid('spt')}-dot active" onclick="event.stopPropagation();(function(idx){const section=document.getElementById('${uid('spt')}-section');const data=JSON.parse(document.getElementById('${uid('spt')}-data').dataset.testimonials);section.dataset.idx=idx;const t=data[idx];section.querySelector('.${uid('spt')}-company-text').textContent=t.company;section.querySelector('.${uid('spt')}-quote').textContent=t.quote;section.querySelector('.${uid('spt')}-name').textContent=t.name;section.querySelector('.${uid('spt')}-role').textContent=t.role;section.querySelector('.${uid('spt')}-image').src=t.image;section.querySelectorAll('.${uid('spt')}-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));})(0)"><span class="${uid('spt')}-dot-inner"></span></button>
      <button class="${uid('spt')}-dot" onclick="event.stopPropagation();(function(idx){const section=document.getElementById('${uid('spt')}-section');const data=JSON.parse(document.getElementById('${uid('spt')}-data').dataset.testimonials);section.dataset.idx=idx;const t=data[idx];section.querySelector('.${uid('spt')}-company-text').textContent=t.company;section.querySelector('.${uid('spt')}-quote').textContent=t.quote;section.querySelector('.${uid('spt')}-name').textContent=t.name;section.querySelector('.${uid('spt')}-role').textContent=t.role;section.querySelector('.${uid('spt')}-image').src=t.image;section.querySelectorAll('.${uid('spt')}-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));})(1)"><span class="${uid('spt')}-dot-inner"></span></button>
      <button class="${uid('spt')}-dot" onclick="event.stopPropagation();(function(idx){const section=document.getElementById('${uid('spt')}-section');const data=JSON.parse(document.getElementById('${uid('spt')}-data').dataset.testimonials);section.dataset.idx=idx;const t=data[idx];section.querySelector('.${uid('spt')}-company-text').textContent=t.company;section.querySelector('.${uid('spt')}-quote').textContent=t.quote;section.querySelector('.${uid('spt')}-name').textContent=t.name;section.querySelector('.${uid('spt')}-role').textContent=t.role;section.querySelector('.${uid('spt')}-image').src=t.image;section.querySelectorAll('.${uid('spt')}-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));})(2)"><span class="${uid('spt')}-dot-inner"></span></button>
    </div>
  </div>
</div>`
  },

  // ========== 21ST.DEV PREMIUM COMPONENTS ==========

  // 1. Spatial Product Showcase (daiv09)
  {
    id: 'spatial-product-showcase',
    name: 'Spatial Product Showcase',
    category: 'Product',
    description: 'High-fidelity hero section for dual-state products with fluid layout transitions and reactive gradients',
    thumbnail: '',
    fields: [
      { id: 'leftImage', label: 'Left Product Image', type: 'image', defaultValue: 'https://ik.imagekit.io/kqmrslzuq/SOUND/left-earbud.png' },
      { id: 'leftSubtitle', label: 'Left Subtitle', type: 'text', defaultValue: 'LEFT EARBUD' },
      { id: 'leftTitle', label: 'Left Title', type: 'text', defaultValue: 'Spatial Anchor' },
      { id: 'leftDesc', label: 'Left Description', type: 'textarea', defaultValue: 'The primary node for binaural synchronization. Handles low-latency transmission and anchors the spatial audio soundstage.' },
      { id: 'leftFeature1Label', label: 'Left Feature 1 Label', type: 'text', defaultValue: 'Latency' },
      { id: 'leftFeature1Value', label: 'Left Feature 1 Value (%)', type: 'number', defaultValue: '12' },
      { id: 'leftFeature2Label', label: 'Left Feature 2 Label', type: 'text', defaultValue: 'Sync Rate' },
      { id: 'leftFeature2Value', label: 'Left Feature 2 Value (%)', type: 'number', defaultValue: '98' },
      { id: 'leftBattery', label: 'Left Battery (%)', type: 'number', defaultValue: '82' },
      { id: 'rightImage', label: 'Right Product Image', type: 'image', defaultValue: 'https://ik.imagekit.io/kqmrslzuq/SOUND/right-earbud.png' },
      { id: 'rightSubtitle', label: 'Right Subtitle', type: 'text', defaultValue: 'RIGHT EARBUD' },
      { id: 'rightTitle', label: 'Right Title', type: 'text', defaultValue: 'Vocal Clarity' },
      { id: 'rightDesc', label: 'Right Description', type: 'textarea', defaultValue: 'Optimized for high-frequency detail and voice pickup. Contains the beamforming microphone array for crystal clear calls.' },
      { id: 'rightFeature1Label', label: 'Right Feature 1 Label', type: 'text', defaultValue: 'Bitrate' },
      { id: 'rightFeature1Value', label: 'Right Feature 1 Value (%)', type: 'number', defaultValue: '94' },
      { id: 'rightFeature2Label', label: 'Right Feature 2 Label', type: 'text', defaultValue: 'Clarifier' },
      { id: 'rightFeature2Value', label: 'Right Feature 2 Value (%)', type: 'number', defaultValue: '88' },
      { id: 'rightBattery', label: 'Right Battery (%)', type: 'number', defaultValue: '74' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#000000' },
    ],
    generateHtml: (v) => `<div class="${uid('sps')}" id="${uid('sps')}-container" data-active="left">
  <style>
    .${uid('sps')} { position:relative; min-height:100vh; width:100%; background:${v.bgColor}; color:#f4f4f5; overflow:hidden; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .${uid('sps')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('sps')}-bg { position:fixed; inset:0; pointer-events:none; transition:all 1.2s cubic-bezier(0.16,1,0.3,1); }
    .${uid('sps')}-bg.left { background:radial-gradient(circle at 0% 50%, rgba(59,130,246,0.15), transparent 50%); }
    .${uid('sps')}-bg.right { background:radial-gradient(circle at 100% 50%, rgba(16,185,129,0.15), transparent 50%); }
    .${uid('sps')}-main { position:relative; z-index:10; width:100%; padding:24px; display:flex; flex-direction:column; align-items:center; justify-content:center; max-width:80rem; margin:0 auto; }
    .${uid('sps')}-content { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:48px; width:100%; transition:all 0.9s cubic-bezier(0.25,0.1,0.25,1); }
    @media(min-width:768px) { .${uid('sps')}-content { flex-direction:row; gap:128px; } .${uid('sps')}-content.right { flex-direction:row-reverse; } }
    .${uid('sps')}-visual { position:relative; flex-shrink:0; }
    .${uid('sps')}-ring { position:absolute; inset:-20%; border-radius:50%; border:1px dashed rgba(255,255,255,0.1); animation:${uid('sps')}-rotate 20s linear infinite; }
    .${uid('sps')}-ring.left { border-left-color:rgba(59,130,246,0.5); }
    .${uid('sps')}-ring.right { border-right-color:rgba(16,185,129,0.5); }
    .${uid('sps')}-glow { position:absolute; inset:0; border-radius:50%; filter:blur(32px); opacity:0.4; animation:${uid('sps')}-pulse 4s ease-in-out infinite; }
    .${uid('sps')}-glow.left { background:linear-gradient(to bottom right, #2563eb, #312e81); }
    .${uid('sps')}-glow.right { background:linear-gradient(to bottom right, #059669, #0f766e); }
    .${uid('sps')}-img-wrap { position:relative; height:320px; width:320px; border-radius:50%; border:1px solid rgba(255,255,255,0.05); box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center; overflow:hidden; background:rgba(0,0,0,0.2); backdrop-filter:blur(8px); }
    @media(min-width:768px) { .${uid('sps')}-img-wrap { height:450px; width:450px; } }
    .${uid('sps')}-float { position:relative; z-index:10; width:100%; height:100%; display:flex; align-items:center; justify-content:center; animation:${uid('sps')}-float 6s ease-in-out infinite; }
    .${uid('sps')}-img { width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 20px 50px rgba(0,0,0,0.5)); padding:16px; transition:all 0.5s cubic-bezier(0.25,0.1,0.25,1); opacity:1; transform:scale(1) rotate(0deg) translateX(0); }
    .${uid('sps')}-img.entering { opacity:0; transform:scale(1.5) rotate(-30deg) translateX(-80px); filter:blur(15px); }
    .${uid('sps')}-img.entering-right { transform:scale(1.5) rotate(30deg) translateX(80px); }
    .${uid('sps')}-status { position:absolute; bottom:-32px; left:50%; transform:translateX(-50%); white-space:nowrap; }
    .${uid('sps')}-status-inner { display:flex; align-items:center; gap:8px; font-size:12px; text-transform:uppercase; letter-spacing:0.2em; color:#71717a; background:rgba(9,9,11,0.8); padding:8px 16px; border-radius:9999px; border:1px solid rgba(255,255,255,0.05); backdrop-filter:blur(8px); }
    .${uid('sps')}-status-dot { height:6px; width:6px; border-radius:50%; animation:${uid('sps')}-blink 2s ease-in-out infinite; }
    .${uid('sps')}-status-dot.left { background:#3b82f6; }
    .${uid('sps')}-status-dot.right { background:#10b981; }
    .${uid('sps')}-details { width:100%; max-width:28rem; transition:opacity 0.3s, transform 0.3s; }
    .${uid('sps')}-details.left { text-align:left; }
    .${uid('sps')}-details.right { text-align:right; }
    .${uid('sps')}-subtitle { font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; color:#71717a; margin-bottom:8px; }
    .${uid('sps')}-title { font-size:36px; font-weight:700; letter-spacing:-0.025em; margin-bottom:8px; background:linear-gradient(to bottom, #fff, #71717a); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    @media(min-width:768px) { .${uid('sps')}-title { font-size:48px; } }
    .${uid('sps')}-desc { color:#a1a1aa; margin-bottom:32px; line-height:1.6; }
    .${uid('sps')}-features { width:100%; background:rgba(24,24,27,0.4); padding:24px; border-radius:16px; border:1px solid rgba(255,255,255,0.05); backdrop-filter:blur(8px); }
    .${uid('sps')}-feature { margin-bottom:24px; }
    .${uid('sps')}-feature:last-child { margin-bottom:0; }
    .${uid('sps')}-feature-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; font-size:14px; }
    .${uid('sps')}-details.right .${uid('sps')}-feature-header { flex-direction:row-reverse; }
    .${uid('sps')}-feature-label { display:flex; align-items:center; gap:8px; color:#e4e4e7; }
    .${uid('sps')}-feature-label svg { width:16px; height:16px; }
    .${uid('sps')}-feature-value { font-family:monospace; font-size:12px; color:#71717a; }
    .${uid('sps')}-bar { position:relative; height:8px; width:100%; background:#27272a; border-radius:9999px; overflow:hidden; }
    .${uid('sps')}-bar-fill { position:absolute; top:0; bottom:0; border-radius:9999px; opacity:0.8; transition:width 1s ease-out; }
    .${uid('sps')}-bar-fill.left { left:0; background:#3b82f6; }
    .${uid('sps')}-bar-fill.right { right:0; background:#10b981; }
    .${uid('sps')}-specs { padding-top:16px; display:flex; }
    .${uid('sps')}-details.left .${uid('sps')}-specs { justify-content:flex-start; }
    .${uid('sps')}-details.right .${uid('sps')}-specs { justify-content:flex-end; }
    .${uid('sps')}-specs-btn { display:flex; align-items:center; gap:8px; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:#d4d4d8; background:none; border:none; cursor:pointer; transition:color 0.2s; }
    .${uid('sps')}-specs-btn:hover { color:#fff; }
    .${uid('sps')}-specs-btn:hover svg:last-child { transform:translateX(4px); }
    .${uid('sps')}-specs-btn svg { width:14px; height:14px; transition:transform 0.2s; }
    .${uid('sps')}-battery { margin-top:24px; display:flex; align-items:center; gap:12px; color:#71717a; }
    .${uid('sps')}-details.right .${uid('sps')}-battery { flex-direction:row-reverse; }
    .${uid('sps')}-battery svg { width:16px; height:16px; }
    .${uid('sps')}-battery span { font-size:14px; font-weight:500; }
    .${uid('sps')}-switcher { position:fixed; bottom:48px; left:0; right:0; display:flex; justify-content:center; z-index:50; pointer-events:none; }
    .${uid('sps')}-switcher-inner { pointer-events:auto; display:flex; align-items:center; gap:4px; padding:6px; border-radius:9999px; background:rgba(24,24,27,0.8); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.1); box-shadow:0 20px 60px rgba(0,0,0,0.6); }
    .${uid('sps')}-switch-btn { position:relative; width:96px; height:48px; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:500; background:none; border:none; cursor:pointer; color:#71717a; transition:color 0.3s; }
    .${uid('sps')}-switch-btn:hover { color:#d4d4d8; }
    .${uid('sps')}-switch-btn.active { color:#fff; }
    .${uid('sps')}-switch-btn.active::before { content:''; position:absolute; inset:0; border-radius:9999px; background:linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.1); }
    .${uid('sps')}-switch-btn.active::after { content:''; position:absolute; bottom:-4px; height:4px; width:24px; border-radius:9999px; background:linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent); }
    .${uid('sps')}-switch-btn span { position:relative; z-index:10; }
    @keyframes ${uid('sps')}-rotate { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes ${uid('sps')}-pulse { 0%, 100% { transform:scale(1); } 50% { transform:scale(1.05); } }
    @keyframes ${uid('sps')}-float { 0%, 100% { transform:translateY(-10px); } 50% { transform:translateY(10px); } }
    @keyframes ${uid('sps')}-blink { 0%, 100% { opacity:1; } 50% { opacity:0.5; } }
  </style>
  <div class="${uid('sps')}-bg left" id="${uid('sps')}-bg"></div>
  <main class="${uid('sps')}-main">
    <div class="${uid('sps')}-content" id="${uid('sps')}-content">
      <div class="${uid('sps')}-visual">
        <div class="${uid('sps')}-ring left" id="${uid('sps')}-ring"></div>
        <div class="${uid('sps')}-glow left" id="${uid('sps')}-glow"></div>
        <div class="${uid('sps')}-img-wrap">
          <div class="${uid('sps')}-float">
            <img src="${v.leftImage}" alt="Product" class="${uid('sps')}-img" id="${uid('sps')}-img" />
          </div>
        </div>
        <div class="${uid('sps')}-status">
          <div class="${uid('sps')}-status-inner">
            <span class="${uid('sps')}-status-dot left" id="${uid('sps')}-dot"></span>
            <span>Connected</span>
          </div>
        </div>
      </div>
      <div class="${uid('sps')}-details left" id="${uid('sps')}-details">
        <h2 class="${uid('sps')}-subtitle" id="${uid('sps')}-subtitle">${v.leftSubtitle}</h2>
        <h1 class="${uid('sps')}-title" id="${uid('sps')}-title">${v.leftTitle}</h1>
        <p class="${uid('sps')}-desc" id="${uid('sps')}-desc">${v.leftDesc}</p>
        <div class="${uid('sps')}-features">
          <div class="${uid('sps')}-feature">
            <div class="${uid('sps')}-feature-header">
              <div class="${uid('sps')}-feature-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span id="${uid('sps')}-f1label">${v.leftFeature1Label}</span>
              </div>
              <span class="${uid('sps')}-feature-value" id="${uid('sps')}-f1val">${v.leftFeature1Value}%</span>
            </div>
            <div class="${uid('sps')}-bar">
              <div class="${uid('sps')}-bar-fill left" id="${uid('sps')}-bar1" style="width:${v.leftFeature1Value}%"></div>
            </div>
          </div>
          <div class="${uid('sps')}-feature">
            <div class="${uid('sps')}-feature-header">
              <div class="${uid('sps')}-feature-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
                <span id="${uid('sps')}-f2label">${v.leftFeature2Label}</span>
              </div>
              <span class="${uid('sps')}-feature-value" id="${uid('sps')}-f2val">${v.leftFeature2Value}%</span>
            </div>
            <div class="${uid('sps')}-bar">
              <div class="${uid('sps')}-bar-fill left" id="${uid('sps')}-bar2" style="width:${v.leftFeature2Value}%"></div>
            </div>
          </div>
          <div class="${uid('sps')}-specs">
            <button class="${uid('sps')}-specs-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              View Specs
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
        <div class="${uid('sps')}-battery">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg>
          <span id="${uid('sps')}-battery">${v.leftBattery}% Charge</span>
        </div>
      </div>
    </div>
  </main>
  <div class="${uid('sps')}-switcher">
    <div class="${uid('sps')}-switcher-inner">
      <button class="${uid('sps')}-switch-btn active" id="${uid('sps')}-btn-left" onclick="(function(){
        const c=document.getElementById('${uid('sps')}-container');
        if(c.dataset.active==='left')return;
        c.dataset.active='left';
        document.getElementById('${uid('sps')}-bg').className='${uid('sps')}-bg left';
        document.getElementById('${uid('sps')}-content').className='${uid('sps')}-content';
        document.getElementById('${uid('sps')}-ring').className='${uid('sps')}-ring left';
        document.getElementById('${uid('sps')}-glow').className='${uid('sps')}-glow left';
        document.getElementById('${uid('sps')}-dot').className='${uid('sps')}-status-dot left';
        document.getElementById('${uid('sps')}-details').className='${uid('sps')}-details left';
        document.getElementById('${uid('sps')}-bar1').className='${uid('sps')}-bar-fill left';
        document.getElementById('${uid('sps')}-bar2').className='${uid('sps')}-bar-fill left';
        const img=document.getElementById('${uid('sps')}-img');
        img.className='${uid('sps')}-img entering';
        setTimeout(()=>{img.src='${v.leftImage}';img.className='${uid('sps')}-img';},300);
        document.getElementById('${uid('sps')}-subtitle').textContent='${v.leftSubtitle}';
        document.getElementById('${uid('sps')}-title').textContent='${v.leftTitle}';
        document.getElementById('${uid('sps')}-desc').textContent='${v.leftDesc}';
        document.getElementById('${uid('sps')}-f1label').textContent='${v.leftFeature1Label}';
        document.getElementById('${uid('sps')}-f1val').textContent='${v.leftFeature1Value}%';
        document.getElementById('${uid('sps')}-bar1').style.width='${v.leftFeature1Value}%';
        document.getElementById('${uid('sps')}-f2label').textContent='${v.leftFeature2Label}';
        document.getElementById('${uid('sps')}-f2val').textContent='${v.leftFeature2Value}%';
        document.getElementById('${uid('sps')}-bar2').style.width='${v.leftFeature2Value}%';
        document.getElementById('${uid('sps')}-battery').textContent='${v.leftBattery}% Charge';
        document.getElementById('${uid('sps')}-btn-left').classList.add('active');
        document.getElementById('${uid('sps')}-btn-right').classList.remove('active');
      })()"><span>Left</span></button>
      <button class="${uid('sps')}-switch-btn" id="${uid('sps')}-btn-right" onclick="(function(){
        const c=document.getElementById('${uid('sps')}-container');
        if(c.dataset.active==='right')return;
        c.dataset.active='right';
        document.getElementById('${uid('sps')}-bg').className='${uid('sps')}-bg right';
        document.getElementById('${uid('sps')}-content').className='${uid('sps')}-content right';
        document.getElementById('${uid('sps')}-ring').className='${uid('sps')}-ring right';
        document.getElementById('${uid('sps')}-glow').className='${uid('sps')}-glow right';
        document.getElementById('${uid('sps')}-dot').className='${uid('sps')}-status-dot right';
        document.getElementById('${uid('sps')}-details').className='${uid('sps')}-details right';
        document.getElementById('${uid('sps')}-bar1').className='${uid('sps')}-bar-fill right';
        document.getElementById('${uid('sps')}-bar2').className='${uid('sps')}-bar-fill right';
        const img=document.getElementById('${uid('sps')}-img');
        img.className='${uid('sps')}-img entering entering-right';
        setTimeout(()=>{img.src='${v.rightImage}';img.className='${uid('sps')}-img';},300);
        document.getElementById('${uid('sps')}-subtitle').textContent='${v.rightSubtitle}';
        document.getElementById('${uid('sps')}-title').textContent='${v.rightTitle}';
        document.getElementById('${uid('sps')}-desc').textContent='${v.rightDesc}';
        document.getElementById('${uid('sps')}-f1label').textContent='${v.rightFeature1Label}';
        document.getElementById('${uid('sps')}-f1val').textContent='${v.rightFeature1Value}%';
        document.getElementById('${uid('sps')}-bar1').style.width='${v.rightFeature1Value}%';
        document.getElementById('${uid('sps')}-f2label').textContent='${v.rightFeature2Label}';
        document.getElementById('${uid('sps')}-f2val').textContent='${v.rightFeature2Value}%';
        document.getElementById('${uid('sps')}-bar2').style.width='${v.rightFeature2Value}%';
        document.getElementById('${uid('sps')}-battery').textContent='${v.rightBattery}% Charge';
        document.getElementById('${uid('sps')}-btn-right').classList.add('active');
        document.getElementById('${uid('sps')}-btn-left').classList.remove('active');
      })()"><span>Right</span></button>
    </div>
  </div>
</div>`
  },

  // 2. Product Card with Color Variants (Systaliko UI)
  {
    id: 'product-card-colors',
    name: 'Product Card - Color Variants',
    category: 'Product',
    description: 'Product card with multiple color variants and hover image swap',
    thumbnail: '',
    fields: [
      { id: 'color1', label: 'Color 1 (hex)', type: 'text', defaultValue: '#93ABC1' },
      { id: 'color1Image1', label: 'Color 1 - Image 1', type: 'image', defaultValue: 'https://m.media-amazon.com/images/I/51o1onb4djL._AC_SY695_.jpg' },
      { id: 'color1Image2', label: 'Color 1 - Image 2 (hover)', type: 'image', defaultValue: 'https://m.media-amazon.com/images/I/51M6NgQBmhL._AC_SY695_.jpg' },
      { id: 'color2', label: 'Color 2 (hex)', type: 'text', defaultValue: '#BBCBC3' },
      { id: 'color2Image1', label: 'Color 2 - Image 1', type: 'image', defaultValue: 'https://m.media-amazon.com/images/I/51bfzTuf2cL._AC_SY695_.jpg' },
      { id: 'color2Image2', label: 'Color 2 - Image 2 (hover)', type: 'image', defaultValue: 'https://m.media-amazon.com/images/I/51Xm87WBX1L._AC_SY695_.jpg' },
      { id: 'color3', label: 'Color 3 (hex)', type: 'text', defaultValue: '#DE9C5E' },
      { id: 'color3Image1', label: 'Color 3 - Image 1', type: 'image', defaultValue: 'https://m.media-amazon.com/images/I/61++XRhgaTL._AC_SY695_.jpg' },
      { id: 'color3Image2', label: 'Color 3 - Image 2 (hover)', type: 'image', defaultValue: 'https://m.media-amazon.com/images/I/51WRTVpnh0L._AC_SY695_.jpg' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('pcc')}" id="${uid('pcc')}-container" data-active="0" data-hover="0">
  <style>
    .${uid('pcc')} { display:flex; align-items:center; justify-content:center; min-height:400px; padding:24px; background:${v.bgColor}; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; }
    .${uid('pcc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('pcc')}-card { position:relative; width:256px; padding:16px 16px 24px; }
    .${uid('pcc')}-images { position:relative; aspect-ratio:16/9; width:100%; overflow:hidden; cursor:pointer; }
    .${uid('pcc')}-img-wrap { position:absolute; inset:0; opacity:0; transition:opacity 0.3s ease; }
    .${uid('pcc')}-img-wrap.active { opacity:1; }
    .${uid('pcc')}-img { width:100%; height:100%; object-fit:contain; transition:opacity 0.3s ease; }
    .${uid('pcc')}-img.hover { position:absolute; inset:0; opacity:0; }
    .${uid('pcc')}-images:hover .${uid('pcc')}-img.hover { opacity:1; }
    .${uid('pcc')}-images:hover .${uid('pcc')}-img.main { opacity:0; }
    .${uid('pcc')}-colors { display:flex; gap:8px; padding:8px 0; margin-top:8px; }
    .${uid('pcc')}-color { position:relative; width:16px; height:16px; border-radius:50%; border:1px solid #e5e5e5; cursor:pointer; appearance:none; background:none; }
    .${uid('pcc')}-color::before { content:''; position:absolute; inset:-2px; border-radius:50%; border:1px solid transparent; transition:border-color 0.2s; }
    .${uid('pcc')}-color.active::before { border-color:#6b7280; }
  </style>
  <div class="${uid('pcc')}-card">
    <div class="${uid('pcc')}-images" onmouseenter="document.getElementById('${uid('pcc')}-container').dataset.hover='1'" onmouseleave="document.getElementById('${uid('pcc')}-container').dataset.hover='0'">
      <div class="${uid('pcc')}-img-wrap active" id="${uid('pcc')}-wrap-0">
        <img src="${v.color1Image1}" alt="Product" class="${uid('pcc')}-img main" />
        <img src="${v.color1Image2}" alt="Product hover" class="${uid('pcc')}-img hover" />
      </div>
      <div class="${uid('pcc')}-img-wrap" id="${uid('pcc')}-wrap-1">
        <img src="${v.color2Image1}" alt="Product" class="${uid('pcc')}-img main" />
        <img src="${v.color2Image2}" alt="Product hover" class="${uid('pcc')}-img hover" />
      </div>
      <div class="${uid('pcc')}-img-wrap" id="${uid('pcc')}-wrap-2">
        <img src="${v.color3Image1}" alt="Product" class="${uid('pcc')}-img main" />
        <img src="${v.color3Image2}" alt="Product hover" class="${uid('pcc')}-img hover" />
      </div>
    </div>
    <div class="${uid('pcc')}-colors">
      <button class="${uid('pcc')}-color active" id="${uid('pcc')}-btn-0" style="background-color:${v.color1}" title="Color 1" onmouseenter="(function(){
        const c=document.getElementById('${uid('pcc')}-container');
        c.dataset.active='0';
        document.querySelectorAll('.${uid('pcc')}-img-wrap').forEach((w,i)=>w.classList.toggle('active',i===0));
        document.querySelectorAll('.${uid('pcc')}-color').forEach((b,i)=>b.classList.toggle('active',i===0));
      })()"></button>
      <button class="${uid('pcc')}-color" id="${uid('pcc')}-btn-1" style="background-color:${v.color2}" title="Color 2" onmouseenter="(function(){
        const c=document.getElementById('${uid('pcc')}-container');
        c.dataset.active='1';
        document.querySelectorAll('.${uid('pcc')}-img-wrap').forEach((w,i)=>w.classList.toggle('active',i===1));
        document.querySelectorAll('.${uid('pcc')}-color').forEach((b,i)=>b.classList.toggle('active',i===1));
      })()"></button>
      <button class="${uid('pcc')}-color" id="${uid('pcc')}-btn-2" style="background-color:${v.color3}" title="Color 3" onmouseenter="(function(){
        const c=document.getElementById('${uid('pcc')}-container');
        c.dataset.active='2';
        document.querySelectorAll('.${uid('pcc')}-img-wrap').forEach((w,i)=>w.classList.toggle('active',i===2));
        document.querySelectorAll('.${uid('pcc')}-color').forEach((b,i)=>b.classList.toggle('active',i===2));
      })()"></button>
    </div>
  </div>
</div>`
  },

  // 3. Animated Live Visitor Counter (hedevelope)
  {
    id: 'live-visitor-counter',
    name: 'Live Visitor Counter',
    category: 'Trust',
    description: 'Animated counter showing live visitors viewing this product - perfect social proof',
    thumbnail: '',
    fields: [
      { id: 'count', label: 'Visitor Count', type: 'number', defaultValue: '24' },
      { id: 'label', label: 'Label Text', type: 'text', defaultValue: 'people are viewing this right now' },
      { id: 'dotColor', label: 'Dot Color', type: 'color', defaultValue: '#22c55e' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('lvc')}">
  <style>
    .${uid('lvc')} { display:inline-flex; align-items:center; gap:8px; padding:8px 16px; background:${v.bgColor}; border:1px solid #e5e5e5; border-radius:9999px; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; font-size:14px; color:#374151; }
    .${uid('lvc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('lvc')}-dot { position:relative; width:8px; height:8px; border-radius:50%; background:${v.dotColor}; }
    .${uid('lvc')}-dot::before { content:''; position:absolute; inset:-4px; border-radius:50%; background:${v.dotColor}; opacity:0.3; animation:${uid('lvc')}-ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
    .${uid('lvc')}-count { font-weight:700; color:#111827; font-variant-numeric:tabular-nums; }
    @keyframes ${uid('lvc')}-ping { 0% { transform:scale(1); opacity:0.3; } 75%, 100% { transform:scale(2); opacity:0; } }
  </style>
  <span class="${uid('lvc')}-dot"></span>
  <span class="${uid('lvc')}-count">${v.count}</span>
  <span>${v.label}</span>
</div>`
  },

  // 4. Logo Carousel / Trust Badges (cult-ui)
  {
    id: 'logo-carousel-trust',
    name: 'Logo Carousel - Trust Badges',
    category: 'Trust',
    description: 'Infinite scrolling logo carousel for partner/brand logos',
    thumbnail: '',
    fields: [
      { id: 'logo1', label: 'Logo 1 URL', type: 'image', defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
      { id: 'logo2', label: 'Logo 2 URL', type: 'image', defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
      { id: 'logo3', label: 'Logo 3 URL', type: 'image', defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { id: 'logo4', label: 'Logo 4 URL', type: 'image', defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
      { id: 'logo5', label: 'Logo 5 URL', type: 'image', defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
      { id: 'speed', label: 'Animation Speed (seconds)', type: 'number', defaultValue: '30' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('lct')}" style="background:${v.bgColor}">
  <style>
    .${uid('lct')} { overflow:hidden; padding:40px 0; position:relative; }
    .${uid('lct')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('lct')}::before, .${uid('lct')}::after { content:''; position:absolute; top:0; bottom:0; width:100px; z-index:2; pointer-events:none; }
    .${uid('lct')}::before { left:0; background:linear-gradient(to right, ${v.bgColor}, transparent); }
    .${uid('lct')}::after { right:0; background:linear-gradient(to left, ${v.bgColor}, transparent); }
    .${uid('lct')}-track { display:flex; width:max-content; animation:${uid('lct')}-scroll ${v.speed}s linear infinite; }
    .${uid('lct')}-track:hover { animation-play-state:paused; }
    .${uid('lct')}-logo { height:40px; width:auto; max-width:120px; object-fit:contain; margin:0 40px; filter:grayscale(100%); opacity:0.6; transition:all 0.3s ease; }
    .${uid('lct')}-logo:hover { filter:grayscale(0%); opacity:1; }
    @keyframes ${uid('lct')}-scroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  </style>
  <div class="${uid('lct')}-track">
    <img src="${v.logo1}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo2}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo3}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo4}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo5}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo1}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo2}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo3}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo4}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo5}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo1}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo2}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo3}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo4}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo5}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo1}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo2}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo3}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo4}" alt="Partner" class="${uid('lct')}-logo" />
    <img src="${v.logo5}" alt="Partner" class="${uid('lct')}-logo" />
  </div>
</div>`
  },

  // 5. Pricing Toggle (ln-dev7)
  {
    id: 'pricing-toggle-cards',
    name: 'Pricing Toggle Cards',
    category: 'Pricing',
    description: 'Monthly/Yearly pricing toggle with animated cards',
    thumbnail: '',
    fields: [
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Starter' },
      { id: 'plan1MonthlyPrice', label: 'Plan 1 Monthly Price', type: 'text', defaultValue: '$9' },
      { id: 'plan1YearlyPrice', label: 'Plan 1 Yearly Price', type: 'text', defaultValue: '$90' },
      { id: 'plan1Feature1', label: 'Plan 1 Feature 1', type: 'text', defaultValue: '5 Products' },
      { id: 'plan1Feature2', label: 'Plan 1 Feature 2', type: 'text', defaultValue: 'Basic Analytics' },
      { id: 'plan1Feature3', label: 'Plan 1 Feature 3', type: 'text', defaultValue: 'Email Support' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Professional' },
      { id: 'plan2MonthlyPrice', label: 'Plan 2 Monthly Price', type: 'text', defaultValue: '$29' },
      { id: 'plan2YearlyPrice', label: 'Plan 2 Yearly Price', type: 'text', defaultValue: '$290' },
      { id: 'plan2Feature1', label: 'Plan 2 Feature 1', type: 'text', defaultValue: 'Unlimited Products' },
      { id: 'plan2Feature2', label: 'Plan 2 Feature 2', type: 'text', defaultValue: 'Advanced Analytics' },
      { id: 'plan2Feature3', label: 'Plan 2 Feature 3', type: 'text', defaultValue: 'Priority Support' },
      { id: 'plan3Name', label: 'Plan 3 Name', type: 'text', defaultValue: 'Enterprise' },
      { id: 'plan3MonthlyPrice', label: 'Plan 3 Monthly Price', type: 'text', defaultValue: '$99' },
      { id: 'plan3YearlyPrice', label: 'Plan 3 Yearly Price', type: 'text', defaultValue: '$990' },
      { id: 'plan3Feature1', label: 'Plan 3 Feature 1', type: 'text', defaultValue: 'Custom Solutions' },
      { id: 'plan3Feature2', label: 'Plan 3 Feature 2', type: 'text', defaultValue: 'Dedicated Manager' },
      { id: 'plan3Feature3', label: 'Plan 3 Feature 3', type: 'text', defaultValue: '24/7 Support' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('ptc')}" id="${uid('ptc')}-section" data-billing="monthly">
  <style>
    .${uid('ptc')} { padding:64px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; }
    .${uid('ptc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('ptc')}-header { text-align:center; margin-bottom:48px; }
    .${uid('ptc')}-title { font-size:36px; font-weight:700; color:#111827; margin-bottom:16px; }
    .${uid('ptc')}-toggle { display:inline-flex; align-items:center; gap:12px; padding:4px; background:#f3f4f6; border-radius:9999px; }
    .${uid('ptc')}-toggle-btn { padding:10px 20px; border-radius:9999px; border:none; background:transparent; font-size:14px; font-weight:500; color:#6b7280; cursor:pointer; transition:all 0.2s; }
    .${uid('ptc')}-toggle-btn.active { background:#fff; color:#111827; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
    .${uid('ptc')}-cards { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; max-width:1000px; margin:0 auto; }
    .${uid('ptc')}-card { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:32px; transition:all 0.3s; }
    .${uid('ptc')}-card:hover { border-color:#3b82f6; box-shadow:0 20px 40px -12px rgba(59,130,246,0.15); }
    .${uid('ptc')}-card.popular { border-color:#3b82f6; position:relative; }
    .${uid('ptc')}-card.popular::before { content:'Popular'; position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#3b82f6; color:#fff; font-size:12px; font-weight:600; padding:4px 12px; border-radius:9999px; }
    .${uid('ptc')}-plan { font-size:18px; font-weight:600; color:#111827; margin-bottom:8px; }
    .${uid('ptc')}-price { font-size:48px; font-weight:700; color:#111827; line-height:1; margin-bottom:4px; }
    .${uid('ptc')}-period { font-size:14px; color:#6b7280; margin-bottom:24px; }
    .${uid('ptc')}-features { list-style:none; margin-bottom:24px; }
    .${uid('ptc')}-feature { display:flex; align-items:center; gap:12px; padding:8px 0; font-size:14px; color:#374151; }
    .${uid('ptc')}-feature svg { width:20px; height:20px; color:#22c55e; flex-shrink:0; }
    .${uid('ptc')}-btn { width:100%; padding:12px 24px; background:#111827; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.2s; }
    .${uid('ptc')}-btn:hover { background:#374151; }
    .${uid('ptc')}-card.popular .${uid('ptc')}-btn { background:#3b82f6; }
    .${uid('ptc')}-card.popular .${uid('ptc')}-btn:hover { background:#2563eb; }
  </style>
  <div class="${uid('ptc')}-header">
    <h2 class="${uid('ptc')}-title">Choose Your Plan</h2>
    <div class="${uid('ptc')}-toggle">
      <button class="${uid('ptc')}-toggle-btn active" id="${uid('ptc')}-monthly" onclick="(function(){
        document.getElementById('${uid('ptc')}-section').dataset.billing='monthly';
        document.getElementById('${uid('ptc')}-monthly').classList.add('active');
        document.getElementById('${uid('ptc')}-yearly').classList.remove('active');
        document.getElementById('${uid('ptc')}-price1').textContent='${v.plan1MonthlyPrice}';
        document.getElementById('${uid('ptc')}-price2').textContent='${v.plan2MonthlyPrice}';
        document.getElementById('${uid('ptc')}-price3').textContent='${v.plan3MonthlyPrice}';
        document.querySelectorAll('.${uid('ptc')}-period').forEach(p=>p.textContent='/month');
      })()">Monthly</button>
      <button class="${uid('ptc')}-toggle-btn" id="${uid('ptc')}-yearly" onclick="(function(){
        document.getElementById('${uid('ptc')}-section').dataset.billing='yearly';
        document.getElementById('${uid('ptc')}-yearly').classList.add('active');
        document.getElementById('${uid('ptc')}-monthly').classList.remove('active');
        document.getElementById('${uid('ptc')}-price1').textContent='${v.plan1YearlyPrice}';
        document.getElementById('${uid('ptc')}-price2').textContent='${v.plan2YearlyPrice}';
        document.getElementById('${uid('ptc')}-price3').textContent='${v.plan3YearlyPrice}';
        document.querySelectorAll('.${uid('ptc')}-period').forEach(p=>p.textContent='/year');
      })()">Yearly</button>
    </div>
  </div>
  <div class="${uid('ptc')}-cards">
    <div class="${uid('ptc')}-card">
      <h3 class="${uid('ptc')}-plan">${v.plan1Name}</h3>
      <div class="${uid('ptc')}-price" id="${uid('ptc')}-price1">${v.plan1MonthlyPrice}</div>
      <div class="${uid('ptc')}-period">/month</div>
      <ul class="${uid('ptc')}-features">
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan1Feature1}</li>
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan1Feature2}</li>
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan1Feature3}</li>
      </ul>
      <button class="${uid('ptc')}-btn">Get Started</button>
    </div>
    <div class="${uid('ptc')}-card popular">
      <h3 class="${uid('ptc')}-plan">${v.plan2Name}</h3>
      <div class="${uid('ptc')}-price" id="${uid('ptc')}-price2">${v.plan2MonthlyPrice}</div>
      <div class="${uid('ptc')}-period">/month</div>
      <ul class="${uid('ptc')}-features">
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan2Feature1}</li>
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan2Feature2}</li>
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan2Feature3}</li>
      </ul>
      <button class="${uid('ptc')}-btn">Get Started</button>
    </div>
    <div class="${uid('ptc')}-card">
      <h3 class="${uid('ptc')}-plan">${v.plan3Name}</h3>
      <div class="${uid('ptc')}-price" id="${uid('ptc')}-price3">${v.plan3MonthlyPrice}</div>
      <div class="${uid('ptc')}-period">/month</div>
      <ul class="${uid('ptc')}-features">
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan3Feature1}</li>
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan3Feature2}</li>
        <li class="${uid('ptc')}-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan3Feature3}</li>
      </ul>
      <button class="${uid('ptc')}-btn">Get Started</button>
    </div>
  </div>
</div>`
  },

  // 6. Estimated Arrival Shipping (hedevelope)
  {
    id: 'estimated-arrival',
    name: 'Estimated Arrival',
    category: 'Product',
    description: 'Shipping estimated arrival display with animated progress',
    thumbnail: '',
    fields: [
      { id: 'startDate', label: 'Start Date', type: 'text', defaultValue: 'Jan 20' },
      { id: 'endDate', label: 'End Date', type: 'text', defaultValue: 'Jan 25' },
      { id: 'shippingLabel', label: 'Shipping Label', type: 'text', defaultValue: 'Free Express Shipping' },
      { id: 'progress', label: 'Progress (%)', type: 'number', defaultValue: '65' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('eta')}">
  <style>
    .${uid('eta')} { display:flex; flex-direction:column; gap:12px; padding:20px; background:${v.bgColor}; border:1px solid #e5e7eb; border-radius:12px; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; max-width:320px; }
    .${uid('eta')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('eta')}-header { display:flex; align-items:center; justify-content:space-between; }
    .${uid('eta')}-label { font-size:14px; font-weight:500; color:#374151; }
    .${uid('eta')}-dates { font-size:14px; font-weight:600; color:#111827; }
    .${uid('eta')}-bar { position:relative; height:8px; background:#e5e7eb; border-radius:9999px; overflow:hidden; }
    .${uid('eta')}-fill { height:100%; background:linear-gradient(90deg, #22c55e, #16a34a); border-radius:9999px; transition:width 1s ease-out; position:relative; }
    .${uid('eta')}-fill::after { content:''; position:absolute; right:0; top:50%; transform:translateY(-50%); width:16px; height:16px; background:#fff; border:3px solid #16a34a; border-radius:50%; box-shadow:0 2px 4px rgba(0,0,0,0.1); }
    .${uid('eta')}-shipping { display:flex; align-items:center; gap:8px; font-size:13px; color:#6b7280; }
    .${uid('eta')}-shipping svg { width:16px; height:16px; color:#22c55e; }
  </style>
  <div class="${uid('eta')}-header">
    <span class="${uid('eta')}-label">Estimated Arrival</span>
    <span class="${uid('eta')}-dates">${v.startDate} - ${v.endDate}</span>
  </div>
  <div class="${uid('eta')}-bar">
    <div class="${uid('eta')}-fill" style="width:${v.progress}%"></div>
  </div>
  <div class="${uid('eta')}-shipping">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    ${v.shippingLabel}
  </div>
</div>`
  },

  // 7. Testimonial Card Grid (avanishverma4)
  {
    id: 'testimonial-grid-v2',
    name: 'Testimonial Grid V2',
    category: 'Testimonials',
    description: 'Multi-card testimonial grid with clean modern design',
    thumbnail: '',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'What our users say' },
      { id: 'subtitle', label: 'Section Subtitle', type: 'text', defaultValue: 'Discover how thousands of teams streamline their operations with our platform.' },
      { id: 't1Quote', label: 'Testimonial 1 Quote', type: 'textarea', defaultValue: 'Implementing this SDP was smooth and quick. The customizable, user-friendly interface made team training effortless.' },
      { id: 't1Name', label: 'Testimonial 1 Name', type: 'text', defaultValue: 'Sarah Chen' },
      { id: 't1Role', label: 'Testimonial 1 Role', type: 'text', defaultValue: 'Product Manager' },
      { id: 't2Quote', label: 'Testimonial 2 Quote', type: 'textarea', defaultValue: 'The default features and quick setup helped transform my customer business operations significantly.' },
      { id: 't2Name', label: 'Testimonial 2 Name', type: 'text', defaultValue: 'Alex Rivera' },
      { id: 't2Role', label: 'Testimonial 2 Role', type: 'text', defaultValue: 'Tech Lead' },
      { id: 't3Quote', label: 'Testimonial 3 Quote', type: 'textarea', defaultValue: 'The support team is exceptional, guiding us through setup and providing ongoing assistance.' },
      { id: 't3Name', label: 'Testimonial 3 Name', type: 'text', defaultValue: 'James Wilson' },
      { id: 't3Role', label: 'Testimonial 3 Role', type: 'text', defaultValue: 'Operations Director' },
      { id: 't4Quote', label: 'Testimonial 4 Quote', type: 'textarea', defaultValue: 'Our business functions improved with a user-friendly design and positive customer support experience.' },
      { id: 't4Name', label: 'Testimonial 4 Name', type: 'text', defaultValue: 'Maria Santos' },
      { id: 't4Role', label: 'Testimonial 4 Role', type: 'text', defaultValue: 'CEO' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('tgv')}">
  <style>
    .${uid('tgv')} { padding:64px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; }
    .${uid('tgv')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('tgv')}-header { text-align:center; margin-bottom:48px; }
    .${uid('tgv')}-badge { display:inline-block; font-size:12px; font-weight:500; text-transform:uppercase; letter-spacing:0.1em; color:#6b7280; margin-bottom:12px; }
    .${uid('tgv')}-title { font-size:32px; font-weight:700; color:#111827; margin-bottom:16px; }
    .${uid('tgv')}-subtitle { font-size:16px; color:#6b7280; max-width:600px; margin:0 auto; line-height:1.6; }
    .${uid('tgv')}-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; max-width:1200px; margin:0 auto; }
    .${uid('tgv')}-card { background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:24px; transition:all 0.3s; }
    .${uid('tgv')}-card:hover { border-color:#d1d5db; box-shadow:0 10px 40px -10px rgba(0,0,0,0.1); }
    .${uid('tgv')}-quote { font-size:15px; color:#374151; line-height:1.7; margin-bottom:20px; }
    .${uid('tgv')}-author { display:flex; align-items:center; gap:12px; }
    .${uid('tgv')}-avatar { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:600; font-size:14px; }
    .${uid('tgv')}-info { }
    .${uid('tgv')}-name { font-size:14px; font-weight:600; color:#111827; }
    .${uid('tgv')}-role { font-size:13px; color:#6b7280; }
  </style>
  <div class="${uid('tgv')}-header">
    <span class="${uid('tgv')}-badge">Testimonials</span>
    <h2 class="${uid('tgv')}-title">${v.title}</h2>
    <p class="${uid('tgv')}-subtitle">${v.subtitle}</p>
  </div>
  <div class="${uid('tgv')}-grid">
    <div class="${uid('tgv')}-card">
      <p class="${uid('tgv')}-quote">"${v.t1Quote}"</p>
      <div class="${uid('tgv')}-author">
        <div class="${uid('tgv')}-avatar">${v.t1Name.charAt(0)}</div>
        <div class="${uid('tgv')}-info">
          <div class="${uid('tgv')}-name">${v.t1Name}</div>
          <div class="${uid('tgv')}-role">${v.t1Role}</div>
        </div>
      </div>
    </div>
    <div class="${uid('tgv')}-card">
      <p class="${uid('tgv')}-quote">"${v.t2Quote}"</p>
      <div class="${uid('tgv')}-author">
        <div class="${uid('tgv')}-avatar">${v.t2Name.charAt(0)}</div>
        <div class="${uid('tgv')}-info">
          <div class="${uid('tgv')}-name">${v.t2Name}</div>
          <div class="${uid('tgv')}-role">${v.t2Role}</div>
        </div>
      </div>
    </div>
    <div class="${uid('tgv')}-card">
      <p class="${uid('tgv')}-quote">"${v.t3Quote}"</p>
      <div class="${uid('tgv')}-author">
        <div class="${uid('tgv')}-avatar">${v.t3Name.charAt(0)}</div>
        <div class="${uid('tgv')}-info">
          <div class="${uid('tgv')}-name">${v.t3Name}</div>
          <div class="${uid('tgv')}-role">${v.t3Role}</div>
        </div>
      </div>
    </div>
    <div class="${uid('tgv')}-card">
      <p class="${uid('tgv')}-quote">"${v.t4Quote}"</p>
      <div class="${uid('tgv')}-author">
        <div class="${uid('tgv')}-avatar">${v.t4Name.charAt(0)}</div>
        <div class="${uid('tgv')}-info">
          <div class="${uid('tgv')}-name">${v.t4Name}</div>
          <div class="${uid('tgv')}-role">${v.t4Role}</div>
        </div>
      </div>
    </div>
  </div>
</div>`
  },

  // 8. Feature Spotlight (jatin-yadav05)
  {
    id: 'feature-spotlight',
    name: 'Feature Spotlight',
    category: 'Features',
    description: 'Single feature highlight with icon, title, and description',
    thumbnail: '',
    fields: [
      { id: 'icon', label: 'Icon (emoji or SVG)', type: 'text', defaultValue: '✨' },
      { id: 'title', label: 'Feature Title', type: 'text', defaultValue: 'Lightning Fast' },
      { id: 'description', label: 'Feature Description', type: 'textarea', defaultValue: 'Experience blazing fast performance with our optimized infrastructure. Every millisecond counts.' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f8fafc' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#3b82f6' },
    ],
    generateHtml: (v) => `<div class="${uid('fsp')}" style="--accent:${v.accentColor}">
  <style>
    .${uid('fsp')} { display:flex; align-items:center; justify-content:center; padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; }
    .${uid('fsp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('fsp')}-card { text-align:center; max-width:400px; padding:40px; background:#fff; border-radius:16px; border:1px solid #e5e7eb; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); transition:all 0.3s; }
    .${uid('fsp')}-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px -12px rgba(0,0,0,0.15); }
    .${uid('fsp')}-icon { width:64px; height:64px; margin:0 auto 20px; background:linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #fff)); border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:28px; }
    .${uid('fsp')}-title { font-size:24px; font-weight:700; color:#111827; margin-bottom:12px; }
    .${uid('fsp')}-desc { font-size:15px; color:#6b7280; line-height:1.7; }
  </style>
  <div class="${uid('fsp')}-card">
    <div class="${uid('fsp')}-icon">${v.icon}</div>
    <h3 class="${uid('fsp')}-title">${v.title}</h3>
    <p class="${uid('fsp')}-desc">${v.description}</p>
  </div>
</div>`
  },

  // 9. Bento Grid Features (avanishverma4)
  {
    id: 'bento-grid-features',
    name: 'Bento Grid Features',
    category: 'Features',
    description: 'Modern bento-style grid layout for features',
    thumbnail: '',
    fields: [
      { id: 'title1', label: 'Feature 1 Title', type: 'text', defaultValue: 'Analytics Dashboard' },
      { id: 'desc1', label: 'Feature 1 Description', type: 'text', defaultValue: 'Track your metrics in real-time' },
      { id: 'title2', label: 'Feature 2 Title', type: 'text', defaultValue: 'Cloud Storage' },
      { id: 'desc2', label: 'Feature 2 Description', type: 'text', defaultValue: 'Secure unlimited storage' },
      { id: 'title3', label: 'Feature 3 Title', type: 'text', defaultValue: 'Team Collaboration' },
      { id: 'desc3', label: 'Feature 3 Description', type: 'text', defaultValue: 'Work together seamlessly' },
      { id: 'title4', label: 'Feature 4 Title', type: 'text', defaultValue: 'API Integration' },
      { id: 'desc4', label: 'Feature 4 Description', type: 'text', defaultValue: 'Connect with 100+ apps' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f8fafc' },
    ],
    generateHtml: (v) => `<div class="${uid('bgf')}">
  <style>
    .${uid('bgf')} { padding:64px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; }
    .${uid('bgf')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('bgf')}-grid { display:grid; grid-template-columns:repeat(4, 1fr); grid-template-rows:repeat(2, 200px); gap:16px; max-width:1000px; margin:0 auto; }
    @media(max-width:768px) { .${uid('bgf')}-grid { grid-template-columns:1fr 1fr; grid-template-rows:repeat(4, 180px); } }
    .${uid('bgf')}-card { background:#fff; border-radius:16px; padding:24px; border:1px solid #e5e7eb; display:flex; flex-direction:column; justify-content:flex-end; transition:all 0.3s; position:relative; overflow:hidden; }
    .${uid('bgf')}-card:hover { border-color:#3b82f6; transform:translateY(-2px); }
    .${uid('bgf')}-card:nth-child(1) { grid-column:span 2; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:#fff; border:none; }
    .${uid('bgf')}-card:nth-child(1) .${uid('bgf')}-title, .${uid('bgf')}-card:nth-child(1) .${uid('bgf')}-desc { color:#fff; }
    .${uid('bgf')}-card:nth-child(1) .${uid('bgf')}-desc { opacity:0.9; }
    .${uid('bgf')}-card:nth-child(4) { grid-column:span 2; }
    @media(max-width:768px) { .${uid('bgf')}-card:nth-child(1), .${uid('bgf')}-card:nth-child(4) { grid-column:span 2; } }
    .${uid('bgf')}-icon { width:48px; height:48px; background:#f3f4f6; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:auto; }
    .${uid('bgf')}-card:nth-child(1) .${uid('bgf')}-icon { background:rgba(255,255,255,0.2); }
    .${uid('bgf')}-title { font-size:18px; font-weight:600; color:#111827; margin-bottom:4px; }
    .${uid('bgf')}-desc { font-size:14px; color:#6b7280; }
  </style>
  <div class="${uid('bgf')}-grid">
    <div class="${uid('bgf')}-card">
      <div class="${uid('bgf')}-icon">📊</div>
      <h3 class="${uid('bgf')}-title">${v.title1}</h3>
      <p class="${uid('bgf')}-desc">${v.desc1}</p>
    </div>
    <div class="${uid('bgf')}-card">
      <div class="${uid('bgf')}-icon">☁️</div>
      <h3 class="${uid('bgf')}-title">${v.title2}</h3>
      <p class="${uid('bgf')}-desc">${v.desc2}</p>
    </div>
    <div class="${uid('bgf')}-card">
      <div class="${uid('bgf')}-icon">👥</div>
      <h3 class="${uid('bgf')}-title">${v.title3}</h3>
      <p class="${uid('bgf')}-desc">${v.desc3}</p>
    </div>
    <div class="${uid('bgf')}-card">
      <div class="${uid('bgf')}-icon">🔗</div>
      <h3 class="${uid('bgf')}-title">${v.title4}</h3>
      <p class="${uid('bgf')}-desc">${v.desc4}</p>
    </div>
  </div>
</div>`
  },

  // 10. Marketing Badges (jatin-yadav05)
  {
    id: 'marketing-badges',
    name: 'Marketing Badges',
    category: 'Trust',
    description: 'Trust badges and labels for product pages',
    thumbnail: '',
    fields: [
      { id: 'badge1', label: 'Badge 1 Text', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'badge2', label: 'Badge 2 Text', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'badge3', label: 'Badge 3 Text', type: 'text', defaultValue: '2-Year Warranty' },
      { id: 'badge4', label: 'Badge 4 Text', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('mkb')}">
  <style>
    .${uid('mkb')} { display:flex; flex-wrap:wrap; gap:12px; padding:24px; justify-content:center; background:${v.bgColor}; font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; }
    .${uid('mkb')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('mkb')}-badge { display:inline-flex; align-items:center; gap:8px; padding:10px 16px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:8px; font-size:13px; font-weight:500; color:#374151; transition:all 0.2s; }
    .${uid('mkb')}-badge:hover { border-color:#3b82f6; background:#eff6ff; }
    .${uid('mkb')}-badge svg { width:18px; height:18px; color:#22c55e; }
  </style>
  <div class="${uid('mkb')}-badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    ${v.badge1}
  </div>
  <div class="${uid('mkb')}-badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M21 6C20 3.5 17 2 13.5 2 7.2 2 2 7.2 2 13.5S7.2 25 13.5 25c4.5 0 8.5-2.6 10.3-6.5"/></svg>
    ${v.badge2}
  </div>
  <div class="${uid('mkb')}-badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ${v.badge3}
  </div>
  <div class="${uid('mkb')}-badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ${v.badge4}
  </div>
</div>`
  },

  // 11. 3D Photo Carousel (cult-ui)
  {
    id: '3d-photo-carousel',
    name: '3D Photo Carousel',
    category: 'Gallery',
    description: 'A stunning 3D cylinder carousel with draggable rotation and click-to-expand',
    thumbnail: '',
    fields: [
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=400&fit=crop' },
      { id: 'image4', label: 'Image 4', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=400&fit=crop' },
      { id: 'image5', label: 'Image 5', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=400&fit=crop' },
      { id: 'image6', label: 'Image 6', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=400&fit=crop' },
      { id: 'image7', label: 'Image 7', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=400&fit=crop' },
      { id: 'image8', label: 'Image 8', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=400&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('3dc')}">
  <style>
    .${uid('3dc')} { padding:40px 0; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; overflow:hidden; }
    .${uid('3dc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('3dc')}-scene { width:100%; height:500px; perspective:1000px; display:flex; align-items:center; justify-content:center; cursor:grab; user-select:none; }
    .${uid('3dc')}-scene:active { cursor:grabbing; }
    .${uid('3dc')}-carousel { position:relative; width:200px; height:280px; transform-style:preserve-3d; transition:transform 0.1s ease-out; }
    .${uid('3dc')}-card { position:absolute; width:200px; height:280px; backface-visibility:hidden; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.15); transition:transform 0.3s, box-shadow 0.3s; }
    .${uid('3dc')}-card:hover { box-shadow:0 15px 40px rgba(0,0,0,0.25); }
    .${uid('3dc')}-card img { width:100%; height:100%; object-fit:cover; pointer-events:none; }
    .${uid('3dc')}-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.8); display:none; align-items:center; justify-content:center; z-index:1000; cursor:pointer; }
    .${uid('3dc')}-overlay.active { display:flex; }
    .${uid('3dc')}-overlay img { max-width:90%; max-height:90%; border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,0.5); animation:${uid('3dc')}-zoomIn 0.3s ease-out; }
    @keyframes ${uid('3dc')}-zoomIn { from { transform:scale(0.5); opacity:0; } to { transform:scale(1); opacity:1; } }
  </style>
  <div class="${uid('3dc')}-scene" id="${uid('3dc')}-scene">
    <div class="${uid('3dc')}-carousel" id="${uid('3dc')}-carousel">
      <div class="${uid('3dc')}-card" style="transform:rotateY(0deg) translateZ(300px);"><img src="${v.image1}" alt="Photo 1" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
      <div class="${uid('3dc')}-card" style="transform:rotateY(45deg) translateZ(300px);"><img src="${v.image2}" alt="Photo 2" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
      <div class="${uid('3dc')}-card" style="transform:rotateY(90deg) translateZ(300px);"><img src="${v.image3}" alt="Photo 3" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
      <div class="${uid('3dc')}-card" style="transform:rotateY(135deg) translateZ(300px);"><img src="${v.image4}" alt="Photo 4" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
      <div class="${uid('3dc')}-card" style="transform:rotateY(180deg) translateZ(300px);"><img src="${v.image5}" alt="Photo 5" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
      <div class="${uid('3dc')}-card" style="transform:rotateY(225deg) translateZ(300px);"><img src="${v.image6}" alt="Photo 6" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
      <div class="${uid('3dc')}-card" style="transform:rotateY(270deg) translateZ(300px);"><img src="${v.image7}" alt="Photo 7" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
      <div class="${uid('3dc')}-card" style="transform:rotateY(315deg) translateZ(300px);"><img src="${v.image8}" alt="Photo 8" onclick="document.getElementById('${uid('3dc')}-overlay').classList.add('active');document.getElementById('${uid('3dc')}-fullimg').src=this.src;"></div>
    </div>
  </div>
  <div class="${uid('3dc')}-overlay" id="${uid('3dc')}-overlay" onclick="this.classList.remove('active');">
    <img id="${uid('3dc')}-fullimg" src="" alt="Full size">
  </div>
  <script>
    (function(){
      var scene = document.getElementById('${uid('3dc')}-scene');
      var carousel = document.getElementById('${uid('3dc')}-carousel');
      var rotation = 0;
      var isDragging = false;
      var startX = 0;
      var startRotation = 0;
      scene.addEventListener('mousedown', function(e) { isDragging = true; startX = e.clientX; startRotation = rotation; scene.style.cursor = 'grabbing'; });
      document.addEventListener('mousemove', function(e) { if (!isDragging) return; var delta = e.clientX - startX; rotation = startRotation + delta * 0.3; carousel.style.transform = 'rotateY(' + rotation + 'deg)'; });
      document.addEventListener('mouseup', function() { isDragging = false; scene.style.cursor = 'grab'; });
      scene.addEventListener('touchstart', function(e) { isDragging = true; startX = e.touches[0].clientX; startRotation = rotation; });
      document.addEventListener('touchmove', function(e) { if (!isDragging) return; var delta = e.touches[0].clientX - startX; rotation = startRotation + delta * 0.3; carousel.style.transform = 'rotateY(' + rotation + 'deg)'; });
      document.addEventListener('touchend', function() { isDragging = false; });
    })();
  </script>
</div>`
  },

  // 12. Offer Carousel (ravikatiyar)
  {
    id: 'deals-offer-carousel',
    name: 'Deals Offer Carousel',
    category: 'Product',
    description: 'Horizontal scrolling carousel for showcasing deals and offers with brand logos',
    thumbnail: '',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Deals of the Day' },
      { id: 'offer1Img', label: 'Offer 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=250&fit=crop' },
      { id: 'offer1Tag', label: 'Offer 1 Tag', type: 'text', defaultValue: 'Discount' },
      { id: 'offer1Title', label: 'Offer 1 Title', type: 'text', defaultValue: 'Up to $300 OFF' },
      { id: 'offer1Desc', label: 'Offer 1 Description', type: 'text', defaultValue: 'On International Flights' },
      { id: 'offer1Brand', label: 'Offer 1 Brand', type: 'text', defaultValue: 'TravelPro' },
      { id: 'offer1Code', label: 'Offer 1 Code', type: 'text', defaultValue: 'FLY300' },
      { id: 'offer2Img', label: 'Offer 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop' },
      { id: 'offer2Tag', label: 'Offer 2 Tag', type: 'text', defaultValue: 'Discount' },
      { id: 'offer2Title', label: 'Offer 2 Title', type: 'text', defaultValue: 'Save $75' },
      { id: 'offer2Desc', label: 'Offer 2 Description', type: 'text', defaultValue: 'On orders $299+' },
      { id: 'offer2Brand', label: 'Offer 2 Brand', type: 'text', defaultValue: 'FoodHub' },
      { id: 'offer2Code', label: 'Offer 2 Code', type: 'text', defaultValue: 'SAVE75' },
      { id: 'offer3Img', label: 'Offer 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop' },
      { id: 'offer3Tag', label: 'Offer 3 Tag', type: 'text', defaultValue: 'Exclusive' },
      { id: 'offer3Title', label: 'Offer 3 Title', type: 'text', defaultValue: 'Flat $50 OFF' },
      { id: 'offer3Desc', label: 'Offer 3 Description', type: 'text', defaultValue: 'Premium Membership' },
      { id: 'offer3Brand', label: 'Offer 3 Brand', type: 'text', defaultValue: 'StreamPlus' },
      { id: 'offer3Code', label: 'Offer 3 Code', type: 'text', defaultValue: 'STREAM50' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('ofc')}">
  <style>
    .${uid('ofc')} { padding:40px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('ofc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('ofc')}-title { font-size:28px; font-weight:700; color:#111; margin-bottom:24px; }
    .${uid('ofc')}-wrapper { position:relative; }
    .${uid('ofc')}-scroll { display:flex; gap:20px; overflow-x:auto; scroll-behavior:smooth; padding:8px 0; scrollbar-width:none; -ms-overflow-style:none; }
    .${uid('ofc')}-scroll::-webkit-scrollbar { display:none; }
    .${uid('ofc')}-card { min-width:280px; max-width:280px; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08); transition:transform 0.3s, box-shadow 0.3s; cursor:pointer; }
    .${uid('ofc')}-card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,0.12); }
    .${uid('ofc')}-img { width:100%; height:160px; object-fit:cover; }
    .${uid('ofc')}-content { padding:16px; }
    .${uid('ofc')}-tag { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; color:#7c3aed; margin-bottom:8px; }
    .${uid('ofc')}-tag svg { width:14px; height:14px; }
    .${uid('ofc')}-heading { font-size:18px; font-weight:700; color:#111; margin-bottom:4px; }
    .${uid('ofc')}-desc { font-size:14px; color:#6b7280; margin-bottom:16px; }
    .${uid('ofc')}-footer { display:flex; align-items:center; justify-content:space-between; padding-top:12px; border-top:1px solid #f3f4f6; }
    .${uid('ofc')}-brand { display:flex; align-items:center; gap:10px; }
    .${uid('ofc')}-brand-icon { width:36px; height:36px; background:#f3f4f6; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; color:#374151; }
    .${uid('ofc')}-brand-info p:first-child { font-size:13px; font-weight:600; color:#111; }
    .${uid('ofc')}-brand-info p:last-child { font-size:11px; color:#9ca3af; font-family:monospace; }
    .${uid('ofc')}-arrow { width:32px; height:32px; display:flex; align-items:center; justify-content:center; color:#9ca3af; }
    .${uid('ofc')}-nav { position:absolute; top:50%; transform:translateY(-50%); width:40px; height:40px; background:#fff; border:1px solid #e5e7eb; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.1); z-index:10; transition:all 0.2s; }
    .${uid('ofc')}-nav:hover { background:#f9fafb; border-color:#d1d5db; }
    .${uid('ofc')}-nav.left { left:-20px; }
    .${uid('ofc')}-nav.right { right:-20px; }
    @media(max-width:640px) { .${uid('ofc')}-nav { display:none; } }
  </style>
  <h2 class="${uid('ofc')}-title">${v.title}</h2>
  <div class="${uid('ofc')}-wrapper">
    <button class="${uid('ofc')}-nav left" onclick="document.getElementById('${uid('ofc')}-scroll').scrollBy({left:-300,behavior:'smooth'})">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <div class="${uid('ofc')}-scroll" id="${uid('ofc')}-scroll">
      <div class="${uid('ofc')}-card">
        <img class="${uid('ofc')}-img" src="${v.offer1Img}" alt="${v.offer1Title}">
        <div class="${uid('ofc')}-content">
          <div class="${uid('ofc')}-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>${v.offer1Tag}</div>
          <h3 class="${uid('ofc')}-heading">${v.offer1Title}</h3>
          <p class="${uid('ofc')}-desc">${v.offer1Desc}</p>
          <div class="${uid('ofc')}-footer">
            <div class="${uid('ofc')}-brand">
              <div class="${uid('ofc')}-brand-icon">${v.offer1Brand.charAt(0)}</div>
              <div class="${uid('ofc')}-brand-info"><p>${v.offer1Brand}</p><p>${v.offer1Code}</p></div>
            </div>
            <div class="${uid('ofc')}-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </div>
        </div>
      </div>
      <div class="${uid('ofc')}-card">
        <img class="${uid('ofc')}-img" src="${v.offer2Img}" alt="${v.offer2Title}">
        <div class="${uid('ofc')}-content">
          <div class="${uid('ofc')}-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>${v.offer2Tag}</div>
          <h3 class="${uid('ofc')}-heading">${v.offer2Title}</h3>
          <p class="${uid('ofc')}-desc">${v.offer2Desc}</p>
          <div class="${uid('ofc')}-footer">
            <div class="${uid('ofc')}-brand">
              <div class="${uid('ofc')}-brand-icon">${v.offer2Brand.charAt(0)}</div>
              <div class="${uid('ofc')}-brand-info"><p>${v.offer2Brand}</p><p>${v.offer2Code}</p></div>
            </div>
            <div class="${uid('ofc')}-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </div>
        </div>
      </div>
      <div class="${uid('ofc')}-card">
        <img class="${uid('ofc')}-img" src="${v.offer3Img}" alt="${v.offer3Title}">
        <div class="${uid('ofc')}-content">
          <div class="${uid('ofc')}-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>${v.offer3Tag}</div>
          <h3 class="${uid('ofc')}-heading">${v.offer3Title}</h3>
          <p class="${uid('ofc')}-desc">${v.offer3Desc}</p>
          <div class="${uid('ofc')}-footer">
            <div class="${uid('ofc')}-brand">
              <div class="${uid('ofc')}-brand-icon">${v.offer3Brand.charAt(0)}</div>
              <div class="${uid('ofc')}-brand-info"><p>${v.offer3Brand}</p><p>${v.offer3Code}</p></div>
            </div>
            <div class="${uid('ofc')}-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </div>
        </div>
      </div>
    </div>
    <button class="${uid('ofc')}-nav right" onclick="document.getElementById('${uid('ofc')}-scroll').scrollBy({left:300,behavior:'smooth'})">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</div>`
  },

  // 13. Creative Pricing (kokonutd style)
  {
    id: 'creative-pricing',
    name: 'Creative Pricing',
    category: 'Pricing',
    description: 'Modern pricing cards with gradient backgrounds and hover animations',
    thumbnail: '',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Choose Your Plan' },
      { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'Start free, upgrade when you need' },
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Starter' },
      { id: 'plan1Price', label: 'Plan 1 Price', type: 'text', defaultValue: '$0' },
      { id: 'plan1Period', label: 'Plan 1 Period', type: 'text', defaultValue: '/month' },
      { id: 'plan1Feature1', label: 'Plan 1 Feature 1', type: 'text', defaultValue: '5 Projects' },
      { id: 'plan1Feature2', label: 'Plan 1 Feature 2', type: 'text', defaultValue: '1GB Storage' },
      { id: 'plan1Feature3', label: 'Plan 1 Feature 3', type: 'text', defaultValue: 'Basic Support' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Professional' },
      { id: 'plan2Price', label: 'Plan 2 Price', type: 'text', defaultValue: '$29' },
      { id: 'plan2Period', label: 'Plan 2 Period', type: 'text', defaultValue: '/month' },
      { id: 'plan2Feature1', label: 'Plan 2 Feature 1', type: 'text', defaultValue: 'Unlimited Projects' },
      { id: 'plan2Feature2', label: 'Plan 2 Feature 2', type: 'text', defaultValue: '100GB Storage' },
      { id: 'plan2Feature3', label: 'Plan 2 Feature 3', type: 'text', defaultValue: 'Priority Support' },
      { id: 'plan3Name', label: 'Plan 3 Name', type: 'text', defaultValue: 'Enterprise' },
      { id: 'plan3Price', label: 'Plan 3 Price', type: 'text', defaultValue: '$99' },
      { id: 'plan3Period', label: 'Plan 3 Period', type: 'text', defaultValue: '/month' },
      { id: 'plan3Feature1', label: 'Plan 3 Feature 1', type: 'text', defaultValue: 'Everything in Pro' },
      { id: 'plan3Feature2', label: 'Plan 3 Feature 2', type: 'text', defaultValue: 'Custom Integrations' },
      { id: 'plan3Feature3', label: 'Plan 3 Feature 3', type: 'text', defaultValue: 'Dedicated Manager' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Get Started' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#667eea' },
    ],
    generateHtml: (v) => `<div class="${uid('crp')}">
  <style>
    .${uid('crp')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('crp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('crp')}-header { text-align:center; margin-bottom:48px; }
    .${uid('crp')}-title { font-size:42px; font-weight:800; color:#fff; margin-bottom:12px; }
    .${uid('crp')}-subtitle { font-size:18px; color:rgba(255,255,255,0.8); }
    .${uid('crp')}-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; max-width:1100px; margin:0 auto; }
    @media(max-width:900px) { .${uid('crp')}-grid { grid-template-columns:1fr; max-width:400px; } }
    .${uid('crp')}-card { background:rgba(255,255,255,0.95); border-radius:24px; padding:40px 32px; position:relative; transition:transform 0.3s, box-shadow 0.3s; }
    .${uid('crp')}-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,0.2); }
    .${uid('crp')}-card.featured { background:#fff; transform:scale(1.05); box-shadow:0 20px 40px rgba(0,0,0,0.2); }
    .${uid('crp')}-card.featured:hover { transform:scale(1.05) translateY(-8px); }
    .${uid('crp')}-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg, #f59e0b, #ef4444); color:#fff; font-size:12px; font-weight:600; padding:6px 16px; border-radius:20px; }
    .${uid('crp')}-plan { font-size:14px; font-weight:600; color:#7c3aed; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px; }
    .${uid('crp')}-price { display:flex; align-items:baseline; gap:4px; margin-bottom:24px; }
    .${uid('crp')}-amount { font-size:48px; font-weight:800; color:#111; }
    .${uid('crp')}-period { font-size:16px; color:#6b7280; }
    .${uid('crp')}-features { list-style:none; margin-bottom:32px; }
    .${uid('crp')}-features li { display:flex; align-items:center; gap:12px; padding:12px 0; color:#374151; font-size:15px; border-bottom:1px solid #f3f4f6; }
    .${uid('crp')}-features li:last-child { border-bottom:none; }
    .${uid('crp')}-features svg { width:20px; height:20px; color:#10b981; flex-shrink:0; }
    .${uid('crp')}-btn { width:100%; padding:16px 24px; background:#111; color:#fff; border:none; border-radius:12px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s; }
    .${uid('crp')}-btn:hover { background:#374151; transform:translateY(-2px); }
    .${uid('crp')}-card.featured .${uid('crp')}-btn { background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  </style>
  <div class="${uid('crp')}-header">
    <h2 class="${uid('crp')}-title">${v.title}</h2>
    <p class="${uid('crp')}-subtitle">${v.subtitle}</p>
  </div>
  <div class="${uid('crp')}-grid">
    <div class="${uid('crp')}-card">
      <div class="${uid('crp')}-plan">${v.plan1Name}</div>
      <div class="${uid('crp')}-price"><span class="${uid('crp')}-amount">${v.plan1Price}</span><span class="${uid('crp')}-period">${v.plan1Period}</span></div>
      <ul class="${uid('crp')}-features">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan1Feature1}</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan1Feature2}</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan1Feature3}</li>
      </ul>
      <button class="${uid('crp')}-btn">${v.buttonText}</button>
    </div>
    <div class="${uid('crp')}-card featured">
      <div class="${uid('crp')}-badge">Most Popular</div>
      <div class="${uid('crp')}-plan">${v.plan2Name}</div>
      <div class="${uid('crp')}-price"><span class="${uid('crp')}-amount">${v.plan2Price}</span><span class="${uid('crp')}-period">${v.plan2Period}</span></div>
      <ul class="${uid('crp')}-features">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan2Feature1}</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan2Feature2}</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan2Feature3}</li>
      </ul>
      <button class="${uid('crp')}-btn">${v.buttonText}</button>
    </div>
    <div class="${uid('crp')}-card">
      <div class="${uid('crp')}-plan">${v.plan3Name}</div>
      <div class="${uid('crp')}-price"><span class="${uid('crp')}-amount">${v.plan3Price}</span><span class="${uid('crp')}-period">${v.plan3Period}</span></div>
      <ul class="${uid('crp')}-features">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan3Feature1}</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan3Feature2}</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${v.plan3Feature3}</li>
      </ul>
      <button class="${uid('crp')}-btn">${v.buttonText}</button>
    </div>
  </div>
</div>`
  },

  // 14. Dark Gradient Pricing (vaib215 style)
  {
    id: 'dark-gradient-pricing',
    name: 'Dark Gradient Pricing',
    category: 'Pricing',
    description: 'Sleek dark pricing cards with neon accents and glass morphism',
    thumbnail: '',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Pricing Plans' },
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Basic' },
      { id: 'plan1Price', label: 'Plan 1 Price', type: 'text', defaultValue: '$9' },
      { id: 'plan1Features', label: 'Plan 1 Features (comma sep)', type: 'textarea', defaultValue: '10 Projects,5GB Storage,Email Support,Basic Analytics' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Pro' },
      { id: 'plan2Price', label: 'Plan 2 Price', type: 'text', defaultValue: '$29' },
      { id: 'plan2Features', label: 'Plan 2 Features (comma sep)', type: 'textarea', defaultValue: 'Unlimited Projects,50GB Storage,Priority Support,Advanced Analytics,API Access' },
      { id: 'plan3Name', label: 'Plan 3 Name', type: 'text', defaultValue: 'Team' },
      { id: 'plan3Price', label: 'Plan 3 Price', type: 'text', defaultValue: '$79' },
      { id: 'plan3Features', label: 'Plan 3 Features (comma sep)', type: 'textarea', defaultValue: 'Everything in Pro,Team Collaboration,Custom Domains,White-label,Dedicated Support' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
    ],
    generateHtml: (v) => `<div class="${uid('dgp')}">
  <style>
    .${uid('dgp')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('dgp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('dgp')}-title { text-align:center; font-size:40px; font-weight:700; color:#fff; margin-bottom:48px; }
    .${uid('dgp')}-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; max-width:1100px; margin:0 auto; }
    @media(max-width:900px) { .${uid('dgp')}-grid { grid-template-columns:1fr; max-width:400px; } }
    .${uid('dgp')}-card { background:rgba(255,255,255,0.05); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:32px; position:relative; overflow:hidden; transition:all 0.4s; }
    .${uid('dgp')}-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef); opacity:0; transition:opacity 0.3s; }
    .${uid('dgp')}-card:hover { border-color:rgba(139,92,246,0.5); transform:translateY(-4px); }
    .${uid('dgp')}-card:hover::before { opacity:1; }
    .${uid('dgp')}-card.featured { border-color:rgba(139,92,246,0.5); }
    .${uid('dgp')}-card.featured::before { opacity:1; }
    .${uid('dgp')}-name { font-size:18px; font-weight:600; color:rgba(255,255,255,0.7); margin-bottom:16px; }
    .${uid('dgp')}-price { font-size:52px; font-weight:800; color:#fff; margin-bottom:8px; }
    .${uid('dgp')}-price span { font-size:16px; font-weight:400; color:rgba(255,255,255,0.5); }
    .${uid('dgp')}-divider { height:1px; background:rgba(255,255,255,0.1); margin:24px 0; }
    .${uid('dgp')}-features { list-style:none; }
    .${uid('dgp')}-features li { display:flex; align-items:center; gap:12px; padding:10px 0; color:rgba(255,255,255,0.8); font-size:14px; }
    .${uid('dgp')}-features svg { width:18px; height:18px; color:#8b5cf6; }
    .${uid('dgp')}-btn { width:100%; margin-top:24px; padding:14px; background:transparent; border:1px solid rgba(255,255,255,0.2); color:#fff; border-radius:10px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.3s; }
    .${uid('dgp')}-btn:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.3); }
    .${uid('dgp')}-card.featured .${uid('dgp')}-btn { background:linear-gradient(135deg, #6366f1, #8b5cf6); border:none; }
    .${uid('dgp')}-card.featured .${uid('dgp')}-btn:hover { opacity:0.9; }
  </style>
  <h2 class="${uid('dgp')}-title">${v.title}</h2>
  <div class="${uid('dgp')}-grid">
    <div class="${uid('dgp')}-card">
      <div class="${uid('dgp')}-name">${v.plan1Name}</div>
      <div class="${uid('dgp')}-price">${v.plan1Price}<span>/mo</span></div>
      <div class="${uid('dgp')}-divider"></div>
      <ul class="${uid('dgp')}-features">
        ${v.plan1Features.split(',').map((f: string) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f.trim()}</li>`).join('')}
      </ul>
      <button class="${uid('dgp')}-btn">Get Started</button>
    </div>
    <div class="${uid('dgp')}-card featured">
      <div class="${uid('dgp')}-name">${v.plan2Name}</div>
      <div class="${uid('dgp')}-price">${v.plan2Price}<span>/mo</span></div>
      <div class="${uid('dgp')}-divider"></div>
      <ul class="${uid('dgp')}-features">
        ${v.plan2Features.split(',').map((f: string) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f.trim()}</li>`).join('')}
      </ul>
      <button class="${uid('dgp')}-btn">Get Started</button>
    </div>
    <div class="${uid('dgp')}-card">
      <div class="${uid('dgp')}-name">${v.plan3Name}</div>
      <div class="${uid('dgp')}-price">${v.plan3Price}<span>/mo</span></div>
      <div class="${uid('dgp')}-divider"></div>
      <ul class="${uid('dgp')}-features">
        ${v.plan3Features.split(',').map((f: string) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f.trim()}</li>`).join('')}
      </ul>
      <button class="${uid('dgp')}-btn">Get Started</button>
    </div>
  </div>
</div>`
  },

  // 15. Premium Testimonials (dhileepkumargm)
  {
    id: 'premium-testimonials',
    name: 'Premium Testimonials',
    category: 'Testimonials',
    description: 'Elegant testimonial carousel with large photos and smooth transitions',
    thumbnail: '',
    fields: [
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'This product has completely transformed how we work. The intuitive design and powerful features have made our team 10x more productive.' },
      { id: 'author1', label: 'Author 1', type: 'text', defaultValue: 'Sarah Johnson' },
      { id: 'role1', label: 'Role 1', type: 'text', defaultValue: 'CEO at TechCorp' },
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'Absolutely incredible experience. The customer support team went above and beyond to help us succeed. Highly recommended!' },
      { id: 'author2', label: 'Author 2', type: 'text', defaultValue: 'Michael Chen' },
      { id: 'role2', label: 'Role 2', type: 'text', defaultValue: 'Founder at StartupX' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'The best investment we have made for our business. ROI was visible within the first month. Game changer!' },
      { id: 'author3', label: 'Author 3', type: 'text', defaultValue: 'Emily Davis' },
      { id: 'role3', label: 'Role 3', type: 'text', defaultValue: 'Marketing Director' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('prt')}">
  <style>
    .${uid('prt')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; overflow:hidden; }
    .${uid('prt')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('prt')}-container { max-width:800px; margin:0 auto; position:relative; }
    .${uid('prt')}-slide { display:none; text-align:center; animation:${uid('prt')}-fadeIn 0.5s ease; }
    .${uid('prt')}-slide.active { display:block; }
    @keyframes ${uid('prt')}-fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    .${uid('prt')}-quote { font-size:28px; font-weight:400; color:#1d1d1f; line-height:1.5; margin-bottom:40px; position:relative; }
    .${uid('prt')}-quote::before { content:'"'; position:absolute; top:-40px; left:50%; transform:translateX(-50%); font-size:120px; color:#e5e5e5; font-family:Georgia,serif; line-height:1; z-index:0; }
    .${uid('prt')}-author { display:flex; flex-direction:column; align-items:center; gap:16px; }
    .${uid('prt')}-avatar { width:80px; height:80px; border-radius:50%; object-fit:cover; border:4px solid #fff; box-shadow:0 4px 20px rgba(0,0,0,0.1); }
    .${uid('prt')}-name { font-size:18px; font-weight:600; color:#1d1d1f; }
    .${uid('prt')}-role { font-size:14px; color:#86868b; }
    .${uid('prt')}-nav { display:flex; justify-content:center; gap:12px; margin-top:40px; }
    .${uid('prt')}-dot { width:10px; height:10px; border-radius:50%; background:#d1d1d6; border:none; cursor:pointer; transition:all 0.3s; }
    .${uid('prt')}-dot.active { background:#1d1d1f; transform:scale(1.2); }
    .${uid('prt')}-arrows { position:absolute; top:50%; width:100%; display:flex; justify-content:space-between; transform:translateY(-50%); pointer-events:none; }
    .${uid('prt')}-arrow { width:48px; height:48px; border-radius:50%; background:#fff; border:1px solid #e5e5e5; display:flex; align-items:center; justify-content:center; cursor:pointer; pointer-events:auto; transition:all 0.3s; box-shadow:0 2px 8px rgba(0,0,0,0.08); }
    .${uid('prt')}-arrow:hover { background:#f5f5f7; border-color:#d1d1d6; }
    @media(max-width:900px) { .${uid('prt')}-arrows { display:none; } .${uid('prt')}-quote { font-size:22px; } }
  </style>
  <div class="${uid('prt')}-container">
    <div class="${uid('prt')}-arrows">
      <button class="${uid('prt')}-arrow" onclick="(function(){var slides=document.querySelectorAll('.${uid('prt')}-slide');var dots=document.querySelectorAll('.${uid('prt')}-dot');var current=Array.from(slides).findIndex(s=>s.classList.contains('active'));slides[current].classList.remove('active');dots[current].classList.remove('active');var prev=(current-1+slides.length)%slides.length;slides[prev].classList.add('active');dots[prev].classList.add('active');})()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="${uid('prt')}-arrow" onclick="(function(){var slides=document.querySelectorAll('.${uid('prt')}-slide');var dots=document.querySelectorAll('.${uid('prt')}-dot');var current=Array.from(slides).findIndex(s=>s.classList.contains('active'));slides[current].classList.remove('active');dots[current].classList.remove('active');var next=(current+1)%slides.length;slides[next].classList.add('active');dots[next].classList.add('active');})()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
    <div class="${uid('prt')}-slide active">
      <p class="${uid('prt')}-quote">${v.quote1}</p>
      <div class="${uid('prt')}-author">
        <img class="${uid('prt')}-avatar" src="${v.image1}" alt="${v.author1}">
        <div class="${uid('prt')}-name">${v.author1}</div>
        <div class="${uid('prt')}-role">${v.role1}</div>
      </div>
    </div>
    <div class="${uid('prt')}-slide">
      <p class="${uid('prt')}-quote">${v.quote2}</p>
      <div class="${uid('prt')}-author">
        <img class="${uid('prt')}-avatar" src="${v.image2}" alt="${v.author2}">
        <div class="${uid('prt')}-name">${v.author2}</div>
        <div class="${uid('prt')}-role">${v.role2}</div>
      </div>
    </div>
    <div class="${uid('prt')}-slide">
      <p class="${uid('prt')}-quote">${v.quote3}</p>
      <div class="${uid('prt')}-author">
        <img class="${uid('prt')}-avatar" src="${v.image3}" alt="${v.author3}">
        <div class="${uid('prt')}-name">${v.author3}</div>
        <div class="${uid('prt')}-role">${v.role3}</div>
      </div>
    </div>
    <div class="${uid('prt')}-nav">
      <button class="${uid('prt')}-dot active" onclick="document.querySelectorAll('.${uid('prt')}-slide').forEach((s,i)=>{s.classList.toggle('active',i===0);});document.querySelectorAll('.${uid('prt')}-dot').forEach((d,i)=>{d.classList.toggle('active',i===0);});"></button>
      <button class="${uid('prt')}-dot" onclick="document.querySelectorAll('.${uid('prt')}-slide').forEach((s,i)=>{s.classList.toggle('active',i===1);});document.querySelectorAll('.${uid('prt')}-dot').forEach((d,i)=>{d.classList.toggle('active',i===1);});"></button>
      <button class="${uid('prt')}-dot" onclick="document.querySelectorAll('.${uid('prt')}-slide').forEach((s,i)=>{s.classList.toggle('active',i===2);});document.querySelectorAll('.${uid('prt')}-dot').forEach((d,i)=>{d.classList.toggle('active',i===2);});"></button>
    </div>
  </div>
</div>`
  },

  // 16. Retro Testimonial Carousel (ishamsu)
  {
    id: 'retro-testimonial-carousel',
    name: 'Retro Testimonial Carousel',
    category: 'Testimonials',
    description: 'Vintage-style testimonial cards with stacked card animation effect',
    thumbnail: '',
    fields: [
      { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'What Our Customers Say' },
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'Outstanding service! The team delivered beyond our expectations.' },
      { id: 'author1', label: 'Author 1', type: 'text', defaultValue: 'Alex Turner' },
      { id: 'company1', label: 'Company 1', type: 'text', defaultValue: 'Design Studio' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'A game-changing platform that simplified our entire workflow.' },
      { id: 'author2', label: 'Author 2', type: 'text', defaultValue: 'Maria Garcia' },
      { id: 'company2', label: 'Company 2', type: 'text', defaultValue: 'Creative Agency' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'Best decision we made this year. Highly recommend to everyone!' },
      { id: 'author3', label: 'Author 3', type: 'text', defaultValue: 'James Wilson' },
      { id: 'company3', label: 'Company 3', type: 'text', defaultValue: 'Tech Innovations' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f5f0e8' },
    ],
    generateHtml: (v) => `<div class="${uid('rtc')}">
  <style>
    .${uid('rtc')} { padding:80px 24px; background:${v.bgColor}; font-family:'Georgia',serif; }
    .${uid('rtc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('rtc')}-title { text-align:center; font-size:36px; font-weight:400; color:#2d2d2d; margin-bottom:48px; font-style:italic; }
    .${uid('rtc')}-container { max-width:600px; margin:0 auto; position:relative; height:320px; }
    .${uid('rtc')}-card { position:absolute; width:100%; background:#fff; border-radius:8px; padding:40px; box-shadow:0 4px 20px rgba(0,0,0,0.1); transition:all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
    .${uid('rtc')}-card:nth-child(1) { z-index:3; transform:translateY(0) scale(1); opacity:1; }
    .${uid('rtc')}-card:nth-child(2) { z-index:2; transform:translateY(20px) scale(0.95); opacity:0.7; }
    .${uid('rtc')}-card:nth-child(3) { z-index:1; transform:translateY(40px) scale(0.9); opacity:0.4; }
    .${uid('rtc')}-quote { font-size:20px; line-height:1.7; color:#4a4a4a; margin-bottom:32px; font-style:italic; position:relative; padding-left:30px; }
    .${uid('rtc')}-quote::before { content:'"'; position:absolute; left:0; top:-10px; font-size:60px; color:#d4a574; font-family:Georgia,serif; line-height:1; }
    .${uid('rtc')}-author { border-top:1px solid #e5e5e5; padding-top:20px; }
    .${uid('rtc')}-name { font-size:16px; font-weight:600; color:#2d2d2d; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('rtc')}-company { font-size:14px; color:#888; font-family:'Inter',-apple-system,sans-serif; margin-top:4px; }
    .${uid('rtc')}-nav { display:flex; justify-content:center; gap:16px; margin-top:60px; }
    .${uid('rtc')}-btn { width:48px; height:48px; border-radius:50%; background:#2d2d2d; border:none; color:#fff; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; justify-content:center; }
    .${uid('rtc')}-btn:hover { background:#d4a574; transform:scale(1.1); }
  </style>
  <h2 class="${uid('rtc')}-title">${v.title}</h2>
  <div class="${uid('rtc')}-container" id="${uid('rtc')}-container">
    <div class="${uid('rtc')}-card">
      <p class="${uid('rtc')}-quote">${v.quote1}</p>
      <div class="${uid('rtc')}-author">
        <div class="${uid('rtc')}-name">${v.author1}</div>
        <div class="${uid('rtc')}-company">${v.company1}</div>
      </div>
    </div>
    <div class="${uid('rtc')}-card">
      <p class="${uid('rtc')}-quote">${v.quote2}</p>
      <div class="${uid('rtc')}-author">
        <div class="${uid('rtc')}-name">${v.author2}</div>
        <div class="${uid('rtc')}-company">${v.company2}</div>
      </div>
    </div>
    <div class="${uid('rtc')}-card">
      <p class="${uid('rtc')}-quote">${v.quote3}</p>
      <div class="${uid('rtc')}-author">
        <div class="${uid('rtc')}-name">${v.author3}</div>
        <div class="${uid('rtc')}-company">${v.company3}</div>
      </div>
    </div>
  </div>
  <div class="${uid('rtc')}-nav">
    <button class="${uid('rtc')}-btn" onclick="(function(){var c=document.getElementById('${uid('rtc')}-container');var cards=c.querySelectorAll('.${uid('rtc')}-card');c.insertBefore(cards[cards.length-1],cards[0]);})()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="${uid('rtc')}-btn" onclick="(function(){var c=document.getElementById('${uid('rtc')}-container');var cards=c.querySelectorAll('.${uid('rtc')}-card');c.appendChild(cards[0]);})()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</div>`
  },

  // 17. Infinite Logo Slider (motion-primitives)
  {
    id: 'infinite-logo-slider',
    name: 'Infinite Logo Slider',
    category: 'Brand',
    description: 'Smooth infinite scrolling logo slider with pause on hover',
    thumbnail: '',
    fields: [
      { id: 'speed', label: 'Animation Speed (seconds)', type: 'number', defaultValue: '30' },
      { id: 'logo1', label: 'Logo 1 Text', type: 'text', defaultValue: 'Shopify' },
      { id: 'logo2', label: 'Logo 2 Text', type: 'text', defaultValue: 'Stripe' },
      { id: 'logo3', label: 'Logo 3 Text', type: 'text', defaultValue: 'Notion' },
      { id: 'logo4', label: 'Logo 4 Text', type: 'text', defaultValue: 'Slack' },
      { id: 'logo5', label: 'Logo 5 Text', type: 'text', defaultValue: 'Discord' },
      { id: 'logo6', label: 'Logo 6 Text', type: 'text', defaultValue: 'Figma' },
      { id: 'logo7', label: 'Logo 7 Text', type: 'text', defaultValue: 'Linear' },
      { id: 'logo8', label: 'Logo 8 Text', type: 'text', defaultValue: 'Vercel' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('ils')}">
  <style>
    .${uid('ils')} { padding:60px 0; background:${v.bgColor}; overflow:hidden; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('ils')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('ils')}-track { display:flex; width:fit-content; animation:${uid('ils')}-scroll ${v.speed}s linear infinite; }
    .${uid('ils')}:hover .${uid('ils')}-track { animation-play-state:paused; }
    @keyframes ${uid('ils')}-scroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
    .${uid('ils')}-item { display:flex; align-items:center; justify-content:center; padding:0 48px; height:80px; font-size:24px; font-weight:700; color:#9ca3af; transition:color 0.3s; white-space:nowrap; }
    .${uid('ils')}-item:hover { color:#111; }
    .${uid('ils')}-fade { position:absolute; top:0; bottom:0; width:200px; pointer-events:none; z-index:10; }
    .${uid('ils')}-fade.left { left:0; background:linear-gradient(90deg, #fff, transparent); }
    .${uid('ils')}-fade.right { right:0; background:linear-gradient(-90deg, #fff, transparent); }
    .${uid('ils')}-wrapper { position:relative; }
  </style>
  <div class="${uid('ils')}-wrapper">
    <div class="${uid('ils')}-fade left"></div>
    <div class="${uid('ils')}-fade right"></div>
    <div class="${uid('ils')}-track">
      <div class="${uid('ils')}-item">${v.logo1}</div>
      <div class="${uid('ils')}-item">${v.logo2}</div>
      <div class="${uid('ils')}-item">${v.logo3}</div>
      <div class="${uid('ils')}-item">${v.logo4}</div>
      <div class="${uid('ils')}-item">${v.logo5}</div>
      <div class="${uid('ils')}-item">${v.logo6}</div>
      <div class="${uid('ils')}-item">${v.logo7}</div>
      <div class="${uid('ils')}-item">${v.logo8}</div>
      <div class="${uid('ils')}-item">${v.logo1}</div>
      <div class="${uid('ils')}-item">${v.logo2}</div>
      <div class="${uid('ils')}-item">${v.logo3}</div>
      <div class="${uid('ils')}-item">${v.logo4}</div>
      <div class="${uid('ils')}-item">${v.logo5}</div>
      <div class="${uid('ils')}-item">${v.logo6}</div>
      <div class="${uid('ils')}-item">${v.logo7}</div>
      <div class="${uid('ils')}-item">${v.logo8}</div>
    </div>
  </div>
</div>`
  },

  // 18. Feature Carousel (cult-ui)
  {
    id: 'feature-carousel-21st',
    name: 'Feature Carousel',
    category: 'Features',
    description: 'Interactive feature carousel with image and text panels',
    thumbnail: '',
    fields: [
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Lightning Fast' },
      { id: 'feature1Desc', label: 'Feature 1 Description', type: 'textarea', defaultValue: 'Optimized for speed with instant page loads and smooth animations throughout the entire experience.' },
      { id: 'feature1Img', label: 'Feature 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Secure by Default' },
      { id: 'feature2Desc', label: 'Feature 2 Description', type: 'textarea', defaultValue: 'Enterprise-grade security with end-to-end encryption and compliance with industry standards.' },
      { id: 'feature2Img', label: 'Feature 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Scalable Infrastructure' },
      { id: 'feature3Desc', label: 'Feature 3 Description', type: 'textarea', defaultValue: 'Built to grow with your business, handling millions of requests without breaking a sweat.' },
      { id: 'feature3Img', label: 'Feature 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
    ],
    generateHtml: (v) => `<div class="${uid('fcr')}">
  <style>
    .${uid('fcr')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('fcr')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('fcr')}-container { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
    @media(max-width:900px) { .${uid('fcr')}-container { grid-template-columns:1fr; } }
    .${uid('fcr')}-content { }
    .${uid('fcr')}-tabs { display:flex; flex-direction:column; gap:0; }
    .${uid('fcr')}-tab { padding:24px; border-left:2px solid #333; cursor:pointer; transition:all 0.3s; }
    .${uid('fcr')}-tab:hover { background:rgba(255,255,255,0.02); }
    .${uid('fcr')}-tab.active { border-left-color:#fff; background:rgba(255,255,255,0.05); }
    .${uid('fcr')}-tab-title { font-size:20px; font-weight:600; color:#fff; margin-bottom:8px; }
    .${uid('fcr')}-tab-desc { font-size:14px; color:#9ca3af; line-height:1.6; display:none; }
    .${uid('fcr')}-tab.active .${uid('fcr')}-tab-desc { display:block; animation:${uid('fcr')}-fadeIn 0.3s ease; }
    @keyframes ${uid('fcr')}-fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
    .${uid('fcr')}-visual { position:relative; aspect-ratio:3/2; border-radius:16px; overflow:hidden; }
    .${uid('fcr')}-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 0.5s ease; }
    .${uid('fcr')}-img.active { opacity:1; }
  </style>
  <div class="${uid('fcr')}-container">
    <div class="${uid('fcr')}-content">
      <div class="${uid('fcr')}-tabs">
        <div class="${uid('fcr')}-tab active" onclick="document.querySelectorAll('.${uid('fcr')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');document.querySelectorAll('.${uid('fcr')}-img').forEach((img,i)=>img.classList.toggle('active',i===0));">
          <h3 class="${uid('fcr')}-tab-title">${v.feature1Title}</h3>
          <p class="${uid('fcr')}-tab-desc">${v.feature1Desc}</p>
        </div>
        <div class="${uid('fcr')}-tab" onclick="document.querySelectorAll('.${uid('fcr')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');document.querySelectorAll('.${uid('fcr')}-img').forEach((img,i)=>img.classList.toggle('active',i===1));">
          <h3 class="${uid('fcr')}-tab-title">${v.feature2Title}</h3>
          <p class="${uid('fcr')}-tab-desc">${v.feature2Desc}</p>
        </div>
        <div class="${uid('fcr')}-tab" onclick="document.querySelectorAll('.${uid('fcr')}-tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');document.querySelectorAll('.${uid('fcr')}-img').forEach((img,i)=>img.classList.toggle('active',i===2));">
          <h3 class="${uid('fcr')}-tab-title">${v.feature3Title}</h3>
          <p class="${uid('fcr')}-tab-desc">${v.feature3Desc}</p>
        </div>
      </div>
    </div>
    <div class="${uid('fcr')}-visual">
      <img class="${uid('fcr')}-img active" src="${v.feature1Img}" alt="${v.feature1Title}">
      <img class="${uid('fcr')}-img" src="${v.feature2Img}" alt="${v.feature2Title}">
      <img class="${uid('fcr')}-img" src="${v.feature3Img}" alt="${v.feature3Title}">
    </div>
  </div>
</div>`
  },

  // 19. Animated Glassy Pricing (easemize)
  {
    id: 'glassy-pricing',
    name: 'Glassy Pricing',
    category: 'Pricing',
    description: 'Glassmorphism pricing cards with animated gradients and glow effects',
    thumbnail: '',
    fields: [
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Hobby' },
      { id: 'plan1Price', label: 'Plan 1 Price', type: 'text', defaultValue: 'Free' },
      { id: 'plan1Desc', label: 'Plan 1 Description', type: 'text', defaultValue: 'Perfect for side projects' },
      { id: 'plan1Features', label: 'Plan 1 Features (comma sep)', type: 'textarea', defaultValue: '3 Projects,Basic Analytics,Community Support' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Pro' },
      { id: 'plan2Price', label: 'Plan 2 Price', type: 'text', defaultValue: '$19/mo' },
      { id: 'plan2Desc', label: 'Plan 2 Description', type: 'text', defaultValue: 'For growing businesses' },
      { id: 'plan2Features', label: 'Plan 2 Features (comma sep)', type: 'textarea', defaultValue: 'Unlimited Projects,Advanced Analytics,Priority Support,Custom Domain,API Access' },
      { id: 'plan3Name', label: 'Plan 3 Name', type: 'text', defaultValue: 'Enterprise' },
      { id: 'plan3Price', label: 'Plan 3 Price', type: 'text', defaultValue: 'Custom' },
      { id: 'plan3Desc', label: 'Plan 3 Description', type: 'text', defaultValue: 'For large organizations' },
      { id: 'plan3Features', label: 'Plan 3 Features (comma sep)', type: 'textarea', defaultValue: 'Everything in Pro,SSO & SAML,Dedicated Manager,SLA Guarantee,Custom Integrations' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#1e1e2f' },
    ],
    generateHtml: (v) => `<div class="${uid('glp')}">
  <style>
    .${uid('glp')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; position:relative; overflow:hidden; }
    .${uid('glp')}::before { content:''; position:absolute; top:-50%; left:-50%; width:200%; height:200%; background:radial-gradient(circle at 30% 50%, rgba(99,102,241,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(236,72,153,0.1) 0%, transparent 50%); animation:${uid('glp')}-float 20s ease-in-out infinite; }
    @keyframes ${uid('glp')}-float { 0%, 100% { transform:translate(0,0) rotate(0deg); } 50% { transform:translate(30px, 30px) rotate(5deg); } }
    .${uid('glp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('glp')}-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; max-width:1100px; margin:0 auto; position:relative; z-index:1; }
    @media(max-width:900px) { .${uid('glp')}-grid { grid-template-columns:1fr; max-width:400px; } }
    .${uid('glp')}-card { background:rgba(255,255,255,0.05); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:32px; transition:all 0.4s; }
    .${uid('glp')}-card:hover { transform:translateY(-8px); border-color:rgba(255,255,255,0.2); box-shadow:0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(99,102,241,0.1); }
    .${uid('glp')}-card.featured { background:linear-gradient(135deg, rgba(99,102,241,0.2), rgba(236,72,153,0.2)); border-color:rgba(99,102,241,0.3); }
    .${uid('glp')}-name { font-size:14px; font-weight:600; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:1px; margin-bottom:16px; }
    .${uid('glp')}-price { font-size:40px; font-weight:700; color:#fff; margin-bottom:8px; }
    .${uid('glp')}-desc { font-size:14px; color:rgba(255,255,255,0.5); margin-bottom:24px; }
    .${uid('glp')}-features { list-style:none; margin-bottom:32px; }
    .${uid('glp')}-features li { display:flex; align-items:center; gap:12px; padding:12px 0; color:rgba(255,255,255,0.8); font-size:14px; border-bottom:1px solid rgba(255,255,255,0.05); }
    .${uid('glp')}-features li:last-child { border-bottom:none; }
    .${uid('glp')}-features svg { width:18px; height:18px; color:#6366f1; }
    .${uid('glp')}-btn { width:100%; padding:14px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; border-radius:12px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.3s; }
    .${uid('glp')}-btn:hover { background:rgba(255,255,255,0.15); }
    .${uid('glp')}-card.featured .${uid('glp')}-btn { background:linear-gradient(135deg, #6366f1, #ec4899); border:none; }
  </style>
  <div class="${uid('glp')}-grid">
    <div class="${uid('glp')}-card">
      <div class="${uid('glp')}-name">${v.plan1Name}</div>
      <div class="${uid('glp')}-price">${v.plan1Price}</div>
      <div class="${uid('glp')}-desc">${v.plan1Desc}</div>
      <ul class="${uid('glp')}-features">
        ${v.plan1Features.split(',').map((f: string) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f.trim()}</li>`).join('')}
      </ul>
      <button class="${uid('glp')}-btn">Get Started</button>
    </div>
    <div class="${uid('glp')}-card featured">
      <div class="${uid('glp')}-name">${v.plan2Name}</div>
      <div class="${uid('glp')}-price">${v.plan2Price}</div>
      <div class="${uid('glp')}-desc">${v.plan2Desc}</div>
      <ul class="${uid('glp')}-features">
        ${v.plan2Features.split(',').map((f: string) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f.trim()}</li>`).join('')}
      </ul>
      <button class="${uid('glp')}-btn">Get Started</button>
    </div>
    <div class="${uid('glp')}-card">
      <div class="${uid('glp')}-name">${v.plan3Name}</div>
      <div class="${uid('glp')}-price">${v.plan3Price}</div>
      <div class="${uid('glp')}-desc">${v.plan3Desc}</div>
      <ul class="${uid('glp')}-features">
        ${v.plan3Features.split(',').map((f: string) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f.trim()}</li>`).join('')}
      </ul>
      <button class="${uid('glp')}-btn">Contact Sales</button>
    </div>
  </div>
</div>`
  },

  // 20. Design Testimonial (jatin-yadav05)
  {
    id: 'design-testimonial',
    name: 'Design Testimonial',
    category: 'Testimonials',
    description: 'Clean modern testimonial with side-by-side layout and rating stars',
    thumbnail: '',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'Working with this team was an absolute pleasure. They understood our vision from day one and delivered a product that exceeded all our expectations. The attention to detail and commitment to quality is unmatched.' },
      { id: 'author', label: 'Author Name', type: 'text', defaultValue: 'Jennifer Smith' },
      { id: 'role', label: 'Author Role', type: 'text', defaultValue: 'Head of Product' },
      { id: 'company', label: 'Company', type: 'text', defaultValue: 'Acme Inc.' },
      { id: 'image', label: 'Author Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face' },
      { id: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: '5' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f8fafc' },
    ],
    generateHtml: (v) => `<div class="${uid('dst')}">
  <style>
    .${uid('dst')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('dst')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('dst')}-container { max-width:1000px; margin:0 auto; display:grid; grid-template-columns:1fr 1.5fr; gap:64px; align-items:center; }
    @media(max-width:768px) { .${uid('dst')}-container { grid-template-columns:1fr; gap:40px; text-align:center; } }
    .${uid('dst')}-image { position:relative; }
    .${uid('dst')}-img { width:100%; max-width:320px; aspect-ratio:1; object-fit:cover; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.1); }
    @media(max-width:768px) { .${uid('dst')}-img { margin:0 auto; } }
    .${uid('dst')}-content { }
    .${uid('dst')}-stars { display:flex; gap:4px; margin-bottom:24px; }
    @media(max-width:768px) { .${uid('dst')}-stars { justify-content:center; } }
    .${uid('dst')}-star { width:24px; height:24px; color:#fbbf24; }
    .${uid('dst')}-star.empty { color:#e5e7eb; }
    .${uid('dst')}-quote { font-size:24px; line-height:1.6; color:#1f2937; margin-bottom:32px; font-weight:400; }
    .${uid('dst')}-author { display:flex; flex-direction:column; gap:4px; }
    @media(max-width:768px) { .${uid('dst')}-author { align-items:center; } }
    .${uid('dst')}-name { font-size:18px; font-weight:600; color:#111827; }
    .${uid('dst')}-role { font-size:14px; color:#6b7280; }
  </style>
  <div class="${uid('dst')}-container">
    <div class="${uid('dst')}-image">
      <img class="${uid('dst')}-img" src="${v.image}" alt="${v.author}">
    </div>
    <div class="${uid('dst')}-content">
      <div class="${uid('dst')}-stars">
        ${Array.from({length: 5}, (_, i) => `<svg class="${uid('dst')}-star${i < parseInt(v.rating) ? '' : ' empty'}" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
      </div>
      <blockquote class="${uid('dst')}-quote">"${v.quote}"</blockquote>
      <div class="${uid('dst')}-author">
        <div class="${uid('dst')}-name">${v.author}</div>
        <div class="${uid('dst')}-role">${v.role}, ${v.company}</div>
      </div>
    </div>
  </div>
</div>`
  },

  // ============================================
  // 21st.dev INSPIRED PROFESSIONAL SECTIONS (BATCH 2)
  // ============================================

  // 21. Minimal Hero Split
  {
    id: 'minimal-hero-split',
    name: 'Minimal Hero Split',
    category: 'Hero',
    description: 'Clean split-screen hero with text left, image right - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    fields: [
      { id: 'tagline', label: 'Tagline', type: 'text', defaultValue: 'New Collection 2024' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Redefine Your Style' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Discover our curated collection of premium essentials designed for the modern lifestyle. Quality craftsmanship meets contemporary design.' },
      { id: 'ctaText', label: 'CTA Button Text', type: 'text', defaultValue: 'Shop Collection' },
      { id: 'ctaUrl', label: 'CTA Button URL', type: 'url', defaultValue: '#' },
      { id: 'secondaryText', label: 'Secondary Link Text', type: 'text', defaultValue: 'Learn More' },
      { id: 'image', label: 'Hero Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#4b5563' },
    ],
    generateHtml: (v) => `<div class="${uid('mhs')}">
  <style>
    .${uid('mhs')} { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('mhs')} * { box-sizing:border-box; margin:0; padding:0; }
    @media(max-width:900px) { .${uid('mhs')} { grid-template-columns:1fr; min-height:auto; } }
    .${uid('mhs')}-content { display:flex; flex-direction:column; justify-content:center; padding:80px 64px; }
    @media(max-width:900px) { .${uid('mhs')}-content { padding:60px 24px; text-align:center; } }
    .${uid('mhs')}-tagline { font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${v.textColor}; margin-bottom:16px; }
    .${uid('mhs')}-headline { font-size:56px; font-weight:700; line-height:1.1; color:${v.headlineColor}; margin-bottom:24px; letter-spacing:-0.02em; }
    @media(max-width:900px) { .${uid('mhs')}-headline { font-size:40px; } }
    .${uid('mhs')}-desc { font-size:18px; line-height:1.7; color:${v.textColor}; margin-bottom:40px; max-width:480px; }
    @media(max-width:900px) { .${uid('mhs')}-desc { margin:0 auto 40px; } }
    .${uid('mhs')}-actions { display:flex; gap:16px; align-items:center; }
    @media(max-width:900px) { .${uid('mhs')}-actions { justify-content:center; } }
    .${uid('mhs')}-cta { display:inline-flex; padding:16px 32px; background:${v.headlineColor}; color:#fff; font-size:14px; font-weight:600; text-decoration:none; border-radius:8px; transition:all 0.2s; }
    .${uid('mhs')}-cta:hover { background:#374151; transform:translateY(-2px); }
    .${uid('mhs')}-secondary { font-size:14px; font-weight:500; color:${v.headlineColor}; text-decoration:none; display:flex; align-items:center; gap:8px; transition:gap 0.2s; }
    .${uid('mhs')}-secondary:hover { gap:12px; }
    .${uid('mhs')}-secondary svg { width:16px; height:16px; }
    .${uid('mhs')}-visual { position:relative; overflow:hidden; }
    @media(max-width:900px) { .${uid('mhs')}-visual { height:400px; } }
    .${uid('mhs')}-img { width:100%; height:100%; object-fit:cover; }
  </style>
  <div class="${uid('mhs')}-content">
    <span class="${uid('mhs')}-tagline">${v.tagline}</span>
    <h1 class="${uid('mhs')}-headline">${v.headline}</h1>
    <p class="${uid('mhs')}-desc">${v.description}</p>
    <div class="${uid('mhs')}-actions">
      <a href="${v.ctaUrl}" class="${uid('mhs')}-cta">${v.ctaText}</a>
      <a href="#" class="${uid('mhs')}-secondary">${v.secondaryText} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
    </div>
  </div>
  <div class="${uid('mhs')}-visual">
    <img class="${uid('mhs')}-img" src="${v.image}" alt="Hero">
  </div>
</div>`
  },

  // 22. Stats Banner
  {
    id: 'stats-banner-animated',
    name: 'Stats Banner Animated',
    category: 'Trust',
    description: 'Animated statistics display with counting numbers - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    fields: [
      { id: 'stat1Value', label: 'Stat 1 Value', type: 'text', defaultValue: '50K+' },
      { id: 'stat1Label', label: 'Stat 1 Label', type: 'text', defaultValue: 'Happy Customers' },
      { id: 'stat2Value', label: 'Stat 2 Value', type: 'text', defaultValue: '4.9' },
      { id: 'stat2Label', label: 'Stat 2 Label', type: 'text', defaultValue: 'Average Rating' },
      { id: 'stat3Value', label: 'Stat 3 Value', type: 'text', defaultValue: '100+' },
      { id: 'stat3Label', label: 'Stat 3 Label', type: 'text', defaultValue: 'Countries Shipped' },
      { id: 'stat4Value', label: 'Stat 4 Value', type: 'text', defaultValue: '24/7' },
      { id: 'stat4Label', label: 'Stat 4 Label', type: 'text', defaultValue: 'Customer Support' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('sba')}">
  <style>
    .${uid('sba')} { padding:64px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('sba')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('sba')}-container { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:48px; }
    @media(max-width:900px) { .${uid('sba')}-container { grid-template-columns:repeat(2,1fr); gap:32px; } }
    @media(max-width:500px) { .${uid('sba')}-container { grid-template-columns:1fr; gap:24px; text-align:center; } }
    .${uid('sba')}-stat { }
    .${uid('sba')}-value { font-size:48px; font-weight:700; color:${v.textColor}; line-height:1; margin-bottom:8px; letter-spacing:-0.02em; }
    @media(max-width:900px) { .${uid('sba')}-value { font-size:36px; } }
    .${uid('sba')}-label { font-size:14px; color:${v.textColor}; opacity:0.7; font-weight:500; }
    .${uid('sba')}-divider { width:1px; background:rgba(255,255,255,0.2); }
    @media(max-width:900px) { .${uid('sba')}-divider { display:none; } }
  </style>
  <div class="${uid('sba')}-container">
    <div class="${uid('sba')}-stat">
      <div class="${uid('sba')}-value">${v.stat1Value}</div>
      <div class="${uid('sba')}-label">${v.stat1Label}</div>
    </div>
    <div class="${uid('sba')}-stat">
      <div class="${uid('sba')}-value">${v.stat2Value}</div>
      <div class="${uid('sba')}-label">${v.stat2Label}</div>
    </div>
    <div class="${uid('sba')}-stat">
      <div class="${uid('sba')}-value">${v.stat3Value}</div>
      <div class="${uid('sba')}-label">${v.stat3Label}</div>
    </div>
    <div class="${uid('sba')}-stat">
      <div class="${uid('sba')}-value">${v.stat4Value}</div>
      <div class="${uid('sba')}-label">${v.stat4Label}</div>
    </div>
  </div>
</div>`
  },

  // 23. Feature Grid Modern
  {
    id: 'feature-grid-modern',
    name: 'Feature Grid Modern',
    category: 'Features',
    description: 'Clean 2x3 feature grid with icons and descriptions - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'subhead', label: 'Section Subhead', type: 'textarea', defaultValue: 'We combine quality, service, and value to deliver an exceptional shopping experience.' },
      { id: 'feat1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'feat1Desc', label: 'Feature 1 Description', type: 'text', defaultValue: 'Free standard shipping on all orders over $50' },
      { id: 'feat2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Easy Returns' },
      { id: 'feat2Desc', label: 'Feature 2 Description', type: 'text', defaultValue: '30-day hassle-free return policy' },
      { id: 'feat3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Secure Payment' },
      { id: 'feat3Desc', label: 'Feature 3 Description', type: 'text', defaultValue: 'Your data is protected with SSL encryption' },
      { id: 'feat4Title', label: 'Feature 4 Title', type: 'text', defaultValue: '24/7 Support' },
      { id: 'feat4Desc', label: 'Feature 4 Description', type: 'text', defaultValue: 'Round-the-clock customer assistance' },
      { id: 'feat5Title', label: 'Feature 5 Title', type: 'text', defaultValue: 'Quality Guarantee' },
      { id: 'feat5Desc', label: 'Feature 5 Description', type: 'text', defaultValue: 'Premium materials and craftsmanship' },
      { id: 'feat6Title', label: 'Feature 6 Title', type: 'text', defaultValue: 'Fast Delivery' },
      { id: 'feat6Desc', label: 'Feature 6 Description', type: 'text', defaultValue: 'Express shipping available worldwide' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('fgm')}">
  <style>
    .${uid('fgm')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('fgm')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('fgm')}-container { max-width:1200px; margin:0 auto; }
    .${uid('fgm')}-header { text-align:center; margin-bottom:64px; }
    .${uid('fgm')}-headline { font-size:40px; font-weight:700; color:${v.headlineColor}; margin-bottom:16px; letter-spacing:-0.02em; }
    .${uid('fgm')}-subhead { font-size:18px; color:${v.textColor}; max-width:600px; margin:0 auto; line-height:1.6; }
    .${uid('fgm')}-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; }
    @media(max-width:900px) { .${uid('fgm')}-grid { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:600px) { .${uid('fgm')}-grid { grid-template-columns:1fr; } }
    .${uid('fgm')}-card { padding:32px; border-radius:16px; background:#f9fafb; transition:all 0.3s; }
    .${uid('fgm')}-card:hover { background:#f3f4f6; transform:translateY(-4px); }
    .${uid('fgm')}-icon { width:48px; height:48px; background:${v.headlineColor}; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
    .${uid('fgm')}-icon svg { width:24px; height:24px; color:#fff; }
    .${uid('fgm')}-title { font-size:18px; font-weight:600; color:${v.headlineColor}; margin-bottom:8px; }
    .${uid('fgm')}-desc { font-size:14px; color:${v.textColor}; line-height:1.6; }
  </style>
  <div class="${uid('fgm')}-container">
    <div class="${uid('fgm')}-header">
      <h2 class="${uid('fgm')}-headline">${v.headline}</h2>
      <p class="${uid('fgm')}-subhead">${v.subhead}</p>
    </div>
    <div class="${uid('fgm')}-grid">
      <div class="${uid('fgm')}-card">
        <div class="${uid('fgm')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg></div>
        <h3 class="${uid('fgm')}-title">${v.feat1Title}</h3>
        <p class="${uid('fgm')}-desc">${v.feat1Desc}</p>
      </div>
      <div class="${uid('fgm')}-card">
        <div class="${uid('fgm')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"/></svg></div>
        <h3 class="${uid('fgm')}-title">${v.feat2Title}</h3>
        <p class="${uid('fgm')}-desc">${v.feat2Desc}</p>
      </div>
      <div class="${uid('fgm')}-card">
        <div class="${uid('fgm')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg></div>
        <h3 class="${uid('fgm')}-title">${v.feat3Title}</h3>
        <p class="${uid('fgm')}-desc">${v.feat3Desc}</p>
      </div>
      <div class="${uid('fgm')}-card">
        <div class="${uid('fgm')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg></div>
        <h3 class="${uid('fgm')}-title">${v.feat4Title}</h3>
        <p class="${uid('fgm')}-desc">${v.feat4Desc}</p>
      </div>
      <div class="${uid('fgm')}-card">
        <div class="${uid('fgm')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></div>
        <h3 class="${uid('fgm')}-title">${v.feat5Title}</h3>
        <p class="${uid('fgm')}-desc">${v.feat5Desc}</p>
      </div>
      <div class="${uid('fgm')}-card">
        <div class="${uid('fgm')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
        <h3 class="${uid('fgm')}-title">${v.feat6Title}</h3>
        <p class="${uid('fgm')}-desc">${v.feat6Desc}</p>
      </div>
    </div>
  </div>
</div>`
  },

  // 24. Newsletter Elegant
  {
    id: 'newsletter-elegant',
    name: 'Newsletter Elegant',
    category: 'CTA',
    description: 'Clean email signup with social proof - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Stay in the Loop' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration delivered to your inbox.' },
      { id: 'placeholder', label: 'Input Placeholder', type: 'text', defaultValue: 'Enter your email' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Subscribe' },
      { id: 'socialProof', label: 'Social Proof Text', type: 'text', defaultValue: 'Join 25,000+ subscribers' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f3f4f6' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('nle')}">
  <style>
    .${uid('nle')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('nle')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('nle')}-container { max-width:560px; margin:0 auto; text-align:center; }
    .${uid('nle')}-headline { font-size:36px; font-weight:700; color:${v.headlineColor}; margin-bottom:16px; letter-spacing:-0.02em; }
    .${uid('nle')}-desc { font-size:16px; color:${v.textColor}; margin-bottom:32px; line-height:1.6; }
    .${uid('nle')}-form { display:flex; gap:12px; margin-bottom:24px; }
    @media(max-width:500px) { .${uid('nle')}-form { flex-direction:column; } }
    .${uid('nle')}-input { flex:1; padding:16px 20px; font-size:16px; border:1px solid #e5e7eb; border-radius:8px; outline:none; transition:border-color 0.2s; }
    .${uid('nle')}-input:focus { border-color:${v.headlineColor}; }
    .${uid('nle')}-btn { padding:16px 32px; background:${v.headlineColor}; color:#fff; font-size:14px; font-weight:600; border:none; border-radius:8px; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
    .${uid('nle')}-btn:hover { opacity:0.9; }
    .${uid('nle')}-social { display:flex; align-items:center; justify-content:center; gap:8px; font-size:14px; color:${v.textColor}; }
    .${uid('nle')}-avatars { display:flex; }
    .${uid('nle')}-avatar { width:28px; height:28px; border-radius:50%; border:2px solid ${v.bgColor}; margin-left:-8px; object-fit:cover; }
    .${uid('nle')}-avatar:first-child { margin-left:0; }
  </style>
  <div class="${uid('nle')}-container">
    <h2 class="${uid('nle')}-headline">${v.headline}</h2>
    <p class="${uid('nle')}-desc">${v.description}</p>
    <form class="${uid('nle')}-form" onsubmit="event.preventDefault()">
      <input type="email" class="${uid('nle')}-input" placeholder="${v.placeholder}" required>
      <button type="submit" class="${uid('nle')}-btn">${v.buttonText}</button>
    </form>
    <div class="${uid('nle')}-social">
      <div class="${uid('nle')}-avatars">
        <img class="${uid('nle')}-avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="">
        <img class="${uid('nle')}-avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="">
        <img class="${uid('nle')}-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="">
      </div>
      <span>${v.socialProof}</span>
    </div>
  </div>
</div>`
  },

  // 25. Process Steps
  {
    id: 'process-steps-horizontal',
    name: 'Process Steps Horizontal',
    category: 'Features',
    description: 'Horizontal timeline for purchase/delivery process - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'How It Works' },
      { id: 'step1Title', label: 'Step 1 Title', type: 'text', defaultValue: 'Browse & Select' },
      { id: 'step1Desc', label: 'Step 1 Description', type: 'text', defaultValue: 'Explore our curated collection and find your perfect items' },
      { id: 'step2Title', label: 'Step 2 Title', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'step2Desc', label: 'Step 2 Description', type: 'text', defaultValue: 'Complete your purchase with our encrypted payment system' },
      { id: 'step3Title', label: 'Step 3 Title', type: 'text', defaultValue: 'Fast Shipping' },
      { id: 'step3Desc', label: 'Step 3 Description', type: 'text', defaultValue: 'Your order is carefully packed and shipped to your door' },
      { id: 'step4Title', label: 'Step 4 Title', type: 'text', defaultValue: 'Enjoy!' },
      { id: 'step4Desc', label: 'Step 4 Description', type: 'text', defaultValue: 'Unbox your new favorites and start enjoying them' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('psh')}">
  <style>
    .${uid('psh')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('psh')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('psh')}-container { max-width:1200px; margin:0 auto; }
    .${uid('psh')}-headline { font-size:40px; font-weight:700; color:${v.headlineColor}; text-align:center; margin-bottom:64px; letter-spacing:-0.02em; }
    .${uid('psh')}-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; position:relative; }
    @media(max-width:900px) { .${uid('psh')}-steps { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:500px) { .${uid('psh')}-steps { grid-template-columns:1fr; } }
    .${uid('psh')}-step { text-align:center; position:relative; }
    .${uid('psh')}-num { width:56px; height:56px; background:${v.headlineColor}; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:700; margin:0 auto 24px; position:relative; z-index:1; }
    .${uid('psh')}-title { font-size:18px; font-weight:600; color:${v.headlineColor}; margin-bottom:12px; }
    .${uid('psh')}-desc { font-size:14px; color:${v.textColor}; line-height:1.6; max-width:220px; margin:0 auto; }
    .${uid('psh')}-line { position:absolute; top:28px; left:calc(50% + 28px); right:calc(-50% + 28px); height:2px; background:#e5e7eb; }
    @media(max-width:900px) { .${uid('psh')}-line { display:none; } }
    .${uid('psh')}-step:last-child .${uid('psh')}-line { display:none; }
  </style>
  <div class="${uid('psh')}-container">
    <h2 class="${uid('psh')}-headline">${v.headline}</h2>
    <div class="${uid('psh')}-steps">
      <div class="${uid('psh')}-step">
        <div class="${uid('psh')}-num">1</div>
        <div class="${uid('psh')}-line"></div>
        <h3 class="${uid('psh')}-title">${v.step1Title}</h3>
        <p class="${uid('psh')}-desc">${v.step1Desc}</p>
      </div>
      <div class="${uid('psh')}-step">
        <div class="${uid('psh')}-num">2</div>
        <div class="${uid('psh')}-line"></div>
        <h3 class="${uid('psh')}-title">${v.step2Title}</h3>
        <p class="${uid('psh')}-desc">${v.step2Desc}</p>
      </div>
      <div class="${uid('psh')}-step">
        <div class="${uid('psh')}-num">3</div>
        <div class="${uid('psh')}-line"></div>
        <h3 class="${uid('psh')}-title">${v.step3Title}</h3>
        <p class="${uid('psh')}-desc">${v.step3Desc}</p>
      </div>
      <div class="${uid('psh')}-step">
        <div class="${uid('psh')}-num">4</div>
        <h3 class="${uid('psh')}-title">${v.step4Title}</h3>
        <p class="${uid('psh')}-desc">${v.step4Desc}</p>
      </div>
    </div>
  </div>
</div>`
  },

  // 26. Comparison Table
  {
    id: 'comparison-table-modern',
    name: 'Comparison Table Modern',
    category: 'Product',
    description: 'Side-by-side product/plan comparison - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Compare Plans' },
      { id: 'plan1Name', label: 'Plan 1 Name', type: 'text', defaultValue: 'Basic' },
      { id: 'plan1Price', label: 'Plan 1 Price', type: 'text', defaultValue: '$9' },
      { id: 'plan2Name', label: 'Plan 2 Name', type: 'text', defaultValue: 'Pro' },
      { id: 'plan2Price', label: 'Plan 2 Price', type: 'text', defaultValue: '$29' },
      { id: 'plan2Badge', label: 'Plan 2 Badge', type: 'text', defaultValue: 'Most Popular' },
      { id: 'plan3Name', label: 'Plan 3 Name', type: 'text', defaultValue: 'Enterprise' },
      { id: 'plan3Price', label: 'Plan 3 Price', type: 'text', defaultValue: '$99' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Products' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Storage' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Support' },
      { id: 'feature4', label: 'Feature 4', type: 'text', defaultValue: 'Analytics' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('ctm')}">
  <style>
    .${uid('ctm')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('ctm')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('ctm')}-container { max-width:900px; margin:0 auto; }
    .${uid('ctm')}-headline { font-size:40px; font-weight:700; color:${v.headlineColor}; text-align:center; margin-bottom:48px; letter-spacing:-0.02em; }
    .${uid('ctm')}-table { width:100%; border-collapse:collapse; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.06); }
    .${uid('ctm')}-table th, .${uid('ctm')}-table td { padding:20px 24px; text-align:center; border-bottom:1px solid #f3f4f6; }
    .${uid('ctm')}-table th:first-child, .${uid('ctm')}-table td:first-child { text-align:left; }
    .${uid('ctm')}-table thead th { background:${v.headlineColor}; color:#fff; font-weight:600; font-size:14px; }
    .${uid('ctm')}-table thead th:first-child { background:${v.headlineColor}; }
    .${uid('ctm')}-popular { background:#f0fdf4 !important; }
    .${uid('ctm')}-popular-head { background:#059669 !important; }
    .${uid('ctm')}-price { font-size:28px; font-weight:700; color:${v.headlineColor}; }
    .${uid('ctm')}-price span { font-size:14px; font-weight:400; color:${v.textColor}; }
    .${uid('ctm')}-badge { display:inline-block; padding:4px 8px; background:#059669; color:#fff; font-size:10px; font-weight:600; border-radius:4px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; }
    .${uid('ctm')}-feat { color:${v.textColor}; font-size:14px; }
    .${uid('ctm')}-check { width:20px; height:20px; color:#059669; }
    .${uid('ctm')}-x { width:20px; height:20px; color:#d1d5db; }
    @media(max-width:700px) {
      .${uid('ctm')}-table { font-size:12px; }
      .${uid('ctm')}-table th, .${uid('ctm')}-table td { padding:12px 8px; }
      .${uid('ctm')}-price { font-size:20px; }
    }
  </style>
  <div class="${uid('ctm')}-container">
    <h2 class="${uid('ctm')}-headline">${v.headline}</h2>
    <table class="${uid('ctm')}-table">
      <thead>
        <tr>
          <th></th>
          <th>${v.plan1Name}</th>
          <th class="${uid('ctm')}-popular-head"><div class="${uid('ctm')}-badge">${v.plan2Badge}</div><br>${v.plan2Name}</th>
          <th>${v.plan3Name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="${uid('ctm')}-feat">Price</td>
          <td><div class="${uid('ctm')}-price">${v.plan1Price}<span>/mo</span></div></td>
          <td class="${uid('ctm')}-popular"><div class="${uid('ctm')}-price">${v.plan2Price}<span>/mo</span></div></td>
          <td><div class="${uid('ctm')}-price">${v.plan3Price}<span>/mo</span></div></td>
        </tr>
        <tr>
          <td class="${uid('ctm')}-feat">${v.feature1}</td>
          <td>10</td>
          <td class="${uid('ctm')}-popular">100</td>
          <td>Unlimited</td>
        </tr>
        <tr>
          <td class="${uid('ctm')}-feat">${v.feature2}</td>
          <td>5 GB</td>
          <td class="${uid('ctm')}-popular">50 GB</td>
          <td>500 GB</td>
        </tr>
        <tr>
          <td class="${uid('ctm')}-feat">${v.feature3}</td>
          <td>Email</td>
          <td class="${uid('ctm')}-popular">Priority</td>
          <td>Dedicated</td>
        </tr>
        <tr>
          <td class="${uid('ctm')}-feat">${v.feature4}</td>
          <td><svg class="${uid('ctm')}-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></td>
          <td class="${uid('ctm')}-popular"><svg class="${uid('ctm')}-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></td>
          <td><svg class="${uid('ctm')}-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
  },

  // 27. Team Grid Clean
  {
    id: 'team-grid-clean',
    name: 'Team Grid Clean',
    category: 'Story',
    description: 'Clean team member showcase grid - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Meet Our Team' },
      { id: 'subhead', label: 'Subhead', type: 'textarea', defaultValue: 'The passionate people behind our brand, dedicated to bringing you the best products.' },
      { id: 'member1Name', label: 'Member 1 Name', type: 'text', defaultValue: 'Alex Chen' },
      { id: 'member1Role', label: 'Member 1 Role', type: 'text', defaultValue: 'Founder & CEO' },
      { id: 'member1Image', label: 'Member 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
      { id: 'member2Name', label: 'Member 2 Name', type: 'text', defaultValue: 'Sarah Kim' },
      { id: 'member2Role', label: 'Member 2 Role', type: 'text', defaultValue: 'Creative Director' },
      { id: 'member2Image', label: 'Member 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
      { id: 'member3Name', label: 'Member 3 Name', type: 'text', defaultValue: 'Michael Ross' },
      { id: 'member3Role', label: 'Member 3 Role', type: 'text', defaultValue: 'Head of Product' },
      { id: 'member3Image', label: 'Member 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
      { id: 'member4Name', label: 'Member 4 Name', type: 'text', defaultValue: 'Emma Wilson' },
      { id: 'member4Role', label: 'Member 4 Role', type: 'text', defaultValue: 'Marketing Lead' },
      { id: 'member4Image', label: 'Member 4 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('tgc')}">
  <style>
    .${uid('tgc')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('tgc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('tgc')}-container { max-width:1100px; margin:0 auto; }
    .${uid('tgc')}-header { text-align:center; margin-bottom:64px; }
    .${uid('tgc')}-headline { font-size:40px; font-weight:700; color:${v.headlineColor}; margin-bottom:16px; letter-spacing:-0.02em; }
    .${uid('tgc')}-subhead { font-size:18px; color:${v.textColor}; max-width:500px; margin:0 auto; line-height:1.6; }
    .${uid('tgc')}-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; }
    @media(max-width:900px) { .${uid('tgc')}-grid { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:500px) { .${uid('tgc')}-grid { grid-template-columns:1fr; max-width:280px; margin:0 auto; } }
    .${uid('tgc')}-member { text-align:center; }
    .${uid('tgc')}-img { width:100%; aspect-ratio:1; object-fit:cover; border-radius:16px; margin-bottom:20px; filter:grayscale(100%); transition:all 0.3s; }
    .${uid('tgc')}-member:hover .${uid('tgc')}-img { filter:grayscale(0%); transform:scale(1.02); }
    .${uid('tgc')}-name { font-size:18px; font-weight:600; color:${v.headlineColor}; margin-bottom:4px; }
    .${uid('tgc')}-role { font-size:14px; color:${v.textColor}; }
  </style>
  <div class="${uid('tgc')}-container">
    <div class="${uid('tgc')}-header">
      <h2 class="${uid('tgc')}-headline">${v.headline}</h2>
      <p class="${uid('tgc')}-subhead">${v.subhead}</p>
    </div>
    <div class="${uid('tgc')}-grid">
      <div class="${uid('tgc')}-member">
        <img class="${uid('tgc')}-img" src="${v.member1Image}" alt="${v.member1Name}">
        <h3 class="${uid('tgc')}-name">${v.member1Name}</h3>
        <p class="${uid('tgc')}-role">${v.member1Role}</p>
      </div>
      <div class="${uid('tgc')}-member">
        <img class="${uid('tgc')}-img" src="${v.member2Image}" alt="${v.member2Name}">
        <h3 class="${uid('tgc')}-name">${v.member2Name}</h3>
        <p class="${uid('tgc')}-role">${v.member2Role}</p>
      </div>
      <div class="${uid('tgc')}-member">
        <img class="${uid('tgc')}-img" src="${v.member3Image}" alt="${v.member3Name}">
        <h3 class="${uid('tgc')}-name">${v.member3Name}</h3>
        <p class="${uid('tgc')}-role">${v.member3Role}</p>
      </div>
      <div class="${uid('tgc')}-member">
        <img class="${uid('tgc')}-img" src="${v.member4Image}" alt="${v.member4Name}">
        <h3 class="${uid('tgc')}-name">${v.member4Name}</h3>
        <p class="${uid('tgc')}-role">${v.member4Role}</p>
      </div>
    </div>
  </div>
</div>`
  },

  // 28. FAQ Minimal Accordion
  {
    id: 'faq-minimal-accordion',
    name: 'FAQ Minimal Accordion',
    category: 'FAQ',
    description: 'Elegant accordion-style FAQ section - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Frequently Asked Questions' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'What is your return policy?' },
      { id: 'a1', label: 'Answer 1', type: 'textarea', defaultValue: 'We offer a 30-day hassle-free return policy. If you\'re not completely satisfied with your purchase, you can return it for a full refund or exchange. Items must be in original condition with tags attached.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'How long does shipping take?' },
      { id: 'a2', label: 'Answer 2', type: 'textarea', defaultValue: 'Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. International orders may take 10-14 business days.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'Do you offer international shipping?' },
      { id: 'a3', label: 'Answer 3', type: 'textarea', defaultValue: 'Yes! We ship to over 100 countries worldwide. Shipping costs and delivery times vary by location. You can see the exact shipping cost at checkout before completing your purchase.' },
      { id: 'q4', label: 'Question 4', type: 'text', defaultValue: 'How can I track my order?' },
      { id: 'a4', label: 'Answer 4', type: 'textarea', defaultValue: 'Once your order ships, you\'ll receive an email with a tracking number and link. You can also track your order by logging into your account and viewing your order history.' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('fma')}">
  <style>
    .${uid('fma')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('fma')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('fma')}-container { max-width:720px; margin:0 auto; }
    .${uid('fma')}-headline { font-size:40px; font-weight:700; color:${v.headlineColor}; text-align:center; margin-bottom:48px; letter-spacing:-0.02em; }
    .${uid('fma')}-item { border-bottom:1px solid #e5e7eb; }
    .${uid('fma')}-question { width:100%; display:flex; justify-content:space-between; align-items:center; padding:24px 0; background:none; border:none; cursor:pointer; text-align:left; }
    .${uid('fma')}-question:hover .${uid('fma')}-q { color:${v.headlineColor}; }
    .${uid('fma')}-q { font-size:16px; font-weight:500; color:${v.textColor}; transition:color 0.2s; flex:1; padding-right:16px; }
    .${uid('fma')}-icon { width:24px; height:24px; color:#9ca3af; transition:transform 0.3s; flex-shrink:0; }
    .${uid('fma')}-item.open .${uid('fma')}-icon { transform:rotate(45deg); }
    .${uid('fma')}-answer { max-height:0; overflow:hidden; transition:max-height 0.3s ease-out; }
    .${uid('fma')}-item.open .${uid('fma')}-answer { max-height:500px; }
    .${uid('fma')}-a { padding:0 0 24px; font-size:15px; color:${v.textColor}; line-height:1.7; }
  </style>
  <div class="${uid('fma')}-container">
    <h2 class="${uid('fma')}-headline">${v.headline}</h2>
    <div class="${uid('fma')}-list">
      <div class="${uid('fma')}-item">
        <button class="${uid('fma')}-question" onclick="this.parentElement.classList.toggle('open')">
          <span class="${uid('fma')}-q">${v.q1}</span>
          <svg class="${uid('fma')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <div class="${uid('fma')}-answer"><p class="${uid('fma')}-a">${v.a1}</p></div>
      </div>
      <div class="${uid('fma')}-item">
        <button class="${uid('fma')}-question" onclick="this.parentElement.classList.toggle('open')">
          <span class="${uid('fma')}-q">${v.q2}</span>
          <svg class="${uid('fma')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <div class="${uid('fma')}-answer"><p class="${uid('fma')}-a">${v.a2}</p></div>
      </div>
      <div class="${uid('fma')}-item">
        <button class="${uid('fma')}-question" onclick="this.parentElement.classList.toggle('open')">
          <span class="${uid('fma')}-q">${v.q3}</span>
          <svg class="${uid('fma')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <div class="${uid('fma')}-answer"><p class="${uid('fma')}-a">${v.a3}</p></div>
      </div>
      <div class="${uid('fma')}-item">
        <button class="${uid('fma')}-question" onclick="this.parentElement.classList.toggle('open')">
          <span class="${uid('fma')}-q">${v.q4}</span>
          <svg class="${uid('fma')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <div class="${uid('fma')}-answer"><p class="${uid('fma')}-a">${v.a4}</p></div>
      </div>
    </div>
  </div>
</div>`
  },

  // 29. Logo Cloud Grid
  {
    id: 'logo-cloud-grid',
    name: 'Logo Cloud Grid',
    category: 'Trust',
    description: 'Partner/featured-in logos in clean grid - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Trusted by Industry Leaders' },
      { id: 'logo1', label: 'Logo 1 Text', type: 'text', defaultValue: 'Acme Inc' },
      { id: 'logo2', label: 'Logo 2 Text', type: 'text', defaultValue: 'Globex' },
      { id: 'logo3', label: 'Logo 3 Text', type: 'text', defaultValue: 'Soylent' },
      { id: 'logo4', label: 'Logo 4 Text', type: 'text', defaultValue: 'Initech' },
      { id: 'logo5', label: 'Logo 5 Text', type: 'text', defaultValue: 'Hooli' },
      { id: 'logo6', label: 'Logo 6 Text', type: 'text', defaultValue: 'Massive' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#6b7280' },
      { id: 'textColor', label: 'Logo Text Color', type: 'color', defaultValue: '#9ca3af' },
    ],
    generateHtml: (v) => `<div class="${uid('lcg')}">
  <style>
    .${uid('lcg')} { padding:64px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('lcg')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('lcg')}-container { max-width:1000px; margin:0 auto; }
    .${uid('lcg')}-headline { font-size:14px; font-weight:500; color:${v.headlineColor}; text-align:center; margin-bottom:32px; text-transform:uppercase; letter-spacing:0.05em; }
    .${uid('lcg')}-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:32px; align-items:center; }
    @media(max-width:900px) { .${uid('lcg')}-grid { grid-template-columns:repeat(3,1fr); } }
    @media(max-width:500px) { .${uid('lcg')}-grid { grid-template-columns:repeat(2,1fr); } }
    .${uid('lcg')}-logo { text-align:center; font-size:20px; font-weight:700; color:${v.textColor}; transition:color 0.2s; cursor:default; }
    .${uid('lcg')}-logo:hover { color:${v.headlineColor}; }
  </style>
  <div class="${uid('lcg')}-container">
    <p class="${uid('lcg')}-headline">${v.headline}</p>
    <div class="${uid('lcg')}-grid">
      <div class="${uid('lcg')}-logo">${v.logo1}</div>
      <div class="${uid('lcg')}-logo">${v.logo2}</div>
      <div class="${uid('lcg')}-logo">${v.logo3}</div>
      <div class="${uid('lcg')}-logo">${v.logo4}</div>
      <div class="${uid('lcg')}-logo">${v.logo5}</div>
      <div class="${uid('lcg')}-logo">${v.logo6}</div>
    </div>
  </div>
</div>`
  },

  // 30. Value Props Banner
  {
    id: 'value-props-banner',
    name: 'Value Props Banner',
    category: 'Trust',
    description: 'Horizontal strip of value propositions - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    fields: [
      { id: 'prop1Icon', label: 'Prop 1 Icon (emoji)', type: 'text', defaultValue: '🚚' },
      { id: 'prop1Text', label: 'Prop 1 Text', type: 'text', defaultValue: 'Free Shipping Over $50' },
      { id: 'prop2Icon', label: 'Prop 2 Icon (emoji)', type: 'text', defaultValue: '🔄' },
      { id: 'prop2Text', label: 'Prop 2 Text', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'prop3Icon', label: 'Prop 3 Icon (emoji)', type: 'text', defaultValue: '🔒' },
      { id: 'prop3Text', label: 'Prop 3 Text', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'prop4Icon', label: 'Prop 4 Icon (emoji)', type: 'text', defaultValue: '💬' },
      { id: 'prop4Text', label: 'Prop 4 Text', type: 'text', defaultValue: '24/7 Support' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('vpb')}">
  <style>
    .${uid('vpb')} { padding:20px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('vpb')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('vpb')}-container { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
    @media(max-width:700px) { .${uid('vpb')}-container { justify-content:center; } }
    .${uid('vpb')}-prop { display:flex; align-items:center; gap:10px; }
    .${uid('vpb')}-icon { font-size:18px; }
    .${uid('vpb')}-text { font-size:13px; font-weight:500; color:${v.textColor}; }
    .${uid('vpb')}-divider { width:1px; height:24px; background:rgba(255,255,255,0.2); }
    @media(max-width:700px) { .${uid('vpb')}-divider { display:none; } }
  </style>
  <div class="${uid('vpb')}-container">
    <div class="${uid('vpb')}-prop">
      <span class="${uid('vpb')}-icon">${v.prop1Icon}</span>
      <span class="${uid('vpb')}-text">${v.prop1Text}</span>
    </div>
    <div class="${uid('vpb')}-divider"></div>
    <div class="${uid('vpb')}-prop">
      <span class="${uid('vpb')}-icon">${v.prop2Icon}</span>
      <span class="${uid('vpb')}-text">${v.prop2Text}</span>
    </div>
    <div class="${uid('vpb')}-divider"></div>
    <div class="${uid('vpb')}-prop">
      <span class="${uid('vpb')}-icon">${v.prop3Icon}</span>
      <span class="${uid('vpb')}-text">${v.prop3Text}</span>
    </div>
    <div class="${uid('vpb')}-divider"></div>
    <div class="${uid('vpb')}-prop">
      <span class="${uid('vpb')}-icon">${v.prop4Icon}</span>
      <span class="${uid('vpb')}-text">${v.prop4Text}</span>
    </div>
  </div>
</div>`
  },

  // 31. Product Spotlight
  {
    id: 'product-spotlight-large',
    name: 'Product Spotlight Large',
    category: 'Product',
    description: 'Large product image with feature callouts - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    fields: [
      { id: 'tagline', label: 'Tagline', type: 'text', defaultValue: 'Featured Product' },
      { id: 'productName', label: 'Product Name', type: 'text', defaultValue: 'Premium Wireless Headphones' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Experience crystal-clear audio with our flagship wireless headphones. 40-hour battery life, active noise cancellation, and premium comfort.' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: '$299' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: '40hr Battery' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'ANC' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Hi-Fi Audio' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('psl')}">
  <style>
    .${uid('psl')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('psl')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('psl')}-container { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
    @media(max-width:900px) { .${uid('psl')}-container { grid-template-columns:1fr; gap:48px; } }
    .${uid('psl')}-visual { position:relative; }
    .${uid('psl')}-img { width:100%; max-width:500px; aspect-ratio:1; object-fit:cover; border-radius:24px; margin:0 auto; display:block; }
    .${uid('psl')}-content { }
    @media(max-width:900px) { .${uid('psl')}-content { text-align:center; } }
    .${uid('psl')}-tagline { font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${v.textColor}; margin-bottom:12px; }
    .${uid('psl')}-name { font-size:48px; font-weight:700; color:${v.headlineColor}; margin-bottom:20px; line-height:1.1; letter-spacing:-0.02em; }
    @media(max-width:900px) { .${uid('psl')}-name { font-size:36px; } }
    .${uid('psl')}-desc { font-size:18px; color:${v.textColor}; line-height:1.7; margin-bottom:24px; }
    .${uid('psl')}-features { display:flex; gap:24px; margin-bottom:32px; }
    @media(max-width:900px) { .${uid('psl')}-features { justify-content:center; } }
    .${uid('psl')}-feat { padding:8px 16px; background:#fff; border-radius:8px; font-size:13px; font-weight:500; color:${v.headlineColor}; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
    .${uid('psl')}-price { font-size:36px; font-weight:700; color:${v.headlineColor}; margin-bottom:24px; }
    .${uid('psl')}-cta { display:inline-flex; padding:16px 40px; background:${v.headlineColor}; color:#fff; font-size:14px; font-weight:600; text-decoration:none; border-radius:8px; transition:all 0.2s; }
    .${uid('psl')}-cta:hover { background:#374151; transform:translateY(-2px); }
  </style>
  <div class="${uid('psl')}-container">
    <div class="${uid('psl')}-visual">
      <img class="${uid('psl')}-img" src="${v.image}" alt="${v.productName}">
    </div>
    <div class="${uid('psl')}-content">
      <span class="${uid('psl')}-tagline">${v.tagline}</span>
      <h2 class="${uid('psl')}-name">${v.productName}</h2>
      <p class="${uid('psl')}-desc">${v.description}</p>
      <div class="${uid('psl')}-features">
        <span class="${uid('psl')}-feat">${v.feature1}</span>
        <span class="${uid('psl')}-feat">${v.feature2}</span>
        <span class="${uid('psl')}-feat">${v.feature3}</span>
      </div>
      <div class="${uid('psl')}-price">${v.price}</div>
      <a href="#" class="${uid('psl')}-cta">${v.ctaText}</a>
    </div>
  </div>
</div>`
  },

  // 32. Social Proof Bar
  {
    id: 'social-proof-bar',
    name: 'Social Proof Bar',
    category: 'Trust',
    description: 'Floating bar with reviews/ratings - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    fields: [
      { id: 'rating', label: 'Rating', type: 'text', defaultValue: '4.9' },
      { id: 'reviewCount', label: 'Review Count', type: 'text', defaultValue: '2,847' },
      { id: 'text1', label: 'Trust Text 1', type: 'text', defaultValue: 'Verified Reviews' },
      { id: 'text2', label: 'Trust Text 2', type: 'text', defaultValue: '100K+ Happy Customers' },
      { id: 'text3', label: 'Trust Text 3', type: 'text', defaultValue: '30-Day Money Back' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Score Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('spb')}">
  <style>
    .${uid('spb')} { padding:16px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; border-bottom:1px solid #f3f4f6; }
    .${uid('spb')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('spb')}-container { max-width:1200px; margin:0 auto; display:flex; justify-content:center; align-items:center; gap:32px; flex-wrap:wrap; }
    @media(max-width:600px) { .${uid('spb')}-container { gap:16px; } }
    .${uid('spb')}-rating { display:flex; align-items:center; gap:8px; }
    .${uid('spb')}-stars { display:flex; gap:2px; }
    .${uid('spb')}-star { width:16px; height:16px; color:#fbbf24; }
    .${uid('spb')}-score { font-size:14px; font-weight:600; color:${v.headlineColor}; }
    .${uid('spb')}-count { font-size:13px; color:${v.textColor}; }
    .${uid('spb')}-divider { width:1px; height:20px; background:#e5e7eb; }
    @media(max-width:600px) { .${uid('spb')}-divider { display:none; } }
    .${uid('spb')}-item { display:flex; align-items:center; gap:6px; font-size:13px; color:${v.textColor}; }
    .${uid('spb')}-icon { width:16px; height:16px; color:#10b981; }
  </style>
  <div class="${uid('spb')}-container">
    <div class="${uid('spb')}-rating">
      <div class="${uid('spb')}-stars">
        ${Array.from({length:5}, () => `<svg class="${uid('spb')}-star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
      </div>
      <span class="${uid('spb')}-score">${v.rating}</span>
      <span class="${uid('spb')}-count">(${v.reviewCount})</span>
    </div>
    <div class="${uid('spb')}-divider"></div>
    <div class="${uid('spb')}-item">
      <svg class="${uid('spb')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
      ${v.text1}
    </div>
    <div class="${uid('spb')}-divider"></div>
    <div class="${uid('spb')}-item">
      <svg class="${uid('spb')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
      ${v.text2}
    </div>
    <div class="${uid('spb')}-divider"></div>
    <div class="${uid('spb')}-item">
      <svg class="${uid('spb')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
      ${v.text3}
    </div>
  </div>
</div>`
  },

  // 33. Image Text Stack
  {
    id: 'image-text-stack',
    name: 'Image Text Stack',
    category: 'Features',
    description: 'Alternating image/text sections - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    fields: [
      { id: 'title1', label: 'Section 1 Title', type: 'text', defaultValue: 'Crafted with Care' },
      { id: 'desc1', label: 'Section 1 Description', type: 'textarea', defaultValue: 'Every product is meticulously designed and crafted using only the finest materials. Our attention to detail ensures lasting quality.' },
      { id: 'image1', label: 'Section 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop' },
      { id: 'title2', label: 'Section 2 Title', type: 'text', defaultValue: 'Sustainable Practices' },
      { id: 'desc2', label: 'Section 2 Description', type: 'textarea', defaultValue: 'We\'re committed to reducing our environmental footprint. From eco-friendly packaging to ethical sourcing, sustainability is at our core.' },
      { id: 'image2', label: 'Section 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('its')}">
  <style>
    .${uid('its')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('its')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('its')}-container { max-width:1200px; margin:0 auto; }
    .${uid('its')}-row { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; margin-bottom:96px; }
    .${uid('its')}-row:last-child { margin-bottom:0; }
    .${uid('its')}-row.reverse { direction:rtl; }
    .${uid('its')}-row.reverse > * { direction:ltr; }
    @media(max-width:900px) {
      .${uid('its')}-row, .${uid('its')}-row.reverse { grid-template-columns:1fr; gap:40px; direction:ltr; }
      .${uid('its')}-row.reverse > * { direction:ltr; }
    }
    .${uid('its')}-img { width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:20px; }
    .${uid('its')}-content { }
    @media(max-width:900px) { .${uid('its')}-content { text-align:center; } }
    .${uid('its')}-title { font-size:36px; font-weight:700; color:${v.headlineColor}; margin-bottom:20px; letter-spacing:-0.02em; }
    .${uid('its')}-desc { font-size:17px; color:${v.textColor}; line-height:1.8; }
  </style>
  <div class="${uid('its')}-container">
    <div class="${uid('its')}-row">
      <img class="${uid('its')}-img" src="${v.image1}" alt="${v.title1}">
      <div class="${uid('its')}-content">
        <h2 class="${uid('its')}-title">${v.title1}</h2>
        <p class="${uid('its')}-desc">${v.desc1}</p>
      </div>
    </div>
    <div class="${uid('its')}-row reverse">
      <img class="${uid('its')}-img" src="${v.image2}" alt="${v.title2}">
      <div class="${uid('its')}-content">
        <h2 class="${uid('its')}-title">${v.title2}</h2>
        <p class="${uid('its')}-desc">${v.desc2}</p>
      </div>
    </div>
  </div>
</div>`
  },

  // 34. CTA Split Screen
  {
    id: 'cta-split-screen',
    name: 'CTA Split Screen',
    category: 'CTA',
    description: 'Bold call-to-action with image - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ready to Transform Your Style?' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Join thousands of satisfied customers who have elevated their wardrobe with our premium collection.' },
      { id: 'ctaText', label: 'CTA Button Text', type: 'text', defaultValue: 'Get Started' },
      { id: 'secondaryText', label: 'Secondary Text', type: 'text', defaultValue: 'Free shipping on first order' },
      { id: 'image', label: 'Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#111827' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: 'rgba(255,255,255,0.7)' },
    ],
    generateHtml: (v) => `<div class="${uid('css')}">
  <style>
    .${uid('css')} { display:grid; grid-template-columns:1fr 1fr; min-height:600px; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('css')} * { box-sizing:border-box; margin:0; padding:0; }
    @media(max-width:900px) { .${uid('css')} { grid-template-columns:1fr; } }
    .${uid('css')}-content { background:${v.bgColor}; padding:80px 64px; display:flex; flex-direction:column; justify-content:center; }
    @media(max-width:900px) { .${uid('css')}-content { padding:60px 24px; text-align:center; } }
    .${uid('css')}-headline { font-size:44px; font-weight:700; color:${v.headlineColor}; margin-bottom:24px; line-height:1.15; letter-spacing:-0.02em; }
    @media(max-width:900px) { .${uid('css')}-headline { font-size:32px; } }
    .${uid('css')}-desc { font-size:18px; color:${v.textColor}; line-height:1.7; margin-bottom:40px; max-width:440px; }
    @media(max-width:900px) { .${uid('css')}-desc { margin:0 auto 40px; } }
    .${uid('css')}-cta { display:inline-flex; padding:18px 40px; background:${v.headlineColor}; color:${v.bgColor}; font-size:14px; font-weight:600; text-decoration:none; border-radius:8px; transition:all 0.2s; margin-bottom:16px; }
    .${uid('css')}-cta:hover { opacity:0.9; transform:translateY(-2px); }
    @media(max-width:900px) { .${uid('css')}-cta { margin:0 auto 16px; } }
    .${uid('css')}-secondary { font-size:13px; color:${v.textColor}; opacity:0.7; }
    .${uid('css')}-visual { position:relative; overflow:hidden; }
    @media(max-width:900px) { .${uid('css')}-visual { height:400px; } }
    .${uid('css')}-img { width:100%; height:100%; object-fit:cover; }
  </style>
  <div class="${uid('css')}-content">
    <h2 class="${uid('css')}-headline">${v.headline}</h2>
    <p class="${uid('css')}-desc">${v.description}</p>
    <div>
      <a href="#" class="${uid('css')}-cta">${v.ctaText}</a>
      <p class="${uid('css')}-secondary">${v.secondaryText}</p>
    </div>
  </div>
  <div class="${uid('css')}-visual">
    <img class="${uid('css')}-img" src="${v.image}" alt="CTA">
  </div>
</div>`
  },

  // 35. Testimonial Single Large
  {
    id: 'testimonial-single-large',
    name: 'Testimonial Single Large',
    category: 'Testimonials',
    description: 'Large, prominent single testimonial - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'This product completely exceeded my expectations. The quality is outstanding, shipping was fast, and the customer service team was incredibly helpful. I\'ve already recommended it to all my friends!' },
      { id: 'author', label: 'Author Name', type: 'text', defaultValue: 'Jessica Anderson' },
      { id: 'role', label: 'Author Role', type: 'text', defaultValue: 'Verified Buyer' },
      { id: 'image', label: 'Author Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
      { id: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: '5' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'headlineColor', label: 'Quote Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('tsl')}">
  <style>
    .${uid('tsl')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('tsl')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('tsl')}-container { max-width:800px; margin:0 auto; text-align:center; }
    .${uid('tsl')}-stars { display:flex; justify-content:center; gap:4px; margin-bottom:32px; }
    .${uid('tsl')}-star { width:28px; height:28px; color:#fbbf24; }
    .${uid('tsl')}-star.empty { color:#e5e7eb; }
    .${uid('tsl')}-quote { font-size:28px; line-height:1.6; color:${v.headlineColor}; margin-bottom:40px; font-weight:400; }
    @media(max-width:700px) { .${uid('tsl')}-quote { font-size:22px; } }
    .${uid('tsl')}-author { display:flex; flex-direction:column; align-items:center; gap:12px; }
    .${uid('tsl')}-img { width:64px; height:64px; border-radius:50%; object-fit:cover; }
    .${uid('tsl')}-name { font-size:16px; font-weight:600; color:${v.headlineColor}; }
    .${uid('tsl')}-role { font-size:14px; color:${v.textColor}; }
  </style>
  <div class="${uid('tsl')}-container">
    <div class="${uid('tsl')}-stars">
      ${Array.from({length: 5}, (_, i) => `<svg class="${uid('tsl')}-star${i < parseInt(v.rating) ? '' : ' empty'}" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
    </div>
    <blockquote class="${uid('tsl')}-quote">"${v.quote}"</blockquote>
    <div class="${uid('tsl')}-author">
      <img class="${uid('tsl')}-img" src="${v.image}" alt="${v.author}">
      <div class="${uid('tsl')}-name">${v.author}</div>
      <div class="${uid('tsl')}-role">${v.role}</div>
    </div>
  </div>
</div>`
  },

  // 36. Benefit Cards 3-Col
  {
    id: 'benefit-cards-3col',
    name: 'Benefit Cards 3-Col',
    category: 'Features',
    description: '3 cards highlighting key benefits - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Why Customers Love Us' },
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Premium Quality' },
      { id: 'card1Desc', label: 'Card 1 Description', type: 'textarea', defaultValue: 'We source only the finest materials and work with skilled artisans to create products that last.' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Exceptional Value' },
      { id: 'card2Desc', label: 'Card 2 Description', type: 'textarea', defaultValue: 'By working directly with manufacturers, we offer luxury quality at accessible prices.' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Customer First' },
      { id: 'card3Desc', label: 'Card 3 Description', type: 'textarea', defaultValue: 'Our dedicated support team is here to help you before, during, and after your purchase.' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('bc3')}">
  <style>
    .${uid('bc3')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('bc3')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('bc3')}-container { max-width:1100px; margin:0 auto; }
    .${uid('bc3')}-headline { font-size:40px; font-weight:700; color:${v.headlineColor}; text-align:center; margin-bottom:64px; letter-spacing:-0.02em; }
    .${uid('bc3')}-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; }
    @media(max-width:900px) { .${uid('bc3')}-grid { grid-template-columns:1fr; max-width:500px; margin:0 auto; } }
    .${uid('bc3')}-card { padding:40px 32px; background:#f9fafb; border-radius:20px; text-align:center; transition:all 0.3s; }
    .${uid('bc3')}-card:hover { background:#f3f4f6; transform:translateY(-4px); }
    .${uid('bc3')}-icon { width:56px; height:56px; background:${v.headlineColor}; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; }
    .${uid('bc3')}-icon svg { width:28px; height:28px; color:#fff; }
    .${uid('bc3')}-title { font-size:20px; font-weight:600; color:${v.headlineColor}; margin-bottom:12px; }
    .${uid('bc3')}-desc { font-size:15px; color:${v.textColor}; line-height:1.7; }
  </style>
  <div class="${uid('bc3')}-container">
    <h2 class="${uid('bc3')}-headline">${v.headline}</h2>
    <div class="${uid('bc3')}-grid">
      <div class="${uid('bc3')}-card">
        <div class="${uid('bc3')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
        <h3 class="${uid('bc3')}-title">${v.card1Title}</h3>
        <p class="${uid('bc3')}-desc">${v.card1Desc}</p>
      </div>
      <div class="${uid('bc3')}-card">
        <div class="${uid('bc3')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
        <h3 class="${uid('bc3')}-title">${v.card2Title}</h3>
        <p class="${uid('bc3')}-desc">${v.card2Desc}</p>
      </div>
      <div class="${uid('bc3')}-card">
        <div class="${uid('bc3')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></div>
        <h3 class="${uid('bc3')}-title">${v.card3Title}</h3>
        <p class="${uid('bc3')}-desc">${v.card3Desc}</p>
      </div>
    </div>
  </div>
</div>`
  },

  // 37. Guarantee Badge Section
  {
    id: 'guarantee-badge-section',
    name: 'Guarantee Badge Section',
    category: 'Trust',
    description: 'Trust guarantee section with badge - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: '100% Satisfaction Guaranteed' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'We stand behind every product we sell. If you\'re not completely satisfied with your purchase, we\'ll make it right - no questions asked.' },
      { id: 'badge1', label: 'Badge 1 Text', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'badge2', label: 'Badge 2 Text', type: 'text', defaultValue: 'Free Exchanges' },
      { id: 'badge3', label: 'Badge 3 Text', type: 'text', defaultValue: 'Lifetime Support' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f0fdf4' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#4b5563' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#059669' },
    ],
    generateHtml: (v) => `<div class="${uid('gbs')}">
  <style>
    .${uid('gbs')} { padding:64px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('gbs')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('gbs')}-container { max-width:900px; margin:0 auto; text-align:center; }
    .${uid('gbs')}-icon { width:80px; height:80px; background:${v.accentColor}; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; }
    .${uid('gbs')}-icon svg { width:40px; height:40px; color:#fff; }
    .${uid('gbs')}-headline { font-size:32px; font-weight:700; color:${v.headlineColor}; margin-bottom:16px; letter-spacing:-0.02em; }
    .${uid('gbs')}-desc { font-size:17px; color:${v.textColor}; line-height:1.7; margin-bottom:32px; max-width:600px; margin-left:auto; margin-right:auto; }
    .${uid('gbs')}-badges { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }
    .${uid('gbs')}-badge { display:flex; align-items:center; gap:8px; padding:12px 20px; background:#fff; border-radius:8px; font-size:14px; font-weight:500; color:${v.accentColor}; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
    .${uid('gbs')}-badge svg { width:18px; height:18px; }
  </style>
  <div class="${uid('gbs')}-container">
    <div class="${uid('gbs')}-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    </div>
    <h2 class="${uid('gbs')}-headline">${v.headline}</h2>
    <p class="${uid('gbs')}-desc">${v.description}</p>
    <div class="${uid('gbs')}-badges">
      <div class="${uid('gbs')}-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
        ${v.badge1}
      </div>
      <div class="${uid('gbs')}-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
        ${v.badge2}
      </div>
      <div class="${uid('gbs')}-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
        ${v.badge3}
      </div>
    </div>
  </div>
</div>`
  },

  // 38. Quick Info Strip
  {
    id: 'quick-info-strip',
    name: 'Quick Info Strip',
    category: 'Trust',
    description: 'Horizontal info badges (shipping, returns, etc.) - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    fields: [
      { id: 'info1', label: 'Info 1', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'info2', label: 'Info 2', type: 'text', defaultValue: 'Easy Returns' },
      { id: 'info3', label: 'Info 3', type: 'text', defaultValue: 'Secure Payment' },
      { id: 'info4', label: 'Info 4', type: 'text', defaultValue: '2-Year Warranty' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
      { id: 'headlineColor', label: 'Icon Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#374151' },
    ],
    generateHtml: (v) => `<div class="${uid('qis')}">
  <style>
    .${uid('qis')} { padding:24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('qis')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('qis')}-container { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
    @media(max-width:800px) { .${uid('qis')}-container { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:500px) { .${uid('qis')}-container { grid-template-columns:1fr; } }
    .${uid('qis')}-item { display:flex; align-items:center; justify-content:center; gap:10px; padding:16px; background:#fff; border-radius:10px; }
    .${uid('qis')}-icon { width:20px; height:20px; color:${v.headlineColor}; flex-shrink:0; }
    .${uid('qis')}-text { font-size:13px; font-weight:500; color:${v.textColor}; }
  </style>
  <div class="${uid('qis')}-container">
    <div class="${uid('qis')}-item">
      <svg class="${uid('qis')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
      <span class="${uid('qis')}-text">${v.info1}</span>
    </div>
    <div class="${uid('qis')}-item">
      <svg class="${uid('qis')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
      <span class="${uid('qis')}-text">${v.info2}</span>
    </div>
    <div class="${uid('qis')}-item">
      <svg class="${uid('qis')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <span class="${uid('qis')}-text">${v.info3}</span>
    </div>
    <div class="${uid('qis')}-item">
      <svg class="${uid('qis')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span class="${uid('qis')}-text">${v.info4}</span>
    </div>
  </div>
</div>`
  },

  // 39. Video Hero Placeholder
  {
    id: 'video-hero-placeholder',
    name: 'Video Hero Placeholder',
    category: 'Hero',
    description: 'Hero section with video placeholder - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'See It In Action' },
      { id: 'subhead', label: 'Subhead', type: 'textarea', defaultValue: 'Watch our 2-minute video to see how our product can transform your daily routine.' },
      { id: 'thumbnail', label: 'Video Thumbnail', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&h=675&fit=crop' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Watch Video' },
      { id: 'duration', label: 'Video Duration', type: 'text', defaultValue: '2:30' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#111827' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: 'rgba(255,255,255,0.7)' },
    ],
    generateHtml: (v) => `<div class="${uid('vhp')}">
  <style>
    .${uid('vhp')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('vhp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('vhp')}-container { max-width:1000px; margin:0 auto; }
    .${uid('vhp')}-header { text-align:center; margin-bottom:48px; }
    .${uid('vhp')}-headline { font-size:44px; font-weight:700; color:${v.headlineColor}; margin-bottom:16px; letter-spacing:-0.02em; }
    @media(max-width:700px) { .${uid('vhp')}-headline { font-size:32px; } }
    .${uid('vhp')}-subhead { font-size:18px; color:${v.textColor}; max-width:560px; margin:0 auto; line-height:1.6; }
    .${uid('vhp')}-video { position:relative; border-radius:20px; overflow:hidden; aspect-ratio:16/9; cursor:pointer; }
    .${uid('vhp')}-thumb { width:100%; height:100%; object-fit:cover; }
    .${uid('vhp')}-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.3); display:flex; flex-direction:column; align-items:center; justify-content:center; transition:background 0.3s; }
    .${uid('vhp')}-video:hover .${uid('vhp')}-overlay { background:rgba(0,0,0,0.4); }
    .${uid('vhp')}-play { width:80px; height:80px; background:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:16px; transition:transform 0.3s; }
    .${uid('vhp')}-video:hover .${uid('vhp')}-play { transform:scale(1.1); }
    .${uid('vhp')}-play svg { width:32px; height:32px; color:#111827; margin-left:4px; }
    .${uid('vhp')}-cta { font-size:14px; font-weight:600; color:#fff; }
    .${uid('vhp')}-duration { font-size:12px; color:rgba(255,255,255,0.7); margin-top:4px; }
  </style>
  <div class="${uid('vhp')}-container">
    <div class="${uid('vhp')}-header">
      <h2 class="${uid('vhp')}-headline">${v.headline}</h2>
      <p class="${uid('vhp')}-subhead">${v.subhead}</p>
    </div>
    <div class="${uid('vhp')}-video">
      <img class="${uid('vhp')}-thumb" src="${v.thumbnail}" alt="Video thumbnail">
      <div class="${uid('vhp')}-overlay">
        <div class="${uid('vhp')}-play">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <span class="${uid('vhp')}-cta">${v.ctaText}</span>
        <span class="${uid('vhp')}-duration">${v.duration}</span>
      </div>
    </div>
  </div>
</div>`
  },

  // 40. Contact Cards
  {
    id: 'contact-cards-grid',
    name: 'Contact Cards Grid',
    category: 'Contact',
    description: 'Contact options in card format - 21st.dev style',
    thumbnail: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Get In Touch' },
      { id: 'subhead', label: 'Subhead', type: 'textarea', defaultValue: 'Have a question or need help? Choose the best way to reach us.' },
      { id: 'card1Title', label: 'Card 1 Title', type: 'text', defaultValue: 'Email Us' },
      { id: 'card1Desc', label: 'Card 1 Description', type: 'text', defaultValue: 'support@example.com' },
      { id: 'card1Sub', label: 'Card 1 Subtext', type: 'text', defaultValue: 'Response within 24 hours' },
      { id: 'card2Title', label: 'Card 2 Title', type: 'text', defaultValue: 'Live Chat' },
      { id: 'card2Desc', label: 'Card 2 Description', type: 'text', defaultValue: 'Chat with our team' },
      { id: 'card2Sub', label: 'Card 2 Subtext', type: 'text', defaultValue: 'Available 9am-6pm EST' },
      { id: 'card3Title', label: 'Card 3 Title', type: 'text', defaultValue: 'Call Us' },
      { id: 'card3Desc', label: 'Card 3 Description', type: 'text', defaultValue: '+1 (800) 123-4567' },
      { id: 'card3Sub', label: 'Card 3 Subtext', type: 'text', defaultValue: 'Mon-Fri 9am-6pm EST' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('ccg')}">
  <style>
    .${uid('ccg')} { padding:96px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('ccg')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('ccg')}-container { max-width:1000px; margin:0 auto; }
    .${uid('ccg')}-header { text-align:center; margin-bottom:64px; }
    .${uid('ccg')}-headline { font-size:40px; font-weight:700; color:${v.headlineColor}; margin-bottom:16px; letter-spacing:-0.02em; }
    .${uid('ccg')}-subhead { font-size:18px; color:${v.textColor}; max-width:500px; margin:0 auto; line-height:1.6; }
    .${uid('ccg')}-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
    @media(max-width:800px) { .${uid('ccg')}-grid { grid-template-columns:1fr; max-width:400px; margin:0 auto; } }
    .${uid('ccg')}-card { padding:40px 32px; background:#f9fafb; border-radius:20px; text-align:center; transition:all 0.3s; cursor:pointer; }
    .${uid('ccg')}-card:hover { background:#f3f4f6; transform:translateY(-4px); }
    .${uid('ccg')}-icon { width:56px; height:56px; background:${v.headlineColor}; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
    .${uid('ccg')}-icon svg { width:28px; height:28px; color:#fff; }
    .${uid('ccg')}-title { font-size:14px; font-weight:500; color:${v.textColor}; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; }
    .${uid('ccg')}-desc { font-size:18px; font-weight:600; color:${v.headlineColor}; margin-bottom:8px; }
    .${uid('ccg')}-sub { font-size:13px; color:${v.textColor}; opacity:0.7; }
  </style>
  <div class="${uid('ccg')}-container">
    <div class="${uid('ccg')}-header">
      <h2 class="${uid('ccg')}-headline">${v.headline}</h2>
      <p class="${uid('ccg')}-subhead">${v.subhead}</p>
    </div>
    <div class="${uid('ccg')}-grid">
      <div class="${uid('ccg')}-card">
        <div class="${uid('ccg')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
        <div class="${uid('ccg')}-title">${v.card1Title}</div>
        <div class="${uid('ccg')}-desc">${v.card1Desc}</div>
        <div class="${uid('ccg')}-sub">${v.card1Sub}</div>
      </div>
      <div class="${uid('ccg')}-card">
        <div class="${uid('ccg')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div>
        <div class="${uid('ccg')}-title">${v.card2Title}</div>
        <div class="${uid('ccg')}-desc">${v.card2Desc}</div>
        <div class="${uid('ccg')}-sub">${v.card2Sub}</div>
      </div>
      <div class="${uid('ccg')}-card">
        <div class="${uid('ccg')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
        <div class="${uid('ccg')}-title">${v.card3Title}</div>
        <div class="${uid('ccg')}-desc">${v.card3Desc}</div>
        <div class="${uid('ccg')}-sub">${v.card3Sub}</div>
      </div>
    </div>
  </div>
</div>`
  },

  // ============================================
  // PREMIUM ECOMMERCE SECTIONS (BATCH 3)
  // Super high-relevancy ecommerce components
  // ============================================

  // 41. Product Card Grid
  {
    id: 'product-card-grid-premium',
    name: 'Product Card Grid Premium',
    category: 'Product',
    description: 'Modern product cards with hover effects, quick-add, and wishlist',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Best Sellers' },
      { id: 'product1Img', label: 'Product 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop' },
      { id: 'product1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Minimal Watch' },
      { id: 'product1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$189' },
      { id: 'product1OldPrice', label: 'Product 1 Old Price', type: 'text', defaultValue: '$249' },
      { id: 'product2Img', label: 'Product 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop' },
      { id: 'product2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Premium Headphones' },
      { id: 'product2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$299' },
      { id: 'product2OldPrice', label: 'Product 2 Old Price', type: 'text', defaultValue: '' },
      { id: 'product3Img', label: 'Product 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop' },
      { id: 'product3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Designer Sunglasses' },
      { id: 'product3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$159' },
      { id: 'product3OldPrice', label: 'Product 3 Old Price', type: 'text', defaultValue: '$199' },
      { id: 'product4Img', label: 'Product 4 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=500&fit=crop' },
      { id: 'product4Name', label: 'Product 4 Name', type: 'text', defaultValue: 'Leather Bag' },
      { id: 'product4Price', label: 'Product 4 Price', type: 'text', defaultValue: '$349' },
      { id: 'product4OldPrice', label: 'Product 4 Old Price', type: 'text', defaultValue: '' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('pcg')}">
  <style>
    .${uid('pcg')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('pcg')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('pcg')}-container { max-width:1200px; margin:0 auto; }
    .${uid('pcg')}-headline { font-size:32px; font-weight:700; color:${v.headlineColor}; text-align:center; margin-bottom:48px; }
    .${uid('pcg')}-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
    @media(max-width:1000px) { .${uid('pcg')}-grid { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:500px) { .${uid('pcg')}-grid { grid-template-columns:1fr; } }
    .${uid('pcg')}-card { position:relative; background:#fff; border-radius:16px; overflow:hidden; transition:all 0.3s; }
    .${uid('pcg')}-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,0.1); }
    .${uid('pcg')}-img-wrap { position:relative; aspect-ratio:4/5; overflow:hidden; background:#f9fafb; }
    .${uid('pcg')}-img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
    .${uid('pcg')}-card:hover .${uid('pcg')}-img { transform:scale(1.05); }
    .${uid('pcg')}-wishlist { position:absolute; top:12px; right:12px; width:36px; height:36px; background:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; transition:all 0.3s; box-shadow:0 2px 8px rgba(0,0,0,0.1); }
    .${uid('pcg')}-card:hover .${uid('pcg')}-wishlist { opacity:1; }
    .${uid('pcg')}-wishlist:hover { background:#fee2e2; }
    .${uid('pcg')}-wishlist svg { width:18px; height:18px; color:#ef4444; }
    .${uid('pcg')}-quick { position:absolute; bottom:0; left:0; right:0; padding:12px; background:${v.headlineColor}; color:#fff; text-align:center; font-size:13px; font-weight:600; transform:translateY(100%); transition:transform 0.3s; cursor:pointer; }
    .${uid('pcg')}-card:hover .${uid('pcg')}-quick { transform:translateY(0); }
    .${uid('pcg')}-info { padding:16px; }
    .${uid('pcg')}-name { font-size:14px; font-weight:500; color:${v.headlineColor}; margin-bottom:8px; }
    .${uid('pcg')}-prices { display:flex; align-items:center; gap:8px; }
    .${uid('pcg')}-price { font-size:16px; font-weight:700; color:${v.headlineColor}; }
    .${uid('pcg')}-old { font-size:14px; color:${v.textColor}; text-decoration:line-through; }
    .${uid('pcg')}-badge { position:absolute; top:12px; left:12px; padding:4px 10px; background:#ef4444; color:#fff; font-size:11px; font-weight:600; border-radius:4px; text-transform:uppercase; }
  </style>
  <div class="${uid('pcg')}-container">
    <h2 class="${uid('pcg')}-headline">${v.headline}</h2>
    <div class="${uid('pcg')}-grid">
      <div class="${uid('pcg')}-card">
        ${v.product1OldPrice ? `<span class="${uid('pcg')}-badge">Sale</span>` : ''}
        <div class="${uid('pcg')}-img-wrap">
          <img class="${uid('pcg')}-img" src="${v.product1Img}" alt="${v.product1Name}">
          <div class="${uid('pcg')}-wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
          <div class="${uid('pcg')}-quick">Quick Add</div>
        </div>
        <div class="${uid('pcg')}-info">
          <h3 class="${uid('pcg')}-name">${v.product1Name}</h3>
          <div class="${uid('pcg')}-prices">
            <span class="${uid('pcg')}-price">${v.product1Price}</span>
            ${v.product1OldPrice ? `<span class="${uid('pcg')}-old">${v.product1OldPrice}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="${uid('pcg')}-card">
        ${v.product2OldPrice ? `<span class="${uid('pcg')}-badge">Sale</span>` : ''}
        <div class="${uid('pcg')}-img-wrap">
          <img class="${uid('pcg')}-img" src="${v.product2Img}" alt="${v.product2Name}">
          <div class="${uid('pcg')}-wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
          <div class="${uid('pcg')}-quick">Quick Add</div>
        </div>
        <div class="${uid('pcg')}-info">
          <h3 class="${uid('pcg')}-name">${v.product2Name}</h3>
          <div class="${uid('pcg')}-prices">
            <span class="${uid('pcg')}-price">${v.product2Price}</span>
            ${v.product2OldPrice ? `<span class="${uid('pcg')}-old">${v.product2OldPrice}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="${uid('pcg')}-card">
        ${v.product3OldPrice ? `<span class="${uid('pcg')}-badge">Sale</span>` : ''}
        <div class="${uid('pcg')}-img-wrap">
          <img class="${uid('pcg')}-img" src="${v.product3Img}" alt="${v.product3Name}">
          <div class="${uid('pcg')}-wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
          <div class="${uid('pcg')}-quick">Quick Add</div>
        </div>
        <div class="${uid('pcg')}-info">
          <h3 class="${uid('pcg')}-name">${v.product3Name}</h3>
          <div class="${uid('pcg')}-prices">
            <span class="${uid('pcg')}-price">${v.product3Price}</span>
            ${v.product3OldPrice ? `<span class="${uid('pcg')}-old">${v.product3OldPrice}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="${uid('pcg')}-card">
        ${v.product4OldPrice ? `<span class="${uid('pcg')}-badge">Sale</span>` : ''}
        <div class="${uid('pcg')}-img-wrap">
          <img class="${uid('pcg')}-img" src="${v.product4Img}" alt="${v.product4Name}">
          <div class="${uid('pcg')}-wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
          <div class="${uid('pcg')}-quick">Quick Add</div>
        </div>
        <div class="${uid('pcg')}-info">
          <h3 class="${uid('pcg')}-name">${v.product4Name}</h3>
          <div class="${uid('pcg')}-prices">
            <span class="${uid('pcg')}-price">${v.product4Price}</span>
            ${v.product4OldPrice ? `<span class="${uid('pcg')}-old">${v.product4OldPrice}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
  },

  // 42. Product Detail Hero
  {
    id: 'product-detail-hero',
    name: 'Product Detail Hero',
    category: 'Product',
    description: 'Full product page hero with gallery, variants, and add to cart',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    fields: [
      { id: 'productImg', label: 'Main Product Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop' },
      { id: 'productName', label: 'Product Name', type: 'text', defaultValue: 'Classic Minimalist Watch' },
      { id: 'productPrice', label: 'Price', type: 'text', defaultValue: '$189.00' },
      { id: 'oldPrice', label: 'Old Price (optional)', type: 'text', defaultValue: '$249.00' },
      { id: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: '5' },
      { id: 'reviewCount', label: 'Review Count', type: 'text', defaultValue: '128' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Crafted with precision and designed for everyday elegance. Features a genuine leather strap, sapphire crystal glass, and Swiss movement.' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Swiss Movement' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Sapphire Crystal' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Water Resistant' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Add to Cart' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#111827' },
    ],
    generateHtml: (v) => `<div class="${uid('pdh')}">
  <style>
    .${uid('pdh')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('pdh')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('pdh')}-container { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
    @media(max-width:900px) { .${uid('pdh')}-container { grid-template-columns:1fr; gap:40px; } }
    .${uid('pdh')}-gallery { position:relative; }
    .${uid('pdh')}-main-img { width:100%; aspect-ratio:1; object-fit:cover; border-radius:20px; background:#f9fafb; }
    .${uid('pdh')}-badge { position:absolute; top:16px; left:16px; padding:8px 16px; background:#ef4444; color:#fff; font-size:12px; font-weight:600; border-radius:6px; }
    .${uid('pdh')}-content { }
    .${uid('pdh')}-rating { display:flex; align-items:center; gap:8px; margin-bottom:16px; }
    .${uid('pdh')}-stars { display:flex; gap:2px; }
    .${uid('pdh')}-star { width:18px; height:18px; color:#fbbf24; }
    .${uid('pdh')}-reviews { font-size:14px; color:${v.textColor}; }
    .${uid('pdh')}-name { font-size:36px; font-weight:700; color:${v.headlineColor}; margin-bottom:16px; line-height:1.2; }
    .${uid('pdh')}-prices { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
    .${uid('pdh')}-price { font-size:28px; font-weight:700; color:${v.headlineColor}; }
    .${uid('pdh')}-old { font-size:20px; color:${v.textColor}; text-decoration:line-through; }
    .${uid('pdh')}-save { padding:4px 10px; background:#dcfce7; color:#16a34a; font-size:12px; font-weight:600; border-radius:4px; }
    .${uid('pdh')}-desc { font-size:16px; color:${v.textColor}; line-height:1.7; margin-bottom:24px; }
    .${uid('pdh')}-features { display:flex; gap:16px; margin-bottom:32px; flex-wrap:wrap; }
    .${uid('pdh')}-feat { display:flex; align-items:center; gap:8px; font-size:14px; color:${v.headlineColor}; }
    .${uid('pdh')}-feat svg { width:18px; height:18px; color:#10b981; }
    .${uid('pdh')}-actions { display:flex; gap:12px; }
    .${uid('pdh')}-cta { flex:1; padding:18px 32px; background:${v.accentColor}; color:#fff; font-size:16px; font-weight:600; border:none; border-radius:12px; cursor:pointer; transition:all 0.2s; }
    .${uid('pdh')}-cta:hover { opacity:0.9; transform:translateY(-2px); }
    .${uid('pdh')}-wishlist { width:56px; height:56px; background:#f3f4f6; border:none; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; }
    .${uid('pdh')}-wishlist:hover { background:#fee2e2; }
    .${uid('pdh')}-wishlist svg { width:24px; height:24px; color:#ef4444; }
  </style>
  <div class="${uid('pdh')}-container">
    <div class="${uid('pdh')}-gallery">
      ${v.oldPrice ? `<span class="${uid('pdh')}-badge">Sale</span>` : ''}
      <img class="${uid('pdh')}-main-img" src="${v.productImg}" alt="${v.productName}">
    </div>
    <div class="${uid('pdh')}-content">
      <div class="${uid('pdh')}-rating">
        <div class="${uid('pdh')}-stars">
          ${Array.from({length: 5}, (_, i) => `<svg class="${uid('pdh')}-star" viewBox="0 0 24 24" fill="${i < parseInt(v.rating) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
        </div>
        <span class="${uid('pdh')}-reviews">${v.reviewCount} reviews</span>
      </div>
      <h1 class="${uid('pdh')}-name">${v.productName}</h1>
      <div class="${uid('pdh')}-prices">
        <span class="${uid('pdh')}-price">${v.productPrice}</span>
        ${v.oldPrice ? `<span class="${uid('pdh')}-old">${v.oldPrice}</span><span class="${uid('pdh')}-save">Save $60</span>` : ''}
      </div>
      <p class="${uid('pdh')}-desc">${v.description}</p>
      <div class="${uid('pdh')}-features">
        <div class="${uid('pdh')}-feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>${v.feature1}</div>
        <div class="${uid('pdh')}-feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>${v.feature2}</div>
        <div class="${uid('pdh')}-feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>${v.feature3}</div>
      </div>
      <div class="${uid('pdh')}-actions">
        <button class="${uid('pdh')}-cta">${v.ctaText}</button>
        <button class="${uid('pdh')}-wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
      </div>
    </div>
  </div>
</div>`
  },

  // 43. Mini Cart Preview
  {
    id: 'mini-cart-preview',
    name: 'Mini Cart Preview',
    category: 'Product',
    description: 'Floating cart preview with items and checkout button',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    fields: [
      { id: 'item1Img', label: 'Item 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
      { id: 'item1Name', label: 'Item 1 Name', type: 'text', defaultValue: 'Classic Watch' },
      { id: 'item1Variant', label: 'Item 1 Variant', type: 'text', defaultValue: 'Silver / One Size' },
      { id: 'item1Price', label: 'Item 1 Price', type: 'text', defaultValue: '$189' },
      { id: 'item1Qty', label: 'Item 1 Quantity', type: 'number', defaultValue: '1' },
      { id: 'item2Img', label: 'Item 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
      { id: 'item2Name', label: 'Item 2 Name', type: 'text', defaultValue: 'Wireless Headphones' },
      { id: 'item2Variant', label: 'Item 2 Variant', type: 'text', defaultValue: 'Black' },
      { id: 'item2Price', label: 'Item 2 Price', type: 'text', defaultValue: '$299' },
      { id: 'item2Qty', label: 'Item 2 Quantity', type: 'number', defaultValue: '1' },
      { id: 'subtotal', label: 'Subtotal', type: 'text', defaultValue: '$488' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#6b7280' },
    ],
    generateHtml: (v) => `<div class="${uid('mcp')}">
  <style>
    .${uid('mcp')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; display:flex; justify-content:center; }
    .${uid('mcp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('mcp')}-card { width:100%; max-width:400px; background:#fff; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.1); overflow:hidden; }
    .${uid('mcp')}-header { padding:20px 24px; border-bottom:1px solid #f3f4f6; display:flex; justify-content:space-between; align-items:center; }
    .${uid('mcp')}-title { font-size:18px; font-weight:600; color:${v.headlineColor}; }
    .${uid('mcp')}-count { padding:4px 10px; background:#f3f4f6; border-radius:20px; font-size:13px; font-weight:500; color:${v.textColor}; }
    .${uid('mcp')}-items { padding:16px 24px; max-height:300px; overflow-y:auto; }
    .${uid('mcp')}-item { display:flex; gap:16px; padding:12px 0; border-bottom:1px solid #f3f4f6; }
    .${uid('mcp')}-item:last-child { border-bottom:none; }
    .${uid('mcp')}-item-img { width:64px; height:64px; border-radius:10px; object-fit:cover; background:#f9fafb; }
    .${uid('mcp')}-item-info { flex:1; }
    .${uid('mcp')}-item-name { font-size:14px; font-weight:500; color:${v.headlineColor}; margin-bottom:4px; }
    .${uid('mcp')}-item-variant { font-size:12px; color:${v.textColor}; margin-bottom:8px; }
    .${uid('mcp')}-item-bottom { display:flex; justify-content:space-between; align-items:center; }
    .${uid('mcp')}-item-price { font-size:14px; font-weight:600; color:${v.headlineColor}; }
    .${uid('mcp')}-item-qty { display:flex; align-items:center; gap:8px; }
    .${uid('mcp')}-qty-btn { width:24px; height:24px; border:1px solid #e5e7eb; background:#fff; border-radius:6px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:14px; color:${v.textColor}; }
    .${uid('mcp')}-qty-num { font-size:13px; font-weight:500; color:${v.headlineColor}; }
    .${uid('mcp')}-footer { padding:20px 24px; background:#f9fafb; }
    .${uid('mcp')}-subtotal { display:flex; justify-content:space-between; margin-bottom:16px; }
    .${uid('mcp')}-subtotal-label { font-size:14px; color:${v.textColor}; }
    .${uid('mcp')}-subtotal-value { font-size:18px; font-weight:700; color:${v.headlineColor}; }
    .${uid('mcp')}-checkout { width:100%; padding:16px; background:${v.headlineColor}; color:#fff; font-size:14px; font-weight:600; border:none; border-radius:12px; cursor:pointer; transition:all 0.2s; }
    .${uid('mcp')}-checkout:hover { opacity:0.9; }
    .${uid('mcp')}-continue { width:100%; padding:12px; background:transparent; color:${v.textColor}; font-size:13px; font-weight:500; border:none; cursor:pointer; margin-top:8px; }
  </style>
  <div class="${uid('mcp')}-card">
    <div class="${uid('mcp')}-header">
      <h3 class="${uid('mcp')}-title">Shopping Cart</h3>
      <span class="${uid('mcp')}-count">2 items</span>
    </div>
    <div class="${uid('mcp')}-items">
      <div class="${uid('mcp')}-item">
        <img class="${uid('mcp')}-item-img" src="${v.item1Img}" alt="${v.item1Name}">
        <div class="${uid('mcp')}-item-info">
          <h4 class="${uid('mcp')}-item-name">${v.item1Name}</h4>
          <p class="${uid('mcp')}-item-variant">${v.item1Variant}</p>
          <div class="${uid('mcp')}-item-bottom">
            <span class="${uid('mcp')}-item-price">${v.item1Price}</span>
            <div class="${uid('mcp')}-item-qty">
              <button class="${uid('mcp')}-qty-btn">-</button>
              <span class="${uid('mcp')}-qty-num">${v.item1Qty}</span>
              <button class="${uid('mcp')}-qty-btn">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="${uid('mcp')}-item">
        <img class="${uid('mcp')}-item-img" src="${v.item2Img}" alt="${v.item2Name}">
        <div class="${uid('mcp')}-item-info">
          <h4 class="${uid('mcp')}-item-name">${v.item2Name}</h4>
          <p class="${uid('mcp')}-item-variant">${v.item2Variant}</p>
          <div class="${uid('mcp')}-item-bottom">
            <span class="${uid('mcp')}-item-price">${v.item2Price}</span>
            <div class="${uid('mcp')}-item-qty">
              <button class="${uid('mcp')}-qty-btn">-</button>
              <span class="${uid('mcp')}-qty-num">${v.item2Qty}</span>
              <button class="${uid('mcp')}-qty-btn">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="${uid('mcp')}-footer">
      <div class="${uid('mcp')}-subtotal">
        <span class="${uid('mcp')}-subtotal-label">Subtotal</span>
        <span class="${uid('mcp')}-subtotal-value">${v.subtotal}</span>
      </div>
      <button class="${uid('mcp')}-checkout">Checkout</button>
      <button class="${uid('mcp')}-continue">Continue Shopping</button>
    </div>
  </div>
</div>`
  },

  // 44. Size Selector
  {
    id: 'size-selector-premium',
    name: 'Size Selector Premium',
    category: 'Product',
    description: 'Interactive size selection with availability indicators',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
    fields: [
      { id: 'label', label: 'Label', type: 'text', defaultValue: 'Select Size' },
      { id: 'sizeGuideText', label: 'Size Guide Text', type: 'text', defaultValue: 'Size Guide' },
      { id: 'sizes', label: 'Sizes (comma separated)', type: 'text', defaultValue: 'XS,S,M,L,XL,XXL' },
      { id: 'unavailable', label: 'Unavailable Sizes (comma separated)', type: 'text', defaultValue: 'XXL' },
      { id: 'selected', label: 'Default Selected', type: 'text', defaultValue: 'M' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Text Color', type: 'color', defaultValue: '#111827' },
      { id: 'accentColor', label: 'Selected Color', type: 'color', defaultValue: '#111827' },
    ],
    generateHtml: (v) => {
      const sizes = v.sizes.split(',').map((s: string) => s.trim());
      const unavailable = v.unavailable.split(',').map((s: string) => s.trim());
      return `<div class="${uid('ssz')}">
  <style>
    .${uid('ssz')} { padding:40px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('ssz')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('ssz')}-container { max-width:400px; margin:0 auto; }
    .${uid('ssz')}-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
    .${uid('ssz')}-label { font-size:14px; font-weight:500; color:${v.headlineColor}; }
    .${uid('ssz')}-guide { font-size:13px; color:${v.headlineColor}; text-decoration:underline; cursor:pointer; }
    .${uid('ssz')}-grid { display:flex; flex-wrap:wrap; gap:10px; }
    .${uid('ssz')}-btn { min-width:52px; padding:14px 18px; background:#fff; border:2px solid #e5e7eb; border-radius:10px; font-size:14px; font-weight:500; color:${v.headlineColor}; cursor:pointer; transition:all 0.2s; }
    .${uid('ssz')}-btn:hover:not(.disabled):not(.selected) { border-color:${v.headlineColor}; }
    .${uid('ssz')}-btn.selected { background:${v.accentColor}; border-color:${v.accentColor}; color:#fff; }
    .${uid('ssz')}-btn.disabled { color:#d1d5db; border-color:#f3f4f6; cursor:not-allowed; position:relative; }
    .${uid('ssz')}-btn.disabled::after { content:''; position:absolute; top:50%; left:0; right:0; height:1px; background:#d1d5db; transform:rotate(-20deg); }
  </style>
  <div class="${uid('ssz')}-container">
    <div class="${uid('ssz')}-header">
      <span class="${uid('ssz')}-label">${v.label}</span>
      <span class="${uid('ssz')}-guide">${v.sizeGuideText}</span>
    </div>
    <div class="${uid('ssz')}-grid">
      ${sizes.map((size: string) => {
        const isUnavailable = unavailable.includes(size);
        const isSelected = size === v.selected;
        return `<button class="${uid('ssz')}-btn${isSelected ? ' selected' : ''}${isUnavailable ? ' disabled' : ''}">${size}</button>`;
      }).join('')}
    </div>
  </div>
</div>`;
    }
  },

  // 45. Color Swatches
  {
    id: 'color-swatches-premium',
    name: 'Color Swatches Premium',
    category: 'Product',
    description: 'Product color variant selector with hover labels',
    thumbnail: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=600&fit=crop',
    fields: [
      { id: 'label', label: 'Label', type: 'text', defaultValue: 'Color' },
      { id: 'selectedName', label: 'Selected Color Name', type: 'text', defaultValue: 'Midnight Black' },
      { id: 'color1', label: 'Color 1 (hex)', type: 'color', defaultValue: '#111827' },
      { id: 'color1Name', label: 'Color 1 Name', type: 'text', defaultValue: 'Midnight Black' },
      { id: 'color2', label: 'Color 2 (hex)', type: 'color', defaultValue: '#f5f5f4' },
      { id: 'color2Name', label: 'Color 2 Name', type: 'text', defaultValue: 'Pearl White' },
      { id: 'color3', label: 'Color 3 (hex)', type: 'color', defaultValue: '#78716c' },
      { id: 'color3Name', label: 'Color 3 Name', type: 'text', defaultValue: 'Stone Gray' },
      { id: 'color4', label: 'Color 4 (hex)', type: 'color', defaultValue: '#7c3aed' },
      { id: 'color4Name', label: 'Color 4 Name', type: 'text', defaultValue: 'Royal Purple' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#111827' },
    ],
    generateHtml: (v) => `<div class="${uid('csw')}">
  <style>
    .${uid('csw')} { padding:40px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('csw')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('csw')}-container { max-width:400px; margin:0 auto; }
    .${uid('csw')}-header { display:flex; gap:8px; margin-bottom:16px; }
    .${uid('csw')}-label { font-size:14px; font-weight:500; color:${v.textColor}; }
    .${uid('csw')}-selected { font-size:14px; color:#6b7280; }
    .${uid('csw')}-swatches { display:flex; gap:12px; }
    .${uid('csw')}-swatch { position:relative; width:40px; height:40px; border-radius:50%; cursor:pointer; transition:all 0.2s; border:2px solid transparent; }
    .${uid('csw')}-swatch:hover { transform:scale(1.1); }
    .${uid('csw')}-swatch.selected { border-color:${v.textColor}; box-shadow:0 0 0 2px #fff inset; }
    .${uid('csw')}-swatch::after { content:attr(data-name); position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%); padding:6px 12px; background:#111; color:#fff; font-size:11px; font-weight:500; border-radius:6px; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity 0.2s; }
    .${uid('csw')}-swatch:hover::after { opacity:1; }
    .${uid('csw')}-s1 { background:${v.color1}; }
    .${uid('csw')}-s2 { background:${v.color2}; border:1px solid #e5e7eb; }
    .${uid('csw')}-s3 { background:${v.color3}; }
    .${uid('csw')}-s4 { background:${v.color4}; }
  </style>
  <div class="${uid('csw')}-container">
    <div class="${uid('csw')}-header">
      <span class="${uid('csw')}-label">${v.label}:</span>
      <span class="${uid('csw')}-selected">${v.selectedName}</span>
    </div>
    <div class="${uid('csw')}-swatches">
      <div class="${uid('csw')}-swatch ${uid('csw')}-s1 selected" data-name="${v.color1Name}"></div>
      <div class="${uid('csw')}-swatch ${uid('csw')}-s2" data-name="${v.color2Name}"></div>
      <div class="${uid('csw')}-swatch ${uid('csw')}-s3" data-name="${v.color3Name}"></div>
      <div class="${uid('csw')}-swatch ${uid('csw')}-s4" data-name="${v.color4Name}"></div>
    </div>
  </div>
</div>`
  },

  // 46. Product Image Gallery
  {
    id: 'product-gallery-thumbs',
    name: 'Product Gallery with Thumbnails',
    category: 'Product',
    description: 'Product image gallery with thumbnail navigation',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    fields: [
      { id: 'img1', label: 'Image 1 (Main)', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop' },
      { id: 'img2', label: 'Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop' },
      { id: 'img3', label: 'Image 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop' },
      { id: 'img4', label: 'Image 4', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1434056886845-dbd39c1cc727?w=600&h=600&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('pgt')}">
  <style>
    .${uid('pgt')} { padding:40px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('pgt')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('pgt')}-container { max-width:500px; margin:0 auto; }
    .${uid('pgt')}-main { position:relative; aspect-ratio:1; border-radius:20px; overflow:hidden; margin-bottom:16px; background:#f9fafb; }
    .${uid('pgt')}-main-img { width:100%; height:100%; object-fit:cover; transition:opacity 0.3s; }
    .${uid('pgt')}-zoom { position:absolute; top:16px; right:16px; width:44px; height:44px; background:#fff; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.1); }
    .${uid('pgt')}-zoom svg { width:20px; height:20px; color:#111; }
    .${uid('pgt')}-thumbs { display:flex; gap:12px; }
    .${uid('pgt')}-thumb { width:80px; height:80px; border-radius:12px; overflow:hidden; cursor:pointer; border:2px solid transparent; transition:all 0.2s; opacity:0.6; }
    .${uid('pgt')}-thumb:hover, .${uid('pgt')}-thumb.active { opacity:1; border-color:#111; }
    .${uid('pgt')}-thumb img { width:100%; height:100%; object-fit:cover; }
  </style>
  <div class="${uid('pgt')}-container">
    <div class="${uid('pgt')}-main">
      <img id="${uid('pgt')}-main-img" class="${uid('pgt')}-main-img" src="${v.img1}" alt="Product">
      <div class="${uid('pgt')}-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
    </div>
    <div class="${uid('pgt')}-thumbs">
      <div class="${uid('pgt')}-thumb active" onclick="document.getElementById('${uid('pgt')}-main-img').src='${v.img1}';document.querySelectorAll('.${uid('pgt')}-thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active');"><img src="${v.img1}" alt="Thumb 1"></div>
      <div class="${uid('pgt')}-thumb" onclick="document.getElementById('${uid('pgt')}-main-img').src='${v.img2}';document.querySelectorAll('.${uid('pgt')}-thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active');"><img src="${v.img2}" alt="Thumb 2"></div>
      <div class="${uid('pgt')}-thumb" onclick="document.getElementById('${uid('pgt')}-main-img').src='${v.img3}';document.querySelectorAll('.${uid('pgt')}-thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active');"><img src="${v.img3}" alt="Thumb 3"></div>
      <div class="${uid('pgt')}-thumb" onclick="document.getElementById('${uid('pgt')}-main-img').src='${v.img4}';document.querySelectorAll('.${uid('pgt')}-thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active');"><img src="${v.img4}" alt="Thumb 4"></div>
    </div>
  </div>
</div>`
  },

  // 47. Add to Cart Button
  {
    id: 'add-to-cart-animated',
    name: 'Add to Cart Animated',
    category: 'Product',
    description: 'Animated add to cart button with success state',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
    fields: [
      { id: 'text', label: 'Button Text', type: 'text', defaultValue: 'Add to Cart' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: '$189.00' },
      { id: 'successText', label: 'Success Text', type: 'text', defaultValue: 'Added!' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'buttonColor', label: 'Button Color', type: 'color', defaultValue: '#111827' },
    ],
    generateHtml: (v) => `<div class="${uid('atc')}">
  <style>
    .${uid('atc')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; display:flex; justify-content:center; }
    .${uid('atc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('atc')}-btn { display:flex; align-items:center; gap:16px; padding:18px 32px; background:${v.buttonColor}; border:none; border-radius:14px; cursor:pointer; transition:all 0.3s; overflow:hidden; }
    .${uid('atc')}-btn:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(0,0,0,0.2); }
    .${uid('atc')}-btn:active { transform:scale(0.98); }
    .${uid('atc')}-icon { width:24px; height:24px; color:#fff; transition:transform 0.3s; }
    .${uid('atc')}-btn:hover .${uid('atc')}-icon { transform:scale(1.1); }
    .${uid('atc')}-text { font-size:16px; font-weight:600; color:#fff; }
    .${uid('atc')}-divider { width:1px; height:24px; background:rgba(255,255,255,0.3); }
    .${uid('atc')}-price { font-size:16px; font-weight:700; color:#fff; }
  </style>
  <button class="${uid('atc')}-btn" onclick="this.querySelector('.${uid('atc')}-text').textContent='${v.successText}';this.style.background='#16a34a';setTimeout(()=>{this.querySelector('.${uid('atc')}-text').textContent='${v.text}';this.style.background='${v.buttonColor}';},2000);">
    <svg class="${uid('atc')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
    <span class="${uid('atc')}-text">${v.text}</span>
    <div class="${uid('atc')}-divider"></div>
    <span class="${uid('atc')}-price">${v.price}</span>
  </button>
</div>`
  },

  // 48. Product Rating with Reviews
  {
    id: 'product-rating-reviews',
    name: 'Product Rating with Reviews',
    category: 'Product',
    description: 'Star rating display with review count and breakdown',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    fields: [
      { id: 'rating', label: 'Overall Rating', type: 'text', defaultValue: '4.8' },
      { id: 'totalReviews', label: 'Total Reviews', type: 'text', defaultValue: '2,847' },
      { id: 'star5', label: '5 Star Percent', type: 'number', defaultValue: '78' },
      { id: 'star4', label: '4 Star Percent', type: 'number', defaultValue: '15' },
      { id: 'star3', label: '3 Star Percent', type: 'number', defaultValue: '5' },
      { id: 'star2', label: '2 Star Percent', type: 'number', defaultValue: '1' },
      { id: 'star1', label: '1 Star Percent', type: 'number', defaultValue: '1' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Text Color', type: 'color', defaultValue: '#111827' },
      { id: 'accentColor', label: 'Star Color', type: 'color', defaultValue: '#fbbf24' },
    ],
    generateHtml: (v) => `<div class="${uid('prr')}">
  <style>
    .${uid('prr')} { padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('prr')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('prr')}-container { max-width:500px; margin:0 auto; display:flex; gap:40px; }
    @media(max-width:600px) { .${uid('prr')}-container { flex-direction:column; align-items:center; text-align:center; } }
    .${uid('prr')}-summary { }
    .${uid('prr')}-score { font-size:56px; font-weight:700; color:${v.headlineColor}; line-height:1; }
    .${uid('prr')}-stars { display:flex; gap:4px; margin:12px 0; }
    @media(max-width:600px) { .${uid('prr')}-stars { justify-content:center; } }
    .${uid('prr')}-star { width:24px; height:24px; color:${v.accentColor}; }
    .${uid('prr')}-total { font-size:14px; color:#6b7280; }
    .${uid('prr')}-breakdown { flex:1; }
    .${uid('prr')}-bar-row { display:flex; align-items:center; gap:12px; margin-bottom:10px; }
    .${uid('prr')}-bar-label { font-size:13px; color:#6b7280; width:50px; }
    .${uid('prr')}-bar-track { flex:1; height:8px; background:#f3f4f6; border-radius:4px; overflow:hidden; }
    .${uid('prr')}-bar-fill { height:100%; background:${v.accentColor}; border-radius:4px; transition:width 0.5s; }
    .${uid('prr')}-bar-pct { font-size:12px; color:#6b7280; width:36px; text-align:right; }
  </style>
  <div class="${uid('prr')}-container">
    <div class="${uid('prr')}-summary">
      <div class="${uid('prr')}-score">${v.rating}</div>
      <div class="${uid('prr')}-stars">
        ${Array.from({length: 5}, () => `<svg class="${uid('prr')}-star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
      </div>
      <div class="${uid('prr')}-total">${v.totalReviews} reviews</div>
    </div>
    <div class="${uid('prr')}-breakdown">
      <div class="${uid('prr')}-bar-row"><span class="${uid('prr')}-bar-label">5 star</span><div class="${uid('prr')}-bar-track"><div class="${uid('prr')}-bar-fill" style="width:${v.star5}%"></div></div><span class="${uid('prr')}-bar-pct">${v.star5}%</span></div>
      <div class="${uid('prr')}-bar-row"><span class="${uid('prr')}-bar-label">4 star</span><div class="${uid('prr')}-bar-track"><div class="${uid('prr')}-bar-fill" style="width:${v.star4}%"></div></div><span class="${uid('prr')}-bar-pct">${v.star4}%</span></div>
      <div class="${uid('prr')}-bar-row"><span class="${uid('prr')}-bar-label">3 star</span><div class="${uid('prr')}-bar-track"><div class="${uid('prr')}-bar-fill" style="width:${v.star3}%"></div></div><span class="${uid('prr')}-bar-pct">${v.star3}%</span></div>
      <div class="${uid('prr')}-bar-row"><span class="${uid('prr')}-bar-label">2 star</span><div class="${uid('prr')}-bar-track"><div class="${uid('prr')}-bar-fill" style="width:${v.star2}%"></div></div><span class="${uid('prr')}-bar-pct">${v.star2}%</span></div>
      <div class="${uid('prr')}-bar-row"><span class="${uid('prr')}-bar-label">1 star</span><div class="${uid('prr')}-bar-track"><div class="${uid('prr')}-bar-fill" style="width:${v.star1}%"></div></div><span class="${uid('prr')}-bar-pct">${v.star1}%</span></div>
    </div>
  </div>
</div>`
  },

  // 49. Stock Status Indicator
  {
    id: 'stock-status-indicator',
    name: 'Stock Status Indicator',
    category: 'Product',
    description: 'Visual stock level indicator with urgency messaging',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
    fields: [
      { id: 'stockLevel', label: 'Stock Level (0-100)', type: 'number', defaultValue: '12' },
      { id: 'lowStockText', label: 'Low Stock Message', type: 'text', defaultValue: 'Only 12 left in stock - order soon!' },
      { id: 'inStockText', label: 'In Stock Message', type: 'text', defaultValue: 'In Stock' },
      { id: 'outOfStockText', label: 'Out of Stock Message', type: 'text', defaultValue: 'Out of Stock' },
      { id: 'lowThreshold', label: 'Low Stock Threshold', type: 'number', defaultValue: '20' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => {
      const stock = parseInt(v.stockLevel);
      const threshold = parseInt(v.lowThreshold);
      const isLow = stock > 0 && stock <= threshold;
      const isOut = stock === 0;
      const color = isOut ? '#ef4444' : isLow ? '#f59e0b' : '#10b981';
      const text = isOut ? v.outOfStockText : isLow ? v.lowStockText : v.inStockText;
      return `<div class="${uid('ssi')}">
  <style>
    .${uid('ssi')} { padding:32px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('ssi')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('ssi')}-container { max-width:400px; margin:0 auto; }
    .${uid('ssi')}-status { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
    .${uid('ssi')}-dot { width:10px; height:10px; border-radius:50%; background:${color}; animation:${isLow ? `${uid('ssi')}-pulse 2s infinite` : 'none'}; }
    @keyframes ${uid('ssi')}-pulse { 0%, 100% { opacity:1; } 50% { opacity:0.5; } }
    .${uid('ssi')}-text { font-size:14px; font-weight:500; color:${color}; }
    .${uid('ssi')}-bar { height:6px; background:#f3f4f6; border-radius:3px; overflow:hidden; }
    .${uid('ssi')}-fill { height:100%; background:${color}; border-radius:3px; transition:width 0.5s; }
  </style>
  <div class="${uid('ssi')}-container">
    <div class="${uid('ssi')}-status">
      <div class="${uid('ssi')}-dot"></div>
      <span class="${uid('ssi')}-text">${text}</span>
    </div>
    <div class="${uid('ssi')}-bar">
      <div class="${uid('ssi')}-fill" style="width:${stock}%"></div>
    </div>
  </div>
</div>`;
    }
  },

  // 50. Quantity Selector
  {
    id: 'quantity-selector-premium',
    name: 'Quantity Selector Premium',
    category: 'Product',
    description: 'Elegant quantity stepper with min/max limits',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
    fields: [
      { id: 'label', label: 'Label', type: 'text', defaultValue: 'Quantity' },
      { id: 'defaultQty', label: 'Default Quantity', type: 'number', defaultValue: '1' },
      { id: 'maxQty', label: 'Max Quantity', type: 'number', defaultValue: '10' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#111827' },
    ],
    generateHtml: (v) => `<div class="${uid('qsp')}">
  <style>
    .${uid('qsp')} { padding:40px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('qsp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('qsp')}-container { max-width:300px; margin:0 auto; }
    .${uid('qsp')}-label { font-size:14px; font-weight:500; color:${v.textColor}; margin-bottom:12px; }
    .${uid('qsp')}-stepper { display:flex; align-items:center; border:2px solid #e5e7eb; border-radius:12px; overflow:hidden; }
    .${uid('qsp')}-btn { width:52px; height:52px; background:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
    .${uid('qsp')}-btn:hover:not(:disabled) { background:#f3f4f6; }
    .${uid('qsp')}-btn:disabled { opacity:0.3; cursor:not-allowed; }
    .${uid('qsp')}-btn svg { width:20px; height:20px; color:${v.textColor}; }
    .${uid('qsp')}-value { flex:1; text-align:center; font-size:18px; font-weight:600; color:${v.textColor}; }
    .${uid('qsp')}-max { font-size:12px; color:#6b7280; text-align:center; margin-top:8px; }
  </style>
  <div class="${uid('qsp')}-container">
    <div class="${uid('qsp')}-label">${v.label}</div>
    <div class="${uid('qsp')}-stepper">
      <button class="${uid('qsp')}-btn" id="${uid('qsp')}-minus" onclick="var val=document.getElementById('${uid('qsp')}-val');var num=parseInt(val.textContent);if(num>1){val.textContent=num-1;document.getElementById('${uid('qsp')}-plus').disabled=false;}if(num-1<=1)this.disabled=true;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>
      </button>
      <span class="${uid('qsp')}-value" id="${uid('qsp')}-val">${v.defaultQty}</span>
      <button class="${uid('qsp')}-btn" id="${uid('qsp')}-plus" onclick="var val=document.getElementById('${uid('qsp')}-val');var num=parseInt(val.textContent);if(num<${v.maxQty}){val.textContent=num+1;document.getElementById('${uid('qsp')}-minus').disabled=false;}if(num+1>=${v.maxQty})this.disabled=true;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
    <div class="${uid('qsp')}-max">Max ${v.maxQty} per order</div>
  </div>
</div>`
  },

  // 51. Flash Sale Countdown Timer
  {
    id: 'flash-sale-countdown',
    name: 'Flash Sale Countdown',
    category: 'Countdown',
    description: 'Urgency-driven flash sale banner with animated countdown timer',
    thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'FLASH SALE' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Up to 70% Off Everything' },
      { id: 'hours', label: 'Hours Left', type: 'number', defaultValue: '23' },
      { id: 'minutes', label: 'Minutes Left', type: 'number', defaultValue: '59' },
      { id: 'seconds', label: 'Seconds Left', type: 'number', defaultValue: '59' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'ctaUrl', label: 'CTA URL', type: 'url', defaultValue: '#' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#dc2626' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('fsc')}">
  <style>
    .${uid('fsc')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; text-align:center; }
    .${uid('fsc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('fsc')}-headline { font-size:48px; font-weight:900; color:${v.textColor}; letter-spacing:4px; text-transform:uppercase; margin-bottom:8px; animation:${uid('fsc')}-pulse 2s infinite; }
    @keyframes ${uid('fsc')}-pulse { 0%,100% { opacity:1; } 50% { opacity:0.8; } }
    .${uid('fsc')}-sub { font-size:24px; font-weight:500; color:${v.textColor}; opacity:0.9; margin-bottom:32px; }
    .${uid('fsc')}-timer { display:flex; justify-content:center; gap:16px; margin-bottom:32px; }
    .${uid('fsc')}-unit { background:rgba(0,0,0,0.2); border-radius:12px; padding:20px 24px; min-width:100px; }
    .${uid('fsc')}-number { font-size:48px; font-weight:700; color:${v.textColor}; line-height:1; }
    .${uid('fsc')}-label { font-size:12px; font-weight:600; color:${v.textColor}; opacity:0.8; text-transform:uppercase; letter-spacing:2px; margin-top:8px; }
    .${uid('fsc')}-cta { display:inline-block; background:${v.textColor}; color:${v.bgColor}; padding:16px 48px; border-radius:50px; font-size:16px; font-weight:700; text-decoration:none; text-transform:uppercase; letter-spacing:1px; transition:all 0.3s; }
    .${uid('fsc')}-cta:hover { transform:scale(1.05); box-shadow:0 8px 32px rgba(0,0,0,0.3); }
  </style>
  <div class="${uid('fsc')}-headline">${v.headline}</div>
  <div class="${uid('fsc')}-sub">${v.subheadline}</div>
  <div class="${uid('fsc')}-timer">
    <div class="${uid('fsc')}-unit"><div class="${uid('fsc')}-number">${v.hours}</div><div class="${uid('fsc')}-label">Hours</div></div>
    <div class="${uid('fsc')}-unit"><div class="${uid('fsc')}-number">${v.minutes}</div><div class="${uid('fsc')}-label">Minutes</div></div>
    <div class="${uid('fsc')}-unit"><div class="${uid('fsc')}-number">${v.seconds}</div><div class="${uid('fsc')}-label">Seconds</div></div>
  </div>
  <a href="${v.ctaUrl}" class="${uid('fsc')}-cta">${v.ctaText}</a>
</div>`
  },

  // 52. Recently Viewed Products
  {
    id: 'recently-viewed-products',
    name: 'Recently Viewed Products',
    category: 'Product',
    description: 'Horizontal scroll of recently viewed product cards',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Recently Viewed' },
      { id: 'product1Img', label: 'Product 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
      { id: 'product1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Smart Watch Pro' },
      { id: 'product1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$299' },
      { id: 'product2Img', label: 'Product 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop' },
      { id: 'product2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Wireless Earbuds' },
      { id: 'product2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$149' },
      { id: 'product3Img', label: 'Product 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop' },
      { id: 'product3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Leather Backpack' },
      { id: 'product3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$189' },
      { id: 'product4Img', label: 'Product 4 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop' },
      { id: 'product4Name', label: 'Product 4 Name', type: 'text', defaultValue: 'Running Shoes' },
      { id: 'product4Price', label: 'Product 4 Price', type: 'text', defaultValue: '$129' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#374151' },
    ],
    generateHtml: (v) => `<div class="${uid('rvp')}">
  <style>
    .${uid('rvp')} { padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('rvp')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('rvp')}-container { max-width:1200px; margin:0 auto; }
    .${uid('rvp')}-headline { font-size:24px; font-weight:700; color:${v.headlineColor}; margin-bottom:24px; }
    .${uid('rvp')}-scroll { display:flex; gap:20px; overflow-x:auto; padding-bottom:16px; scrollbar-width:thin; }
    .${uid('rvp')}-scroll::-webkit-scrollbar { height:6px; }
    .${uid('rvp')}-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:3px; }
    .${uid('rvp')}-card { flex-shrink:0; width:180px; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06); transition:all 0.3s; cursor:pointer; }
    .${uid('rvp')}-card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,0.12); }
    .${uid('rvp')}-img { width:100%; aspect-ratio:1; object-fit:cover; }
    .${uid('rvp')}-info { padding:12px; }
    .${uid('rvp')}-name { font-size:14px; font-weight:500; color:${v.textColor}; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .${uid('rvp')}-price { font-size:16px; font-weight:700; color:${v.headlineColor}; }
  </style>
  <div class="${uid('rvp')}-container">
    <div class="${uid('rvp')}-headline">${v.headline}</div>
    <div class="${uid('rvp')}-scroll">
      <div class="${uid('rvp')}-card"><img class="${uid('rvp')}-img" src="${v.product1Img}" alt="${v.product1Name}"/><div class="${uid('rvp')}-info"><div class="${uid('rvp')}-name">${v.product1Name}</div><div class="${uid('rvp')}-price">${v.product1Price}</div></div></div>
      <div class="${uid('rvp')}-card"><img class="${uid('rvp')}-img" src="${v.product2Img}" alt="${v.product2Name}"/><div class="${uid('rvp')}-info"><div class="${uid('rvp')}-name">${v.product2Name}</div><div class="${uid('rvp')}-price">${v.product2Price}</div></div></div>
      <div class="${uid('rvp')}-card"><img class="${uid('rvp')}-img" src="${v.product3Img}" alt="${v.product3Name}"/><div class="${uid('rvp')}-info"><div class="${uid('rvp')}-name">${v.product3Name}</div><div class="${uid('rvp')}-price">${v.product3Price}</div></div></div>
      <div class="${uid('rvp')}-card"><img class="${uid('rvp')}-img" src="${v.product4Img}" alt="${v.product4Name}"/><div class="${uid('rvp')}-info"><div class="${uid('rvp')}-name">${v.product4Name}</div><div class="${uid('rvp')}-price">${v.product4Price}</div></div></div>
    </div>
  </div>
</div>`
  },

  // 53. Product Comparison Table
  {
    id: 'product-comparison-table',
    name: 'Product Comparison Table',
    category: 'Product',
    description: 'Side-by-side product feature comparison grid',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Compare Products' },
      { id: 'product1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Basic Plan' },
      { id: 'product1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$29/mo' },
      { id: 'product2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Pro Plan' },
      { id: 'product2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$59/mo' },
      { id: 'product3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Enterprise' },
      { id: 'product3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$99/mo' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Storage' },
      { id: 'feature1Values', label: 'Feature 1 Values (comma-separated)', type: 'text', defaultValue: '10GB,50GB,Unlimited' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Users' },
      { id: 'feature2Values', label: 'Feature 2 Values (comma-separated)', type: 'text', defaultValue: '1,5,Unlimited' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Support' },
      { id: 'feature3Values', label: 'Feature 3 Values (comma-separated)', type: 'text', defaultValue: 'Email,Priority,24/7 Phone' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#3b82f6' },
    ],
    generateHtml: (v) => {
      const f1v = v.feature1Values.split(',');
      const f2v = v.feature2Values.split(',');
      const f3v = v.feature3Values.split(',');
      return `<div class="${uid('pct')}">
  <style>
    .${uid('pct')} { padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('pct')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('pct')}-container { max-width:900px; margin:0 auto; }
    .${uid('pct')}-headline { font-size:32px; font-weight:700; color:${v.headlineColor}; text-align:center; margin-bottom:32px; }
    .${uid('pct')}-table { width:100%; border-collapse:collapse; }
    .${uid('pct')}-table th, .${uid('pct')}-table td { padding:16px 12px; text-align:center; border-bottom:1px solid #e5e7eb; }
    .${uid('pct')}-table th { font-size:14px; font-weight:600; color:#6b7280; }
    .${uid('pct')}-table th.${uid('pct')}-product { background:#f9fafb; border-radius:12px 12px 0 0; }
    .${uid('pct')}-product-name { font-size:18px; font-weight:700; color:${v.headlineColor}; margin-bottom:4px; }
    .${uid('pct')}-product-price { font-size:24px; font-weight:800; color:${v.accentColor}; }
    .${uid('pct')}-feature { text-align:left; font-weight:500; color:${v.headlineColor}; }
    .${uid('pct')}-value { font-weight:600; color:#374151; }
    .${uid('pct')}-highlight { background:rgba(59,130,246,0.05); }
  </style>
  <div class="${uid('pct')}-container">
    <h2 class="${uid('pct')}-headline">${v.headline}</h2>
    <table class="${uid('pct')}-table">
      <thead>
        <tr>
          <th></th>
          <th class="${uid('pct')}-product"><div class="${uid('pct')}-product-name">${v.product1Name}</div><div class="${uid('pct')}-product-price">${v.product1Price}</div></th>
          <th class="${uid('pct')}-product ${uid('pct')}-highlight"><div class="${uid('pct')}-product-name">${v.product2Name}</div><div class="${uid('pct')}-product-price">${v.product2Price}</div></th>
          <th class="${uid('pct')}-product"><div class="${uid('pct')}-product-name">${v.product3Name}</div><div class="${uid('pct')}-product-price">${v.product3Price}</div></th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="${uid('pct')}-feature">${v.feature1}</td><td class="${uid('pct')}-value">${f1v[0] || ''}</td><td class="${uid('pct')}-value ${uid('pct')}-highlight">${f1v[1] || ''}</td><td class="${uid('pct')}-value">${f1v[2] || ''}</td></tr>
        <tr><td class="${uid('pct')}-feature">${v.feature2}</td><td class="${uid('pct')}-value">${f2v[0] || ''}</td><td class="${uid('pct')}-value ${uid('pct')}-highlight">${f2v[1] || ''}</td><td class="${uid('pct')}-value">${f2v[2] || ''}</td></tr>
        <tr><td class="${uid('pct')}-feature">${v.feature3}</td><td class="${uid('pct')}-value">${f3v[0] || ''}</td><td class="${uid('pct')}-value ${uid('pct')}-highlight">${f3v[1] || ''}</td><td class="${uid('pct')}-value">${f3v[2] || ''}</td></tr>
      </tbody>
    </table>
  </div>
</div>`;
    }
  },

  // 54. Bundle Deal Card
  {
    id: 'bundle-deal-card',
    name: 'Bundle Deal Card',
    category: 'Product',
    description: 'Product bundle promotion with savings highlight',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Bundle & Save' },
      { id: 'badgeText', label: 'Badge Text', type: 'text', defaultValue: 'SAVE 30%' },
      { id: 'product1Img', label: 'Product 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' },
      { id: 'product1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Smart Watch' },
      { id: 'product2Img', label: 'Product 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150&h=150&fit=crop' },
      { id: 'product2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Wireless Earbuds' },
      { id: 'product3Img', label: 'Product 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop' },
      { id: 'product3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Headphones' },
      { id: 'originalPrice', label: 'Original Price', type: 'text', defaultValue: '$599' },
      { id: 'bundlePrice', label: 'Bundle Price', type: 'text', defaultValue: '$419' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Get Bundle Deal' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#059669' },
    ],
    generateHtml: (v) => `<div class="${uid('bdc')}">
  <style>
    .${uid('bdc')} { padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('bdc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('bdc')}-card { max-width:500px; margin:0 auto; background:#fff; border-radius:20px; padding:32px; box-shadow:0 4px 24px rgba(0,0,0,0.08); border:2px solid ${v.accentColor}; position:relative; }
    .${uid('bdc')}-badge { position:absolute; top:-12px; right:24px; background:${v.accentColor}; color:#fff; padding:8px 16px; border-radius:20px; font-size:12px; font-weight:700; letter-spacing:1px; }
    .${uid('bdc')}-headline { font-size:24px; font-weight:700; color:${v.headlineColor}; text-align:center; margin-bottom:24px; }
    .${uid('bdc')}-products { display:flex; justify-content:center; align-items:center; gap:12px; margin-bottom:24px; }
    .${uid('bdc')}-product { text-align:center; }
    .${uid('bdc')}-product img { width:80px; height:80px; border-radius:12px; object-fit:cover; margin-bottom:8px; }
    .${uid('bdc')}-product-name { font-size:12px; color:#6b7280; }
    .${uid('bdc')}-plus { font-size:24px; font-weight:700; color:#d1d5db; }
    .${uid('bdc')}-pricing { text-align:center; margin-bottom:24px; }
    .${uid('bdc')}-original { font-size:18px; color:#9ca3af; text-decoration:line-through; }
    .${uid('bdc')}-bundle { font-size:36px; font-weight:800; color:${v.accentColor}; margin-left:12px; }
    .${uid('bdc')}-cta { display:block; width:100%; background:${v.accentColor}; color:#fff; padding:16px; border:none; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.3s; }
    .${uid('bdc')}-cta:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(5,150,105,0.4); }
  </style>
  <div class="${uid('bdc')}-card">
    <div class="${uid('bdc')}-badge">${v.badgeText}</div>
    <h2 class="${uid('bdc')}-headline">${v.headline}</h2>
    <div class="${uid('bdc')}-products">
      <div class="${uid('bdc')}-product"><img src="${v.product1Img}" alt="${v.product1Name}"/><div class="${uid('bdc')}-product-name">${v.product1Name}</div></div>
      <div class="${uid('bdc')}-plus">+</div>
      <div class="${uid('bdc')}-product"><img src="${v.product2Img}" alt="${v.product2Name}"/><div class="${uid('bdc')}-product-name">${v.product2Name}</div></div>
      <div class="${uid('bdc')}-plus">+</div>
      <div class="${uid('bdc')}-product"><img src="${v.product3Img}" alt="${v.product3Name}"/><div class="${uid('bdc')}-product-name">${v.product3Name}</div></div>
    </div>
    <div class="${uid('bdc')}-pricing">
      <span class="${uid('bdc')}-original">${v.originalPrice}</span>
      <span class="${uid('bdc')}-bundle">${v.bundlePrice}</span>
    </div>
    <button class="${uid('bdc')}-cta">${v.ctaText}</button>
  </div>
</div>`
  },

  // 55. Order Summary Card
  {
    id: 'order-summary-card',
    name: 'Order Summary Card',
    category: 'Product',
    description: 'Checkout order summary with line items and totals',
    thumbnail: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Order Summary' },
      { id: 'item1Name', label: 'Item 1 Name', type: 'text', defaultValue: 'Premium Headphones' },
      { id: 'item1Qty', label: 'Item 1 Qty', type: 'text', defaultValue: '1' },
      { id: 'item1Price', label: 'Item 1 Price', type: 'text', defaultValue: '$299.00' },
      { id: 'item2Name', label: 'Item 2 Name', type: 'text', defaultValue: 'Leather Case' },
      { id: 'item2Qty', label: 'Item 2 Qty', type: 'text', defaultValue: '2' },
      { id: 'item2Price', label: 'Item 2 Price', type: 'text', defaultValue: '$59.98' },
      { id: 'subtotal', label: 'Subtotal', type: 'text', defaultValue: '$358.98' },
      { id: 'shipping', label: 'Shipping', type: 'text', defaultValue: 'FREE' },
      { id: 'tax', label: 'Tax', type: 'text', defaultValue: '$28.72' },
      { id: 'total', label: 'Total', type: 'text', defaultValue: '$387.70' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'cardColor', label: 'Card Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#374151' },
    ],
    generateHtml: (v) => `<div class="${uid('osc')}">
  <style>
    .${uid('osc')} { padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('osc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('osc')}-card { max-width:400px; margin:0 auto; background:${v.cardColor}; border-radius:16px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.08); }
    .${uid('osc')}-headline { font-size:20px; font-weight:700; color:${v.headlineColor}; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid #e5e7eb; }
    .${uid('osc')}-items { margin-bottom:20px; }
    .${uid('osc')}-item { display:flex; justify-content:space-between; align-items:center; padding:12px 0; }
    .${uid('osc')}-item-left { display:flex; align-items:center; gap:8px; }
    .${uid('osc')}-item-name { font-size:14px; color:${v.textColor}; }
    .${uid('osc')}-item-qty { font-size:12px; color:#9ca3af; }
    .${uid('osc')}-item-price { font-size:14px; font-weight:600; color:${v.headlineColor}; }
    .${uid('osc')}-divider { height:1px; background:#e5e7eb; margin:8px 0; }
    .${uid('osc')}-row { display:flex; justify-content:space-between; padding:8px 0; font-size:14px; }
    .${uid('osc')}-row-label { color:${v.textColor}; }
    .${uid('osc')}-row-value { font-weight:500; color:${v.headlineColor}; }
    .${uid('osc')}-row-value.${uid('osc')}-free { color:#059669; }
    .${uid('osc')}-total { display:flex; justify-content:space-between; padding:16px 0 0; border-top:2px solid #e5e7eb; margin-top:8px; }
    .${uid('osc')}-total-label { font-size:16px; font-weight:600; color:${v.headlineColor}; }
    .${uid('osc')}-total-value { font-size:24px; font-weight:800; color:${v.headlineColor}; }
  </style>
  <div class="${uid('osc')}-card">
    <h2 class="${uid('osc')}-headline">${v.headline}</h2>
    <div class="${uid('osc')}-items">
      <div class="${uid('osc')}-item"><div class="${uid('osc')}-item-left"><span class="${uid('osc')}-item-name">${v.item1Name}</span><span class="${uid('osc')}-item-qty">×${v.item1Qty}</span></div><span class="${uid('osc')}-item-price">${v.item1Price}</span></div>
      <div class="${uid('osc')}-item"><div class="${uid('osc')}-item-left"><span class="${uid('osc')}-item-name">${v.item2Name}</span><span class="${uid('osc')}-item-qty">×${v.item2Qty}</span></div><span class="${uid('osc')}-item-price">${v.item2Price}</span></div>
    </div>
    <div class="${uid('osc')}-divider"></div>
    <div class="${uid('osc')}-row"><span class="${uid('osc')}-row-label">Subtotal</span><span class="${uid('osc')}-row-value">${v.subtotal}</span></div>
    <div class="${uid('osc')}-row"><span class="${uid('osc')}-row-label">Shipping</span><span class="${uid('osc')}-row-value ${uid('osc')}-free">${v.shipping}</span></div>
    <div class="${uid('osc')}-row"><span class="${uid('osc')}-row-label">Tax</span><span class="${uid('osc')}-row-value">${v.tax}</span></div>
    <div class="${uid('osc')}-total"><span class="${uid('osc')}-total-label">Total</span><span class="${uid('osc')}-total-value">${v.total}</span></div>
  </div>
</div>`
  },

  // 56. Shipping Options Selector
  {
    id: 'shipping-options-selector',
    name: 'Shipping Options Selector',
    category: 'Product',
    description: 'Interactive shipping method selection cards',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Shipping Method' },
      { id: 'option1Name', label: 'Option 1 Name', type: 'text', defaultValue: 'Standard Shipping' },
      { id: 'option1Time', label: 'Option 1 Time', type: 'text', defaultValue: '5-7 business days' },
      { id: 'option1Price', label: 'Option 1 Price', type: 'text', defaultValue: 'FREE' },
      { id: 'option2Name', label: 'Option 2 Name', type: 'text', defaultValue: 'Express Shipping' },
      { id: 'option2Time', label: 'Option 2 Time', type: 'text', defaultValue: '2-3 business days' },
      { id: 'option2Price', label: 'Option 2 Price', type: 'text', defaultValue: '$9.99' },
      { id: 'option3Name', label: 'Option 3 Name', type: 'text', defaultValue: 'Next Day Delivery' },
      { id: 'option3Time', label: 'Option 3 Time', type: 'text', defaultValue: '1 business day' },
      { id: 'option3Price', label: 'Option 3 Price', type: 'text', defaultValue: '$19.99' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#3b82f6' },
    ],
    generateHtml: (v) => `<div class="${uid('sos')}">
  <style>
    .${uid('sos')} { padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('sos')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('sos')}-container { max-width:500px; margin:0 auto; }
    .${uid('sos')}-headline { font-size:20px; font-weight:700; color:${v.headlineColor}; margin-bottom:20px; }
    .${uid('sos')}-options { display:flex; flex-direction:column; gap:12px; }
    .${uid('sos')}-option { display:flex; align-items:center; gap:16px; padding:20px; border:2px solid #e5e7eb; border-radius:12px; cursor:pointer; transition:all 0.2s; }
    .${uid('sos')}-option:hover { border-color:#d1d5db; }
    .${uid('sos')}-option.${uid('sos')}-selected { border-color:${v.accentColor}; background:rgba(59,130,246,0.05); }
    .${uid('sos')}-radio { width:20px; height:20px; border:2px solid #d1d5db; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .${uid('sos')}-option.${uid('sos')}-selected .${uid('sos')}-radio { border-color:${v.accentColor}; }
    .${uid('sos')}-radio-inner { width:10px; height:10px; background:${v.accentColor}; border-radius:50%; display:none; }
    .${uid('sos')}-option.${uid('sos')}-selected .${uid('sos')}-radio-inner { display:block; }
    .${uid('sos')}-info { flex:1; }
    .${uid('sos')}-name { font-size:16px; font-weight:600; color:${v.headlineColor}; margin-bottom:4px; }
    .${uid('sos')}-time { font-size:13px; color:#6b7280; }
    .${uid('sos')}-price { font-size:16px; font-weight:700; color:${v.headlineColor}; }
    .${uid('sos')}-price.${uid('sos')}-free { color:#059669; }
  </style>
  <div class="${uid('sos')}-container">
    <h2 class="${uid('sos')}-headline">${v.headline}</h2>
    <div class="${uid('sos')}-options">
      <div class="${uid('sos')}-option ${uid('sos')}-selected" onclick="this.parentElement.querySelectorAll('.${uid('sos')}-option').forEach(o=>o.classList.remove('${uid('sos')}-selected'));this.classList.add('${uid('sos')}-selected');">
        <div class="${uid('sos')}-radio"><div class="${uid('sos')}-radio-inner"></div></div>
        <div class="${uid('sos')}-info"><div class="${uid('sos')}-name">${v.option1Name}</div><div class="${uid('sos')}-time">${v.option1Time}</div></div>
        <div class="${uid('sos')}-price ${uid('sos')}-free">${v.option1Price}</div>
      </div>
      <div class="${uid('sos')}-option" onclick="this.parentElement.querySelectorAll('.${uid('sos')}-option').forEach(o=>o.classList.remove('${uid('sos')}-selected'));this.classList.add('${uid('sos')}-selected');">
        <div class="${uid('sos')}-radio"><div class="${uid('sos')}-radio-inner"></div></div>
        <div class="${uid('sos')}-info"><div class="${uid('sos')}-name">${v.option2Name}</div><div class="${uid('sos')}-time">${v.option2Time}</div></div>
        <div class="${uid('sos')}-price">${v.option2Price}</div>
      </div>
      <div class="${uid('sos')}-option" onclick="this.parentElement.querySelectorAll('.${uid('sos')}-option').forEach(o=>o.classList.remove('${uid('sos')}-selected'));this.classList.add('${uid('sos')}-selected');">
        <div class="${uid('sos')}-radio"><div class="${uid('sos')}-radio-inner"></div></div>
        <div class="${uid('sos')}-info"><div class="${uid('sos')}-name">${v.option3Name}</div><div class="${uid('sos')}-time">${v.option3Time}</div></div>
        <div class="${uid('sos')}-price">${v.option3Price}</div>
      </div>
    </div>
  </div>
</div>`
  },

  // 57. Trust Badges Strip
  {
    id: 'trust-badges-strip',
    name: 'Trust Badges Strip',
    category: 'Trust',
    description: 'Security and payment trust badges in a horizontal strip',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    fields: [
      { id: 'badge1Text', label: 'Badge 1 Text', type: 'text', defaultValue: 'Secure Checkout' },
      { id: 'badge2Text', label: 'Badge 2 Text', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'badge3Text', label: 'Badge 3 Text', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'badge4Text', label: 'Badge 4 Text', type: 'text', defaultValue: '24/7 Support' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#374151' },
      { id: 'iconColor', label: 'Icon Color', type: 'color', defaultValue: '#059669' },
    ],
    generateHtml: (v) => `<div class="${uid('tbs')}">
  <style>
    .${uid('tbs')} { padding:24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('tbs')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('tbs')}-container { max-width:1000px; margin:0 auto; display:flex; justify-content:center; flex-wrap:wrap; gap:32px; }
    .${uid('tbs')}-badge { display:flex; align-items:center; gap:10px; }
    .${uid('tbs')}-icon { width:40px; height:40px; background:${v.iconColor}; border-radius:50%; display:flex; align-items:center; justify-content:center; }
    .${uid('tbs')}-icon svg { width:20px; height:20px; color:#fff; }
    .${uid('tbs')}-text { font-size:14px; font-weight:600; color:${v.textColor}; }
  </style>
  <div class="${uid('tbs')}-container">
    <div class="${uid('tbs')}-badge">
      <div class="${uid('tbs')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
      <span class="${uid('tbs')}-text">${v.badge1Text}</span>
    </div>
    <div class="${uid('tbs')}-badge">
      <div class="${uid('tbs')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
      <span class="${uid('tbs')}-text">${v.badge2Text}</span>
    </div>
    <div class="${uid('tbs')}-badge">
      <div class="${uid('tbs')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
      <span class="${uid('tbs')}-text">${v.badge3Text}</span>
    </div>
    <div class="${uid('tbs')}-badge">
      <div class="${uid('tbs')}-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
      <span class="${uid('tbs')}-text">${v.badge4Text}</span>
    </div>
  </div>
</div>`
  },

  // 58. Product Specifications Table
  {
    id: 'product-specifications-table',
    name: 'Product Specifications Table',
    category: 'Product',
    description: 'Clean product specifications in a two-column layout',
    thumbnail: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Specifications' },
      { id: 'spec1Label', label: 'Spec 1 Label', type: 'text', defaultValue: 'Material' },
      { id: 'spec1Value', label: 'Spec 1 Value', type: 'text', defaultValue: 'Premium Aluminum' },
      { id: 'spec2Label', label: 'Spec 2 Label', type: 'text', defaultValue: 'Dimensions' },
      { id: 'spec2Value', label: 'Spec 2 Value', type: 'text', defaultValue: '12.5" x 8.2" x 0.6"' },
      { id: 'spec3Label', label: 'Spec 3 Label', type: 'text', defaultValue: 'Weight' },
      { id: 'spec3Value', label: 'Spec 3 Value', type: 'text', defaultValue: '2.8 lbs (1.27 kg)' },
      { id: 'spec4Label', label: 'Spec 4 Label', type: 'text', defaultValue: 'Display' },
      { id: 'spec4Value', label: 'Spec 4 Value', type: 'text', defaultValue: '13.3" Retina Display' },
      { id: 'spec5Label', label: 'Spec 5 Label', type: 'text', defaultValue: 'Battery Life' },
      { id: 'spec5Value', label: 'Spec 5 Value', type: 'text', defaultValue: 'Up to 18 hours' },
      { id: 'spec6Label', label: 'Spec 6 Label', type: 'text', defaultValue: 'Warranty' },
      { id: 'spec6Value', label: 'Spec 6 Value', type: 'text', defaultValue: '2 Year Limited' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#374151' },
    ],
    generateHtml: (v) => `<div class="${uid('pst')}">
  <style>
    .${uid('pst')} { padding:48px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('pst')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('pst')}-container { max-width:600px; margin:0 auto; }
    .${uid('pst')}-headline { font-size:24px; font-weight:700; color:${v.headlineColor}; margin-bottom:24px; }
    .${uid('pst')}-table { width:100%; }
    .${uid('pst')}-row { display:flex; border-bottom:1px solid #e5e7eb; }
    .${uid('pst')}-row:last-child { border-bottom:none; }
    .${uid('pst')}-label { flex:0 0 40%; padding:16px 16px 16px 0; font-size:14px; font-weight:500; color:#6b7280; }
    .${uid('pst')}-value { flex:1; padding:16px 0; font-size:14px; font-weight:500; color:${v.textColor}; }
  </style>
  <div class="${uid('pst')}-container">
    <h2 class="${uid('pst')}-headline">${v.headline}</h2>
    <div class="${uid('pst')}-table">
      <div class="${uid('pst')}-row"><span class="${uid('pst')}-label">${v.spec1Label}</span><span class="${uid('pst')}-value">${v.spec1Value}</span></div>
      <div class="${uid('pst')}-row"><span class="${uid('pst')}-label">${v.spec2Label}</span><span class="${uid('pst')}-value">${v.spec2Value}</span></div>
      <div class="${uid('pst')}-row"><span class="${uid('pst')}-label">${v.spec3Label}</span><span class="${uid('pst')}-value">${v.spec3Value}</span></div>
      <div class="${uid('pst')}-row"><span class="${uid('pst')}-label">${v.spec4Label}</span><span class="${uid('pst')}-value">${v.spec4Value}</span></div>
      <div class="${uid('pst')}-row"><span class="${uid('pst')}-label">${v.spec5Label}</span><span class="${uid('pst')}-value">${v.spec5Value}</span></div>
      <div class="${uid('pst')}-row"><span class="${uid('pst')}-label">${v.spec6Label}</span><span class="${uid('pst')}-value">${v.spec6Value}</span></div>
    </div>
  </div>
</div>`
  },

  // 59. Customer Review Card
  {
    id: 'customer-review-card',
    name: 'Customer Review Card',
    category: 'Testimonials',
    description: 'Individual customer review with avatar and verified badge',
    thumbnail: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=300&fit=crop',
    fields: [
      { id: 'reviewerImg', label: 'Reviewer Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { id: 'reviewerName', label: 'Reviewer Name', type: 'text', defaultValue: 'Michael Chen' },
      { id: 'verifiedText', label: 'Verified Text', type: 'text', defaultValue: 'Verified Purchase' },
      { id: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: '5' },
      { id: 'reviewTitle', label: 'Review Title', type: 'text', defaultValue: 'Exceeded my expectations!' },
      { id: 'reviewText', label: 'Review Text', type: 'textarea', defaultValue: 'This product is absolutely amazing. The quality is top-notch and it arrived faster than expected. I would highly recommend this to anyone looking for a premium experience.' },
      { id: 'reviewDate', label: 'Review Date', type: 'text', defaultValue: 'January 15, 2024' },
      { id: 'helpfulCount', label: 'Helpful Count', type: 'number', defaultValue: '24' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'headlineColor', label: 'Headline Color', type: 'color', defaultValue: '#111827' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#374151' },
      { id: 'starColor', label: 'Star Color', type: 'color', defaultValue: '#fbbf24' },
    ],
    generateHtml: (v) => {
      const stars = Array(5).fill(0).map((_, i) => i < parseInt(v.rating) ? 'filled' : 'empty').join(',');
      return `<div class="${uid('crc')}">
  <style>
    .${uid('crc')} { padding:32px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('crc')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('crc')}-card { max-width:600px; margin:0 auto; background:#fff; border-radius:16px; padding:24px; box-shadow:0 2px 12px rgba(0,0,0,0.08); }
    .${uid('crc')}-header { display:flex; align-items:center; gap:16px; margin-bottom:16px; }
    .${uid('crc')}-avatar { width:56px; height:56px; border-radius:50%; object-fit:cover; }
    .${uid('crc')}-info { flex:1; }
    .${uid('crc')}-name { font-size:16px; font-weight:600; color:${v.headlineColor}; }
    .${uid('crc')}-verified { display:inline-flex; align-items:center; gap:4px; font-size:12px; color:#059669; margin-top:4px; }
    .${uid('crc')}-verified svg { width:14px; height:14px; }
    .${uid('crc')}-stars { display:flex; gap:2px; }
    .${uid('crc')}-star { width:18px; height:18px; color:${v.starColor}; }
    .${uid('crc')}-star.${uid('crc')}-empty { color:#e5e7eb; }
    .${uid('crc')}-title { font-size:18px; font-weight:600; color:${v.headlineColor}; margin-bottom:8px; }
    .${uid('crc')}-text { font-size:14px; line-height:1.6; color:${v.textColor}; margin-bottom:16px; }
    .${uid('crc')}-footer { display:flex; justify-content:space-between; align-items:center; padding-top:16px; border-top:1px solid #f3f4f6; }
    .${uid('crc')}-date { font-size:13px; color:#9ca3af; }
    .${uid('crc')}-helpful { display:flex; align-items:center; gap:8px; font-size:13px; color:#6b7280; cursor:pointer; }
    .${uid('crc')}-helpful:hover { color:${v.headlineColor}; }
    .${uid('crc')}-helpful svg { width:16px; height:16px; }
  </style>
  <div class="${uid('crc')}-card">
    <div class="${uid('crc')}-header">
      <img class="${uid('crc')}-avatar" src="${v.reviewerImg}" alt="${v.reviewerName}"/>
      <div class="${uid('crc')}-info">
        <div class="${uid('crc')}-name">${v.reviewerName}</div>
        <div class="${uid('crc')}-verified"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>${v.verifiedText}</div>
      </div>
      <div class="${uid('crc')}-stars">
        ${stars.split(',').map(s => `<svg class="${uid('crc')}-star ${s === 'empty' ? uid('crc') + '-empty' : ''}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`).join('')}
      </div>
    </div>
    <h3 class="${uid('crc')}-title">${v.reviewTitle}</h3>
    <p class="${uid('crc')}-text">${v.reviewText}</p>
    <div class="${uid('crc')}-footer">
      <span class="${uid('crc')}-date">${v.reviewDate}</span>
      <div class="${uid('crc')}-helpful"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>${v.helpfulCount} found this helpful</div>
    </div>
  </div>
</div>`;
    }
  },

  // 60. Promotional Banner with Timer
  {
    id: 'promo-banner-timer',
    name: 'Promotional Banner with Timer',
    category: 'Banner',
    description: 'Full-width promotional banner with countdown and CTA',
    thumbnail: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=300&fit=crop',
    fields: [
      { id: 'bgImage', label: 'Background Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'BLACK FRIDAY SALE' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Up to 60% off on all products' },
      { id: 'promoCode', label: 'Promo Code', type: 'text', defaultValue: 'BLACKFRI60' },
      { id: 'hours', label: 'Hours', type: 'number', defaultValue: '47' },
      { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: '59' },
      { id: 'seconds', label: 'Seconds', type: 'number', defaultValue: '59' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Shop the Sale' },
      { id: 'ctaUrl', label: 'CTA URL', type: 'url', defaultValue: '#' },
      { id: 'overlayColor', label: 'Overlay Color', type: 'color', defaultValue: '#000000' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#ef4444' },
    ],
    generateHtml: (v) => `<div class="${uid('pbt')}">
  <style>
    .${uid('pbt')} { position:relative; min-height:400px; font-family:'Inter',-apple-system,sans-serif; overflow:hidden; }
    .${uid('pbt')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('pbt')}-bg { position:absolute; inset:0; background-image:url('${v.bgImage}'); background-size:cover; background-position:center; }
    .${uid('pbt')}-overlay { position:absolute; inset:0; background:${v.overlayColor}; opacity:0.7; }
    .${uid('pbt')}-content { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:400px; padding:48px 24px; text-align:center; }
    .${uid('pbt')}-headline { font-size:48px; font-weight:900; color:${v.textColor}; letter-spacing:4px; margin-bottom:12px; }
    .${uid('pbt')}-sub { font-size:20px; color:${v.textColor}; opacity:0.9; margin-bottom:24px; }
    .${uid('pbt')}-code { display:inline-block; background:${v.accentColor}; color:#fff; padding:8px 24px; border-radius:8px; font-size:18px; font-weight:700; letter-spacing:2px; margin-bottom:24px; }
    .${uid('pbt')}-timer { display:flex; gap:16px; margin-bottom:32px; }
    .${uid('pbt')}-unit { background:rgba(255,255,255,0.15); backdrop-filter:blur(8px); border-radius:12px; padding:16px 20px; min-width:80px; }
    .${uid('pbt')}-number { font-size:32px; font-weight:700; color:${v.textColor}; }
    .${uid('pbt')}-label { font-size:11px; font-weight:600; color:${v.textColor}; opacity:0.7; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }
    .${uid('pbt')}-cta { display:inline-block; background:${v.textColor}; color:${v.overlayColor}; padding:16px 40px; border-radius:50px; font-size:16px; font-weight:700; text-decoration:none; transition:all 0.3s; }
    .${uid('pbt')}-cta:hover { transform:scale(1.05); box-shadow:0 8px 32px rgba(255,255,255,0.3); }
  </style>
  <div class="${uid('pbt')}-bg"></div>
  <div class="${uid('pbt')}-overlay"></div>
  <div class="${uid('pbt')}-content">
    <h2 class="${uid('pbt')}-headline">${v.headline}</h2>
    <p class="${uid('pbt')}-sub">${v.subheadline}</p>
    <div class="${uid('pbt')}-code">Use code: ${v.promoCode}</div>
    <div class="${uid('pbt')}-timer">
      <div class="${uid('pbt')}-unit"><div class="${uid('pbt')}-number">${v.hours}</div><div class="${uid('pbt')}-label">Hours</div></div>
      <div class="${uid('pbt')}-unit"><div class="${uid('pbt')}-number">${v.minutes}</div><div class="${uid('pbt')}-label">Minutes</div></div>
      <div class="${uid('pbt')}-unit"><div class="${uid('pbt')}-number">${v.seconds}</div><div class="${uid('pbt')}-label">Seconds</div></div>
    </div>
    <a href="${v.ctaUrl}" class="${uid('pbt')}-cta">${v.ctaText}</a>
  </div>
</div>`
  },

  // ========== 21ST.DEV PREMIUM COMPONENTS ==========

  // 61. Glowing Effect (Aceternity) - Interactive mouse-following glow border
  {
    id: 'glowing-effect-aceternity',
    name: 'Glowing Effect Card',
    category: 'Interactive',
    description: 'Interactive card with mouse-following conic gradient glow border effect',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    fields: [
      { id: 'title', label: 'Card Title', type: 'text', defaultValue: 'Glowing Effect' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Hover over this card to see the beautiful mouse-following glow effect around the border.' },
      { id: 'glowColor1', label: 'Glow Color 1', type: 'color', defaultValue: '#dd7bbb' },
      { id: 'glowColor2', label: 'Glow Color 2', type: 'color', defaultValue: '#4169e1' },
      { id: 'glowColor3', label: 'Glow Color 3', type: 'color', defaultValue: '#9b59b6' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'borderRadius', label: 'Border Radius', type: 'number', defaultValue: '16' },
    ],
    generateHtml: (v) => `<div class="${uid('glow')}">
  <style>
    .${uid('glow')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; display:flex; justify-content:center; align-items:center; min-height:400px; }
    .${uid('glow')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('glow')}-card { position:relative; width:100%; max-width:400px; padding:3px; border-radius:${v.borderRadius}px; background:transparent; }
    .${uid('glow')}-card::before {
      content:''; position:absolute; inset:0; border-radius:${v.borderRadius}px; padding:2px;
      background:conic-gradient(from var(--glow-angle, 0deg), ${v.glowColor1}, ${v.glowColor2}, ${v.glowColor3}, ${v.glowColor1});
      -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite:xor; mask-composite:exclude;
      opacity:var(--glow-active, 0); transition:opacity 0.3s ease;
    }
    .${uid('glow')}-card:hover::before { opacity:1; }
    .${uid('glow')}-inner { background:${v.cardBg}; border-radius:calc(${v.borderRadius}px - 2px); padding:32px; position:relative; z-index:1; }
    .${uid('glow')}-title { font-size:24px; font-weight:700; color:${v.textColor}; margin-bottom:12px; }
    .${uid('glow')}-desc { font-size:15px; line-height:1.6; color:${v.textColor}; opacity:0.7; }
    .${uid('glow')}-glow { position:absolute; inset:-2px; border-radius:${v.borderRadius}px; background:conic-gradient(from var(--glow-angle, 0deg), ${v.glowColor1}40, ${v.glowColor2}40, ${v.glowColor3}40, ${v.glowColor1}40); filter:blur(20px); opacity:var(--glow-active, 0); transition:opacity 0.3s ease; z-index:0; }
    .${uid('glow')}-card:hover .${uid('glow')}-glow { opacity:0.6; }
  </style>
  <div class="${uid('glow')}-card" onmousemove="(function(e,el){const rect=el.getBoundingClientRect();const x=e.clientX-rect.left-rect.width/2;const y=e.clientY-rect.top-rect.height/2;const angle=Math.atan2(y,x)*180/Math.PI+90;el.style.setProperty('--glow-angle',angle+'deg');el.style.setProperty('--glow-active','1');})(event,this)" onmouseleave="this.style.setProperty('--glow-active','0')">
    <div class="${uid('glow')}-glow"></div>
    <div class="${uid('glow')}-inner">
      <h3 class="${uid('glow')}-title">${v.title}</h3>
      <p class="${uid('glow')}-desc">${v.description}</p>
    </div>
  </div>
</div>`
  },

  // 62. Logos3 - Auto-scrolling logo carousel (shadcnblocks)
  {
    id: 'logos3-carousel',
    name: 'Logo Carousel - Auto Scroll',
    category: 'Brand',
    description: 'Smooth auto-scrolling logo carousel with masked edges',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    fields: [
      { id: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'Trusted by industry leaders' },
      { id: 'logo1', label: 'Logo 1 URL', type: 'image', defaultValue: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg' },
      { id: 'logo2', label: 'Logo 2 URL', type: 'image', defaultValue: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg' },
      { id: 'logo3', label: 'Logo 3 URL', type: 'image', defaultValue: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apple.svg' },
      { id: 'logo4', label: 'Logo 4 URL', type: 'image', defaultValue: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg' },
      { id: 'logo5', label: 'Logo 5 URL', type: 'image', defaultValue: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/netflix.svg' },
      { id: 'logo6', label: 'Logo 6 URL', type: 'image', defaultValue: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'speed', label: 'Scroll Speed (seconds)', type: 'number', defaultValue: '30' },
    ],
    generateHtml: (v) => `<div class="${uid('logo3')}">
  <style>
    .${uid('logo3')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('logo3')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('logo3')}-heading { text-align:center; font-size:14px; font-weight:500; color:${v.textColor}; opacity:0.6; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:32px; }
    .${uid('logo3')}-wrapper { position:relative; overflow:hidden; mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
    .${uid('logo3')}-track { display:flex; animation:${uid('logo3')}-scroll ${v.speed}s linear infinite; width:max-content; }
    .${uid('logo3')}-track:hover { animation-play-state:paused; }
    .${uid('logo3')}-item { display:flex; align-items:center; justify-content:center; padding:0 40px; min-width:180px; height:60px; }
    .${uid('logo3')}-item img { height:32px; width:auto; max-width:120px; object-fit:contain; filter:grayscale(100%); opacity:0.5; transition:all 0.3s ease; }
    .${uid('logo3')}-item:hover img { filter:grayscale(0%); opacity:1; }
    @keyframes ${uid('logo3')}-scroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
  </style>
  <p class="${uid('logo3')}-heading">${v.heading}</p>
  <div class="${uid('logo3')}-wrapper">
    <div class="${uid('logo3')}-track">
      <div class="${uid('logo3')}-item"><img src="${v.logo1}" alt="Logo 1"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo2}" alt="Logo 2"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo3}" alt="Logo 3"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo4}" alt="Logo 4"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo5}" alt="Logo 5"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo6}" alt="Logo 6"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo1}" alt="Logo 1"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo2}" alt="Logo 2"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo3}" alt="Logo 3"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo4}" alt="Logo 4"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo5}" alt="Logo 5"/></div>
      <div class="${uid('logo3')}-item"><img src="${v.logo6}" alt="Logo 6"/></div>
    </div>
  </div>
</div>`
  },

  // 63. Animated Testimonials (Aceternity)
  {
    id: 'animated-testimonials-aceternity',
    name: 'Animated Testimonials Carousel',
    category: 'Testimonials',
    description: 'Testimonials with 3D image rotation and word-by-word text animation',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    fields: [
      { id: 'name1', label: 'Name 1', type: 'text', defaultValue: 'Sarah Chen' },
      { id: 'role1', label: 'Role 1', type: 'text', defaultValue: 'Product Manager at TechCorp' },
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'This product has completely transformed how our team collaborates. The intuitive interface and powerful features make it an essential tool.' },
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
      { id: 'name2', label: 'Name 2', type: 'text', defaultValue: 'Michael Roberts' },
      { id: 'role2', label: 'Role 2', type: 'text', defaultValue: 'CEO at StartupXYZ' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'We have seen a 40% increase in productivity since implementing this solution. The support team is incredibly responsive.' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
      { id: 'name3', label: 'Name 3', type: 'text', defaultValue: 'Emily Watson' },
      { id: 'role3', label: 'Role 3', type: 'text', defaultValue: 'Design Lead at Creative Co' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'The attention to detail is remarkable. Every feature feels thoughtfully designed with the user in mind.' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#000000' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('animtest')}">
  <style>
    .${uid('animtest')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('animtest')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('animtest')}-container { max-width:1000px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
    @media(max-width:768px) { .${uid('animtest')}-container { grid-template-columns:1fr; } }
    .${uid('animtest')}-images { position:relative; height:400px; perspective:1000px; }
    .${uid('animtest')}-img { position:absolute; width:280px; height:350px; border-radius:20px; object-fit:cover; box-shadow:0 25px 50px rgba(0,0,0,0.5); transition:all 0.6s cubic-bezier(0.23,1,0.32,1); cursor:pointer; }
    .${uid('animtest')}-img:nth-child(1) { z-index:3; transform:rotate(-3deg) translateZ(0); left:50%; margin-left:-140px; }
    .${uid('animtest')}-img:nth-child(2) { z-index:2; transform:rotate(2deg) translateX(-30px) translateZ(-50px) scale(0.95); opacity:0.7; left:50%; margin-left:-140px; }
    .${uid('animtest')}-img:nth-child(3) { z-index:1; transform:rotate(-1deg) translateX(30px) translateZ(-100px) scale(0.9); opacity:0.5; left:50%; margin-left:-140px; }
    .${uid('animtest')}-content { color:${v.textColor}; }
    .${uid('animtest')}-quote { font-size:28px; font-weight:500; line-height:1.4; margin-bottom:32px; }
    .${uid('animtest')}-quote span { display:inline-block; opacity:0; animation:${uid('animtest')}-fadeWord 0.5s ease forwards; }
    .${uid('animtest')}-author { display:flex; flex-direction:column; gap:4px; }
    .${uid('animtest')}-name { font-size:18px; font-weight:600; }
    .${uid('animtest')}-role { font-size:14px; opacity:0.6; }
    .${uid('animtest')}-nav { display:flex; gap:12px; margin-top:32px; }
    .${uid('animtest')}-btn { width:44px; height:44px; border-radius:50%; border:1px solid rgba(255,255,255,0.2); background:transparent; color:${v.textColor}; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s; }
    .${uid('animtest')}-btn:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.4); }
    @keyframes ${uid('animtest')}-fadeWord { to { opacity:1; } }
  </style>
  <div class="${uid('animtest')}-container">
    <div class="${uid('animtest')}-images">
      <img class="${uid('animtest')}-img" src="${v.image1}" alt="${v.name1}"/>
      <img class="${uid('animtest')}-img" src="${v.image2}" alt="${v.name2}"/>
      <img class="${uid('animtest')}-img" src="${v.image3}" alt="${v.name3}"/>
    </div>
    <div class="${uid('animtest')}-content">
      <p class="${uid('animtest')}-quote">${(v.quote1 || '').split(' ').map((word, i) => `<span style="animation-delay:${i * 0.05}s">${word}</span>`).join(' ')}</p>
      <div class="${uid('animtest')}-author">
        <span class="${uid('animtest')}-name">${v.name1}</span>
        <span class="${uid('animtest')}-role">${v.role1}</span>
      </div>
      <div class="${uid('animtest')}-nav">
        <button class="${uid('animtest')}-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
        <button class="${uid('animtest')}-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
      </div>
    </div>
  </div>
</div>`
  },

  // 64. Testimonials Columns (efferd)
  {
    id: 'testimonials-columns-efferd',
    name: 'Testimonials Columns Scroll',
    category: 'Testimonials',
    description: 'Three-column testimonials with vertical auto-scroll animation',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    fields: [
      { id: 'badge', label: 'Badge Text', type: 'text', defaultValue: 'Testimonials' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'What our users say' },
      { id: 'subheading', label: 'Subheading', type: 'text', defaultValue: 'See what our customers have to say about us.' },
      { id: 't1name', label: 'T1 Name', type: 'text', defaultValue: 'Briana Patton' },
      { id: 't1role', label: 'T1 Role', type: 'text', defaultValue: 'Operations Manager' },
      { id: 't1text', label: 'T1 Text', type: 'textarea', defaultValue: 'This revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive.' },
      { id: 't1img', label: 'T1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { id: 't2name', label: 'T2 Name', type: 'text', defaultValue: 'Bilal Ahmed' },
      { id: 't2role', label: 'T2 Role', type: 'text', defaultValue: 'IT Manager' },
      { id: 't2text', label: 'T2 Text', type: 'textarea', defaultValue: 'Implementation was smooth and quick. The customizable interface made team training effortless.' },
      { id: 't2img', label: 'T2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { id: 't3name', label: 'T3 Name', type: 'text', defaultValue: 'Saman Malik' },
      { id: 't3role', label: 'T3 Role', type: 'text', defaultValue: 'Customer Support Lead' },
      { id: 't3text', label: 'T3 Text', type: 'textarea', defaultValue: 'The support team is exceptional, guiding us through setup and providing ongoing assistance.' },
      { id: 't3img', label: 'T3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('tcol')}">
  <style>
    .${uid('tcol')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; overflow:hidden; }
    .${uid('tcol')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('tcol')}-header { text-align:center; max-width:540px; margin:0 auto 48px; }
    .${uid('tcol')}-badge { display:inline-block; border:1px solid #e5e7eb; padding:6px 16px; border-radius:8px; font-size:14px; color:${v.textColor}; margin-bottom:20px; }
    .${uid('tcol')}-heading { font-size:clamp(28px,5vw,48px); font-weight:700; color:${v.textColor}; margin-bottom:12px; }
    .${uid('tcol')}-subheading { font-size:16px; color:${v.textColor}; opacity:0.7; }
    .${uid('tcol')}-grid { display:flex; justify-content:center; gap:24px; max-height:700px; mask-image:linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); -webkit-mask-image:linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); }
    @media(max-width:768px) { .${uid('tcol')}-grid { flex-direction:column; max-height:none; mask-image:none; } .${uid('tcol')}-col { animation:none !important; } }
    .${uid('tcol')}-col { display:flex; flex-direction:column; gap:20px; animation:${uid('tcol')}-scroll 20s linear infinite; }
    .${uid('tcol')}-col:nth-child(2) { animation-duration:25s; animation-direction:reverse; }
    .${uid('tcol')}-col:nth-child(3) { animation-duration:22s; }
    .${uid('tcol')}-card { background:#f9fafb; border-radius:16px; padding:24px; width:320px; flex-shrink:0; }
    .${uid('tcol')}-text { font-size:15px; line-height:1.6; color:${v.textColor}; margin-bottom:16px; }
    .${uid('tcol')}-author { display:flex; align-items:center; gap:12px; }
    .${uid('tcol')}-avatar { width:44px; height:44px; border-radius:50%; object-fit:cover; }
    .${uid('tcol')}-name { font-size:14px; font-weight:600; color:${v.textColor}; }
    .${uid('tcol')}-role { font-size:13px; color:${v.textColor}; opacity:0.6; }
    @keyframes ${uid('tcol')}-scroll { 0% { transform:translateY(0); } 100% { transform:translateY(-50%); } }
  </style>
  <div class="${uid('tcol')}-header">
    <div class="${uid('tcol')}-badge">${v.badge}</div>
    <h2 class="${uid('tcol')}-heading">${v.heading}</h2>
    <p class="${uid('tcol')}-subheading">${v.subheading}</p>
  </div>
  <div class="${uid('tcol')}-grid">
    <div class="${uid('tcol')}-col">
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t1text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t1img}" alt="${v.t1name}"/><div><div class="${uid('tcol')}-name">${v.t1name}</div><div class="${uid('tcol')}-role">${v.t1role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t2text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t2img}" alt="${v.t2name}"/><div><div class="${uid('tcol')}-name">${v.t2name}</div><div class="${uid('tcol')}-role">${v.t2role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t3text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t3img}" alt="${v.t3name}"/><div><div class="${uid('tcol')}-name">${v.t3name}</div><div class="${uid('tcol')}-role">${v.t3role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t1text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t1img}" alt="${v.t1name}"/><div><div class="${uid('tcol')}-name">${v.t1name}</div><div class="${uid('tcol')}-role">${v.t1role}</div></div></div></div>
    </div>
    <div class="${uid('tcol')}-col">
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t2text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t2img}" alt="${v.t2name}"/><div><div class="${uid('tcol')}-name">${v.t2name}</div><div class="${uid('tcol')}-role">${v.t2role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t3text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t3img}" alt="${v.t3name}"/><div><div class="${uid('tcol')}-name">${v.t3name}</div><div class="${uid('tcol')}-role">${v.t3role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t1text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t1img}" alt="${v.t1name}"/><div><div class="${uid('tcol')}-name">${v.t1name}</div><div class="${uid('tcol')}-role">${v.t1role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t2text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t2img}" alt="${v.t2name}"/><div><div class="${uid('tcol')}-name">${v.t2name}</div><div class="${uid('tcol')}-role">${v.t2role}</div></div></div></div>
    </div>
    <div class="${uid('tcol')}-col">
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t3text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t3img}" alt="${v.t3name}"/><div><div class="${uid('tcol')}-name">${v.t3name}</div><div class="${uid('tcol')}-role">${v.t3role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t1text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t1img}" alt="${v.t1name}"/><div><div class="${uid('tcol')}-name">${v.t1name}</div><div class="${uid('tcol')}-role">${v.t1role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t2text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t2img}" alt="${v.t2name}"/><div><div class="${uid('tcol')}-name">${v.t2name}</div><div class="${uid('tcol')}-role">${v.t2role}</div></div></div></div>
      <div class="${uid('tcol')}-card"><p class="${uid('tcol')}-text">${v.t3text}</p><div class="${uid('tcol')}-author"><img class="${uid('tcol')}-avatar" src="${v.t3img}" alt="${v.t3name}"/><div><div class="${uid('tcol')}-name">${v.t3name}</div><div class="${uid('tcol')}-role">${v.t3role}</div></div></div></div>
    </div>
  </div>
</div>`
  },

  // 65. Shuffle Grid (vaib215)
  {
    id: 'shuffle-grid-vaib',
    name: 'Shuffle Grid Hero',
    category: 'Hero',
    description: 'Hero section with animated shuffling image grid',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    fields: [
      { id: 'badge', label: 'Badge Text', type: 'text', defaultValue: 'Better every day' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: "Let's change it up a bit" },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in error repellat voluptatibus ad.' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Find a class' },
      { id: 'ctaUrl', label: 'CTA URL', type: 'url', defaultValue: '#' },
      { id: 'img1', label: 'Image 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop' },
      { id: 'img2', label: 'Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop' },
      { id: 'img3', label: 'Image 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop' },
      { id: 'img4', label: 'Image 4', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop' },
      { id: 'img5', label: 'Image 5', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop' },
      { id: 'img6', label: 'Image 6', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=200&h=200&fit=crop' },
      { id: 'img7', label: 'Image 7', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=200&h=200&fit=crop' },
      { id: 'img8', label: 'Image 8', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f5f5f5' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'btnColor', label: 'Button Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('shuf')}">
  <style>
    .${uid('shuf')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('shuf')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('shuf')}-container { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
    @media(max-width:900px) { .${uid('shuf')}-container { grid-template-columns:1fr; } }
    .${uid('shuf')}-content { }
    .${uid('shuf')}-badge { font-size:14px; font-weight:500; color:${v.textColor}; opacity:0.6; margin-bottom:16px; }
    .${uid('shuf')}-heading { font-size:clamp(32px,5vw,52px); font-weight:700; color:${v.textColor}; line-height:1.1; margin-bottom:20px; }
    .${uid('shuf')}-desc { font-size:16px; line-height:1.6; color:${v.textColor}; opacity:0.7; margin-bottom:28px; max-width:400px; }
    .${uid('shuf')}-cta { display:inline-block; background:${v.btnColor}; color:#fff; padding:14px 28px; border-radius:8px; font-size:15px; font-weight:600; text-decoration:none; transition:all 0.3s; }
    .${uid('shuf')}-cta:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.2); }
    .${uid('shuf')}-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
    .${uid('shuf')}-img { width:100%; aspect-ratio:1; object-fit:cover; border-radius:8px; transition:all 0.5s cubic-bezier(0.23,1,0.32,1); }
    .${uid('shuf')}-img:hover { transform:scale(1.05); z-index:1; }
  </style>
  <div class="${uid('shuf')}-container">
    <div class="${uid('shuf')}-content">
      <div class="${uid('shuf')}-badge">${v.badge}</div>
      <h2 class="${uid('shuf')}-heading">${v.heading}</h2>
      <p class="${uid('shuf')}-desc">${v.description}</p>
      <a href="${v.ctaUrl}" class="${uid('shuf')}-cta">${v.ctaText}</a>
    </div>
    <div class="${uid('shuf')}-grid" id="${uid('shuf')}-grid">
      <img class="${uid('shuf')}-img" src="${v.img1}" alt="Grid 1"/>
      <img class="${uid('shuf')}-img" src="${v.img2}" alt="Grid 2"/>
      <img class="${uid('shuf')}-img" src="${v.img3}" alt="Grid 3"/>
      <img class="${uid('shuf')}-img" src="${v.img4}" alt="Grid 4"/>
      <img class="${uid('shuf')}-img" src="${v.img5}" alt="Grid 5"/>
      <img class="${uid('shuf')}-img" src="${v.img6}" alt="Grid 6"/>
      <img class="${uid('shuf')}-img" src="${v.img7}" alt="Grid 7"/>
      <img class="${uid('shuf')}-img" src="${v.img8}" alt="Grid 8"/>
      <img class="${uid('shuf')}-img" src="${v.img1}" alt="Grid 9"/>
      <img class="${uid('shuf')}-img" src="${v.img2}" alt="Grid 10"/>
      <img class="${uid('shuf')}-img" src="${v.img3}" alt="Grid 11"/>
      <img class="${uid('shuf')}-img" src="${v.img4}" alt="Grid 12"/>
      <img class="${uid('shuf')}-img" src="${v.img5}" alt="Grid 13"/>
      <img class="${uid('shuf')}-img" src="${v.img6}" alt="Grid 14"/>
      <img class="${uid('shuf')}-img" src="${v.img7}" alt="Grid 15"/>
      <img class="${uid('shuf')}-img" src="${v.img8}" alt="Grid 16"/>
    </div>
  </div>
  <script>(function(){const grid=document.getElementById('${uid('shuf')}-grid');if(!grid)return;const imgs=Array.from(grid.children);function shuffle(){const i=Math.floor(Math.random()*imgs.length);const j=Math.floor(Math.random()*imgs.length);if(i!==j){const temp=imgs[i].src;imgs[i].style.opacity='0';setTimeout(()=>{imgs[i].src=imgs[j].src;imgs[i].style.opacity='1';},250);imgs[j].style.opacity='0';setTimeout(()=>{imgs[j].src=temp;imgs[j].style.opacity='1';},250);}}setInterval(shuffle,2000);})();</script>
</div>`
  },

  // 66. Bento Grid (kokonutd)
  {
    id: 'bento-grid-kokonutd',
    name: 'Bento Grid Features',
    category: 'Features',
    description: 'Modern bento-style grid with status badges and hover effects',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    fields: [
      { id: 'item1Title', label: 'Item 1 Title', type: 'text', defaultValue: 'Analytics Dashboard' },
      { id: 'item1Desc', label: 'Item 1 Description', type: 'textarea', defaultValue: 'Real-time metrics and insights to drive your business decisions' },
      { id: 'item1Status', label: 'Item 1 Status', type: 'text', defaultValue: 'Live' },
      { id: 'item1Tag', label: 'Item 1 Tags', type: 'text', defaultValue: 'Statistics, Reports, AI' },
      { id: 'item2Title', label: 'Item 2 Title', type: 'text', defaultValue: 'Smart Automation' },
      { id: 'item2Desc', label: 'Item 2 Description', type: 'textarea', defaultValue: 'Automate workflows and save countless hours' },
      { id: 'item2Status', label: 'Item 2 Status', type: 'text', defaultValue: 'Beta' },
      { id: 'item3Title', label: 'Item 3 Title', type: 'text', defaultValue: 'Team Collaboration' },
      { id: 'item3Desc', label: 'Item 3 Description', type: 'textarea', defaultValue: 'Work together seamlessly with built-in tools' },
      { id: 'item3Status', label: 'Item 3 Status', type: 'text', defaultValue: 'Active' },
      { id: 'item4Title', label: 'Item 4 Title', type: 'text', defaultValue: 'Security First' },
      { id: 'item4Desc', label: 'Item 4 Description', type: 'textarea', defaultValue: 'Enterprise-grade security for your data' },
      { id: 'item4Status', label: 'Item 4 Status', type: 'text', defaultValue: 'Updated' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f8fafc' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#3b82f6' },
    ],
    generateHtml: (v) => `<div class="${uid('bento')}">
  <style>
    .${uid('bento')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('bento')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('bento')}-grid { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto auto; gap:16px; }
    @media(max-width:768px) { .${uid('bento')}-grid { grid-template-columns:1fr; } .${uid('bento')}-card.${uid('bento')}-wide { grid-column:span 1; } }
    .${uid('bento')}-card { background:${v.cardBg}; border-radius:16px; padding:24px; transition:all 0.3s ease; border:1px solid #e5e7eb; cursor:pointer; }
    .${uid('bento')}-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,0.08); }
    .${uid('bento')}-wide { grid-column:span 2; }
    .${uid('bento')}-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
    .${uid('bento')}-icon { width:40px; height:40px; border-radius:10px; background:${v.accentColor}15; display:flex; align-items:center; justify-content:center; color:${v.accentColor}; }
    .${uid('bento')}-status { font-size:11px; font-weight:600; padding:4px 10px; border-radius:20px; background:#dcfce7; color:#166534; }
    .${uid('bento')}-status.beta { background:#fef3c7; color:#92400e; }
    .${uid('bento')}-status.updated { background:#dbeafe; color:#1e40af; }
    .${uid('bento')}-title { font-size:18px; font-weight:600; color:${v.textColor}; margin-bottom:8px; }
    .${uid('bento')}-desc { font-size:14px; line-height:1.5; color:${v.textColor}; opacity:0.7; margin-bottom:16px; }
    .${uid('bento')}-tags { display:flex; flex-wrap:wrap; gap:6px; }
    .${uid('bento')}-tag { font-size:11px; padding:4px 10px; border-radius:6px; background:#f3f4f6; color:${v.textColor}; opacity:0.8; }
  </style>
  <div class="${uid('bento')}-grid">
    <div class="${uid('bento')}-card ${uid('bento')}-wide">
      <div class="${uid('bento')}-header">
        <div class="${uid('bento')}-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg></div>
        <span class="${uid('bento')}-status">${v.item1Status}</span>
      </div>
      <h3 class="${uid('bento')}-title">${v.item1Title}</h3>
      <p class="${uid('bento')}-desc">${v.item1Desc}</p>
      <div class="${uid('bento')}-tags">${v.item1Tag.split(',').map(t => `<span class="${uid('bento')}-tag">${t.trim()}</span>`).join('')}</div>
    </div>
    <div class="${uid('bento')}-card">
      <div class="${uid('bento')}-header">
        <div class="${uid('bento')}-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5"/></svg></div>
        <span class="${uid('bento')}-status beta">${v.item2Status}</span>
      </div>
      <h3 class="${uid('bento')}-title">${v.item2Title}</h3>
      <p class="${uid('bento')}-desc">${v.item2Desc}</p>
    </div>
    <div class="${uid('bento')}-card">
      <div class="${uid('bento')}-header">
        <div class="${uid('bento')}-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
        <span class="${uid('bento')}-status">${v.item3Status}</span>
      </div>
      <h3 class="${uid('bento')}-title">${v.item3Title}</h3>
      <p class="${uid('bento')}-desc">${v.item3Desc}</p>
    </div>
    <div class="${uid('bento')}-card">
      <div class="${uid('bento')}-header">
        <div class="${uid('bento')}-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
        <span class="${uid('bento')}-status updated">${v.item4Status}</span>
      </div>
      <h3 class="${uid('bento')}-title">${v.item4Title}</h3>
      <p class="${uid('bento')}-desc">${v.item4Desc}</p>
    </div>
  </div>
</div>`
  },

  // 67. Feature with Image (tommyjepsen)
  {
    id: 'feature-with-image-tommy',
    name: 'Feature Block with Image',
    category: 'Features',
    description: 'Clean two-column feature block with image and text content',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    fields: [
      { id: 'badge', label: 'Badge Text', type: 'text', defaultValue: 'Platform' },
      { id: 'heading', label: 'Heading', type: 'text', defaultValue: 'This is the start of something new' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.' },
      { id: 'image', label: 'Feature Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop' },
      { id: 'imagePosition', label: 'Image Position (left/right)', type: 'text', defaultValue: 'left' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'badgeColor', label: 'Badge Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('fwi')}">
  <style>
    .${uid('fwi')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('fwi')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('fwi')}-container { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
    @media(max-width:768px) { .${uid('fwi')}-container { grid-template-columns:1fr; } }
    .${uid('fwi')}-image-wrap { order:${v.imagePosition === 'right' ? '2' : '1'}; }
    @media(max-width:768px) { .${uid('fwi')}-image-wrap { order:1; } }
    .${uid('fwi')}-image { width:100%; border-radius:16px; object-fit:cover; aspect-ratio:4/3; }
    .${uid('fwi')}-content { order:${v.imagePosition === 'right' ? '1' : '2'}; }
    @media(max-width:768px) { .${uid('fwi')}-content { order:2; } }
    .${uid('fwi')}-badge { display:inline-block; background:${v.badgeColor}; color:#fff; padding:6px 14px; border-radius:6px; font-size:13px; font-weight:600; margin-bottom:20px; }
    .${uid('fwi')}-heading { font-size:clamp(28px,4vw,40px); font-weight:700; color:${v.textColor}; line-height:1.2; margin-bottom:20px; }
    .${uid('fwi')}-desc { font-size:16px; line-height:1.7; color:${v.textColor}; opacity:0.75; }
  </style>
  <div class="${uid('fwi')}-container">
    <div class="${uid('fwi')}-image-wrap">
      <img class="${uid('fwi')}-image" src="${v.image}" alt="Feature"/>
    </div>
    <div class="${uid('fwi')}-content">
      <span class="${uid('fwi')}-badge">${v.badge}</span>
      <h2 class="${uid('fwi')}-heading">${v.heading}</h2>
      <p class="${uid('fwi')}-desc">${v.description}</p>
    </div>
  </div>
</div>`
  },

  // 68. Feature Section - Steps (ayushmxxn/Serenity UI)
  {
    id: 'feature-steps-serenity',
    name: 'Feature Steps Section',
    category: 'Features',
    description: 'Auto-advancing feature steps with progress indicators and images',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    fields: [
      { id: 'heading', label: 'Main Heading', type: 'text', defaultValue: 'Your Journey Starts Here' },
      { id: 'step1Title', label: 'Step 1 Title', type: 'text', defaultValue: 'Learn the Basics' },
      { id: 'step1Desc', label: 'Step 1 Description', type: 'textarea', defaultValue: 'Start your journey by learning the fundamental concepts and principles.' },
      { id: 'step1Image', label: 'Step 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop' },
      { id: 'step2Title', label: 'Step 2 Title', type: 'text', defaultValue: 'Deep Dive' },
      { id: 'step2Desc', label: 'Step 2 Description', type: 'textarea', defaultValue: 'Dive deep into advanced topics and build your expertise.' },
      { id: 'step2Image', label: 'Step 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop' },
      { id: 'step3Title', label: 'Step 3 Title', type: 'text', defaultValue: 'Build Projects' },
      { id: 'step3Desc', label: 'Step 3 Description', type: 'textarea', defaultValue: 'Apply your knowledge by building real-world projects.' },
      { id: 'step3Image', label: 'Step 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#000000' },
    ],
    generateHtml: (v) => `<div class="${uid('fsteps')}" id="${uid('fsteps')}">
  <style>
    .${uid('fsteps')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('fsteps')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('fsteps')}-container { max-width:1100px; margin:0 auto; }
    .${uid('fsteps')}-heading { font-size:clamp(32px,5vw,48px); font-weight:700; color:${v.textColor}; text-align:center; margin-bottom:60px; }
    .${uid('fsteps')}-content { display:grid; grid-template-columns:1fr 1.2fr; gap:60px; align-items:center; }
    @media(max-width:768px) { .${uid('fsteps')}-content { grid-template-columns:1fr; } }
    .${uid('fsteps')}-steps { display:flex; flex-direction:column; gap:24px; }
    .${uid('fsteps')}-step { display:flex; gap:16px; cursor:pointer; padding:16px; border-radius:12px; transition:all 0.3s; }
    .${uid('fsteps')}-step:hover { background:#f9fafb; }
    .${uid('fsteps')}-step.active { background:#f3f4f6; }
    .${uid('fsteps')}-num { width:32px; height:32px; border-radius:50%; border:2px solid #e5e7eb; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:600; color:${v.textColor}; opacity:0.5; flex-shrink:0; transition:all 0.3s; }
    .${uid('fsteps')}-step.active .${uid('fsteps')}-num { background:${v.accentColor}; color:#fff; border-color:${v.accentColor}; opacity:1; }
    .${uid('fsteps')}-step.done .${uid('fsteps')}-num { background:${v.accentColor}; color:#fff; border-color:${v.accentColor}; opacity:0.6; }
    .${uid('fsteps')}-info { flex:1; }
    .${uid('fsteps')}-title { font-size:18px; font-weight:600; color:${v.textColor}; margin-bottom:4px; opacity:0.5; transition:opacity 0.3s; }
    .${uid('fsteps')}-step.active .${uid('fsteps')}-title, .${uid('fsteps')}-step.done .${uid('fsteps')}-title { opacity:1; }
    .${uid('fsteps')}-desc { font-size:14px; line-height:1.5; color:${v.textColor}; opacity:0.5; transition:opacity 0.3s; }
    .${uid('fsteps')}-step.active .${uid('fsteps')}-desc { opacity:0.7; }
    .${uid('fsteps')}-image-wrap { position:relative; border-radius:20px; overflow:hidden; aspect-ratio:4/3; }
    .${uid('fsteps')}-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 0.5s ease; }
    .${uid('fsteps')}-img.active { opacity:1; }
  </style>
  <div class="${uid('fsteps')}-container">
    <h2 class="${uid('fsteps')}-heading">${v.heading}</h2>
    <div class="${uid('fsteps')}-content">
      <div class="${uid('fsteps')}-steps">
        <div class="${uid('fsteps')}-step active" data-step="0">
          <div class="${uid('fsteps')}-num">1</div>
          <div class="${uid('fsteps')}-info"><h3 class="${uid('fsteps')}-title">${v.step1Title}</h3><p class="${uid('fsteps')}-desc">${v.step1Desc}</p></div>
        </div>
        <div class="${uid('fsteps')}-step" data-step="1">
          <div class="${uid('fsteps')}-num">2</div>
          <div class="${uid('fsteps')}-info"><h3 class="${uid('fsteps')}-title">${v.step2Title}</h3><p class="${uid('fsteps')}-desc">${v.step2Desc}</p></div>
        </div>
        <div class="${uid('fsteps')}-step" data-step="2">
          <div class="${uid('fsteps')}-num">3</div>
          <div class="${uid('fsteps')}-info"><h3 class="${uid('fsteps')}-title">${v.step3Title}</h3><p class="${uid('fsteps')}-desc">${v.step3Desc}</p></div>
        </div>
      </div>
      <div class="${uid('fsteps')}-image-wrap">
        <img class="${uid('fsteps')}-img active" src="${v.step1Image}" alt="Step 1"/>
        <img class="${uid('fsteps')}-img" src="${v.step2Image}" alt="Step 2"/>
        <img class="${uid('fsteps')}-img" src="${v.step3Image}" alt="Step 3"/>
      </div>
    </div>
  </div>
  <script>(function(){const el=document.getElementById('${uid('fsteps')}');if(!el)return;const steps=el.querySelectorAll('.${uid('fsteps')}-step');const imgs=el.querySelectorAll('.${uid('fsteps')}-img');let current=0;function setActive(i){steps.forEach((s,idx)=>{s.classList.remove('active','done');if(idx<i)s.classList.add('done');if(idx===i)s.classList.add('active');});imgs.forEach((img,idx)=>{img.classList.toggle('active',idx===i);});current=i;}steps.forEach(s=>{s.addEventListener('click',()=>setActive(parseInt(s.dataset.step)));});setInterval(()=>{setActive((current+1)%3);},4000);})();</script>
</div>`
  },

  // 69. Features 8 - Bento Style (tailark)
  {
    id: 'features-8-tailark',
    name: 'Features Bento Cards',
    category: 'Features',
    description: 'Stunning bento-style features with stats, charts, and user avatars',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    fields: [
      { id: 'stat', label: 'Big Stat', type: 'text', defaultValue: '100%' },
      { id: 'statTitle', label: 'Stat Title', type: 'text', defaultValue: 'Customizable' },
      { id: 'feat1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Secure by default' },
      { id: 'feat1Desc', label: 'Feature 1 Desc', type: 'textarea', defaultValue: 'Enterprise-grade security with end-to-end encryption and compliance.' },
      { id: 'feat2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Faster than light' },
      { id: 'feat2Desc', label: 'Feature 2 Desc', type: 'textarea', defaultValue: 'Optimized performance delivering lightning-fast response times.' },
      { id: 'feat3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Keep your team connected' },
      { id: 'feat3Desc', label: 'Feature 3 Desc', type: 'textarea', defaultValue: 'Real-time collaboration tools that keep everyone in sync.' },
      { id: 'user1', label: 'User 1 Name', type: 'text', defaultValue: 'Likeur' },
      { id: 'user1Img', label: 'User 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' },
      { id: 'user2', label: 'User 2 Name', type: 'text', defaultValue: 'M. Irung' },
      { id: 'user2Img', label: 'User 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' },
      { id: 'user3', label: 'User 3 Name', type: 'text', defaultValue: 'B. Ng' },
      { id: 'user3Img', label: 'User 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#fafafa' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('f8')}">
  <style>
    .${uid('f8')} { padding:60px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('f8')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('f8')}-grid { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto auto; gap:16px; }
    @media(max-width:768px) { .${uid('f8')}-grid { grid-template-columns:1fr; } .${uid('f8')}-card.lg { grid-column:span 1; } }
    .${uid('f8')}-card { background:${v.cardBg}; border-radius:20px; padding:28px; transition:all 0.3s; }
    .${uid('f8')}-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,0.06); }
    .${uid('f8')}-card.lg { grid-column:span 1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; min-height:220px; }
    .${uid('f8')}-stat { font-size:64px; font-weight:700; color:${v.textColor}; line-height:1; margin-bottom:8px; }
    .${uid('f8')}-stat-title { font-size:20px; font-weight:600; color:${v.textColor}; }
    .${uid('f8')}-icon { width:48px; height:48px; margin-bottom:16px; color:${v.textColor}; opacity:0.3; }
    .${uid('f8')}-title { font-size:18px; font-weight:600; color:${v.textColor}; margin-bottom:8px; }
    .${uid('f8')}-desc { font-size:14px; line-height:1.5; color:${v.textColor}; opacity:0.65; }
    .${uid('f8')}-chart { height:80px; margin-top:16px; display:flex; align-items:flex-end; gap:4px; }
    .${uid('f8')}-bar { flex:1; background:linear-gradient(to top, #e5e7eb, #d1d5db); border-radius:4px; animation:${uid('f8')}-grow 1s ease forwards; }
    .${uid('f8')}-users { display:flex; flex-direction:column; gap:8px; margin-top:16px; }
    .${uid('f8')}-user { display:flex; align-items:center; gap:10px; background:#fff; padding:8px 12px; border-radius:20px; }
    .${uid('f8')}-avatar { width:28px; height:28px; border-radius:50%; object-fit:cover; }
    .${uid('f8')}-name { font-size:13px; font-weight:500; color:${v.textColor}; }
    @keyframes ${uid('f8')}-grow { from { height:0; } to { height:var(--h); } }
  </style>
  <div class="${uid('f8')}-grid">
    <div class="${uid('f8')}-card lg">
      <div class="${uid('f8')}-stat">${v.stat}</div>
      <div class="${uid('f8')}-stat-title">${v.statTitle}</div>
    </div>
    <div class="${uid('f8')}-card">
      <svg class="${uid('f8')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <h3 class="${uid('f8')}-title">${v.feat1Title}</h3>
      <p class="${uid('f8')}-desc">${v.feat1Desc}</p>
    </div>
    <div class="${uid('f8')}-card">
      <svg class="${uid('f8')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      <h3 class="${uid('f8')}-title">${v.feat2Title}</h3>
      <p class="${uid('f8')}-desc">${v.feat2Desc}</p>
      <div class="${uid('f8')}-chart">
        <div class="${uid('f8')}-bar" style="--h:30%"></div><div class="${uid('f8')}-bar" style="--h:50%"></div><div class="${uid('f8')}-bar" style="--h:40%"></div>
        <div class="${uid('f8')}-bar" style="--h:70%"></div><div class="${uid('f8')}-bar" style="--h:45%"></div><div class="${uid('f8')}-bar" style="--h:80%"></div>
        <div class="${uid('f8')}-bar" style="--h:60%"></div><div class="${uid('f8')}-bar" style="--h:90%"></div><div class="${uid('f8')}-bar" style="--h:75%"></div>
      </div>
    </div>
    <div class="${uid('f8')}-card">
      <svg class="${uid('f8')}-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <h3 class="${uid('f8')}-title">${v.feat3Title}</h3>
      <p class="${uid('f8')}-desc">${v.feat3Desc}</p>
      <div class="${uid('f8')}-users">
        <div class="${uid('f8')}-user"><img class="${uid('f8')}-avatar" src="${v.user1Img}" alt="${v.user1}"/><span class="${uid('f8')}-name">${v.user1}</span></div>
        <div class="${uid('f8')}-user"><img class="${uid('f8')}-avatar" src="${v.user2Img}" alt="${v.user2}"/><span class="${uid('f8')}-name">${v.user2}</span></div>
        <div class="${uid('f8')}-user"><img class="${uid('f8')}-avatar" src="${v.user3Img}" alt="${v.user3}"/><span class="${uid('f8')}-name">${v.user3}</span></div>
      </div>
    </div>
  </div>
</div>`
  },

  // 70. Hero Section 5 - Animated Roadmap (ravikatiyar)
  {
    id: 'hero-roadmap-ravi',
    name: 'Hero with Animated Roadmap',
    category: 'Hero',
    description: 'Hero section with animated milestone roadmap visualization',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    fields: [
      { id: 'headingStart', label: 'Heading Start', type: 'text', defaultValue: 'Stay ahead with a' },
      { id: 'headingHighlight', label: 'Heading Highlight', type: 'text', defaultValue: 'clear' },
      { id: 'headingEnd', label: 'Heading End', type: 'text', defaultValue: 'product plan' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Visualize your roadmap, assign tasks, and hit every milestone—faster and smarter.' },
      { id: 'cta1Text', label: 'CTA 1 Text', type: 'text', defaultValue: "Get started - it's free!" },
      { id: 'cta1Url', label: 'CTA 1 URL', type: 'url', defaultValue: '#' },
      { id: 'cta2Text', label: 'CTA 2 Text', type: 'text', defaultValue: 'See how it works' },
      { id: 'cta2Url', label: 'CTA 2 URL', type: 'url', defaultValue: '#' },
      { id: 'mile1', label: 'Milestone 1', type: 'text', defaultValue: 'Kick-off' },
      { id: 'mile2', label: 'Milestone 2', type: 'text', defaultValue: 'Design' },
      { id: 'mile3', label: 'Milestone 3', type: 'text', defaultValue: 'Development' },
      { id: 'mile4', label: 'Milestone 4', type: 'text', defaultValue: 'Launch' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'highlightBg', label: 'Highlight Background', type: 'color', defaultValue: '#fef3c7' },
      { id: 'btnColor', label: 'Button Color', type: 'color', defaultValue: '#1a1a1a' },
    ],
    generateHtml: (v) => `<div class="${uid('hrm')}">
  <style>
    .${uid('hrm')} { padding:80px 24px; background:${v.bgColor}; font-family:'Inter',-apple-system,sans-serif; }
    .${uid('hrm')} * { box-sizing:border-box; margin:0; padding:0; }
    .${uid('hrm')}-container { max-width:1000px; margin:0 auto; text-align:center; }
    .${uid('hrm')}-heading { font-size:clamp(32px,6vw,56px); font-weight:700; color:${v.textColor}; line-height:1.1; margin-bottom:24px; }
    .${uid('hrm')}-highlight { background:${v.highlightBg}; padding:4px 12px; border-radius:8px; }
    .${uid('hrm')}-desc { font-size:18px; line-height:1.6; color:${v.textColor}; opacity:0.7; max-width:600px; margin:0 auto 32px; }
    .${uid('hrm')}-btns { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; margin-bottom:60px; }
    .${uid('hrm')}-btn { padding:14px 28px; border-radius:8px; font-size:15px; font-weight:600; text-decoration:none; transition:all 0.3s; }
    .${uid('hrm')}-btn.primary { background:${v.btnColor}; color:#fff; }
    .${uid('hrm')}-btn.primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.2); }
    .${uid('hrm')}-btn.secondary { background:transparent; color:${v.textColor}; border:1px solid #e5e7eb; }
    .${uid('hrm')}-btn.secondary:hover { border-color:#d1d5db; background:#f9fafb; }
    .${uid('hrm')}-roadmap { position:relative; max-width:700px; margin:0 auto; padding:40px 0; }
    .${uid('hrm')}-map { width:100%; max-width:600px; margin:0 auto; display:block; opacity:0.15; }
    .${uid('hrm')}-path { position:absolute; inset:0; }
    .${uid('hrm')}-path svg { width:100%; height:100%; }
    .${uid('hrm')}-mile { position:absolute; display:flex; align-items:center; gap:8px; animation:${uid('hrm')}-pop 0.5s ease forwards; opacity:0; }
    .${uid('hrm')}-dot { width:14px; height:14px; border-radius:50%; border:3px solid; }
    .${uid('hrm')}-dot.done { background:#22c55e; border-color:#22c55e; }
    .${uid('hrm')}-dot.progress { background:#3b82f6; border-color:#3b82f6; }
    .${uid('hrm')}-dot.pending { background:#fff; border-color:#e5e7eb; }
    .${uid('hrm')}-label { background:#fff; padding:6px 14px; border-radius:20px; font-size:13px; font-weight:500; color:${v.textColor}; box-shadow:0 2px 8px rgba(0,0,0,0.1); white-space:nowrap; }
    .${uid('hrm')}-mile:nth-child(1) { left:10%; top:75%; animation-delay:0.1s; }
    .${uid('hrm')}-mile:nth-child(2) { left:25%; top:20%; animation-delay:0.3s; }
    .${uid('hrm')}-mile:nth-child(3) { left:60%; top:50%; animation-delay:0.5s; }
    .${uid('hrm')}-mile:nth-child(4) { right:10%; top:15%; animation-delay:0.7s; }
    @keyframes ${uid('hrm')}-pop { to { opacity:1; } }
    .${uid('hrm')}-pin { position:absolute; right:20%; top:35%; width:40px; animation:${uid('hrm')}-bounce 2s ease infinite; }
    @keyframes ${uid('hrm')}-bounce { 0%, 100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  </style>
  <div class="${uid('hrm')}-container">
    <h1 class="${uid('hrm')}-heading">${v.headingStart} <span class="${uid('hrm')}-highlight">${v.headingHighlight}</span> ${v.headingEnd}</h1>
    <p class="${uid('hrm')}-desc">${v.description}</p>
    <div class="${uid('hrm')}-btns">
      <a href="${v.cta1Url}" class="${uid('hrm')}-btn primary">${v.cta1Text}</a>
      <a href="${v.cta2Url}" class="${uid('hrm')}-btn secondary">${v.cta2Text}</a>
    </div>
    <div class="${uid('hrm')}-roadmap">
      <svg class="${uid('hrm')}-map" viewBox="0 0 400 200" fill="none"><path d="M20 180 Q100 180 120 100 T220 80 T320 60 T380 40" stroke="#e5e7eb" stroke-width="3" stroke-dasharray="8 4" fill="none"/></svg>
      <svg class="${uid('hrm')}-pin" viewBox="0 0 24 32"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#ef4444"/></svg>
      <div class="${uid('hrm')}-mile"><span class="${uid('hrm')}-dot done"></span><span class="${uid('hrm')}-label">${v.mile1}</span></div>
      <div class="${uid('hrm')}-mile"><span class="${uid('hrm')}-dot done"></span><span class="${uid('hrm')}-label">${v.mile2}</span></div>
      <div class="${uid('hrm')}-mile"><span class="${uid('hrm')}-dot progress"></span><span class="${uid('hrm')}-label">${v.mile3}</span></div>
      <div class="${uid('hrm')}-mile"><span class="${uid('hrm')}-dot pending"></span><span class="${uid('hrm')}-label">${v.mile4}</span></div>
    </div>
  </div>
</div>`
  },

];

// Categories with counts - auto-calculated
const getCategoryCounts = () => {
  const counts: Record<string, number> = {};
  sectionsData.forEach(s => {
    counts[s.category] = (counts[s.category] || 0) + 1;
  });
  return counts;
};

const categoryCounts = getCategoryCounts();

export const categories = [
  { id: 'all', name: 'All', count: sectionsData.length },
  { id: 'Announcement', name: 'Announcement', count: categoryCounts['Announcement'] || 0 },
  { id: 'Trust', name: 'Trust', count: categoryCounts['Trust'] || 0 },
  { id: 'Features', name: 'Features', count: categoryCounts['Features'] || 0 },
  { id: 'Testimonials', name: 'Testimonials', count: categoryCounts['Testimonials'] || 0 },
  { id: 'CTA', name: 'CTA', count: categoryCounts['CTA'] || 0 },
  { id: 'FAQ', name: 'FAQ', count: categoryCounts['FAQ'] || 0 },
  { id: 'Hero', name: 'Hero', count: categoryCounts['Hero'] || 0 },
  { id: 'Brand', name: 'Brand', count: categoryCounts['Brand'] || 0 },
  { id: 'Product', name: 'Product', count: categoryCounts['Product'] || 0 },
  { id: 'Divider', name: 'Divider', count: categoryCounts['Divider'] || 0 },
  { id: 'Countdown', name: 'Countdown', count: categoryCounts['Countdown'] || 0 },
  { id: 'Gallery', name: 'Gallery', count: categoryCounts['Gallery'] || 0 },
  { id: 'Pricing', name: 'Pricing', count: categoryCounts['Pricing'] || 0 },
  { id: 'Story', name: 'Story', count: categoryCounts['Story'] || 0 },
  { id: 'Contact', name: 'Contact', count: categoryCounts['Contact'] || 0 },
  { id: 'Social', name: 'Social', count: categoryCounts['Social'] || 0 },
  { id: 'Banner', name: 'Banner', count: categoryCounts['Banner'] || 0 },
  { id: 'Collection', name: 'Collection', count: categoryCounts['Collection'] || 0 },
  { id: 'Footer', name: 'Footer', count: categoryCounts['Footer'] || 0 },
  { id: 'Interactive', name: 'Interactive', count: categoryCounts['Interactive'] || 0 },
];
