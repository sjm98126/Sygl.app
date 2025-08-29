import Link from 'next/link'
import { Sparkles, ArrowRight, Cpu, Palette, Download, Menu, X } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Sygl</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="nav-link">Features</Link>
              <Link href="#pricing" className="nav-link">Pricing</Link>
              <Link href="#about" className="nav-link">About</Link>
              <Link href="/auth/signin" className="nav-link">Sign in</Link>
              <Link href="/auth/signup" className="btn-primary">
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Announcement Badge */}
          <div className="fade-in mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 text-sm font-medium shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Logo Generation • Now with GPT-4 Vision
            </div>
          </div>
          
          <h1 className="text-hero text-gray-900 mb-8 fade-in">
            Design. Perfect. Ship.
            <br />
            <span className="gradient-text">Logos that define your brand.</span>
          </h1>
          
          <p className="text-hero-sub max-w-3xl mx-auto mb-12 fade-in">
            Create stunning, professional logos in seconds with AI that understands your vision. 
            From concept to completion, transform your ideas into pixel-perfect brand identities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 fade-in">
            <Link href="/auth/signup" className="btn-primary text-lg px-10 py-5 group">
              Start creating for free
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="#demo" className="btn-secondary text-lg px-10 py-5">
              Watch demo
            </Link>
          </div>
          
          {/* Hero Visual */}
          <div className="scale-in">
            <div className="floating-card p-12 mx-auto max-w-5xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { bg: 'from-purple-500 to-purple-600', icon: '✨' },
                  { bg: 'from-blue-500 to-blue-600', icon: '🎨' },
                  { bg: 'from-indigo-500 to-indigo-600', icon: '⚡' },
                  { bg: 'from-violet-500 to-violet-600', icon: '🚀' }
                ].map((item, i) => (
                  <div key={i} className={`aspect-square bg-gradient-to-br ${item.bg} rounded-3xl flex items-center justify-center text-4xl shadow-2xl hover:scale-110 transition-all duration-500 stagger-${i + 1}`}>
                    {item.icon}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600 font-medium">
                  Generated logos • Instant results • Professional quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-gray-900 mb-6 slide-up">
              Everything you need.
              <br />
              <span className="gradient-text font-semibold">Nothing you don&apos;t.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto slide-up">
              Three powerful tools designed with obsessive attention to detail. 
              Each interaction crafted for perfection.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="feature-card text-center group slide-up stagger-1">
              <div className="feature-icon bg-gradient-to-r from-purple-500 to-purple-600">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Intelligent Generation</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Advanced AI models understand your vision and create multiple unique concepts 
                tailored to your brand identity and industry standards.
              </p>
            </div>
            
            <div className="feature-card text-center group slide-up stagger-2">
              <div className="feature-icon bg-gradient-to-r from-blue-500 to-blue-600">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Precision Editor</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Fine-tune every detail with our intuitive editor. Adjust colors, proportions, 
                and elements until your logo achieves absolute perfection.
              </p>
            </div>
            
            <div className="feature-card text-center group slide-up stagger-3">
              <div className="feature-icon bg-gradient-to-r from-green-500 to-green-600">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Export</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Download complete brand packages: high-resolution PNGs, scalable SVGs, 
                favicons, and everything needed for any medium or platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-gradient-to-br from-gray-50 to-purple-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-gray-900 mb-6 slide-up">
              Credit-based pricing.
              <br />
              <span className="gradient-text font-semibold">Choose your model.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto slide-up">
              Pay for what you use. Gemini 2.5 costs 1 credit, Ideogram costs 3 credits. 
              Start free, scale as you grow, cancel anytime.
            </p>
            
            {/* Model Comparison */}
            <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gemini 2.5</h3>
                <p className="text-gray-600 mb-4">Fast, cost-effective logo generation</p>
                <div className="text-3xl font-bold text-green-600 mb-2">1 Credit</div>
                <p className="text-sm text-gray-500">Perfect for rapid prototyping and testing ideas</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ideogram V2</h3>
                <p className="text-gray-600 mb-4">Premium, high-quality logo generation</p>
                <div className="text-3xl font-bold text-purple-600 mb-2">3 Credits</div>
                <p className="text-sm text-gray-500">Best for final production logos with text rendering</p>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { 
                name: "Basic", 
                price: "9",
                credits: "50",
                description: "Perfect for individuals and small projects",
                features: [
                  "50 credits/month",
                  "~50 Gemini or ~16 Ideogram logos",
                  "Standard exports (PNG, JPG)",
                  "Basic templates",
                  "Email support",
                  "Commercial license"
                ],
                cta: "Start Basic",
                popular: false
              },
              { 
                name: "Pro", 
                price: "24",
                credits: "150",
                description: "Best for growing businesses and professionals",
                features: [
                  "150 credits/month",
                  "~150 Gemini or ~50 Ideogram logos",
                  "HD exports + SVG",
                  "Premium templates",
                  "Priority support",
                  "Advanced editor",
                  "Brand guidelines"
                ],
                cta: "Go Pro",
                popular: true
              },
              { 
                name: "Studio", 
                price: "49",
                credits: "500",
                description: "For agencies and design teams",
                features: [
                  "500 credits/month",
                  "~500 Gemini or ~166 Ideogram logos",
                  "4K exports + all formats",
                  "Unlimited templates",
                  "White-label solution",
                  "Dedicated support",
                  "Team collaboration"
                ],
                cta: "Start Studio",
                popular: false
              },
              { 
                name: "Enterprise", 
                price: "199",
                credits: "Unlimited",
                description: "For large organizations and agencies",
                features: [
                  "Unlimited credits",
                  "Unlimited logo generations",
                  "API access (10k calls/month)",
                  "Custom branding",
                  "Priority queue",
                  "Dedicated account manager",
                  "Custom integrations",
                  "SLA guarantee"
                ],
                cta: "Contact Sales",
                enterprise: true
              }
            ].map((tier, index) => (
              <div key={index} className={`pricing-card ${tier.popular ? 'popular' : ''} ${tier.enterprise ? 'enterprise' : ''} slide-up stagger-${index + 1}`}>
                {tier.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                {tier.enterprise && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Enterprise
                    </div>
                  </div>
                )}
                
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-light text-gray-900">${tier.price}</span>
                    <span className="text-gray-500 text-lg font-medium">/month</span>
                  </div>
                  
                  <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{tier.credits}</div>
                    <div className="text-xs text-gray-600">
                      {tier.credits === 'Unlimited' ? 'credits' : 'credits/month'}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={`/auth/signup?plan=${tier.name.toLowerCase()}`}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      tier.popular 
                        ? 'btn-primary' 
                        : tier.enterprise 
                        ? 'bg-gray-900 text-white hover:bg-gray-800' 
                        : 'btn-secondary'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="fade-in">
            <h2 className="text-5xl font-light mb-6">
              Ready to create something
              <br />
              <span className="font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">extraordinary?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Join thousands of creators, entrepreneurs, and businesses who&apos;ve brought their vision to life with Sygl. 
              Your perfect logo is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/auth/signup"
                className="bg-white text-gray-900 px-10 py-5 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl group shadow-2xl"
              >
                Start creating for free
                <ArrowRight className="w-5 h-5 ml-3 inline group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-sm text-gray-400 font-medium">
                No credit card required • Cancel anytime • 30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">Sygl</span>
              </div>
              <p className="text-gray-600 mb-8 max-w-md text-lg leading-relaxed">
                AI-powered logo design that helps you create stunning brand identities 
                in seconds, not hours. Designed with obsessive attention to detail.
              </p>
              <div className="flex space-x-6">
                {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social, index) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                    <span className="sr-only">{social}</span>
                    <div className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-lg flex items-center justify-center transition-all duration-300">
                      <div className="w-5 h-5 bg-gray-400 rounded"></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Product</h3>
              <ul className="space-y-4">
                {['Features', 'Pricing', 'Templates', 'API', 'Integrations'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Support</h3>
              <ul className="space-y-4">
                {['Help Center', 'Contact', 'Status', 'Privacy', 'Terms'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 font-medium">
              © 2024 Sygl. All rights reserved. Made with ❤️ for creators.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              {['Terms', 'Privacy', 'Cookies', 'Security'].map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}