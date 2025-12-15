-- Seed script to populate courses table with existing course data
-- Run this in Supabase SQL Editor after running the migration

-- Insert courses
INSERT INTO public.courses (slug, title, description, price, original_price, image_url, is_active)
VALUES
  (
    'subconscious-trap',
    'The Subconscious Trap',
    'A psychology-driven framework to increase conversions, boost AOV, and drive repeat purchases — without spending more on ads.',
    10.00,
    197.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_41.jpg?v=1757233340',
    true
  ),
  (
    'tiktok-shop-mastery',
    'TikTok Shop Mastery',
    'The complete blueprint to building a profitable TikTok Shop from scratch and scaling to $10K+ per month.',
    47.00,
    297.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_51.jpg?v=1757233340',
    true
  ),
  (
    'ai-automation',
    'AI Automation Systems',
    'Automate your eCommerce operations with AI. Save 20+ hours per week and scale without hiring.',
    67.00,
    397.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_56.jpg?v=1757233340',
    true
  ),
  (
    'facebook-ads',
    'Facebook Ads Accelerator',
    'Master Facebook Ads for eCommerce. From $0 to $100K/month in ad spend with profitable ROAS.',
    47.00,
    297.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_52.jpg?v=1757233340',
    true
  ),
  (
    'cro-secrets',
    'Conversion Rate Optimization',
    'Turn your existing traffic into more sales. Data-driven strategies to double your conversion rate.',
    37.00,
    197.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_53.jpg?v=1757233340',
    true
  ),
  (
    'abandoned-checkout',
    'Abandoned Checkout Finisher',
    'Recover up to 30% of abandoned carts with automated email and SMS sequences that actually convert.',
    27.00,
    147.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_54.jpg?v=1757233340',
    true
  ),
  (
    'email-marketing',
    'Email Marketing Revenue Engine',
    'Build an email list that generates $1+ per subscriber per month. Templates, sequences, and strategies included.',
    37.00,
    197.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_55.jpg?v=1757233340',
    true
  ),
  (
    'ugly-ads',
    'Ugly Ads for eCommerce',
    'Learn how "ugly" ads can outperform polished creatives by 2-5x. Real case studies and templates included.',
    27.00,
    147.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_57.jpg?v=1757233340',
    true
  ),
  (
    'supplier-secrets',
    'Supplier Secrets',
    'Find reliable suppliers, negotiate better prices, and build relationships that give you an edge.',
    37.00,
    197.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_58.jpg?v=1757233340',
    true
  ),
  (
    'product-research',
    'Product Research Masterclass',
    'Discover winning products before they trend. Data-driven methods to find products with 5x+ potential.',
    27.00,
    147.00,
    'https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_59.jpg?v=1757233340',
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  image_url = EXCLUDED.image_url,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Verify the insert
SELECT id, slug, title, price, original_price FROM public.courses ORDER BY created_at;
