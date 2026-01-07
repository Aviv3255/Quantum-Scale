/**
 * Scan lessons to find elite-level designs
 * Criteria based on reference templates:
 * - biz-20-domination, biz-ridge-wallet-protocol, biz-high-margin-fortress
 * - biz-next-best-dollar, biz-channel-mix-formula, biz-systems-architect
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// Elite design patterns to detect
const ELITE_PATTERNS = {
  animatedCounter: /AnimatedCounter\s*[=({]/,
  statCountdown: /type:\s*['"]stat-countdown['"]/,
  darkGradientCards: /background:\s*['"]linear-gradient\(135deg,\s*#1a1a1a/,
  glowEffects: /boxShadow:.*rgba\(var\(--accent-rgb\)/,
  topGradientLine: /background:.*linear-gradient\(90deg,\s*transparent.*var\(--accent\)/,
  fraunceFont: /font-family:.*Fraunces/,
  customSlideTypes: /type:\s*['"](?:pyramid|framework|funnel|comparison|breakdown|process|strategy|identity|proof|architecture|codex|memory|vehicle|math)['"]/i,
  beforeAfter: /type:\s*['"]before-after['"]/,
  insightCard: /type:\s*['"]insight-card['"]/,
  splitComparison: /type:\s*['"]split-comparison['"]/,
  frameworkSummary: /type:\s*['"]framework-summary['"]/,
  hookWithVideo: /characterVideo.*hook/i,
  coloredAccent: /--accent:\s*#[A-Fa-f0-9]{6}/,
  multipleSlideTypes: null // Will be calculated
};

const results = {
  elite: [],    // Score 8+
  good: [],     // Score 5-7
  basic: [],    // Score 0-4
  errors: []
};

const lessons = fs.readdirSync(lessonsDir).filter(f => {
  const stat = fs.statSync(path.join(lessonsDir, f));
  return stat.isDirectory() && f !== 'shared' && f !== 'nul';
});

console.log(`Scanning ${lessons.length} lessons...`);

lessons.forEach(lesson => {
  const filePath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(filePath)) {
    results.errors.push({ lesson, reason: 'No lesson.html' });
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let score = 0;
    const patterns = [];

    // Check each pattern
    if (ELITE_PATTERNS.animatedCounter.test(content)) { score += 2; patterns.push('AnimatedCounter'); }
    if (ELITE_PATTERNS.statCountdown.test(content)) { score += 2; patterns.push('stat-countdown'); }
    if (ELITE_PATTERNS.darkGradientCards.test(content)) { score += 2; patterns.push('dark-gradient-cards'); }
    if (ELITE_PATTERNS.glowEffects.test(content)) { score += 1; patterns.push('glow-effects'); }
    if (ELITE_PATTERNS.topGradientLine.test(content)) { score += 1; patterns.push('top-gradient-line'); }
    if (ELITE_PATTERNS.fraunceFont.test(content)) { score += 1; patterns.push('Fraunces-font'); }
    if (ELITE_PATTERNS.customSlideTypes.test(content)) { score += 2; patterns.push('custom-slide-types'); }
    if (ELITE_PATTERNS.beforeAfter.test(content)) { score += 1; patterns.push('before-after'); }
    if (ELITE_PATTERNS.insightCard.test(content)) { score += 1; patterns.push('insight-card'); }
    if (ELITE_PATTERNS.splitComparison.test(content)) { score += 1; patterns.push('split-comparison'); }
    if (ELITE_PATTERNS.frameworkSummary.test(content)) { score += 1; patterns.push('framework-summary'); }
    if (ELITE_PATTERNS.hookWithVideo.test(content)) { score += 1; patterns.push('hook-video'); }

    // Count unique slide types
    const slideTypes = content.match(/type:\s*['"][a-z-]+['"]/gi) || [];
    const uniqueTypes = new Set(slideTypes.map(t => t.match(/['"]([a-z-]+)['"]/i)?.[1])).size;
    if (uniqueTypes >= 8) { score += 2; patterns.push(`${uniqueTypes}-slide-types`); }
    else if (uniqueTypes >= 5) { score += 1; patterns.push(`${uniqueTypes}-slide-types`); }

    const entry = { lesson, score, patterns, uniqueSlideTypes: uniqueTypes };

    if (score >= 8) results.elite.push(entry);
    else if (score >= 5) results.good.push(entry);
    else results.basic.push(entry);

  } catch (err) {
    results.errors.push({ lesson, reason: err.message });
  }
});

// Sort by score
results.elite.sort((a, b) => b.score - a.score);
results.good.sort((a, b) => b.score - a.score);
results.basic.sort((a, b) => b.score - a.score);

console.log('\n=== RESULTS ===');
console.log(`Elite (8+): ${results.elite.length}`);
console.log(`Good (5-7): ${results.good.length}`);
console.log(`Basic (0-4): ${results.basic.length}`);
console.log(`Errors: ${results.errors.length}`);

// Output top 50 elite + good
console.log('\n=== TOP 50 BEST LESSONS ===');
const top50 = [...results.elite, ...results.good].slice(0, 50);
top50.forEach((l, i) => {
  console.log(`${i+1}. ${l.lesson} (score: ${l.score}, patterns: ${l.patterns.join(', ')})`);
});

// Save results
fs.writeFileSync(
  path.join(__dirname, 'lesson-elite-scan-results.json'),
  JSON.stringify(results, null, 2)
);

console.log('\nResults saved to lesson-elite-scan-results.json');
