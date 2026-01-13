const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

function processLessonFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const folderName = path.basename(path.dirname(filePath));

    // Check if already has admin button in slide rendering
    if (content.includes('<AdminSlideReportButton slideIndex={currentSlide}')) {
      console.log(`  [SKIP] Already has slide button: ${folderName}`);
      return false;
    }

    // Check if has the AdminSlideReportButton component defined
    if (!content.includes('AdminSlideReportButton')) {
      console.log(`  [WARN] No AdminSlideReportButton component: ${folderName}`);
      return false;
    }

    // Find the motion.div that renders slides and add the button
    // Pattern: {renderSlide(slides[currentSlide])}
    //        </motion.div>

    // We need to add the button after renderSlide but before closing motion.div
    const renderSlidePattern = /(\{renderSlide\(slides\[currentSlide\]\)\})\s*(<\/motion\.div>)/;

    if (renderSlidePattern.test(content)) {
      content = content.replace(
        renderSlidePattern,
        '$1\n                <AdminSlideReportButton slideIndex={currentSlide} slideType={slides[currentSlide].type} />\n              $2'
      );

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  [OK] Added slide button: ${folderName}`);
      return true;
    } else {
      console.log(`  [WARN] Could not find renderSlide pattern: ${folderName}`);
      return false;
    }
  } catch (err) {
    console.error(`  [ERROR] ${path.basename(path.dirname(filePath))}: ${err.message}`);
    return false;
  }
}

function processAllLessons() {
  console.log('Adding admin report button to all lesson slides...\n');

  const lessonFolders = fs.readdirSync(lessonsDir).filter(f => {
    const stat = fs.statSync(path.join(lessonsDir, f));
    return stat.isDirectory() && f !== 'shared';
  });

  let updated = 0;
  let skipped = 0;
  let warnings = 0;

  for (const folder of lessonFolders) {
    const lessonFile = path.join(lessonsDir, folder, 'lesson.html');
    if (fs.existsSync(lessonFile)) {
      const result = processLessonFile(lessonFile);
      if (result === true) updated++;
      else if (result === false) {
        // Check if it was skipped or warned
        const content = fs.readFileSync(lessonFile, 'utf8');
        if (content.includes('<AdminSlideReportButton slideIndex={currentSlide}')) {
          skipped++;
        } else {
          warnings++;
        }
      }
    } else {
      console.log(`  [MISS] No lesson.html: ${folder}`);
      warnings++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}, Warnings: ${warnings}`);
}

processAllLessons();
