/**
 * Thumbnail Generator using Gemini 3 Pro Image Model
 * Model ID: gemini-3-pro-image-preview (as specified by user)
 * Aspect Ratio: 16:10 (1600x1000px - matching learn page)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const GEMINI_API_KEY = 'AIzaSyBoVLNTTsOEcYvOSeADM2USzxpj9AYSmvI';
const GEMINI_MODEL = 'gemini-3-pro-image-preview'; // Gemini 3 Pro Image model as specified
const SUPABASE_URL = 'https://pqvvrljykfvhpyvxmwzb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdnZybGp5a2Z2aHB5dnhtd3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4ODcyMjMsImV4cCI6MjA0ODQ2MzIyM30.HbMDLl6AMdyREWLLp53_xBKseK2DXLPN1hNvRBic6UM';

// Reference images directory
const REFERENCE_DIR = 'C:/Projects/Quantum-Scale/Lessons-covers-refferance';

// Lesson prompts with premium descriptions
const lessonPrompts = {
  'familiar-surprise-secret': {
    title: 'The Familiar Surprise Secret',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "IT WORKS." - The MAYA principle showing how Apple makes familiar things magical.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Clean white or light gray background with subtle grid texture
- Bold black Impact/Bebas Neue font text "IT WORKS." on left side
- Floating Apple logo and iPhone on right side with soft shadows
- Ultra-clean, minimal, premium Apple keynote aesthetic
- Professional studio lighting with soft shadows
- High contrast, stop-the-scroll quality
- No clutter, maximum visual impact`
  },
  'red-button-effect': {
    title: 'The Red Button Effect',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "DON'T PRESS" - Psychological reactance, the forbidden button that makes you want to click.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Pure black background like OLED screen
- Massive hyper-realistic glossy RED button center frame
- Chrome metal rim, glass dome catching dramatic light
- Text "DO NOT PRESS" embossed on button or nearby
- Single dramatic spotlight from above
- Mysterious, irresistible, impossible to ignore
- Bold white text at top "WHY YOU CLICK"`
  },
  'fred-method': {
    title: 'The F.R.E.D. Method',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "F.R.E.D." - 4 psychological hooks into the brain.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Clean white/light background with subtle medical grid
- Hyper-realistic 3D brain floating center
- 4 colored cables plugged into brain: Red(F), Blue(R), Green(E), Yellow(D)
- Bold text "F.R.E.D." below, each letter in matching cable color
- Scientific diagram meets YouTube energy
- Bright, even, clinical lighting
- Premium 3D render quality`
  },
  'emotion-decides': {
    title: 'Emotion Decides, Logic Justifies',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "EMOTION WINS" - The heart beats the brain in purchasing decisions.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Soft cream/warm gradient background
- MASSIVE realistic 3D anatomical heart (red, glossy) on left - 3x larger than brain
- Smaller realistic brain on right looking defeated
- Golden crown on the heart
- Bold black text "EMOTION WINS." at bottom
- Warm golden hour lighting
- Visceral, emotional, premium quality`
  },
  'gatekeeper-method': {
    title: 'The Gatekeeper Method',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "4 DOORS" - Bypassing the brain's attention filter, secret doors to the mind.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Deep charcoal/dark gray background
- Massive hyper-realistic 3D brain with small ornate golden door in frontal lobe
- Door slightly ajar with brilliant golden light streaming out (god rays)
- Brain looks organic/wet, door looks ancient and precious
- Bold white text "4 DOORS." with dramatic shadow
- Mysterious, exclusive, premium CGI quality
- Movie poster lighting`
  },
  'three-second-rule': {
    title: 'The 3-Second Rule',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "3 SECONDS" - You have 3 seconds to capture attention or lose them forever.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Solid URGENT RED background (#FF0000), pure and intense
- GIANT white bold "3" dominating the frame
- Realistic silver stopwatch showing exactly 3 seconds
- Text "SECONDS." below in white
- Small "YOU HAVE" text above
- MrBeast-style high contrast urgency
- Creates anxiety, impossible to ignore`
  },
  'science-of-selling': {
    title: 'The Science of Selling',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "THE FORMULA" - Selling is a science, not an art. The secret money formula.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Clean white laboratory setting with faint grid
- Tall glass Erlenmeyer flask OVERFLOWING with crisp $100 bills
- Money spilling onto white surface
- Chemical formula symbols floating ($ + Psychology = Money)
- Bold black text "THE FORMULA."
- Bright, clinical, scientific lighting
- Premium product photography quality`
  },
  'persuasion-blueprint': {
    title: 'The Persuasion Blueprint',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "BLUEPRINT" - The master plan for persuasion, architect of influence.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Aged paper/architect desk texture background
- Rolled blueprint paper partially unrolled showing brain diagram with connections
- Classic blue/white blueprint aesthetic
- Brass compass and pencil nearby
- Bold black text "BLUEPRINT." stamped like official document
- Warm desk lamp lighting
- Intellectual, exclusive, premium`
  },
  'persuasion-stack': {
    title: 'The Persuasion Stack',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "THE STACK" - Layered persuasion techniques that build on each other.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Soft gradient from light gray to white background
- Vertical stack of 5 distinct colorful geometric layers
- Colors: Red, Blue, Green, Yellow, Purple with gaps between
- 3D depth with shadows between layers
- Bold black text "THE STACK." beside or below
- Clean, modern, strategic tech company aesthetic
- Premium 3D render quality`
  },
  'architecture-of-influence': {
    title: 'Architecture of Influence',
    prompt: `Create a premium YouTube thumbnail (16:10 aspect ratio, 1600x1000px).

CONCEPT: "ARCHITECT" - Designing minds, building influence like architecture.

STYLE REQUIREMENTS (MrBeast/Hormozi $5,000 thumbnail quality):
- Deep navy blue gradient background
- Beautiful golden architectural wireframe forming human head profile
- Golden lines creating both building structure and mind
- Bold white text "ARCHITECT" with gold accent on A
- Golden accent lighting on wireframe
- Christopher Nolan movie poster quality
- Powerful, intellectual, sophisticated`
  }
};

// Function to make HTTPS request
function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// Function to get lessons without thumbnails from Supabase
async function getLessonsWithoutThumbnails() {
  const options = {
    hostname: 'pqvvrljykfvhpyvxmwzb.supabase.co',
    path: '/rest/v1/lesson_thumbnails?select=slug,thumbnail_url',
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const result = await httpsRequest(options);
    if (result.status === 200) {
      // Get slugs that have thumbnails
      const withThumbnails = new Set(
        result.data
          .filter(item => item.thumbnail_url)
          .map(item => item.slug)
      );

      // Return lessons without thumbnails
      const allLessons = Object.keys(lessonPrompts);
      return allLessons.filter(slug => !withThumbnails.has(slug));
    }
    return Object.keys(lessonPrompts);
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    return Object.keys(lessonPrompts);
  }
}

// Function to read reference images as base64
function getRandomReferenceImage() {
  const files = fs.readdirSync(REFERENCE_DIR).filter(f => f.endsWith('.png'));
  if (files.length === 0) return null;

  const randomFile = files[Math.floor(Math.random() * files.length)];
  const imagePath = path.join(REFERENCE_DIR, randomFile);
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

// Function to generate image with Gemini
async function generateImageWithGemini(prompt, slug) {
  console.log(`\nGenerating thumbnail for: ${slug}`);
  console.log('Using model: gemini-3-pro-image-preview');

  // Get a reference image
  const referenceBase64 = getRandomReferenceImage();

  const requestBody = {
    contents: [{
      parts: [
        {
          text: `You are a world-class thumbnail designer who creates $5,000+ thumbnails for creators like MrBeast, Alex Hormozi, and Iman Gadzhi.

I'm showing you reference images of the style I want. Study them carefully - notice the bold text, clean backgrounds, dramatic lighting, and premium feel.

Now create a NEW thumbnail with these specifications:

${prompt}

CRITICAL REQUIREMENTS:
- Aspect ratio: 16:10 (1600x1000 pixels)
- Style: Match the premium YouTube thumbnail references shown
- Quality: $5,000 professional thumbnail level
- Text must be BOLD, readable, and impactful
- Clean composition with maximum visual impact
- Stop-the-scroll quality that demands clicks`
        }
      ]
    }],
    generationConfig: {
      responseModalities: ["image", "text"],
      temperature: 1
    }
  };

  // Add reference image if available
  if (referenceBase64) {
    requestBody.contents[0].parts.unshift({
      inlineData: {
        mimeType: "image/png",
        data: referenceBase64
      }
    });
  }

  const postData = JSON.stringify(requestBody);

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  try {
    const result = await httpsRequest(options, postData);

    if (result.status !== 200) {
      console.error(`API Error (${result.status}):`, JSON.stringify(result.data, null, 2));
      return null;
    }

    // Extract image from response
    const response = result.data;
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          console.log(`✓ Image generated successfully for ${slug}`);
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType || 'image/png'
          };
        }
      }
    }

    console.log('Response structure:', JSON.stringify(response, null, 2).substring(0, 500));
    return null;
  } catch (error) {
    console.error(`Error generating image for ${slug}:`, error.message);
    return null;
  }
}

// Function to upload image to Supabase Storage
async function uploadToSupabase(imageData, slug) {
  const filename = `lesson-thumbnails/${slug}-${Date.now()}.png`;
  const imageBuffer = Buffer.from(imageData.base64, 'base64');

  const options = {
    hostname: 'pqvvrljykfvhpyvxmwzb.supabase.co',
    path: `/storage/v1/object/images/${filename}`,
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': imageData.mimeType,
      'Content-Length': imageBuffer.length,
      'x-upsert': 'true'
    }
  };

  try {
    const result = await httpsRequest(options, imageBuffer);

    if (result.status === 200 || result.status === 201) {
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
      console.log(`✓ Uploaded to: ${publicUrl}`);
      return publicUrl;
    } else {
      console.error(`Upload failed (${result.status}):`, result.data);
      return null;
    }
  } catch (error) {
    console.error(`Error uploading ${slug}:`, error.message);
    return null;
  }
}

// Function to update lesson_thumbnails table
async function updateThumbnailRecord(slug, thumbnailUrl) {
  const postData = JSON.stringify({
    slug: slug,
    thumbnail_url: thumbnailUrl,
    updated_at: new Date().toISOString()
  });

  const options = {
    hostname: 'pqvvrljykfvhpyvxmwzb.supabase.co',
    path: '/rest/v1/lesson_thumbnails?on_conflict=slug',
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  try {
    const result = await httpsRequest(options, postData);
    if (result.status === 200 || result.status === 201) {
      console.log(`✓ Database updated for ${slug}`);
      return true;
    } else {
      console.error(`DB update failed (${result.status}):`, result.data);
      return false;
    }
  } catch (error) {
    console.error(`Error updating DB for ${slug}:`, error.message);
    return false;
  }
}

// Output directory for generated images
const OUTPUT_DIR = path.join(__dirname, '..', 'generated-thumbnails');

// Function to save image locally
function saveImageLocally(imageData, slug) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const filename = `${slug}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  const imageBuffer = Buffer.from(imageData.base64, 'base64');

  fs.writeFileSync(filepath, imageBuffer);
  console.log(`✓ Saved locally: ${filepath}`);
  return filepath;
}

// Main execution
async function main() {
  console.log('='.repeat(60));
  console.log('THUMBNAIL GENERATOR - gemini-3-pro-image-preview');
  console.log('Quality Level: $5,000/thumbnail (MrBeast/Hormozi style)');
  console.log('Aspect Ratio: 16:10 (1600x1000px)');
  console.log('='.repeat(60));

  // Get lessons that need thumbnails
  const lessonsNeeded = await getLessonsWithoutThumbnails();
  console.log(`\nLessons without thumbnails: ${lessonsNeeded.length}`);

  // Process first 10
  const toProcess = lessonsNeeded.slice(0, 10);
  console.log(`Processing first ${toProcess.length} lessons...\n`);

  let successCount = 0;
  let failCount = 0;
  const generatedFiles = [];

  for (const slug of toProcess) {
    const lessonData = lessonPrompts[slug];
    if (!lessonData) {
      console.log(`Skipping ${slug} - no prompt defined`);
      continue;
    }

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`Processing: ${lessonData.title}`);

    // Generate image
    const imageResult = await generateImageWithGemini(lessonData.prompt, slug);

    if (imageResult) {
      // Save locally first
      const localPath = saveImageLocally(imageResult, slug);
      generatedFiles.push({ slug, path: localPath });

      // Try to upload to Supabase
      const uploadedUrl = await uploadToSupabase(imageResult, slug);

      if (uploadedUrl) {
        // Update database
        const updated = await updateThumbnailRecord(slug, uploadedUrl);
        if (updated) {
          successCount++;
          console.log(`✓ COMPLETE: ${slug}`);
        } else {
          console.log(`✓ Generated & saved locally (DB update failed): ${slug}`);
          successCount++;
        }
      } else {
        console.log(`✓ Generated & saved locally (upload failed): ${slug}`);
        successCount++;
      }
    } else {
      failCount++;
      console.log(`✗ FAILED: ${slug}`);
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`SUMMARY: ${successCount} generated, ${failCount} failed`);
  console.log(`\nGenerated files saved to: ${OUTPUT_DIR}`);
  if (generatedFiles.length > 0) {
    console.log('\nFiles:');
    generatedFiles.forEach(f => console.log(`  - ${f.slug}.png`));
  }
  console.log('='.repeat(60));
}

main().catch(console.error);
