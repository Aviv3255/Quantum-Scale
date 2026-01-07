const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Scanning ${folders.length} lessons for issues...\n`);

const issues = [];

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) {
    issues.push({ folder, issue: 'MISSING lesson.html' });
    continue;
  }

  const content = fs.readFileSync(lessonPath, 'utf8');
  const fileSize = content.length;

  // Check for empty file
  if (fileSize < 100) {
    issues.push({ folder, issue: 'EMPTY or too small file' });
    continue;
  }

  // Check if it's React-based
  const isReact = content.includes('text/babel') || content.includes('react.production');

  if (isReact) {
    // Check for slide rendering mechanism
    const hasRenderSlide = content.includes('const renderSlide') ||
                           content.includes('SlideRenderer') ||
                           content.includes('slide.type ===');

    // Check for ReactDOM render
    const hasReactRender = content.includes('ReactDOM.render') ||
                           content.includes('createRoot');

    // Check for slides array
    const hasSlides = content.includes('const slides = [') ||
                      content.includes('const slides=[');

    if (!hasRenderSlide) {
      issues.push({ folder, issue: 'React lesson MISSING renderSlide/SlideRenderer' });
    }
    if (!hasReactRender) {
      issues.push({ folder, issue: 'React lesson MISSING ReactDOM.render' });
    }
    if (!hasSlides) {
      issues.push({ folder, issue: 'React lesson MISSING slides array' });
    }
  }
}

console.log('=== ISSUES FOUND ===\n');
if (issues.length === 0) {
  console.log('No issues found! All lessons appear valid.');
} else {
  issues.forEach(({ folder, issue }) => {
    console.log(`${folder}: ${issue}`);
  });
  console.log(`\nTotal: ${issues.length} issues`);
}
