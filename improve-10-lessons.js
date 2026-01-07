/**
 * Batch improve 10 lessons with elite design patterns
 * Adds character videos and brand images without changing content
 */

const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// Character video URLs
const characterVideos = {
  teaching: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_reading_intently_with_glasses_book_in_hand_--a_fae4f829-ea0b-4a5a-8fb0-3de395a6b6ee_2.mp4',
  thinking: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_scratching_his_chin_deep_in_thought_100_pure_w_9e857f88-67b4-4496-9988-57dd621c97fe_3.mp4',
  calculating: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_calculating_numbers_with_calculator_100_pure_w_b930553b-32c0-4367-bcc5-c1b2c51a9318_2.mp4',
  pointing: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_pointing_at_viewer_finger_gun_style_winking_co_5b09f95b-a36b-4afc-a7dc-fcadb6b1ae7d_2.mp4',
  excited: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_giving_double_thumbs_up_huge_grin_extremely_ha_b5ae8ebd-5dd7-4d80-9f6b-f63f68bff313_2.mp4',
  presenting: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_presenting_with_open_palms_both_hands_showing__3bb09a42-0e67-411b-ba4f-7a4abd96adb8_0.mp4'
};

// Lessons to improve with their specific enhancements
const lessonImprovements = {
  'certainty-transfer': {
    hookVideo: characterVideos.presenting,
    hookPosition: 'right'
  },
  'checkout-line-effect': {
    hookVideo: characterVideos.pointing,
    hookPosition: 'right'
  },
  'choose-products': {
    hookVideo: characterVideos.thinking,
    hookPosition: 'left'
  },
  'cognitive-load-trap': {
    hookVideo: characterVideos.teaching,
    hookPosition: 'right'
  },
  'commodity-escape': {
    hookVideo: characterVideos.presenting,
    hookPosition: 'left'
  },
  'compound-testing-effect': {
    hookVideo: characterVideos.calculating,
    hookPosition: 'right'
  },
  'consumption-conversion': {
    hookVideo: characterVideos.excited,
    hookPosition: 'left'
  },
  'conviction-architecture': {
    hookVideo: characterVideos.teaching,
    hookPosition: 'right'
  },
  'copywriters-codex': {
    hookVideo: characterVideos.presenting,
    hookPosition: 'left'
  },
  'cost-of-standing-still': {
    hookVideo: characterVideos.thinking,
    hookPosition: 'right'
  }
};

let updated = 0;
let errors = [];

for (const [lessonSlug, improvements] of Object.entries(lessonImprovements)) {
  const lessonPath = path.join(lessonsDir, lessonSlug, 'lesson.html');

  if (!fs.existsSync(lessonPath)) {
    errors.push(`${lessonSlug}: File not found`);
    console.log(`✗ Not found: ${lessonSlug}`);
    continue;
  }

  try {
    let content = fs.readFileSync(lessonPath, 'utf8');

    // Check if already has characterVideo on hook slide
    if (content.includes("type: 'hook'") && !content.includes("type: 'hook', headline:") && content.includes("characterVideo:")) {
      console.log(`○ Already enhanced: ${lessonSlug}`);
      continue;
    }

    // Find the hook slide pattern and add characterVideo
    // Pattern: { type: 'hook', headline: '...', subtext: '...' }
    // or { type: 'hook', headline: '...', subtext: '...', brandImage: '...', brandName: '...' }

    const hookPatterns = [
      // Pattern with brandImage
      /(\{ type: 'hook', headline: '[^']*', subtext: '[^']*')\s*(,\s*brandImage:[^}]+)(\})/,
      // Pattern without brandImage but with closing brace
      /(\{ type: 'hook', headline: '[^']*', subtext: '[^']*')(\s*\})/,
      // Pattern with escaped quotes in headline
      /(\{ type: 'hook', headline: [^,]+, subtext: [^}]+?)(\s*\})/
    ];

    let matched = false;
    for (const pattern of hookPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, (match, p1, p2, p3) => {
          // Check if already has characterVideo
          if (match.includes('characterVideo')) {
            return match;
          }

          const videoAddition = `, characterVideo: '${improvements.hookVideo}', characterPosition: '${improvements.hookPosition}'`;

          if (p3) {
            // Has brandImage - insert before brandImage
            return `${p1}${videoAddition}${p2}${p3}`;
          } else {
            // No brandImage - insert before closing brace
            return `${p1}${videoAddition}${p2}`;
          }
        });
        matched = true;
        break;
      }
    }

    if (matched) {
      fs.writeFileSync(lessonPath, content, 'utf8');
      updated++;
      console.log(`✓ Updated: ${lessonSlug}`);
    } else {
      // Try a more flexible approach
      const flexPattern = /(\{ type: 'hook',[\s\S]*?)(,?\s*\})/;
      const hookMatch = content.match(flexPattern);

      if (hookMatch && !hookMatch[0].includes('characterVideo')) {
        const videoAddition = `, characterVideo: '${improvements.hookVideo}', characterPosition: '${improvements.hookPosition}'`;
        content = content.replace(flexPattern, `$1${videoAddition}$2`);
        fs.writeFileSync(lessonPath, content, 'utf8');
        updated++;
        console.log(`✓ Updated (flex): ${lessonSlug}`);
      } else if (hookMatch && hookMatch[0].includes('characterVideo')) {
        console.log(`○ Already has video: ${lessonSlug}`);
      } else {
        errors.push(`${lessonSlug}: Could not find hook pattern`);
        console.log(`✗ Pattern not found: ${lessonSlug}`);
      }
    }

  } catch (err) {
    errors.push(`${lessonSlug}: ${err.message}`);
    console.log(`✗ Error: ${lessonSlug} - ${err.message}`);
  }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Updated: ${updated}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nIssues:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
