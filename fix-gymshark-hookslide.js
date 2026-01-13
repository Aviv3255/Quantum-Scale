const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/biz-operator-mindset/lesson.html';

let content = fs.readFileSync(path, 'utf8');
content = content.replace(/\r\n/g, '\n');

// The current HookSlide only supports personImage, need to add brandImage support
const oldHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
        </div>
        {data.personImage && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-[5%] z-0 pointer-events-none"
            style={{ height: '45%', maxHeight: '350px' }}
          >
            <img src={data.personImage} alt={data.personName || ''} className="h-full w-auto object-contain object-bottom" />
          </motion.div>
        )}
      </div>
    );`;

const newHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
        </div>
        {data.personImage && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-[5%] z-0 pointer-events-none"
            style={{ height: '45%', maxHeight: '350px' }}
          >
            <img src={data.personImage} alt={data.personName || ''} className="h-full w-auto object-contain object-bottom" />
          </motion.div>
        )}
        {data.brandImage && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute bottom-0 left-[5%] z-0 pointer-events-none" style={{ height: '25%', maxHeight: '150px' }}>
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 0.15 }} />
          </motion.div>
        )}
      </div>
    );`;

if (content.includes(oldHookSlide)) {
  content = content.replace(oldHookSlide, newHookSlide);
  fs.writeFileSync(path, content.replace(/\n/g, '\r\n'));
  console.log('Updated HookSlide to support both personImage and brandImage');
  console.log('Brand logo positioned at bottom-left (opposite of person image)');
} else {
  console.log('Pattern not found - checking current content...');
  // Check what HookSlide looks like
  const hookMatch = content.match(/const HookSlide[\s\S]*?\);[\s\r\n]+const ContentSlide/);
  if (hookMatch) {
    console.log('Current HookSlide:', hookMatch[0].substring(0, 500));
  }
}
