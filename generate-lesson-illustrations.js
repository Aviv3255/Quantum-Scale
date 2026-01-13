const fs = require('fs');
const path = require('path');
const https = require('https');

const GEMINI_API_KEY = 'AIzaSyDrKDR-UESRS7QQz6vsA8nipOFXbpcCJNI';

const illustrations = [
  {
    prompt: "Ultra-realistic photograph of open leather wallet with hundred dollar bills floating away and dissolving into particles, dramatic studio lighting, pure black background, cinematic motion blur, 8K resolution, NO TEXT, showing loss and urgency",
    outputPath: 'genrok-app/public/lessons/cost-of-standing-still/images/money-loss.png'
  },
  {
    prompt: "Ultra-realistic photograph showing two business professionals collaborating warmly at a table, genuine connection and partnership, warm lighting suggesting trust and belonging, pure white background, 8K resolution, NO TEXT, premium commercial photography",
    outputPath: 'genrok-app/public/lessons/unity-principle/images/collaboration.png'
  }
];

async function generateImage(prompt, outputPath) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      contents: [{
        parts: [{
          text: `Generate this image: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    console.log(`\nGenerating image for: ${path.basename(outputPath)}`);
    console.log(`Prompt: ${prompt.substring(0, 80)}...`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error(`Error: ${response.error.message}`);
            reject(new Error(response.error.message));
            return;
          }

          // Create directory if it doesn't exist
          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Created directory: ${dir}`);
          }

          // For now, create a placeholder file since Gemini text model doesn't generate images
          // In production, you'd use Imagen or another image generation API
          const placeholderContent = `IMAGE PLACEHOLDER
Prompt: ${prompt}
Path: ${outputPath}

Note: This is a placeholder. To generate actual images, use:
- Google Imagen API
- Midjourney
- DALL-E
- Stable Diffusion

Generated on: ${new Date().toISOString()}`;

          fs.writeFileSync(outputPath.replace('.png', '.txt'), placeholderContent);
          console.log(`Created placeholder: ${outputPath.replace('.png', '.txt')}`);
          console.log(`Status: Placeholder created (Gemini text model doesn't generate images)`);

          resolve();
        } catch (error) {
          console.error(`Parse error: ${error.message}`);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Request error: ${error.message}`);
      reject(error);
    });

    req.write(requestBody);
    req.end();
  });
}

async function main() {
  console.log('Starting illustration generation...');
  console.log(`Total illustrations to generate: ${illustrations.length}`);

  for (const illustration of illustrations) {
    try {
      await generateImage(illustration.prompt, illustration.outputPath);
      // Wait 2 seconds between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to generate ${illustration.outputPath}:`, error.message);
    }
  }

  console.log('\n=== Generation Complete ===');
  console.log('Note: Gemini 2.0 Flash is a text model and cannot generate images.');
  console.log('Placeholder text files have been created instead.');
  console.log('To generate actual images, please use:');
  console.log('  - Google Imagen API (text-to-image)');
  console.log('  - Midjourney');
  console.log('  - DALL-E 3');
  console.log('  - Stable Diffusion');
}

main().catch(console.error);
