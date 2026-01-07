-- Create lesson_thumbnails table
-- Run this in Supabase SQL Editor

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
