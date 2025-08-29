import Link from 'next/link'
import { Sparkles, ArrowRight, Cpu, Palette, Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold gradient-text">Sygl</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="nav-link">Features</Link>
              <Link href="#pricing" className="nav-link">Pricing</Link>
              <Link href="/auth/signin" className="nav-link">Sign in</Link>
              <Link href="/auth/signup" className="btn-primary">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Design. Perfect. Ship.
            <br />
            <span className="gradient-text font-medium">Logos that define your brand.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Create stunning, professional logos in seconds with AI that understands your vision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 group">
              Start creating for free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#demo" className="btn-secondary text-lg px-8 py-4">
              Watch demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Everything you need.
              <br />
              <span className="gradient-text font-medium">Nothing you don't.</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="floating-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intelligent Generation</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI models understand your vision and create multiple unique concepts 
                tailored to your brand identity.
              </p>
            </div>
            
            <div className="floating-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Precision Editor</h3>
              <p className="text-gray-600 leading-relaxed">
                Fine-tune every detail with our intuitive editor. Adjust colors, proportions, 
                and elements until perfect.
              </p>
            </div>
            
            <div className="floating-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Export</h3>
              <p className="text-gray-600 leading-relaxed">
                Download complete brand packages: high-resolution PNGs, scalable SVGs, 
                and everything needed for any medium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Simple pricing.
              <br />
              <span className="gradient-text font-medium">Powerful results.</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Basic", price: "9", features: ["50 generations", "Standard exports", "Email support"] },
              { name: "Pro", price: "24", features: ["150 generations", "HD exports", "Priority support"], popular: true },
              { name: "Studio", price: "49", features: ["500 generations", "4K exports", "White-label"] }
            ].map((tier, index) => (
              <div key={index} className={`${tier.popular ? 'floating-card ring-2 ring-purple-500' : 'card-elevated'}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-light text-gray-900">${tier.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center text-gray-600">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/auth/signup" className={tier.popular ? 'btn-primary w-full py-3' : 'btn-secondary w-full py-3'}>
                    Get started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}