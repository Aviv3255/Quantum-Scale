const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Fixing z-index completely in ${folders.length} lessons...\n`);

let totalFixed = 0;
let detailedLog = [];

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Only fix lessons that have characterVideo
  if (!content.includes('characterVideo:')) continue;

  let modified = false;
  let fixes = [];

  // Fix CardsSlide - add relative z-10 to title and grid
  // Title pattern
  const oldCardsTitlePatterns = [
    'className="slide-title text-2xl md:text-3xl text-black text-center mb-6"',
    'className="slide-title text-xl md:text-2xl text-black text-center mb-4"',
    'className="slide-title text-xl md:text-2xl text-black mb-4"'
  ];

  for (const pattern of oldCardsTitlePatterns) {
    if (content.includes(pattern) && !content.includes(pattern.replace('">', ' relative z-10">'))) {
      const newPattern = pattern.replace('mb-6"', 'mb-6 relative z-10"').replace('mb-4"', 'mb-4 relative z-10"');
      content = content.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
      modified = true;
      fixes.push('CardsSlide title z-10');
    }
  }

  // Cards grid pattern
  const oldCardsGridPatterns = [
    'className="grid md:grid-cols-2 gap-3"',
    'className={`grid gap-3 ${data.items.length',
    'className="grid gap-3'
  ];

  for (const pattern of oldCardsGridPatterns) {
    if (content.includes(pattern) && !content.includes('grid gap-3 relative z-10') && !content.includes('grid md:grid-cols-2 gap-3 relative z-10')) {
      if (pattern === 'className="grid md:grid-cols-2 gap-3"') {
        content = content.replace(/className="grid md:grid-cols-2 gap-3"/g, 'className="grid md:grid-cols-2 gap-3 relative z-10"');
        modified = true;
        fixes.push('CardsSlide grid z-10');
      } else if (pattern.includes('${data.items.length')) {
        content = content.replace(/className=\{`grid gap-3 \$\{data\.items\.length/g, 'className={`grid gap-3 relative z-10 ${data.items.length');
        modified = true;
        fixes.push('CardsSlide dynamic grid z-10');
      }
    }
  }

  // Fix ContentSlide - add relative z-10 to title and body
  // ContentSlide title
  if (content.includes('const ContentSlide')) {
    const oldContentTitle = 'className="slide-title text-2xl md:text-3xl lg:text-4xl text-black mb-6"';
    const newContentTitle = 'className="slide-title text-2xl md:text-3xl lg:text-4xl text-black mb-6 relative z-10"';
    if (content.includes(oldContentTitle)) {
      content = content.replace(new RegExp(oldContentTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newContentTitle);
      modified = true;
      fixes.push('ContentSlide title z-10');
    }

    // ContentSlide body
    const oldContentBody = 'className="text-base md:text-lg text-neutral-600 leading-relaxed"';
    const newContentBody = 'className="text-base md:text-lg text-neutral-600 leading-relaxed relative z-10"';
    if (content.includes(oldContentBody) && !content.includes('leading-relaxed relative z-10')) {
      content = content.replace(new RegExp(oldContentBody.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newContentBody);
      modified = true;
      fixes.push('ContentSlide body z-10');
    }
  }

  // Fix ExampleSlide - wrap content in z-10
  if (content.includes('const ExampleSlide')) {
    // Example header
    const oldExampleHeader = 'className="text-center mb-6"';
    if (content.includes(oldExampleHeader) && !content.includes('text-center mb-6 relative z-10')) {
      content = content.replace(/className="text-center mb-6"/g, 'className="text-center mb-6 relative z-10"');
      modified = true;
      fixes.push('ExampleSlide header z-10');
    }

    // Example grid
    const oldExampleGrid = 'className="grid md:grid-cols-2 gap-4 mb-6"';
    if (content.includes(oldExampleGrid) && !content.includes('gap-4 mb-6 relative z-10')) {
      content = content.replace(/className="grid md:grid-cols-2 gap-4 mb-6"/g, 'className="grid md:grid-cols-2 gap-4 mb-6 relative z-10"');
      modified = true;
      fixes.push('ExampleSlide grid z-10');
    }

    // Example insight
    const oldExampleInsight = 'className="mt-4 p-4';
    if (content.includes(oldExampleInsight) && !content.includes('mt-4 p-4 relative z-10')) {
      content = content.replace(/className="mt-4 p-4/g, 'className="mt-4 p-4 relative z-10');
      modified = true;
      fixes.push('ExampleSlide insight z-10');
    }
  }

  // Fix HookSlide content
  if (content.includes('const HookSlide')) {
    const oldHookContent = 'className="max-w-2xl"';
    if (content.includes(oldHookContent) && !content.includes('max-w-2xl relative z-10')) {
      content = content.replace(/className="max-w-2xl"/g, 'className="max-w-2xl relative z-10"');
      modified = true;
      fixes.push('HookSlide content z-10');
    }
  }

  // Fix VisualSlide content
  if (content.includes('const VisualSlide')) {
    const oldVisualTitle = 'className="slide-title text-xl md:text-2xl text-black text-center mb-4"';
    if (content.includes(oldVisualTitle) && !content.includes('text-center mb-4 relative z-10')) {
      content = content.replace(/className="slide-title text-xl md:text-2xl text-black text-center mb-4"/g,
        'className="slide-title text-xl md:text-2xl text-black text-center mb-4 relative z-10"');
      modified = true;
      fixes.push('VisualSlide title z-10');
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    totalFixed++;
    detailedLog.push(`${folder}: ${fixes.join(', ')}`);
  }
}

console.log(`Fixed z-index in ${totalFixed} lessons:\n`);
detailedLog.forEach(log => console.log(`  ${log}`));
console.log(`\nAll content elements now have z-10 (in front of videos)`);
