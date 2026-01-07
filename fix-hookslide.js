const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/google-shopping-intent/lesson.html';

let content = fs.readFileSync(path, 'utf8');

// Use Windows line endings
const oldComponent = `const HookSlide = ({ data }) => (\r
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10">\r
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">\r
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>\r
          <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>\r
        </motion.div>\r
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>\r
      </div>\r
    );`;

const newComponent = `const HookSlide = ({ data }) => (\r
      <div className="h-full relative overflow-hidden">\r
        <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10 relative z-10">\r
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">\r
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>\r
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>\r
          </motion.div>\r
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>\r
        </div>\r
        {data.brandImage && (\r
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}\r
            className="absolute bottom-0 right-0 z-0 pointer-events-none" style={{ height: '30%', maxHeight: '200px', marginRight: '3%', marginBottom: '5%' }}>\r
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 0.2 }} />\r
          </motion.div>\r
        )}\r
      </div>\r
    );`;

if (content.includes(oldComponent)) {
  content = content.replace(oldComponent, newComponent);
  fs.writeFileSync(path, content);
  console.log('HookSlide component updated successfully');
} else {
  console.log('Old component pattern not found');
  // Try normalizing line endings
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedOld = oldComponent.replace(/\r\n/g, '\n').replace(/\r/g, '');
  if (normalizedContent.includes(normalizedOld)) {
    console.log('Found with normalized endings - updating');
    const normalizedNew = newComponent.replace(/\r\n/g, '\n').replace(/\r/g, '');
    const updated = normalizedContent.replace(normalizedOld, normalizedNew);
    // Convert back to Windows endings
    fs.writeFileSync(path, updated.replace(/\n/g, '\r\n'));
    console.log('Updated with normalized approach');
  } else {
    console.log('Still not found after normalizing');
  }
}
