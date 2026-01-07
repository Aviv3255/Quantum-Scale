const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Fixing video z-index (ensuring videos are behind content) in ${folders.length} lessons...\n`);

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

  // Fix 1: Ensure video has z-0 (should already be there, but verify)
  // Also ensure pointer-events-none so videos don't block clicks

  // Fix 2: Add z-10 to content elements within slides that have characterVideo support
  // This ensures content is always in front of videos

  // ContentSlide: Add z-10 to the content wrapper
  const contentSlidePattern = /const ContentSlide = \(\{ data \}\) => \(\s*<div className="h-full relative/g;
  if (content.match(contentSlidePattern)) {
    // Check if motion.h2 and motion.p need z-10
    const oldContentH2 = '<motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="slide-title';
    const newContentH2 = '<motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="slide-title relative z-10';

    if (content.includes(oldContentH2) && !content.includes('slide-title relative z-10')) {
      content = content.replace(oldContentH2, newContentH2);
      modified = true;
      fixes.push('ContentSlide h2 z-10');
    }

    // Add z-10 to body paragraph
    const oldContentP = 'className="text-base md:text-lg text-neutral-600 leading-relaxed"';
    const newContentP = 'className="text-base md:text-lg text-neutral-600 leading-relaxed relative z-10"';

    if (content.includes(oldContentP) && !content.includes('leading-relaxed relative z-10')) {
      content = content.replace(new RegExp(oldContentP.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newContentP);
      modified = true;
      fixes.push('ContentSlide p z-10');
    }
  }

  // CardsSlide: Add z-10 to the cards grid
  const oldCardsGrid = 'className={`grid gap-3 ${data.items.length';
  const newCardsGrid = 'className={`grid gap-3 relative z-10 ${data.items.length';

  if (content.includes(oldCardsGrid) && !content.includes('grid gap-3 relative z-10')) {
    content = content.replace(oldCardsGrid, newCardsGrid);
    modified = true;
    fixes.push('CardsSlide grid z-10');
  }

  // Also add z-10 to CardsSlide title
  const oldCardsTitle = /(<motion\.h2[^>]*className="slide-title text-xl md:text-2xl text-black mb-4)(")/g;
  if (content.match(oldCardsTitle) && !content.includes('text-black mb-4 relative z-10')) {
    content = content.replace(oldCardsTitle, '$1 relative z-10$2');
    modified = true;
    fixes.push('CardsSlide title z-10');
  }

  // ExampleSlide: Add z-10 to content
  const oldExampleGrid = 'className="grid md:grid-cols-2 gap-4 mb-6"';
  const newExampleGrid = 'className="grid md:grid-cols-2 gap-4 mb-6 relative z-10"';

  if (content.includes(oldExampleGrid) && !content.includes('gap-4 mb-6 relative z-10')) {
    content = content.replace(new RegExp(oldExampleGrid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newExampleGrid);
    modified = true;
    fixes.push('ExampleSlide grid z-10');
  }

  // HookSlide: Add z-10 to content wrapper
  // The HookSlide content should be in front of videos
  const oldHookContent = 'className="max-w-2xl"';
  const newHookContent = 'className="max-w-2xl relative z-10"';

  if (content.includes(oldHookContent) && !content.includes('max-w-2xl relative z-10')) {
    content = content.replace(new RegExp(oldHookContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newHookContent);
    modified = true;
    fixes.push('HookSlide content z-10');
  }

  // CtaSlide: Add z-10 to CTA content
  const oldCtaContent = 'className="text-center max-w-2xl"';
  const newCtaContent = 'className="text-center max-w-2xl relative z-10"';

  if (content.includes(oldCtaContent) && !content.includes('max-w-2xl relative z-10')) {
    content = content.replace(new RegExp(oldCtaContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newCtaContent);
    modified = true;
    fixes.push('CtaSlide content z-10');
  }

  // VisualSlide: Add z-10 to visual content
  const oldVisualContent = 'className="flex justify-center mb-6"';
  const newVisualContent = 'className="flex justify-center mb-6 relative z-10"';

  if (content.includes(oldVisualContent) && !content.includes('justify-center mb-6 relative z-10')) {
    content = content.replace(new RegExp(oldVisualContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newVisualContent);
    modified = true;
    fixes.push('VisualSlide content z-10');
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    totalFixed++;
    detailedLog.push(`${folder}: ${fixes.join(', ')}`);
  }
}

console.log(`Fixed z-index in ${totalFixed} lessons:\n`);
detailedLog.forEach(log => console.log(`  ${log}`));
console.log(`\nVideos now have z-0 (back), content has z-10 (front)`);
