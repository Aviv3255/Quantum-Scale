const fs = require('fs');
const { execSync } = require('child_process');

const lessons = [
  'value-ladder', 'dopamine-blueprint', 'ascension-ladder', 'authority-over-hope',
  'blind-spot-effect', 'borrowed-trust', 'cbo-vs-abo', 'certainty-transfer',
  'decoy-effect', 'five-second-test', 'framing-effect-mastery', 'ice-prioritization',
  'le-creuset-scarcity-engine', 'meta-automated-rules', 'meta-creative-ecosystem',
  'meta-learning-loop', 'meta-value-rules', 'paradox-of-choice', 'post-purchase-goldmine',
  'wishlist-effect'
];

console.log('Checking lessons for issues...\n');

for (const lesson of lessons) {
  const filePath = `./genrok-app/public/lessons/${lesson}/lesson.html`;
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract just the JavaScript between <script type="text/babel"> and </script>
  const jsMatch = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
  if (!jsMatch) {
    console.log(`${lesson}: Could not find babel script`);
    continue;
  }

  const jsCode = jsMatch[1];

  // Check for common JSX issues
  const issues = [];

  // Check for unclosed JSX tags in added content
  if (jsCode.includes('Pro tip:')) {
    // Count opening and closing motion.div tags around Pro tip
    const proTipSection = jsCode.substring(
      jsCode.indexOf('Pro tip:') - 500,
      jsCode.indexOf('Pro tip:') + 500
    );

    const openMotion = (proTipSection.match(/<motion\.div/g) || []).length;
    const closeMotion = (proTipSection.match(/<\/motion\.div>/g) || []).length;

    if (openMotion !== closeMotion) {
      issues.push(`Unbalanced motion.div near Pro tip: ${openMotion} open, ${closeMotion} close`);
    }
  }

  // Check for double angle brackets
  if (jsCode.includes('>>') && !jsCode.includes('=>>')) {
    issues.push('Found >> which might be JSX issue');
  }

  // Check for missing closing tags
  const divOpens = (jsCode.match(/<div\s/g) || []).length;
  const divCloses = (jsCode.match(/<\/div>/g) || []).length;
  if (Math.abs(divOpens - divCloses) > 2) {
    issues.push(`Large div imbalance: ${divOpens} open, ${divCloses} close`);
  }

  // Check for JSX fragments not closed
  if (jsCode.includes('<>') && !jsCode.includes('</>')) {
    issues.push('Unclosed JSX fragment');
  }

  if (issues.length > 0) {
    console.log(`${lesson}:`);
    issues.forEach(i => console.log(`  - ${i}`));
  }
}

console.log('\nDone.');
