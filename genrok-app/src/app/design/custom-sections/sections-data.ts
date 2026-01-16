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
    id: 'hero-spotlight',
    name: 'Hero - Spotlight Text',
    category: 'Hero',
    description: 'Moving spotlight effect illuminating headline text',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Spotlight' },
      { id: 'subtitle', label: 'Subtitle', type: 'text', defaultValue: 'which is not overused.' },
      { id: 'desc', label: 'Description', type: 'text', defaultValue: 'A subtle yet effective spotlight effect, because the previous version is used a bit too much these days.' },
    ],
    generateHtml: (v) => `<div class="${uid('hspot')}" style="background:#0a0a0a;min-height:450px;display:flex;align-items:center;justify-content:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('hspot')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hspot')}::before { content: ''; position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); animation: ${uid('hspot')}-move 8s ease-in-out infinite; pointer-events: none; }
    .${uid('hspot')}-wrap { text-align: center; padding: 80px 24px; max-width: 700px; position: relative; z-index: 1; }
    .${uid('hspot')}-title { font-size: 72px; font-weight: 700; color: #fff; line-height: 1; margin-bottom: 8px; }
    .${uid('hspot')}-sub { font-size: 72px; font-weight: 300; color: rgba(255,255,255,0.4); line-height: 1; margin-bottom: 32px; }
    .${uid('hspot')}-desc { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 400px; margin: 0 auto; }
    @keyframes ${uid('hspot')}-move { 0%, 100% { transform: translate(-50%, -50%); top: 30%; left: 30%; } 25% { top: 40%; left: 70%; } 50% { top: 70%; left: 60%; } 75% { top: 60%; left: 30%; } }
    @media (max-width: 768px) { .${uid('hspot')}-title, .${uid('hspot')}-sub { font-size: 42px; } }
  </style>
  <div class="${uid('hspot')}-wrap">
    <h1 class="${uid('hspot')}-title">${v.headline}</h1>
    <p class="${uid('hspot')}-sub">${v.subtitle}</p>
    <p class="${uid('hspot')}-desc">${v.desc}</p>
  </div>
</div>`
  },
  {
    id: 'hero-gradient-mesh',
    name: 'Hero - Gradient Mesh',
    category: 'Hero',
    description: 'Animated colorful mesh gradient background',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'ARTIFICIAL' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Intelligence meets creativity' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Explore Now' },
    ],
    generateHtml: (v) => `<div class="${uid('hmesh')}" style="background:#0a0a0a;min-height:500px;display:flex;align-items:center;justify-content:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('hmesh')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hmesh')}-orb1 { position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,200,255,0.4) 0%, transparent 70%); top: -20%; right: -10%; animation: ${uid('hmesh')}-float1 12s ease-in-out infinite; }
    .${uid('hmesh')}-orb2 { position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(150,50,255,0.4) 0%, transparent 70%); bottom: -20%; left: -10%; animation: ${uid('hmesh')}-float2 10s ease-in-out infinite; }
    .${uid('hmesh')}-orb3 { position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,100,150,0.3) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: ${uid('hmesh')}-pulse 8s ease-in-out infinite; }
    .${uid('hmesh')}-wrap { text-align: center; padding: 80px 24px; position: relative; z-index: 1; }
    .${uid('hmesh')}-title { font-size: 80px; font-weight: 800; letter-spacing: 0.2em; color: #fff; line-height: 1; margin-bottom: 16px; text-shadow: 0 0 60px rgba(0,200,255,0.5); }
    .${uid('hmesh')}-sub { font-size: 20px; color: rgba(255,255,255,0.7); margin-bottom: 40px; }
    .${uid('hmesh')}-btn { display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #00c8ff 0%, #9932ff 100%); color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 50px; transition: all 0.3s ease; }
    .${uid('hmesh')}-btn:hover { transform: scale(1.05); box-shadow: 0 10px 40px rgba(0,200,255,0.4); }
    @keyframes ${uid('hmesh')}-float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, 30px); } }
    @keyframes ${uid('hmesh')}-float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -30px); } }
    @keyframes ${uid('hmesh')}-pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; } 50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; } }
    @media (max-width: 768px) { .${uid('hmesh')}-title { font-size: 40px; letter-spacing: 0.1em; } }
  </style>
  <div class="${uid('hmesh')}-orb1"></div>
  <div class="${uid('hmesh')}-orb2"></div>
  <div class="${uid('hmesh')}-orb3"></div>
  <div class="${uid('hmesh')}-wrap">
    <h1 class="${uid('hmesh')}-title">${v.headline}</h1>
    <p class="${uid('hmesh')}-sub">${v.subtext}</p>
    <a href="#" class="${uid('hmesh')}-btn">${v.btnText}</a>
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
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'A new way to learn & get knowledge' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'EduFlex is here for you with various courses & materials from skilled tutors all around the world.' },
      { id: 'stat1', label: 'Stat 1', type: 'text', defaultValue: '15.2K' },
      { id: 'stat1Label', label: 'Stat 1 Label', type: 'text', defaultValue: 'Active students' },
      { id: 'stat2', label: 'Stat 2', type: 'text', defaultValue: '4.5K' },
      { id: 'stat2Label', label: 'Stat 2 Label', type: 'text', defaultValue: 'Tutors' },
    ],
    generateHtml: (v) => `<div class="${uid('hfloat')}" style="background:#fafafa;min-height:550px;display:flex;align-items:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('hfloat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hfloat')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 24px; align-items: center; }
    .${uid('hfloat')}-content { max-width: 500px; }
    .${uid('hfloat')}-title { font-size: 48px; font-weight: 700; color: #1a1a1a; line-height: 1.1; margin-bottom: 20px; }
    .${uid('hfloat')}-sub { font-size: 16px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('hfloat')}-btns { display: flex; gap: 16px; margin-bottom: 40px; }
    .${uid('hfloat')}-btn { padding: 14px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('hfloat')}-btn.primary { background: #1a1a1a; color: #fff; }
    .${uid('hfloat')}-btn.secondary { background: #fff; color: #1a1a1a; border: 1px solid #e0e0e0; }
    .${uid('hfloat')}-stats { display: flex; gap: 32px; }
    .${uid('hfloat')}-stat-num { font-size: 24px; font-weight: 700; color: #1a1a1a; }
    .${uid('hfloat')}-stat-label { font-size: 13px; color: #888; }
    .${uid('hfloat')}-images { position: relative; height: 400px; }
    .${uid('hfloat')}-img { position: absolute; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); animation: ${uid('hfloat')}-bob 4s ease-in-out infinite; }
    .${uid('hfloat')}-img:nth-child(1) { width: 200px; height: 200px; top: 0; right: 60px; animation-delay: 0s; }
    .${uid('hfloat')}-img:nth-child(2) { width: 180px; height: 180px; top: 100px; right: 0; animation-delay: 1s; }
    .${uid('hfloat')}-img:nth-child(3) { width: 160px; height: 160px; bottom: 40px; right: 80px; animation-delay: 2s; }
    .${uid('hfloat')}-img img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; }
    @keyframes ${uid('hfloat')}-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    @media (max-width: 900px) { .${uid('hfloat')}-wrap { grid-template-columns: 1fr; } .${uid('hfloat')}-images { display: none; } }
  </style>
  <div class="${uid('hfloat')}-wrap">
    <div class="${uid('hfloat')}-content">
      <h1 class="${uid('hfloat')}-title">${v.headline}</h1>
      <p class="${uid('hfloat')}-sub">${v.subtext}</p>
      <div class="${uid('hfloat')}-btns">
        <a href="#" class="${uid('hfloat')}-btn primary">Join the Class</a>
        <a href="#" class="${uid('hfloat')}-btn secondary">Learn more</a>
      </div>
      <div class="${uid('hfloat')}-stats">
        <div><div class="${uid('hfloat')}-stat-num">${v.stat1}</div><div class="${uid('hfloat')}-stat-label">${v.stat1Label}</div></div>
        <div><div class="${uid('hfloat')}-stat-num">${v.stat2}</div><div class="${uid('hfloat')}-stat-label">${v.stat2Label}</div></div>
      </div>
    </div>
    <div class="${uid('hfloat')}-images">
      <div class="${uid('hfloat')}-img"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop" alt=""></div>
      <div class="${uid('hfloat')}-img"><img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" alt=""></div>
      <div class="${uid('hfloat')}-img"><img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop" alt=""></div>
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
      { id: 'image', label: 'Hero Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop' },
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
    id: 'hero-video-dark',
    name: 'Hero - Video Dark',
    category: 'Hero',
    description: 'Dark overlay hero with video background placeholder',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'BUILD YOUR DREAMS' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'AI-POWERED CREATIVITY FOR THE NEXT GENERATION.' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Scroll to explore' },
    ],
    generateHtml: (v) => `<div class="${uid('hvid')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a0a1a 50%,#0a0a1a 100%);min-height:500px;display:flex;align-items:center;justify-content:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('hvid')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hvid')}::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop') center/cover; opacity: 0.3; }
    .${uid('hvid')}-glow { position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,50,100,0.4) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: ${uid('hvid')}-pulse 4s ease-in-out infinite; }
    .${uid('hvid')}-wrap { text-align: center; padding: 80px 24px; position: relative; z-index: 1; }
    .${uid('hvid')}-title { font-size: 56px; font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 16px; letter-spacing: 0.05em; }
    .${uid('hvid')}-sub { font-size: 14px; color: rgba(255,255,255,0.6); letter-spacing: 0.2em; margin-bottom: 48px; }
    .${uid('hvid')}-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); color: #fff; font-size: 13px; font-weight: 500; text-decoration: none; border-radius: 50px; border: 1px solid rgba(255,255,255,0.2); transition: all 0.3s ease; }
    .${uid('hvid')}-btn:hover { background: rgba(255,255,255,0.2); }
    .${uid('hvid')}-btn::after { content: '↓'; }
    @keyframes ${uid('hvid')}-pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.6; } }
    @media (max-width: 768px) { .${uid('hvid')}-title { font-size: 36px; } }
  </style>
  <div class="${uid('hvid')}-glow"></div>
  <div class="${uid('hvid')}-wrap">
    <h1 class="${uid('hvid')}-title">${v.headline}</h1>
    <p class="${uid('hvid')}-sub">${v.subtext}</p>
    <a href="#" class="${uid('hvid')}-btn">${v.btnText}</a>
  </div>
</div>`
  },
  {
    id: 'hero-3d-cards',
    name: 'Hero - 3D Cards',
    category: 'Hero',
    description: 'Perspective rotating cards with 3D effect',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ready to Transform Your Management?' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Experience the future of finance with our cutting-edge SaaS platform.' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Download app' },
    ],
    generateHtml: (v) => `<div class="${uid('h3d')}" style="background:linear-gradient(180deg,#0f1419 0%,#1a2332 100%);min-height:500px;display:flex;align-items:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('h3d')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('h3d')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; }
    .${uid('h3d')}-content { max-width: 480px; }
    .${uid('h3d')}-title { font-size: 42px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 20px; }
    .${uid('h3d')}-sub { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 32px; }
    .${uid('h3d')}-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: #3b82f6; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('h3d')}-btn:hover { background: #2563eb; transform: translateY(-2px); }
    .${uid('h3d')}-cards { perspective: 1000px; position: relative; height: 350px; }
    .${uid('h3d')}-card { position: absolute; width: 280px; height: 180px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.3); }
    .${uid('h3d')}-card:nth-child(1) { top: 0; left: 0; transform: rotateY(-15deg) rotateX(5deg); animation: ${uid('h3d')}-float1 6s ease-in-out infinite; }
    .${uid('h3d')}-card:nth-child(2) { top: 80px; left: 100px; transform: rotateY(-10deg) rotateX(5deg); animation: ${uid('h3d')}-float2 6s ease-in-out infinite; z-index: 1; }
    .${uid('h3d')}-card-title { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
    .${uid('h3d')}-card-value { font-size: 28px; font-weight: 700; color: #fff; }
    @keyframes ${uid('h3d')}-float1 { 0%, 100% { transform: rotateY(-15deg) rotateX(5deg) translateY(0); } 50% { transform: rotateY(-15deg) rotateX(5deg) translateY(-10px); } }
    @keyframes ${uid('h3d')}-float2 { 0%, 100% { transform: rotateY(-10deg) rotateX(5deg) translateY(0); } 50% { transform: rotateY(-10deg) rotateX(5deg) translateY(-15px); } }
    @media (max-width: 900px) { .${uid('h3d')}-wrap { grid-template-columns: 1fr; } .${uid('h3d')}-cards { display: none; } }
  </style>
  <div class="${uid('h3d')}-wrap">
    <div class="${uid('h3d')}-content">
      <h1 class="${uid('h3d')}-title">${v.headline}</h1>
      <p class="${uid('h3d')}-sub">${v.subtext}</p>
      <a href="#" class="${uid('h3d')}-btn">${v.btnText} →</a>
    </div>
    <div class="${uid('h3d')}-cards">
      <div class="${uid('h3d')}-card"><div class="${uid('h3d')}-card-title">Total Revenue</div><div class="${uid('h3d')}-card-value">$142,384</div></div>
      <div class="${uid('h3d')}-card"><div class="${uid('h3d')}-card-title">Active Users</div><div class="${uid('h3d')}-card-value">12,847</div></div>
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
    ],
    generateHtml: (v) => `<div class="${uid('bento4')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('bento4')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bento4')}-wrap { display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; }
    .${uid('bento4')}-content { padding-right: 40px; }
    .${uid('bento4')}-label { font-size: 13px; color: #22c55e; font-weight: 600; margin-bottom: 16px; }
    .${uid('bento4')}-title { font-size: 48px; font-weight: 700; color: #1a1a1a; line-height: 1.1; margin-bottom: 20px; }
    .${uid('bento4')}-sub { font-size: 16px; color: #666; line-height: 1.7; margin-bottom: 32px; }
    .${uid('bento4')}-btn { display: inline-block; padding: 14px 28px; background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('bento4')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 80px); gap: 12px; }
    .${uid('bento4')}-item { border-radius: 12px; overflow: hidden; transition: transform 0.3s ease; }
    .${uid('bento4')}-item:hover { transform: scale(1.02); }
    .${uid('bento4')}-item img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('bento4')}-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
    .${uid('bento4')}-item:nth-child(2) { grid-column: span 2; grid-row: span 2; }
    .${uid('bento4')}-item:nth-child(3) { grid-column: span 2; grid-row: span 2; }
    .${uid('bento4')}-item:nth-child(4) { grid-column: span 2; grid-row: span 2; }
    @media (max-width: 900px) { .${uid('bento4')}-wrap { grid-template-columns: 1fr; } .${uid('bento4')}-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 150px); } .${uid('bento4')}-item { grid-column: span 1 !important; grid-row: span 1 !important; } }
  </style>
  <div class="${uid('bento4')}-wrap">
    <div class="${uid('bento4')}-content">
      <div class="${uid('bento4')}-label">Better every day</div>
      <h2 class="${uid('bento4')}-title">${v.headline}</h2>
      <p class="${uid('bento4')}-sub">${v.subtext}</p>
      <a href="#" class="${uid('bento4')}-btn">${v.btnText}</a>
    </div>
    <div class="${uid('bento4')}-grid">
      <div class="${uid('bento4')}-item"><img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=400&fit=crop" alt=""></div>
      <div class="${uid('bento4')}-item"><img src="https://images.unsplash.com/photo-1461896836934- voices?w=400&h=400&fit=crop" alt=""></div>
      <div class="${uid('bento4')}-item"><img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop" alt=""></div>
      <div class="${uid('bento4')}-item"><img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop" alt=""></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'bento-grid-6',
    name: 'Bento Grid - 6 Panel',
    category: 'Gallery',
    description: '6-panel asymmetric bento layout with hover effects',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Latest Collection' },
    ],
    generateHtml: (v) => `<div class="${uid('bento6')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('bento6')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('bento6')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('bento6')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('bento6')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 140px); gap: 16px; }
    .${uid('bento6')}-item { position: relative; border-radius: 16px; overflow: hidden; cursor: pointer; }
    .${uid('bento6')}-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .${uid('bento6')}-item:hover img { transform: scale(1.1); }
    .${uid('bento6')}-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%); opacity: 0; transition: opacity 0.3s ease; }
    .${uid('bento6')}-item:hover::after { opacity: 1; }
    .${uid('bento6')}-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
    .${uid('bento6')}-item:nth-child(2) { grid-column: span 1; grid-row: span 1; }
    .${uid('bento6')}-item:nth-child(3) { grid-column: span 1; grid-row: span 1; }
    .${uid('bento6')}-item:nth-child(4) { grid-column: span 1; grid-row: span 2; }
    .${uid('bento6')}-item:nth-child(5) { grid-column: span 1; grid-row: span 1; }
    .${uid('bento6')}-item:nth-child(6) { grid-column: span 2; grid-row: span 1; }
    @media (max-width: 768px) { .${uid('bento6')}-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; } .${uid('bento6')}-item { grid-column: span 1 !important; grid-row: span 1 !important; height: 200px; } }
  </style>
  <div class="${uid('bento6')}-wrap">
    <h2 class="${uid('bento6')}-title">${v.headline}</h2>
    <div class="${uid('bento6')}-grid">
      <div class="${uid('bento6')}-item"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop" alt=""></div>
      <div class="${uid('bento6')}-item"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('bento6')}-item"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('bento6')}-item"><img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=600&fit=crop" alt=""></div>
      <div class="${uid('bento6')}-item"><img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('bento6')}-item"><img src="https://images.unsplash.com/photo-1491553895911-0055uj8d?w=600&h=300&fit=crop" alt=""></div>
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
    ],
    generateHtml: (v) => `<div class="${uid('shuf')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('shuf')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('shuf')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('shuf')}-title { font-size: 36px; font-weight: 700; color: #fff; text-align: center; margin-bottom: 48px; }
    .${uid('shuf')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .${uid('shuf')}-item { aspect-ratio: 1; position: relative; overflow: hidden; border-radius: 8px; cursor: pointer; }
    .${uid('shuf')}-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .${uid('shuf')}-item:hover img { transform: scale(1.15); }
    .${uid('shuf')}-item::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s ease; z-index: 1; }
    .${uid('shuf')}-item:hover::before { opacity: 1; }
    @media (max-width: 768px) { .${uid('shuf')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('shuf')}-wrap">
    <h2 class="${uid('shuf')}-title">${v.headline}</h2>
    <div class="${uid('shuf')}-grid">
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1461896836934-xt?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('shuf')}-item"><img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop" alt=""></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'masonry-gallery',
    name: 'Masonry Gallery',
    category: 'Gallery',
    description: 'Pinterest-style masonry image layout',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Curated Collection' },
    ],
    generateHtml: (v) => `<div class="${uid('mason')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('mason')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mason')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('mason')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('mason')}-grid { column-count: 3; column-gap: 16px; }
    .${uid('mason')}-item { break-inside: avoid; margin-bottom: 16px; position: relative; border-radius: 12px; overflow: hidden; cursor: pointer; }
    .${uid('mason')}-item img { width: 100%; display: block; transition: transform 0.5s ease; }
    .${uid('mason')}-item:hover img { transform: scale(1.05); }
    .${uid('mason')}-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s ease; display: flex; align-items: flex-end; padding: 20px; }
    .${uid('mason')}-item:hover .${uid('mason')}-overlay { opacity: 1; }
    .${uid('mason')}-overlay span { color: #fff; font-size: 14px; font-weight: 600; }
    @media (max-width: 768px) { .${uid('mason')}-grid { column-count: 2; } }
  </style>
  <div class="${uid('mason')}-wrap">
    <h2 class="${uid('mason')}-title">${v.headline}</h2>
    <div class="${uid('mason')}-grid">
      <div class="${uid('mason')}-item"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop" alt=""><div class="${uid('mason')}-overlay"><span>View</span></div></div>
      <div class="${uid('mason')}-item"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" alt=""><div class="${uid('mason')}-overlay"><span>View</span></div></div>
      <div class="${uid('mason')}-item"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" alt=""><div class="${uid('mason')}-overlay"><span>View</span></div></div>
      <div class="${uid('mason')}-item"><img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=350&fit=crop" alt=""><div class="${uid('mason')}-overlay"><span>View</span></div></div>
      <div class="${uid('mason')}-item"><img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=450&fit=crop" alt=""><div class="${uid('mason')}-overlay"><span>View</span></div></div>
      <div class="${uid('mason')}-item"><img src="https://images.unsplash.com/photo-1491553895911-0055uj8d?w=400&h=300&fit=crop" alt=""><div class="${uid('mason')}-overlay"><span>View</span></div></div>
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
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Our intelligent platform finds, organizes, and brings your most cherished moments back to life.' },
    ],
    generateHtml: (v) => `<div class="${uid('mosaic')}" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);min-height:500px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('mosaic')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('mosaic')}-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 80px 24px; align-items: center; }
    .${uid('mosaic')}-content { max-width: 450px; }
    .${uid('mosaic')}-title { font-size: 40px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 20px; }
    .${uid('mosaic')}-sub { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 32px; }
    .${uid('mosaic')}-btns { display: flex; gap: 16px; }
    .${uid('mosaic')}-btn { padding: 12px 24px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('mosaic')}-btn.primary { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #fff; }
    .${uid('mosaic')}-btn.secondary { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); }
    .${uid('mosaic')}-images { position: relative; height: 350px; perspective: 1000px; }
    .${uid('mosaic')}-img { position: absolute; border-radius: 16px; box-shadow: 0 25px 50px rgba(0,0,0,0.4); overflow: hidden; }
    .${uid('mosaic')}-img img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('mosaic')}-img:nth-child(1) { width: 180px; height: 180px; top: 20px; left: 0; transform: rotate(-8deg); animation: ${uid('mosaic')}-float1 5s ease-in-out infinite; }
    .${uid('mosaic')}-img:nth-child(2) { width: 200px; height: 200px; top: 60px; left: 120px; z-index: 2; animation: ${uid('mosaic')}-float2 6s ease-in-out infinite; }
    .${uid('mosaic')}-img:nth-child(3) { width: 160px; height: 160px; bottom: 20px; left: 40px; transform: rotate(5deg); animation: ${uid('mosaic')}-float3 5.5s ease-in-out infinite; }
    @keyframes ${uid('mosaic')}-float1 { 0%, 100% { transform: rotate(-8deg) translateY(0); } 50% { transform: rotate(-8deg) translateY(-10px); } }
    @keyframes ${uid('mosaic')}-float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    @keyframes ${uid('mosaic')}-float3 { 0%, 100% { transform: rotate(5deg) translateY(0); } 50% { transform: rotate(5deg) translateY(-8px); } }
    @media (max-width: 900px) { .${uid('mosaic')}-wrap { grid-template-columns: 1fr; } .${uid('mosaic')}-images { height: 300px; } }
  </style>
  <div class="${uid('mosaic')}-wrap">
    <div class="${uid('mosaic')}-content">
      <h2 class="${uid('mosaic')}-title">${v.headline}</h2>
      <p class="${uid('mosaic')}-sub">${v.subtext}</p>
      <div class="${uid('mosaic')}-btns">
        <a href="#" class="${uid('mosaic')}-btn primary">Explore Your Past</a>
        <a href="#" class="${uid('mosaic')}-btn secondary">How It Works</a>
      </div>
    </div>
    <div class="${uid('mosaic')}-images">
      <div class="${uid('mosaic')}-img"><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('mosaic')}-img"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop" alt=""></div>
      <div class="${uid('mosaic')}-img"><img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop" alt=""></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'portfolio-grid',
    name: 'Portfolio Grid',
    category: 'Gallery',
    description: 'Hover reveal portfolio grid with title overlay',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Featured Work' },
    ],
    generateHtml: (v) => `<div class="${uid('port')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('port')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('port')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('port')}-title { font-size: 36px; font-weight: 700; color: #fff; text-align: center; margin-bottom: 48px; }
    .${uid('port')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('port')}-item { position: relative; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; cursor: pointer; }
    .${uid('port')}-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .${uid('port')}-item:hover img { transform: scale(1.1); }
    .${uid('port')}-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; transform: translateY(20px); opacity: 0; transition: all 0.4s ease; }
    .${uid('port')}-item:hover .${uid('port')}-overlay { transform: translateY(0); opacity: 1; }
    .${uid('port')}-overlay-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; }
    .${uid('port')}-overlay-cat { font-size: 13px; color: rgba(255,255,255,0.6); }
    @media (max-width: 768px) { .${uid('port')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('port')}-wrap">
    <h2 class="${uid('port')}-title">${v.headline}</h2>
    <div class="${uid('port')}-grid">
      <div class="${uid('port')}-item"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop" alt=""><div class="${uid('port')}-overlay"><div class="${uid('port')}-overlay-title">Brand Identity</div><div class="${uid('port')}-overlay-cat">Design / Branding</div></div></div>
      <div class="${uid('port')}-item"><img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=450&fit=crop" alt=""><div class="${uid('port')}-overlay"><div class="${uid('port')}-overlay-title">Mobile App</div><div class="${uid('port')}-overlay-cat">UI/UX / Development</div></div></div>
      <div class="${uid('port')}-item"><img src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=450&fit=crop" alt=""><div class="${uid('port')}-overlay"><div class="${uid('port')}-overlay-title">Web Platform</div><div class="${uid('port')}-overlay-cat">Web / Strategy</div></div></div>
    </div>
  </div>
</div>`
  },

  // ========== FEATURE SECTIONS (21st.dev inspired) ==========
  {
    id: 'features-icon-hover',
    name: 'Features - Icon Hover Cards',
    category: 'Features',
    description: 'Feature cards with icons and hover lift effect',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'f1Title', label: 'Feature 1 Title', type: 'text', defaultValue: 'Lightning Fast' },
      { id: 'f1Desc', label: 'Feature 1 Description', type: 'text', defaultValue: 'Optimized for speed and performance' },
      { id: 'f2Title', label: 'Feature 2 Title', type: 'text', defaultValue: 'Secure by Design' },
      { id: 'f2Desc', label: 'Feature 2 Description', type: 'text', defaultValue: 'Enterprise-grade security built in' },
      { id: 'f3Title', label: 'Feature 3 Title', type: 'text', defaultValue: '24/7 Support' },
      { id: 'f3Desc', label: 'Feature 3 Description', type: 'text', defaultValue: 'Always here when you need us' },
    ],
    generateHtml: (v) => `<div class="${uid('ficon')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ficon')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ficon')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('ficon')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('ficon')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('ficon')}-card { background: #fff; padding: 40px 32px; border-radius: 16px; text-align: center; transition: all 0.3s ease; border: 1px solid #f0f0f0; }
    .${uid('ficon')}-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
    .${uid('ficon')}-icon { width: 64px; height: 64px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 28px; }
    .${uid('ficon')}-card-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('ficon')}-card-desc { font-size: 14px; color: #666; line-height: 1.6; }
    @media (max-width: 768px) { .${uid('ficon')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('ficon')}-wrap">
    <h2 class="${uid('ficon')}-title">${v.headline}</h2>
    <div class="${uid('ficon')}-grid">
      <div class="${uid('ficon')}-card"><div class="${uid('ficon')}-icon">⚡</div><div class="${uid('ficon')}-card-title">${v.f1Title}</div><div class="${uid('ficon')}-card-desc">${v.f1Desc}</div></div>
      <div class="${uid('ficon')}-card"><div class="${uid('ficon')}-icon">🔒</div><div class="${uid('ficon')}-card-title">${v.f2Title}</div><div class="${uid('ficon')}-card-desc">${v.f2Desc}</div></div>
      <div class="${uid('ficon')}-card"><div class="${uid('ficon')}-icon">💬</div><div class="${uid('ficon')}-card-title">${v.f3Title}</div><div class="${uid('ficon')}-card-desc">${v.f3Desc}</div></div>
    </div>
  </div>
</div>`
  },
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
  {
    id: 'features-glass',
    name: 'Features - Glassmorphism',
    category: 'Features',
    description: 'Frosted glass effect feature cards',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Powerful Features' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Everything you need to succeed' },
    ],
    generateHtml: (v) => `<div class="${uid('fglass')}" style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:500px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;">
  <style>
    .${uid('fglass')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fglass')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('fglass')}-header { text-align: center; margin-bottom: 48px; }
    .${uid('fglass')}-title { font-size: 42px; font-weight: 700; color: #fff; margin-bottom: 16px; }
    .${uid('fglass')}-sub { font-size: 18px; color: rgba(255,255,255,0.8); }
    .${uid('fglass')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('fglass')}-card { background: rgba(255,255,255,0.15); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 32px; transition: all 0.3s ease; }
    .${uid('fglass')}-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.2); }
    .${uid('fglass')}-icon { font-size: 32px; margin-bottom: 20px; }
    .${uid('fglass')}-card-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .${uid('fglass')}-card-desc { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6; }
    @media (max-width: 768px) { .${uid('fglass')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('fglass')}-wrap">
    <div class="${uid('fglass')}-header">
      <h2 class="${uid('fglass')}-title">${v.headline}</h2>
      <p class="${uid('fglass')}-sub">${v.subtext}</p>
    </div>
    <div class="${uid('fglass')}-grid">
      <div class="${uid('fglass')}-card"><div class="${uid('fglass')}-icon">🚀</div><div class="${uid('fglass')}-card-title">Blazing Fast</div><div class="${uid('fglass')}-card-desc">Optimized performance that loads in milliseconds.</div></div>
      <div class="${uid('fglass')}-card"><div class="${uid('fglass')}-icon">🎨</div><div class="${uid('fglass')}-card-title">Beautiful Design</div><div class="${uid('fglass')}-card-desc">Stunning UI that your customers will love.</div></div>
      <div class="${uid('fglass')}-card"><div class="${uid('fglass')}-icon">📊</div><div class="${uid('fglass')}-card-title">Analytics</div><div class="${uid('fglass')}-card-desc">Deep insights into your business metrics.</div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'features-floating-labels',
    name: 'Features - Floating Labels',
    category: 'Features',
    description: 'Features with animated floating label badges',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'This is something wonderful' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods.' },
    ],
    generateHtml: (v) => `<div class="${uid('ffloat')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ffloat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ffloat')}-wrap { max-width: 800px; margin: 0 auto; padding: 100px 24px; text-align: center; position: relative; }
    .${uid('ffloat')}-label { display: inline-block; background: #f0f9ff; color: #0369a1; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 50px; margin-bottom: 24px; }
    .${uid('ffloat')}-title { font-size: 48px; font-weight: 700; color: #1a1a1a; line-height: 1.2; margin-bottom: 20px; }
    .${uid('ffloat')}-sub { font-size: 16px; color: #666; line-height: 1.7; max-width: 600px; margin: 0 auto 40px; }
    .${uid('ffloat')}-btns { display: flex; gap: 16px; justify-content: center; }
    .${uid('ffloat')}-btn { padding: 14px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; }
    .${uid('ffloat')}-btn.primary { background: #3b82f6; color: #fff; }
    .${uid('ffloat')}-btn.secondary { background: #f5f5f5; color: #1a1a1a; }
    .${uid('ffloat')}-badge { position: absolute; background: #fff; padding: 8px 16px; border-radius: 50px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); font-size: 13px; font-weight: 500; color: #1a1a1a; animation: ${uid('ffloat')}-bob 3s ease-in-out infinite; }
    .${uid('ffloat')}-badge:nth-child(1) { top: 20%; left: 5%; animation-delay: 0s; }
    .${uid('ffloat')}-badge:nth-child(2) { top: 30%; right: 5%; animation-delay: 1s; }
    .${uid('ffloat')}-badge:nth-child(3) { bottom: 25%; left: 10%; animation-delay: 2s; }
    @keyframes ${uid('ffloat')}-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @media (max-width: 768px) { .${uid('ffloat')}-title { font-size: 32px; } .${uid('ffloat')}-badge { display: none; } }
  </style>
  <div class="${uid('ffloat')}-wrap">
    <div class="${uid('ffloat')}-badge">✨ Easy to use</div>
    <div class="${uid('ffloat')}-badge">🔥 Trending</div>
    <div class="${uid('ffloat')}-badge">⭐ 5-star rated</div>
    <div class="${uid('ffloat')}-label">Read our latest article</div>
    <h2 class="${uid('ffloat')}-title">${v.headline}</h2>
    <p class="${uid('ffloat')}-sub">${v.subtext}</p>
    <div class="${uid('ffloat')}-btns">
      <a href="#" class="${uid('ffloat')}-btn primary">Jump on a call</a>
      <a href="#" class="${uid('ffloat')}-btn secondary">Sign up free</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'features-reveal',
    name: 'Features - Reveal Cards',
    category: 'Features',
    description: 'Feature cards with reveal animation effect',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Built for Scale' },
    ],
    generateHtml: (v) => `<div class="${uid('frev')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('frev')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('frev')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('frev')}-title { font-size: 42px; font-weight: 700; color: #fff; text-align: center; margin-bottom: 48px; }
    .${uid('frev')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('frev')}-card { background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border: 1px solid #333; border-radius: 16px; padding: 32px; position: relative; overflow: hidden; transition: all 0.4s ease; }
    .${uid('frev')}-card::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); transition: left 0.6s ease; }
    .${uid('frev')}-card:hover::before { left: 100%; }
    .${uid('frev')}-card:hover { border-color: #555; transform: translateY(-5px); }
    .${uid('frev')}-num { font-size: 48px; font-weight: 800; color: #333; margin-bottom: 16px; }
    .${uid('frev')}-card-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .${uid('frev')}-card-desc { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; }
    @media (max-width: 768px) { .${uid('frev')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('frev')}-wrap">
    <h2 class="${uid('frev')}-title">${v.headline}</h2>
    <div class="${uid('frev')}-grid">
      <div class="${uid('frev')}-card"><div class="${uid('frev')}-num">01</div><div class="${uid('frev')}-card-title">Global CDN</div><div class="${uid('frev')}-card-desc">Content delivered from 200+ edge locations worldwide.</div></div>
      <div class="${uid('frev')}-card"><div class="${uid('frev')}-num">02</div><div class="${uid('frev')}-card-title">Auto Scaling</div><div class="${uid('frev')}-card-desc">Automatically handles traffic spikes without intervention.</div></div>
      <div class="${uid('frev')}-card"><div class="${uid('frev')}-num">03</div><div class="${uid('frev')}-card-title">Zero Config</div><div class="${uid('frev')}-card-desc">Works out of the box with sensible defaults.</div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'features-sliding',
    name: 'Features - Sliding Panels',
    category: 'Features',
    description: 'Horizontal sliding feature panels',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Curate your products into simple collections.' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Use this page to group your products into themed collections, making it easy for customers to browse.' },
    ],
    generateHtml: (v) => `<div class="${uid('fslide')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fslide')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fslide')}-wrap { max-width: 1000px; margin: 0 auto; padding: 80px 24px; text-align: center; }
    .${uid('fslide')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; line-height: 1.2; margin-bottom: 16px; }
    .${uid('fslide')}-sub { font-size: 16px; color: #666; margin-bottom: 48px; }
    .${uid('fslide')}-cards { display: flex; gap: 20px; justify-content: center; }
    .${uid('fslide')}-card { background: #fff; border-radius: 16px; padding: 32px 40px; min-width: 180px; border: 1px solid #e0e0e0; transition: all 0.3s ease; cursor: pointer; }
    .${uid('fslide')}-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-color: #ccc; }
    .${uid('fslide')}-card-icon { font-size: 40px; margin-bottom: 16px; }
    .${uid('fslide')}-card-title { font-size: 16px; font-weight: 600; color: #1a1a1a; }
    @media (max-width: 768px) { .${uid('fslide')}-cards { flex-direction: column; align-items: center; } }
  </style>
  <div class="${uid('fslide')}-wrap">
    <h2 class="${uid('fslide')}-title">${v.headline}</h2>
    <p class="${uid('fslide')}-sub">${v.subtext}</p>
    <div class="${uid('fslide')}-cards">
      <div class="${uid('fslide')}-card"><div class="${uid('fslide')}-card-icon">🪴</div><div class="${uid('fslide')}-card-title">Home</div></div>
      <div class="${uid('fslide')}-card"><div class="${uid('fslide')}-card-icon">👟</div><div class="${uid('fslide')}-card-title">Footwear</div></div>
      <div class="${uid('fslide')}-card"><div class="${uid('fslide')}-card-icon">🎧</div><div class="${uid('fslide')}-card-title">Technology</div></div>
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
    id: 'testimonial-spotlight',
    name: 'Testimonials - Quote Spotlight',
    category: 'Testimonials',
    description: 'Large centered quote with spotlight effect',
    thumbnail: '',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'This platform has revolutionized the way we work. The intuitive interface and powerful features have boosted our productivity by 300%.' },
      { id: 'author', label: 'Author Name', type: 'text', defaultValue: 'Alexandra Rivera' },
      { id: 'role', label: 'Author Role', type: 'text', defaultValue: 'VP of Engineering, Fortune 500' },
    ],
    generateHtml: (v) => `<div class="${uid('tspot')}" style="background:#0a0a0a;min-height:450px;display:flex;align-items:center;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;position:relative;overflow:hidden;">
  <style>
    .${uid('tspot')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tspot')}::before { content: ''; position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(100,150,255,0.15) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: ${uid('tspot')}-pulse 6s ease-in-out infinite; }
    .${uid('tspot')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 24px; text-align: center; position: relative; z-index: 1; }
    .${uid('tspot')}-quote-mark { font-size: 80px; color: #333; line-height: 1; margin-bottom: 24px; }
    .${uid('tspot')}-quote { font-size: 28px; font-weight: 400; color: #fff; line-height: 1.5; margin-bottom: 40px; font-style: italic; }
    .${uid('tspot')}-author { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 8px; }
    .${uid('tspot')}-role { font-size: 14px; color: rgba(255,255,255,0.5); }
    @keyframes ${uid('tspot')}-pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.25; } }
    @media (max-width: 768px) { .${uid('tspot')}-quote { font-size: 20px; } }
  </style>
  <div class="${uid('tspot')}-wrap">
    <div class="${uid('tspot')}-quote-mark">"</div>
    <p class="${uid('tspot')}-quote">${v.quote}</p>
    <div class="${uid('tspot')}-author">${v.author}</div>
    <div class="${uid('tspot')}-role">${v.role}</div>
  </div>
</div>`
  },
  {
    id: 'testimonial-video',
    name: 'Testimonials - Video Style',
    category: 'Testimonials',
    description: 'Video thumbnail testimonial with play button',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'See Why Customers Love Us' },
      { id: 'name', label: 'Customer Name', type: 'text', defaultValue: 'James Wilson' },
      { id: 'company', label: 'Company', type: 'text', defaultValue: 'Founder, StartupXYZ' },
    ],
    generateHtml: (v) => `<div class="${uid('tvid')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('tvid')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('tvid')}-wrap { max-width: 1000px; margin: 0 auto; padding: 80px 24px; }
    .${uid('tvid')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('tvid')}-card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
    .${uid('tvid')}-video { position: relative; aspect-ratio: 16/9; background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .${uid('tvid')}-video::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop') center/cover; opacity: 0.6; }
    .${uid('tvid')}-play { width: 80px; height: 80px; background: rgba(255,255,255,0.95); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; transition: all 0.3s ease; }
    .${uid('tvid')}-video:hover .${uid('tvid')}-play { transform: scale(1.1); }
    .${uid('tvid')}-play::after { content: '▶'; font-size: 24px; color: #1a1a1a; margin-left: 4px; }
    .${uid('tvid')}-info { padding: 32px; display: flex; align-items: center; gap: 16px; }
    .${uid('tvid')}-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
    .${uid('tvid')}-name { font-size: 16px; font-weight: 600; color: #1a1a1a; }
    .${uid('tvid')}-company { font-size: 14px; color: #888; }
  </style>
  <div class="${uid('tvid')}-wrap">
    <h2 class="${uid('tvid')}-title">${v.headline}</h2>
    <div class="${uid('tvid')}-card">
      <div class="${uid('tvid')}-video"><div class="${uid('tvid')}-play"></div></div>
      <div class="${uid('tvid')}-info"><img class="${uid('tvid')}-avatar" src="https://i.pravatar.cc/100?img=8" alt=""><div><div class="${uid('tvid')}-name">${v.name}</div><div class="${uid('tvid')}-company">${v.company}</div></div></div>
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
    id: 'cta-gradient-glow',
    name: 'CTA - Gradient Glow Button',
    category: 'CTA',
    description: 'Call-to-action with animated glowing gradient button',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ready to Get Started?' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Join thousands of happy customers today.' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Start Free Trial' },
    ],
    generateHtml: (v) => `<div class="${uid('ctag')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctag')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctag')}-wrap { max-width: 800px; margin: 0 auto; padding: 100px 24px; text-align: center; }
    .${uid('ctag')}-title { font-size: 48px; font-weight: 700; color: #fff; margin-bottom: 16px; }
    .${uid('ctag')}-sub { font-size: 18px; color: rgba(255,255,255,0.6); margin-bottom: 40px; }
    .${uid('ctag')}-btn { position: relative; display: inline-block; padding: 18px 48px; background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #6366f1 100%); background-size: 200% 200%; color: #fff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 12px; animation: ${uid('ctag')}-glow 3s ease-in-out infinite; transition: all 0.3s ease; }
    .${uid('ctag')}-btn::before { content: ''; position: absolute; inset: -3px; background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #6366f1 100%); background-size: 200% 200%; border-radius: 14px; z-index: -1; filter: blur(15px); opacity: 0.6; animation: ${uid('ctag')}-glow 3s ease-in-out infinite; }
    .${uid('ctag')}-btn:hover { transform: translateY(-3px); }
    @keyframes ${uid('ctag')}-glow { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @media (max-width: 768px) { .${uid('ctag')}-title { font-size: 32px; } }
  </style>
  <div class="${uid('ctag')}-wrap">
    <h2 class="${uid('ctag')}-title">${v.headline}</h2>
    <p class="${uid('ctag')}-sub">${v.subtext}</p>
    <a href="#" class="${uid('ctag')}-btn">${v.btnText}</a>
  </div>
</div>`
  },
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
      { id: 'image', label: 'Image URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=600&fit=crop' },
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
  {
    id: 'cta-newsletter',
    name: 'CTA - Newsletter Minimal',
    category: 'CTA',
    description: 'Clean minimal email signup form',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Stay in the loop' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Get the latest updates delivered straight to your inbox.' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Subscribe' },
    ],
    generateHtml: (v) => `<div class="${uid('ctanews')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctanews')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctanews')}-wrap { max-width: 600px; margin: 0 auto; padding: 80px 24px; text-align: center; }
    .${uid('ctanews')}-title { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('ctanews')}-sub { font-size: 16px; color: #666; margin-bottom: 32px; }
    .${uid('ctanews')}-form { display: flex; gap: 12px; max-width: 450px; margin: 0 auto; }
    .${uid('ctanews')}-input { flex: 1; padding: 16px 20px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; outline: none; }
    .${uid('ctanews')}-input:focus { border-color: #1a1a1a; }
    .${uid('ctanews')}-btn { padding: 16px 28px; background: #1a1a1a; color: #fff; font-size: 14px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; }
    .${uid('ctanews')}-btn:hover { background: #333; }
    @media (max-width: 500px) { .${uid('ctanews')}-form { flex-direction: column; } }
  </style>
  <div class="${uid('ctanews')}-wrap">
    <h2 class="${uid('ctanews')}-title">${v.headline}</h2>
    <p class="${uid('ctanews')}-sub">${v.subtext}</p>
    <div class="${uid('ctanews')}-form">
      <input type="email" class="${uid('ctanews')}-input" placeholder="Enter your email">
      <button class="${uid('ctanews')}-btn">${v.btnText}</button>
    </div>
  </div>
</div>`
  },
  {
    id: 'cta-countdown-premium',
    name: 'CTA - Countdown Premium',
    category: 'CTA',
    description: 'Flip-clock style countdown timer',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Limited Time Offer' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Don\'t miss out on this exclusive deal' },
      { id: 'btnText', label: 'Button Text', type: 'text', defaultValue: 'Claim Offer' },
    ],
    generateHtml: (v) => `<div class="${uid('ctacd')}" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('ctacd')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('ctacd')}-wrap { max-width: 900px; margin: 0 auto; padding: 80px 24px; text-align: center; }
    .${uid('ctacd')}-title { font-size: 42px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .${uid('ctacd')}-sub { font-size: 18px; color: rgba(255,255,255,0.7); margin-bottom: 40px; }
    .${uid('ctacd')}-timer { display: flex; gap: 16px; justify-content: center; margin-bottom: 40px; }
    .${uid('ctacd')}-block { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px 32px; min-width: 100px; }
    .${uid('ctacd')}-num { font-size: 48px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 8px; }
    .${uid('ctacd')}-label { font-size: 12px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; }
    .${uid('ctacd')}-btn { display: inline-block; padding: 18px 48px; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: #fff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 50px; transition: all 0.3s ease; }
    .${uid('ctacd')}-btn:hover { transform: scale(1.05); box-shadow: 0 10px 40px rgba(245,158,11,0.3); }
    @media (max-width: 600px) { .${uid('ctacd')}-timer { flex-wrap: wrap; } .${uid('ctacd')}-block { min-width: 80px; padding: 16px 20px; } .${uid('ctacd')}-num { font-size: 32px; } }
  </style>
  <div class="${uid('ctacd')}-wrap">
    <h2 class="${uid('ctacd')}-title">${v.headline}</h2>
    <p class="${uid('ctacd')}-sub">${v.subtext}</p>
    <div class="${uid('ctacd')}-timer">
      <div class="${uid('ctacd')}-block"><div class="${uid('ctacd')}-num">02</div><div class="${uid('ctacd')}-label">Days</div></div>
      <div class="${uid('ctacd')}-block"><div class="${uid('ctacd')}-num">18</div><div class="${uid('ctacd')}-label">Hours</div></div>
      <div class="${uid('ctacd')}-block"><div class="${uid('ctacd')}-num">45</div><div class="${uid('ctacd')}-label">Minutes</div></div>
      <div class="${uid('ctacd')}-block"><div class="${uid('ctacd')}-num">30</div><div class="${uid('ctacd')}-label">Seconds</div></div>
    </div>
    <a href="#" class="${uid('ctacd')}-btn">${v.btnText}</a>
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
    ],
    generateHtml: (v) => `<div class="${uid('phover')}" style="background:#fff;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('phover')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('phover')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('phover')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('phover')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .${uid('phover')}-card { position: relative; overflow: hidden; border-radius: 16px; cursor: pointer; }
    .${uid('phover')}-card img { width: 100%; aspect-ratio: 3/4; object-fit: cover; transition: transform 0.5s ease; }
    .${uid('phover')}-card:hover img { transform: scale(1.1); }
    .${uid('phover')}-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; opacity: 0; transition: opacity 0.3s ease; }
    .${uid('phover')}-card:hover .${uid('phover')}-overlay { opacity: 1; }
    .${uid('phover')}-name { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 4px; }
    .${uid('phover')}-price { font-size: 14px; color: rgba(255,255,255,0.8); }
    .${uid('phover')}-btn { margin-top: 16px; padding: 10px 20px; background: #fff; color: #1a1a1a; font-size: 12px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; }
    @media (max-width: 900px) { .${uid('phover')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('phover')}-wrap">
    <h2 class="${uid('phover')}-title">${v.headline}</h2>
    <div class="${uid('phover')}-grid">
      <div class="${uid('phover')}-card"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop" alt=""><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">Premium Watch</div><div class="${uid('phover')}-price">$299.00</div><button class="${uid('phover')}-btn">Quick View</button></div></div>
      <div class="${uid('phover')}-card"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop" alt=""><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">Wireless Headphones</div><div class="${uid('phover')}-price">$199.00</div><button class="${uid('phover')}-btn">Quick View</button></div></div>
      <div class="${uid('phover')}-card"><img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop" alt=""><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">Designer Sunglasses</div><div class="${uid('phover')}-price">$149.00</div><button class="${uid('phover')}-btn">Quick View</button></div></div>
      <div class="${uid('phover')}-card"><img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=500&fit=crop" alt=""><div class="${uid('phover')}-overlay"><div class="${uid('phover')}-name">Leather Bag</div><div class="${uid('phover')}-price">$349.00</div><button class="${uid('phover')}-btn">Quick View</button></div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'product-category-icons',
    name: 'Product - Category Icons',
    category: 'Product',
    description: 'Category cards with icon badges',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Shop by Category' },
    ],
    generateHtml: (v) => `<div class="${uid('pcat')}" style="background:#fafafa;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pcat')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pcat')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
    .${uid('pcat')}-title { font-size: 36px; font-weight: 700; color: #1a1a1a; text-align: center; margin-bottom: 48px; }
    .${uid('pcat')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .${uid('pcat')}-card { background: #fff; border-radius: 16px; padding: 32px; text-align: center; transition: all 0.3s ease; cursor: pointer; border: 1px solid #f0f0f0; }
    .${uid('pcat')}-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
    .${uid('pcat')}-icon { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 50%; background: #f5f5f5; display: flex; align-items: center; justify-content: center; font-size: 36px; }
    .${uid('pcat')}-name { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
    .${uid('pcat')}-count { font-size: 13px; color: #888; }
    @media (max-width: 768px) { .${uid('pcat')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('pcat')}-wrap">
    <h2 class="${uid('pcat')}-title">${v.headline}</h2>
    <div class="${uid('pcat')}-grid">
      <div class="${uid('pcat')}-card"><div class="${uid('pcat')}-icon">👕</div><div class="${uid('pcat')}-name">Clothing</div><div class="${uid('pcat')}-count">248 items</div></div>
      <div class="${uid('pcat')}-card"><div class="${uid('pcat')}-icon">👟</div><div class="${uid('pcat')}-name">Footwear</div><div class="${uid('pcat')}-count">186 items</div></div>
      <div class="${uid('pcat')}-card"><div class="${uid('pcat')}-icon">💍</div><div class="${uid('pcat')}-name">Accessories</div><div class="${uid('pcat')}-count">124 items</div></div>
      <div class="${uid('pcat')}-card"><div class="${uid('pcat')}-icon">👜</div><div class="${uid('pcat')}-name">Bags</div><div class="${uid('pcat')}-count">92 items</div></div>
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
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'See the Difference' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Drag to compare before and after results' },
    ],
    generateHtml: (v) => `<div class="${uid('pba')}" style="background:#0a0a0a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('pba')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('pba')}-wrap { max-width: 900px; margin: 0 auto; padding: 80px 24px; text-align: center; }
    .${uid('pba')}-title { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .${uid('pba')}-sub { font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 40px; }
    .${uid('pba')}-compare { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 16/9; }
    .${uid('pba')}-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .${uid('pba')}-img.after { clip-path: inset(0 50% 0 0); }
    .${uid('pba')}-divider { position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; background: #fff; transform: translateX(-50%); cursor: ew-resize; }
    .${uid('pba')}-divider::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: #fff; border-radius: 50%; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
    .${uid('pba')}-labels { display: flex; justify-content: space-between; margin-top: 20px; }
    .${uid('pba')}-label { font-size: 14px; color: rgba(255,255,255,0.6); }
  </style>
  <div class="${uid('pba')}-wrap">
    <h2 class="${uid('pba')}-title">${v.headline}</h2>
    <p class="${uid('pba')}-sub">${v.subtext}</p>
    <div class="${uid('pba')}-compare">
      <img class="${uid('pba')}-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&sat=-100" alt="Before">
      <img class="${uid('pba')}-img after" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop" alt="After">
      <div class="${uid('pba')}-divider"></div>
    </div>
    <div class="${uid('pba')}-labels"><span class="${uid('pba')}-label">Before</span><span class="${uid('pba')}-label">After</span></div>
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
      <div class="${uid('pqv')}-image"><img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=700&fit=crop" alt=""><div class="${uid('pqv')}-badge">NEW</div></div>
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
      <div class="${uid('teamf')}-card"><div class="${uid('teamf')}-inner"><div class="${uid('teamf')}-front"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" alt=""></div><div class="${uid('teamf')}-back"><div class="${uid('teamf')}-name">John Smith</div><div class="${uid('teamf')}-role">CEO & Founder</div><div class="${uid('teamf')}-bio">15+ years of experience building world-class products.</div></div></div></div>
      <div class="${uid('teamf')}-card"><div class="${uid('teamf')}-inner"><div class="${uid('teamf')}-front"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" alt=""></div><div class="${uid('teamf')}-back"><div class="${uid('teamf')}-name">Sarah Chen</div><div class="${uid('teamf')}-role">CTO</div><div class="${uid('teamf')}-bio">Former Google engineer passionate about innovation.</div></div></div></div>
      <div class="${uid('teamf')}-card"><div class="${uid('teamf')}-inner"><div class="${uid('teamf')}-front"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" alt=""></div><div class="${uid('teamf')}-back"><div class="${uid('teamf')}-name">Michael Lee</div><div class="${uid('teamf')}-role">Head of Design</div><div class="${uid('teamf')}-bio">Award-winning designer with a keen eye for detail.</div></div></div></div>
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
  {
    id: 'about-stats-row',
    name: 'About - Stats Row',
    category: 'Story',
    description: 'Horizontal stats with icons',
    thumbnail: '',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our Impact in Numbers' },
    ],
    generateHtml: (v) => `<div class="${uid('astats')}" style="background:#1a1a1a;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('astats')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('astats')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 24px; text-align: center; }
    .${uid('astats')}-title { font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 60px; }
    .${uid('astats')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
    .${uid('astats')}-item { text-align: center; }
    .${uid('astats')}-icon { font-size: 40px; margin-bottom: 16px; }
    .${uid('astats')}-num { font-size: 48px; font-weight: 800; color: #fff; margin-bottom: 8px; }
    .${uid('astats')}-label { font-size: 14px; color: rgba(255,255,255,0.6); }
    @media (max-width: 768px) { .${uid('astats')}-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; } .${uid('astats')}-num { font-size: 36px; } }
  </style>
  <div class="${uid('astats')}-wrap">
    <h2 class="${uid('astats')}-title">${v.headline}</h2>
    <div class="${uid('astats')}-grid">
      <div class="${uid('astats')}-item"><div class="${uid('astats')}-icon">🌍</div><div class="${uid('astats')}-num">50+</div><div class="${uid('astats')}-label">Countries</div></div>
      <div class="${uid('astats')}-item"><div class="${uid('astats')}-icon">👥</div><div class="${uid('astats')}-num">100K+</div><div class="${uid('astats')}-label">Happy Customers</div></div>
      <div class="${uid('astats')}-item"><div class="${uid('astats')}-icon">⭐</div><div class="${uid('astats')}-num">4.9</div><div class="${uid('astats')}-label">Average Rating</div></div>
      <div class="${uid('astats')}-item"><div class="${uid('astats')}-icon">🏆</div><div class="${uid('astats')}-num">25+</div><div class="${uid('astats')}-label">Awards Won</div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'about-mission',
    name: 'About - Mission Statement',
    category: 'Story',
    description: 'Large centered mission text with subtle animation',
    thumbnail: '',
    fields: [
      { id: 'mission', label: 'Mission Statement', type: 'textarea', defaultValue: 'We believe in creating products that make a difference. Our mission is to empower every person and organization to achieve more through innovative technology and thoughtful design.' },
    ],
    generateHtml: (v) => `<div class="${uid('amiss')}" style="background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('amiss')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('amiss')}-wrap { max-width: 900px; margin: 0 auto; padding: 120px 24px; text-align: center; }
    .${uid('amiss')}-label { font-size: 13px; font-weight: 600; color: #6366f1; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 24px; }
    .${uid('amiss')}-text { font-size: 36px; font-weight: 400; color: #1a1a1a; line-height: 1.5; }
    .${uid('amiss')}-text span { display: inline-block; animation: ${uid('amiss')}-fade 0.5s ease forwards; opacity: 0; }
    @keyframes ${uid('amiss')}-fade { to { opacity: 1; } }
    @media (max-width: 768px) { .${uid('amiss')}-text { font-size: 24px; } }
  </style>
  <div class="${uid('amiss')}-wrap">
    <div class="${uid('amiss')}-label">Our Mission</div>
    <p class="${uid('amiss')}-text">${v.mission}</p>
  </div>
</div>`
  },

  // ========== HEADER SECTIONS (21st.dev inspired) ==========
  {
    id: 'header-centered-logo',
    name: 'Header - Centered Logo',
    category: 'Banner',
    description: 'Navigation with centered logo',
    thumbnail: '',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'BRAND' },
    ],
    generateHtml: (v) => `<div class="${uid('hcent')}" style="background:#fff;border-bottom:1px solid #f0f0f0;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('hcent')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hcent')}-wrap { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; max-width: 1400px; margin: 0 auto; padding: 20px 24px; }
    .${uid('hcent')}-nav { display: flex; gap: 32px; }
    .${uid('hcent')}-nav.right { justify-content: flex-end; }
    .${uid('hcent')}-nav a { font-size: 13px; font-weight: 500; color: #666; text-decoration: none; transition: color 0.2s; }
    .${uid('hcent')}-nav a:hover { color: #1a1a1a; }
    .${uid('hcent')}-logo { font-size: 20px; font-weight: 700; letter-spacing: 0.2em; color: #1a1a1a; text-decoration: none; }
    @media (max-width: 768px) { .${uid('hcent')}-nav { display: none; } .${uid('hcent')}-wrap { display: flex; justify-content: center; } }
  </style>
  <div class="${uid('hcent')}-wrap">
    <nav class="${uid('hcent')}-nav"><a href="#">Shop</a><a href="#">Collections</a><a href="#">About</a></nav>
    <a href="#" class="${uid('hcent')}-logo">${v.brandName}</a>
    <nav class="${uid('hcent')}-nav right"><a href="#">Search</a><a href="#">Account</a><a href="#">Cart (0)</a></nav>
  </div>
</div>`
  },
  {
    id: 'header-sticky-blur',
    name: 'Header - Sticky Blur',
    category: 'Banner',
    description: 'Glassmorphism sticky header',
    thumbnail: '',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'Company' },
    ],
    generateHtml: (v) => `<div class="${uid('hblur')}" style="background:rgba(255,255,255,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,0.05);font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('hblur')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hblur')}-wrap { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; padding: 16px 24px; }
    .${uid('hblur')}-logo { font-size: 18px; font-weight: 700; color: #1a1a1a; text-decoration: none; }
    .${uid('hblur')}-nav { display: flex; gap: 32px; }
    .${uid('hblur')}-nav a { font-size: 14px; font-weight: 500; color: #666; text-decoration: none; transition: color 0.2s; }
    .${uid('hblur')}-nav a:hover { color: #1a1a1a; }
    .${uid('hblur')}-btn { padding: 10px 20px; background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 6px; transition: all 0.2s; }
    .${uid('hblur')}-btn:hover { background: #333; }
    @media (max-width: 768px) { .${uid('hblur')}-nav { display: none; } }
  </style>
  <div class="${uid('hblur')}-wrap">
    <a href="#" class="${uid('hblur')}-logo">${v.brandName}</a>
    <nav class="${uid('hblur')}-nav"><a href="#">Features</a><a href="#">Pricing</a><a href="#">About</a><a href="#">Contact</a></nav>
    <a href="#" class="${uid('hblur')}-btn">Get Started</a>
  </div>
</div>`
  },

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
  {
    id: 'footer-minimal-center',
    name: 'Footer - Minimal Centered',
    category: 'Footer',
    description: 'Clean centered minimal footer',
    thumbnail: '',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'Brand' },
    ],
    generateHtml: (v) => `<div class="${uid('fmin')}" style="background:#fafafa;border-top:1px solid #f0f0f0;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;">
  <style>
    .${uid('fmin')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('fmin')}-wrap { max-width: 800px; margin: 0 auto; padding: 60px 24px; text-align: center; }
    .${uid('fmin')}-logo { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px; }
    .${uid('fmin')}-links { display: flex; gap: 32px; justify-content: center; margin-bottom: 32px; }
    .${uid('fmin')}-links a { font-size: 14px; color: #666; text-decoration: none; transition: color 0.2s; }
    .${uid('fmin')}-links a:hover { color: #1a1a1a; }
    .${uid('fmin')}-social { display: flex; gap: 20px; justify-content: center; margin-bottom: 32px; }
    .${uid('fmin')}-social a { font-size: 18px; color: #666; text-decoration: none; transition: color 0.2s; }
    .${uid('fmin')}-social a:hover { color: #1a1a1a; }
    .${uid('fmin')}-copy { font-size: 13px; color: #999; }
    @media (max-width: 500px) { .${uid('fmin')}-links { flex-wrap: wrap; gap: 16px; } }
  </style>
  <div class="${uid('fmin')}-wrap">
    <div class="${uid('fmin')}-logo">${v.brandName}</div>
    <div class="${uid('fmin')}-links"><a href="#">Home</a><a href="#">Shop</a><a href="#">About</a><a href="#">Contact</a><a href="#">FAQ</a></div>
    <div class="${uid('fmin')}-social"><a href="#">Twitter</a><a href="#">Instagram</a><a href="#">LinkedIn</a></div>
    <div class="${uid('fmin')}-copy">© 2025 ${v.brandName}. Made with care.</div>
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
