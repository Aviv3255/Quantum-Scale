const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

const folders = fs.readdirSync(lessonsDir).filter(f => {
  const stat = fs.statSync(path.join(lessonsDir, f));
  return stat.isDirectory() && f !== 'shared' && f !== 'nul';
});

console.log(`Checking ${folders.length} lessons for structural issues...\n`);

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

  // Check for App/LessonApp component or inline rendering pattern
  const hasApp = content.includes('const App') ||
                 content.includes('function App') ||
                 content.includes('const LessonApp') ||
                 content.includes('function LessonApp') ||
                 content.includes('const Lesson') ||
                 content.includes('function Lesson') ||
                 content.includes("slide.type ==="); // Inline rendering pattern

  if (!hasApp) {
    broken.push({ folder, issue: 'Missing App/LessonApp component' });
    continue;
  }

  // Check for code outside component (like 'const totalSlides' directly after component definition ends)
  // This indicates corrupted structure
  const hookSlideEndPattern = /\);\s*\n\s*const totalSlides/;
  if (hookSlideEndPattern.test(content)) {
    broken.push({ folder, issue: 'Code outside component (corrupted structure)' });
    continue;
  }

  // Check for ReactDOM.render or createRoot
  const hasReactRender = content.includes('ReactDOM.render') || content.includes('createRoot');
  if (!hasReactRender) {
    broken.push({ folder, issue: 'Missing ReactDOM.render/createRoot' });
    continue;
  }

  // Check for slides array
  const hasSlides = content.includes('const slides') || content.includes('slides = [');
  if (!hasSlides) {
    broken.push({ folder, issue: 'Missing slides array' });
    continue;
  }
}

console.log('=== BROKEN LESSONS ===\n');
if (broken.length === 0) {
  console.log('No broken lessons found!');
} else {
  broken.forEach(({ folder, issue }) => {
    console.log(`${folder}: ${issue}`);
  });
  console.log(`\nTotal: ${broken.length} broken lessons`);
}
