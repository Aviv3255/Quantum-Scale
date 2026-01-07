/**
 * Update HookSlide component to render characterVideo for 10 lessons
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

const lessons = [
  'certainty-transfer', // Already updated manually
  'checkout-line-effect',
  'choose-products',
  'cognitive-load-trap',
  'commodity-escape',
  'compound-testing-effect',
  'consumption-conversion',
  'conviction-architecture',
  'copywriters-codex',
  'cost-of-standing-still'
];

// Old HookSlide pattern (without characterVideo rendering)
const oldHookSlidePattern = /const HookSlide = \(\{ data \}\) => \(\s*<div className="h-full relative overflow-hidden">\s*<div className="h-full flex flex-col justify-center[^}]+{data\.subtext}<\/motion\.p>\s*<\/div>\s*\{data\.brandImage && \(\s*<motion\.div[^}]+<\/motion\.div>\s*\)\}\s*<\/div>\s*\);/;

// New HookSlide with characterVideo support
const newHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-6 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8 md:py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 md:mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-2xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
        </div>
        {data.characterVideo && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className={\`absolute bottom-0 \${data.characterPosition === 'left' ? 'left-6' : 'right-6'} z-0 pointer-events-none hidden md:block\`}
            style={{ height: '52%', maxHeight: '400px' }}>
            <video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">
              <source src={data.characterVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}
        {data.brandImage && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-0 z-0 pointer-events-none hidden md:block" style={{ height: '30%', maxHeight: '200px', marginRight: '80px', marginBottom: '5%' }}>
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 1 }} />
          </motion.div>
        )}
      </div>
    );`;

let updated = 0;
let skipped = 0;
let errors = [];

for (const lesson of lessons) {
  if (lesson === 'certainty-transfer') {
    console.log(`○ Already updated: ${lesson}`);
    continue;
  }

  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    errors.push(`${lesson}: File not found`);
    console.log(`✗ Not found: ${lesson}`);
    continue;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');

    // Fix syntax errors like }6472,
    content = content.replace(/\}\d+,/g, ' },');

    // Check if already has characterVideo in HookSlide
    if (content.includes('data.characterVideo && (') && content.includes('const HookSlide')) {
      // Check if it's in the HookSlide section specifically
      const hookSlideMatch = content.match(/const HookSlide[\s\S]*?const \w+Slide/);
      if (hookSlideMatch && hookSlideMatch[0].includes('data.characterVideo')) {
        console.log(`○ Already has characterVideo in HookSlide: ${lesson}`);
        continue;
      }
    }

    // Find and replace HookSlide component - try multiple patterns
    const patterns = [
      // Pattern 1: Standard HookSlide without characterVideo
      /(const HookSlide = \(\{ data \}\) => \(\s*<div className="h-full relative overflow-hidden">\s*<div className="h-full flex flex-col justify-center[^]*?{data\.subtext}<\/motion\.p>\s*<\/div>\s*\{data\.brandImage && \([^]*?<\/motion\.div>\s*\)\}\s*<\/div>\s*\);)/,

      // Pattern 2: HookSlide with different spacing
      /(const HookSlide = \(\{ data \}\) => \([^]*?<\/div>\s*\);)(\s*const BigStatementSlide)/,
    ];

    let matched = false;

    // Try pattern 1
    if (!matched && patterns[0].test(content)) {
      content = content.replace(patterns[0], newHookSlide);
      matched = true;
    }

    // Try pattern 2 - extract and replace HookSlide
    if (!matched) {
      // Find HookSlide start and end
      const hookStart = content.indexOf('const HookSlide = ({ data }) =>');
      const bigStatementStart = content.indexOf('const BigStatementSlide');

      if (hookStart !== -1 && bigStatementStart !== -1 && hookStart < bigStatementStart) {
        const hookSlideSection = content.slice(hookStart, bigStatementStart).trim();
        // Check if this section doesn't have characterVideo rendering
        if (!hookSlideSection.includes('data.characterVideo && (')) {
          // Find where HookSlide ends (last closing bracket before BigStatementSlide)
          const beforeBigStatement = content.slice(0, bigStatementStart);
          const lastSemicolonBeforeBig = beforeBigStatement.lastIndexOf(');');

          if (lastSemicolonBeforeBig > hookStart) {
            const oldHookSlide = content.slice(hookStart, lastSemicolonBeforeBig + 2);
            content = content.slice(0, hookStart) + newHookSlide + content.slice(lastSemicolonBeforeBig + 2);
            matched = true;
          }
        }
      }
    }

    if (matched) {
      fs.writeFileSync(lessonPath, content, 'utf8');
      updated++;
      console.log(`✓ Updated HookSlide: ${lesson}`);
    } else {
      skipped++;
      console.log(`○ Skipped (no match or already updated): ${lesson}`);
    }

  } catch (err) {
    errors.push(`${lesson}: ${err.message}`);
    console.log(`✗ Error: ${lesson} - ${err.message}`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Updated: ${updated}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nIssues:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
