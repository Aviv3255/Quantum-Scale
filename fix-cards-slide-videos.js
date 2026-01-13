const fs = require('fs');
const path = require('path');

const lessonsDir = './genrok-app/public/lessons';

// Get all lesson folders
const folders = fs.readdirSync(lessonsDir).filter(f =>
  fs.statSync(path.join(lessonsDir, f)).isDirectory()
);

console.log(`Adding character video support to CardsSlide in ${folders.length} lessons...\n`);

let fixedCount = 0;

// Character video rendering code to insert
const videoRenderCode = `
        {data.characterVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={\`absolute bottom-0 \${data.characterPosition === 'left' ? 'left-4' : 'right-4'} z-0 pointer-events-none\`}
            style={{ height: '25%', maxHeight: '180px', marginBottom: '3%' }}>
            <video autoPlay loop muted playsInline className="h-full w-auto object-contain object-bottom">
              <source src={data.characterVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}`;

for (const folder of folders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  if (!fs.existsSync(lessonPath)) continue;

  let content = fs.readFileSync(lessonPath, 'utf8');

  // Only fix lessons that have characterVideo data
  if (!content.includes('characterVideo:')) continue;

  let modified = false;

  // Fix CardsSlide - add relative and video rendering if not present
  if (content.includes('const CardsSlide')) {
    // Check if CardsSlide already has characterVideo rendering
    const cardsSlideStart = content.indexOf('const CardsSlide');
    const nextComponentStart = content.indexOf('const QuizSlide', cardsSlideStart);
    if (nextComponentStart === -1) continue;

    const cardsSlideSection = content.substring(cardsSlideStart, nextComponentStart);

    // Check if it already has characterVideo support
    if (!cardsSlideSection.includes('data.characterVideo')) {
      // Find the pattern to replace - the closing </div> before );
      const oldCardsEnd = `        </div>
      </div>
    );

    const QuizSlide`;

      const newCardsEnd = `        </div>${videoRenderCode}
      </div>
    );

    const QuizSlide`;

      if (content.includes(oldCardsEnd)) {
        content = content.replace(oldCardsEnd, newCardsEnd);
        modified = true;
      }
    }

    // Also add relative positioning if not present
    const oldCardsDiv = 'const CardsSlide = ({ data }) => (\n      <div className="h-full flex flex-col justify-center';
    const newCardsDiv = 'const CardsSlide = ({ data }) => (\n      <div className="h-full relative flex flex-col justify-center';

    if (content.includes(oldCardsDiv) && !content.includes(newCardsDiv)) {
      content = content.replace(oldCardsDiv, newCardsDiv);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(lessonPath, content);
    fixedCount++;
    console.log(`Fixed CardsSlide in: ${folder}`);
  }
}

console.log(`\nFixed CardsSlide in ${fixedCount} lessons`);
