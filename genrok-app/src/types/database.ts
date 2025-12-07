export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: number
          title: string
          intro: string
          thumbnail: string | null
          content: string
          buttons: Json | null
          special_features: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          intro: string
          thumbnail?: string | null
          content: string
          buttons?: Json | null
          special_features?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          intro?: string
          thumbnail?: string | null
          content?: string
          buttons?: Json | null
          special_features?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      shopify_apps: {
        Row: {
          id: number
          name: string
          category: string
          logo: string | null
          description: string
          url: string
          coupon_code: string | null
          discount: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          category: string
          logo?: string | null
          description: string
          url: string
          coupon_code?: string | null
          discount?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          category?: string
          logo?: string | null
          description?: string
          url?: string
          coupon_code?: string | null
          discount?: string | null
          created_at?: string
        }
      }
      secret_apps: {
        Row: {
          id: number
          name: string
          category: string
          logo: string | null
          short_desc: string
          description: string
          url: string
          coupon_code: string | null
          extra_data: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          category: string
          logo?: string | null
          short_desc: string
          description: string
          url: string
          coupon_code?: string | null
          extra_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          category?: string
          logo?: string | null
          short_desc?: string
          description?: string
          url?: string
          coupon_code?: string | null
          extra_data?: Json | null
          created_at?: string
        }
      }
      ai_tools: {
        Row: {
          id: number
          name: string
          category: string
          logo: string | null
          description: string
          website: string
          videos: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          category: string
          logo?: string | null
          description: string
          website: string
          videos?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          category?: string
          logo?: string | null
          description?: string
          website?: string
          videos?: Json | null
          created_at?: string
        }
      }
      ab_test_results: {
        Row: {
          id: number
          title: string
          version_a: string
          version_b: string
          result: string
          insight: string
          niche: string
          image: string | null
          apps: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          version_a: string
          version_b: string
          result: string
          insight: string
          niche: string
          image?: string | null
          apps?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          version_a?: string
          version_b?: string
          result?: string
          insight?: string
          niche?: string
          image?: string | null
          apps?: Json | null
          created_at?: string
        }
      }
      polls: {
        Row: {
          id: number
          question: string
          options: Json
          votes: Json
          created_at: string
        }
        Insert: {
          id?: number
          question: string
          options: Json
          votes?: Json
          created_at?: string
        }
        Update: {
          id?: number
          question?: string
          options?: Json
          votes?: Json
          created_at?: string
        }
      }
      web_inspiration: {
        Row: {
          id: number
          name: string
          image: string
          url: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          image: string
          url: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          image?: string
          url?: string
          created_at?: string
        }
      }
      sections_inspiration: {
        Row: {
          id: number
          name: string
          description: string
          image: string
          url: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          image: string
          url: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          image?: string
          url?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          age: string | null
          country: string | null
          occupation: string | null
          niche: string | null
          platform: string | null
          monthly_revenue: string | null
          time_in_field: string | null
          main_traffic_source: string | null
          monthly_ad_budget: string | null
          store_link: string | null
          onboarding_completed: boolean
          onboarding_step: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          age?: string | null
          country?: string | null
          occupation?: string | null
          niche?: string | null
          platform?: string | null
          monthly_revenue?: string | null
          time_in_field?: string | null
          main_traffic_source?: string | null
          monthly_ad_budget?: string | null
          store_link?: string | null
          onboarding_completed?: boolean
          onboarding_step?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          age?: string | null
          country?: string | null
          occupation?: string | null
          niche?: string | null
          platform?: string | null
          monthly_revenue?: string | null
          time_in_field?: string | null
          main_traffic_source?: string | null
          monthly_ad_budget?: string | null
          store_link?: string | null
          onboarding_completed?: boolean
          onboarding_step?: number
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
      [_ in never]: never
    }
  }
}
