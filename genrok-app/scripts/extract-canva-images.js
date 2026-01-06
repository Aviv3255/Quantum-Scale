/**
 * Canva Image Extraction Script (Screenshot-based)
 *
 * This script extracts cover and hover images from Canva templates using screenshots.
 * Screenshots work better than image URLs for templates with multiple elements.
 *
 * Run with: node scripts/extract-canva-images.js
 *
 * Prerequisites:
 * - npm install playwright
 * - npx playwright install chromium
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public/images/meta-templates');
const DATA_FILE = path.join(__dirname, '../src/data/meta-ad-templates.ts');
const BATCH_SIZE = 5; // Save progress every N templates
const DELAY_BETWEEN_TEMPLATES = 1500; // 1.5 seconds between each template

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log('Created output directory:', OUTPUT_DIR);
}

// Extract images from a single Canva template using screenshots
async function extractTemplateImages(page, template) {
  const { id, designId, shareToken } = template;
  const paddedId = String(id).padStart(3, '0');
  console.log(`\n[${id}] Processing: ${template.name}`);

  try {
    // Navigate to the view page
    const viewUrl = `https://www.canva.com/design/${designId}/${shareToken}/view`;
    console.log(`[${id}] Navigating to:`, viewUrl);

    await page.goto(viewUrl, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500); // Wait for content to render

    // Wait for main slide content
    const mainContent = page.getByRole('main', { name: 'Slide content' });
    await mainContent.waitFor({ state: 'visible', timeout: 15000 });

    // Take screenshot of slide 1 (cover)
    const coverFilename = `template-${paddedId}-cover.png`;
    const coverPath = path.join(OUTPUT_DIR, coverFilename);
    await mainContent.screenshot({ path: coverPath, type: 'png' });
    console.log(`[${id}] Saved cover image:`, coverFilename);

    let hoverFilename = null;

    // Check if there's a second slide by looking for page indicator
    const pageText = await page.locator('text=/\\d+\\s*\\/\\s*\\d+/').first().textContent().catch(() => null);
    const hasMultiplePages = pageText && pageText.includes('/') && !pageText.includes('1 / 1');

    if (hasMultiplePages) {
      // Click next page button
      const nextButton = page.getByRole('button', { name: 'Next page' });
      const isEnabled = await nextButton.isEnabled().catch(() => false);

      if (isEnabled) {
        await nextButton.click();
        await page.waitForTimeout(2000); // Wait for slide transition

        // Take screenshot of slide 2 (hover/editable)
        hoverFilename = `template-${paddedId}-hover.png`;
        const hoverPath = path.join(OUTPUT_DIR, hoverFilename);
        await mainContent.screenshot({ path: hoverPath, type: 'png' });
        console.log(`[${id}] Saved hover image:`, hoverFilename);
      }
    } else {
      console.log(`[${id}] Single page template - no hover image`);
    }

    return {
      coverImage: `/images/meta-templates/${coverFilename}`,
      hoverImage: hoverFilename ? `/images/meta-templates/${hoverFilename}` : null
    };

  } catch (error) {
    console.error(`[${id}] ERROR:`, error.message);
    return { coverImage: null, hoverImage: null };
  }
}

// Update the data file with image URLs
function updateDataFile(templates) {
  const coverCount = templates.filter(t => t.coverImage).length;
  const hoverCount = templates.filter(t => t.hoverImage).length;

  const fileContent = `// Auto-generated from XLS import - ${new Date().toISOString()}
// Total templates: ${templates.length}
// Cover images: ${coverCount}
// Hover images: ${hoverCount}

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

  fs.writeFileSync(DATA_FILE, fileContent);
  console.log('\nUpdated data file:', DATA_FILE);
}

// Main extraction function
async function main() {
  console.log('='.repeat(60));
  console.log('Canva Image Extraction Script (Screenshot-based)');
  console.log('='.repeat(60));

  // Read current data file
  const dataContent = fs.readFileSync(DATA_FILE, 'utf-8');
  const templatesMatch = dataContent.match(/export const metaAdTemplates[^=]*=\s*(\[[\s\S]*\]);/);

  if (!templatesMatch) {
    console.error('Could not parse data file');
    return;
  }

  let templates;
  try {
    templates = eval(templatesMatch[1]);
  } catch (e) {
    console.error('Error parsing templates:', e.message);
    return;
  }

  console.log(`Found ${templates.length} templates`);

  // Filter templates that need processing
  // Process if: no cover image OR no hover image (for templates that should have one)
  const toProcess = templates.filter(t => !t.coverImage || !t.hoverImage);
  console.log(`Templates needing processing: ${toProcess.length}`);

  if (toProcess.length === 0) {
    console.log('All templates already have images!');
    return;
  }

  // Launch browser
  console.log('\nLaunching browser...');
  const browser = await chromium.launch({
    headless: true, // Set to false to see the browser
  });

  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Process templates
  let processed = 0;
  let successful = 0;

  for (const template of toProcess) {
    const result = await extractTemplateImages(page, template);

    // Update template with image paths
    const templateIndex = templates.findIndex(t => t.id === template.id);
    if (templateIndex !== -1) {
      if (result.coverImage) {
        templates[templateIndex].coverImage = result.coverImage;
      }
      if (result.hoverImage) {
        templates[templateIndex].hoverImage = result.hoverImage;
      }
    }

    if (result.coverImage) {
      successful++;
    }

    processed++;
    console.log(`Progress: ${processed}/${toProcess.length} (${successful} successful)`);

    // Save progress every BATCH_SIZE templates
    if (processed % BATCH_SIZE === 0) {
      updateDataFile(templates);
      console.log('Progress saved!');
    }

    // Delay between templates to avoid rate limiting
    if (processed < toProcess.length) {
      await page.waitForTimeout(DELAY_BETWEEN_TEMPLATES);
    }
  }

  // Final save
  updateDataFile(templates);

  // Cleanup
  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('Extraction Complete!');
  console.log(`Processed: ${processed} templates`);
  console.log(`Successful: ${successful} templates`);
  console.log(`Failed: ${processed - successful} templates`);
  console.log('='.repeat(60));
}

// Run the script
main().catch(console.error);
