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
    id: 'trust-review-elegant',
    name: 'Trust - Review Score',
    category: 'Trust',
    description: 'Elegant review display with star rating',
    thumbnail: '',
    fields: [
      { id: 'rating', label: 'Rating', type: 'text', defaultValue: '4.9 / 5' },
      { id: 'count', label: 'Review Count', type: 'text', defaultValue: 'from 2,847 reviews' },
      { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'Based on verified customer reviews' },
    ],
    generateHtml: (v) => `<div class="${uid('trev')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#ffffff 50%,#f8f8f8 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('trev')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('trev')}-wrap { max-width: 600px; margin: 0 auto; padding: 64px 32px; text-align: center; }
    .${uid('trev')}-stars { font-size: 28px; letter-spacing: 8px; margin-bottom: 20px; background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 50%, #D4AF37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 2px 4px rgba(212,175,55,0.3)); }
    .${uid('trev')}-score { display: flex; align-items: baseline; justify-content: center; gap: 8px; margin-bottom: 12px; }
    .${uid('trev')}-score strong { font-size: 32px; font-weight: 300; color: #1a1a1a; letter-spacing: -0.02em; }
    .${uid('trev')}-score span { font-size: 15px; color: #666; }
    .${uid('trev')}-sub { font-size: 13px; color: #999; letter-spacing: 0.05em; }
  </style>
  <div class="${uid('trev')}-wrap">
    <div class="${uid('trev')}-stars">★★★★★</div>
    <div class="${uid('trev')}-score"><strong>${v.rating}</strong><span>${v.count}</span></div>
    <p class="${uid('trev')}-sub">${v.subtitle}</p>
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
    id: 'features-numbered-premium',
    name: 'Features - Numbered',
    category: 'Features',
    description: 'Numbered features with premium styling',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Premium Materials' },
      { id: 'feature1Desc', label: 'Feature 1 Description', type: 'textarea', defaultValue: 'Sourced from the finest suppliers worldwide, each piece meets our exacting standards for quality and durability.' },
      { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Expert Craftsmanship' },
      { id: 'feature2Desc', label: 'Feature 2 Description', type: 'textarea', defaultValue: 'Handcrafted by skilled artisans with decades of experience, ensuring every detail is perfect.' },
      { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', defaultValue: 'Timeless Design' },
      { id: 'feature3Desc', label: 'Feature 3 Description', type: 'textarea', defaultValue: 'Classic aesthetics that transcend trends, designed to remain relevant for generations.' },
    ],
    generateHtml: (v) => `<div class="${uid('fnump')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fnump')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fnump')}-wrap { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }
    .${uid('fnump')} h2 { font-size: 42px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 80px; letter-spacing: -0.02em; }
    .${uid('fnump')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 64px; }
    .${uid('fnump')}-item { position: relative; padding-left: 0; }
    .${uid('fnump')}-num {
      font-size: 64px; font-weight: 200; color: #f0f0f0; line-height: 1;
      position: absolute; top: -20px; left: 0; z-index: 0;
      background: linear-gradient(180deg, #e8e8e8 0%, #f5f5f5 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .${uid('fnump')}-item h3 { font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; position: relative; z-index: 1; padding-top: 40px; }
    .${uid('fnump')}-item p { font-size: 15px; line-height: 1.7; color: #666; position: relative; z-index: 1; }
    @media (max-width: 768px) { .${uid('fnump')}-grid { grid-template-columns: 1fr; gap: 48px; } }
  </style>
  <div class="${uid('fnump')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('fnump')}-grid">
      <div class="${uid('fnump')}-item"><span class="${uid('fnump')}-num">01</span><h3>${v.feature1Title}</h3><p>${v.feature1Desc}</p></div>
      <div class="${uid('fnump')}-item"><span class="${uid('fnump')}-num">02</span><h3>${v.feature2Title}</h3><p>${v.feature2Desc}</p></div>
      <div class="${uid('fnump')}-item"><span class="${uid('fnump')}-num">03</span><h3>${v.feature3Title}</h3><p>${v.feature3Desc}</p></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'features-split-elegant',
    name: 'Features - Split Layout',
    category: 'Features',
    description: 'Elegant split with feature list',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Designed for Excellence' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Every detail matters. From concept to creation, we obsess over quality to deliver products that exceed expectations.' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Precision Engineering' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Sustainable Materials' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Lifetime Warranty' },
      { id: 'feature4', label: 'Feature 4', type: 'text', defaultValue: 'Global Shipping' },
    ],
    generateHtml: (v) => `<div class="${uid('fsplit')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fsplit')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fsplit')}-wrap { max-width: 1200px; margin: 0 auto; padding: 100px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
    .${uid('fsplit')}-content h2 { font-size: 40px; font-weight: 300; color: #1a1a1a; line-height: 1.2; margin-bottom: 24px; letter-spacing: -0.02em; }
    .${uid('fsplit')}-content p { font-size: 17px; line-height: 1.7; color: #666; }
    .${uid('fsplit')}-list { list-style: none; }
    .${uid('fsplit')}-list li {
      font-size: 16px; color: #1a1a1a; padding: 20px 0; border-bottom: 1px solid #eee;
      display: flex; align-items: center; gap: 16px;
      transition: all 0.3s ease;
    }
    .${uid('fsplit')}-list li:hover { padding-left: 12px; }
    .${uid('fsplit')}-list li::before { content: '→'; color: #D4AF37; font-size: 18px; }
    @media (max-width: 768px) { .${uid('fsplit')}-wrap { grid-template-columns: 1fr; gap: 48px; } }
  </style>
  <div class="${uid('fsplit')}-wrap">
    <div class="${uid('fsplit')}-content">
      <h2>${v.headline}</h2>
      <p>${v.description}</p>
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
    id: 'testimonial-elegant-center',
    name: 'Testimonial - Elegant',
    category: 'Testimonials',
    description: 'Centered testimonial with premium styling',
    thumbnail: '',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'The attention to detail is remarkable. Every piece feels like it was made specifically for me. This is what true luxury should feel like.' },
      { id: 'author', label: 'Author Name', type: 'text', defaultValue: 'Alexandra Chen' },
      { id: 'title', label: 'Author Title', type: 'text', defaultValue: 'Verified Buyer' },
    ],
    generateHtml: (v) => `<div class="${uid('testec')}" style="background:linear-gradient(135deg,#fafafa 0%,#fff 50%,#fafafa 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('testec')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('testec')}-wrap { max-width: 800px; margin: 0 auto; padding: 100px 48px; text-align: center; }
    .${uid('testec')}-stars { font-size: 20px; letter-spacing: 6px; margin-bottom: 32px; background: linear-gradient(135deg, #D4AF37, #F5E7A3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .${uid('testec')} blockquote { font-size: 26px; font-weight: 300; line-height: 1.6; color: #1a1a1a; font-style: italic; margin-bottom: 40px; letter-spacing: -0.01em; }
    .${uid('testec')}-author strong { display: block; font-size: 15px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; letter-spacing: 0.05em; }
    .${uid('testec')}-author span { font-size: 13px; color: #999; letter-spacing: 0.1em; text-transform: uppercase; }
  </style>
  <div class="${uid('testec')}-wrap">
    <div class="${uid('testec')}-stars">★★★★★</div>
    <blockquote>"${v.quote}"</blockquote>
    <div class="${uid('testec')}-author">
      <strong>${v.author}</strong>
      <span>${v.title}</span>
    </div>
  </div>
</div>`
  },
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
  {
    id: 'testimonial-scrolling',
    name: 'Testimonial - Scrolling',
    category: 'Testimonials',
    description: 'Scrolling testimonial ticker',
    thumbnail: '',
    fields: [
      { id: 'quote1', label: 'Quote 1', type: 'text', defaultValue: '"Absolutely love it!" — Sarah M.' },
      { id: 'quote2', label: 'Quote 2', type: 'text', defaultValue: '"Best purchase ever" — Mike R.' },
      { id: 'quote3', label: 'Quote 3', type: 'text', defaultValue: '"Exceptional quality" — Emma L.' },
      { id: 'quote4', label: 'Quote 4', type: 'text', defaultValue: '"Highly recommend" — James K.' },
      { id: 'speed', label: 'Speed (seconds)', type: 'number', defaultValue: '30' },
    ],
    generateHtml: (v) => `<div class="${uid('tscroll')}" style="background:#000;overflow:hidden;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tscroll')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tscroll')}-track { display: flex; animation: ${uid('tscroll')}-scroll ${v.speed}s linear infinite; width: max-content; }
    .${uid('tscroll')}-item { display: flex; align-items: center; gap: 24px; padding: 24px 40px; white-space: nowrap; }
    .${uid('tscroll')}-item span { font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.8); font-style: italic; letter-spacing: 0.02em; }
    .${uid('tscroll')}-star { color: #D4AF37; font-size: 16px; }
    @keyframes ${uid('tscroll')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('tscroll')}-track">
    <div class="${uid('tscroll')}-item"><span>${v.quote1}</span><span class="${uid('tscroll')}-star">★</span></div>
    <div class="${uid('tscroll')}-item"><span>${v.quote2}</span><span class="${uid('tscroll')}-star">★</span></div>
    <div class="${uid('tscroll')}-item"><span>${v.quote3}</span><span class="${uid('tscroll')}-star">★</span></div>
    <div class="${uid('tscroll')}-item"><span>${v.quote4}</span><span class="${uid('tscroll')}-star">★</span></div>
    <div class="${uid('tscroll')}-item"><span>${v.quote1}</span><span class="${uid('tscroll')}-star">★</span></div>
    <div class="${uid('tscroll')}-item"><span>${v.quote2}</span><span class="${uid('tscroll')}-star">★</span></div>
    <div class="${uid('tscroll')}-item"><span>${v.quote3}</span><span class="${uid('tscroll')}-star">★</span></div>
    <div class="${uid('tscroll')}-item"><span>${v.quote4}</span><span class="${uid('tscroll')}-star">★</span></div>
  </div>
</div>`
  },

  // ========== PREMIUM CTA ==========
  {
    id: 'cta-newsletter-minimal',
    name: 'CTA - Newsletter',
    category: 'CTA',
    description: 'Minimal newsletter signup',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Stay in the Know' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Subscribe for exclusive access to new releases and special offers.' },
      { id: 'placeholder', label: 'Input Placeholder', type: 'text', defaultValue: 'Enter your email' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Subscribe' },
    ],
    generateHtml: (v) => `<div class="${uid('ctanl')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctanl')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctanl')}-wrap { max-width: 600px; margin: 0 auto; padding: 80px 32px; text-align: center; }
    .${uid('ctanl')} h2 { font-size: 32px; font-weight: 300; color: #1a1a1a; margin-bottom: 16px; letter-spacing: -0.02em; }
    .${uid('ctanl')} p { font-size: 16px; color: #666; margin-bottom: 32px; }
    .${uid('ctanl')}-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; }
    .${uid('ctanl')}-form input {
      flex: 1; padding: 16px 20px; border: 1px solid #e0e0e0; border-radius: 8px;
      font-size: 15px; outline: none; transition: all 0.3s ease;
    }
    .${uid('ctanl')}-form input:focus { border-color: #1a1a1a; }
    .${uid('ctanl')}-form button {
      padding: 16px 32px; background: #1a1a1a; color: #fff; border: none; border-radius: 8px;
      font-size: 14px; font-weight: 600; letter-spacing: 0.05em; cursor: pointer;
      transition: all 0.3s ease;
    }
    .${uid('ctanl')}-form button:hover { background: #000; transform: translateY(-2px); }
  </style>
  <div class="${uid('ctanl')}-wrap">
    <h2>${v.headline}</h2>
    <p>${v.description}</p>
    <div class="${uid('ctanl')}-form">
      <input type="email" placeholder="${v.placeholder}" />
      <button>${v.buttonText}</button>
    </div>
  </div>
</div>`
  },
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
  {
    id: 'cta-split-banner',
    name: 'CTA - Split Banner',
    category: 'CTA',
    description: 'Split banner with call to action',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ready to elevate your style?' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('ctasb')}" style="background:linear-gradient(135deg,#1a1a1a 0%,#000 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctasb')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctasb')}-wrap { max-width: 1200px; margin: 0 auto; padding: 64px 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 32px; }
    .${uid('ctasb')} h2 { font-size: 32px; font-weight: 300; color: #fff; letter-spacing: -0.02em; }
    .${uid('ctasb')} a {
      display: inline-block; padding: 18px 48px;
      background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%);
      color: #000; text-decoration: none; border-radius: 8px;
      font-size: 14px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
      transition: all 0.3s ease;
    }
    .${uid('ctasb')} a:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(212,175,55,0.3); }
  </style>
  <div class="${uid('ctasb')}-wrap">
    <h2>${v.headline}</h2>
    <a href="${v.buttonUrl}">${v.buttonText}</a>
  </div>
</div>`
  },

  // ========== PREMIUM FAQ ==========
  {
    id: 'faq-accordion-premium',
    name: 'FAQ - Accordion',
    category: 'FAQ',
    description: 'Premium accordion FAQ',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Frequently Asked Questions' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'What is your shipping policy?' },
      { id: 'a1', label: 'Answer 1', type: 'textarea', defaultValue: 'We offer complimentary standard shipping on all orders over $100. Express shipping is available for an additional fee. All orders are processed within 1-2 business days.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'What is your return policy?' },
      { id: 'a2', label: 'Answer 2', type: 'textarea', defaultValue: 'We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with all tags attached.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'How can I track my order?' },
      { id: 'a3', label: 'Answer 3', type: 'textarea', defaultValue: 'Once your order ships, you will receive an email with tracking information. You can also track your order through your account dashboard.' },
      { id: 'q4', label: 'Question 4', type: 'text', defaultValue: 'Do you ship internationally?' },
      { id: 'a4', label: 'Answer 4', type: 'textarea', defaultValue: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location.' },
    ],
    generateHtml: (v) => `<div class="${uid('faqac')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('faqac')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faqac')}-wrap { max-width: 800px; margin: 0 auto; padding: 100px 32px; }
    .${uid('faqac')} h2 { font-size: 36px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 64px; letter-spacing: -0.02em; }
    .${uid('faqac')}-item { border-bottom: 1px solid #eee; }
    .${uid('faqac')}-q { padding: 28px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
    .${uid('faqac')}-q h3 { font-size: 17px; font-weight: 500; color: #1a1a1a; }
    .${uid('faqac')}-q span { font-size: 24px; color: #ccc; transition: transform 0.3s ease; }
    .${uid('faqac')}-a { padding: 0 0 28px; font-size: 15px; line-height: 1.7; color: #666; display: none; }
    .${uid('faqac')}-item.active .${uid('faqac')}-a { display: block; }
    .${uid('faqac')}-item.active .${uid('faqac')}-q span { transform: rotate(45deg); }
  </style>
  <div class="${uid('faqac')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faqac')}-item active"><div class="${uid('faqac')}-q"><h3>${v.q1}</h3><span>+</span></div><p class="${uid('faqac')}-a">${v.a1}</p></div>
    <div class="${uid('faqac')}-item"><div class="${uid('faqac')}-q"><h3>${v.q2}</h3><span>+</span></div><p class="${uid('faqac')}-a">${v.a2}</p></div>
    <div class="${uid('faqac')}-item"><div class="${uid('faqac')}-q"><h3>${v.q3}</h3><span>+</span></div><p class="${uid('faqac')}-a">${v.a3}</p></div>
    <div class="${uid('faqac')}-item"><div class="${uid('faqac')}-q"><h3>${v.q4}</h3><span>+</span></div><p class="${uid('faqac')}-a">${v.a4}</p></div>
  </div>
</div>`
  },
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

  // ========== PREMIUM HERO ==========
  {
    id: 'hero-minimal-text',
    name: 'Hero - Minimal',
    category: 'Hero',
    description: 'Minimal text-focused hero',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Elevate Your Everyday' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Premium essentials designed for modern living' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Explore Collection' },
      { id: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('heromt')}" style="background:linear-gradient(135deg,#fafafa 0%,#f5f5f5 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('heromt')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('heromt')}-wrap { max-width: 900px; margin: 0 auto; padding: 160px 48px; text-align: center; }
    .${uid('heromt')} h1 { font-size: 64px; font-weight: 300; color: #1a1a1a; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.03em; }
    .${uid('heromt')} p { font-size: 20px; color: #666; margin-bottom: 48px; }
    .${uid('heromt')} a {
      display: inline-block; padding: 18px 48px; background: #1a1a1a; color: #fff;
      text-decoration: none; border-radius: 8px;
      font-size: 14px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
      transition: all 0.3s ease;
    }
    .${uid('heromt')} a:hover { background: #000; transform: translateY(-2px); }
  </style>
  <div class="${uid('heromt')}-wrap">
    <h1>${v.headline}</h1>
    <p>${v.subheadline}</p>
    <a href="${v.buttonUrl}">${v.buttonText}</a>
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
      { id: 'imageUrl', label: 'Image URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop' },
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

  // ========== BRAND SECTIONS ==========
  {
    id: 'brand-statement',
    name: 'Brand - Statement',
    category: 'Brand',
    description: 'Brand statement quote',
    thumbnail: '',
    fields: [
      { id: 'statement', label: 'Statement', type: 'textarea', defaultValue: 'We believe in the power of simplicity. Every piece is designed with intention, crafted with care, and made to last a lifetime.' },
    ],
    generateHtml: (v) => `<div class="${uid('bstmt')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('bstmt')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bstmt')}-wrap { max-width: 900px; margin: 0 auto; padding: 120px 48px; text-align: center; }
    .${uid('bstmt')} p { font-size: 28px; font-weight: 300; line-height: 1.6; color: #1a1a1a; font-style: italic; letter-spacing: -0.01em; }
  </style>
  <div class="${uid('bstmt')}-wrap">
    <p>${v.statement}</p>
  </div>
</div>`
  },
  {
    id: 'brand-values',
    name: 'Brand - Values',
    category: 'Brand',
    description: 'Brand values in columns',
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
    generateHtml: (v) => `<div class="${uid('bval')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('bval')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bval')}-wrap { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }
    .${uid('bval')} h2 { font-size: 36px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 72px; letter-spacing: -0.02em; }
    .${uid('bval')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 64px; }
    .${uid('bval')}-item h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('bval')}-item p { font-size: 15px; line-height: 1.7; color: #666; }
    @media (max-width: 768px) { .${uid('bval')}-grid { grid-template-columns: 1fr; gap: 40px; } }
  </style>
  <div class="${uid('bval')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('bval')}-grid">
      <div class="${uid('bval')}-item"><h3>${v.value1Title}</h3><p>${v.value1Desc}</p></div>
      <div class="${uid('bval')}-item"><h3>${v.value2Title}</h3><p>${v.value2Desc}</p></div>
      <div class="${uid('bval')}-item"><h3>${v.value3Title}</h3><p>${v.value3Desc}</p></div>
    </div>
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
      { id: 'imageUrl', label: 'Image URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop' },
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
  {
    id: 'divider-elegant-line',
    name: 'Divider - Line',
    category: 'Divider',
    description: 'Elegant thin line divider',
    thumbnail: '',
    fields: [
      { id: 'color', label: 'Line Color', type: 'color', defaultValue: '#e0e0e0' },
    ],
    generateHtml: (v) => `<div style="padding:48px 0;"><div style="max-width:1200px;margin:0 auto;height:1px;background:linear-gradient(90deg,transparent 0%,${v.color} 50%,transparent 100%);"></div></div>`
  },
  {
    id: 'divider-with-text',
    name: 'Divider - With Text',
    category: 'Divider',
    description: 'Divider with centered text',
    thumbnail: '',
    fields: [
      { id: 'text', label: 'Text', type: 'text', defaultValue: 'Featured Products' },
    ],
    generateHtml: (v) => `<div style="padding:48px 0;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:32px;">
    <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#e0e0e0);"></div>
    <span style="font-size:12px;font-weight:500;letter-spacing:0.2em;color:#999;text-transform:uppercase;">${v.text}</span>
    <div style="flex:1;height:1px;background:linear-gradient(90deg,#e0e0e0,transparent);"></div>
  </div>
</div>`
  },
  {
    id: 'spacer-empty',
    name: 'Spacer - Empty',
    category: 'Divider',
    description: 'Empty vertical spacer',
    thumbnail: '',
    fields: [
      { id: 'height', label: 'Height (px)', type: 'number', defaultValue: '80' },
    ],
    generateHtml: (v) => `<div style="height:${v.height}px;"></div>`
  },

  // ========== COUNTDOWN & TIMER SECTIONS ==========
  {
    id: 'countdown-flash-sale',
    name: 'Countdown - Flash Sale',
    category: 'Countdown',
    description: 'Urgent flash sale countdown with pulsing animation',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'FLASH SALE ENDS IN' },
      { id: 'hours', label: 'Hours', type: 'number', defaultValue: '23' },
      { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: '59' },
      { id: 'seconds', label: 'Seconds', type: 'number', defaultValue: '59' },
      { id: 'discount', label: 'Discount Text', type: 'text', defaultValue: 'UP TO 50% OFF' },
    ],
    generateHtml: (v) => `<div class="${uid('cflash')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a0a0a 50%,#0a0a0a 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('cflash')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('cflash')}::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(220,38,38,0.1) 0%, transparent 70%); animation: ${uid('cflash')}-pulse 2s ease-in-out infinite; }
    .${uid('cflash')}-wrap { max-width: 1200px; margin: 0 auto; padding: 48px; text-align: center; position: relative; z-index: 1; }
    .${uid('cflash')}-headline { font-size: 12px; font-weight: 600; letter-spacing: 0.4em; color: #DC2626; margin-bottom: 24px; text-transform: uppercase; }
    .${uid('cflash')}-timer { display: flex; justify-content: center; gap: 24px; margin-bottom: 24px; }
    .${uid('cflash')}-block { text-align: center; }
    .${uid('cflash')}-num { font-size: 56px; font-weight: 200; color: #fff; line-height: 1; letter-spacing: -0.02em; text-shadow: 0 0 40px rgba(220,38,38,0.5); }
    .${uid('cflash')}-label { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); text-transform: uppercase; margin-top: 8px; }
    .${uid('cflash')}-sep { font-size: 48px; color: rgba(255,255,255,0.2); line-height: 1; padding-top: 4px; }
    .${uid('cflash')}-discount { font-size: 14px; font-weight: 700; letter-spacing: 0.3em; background: linear-gradient(90deg, #DC2626, #F87171, #DC2626); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: ${uid('cflash')}-shimmer 2s ease-in-out infinite; }
    @keyframes ${uid('cflash')}-pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
    @keyframes ${uid('cflash')}-shimmer { 0%, 100% { background-position: 200% 50%; } 50% { background-position: 0% 50%; } }
  </style>
  <div class="${uid('cflash')}-wrap">
    <div class="${uid('cflash')}-headline">${v.headline}</div>
    <div class="${uid('cflash')}-timer">
      <div class="${uid('cflash')}-block"><div class="${uid('cflash')}-num">${v.hours}</div><div class="${uid('cflash')}-label">Hours</div></div>
      <span class="${uid('cflash')}-sep">:</span>
      <div class="${uid('cflash')}-block"><div class="${uid('cflash')}-num">${v.minutes}</div><div class="${uid('cflash')}-label">Minutes</div></div>
      <span class="${uid('cflash')}-sep">:</span>
      <div class="${uid('cflash')}-block"><div class="${uid('cflash')}-num">${v.seconds}</div><div class="${uid('cflash')}-label">Seconds</div></div>
    </div>
    <div class="${uid('cflash')}-discount">${v.discount}</div>
  </div>
</div>`
  },
  {
    id: 'countdown-launch',
    name: 'Countdown - Product Launch',
    category: 'Countdown',
    description: 'Elegant product launch countdown with gold accents',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'NEW COLLECTION ARRIVING' },
      { id: 'days', label: 'Days', type: 'number', defaultValue: '07' },
      { id: 'hours', label: 'Hours', type: 'number', defaultValue: '12' },
      { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: '30' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Get Notified' },
    ],
    generateHtml: (v) => `<div class="${uid('claunch')}" style="background:linear-gradient(180deg,#000 0%,#0a0a0a 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('claunch')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('claunch')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 48px; text-align: center; }
    .${uid('claunch')}-headline { font-size: 13px; font-weight: 500; letter-spacing: 0.4em; color: #D4AF37; margin-bottom: 48px; }
    .${uid('claunch')}-timer { display: flex; justify-content: center; gap: 40px; margin-bottom: 48px; }
    .${uid('claunch')}-block { width: 100px; }
    .${uid('claunch')}-num { font-size: 64px; font-weight: 200; background: linear-gradient(180deg, #fff 0%, #D4AF37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
    .${uid('claunch')}-label { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-top: 12px; }
    .${uid('claunch')}-btn { display: inline-block; padding: 16px 48px; background: transparent; border: 1px solid #D4AF37; color: #D4AF37; text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; transition: all 0.4s ease; cursor: pointer; }
    .${uid('claunch')}-btn:hover { background: #D4AF37; color: #000; }
  </style>
  <div class="${uid('claunch')}-wrap">
    <div class="${uid('claunch')}-headline">${v.headline}</div>
    <div class="${uid('claunch')}-timer">
      <div class="${uid('claunch')}-block"><div class="${uid('claunch')}-num">${v.days}</div><div class="${uid('claunch')}-label">Days</div></div>
      <div class="${uid('claunch')}-block"><div class="${uid('claunch')}-num">${v.hours}</div><div class="${uid('claunch')}-label">Hours</div></div>
      <div class="${uid('claunch')}-block"><div class="${uid('claunch')}-num">${v.minutes}</div><div class="${uid('claunch')}-label">Minutes</div></div>
    </div>
    <button class="${uid('claunch')}-btn">${v.buttonText}</button>
  </div>
</div>`
  },
  {
    id: 'countdown-stock',
    name: 'Countdown - Limited Stock',
    category: 'Countdown',
    description: 'Urgency bar showing limited stock',
    thumbnail: '',
    fields: [
      { id: 'text', label: 'Text', type: 'text', defaultValue: 'Only 12 items left in stock' },
      { id: 'percentage', label: 'Stock Level %', type: 'number', defaultValue: '15' },
    ],
    generateHtml: (v) => `<div class="${uid('cstock')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('cstock')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('cstock')}-wrap { max-width: 600px; margin: 0 auto; padding: 32px 48px; }
    .${uid('cstock')}-text { font-size: 13px; font-weight: 500; color: #DC2626; text-align: center; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .${uid('cstock')}-text::before { content: '🔥'; }
    .${uid('cstock')}-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
    .${uid('cstock')}-fill { height: 100%; width: ${v.percentage}%; background: linear-gradient(90deg, #DC2626, #F87171); border-radius: 2px; animation: ${uid('cstock')}-pulse 1.5s ease-in-out infinite; }
    @keyframes ${uid('cstock')}-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
  </style>
  <div class="${uid('cstock')}-wrap">
    <div class="${uid('cstock')}-text">${v.text}</div>
    <div class="${uid('cstock')}-bar"><div class="${uid('cstock')}-fill"></div></div>
  </div>
</div>`
  },

  // ========== MORE PRODUCT SECTIONS ==========
  {
    id: 'product-grid-3up',
    name: 'Product - Grid 3-Up',
    category: 'Product',
    description: 'Elegant 3-product grid with hover effects',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Section Headline', type: 'text', defaultValue: 'Best Sellers' },
      { id: 'prod1Image', label: 'Product 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop' },
      { id: 'prod1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Classic Watch' },
      { id: 'prod1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$295' },
      { id: 'prod2Image', label: 'Product 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop' },
      { id: 'prod2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Leather Bag' },
      { id: 'prod2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$450' },
      { id: 'prod3Image', label: 'Product 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=500&fit=crop' },
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
    id: 'product-bundle',
    name: 'Product - Bundle Deal',
    category: 'Product',
    description: 'Product bundle with savings highlight',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Complete The Look' },
      { id: 'savings', label: 'Savings Badge', type: 'text', defaultValue: 'SAVE 20%' },
      { id: 'prod1', label: 'Product 1', type: 'text', defaultValue: 'Classic Watch' },
      { id: 'prod2', label: 'Product 2', type: 'text', defaultValue: 'Leather Strap' },
      { id: 'prod3', label: 'Product 3', type: 'text', defaultValue: 'Watch Case' },
      { id: 'originalPrice', label: 'Original Price', type: 'text', defaultValue: '$450' },
      { id: 'bundlePrice', label: 'Bundle Price', type: 'text', defaultValue: '$360' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Add Bundle to Cart' },
    ],
    generateHtml: (v) => `<div class="${uid('pbund')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#151515 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pbund')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pbund')}-wrap { max-width: 700px; margin: 0 auto; padding: 64px 48px; text-align: center; }
    .${uid('pbund')}-badge { display: inline-block; padding: 8px 20px; background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%); color: #000; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; border-radius: 20px; margin-bottom: 24px; }
    .${uid('pbund')} h2 { font-size: 28px; font-weight: 300; color: #fff; margin-bottom: 32px; letter-spacing: -0.01em; }
    .${uid('pbund')}-items { display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
    .${uid('pbund')}-item { padding: 12px 24px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: rgba(255,255,255,0.8); font-size: 14px; }
    .${uid('pbund')}-plus { color: #D4AF37; font-size: 20px; }
    .${uid('pbund')}-pricing { margin-bottom: 32px; }
    .${uid('pbund')}-original { font-size: 18px; color: rgba(255,255,255,0.4); text-decoration: line-through; margin-right: 16px; }
    .${uid('pbund')}-price { font-size: 36px; font-weight: 300; background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .${uid('pbund')}-btn { display: inline-block; padding: 18px 48px; background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%); color: #000; font-size: 13px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; border-radius: 8px; text-decoration: none; transition: all 0.3s ease; cursor: pointer; border: none; }
    .${uid('pbund')}-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,55,0.4); }
  </style>
  <div class="${uid('pbund')}-wrap">
    <span class="${uid('pbund')}-badge">${v.savings}</span>
    <h2>${v.headline}</h2>
    <div class="${uid('pbund')}-items">
      <span class="${uid('pbund')}-item">${v.prod1}</span>
      <span class="${uid('pbund')}-plus">+</span>
      <span class="${uid('pbund')}-item">${v.prod2}</span>
      <span class="${uid('pbund')}-plus">+</span>
      <span class="${uid('pbund')}-item">${v.prod3}</span>
    </div>
    <div class="${uid('pbund')}-pricing">
      <span class="${uid('pbund')}-original">${v.originalPrice}</span>
      <span class="${uid('pbund')}-price">${v.bundlePrice}</span>
    </div>
    <button class="${uid('pbund')}-btn">${v.buttonText}</button>
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

  // ========== MORE HERO SECTIONS ==========
  {
    id: 'hero-fullscreen',
    name: 'Hero - Full Screen',
    category: 'Hero',
    description: 'Dramatic full-screen hero with centered content',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Redefine Luxury' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'The new standard in premium craftsmanship' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Discover More' },
      { id: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('herofull')}" style="background:linear-gradient(180deg,#000 0%,#0a0a0a 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;min-height:600px;display:flex;align-items:center;justify-content:center;position:relative;">
  <style>
    .${uid('herofull')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('herofull')}::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 60%); }
    .${uid('herofull')}-content { position: relative; z-index: 1; text-align: center; padding: 48px; max-width: 800px; }
    .${uid('herofull')} h1 { font-size: 72px; font-weight: 200; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px; }
    .${uid('herofull')} p { font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.6); margin-bottom: 48px; letter-spacing: 0.02em; }
    .${uid('herofull')}-btn { display: inline-block; padding: 18px 56px; background: transparent; border: 1px solid rgba(255,255,255,0.3); color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; transition: all 0.4s ease; }
    .${uid('herofull')}-btn:hover { background: #fff; color: #000; border-color: #fff; }
  </style>
  <div class="${uid('herofull')}-content">
    <h1>${v.headline}</h1>
    <p>${v.subheadline}</p>
    <a href="${v.buttonUrl}" class="${uid('herofull')}-btn">${v.buttonText}</a>
  </div>
</div>`
  },
  {
    id: 'hero-video-bg',
    name: 'Hero - Video Background',
    category: 'Hero',
    description: 'Hero with video background placeholder',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Experience Excellence' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Where innovation meets timeless design. Discover a new era of premium products.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Watch Our Story' },
    ],
    generateHtml: (v) => `<div class="${uid('herovid')}" style="background:#000;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;min-height:500px;display:flex;align-items:center;position:relative;overflow:hidden;">
  <style>
    .${uid('herovid')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('herovid')}-bg { position: absolute; inset: 0; background: linear-gradient(45deg, #111 25%, #1a1a1a 50%, #111 75%); background-size: 400% 400%; animation: ${uid('herovid')}-bg 8s ease infinite; }
    .${uid('herovid')}-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
    .${uid('herovid')}-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
    .${uid('herovid')} h1 { font-size: 56px; font-weight: 200; color: #fff; letter-spacing: -0.02em; margin-bottom: 20px; }
    .${uid('herovid')} p { font-size: 17px; color: rgba(255,255,255,0.7); max-width: 500px; line-height: 1.6; margin-bottom: 40px; }
    .${uid('herovid')}-btn { display: inline-flex; align-items: center; gap: 12px; padding: 16px 40px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; cursor: pointer; }
    .${uid('herovid')}-btn:hover { background: rgba(255,255,255,0.2); }
    .${uid('herovid')}-btn::before { content: '▶'; font-size: 10px; }
    @keyframes ${uid('herovid')}-bg { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  </style>
  <div class="${uid('herovid')}-bg"></div>
  <div class="${uid('herovid')}-overlay"></div>
  <div class="${uid('herovid')}-content">
    <h1>${v.headline}</h1>
    <p>${v.description}</p>
    <button class="${uid('herovid')}-btn">${v.buttonText}</button>
  </div>
</div>`
  },
  {
    id: 'hero-animated-gradient',
    name: 'Hero - Animated Gradient',
    category: 'Hero',
    description: 'Hero with mesmerizing gradient animation',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'The Future is Here' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Introducing our most innovative collection yet' },
      { id: 'ctaText', label: 'CTA Text', type: 'text', defaultValue: 'Explore Now' },
    ],
    generateHtml: (v) => `<div class="${uid('herograd')}" style="font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;min-height:500px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
  <style>
    .${uid('herograd')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('herograd')}::before { content: ''; position: absolute; inset: -50%; background: conic-gradient(from 0deg at 50% 50%, #0a0a0a 0deg, #1a1a1a 60deg, #D4AF37 120deg, #1a1a1a 180deg, #0a0a0a 240deg, #1a1a1a 300deg, #0a0a0a 360deg); animation: ${uid('herograd')}-spin 20s linear infinite; }
    .${uid('herograd')}::after { content: ''; position: absolute; inset: 2px; background: #0a0a0a; border-radius: 0; }
    .${uid('herograd')}-content { position: relative; z-index: 1; text-align: center; padding: 48px; }
    .${uid('herograd')} h1 { font-size: 64px; font-weight: 200; background: linear-gradient(135deg, #fff 0%, #D4AF37 50%, #fff 100%); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: ${uid('herograd')}-text 4s ease infinite; margin-bottom: 16px; letter-spacing: -0.02em; }
    .${uid('herograd')} p { font-size: 16px; color: rgba(255,255,255,0.5); margin-bottom: 40px; letter-spacing: 0.1em; }
    .${uid('herograd')}-btn { display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%); color: #000; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 6px; transition: all 0.3s ease; }
    .${uid('herograd')}-btn:hover { transform: scale(1.05); box-shadow: 0 0 40px rgba(212,175,55,0.4); }
    @keyframes ${uid('herograd')}-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes ${uid('herograd')}-text { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  </style>
  <div class="${uid('herograd')}-content">
    <h1>${v.headline}</h1>
    <p>${v.subtext}</p>
    <a href="#" class="${uid('herograd')}-btn">${v.ctaText}</a>
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
  </style>
  <div class="${uid('contbar')}-wrap">
    <div class="${uid('contbar')}-item"><div><div class="${uid('contbar')}-label">Email</div><div class="${uid('contbar')}-value"><a href="mailto:${v.email}">${v.email}</a></div></div></div>
    <div class="${uid('contbar')}-item"><div><div class="${uid('contbar')}-label">Phone</div><div class="${uid('contbar')}-value">${v.phone}</div></div></div>
    <div class="${uid('contbar')}-item"><div><div class="${uid('contbar')}-label">Hours</div><div class="${uid('contbar')}-value">${v.hours}</div></div></div>
  </div>
</div>`
  },
  {
    id: 'contact-locations',
    name: 'Contact - Store Locations',
    category: 'Contact',
    description: 'Store locations grid',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Visit Our Stores' },
      { id: 'loc1City', label: 'Location 1 City', type: 'text', defaultValue: 'New York' },
      { id: 'loc1Address', label: 'Location 1 Address', type: 'text', defaultValue: '123 Fifth Avenue, NY 10001' },
      { id: 'loc2City', label: 'Location 2 City', type: 'text', defaultValue: 'Los Angeles' },
      { id: 'loc2Address', label: 'Location 2 Address', type: 'text', defaultValue: '456 Rodeo Drive, CA 90210' },
      { id: 'loc3City', label: 'Location 3 City', type: 'text', defaultValue: 'London' },
      { id: 'loc3Address', label: 'Location 3 Address', type: 'text', defaultValue: '789 Bond Street, W1S 4SL' },
    ],
    generateHtml: (v) => `<div class="${uid('contloc')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('contloc')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('contloc')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
    .${uid('contloc')} h2 { font-size: 32px; font-weight: 300; color: #1a1a1a; text-align: center; margin-bottom: 56px; }
    .${uid('contloc')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('contloc')}-card { padding: 40px 32px; border: 1px solid #eee; border-radius: 16px; text-align: center; transition: all 0.3s ease; }
    .${uid('contloc')}-card:hover { border-color: #D4AF37; transform: translateY(-4px); }
    .${uid('contloc')}-city { font-size: 20px; font-weight: 500; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('contloc')}-address { font-size: 14px; color: #666; line-height: 1.5; }
    @media (max-width: 768px) { .${uid('contloc')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('contloc')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('contloc')}-grid">
      <div class="${uid('contloc')}-card"><div class="${uid('contloc')}-city">${v.loc1City}</div><div class="${uid('contloc')}-address">${v.loc1Address}</div></div>
      <div class="${uid('contloc')}-card"><div class="${uid('contloc')}-city">${v.loc2City}</div><div class="${uid('contloc')}-address">${v.loc2Address}</div></div>
      <div class="${uid('contloc')}-card"><div class="${uid('contloc')}-city">${v.loc3City}</div><div class="${uid('contloc')}-address">${v.loc3Address}</div></div>
    </div>
  </div>
</div>`
  },

  // ========== SOCIAL PROOF SECTIONS ==========
  {
    id: 'social-payment-methods',
    name: 'Social - Payment Methods',
    category: 'Social',
    description: 'Payment methods trust bar',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Secure Payment Options' },
    ],
    generateHtml: (v) => `<div class="${uid('socpay')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('socpay')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('socpay')}-wrap { max-width: 800px; margin: 0 auto; padding: 48px; text-align: center; }
    .${uid('socpay')}-headline { font-size: 12px; font-weight: 500; letter-spacing: 0.2em; color: #999; text-transform: uppercase; margin-bottom: 24px; }
    .${uid('socpay')}-icons { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }
    .${uid('socpay')}-icon { width: 60px; height: 36px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: #666; transition: all 0.3s ease; }
    .${uid('socpay')}-icon:hover { border-color: #D4AF37; transform: translateY(-2px); }
  </style>
  <div class="${uid('socpay')}-wrap">
    <div class="${uid('socpay')}-headline">${v.headline}</div>
    <div class="${uid('socpay')}-icons">
      <div class="${uid('socpay')}-icon">VISA</div>
      <div class="${uid('socpay')}-icon">MC</div>
      <div class="${uid('socpay')}-icon">AMEX</div>
      <div class="${uid('socpay')}-icon">PayPal</div>
      <div class="${uid('socpay')}-icon">Apple</div>
      <div class="${uid('socpay')}-icon">GPay</div>
    </div>
  </div>
</div>`
  },
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
  {
    id: 'social-badges',
    name: 'Social - Trust Badges',
    category: 'Social',
    description: 'Achievement and certification badges',
    thumbnail: '',
    fields: [
      { id: 'badge1', label: 'Badge 1', type: 'text', defaultValue: 'Certified Organic' },
      { id: 'badge2', label: 'Badge 2', type: 'text', defaultValue: 'Carbon Neutral' },
      { id: 'badge3', label: 'Badge 3', type: 'text', defaultValue: 'B Corp Certified' },
      { id: 'badge4', label: 'Badge 4', type: 'text', defaultValue: 'Fair Trade' },
    ],
    generateHtml: (v) => `<div class="${uid('socbadge')}" style="background:linear-gradient(135deg,#f8f8f8 0%,#fff 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('socbadge')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('socbadge')}-wrap { max-width: 1000px; margin: 0 auto; padding: 56px 48px; display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; }
    .${uid('socbadge')}-item { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .${uid('socbadge')}-icon { width: 64px; height: 64px; background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #D4AF37; font-size: 20px; }
    .${uid('socbadge')}-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #666; text-transform: uppercase; text-align: center; }
  </style>
  <div class="${uid('socbadge')}-wrap">
    <div class="${uid('socbadge')}-item"><div class="${uid('socbadge')}-icon">✓</div><div class="${uid('socbadge')}-label">${v.badge1}</div></div>
    <div class="${uid('socbadge')}-item"><div class="${uid('socbadge')}-icon">✓</div><div class="${uid('socbadge')}-label">${v.badge2}</div></div>
    <div class="${uid('socbadge')}-item"><div class="${uid('socbadge')}-icon">✓</div><div class="${uid('socbadge')}-label">${v.badge3}</div></div>
    <div class="${uid('socbadge')}-item"><div class="${uid('socbadge')}-icon">✓</div><div class="${uid('socbadge')}-label">${v.badge4}</div></div>
  </div>
</div>`
  },

  // ========== BANNER/PROMO SECTIONS ==========
  {
    id: 'banner-sale',
    name: 'Banner - Sale',
    category: 'Banner',
    description: 'Eye-catching sale banner',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'SEASONAL SALE' },
      { id: 'discount', label: 'Discount', type: 'text', defaultValue: '30% OFF' },
      { id: 'code', label: 'Code', type: 'text', defaultValue: 'SAVE30' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
    ],
    generateHtml: (v) => `<div class="${uid('bansale')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a0a0a 50%,#0a0a0a 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('bansale')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bansale')}::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.15) 0%, transparent 60%); }
    .${uid('bansale')}-wrap { max-width: 1200px; margin: 0 auto; padding: 64px 48px; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; flex-wrap: wrap; gap: 24px; }
    .${uid('bansale')}-left { }
    .${uid('bansale')}-headline { font-size: 12px; font-weight: 600; letter-spacing: 0.3em; color: #DC2626; margin-bottom: 8px; }
    .${uid('bansale')}-discount { font-size: 48px; font-weight: 200; color: #fff; letter-spacing: -0.02em; }
    .${uid('bansale')}-code { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 8px; }
    .${uid('bansale')}-code span { color: #fff; font-weight: 600; background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 4px; margin-left: 8px; }
    .${uid('bansale')}-btn { display: inline-block; padding: 16px 48px; background: #DC2626; color: #fff; font-size: 13px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('bansale')}-btn:hover { background: #B91C1C; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(220,38,38,0.4); }
  </style>
  <div class="${uid('bansale')}-wrap">
    <div class="${uid('bansale')}-left">
      <div class="${uid('bansale')}-headline">${v.headline}</div>
      <div class="${uid('bansale')}-discount">${v.discount}</div>
      <div class="${uid('bansale')}-code">Use code:<span>${v.code}</span></div>
    </div>
    <a href="#" class="${uid('bansale')}-btn">${v.buttonText}</a>
  </div>
</div>`
  },
  {
    id: 'banner-vip',
    name: 'Banner - VIP Access',
    category: 'Banner',
    description: 'Exclusive VIP access banner',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'VIP EARLY ACCESS' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Get exclusive first access to our new collection before anyone else.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Join VIP List' },
    ],
    generateHtml: (v) => `<div class="${uid('banvip')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#151515 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('banvip')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('banvip')}::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); }
    .${uid('banvip')}::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); }
    .${uid('banvip')}-wrap { max-width: 900px; margin: 0 auto; padding: 56px 48px; text-align: center; }
    .${uid('banvip')}-headline { font-size: 14px; font-weight: 600; letter-spacing: 0.4em; background: linear-gradient(90deg, #D4AF37 0%, #F5E7A3 50%, #D4AF37 100%); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: ${uid('banvip')}-shimmer 3s ease-in-out infinite; margin-bottom: 16px; }
    .${uid('banvip')}-desc { font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 32px; }
    .${uid('banvip')}-btn { display: inline-block; padding: 14px 40px; background: transparent; border: 1px solid #D4AF37; color: #D4AF37; font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; transition: all 0.4s ease; cursor: pointer; }
    .${uid('banvip')}-btn:hover { background: #D4AF37; color: #000; }
    @keyframes ${uid('banvip')}-shimmer { 0%, 100% { background-position: 200% 50%; } 50% { background-position: 0% 50%; } }
  </style>
  <div class="${uid('banvip')}-wrap">
    <div class="${uid('banvip')}-headline">${v.headline}</div>
    <div class="${uid('banvip')}-desc">${v.description}</div>
    <button class="${uid('banvip')}-btn">${v.buttonText}</button>
  </div>
</div>`
  },
  {
    id: 'banner-shipping',
    name: 'Banner - Free Shipping',
    category: 'Banner',
    description: 'Free shipping promotion banner',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'FREE EXPRESS SHIPPING' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'On all orders over $100 • Limited time only' },
    ],
    generateHtml: (v) => `<div class="${uid('banship')}" style="background:linear-gradient(90deg,#1a5e20 0%,#2e7d32 50%,#1a5e20 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('banship')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('banship')}-wrap { max-width: 1200px; margin: 0 auto; padding: 24px 48px; text-align: center; }
    .${uid('banship')}-headline { font-size: 14px; font-weight: 700; letter-spacing: 0.2em; color: #fff; margin-bottom: 6px; display: flex; align-items: center; justify-content: center; gap: 12px; }
    .${uid('banship')}-headline::before { content: '🚚'; }
    .${uid('banship')}-subtext { font-size: 13px; color: rgba(255,255,255,0.8); }
  </style>
  <div class="${uid('banship')}-wrap">
    <div class="${uid('banship')}-headline">${v.headline}</div>
    <div class="${uid('banship')}-subtext">${v.subtext}</div>
  </div>
</div>`
  },

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
];
