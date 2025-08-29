export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'basic' | 'pro' | 'studio' | 'enterprise'
          credits_remaining: number
          total_credits_purchased: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'basic' | 'pro' | 'studio' | 'enterprise'
          credits_remaining?: number
          total_credits_purchased?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'basic' | 'pro' | 'studio' | 'enterprise'
          credits_remaining?: number
          total_credits_purchased?: number
          created_at?: string
          updated_at?: string
        }
      }
      logo_generations: {
        Row: {
          id: string
          user_id: string
          prompt: string
          model_used: 'gemini-2.5' | 'ideogram'
          credits_used: number
          image_url: string | null
          generation_data: Record<string, unknown> | null
          status: 'pending' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt: string
          model_used: 'gemini-2.5' | 'ideogram'
          credits_used: number
          image_url?: string | null
          generation_data?: Record<string, unknown> | null
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt?: string
          model_used?: 'gemini-2.5' | 'ideogram'
          credits_used?: number
          image_url?: string | null
          generation_data?: Record<string, unknown> | null
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          tier: 'basic' | 'pro' | 'studio' | 'enterprise'
          current_period_start: string
          current_period_end: string
          credits_included: number
          credits_reset_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          tier: 'basic' | 'pro' | 'studio' | 'enterprise'
          current_period_start: string
          current_period_end: string
          credits_included: number
          credits_reset_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          stripe_customer_id?: string
          status?: string
          tier?: 'basic' | 'pro' | 'studio' | 'enterprise'
          current_period_start?: string
          current_period_end?: string
          credits_included?: number
          credits_reset_date?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: 'basic' | 'pro' | 'studio' | 'enterprise'
      generation_status: 'pending' | 'completed' | 'failed'
      ai_model: 'gemini-2.5' | 'ideogram'
    }
  }
}