const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// The admin reporter code to inject into each lesson
const adminReporterCode = `
    // ============ ADMIN REPORTER SYSTEM ============
    // Per-slide bug reporting for admin users
    let __isAdmin = false;

    // Listen for admin status from parent
    window.addEventListener('message', function(e) {
      if (e.data?.type === 'ADMIN_STATUS') {
        __isAdmin = e.data.isAdmin;
      }
    });

    // Request admin status on load
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'CHECK_ADMIN_STATUS' }, '*');
    }

    // Admin Report Button Component
    const AdminSlideReportButton = ({ slideIndex, slideType }) => {
      if (!__isAdmin) return null;

      const handleReport = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (window.parent !== window) {
          window.parent.postMessage({
            type: 'ADMIN_REPORT_REQUEST',
            slideIndex: slideIndex,
            slideType: slideType,
            lessonSlug: LESSON_CONFIG.id,
            elementId: slideType + '-' + slideIndex
          }, '*');
        }
      };

      return (
        <button
          onClick={handleReport}
          title={\`Report issue on Slide \${slideIndex + 1} (\${slideType})\`}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            opacity: 0.6,
            transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/>
            <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/>
            <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/>
            <path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/>
            <path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/>
            <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/>
            <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>
          </svg>
        </button>
      );
    };
    // ============ END ADMIN REPORTER SYSTEM ============
`;

// The wrapper function that adds the report button to renderSlide
const renderSlideWrapper = `
    // Wrap renderSlide to add admin report button
    const originalRenderSlide = renderSlide;
    const renderSlide = (slide, index, ...args) => {
      const slideContent = originalRenderSlide(slide, index, ...args);
      if (!__isAdmin) return slideContent;

      return (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          {slideContent}
          <AdminSlideReportButton slideIndex={index} slideType={slide.type} />
        </div>
      );
    };
`;

function processLessonFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has admin reporter
    if (content.includes('ADMIN REPORTER SYSTEM')) {
      console.log(`  [SKIP] Already has admin reporter: ${path.basename(path.dirname(filePath))}`);
      return false;
    }

    // Find where to inject the admin reporter code (after LESSON_CONFIG definition)
    const lessonConfigMatch = content.match(/const LESSON_CONFIG = \{[\s\S]*?\};/);
    if (!lessonConfigMatch) {
      console.log(`  [WARN] No LESSON_CONFIG found: ${path.basename(path.dirname(filePath))}`);
      return false;
    }

    // Inject admin reporter code after LESSON_CONFIG
    const insertPos = lessonConfigMatch.index + lessonConfigMatch[0].length;
    content = content.slice(0, insertPos) + '\n' + adminReporterCode + content.slice(insertPos);

    // Find renderSlide function and wrap it
    // Look for "const renderSlide = " or "function renderSlide"
    if (content.includes('const renderSlide = ') || content.includes('function renderSlide')) {
      // Find where renderSlide is used (in the return statement)
      // We'll add the wrapper right after admin reporter code was inserted

      // Instead of wrapping, let's add the report button directly in the main App component
      // Find where slides are rendered and add the button

      // Actually, let's modify the approach - add button in each slide's outer div
      // This is simpler and more reliable
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  [OK] Updated: ${path.basename(path.dirname(filePath))}`);
    return true;
  } catch (err) {
    console.error(`  [ERROR] ${path.basename(path.dirname(filePath))}: ${err.message}`);
    return false;
  }
}

function processAllLessons() {
  console.log('Adding admin reporter to all lessons...\n');

  const lessonFolders = fs.readdirSync(lessonsDir).filter(f => {
    const stat = fs.statSync(path.join(lessonsDir, f));
    return stat.isDirectory() && f !== 'shared';
  });

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const folder of lessonFolders) {
    const lessonFile = path.join(lessonsDir, folder, 'lesson.html');
    if (fs.existsSync(lessonFile)) {
      const result = processLessonFile(lessonFile);
      if (result === true) updated++;
      else if (result === false) skipped++;
    } else {
      console.log(`  [MISS] No lesson.html: ${folder}`);
      errors++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`);
}

processAllLessons();
