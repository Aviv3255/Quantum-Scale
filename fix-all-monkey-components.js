const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Fixing character video components in ${folders.length} lessons...\n`);

let fixedCount = 0;

// The character video rendering code
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

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');
  let modified = false;

  // Check if this lesson has characterVideo data
  if (!content.includes('characterVideo:')) continue;

  // Fix ContentSlide - add relative positioning
  if (content.includes('const ContentSlide')) {
    // Pattern: h-full flex flex-col justify-center (without relative)
    const contentSlidePattern = /const ContentSlide = \(\{ data \}\) => \(\s*<div className="h-full flex flex-col justify-center/g;
    if (contentSlidePattern.test(content) && !content.includes('const ContentSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center')) {
      content = content.replace(
        /const ContentSlide = \(\{ data \}\) => \(\s*<div className="h-full flex flex-col justify-center/g,
        'const ContentSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
      );
      modified = true;
    }
  }

  // Fix ExampleSlide - add relative positioning and character video rendering
  if (content.includes('const ExampleSlide')) {
    // Add relative to ExampleSlide if not present
    if (content.includes('const ExampleSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center') &&
        !content.includes('const ExampleSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center')) {
      content = content.replace(
        'const ExampleSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
        'const ExampleSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
      );
      modified = true;
    }

    // Add characterVideo rendering to ExampleSlide if not present
    if (content.includes('const ExampleSlide') && !content.includes('ExampleSlide') ||
        (content.includes('const ExampleSlide') && content.includes('data.characterVideo') === false)) {
      // Find the closing of ExampleSlide and add characterVideo before the closing div
      const exampleSlideEndPattern = /(\s*<\/div>\s*\);\s*\n\s*const VisualSlide)/;
      const exampleSlideMatch = content.match(/const ExampleSlide[\s\S]*?(<\/div>\s*\);\s*\n\s*const VisualSlide)/);
      if (exampleSlideMatch && !content.match(/const ExampleSlide[\s\S]*?data\.characterVideo[\s\S]*?const VisualSlide/)) {
        // Need to add characterVideo rendering before the final </div> of ExampleSlide
        // Find where ExampleSlide ends
        const exampleStart = content.indexOf('const ExampleSlide');
        const visualStart = content.indexOf('const VisualSlide');
        if (exampleStart !== -1 && visualStart !== -1) {
          const exampleSlideContent = content.substring(exampleStart, visualStart);
          // Find the last </div> before );
          const lastDivPattern = /<\/div>\s*\);\s*$/;
          const exampleSlideFixed = exampleSlideContent.replace(lastDivPattern, `${characterVideoCode}\n      </div>\n    );\n\n    `);
          if (exampleSlideFixed !== exampleSlideContent) {
            content = content.substring(0, exampleStart) + exampleSlideFixed + content.substring(visualStart);
            modified = true;
          }
        }
      }
    }
  }

  // Fix CardsSlide - add relative positioning and character video rendering
  if (content.includes('const CardsSlide')) {
    // Add relative to CardsSlide if not present
    if (content.includes('const CardsSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center') &&
        !content.includes('const CardsSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center')) {
      content = content.replace(
        'const CardsSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
        'const CardsSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
      );
      modified = true;
    }
  }

  // Fix CtaSlide - add relative positioning
  if (content.includes('const CtaSlide')) {
    if (content.includes('const CtaSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center') &&
        !content.includes('const CtaSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center')) {
      content = content.replace(
        'const CtaSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center',
        'const CtaSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center'
      );
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    fixedCount++;
    console.log(`Fixed: ${folder}`);
  }
}

console.log(`\nFixed ${fixedCount} lessons`);
