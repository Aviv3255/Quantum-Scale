const fs = require('fs');
const path = require('path');

const lessonsDir = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons';

const failedLessons = [
  'biz-hidden-cac-costs',
  'biz-affiliate-ltv-hack',
  'biz-subscribe-save-ltv',
  'golden-lookalike',
  'missing-piece-effect',
  'starbucks-ltv',
  'visual-priming'
];

// Generic Framer logo for lessons without specific brand
const framerUrl = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/framer-1.svg';

for (const folder of failedLessons) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) {
    console.log(`❌ Not found: ${folder}`);
    continue;
  }

  let content = fs.readFileSync(lessonPath, 'utf8').replace(/\r\n/g, '\n');

  // Skip if already has brandImage
  if (content.includes('brandImage:')) {
    console.log(`⏭️ Already has brand: ${folder}`);
    continue;
  }

  // Try to find the hook slide and add brand
  // Look for patterns like: { type: 'hook', ... }

  // Find the slides array declaration
  const slidesMatch = content.match(/const slides = \[([\s\S]*?)\];/);
  if (!slidesMatch) {
    console.log(`❌ No slides found: ${folder}`);
    continue;
  }

  // Find the hook slide within slides
  const slidesContent = slidesMatch[1];

  // Look for the hook type and its closing brace
  const hookPattern = /(\{\s*type:\s*['"]hook['"][^}]*\})/;
  const hookMatch = slidesContent.match(hookPattern);

  if (hookMatch) {
    // Found the hook - add brandImage before the closing brace
    const original = hookMatch[1];
    const modified = original.slice(0, -1) + `, brandImage: '${framerUrl}', brandName: 'Framer' }`;

    content = content.replace(original, modified);
    fs.writeFileSync(lessonPath, content.replace(/\n/g, '\r\n'));
    console.log(`✅ Fixed: ${folder}`);
  } else {
    // Maybe the hook spans multiple lines or has different structure
    // Try a more aggressive approach - find type: 'hook' and insert after the last property before }
    const hookStartIdx = content.indexOf("type: 'hook'");
    if (hookStartIdx === -1) {
      console.log(`❌ No hook type found: ${folder}`);
      continue;
    }

    // Find the closing brace for this object by counting braces
    let braceCount = 0;
    let started = false;
    let hookEndIdx = -1;

    for (let i = hookStartIdx; i < content.length; i++) {
      if (content[i] === '{') {
        braceCount++;
        started = true;
      } else if (content[i] === '}') {
        if (started && braceCount === 1) {
          hookEndIdx = i;
          break;
        }
        braceCount--;
      }
    }

    if (hookEndIdx > 0) {
      // Check if there's a trailing comma/space before }
      let insertPos = hookEndIdx;
      while (insertPos > 0 && /[\s,]/.test(content[insertPos-1])) {
        insertPos--;
      }

      const beforeBrace = content.substring(0, insertPos);
      const afterBrace = content.substring(hookEndIdx);

      content = beforeBrace + `, brandImage: '${framerUrl}', brandName: 'Framer'` + afterBrace;
      fs.writeFileSync(lessonPath, content.replace(/\n/g, '\r\n'));
      console.log(`✅ Fixed (method 2): ${folder}`);
    } else {
      console.log(`❌ Could not find hook end: ${folder}`);
    }
  }
}
