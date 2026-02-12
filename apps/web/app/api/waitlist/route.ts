import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/waitlist
 *
 * Stores waitlist signups in Supabase. Falls back to console logging
 * if Supabase credentials are not configured.
 *
 * Required env vars (set in Vercel dashboard):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_KEY
 *
 * Required Supabase table (run in SQL editor):
 *
 *   CREATE TABLE waitlist (
 *     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *     email TEXT UNIQUE NOT NULL,
 *     first_name TEXT,
 *     source TEXT DEFAULT 'website',
 *     created_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 *
 *   ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
 *
 *   CREATE POLICY "Service role can manage waitlist"
 *     ON waitlist FOR ALL USING (true) WITH CHECK (true);
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 320) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = firstName ? String(firstName).trim().slice(0, 100) : null;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Supabase not configured — log to Vercel so signups aren't lost
      console.log(
        'WAITLIST_SIGNUP:',
        JSON.stringify({
          email: cleanEmail,
          firstName: cleanName,
          source: 'website',
          timestamp: new Date().toISOString(),
        })
      );
      return NextResponse.json({ success: true });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from('waitlist').upsert(
      {
        email: cleanEmail,
        first_name: cleanName,
        source: 'website',
        created_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error('Database error');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist signup error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
