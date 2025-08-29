'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { 
  Sparkles, 
  CreditCard, 
  Plus, 
  Download, 
  Settings, 
  BarChart3,
  History,
  Zap,
  Crown,
  Users
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; user_metadata?: { full_name?: string } } | null>(null)
  const [credits, setCredits] = useState(0)
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [subscriptionTier, setSubscriptionTier] = useState('basic')
  const [recentGenerations, setRecentGenerations] = useState([])
  const [stats, setStats] = useState({
    totalGenerations: 0,
    thisMonth: 0,
    creditsUsed: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }

      setUser(user as { email: string; user_metadata?: { full_name?: string } })
      await fetchUserData()
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/auth/signin')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserData = async () => {
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
        setSubscriptionTier(data.subscriptionTier)
        setRecentGenerations(data.recentGenerations)
        
        // Calculate stats
        const totalGenerations = data.recentGenerations.length
        const thisMonth = data.recentGenerations.filter((gen: { created_at: string }) => {
          const genDate = new Date(gen.created_at)
          const now = new Date()
          return genDate.getMonth() === now.getMonth() && genDate.getFullYear() === now.getFullYear()
        }).length
        const creditsUsed = data.recentGenerations.reduce((sum: number, gen: { credits_used: number }) => sum + gen.credits_used, 0)
        
        setStats({ totalGenerations, thisMonth, creditsUsed })
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const getTierBadge = (tier: string) => {
    const config = {
      basic: { color: 'bg-green-100 text-green-800', icon: Zap },
      pro: { color: 'bg-purple-100 text-purple-800', icon: Crown },
      studio: { color: 'bg-blue-100 text-blue-800', icon: Settings },
      enterprise: { color: 'bg-gray-100 text-gray-800', icon: Users }
    }
    const { color, icon: Icon } = config[tier as keyof typeof config] || config.basic
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </span>
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
              
              {getTierBadge(subscriptionTier)}
              
              <button 
                onClick={handleSignOut}
                className="btn-secondary"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </h1>
          <p className="text-gray-600">Ready to create something amazing today?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link 
            href="/generate"
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Generate Logo</h3>
                <p className="text-sm text-gray-600">Create new designs</p>
              </div>
            </div>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">This Month</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Created</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalGenerations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Credits Used</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.creditsUsed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Generations */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Generations</h2>
            <Link href="/generate" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Link>
          </div>
          
          {recentGenerations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentGenerations.slice(0, 6).map((generation: { id: string; image_url?: string; model_used: string; status: string; credits_used: number; created_at: string }) => (
                <div key={generation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    {generation.image_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={generation.image_url} 
                        alt="Generated logo"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <Sparkles className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        generation.model_used === 'gemini-2.5' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {generation.model_used}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        generation.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : generation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {generation.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {/* You would show the prompt here, but it's not in the current schema */}
                      Generated logo
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{generation.credits_used} credits</span>
                      <span>{new Date(generation.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    {generation.status === 'completed' && generation.image_url && (
                      <button className="w-full mt-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No logos yet</h3>
              <p className="text-gray-600 mb-6">Create your first logo to get started</p>
              <Link href="/generate" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Generate Your First Logo
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}