/**
 * Generate images for Emotional Precision lesson using Gemini 3
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyCiw6RyW4RPPYIKoQmgXB6kEWSfbLch3Hs';
const MODEL = 'gemini-3-pro-image-preview';

const images = [
  {
    name: 'emotional-precision-concept.png',
    prompt: `Create a clean, minimalist business infographic showing the concept of emotional precision in copywriting.

Visual elements:
- A target or bullseye with concentric circles
- Outer ring: vague emotion words ("happy", "sad", "angry")
- Inner rings: more specific emotions
- Bullseye center: the precise emotion that resonates
- An arrow hitting the bullseye
- Use emerald/green color (#10b981) as the accent
- Clean white background
- Modern, elegant business aesthetic

Style: Professional infographic, vector-style, minimalist, 70% white space, 16:9 aspect ratio, premium educational platform aesthetic.`
  },
  {
    name: 'emotion-spectrum.png',
    prompt: `Create a clean, minimalist diagram showing an emotion spectrum from vague to precise.

Visual elements:
- A horizontal spectrum or gradient bar
- Left side: blurry, vague (labeled "Generic")
- Right side: sharp, focused (labeled "Precise")
- Sample emotion words transforming along the spectrum
- Use emerald/green color (#10b981) as the accent
- Clean white background
- Professional educational aesthetic
- Shows progression from "Sad" to specific like "Heartbroken"

Style: Professional infographic, vector-style, minimalist, 70% white space, 5:4 aspect ratio, premium educational platform aesthetic.`
  }
];

async function generateImage(imageConfig) {
  const requestBody = {
    contents: [{
      parts: [{
        text: imageConfig.prompt
      }]
    }],
    generationConfig: {
      responseModalities: ["image", "text"]
    }
  };

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(requestBody);

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.candidates && response.candidates[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                resolve(part.inlineData.data);
                return;
              }
            }
          }

          console.error('Response structure:', JSON.stringify(response, null, 2).slice(0, 1000));
          reject(new Error('No image data in response'));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const outputDir = path.join(__dirname, 'genrok-app', 'public', 'lessons', 'emotional-precision', 'images');

  console.log('Generating images for Emotional Precision lesson...\n');

  for (const image of images) {
    console.log(`Generating ${image.name}...`);
    try {
      const base64Data = await generateImage(image);
      const outputPath = path.join(outputDir, image.name);
      fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
      console.log(`  Saved to ${outputPath}`);
    } catch (error) {
      console.error(`  Error: ${error.message}`);
    }

    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\nDone!');
}

main().catch(console.error);
