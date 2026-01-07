const fs = require('fs');

const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/shape-psychology/lesson.html';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// Replace the problematic Porsche URL with a simpler one
const oldUrl = "https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Porsche_Logo%20(1).svg";
const newUrl = "https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Porsche_Logo%20(1).svg".replace('%20(1)', '');

// Actually, let's just remove the brand for now and check if that's the issue
// First let's just see what's in the file
console.log('Checking if old URL exists:', content.includes(oldUrl));
console.log('Checking brandImage pattern:', content.includes("brandImage: 'https"));

// Remove the Porsche brandImage for now to test
const hookWithBrand = /(\{ type: 'hook'[^}]+), brandImage: '[^']+', brandName: 'Porsche' \}/;
const hookMatch = content.match(hookWithBrand);
if (hookMatch) {
  console.log('Found hook with brand:', hookMatch[0].slice(-100));
  // Replace with version without brand
  content = content.replace(hookWithBrand, "$1 }");
  fs.writeFileSync(path, content.replace(/\n/g, '\r\n'));
  console.log('Removed Porsche brand temporarily');
}
