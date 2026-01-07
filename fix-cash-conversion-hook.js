const fs = require('fs');

const path = 'C:/Projects/Quantum-Scale/genrok-app/public/lessons/biz-cash-conversion/lesson.html';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

const oodieUrl = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oodie-Logo-RGB-R.webp';

// Check if hook already has brandImage
if (content.includes("personName: 'Davie Fogarty' }") && !content.includes("personName: 'Davie Fogarty', brandImage")) {
  content = content.replace(
    "personName: 'Davie Fogarty' }",
    "personName: 'Davie Fogarty', brandImage: '" + oodieUrl + "', brandName: 'The Oodie' }"
  );
  fs.writeFileSync(path, content.replace(/\n/g, '\r\n'));
  console.log('Added Oodie brandImage to biz-cash-conversion hook slide');
} else {
  console.log('Pattern not found or brandImage already exists in hook');
}
