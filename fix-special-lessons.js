const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app/public/lessons');

// Special lessons that need different handling - they already have custom components defined
// We just need to ensure the renderSlide case statements are complete

const specialLessons = {
  'biz-systems-architect': {
    missingCases: ['highlight-box'],
    components: `
    const HighlightBoxSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10">
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl lg:text-4xl text-black mb-6">{data.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6">{data.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-neutral-900 rounded-xl p-5">
          <p className="text-white text-sm md:text-base font-medium"><Icons.Zap className="inline mr-2" style={{ color: 'var(--accent)' }} />{data.highlight}</p>
        </motion.div>
      </div>
    );`
  },
  'meta-1-1-x-structure': {
    missingCases: ['action-checklist'],
    components: `
    const ActionChecklistSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="space-y-3 mb-4">
          {data.items && data.items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-start gap-4 bg-white border-2 border-neutral-200 rounded-xl p-4">
              <div className="w-6 h-6 rounded-md border-2 border-neutral-300 flex-shrink-0 mt-0.5" />
              <span className="text-neutral-700 text-sm md:text-base">{typeof item === 'string' ? item : item.task || item.text}</span>
            </motion.div>
          ))}
        </div>
        {data.bottomNote && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-neutral-900 rounded-xl p-4 text-center">
          <p className="text-neutral-300 text-sm">{data.bottomNote}</p>
        </motion.div>}
      </div>
    );`
  },
  'meta-consolidation-principle': {
    missingCases: ['quote', 'stats', 'visual-structure'],
    components: `
    const QuoteSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center items-center px-8 md:px-16 max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl mb-6" style={{ color: 'var(--accent)' }}>"</motion.div>
        <motion.blockquote initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-3xl font-medium text-neutral-800 mb-6 leading-relaxed">{data.data ? data.data.quote : data.quote}</motion.blockquote>
        {(data.data?.context || data.context) && <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-neutral-500">{data.data?.context || data.context}</motion.p>}
      </div>
    );

    const StatsSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-8">{data.title}</motion.h2>
        <div className="grid md:grid-cols-3 gap-4">
          {data.items && data.items.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-neutral-900 rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{stat.value}</div>
              <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-neutral-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const VisualStructureSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="bg-neutral-900 rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-bold mb-2">{data.data?.campaign || 'Campaign'}</div>
            <div className="text-neutral-400 text-sm">↓</div>
            <div className="inline-block px-4 py-2 rounded-lg bg-blue-500 text-white font-medium mt-2">{data.data?.adSet || 'Ad Set'}</div>
          </div>
          {data.data?.creatives && <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {data.data.creatives.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-neutral-800 rounded-lg p-3 text-center">
                <div className="text-xs text-neutral-300">{c.type}</div>
              </motion.div>
            ))}
          </div>}
        </div>
      </div>
    );`
  },
  'meta-radical-diversity': {
    missingCases: ['format-card'],
    components: `
    const FormatCardSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.formats && data.formats.map((format, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="bg-white border-2 rounded-xl p-4" style={{ borderColor: format.color || 'var(--accent)' }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: format.color || 'var(--accent)' }}>{format.name}</h3>
              <p className="text-neutral-600 text-xs">{format.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );`
  },
  'meta-sequence-learning': {
    missingCases: ['sequence', 'non-sequence'],
    components: `
    const SequenceSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {data.steps && data.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="relative flex items-center">
              <div className="bg-white border-2 border-green-500 rounded-xl p-4 w-36 text-center">
                <div className="text-lg font-bold text-green-600 mb-1">{step.name}</div>
                <div className="text-xs text-neutral-500">{step.description}</div>
              </div>
              {i < data.steps.length - 1 && <div className="text-green-500 mx-2">→</div>}
            </motion.div>
          ))}
        </div>
      </div>
    );

    const NonSequenceSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {data.steps && data.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-red-50 border-2 border-red-300 rounded-xl p-4 w-36 text-center">
              <div className="text-lg font-bold text-red-600 mb-1">{step.name}</div>
              <div className="text-xs text-neutral-500">{step.description}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-4">
          <span className="text-red-500 text-sm">❌ No learning sequence = Wasted impressions</span>
        </motion.div>
      </div>
    );`
  },
  'visual-priming': {
    missingCases: ['split'],
    components: `
    const SplitSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white border-2 border-neutral-200 rounded-xl p-5">
            <h3 className="font-bold text-lg mb-3">{data.left?.title || 'Left'}</h3>
            {data.left?.content && <p className="text-neutral-600 text-sm">{data.left.content}</p>}
            {data.left?.items && <ul className="space-y-2">{data.left.items.map((item, i) => <li key={i} className="text-neutral-700 text-sm flex items-start gap-2"><span className="text-neutral-400">•</span>{item}</li>)}</ul>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white border-2 border-neutral-200 rounded-xl p-5">
            <h3 className="font-bold text-lg mb-3">{data.right?.title || 'Right'}</h3>
            {data.right?.content && <p className="text-neutral-600 text-sm">{data.right.content}</p>}
            {data.right?.items && <ul className="space-y-2">{data.right.items.map((item, i) => <li key={i} className="text-neutral-700 text-sm flex items-start gap-2"><span className="text-neutral-400">•</span>{item}</li>)}</ul>}
          </motion.div>
        </div>
      </div>
    );`
  }
};

Object.entries(specialLessons).forEach(([lessonId, config]) => {
  const lessonPath = path.join(lessonsDir, lessonId, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    console.log(`⚠️ Skipping ${lessonId} - file not found`);
    return;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');

    // Find where to add components (before CompletionSlide or QuizSlide)
    const insertPoints = ['const CompletionSlide', 'const QuizSlide', 'const LessonApp'];
    let insertIndex = -1;

    for (const point of insertPoints) {
      const idx = content.indexOf(point);
      if (idx !== -1) {
        insertIndex = idx;
        break;
      }
    }

    if (insertIndex === -1) {
      console.log(`⚠️ ${lessonId} - Could not find insertion point`);
      return;
    }

    // Check which components are missing and add them
    let componentsAdded = false;
    for (const caseType of config.missingCases) {
      const componentName = caseType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Slide';
      if (!content.includes(`const ${componentName}`)) {
        content = content.substring(0, insertIndex) + config.components + '\n\n    ' + content.substring(insertIndex);
        componentsAdded = true;
        break; // Only add once
      }
    }

    // Add missing case statements
    const renderSlideMatch = content.match(/const renderSlide = \(slide\) => \{[\s\S]*?switch \(slide\.type\) \{/);
    if (renderSlideMatch) {
      const switchIndex = content.indexOf(renderSlideMatch[0]) + renderSlideMatch[0].length;

      let casesAdded = '';
      for (const caseType of config.missingCases) {
        if (!content.includes(`case '${caseType}':`)) {
          const componentName = caseType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Slide';
          casesAdded += `\n          case '${caseType}': return <${componentName} data={slide} />;`;
        }
      }

      if (casesAdded) {
        content = content.substring(0, switchIndex) + casesAdded + content.substring(switchIndex);
      }
    }

    fs.writeFileSync(lessonPath, content, 'utf8');
    console.log(`✅ Fixed ${lessonId}`);

  } catch (error) {
    console.log(`❌ Error fixing ${lessonId}: ${error.message}`);
  }
});

console.log('\nDone fixing special lessons!');
