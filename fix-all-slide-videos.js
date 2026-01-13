const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Fixing character video support in ${folders.length} lessons...\n`);

let totalFixed = 0;
let detailedLog = [];

// Updated video rendering code with bigger size and from-bottom animation
const videoRenderCode = `
        {data.characterVideo && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={\`absolute bottom-0 \${data.characterPosition === 'left' ? 'left-6' : 'right-6'} z-0 pointer-events-none\`}
            style={{ height: '35%', maxHeight: '280px' }}>
            <video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">
              <source src={data.characterVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}`;

// Old video code patterns to replace
const oldVideoPatterns = [
  // Pattern 1: Old smaller size with marginBottom
  /\{data\.characterVideo && \(\s*<motion\.div\s*initial=\{\{ opacity: 0, y: 20 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: 0\.4, duration: 0\.5 \}\}\s*className=\{`absolute bottom-0 \$\{data\.characterPosition === 'left' \? 'left-4' : 'right-4'\} z-0 pointer-events-none`\}\s*style=\{\{ height: '25%', maxHeight: '180px', marginBottom: '3%' \}\}>\s*<video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">\s*<source src=\{data\.characterVideo\} type="video\/mp4" \/>\s*<\/video>\s*<\/motion\.div>\s*\)\}/g,
  // Pattern 2: Slightly different formatting
  /\{data\.characterVideo && \(\s*<motion\.div\s*initial=\{\{ opacity: 0, y: 20 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: 0\.4, duration: 0\.5 \}\}\s*className=\{\`absolute bottom-0 \$\{data\.characterPosition === 'left' \? 'left-4' : 'right-4'\} z-0 pointer-events-none\`\}\s*style=\{\{ height: '25%', maxHeight: '180px' \}\}>\s*<video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">\s*<source src=\{data\.characterVideo\} type="video\/mp4" \/>\s*<\/video>\s*<\/motion\.div>\s*\)\}/g,
];

// Add relative positioning to slide components
function addRelativeToSlide(content, slideName) {
  const patterns = [
    {
      old: `const ${slideName} = ({ data }) => (\n      <div className="h-full flex`,
      new: `const ${slideName} = ({ data }) => (\n      <div className="h-full relative flex`
    },
    {
      old: `const ${slideName} = ({ data }) => (\n      <div className="h-full overflow-y-auto flex`,
      new: `const ${slideName} = ({ data }) => (\n      <div className="h-full relative overflow-y-auto flex`
    },
  ];

  let modified = false;
  for (const pattern of patterns) {
    if (content.includes(pattern.old) && !content.includes(pattern.new)) {
      content = content.replace(pattern.old, pattern.new);
      modified = true;
      break;
    }
  }
  return { content, modified };
}

// Update old video styles to new bigger styles
function updateVideoStyles(content) {
  let modified = false;

  // Update y: 20 to y: 40
  if (content.includes('y: 20 }}\n            animate=') && content.includes('characterVideo')) {
    content = content.replace(/initial=\{\{ opacity: 0, y: 20 \}\}/g, 'initial={{ opacity: 0, y: 40 }}');
    modified = true;
  }

  // Update duration: 0.5 to duration: 0.6
  if (content.includes('duration: 0.5 }}') && content.includes('characterVideo')) {
    content = content.replace(/transition=\{\{ delay: 0\.4, duration: 0\.5 \}\}/g, 'transition={{ delay: 0.4, duration: 0.6 }}');
    modified = true;
  }

  // Update height: '25%' to height: '35%'
  if (content.includes("height: '25%'") && content.includes('characterVideo')) {
    content = content.replace(/height: '25%'/g, "height: '35%'");
    modified = true;
  }

  // Update maxHeight: '180px' to maxHeight: '280px'
  if (content.includes("maxHeight: '180px'") && content.includes('characterVideo')) {
    content = content.replace(/maxHeight: '180px'/g, "maxHeight: '280px'");
    modified = true;
  }

  // Remove marginBottom: '3%'
  if (content.includes("marginBottom: '3%'") && content.includes('characterVideo')) {
    content = content.replace(/, marginBottom: '3%'/g, '');
    modified = true;
  }

  // Update left-4/right-4 to left-6/right-6
  if (content.includes("'left-4' : 'right-4'") && content.includes('characterVideo')) {
    content = content.replace(/'left-4' : 'right-4'/g, "'left-6' : 'right-6'");
    modified = true;
  }

  return { content, modified };
}

// Add video rendering to a slide component if not present
function addVideoRenderingToSlide(content, slideName, endPattern) {
  // Find the slide component
  const slideStart = content.indexOf(`const ${slideName}`);
  if (slideStart === -1) return { content, modified: false };

  // Find where this component ends (next const or end of script)
  const nextConst = content.indexOf('\n    const ', slideStart + 10);
  const slideEnd = nextConst !== -1 ? nextConst : content.length;

  const slideSection = content.substring(slideStart, slideEnd);

  // Check if it already has characterVideo rendering
  if (slideSection.includes('data.characterVideo')) {
    return { content, modified: false };
  }

  // Find the closing pattern: </div>\n    );\n\n    const NextComponent
  // We need to insert video code before the final </div>

  // Look for pattern: multiple closing divs followed by );
  const closingMatch = slideSection.match(/(\s*<\/div>\s*<\/div>\s*\);\s*)$/);
  if (!closingMatch) {
    // Try simpler pattern with single closing div
    const simpleMatch = slideSection.match(/(\s*<\/div>\s*\);\s*)$/);
    if (!simpleMatch) return { content, modified: false };

    // Insert before the closing </div>
    const insertPoint = slideSection.lastIndexOf('</div>');
    if (insertPoint === -1) return { content, modified: false };

    const newSlideSection = slideSection.substring(0, insertPoint) + videoRenderCode + '\n      ' + slideSection.substring(insertPoint);
    const newContent = content.substring(0, slideStart) + newSlideSection + content.substring(slideEnd);
    return { content: newContent, modified: true };
  }

  // Insert before the closing divs
  const insertPoint = slideSection.lastIndexOf('</div>\n      </div>');
  if (insertPoint === -1) return { content, modified: false };

  const newSlideSection = slideSection.substring(0, insertPoint) + videoRenderCode + '\n        ' + slideSection.substring(insertPoint);
  const newContent = content.substring(0, slideStart) + newSlideSection + content.substring(slideEnd);
  return { content: newContent, modified: true };
}

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Only fix lessons that have characterVideo data
  if (!content.includes('characterVideo:')) continue;

  let modified = false;
  let fixes = [];

  // Fix relative positioning for all slide types
  const slideTypes = ['ContentSlide', 'ExampleSlide', 'CardsSlide', 'CtaSlide', 'HookSlide'];
  for (const slideType of slideTypes) {
    let result = addRelativeToSlide(content, slideType);
    if (result.modified) {
      content = result.content;
      modified = true;
      fixes.push(`${slideType} relative`);
    }
  }

  // Update video styles to new bigger size
  let styleResult = updateVideoStyles(content);
  if (styleResult.modified) {
    content = styleResult.content;
    modified = true;
    fixes.push('video styles updated');
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    totalFixed++;
    detailedLog.push(`${folder}: ${fixes.join(', ')}`);
  }
}

console.log(`Fixed ${totalFixed} lessons:\n`);
detailedLog.forEach(log => console.log(`  ${log}`));
