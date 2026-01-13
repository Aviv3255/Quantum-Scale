/**
 * Batch update vanilla JS lesson.html files to add slide tracking postMessage
 * These lessons don't use React and have a different structure
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// The lessons that need vanilla JS handling
const vanillaLessons = [
  'biz-affiliate-ltv-hack',
  'biz-hidden-cac-costs',
  'biz-subscribe-save-ltv',
  'google-ad-assets-arsenal',
  'google-ai-max-decision',
  'google-ai-overviews-opportunity',
  'google-click-fraud-shield',
  'google-competitor-conquest',
  'google-data-quality-edge',
  'google-focus-firepower',
  'google-highest-cpa-wins',
  'google-optimization-cadence',
  'google-pmax-blueprint',
  'google-product-feed-mastery',
  'google-shopping-intent',
  'google-store-trust-checklist',
  'meta-andromeda-engine',
  'meta-clean-signals',
  'meta-commander-collaborator',
  'meta-consolidation-principle',
  'meta-distinct-angles',
  'meta-four-pillars-trust',
  'meta-gem-brain',
  'meta-hybrid-adset',
  'meta-machine-scale',
  'meta-marathon-metrics',
  'meta-omnipresent-content',
  'meta-radical-diversity',
  'meta-sequence-learning',
  'meta-whatsapp-ai',
  'three-cro-tests',
  'visual-priming'
];

// The code to add at the start of updateSlide function
const postMessageCode = `
            // Send slide update to parent for admin issue tracking
            window.parent.postMessage({
                type: 'LESSON_SLIDE_UPDATE',
                slideIndex: currentSlide - 1, // Convert 1-based to 0-based
                slideType: 'content',
                lessonSlug: window.location.pathname.split('/').filter(Boolean).pop()?.replace('/lesson.html', '') || 'unknown'
            }, '*');
`;

let updated = 0;
let skipped = 0;
let errors = [];

for (const lessonDir of vanillaLessons) {
  const lessonPath = path.join(lessonsDir, lessonDir, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    skipped++;
    errors.push(`${lessonDir}: File not found`);
    console.log(`✗ Not found: ${lessonDir}`);
    continue;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');

    // Check if already has the postMessage tracking
    if (content.includes('LESSON_SLIDE_UPDATE')) {
      console.log(`○ Already has tracking: ${lessonDir}`);
      continue;
    }

    // Pattern to find: function updateSlide() {
    const pattern = /function updateSlide\(\)\s*\{/;

    if (pattern.test(content)) {
      content = content.replace(pattern, (match) => match + postMessageCode);
      fs.writeFileSync(lessonPath, content, 'utf8');
      updated++;
      console.log(`✓ Updated: ${lessonDir}`);
    } else {
      // Try alternative patterns
      const altPattern = /function updateSlide\s*\(\)\s*\{/;
      if (altPattern.test(content)) {
        content = content.replace(altPattern, (match) => match + postMessageCode);
        fs.writeFileSync(lessonPath, content, 'utf8');
        updated++;
        console.log(`✓ Updated (alt pattern): ${lessonDir}`);
      } else {
        skipped++;
        errors.push(`${lessonDir}: updateSlide function not found`);
        console.log(`✗ Skipped (no updateSlide): ${lessonDir}`);
      }
    }

  } catch (err) {
    skipped++;
    errors.push(`${lessonDir}: ${err.message}`);
    console.log(`✗ Error: ${lessonDir} - ${err.message}`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Total vanilla lessons: ${vanillaLessons.length}`);
console.log(`Updated: ${updated}`);
console.log(`Skipped: ${skipped}`);

if (errors.length > 0) {
  console.log(`\nLessons that need manual attention:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
