const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Missing brands with their URLs from the improvement list
const missingBrands = {
  'Facebook': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Meta_Platforms_Inc._logo_(cropped).svg.png',
  'Oodie': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/The_Oodie_logo.webp',
  'Le Creuset': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Le_Creuset_logo.svg.png',
  'Hermes': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Hermes_Paris_(logo).svg.png',
  'HyperSKU': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HyperSKU-Logo-scaled.png',
  'Lululemon': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/letter-a-1.jpg',
  'Hims': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HIMS-797814ee.png',
  'Alibaba': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Alibaba-Logo-3.png',
  'AutoDS': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/our-supported-center-desktop-1.svg',
  'Cheesecake Factory': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Cheesecake-Factory-Logo.jpg',
  'Netflix': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png',
  'PayPal': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg',
  'Lamborghini': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lamborghini-Logo-1998-present-700x394-1.png',
  'Rolls-Royce': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolls-Royce-Logo.jpg',
  'KeepCart': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLnu1ve1jY0DEAE=.webp',
  'Headspace': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/headspace-1.jpg',
  'Supreme': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg',
  'Pizza Hut': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pizza_Hut_international_logo_2014.svg.png',
  'BMW': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg',
  'Hyros': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Helping-Marketers-Leverage-Data-with-HYROS-1024x538.png',
  'Klarna': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klarna_Payment_Badge.svg.png',
  'Afterpay': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/after%20pay%20(1).png',
  'LVMH': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LVMH-black.png',
  'Zara': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/2019-to-Present-Zara-logo-design-1024x538.webp',
  'Unilever': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Unilever.svg',
  'H&M': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/H&M-Logo.svg.png',
  'Chanel': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png',
  'Ferrari': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Scuderia_Ferrari_Logo.svg.png',
  'Lexus': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lexus-cars-logo-emblem.jpg',
  'Lucid': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lucid-Motors-Logo.jpg',
  'Visa': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Visa_Inc._logo.svg.png',
  'American Express': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/American-Express-logo.png',
  'Slack': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Slack_Technologies-Logo.wine.png',
  'Allbirds': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Allbirds_logo.svg.png',
  'BigCommerce': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Bc-logo-dark.svg.png',
  'Squarespace': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Squarespace-Logo.png',
  'TOMS': null // No URL available
};

const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

let addedCount = 0;
const results = {};

for (const [brand, url] of Object.entries(missingBrands)) {
  if (!url) continue; // Skip brands without URLs

  results[brand] = [];

  for (const folder of folders) {
    const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
    if (!fs.existsSync(lessonPath)) continue;

    let content = fs.readFileSync(lessonPath, 'utf8');

    // Skip if already has a brandImage
    if (content.includes('brandImage:')) continue;

    // Check if brand is mentioned in content (case insensitive)
    const brandRegex = new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (!brandRegex.test(content)) continue;

    // Find the hook slide and add brand
    const hookMatch = content.match(/\{\s*type:\s*['"]hook['"]([^}]*)\}/);
    if (!hookMatch) continue;

    const original = hookMatch[0];
    const modified = original.slice(0, -1) + `, brandImage: '${url}', brandName: '${brand}' }`;

    content = content.replace(original, modified);
    fs.writeFileSync(lessonPath, content);
    results[brand].push(folder);
    addedCount++;
  }
}

console.log('Added ' + addedCount + ' brand logos\n');
for (const [brand, lessons] of Object.entries(results)) {
  if (lessons && lessons.length > 0) {
    console.log(brand + ': ' + lessons.join(', '));
  }
}
