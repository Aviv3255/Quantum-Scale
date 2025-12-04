-- Genrok Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table for Learning Center
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  read_time INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shopify Apps table
CREATE TABLE IF NOT EXISTS public.shopify_apps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  icon_url TEXT,
  app_url TEXT NOT NULL,
  affiliate_url TEXT,
  discount TEXT,
  rating DECIMAL(2,1),
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Secret Apps table
CREATE TABLE IF NOT EXISTS public.secret_apps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  website_url TEXT NOT NULL,
  video_url TEXT,
  coupon_code TEXT,
  features JSONB DEFAULT '[]'::JSONB,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Tools table
CREATE TABLE IF NOT EXISTS public.ai_tools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  website_url TEXT NOT NULL,
  video_url TEXT,
  features JSONB DEFAULT '[]'::JSONB,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- A/B Test Results table
CREATE TABLE IF NOT EXISTS public.ab_test_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  control_image TEXT,
  variant_image TEXT,
  control_cvr DECIMAL(5,2),
  variant_cvr DECIMAL(5,2),
  lift_percentage DECIMAL(5,2),
  sample_size INTEGER,
  confidence_level DECIMAL(5,2),
  insight TEXT,
  recommendation TEXT,
  recommended_app TEXT,
  recommended_app_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Web UI Inspiration table
CREATE TABLE IF NOT EXISTS public.web_inspiration (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  website_url TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::JSONB,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sections Inspiration table
CREATE TABLE IF NOT EXISTS public.sections_inspiration (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  source_url TEXT,
  tags JSONB DEFAULT '[]'::JSONB,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Image Inspiration table
CREATE TABLE IF NOT EXISTS public.image_inspiration (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT,
  niche TEXT NOT NULL,
  image_url TEXT NOT NULL,
  source_url TEXT,
  tags JSONB DEFAULT '[]'::JSONB,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Polls table
CREATE TABLE IF NOT EXISTS public.polls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  results JSONB DEFAULT '{}'::JSONB,
  total_votes INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Poll Votes table (to track who voted)
CREATE TABLE IF NOT EXISTS public.poll_votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  option_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

-- TikTok Credit Applications table
CREATE TABLE IF NOT EXISTS public.tiktok_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  business_name TEXT,
  monthly_ad_spend TEXT,
  tier TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Saved Items table
CREATE TABLE IF NOT EXISTS public.saved_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_shopify_apps_category ON public.shopify_apps(category);
CREATE INDEX IF NOT EXISTS idx_secret_apps_category ON public.secret_apps(category);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON public.ai_tools(category);
CREATE INDEX IF NOT EXISTS idx_ab_test_results_category ON public.ab_test_results(category);
CREATE INDEX IF NOT EXISTS idx_web_inspiration_category ON public.web_inspiration(category);
CREATE INDEX IF NOT EXISTS idx_sections_inspiration_category ON public.sections_inspiration(category);
CREATE INDEX IF NOT EXISTS idx_image_inspiration_niche ON public.image_inspiration(niche);
CREATE INDEX IF NOT EXISTS idx_saved_items_user ON public.saved_items(user_id);
CREATE INDEX IF NOT EXISTS idx_poll_votes_poll ON public.poll_votes(poll_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopify_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secret_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_inspiration ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections_inspiration ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.image_inspiration ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiktok_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Content tables - readable by everyone (public content)
CREATE POLICY "Articles are viewable by everyone" ON public.articles
  FOR SELECT USING (true);

CREATE POLICY "Shopify apps are viewable by everyone" ON public.shopify_apps
  FOR SELECT USING (true);

CREATE POLICY "Secret apps are viewable by everyone" ON public.secret_apps
  FOR SELECT USING (true);

CREATE POLICY "AI tools are viewable by everyone" ON public.ai_tools
  FOR SELECT USING (true);

CREATE POLICY "AB test results are viewable by everyone" ON public.ab_test_results
  FOR SELECT USING (true);

CREATE POLICY "Web inspiration is viewable by everyone" ON public.web_inspiration
  FOR SELECT USING (true);

CREATE POLICY "Sections inspiration is viewable by everyone" ON public.sections_inspiration
  FOR SELECT USING (true);

CREATE POLICY "Image inspiration is viewable by everyone" ON public.image_inspiration
  FOR SELECT USING (true);

-- Polls policies
CREATE POLICY "Active polls are viewable by everyone" ON public.polls
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can vote on polls" ON public.poll_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own votes" ON public.poll_votes
  FOR SELECT USING (auth.uid() = user_id);

-- TikTok applications - users can only see their own
CREATE POLICY "Users can view own applications" ON public.tiktok_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications" ON public.tiktok_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved items - users can only manage their own
CREATE POLICY "Users can view own saved items" ON public.saved_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save items" ON public.saved_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved items" ON public.saved_items
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_tiktok_applications_updated_at
  BEFORE UPDATE ON public.tiktok_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
