/**
 * Generate lesson images using Gemini 3 Pro Image
 *
 * Usage: GEMINI_API_KEY=your_key node generate-images.js [lesson-slug]
 *
 * The API key must be passed via environment variable - never hardcode it!
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-3-pro-image-preview';

if (!API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is required');
  console.error('Usage: GEMINI_API_KEY=your_key node generate-images.js [lesson-slug]');
  process.exit(1);
}

/**
 * Generate image using Gemini 3 Pro Image
 */
function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE']
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);

          if (response.error) {
            reject(new Error(response.error.message));
            return;
          }

          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content?.parts || [];

            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
                resolve({
                  success: true,
                  imageData: part.inlineData.data,
                  mimeType: part.inlineData.mimeType
                });
                return;
              }
            }
            reject(new Error('No image in response'));
          } else {
            reject(new Error('Unexpected response format'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

/**
 * Save image to file
 */
function saveImage(base64Data, mimeType, outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(outputPath, buffer);

  return { filepath: outputPath, size: Math.round(buffer.length / 1024) };
}

/**
 * Generate a single image with retry logic
 */
async function generateWithRetry(prompt, outputPath, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${maxRetries}...`);
      const result = await generateImage(prompt);

      if (result.success) {
        const ext = result.mimeType.includes('png') ? 'png' : 'jpg';
        const finalPath = outputPath.replace(/\.[^.]+$/, `.${ext}`);
        const saved = saveImage(result.imageData, result.mimeType, finalPath);
        console.log(`  SUCCESS: ${saved.filepath} (${saved.size}KB)`);
        return saved;
      }
    } catch (error) {
      console.log(`  Attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxRetries) {
        console.log(`  Waiting 5s before retry...`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }
  throw new Error(`Failed after ${maxRetries} attempts`);
}

// Export for use as module
module.exports = { generateImage, saveImage, generateWithRetry };

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Gemini 3 Pro Image Generator');
    console.log('============================');
    console.log('');
    console.log('Usage:');
    console.log('  GEMINI_API_KEY=key node generate-images.js test');
    console.log('  GEMINI_API_KEY=key node generate-images.js "prompt" output.png');
    console.log('');
    console.log('API Key is loaded from environment variable (never hardcode!)');
  } else if (args[0] === 'test') {
    console.log('Testing Gemini 3 Pro Image API...');
    generateWithRetry(
      'A simple golden sphere on pure black background, hyper-realistic 3D render, dramatic lighting, no text',
      path.join(__dirname, 'test-output.png')
    ).then(() => {
      console.log('Test successful!');
    }).catch(err => {
      console.error('Test failed:', err.message);
    });
  } else if (args.length >= 2) {
    const [prompt, outputPath] = args;
    generateWithRetry(prompt, outputPath)
      .then(() => console.log('Done!'))
      .catch(err => console.error('Failed:', err.message));
  }
}
