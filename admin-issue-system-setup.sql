-- ================================================
-- ADMIN ISSUE TRACKING SYSTEM - DATABASE SETUP
-- Run this in Supabase Dashboard → SQL Editor
-- ================================================

-- 1. Add is_admin column to user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. Set you as admin
UPDATE user_profiles SET is_admin = TRUE WHERE user_id = 'cdb46ae9-f2a7-4a93-8f02-4b43bd10ebfe';

-- 3. Create admin_issues table
CREATE TABLE IF NOT EXISTS admin_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Location context
  page_url TEXT NOT NULL,
  page_type TEXT NOT NULL,
  lesson_slug TEXT,
  slide_index INTEGER,
  section_id TEXT,

  -- Issue details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',

  -- Status workflow
  status TEXT DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  fixed_at TIMESTAMPTZ,
  validated_at TIMESTAMPTZ,

  -- User tracking
  reported_by UUID REFERENCES auth.users(id),
  fixed_by TEXT,

  -- Direct link
  direct_link TEXT NOT NULL
);

-- 4. Enable RLS
ALTER TABLE admin_issues ENABLE ROW LEVEL SECURITY;

-- 5. Create policy for admins
CREATE POLICY "Admins can manage issues" ON admin_issues
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid() AND user_profiles.is_admin = TRUE
    )
  );

-- 6. Allow public read for Claude to see issues
CREATE POLICY "Public can read issues" ON admin_issues
  FOR SELECT USING (true);
