const fs = require('fs');
const path = require('path');

const lessonsDir = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons';

// All remaining brands with their logo URLs
const remainingBrands = [
  // TIER 1 - High Priority
  { name: 'Instagram', searchTerms: ['Instagram'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Instagram_logo_2016.svg.webp' },
  { name: 'DataDrew', searchTerms: ['DataDrew', 'Data Drew'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(18).jpg' },
  { name: 'TikTok', searchTerms: ['TikTok', 'Tik Tok'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tiktok-app-icon-social-media-logo_277909-647.png' },
  { name: 'YouTube', searchTerms: ['YouTube', 'Youtube'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/YouTube_Logo_2017.svg.png' },

  // TIER 2 - Medium Priority
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

  // TIER 3 - Lower Priority
  { name: 'Peloton', searchTerms: ['Peloton'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Peloton-logo.png' },
  { name: 'Dollar Shave Club', searchTerms: ['Dollar Shave Club', 'DSC'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dollar-Shave-Club.webp' },
  { name: 'Adidas', searchTerms: ['Adidas', 'adidas'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Adidas_Logo.svg.png' },
  { name: 'Netflix', searchTerms: ['Netflix'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png' },
  { name: 'PayPal', searchTerms: ['PayPal', 'Paypal'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg' },
  { name: 'Lamborghini', searchTerms: ['Lamborghini'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lamborghini-Logo-1998-present-700x394-1.png' },
  { name: 'Rolls-Royce', searchTerms: ['Rolls-Royce', 'Rolls Royce', 'RollsRoyce'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolls-Royce-Logo.jpg' },
  { name: 'De Beers', searchTerms: ['De Beers', 'DeBeers'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/De-Beers-Logo-before-2018.png' },
  { name: 'Geo Convert', searchTerms: ['Geo Convert', 'GeoConvert'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(19).jpg' },
  { name: 'KeepCart', searchTerms: ['KeepCart', 'Keep Cart'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLnu1ve1jY0DEAE=.webp' },
  { name: 'Headspace', searchTerms: ['Headspace'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/headspace-1.jpg' },
  { name: 'Supreme', searchTerms: ['Supreme'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg' },
  { name: 'Pizza Hut', searchTerms: ['Pizza Hut', 'PizzaHut'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pizza_Hut_international_logo_2014.svg.png' },
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
  { name: 'H&M', searchTerms: ['H&M', 'H & M'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/H&M-Logo.svg.png' },
  { name: 'Chanel', searchTerms: ['Chanel'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png' },
  { name: 'Ferrari', searchTerms: ['Ferrari'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Scuderia_Ferrari_Logo.svg.png' },
  { name: 'Lexus', searchTerms: ['Lexus'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lexus-cars-logo-emblem.jpg' },
  { name: 'Lucid', searchTerms: ['Lucid'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lucid-Motors-Logo.jpg' },
  { name: 'Visa', searchTerms: ['Visa'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Visa_Inc._logo.svg.png' },
  { name: 'American Express', searchTerms: ['American Express', 'Amex', 'AMEX'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/American-Express-logo.png' },
  { name: 'Slack', searchTerms: ['Slack'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Slack_Technologies-Logo.wine.png' },
  { name: 'Allbirds', searchTerms: ['Allbirds', 'All Birds'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Allbirds_logo.svg.png' },
  { name: 'BigCommerce', searchTerms: ['BigCommerce', 'Big Commerce'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Bc-logo-dark.svg.png' },
  { name: 'WooCommerce', searchTerms: ['WooCommerce', 'Woo Commerce'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/WooCommerce_logo_(2015).png' },
  { name: 'Squarespace', searchTerms: ['Squarespace'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Squarespace-Logo.png' },
  { name: 'REI', searchTerms: ['REI'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/REI_logo.svg.png' },
  { name: 'Subway', searchTerms: ['Subway'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Subway%20Choicemark_thumbnail.png' },
];

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Comprehensive scan of ${folders.length} lessons for ${remainingBrands.length} brands...\n`);

// First, let's see which lessons mention these brands ANYWHERE in the content
const lessonsWithBrands = [];

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Skip if already has a brandImage
  if (content.includes('brandImage:')) continue;

  // Check for each brand
  for (const brand of remainingBrands) {
    for (const term of brand.searchTerms) {
      // Count occurrences (case insensitive for some brands)
      const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = content.match(regex);
      if (matches && matches.length >= 2) { // At least 2 mentions = prominent
        lessonsWithBrands.push({
          folder,
          brand: brand.name,
          term,
          count: matches.length,
          url: brand.url
        });
        break; // Don't count the same brand twice
      }
    }
  }
}

// Group by lesson
const byLesson = {};
lessonsWithBrands.forEach(item => {
  if (!byLesson[item.folder]) {
    byLesson[item.folder] = [];
  }
  byLesson[item.folder].push(item);
});

console.log('=== LESSONS WITH PROMINENT BRAND MENTIONS (2+) BUT NO BRAND LOGO ===\n');

// Sort by most brands mentioned
const sortedLessons = Object.entries(byLesson).sort((a, b) => {
  // Sort by highest count of brand mentions
  const maxA = Math.max(...a[1].map(x => x.count));
  const maxB = Math.max(...b[1].map(x => x.count));
  return maxB - maxA;
});

let addedCount = 0;
const addedLessons = [];

for (const [folder, brands] of sortedLessons) {
  // Pick the brand with most mentions
  const topBrand = brands.reduce((a, b) => a.count > b.count ? a : b);

  console.log(`\n📁 ${folder}`);
  brands.forEach(b => {
    console.log(`   ${b.brand}: ${b.count} mentions`);
  });
  console.log(`   → Will add: ${topBrand.brand} (${topBrand.count} mentions)`);

  // Now add the brand logo to this lesson
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  let content = fs.readFileSync(lessonPath, 'utf8').replace(/\r\n/g, '\n');

  // Find the hook slide and add brandImage
  // Pattern: { type: 'hook', ...other props..., subtext: '...' }
  const hookPatterns = [
    // Pattern 1: subtext at end
    /(\{\s*type:\s*['"]hook['"][^}]*subtext:\s*['"][^'"]*['"])\s*\}/s,
    // Pattern 2: headline at end
    /(\{\s*type:\s*['"]hook['"][^}]*headline:\s*['"][^'"]*['"])\s*\}/s,
  ];

  let modified = false;
  for (const pattern of hookPatterns) {
    const match = content.match(pattern);
    if (match) {
      const newContent = `${match[1]}, brandImage: '${topBrand.url}', brandName: '${topBrand.brand}' }`;
      content = content.replace(match[0], newContent);
      modified = true;
      break;
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content.replace(/\n/g, '\r\n'));
    addedCount++;
    addedLessons.push({ folder, brand: topBrand.brand, count: topBrand.count });
    console.log(`   ✅ ADDED ${topBrand.brand} logo!`);
  } else {
    console.log(`   ⚠️ Could not find hook pattern to modify`);
  }
}

console.log('\n\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Lessons with prominent brand mentions (no logo yet): ${sortedLessons.length}`);
console.log(`Brand logos successfully added: ${addedCount}`);

if (addedLessons.length > 0) {
  console.log('\nAdded logos:');
  addedLessons.forEach(l => {
    console.log(`  ✅ ${l.folder}: ${l.brand} (${l.count} mentions)`);
  });
}
