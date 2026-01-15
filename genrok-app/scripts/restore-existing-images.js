const fs = require('fs');
const path = require('path');

// Read the current data file
const dataPath = path.join(__dirname, '../src/data/meta-ad-templates.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Extract the array part
const arrayMatch = content.match(/export const metaAdTemplates: MetaAdTemplate\[\] = (\[[\s\S]*\]);/);
if (!arrayMatch) {
  console.error('Could not find templates array');
  process.exit(1);
}

const templates = JSON.parse(arrayMatch[1]);
console.log(`Found ${templates.length} templates`);

// Check for existing images
const imagesDir = path.join(__dirname, '../public/images/meta-templates');
let restored = 0;

templates.forEach((template) => {
  const id = String(template.id).padStart(3, '0');
  const coverPath = path.join(imagesDir, `template-${id}-cover.png`);
  const hoverPath = path.join(imagesDir, `template-${id}-hover.png`);

  if (fs.existsSync(coverPath)) {
    template.coverImage = `/images/meta-templates/template-${id}-cover.png`;
    restored++;
  }

  if (fs.existsSync(hoverPath)) {
    template.hoverImage = `/images/meta-templates/template-${id}-hover.png`;
  }
});

console.log(`Restored ${restored} cover images`);

// Write back
const newContent = `// Auto-generated from XLS import - ${new Date().toISOString()}
// Total templates: ${templates.length}
// Images restored: ${restored}

export interface MetaAdTemplate {
  id: number;
  name: string;
  canvaLink: string;
  designId: string;
  shareToken: string;
  coverImage: string | null;
  hoverImage: string | null;
}

export const metaAdTemplates: MetaAdTemplate[] = ${JSON.stringify(templates, null, 2)};
`;

fs.writeFileSync(dataPath, newContent);
console.log('Data file updated!');

// Show which templates need images
const needsCover = templates.filter(t => !t.coverImage).map(t => t.id);
console.log(`\nTemplates needing cover images (${needsCover.length}):`, needsCover);
