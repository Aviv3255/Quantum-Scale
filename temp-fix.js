const fs = require('fs');
const path = 'genrok-app/src/data/articles.ts';
let content = fs.readFileSync(path, 'utf-8');
const lines = content.split('
');
lines[6263] = "      intro: 'Create a battlefield where the giants' money is worthless.',".replace("giants'", "giants\'");
lines[6278] = "      intro: 'Enter markets where customers feel the pain but don't know the solution exists.',".replace("don't", "don\'"+"t");
fs.writeFileSync(path, lines.join('
'));
console.log('Done');
