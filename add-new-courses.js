const fs = require('fs');
const path = require('path');

// Course definitions
const newCourses = [
  {
    slug: 'meta-headlines',
    title: '85 Meta Ad Headlines & Hooks',
    subtitle: 'Proven Headlines That Stop The Scroll',
    description: 'Get 85 battle-tested headlines and hooks that have generated millions in ad revenue. Copy, paste, and watch your CTR skyrocket.',
    price: 10,
    originalPrice: 97,
    image: 'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_48.jpg?v=1757233247',
    color: '#FF7A00',
    htmlFile: 'meta-headlines.html'
  },
  {
    slug: 'offer-workshop',
    title: 'Offer Workshop: Irresistible Ecom Offer',
    subtitle: 'Create Offers Your Customers Cannot Refuse',
    description: 'Learn the exact framework to craft irresistible eCommerce offers that convert browsers into buyers and maximize your average order value.',
    price: 10,
    originalPrice: 197,
    image: 'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_50.jpg?v=1757233399',
    color: '#1e9413',
    htmlFile: 'offer-workshop.html'
  },
  {
    slug: '20-laws',
    title: 'The 20 Laws to Sell Anything to Anyone',
    subtitle: 'Timeless Principles of Persuasion',
    description: 'Master the 20 fundamental laws of selling that have stood the test of time. Apply these principles to any product, any market, any audience.',
    price: 10,
    originalPrice: 197,
    image: 'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_64.jpg?v=1760881483',
    color: '#4A86C5',
    htmlFile: '20-laws.html'
  },
  {
    slug: 'ugly-ads',
    title: 'How to Build Simple & Ugly Meta Ads That Work',
    subtitle: 'Stop Overthinking, Start Converting',
    description: 'Discover why simple, "ugly" ads often outperform polished creatives. Learn to create high-converting Meta ads in minutes, not hours.',
    price: 10,
    originalPrice: 97,
    image: 'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_51.jpg?v=1757233270',
    color: '#7F8FA6',
    htmlFile: 'ugly-ads.html'
  }
];

// 1. Add courses to courses.ts
console.log('Adding courses to courses.ts...');
const coursesPath = path.join(__dirname, 'genrok-app/src/data/courses.ts');
let coursesContent = fs.readFileSync(coursesPath, 'utf8');

// Find the position before the closing }; of coursesData
const coursesDataEnd = coursesContent.indexOf('export const getCourseBySlug');
const insertPosition = coursesContent.lastIndexOf('}', coursesDataEnd - 1);

// Build the new course entries
let newCoursesEntries = '';
for (const course of newCourses) {
  newCoursesEntries += `,

  "${course.slug}": {
    slug: "${course.slug}",
    title: "${course.title}",
    subtitle: "${course.subtitle}",
    description: "${course.description}",
    price: ${course.price},
    originalPrice: ${course.originalPrice},
    image: "${course.image}",
    stats: [
      { value: "5", label: "modules" },
      { value: "2+", label: "hours" },
      { value: "20+", label: "templates" }
    ],
    longDescription: \`${course.description}

This course gives you everything you need to start seeing results immediately. No fluff, no theory - just actionable strategies that work.\`,
    modules: [
      {
        title: "Core Framework",
        description: "Learn the foundational principles that make this system work."
      },
      {
        title: "Implementation Guide",
        description: "Step-by-step instructions to apply what you've learned."
      },
      {
        title: "Advanced Strategies",
        description: "Take your results to the next level with advanced techniques."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "How quickly can I start using this?",
        answer: "Immediately. After purchase, you get instant access to everything. You can start implementing within minutes."
      },
      {
        question: "Will this work for my niche?",
        answer: "Yes. These are universal frameworks based on proven principles that work across all niches and markets."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value, just reach out and we'll refund you - no questions asked."
      }
    ]
  }`;
}

// Insert the new courses before the closing brace
coursesContent = coursesContent.slice(0, insertPosition) + newCoursesEntries + coursesContent.slice(insertPosition);
fs.writeFileSync(coursesPath, coursesContent);
console.log('✅ Added 4 courses to courses.ts');

// 2. Add HTML blocks to course-html-blocks.ts
console.log('Adding HTML blocks to course-html-blocks.ts...');
const blocksPath = path.join(__dirname, 'genrok-app/src/data/course-html-blocks.ts');
let blocksContent = fs.readFileSync(blocksPath, 'utf8');

// Find the position before the closing }; of courseHTMLBlocks
const helperFuncStart = blocksContent.indexOf('// Helper function to get HTML');
const blocksInsertPosition = blocksContent.lastIndexOf('};', helperFuncStart);

// Extract content from HTML files
function extractHTMLContent(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');

  // Get all style tags content
  const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  let styles = styleMatches.map(s => s.replace(/<\/?style[^>]*>/gi, '')).join('\n');

  // Get all body content
  let bodyContent = '';
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/gi);
  if (bodyMatch) {
    bodyContent = bodyMatch.map(b => b.replace(/<\/?body[^>]*>/gi, '')).join('\n');
  }

  // Remove script tags
  bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  let result = '';
  if (styles.trim()) {
    result += '<style>\n' + styles + '\n</style>\n\n';
  }
  result += bodyContent.trim();

  return result;
}

let newBlocksEntries = '';
for (const course of newCourses) {
  console.log(`  Processing ${course.slug}...`);
  const htmlPath = path.join(__dirname, course.htmlFile);
  const content = extractHTMLContent(htmlPath);

  // Escape backticks and dollar signs
  const escapedContent = content
    .replace(/\`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  const title = course.slug.toUpperCase().replace(/-/g, ' ');

  newBlocksEntries += `

  // ==================== ${title} ====================
  '${course.slug}': \`
${escapedContent}
  \`,`;
}

// Insert before the closing };
blocksContent = blocksContent.slice(0, blocksInsertPosition) + newBlocksEntries + '\n' + blocksContent.slice(blocksInsertPosition);
fs.writeFileSync(blocksPath, blocksContent);
console.log('✅ Added 4 HTML blocks to course-html-blocks.ts');

console.log('\n✅ All courses added successfully!');
console.log('Courses: meta-headlines, offer-workshop, 20-laws, ugly-ads');
