const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Video URLs from the improvement list
const videos = {
  lightbulb: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_having_a_lightbulb_moment_pure_100_white_backg_bd88fbc3-b501-446f-a37f-09b80e6320fc_3.mp4',
  connecting: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_connecting_the_dots_drawing_lines_between_poin_66a88945-b2d0-442a-b48e-0c20060e3fcf_2.mp4',
  reading: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_reading_intently_with_glasses_book_in_hand_--a_fae4f829-ea0b-4a5a-8fb0-3de395a6b6ee_2.mp4',
  notes: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_taking_notes_furiously_pencil_flying_across_pa_05ef64dd-3e45-44ef-a3d0-9c5ad185cb8a_3.mp4',
  data: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_studying_the_data_looking_at_chartsgraphs_100__02345be1-0aec-48ba-a3c3-1b3e71cf1432_2.mp4',
  redflag: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runL4Kiyy-A1lI_He_is_waving_a_red_flag_100_c6c04ad4-c9e2-4a37-81cc-c7da0ca2b396_2.mp4',
  facepalm: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is..._face-palming_embarrassedfrustrated_100_pure_2ecf9cf3-57a5-44c8-8958-1ee07c06f4b2_3.mp4',
  shakingno: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_shaking_his_head_no_disapproving_gesture_--ar__6571be48-3bd3-4ed5-ba27-8bdadb01795a_3.mp4',
  scared: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_running_away_scared_fleeing_pose_100_Pure_whit_71d839ad-15b2-4283-ae8d-021fdb7ccfb2_3.mp4',
  building: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_building_something_with_tools_constructing_100_52683f04-d09a-47c4-89a1-84b57476d150_2.mp4',
  typing: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is..._typing_at_a_computer_focused_work_100_pure__5fc46f1f-5169-4325-a7d2-81aceeed3514_2.mp4',
  chart: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_pointing_at_a_chart_presentingexplaining_100_p_d3ddf2c8-5905-4952-b8cc-0eaed3e8b732_3.mp4',
  magnifying: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_holding_a_magnifying_glass_investigating_--ar__50d13799-7bb7-4f9d-bb20-51dab6df6ac3_2.mp4',
  ladder: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_climbing_a_ladder_progressgrowth_100_pure_whit_4fc6107a-c510-4afc-ac20-a4cf12e8180b_3.mp4',
  chin: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_scratching_his_chin_deep_in_thought_100_pure_w_9e857f88-67b4-4496-9988-57dd621c97fe_3.mp4',
  weighing: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_weighing_options_scales_in_hands_100_pure_whit_8cbe7780-615e-48f5-aafe-2184114c1b33_2.mp4',
  strategy: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_drawing_a_strategy_whiteboardplanning_100_pure_95302861-8c44-460f-bcd1-7faa302067c4_3.mp4',
  calculating: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_calculating_numbers_with_calculator_100_pure_w_b930553b-32c0-4367-bcc5-c1b2c51a9318_2.mp4',
  secret: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_whispering_a_secret_hand_cupped_to_mouth_--ar__972dd80b-da4e-481d-aedc-bbcfdfb88716_3.mp4',
  megaphone: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_making_an_announcement_megaphoneloudspeaker_10_c6bff133-0cee-4c7d-9c1c-32035a52aa82_0.mp4',
  nodding: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_nodding_in_agreement_approving_nod_100_pure_wh_be253664-9147-4cef-ae06-aa315b9f0ff5_1.mp4',
  listening: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_listening_carefully_hand_cupped_to_ear_100_pur_01938e87-bc4d-4e54-8675-cf6bdcd739c2_3.mp4',
  sharing: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_sharing_with_a_friend_two_monkeys_one_explaini_b30f53d7-8f44-4b0a-8c27-ad2e11f08a64_1.mp4'
};

// Keyword matching for each video
const videoKeywords = {
  lightbulb: ['discover', 'realize', 'insight', 'understand', 'learn', 'aha', 'eureka', 'click', 'suddenly', 'revelation'],
  connecting: ['pattern', 'framework', 'system', 'connect', 'relate', 'link', 'relationship', 'together', 'combine'],
  reading: ['research', 'study', 'book', 'read', 'analyze', 'review', 'literature', 'academic', 'scientific'],
  notes: ['important', 'remember', 'note', 'key point', 'takeaway', 'write down', 'capture', 'record'],
  data: ['data', 'stats', 'statistic', 'numbers', 'metric', 'percentage', 'chart', 'graph', 'analytics'],
  redflag: ['warning', 'danger', 'mistake', 'avoid', 'never', 'red flag', 'caution', 'beware', 'alert'],
  facepalm: ['error', 'wrong', 'fail', 'mistake', 'embarrass', 'stupid', 'dumb', 'obvious', 'amateur'],
  shakingno: ["don't", 'never', 'avoid', 'stop', 'bad', 'wrong', 'no', 'not', 'refuse'],
  scared: ['fear', 'risk', 'threat', 'danger', 'lose', 'scary', 'terrify', 'afraid', 'panic'],
  building: ['build', 'create', 'construct', 'make', 'develop', 'implement', 'assemble', 'craft'],
  typing: ['setup', 'configure', 'tool', 'app', 'software', 'system', 'install', 'code', 'tech'],
  chart: ['show', 'present', 'explain', 'chart', 'graph', 'visual', 'display', 'demonstrate'],
  magnifying: ['investigate', 'deep', 'analyze', 'examine', 'look', 'detail', 'scrutinize', 'inspect', 'dig'],
  ladder: ['grow', 'scale', 'progress', 'improve', 'advance', 'level up', 'climb', 'rise', 'ascend'],
  chin: ['think', 'consider', 'decide', 'choice', 'option', 'whether', 'ponder', 'contemplate', 'wonder'],
  weighing: ['compare', 'vs', 'versus', 'trade-off', 'balance', 'choose', 'weigh', 'pros cons', 'either'],
  strategy: ['plan', 'strategy', 'roadmap', 'steps', 'framework', 'approach', 'blueprint', 'method'],
  calculating: ['calculate', 'roi', 'cost', 'revenue', 'profit', 'math', 'number', 'formula', 'equation'],
  secret: ['secret', 'insider', 'tip', 'trick', 'hack', 'hidden', 'unknown', 'reveal', 'exclusive'],
  megaphone: ['announce', 'important', 'attention', 'listen', 'hear', 'loud', 'broadcast', 'declare'],
  nodding: ['agree', 'yes', 'correct', 'right', 'exactly', 'true', 'confirm', 'validate', 'approve'],
  listening: ['listen', 'feedback', 'customer', 'voice', 'hear', 'say', 'told', 'input', 'response'],
  sharing: ['share', 'friend', 'tell', 'recommend', 'testimonial', 'word of mouth', 'refer', 'spread']
};

// Slide types to skip
const skipTypes = ['welcome', 'quiz', 'completion'];

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Processing ${folders.length} lessons...\n`);

let totalPlacements = 0;
let lessonsModified = 0;
const placements = {};

// Track placement counts per video
Object.keys(videos).forEach(v => placements[v] = 0);

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');
  let modified = false;
  let lessonPlacements = 0;

  // Find the slides array
  const slidesMatch = content.match(/const slides = \[([\s\S]*?)\];/);
  if (!slidesMatch) continue;

  let slidesContent = slidesMatch[1];

  // Find each slide object
  const slideRegex = /\{\s*type:\s*['"](\w+)['"]/g;
  let match;
  let slidePositions = [];

  while ((match = slideRegex.exec(slidesContent)) !== null) {
    slidePositions.push({
      type: match[1],
      index: match.index,
      fullMatch: match[0]
    });
  }

  // Process each slide (in reverse to preserve positions)
  for (let i = slidePositions.length - 1; i >= 0; i--) {
    const slide = slidePositions[i];

    // Skip excluded types
    if (skipTypes.includes(slide.type)) continue;

    // Find the end of this slide object
    let braceCount = 0;
    let slideStart = slidesMatch.index + 'const slides = ['.length + slide.index;
    let slideEnd = slideStart;
    let started = false;

    for (let j = slideStart; j < content.length; j++) {
      if (content[j] === '{') {
        braceCount++;
        started = true;
      } else if (content[j] === '}') {
        braceCount--;
        if (started && braceCount === 0) {
          slideEnd = j;
          break;
        }
      }
    }

    const slideText = content.substring(slideStart, slideEnd + 1);

    // Skip if already has characterVideo
    if (slideText.includes('characterVideo')) continue;

    // Skip if has both brandImage and personImage
    if (slideText.includes('brandImage') && slideText.includes('personImage')) continue;

    // Determine position based on existing images
    let position = Math.random() > 0.5 ? 'left' : 'right';
    if (slideText.includes('brandImage') || slideText.includes('personImage')) {
      position = 'left'; // Opposite of images which are on right
    }

    // Get slide content for keyword matching
    const slideContentLower = slideText.toLowerCase();

    // Find best matching video
    let bestVideo = null;
    let bestScore = 0;

    for (const [videoName, keywords] of Object.entries(videoKeywords)) {
      let score = 0;
      for (const keyword of keywords) {
        const regex = new RegExp(keyword, 'gi');
        const matches = slideContentLower.match(regex);
        if (matches) {
          score += matches.length;
        }
      }

      // Require at least 2 keyword matches for moderate relevance
      if (score >= 2 && score > bestScore) {
        bestScore = score;
        bestVideo = videoName;
      }
    }

    // Only add if we found a relevant video
    if (bestVideo && bestScore >= 2) {
      // Limit placements per video to avoid overuse
      if (placements[bestVideo] >= 15) continue;

      // Find position to insert (before closing brace)
      const insertPos = slideEnd;
      const videoUrl = videos[bestVideo];

      const insertion = `, characterVideo: '${videoUrl}', characterPosition: '${position}'`;

      content = content.substring(0, insertPos) + insertion + content.substring(insertPos);

      placements[bestVideo]++;
      totalPlacements++;
      lessonPlacements++;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    lessonsModified++;
    if (lessonPlacements > 0) {
      console.log(`✅ ${folder}: ${lessonPlacements} video(s) added`);
    }
  }
}

console.log('\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Total placements: ${totalPlacements}`);
console.log(`Lessons modified: ${lessonsModified}`);
console.log('\nPlacements by video:');
for (const [video, count] of Object.entries(placements)) {
  if (count > 0) {
    console.log(`  ${video}: ${count}`);
  }
}
