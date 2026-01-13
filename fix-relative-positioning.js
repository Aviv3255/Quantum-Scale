const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Fixing relative positioning in ${folders.length} lessons...\n`);

let fixedCount = 0;

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Only fix lessons that have characterVideo data
  if (!content.includes('characterVideo:')) continue;

  let modified = false;

  // Fix ContentSlide - various patterns
  const contentPatterns = [
    {
      old: 'const ContentSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
      new: 'const ContentSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
    },
    {
      old: 'const ContentSlide = ({ data }) => (\n      <div className="h-full overflow-y-auto flex flex-col justify-center',
      new: 'const ContentSlide = ({ data }) => (\n      <div className="h-full relative overflow-y-auto flex flex-col justify-center'
    }
  ];

  for (const pattern of contentPatterns) {
    if (content.includes(pattern.old) && !content.includes(pattern.new.replace('const ContentSlide', 'XXXX'))) {
      content = content.replace(pattern.old, pattern.new);
      modified = true;
    }
  }

  // Fix ExampleSlide
  const examplePatterns = [
    {
      old: 'const ExampleSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
      new: 'const ExampleSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
    }
  ];

  for (const pattern of examplePatterns) {
    if (content.includes(pattern.old) && !content.includes('ExampleSlide = ({ data }) => (\n      <div className="h-full relative')) {
      content = content.replace(pattern.old, pattern.new);
      modified = true;
    }
  }

  // Fix CardsSlide
  const cardsPatterns = [
    {
      old: 'const CardsSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
      new: 'const CardsSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
    }
  ];

  for (const pattern of cardsPatterns) {
    if (content.includes(pattern.old) && !content.includes('CardsSlide = ({ data }) => (\n      <div className="h-full relative')) {
      content = content.replace(pattern.old, pattern.new);
      modified = true;
    }
  }

  // Fix CtaSlide
  const ctaPatterns = [
    {
      old: 'const CtaSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
      new: 'const CtaSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
    }
  ];

  for (const pattern of ctaPatterns) {
    if (content.includes(pattern.old) && !content.includes('CtaSlide = ({ data }) => (\n      <div className="h-full relative')) {
      content = content.replace(pattern.old, pattern.new);
      modified = true;
    }
  }

  // Fix HookSlide
  const hookPatterns = [
    {
      old: 'const HookSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
      new: 'const HookSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
    }
  ];

  for (const pattern of hookPatterns) {
    if (content.includes(pattern.old) && !content.includes('HookSlide = ({ data }) => (\n      <div className="h-full relative')) {
      content = content.replace(pattern.old, pattern.new);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    fixedCount++;
    console.log(`Fixed: ${folder}`);
  }
}

console.log(`\nFixed ${fixedCount} lessons with relative positioning`);
