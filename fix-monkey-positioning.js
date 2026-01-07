const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Fixing positioning in ${folders.length} lessons...\n`);

let fixedCount = 0;

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');
  let modified = false;

  // Fix ContentSlide - add relative positioning
  if (content.includes('const ContentSlide') && content.includes('data.characterVideo')) {
    // Find the ContentSlide div that doesn't have 'relative'
    const oldPattern = 'const ContentSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center';
    const newPattern = 'const ContentSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center';

    if (content.includes(oldPattern) && !content.includes('h-full relative flex flex-col')) {
      content = content.replace(oldPattern, newPattern);
      modified = true;
    }
  }

  // Fix VisualSlide - add relative positioning
  if (content.includes('const VisualSlide') && content.includes('data.characterVideo')) {
    const oldPattern = 'const VisualSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center';
    const newPattern = 'const VisualSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center';

    if (content.includes(oldPattern) && !content.includes('VisualSlide') ||
        (content.includes('const VisualSlide') && !content.includes('h-full relative flex'))) {
      content = content.replace(oldPattern, newPattern);
      modified = true;
    }
  }

  // Fix CardsSlide - add relative positioning
  if (content.includes('const CardsSlide') && content.includes('data.characterVideo')) {
    const oldPattern = 'const CardsSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center';
    const newPattern = 'const CardsSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center';

    if (content.includes(oldPattern)) {
      content = content.replace(oldPattern, newPattern);
      modified = true;
    }
  }

  // Fix CtaSlide - add relative positioning
  if (content.includes('const CtaSlide') && content.includes('data.characterVideo')) {
    const oldPattern = 'const CtaSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center';
    const newPattern = 'const CtaSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center';

    if (content.includes(oldPattern)) {
      content = content.replace(oldPattern, newPattern);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    fixedCount++;
  }
}

console.log(`Fixed positioning in ${fixedCount} lessons`);
