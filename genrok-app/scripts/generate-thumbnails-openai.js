/**
 * OpenAI Thumbnail Generator
 *
 * Uses GPT Image 1 EDIT endpoint with multiple image inputs
 * Supports reference image + additional assets (monkey, entrepreneurs, brands)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const OPENAI_API_KEY = process.argv[2];
const MODEL = 'gpt-image-1';
const SIZE = '1536x1024'; // Landscape, close to 16:10

if (!OPENAI_API_KEY) {
  console.error('Usage: node generate-thumbnails-openai.js <OPENAI_API_KEY>');
  process.exit(1);
}

// Paths
const REFERENCE_DIR = path.join(__dirname, '../../Lessons-covers-refferance');
const ADDITIONAL_IMAGES_DIR = path.join(__dirname, '../public/additional-images');
const MONKEY_IMAGE = path.join(__dirname, '../public/reference-thumbnails/monkey-mascot.png');
const OUTPUT_DIR = path.join(__dirname, '../generated-thumbnails');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image assets mapping
const imageAssets = {
  monkey: MONKEY_IMAGE,
  alexHormozi: path.join(ADDITIONAL_IMAGES_DIR, 'entrepreneurs/alex-hormozi.png'),
  robertCialdini: path.join(ADDITIONAL_IMAGES_DIR, 'entrepreneurs/robert-cialdini.png'),
  danKennedy: path.join(ADDITIONAL_IMAGES_DIR, 'entrepreneurs/dan-kennedy.png'),
  danielKahneman: path.join(ADDITIONAL_IMAGES_DIR, 'entrepreneurs/daniel-kahneman.png'),
  sethGodin: path.join(ADDITIONAL_IMAGES_DIR, 'entrepreneurs/seth-godin.jpg'),
  rorySutherland: path.join(ADDITIONAL_IMAGES_DIR, 'entrepreneurs/rory-sutherland.png'),
  apple: path.join(ADDITIONAL_IMAGES_DIR, 'brands/apple.png'),
  shopify: path.join(ADDITIONAL_IMAGES_DIR, 'brands/shopify.svg'),
  meta: path.join(ADDITIONAL_IMAGES_DIR, 'brands/meta.png'),
  starbucks: path.join(ADDITIONAL_IMAGES_DIR, 'brands/starbucks.png'),
};

// 10 lessons - exact prompts from admin page
// First 5: MEDIUM quality ($0.042 each = $0.21)
// Last 5: HIGH quality ($0.167 each = $0.835)
const lessonsToGenerate = [
  // === MEDIUM QUALITY (5) ===
  {
    slug: 'familiar-surprise-secret',
    quality: 'medium',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "THE FAMILIAR SURPRISE"
- Replace the brand logos on the brain with: Apple logo, iPhone icon, AirPods icon
- Replace any person with our monkey mascot (attached) - he's wearing an Apple Store employee blue shirt, looking clever and knowing

Keep EVERYTHING else exactly the same - the brain visual, the purple glow, the style.
16:10 ratio. Don't put the time block.`,
    images: ['monkey', 'apple'],
  },
  {
    slug: 'red-button-effect',
    quality: 'medium',
    referenceImage: 'Screenshot 2026-01-08 191722.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Make the central object a MASSIVE glossy red arcade button - glowing, pulsing with forbidden energy
- Text: "DON'T." in huge letters above the button
- Our monkey mascot (attached) with his finger HOVERING over the button, sweating, can't resist the urge
- Dark dramatic background with red glow emanating from the button
- Small text: "You're going to press it anyway"

Make it feel like the button is CALLING to you. Premium, cinematic, irresistible.
16:10 ratio. Don't put the time block.`,
    images: ['monkey'],
  },
  {
    slug: 'fred-method',
    quality: 'medium',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint diagram to show "F.R.E.D." with 4 icons: Fear, Reason, Ego, Desire
- Replace the person with our monkey mascot (attached) - he's holding a marker and pointing at the blueprint like a professor teaching
- Keep the blue blueprint background exactly the same

16:10 ratio. Don't put the time block.`,
    images: ['monkey'],
  },
  {
    slug: 'emotion-decides',
    quality: 'medium',
    referenceImage: 'Screenshot 2026-01-08 181654.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "EMOTION WINS." in bold
- Replace both people with Daniel Kahneman (attached) on one side looking wise
- Replace the hoodie product with a giant red 3D HEART wearing a golden crown
- Add small gray brain being pushed aside by the heart

Keep the podcast/interview style layout, the professional look.
16:10 ratio. Don't put the time block.`,
    images: ['danielKahneman'],
  },
  {
    slug: 'three-second-rule',
    quality: 'medium',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change "OLD" to "SLOW" with red X
- Change "NEW" to "3 SEC" with green checkmark
- Replace the tech logos with: Left side = hourglass/slow clock, Right side = lightning bolt stopwatch showing "00:03"
- Add our monkey mascot (attached) pointing urgently at the 3 seconds side, looking stressed about time

Keep the comparison layout, the arrows, the grid background.
16:10 ratio. Don't put the time block.`,
    images: ['monkey'],
  },

  // === HIGH QUALITY (5) ===
  {
    slug: 'persuasion-blueprint',
    quality: 'high',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "THE PERSUASION BLUEPRINT"
- Keep the money pyramid but add "6 PRINCIPLES" text on it
- Replace the hand/figures at top with Robert Cialdini (attached) standing confidently at the peak
- Add floating icons around: heart, clock, star, handshake, lock, crowd

Keep the money flying, the clean style, the professional look.
16:10 ratio. Don't put the time block.`,
    images: ['robertCialdini'],
  },
  {
    slug: 'gatekeeper-method',
    quality: 'high',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "4 DOORS TO THE BRAIN"
- On the brain, add 4 small golden doors instead of brand logos - one door is OPEN with light streaming out
- Add our monkey mascot (attached) holding a golden key, looking like he knows the secret

Keep the purple brain glow, the dramatic lighting, the premium feel.
16:10 ratio. Don't put the time block.`,
    images: ['monkey'],
  },
  {
    slug: 'wiifm-principle',
    quality: 'high',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "WHAT'S IN IT FOR ME?"
- Replace the person with our monkey mascot (attached) - he's pointing DIRECTLY at the viewer like Uncle Sam, intense eye contact, demanding
- Make the pointing more aggressive, like "I'm talking to YOU"

Keep the red background, the dramatic paper-cut style.
16:10 ratio. Don't put the time block.`,
    images: ['monkey'],
  },
  {
    slug: 'damaging-admission',
    quality: 'high',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "I WAS WRONG." with a cracked effect
- Replace the banana with a CRACKED MIRROR showing golden light through the crack
- Add our monkey mascot (attached) looking humble and sincere, hand on heart, admitting a mistake
- Add small text: "and that's why you should trust me"

Keep the clean layout, the grid background, the modern style.
16:10 ratio. Don't put the time block.`,
    images: ['monkey'],
  },
  {
    slug: 'certainty-transfer',
    quality: 'high',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Keep the two brain comparison exactly the same (gray vs colorful)
- Change labels to "DOUBT" (left, gray) and "CERTAIN" (right, colorful)
- Add our monkey mascot (attached) between the brains, transferring energy from right to left with his hands glowing
- Add "CERTAINTY TRANSFER" text at top

Keep the black background, the medical brain imagery, the scientific look.
16:10 ratio. Don't put the time block.`,
    images: ['monkey'],
  },
];

// Read file as Buffer
function readFileAsBuffer(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  Warning: File not found: ${filePath}`);
    return null;
  }
  return fs.readFileSync(filePath);
}

// Create multipart form data boundary
function createBoundary() {
  return '----FormBoundary' + Math.random().toString(36).substring(2);
}

// Build multipart form data with multiple images
function buildMultipartFormData(boundary, fields, files) {
  const parts = [];

  // Add text fields
  for (const [key, value] of Object.entries(fields)) {
    parts.push(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${key}"\r\n\r\n` +
      `${value}\r\n`
    );
  }

  // Add files - use image[] for multiple images
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file.filename).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' :
                        ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                        ext === '.webp' ? 'image/webp' : 'image/png';

    // First image is 'image', additional images are 'image[]'
    const fieldName = i === 0 ? 'image' : 'image[]';

    parts.push(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${fieldName}"; filename="${file.filename}"\r\n` +
      `Content-Type: ${contentType}\r\n\r\n`
    );
    parts.push(file.buffer);
    parts.push('\r\n');
  }

  parts.push(`--${boundary}--\r\n`);

  const buffers = parts.map(p => Buffer.isBuffer(p) ? p : Buffer.from(p, 'utf-8'));
  return Buffer.concat(buffers);
}

// Make API request to OpenAI images/edits endpoint
async function generateImageWithEdit(prompt, quality, imageFiles) {
  return new Promise((resolve, reject) => {
    const boundary = createBoundary();

    const fields = {
      model: MODEL,
      prompt: prompt,
      size: SIZE,
      quality: quality,
    };

    const formData = buildMultipartFormData(boundary, fields, imageFiles);

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/images/edits',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': formData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        try {
          const responseText = Buffer.concat(data).toString('utf-8');
          const response = JSON.parse(responseText);
          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(formData);
    req.end();
  });
}

// Download image from URL
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Main function
async function main() {
  const mediumCount = lessonsToGenerate.filter(l => l.quality === 'medium').length;
  const highCount = lessonsToGenerate.filter(l => l.quality === 'high').length;
  const totalCost = (mediumCount * 0.042) + (highCount * 0.167);

  console.log('='.repeat(60));
  console.log('OpenAI Thumbnail Generator');
  console.log('='.repeat(60));
  console.log(`Model: ${MODEL}`);
  console.log(`Size: ${SIZE}`);
  console.log(`Medium quality: ${mediumCount} images ($${(mediumCount * 0.042).toFixed(2)})`);
  console.log(`High quality: ${highCount} images ($${(highCount * 0.167).toFixed(2)})`);
  console.log(`Total estimated cost: $${totalCost.toFixed(2)}`);
  console.log('='.repeat(60));
  console.log('');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < lessonsToGenerate.length; i++) {
    const lesson = lessonsToGenerate[i];
    console.log(`[${i + 1}/${lessonsToGenerate.length}] ${lesson.slug} (${lesson.quality} quality)`);

    // Skip if file already exists
    const outputPath = path.join(OUTPUT_DIR, `${lesson.slug}.png`);
    if (fs.existsSync(outputPath)) {
      console.log(`  ⏭ Skipping - already exists: ${outputPath}`);
      successCount++;
      console.log('');
      continue;
    }

    try {
      // Prepare image files
      const imageFiles = [];

      // 1. Reference image (required, first)
      const refImagePath = path.join(REFERENCE_DIR, lesson.referenceImage);
      const refBuffer = readFileAsBuffer(refImagePath);
      if (!refBuffer) {
        throw new Error(`Reference image not found: ${lesson.referenceImage}`);
      }
      imageFiles.push({
        filename: lesson.referenceImage,
        buffer: refBuffer
      });
      console.log(`  - Reference: ${lesson.referenceImage}`);

      // Note: The /images/edits endpoint only accepts ONE image
      // Additional assets (monkey, entrepreneur) are described in the prompt
      console.log(`  - Assets described in prompt: ${lesson.images.join(', ')}`);
      console.log(`  - Generating...`);

      // Generate image
      const response = await generateImageWithEdit(lesson.concept, lesson.quality, imageFiles);

      if (response.data && response.data[0]) {
        // outputPath already defined above

        if (response.data[0].b64_json) {
          fs.writeFileSync(outputPath, Buffer.from(response.data[0].b64_json, 'base64'));
          console.log(`  ✓ Saved: ${outputPath}`);
          successCount++;
        } else if (response.data[0].url) {
          // Download from URL
          await downloadImage(response.data[0].url, outputPath);
          console.log(`  ✓ Downloaded: ${outputPath}`);
          successCount++;
        } else {
          console.log(`  ✗ Unexpected response format`);
          failCount++;
        }
      } else {
        console.log(`  ✗ No data in response:`, JSON.stringify(response).slice(0, 200));
        failCount++;
      }

    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      failCount++;
    }

    // Rate limiting - wait between requests
    if (i < lessonsToGenerate.length - 1) {
      console.log('  Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    console.log('');
  }

  console.log('='.repeat(60));
  console.log(`Complete!`);
  console.log(`Success: ${successCount} | Failed: ${failCount}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
