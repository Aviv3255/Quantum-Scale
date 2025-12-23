/**
 * Generate images for WIIFM Principle lesson using Gemini 3
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyCiw6RyW4RPPYIKoQmgXB6kEWSfbLch3Hs';
const MODEL = 'gemini-3-pro-image-preview';

const images = [
  {
    name: 'wiifm-concept.png',
    prompt: `Create a clean, minimalist business infographic showing the WIIFM (What's In It For Me?) principle.

Visual elements:
- A person silhouette with a thought bubble containing "WIIFM?"
- Arrows or rays pointing from content toward the person
- The question "What's In It For Me?" prominently displayed
- Show contrast between "ME" focused content vs "YOU" focused content
- Use cyan/teal color (#06b6d4) as the accent
- Clean white background
- Modern, elegant business aesthetic

Style: Professional infographic, vector-style, minimalist, 70% white space, 16:9 aspect ratio, premium educational platform aesthetic.`
  },
  {
    name: 'four-line-rule.png',
    prompt: `Create a clean, minimalist diagram showing the 4-Line Rule concept.

Visual elements:
- A document or page with 4 highlighted lines at the top
- A stopwatch or timer icon showing urgency
- Visual indicator showing "WIN or LOSE" decision point
- Numbers 1, 2, 3, 4 marking each critical line
- Use cyan/teal color (#06b6d4) as the accent
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
  const outputDir = path.join(__dirname, 'genrok-app', 'public', 'lessons', 'wiifm-principle', 'images');

  console.log('Generating images for WIIFM Principle lesson...\n');

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
