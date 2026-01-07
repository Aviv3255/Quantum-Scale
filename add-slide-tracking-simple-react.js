/**
 * Batch update simpler React lesson.html files to add slide tracking postMessage
 * These lessons have useState for currentSlide but no currentSlideRef
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// The lessons that need simpler React handling
const simpleLessons = [
  'biz-hidden-cac-costs',
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

// The code to add after useState line
const postMessageCode = `

      // Send slide update to parent for admin issue tracking
      useEffect(() => {
        window.parent.postMessage({
          type: 'LESSON_SLIDE_UPDATE',
          slideIndex: currentSlide,
          slideType: slides[currentSlide]?.type,
          lessonSlug: LESSON_CONFIG.id
        }, '*');
      }, [currentSlide]);`;

let updated = 0;
let skipped = 0;
let errors = [];

for (const lessonDir of simpleLessons) {
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

    // Pattern to find: const [currentSlide, setCurrentSlide] = useState(0);
    // followed by const [direction, setDirection] = useState
    const pattern = /(const \[currentSlide, setCurrentSlide\] = useState\(0\);)\s*\n(\s*const \[direction, setDirection\] = useState)/;

    if (pattern.test(content)) {
      content = content.replace(pattern, (match, p1, p2) => {
        return p1 + postMessageCode + '\n' + p2;
      });
      fs.writeFileSync(lessonPath, content, 'utf8');
      updated++;
      console.log(`✓ Updated: ${lessonDir}`);
    } else {
      // Try simpler pattern - just after useState(0)
      const simplePattern = /const \[currentSlide, setCurrentSlide\] = useState\(0\);/;
      if (simplePattern.test(content)) {
        content = content.replace(simplePattern, (match) => {
          return match + postMessageCode;
        });
        fs.writeFileSync(lessonPath, content, 'utf8');
        updated++;
        console.log(`✓ Updated (simple pattern): ${lessonDir}`);
      } else {
        skipped++;
        errors.push(`${lessonDir}: useState pattern not found`);
        console.log(`✗ Skipped (no pattern): ${lessonDir}`);
      }
    }

  } catch (err) {
    skipped++;
    errors.push(`${lessonDir}: ${err.message}`);
    console.log(`✗ Error: ${lessonDir} - ${err.message}`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Total lessons: ${simpleLessons.length}`);
console.log(`Updated: ${updated}`);
console.log(`Skipped: ${skipped}`);

if (errors.length > 0) {
  console.log(`\nLessons that need manual attention:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
