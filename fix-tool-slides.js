const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

const toolPatterns = [
  { pattern: /DataDrew/i, tool: 'DataDrew', url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva', tip: 'tracks LTV automatically' },
  { pattern: /TxtCart/i, tool: 'TxtCart', url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva', tip: 'recovers carts via AI SMS' },
  { pattern: /ABConvert|AB Convert/i, tool: 'ABConvert', url: 'https://apps.shopify.com/ab-convert', tip: 'runs A/B tests easily' },
  { pattern: /Triple Whale/i, tool: 'Triple Whale', url: 'https://apps.shopify.com/triple-whale', tip: 'tracks attribution accurately' },
  { pattern: /Joy Loyalty/i, tool: 'Joy Loyalty', url: 'https://apps.shopify.com/joy-loyalty?mref=lsbqcbva', tip: 'has built-in points & rewards' },
  { pattern: /ReConvert/i, tool: 'ReConvert', url: 'https://apps.shopify.com/reconvert-post-purchase-upsell', tip: 'automates post-purchase upsells' },
  { pattern: /Trust Badges|essential-trust-badges/i, tool: 'Trust Badges', url: 'https://apps.shopify.com/essential-trust-badges?mref=lsbqcbva', tip: 'adds trust signals easily' },
  { pattern: /apps\.shopify\.com\/vitals/i, tool: 'Vitals', url: 'https://apps.shopify.com/vitals', tip: 'adds wishlists & 40+ features' },
  { pattern: /Countdown Timer|countdown-timer/i, tool: 'Countdown Timer', url: 'https://apps.shopify.com/essential-countdown-timer-bar?mref=lsbqcbva', tip: 'creates urgency easily' },
  { pattern: /Quiz Kit|Presidio.*Quiz/i, tool: 'Quiz Kit', url: 'https://apps.shopify.com/product-recommendation-quiz', tip: 'guides customers to products' },
  { pattern: /Grapevine/i, tool: 'Grapevine', url: 'https://apps.shopify.com/grapevine-post-purchase-survey', tip: 'collects customer feedback' },
  { pattern: /Tapita/i, tool: 'Tapita SEO', url: 'https://apps.shopify.com/tapita-seo-speed-optimizer', tip: 'optimizes speed & SEO' },
];

// Slide types that are tool-related and should be removed
const toolSlideTypes = [
  'automate-ladder', 'build-rewards', 'ltv-tool', 'tool-recommendation',
  'implement-tool', 'how-to-implement', 'tool-slide', 'implement-ltv',
  'ltv-implementation', 'track-ltv', 'implement-tracking', 'attribution-tool',
  'trust-tool', 'implement-trust', 'sms-tool', 'implement-sms',
  'testing-tool', 'implement-testing', 'loyalty-tool', 'implement-loyalty',
  'upsell-tool', 'implement-upsell', 'wishlist-tool', 'implement-wishlist',
  'scarcity-tool', 'implement-scarcity', 'quiz-tool', 'implement-quiz',
  'survey-tool', 'implement-survey', 'speed-tool', 'implement-speed',
  'test-frames', 'implement-frames', 'frame-testing'
];

// Skip already fixed lessons
const skipLessons = ['value-ladder', 'dopamine-blueprint'];

function findTool(content) {
  for (const { pattern, tool, url, tip } of toolPatterns) {
    if (pattern.test(content)) {
      return { tool, url, tip };
    }
  }
  return null;
}

function fixLesson(lessonDir) {
  const lessonPath = path.join(lessonsDir, lessonDir, 'lesson.html');
  if (!fs.existsSync(lessonPath)) return { status: 'skip', reason: 'not found' };

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Skip if doesn't have "How To Do It"
  if (!content.includes('How To Do It')) {
    return { status: 'skip', reason: 'no tool slide' };
  }

  const toolInfo = findTool(content);
  if (!toolInfo) {
    return { status: 'skip', reason: 'no tool found' };
  }

  let modified = false;

  // 1. Remove tool slide from slides array
  // Look for patterns like { type: 'xyz-tool' }, or { type: 'implement-xyz' },
  for (const slideType of toolSlideTypes) {
    const regex = new RegExp(`\\{\\s*type:\\s*['"]${slideType}['"][^}]*\\},?\\s*\\n?`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, '');
      modified = true;
      console.log(`  Removed slide type: ${slideType}`);
    }
  }

  // 2. Check if CompletionSlide already has a pro tip
  if (content.includes('Pro tip:') && content.includes(toolInfo.tool)) {
    return { status: 'skip', reason: 'already has pro tip' };
  }

  // 3. Add pro tip to CompletionSlide
  // Find the pattern right before "Up Next" section in CompletionSlide
  const proTipHtml = `
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200 max-w-md w-full mb-4">
            <span className="text-neutral-500 text-xs">Pro tip:</span>
            <a href="${toolInfo.url}" target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:underline" style={{ color: 'var(--accent)' }}>${toolInfo.tool}</a>
            <span className="text-neutral-500 text-xs">${toolInfo.tip}</span>
          </motion.div>`;

  // Try different patterns for inserting pro tip
  // Pattern 1: Before "Up Next" motion.div with bg-neutral-900
  const pattern1 = /(<motion\.p[^>]*>.*?<\/motion\.p>\s*)(<motion\.div[^>]*className="bg-neutral-900)/s;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, `$1${proTipHtml}\n        $2`);
    modified = true;
  }

  if (!modified) {
    return { status: 'skip', reason: 'could not find insertion point' };
  }

  fs.writeFileSync(lessonPath, content);
  return { status: 'fixed', tool: toolInfo.tool };
}

// Get all lesson directories
const lessons = fs.readdirSync(lessonsDir).filter(f => {
  const lessonPath = path.join(lessonsDir, f, 'lesson.html');
  return fs.existsSync(lessonPath) && !skipLessons.includes(f);
});

console.log(`Found ${lessons.length} lessons to check\n`);

let fixed = 0;
let skipped = 0;
const results = [];

for (const lesson of lessons) {
  const result = fixLesson(lesson);
  results.push({ lesson, ...result });

  if (result.status === 'fixed') {
    console.log(`✓ Fixed: ${lesson} (${result.tool})`);
    fixed++;
  } else {
    skipped++;
  }
}

console.log(`\n=== Summary ===`);
console.log(`Fixed: ${fixed}`);
console.log(`Skipped: ${skipped}`);
