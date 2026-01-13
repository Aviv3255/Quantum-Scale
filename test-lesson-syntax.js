const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

const folders = fs.readdirSync(lessonsDir).filter(f => {
  const stat = fs.statSync(path.join(lessonsDir, f));
  return stat.isDirectory() && f !== 'shared' && f !== 'nul';
});

console.log(`Testing ${folders.length} lessons for JavaScript syntax issues...\n`);

const broken = [];

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) {
    broken.push({ folder, issue: 'Missing lesson.html' });
    continue;
  }

  const content = fs.readFileSync(lessonPath, 'utf8');

  // Skip non-React lessons
  if (!content.includes('text/babel') && !content.includes('react.production')) {
    continue;
  }

  // Extract JavaScript from script tags
  const scriptMatch = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
  if (!scriptMatch) continue;

  const jsCode = scriptMatch[1];

  // Check for common corruption patterns that cause "return outside function"
  // Pattern: A component ends with ); and then immediately code that should be inside App starts
  const corruptionPatterns = [
    // Hook slide ends then totalSlides defined outside function
    /const HookSlide[\s\S]*?\);\s*\n\s*const totalSlides\s*=/,
    // Any component ends then hooks/callbacks defined outside
    /\);\s*\n\s*const (totalSlides|showGif|hideGif|goNext|goPrev)\s*=/,
    // Return outside of any function (rough check)
    /^\s*return\s*\(/m
  ];

  // More specific check: Look for a return statement at top level (not inside a function)
  // This happens when App component wrapper is missing
  const lines = jsCode.split('\n');
  let braceDepth = 0;
  let inFunction = false;
  let hasTopLevelReturn = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Count braces (rough - doesn't handle strings/comments properly)
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;

    // Check for function/arrow definitions
    if (line.includes('const ') && line.includes('=> {')) inFunction = true;
    if (line.includes('function ')) inFunction = true;

    braceDepth += openBraces - closeBraces;

    // Check for return at depth 0 or 1 (outside or just inside script tag scope)
    if (braceDepth <= 1 && /^\s*return\s*\(/.test(line)) {
      // Verify it's not inside a component definition
      const prevLines = lines.slice(Math.max(0, i - 5), i).join('\n');
      if (!prevLines.includes('const App') && !prevLines.includes('const LessonApp') && !prevLines.includes('function App')) {
        hasTopLevelReturn = true;
        break;
      }
    }
  }

  if (hasTopLevelReturn) {
    broken.push({ folder, issue: 'Code outside component (return outside function)' });
    continue;
  }

  // Check if ReactDOM.render or createRoot exists
  if (!content.includes('ReactDOM.render') && !content.includes('createRoot')) {
    broken.push({ folder, issue: 'Missing ReactDOM.render/createRoot' });
  }
}

console.log('=== POTENTIALLY BROKEN LESSONS ===\n');
if (broken.length === 0) {
  console.log('No broken lessons found!');
} else {
  broken.forEach(({ folder, issue }) => {
    console.log(`${folder}: ${issue}`);
  });
  console.log(`\nTotal: ${broken.length} lessons to check`);
}
