const fs = require('fs');

const lessons = [
  'value-ladder', 'dopamine-blueprint', 'ascension-ladder', 'authority-over-hope',
  'blind-spot-effect', 'borrowed-trust', 'cbo-vs-abo', 'certainty-transfer',
  'decoy-effect', 'five-second-test', 'framing-effect-mastery', 'ice-prioritization',
  'le-creuset-scarcity-engine', 'meta-automated-rules', 'meta-creative-ecosystem',
  'meta-learning-loop', 'meta-value-rules', 'paradox-of-choice', 'post-purchase-goldmine',
  'wishlist-effect'
];

const issues = [];

for (const lesson of lessons) {
  const filePath = './genrok-app/public/lessons/' + lesson + '/lesson.html';
  const content = fs.readFileSync(filePath, 'utf8');
  const lessonIssues = [];

  // Check for slides array
  if (!content.includes('const slides = [')) {
    lessonIssues.push('missing slides array');
  }

  // Check for welcome slide
  if (!content.includes("type: 'welcome'")) {
    lessonIssues.push('missing welcome slide');
  }

  // Check for completion slide
  if (!content.includes("type: 'completion'")) {
    lessonIssues.push('missing completion slide');
  }

  // Check for double commas (syntax error)
  if (content.includes(',,')) {
    lessonIssues.push('double commas found');
  }

  // Check for empty type
  if (content.includes("{ type: '' }") || content.includes("type: '',")) {
    lessonIssues.push('empty slide type');
  }

  // Check for renderSlide
  if (!content.includes('renderSlide')) {
    lessonIssues.push('missing renderSlide');
  }

  // Check slides array structure
  const slidesMatch = content.match(/const slides = \[([\s\S]*?)\];\s*\n\s*const/);
  if (slidesMatch) {
    const slidesContent = slidesMatch[1];

    // Check for unbalanced braces
    let braceCount = 0;
    for (const char of slidesContent) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }
    if (braceCount !== 0) {
      lessonIssues.push('unbalanced braces in slides array: ' + braceCount);
    }

    // Check for trailing comma issues after removal
    if (slidesContent.includes(',\n      { type:') === false && slidesContent.includes('}\n      { type:')) {
      lessonIssues.push('possible missing comma between slides');
    }
  }

  if (lessonIssues.length > 0) {
    issues.push({ lesson, issues: lessonIssues });
  }
}

if (issues.length === 0) {
  console.log('All 20 modified lessons pass basic checks');
} else {
  console.log('Issues found in ' + issues.length + ' lessons:');
  issues.forEach(i => console.log('  ' + i.lesson + ': ' + i.issues.join(', ')));
}
