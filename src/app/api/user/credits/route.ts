/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get user's current credit information
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        credits_remaining,
        subscription_tier,
        subscriptions (
          tier,
          credits_included,
          current_period_end,
          status
        )
      `)
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Type assertion for userData
    const userInfo = userData as any

    // Get recent generations for activity
    const { data: recentGenerations } = await supabaseAdmin
      .from('logo_generations')
      .select('id, created_at, credits_used, model_used, status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    return NextResponse.json({
      creditsRemaining: userInfo.credits_remaining,
      subscriptionTier: userInfo.subscription_tier,
      subscription: userInfo.subscriptions?.[0] || null,
      recentGenerations: recentGenerations || [],
      isUnlimited: userInfo.credits_remaining === -1
    })
  } catch (error) {
    console.error('Credits API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}