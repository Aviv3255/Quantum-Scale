const fs = require('fs');
const path = require('path');

const lessonsDir = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons';

// Brands from the list with their URLs
const brands = {
  'Apple': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/apple-logo-png-index-content-uploads-10.png',
  'Amazon': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Amazon_logo.svg.webp',
  'Instagram': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Instagram_logo_2016.svg.webp',
  'YouTube': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/YouTube_Logo_2017.svg.png',
  'TikTok': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tiktok-app-icon-social-media-logo_277909-647.png',
  'AliExpress': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Aliexpress_logo.svg.png',
  'Alibaba': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Alibaba-Logo-3.png',
  'Lululemon': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/letter-a-1.jpg',
  'Netflix': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png',
  'Adidas': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Adidas_Logo.svg.png',
  'Peloton': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Peloton-logo.png',
  'Supreme': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg',
  'Hims': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HIMS-797814ee.png',
  'Porsche': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Porsche_Logo%20(1).svg',
  'BMW': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg',
  'Ferrari': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Scuderia_Ferrari_Logo.svg.png',
  'Lamborghini': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lamborghini-Logo-1998-present-700x394-1.png',
  'Rolls-Royce': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolls-Royce-Logo.jpg',
  'PayPal': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg',
  'Stripe': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/free-stripe-logo-icon-svg-download-png-498440.webp',
  'De Beers': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/De-Beers-Logo-before-2018.png',
  'LVMH': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LVMH-black.png',
  'Zara': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/2019-to-Present-Zara-logo-design-1024x538.webp',
  'Chanel': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png',
  'Spotify': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Spotify_logo_without_text.svg.png',
  'Headspace': 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/headspace-1.jpg'
};

const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

const lessonsNeedingLogos = [];

folders.forEach(folder => {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) return;

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Check if hook already has brandImage
  const hasBrandImageInHook = content.includes("type: 'hook'") &&
    content.match(/type: 'hook'[^}]*brandImage/);

  if (hasBrandImageInHook) return; // Skip - already has logo

  // Check hook slide for brand mentions
  const hookMatch = content.match(/\{ type: 'hook'[^}]+\}/);
  if (!hookMatch) return;

  const hookSlide = hookMatch[0];

  // Check which brands are mentioned in the hook
  for (const [brand, url] of Object.entries(brands)) {
    if (hookSlide.includes(brand)) {
      lessonsNeedingLogos.push({
        folder,
        brand,
        url,
        hookEnding: hookSlide.slice(-60)
      });
      break; // Only one brand per lesson
    }
  }
});

console.log(`Found ${lessonsNeedingLogos.length} lessons needing brand logos:\n`);
lessonsNeedingLogos.forEach(l => {
  console.log(`${l.folder}: ${l.brand}`);
  console.log(`  Hook ending: ...${l.hookEnding}`);
  console.log('');
});
