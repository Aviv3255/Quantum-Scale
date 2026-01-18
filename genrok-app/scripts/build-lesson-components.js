/**
 * Build script for Lesson Components Bundle
 *
 * This script bundles all lesson components from src/components/lessons/
 * into a single JavaScript file that can be included in HTML lessons.
 *
 * Components are exposed via window.LessonComponents
 *
 * Usage:
 *   node scripts/build-lesson-components.js
 *
 * Output:
 *   public/lessons/shared/components.bundle.js
 */

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');
const ENTRY_FILE = path.join(ROOT_DIR, 'scripts', 'lesson-components-entry.tsx');
const OUTPUT_FILE = path.join(ROOT_DIR, 'public', 'lessons', 'shared', 'components.bundle.js');

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function build() {
  console.log('Building lesson components bundle...\n');

  try {
    const result = await esbuild.build({
      entryPoints: [ENTRY_FILE],
      bundle: true,
      outfile: OUTPUT_FILE,
      format: 'iife',
      globalName: 'LessonComponentsBundle',
      platform: 'browser',
      target: ['es2020'],
      minify: false, // Keep readable for debugging
      sourcemap: false,
      jsx: 'automatic',
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
      },
      // Don't externalize - bundle everything for standalone use in HTML lessons
      // React/ReactDOM/framer-motion are loaded via CDN and we'll alias them
      alias: {
        'react': 'react',
        'react-dom': 'react-dom',
      },
      inject: [path.join(__dirname, 'globals-shim.js')],
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      footer: {
        js: `
// Expose components globally for HTML lessons
if (typeof window !== 'undefined') {
  window.LessonComponents = LessonComponentsBundle;
  console.log('[LessonComponents] Bundle loaded. Available components:', Object.keys(window.LessonComponents).filter(k => k !== 'default'));
}
`,
      },
    });

    const stats = fs.statSync(OUTPUT_FILE);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`Bundle created successfully!`);
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log(`Size: ${sizeKB} KB\n`);

    if (result.warnings.length > 0) {
      console.log('Warnings:');
      result.warnings.forEach(w => console.log(`  - ${w.text}`));
    }

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
