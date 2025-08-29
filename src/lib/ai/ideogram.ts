export interface IdeogramGenerationOptions {
  prompt: string
  style?: 'auto' | 'general' | 'realistic' | 'design' | 'render_3d' | 'anime'
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
  model?: 'V_2' | 'V_2_TURBO'
  magicPromptOption?: 'AUTO' | 'ON' | 'OFF'
}

export interface IdeogramGenerationResult {
  success: boolean
  imageUrl?: string
  imageData?: string
  error?: string
  metadata?: {
    model: 'ideogram'
    promptUsed: string
    timestamp: string
    generationId: string
    resolution: string
  }
}

class IdeogramAPI {
  private apiKey: string
  private baseUrl = 'https://api.ideogram.ai/generate'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateLogo(options: IdeogramGenerationOptions): Promise<IdeogramGenerationResult> {
    try {
      const payload = {
        image_request: {
          prompt: this.enhanceLogoPrompt(options.prompt),
          aspect_ratio: options.aspectRatio || '1:1',
          model: options.model || 'V_2',
          magic_prompt_option: options.magicPromptOption || 'AUTO',
          style_type: options.style || 'design'
        }
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Ideogram API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.data && result.data.length > 0) {
        const imageData = result.data[0]
        const generationId = `ideogram_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        return {
          success: true,
          imageUrl: imageData.url,
          imageData: imageData.b64_json,
          metadata: {
            model: 'ideogram',
            promptUsed: payload.image_request.prompt,
            timestamp: new Date().toISOString(),
            generationId,
            resolution: imageData.resolution || '1024x1024'
          }
        }
      } else {
        throw new Error('No image data returned from Ideogram')
      }
    } catch (error) {
      console.error('Ideogram generation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  private enhanceLogoPrompt(originalPrompt: string): string {
    return `Professional logo design: ${originalPrompt}. 
Clean, modern, scalable vector style. 
High contrast, memorable, suitable for business use. 
Minimal background, crisp lines, professional typography if text included. 
Corporate quality, brandable design.`
  }
}

let ideogramAPI: IdeogramAPI | null = null

export function getIdeogramAPI(): IdeogramAPI {
  if (!ideogramAPI) {
    const apiKey = process.env.IDEOGRAM_API_KEY
    if (!apiKey) {
      throw new Error('IDEOGRAM_API_KEY environment variable is required')
    }
    ideogramAPI = new IdeogramAPI(apiKey)
  }
  return ideogramAPI
}

export async function generateLogoWithIdeogram(
  options: IdeogramGenerationOptions
): Promise<IdeogramGenerationResult> {
  const api = getIdeogramAPI()
  return api.generateLogo(options)
}

export function getIdeogramModelInfo() {
  return {
    name: 'Ideogram V2',
    description: 'Premium AI model for high-quality, detailed logo generation',
    creditsPerGeneration: 3,
    features: [
      'High-quality output',
      'Advanced customization',
      'Multiple style options',
      'Text rendering capability',
      'Photorealistic options'
    ],
    limitations: [
      'Higher cost (3x credits)',
      'Slower generation (10-30 seconds)'
    ]
  }
}