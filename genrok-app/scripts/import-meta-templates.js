const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const xlsPath = process.argv[2] || 'C:/Users/aviv3/Downloads/גיליון לMeta Ad Templates Trackerלא שם.xlsx';

console.log('Reading XLS file:', xlsPath);

const workbook = XLSX.readFile(xlsPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

console.log('Found', data.length, 'rows in sheet:', sheetName);

// Process and clean the data
const templates = data.map((row, index) => {
  const canvaLink = row['Canva Template Link'] || '';
  // Clean the link (remove trailing quote if present)
  const cleanLink = canvaLink.replace(/['"]$/, '');

  // Extract design ID from URL
  const match = cleanLink.match(/design\/([^\/]+)\/([^\/]+)/);
  const designId = match ? match[1] : '';
  const shareToken = match ? match[2] : '';

  return {
    id: index + 1,
    name: row['Template Name'] || `Meta Ad Template ${index + 1}`,
    canvaLink: cleanLink,
    designId: designId,
    shareToken: shareToken,
    coverImage: null,
    hoverImage: null
  };
}).filter(t => t.designId);

console.log('Processed', templates.length, 'valid templates');
console.log('Sample:', JSON.stringify(templates[0], null, 2));

// Save to data file
const outputPath = path.join(__dirname, '../src/data/meta-ad-templates.ts');

const fileContent = `// Auto-generated from XLS import - ${new Date().toISOString()}
// Total templates: ${templates.length}

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

fs.writeFileSync(outputPath, fileContent);
console.log('Saved to:', outputPath);
