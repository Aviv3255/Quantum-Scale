const fs = require('fs');
const path = require('path');

const lessonsDir = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons';

// All remaining brands with their logo URLs
const remainingBrands = [
  { name: 'Instagram', searchTerms: ['Instagram'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Instagram_logo_2016.svg.webp' },
  { name: 'DataDrew', searchTerms: ['DataDrew', 'Data Drew'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(18).jpg' },
  { name: 'TikTok', searchTerms: ['TikTok', 'Tik Tok'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tiktok-app-icon-social-media-logo_277909-647.png' },
  { name: 'YouTube', searchTerms: ['YouTube', 'Youtube'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/YouTube_Logo_2017.svg.png' },
  { name: 'HyperSKU', searchTerms: ['HyperSKU', 'Hyper SKU'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HyperSKU-Logo-scaled.png' },
  { name: 'Stripe', searchTerms: ['Stripe'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/free-stripe-logo-icon-svg-download-png-498440.webp' },
  { name: 'Lululemon', searchTerms: ['Lululemon', 'lululemon'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/letter-a-1.jpg' },
  { name: 'TxtCart', searchTerms: ['TxtCart', 'Txt Cart'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLyh0p-rhJADEAE=.webp' },
  { name: 'ReConvert', searchTerms: ['ReConvert', 'Reconvert'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CIuoqfrDj_sCEAE=.webp' },
  { name: 'MasterCard', searchTerms: ['MasterCard', 'Mastercard', 'mastercard'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Mastercard-Logo.png' },
  { name: 'Klaviyo', searchTerms: ['Klaviyo'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klaviyo-primary-logo-charcoal.svg.png' },
  { name: 'Hims', searchTerms: ['Hims'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HIMS-797814ee.png' },
  { name: 'Framer', searchTerms: ['Framer'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/framer-1.svg' },
  { name: 'Triple Whale', searchTerms: ['Triple Whale', 'TripleWhale'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/67e3c7b0162e6313d4bdc706_Logo%20Icon.webp' },
  { name: 'Grapevine Surveys', searchTerms: ['Grapevine Surveys', 'Grapevine'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CP2bp6uL9YoDEAE=.webp' },
  { name: 'Alibaba', searchTerms: ['Alibaba'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Alibaba-Logo-3.png' },
  { name: 'AutoDS', searchTerms: ['AutoDS', 'Auto DS'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/our-supported-center-desktop-1.svg' },
  { name: 'Honey', searchTerms: ['Honey'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/unnamed%20(1).png' },
  { name: 'Pepsi', searchTerms: ['Pepsi'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pepsi_2023.svg' },
  { name: 'Canva', searchTerms: ['Canva'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/dfb96cc174513093cd6ed61489ccb750.svg' },
  { name: 'Cheesecake Factory', searchTerms: ['Cheesecake Factory'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Cheesecake-Factory-Logo.jpg' },
  { name: 'Peloton', searchTerms: ['Peloton'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Peloton-logo.png' },
  { name: 'Dollar Shave Club', searchTerms: ['Dollar Shave Club', 'DSC'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dollar-Shave-Club.webp' },
  { name: 'Adidas', searchTerms: ['Adidas', 'adidas'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Adidas_Logo.svg.png' },
  { name: 'Netflix', searchTerms: ['Netflix'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png' },
  { name: 'PayPal', searchTerms: ['PayPal', 'Paypal'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg' },
  { name: 'Lamborghini', searchTerms: ['Lamborghini'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lamborghini-Logo-1998-present-700x394-1.png' },
  { name: 'Rolls-Royce', searchTerms: ['Rolls-Royce', 'Rolls Royce'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolls-Royce-Logo.jpg' },
  { name: 'De Beers', searchTerms: ['De Beers', 'DeBeers'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/De-Beers-Logo-before-2018.png' },
  { name: 'Geo Convert', searchTerms: ['Geo Convert', 'GeoConvert'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(19).jpg' },
  { name: 'KeepCart', searchTerms: ['KeepCart', 'Keep Cart'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLnu1ve1jY0DEAE=.webp' },
  { name: 'Headspace', searchTerms: ['Headspace'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/headspace-1.jpg' },
  { name: 'Supreme', searchTerms: ['Supreme'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg' },
  { name: 'Pizza Hut', searchTerms: ['Pizza Hut'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pizza_Hut_international_logo_2014.svg.png' },
  { name: 'Porsche', searchTerms: ['Porsche'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg' },
  { name: 'BMW', searchTerms: ['BMW'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg' },
  { name: 'Affirm', searchTerms: ['Affirm'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Affirm_logo.svg.png' },
  { name: 'Hyros', searchTerms: ['Hyros', 'HYROS'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Helping-Marketers-Leverage-Data-with-HYROS-1024x538.png' },
  { name: 'Klarna', searchTerms: ['Klarna'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klarna_Payment_Badge.svg.png' },
  { name: 'Afterpay', searchTerms: ['Afterpay', 'After Pay'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/after%20pay%20(1).png' },
  { name: 'LVMH', searchTerms: ['LVMH'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LVMH-black.png' },
  { name: 'Zara', searchTerms: ['Zara'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/2019-to-Present-Zara-logo-design-1024x538.webp' },
  { name: 'Unilever', searchTerms: ['Unilever'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Unilever.svg' },
  { name: 'Ritual', searchTerms: ['Ritual'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/ritual-logo.svg' },
  { name: 'H&M', searchTerms: ['H&M'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/H&M-Logo.svg.png' },
  { name: 'Chanel', searchTerms: ['Chanel'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png' },
  { name: 'Ferrari', searchTerms: ['Ferrari'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Scuderia_Ferrari_Logo.svg.png' },
  { name: 'Lexus', searchTerms: ['Lexus'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lexus-cars-logo-emblem.jpg' },
  { name: 'Lucid', searchTerms: ['Lucid'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lucid-Motors-Logo.jpg' },
  { name: 'Visa', searchTerms: ['Visa'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Visa_Inc._logo.svg.png' },
  { name: 'American Express', searchTerms: ['American Express', 'Amex'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/American-Express-logo.png' },
  { name: 'Slack', searchTerms: ['Slack'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Slack_Technologies-Logo.wine.png' },
  { name: 'Allbirds', searchTerms: ['Allbirds'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Allbirds_logo.svg.png' },
  { name: 'BigCommerce', searchTerms: ['BigCommerce'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Bc-logo-dark.svg.png' },
  { name: 'WooCommerce', searchTerms: ['WooCommerce'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/WooCommerce_logo_(2015).png' },
  { name: 'Squarespace', searchTerms: ['Squarespace'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Squarespace-Logo.png' },
  { name: 'REI', searchTerms: ['REI'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/REI_logo.svg.png' },
  { name: 'Subway', searchTerms: ['Subway'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Subway%20Choicemark_thumbnail.png' },
];

const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Processing ${folders.length} lessons for ${remainingBrands.length} brands...\n`);

// Function to add brand to hook slide - handles ALL pattern variations
function addBrandToHook(content, brandUrl, brandName) {
  // Skip if already has brandImage
  if (content.includes('brandImage:')) {
    return null;
  }

  // Find the hook slide data - look for the slides array and find the hook entry
  // Pattern: { type: 'hook', headline: '...', subtext: '...' }

  // Multiple patterns to try
  const patterns = [
    // Pattern 1: subtext at end with single quotes
    /(\{\s*type:\s*'hook'[^}]*subtext:\s*'[^']*')\s*\}/g,
    // Pattern 2: subtext at end with double quotes
    /(\{\s*type:\s*"hook"[^}]*subtext:\s*"[^"]*")\s*\}/g,
    // Pattern 3: headline at end with single quotes
    /(\{\s*type:\s*'hook'[^}]*headline:\s*'[^']*')\s*\}/g,
    // Pattern 4: headline at end with double quotes
    /(\{\s*type:\s*"hook"[^}]*headline:\s*"[^"]*")\s*\}/g,
  ];

  for (const pattern of patterns) {
    const matches = [...content.matchAll(pattern)];
    if (matches.length > 0) {
      // Use the first match (hook slide)
      const match = matches[0];
      const original = match[0];
      const beforeClosing = match[1];
      const replacement = `${beforeClosing}, brandImage: '${brandUrl}', brandName: '${brandName}' }`;
      return content.replace(original, replacement);
    }
  }

  // Try a more flexible approach - find type: 'hook' and locate its closing brace
  const hookStart = content.search(/\{\s*type:\s*['"]hook['"]/);
  if (hookStart === -1) return null;

  // Find the position after the hook object starts
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let hookEnd = -1;

  for (let i = hookStart; i < content.length; i++) {
    const char = content[i];

    if (!inString) {
      if (char === '"' || char === "'") {
        inString = true;
        stringChar = char;
      } else if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          hookEnd = i;
          break;
        }
      }
    } else {
      if (char === stringChar && content[i-1] !== '\\') {
        inString = false;
      }
    }
  }

  if (hookEnd === -1) return null;

  // Insert brand info before the closing brace
  const before = content.substring(0, hookEnd);
  const after = content.substring(hookEnd);
  return `${before}, brandImage: '${brandUrl}', brandName: '${brandName}'${after}`;
}

// Find prominent brand mentions
const lessonsWithBrands = [];

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  const content = fs.readFileSync(lessonPath, 'utf8');
  if (content.includes('brandImage:')) continue;

  for (const brand of remainingBrands) {
    for (const term of brand.searchTerms) {
      const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = content.match(regex);
      if (matches && matches.length >= 2) {
        lessonsWithBrands.push({
          folder,
          brand: brand.name,
          term,
          count: matches.length,
          url: brand.url
        });
        break;
      }
    }
  }
}

// Group by lesson and pick top brand
const byLesson = {};
lessonsWithBrands.forEach(item => {
  if (!byLesson[item.folder]) {
    byLesson[item.folder] = [];
  }
  byLesson[item.folder].push(item);
});

const sortedLessons = Object.entries(byLesson).sort((a, b) => {
  const maxA = Math.max(...a[1].map(x => x.count));
  const maxB = Math.max(...b[1].map(x => x.count));
  return maxB - maxA;
});

let addedCount = 0;
const addedLessons = [];
const failedLessons = [];

for (const [folder, brands] of sortedLessons) {
  const topBrand = brands.reduce((a, b) => a.count > b.count ? a : b);

  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  let content = fs.readFileSync(lessonPath, 'utf8').replace(/\r\n/g, '\n');

  const newContent = addBrandToHook(content, topBrand.url, topBrand.brand);

  if (newContent) {
    fs.writeFileSync(lessonPath, newContent.replace(/\n/g, '\r\n'));
    addedCount++;
    addedLessons.push({ folder, brand: topBrand.brand, count: topBrand.count });
    console.log(`✅ ${folder}: Added ${topBrand.brand} (${topBrand.count} mentions)`);
  } else {
    failedLessons.push({ folder, brand: topBrand.brand });
  }
}

console.log('\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Lessons processed: ${sortedLessons.length}`);
console.log(`Brand logos added: ${addedCount}`);
console.log(`Failed to modify: ${failedLessons.length}`);

if (failedLessons.length > 0 && failedLessons.length < 20) {
  console.log('\nFailed lessons:');
  failedLessons.forEach(l => console.log(`  - ${l.folder} (${l.brand})`));
}
