'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Palette, Wand2, Download, Settings, CreditCard } from 'lucide-react'
import { getModelInfo, AIModel, CREDIT_COSTS } from '@/lib/ai'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function GeneratePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; user_metadata?: { full_name?: string } } | null>(null)
  const [credits, setCredits] = useState(0)
  const [isUnlimited, setIsUnlimited] = useState(false)
  
  // Form state
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini-2.5')
  const [style, setStyle] = useState('modern')
  const [industry, setIndustry] = useState('')
  const [colors] = useState<string[]>([])
  const [format, setFormat] = useState<'square' | 'horizontal' | 'vertical'>('square')
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setIsAuthenticated(true)
      setUser(user)
      await fetchCredits()
    } else {
      router.push('/auth/signin')
    }
  }

  const fetchCredits = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch('/api/user/credits', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCredits(data.creditsRemaining)
        setIsUnlimited(data.isUnlimited)
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Please sign in to generate logos')
        return
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          style,
          industry,
          colors,
          format
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setGeneratedImage(result.imageUrl)
        setCredits(result.creditsRemaining)
      } else {
        setError(result.error || 'Generation failed')
      }
    } catch (error) {
      setError('Network error occurred')
      console.error('Generation error:', error as unknown)
    } finally {
      setIsGenerating(false)
    }
  }

  const canAfford = isUnlimited || credits >= CREDIT_COSTS[selectedModel]
  const geminiInfo = getModelInfo('gemini-2.5')
  const ideogramInfo = getModelInfo('ideogram')

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Sygl</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {isUnlimited ? 'Unlimited' : `${credits} credits`}
                </span>
              </div>
              
              <button 
                onClick={() => router.push('/dashboard')}
                className="btn-secondary"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generation Form */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Generate Your Logo</h1>
              
              {/* Model Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">AI Model</label>
                <div className="grid grid-cols-1 gap-3">
                  {/* Gemini Option */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedModel === 'gemini-2.5' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedModel('gemini-2.5')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <Wand2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{geminiInfo.name}</h3>
                          <p className="text-sm text-gray-600">{geminiInfo.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {geminiInfo.creditsPerGeneration} credit
                        </div>
                        <div className="text-xs text-gray-500">{geminiInfo.speed}</div>
                      </div>
                    </div>
                  </div>

                  {/* Ideogram Option */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedModel === 'ideogram' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedModel('ideogram')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Palette className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{ideogramInfo.name}</h3>
                          <p className="text-sm text-gray-600">{ideogramInfo.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-purple-600">
                          {ideogramInfo.creditsPerGeneration} credits
                        </div>
                        <div className="text-xs text-gray-500">{ideogramInfo.speed}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your logo
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A modern tech startup logo with clean lines, using blue and white colors..."
                  className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1">{prompt.length}/500 characters</div>
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <select 
                  value={style} 
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="modern">Modern</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="classic">Classic</option>
                  <option value="bold">Bold</option>
                  <option value="elegant">Elegant</option>
                </select>
              </div>

              {/* Industry */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry (optional)</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., Technology, Healthcare, Finance..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'square', label: 'Square', icon: '⬜' },
                    { value: 'horizontal', label: 'Horizontal', icon: '▭' },
                    { value: 'vertical', label: 'Vertical', icon: '▯' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormat(option.value as any)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        format === option.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300 text-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-xs font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !canAfford || !prompt.trim()}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isGenerating || !canAfford || !prompt.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary hover:scale-105'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Logo ({CREDIT_COSTS[selectedModel]} credit{CREDIT_COSTS[selectedModel] > 1 ? 's' : ''})</span>
                  </div>
                )}
              </button>

              {!canAfford && (
                <p className="text-red-600 text-sm mt-2 text-center">
                  Insufficient credits. You need {CREDIT_COSTS[selectedModel]} credit{CREDIT_COSTS[selectedModel] > 1 ? 's' : ''} but have {credits}.
                </p>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Logo</h2>
              
              {generatedImage ? (
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={generatedImage} 
                      alt="Generated logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </button>
                    <button className="flex-1 btn-secondary">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Logo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Your generated logo will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}