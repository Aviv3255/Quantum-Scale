-- =============================================
-- LESSON THUMBNAILS - Complete Setup
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Create lesson_thumbnails table (if not exists)
CREATE TABLE IF NOT EXISTS lesson_thumbnails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  thumbnail_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_lesson_thumbnails_slug ON lesson_thumbnails(slug);

-- Enable RLS
ALTER TABLE lesson_thumbnails ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can read lesson thumbnails" ON lesson_thumbnails;
DROP POLICY IF EXISTS "Authenticated users can manage lesson thumbnails" ON lesson_thumbnails;

-- Policy: Anyone can read thumbnails
CREATE POLICY "Anyone can read lesson thumbnails"
  ON lesson_thumbnails
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert/update (admin check in app)
CREATE POLICY "Authenticated users can manage lesson thumbnails"
  ON lesson_thumbnails
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- =============================================
-- 2. Storage Bucket Policies for 'images' bucket
-- =============================================

-- Allow authenticated users to upload to lesson-thumbnails folder
INSERT INTO storage.policies (name, bucket_id, definition)
SELECT
  'Allow authenticated uploads to lesson-thumbnails',
  'images',
  '{"operation": "INSERT", "check": "auth.role() = ''authenticated'' AND (storage.foldername(name))[1] = ''lesson-thumbnails''"}'
WHERE NOT EXISTS (
  SELECT 1 FROM storage.policies
  WHERE bucket_id = 'images'
  AND name = 'Allow authenticated uploads to lesson-thumbnails'
);

-- If the above doesn't work, run this alternative:
-- Go to Storage > images bucket > Policies and add:
-- Policy name: "Allow authenticated uploads to lesson-thumbnails"
-- Allowed operation: INSERT
-- Policy definition: (auth.role() = 'authenticated') AND ((storage.foldername(name))[1] = 'lesson-thumbnails')
