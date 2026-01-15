-- Create component_bugs table for tracking UI issues in lesson components
CREATE TABLE IF NOT EXISTS component_bugs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_id TEXT NOT NULL,
  component_name TEXT NOT NULL,
  component_category TEXT NOT NULL,
  description TEXT NOT NULL,
  variant_mode TEXT NOT NULL DEFAULT 'dark',
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  resolution TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

-- Add index for common queries
CREATE INDEX IF NOT EXISTS idx_component_bugs_status ON component_bugs(status);
CREATE INDEX IF NOT EXISTS idx_component_bugs_component_id ON component_bugs(component_id);
CREATE INDEX IF NOT EXISTS idx_component_bugs_created_at ON component_bugs(created_at DESC);

-- Enable RLS
ALTER TABLE component_bugs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert bug reports
CREATE POLICY "Allow authenticated users to insert bugs"
  ON component_bugs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all bugs
CREATE POLICY "Allow authenticated users to read bugs"
  ON component_bugs FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update bugs (for marking resolved, etc.)
CREATE POLICY "Allow authenticated users to update bugs"
  ON component_bugs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
