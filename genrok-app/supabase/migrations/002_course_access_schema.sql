-- Course Access System Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COURSE FILES TABLE (PDFs)
-- ============================================
CREATE TABLE IF NOT EXISTS public.course_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,  -- Storage path in Supabase
  file_size INTEGER,        -- File size in bytes
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER PURCHASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  purchase_date TIMESTAMPTZ DEFAULT NOW(),
  payment_id TEXT,           -- External payment processor ID
  amount_paid DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'completed',  -- pending, completed, refunded
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- ============================================
-- USER SESSIONS TABLE (for IP tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET NOT NULL,
  user_agent TEXT,
  device_fingerprint TEXT,
  country TEXT,
  city TEXT,
  is_suspicious BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- IP ALLOWLIST TABLE (trusted IPs per user)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_ip_allowlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET NOT NULL,
  label TEXT,  -- e.g., "Home", "Office", "Mobile"
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ip_address)
);

-- ============================================
-- COURSE FILE ACCESS LOG (for analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS public.course_file_access_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  file_id UUID REFERENCES public.course_files(id) ON DELETE CASCADE,
  ip_address INET,
  accessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_active ON public.courses(is_active);
CREATE INDEX IF NOT EXISTS idx_course_files_course ON public.course_files(course_id);
CREATE INDEX IF NOT EXISTS idx_course_files_order ON public.course_files(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_user_purchases_user ON public.user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_course ON public.user_purchases(course_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_ip ON public.user_sessions(ip_address);
CREATE INDEX IF NOT EXISTS idx_user_ip_allowlist_user ON public.user_ip_allowlist(user_id);
CREATE INDEX IF NOT EXISTS idx_course_file_access_user ON public.course_file_access_log(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ip_allowlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_file_access_log ENABLE ROW LEVEL SECURITY;

-- Courses - Public read for active courses
CREATE POLICY "Active courses are viewable by everyone" ON public.courses
  FOR SELECT USING (is_active = true);

-- Course Files - Only viewable by users who purchased the course
CREATE POLICY "Course files are viewable by purchasers" ON public.course_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_purchases
      WHERE user_purchases.user_id = auth.uid()
      AND user_purchases.course_id = course_files.course_id
      AND user_purchases.status = 'completed'
    )
  );

-- User Purchases - Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON public.user_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- User Purchases - Service role can insert (for payment webhooks)
CREATE POLICY "Service can create purchases" ON public.user_purchases
  FOR INSERT WITH CHECK (true);

-- User Sessions - Users can view own sessions
CREATE POLICY "Users can view own sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- User Sessions - Insert allowed (tracked on login)
CREATE POLICY "Sessions can be created" ON public.user_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Sessions - Update allowed for own sessions
CREATE POLICY "Users can update own sessions" ON public.user_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- IP Allowlist - Users can manage their own allowlist
CREATE POLICY "Users can view own IP allowlist" ON public.user_ip_allowlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to IP allowlist" ON public.user_ip_allowlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from IP allowlist" ON public.user_ip_allowlist
  FOR DELETE USING (auth.uid() = user_id);

-- Course File Access Log - Users can view their own access log
CREATE POLICY "Users can view own access log" ON public.course_file_access_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Access log can be created" ON public.course_file_access_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to check if user has purchased a course
CREATE OR REPLACE FUNCTION public.has_purchased_course(p_user_id UUID, p_course_slug TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_purchases up
    JOIN public.courses c ON c.id = up.course_id
    WHERE up.user_id = p_user_id
    AND c.slug = p_course_slug
    AND up.status = 'completed'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's purchased courses
CREATE OR REPLACE FUNCTION public.get_user_courses(p_user_id UUID)
RETURNS TABLE (
  course_id UUID,
  slug TEXT,
  title TEXT,
  description TEXT,
  image_url TEXT,
  purchase_date TIMESTAMPTZ,
  file_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id as course_id,
    c.slug,
    c.title,
    c.description,
    c.image_url,
    up.purchase_date,
    COUNT(cf.id) as file_count
  FROM public.user_purchases up
  JOIN public.courses c ON c.id = up.course_id
  LEFT JOIN public.course_files cf ON cf.course_id = c.id
  WHERE up.user_id = p_user_id
  AND up.status = 'completed'
  GROUP BY c.id, c.slug, c.title, c.description, c.image_url, up.purchase_date
  ORDER BY up.purchase_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check suspicious IP activity
CREATE OR REPLACE FUNCTION public.check_ip_activity(p_user_id UUID, p_ip_address INET)
RETURNS JSONB AS $$
DECLARE
  unique_ips_24h INTEGER;
  unique_ips_7d INTEGER;
  is_new_ip BOOLEAN;
  is_allowed BOOLEAN;
  result JSONB;
BEGIN
  -- Count unique IPs in last 24 hours
  SELECT COUNT(DISTINCT ip_address) INTO unique_ips_24h
  FROM public.user_sessions
  WHERE user_id = p_user_id
  AND created_at > NOW() - INTERVAL '24 hours';

  -- Count unique IPs in last 7 days
  SELECT COUNT(DISTINCT ip_address) INTO unique_ips_7d
  FROM public.user_sessions
  WHERE user_id = p_user_id
  AND created_at > NOW() - INTERVAL '7 days';

  -- Check if this is a new IP
  SELECT NOT EXISTS (
    SELECT 1 FROM public.user_sessions
    WHERE user_id = p_user_id AND ip_address = p_ip_address
  ) INTO is_new_ip;

  -- Check if IP is in allowlist
  SELECT EXISTS (
    SELECT 1 FROM public.user_ip_allowlist
    WHERE user_id = p_user_id AND ip_address = p_ip_address AND is_verified = true
  ) INTO is_allowed;

  result := jsonb_build_object(
    'unique_ips_24h', unique_ips_24h,
    'unique_ips_7d', unique_ips_7d,
    'is_new_ip', is_new_ip,
    'is_allowed', is_allowed,
    'is_suspicious', (unique_ips_24h > 5 OR unique_ips_7d > 10) AND NOT is_allowed
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update updated_at trigger for courses
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- STORAGE BUCKET FOR COURSE FILES
-- ============================================
-- Note: Run this separately in Supabase Dashboard > Storage
-- Or use the Supabase CLI

-- Create bucket (run in Supabase Dashboard):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('course-files', 'course-files', false);

-- Storage policies (run in Supabase Dashboard):
-- Allow authenticated users to read files they purchased:
-- CREATE POLICY "Users can read purchased course files"
-- ON storage.objects FOR SELECT
-- USING (
--   bucket_id = 'course-files' AND
--   auth.role() = 'authenticated' AND
--   EXISTS (
--     SELECT 1 FROM public.course_files cf
--     JOIN public.user_purchases up ON up.course_id = cf.course_id
--     WHERE cf.file_path = name
--     AND up.user_id = auth.uid()
--     AND up.status = 'completed'
--   )
-- );
