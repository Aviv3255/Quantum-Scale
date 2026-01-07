const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/src/data/articles.ts';
let content = fs.readFileSync(path, 'utf8');

// Fix all corrupted patterns - $12 became newline + }2
content = content.replace(/\$399 vs\s*\r?\n\s*\}2 knockoff/g, '$399 vs $12 knockoff');
content = content.replace(/for\s*\r?\n\s*\}2\?/g, 'for $12?');
content = content.replace(/\$0\.50 for\s*\r?\n\s*\}6/g, '$0.50 for $6');

// Also check for other patterns
content = content.replace(/\s*\r?\n\s*\}0K bag/g, '$20K bag');
content = content.replace(/\s*\r?\n\s*\}00 polo/g, '$200 polo');
content = content.replace(/\s*\r?\n\s*\}0,000 handbag/g, '$20,000 handbag');
content = content.replace(/\s*\r?\n\s*\}00 polo feels/g, '$200 polo feels');

fs.writeFileSync(path, content);
console.log('Fixed corrupted patterns');
