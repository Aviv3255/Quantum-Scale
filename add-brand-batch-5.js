const fs = require('fs');

const lessons = [
  {
    path: 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/emotional-problem/lesson.html',
    brand: 'The Oodie',
    brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oodie-Logo-RGB-R.webp',
    hookSearch: "That's what people pay for.' }"
  },
  {
    path: 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/brand-universe/lesson.html',
    brand: 'Nike',
    brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Nike-Logo.png',
    hookSearch: "you never leave.' }"
  },
  {
    path: 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/biz-cash-conversion/lesson.html',
    brand: 'The Oodie',
    brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oodie-Logo-RGB-R.webp',
    hookSearch: "collect later.' }"
  }
];

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

lessons.forEach(lesson => {
  let content = fs.readFileSync(lesson.path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  const hookReplacement = `${lesson.hookSearch.slice(0, -2)}, brandImage: '${lesson.brandImage}', brandName: '${lesson.brand}' }`;
  if (content.includes(lesson.hookSearch)) {
    content = content.replace(lesson.hookSearch, hookReplacement);
    console.log(`Added ${lesson.brand} brandImage to hook slide`);
  } else {
    console.log(`Hook search pattern not found for ${lesson.brand}`);
    const hookMatch = content.match(/type: 'hook'[^}]+\}/);
    if (hookMatch) {
      console.log('Found hook ending:', hookMatch[0].slice(-80));
    }
  }

  if (content.includes(oldHookSlide)) {
    content = content.replace(oldHookSlide, newHookSlide);
    console.log(`Updated HookSlide component for ${lesson.brand}`);
  } else if (content.includes('data.brandImage &&')) {
    console.log(`HookSlide already has brand support for ${lesson.brand}`);
  } else {
    console.log(`HookSlide pattern not found for ${lesson.brand}`);
  }

  fs.writeFileSync(lesson.path, content.replace(/\n/g, '\r\n'));
  console.log(`Saved ${lesson.brand}\n`);
});

console.log('Done!');
