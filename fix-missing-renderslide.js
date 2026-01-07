const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Lessons missing renderSlide function
const brokenLessons = [
  'biz-affiliate-ltv-hack',
  'biz-hidden-cac-costs',
  'biz-infinite-money-glitch',
  'biz-subscribe-save-ltv',
  'fomo-engineering',
  'framing-effect-mastery',
  'hermes-doctrine',
  'identity-marketing',
  'le-creuset-scarcity-engine',
  'missing-piece-effect',
  'psychological-moat',
  'radical-honesty-play',
  'thirty-five-thousand-decisions',
  'three-cro-tests',
  'trust-blueprint',
  'value-perception-lever',
  'visual-priming',
  'visual-shorthand'
];

console.log(`Fixing ${brokenLessons.length} lessons with missing renderSlide function...\n`);

let fixed = 0;

for (const folder of brokenLessons) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) {
    console.log(`  ✗ ${folder} - file not found`);
    continue;
  }

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Skip if already has renderSlide
  if (content.includes('const renderSlide')) {
    console.log(`  ○ ${folder} - already has renderSlide`);
    continue;
  }

  // Extract slide types from the slides array
  const slideTypesMatch = content.match(/type:\s*['"]([^'"]+)['"]/g);
  const slideTypes = [...new Set(slideTypesMatch?.map(m => m.match(/['"]([^'"]+)['"]/)[1]) || [])];

  // Build renderSlide cases based on slide types used
  const cases = [];

  const caseTemplates = {
    'welcome': "case 'welcome': return <WelcomeSlide data={slide} onStart={() => setCurrentSlide(1)} userName={userName} onShowGif={showGif} onHideGif={hideGif} />;",
    'hook': "case 'hook': return <HookSlide data={slide} />;",
    'content': "case 'content': return <ContentSlide data={slide} />;",
    'cards': "case 'cards': return <CardsSlide data={slide} />;",
    'visual': "case 'visual': return <VisualSlide data={slide} />;",
    'example': "case 'example': return <ExampleSlide data={slide} />;",
    'quiz': "case 'quiz': return <QuizSlide data={slide} onShowGif={showGif} onHideGif={hideGif} />;",
    'completion': "case 'completion': return <CompletionSlide />;",
    'stat-countdown': "case 'stat-countdown': return <StatCountdownSlide data={slide} />;",
    'before-after': "case 'before-after': return <BeforeAfterSlide data={slide} />;",
    'highlight-box': "case 'highlight-box': return <HighlightBoxSlide data={slide} />;",
    'flywheel-visual': "case 'flywheel-visual': return <FlywheelVisualSlide data={slide} />;",
    'math-visual': "case 'math-visual': return <MathVisualSlide data={slide} />;",
    'requirements-visual': "case 'requirements-visual': return <RequirementsVisualSlide data={slide} />;",
    'tool-integration': "case 'tool-integration': return <ToolIntegrationSlide data={slide} />;",
    'process-flow': "case 'process-flow': return <ProcessFlowSlide data={slide} />;",
    'funnel-visual': "case 'funnel-visual': return <FunnelVisualSlide data={slide} />;",
    'cta': "case 'cta': return <CtaSlide data={slide} />;",
    'feature-grid': "case 'feature-grid': return <FeatureGridSlide data={slide} />;",
    'comparison': "case 'comparison': return <ComparisonSlide data={slide} />;",
    'timeline': "case 'timeline': return <TimelineSlide data={slide} />;",
    'checklist': "case 'checklist': return <ChecklistSlide data={slide} />;",
    'split-view': "case 'split-view': return <SplitViewSlide data={slide} />;",
    'metric-grid': "case 'metric-grid': return <MetricGridSlide data={slide} />;",
    'quote': "case 'quote': return <QuoteSlide data={slide} />;",
    'scenario': "case 'scenario': return <ScenarioSlide data={slide} />;"
  };

  for (const type of slideTypes) {
    if (caseTemplates[type]) {
      cases.push(`          ${caseTemplates[type]}`);
    }
  }

  if (cases.length === 0) {
    console.log(`  ✗ ${folder} - no slide types found`);
    continue;
  }

  // Generate the renderSlide function
  const renderSlideFunc = `
      const renderSlide = (slide, props) => {
        const { onShowGif, onHideGif, userName } = props || {};
        switch (slide.type) {
${cases.join('\n')}
          default: return <div className="h-full flex items-center justify-center text-red-500">Unknown slide type: {slide.type}</div>;
        }
      };

`;

  // Find where to insert - before "const showPrev"
  const showPrevMatch = content.match(/(\s+)(const showPrev\s*=)/);
  if (!showPrevMatch) {
    console.log(`  ✗ ${folder} - could not find insertion point (const showPrev)`);
    continue;
  }

  // Insert renderSlide before const showPrev
  content = content.replace(
    /(const showPrev\s*=)/,
    `${renderSlideFunc}$1`
  );

  fs.writeFileSync(lessonPath, content);
  fixed++;
  console.log(`  ✓ ${folder} - fixed (${slideTypes.length} slide types)`);
}

console.log(`\nFixed ${fixed}/${brokenLessons.length} lessons`);
