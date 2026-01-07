const fs = require('fs');
const path = require('path');

const lessonsDir = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Scanning ${folders.length} lessons...\n`);

const lessonsWithBrandLogos = [];

folders.forEach(folder => {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) return;

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Find brandImage in the file
  const brandMatches = content.matchAll(/brandImage:\s*['"]([^'"]+)['"],?\s*brandName:\s*['"]([^'"]+)['"]/g);

  for (const match of brandMatches) {
    lessonsWithBrandLogos.push({
      lesson: folder,
      brandName: match[2],
      brandUrl: match[1]
    });
  }
});

// Group by brand name
const brandsByName = {};
lessonsWithBrandLogos.forEach(item => {
  if (!brandsByName[item.brandName]) {
    brandsByName[item.brandName] = [];
  }
  brandsByName[item.brandName].push(item.lesson);
});

console.log('=== BRANDS WITH LOGOS ALREADY IMPLEMENTED ===\n');
const sortedBrands = Object.keys(brandsByName).sort();
sortedBrands.forEach(brand => {
  console.log(`✅ ${brand}`);
  brandsByName[brand].forEach(lesson => {
    console.log(`   - ${lesson}`);
  });
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total unique brands with logos: ${sortedBrands.length}`);
console.log(`Total brand logo placements: ${lessonsWithBrandLogos.length}`);
console.log(`\nBrands implemented: ${sortedBrands.join(', ')}`);
