const fs = require('fs');

const lessons = [
  {
    path: 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/gucci-short-termism/lesson.html',
    brand: 'Gucci',
    brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/gucci-logo-png_seeklogo-64069.png',
    hookSearch: "The luxury giant." // End of hook subtext
  },
  {
    path: 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/forty-million-mistake/lesson.html',
    brand: 'Coca-Cola',
    brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/KO-b23a2a5e.png',
    hookSearch: null // Need to check the actual hook ending
  },
  {
    path: 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/biz-starbucks-ltv-secret/lesson.html',
    brand: 'Starbucks',
    brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Starbucks_Corporation_Logo_2011.svg.png',
    hookSearch: null // Need to check the actual hook ending
  },
  {
    path: 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/gillette-model/lesson.html',
    brand: 'Dollar Shave Club',
    brandImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dollar-Shave-Club.webp',
    hookSearch: "before subscriptions existed.' }" // End of hook
  }
];

// First, let's find the actual hook endings for each lesson
lessons.forEach(lesson => {
  if (!fs.existsSync(lesson.path)) {
    console.log(`File not found: ${lesson.path}`);
    return;
  }

  let content = fs.readFileSync(lesson.path, 'utf8').replace(/\r\n/g, '\n');

  // Check if already has brandImage in hook
  if (content.includes("type: 'hook'") && content.match(/type: 'hook'[^}]*brandImage/)) {
    console.log(`${lesson.brand}: Already has brandImage in hook`);
    return;
  }

  // Find the hook slide
  const hookMatch = content.match(/\{ type: 'hook'[^}]+\}/);
  if (hookMatch) {
    const hookEnding = hookMatch[0].slice(-80);
    console.log(`${lesson.brand}: Hook ending is: ...${hookEnding}`);
  } else {
    console.log(`${lesson.brand}: No hook slide found`);
  }
});
