const fs = require('fs');
const path = require('path');

// All available brand logos with their search keywords
// PRIORITY ORDER: Specific DTC/case-study brands first, then luxury brands, then generic platforms last
const BRAND_DATABASE = {
  // HIGH PRIORITY: Specific DTC/eCommerce brands (likely case studies)
  'The Oodie': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/The_Oodie_logo.webp', keywords: ['oodie', 'davie fogarty', 'fogarty'] },
  'Ridge Wallet': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/The+Ridge.png', keywords: ['ridge wallet', 'the ridge'] },
  'Dr. Squatch': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/dr-squatch-logo-freelogovectors.net_.webp', keywords: ['dr. squatch', 'squatch'] },
  'Gymshark': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Gymshark_Limited_Logo.png', keywords: ['gymshark', 'ben francis'] },
  'Liquid Death': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Liquid-Death-Emblem.png', keywords: ['liquid death'] },
  'Allbirds': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Allbirds_logo.svg.png', keywords: ['allbirds'] },
  'Oura': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oura_logo.png', keywords: ['oura ring', 'oura'] },
  'Peloton': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Peloton-logo.png', keywords: ['peloton'] },

  // LUXURY BRANDS (specific case studies)
  'Hermes': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Hermes_Paris_(logo).svg.png', keywords: ['hermes', 'hermès', 'birkin'] },
  'Le Creuset': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Le_Creuset_logo.svg.png', keywords: ['le creuset', 'lecreuset'] },
  'Dior': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dior_Logo.svg.png', keywords: ['dior'] },
  'Chanel': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png', keywords: ['chanel'] },
  'Gucci': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/gucci-logo-png_seeklogo-64069.png', keywords: ['gucci'] },
  'Prada': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Prada-logo.jpg', keywords: ['prada'] },
  'Ralph Lauren': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/polo_ralph_lauren-logo_brandlogos.net_9uyue-512x1003.png', keywords: ['ralph lauren'] },
  'Tiffany': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Tiffany_Logo.svg.png', keywords: ['tiffany'] },
  'Rolex': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Logo_da_Rolex.png', keywords: ['rolex'] },
  'Ferrari': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Scuderia_Ferrari_Logo.svg.png', keywords: ['ferrari'] },
  'BMW': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg', keywords: ['bmw'] },
  'De Beers': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/De-Beers-Logo-before-2018.png', keywords: ['de beers', 'diamond'] },
  'LVMH': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LVMH-black.png', keywords: ['lvmh'] },
  'Supreme': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg', keywords: ['supreme'] },

  // MAJOR CONSUMER BRANDS
  'Apple': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Apple_logo_grey.svg.png', keywords: ['iphone', 'airpods', 'macbook', 'ipad', 'apple watch'] },
  'Nike': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Nike-Logo.png', keywords: ['nike', 'just do it', 'air jordan'] },
  'Adidas': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Adidas_Logo.svg.png', keywords: ['adidas'] },
  'Starbucks': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Starbucks_Corporation_Logo_2011.svg.png', keywords: ['starbucks'] },
  'Netflix': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png', keywords: ['netflix'] },
  'Tesla': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/pngimg.com%20-%20tesla_logo_PNG12.png', keywords: ['tesla', 'elon musk'] },
  'Spotify': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Spotify_logo_without_text.svg.png', keywords: ['spotify'] },
  'Coca-Cola': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/KO-b23a2a5e.png', keywords: ['coca-cola', 'coke'] },

  // ECOMMERCE/PAYMENT PLATFORMS
  'AliExpress': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Aliexpress_logo.svg.png', keywords: ['aliexpress', 'ali express'] },
  'Alibaba': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Alibaba-Logo-3.png', keywords: ['alibaba'] },
  'Mastercard': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Mastercard-Logo.png', keywords: ['mastercard'] },
  'PayPal': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg', keywords: ['paypal'] },
  'Afterpay': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/after%20pay%20(1).png', keywords: ['afterpay'] },
  'REI': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/REI_logo.svg.png', keywords: ['rei co-op'] },
  'Ritual': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/ritual-logo.svg', keywords: ['ritual vitamins'] },

  // LOW PRIORITY: Generic platforms (commonly mentioned but not case studies)
  'Amazon': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Amazon_logo.svg.webp', keywords: ['amazon prime', 'jeff bezos'] },
  'Google': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Google_2015_logo.svg.png', keywords: ['google ads', 'adwords'] },
  'TikTok': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tiktok-app-icon-social-media-logo_277909-647.png', keywords: ['tiktok shop'] },
  'Instagram': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Instagram_logo_2016.svg.webp', keywords: ['instagram reels'] },
  'Meta': { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Meta_Platforms_Inc._logo_(cropped).svg.png', keywords: ['facebook ads', 'meta ads'] },
};

// Lessons flagged as having irrelevant brand images
const FLAGGED_LESSONS = [
  'biz-high-margin-fortress',
  'biz-purchase-cycle-engine',
  'biz-20-domination',
  'biz-ltv-levers',
  'biz-ltv-cac-dashboard',
  'biz-automation-ratio',
  'biz-lifetime-gross-profit',
  'biz-channel-mix-formula',
  'biz-next-best-dollar',
  'biz-closer-framework',
  'biz-australia-arbitrage',
  'biz-leaders-burden',
  'biz-360-feedback',
  'biz-remarkable-product',
  'three-canons-of-craft',
  'borrowed-trust',
  'certainty-transfer',
  'identity-marketing',
  'best-niches-2026',
  'four-primal-needs',
  'three-levels-of-change',
  'trust-blueprint',
  'visual-shorthand',
  'rounded-button',
  'scammer-playbook-good',
  'meta-auction-formula'
];

const lessonsDir = './genrok-app/public/lessons';

function findRelevantBrand(content) {
  // Remove HTML tags and existing brandImage/brandName to avoid false positives
  const cleanedContent = content
    .replace(/<meta[^>]*>/gi, '') // Remove HTML meta tags
    .replace(/<[^>]+>/g, ' ') // Remove all HTML tags
    .replace(/brandImage:\s*'[^']*'/g, '') // Remove existing brandImage
    .replace(/brandName:\s*'[^']*'/g, '') // Remove existing brandName
    .replace(/supabase\.co[^\s]*/g, '') // Remove Supabase URLs
    .toLowerCase();

  for (const [brandName, brandData] of Object.entries(BRAND_DATABASE)) {
    for (const keyword of brandData.keywords) {
      // Use word boundary matching for short keywords to avoid false positives
      const lowerKeyword = keyword.toLowerCase();

      // For short words like "meta", "rei", "polo", require word boundaries
      if (lowerKeyword.length <= 4) {
        const regex = new RegExp(`\\b${lowerKeyword}\\b`, 'i');
        if (regex.test(cleanedContent)) {
          return { name: brandName, url: brandData.url };
        }
      } else {
        // For longer keywords, simple includes is fine
        if (cleanedContent.includes(lowerKeyword)) {
          return { name: brandName, url: brandData.url };
        }
      }
    }
  }
  return null;
}

function removeBrandImage(content) {
  // Remove brandImage and brandName from hook slides
  // Pattern: brandImage: '...', brandName: '...'
  let updated = content.replace(/,?\s*brandImage:\s*'[^']*'/g, '');
  updated = updated.replace(/,?\s*brandName:\s*'[^']*'/g, '');

  // Clean up any double commas or trailing commas before }
  updated = updated.replace(/,\s*,/g, ',');
  updated = updated.replace(/,\s*}/g, ' }');

  return updated;
}

function replaceBrandImage(content, newBrand) {
  // Replace existing brandImage and brandName
  let updated = content.replace(
    /brandImage:\s*'[^']*'/g,
    `brandImage: '${newBrand.url}'`
  );
  updated = updated.replace(
    /brandName:\s*'[^']*'/g,
    `brandName: '${newBrand.name}'`
  );
  return updated;
}

// Main execution
console.log('Brand Image QA Fix Script\n');
console.log(`Processing ${FLAGGED_LESSONS.length} flagged lessons...\n`);

const results = {
  replaced: [],
  removed: [],
  skipped: [],
  errors: []
};

for (const lessonId of FLAGGED_LESSONS) {
  const lessonPath = path.join(lessonsDir, lessonId, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    results.skipped.push({ lesson: lessonId, reason: 'File not found' });
    continue;
  }

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Check if lesson has brandImage
  if (!content.includes('brandImage:')) {
    results.skipped.push({ lesson: lessonId, reason: 'No brandImage found' });
    continue;
  }

  // Extract hook slide content for analysis
  const hookMatch = content.match(/type:\s*['"]hook['"][^}]*headline:\s*['"]([^'"]*)['"]/s);
  const subtextMatch = content.match(/subtext:\s*['"]([^'"]*)['"]/s);
  const allContent = content; // Use full lesson content for brand matching

  // Find a relevant brand
  const relevantBrand = findRelevantBrand(allContent);

  // Check current brand
  const currentBrandMatch = content.match(/brandName:\s*['"]([^'"]*)['"]/);
  const currentBrand = currentBrandMatch ? currentBrandMatch[1] : 'Unknown';

  let newContent;

  if (relevantBrand && relevantBrand.name !== currentBrand) {
    // Replace with relevant brand
    newContent = replaceBrandImage(content, relevantBrand);
    results.replaced.push({
      lesson: lessonId,
      from: currentBrand,
      to: relevantBrand.name
    });
    console.log(`✓ ${lessonId}: ${currentBrand} → ${relevantBrand.name}`);
  } else if (!relevantBrand) {
    // Remove brandImage entirely
    newContent = removeBrandImage(content);
    results.removed.push({
      lesson: lessonId,
      removed: currentBrand
    });
    console.log(`✗ ${lessonId}: Removed ${currentBrand} (no relevant brand found)`);
  } else {
    results.skipped.push({ lesson: lessonId, reason: 'Already has relevant brand' });
    continue;
  }

  // Write updated content
  fs.writeFileSync(lessonPath, newContent, 'utf8');
}

console.log('\n=== SUMMARY ===');
console.log(`Replaced: ${results.replaced.length}`);
console.log(`Removed: ${results.removed.length}`);
console.log(`Skipped: ${results.skipped.length}`);
console.log(`Errors: ${results.errors.length}`);

if (results.replaced.length > 0) {
  console.log('\n--- Replaced ---');
  results.replaced.forEach(r => console.log(`  ${r.lesson}: ${r.from} → ${r.to}`));
}

if (results.removed.length > 0) {
  console.log('\n--- Removed ---');
  results.removed.forEach(r => console.log(`  ${r.lesson}: Removed ${r.removed}`));
}

if (results.skipped.length > 0) {
  console.log('\n--- Skipped ---');
  results.skipped.forEach(r => console.log(`  ${r.lesson}: ${r.reason}`));
}

// Save results to JSON
fs.writeFileSync('./brand-fix-results.json', JSON.stringify(results, null, 2));
console.log('\nResults saved to brand-fix-results.json');
