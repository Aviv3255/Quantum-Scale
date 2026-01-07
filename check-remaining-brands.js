const fs = require('fs');
const path = require('path');

// Brands already implemented (from scan)
const implementedBrands = [
  'AliExpress', 'Amazon', 'Apple', 'Chipotle', 'Coca-Cola', 'Dior',
  'Dr. Squatch', 'Google', 'Gucci', 'Gymshark', 'Hermès', 'Hermes',
  'Le Creuset', 'Liquid Death', 'Meta', 'Facebook', 'Nike', 'Oura',
  'Prada', 'Ralph Lauren', 'Ridge Wallet', 'Rolex', 'Shopify',
  'Spotify', 'Starbucks', 'Tesla', 'The Oodie', 'Oodie', 'Tiffany'
];

// All brands from the list (Tier 1, 2, 3)
const allBrands = {
  // TIER 1: HIGH FREQUENCY (20+ Mentions)
  'Google': { mentions: 348, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Google_2015_logo.svg.png' },
  'Shopify': { mentions: 123, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/2945149.webp' },
  'Apple': { mentions: 77, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/apple-logo-png-index-content-uploads-10.png' },
  'Facebook/Meta': { mentions: 68, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Meta_Platforms_Inc._logo_(cropped).svg.png' },
  'Nike': { mentions: 66, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Nike-Logo.png' },
  'The Oodie': { mentions: 64, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oodie-Logo-RGB-R.webp' },
  'Instagram': { mentions: 55, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Instagram_logo_2016.svg.webp' },
  'DataDrew': { mentions: 55, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(18).jpg' },
  'Amazon': { mentions: 49, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Amazon_logo.svg.webp' },
  'Le Creuset': { mentions: 49, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Le_Creuset_Logo.png' },
  'Starbucks': { mentions: 46, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Starbucks_Corporation_Logo_2011.svg.png' },
  'TikTok': { mentions: 36, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tiktok-app-icon-social-media-logo_277909-647.png' },
  'Rolex': { mentions: 34, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Logo_da_Rolex.png' },
  'AliExpress': { mentions: 33, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Aliexpress_logo.svg.png' },
  'Ralph Lauren': { mentions: 30, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/polo_ralph_lauren-logo_brandlogos.net_9uyue-512x1003.png' },
  'Gymshark': { mentions: 27, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Gymshark_Limited_Logo.png' },
  'Liquid Death': { mentions: 22, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Liquid-Death-Emblem.png' },
  'YouTube': { mentions: 21, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/YouTube_Logo_2017.svg.png' },
  'Gucci': { mentions: 20, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/gucci-logo-png_seeklogo-64069.png' },

  // TIER 2: MEDIUM FREQUENCY (5-19 Mentions)
  'Coca-Cola': { mentions: 13, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/KO-b23a2a5e.png' },
  'Dior': { mentions: 12, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dior_Logo.svg.png' },
  'Oura': { mentions: 11, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oura_logo.png' },
  'HyperSKU': { mentions: 10, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HyperSKU-Logo-scaled.png' },
  'Tesla': { mentions: 10, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/pngimg.com%20-%20tesla_logo_PNG12.png' },
  'Tiffany': { mentions: 10, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Tiffany_Logo.svg.png' },
  'Stripe': { mentions: 10, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/free-stripe-logo-icon-svg-download-png-498440.webp' },
  'Lululemon': { mentions: 9, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/letter-a-1.jpg' },
  'Dr. Squatch': { mentions: 9, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/dr-squatch-logo-freelogovectors.net_.webp' },
  'TxtCart': { mentions: 8, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLyh0p-rhJADEAE=.webp' },
  'ReConvert': { mentions: 8, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CIuoqfrDj_sCEAE=.webp' },
  'MasterCard': { mentions: 8, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Mastercard-Logo.png' },
  'Klaviyo': { mentions: 8, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klaviyo-primary-logo-charcoal.svg.png' },
  'Hims': { mentions: 8, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HIMS-797814ee.png' },
  'Framer': { mentions: 8, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/framer-1.svg' },
  'Triple Whale': { mentions: 7, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/67e3c7b0162e6313d4bdc706_Logo%20Icon.webp' },
  'Grapevine Surveys': { mentions: 7, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CP2bp6uL9YoDEAE=.webp' },
  'Alibaba': { mentions: 7, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Alibaba-Logo-3.png' },
  'Prada': { mentions: 7, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Prada-logo.jpg' },
  'AutoDS': { mentions: 6, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/our-supported-center-desktop-1.svg' },
  'Honey': { mentions: 6, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/unnamed%20(1).png' },
  'Pepsi': { mentions: 6, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pepsi_2023.svg' },
  'TOMS': { mentions: 6, url: null },
  'Chipotle': { mentions: 6, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chipotle_Mexican_Grill_logo.svg.png' },
  'Canva': { mentions: 5, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/dfb96cc174513093cd6ed61489ccb750.svg' },
  'Cheesecake Factory': { mentions: 5, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Cheesecake-Factory-Logo.jpg' },
  'Ridge Wallet': { mentions: 5, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/The+Ridge.png' },

  // TIER 3: LOWER FREQUENCY (1-4 Mentions)
  'Peloton': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Peloton-logo.png' },
  'Dollar Shave Club': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dollar-Shave-Club.webp' },
  'Adidas': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Adidas_Logo.svg.png' },
  'Netflix': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png' },
  'PayPal': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg' },
  'Lamborghini': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lamborghini-Logo-1998-present-700x394-1.png' },
  'Rolls-Royce': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolls-Royce-Logo.jpg' },
  'De Beers': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/De-Beers-Logo-before-2018.png' },
  'Geo Convert': { mentions: 4, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(19).jpg' },
  'KeepCart': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLnu1ve1jY0DEAE=.webp' },
  'Headspace': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/headspace-1.jpg' },
  'Spotify': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Spotify_logo_without_text.svg.png' },
  'Supreme': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg' },
  'Pizza Hut': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pizza_Hut_international_logo_2014.svg.png' },
  'Porsche': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Porsche_Logo%20(1).svg' },
  'BMW': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg' },
  'Affirm': { mentions: 3, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Affirm_logo.svg.png' },
  'Hyros': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Helping-Marketers-Leverage-Data-with-HYROS-1024x538.png' },
  'Klarna': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klarna_Payment_Badge.svg.png' },
  'Afterpay': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/after%20pay%20(1).png' },
  'Hermes': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/hermes-logo-1.png' },
  'LVMH': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LVMH-black.png' },
  'Zara': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/2019-to-Present-Zara-logo-design-1024x538.webp' },
  'Unilever': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Unilever.svg' },
  'Ritual': { mentions: 2, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/ritual-logo.svg' },
  'Tiffany & Co': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Tiffany_Logo.svg%20(1).png' },
  'H&M': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/H&M-Logo.svg.png' },
  'Chanel': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png' },
  'Ferrari': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Scuderia_Ferrari_Logo.svg.png' },
  'Lexus': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lexus-cars-logo-emblem.jpg' },
  'Lucid': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lucid-Motors-Logo.jpg' },
  'Visa': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Visa_Inc._logo.svg.png' },
  'American Express': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/American-Express-logo.png' },
  'Slack': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Slack_Technologies-Logo.wine.png' },
  'Allbirds': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Allbirds_logo.svg.png' },
  'BigCommerce': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Bc-logo-dark.svg.png' },
  'WooCommerce': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/WooCommerce_logo_(2015).png' },
  'Squarespace': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Squarespace-Logo.png' },
  'REI': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/REI_logo.svg.png' },
  'Subway': { mentions: 1, url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Subway%20Choicemark_thumbnail.png' }
};

// Check which are implemented
const implemented = [];
const remaining = [];

Object.keys(allBrands).forEach(brand => {
  const isImplemented = implementedBrands.some(ib =>
    brand.toLowerCase().includes(ib.toLowerCase()) ||
    ib.toLowerCase().includes(brand.toLowerCase().replace('/', ''))
  );

  if (isImplemented) {
    implemented.push({ brand, ...allBrands[brand] });
  } else {
    remaining.push({ brand, ...allBrands[brand] });
  }
});

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║            BRAND LOGOS STATUS REPORT                              ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

console.log('✅ IMPLEMENTED (' + implemented.length + ' brands):\n');
implemented.sort((a, b) => b.mentions - a.mentions).forEach(item => {
  console.log(`   ✅ ${item.brand.padEnd(20)} (${item.mentions} mentions)`);
});

console.log('\n' + '─'.repeat(70) + '\n');

console.log('❌ REMAINING (' + remaining.length + ' brands):\n');
remaining.sort((a, b) => b.mentions - a.mentions).forEach(item => {
  const hasUrl = item.url ? '📎' : '⚠️ NO URL';
  console.log(`   ❌ ${item.brand.padEnd(20)} (${item.mentions} mentions) ${hasUrl}`);
});

console.log('\n' + '═'.repeat(70));
console.log(`SUMMARY: ${implemented.length} done / ${remaining.length} remaining`);
console.log('═'.repeat(70));
