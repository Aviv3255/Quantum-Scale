import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role for API access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') || '50';

    let query = supabase
      .from('admin_issues')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get counts
    const { data: allData } = await supabase
      .from('admin_issues')
      .select('status');

    const counts = {
      all: allData?.length || 0,
      pending: allData?.filter((i: { status: string }) => i.status === 'pending').length || 0,
      fixed: allData?.filter((i: { status: string }) => i.status === 'fixed').length || 0,
      validated: allData?.filter((i: { status: string }) => i.status === 'validated').length || 0,
    };

    return NextResponse.json({
      counts,
      issues: data,
    });
  } catch (err) {
    console.error('Error fetching bugs:', err);
    return NextResponse.json({ error: 'Failed to fetch bugs' }, { status: 500 });
  }
}
