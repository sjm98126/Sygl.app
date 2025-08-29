export const CREDIT_COSTS = {
  'gemini-2.5': 1,    // Cheap baseline model
  'ideogram': 3,      // Premium model costs 3x more
} as const

export const SUBSCRIPTION_TIERS = {
  basic: {
    name: 'Basic',
    price: 9,
    monthlyCredits: 50,
    popular: false,
    features: [
      '50 logo generations (Gemini 2.5)',
      '~16 premium generations (Ideogram)',
      'Standard exports (PNG, JPG)',
      'Basic templates',
      'Email support',
      'Commercial license'
    ],
    stripeProductId: 'prod_basic',
    stripePriceId: 'price_basic_monthly'
  },
  pro: {
    name: 'Pro',
    price: 24,
    monthlyCredits: 150,
    popular: true,
    features: [
      '150 logo generations (Gemini 2.5)',
      '~50 premium generations (Ideogram)',
      'HD exports + SVG',
      'Premium templates',
      'Priority support',
      'Advanced editor',
      'Brand guidelines'
    ],
    stripeProductId: 'prod_pro',
    stripePriceId: 'price_pro_monthly'
  },
  studio: {
    name: 'Studio',
    price: 49,
    monthlyCredits: 500,
    popular: false,
    features: [
      '500 logo generations (Gemini 2.5)',
      '~166 premium generations (Ideogram)',
      '4K exports + all formats',
      'Unlimited templates',
      'White-label solution',
      'Dedicated support',
      'Team collaboration'
    ],
    stripeProductId: 'prod_studio',
    stripePriceId: 'price_studio_monthly'
  },
  enterprise: {
    name: 'Enterprise',
    price: 199,
    monthlyCredits: -1, // Unlimited
    popular: false,
    features: [
      'Unlimited logo generations',
      'All AI models included',
      'API access with 10,000 calls/month',
      'Custom branding',
      'Priority queue',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee'
    ],
    stripeProductId: 'prod_enterprise',
    stripePriceId: 'price_enterprise_monthly'
  }
} as const

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS
export type AIModel = keyof typeof CREDIT_COSTS

export function calculateGenerations(credits: number, model: AIModel): number {
  if (credits === -1) return -1 // Unlimited
  return Math.floor(credits / CREDIT_COSTS[model])
}

export function canAffordGeneration(availableCredits: number, model: AIModel): boolean {
  if (availableCredits === -1) return true // Unlimited
  return availableCredits >= CREDIT_COSTS[model]
}