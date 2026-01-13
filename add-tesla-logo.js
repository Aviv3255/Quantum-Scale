const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/product-to-identity/lesson.html';

let content = fs.readFileSync(path, 'utf8');

// Add brandImage to hook slide
const hookPattern = /\{ type: 'hook', headline: 'People don't buy products\. They buy versions of themselves\.', subtext: '.*?' \}/s;
const hookReplacement = `{ type: 'hook', headline: 'People don\\'t buy products. They buy versions of themselves.', subtext: 'A Rolex isn\\'t a watch. Tesla isn\\'t a car. Lululemon isn\\'t yoga pants. They\\'re identity purchases disguised as products. Your customers aren\\'t paying for features - they\\'re paying for who they become when they use what you sell.', brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/pngimg.com%20-%20tesla_logo_PNG12.png', brandName: 'Tesla' }`;

if (hookPattern.test(content)) {
  content = content.replace(hookPattern, hookReplacement);
  console.log('Hook slide updated with Tesla brand');
} else {
  console.log('Hook pattern not found, trying simpler approach');
  content = content.replace(
    "who they become when they use what you sell.' }",
    "who they become when they use what you sell.', brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/pngimg.com%20-%20tesla_logo_PNG12.png', brandName: 'Tesla' }"
  );
}

// Update HookSlide component if needed
const oldHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
          <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
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
  console.log('HookSlide component updated');
} else if (content.includes('data.brandImage &&')) {
  console.log('HookSlide already has brand support');
} else {
  console.log('HookSlide pattern not found - may need manual update');
}

fs.writeFileSync(path, content);
console.log('File saved');
