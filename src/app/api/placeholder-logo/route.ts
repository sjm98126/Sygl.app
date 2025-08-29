import { NextRequest, NextResponse } from 'next/server'

// Temporary placeholder for logo generation while AI models are being configured
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const prompt = searchParams.get('prompt') || 'Logo'
  
  // Generate a simple SVG placeholder logo
  const svg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="200" cy="200" r="180" fill="url(#grad1)" />
      
      <!-- Inner circle -->
      <circle cx="200" cy="200" r="120" fill="white" opacity="0.9" />
      
      <!-- Text -->
      <text x="200" y="220" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#9333ea">
        ${prompt.slice(0, 3).toUpperCase()}
      </text>
      
      <!-- Decorative elements -->
      <circle cx="200" cy="120" r="8" fill="#3b82f6" />
      <circle cx="200" cy="280" r="8" fill="#3b82f6" />
      <circle cx="120" cy="200" r="8" fill="#3b82f6" />
      <circle cx="280" cy="200" r="8" fill="#3b82f6" />
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}