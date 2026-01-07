const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/box-worth-300/lesson.html';

let content = fs.readFileSync(path, 'utf8');
content = content.replace(/\r\n/g, '\n');

const oldHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center gap-6 px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
          <h2 className="slide-title text-2xl md:text-3xl lg:text-4xl text-black leading-tight mb-4">{data.headline}</h2>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed">{data.subtext}</p>
        </motion.div>
      </div>
    );`;

const newHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center gap-6 px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-2xl md:text-3xl lg:text-4xl text-black leading-tight mb-4">{data.headline}</h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">{data.subtext}</p>
          </motion.div>
        </div>
        {data.brandImage && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-0 z-0 pointer-events-none" style={{ height: '30%', maxHeight: '200px', marginRight: '3%', marginBottom: '5%' }}>
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 0.2 }} />
          </motion.div>
        )}
      </div>
    );`;

if (content.includes(oldHookSlide)) {
  content = content.replace(oldHookSlide, newHookSlide);
  fs.writeFileSync(path, content.replace(/\n/g, '\r\n'));
  console.log('Updated HookSlide component for Tiffany');
} else {
  console.log('Pattern not found');
}
