const fs = require('fs');
const path = require('path');

const lessonsDir = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Processing ${folders.length} lessons to fix HookSlide components...\n`);

let fixedCount = 0;
let alreadyFixedCount = 0;
let skippedCount = 0;

// The correct HookSlide component with brandImage support
const correctHookSlidePattern = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
        </div>
        {data.brandImage && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-0 z-0 pointer-events-none" style={{ height: '30%', maxHeight: '200px', marginRight: '3%', marginBottom: '5%' }}>
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 0.2 }} />
          </motion.div>
        )}
      </div>
    );`;

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8').replace(/\r\n/g, '\n');

  // Skip if no brandImage in the data
  if (!content.includes('brandImage:')) {
    skippedCount++;
    continue;
  }

  // Check if HookSlide already has the brandImage rendering
  if (content.includes('data.brandImage &&')) {
    alreadyFixedCount++;
    continue;
  }

  // Find and replace the HookSlide component
  // Pattern: const HookSlide = ({ data }) => ( ... );
  // The component ends at the matching closing );

  const hookSlideStart = content.indexOf('const HookSlide = ({ data }) =>');
  if (hookSlideStart === -1) {
    console.log(`⚠️ No HookSlide found: ${folder}`);
    continue;
  }

  // Find the end of the HookSlide component
  // It ends with ); followed by a newline and then either "const " or whitespace + "const"
  let searchStart = hookSlideStart;
  let hookSlideEnd = -1;

  // Look for the pattern ");\n" followed by a new component definition or end
  const nextComponentPatterns = [
    /\);\s*\n\s*const\s+\w+Slide/,
    /\);\s*\n\s*const\s+Animated/,
    /\);\s*\n\s*\/\//,
  ];

  for (const pattern of nextComponentPatterns) {
    const match = content.substring(searchStart).match(pattern);
    if (match) {
      // Find the position of the ); that ends HookSlide
      const endMatch = content.substring(searchStart).indexOf(match[0]);
      if (endMatch > 0) {
        hookSlideEnd = searchStart + endMatch + 2; // +2 for ");"
        break;
      }
    }
  }

  if (hookSlideEnd === -1) {
    // Fallback: Find by counting parentheses
    let parenCount = 0;
    let started = false;
    for (let i = hookSlideStart; i < content.length; i++) {
      if (content[i] === '(') {
        parenCount++;
        started = true;
      } else if (content[i] === ')') {
        parenCount--;
        if (started && parenCount === 0) {
          hookSlideEnd = i + 2; // Include ");"
          break;
        }
      }
    }
  }

  if (hookSlideEnd === -1 || hookSlideEnd <= hookSlideStart) {
    console.log(`⚠️ Could not find HookSlide end: ${folder}`);
    continue;
  }

  // Extract the old HookSlide
  const oldHookSlide = content.substring(hookSlideStart, hookSlideEnd);

  // Replace with the correct one
  const newContent = content.substring(0, hookSlideStart) + correctHookSlidePattern + content.substring(hookSlideEnd);

  fs.writeFileSync(lessonPath, newContent.replace(/\n/g, '\r\n'));
  fixedCount++;
  console.log(`✅ Fixed: ${folder}`);
}

console.log('\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Fixed: ${fixedCount}`);
console.log(`Already correct: ${alreadyFixedCount}`);
console.log(`No brandImage (skipped): ${skippedCount}`);
