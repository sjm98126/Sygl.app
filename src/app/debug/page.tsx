'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    // Only check client-side environment variables (NEXT_PUBLIC_*)
    setEnvVars({
      'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (hidden)' : 'NOT SET',
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Environment Variables Debug</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Client-Side Environment Variables</h2>
          
          <div className="space-y-3">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-mono text-sm">{key}</span>
                <span className={`font-mono text-sm ${value === 'NOT SET' ? 'text-red-600' : 'text-green-600'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <h3 className="font-semibold text-yellow-800">Instructions:</h3>
            <p className="text-yellow-700 mt-2">
              If any variables show &quot;NOT SET&quot;, please add them to your Vercel environment variables:
            </p>
            <ol className="list-decimal list-inside mt-2 text-yellow-700 space-y-1">
              <li>Go to your Vercel dashboard</li>
              <li>Select your Sygl.app project</li>
              <li>Go to Settings → Environment Variables</li>
              <li>Add the missing variables</li>
              <li>Redeploy your project</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}