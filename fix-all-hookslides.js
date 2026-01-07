/**
 * Fix HookSlide component in ALL lessons to render characterVideo
 * This is a comprehensive fix for the entire codebase
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');
const SKIP = ['shared', 'nul'];

// New HookSlide with characterVideo support
const newHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-6 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8 md:py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 md:mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-2xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
        </div>
        {data.characterVideo && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className={\`absolute bottom-0 \${data.characterPosition === 'left' ? 'left-6' : 'right-6'} z-0 pointer-events-none hidden md:block\`}
            style={{ height: '52%', maxHeight: '400px' }}>
            <video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">
              <source src={data.characterVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}
        {data.brandImage && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-0 z-0 pointer-events-none hidden md:block" style={{ height: '30%', maxHeight: '200px', marginRight: '80px', marginBottom: '5%' }}>
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 1 }} />
          </motion.div>
        )}
      </div>
    );`;

const lessons = fs.readdirSync(lessonsDir).filter(d =>
  fs.statSync(path.join(lessonsDir, d)).isDirectory() && !SKIP.includes(d)
);

let fixed = 0;
let alreadyGood = 0;
let noHookSlide = 0;
let errors = [];

console.log(`Processing ${lessons.length} lessons...\n`);

for (const lesson of lessons) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    errors.push(`${lesson}: File not found`);
    continue;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');

    // Check if has HookSlide component
    if (!content.includes('const HookSlide')) {
      noHookSlide++;
      continue;
    }

    // Check if already has characterVideo rendering in HookSlide
    const hookSlideSection = content.match(/const HookSlide[\s\S]*?(?=const \w+Slide|\n\s*const [A-Z])/);
    if (hookSlideSection && hookSlideSection[0].includes('data.characterVideo &&')) {
      alreadyGood++;
      continue;
    }

    // Find and replace HookSlide
    const hookStart = content.indexOf('const HookSlide = ({ data }) =>');
    if (hookStart === -1) {
      errors.push(`${lesson}: Could not find HookSlide start`);
      continue;
    }

    // Find the next component definition after HookSlide
    const afterHook = content.slice(hookStart);
    const nextComponentMatch = afterHook.match(/\n\s*const [A-Z][a-zA-Z]+Slide = /);

    if (!nextComponentMatch) {
      // Try alternative - look for next const declaration
      const nextConstMatch = afterHook.match(/\);\s*\n\s*\n\s*const [A-Z]/);
      if (!nextConstMatch) {
        errors.push(`${lesson}: Could not find HookSlide end`);
        continue;
      }

      const endPos = hookStart + afterHook.indexOf(nextConstMatch[0]) + nextConstMatch[0].indexOf('\n\n');
      const oldHookSlide = content.slice(hookStart, endPos + 2);
      content = content.slice(0, hookStart) + newHookSlide + content.slice(endPos + 2);
    } else {
      const endPos = hookStart + afterHook.indexOf(nextComponentMatch[0]);
      const oldHookSlide = content.slice(hookStart, endPos);
      content = content.slice(0, hookStart) + newHookSlide + '\n\n    ' + content.slice(endPos + 1);
    }

    fs.writeFileSync(lessonPath, content, 'utf8');
    fixed++;
    console.log(`✓ Fixed: ${lesson}`);

  } catch (err) {
    errors.push(`${lesson}: ${err.message}`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Fixed: ${fixed}`);
console.log(`Already good: ${alreadyGood}`);
console.log(`No HookSlide: ${noHookSlide}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
