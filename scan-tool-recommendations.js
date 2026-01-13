const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, 'genrok-app/public/lessons');

// Patterns to search for tool recommendations
const patterns = {
  toolName: /toolName:\s*['"`]([^'"`]+)['"`]/g,
  toolUrl: /toolUrl:\s*['"`]([^'"`]+)['"`]/g,
  ctaUrl: /ctaUrl:\s*['"`]([^'"`]+)['"`]/g,
  ctaText: /ctaText:\s*['"`]([^'"`]+)['"`]/g,
  sourcesBlock: /sources:\s*\[([\s\S]*?)\]/g,
  sourceUrl: /url:\s*['"`](https?:\/\/[^'"`]+)['"`]/g,
  sourceName: /name:\s*['"`]([^'"`]+)['"`]/g,
  implementationType: /type:\s*['"`]implementation['"`]/g,
  toolSlideType: /type:\s*['"`]tool['"`]/gi,
  externalLinks: /href=['"`](https?:\/\/(?!quantum-scale)[^'"`]+)['"`]/g,
  affiliateLinks: /affiliate|ref=|mref=|partner|utm_/gi,
};

function extractMatches(content, regex) {
  const matches = [];
  let match;
  const clonedRegex = new RegExp(regex.source, regex.flags);
  while ((match = clonedRegex.exec(content)) !== null) {
    matches.push(match[1] || match[0]);
  }
  return matches;
}

function extractSourcesFromBlock(content) {
  const sources = [];
  const sourcesBlockMatch = content.match(/sources:\s*\[([\s\S]*?)\]/);
  if (sourcesBlockMatch) {
    const block = sourcesBlockMatch[1];
    // Extract individual source objects
    const sourceObjects = block.match(/\{[^}]+\}/g) || [];
    for (const obj of sourceObjects) {
      const nameMatch = obj.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const urlMatch = obj.match(/url:\s*['"`]([^'"`]+)['"`]/);
      if (nameMatch || urlMatch) {
        sources.push({
          name: nameMatch ? nameMatch[1] : 'Unknown',
          url: urlMatch ? urlMatch[1] : null
        });
      }
    }
  }
  return sources;
}

function scanLesson(lessonPath) {
  const content = fs.readFileSync(lessonPath, 'utf8');
  const lessonName = path.basename(path.dirname(lessonPath));

  const result = {
    name: lessonName,
    hasTools: false,
    tools: [],
    toolNames: extractMatches(content, patterns.toolName),
    toolUrls: extractMatches(content, patterns.toolUrl),
    ctaUrls: extractMatches(content, patterns.ctaUrl),
    ctaTexts: extractMatches(content, patterns.ctaText),
    sources: extractSourcesFromBlock(content),
    hasImplementationSlide: patterns.implementationType.test(content),
    hasToolSlide: patterns.toolSlideType.test(content),
    externalLinks: [],
    hasAffiliateLinks: patterns.affiliateLinks.test(content),
  };

  // Reset regex lastIndex
  patterns.implementationType.lastIndex = 0;
  patterns.toolSlideType.lastIndex = 0;
  patterns.affiliateLinks.lastIndex = 0;

  // Extract external links (excluding common assets)
  const allExternalLinks = extractMatches(content, patterns.externalLinks);
  result.externalLinks = allExternalLinks.filter(link =>
    !link.includes('fonts.googleapis.com') &&
    !link.includes('fonts.gstatic.com') &&
    !link.includes('cdnjs.cloudflare.com') &&
    !link.includes('unpkg.com') &&
    !link.includes('cdn.') &&
    !link.includes('.svg') &&
    !link.includes('.png') &&
    !link.includes('.jpg') &&
    !link.includes('.gif') &&
    !link.includes('.ico')
  );

  // Determine if lesson has tools
  result.hasTools =
    result.toolNames.length > 0 ||
    result.toolUrls.length > 0 ||
    result.ctaUrls.length > 0 ||
    result.sources.length > 0 ||
    result.hasToolSlide ||
    (result.hasImplementationSlide && result.externalLinks.length > 0);

  // Compile tool info
  if (result.toolNames.length > 0) {
    for (let i = 0; i < result.toolNames.length; i++) {
      result.tools.push({
        name: result.toolNames[i],
        url: result.toolUrls[i] || null,
        type: 'toolName property'
      });
    }
  }

  if (result.sources.length > 0) {
    for (const source of result.sources) {
      if (!result.tools.some(t => t.name === source.name)) {
        result.tools.push({
          name: source.name,
          url: source.url,
          type: 'sources array'
        });
      }
    }
  }

  if (result.ctaUrls.length > 0) {
    for (let i = 0; i < result.ctaUrls.length; i++) {
      result.tools.push({
        name: result.ctaTexts[i] || 'CTA Link',
        url: result.ctaUrls[i],
        type: 'CTA slide'
      });
    }
  }

  return result;
}

function generateReport(results) {
  const withTools = results.filter(r => r.hasTools);
  const withoutTools = results.filter(r => !r.hasTools);

  let report = `# Interactive Lessons Tool Recommendations Documentation

Generated: ${new Date().toISOString().split('T')[0]}
Total Lessons Scanned: ${results.length}

---

## Summary

| Category | Count |
|----------|-------|
| Lessons WITH Tool Recommendations | ${withTools.length} |
| Lessons WITHOUT Tool Recommendations | ${withoutTools.length} |
| Total Lessons | ${results.length} |

---

## Lessons WITH Tool Recommendations (${withTools.length})

`;

  // Sort by number of tools
  withTools.sort((a, b) => b.tools.length - a.tools.length);

  for (const lesson of withTools) {
    report += `### ${lesson.name}\n\n`;

    if (lesson.tools.length > 0) {
      report += `**Tools/Links:**\n`;
      for (const tool of lesson.tools) {
        report += `- **${tool.name}**`;
        if (tool.url) {
          report += ` - [${tool.url.substring(0, 60)}${tool.url.length > 60 ? '...' : ''}](${tool.url})`;
        }
        report += ` *(${tool.type})*\n`;
      }
    }

    if (lesson.hasImplementationSlide) {
      report += `- Has Implementation Slide\n`;
    }

    if (lesson.hasToolSlide) {
      report += `- Has Tool Slide\n`;
    }

    if (lesson.hasAffiliateLinks) {
      report += `- Contains Affiliate Links\n`;
    }

    if (lesson.externalLinks.length > 0 && lesson.tools.length === 0) {
      report += `**External Links:**\n`;
      const uniqueLinks = [...new Set(lesson.externalLinks)].slice(0, 5);
      for (const link of uniqueLinks) {
        report += `- ${link}\n`;
      }
      if (lesson.externalLinks.length > 5) {
        report += `- ... and ${lesson.externalLinks.length - 5} more\n`;
      }
    }

    report += `\n`;
  }

  report += `---

## Lessons WITHOUT Tool Recommendations (${withoutTools.length})

`;

  // Sort alphabetically
  withoutTools.sort((a, b) => a.name.localeCompare(b.name));

  // Group into columns for readability
  const cols = 3;
  const perCol = Math.ceil(withoutTools.length / cols);

  report += `| Lesson Name | Lesson Name | Lesson Name |\n`;
  report += `|-------------|-------------|-------------|\n`;

  for (let i = 0; i < perCol; i++) {
    const col1 = withoutTools[i]?.name || '';
    const col2 = withoutTools[i + perCol]?.name || '';
    const col3 = withoutTools[i + perCol * 2]?.name || '';
    report += `| ${col1} | ${col2} | ${col3} |\n`;
  }

  report += `\n---

## Tool Frequency Analysis

`;

  // Count tool mentions across all lessons
  const toolCounts = {};
  for (const lesson of withTools) {
    for (const tool of lesson.tools) {
      const name = tool.name.toLowerCase();
      if (!toolCounts[name]) {
        toolCounts[name] = { name: tool.name, count: 0, lessons: [], url: tool.url };
      }
      toolCounts[name].count++;
      toolCounts[name].lessons.push(lesson.name);
    }
  }

  const sortedTools = Object.values(toolCounts).sort((a, b) => b.count - a.count);

  if (sortedTools.length > 0) {
    report += `| Tool Name | Times Mentioned | Lessons |\n`;
    report += `|-----------|-----------------|----------|\n`;

    for (const tool of sortedTools.slice(0, 30)) {
      const lessonsStr = tool.lessons.slice(0, 3).join(', ') + (tool.lessons.length > 3 ? '...' : '');
      report += `| ${tool.name} | ${tool.count} | ${lessonsStr} |\n`;
    }
  }

  report += `\n---

## Detailed Data Export

### All Lessons with Tools (JSON-like format)

\`\`\`
`;

  for (const lesson of withTools) {
    report += `${lesson.name}:\n`;
    for (const tool of lesson.tools) {
      report += `  - ${tool.name}: ${tool.url || 'no url'}\n`;
    }
  }

  report += `\`\`\`

### All Lessons without Tools (list)

\`\`\`
${withoutTools.map(l => l.name).join('\n')}
\`\`\`

---

*Documentation auto-generated by scan-tool-recommendations.js*
`;

  return report;
}

// Main execution
console.log('Scanning lessons for tool recommendations...\n');

const lessonFolders = fs.readdirSync(lessonsDir).filter(f => {
  const lessonPath = path.join(lessonsDir, f, 'lesson.html');
  return fs.existsSync(lessonPath);
});

console.log(`Found ${lessonFolders.length} lessons to scan.\n`);

const results = [];
for (const folder of lessonFolders) {
  const lessonPath = path.join(lessonsDir, folder, 'lesson.html');
  try {
    const result = scanLesson(lessonPath);
    results.push(result);
    if (result.hasTools) {
      console.log(`✓ ${folder}: ${result.tools.length} tool(s) found`);
    }
  } catch (err) {
    console.error(`✗ Error scanning ${folder}: ${err.message}`);
  }
}

console.log('\n---\nGenerating report...\n');

const report = generateReport(results);
const outputPath = path.join(__dirname, 'LESSONS-TOOL-RECOMMENDATIONS.md');
fs.writeFileSync(outputPath, report);

console.log(`Report saved to: ${outputPath}`);
console.log(`\nSummary:`);
console.log(`  Total lessons: ${results.length}`);
console.log(`  With tools: ${results.filter(r => r.hasTools).length}`);
console.log(`  Without tools: ${results.filter(r => !r.hasTools).length}`);
