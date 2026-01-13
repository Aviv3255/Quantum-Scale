/**
 * Canva Image Extraction Script
 *
 * This script extracts cover and hover images from Canva templates.
 * Run with: node scripts/extract-canva-images.js
 *
 * Prerequisites:
 * - npm install playwright
 * - npx playwright install chromium
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public/images/meta-templates');
const DATA_FILE = path.join(__dirname, '../src/data/meta-ad-templates.ts');
const BATCH_SIZE = 5; // Process 5 templates at a time
const DELAY_BETWEEN_TEMPLATES = 2000; // 2 seconds between each template

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log('Created output directory:', OUTPUT_DIR);
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Extract images from a single Canva template
async function extractTemplateImages(page, template) {
  const { id, designId, shareToken } = template;
  console.log(`\n[${id}] Processing: ${template.name}`);

  try {
    // Navigate to the view page (not preview mode)
    const viewUrl = `https://www.canva.com/design/${designId}/${shareToken}/view`;
    console.log(`[${id}] Navigating to:`, viewUrl);

    await page.goto(viewUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // Wait for images to load

    // Extract cover image (slide 1)
    const coverImageUrl = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      for (const img of imgs) {
        if (img.src.includes('media.canva.com') && img.width > 400) {
          return img.src;
        }
      }
      return null;
    });

    if (!coverImageUrl) {
      console.log(`[${id}] WARNING: Could not find cover image`);
      return { coverImage: null, hoverImage: null };
    }

    console.log(`[${id}] Found cover image`);

    // Download cover image
    const coverFilename = `template-${String(id).padStart(3, '0')}-cover.png`;
    const coverPath = path.join(OUTPUT_DIR, coverFilename);
    await downloadImage(coverImageUrl, coverPath);
    console.log(`[${id}] Saved cover image:`, coverFilename);

    // Check if there's a second slide
    const hasSecondSlide = await page.evaluate(() => {
      const pageInfo = document.body.innerText;
      return pageInfo.includes('1 / 2') || pageInfo.includes('1/2');
    });

    let hoverImageUrl = null;

    if (hasSecondSlide) {
      // Click next to go to slide 2
      const nextButton = await page.$('button[aria-label="Next page"], button:has-text("Next")');
      if (nextButton) {
        await nextButton.click();
        await page.waitForTimeout(2000); // Wait for slide transition

        // Extract hover image (slide 2)
        hoverImageUrl = await page.evaluate(() => {
          const imgs = document.querySelectorAll('img');
          for (const img of imgs) {
            if (img.src.includes('media.canva.com') && img.width > 400) {
              return img.src;
            }
          }
          return null;
        });

        if (hoverImageUrl) {
          const hoverFilename = `template-${String(id).padStart(3, '0')}-hover.png`;
          const hoverPath = path.join(OUTPUT_DIR, hoverFilename);
          await downloadImage(hoverImageUrl, hoverPath);
          console.log(`[${id}] Saved hover image:`, hoverFilename);
        }
      }
    }

    // Close any popups
    const closeButton = await page.$('button[aria-label="Close"]');
    if (closeButton) {
      await closeButton.click().catch(() => {});
    }

    return {
      coverImage: `/images/meta-templates/${coverFilename}`,
      hoverImage: hoverImageUrl ? `/images/meta-templates/template-${String(id).padStart(3, '0')}-hover.png` : null
    };

  } catch (error) {
    console.error(`[${id}] ERROR:`, error.message);
    return { coverImage: null, hoverImage: null };
  }
}

// Update the data file with image URLs
function updateDataFile(templates) {
  const fileContent = `// Auto-generated from XLS import - ${new Date().toISOString()}
// Total templates: ${templates.length}
// Images extracted: ${templates.filter(t => t.coverImage).length}

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
  console.log('Canva Image Extraction Script');
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

  console.log(`Found ${templates.length} templates to process`);

  // Filter templates that need processing (no cover image yet)
  const toProcess = templates.filter(t => !t.coverImage);
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
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
      templates[templateIndex].coverImage = result.coverImage;
      templates[templateIndex].hoverImage = result.hoverImage;
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
