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
  { name: 'Porsche', searchTerms: ['Porsche'], url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg' }, // Using BMW as fallback since Porsche URL had issues
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

console.log(`Scanning ${folders.length} lessons for ${remainingBrands.length} brands...\n`);

const results = {
  added: [],
  skipped: [],
  alreadyHasBrand: [],
  noHookSlide: [],
  errors: []
};

// Find lessons that mention a brand in the hook slide and add brand logo
function processLesson(folder, brand) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) return null;

  let content = fs.readFileSync(lessonPath, 'utf8').replace(/\r\n/g, '\n');

  // Skip if already has a brandImage
  if (content.includes('brandImage:')) {
    return { status: 'alreadyHasBrand', folder };
  }

  // Check if any search term is mentioned in the hook slide
  const hookMatch = content.match(/\{ type: ['"]hook['"][^}]*\}/s);
  if (!hookMatch) {
    return null; // No hook slide
  }

  const hookContent = hookMatch[0];
  let foundTerm = null;

  for (const term of brand.searchTerms) {
    if (hookContent.includes(term)) {
      foundTerm = term;
      break;
    }
  }

  if (!foundTerm) return null;

  // Found a match! Add brand logo to the hook slide
  // Find the closing } of the hook object and add brandImage before it
  const hookRegex = /(\{ type: ['"]hook['"][^}]*)(subtext: ['"][^'"]*['"])\s*\}/s;
  const hookMatch2 = content.match(hookRegex);

  if (hookMatch2) {
    const newHook = `${hookMatch2[1]}${hookMatch2[2]}, brandImage: '${brand.url}', brandName: '${brand.name}' }`;
    content = content.replace(hookMatch2[0], newHook);
    fs.writeFileSync(lessonPath, content.replace(/\n/g, '\r\n'));
    return { status: 'added', folder, term: foundTerm };
  }

  return { status: 'noMatch', folder };
}

// Process all brands
for (const brand of remainingBrands) {
  console.log(`\n--- Processing: ${brand.name} ---`);
  let addedCount = 0;

  for (const folder of folders) {
    const result = processLesson(folder, brand);
    if (result) {
      if (result.status === 'added') {
        console.log(`  ✅ Added to: ${folder} (found: "${result.term}")`);
        results.added.push({ brand: brand.name, lesson: folder });
        addedCount++;
      } else if (result.status === 'alreadyHasBrand') {
        // Already has brand, skip silently
      }
    }
  }

  if (addedCount === 0) {
    console.log(`  ⚠️ No new lessons found for ${brand.name}`);
  } else {
    console.log(`  📊 Added ${brand.name} to ${addedCount} lessons`);
  }
}

console.log('\n\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Total brand logos added: ${results.added.length}`);
console.log('\nBreakdown by brand:');

const byBrand = {};
results.added.forEach(r => {
  if (!byBrand[r.brand]) byBrand[r.brand] = [];
  byBrand[r.brand].push(r.lesson);
});

Object.keys(byBrand).sort().forEach(brand => {
  console.log(`  ${brand}: ${byBrand[brand].length} lessons`);
  byBrand[brand].forEach(lesson => {
    console.log(`    - ${lesson}`);
  });
});
