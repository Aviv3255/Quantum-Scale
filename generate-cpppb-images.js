/**
 * Generate images for CPPPB Proof Loop lesson using Gemini 3
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyCiw6RyW4RPPYIKoQmgXB6kEWSfbLch3Hs';
const MODEL = 'gemini-3-pro-image-preview';

const images = [
  {
    name: 'cpppb-concept.png',
    prompt: `Create a clean, minimalist business infographic showing the CPPPB persuasion framework.

Visual elements:
- Five connected circular nodes in a horizontal flow
- Node 1: "C" for Credibility (violet color)
- Node 2: "P" for Problem (red color)
- Node 3: "P" for Promise (green color)
- Node 4: "P" for Proof (blue color)
- Node 5: "B" for Benefits (amber color)
- Arrows connecting each node to show the sequence
- Use violet (#8b5cf6) as the primary accent
- Clean white background
- Modern, elegant business aesthetic

Style: Professional infographic, vector-style, minimalist, 70% white space, 16:9 aspect ratio, premium educational platform aesthetic.`
  },
  {
    name: 'belief-ladder.png',
    prompt: `Create a clean, minimalist diagram showing belief building like climbing a ladder.

Visual elements:
- A ladder with 5 rungs leading upward
- Each rung labeled: Credibility, Problem, Promise, Proof, Benefits
- A figure climbing from bottom to top
- "Trust" or "Belief" shown growing as they climb higher
- Use violet (#8b5cf6) as the accent color
- Clean white background
- Professional educational aesthetic

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
  const outputDir = path.join(__dirname, 'genrok-app', 'public', 'lessons', 'cpppb-proof-loop', 'images');

  console.log('Generating images for CPPPB Proof Loop lesson...\n');

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
