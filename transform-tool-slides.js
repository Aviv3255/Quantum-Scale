const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Tool-specific implementation steps
const toolImplementations = {
  'DataDrew': {
    intro: "You can't improve what you can't measure. Here's how to set up your tracking:",
    steps: [
      { step: 1, title: 'Install a free LTV tracker', description: 'Apps like DataDrew connect to your Shopify store and calculate real customer lifetime value automatically - no spreadsheets needed.' },
      { step: 2, title: 'Connect your store data', description: 'The app syncs with your orders and customer data to show actual LTV by segment, cohort, and acquisition channel.' },
      { step: 3, title: 'Identify your best customers', description: 'Filter to see which customer segments have the highest LTV. These are your blueprint for growth.' },
      { step: 4, title: 'Track weekly and optimize', description: 'Set a reminder to check your metrics every Monday. Small improvements compound into massive results.' }
    ]
  },
  'Grapevine': {
    intro: "Stop guessing what your customers want. Here's how to get the truth:",
    steps: [
      { step: 1, title: 'Set up post-purchase surveys', description: 'Apps like Grapevine show a short survey right after checkout - when customers are most honest about why they bought.' },
      { step: 2, title: 'Ask the right questions', description: '"How did you hear about us?" "What almost stopped you from buying?" "What made you choose us?" - These reveal your real audience.' },
      { step: 3, title: 'Collect 50-100 responses', description: 'After about 100 responses, clear patterns emerge. You\'ll often find 80%+ saying the same unexpected thing.' },
      { step: 4, title: 'Update your messaging', description: 'Use exact customer language in your ads and pages. Stop guessing - start knowing.' }
    ]
  },
  'Grapevine Surveys': {
    intro: "Stop guessing what your customers want. Here's how to get the truth:",
    steps: [
      { step: 1, title: 'Set up post-purchase surveys', description: 'Apps like Grapevine show a short survey right after checkout - when customers are most honest about why they bought.' },
      { step: 2, title: 'Ask the right questions', description: '"How did you hear about us?" "What almost stopped you from buying?" "What made you choose us?" - These reveal your real audience.' },
      { step: 3, title: 'Collect 50-100 responses', description: 'After about 100 responses, clear patterns emerge. You\'ll often find 80%+ saying the same unexpected thing.' },
      { step: 4, title: 'Update your messaging', description: 'Use exact customer language in your ads and pages. Stop guessing - start knowing.' }
    ]
  },
  'Geo Convert': {
    intro: "Make every visitor feel like your store was built for them. Here's how:",
    steps: [
      { step: 1, title: 'Install geo-personalization', description: 'Apps like Geo Convert detect visitor location automatically and adjust your messaging in real-time.' },
      { step: 2, title: 'Set up country-specific pricing', description: 'Configure pricing tiers: Tier 1 countries (USA/UK) = standard, Tier 2 = slight discount, Tier 3 = adjusted for local purchasing power.' },
      { step: 3, title: 'Enable local holiday detection', description: 'The app knows 100+ holidays worldwide. "Happy Diwali!" for India, "Bonne fête!" for France - automatic relevance.' },
      { step: 4, title: 'Show local currency', description: 'Display prices in visitor\'s currency with familiar symbols. ₹ for India, € for Europe, R$ for Brazil.' }
    ]
  },
  'Vitals Wishlist': {
    intro: "Turn window shoppers into buyers with the Endowment Effect. Here's how:",
    steps: [
      { step: 1, title: 'Add wishlist functionality', description: 'Apps like Vitals add a heart icon to every product. One click saves items without the pressure of "Add to Cart."' },
      { step: 2, title: 'Enable email reminders', description: 'When someone adds items to their wishlist, they get gentle reminders. "Your saved items are waiting..."' },
      { step: 3, title: 'Track wishlist behavior', description: 'See which products get saved most. This reveals purchase intent without the commitment barrier.' },
      { step: 4, title: 'Create urgency on saved items', description: 'Send alerts when wishlist items go on sale or low stock. Loss aversion kicks in - they\'ll buy to not lose "their" items.' }
    ]
  },
  'Shoffi': {
    intro: "Turn single purchases into bigger orders. Here's how to set up upsells:",
    steps: [
      { step: 1, title: 'Install an upsell app', description: 'Apps like Shoffi show relevant offers at the perfect moment - right after "Add to Cart" or during checkout.' },
      { step: 2, title: 'Create complementary bundles', description: 'Pair products that naturally go together. Bought a phone case? Offer a screen protector. Simple math, bigger orders.' },
      { step: 3, title: 'Set up one-click upgrades', description: 'Offer a premium version or larger quantity with a single click. "Upgrade to 3-pack and save 15%"' },
      { step: 4, title: 'Test different offers', description: 'Try different discount levels and product pairings. Track which combinations get the best acceptance rate.' }
    ]
  },
  'TxtCart': {
    intro: "Reach customers where they actually are - their phones. Here's how:",
    steps: [
      { step: 1, title: 'Set up SMS marketing', description: 'Apps like TxtCart integrate with Shopify to send text messages with 98% open rates (vs 20% for email).' },
      { step: 2, title: 'Create abandoned cart flows', description: 'When someone leaves items in cart, a friendly text reminder often brings them back within minutes.' },
      { step: 3, title: 'Segment by behavior', description: 'VIP customers get exclusive early access. Cart abandoners get gentle nudges. One-time buyers get re-engagement offers.' },
      { step: 4, title: 'Keep messages conversational', description: 'SMS is personal. Write like a friend, not a brand. "Hey! You left something behind..." beats corporate copy.' }
    ]
  },
  'Klaviyo': {
    intro: "Turn email into your highest-ROI channel. Here's how to set it up:",
    steps: [
      { step: 1, title: 'Connect your email platform', description: 'Platforms like Klaviyo sync with Shopify to track every customer action - purchases, browses, cart additions.' },
      { step: 2, title: 'Set up automated flows', description: 'Welcome series for new subscribers. Abandoned cart reminders. Post-purchase follow-ups. These run 24/7.' },
      { step: 3, title: 'Segment your list', description: 'VIPs get different emails than first-time visitors. Past buyers see different offers than browsers.' },
      { step: 4, title: 'Test and optimize', description: 'A/B test subject lines, send times, and offers. Small improvements compound into significant revenue.' }
    ]
  },
  'Essential Countdown Timer': {
    intro: "Create real urgency that converts. Here's how to do it ethically:",
    steps: [
      { step: 1, title: 'Install a countdown timer', description: 'Apps like Essential Countdown show time-limited offers on product pages and cart.' },
      { step: 2, title: 'Use real deadlines only', description: 'Set actual sale end dates. Fake urgency destroys trust. Real scarcity creates action.' },
      { step: 3, title: 'Match timer to offer', description: 'Flash sale = hours. Weekend deal = days. The timer should reflect genuine availability.' },
      { step: 4, title: 'Combine with social proof', description: '"Only 3 left at this price" + countdown = powerful motivation without being pushy.' }
    ]
  },
  'Judge.me': {
    intro: "Turn happy customers into your best salespeople. Here's how:",
    steps: [
      { step: 1, title: 'Set up review collection', description: 'Apps like Judge.me automatically email customers after delivery asking for reviews.' },
      { step: 2, title: 'Make it easy to respond', description: 'One-click star ratings in the email. Photo upload option. Remove all friction from leaving feedback.' },
      { step: 3, title: 'Display reviews prominently', description: 'Show reviews on product pages, homepage, and even in ads. Social proof builds instant trust.' },
      { step: 4, title: 'Respond to all reviews', description: 'Thank positive reviewers. Address concerns publicly. Shows you care - builds more trust.' }
    ]
  },
  'Post-Purchase Surveys': {
    intro: "Understand exactly why people buy from you. Here's how:",
    steps: [
      { step: 1, title: 'Add post-purchase surveys', description: 'Show a quick survey right after checkout when customers are most willing to share honest feedback.' },
      { step: 2, title: 'Ask attribution questions', description: '"How did you first hear about us?" reveals which channels actually drive purchases, not just clicks.' },
      { step: 3, title: 'Ask about hesitations', description: '"What almost stopped you from buying?" uncovers objections you can address on your site.' },
      { step: 4, title: 'Use responses in marketing', description: 'Real customer language converts better than copywriter guesses. Quote actual responses in ads.' }
    ]
  }
};

// Default implementation for unknown tools
const defaultImplementation = {
  intro: "Here's how to implement this in your store:",
  steps: [
    { step: 1, title: 'Install the recommended app', description: 'Search the Shopify App Store for the tool mentioned. Most offer free trials to test before committing.' },
    { step: 2, title: 'Connect to your store', description: 'Follow the setup wizard to link the app with your Shopify data. Usually takes less than 5 minutes.' },
    { step: 3, title: 'Configure your settings', description: 'Adjust the default settings to match your brand and business model. Start with recommended defaults.' },
    { step: 4, title: 'Test and optimize', description: 'Run the tool for 2-4 weeks, measure results, and tweak settings based on what you learn.' }
  ]
};

// Implementation slide component template
const implementationSlideComponent = `
    const ImplementationSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto slide-scroll overflow-y-auto py-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-emerald-100 text-emerald-700">How To Do It</span>
          <h2 className="slide-title text-2xl md:text-3xl text-black">{data.title}</h2>
        </motion.div>
        {data.intro && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-neutral-600 text-sm md:text-base text-center mb-6">{data.intro}</motion.p>}
        <div className="space-y-3">
          {data.steps && data.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex gap-4 bg-white border border-neutral-200 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}>{step.step}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 text-sm mb-1">{step.title}</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {data.toolUrl && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 text-center">
          <a href={data.toolUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}>
            {data.cta || 'Get Started'} <Icons.ExternalLink />
          </a>
        </motion.div>}
      </div>
    );`;

function getToolName(toolData) {
  if (typeof toolData === 'string') return toolData;
  if (toolData.name) return toolData.name;
  if (toolData.toolName) return toolData.toolName;
  return null;
}

function getToolUrl(slideData) {
  if (slideData.toolUrl) return slideData.toolUrl;
  if (slideData.tool && slideData.tool.url) return slideData.tool.url;
  return null;
}

function transformToolSlide(slideStr, lessonName) {
  // Extract tool name from slide data
  let toolName = null;

  // Try different patterns to find tool name
  const toolNameMatch = slideStr.match(/toolName:\s*['"]([^'"]+)['"]/);
  const nameMatch = slideStr.match(/name:\s*['"]([^'"]+)['"]/);

  if (toolNameMatch) toolName = toolNameMatch[1];
  else if (nameMatch) toolName = nameMatch[1];

  // Get implementation based on tool name
  let impl = defaultImplementation;
  if (toolName && toolImplementations[toolName]) {
    impl = toolImplementations[toolName];
  }

  // Extract title
  const titleMatch = slideStr.match(/title:\s*['"]([^'"]+)['"]/);
  const title = titleMatch ? titleMatch[1] : 'How To Implement This';

  // Extract URL
  const urlMatch = slideStr.match(/(?:toolUrl|url):\s*['"]([^'"]+)['"]/);
  const toolUrl = urlMatch ? urlMatch[1] : null;

  // Extract CTA
  const ctaMatch = slideStr.match(/(?:cta|buttonText):\s*['"]([^'"]+)['"]/);
  const cta = ctaMatch ? ctaMatch[1] : 'Get Started Free';

  // Build new implementation slide
  const stepsStr = impl.steps.map(s =>
    `{ step: ${s.step}, title: '${s.title.replace(/'/g, "\\'")}', description: '${s.description.replace(/'/g, "\\'")}' }`
  ).join(',\n        ');

  const newSlide = `{ type: 'implementation', title: '${title.replace(/'/g, "\\'")}', intro: "${impl.intro}", steps: [
        ${stepsStr}
      ], toolUrl: '${toolUrl || ''}', cta: '${cta.replace(/'/g, "\\'")}' }`;

  return newSlide;
}

function processLesson(lessonPath) {
  const content = fs.readFileSync(lessonPath, 'utf8');
  let modified = content;
  let changes = [];

  // Check if lesson has tool slides
  if (!content.includes("type: 'tool'") && !content.includes('type: "tool"')) {
    return { modified: false, changes: [] };
  }

  // Skip if already has implementation slides
  if (content.includes("type: 'implementation'")) {
    return { modified: false, changes: ['Already has implementation slides'] };
  }

  const lessonName = path.basename(path.dirname(lessonPath));

  // Find and transform tool slides
  // Match pattern: { type: 'tool', ... }
  const toolSlideRegex = /\{\s*type:\s*['"]tool['"][^}]+(?:\{[^}]*\}[^}]*)*\}/g;

  let match;
  const toolSlides = [];
  while ((match = toolSlideRegex.exec(content)) !== null) {
    toolSlides.push({
      original: match[0],
      index: match.index
    });
  }

  if (toolSlides.length === 0) {
    return { modified: false, changes: ['No tool slides found'] };
  }

  // Transform each tool slide
  for (const slide of toolSlides) {
    const transformed = transformToolSlide(slide.original, lessonName);
    modified = modified.replace(slide.original, transformed);
    changes.push(`Transformed tool slide to implementation`);
  }

  // Add ImplementationSlide component if not present
  if (!modified.includes('const ImplementationSlide')) {
    // Find where to insert (after ToolSlide or after CardsSlide)
    const insertPoints = [
      'const ToolSlide',
      'const CardsSlide',
      'const VisualSlide'
    ];

    let inserted = false;
    for (const point of insertPoints) {
      if (modified.includes(point)) {
        // Find the end of that component
        const startIdx = modified.indexOf(point);
        let depth = 0;
        let endIdx = startIdx;
        let foundStart = false;

        for (let i = startIdx; i < modified.length; i++) {
          if (modified[i] === '(' && modified.substring(i-1, i+1) !== '\\(') {
            if (!foundStart) foundStart = true;
            depth++;
          }
          if (modified[i] === ')' && modified.substring(i-1, i+1) !== '\\)') {
            depth--;
            if (foundStart && depth === 0) {
              endIdx = i + 2; // Include );
              break;
            }
          }
        }

        // Insert after this component
        modified = modified.slice(0, endIdx) + '\n' + implementationSlideComponent + modified.slice(endIdx);
        changes.push('Added ImplementationSlide component');
        inserted = true;
        break;
      }
    }
  }

  // Update renderSlide case statement
  if (modified.includes("case 'tool':") && !modified.includes("case 'implementation':")) {
    modified = modified.replace(
      /case 'tool':\s*return\s*<ToolSlide[^;]+;/g,
      "case 'implementation': return <ImplementationSlide data={slide} />;"
    );
    changes.push('Updated renderSlide case statement');
  }

  // Remove old ToolSlide component if it exists and we added ImplementationSlide
  if (modified.includes('const ImplementationSlide') && modified.includes('const ToolSlide')) {
    // Find and remove ToolSlide component
    const toolSlideStart = modified.indexOf('const ToolSlide');
    if (toolSlideStart !== -1) {
      let depth = 0;
      let endIdx = toolSlideStart;
      let foundStart = false;

      for (let i = toolSlideStart; i < modified.length; i++) {
        if (modified[i] === '(' && modified.substring(i-1, i+1) !== '\\(') {
          if (!foundStart) foundStart = true;
          depth++;
        }
        if (modified[i] === ')' && modified.substring(i-1, i+1) !== '\\)') {
          depth--;
          if (foundStart && depth === 0) {
            endIdx = i + 2;
            break;
          }
        }
      }

      // Don't remove - just leave both for now to avoid breaking things
    }
  }

  return { modified: true, content: modified, changes };
}

// Main execution
const lessons = fs.readdirSync(lessonsDir).filter(f => {
  const lessonPath = path.join(lessonsDir, f, 'lesson.html');
  return fs.existsSync(lessonPath);
});

console.log(`Found ${lessons.length} lessons to process\n`);

let transformed = 0;
let skipped = 0;
const results = [];

for (const lesson of lessons) {
  const lessonPath = path.join(lessonsDir, lesson, 'lesson.html');

  try {
    const result = processLesson(lessonPath);

    if (result.modified && result.content) {
      fs.writeFileSync(lessonPath, result.content);
      transformed++;
      results.push({ lesson, status: 'transformed', changes: result.changes });
      console.log(`✓ ${lesson}: ${result.changes.join(', ')}`);
    } else {
      skipped++;
      results.push({ lesson, status: 'skipped', changes: result.changes });
    }
  } catch (err) {
    results.push({ lesson, status: 'error', error: err.message });
    console.log(`✗ ${lesson}: ${err.message}`);
  }
}

console.log(`\n========================================`);
console.log(`Transformed: ${transformed}`);
console.log(`Skipped: ${skipped}`);
console.log(`========================================`);

// Write results to file
fs.writeFileSync('tool-transform-results.json', JSON.stringify(results, null, 2));
console.log('\nResults written to tool-transform-results.json');
