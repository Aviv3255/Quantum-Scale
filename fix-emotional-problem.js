const fs = require('fs');

const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/emotional-problem/lesson.html';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

const oodieUrl = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oodie-Logo-RGB-R.webp';

// The actual pattern in the file - with escaped apostrophe
const hookEnd = "That\\'s what people pay for.' }";
const newHookEnd = "That\\'s what people pay for.', brandImage: '" + oodieUrl + "', brandName: 'The Oodie' }";

if (content.includes(hookEnd) && !content.includes("brandImage: '" + oodieUrl)) {
  content = content.replace(hookEnd, newHookEnd);
  fs.writeFileSync(path, content.replace(/\n/g, '\r\n'));
  console.log('Added Oodie brandImage to emotional-problem hook data');
} else if (content.includes("brandImage: '" + oodieUrl)) {
  console.log('Oodie brandImage already exists');
} else {
  console.log('Pattern not found');
}
