const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Brand to lesson mappings based on keyword analysis
const brandPlacements = {
  'PayPal': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg',
    lessons: ['checkout-line-effect', 'buy-now-button', 'mastercard-psychology']
  },
  'Visa': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Visa_Inc._logo.svg.png',
    lessons: ['price-format-code', 'three-cro-tests']
  },
  'American Express': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/American-Express-logo.png',
    lessons: ['biz-high-margin-fortress', 'luxury-mindset-shift']
  },
  'Klarna': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klarna_Payment_Badge.svg.png',
    lessons: ['biz-presale-financing'] // Already has Oodie, will skip
  },
  'Afterpay': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/after%20pay%20(1).png',
    lessons: ['price-chunking-yesloop']
  },
  'HyperSKU': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HyperSKU-Logo-scaled.png',
    lessons: ['google-store-trust-checklist', 'biz-automation-ratio']
  },
  'AutoDS': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/our-supported-center-desktop-1.svg',
    lessons: ['biz-ltv-cac-dashboard']
  },
  'Lululemon': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/letter-a-1.jpg',
    lessons: ['google-pmax-blueprint', 'borrowed-trust']
  },
  'BMW': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg',
    lessons: ['visual-priming', 'micro-yes-mastery']
  },
  'Rolls-Royce': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolls-Royce-Logo.jpg',
    lessons: ['digital-velvet-rope', 'hidden-menu-psychology']
  },
  'LVMH': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LVMH-black.png',
    lessons: ['fonts-psychology', 'four-primal-needs']
  },
  'Hermes': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Hermes_Paris_(logo).svg.png',
    lessons: ['fomo-engineering']
  },
  'Chanel': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png',
    lessons: ['best-niches-2026']
  },
  'H&M': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/H&M-Logo.svg.png',
    lessons: ['meta-auction-formula', 'meta-marathon-metrics']
  },
  'Headspace': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/headspace-1.jpg',
    lessons: ['certainty-transfer']
  },
  'Supreme': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg',
    lessons: ['dopamine-blueprint', 'scammer-playbook-good']
  },
  'Pizza Hut': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pizza_Hut_international_logo_2014.svg.png',
    lessons: ['value-ladder', 'hidden-menu-psychology']
  },
  'BigCommerce': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Bc-logo-dark.svg.png',
    lessons: ['pet-rock-story']
  },
  'Squarespace': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Squarespace-Logo.png',
    lessons: ['google-landing-page-bridge', 'trust-blueprint']
  },
  'KeepCart': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLnu1ve1jY0DEAE=.webp',
    lessons: ['abandoned-cart-recovery', 'ninety-seven-percent-leak', 'wishlist-effect']
  },
  'Allbirds': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Allbirds_logo.svg.png',
    lessons: ['invisible-influence', 'ethical-persuasion-compass', 'google-hero-product-funnel']
  },
  'TOMS': {
    url: null, // No URL available
    lessons: []
  },
  'Hyros': {
    url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Helping-Marketers-Leverage-Data-with-HYROS-1024x538.png',
    lessons: ['google-data-quality-edge', 'biz-look-back-window', 'three-levels-of-change']
  }
};

let addedCount = 0;
const added = {};

for (const [brand, config] of Object.entries(brandPlacements)) {
  if (!config.url) continue;
  added[brand] = [];

  for (const lessonName of config.lessons) {
    const lessonPath = path.join(lessonsDir, lessonName, 'lesson.html');
    if (!fs.existsSync(lessonPath)) {
      console.log(`⚠️ Lesson not found: ${lessonName}`);
      continue;
    }

    let content = fs.readFileSync(lessonPath, 'utf8');

    // Skip if already has a brandImage
    if (content.includes('brandImage:')) {
      console.log(`⏭️ Already has brand: ${lessonName}`);
      continue;
    }

    // Find the hook slide and add brand
    const hookMatch = content.match(/\{\s*type:\s*['"]hook['"]([^}]*)\}/);
    if (!hookMatch) {
      console.log(`⚠️ No hook found: ${lessonName}`);
      continue;
    }

    const original = hookMatch[0];
    const modified = original.slice(0, -1) + `, brandImage: '${config.url}', brandName: '${brand}' }`;

    content = content.replace(original, modified);
    fs.writeFileSync(lessonPath, content);
    added[brand].push(lessonName);
    addedCount++;
    console.log(`✅ Added ${brand} to ${lessonName}`);
  }
}

console.log('\n========================================');
console.log(`TOTAL: Added ${addedCount} brand logos`);
console.log('========================================\n');

for (const [brand, lessons] of Object.entries(added)) {
  if (lessons.length > 0) {
    console.log(`${brand}: ${lessons.join(', ')}`);
  }
}
