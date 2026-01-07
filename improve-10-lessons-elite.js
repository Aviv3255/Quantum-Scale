/**
 * Improve 10 lessons to elite design level
 * Lessons: certainty-transfer, checkout-line-effect, choose-products, cognitive-load-trap,
 *          commodity-escape, compound-testing-effect, consumption-conversion, conviction-architecture,
 *          copywriters-codex, cost-of-standing-still
 *
 * Elite patterns to add:
 * 1. AnimatedCounter component (if not present)
 * 2. Dark stat cards with glow effects
 * 3. Enhanced visual slide styling
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

const LESSONS_TO_IMPROVE = [
  'five-second-test',
  'five-value-heuristics',
  'fly-in-the-urinal',
  'fomo-engineering',
  'fonts-psychology',
  'forbidden-coffee-hook',
  'formula-to-sell',
  'forty-forty-twenty-rule',
  'forty-million-mistake',
  'founder-operating-system'
];

// Enhanced AnimatedCounter with prefix support
const ANIMATED_COUNTER_COMPONENT = `
    // Animated Counter Component
    const AnimatedCounter = ({ target, suffix = '', prefix = '', duration = 2000 }) => {
      const [count, setCount] = useState(0);
      useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else { setCount(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
      }, [target, duration]);
      return <span>{prefix}{count}{suffix}</span>;
    };`;

// Enhanced VisualSlide with glow effects and animated counters
const ENHANCED_VISUAL_SLIDE = `const VisualSlide = ({ data }) => {
      if (data.visualType === 'stats') {
        return (
          <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
            <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-xl md:text-3xl text-black text-center mb-6 md:mb-8">{data.title}</motion.h2>
            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {data.data.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-neutral-900 rounded-xl p-4 md:p-6 text-center" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(var(--accent-rgb),0.15)' }}>
                  <div className="text-2xl md:text-5xl font-bold mb-1 md:mb-2" style={{ color: 'var(--accent)', textShadow: '0 0 20px rgba(var(--accent-rgb),0.4)' }}>{stat.value}</div>
                  <div className="text-xs md:text-sm font-semibold text-white mb-0.5 md:mb-1">{stat.label}</div>
                  <div className="text-[10px] md:text-xs text-neutral-400">{stat.subtext}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      }
      return null;
    };`;

// Enhanced CardsSlide with character video support and better styling
const ENHANCED_CARDS_SLIDE = `const CardsSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8 relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
          <div className={\`grid gap-3 relative z-10 \${data.items.length === 5 ? 'md:grid-cols-3' : data.items.length === 3 ? 'md:grid-cols-3' : data.items.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-2'}\`}>
            {data.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="bg-white border-2 border-neutral-200 rounded-xl p-4 hover:border-neutral-300 hover:shadow-lg transition-all">
                <h3 className="font-bold text-neutral-900 mb-2 text-sm md:text-base">{item.title}</h3>
                <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {data.characterVideo && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className={\`absolute bottom-0 \${data.characterPosition === 'left' ? 'left-6' : 'right-6'} z-0 pointer-events-none hidden md:block\`}
            style={{ height: '45%', maxHeight: '350px' }}>
            <video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">
              <source src={data.characterVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </div>
    );`;

// Enhanced SplitComparisonSlide with character video support
const ENHANCED_SPLIT_COMPARISON_SLIDE = `const SplitComparisonSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8 relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white"><Icons.X /></div>
                <span className="font-bold text-red-700">{data.leftTitle}</span>
              </div>
              <ul className="space-y-3">
                {data.leftItems.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }} className="text-neutral-700 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">−</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white"><Icons.Check /></div>
                <span className="font-bold text-green-700">{data.rightTitle}</span>
              </div>
              <ul className="space-y-3">
                {data.rightItems.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }} className="text-neutral-700 text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        {data.characterVideo && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className={\`absolute bottom-0 \${data.characterPosition === 'left' ? 'left-6' : 'right-6'} z-0 pointer-events-none hidden md:block\`}
            style={{ height: '45%', maxHeight: '350px' }}>
            <video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">
              <source src={data.characterVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </div>
    );`;

let improved = 0;
let errors = [];

console.log(`\n========== IMPROVING ${LESSONS_TO_IMPROVE.length} LESSONS TO ELITE DESIGN ==========\n`);

for (const lesson of LESSONS_TO_IMPROVE) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    errors.push(`${lesson}: File not found`);
    continue;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');
    let changes = [];

    // 1. Check if AnimatedCounter exists, add if not
    if (!content.includes('const AnimatedCounter')) {
      // Add AnimatedCounter after the getUserName function
      const insertPoint = content.indexOf('const getUserName');
      if (insertPoint !== -1) {
        const afterGetUserName = content.indexOf('\n', content.indexOf(';', insertPoint));
        content = content.slice(0, afterGetUserName + 1) + ANIMATED_COUNTER_COMPONENT + content.slice(afterGetUserName + 1);
        changes.push('Added AnimatedCounter');
      }
    }

    // 2. Upgrade VisualSlide with glow effects
    if (content.includes('const VisualSlide = ({ data }) =>')) {
      const visualSlideStart = content.indexOf('const VisualSlide = ({ data }) =>');
      const visualSlideEnd = findComponentEnd(content, visualSlideStart);

      if (visualSlideEnd > visualSlideStart) {
        const currentVisualSlide = content.slice(visualSlideStart, visualSlideEnd);

        // Check if already has glow effects
        if (!currentVisualSlide.includes('boxShadow:') || !currentVisualSlide.includes('rgba(var(--accent-rgb)')) {
          content = content.slice(0, visualSlideStart) + ENHANCED_VISUAL_SLIDE + content.slice(visualSlideEnd);
          changes.push('Enhanced VisualSlide with glow effects');
        }
      }
    }

    // 3. Upgrade CardsSlide with character video support
    if (content.includes('const CardsSlide = ({ data }) =>')) {
      const cardsSlideStart = content.indexOf('const CardsSlide = ({ data }) =>');
      const cardsSlideEnd = findComponentEnd(content, cardsSlideStart);

      if (cardsSlideEnd > cardsSlideStart) {
        const currentCardsSlide = content.slice(cardsSlideStart, cardsSlideEnd);

        // Check if doesn't have character video support
        if (!currentCardsSlide.includes('data.characterVideo')) {
          content = content.slice(0, cardsSlideStart) + ENHANCED_CARDS_SLIDE + content.slice(cardsSlideEnd);
          changes.push('Enhanced CardsSlide with video support');
        }
      }
    }

    // 4. Upgrade SplitComparisonSlide with character video support
    if (content.includes('const SplitComparisonSlide = ({ data }) =>')) {
      const splitSlideStart = content.indexOf('const SplitComparisonSlide = ({ data }) =>');
      const splitSlideEnd = findComponentEnd(content, splitSlideStart);

      if (splitSlideEnd > splitSlideStart) {
        const currentSplitSlide = content.slice(splitSlideStart, splitSlideEnd);

        // Check if doesn't have character video support
        if (!currentSplitSlide.includes('data.characterVideo')) {
          content = content.slice(0, splitSlideStart) + ENHANCED_SPLIT_COMPARISON_SLIDE + content.slice(splitSlideEnd);
          changes.push('Enhanced SplitComparisonSlide with video support');
        }
      }
    }

    // 5. Ensure hover effects on cards
    if (content.includes('hover:border-neutral-300') && !content.includes('hover:shadow-lg')) {
      content = content.replace(/hover:border-neutral-300(?! hover:shadow)/g, 'hover:border-neutral-300 hover:shadow-lg');
      changes.push('Added hover shadow effects');
    }

    if (changes.length > 0) {
      fs.writeFileSync(lessonPath, content, 'utf8');
      improved++;
      console.log(`✓ ${lesson}: ${changes.join(', ')}`);
    } else {
      console.log(`○ ${lesson}: Already at elite level`);
    }

  } catch (err) {
    errors.push(`${lesson}: ${err.message}`);
  }
}

// Helper function to find the end of a component definition
function findComponentEnd(content, startPos) {
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let i = startPos;

  // Find the opening parenthesis of the component
  while (i < content.length && content[i] !== '(') i++;

  // Now find the matching closing
  while (i < content.length) {
    const char = content[i];

    if (inString) {
      if (char === stringChar && content[i-1] !== '\\') {
        inString = false;
      }
    } else {
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
      } else if (char === '(' || char === '{') {
        depth++;
      } else if (char === ')' || char === '}') {
        depth--;
        if (depth === 0) {
          // Find the semicolon or next statement
          let endPos = i + 1;
          while (endPos < content.length && /[\s;]/.test(content[endPos])) endPos++;
          return endPos;
        }
      }
    }
    i++;
  }

  return startPos; // Fallback
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Improved: ${improved}`);
console.log(`Already elite: ${LESSONS_TO_IMPROVE.length - improved - errors.length}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}

console.log('\n✅ Elite improvement complete!\n');
