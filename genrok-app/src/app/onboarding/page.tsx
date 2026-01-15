'use client';

import { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2, Globe, Search, ChevronDown, X } from 'lucide-react';
import { getCurrentUser, getUserProfile, createUserProfile, updateUserProfile } from '@/lib/supabase';

// All countries with flags
const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: 'VC', name: 'Saint Vincent', flag: '🇻🇨' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲' },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
];

// Question definitions
interface Question {
  id: string;
  type: 'text' | 'select' | 'country' | 'multiselect';
  title: string | ((name: string) => string);
  subtitle: string;
  placeholder?: string;
  field: string;
  options?: { value: string; label: string }[];
  optional?: boolean;
  typing?: boolean;
  condition?: (answers: Record<string, string | string[]>) => boolean;
}

const QUESTIONS: Question[] = [
  {
    id: 'full_name',
    type: 'text',
    title: "First things first...",
    subtitle: "What should we call you?",
    placeholder: "Your name",
    field: 'full_name',
  },
  {
    id: 'age',
    type: 'select',
    title: (name: string) => `Nice to meet you, ${name}!`,
    subtitle: "How many trips around the sun?",
    options: [
      { value: '18-24', label: '18-24' },
      { value: '25-34', label: '25-34' },
      { value: '35-44', label: '35-44' },
      { value: '45-54', label: '45-54' },
      { value: '55+', label: '55+' },
    ],
    field: 'age',
    typing: true,
  },
  {
    id: 'country',
    type: 'country',
    title: "Where in the world are you building from?",
    subtitle: "Your empire's headquarters",
    field: 'country',
  },
  {
    id: 'business_type',
    type: 'select',
    title: "What type of business do you run?",
    subtitle: "Pick the closest match",
    options: [
      { value: 'ecommerce', label: '🛒 E-commerce' },
      { value: 'dropshipping', label: '📦 Dropshipping' },
      { value: 'digital_products', label: '💻 Digital Products' },
      { value: 'saas', label: '☁️ SaaS' },
      { value: 'agency', label: '🏢 Agency / Services' },
      { value: 'affiliate', label: '🔗 Affiliate Marketing' },
      { value: 'content', label: '📱 Content Creator' },
      { value: 'other', label: '🎯 Other' },
    ],
    field: 'occupation',
  },
  {
    id: 'ecommerce_model',
    type: 'select',
    title: "What e-commerce model do you use?",
    subtitle: "How do you handle inventory?",
    options: [
      { value: 'dropshipping', label: '📦 Dropshipping' },
      { value: 'own_inventory', label: '🏭 Own inventory / Warehouse' },
      { value: 'print_on_demand', label: '🖨️ Print on Demand' },
      { value: 'hybrid', label: '🔄 Hybrid (mix of both)' },
    ],
    field: 'ecommerce_model',
    condition: (answers) => answers.occupation === 'ecommerce',
  },
  {
    id: 'fulfillment_method',
    type: 'select',
    title: "How do you fulfill orders?",
    subtitle: "Your supply chain setup",
    options: [
      { value: 'aliexpress', label: '🇨🇳 AliExpress / Direct suppliers' },
      { value: 'private_agent', label: '🤝 Private sourcing agent' },
      { value: 'own_warehouse', label: '🏭 Own warehouse / 3PL' },
      { value: 'cj_dropshipping', label: '📦 CJ Dropshipping' },
      { value: 'spocket', label: '🔌 Spocket' },
      { value: 'other', label: '🎯 Other' },
    ],
    field: 'fulfillment_method',
    condition: (answers) =>
      answers.occupation === 'dropshipping' ||
      (answers.occupation === 'ecommerce' && answers.ecommerce_model === 'dropshipping'),
  },
  {
    id: 'niche',
    type: 'select',
    title: "What's your niche?",
    subtitle: "Pick your industry (or the closest match)",
    options: [
      { value: "men's fashion", label: "Men's Fashion" },
      { value: "women's fashion", label: "Women's Fashion" },
      { value: 'home decor', label: 'Home Decor' },
      { value: 'gadgets', label: 'Gadgets' },
      { value: 'pets', label: 'Pets' },
      { value: 'kids', label: 'Kids' },
      { value: 'beauty', label: 'Beauty & Health' },
      { value: 'other', label: 'Other' },
    ],
    field: 'niche',
  },
  {
    id: 'platform',
    type: 'select',
    title: "Where do you sell?",
    subtitle: "Your digital storefront",
    options: [
      { value: 'shopify', label: 'Shopify' },
      { value: 'woocommerce', label: 'WooCommerce' },
      { value: 'amazon', label: 'Amazon' },
      { value: 'etsy', label: 'Etsy' },
      { value: 'ebay', label: 'eBay' },
      { value: 'tiktok_shop', label: 'TikTok Shop' },
      { value: 'custom', label: 'Custom Website' },
      { value: 'none', label: "Don't have one yet" },
      { value: 'other', label: 'Other Platform' },
    ],
    field: 'platform',
  },
  {
    id: 'monthly_revenue',
    type: 'select',
    title: "Let's talk numbers 💰",
    subtitle: "Monthly revenue (be honest, it stays between us)",
    options: [
      { value: '0', label: '$0 - Just getting started' },
      { value: '1-1000', label: '$1 - $1,000' },
      { value: '1000-5000', label: '$1,000 - $5,000' },
      { value: '5000-10000', label: '$5,000 - $10,000' },
      { value: '10000-25000', label: '$10,000 - $25,000' },
      { value: '25000-50000', label: '$25,000 - $50,000' },
      { value: '50000-100000', label: '$50,000 - $100,000' },
      { value: '100000-250000', label: '$100,000 - $250,000' },
      { value: '250000-500000', label: '$250,000 - $500,000' },
      { value: '500000-1000000', label: '$500,000 - $1,000,000' },
      { value: '1000000+', label: '$1,000,000+ 🚀' },
    ],
    field: 'monthly_revenue',
  },
  {
    id: 'time_in_field',
    type: 'select',
    title: "How long have you been in the game?",
    subtitle: "Time flies when you're building empires",
    options: [
      { value: 'new', label: 'Just starting out' },
      { value: '0-6months', label: 'Less than 6 months' },
      { value: '6-12months', label: '6-12 months' },
      { value: '1-2years', label: '1-2 years' },
      { value: '2-5years', label: '2-5 years' },
      { value: '5+years', label: '5+ years (OG status)' },
    ],
    field: 'time_in_field',
  },
  {
    id: 'main_traffic_source',
    type: 'multiselect',
    title: "Where do your customers come from?",
    subtitle: "Select all that apply",
    options: [
      { value: 'facebook', label: '📘 Facebook Ads' },
      { value: 'instagram', label: '📸 Instagram' },
      { value: 'tiktok', label: '🎵 TikTok' },
      { value: 'google', label: '🔍 Google Ads' },
      { value: 'youtube', label: '▶️ YouTube' },
      { value: 'seo', label: '📈 SEO / Organic' },
      { value: 'influencers', label: '⭐ Influencers' },
      { value: 'email', label: '📧 Email Marketing' },
      { value: 'snapchat', label: '👻 Snapchat' },
      { value: 'pinterest', label: '📌 Pinterest' },
      { value: 'none', label: "🤷 Haven't figured it out yet" },
    ],
    field: 'main_traffic_source',
  },
  {
    id: 'monthly_ad_budget',
    type: 'select',
    title: "What's your monthly ad spend?",
    subtitle: "Fuel for the fire",
    options: [
      { value: '0', label: '$0 - Organic only' },
      { value: '1-500', label: '$1 - $500' },
      { value: '500-1000', label: '$500 - $1,000' },
      { value: '1000-5000', label: '$1,000 - $5,000' },
      { value: '5000-10000', label: '$5,000 - $10,000' },
      { value: '10000-25000', label: '$10,000 - $25,000' },
      { value: '25000-50000', label: '$25,000 - $50,000' },
      { value: '50000+', label: '$50,000+' },
    ],
    field: 'monthly_ad_budget',
  },
  {
    id: 'store_link',
    type: 'text',
    title: "Almost done! Got a store link?",
    subtitle: "Drop it here (totally optional)",
    placeholder: "https://your-store.com",
    field: 'store_link',
    optional: true,
  },
];

// Typing effect component
function TypingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayText}
      {!isComplete && <span className="typing-cursor">|</span>}
    </span>
  );
}

// Country dropdown component
function CountryDropdown({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCountries = useMemo(() => {
    if (!search) return COUNTRIES;
    const lower = search.toLowerCase();
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.code.toLowerCase().includes(lower)
    );
  }, [search]);

  const selectedCountry = COUNTRIES.find(c => c.code === value);

  return (
    <div className="country-dropdown">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="country-dropdown-trigger"
      >
        {selectedCountry ? (
          <span className="country-selected">
            <span className="country-flag">{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </span>
        ) : (
          <span className="country-placeholder">Select your country</span>
        )}
        <ChevronDown size={20} className={`country-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="country-dropdown-menu">
          <div className="country-search-wrapper">
            <Search size={18} className="country-search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries..."
              className="country-search-input"
              autoFocus
            />
          </div>
          <div className="country-list">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                  setSearch('');
                }}
                className={`country-option ${value === country.code ? 'selected' : ''}`}
              >
                <span className="country-flag">{country.flag}</span>
                <span className="country-name">{country.name}</span>
                {value === country.code && <Check size={16} />}
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div className="country-no-results">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreviewMode = searchParams.get('preview') === 'true';

  const [userId, setUserId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [, setTypingComplete] = useState(false);

  // Filter questions based on conditions
  const activeQuestions = useMemo(() => {
    return QUESTIONS.filter(q => !q.condition || q.condition(answers));
  }, [answers]);

  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }

      setUserId(user.id);

      // In preview mode, skip all checks and just show the onboarding
      if (isPreviewMode) {
        setLoading(false);
        return;
      }

      // Check if profile exists
      const { data: profile, error } = await getUserProfile(user.id);

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        await createUserProfile(user.id);
      } else if (profile) {
        // Profile exists, check if onboarding is complete
        if (profile.onboarding_completed) {
          router.push('/dashboard');
          return;
        }
        // Always start from the beginning if not completed
        setCurrentStep(0);
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, isPreviewMode]);

  const currentQuestion = activeQuestions[currentStep];
  const isLastStep = currentStep === activeQuestions.length - 1;

  const canProceed = useMemo(() => {
    if (!currentQuestion) return false;
    if (currentQuestion.optional) return true;
    const answer = answers[currentQuestion.field];
    if (currentQuestion.type === 'multiselect') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  }, [currentQuestion, answers]);

  const getTitle = () => {
    const q = currentQuestion;
    if (typeof q.title === 'function') {
      return q.title(String(answers.full_name || 'friend'));
    }
    return q.title;
  };

  const handleNext = useCallback(async () => {
    if (!canProceed) return;

    // In preview mode, just navigate without saving
    if (isPreviewMode) {
      if (isLastStep) {
        router.push('/dashboard');
      } else {
        setCurrentStep(prev => prev + 1);
        setTypingComplete(false);
      }
      return;
    }

    if (!userId) return;

    setSaving(true);

    // Save current answer to database
    const currentAnswer = answers[currentQuestion.field];
    const valueToSave = Array.isArray(currentAnswer)
      ? currentAnswer.join(',')
      : currentAnswer || null;

    await updateUserProfile(userId, {
      [currentQuestion.field]: valueToSave,
      onboarding_step: currentStep + 1,
    });

    if (isLastStep) {
      // Complete onboarding
      await updateUserProfile(userId, {
        onboarding_completed: true,
      });
      router.push('/dashboard');
    } else {
      setCurrentStep(prev => prev + 1);
      setTypingComplete(false);
    }

    setSaving(false);
  }, [userId, canProceed, currentQuestion, answers, currentStep, isLastStep, router, isPreviewMode]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTypingComplete(false);
    }
  };

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.field]: value }));
  };

  const handleMultiSelect = (value: string) => {
    setAnswers(prev => {
      const current = prev[currentQuestion.field];
      const currentArray = Array.isArray(current) ? current : [];

      // Handle "none" option - if selecting none, clear all others
      if (value === 'none') {
        return { ...prev, [currentQuestion.field]: ['none'] };
      }

      // If none is selected and user selects something else, remove none
      const withoutNone = currentArray.filter(v => v !== 'none');

      if (currentArray.includes(value)) {
        return { ...prev, [currentQuestion.field]: withoutNone.filter(v => v !== value) };
      }
      return { ...prev, [currentQuestion.field]: [...withoutNone, value] };
    });
  };

  const handleTextChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.field]: value }));
  };

  if (loading) {
    return (
      <div className="onboarding-container">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  const progress = ((currentStep + 1) / activeQuestions.length) * 100;

  return (
    <div className="onboarding-container">
      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="onboarding-preview-banner">
          <span>Preview Mode - Changes will not be saved</span>
          <button
            onClick={() => router.push('/dashboard')}
            className="onboarding-preview-close"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div className="onboarding-progress">
        <div
          className="onboarding-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="onboarding-content"
        >
          {/* Question header */}
          <div className="onboarding-header">
            {currentQuestion.typing && currentStep > 0 ? (
              <h1 className="onboarding-title">
                <TypingText
                  text={getTitle()}
                  onComplete={() => setTypingComplete(true)}
                />
              </h1>
            ) : (
              <h1 className="onboarding-title">{getTitle()}</h1>
            )}
            <p className="onboarding-subtitle">{currentQuestion.subtitle}</p>
          </div>

          {/* Question content */}
          <div className="onboarding-question">
            {currentQuestion.type === 'text' ? (
              <div className="onboarding-text-input">
                {currentQuestion.id === 'store_link' && (
                  <Globe className="onboarding-input-icon" size={20} />
                )}
                <input
                  type={currentQuestion.id === 'store_link' ? 'url' : 'text'}
                  value={String(answers[currentQuestion.field] || '')}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="onboarding-input"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canProceed) {
                      handleNext();
                    }
                  }}
                />
              </div>
            ) : currentQuestion.type === 'country' ? (
              <CountryDropdown
                value={String(answers[currentQuestion.field] || '')}
                onChange={(value) => handleSelect(value)}
              />
            ) : currentQuestion.type === 'multiselect' ? (
              <div className="onboarding-options multiselect">
                {currentQuestion.options?.map((option) => {
                  const currentValue = answers[currentQuestion.field];
                  const isSelected = Array.isArray(currentValue) && currentValue.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleMultiSelect(option.value)}
                      className={`onboarding-option ${isSelected ? 'selected' : ''}`}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check size={18} strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="onboarding-options">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`onboarding-option ${
                      answers[currentQuestion.field] === option.value ? 'selected' : ''
                    }`}
                  >
                    <span>{option.label}</span>
                    {answers[currentQuestion.field] === option.value && (
                      <Check size={18} strokeWidth={2.5} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="onboarding-nav">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="onboarding-back"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed || saving}
              className="onboarding-next"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLastStep ? (
                <>
                  Let&apos;s Go!
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Skip for optional */}
          {currentQuestion.optional && !answers[currentQuestion.field] && (
            <button
              type="button"
              onClick={handleNext}
              className="onboarding-skip"
            >
              Skip for now
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="onboarding-container">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
