/**
 * Generate images for Damaging Admission lesson using Gemini 3
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyCiw6RyW4RPPYIKoQmgXB6kEWSfbLch3Hs';
const MODEL = 'gemini-3-pro-image-preview';

const images = [
  {
    name: 'damaging-admission-concept.png',
    prompt: `Create a clean, minimalist business infographic showing the damaging admission persuasion concept.

Visual elements:
- A shield or wall representing skepticism with cracks in it
- An arrow labeled "Admission" breaking through the wall
- On the other side: "Trust" or "Belief" glowing
- Show the journey from skepticism to trust
- Use rose/pink color (#f43f5e) as the accent
- Clean white background
- Modern, elegant business aesthetic

Style: Professional infographic, vector-style, minimalist, 70% white space, 16:9 aspect ratio, premium educational platform aesthetic.`
  },
  {
    name: 'credibility-transfer.png',
    prompt: `Create a clean, minimalist diagram showing how credibility transfers from admission to claims.

Visual elements:
- A balance scale or seesaw
- One side: "Admitted Weakness" (smaller/lighter)
- Other side: "Claimed Strengths" (larger/heavier but balanced)
- Show that admitting weakness makes strengths more believable
- Use rose/pink color (#f43f5e) as the accent
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
  const outputDir = path.join(__dirname, 'genrok-app', 'public', 'lessons', 'damaging-admission', 'images');

  console.log('Generating images for Damaging Admission lesson...\n');

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
