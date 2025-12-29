-- ================================================
-- ADMIN ISSUE TRACKING SYSTEM - DATABASE SETUP
-- Run this in Supabase Dashboard → SQL Editor
-- ================================================

-- 1. Add is_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. Set yourself as admin (REPLACE with your actual user ID from Supabase Auth → Users)
-- UPDATE profiles SET is_admin = TRUE WHERE id = 'YOUR_USER_ID_HERE';

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
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
    )
  );

-- 6. Allow public read for Claude to see issues
CREATE POLICY "Public can read issues" ON admin_issues
  FOR SELECT USING (true);
