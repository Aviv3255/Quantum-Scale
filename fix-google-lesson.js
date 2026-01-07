const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/google-shopping-intent/lesson.html';

let content = fs.readFileSync(path, 'utf8');

// Find and replace the hook slide - more flexible matching
const hookPattern = /\{ type: 'hook', headline: 'Social media users are scrolling through feeds.*?subtext: 'The difference between passive discovery and active intent.*?searching for it\.' \}/s;

const newHook = `{ type: 'hook', headline: 'Social media users are scrolling through feeds, barely paying attention. Google Shopping users are typing "men\\'s corduroy trousers" into the search bar. Which one do you think is more likely to buy?', subtext: 'The difference between passive discovery and active intent is the difference between hoping someone might want your product and showing up exactly when they\\'re searching for it.', brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Google_2015_logo.svg.png', brandName: 'Google' }`;

if (hookPattern.test(content)) {
  content = content.replace(hookPattern, newHook);
  console.log('Hook slide updated');
} else {
  console.log('Hook pattern not found, trying alternative');
  // Try simpler replacement
  content = content.replace(
    "searching for it.' },",
    "searching for it.', brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Google_2015_logo.svg.png', brandName: 'Google' },"
  );
  console.log('Tried alternative replacement');
}

// Update HookSlide component - find and replace
const oldHookSlideStart = 'const HookSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center px-8';

if (content.includes(oldHookSlideStart)) {
  content = content.replace(
    'const HookSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10">\n        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">\n          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: `rgba(var(--accent-rgb), 0.1)`, color: \'var(--accent)\' }}>The Hook</span>\n          <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>\n        </motion.div>\n        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>\n      </div>\n    );',
    `const HookSlide = ({ data }) => (
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
    );`
  );
  console.log('HookSlide component updated');
} else {
  console.log('HookSlide pattern not found');
}

fs.writeFileSync(path, content);
console.log('File saved');
