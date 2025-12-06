/**
 * Database Seed Script for Genrok
 *
 * This script seeds the Supabase database with initial content.
 * Run with: npx tsx scripts/seed-database.ts
 *
 * Prerequisites:
 * 1. Run the SQL migration in Supabase SQL Editor first
 * 2. Set SUPABASE_SERVICE_ROLE_KEY in your environment
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const dataDir = path.join(__dirname, '../../Quantum-Scale/data');

async function seedShopifyApps() {
  console.log('Seeding Shopify apps...');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'shopify-apps.json'), 'utf-8'));

  const apps = data.apps.map((app: any, index: number) => ({
    name: app.name,
    description: app.description,
    category: app.category,
    icon_url: app.logo,
    app_url: app.url,
    affiliate_url: app.url,
    discount: app.discount || null,
    is_featured: index < 5,
    order_index: index,
  }));

  const { error } = await supabase.from('shopify_apps').upsert(apps, { onConflict: 'name' });
  if (error) console.error('Error seeding shopify_apps:', error);
  else console.log(`✓ Seeded ${apps.length} Shopify apps`);
}

async function seedSecretApps() {
  console.log('Seeding secret apps...');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'secret-apps.json'), 'utf-8'));

  const apps = data.apps.map((app: any, index: number) => ({
    name: app.name,
    description: app.description,
    category: app.category,
    icon: app.logo,
    website_url: app.url,
    coupon_code: app.couponCode || null,
    features: app.testIdeas || app.surveyQuestions || [],
    order_index: index,
  }));

  const { error } = await supabase.from('secret_apps').upsert(apps, { onConflict: 'name' });
  if (error) console.error('Error seeding secret_apps:', error);
  else console.log(`✓ Seeded ${apps.length} secret apps`);
}

async function seedAITools() {
  console.log('Seeding AI tools...');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'ai-tools.json'), 'utf-8'));

  const tools = data.tools.map((tool: any, index: number) => ({
    name: tool.name,
    description: tool.description,
    category: tool.category,
    icon: tool.logo,
    website_url: tool.website,
    video_url: tool.videoUrl || null,
    features: tool.features || [],
    order_index: index,
  }));

  const { error } = await supabase.from('ai_tools').upsert(tools, { onConflict: 'name' });
  if (error) console.error('Error seeding ai_tools:', error);
  else console.log(`✓ Seeded ${tools.length} AI tools`);
}

async function seedABTestResults() {
  console.log('Seeding A/B test results...');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'ab-test-results.json'), 'utf-8'));

  const tests = data.tests.map((test: any, index: number) => ({
    title: test.title,
    description: test.description,
    category: test.category,
    control_image: test.controlImage,
    variant_image: test.variantImage,
    control_cvr: test.controlCvr,
    variant_cvr: test.variantCvr,
    lift_percentage: test.liftPercentage,
    sample_size: test.sampleSize,
    confidence_level: test.confidenceLevel,
    insight: test.insight,
    recommendation: test.recommendation,
    recommended_app: test.recommendedApp,
    recommended_app_url: test.recommendedAppUrl,
    order_index: index,
  }));

  const { error } = await supabase.from('ab_test_results').upsert(tests, { onConflict: 'title' });
  if (error) console.error('Error seeding ab_test_results:', error);
  else console.log(`✓ Seeded ${tests.length} A/B test results`);
}

async function seedWebInspiration() {
  console.log('Seeding web inspiration...');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'web-ui-inspiration.json'), 'utf-8'));

  const sites = data.sites.map((site: any, index: number) => ({
    name: site.name,
    description: site.description || '',
    category: site.category,
    image_url: site.imageUrl,
    website_url: site.url,
    tags: site.tags || [],
    is_featured: site.isFeatured || false,
    order_index: index,
  }));

  const { error } = await supabase.from('web_inspiration').upsert(sites, { onConflict: 'name' });
  if (error) console.error('Error seeding web_inspiration:', error);
  else console.log(`✓ Seeded ${sites.length} web inspiration sites`);
}

async function seedSectionsInspiration() {
  console.log('Seeding sections inspiration...');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'sections-inspiration.json'), 'utf-8'));

  const sections = data.sections.map((section: any, index: number) => ({
    name: section.name,
    description: section.description || '',
    category: section.category,
    image_url: section.imageUrl,
    source_url: section.sourceUrl || '',
    tags: section.tags || [],
    order_index: index,
  }));

  const { error } = await supabase.from('sections_inspiration').upsert(sections, { onConflict: 'name' });
  if (error) console.error('Error seeding sections_inspiration:', error);
  else console.log(`✓ Seeded ${sections.length} section inspirations`);
}

async function seedImageInspiration() {
  console.log('Seeding image inspiration...');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'image-inspiration.json'), 'utf-8'));

  const images: any[] = [];
  Object.entries(data.niches).forEach(([niche, imageList]: [string, any]) => {
    imageList.forEach((img: any, index: number) => {
      images.push({
        title: img.title || `${niche} Image ${index + 1}`,
        niche: niche,
        image_url: img.url || img.imageUrl,
        source_url: img.sourceUrl || '',
        tags: img.tags || [],
        order_index: index,
      });
    });
  });

  const { error } = await supabase.from('image_inspiration').insert(images);
  if (error) console.error('Error seeding image_inspiration:', error);
  else console.log(`✓ Seeded ${images.length} image inspirations`);
}

async function main() {
  console.log('🌱 Starting database seed...\n');

  try {
    await seedShopifyApps();
    await seedSecretApps();
    await seedAITools();
    await seedABTestResults();
    await seedWebInspiration();
    await seedSectionsInspiration();
    await seedImageInspiration();

    console.log('\n✅ Database seeding complete!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
