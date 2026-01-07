const fs = require('fs');

// Fix Porsche - shape-psychology
console.log('=== Fixing Porsche ===');
const porschePath = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/shape-psychology/lesson.html';
let porsContent = fs.readFileSync(porschePath, 'utf8').replace(/\r\n/g, '\n');
const porscheUrl = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Porsche_Logo%20(1).svg';
const porscheSearch = "It\\'s neuroscience.' }";
const porscheReplace = "It\\'s neuroscience.', brandImage: '" + porscheUrl + "', brandName: 'Porsche' }";

if (porsContent.includes(porscheSearch) && !porsContent.includes("brandImage: '" + porscheUrl)) {
  porsContent = porsContent.replace(porscheSearch, porscheReplace);
  console.log('Added Porsche brandImage');
}

// Update HookSlide for shape-psychology
const oldHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
          <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
      </div>
    );`;

const newHookSlide = `const HookSlide = ({ data }) => (
      <div className="h-full relative overflow-hidden">
        <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl mx-auto slide-scroll overflow-y-auto py-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: \`rgba(var(--accent-rgb), 0.1)\`, color: 'var(--accent)' }}>The Hook</span>
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl text-black leading-tight">{data.headline}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-neutral-600 leading-relaxed">{data.subtext}</motion.p>
        </div>
        {data.brandImage && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 right-0 z-0 pointer-events-none" style={{ height: '30%', maxHeight: '200px', marginRight: '3%', marginBottom: '5%' }}>
            <img src={data.brandImage} alt={data.brandName || ''} className="h-full w-auto object-contain" style={{ opacity: 0.2 }} />
          </motion.div>
        )}
      </div>
    );`;

if (porsContent.includes(oldHookSlide)) {
  porsContent = porsContent.replace(oldHookSlide, newHookSlide);
  console.log('Updated HookSlide for Porsche');
}
fs.writeFileSync(porschePath, porsContent.replace(/\n/g, '\r\n'));
console.log('Saved Porsche\n');

// Fix Spotify - familiar-surprise-secret
console.log('=== Fixing Spotify HookSlide ===');
const spotifyPath = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/familiar-surprise-secret/lesson.html';
let spotContent = fs.readFileSync(spotifyPath, 'utf8').replace(/\r\n/g, '\n');
if (spotContent.includes(oldHookSlide)) {
  spotContent = spotContent.replace(oldHookSlide, newHookSlide);
  fs.writeFileSync(spotifyPath, spotContent.replace(/\n/g, '\r\n'));
  console.log('Updated HookSlide for Spotify\n');
} else {
  console.log('HookSlide pattern not found for Spotify\n');
}

// Fix Apple - us-vs-them
console.log('=== Fixing us-vs-them HookSlide ===');
const usvsPath = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/us-vs-them/lesson.html';
let usvsContent = fs.readFileSync(usvsPath, 'utf8').replace(/\r\n/g, '\n');
if (usvsContent.includes(oldHookSlide)) {
  usvsContent = usvsContent.replace(oldHookSlide, newHookSlide);
  fs.writeFileSync(usvsPath, usvsContent.replace(/\n/g, '\r\n'));
  console.log('Updated HookSlide for us-vs-them\n');
} else {
  console.log('HookSlide pattern not found for us-vs-them\n');
}

console.log('Done!');
