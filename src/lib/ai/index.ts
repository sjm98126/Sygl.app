import { generateLogoWithGemini, GeminiGenerationOptions, GeminiGenerationResult } from './gemini'
import { generateLogoWithIdeogram, IdeogramGenerationOptions, IdeogramGenerationResult } from './ideogram'
import { CREDIT_COSTS, AIModel } from '../pricing'

export type GenerationOptions = {
  model: AIModel
  prompt: string
  style?: string
  colors?: string[]
  format?: 'square' | 'horizontal' | 'vertical'
  industry?: string
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
}

export type GenerationResult = {
  success: boolean
  imageUrl?: string
  imageData?: string
  error?: string
  creditsUsed: number
        metadata?: {
        model: AIModel
        promptUsed: string
        timestamp: string
        generationId: string
        [key: string]: unknown
      }
}

export async function generateLogo(options: GenerationOptions): Promise<GenerationResult> {
  const creditsUsed = CREDIT_COSTS[options.model]

  try {
    let result: GeminiGenerationResult | IdeogramGenerationResult

    if (options.model === 'gemini-2.5') {
      const geminiOptions: GeminiGenerationOptions = {
        prompt: options.prompt,
        style: options.style as 'minimalist' | 'modern' | 'classic' | 'bold' | 'elegant' | undefined,
        colors: options.colors,
        format: options.format,
        industry: options.industry
      }
      result = await generateLogoWithGemini(geminiOptions)
    } else if (options.model === 'ideogram') {
      const ideogramOptions: IdeogramGenerationOptions = {
        prompt: options.prompt,
        style: (options.style as 'auto' | 'general' | 'realistic' | 'design' | 'render_3d' | 'anime') || 'auto',
        aspectRatio: options.aspectRatio || '1:1'
      }
      result = await generateLogoWithIdeogram(ideogramOptions)
    } else {
      throw new Error(`Unsupported model: ${options.model}`)
    }

    return {
      ...result,
      creditsUsed,
      metadata: result.metadata ? {
        ...result.metadata,
        model: options.model
      } : undefined
    }
  } catch (error: unknown) {
    console.error('Logo generation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      creditsUsed: 0 // Don't charge credits for failed generations
    }
  }
}

export function getModelInfo(model: AIModel) {
  if (model === 'gemini-2.5') {
    return {
      name: 'Gemini 2.5',
      description: 'Google\'s latest AI model for fast, cost-effective logo generation',
      creditsPerGeneration: CREDIT_COSTS[model],
      speed: 'Fast (2-5 seconds)',
      quality: 'Good',
      features: [
        'Fast generation',
        'Cost-effective',
        'Good for rapid prototyping',
        'Multiple style options'
      ]
    }
  } else {
    return {
      name: 'Ideogram V2',
      description: 'Premium AI model for high-quality, detailed logo generation',
      creditsPerGeneration: CREDIT_COSTS[model],
      speed: 'Slower (10-30 seconds)',
      quality: 'Premium',
      features: [
        'High-quality output',
        'Advanced customization',
        'Text rendering capability',
        'Photorealistic options'
      ]
    }
  }
}

export type { AIModel } from '../pricing'
export { CREDIT_COSTS } from '../pricing'