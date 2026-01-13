const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app/public/lessons');

// Get all lesson directories
const lessonDirs = fs.readdirSync(lessonsDir).filter(f => {
  const fullPath = path.join(lessonsDir, f);
  return fs.statSync(fullPath).isDirectory() && f !== 'shared';
});

let updated = 0;
let skipped = 0;

lessonDirs.forEach(lessonDir => {
  const lessonPath = path.join(lessonsDir, lessonDir, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    console.log(`Skipping ${lessonDir} - no lesson.html`);
    skipped++;
    return;
  }

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Check if already has getInitialSlide
  if (content.includes('getInitialSlide')) {
    console.log(`Skipping ${lessonDir} - already has getInitialSlide`);
    skipped++;
    return;
  }

  // Add getInitialSlide function after getUserName
  const getUserNamePattern = /const getUserName = \(\) => \{ const params = new URLSearchParams\(window\.location\.search\); return params\.get\('userName'\) \|\| 'Builder'; \};/;

  if (!getUserNamePattern.test(content)) {
    console.log(`Skipping ${lessonDir} - getUserName pattern not found`);
    skipped++;
    return;
  }

  // Add getInitialSlide after getUserName
  content = content.replace(
    getUserNamePattern,
    `const getUserName = () => { const params = new URLSearchParams(window.location.search); return params.get('userName') || 'Builder'; };
    const getInitialSlide = () => { const params = new URLSearchParams(window.location.search); const slide = params.get('slide'); return slide ? parseInt(slide, 10) : 0; };`
  );

  // Update useState(0) to useState(getInitialSlide()) for currentSlide
  content = content.replace(
    /const \[currentSlide, setCurrentSlide\] = useState\(0\);/,
    'const [currentSlide, setCurrentSlide] = useState(getInitialSlide());'
  );

  fs.writeFileSync(lessonPath, content);
  console.log(`Updated ${lessonDir}`);
  updated++;
});

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
