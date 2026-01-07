const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app/public/lessons');

// All the component definitions we need to add
const componentDefinitions = `
    const StatCountdownSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-8">{data.title}</motion.h2>
        <div className="grid md:grid-cols-3 gap-4">
          {data.stats && data.stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-neutral-900 rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: stat.color || 'var(--accent)' }}>{stat.value}{stat.suffix}</div>
              <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-neutral-400">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const BeforeAfterSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white"><Icons.X /></div><span className="font-semibold text-red-700 text-sm">Before</span></div>
            <ul className="space-y-2">{data.before && data.before.map((item, i) => <li key={i} className="text-neutral-700 text-sm flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"><Icons.Check /></div><span className="font-semibold text-green-700 text-sm">After</span></div>
            <ul className="space-y-2">{data.after && data.after.map((item, i) => <li key={i} className="text-neutral-700 text-sm flex items-start gap-2"><span className="text-green-500 mt-0.5">•</span>{item}</li>)}</ul>
          </motion.div>
        </div>
      </div>
    );

    const HighlightBoxSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10">
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl lg:text-4xl text-black mb-6">{data.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6">{data.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-neutral-900 rounded-xl p-5">
          <p className="text-white text-sm md:text-base font-medium"><Icons.Zap className="inline mr-2" style={{ color: 'var(--accent)' }} />{data.highlight}</p>
        </motion.div>
      </div>
    );

    const StrategyStepsSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="space-y-3">
          {data.steps && data.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-start gap-4 bg-white border-2 border-neutral-200 rounded-xl p-4">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white flex-shrink-0" style={{ background: step.color || 'var(--accent)' }}>{step.number || i + 1}</span>
              <div><h3 className="font-bold text-neutral-900 mb-1">{step.title}</h3><p className="text-neutral-600 text-sm leading-relaxed">{step.description}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const ComparisonCardsSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={\`rounded-xl p-5 \${data.left && data.left.color === 'red' ? 'bg-red-50 border-2 border-red-200' : 'bg-neutral-50 border-2 border-neutral-200'}\`}>
            {data.left && <><div className="text-center mb-4">
              <span className={\`text-xs font-bold uppercase tracking-wider \${data.left.color === 'red' ? 'text-red-500' : 'text-neutral-500'}\`}>{data.left.label}</span>
              {data.left.value && <h3 className={\`text-2xl font-bold \${data.left.color === 'red' ? 'text-red-600' : 'text-neutral-900'}\`}>{data.left.value}</h3>}
              {data.left.subtext && <p className="text-xs text-neutral-500">{data.left.subtext}</p>}
            </div>
            <ul className="space-y-2">{data.left.items && data.left.items.map((item, i) => <li key={i} className="text-neutral-700 text-sm flex items-start gap-2"><span className={data.left.color === 'red' ? 'text-red-400' : 'text-neutral-400'}>•</span>{item}</li>)}</ul></>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={\`rounded-xl p-5 \${data.right && data.right.color === 'green' ? 'bg-green-50 border-2 border-green-200' : 'bg-neutral-50 border-2 border-neutral-200'}\`}>
            {data.right && <><div className="text-center mb-4">
              <span className={\`text-xs font-bold uppercase tracking-wider \${data.right.color === 'green' ? 'text-green-500' : 'text-neutral-500'}\`}>{data.right.label}</span>
              {data.right.value && <h3 className={\`text-2xl font-bold \${data.right.color === 'green' ? 'text-green-600' : 'text-neutral-900'}\`}>{data.right.value}</h3>}
              {data.right.subtext && <p className="text-xs text-neutral-500">{data.right.subtext}</p>}
            </div>
            <ul className="space-y-2">{data.right.items && data.right.items.map((item, i) => <li key={i} className="text-neutral-700 text-sm flex items-start gap-2"><span className={data.right.color === 'green' ? 'text-green-500' : 'text-neutral-400'}>•</span>{item}</li>)}</ul></>}
          </motion.div>
        </div>
      </div>
    );

    const DoomLoopSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-8">{data.title}</motion.h2>
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-3">
            {data.steps && data.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.15 }} className="relative">
                <div className="bg-white border-2 rounded-xl p-4 w-40" style={{ borderColor: step.color }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-2" style={{ background: step.color }}>{i + 1}</div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: step.color }}>{step.label}</h3>
                  <p className="text-neutral-500 text-xs">{step.description}</p>
                </div>
                {i < data.steps.length - 1 && <div className="absolute top-1/2 -right-3 text-neutral-300 text-xl">→</div>}
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center mt-4">
            <span className="text-xs text-neutral-400">↺ The cycle repeats...</span>
          </motion.div>
        </div>
      </div>
    );

    const EscapePlanSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="space-y-3">
          {data.steps && data.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-start gap-4 bg-white border-2 border-neutral-200 rounded-xl p-4">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white flex-shrink-0" style={{ background: step.color || 'var(--accent)' }}>{step.number || i + 1}</span>
              <div><h3 className="font-bold text-neutral-900 mb-1">{step.title}</h3><p className="text-neutral-600 text-sm leading-relaxed">{step.description}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const BigStatementSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center items-center px-8 md:px-16 max-w-4xl mx-auto text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl text-neutral-600 mb-2">{data.statement}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="slide-title text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: 'var(--accent)' }}>{data.emphasis}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-neutral-500 max-w-2xl">{data.footer}</motion.p>
      </div>
    );

    const ActionSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="space-y-3">
          {data.actions && data.actions.map((action, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-center gap-4 bg-white border-2 border-neutral-200 rounded-xl p-4 hover:border-green-300 transition-colors">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: 'var(--accent)' }}><Icons.Check /></div>
              <span className="text-neutral-700 text-sm md:text-base">{action}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const TrapVisualSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center items-center px-8 md:px-16 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <span className="text-6xl">🪤</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="slide-title text-3xl md:text-4xl lg:text-5xl text-black mb-4">{data.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-neutral-500">{data.subtitle}</motion.p>
      </div>
    );

    const MathBreakdownSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="space-y-4 mb-4">
          {data.scenarios && data.scenarios.map((scenario, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.15 }} className="bg-white border-2 rounded-xl p-5" style={{ borderColor: scenario.color }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{scenario.icon === 'smile' ? '😊' : '😟'}</span>
                <span className="font-bold" style={{ color: scenario.color }}>{scenario.label}</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div><span className="text-neutral-500">Cost:</span> <span className="font-medium">{scenario.cost}</span></div>
                <div><span className="text-neutral-500">Result:</span> <span className="font-medium">{scenario.result}</span></div>
                <div><span className="font-bold" style={{ color: scenario.color }}>{scenario.profit}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
        {data.insight && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-neutral-900 rounded-xl p-4 text-center">
          <p className="text-neutral-300 text-sm"><Icons.Zap className="inline mr-2" />{data.insight}</p>
        </motion.div>}
      </div>
    );

    const RatioVisualSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-8">{data.title}</motion.h2>
        <div className="grid md:grid-cols-4 gap-3">
          {data.ratios && data.ratios.map((ratio, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-white border-2 rounded-xl p-4 text-center" style={{ borderColor: ratio.color }}>
              <div className="text-2xl font-bold mb-1" style={{ color: ratio.color }}>{ratio.value}</div>
              <div className="text-xs font-semibold text-neutral-900 mb-1">{ratio.label}</div>
              <div className="text-xs text-neutral-500">{ratio.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const ToolIntegrationSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' }}>Recommended Tool</span>
          <h2 className="slide-title text-xl md:text-2xl lg:text-3xl text-black">{data.title}</h2>
          {data.subtitle && <p className="text-neutral-500 text-sm mt-1">{data.subtitle}</p>}
        </motion.div>
        {data.tool && <div className="grid md:grid-cols-2 gap-4 mb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-xl overflow-hidden border-2 border-neutral-200 bg-white">
            <img src={data.tool.image} alt={data.tool.name} className="w-full h-auto" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-2">{data.tool.name}</h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">{data.tool.description}</p>
            {data.tool.features && <ul className="space-y-1.5 mb-4">
              {data.tool.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm text-neutral-700"><Icons.Check className="text-green-500 w-4 h-4" />{f}</li>)}
            </ul>}
            {data.tool.link && <a href={data.tool.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}>
              <span>Try {data.tool.name}</span><Icons.ExternalLink />
            </a>}
          </motion.div>
        </div>}
      </div>
    );

    const ActionChecklistSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="space-y-3">
          {data.items && data.items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-start gap-4 bg-white border-2 border-neutral-200 rounded-xl p-4">
              <div className="w-6 h-6 rounded-md border-2 border-neutral-300 flex-shrink-0 mt-0.5" />
              <span className="text-neutral-700 text-sm md:text-base">{typeof item === 'string' ? item : item.text || item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const QuoteSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center items-center px-8 md:px-16 max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl mb-6" style={{ color: 'var(--accent)' }}>"</motion.div>
        <motion.blockquote initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-3xl font-medium text-neutral-800 mb-6 leading-relaxed">{data.quote}</motion.blockquote>
        {data.author && <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-neutral-500">— {data.author}{data.context && <span className="block text-sm mt-1">{data.context}</span>}</motion.p>}
        {data.insight && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 bg-neutral-100 rounded-xl p-4 max-w-xl"><p className="text-sm text-neutral-600">{data.insight}</p></motion.div>}
      </div>
    );

    const FlywheelVisualSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-8">{data.title}</motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {data.steps && data.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="relative">
              <div className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-center p-4" style={{ borderColor: step.color || 'var(--accent)', background: 'white' }}>
                <div>
                  <div className="text-2xl mb-1">{step.icon || '⚡'}</div>
                  <div className="text-xs font-bold" style={{ color: step.color }}>{step.label}</div>
                </div>
              </div>
              {i < (data.steps.length - 1) && <div className="absolute top-1/2 -right-4 text-2xl" style={{ color: 'var(--accent)' }}>→</div>}
            </motion.div>
          ))}
        </div>
      </div>
    );

    const MathVisualSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-neutral-900 rounded-2xl p-8 text-center">
          {data.equation && <div className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">{data.equation}</div>}
          {data.explanation && <p className="text-neutral-400 text-sm">{data.explanation}</p>}
        </motion.div>
        {data.examples && <div className="grid md:grid-cols-3 gap-3 mt-4">
          {data.examples.map((ex, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white border-2 border-neutral-200 rounded-xl p-4 text-center">
              <div className="text-lg font-bold" style={{ color: ex.color || 'var(--accent)' }}>{ex.value}</div>
              <div className="text-xs text-neutral-500">{ex.label}</div>
            </motion.div>
          ))}
        </div>}
      </div>
    );

    const RequirementsVisualSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="space-y-3">
          {data.requirements && data.requirements.map((req, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-center gap-4 bg-white border-2 border-neutral-200 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: req.met ? '#10b981' : '#ef4444' }}>
                {req.met ? <Icons.Check /> : <Icons.X />}
              </div>
              <span className="text-neutral-700 text-sm md:text-base">{req.text || req}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const FounderSpotlightSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center items-center px-8 md:px-16 max-w-3xl mx-auto text-center">
        {data.image && <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
          <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        </motion.div>}
        <motion.h3 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl font-bold text-black mb-1">{data.name}</motion.h3>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm text-neutral-500 mb-4">{data.title}</motion.p>
        <motion.blockquote initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-neutral-700 italic leading-relaxed">"{data.quote}"</motion.blockquote>
      </div>
    );

    const VelocityMetricSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-neutral-900 rounded-2xl p-8 text-center mb-4">
          <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{data.value}</div>
          <div className="text-white text-lg font-medium">{data.label}</div>
          {data.subtext && <div className="text-neutral-400 text-sm mt-2">{data.subtext}</div>}
        </motion.div>
        {data.breakdown && <div className="grid md:grid-cols-3 gap-3">
          {data.breakdown.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white border-2 border-neutral-200 rounded-xl p-4 text-center">
              <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
              <div className="text-xs text-neutral-500">{item.label}</div>
            </motion.div>
          ))}
        </div>}
      </div>
    );

    const MindsetFrameworkSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="grid md:grid-cols-2 gap-3">
          {data.principles && data.principles.map((principle, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="bg-white border-2 border-neutral-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{principle.icon || '💡'}</span>
                <h3 className="font-bold text-neutral-900">{principle.title}</h3>
              </div>
              <p className="text-neutral-600 text-sm">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const GenericListSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        {data.subtitle && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-neutral-500 text-center mb-6">{data.subtitle}</motion.p>}
        <div className="space-y-3">
          {(data.items || data.steps || data.points || []).map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-start gap-4 bg-white border-2 border-neutral-200 rounded-xl p-4">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: 'var(--accent)' }}>{i + 1}</span>
              <div>
                {typeof item === 'string' ? <span className="text-neutral-700">{item}</span> : <>
                  <h3 className="font-bold text-neutral-900 mb-1">{item.title || item.label}</h3>
                  <p className="text-neutral-600 text-sm">{item.description || item.text}</p>
                </>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const AnglesSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="grid md:grid-cols-3 gap-4">
          {data.items && data.items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-white border-2 border-neutral-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--accent)' }}>{item.title}</h3>
              <p className="text-neutral-600 text-sm mb-3">{item.description}</p>
              {item.example && <div className="bg-neutral-50 rounded-lg p-3"><p className="text-xs text-neutral-500 italic">{item.example}</p></div>}
            </motion.div>
          ))}
        </div>
      </div>
    );

    const FormatsSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.items && data.items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="bg-white border-2 rounded-xl p-4" style={{ borderColor: item.color || 'var(--accent)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: item.color || 'var(--accent)' }}>📝</div>
                <h3 className="font-bold text-sm">{item.title}</h3>
              </div>
              <p className="text-neutral-600 text-xs">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );

    const MatrixVisualizationSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black text-center mb-6">{data.title}</motion.h2>
        <div className="bg-neutral-900 rounded-2xl p-6">
          <div className="grid grid-cols-6 gap-2 text-xs">
            <div className="col-span-1"></div>
            {(data.formats || ['F1', 'F2', 'F3', 'F4', 'F5']).slice(0, 5).map((f, i) => (
              <div key={i} className="text-center text-neutral-400 font-medium truncate">{typeof f === 'string' ? f.replace('Format ', '').substring(0, 8) : f}</div>
            ))}
            {(data.angles || ['Angle 1', 'Angle 2', 'Angle 3']).map((angle, ai) => (
              <React.Fragment key={ai}>
                <div className="text-neutral-400 font-medium truncate pr-2">{typeof angle === 'string' ? angle.replace('Angle ', 'A').substring(0, 10) : angle}</div>
                {[0, 1, 2, 3, 4].map((fi) => (
                  <motion.div key={fi} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + (ai * 5 + fi) * 0.03 }} className="aspect-square rounded-lg flex items-center justify-center text-white font-bold" style={{ background: 'var(--accent)' }}>{ai * 5 + fi + 1}</motion.div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center mt-4 text-neutral-400 text-sm">3 Angles × 5 Formats = 15 Unique Ads</div>
        </div>
      </div>
    );

    const MatrixBuilderSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="slide-title text-2xl md:text-3xl text-black mb-4">{data.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-neutral-500 mb-6">{data.description}</motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-neutral-100 rounded-xl p-8">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-neutral-600">Start building your creative matrix today</p>
        </motion.div>
      </div>
    );`;

// Case statements to add
const caseStatements = `
          case 'stat-countdown': return <StatCountdownSlide data={slide} />;
          case 'before-after': return <BeforeAfterSlide data={slide} />;
          case 'highlight-box': return <HighlightBoxSlide data={slide} />;
          case 'strategy-steps': return <StrategyStepsSlide data={slide} />;
          case 'comparison-cards': return <ComparisonCardsSlide data={slide} />;
          case 'doom-loop': return <DoomLoopSlide data={slide} />;
          case 'escape-plan': return <EscapePlanSlide data={slide} />;
          case 'bigStatement': return <BigStatementSlide data={slide} />;
          case 'actionSlide': return <ActionSlide data={slide} />;
          case 'trap-visual': return <TrapVisualSlide data={slide} />;
          case 'math-breakdown': return <MathBreakdownSlide data={slide} />;
          case 'ratio-visual': return <RatioVisualSlide data={slide} />;
          case 'tool-integration': return <ToolIntegrationSlide data={slide} />;
          case 'action-checklist': return <ActionChecklistSlide data={slide} />;
          case 'quote': return <QuoteSlide data={slide} />;
          case 'quote-slide': return <QuoteSlide data={slide} />;
          case 'quote-spotlight': return <QuoteSlide data={slide} />;
          case 'flywheel-visual': return <FlywheelVisualSlide data={slide} />;
          case 'math-visual': return <MathVisualSlide data={slide} />;
          case 'requirements-visual': return <RequirementsVisualSlide data={slide} />;
          case 'founder-spotlight': return <FounderSpotlightSlide data={slide} />;
          case 'velocity-metric': return <VelocityMetricSlide data={slide} />;
          case 'mindset-framework': return <MindsetFrameworkSlide data={slide} />;
          case 'angles': return <AnglesSlide data={slide} />;
          case 'formats': return <FormatsSlide data={slide} />;
          case 'matrixVisualization': return <MatrixVisualizationSlide data={slide} />;
          case 'matrixBuilder': return <MatrixBuilderSlide data={slide} />;
          case 'stats': return <StatCountdownSlide data={slide} />;
          case 'roadmap': return <StrategyStepsSlide data={slide} />;
          case 'triangle': return <GenericListSlide data={slide} />;
          case 'flywheel': return <FlywheelVisualSlide data={slide} />;
          case 'ratio-spectrum': return <RatioVisualSlide data={slide} />;
          case 'math-comparison': return <MathBreakdownSlide data={slide} />;
          case 'opportunity-cost': return <GenericListSlide data={slide} />;`;

// Affected lessons list
const affectedLessons = [
  'biz-90-percent-trap',
  'biz-animal-mindset',
  'biz-authenticity-engine',
  'biz-channel-cac-decoder',
  'biz-creative-targeting',
  'biz-creator-army',
  'biz-high-margin-fortress',
  'biz-infinite-money-glitch',
  'biz-lifetime-gross-profit',
  'biz-mission-driven-brand',
  'biz-savage-mentality',
  'biz-systems-architect',
  'biz-zero-cac-engine',
  'choose-products',
  'fomo-engineering',
  'formula-to-sell',
  'framing-effect-mastery',
  'google-cable-drawer-problem',
  'google-creative-targeting',
  'google-influencer-creative',
  'google-new-customer-acquisition',
  'google-signal-mastery',
  'identity-marketing',
  'killer-headlines',
  'meta-1-1-x-structure',
  'meta-ad-scheduling',
  'meta-ai-era-edge',
  'meta-andromeda',
  'meta-automated-rules',
  'meta-consolidation-principle',
  'meta-creative-ecosystem',
  'meta-creative-matrix',
  'meta-learning-loop',
  'meta-radical-diversity',
  'meta-sequence-learning',
  'meta-value-rules',
  'psychological-moat',
  'trust-blueprint',
  'value-perception-lever',
  'visual-priming'
];

let fixedCount = 0;
let errorCount = 0;

affectedLessons.forEach(lessonId => {
  const lessonPath = path.join(lessonsDir, lessonId, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    console.log(`⚠️ Skipping ${lessonId} - file not found`);
    return;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');

    // Check if already has the new components
    if (content.includes('StatCountdownSlide') && content.includes('case \'stat-countdown\'')) {
      console.log(`✓ ${lessonId} - already fixed`);
      return;
    }

    // Find the insertion point for components (after CardsSlide definition)
    const cardsSlideEnd = content.indexOf('const CardsSlide = ({ data }) => (');
    if (cardsSlideEnd === -1) {
      console.log(`⚠️ ${lessonId} - CardsSlide not found, skipping`);
      return;
    }

    // Find the end of CardsSlide component
    let braceCount = 0;
    let inComponent = false;
    let componentEndIndex = -1;

    for (let i = cardsSlideEnd; i < content.length; i++) {
      if (content[i] === '(' && content.substring(i-1, i+1) !== '\\(') {
        if (!inComponent) inComponent = true;
        braceCount++;
      } else if (content[i] === ')' && content.substring(i-1, i+1) !== '\\)') {
        braceCount--;
        if (inComponent && braceCount === 0) {
          // Find the closing semicolon
          const nextSemi = content.indexOf(';', i);
          componentEndIndex = nextSemi + 1;
          break;
        }
      }
    }

    if (componentEndIndex === -1) {
      console.log(`⚠️ ${lessonId} - Could not find CardsSlide end`);
      return;
    }

    // Insert component definitions after CardsSlide
    const beforeInsert = content.substring(0, componentEndIndex);
    const afterInsert = content.substring(componentEndIndex);

    // Only add components if they don't exist
    if (!content.includes('const StatCountdownSlide')) {
      content = beforeInsert + componentDefinitions + afterInsert;
    }

    // Find renderSlide and add case statements
    const renderSlideMatch = content.match(/const renderSlide = \(slide\) => \{[\s\S]*?switch \(slide\.type\) \{/);
    if (renderSlideMatch) {
      const switchIndex = content.indexOf(renderSlideMatch[0]) + renderSlideMatch[0].length;

      // Check which cases are missing
      const missingCases = [];
      const allCases = [
        'stat-countdown', 'before-after', 'highlight-box', 'strategy-steps',
        'comparison-cards', 'doom-loop', 'escape-plan', 'bigStatement',
        'actionSlide', 'trap-visual', 'math-breakdown', 'ratio-visual',
        'tool-integration', 'action-checklist', 'quote', 'quote-slide',
        'quote-spotlight', 'flywheel-visual', 'math-visual', 'requirements-visual',
        'founder-spotlight', 'velocity-metric', 'mindset-framework', 'angles',
        'formats', 'matrixVisualization', 'matrixBuilder', 'stats', 'roadmap',
        'triangle', 'flywheel', 'ratio-spectrum', 'math-comparison', 'opportunity-cost'
      ];

      allCases.forEach(caseType => {
        if (!content.includes(`case '${caseType}':`)) {
          missingCases.push(caseType);
        }
      });

      if (missingCases.length > 0) {
        // Build only missing case statements
        let newCases = '';
        missingCases.forEach(caseType => {
          const caseMatch = caseStatements.match(new RegExp(`case '${caseType}':.*?;`, 's'));
          if (caseMatch) {
            newCases += '\n          ' + caseMatch[0].trim();
          }
        });

        if (newCases) {
          content = content.substring(0, switchIndex) + newCases + content.substring(switchIndex);
        }
      }
    }

    fs.writeFileSync(lessonPath, content, 'utf8');
    console.log(`✅ Fixed ${lessonId}`);
    fixedCount++;

  } catch (error) {
    console.log(`❌ Error fixing ${lessonId}: ${error.message}`);
    errorCount++;
  }
});

console.log(`\n========================================`);
console.log(`Fixed: ${fixedCount} lessons`);
console.log(`Errors: ${errorCount} lessons`);
console.log(`========================================`);
