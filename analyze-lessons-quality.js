/**
 * Analyze lessons to identify which need elite design improvements
 * Checks for presence of elite components and patterns
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// Elite slide types from reference lessons
const ELITE_SLIDE_TYPES = [
  'stat-countdown',
  'before-after',
  'highlight-box',
  'implementation-guide',
  'implementation',
  'customer-journey',
  'product-ecosystem',
  'expansion-timeline',
  'ltv-transformation',
  'comparison-cards',
  'strategy-steps',
  'tool-integration',
  'survey-questions',
  'survey-strategy',
  'funnel-visual',
  'process-flow',
  'pareto-visual',
  'ltv-scenario',
  'customer-tiers',
  'lookalike-creation'
];

// Skip reference lessons and non-lesson directories
const SKIP = ['shared', 'nul', 'biz-20-domination', 'biz-ridge-wallet-protocol', 'biz-high-margin-fortress', 'biz-next-best-dollar', 'biz-channel-mix-formula', 'biz-systems-architect'];

const results = {
  elite: [], // Already has 3+ elite patterns
  good: [], // Has 1-2 elite patterns
  basic: [], // Has no elite patterns, needs improvement
  needsHookVideo: [], // Has characterVideo in data but HookSlide doesn't render it
  errors: []
};

const lessons = fs.readdirSync(lessonsDir).filter(d =>
  fs.statSync(path.join(lessonsDir, d)).isDirectory() && !SKIP.includes(d)
);

console.log(`Analyzing ${lessons.length} lessons...\n`);

for (const lesson of lessons) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    results.errors.push(lesson);
    continue;
  }

  try {
    const content = fs.readFileSync(lessonPath, 'utf8');

    // Count elite slide types
    let eliteCount = 0;
    const foundElite = [];
    for (const type of ELITE_SLIDE_TYPES) {
      if (content.includes(`type: '${type}'`)) {
        eliteCount++;
        foundElite.push(type);
      }
    }

    // Check for characterVideo patterns
    const hasCharacterVideoInData = content.includes("characterVideo:");
    const hookSlideRendersVideo = content.includes("data.characterVideo &&") &&
      content.match(/const HookSlide[\s\S]*?data\.characterVideo[\s\S]*?const \w+Slide/);

    // Check if hook has characterVideo but component doesn't render it
    const hookHasVideo = content.match(/type: 'hook'[^}]*characterVideo:/);

    // Categorize
    if (eliteCount >= 3) {
      results.elite.push({ lesson, count: eliteCount, types: foundElite });
    } else if (eliteCount >= 1) {
      results.good.push({ lesson, count: eliteCount, types: foundElite });
    } else {
      results.basic.push(lesson);
    }

    // Check if needs HookSlide fix
    if (hookHasVideo && !hookSlideRendersVideo) {
      results.needsHookVideo.push(lesson);
    }

  } catch (err) {
    results.errors.push(`${lesson}: ${err.message}`);
  }
}

console.log('========== ANALYSIS RESULTS ==========\n');

console.log(`✅ ELITE (3+ elite patterns): ${results.elite.length} lessons`);
results.elite.slice(0, 10).forEach(r => console.log(`   ${r.lesson} (${r.count}): ${r.types.join(', ')}`));
if (results.elite.length > 10) console.log(`   ... and ${results.elite.length - 10} more`);

console.log(`\n🔵 GOOD (1-2 elite patterns): ${results.good.length} lessons`);
results.good.slice(0, 10).forEach(r => console.log(`   ${r.lesson} (${r.count}): ${r.types.join(', ')}`));
if (results.good.length > 10) console.log(`   ... and ${results.good.length - 10} more`);

console.log(`\n🔴 BASIC (needs improvement): ${results.basic.length} lessons`);
results.basic.slice(0, 20).forEach(l => console.log(`   ${l}`));
if (results.basic.length > 20) console.log(`   ... and ${results.basic.length - 20} more`);

console.log(`\n⚠️ NEEDS HOOKSLIDE FIX: ${results.needsHookVideo.length} lessons`);
results.needsHookVideo.forEach(l => console.log(`   ${l}`));

if (results.errors.length > 0) {
  console.log(`\n❌ ERRORS: ${results.errors.length}`);
  results.errors.forEach(e => console.log(`   ${e}`));
}

// Save results for further processing
fs.writeFileSync(
  path.join(__dirname, 'lesson-quality-analysis.json'),
  JSON.stringify(results, null, 2)
);

console.log('\n✅ Results saved to lesson-quality-analysis.json');
