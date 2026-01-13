const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const lessonsDir = './genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f => {
  const stat = fs.statSync(path.join(lessonsDir, f));
  return stat.isDirectory() && f !== 'shared' && f !== 'nul';
});

console.log(`Deep QA on ${folders.length} lessons...\n`);

const issues = [];

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Skip non-React lessons
  if (!content.includes('text/babel') && !content.includes('react.production')) continue;

  const lessonIssues = [];

  // 1. Check for renderSlide or SlideRenderer
  const hasRenderSlide = content.includes('const renderSlide') ||
                         content.includes('function renderSlide') ||
                         content.includes('const SlideRenderer') ||
                         content.includes('slide.type ===');

  if (!hasRenderSlide) {
    lessonIssues.push('Missing renderSlide/SlideRenderer');
  }

  // 2. Check for slides array
  const hasSlides = content.includes('const slides') || content.includes('const SLIDES');
  if (!hasSlides) {
    lessonIssues.push('Missing slides array');
  }

  // 3. Check for ReactDOM render
  const hasReactDOM = content.includes('ReactDOM.render') || content.includes('createRoot');
  if (!hasReactDOM) {
    lessonIssues.push('Missing ReactDOM.render');
  }

  // 4. Check for required slide components
  // Extract slide types used
  const slideTypes = content.match(/type:\s*['"]([^'"]+)['"]/g)?.map(m => m.match(/['"]([^'"]+)['"]/)[1]) || [];
  const uniqueTypes = [...new Set(slideTypes)];

  // Check if components exist for each type
  for (const type of uniqueTypes) {
    // Convert type to component name patterns
    const patterns = [
      `const ${type.charAt(0).toUpperCase() + type.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Slide`,
      `${type.charAt(0).toUpperCase() + type.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Slide`,
      `case '${type}'`
    ];

    const hasComponent = patterns.some(p => content.includes(p));
    if (!hasComponent && type !== 'welcome' && type !== 'completion' && type !== 'quiz' && type !== 'hook' && type !== 'content') {
      // Check if it's in renderSlide cases
      const inRenderSlide = content.includes(`case '${type}':`);
      if (!inRenderSlide) {
        lessonIssues.push(`Missing handler for slide type: ${type}`);
      }
    }
  }

  // 5. Check for common syntax errors
  // Unmatched braces (rough check)
  const openBraces = (content.match(/{/g) || []).length;
  const closeBraces = (content.match(/}/g) || []).length;
  if (Math.abs(openBraces - closeBraces) > 5) {
    lessonIssues.push(`Possible unmatched braces: ${openBraces} open, ${closeBraces} close`);
  }

  // 6. Check for broken JSX (common issues)
  if (content.includes('className="{') || content.includes("className='{")) {
    lessonIssues.push('Possible broken className attribute');
  }

  // 7. Check for missing Motion import when using motion components
  if (content.includes('<motion.') && !content.includes('window.Motion') && !content.includes('framer-motion')) {
    lessonIssues.push('Uses motion components but may be missing Motion import');
  }

  // 8. Check renderSlide is called correctly
  if (content.includes('renderSlide(') || content.includes('<SlideRenderer')) {
    // Check if it's actually called in JSX
    const callsRenderSlide = content.includes('{renderSlide(') ||
                             content.includes('{ renderSlide(') ||
                             content.includes('<SlideRenderer');
    if (!callsRenderSlide) {
      lessonIssues.push('renderSlide defined but may not be called correctly');
    }
  }

  // 9. Check for WelcomeSlide, QuizSlide, CompletionSlide (required for most lessons)
  if (content.includes("type: 'welcome'") && !content.includes('WelcomeSlide')) {
    lessonIssues.push('Uses welcome type but missing WelcomeSlide component');
  }
  if (content.includes("type: 'quiz'") && !content.includes('QuizSlide')) {
    lessonIssues.push('Uses quiz type but missing QuizSlide component');
  }
  if (content.includes("type: 'completion'") && !content.includes('CompletionSlide')) {
    lessonIssues.push('Uses completion type but missing CompletionSlide component');
  }

  if (lessonIssues.length > 0) {
    issues.push({ folder, issues: lessonIssues });
  }
}

console.log('=== DEEP QA RESULTS ===\n');
if (issues.length === 0) {
  console.log('✓ No issues found! All React lessons appear valid.');
} else {
  console.log(`Found issues in ${issues.length} lessons:\n`);
  issues.forEach(({ folder, issues: lessonIssues }) => {
    console.log(`\n${folder}:`);
    lessonIssues.forEach(issue => console.log(`  - ${issue}`));
  });
}

// Also list the specific lessons user mentioned
console.log('\n\n=== CHECKING USER-MENTIONED LESSONS ===\n');
const userMentioned = [
  'biz-infinite-money-glitch',
  'biz-6-to-1-problem',
  'biz-channel-cac-decoder'
];

for (const lesson of userMentioned) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');
  if (!fs.existsSync(lessonPath)) {
    console.log(`${lesson}: FILE NOT FOUND`);
    continue;
  }

  const content = fs.readFileSync(lessonPath, 'utf8');
  const hasRender = content.includes('const renderSlide') || content.includes('SlideRenderer');
  const hasDom = content.includes('ReactDOM');
  const hasSlides = content.includes('const slides') || content.includes('slides = [');

  console.log(`${lesson}:`);
  console.log(`  renderSlide: ${hasRender ? '✓' : '✗'}`);
  console.log(`  ReactDOM: ${hasDom ? '✓' : '✗'}`);
  console.log(`  slides array: ${hasSlides ? '✓' : '✗'}`);

  // Check file size
  const size = content.length;
  console.log(`  File size: ${size} bytes`);

  // Check for specific patterns
  const slideCount = (content.match(/type:\s*['"]/g) || []).length;
  console.log(`  Slide count: ~${slideCount}`);
}
