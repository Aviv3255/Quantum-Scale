const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Character video rendering code to add to slide components
const characterVideoCode = `
        {data.characterVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={\`absolute bottom-0 \${data.characterPosition === 'left' ? 'left-4' : 'right-4'} z-0 pointer-events-none\`}
            style={{ height: '25%', maxHeight: '180px', marginBottom: '3%' }}>
            <video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">
              <source src={data.characterVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}`;

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Updating ${folders.length} lessons with character video rendering...\n`);

let updatedCount = 0;

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');
  let modified = false;

  // Find ContentSlide and add characterVideo rendering if not present
  if (content.includes('const ContentSlide') && !content.includes('data.characterVideo')) {
    // Find ContentSlide component - look for the closing div before the component ends
    // Pattern: ContentSlide has a structure ending with </motion.p> or similar, then </div>

    // Add to ContentSlide - find the last </div> before the );
    const contentSlideMatch = content.match(/const ContentSlide = \(\{ data \}\) => \(([\s\S]*?)\n    \);/);
    if (contentSlideMatch) {
      const originalContentSlide = contentSlideMatch[0];
      // Find position to insert (before the final </div>)
      const lastDivPos = originalContentSlide.lastIndexOf('</div>');
      if (lastDivPos > -1) {
        const newContentSlide =
          originalContentSlide.substring(0, lastDivPos) +
          characterVideoCode + '\n      ' +
          originalContentSlide.substring(lastDivPos);
        content = content.replace(originalContentSlide, newContentSlide);
        modified = true;
      }
    }
  }

  // Find VisualSlide and add characterVideo rendering
  if (content.includes('const VisualSlide') && !content.includes('data.characterVideo')) {
    const visualSlideMatch = content.match(/const VisualSlide = \(\{ data \}\) => \(([\s\S]*?)\n    \);/);
    if (visualSlideMatch) {
      const originalVisualSlide = visualSlideMatch[0];
      const lastDivPos = originalVisualSlide.lastIndexOf('</div>');
      if (lastDivPos > -1) {
        const newVisualSlide =
          originalVisualSlide.substring(0, lastDivPos) +
          characterVideoCode + '\n      ' +
          originalVisualSlide.substring(lastDivPos);
        content = content.replace(originalVisualSlide, newVisualSlide);
        modified = true;
      }
    }
  }

  // Find CardsSlide and add characterVideo rendering
  if (content.includes('const CardsSlide') && !content.includes('data.characterVideo')) {
    const cardsSlideMatch = content.match(/const CardsSlide = \(\{ data \}\) => \(([\s\S]*?)\n    \);/);
    if (cardsSlideMatch) {
      const originalCardsSlide = cardsSlideMatch[0];
      const lastDivPos = originalCardsSlide.lastIndexOf('</div>');
      if (lastDivPos > -1) {
        const newCardsSlide =
          originalCardsSlide.substring(0, lastDivPos) +
          characterVideoCode + '\n      ' +
          originalCardsSlide.substring(lastDivPos);
        content = content.replace(originalCardsSlide, newCardsSlide);
        modified = true;
      }
    }
  }

  // Find CtaSlide and add characterVideo rendering
  if (content.includes('const CtaSlide') && !content.includes('data.characterVideo')) {
    const ctaSlideMatch = content.match(/const CtaSlide = \(\{ data \}\) => \(([\s\S]*?)\n    \);/);
    if (ctaSlideMatch) {
      const originalCtaSlide = ctaSlideMatch[0];
      const lastDivPos = originalCtaSlide.lastIndexOf('</div>');
      if (lastDivPos > -1) {
        const newCtaSlide =
          originalCtaSlide.substring(0, lastDivPos) +
          characterVideoCode + '\n      ' +
          originalCtaSlide.substring(lastDivPos);
        content = content.replace(originalCtaSlide, newCtaSlide);
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    updatedCount++;
    console.log(`✅ Updated: ${folder}`);
  }
}

console.log(`\n========================================`);
console.log(`Updated ${updatedCount} lessons with character video rendering`);
console.log(`========================================`);
