import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateLogo, GenerationOptions, AIModel } from '@/lib/ai'
import { canAffordGeneration, CREDIT_COSTS } from '@/lib/pricing'
import { z } from 'zod'

const generateSchema = z.object({
  prompt: z.string().min(1).max(500),
  model: z.enum(['gemini-2.5', 'ideogram']),
  style: z.string().optional(),
  colors: z.array(z.string()).optional(),
  format: z.enum(['square', 'horizontal', 'vertical']).optional(),
  industry: z.string().optional(),
  aspectRatio: z.enum(['1:1', '16:9', '9:16', '4:3', '3:4']).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = generateSchema.parse(body)

    // Get user from authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get user's current credit balance
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('credits_remaining, subscription_tier')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user can afford this generation
    const creditsNeeded = CREDIT_COSTS[validatedData.model as AIModel]
    if (!canAffordGeneration(userData.credits_remaining, validatedData.model as AIModel)) {
      return NextResponse.json({ 
        error: 'Insufficient credits',
        creditsNeeded,
        creditsAvailable: userData.credits_remaining
      }, { status: 402 })
    }

    // Create generation record
    const { data: generationRecord, error: insertError } = await supabaseAdmin
      .from('logo_generations')
      .insert({
        user_id: user.id,
        prompt: validatedData.prompt,
        model_used: validatedData.model as AIModel,
        credits_used: creditsNeeded,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Failed to create generation record:', insertError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    try {
      // Generate the logo
      const generationOptions: GenerationOptions = {
        model: validatedData.model as AIModel,
        prompt: validatedData.prompt,
        style: validatedData.style,
        colors: validatedData.colors,
        format: validatedData.format,
        industry: validatedData.industry,
        aspectRatio: validatedData.aspectRatio
      }

      const result = await generateLogo(generationOptions)

      if (result.success) {
        // Update generation record with success
        await supabaseAdmin
          .from('logo_generations')
          .update({
            status: 'completed',
            image_url: result.imageUrl,
            generation_data: result.metadata
          })
          .eq('id', generationRecord.id)

        // Deduct credits from user (only on success)
        const newCredits = userData.credits_remaining === -1 
          ? -1  // Unlimited stays unlimited
          : userData.credits_remaining - creditsNeeded

        await supabaseAdmin
          .from('users')
          .update({ credits_remaining: newCredits })
          .eq('id', user.id)

        return NextResponse.json({
          success: true,
          generationId: generationRecord.id,
          imageUrl: result.imageUrl,
          creditsUsed: creditsNeeded,
          creditsRemaining: newCredits,
          metadata: result.metadata
        })
      } else {
        // Update generation record with failure
        await supabaseAdmin
          .from('logo_generations')
          .update({
            status: 'failed',
            generation_data: { error: result.error }
          })
          .eq('id', generationRecord.id)

        return NextResponse.json({
          success: false,
          error: result.error,
          generationId: generationRecord.id
        }, { status: 500 })
      }
    } catch (generationError) {
      // Update generation record with failure
      await supabaseAdmin
        .from('logo_generations')
        .update({
          status: 'failed',
          generation_data: { error: 'Generation service error' }
        })
        .eq('id', generationRecord.id)

      throw generationError
    }
  } catch (error) {
    console.error('Generation API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}