const fs = require('fs');
const path = require('path');

// Find all lesson.html files
const lessonsDir = path.join(__dirname, 'genrok-app', 'public', 'lessons');

// Get all subdirectories in lessons folder
const lessonFolders = fs.readdirSync(lessonsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Build list of lesson.html files
const lessonFiles = lessonFolders
  .map(folder => path.join(lessonsDir, folder, 'lesson.html'))
  .filter(filePath => fs.existsSync(filePath));

console.log(`Found ${lessonFiles.length} lesson.html files to update...\n`);

let updatedCount = 0;
let errorCount = 0;

lessonFiles.forEach((filePath) => {
  try {
    const relativePath = path.relative(__dirname, filePath);
    console.log(`Processing: ${relativePath}`);

    let content = fs.readFileSync(filePath, 'utf8');

    // Step 1: Add defer attribute to all 5 CDN scripts
    const scriptsToDefer = [
      'https://cdn.tailwindcss.com',
      'https://unpkg.com/react@18',
      'https://unpkg.com/react-dom@18',
      'https://unpkg.com/@babel/standalone',
      'https://unpkg.com/framer-motion'
    ];

    scriptsToDefer.forEach((scriptUrl) => {
      // Match script tag with this URL that doesn't already have defer
      const regex = new RegExp(`<script\\s+src="${scriptUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*"(?!.*defer)([^>]*)>`, 'g');
      content = content.replace(regex, (match, rest) => {
        return match.replace('>', ' defer>');
      });
    });

    // Step 2: Add preconnect hints after the existing Google Fonts preconnect
    // Find the Google Fonts preconnect links
    const googleFontsPreconnect = /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/;

    if (googleFontsPreconnect.test(content)) {
      // Find the position after the gstatic preconnect (which comes after googleapis)
      const gstaticPreconnect = /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/;

      if (gstaticPreconnect.test(content)) {
        // Check if preconnects already exist
        const hasUnpkgPreconnect = content.includes('<link rel="preconnect" href="https://unpkg.com"');
        const hasCdnPreconnect = content.includes('<link rel="preconnect" href="https://cdn.tailwindcss.com"');
        const hasSupabasePreconnect = content.includes('<link rel="preconnect" href="https://pqvvrljykfvhpyvxmwzb.supabase.co"');

        if (!hasUnpkgPreconnect || !hasCdnPreconnect || !hasSupabasePreconnect) {
          const newPreconnects = [];

          if (!hasUnpkgPreconnect) {
            newPreconnects.push('    <link rel="preconnect" href="https://unpkg.com" crossorigin>');
          }
          if (!hasCdnPreconnect) {
            newPreconnects.push('    <link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>');
          }
          if (!hasSupabasePreconnect) {
            newPreconnects.push('    <link rel="preconnect" href="https://pqvvrljykfvhpyvxmwzb.supabase.co" crossorigin>');
          }

          // Insert after gstatic preconnect
          content = content.replace(
            gstaticPreconnect,
            match => match + '\n' + newPreconnects.join('\n')
          );
        }
      }
    }

    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`  ✓ Updated successfully\n`);

  } catch (error) {
    errorCount++;
    console.error(`  ✗ Error: ${error.message}\n`);
  }
});

console.log('='.repeat(60));
console.log(`Summary:`);
console.log(`  Total files found: ${lessonFiles.length}`);
console.log(`  Successfully updated: ${updatedCount}`);
console.log(`  Errors: ${errorCount}`);
console.log('='.repeat(60));
