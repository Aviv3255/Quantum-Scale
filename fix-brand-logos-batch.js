const fs = require('fs');

// Fix 1: brand-universe - Add brandImage support to HookSlide (has subheadline variant)
console.log('=== Fixing brand-universe (Nike) ===');
const brandUniversePath = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/brand-universe/lesson.html';
let brandUniverseContent = fs.readFileSync(brandUniversePath, 'utf8').replace(/\r\n/g, '\n');

const oldHookSlideSubheadline = `const HookSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
          <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          {data.subheadline && <h3 className="slide-title text-2xl md:text-3xl lg:text-4xl mt-2" style={{ color: 'var(--accent)' }}>{data.subheadline}</h3>}
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
      </div>
    );`;

const newHookSlideSubheadline = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
            {data.subheadline && <h3 className="slide-title text-2xl md:text-3xl lg:text-4xl mt-2" style={{ color: 'var(--accent)' }}>{data.subheadline}</h3>}
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

if (brandUniverseContent.includes(oldHookSlideSubheadline)) {
  brandUniverseContent = brandUniverseContent.replace(oldHookSlideSubheadline, newHookSlideSubheadline);
  fs.writeFileSync(brandUniversePath, brandUniverseContent.replace(/\n/g, '\r\n'));
  console.log('Updated HookSlide for Nike in brand-universe');
} else {
  console.log('Pattern not found for brand-universe');
}

// Fix 2: biz-cash-conversion - Add brandImage support alongside personImage
console.log('\n=== Fixing biz-cash-conversion (Oodie + Davie Fogarty) ===');
const cashConversionPath = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/biz-cash-conversion/lesson.html';
let cashConversionContent = fs.readFileSync(cashConversionPath, 'utf8').replace(/\r\n/g, '\n');

const oldHookSlidePersonOnly = `const HookSlide = ({ data }) => (
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

const newHookSlidePersonAndBrand = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
        </div>
        {data.personImage && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-[5%] z-0 pointer-events-none" style={{ height: '52%', maxHeight: '400px' }}>
            <img src={data.personImage} alt={data.personName || ''} className="h-full w-auto object-contain object-bottom" />
          </motion.div>
        )}
        {data.brandImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-0 left-0 z-0 pointer-events-none" style={{ height: '20%', maxHeight: '120px', marginLeft: '3%', marginBottom: '5%' }}>
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 0.15 }} />
          </motion.div>
        )}
      </div>
    );`;

if (cashConversionContent.includes(oldHookSlidePersonOnly)) {
  cashConversionContent = cashConversionContent.replace(oldHookSlidePersonOnly, newHookSlidePersonAndBrand);
  console.log('Updated HookSlide to support both personImage and brandImage');
} else {
  console.log('HookSlide pattern not found for biz-cash-conversion');
}

// Add brandImage to hook data if not present
const oodieUrl = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oodie-Logo-RGB-R.webp';
if (!cashConversionContent.includes("brandImage: '" + oodieUrl)) {
  // Add brandImage after personName
  const hookPattern = /personName: 'Davie Fogarty' \}/;
  if (hookPattern.test(cashConversionContent)) {
    cashConversionContent = cashConversionContent.replace(hookPattern, `personName: 'Davie Fogarty', brandImage: '${oodieUrl}', brandName: 'The Oodie' }`);
    console.log('Added Oodie brandImage to hook data');
  }
}

fs.writeFileSync(cashConversionPath, cashConversionContent.replace(/\n/g, '\r\n'));
console.log('Saved biz-cash-conversion');

// Fix 3: emotional-problem - Add brandImage to hook data (HookSlide already supports it)
console.log('\n=== Fixing emotional-problem (Oodie) ===');
const emotionalProblemPath = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/emotional-problem/lesson.html';
let emotionalProblemContent = fs.readFileSync(emotionalProblemPath, 'utf8').replace(/\r\n/g, '\n');

// Find the hook slide ending and add brandImage
const hookEndPattern = /That's what people pay for\.' \}/;
if (hookEndPattern.test(emotionalProblemContent) && !emotionalProblemContent.includes("brandImage: '" + oodieUrl + "'")) {
  emotionalProblemContent = emotionalProblemContent.replace(
    hookEndPattern,
    `That's what people pay for.', brandImage: '${oodieUrl}', brandName: 'The Oodie' }`
  );
  fs.writeFileSync(emotionalProblemPath, emotionalProblemContent.replace(/\n/g, '\r\n'));
  console.log('Added Oodie brandImage to emotional-problem hook data');
} else {
  console.log('Hook pattern not found or brandImage already exists');
}

console.log('\nDone!');
