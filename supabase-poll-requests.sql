DROP TABLE IF EXISTS poll_requests CASCADE;

CREATE TABLE poll_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  buttons JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submitted_by_email TEXT,
  submitted_by_name TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_poll_requests_status ON poll_requests(status);
CREATE INDEX idx_poll_requests_submitted_by ON poll_requests(submitted_by);

ALTER TABLE poll_requests ENABLE ROW LEVEL SECURITY;

-- Users can insert their own poll requests
CREATE POLICY "Users can insert own poll requests" ON poll_requests
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);

-- Users can view their own poll requests
CREATE POLICY "Users can view own poll requests" ON poll_requests
  FOR SELECT USING (auth.uid() = submitted_by);

-- Admins can view all poll requests (check by email)
CREATE POLICY "Admins can view all poll requests" ON poll_requests
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('avivgoldstein32@gmail.com', 'admin@quantumscale.com')
  );

-- Admins can update poll requests
CREATE POLICY "Admins can update poll requests" ON poll_requests
  FOR UPDATE USING (
    auth.jwt() ->> 'email' IN ('avivgoldstein32@gmail.com', 'admin@quantumscale.com')
  );

-- Admins can delete poll requests
CREATE POLICY "Admins can delete poll requests" ON poll_requests
  FOR DELETE USING (
    auth.jwt() ->> 'email' IN ('avivgoldstein32@gmail.com', 'admin@quantumscale.com')
  );
