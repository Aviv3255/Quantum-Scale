-- Migration: 003_bookmarks_table.sql
-- Comprehensive bookmark system for Quantum Scale

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  source_url TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate bookmarks for same user/type/item
  UNIQUE(user_id, item_type, item_id)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_type ON public.bookmarks(user_id, item_type);
CREATE INDEX IF NOT EXISTS idx_bookmarks_created ON public.bookmarks(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only manage their own bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON public.bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookmarks"
  ON public.bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON public.bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add comment for documentation
COMMENT ON TABLE public.bookmarks IS 'User bookmarks for various content types across the platform';
COMMENT ON COLUMN public.bookmarks.item_type IS 'Type of bookmarked item: product, lesson, lesson_slide, course_page, creative, secret_app, shopify_app, ab_test, image, section';
COMMENT ON COLUMN public.bookmarks.item_id IS 'Unique identifier for the item (numeric ID, slug, or composite like slug:slideIndex)';
COMMENT ON COLUMN public.bookmarks.metadata IS 'Additional data like niche, category, etc.';
