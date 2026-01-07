-- Allow updating admin_issues status (for marking issues as fixed)
-- Run this in Supabase SQL Editor

-- Drop existing update policy if it exists
DROP POLICY IF EXISTS "Allow status updates on admin_issues" ON admin_issues;

-- Create policy to allow anyone to update issue status
-- In production, this should be restricted to admins only
CREATE POLICY "Allow status updates on admin_issues"
ON admin_issues
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'admin_issues';
