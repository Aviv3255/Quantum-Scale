'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ChevronRight,
  Search,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  Users,
  BarChart3,
  PenTool,
  Brain,
  Palette,
  Briefcase,
} from 'lucide-react';

// Lesson category types
type LessonCategory = 'copywriting' | 'psychology' | 'branding' | 'meta-ads' | 'google-ads' | 'business';

// Lesson categories for glass toggles
const lessonCategories = [
  { id: 'all', name: 'All', icon: BookOpen },
  { id: 'copywriting', name: 'Copywriting', icon: PenTool },
  { id: 'psychology', name: 'Psychology', icon: Brain },
  { id: 'branding', name: 'Branding', icon: Palette },
  { id: 'meta-ads', name: 'Meta Ads', icon: Target },
  { id: 'google-ads', name: 'Google Ads', icon: Search },
  { id: 'business', name: 'Business', icon: Briefcase },
] as const;

import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LessonModal from '@/components/LessonModal';
import { processedArticles as articles, Article } from '@/data/articles';
import { getUserProfile, supabase } from '@/lib/supabase';

// Lesson metadata for modal with categories
const lessonMeta: Record<string, { title: string; description: string; categories: LessonCategory[] }> = {
  'familiar-surprise-secret': { title: 'The Familiar Surprise Secret', description: 'Master the MAYA principle', categories: ['copywriting'] },
  'familiar-surprise-secret-v2': { title: 'The Familiar Surprise Secret (V2)', description: 'Premium redesign - MAYA principle', categories: ['copywriting'] },
  'familiar-surprise-secret-v3': { title: 'The Familiar Surprise Secret (V3)', description: 'Linear-style professional design', categories: ['copywriting'] },
  'familiar-surprise-secret-v4': { title: 'The Familiar Surprise Secret (V4)', description: 'Premium dark accent design', categories: ['copywriting'] },
  'red-button-effect': { title: 'The Red Button Effect', description: 'Understanding psychological reactance', categories: ['copywriting', 'psychology'] },
  'fred-method': { title: 'The F.R.E.D. Method', description: 'A framework for audience psychology', categories: ['copywriting'] },
  'emotion-decides': { title: 'Emotion Decides, Logic Justifies', description: 'How emotions drive purchases', categories: ['copywriting', 'psychology'] },
  'gatekeeper-method': { title: 'The Gatekeeper Method', description: 'Bypass the brain\'s attention filter', categories: ['copywriting'] },
  'three-second-rule': { title: 'The 3-Second Rule', description: 'The critical window to capture attention', categories: ['copywriting'] },
  'science-of-selling': { title: 'The Science of Selling', description: 'Systematic approach to conversion', categories: ['copywriting'] },
  'persuasion-blueprint': { title: 'The Persuasion Blueprint', description: 'Master plan for influential copy', categories: ['copywriting'] },
  'persuasion-stack': { title: 'The Persuasion Stack', description: 'Layered persuasion techniques', categories: ['copywriting'] },
  'architecture-of-influence': { title: 'Architecture of Influence', description: 'Framework of persuasive communication', categories: ['copywriting'] },
  'wiifm-principle': { title: 'The WIIFM Principle', description: 'What\'s In It For Me', categories: ['copywriting'] },
  'three-canons-of-craft': { title: 'The Three Canons of Craft', description: 'Three tests every sentence must pass', categories: ['copywriting'] },
  'cpppb-proof-loop': { title: 'The CPPPB Proof Loop', description: 'Five-element framework for persuasion', categories: ['copywriting'] },
  'damaging-admission': { title: 'The Damaging Admission', description: 'Why revealing weakness builds trust', categories: ['copywriting'] },
  'emotional-precision': { title: 'Emotional Precision', description: 'Target precise emotions that drive action', categories: ['copywriting'] },
  'blind-spot-effect': { title: 'The Blind Spot Effect', description: 'What prospects can\'t see about themselves', categories: ['copywriting'] },
  'customer-voice-mining': { title: 'Voice of Customer Mining', description: 'Extract the exact words customers use', categories: ['copywriting'] },
  'double-bind-of-fear': { title: 'The Double Bind of Fear', description: 'Leverage action and inaction fears', categories: ['copywriting'] },
  'emotion-spectrum': { title: 'The Emotion Spectrum', description: 'Map the full range of persuasive emotions', categories: ['copywriting'] },
  'forty-forty-twenty-rule': { title: 'The 40/40/20 Rule', description: 'The marketing success formula', categories: ['copywriting', 'business'] },
  'four-primal-needs': { title: 'The Four Primal Needs', description: 'Deep drivers behind every purchase', categories: ['copywriting', 'psychology'] },
  'ocpb-formula': { title: 'The OCPB Formula', description: 'Offer, Copy, Proof, Bonus stack', categories: ['copywriting'] },
  'sales-message-anatomy': { title: 'Sales Message Anatomy', description: 'Dissect what makes copy convert', categories: ['copywriting'] },
  'self-persuasion-architecture': { title: 'Self-Persuasion Architecture', description: 'Let prospects convince themselves', categories: ['copywriting', 'psychology'] },
  'structural-tension': { title: 'Structural Tension', description: 'Create irresistible forward momentum', categories: ['copywriting'] },
  'three-growth-levers': { title: 'The Three Growth Levers', description: 'Customers, frequency, transaction size', categories: ['copywriting', 'business'] },
  'three-levels-of-change': { title: 'The Three Levels of Change', description: 'Transform behavior, beliefs, identity', categories: ['copywriting', 'psychology'] },
  'trust-architecture': { title: 'The Trust Architecture', description: 'Build unshakeable credibility', categories: ['copywriting'] },
  'unique-mechanism': { title: 'The Unique Mechanism', description: 'Proprietary reason your solution works', categories: ['copywriting'] },
  'master-key-framework': { title: 'The Master Key Framework', description: 'First-principles guide to copy', categories: ['copywriting'] },
  'rule-of-one': { title: 'The Rule of One', description: 'One reader, one idea, one offer, one action', categories: ['copywriting'] },
  'architecture-of-belief': { title: 'The Architecture of Belief', description: 'Three levels of mastery', categories: ['copywriting'] },
  'copywriters-codex': { title: 'The Copywriter\'s Codex', description: 'A synthesized playbook from the masters', categories: ['copywriting'] },
  // Article-based lessons
  'best-private-agent': { title: 'Who Is the Best Private Agent', description: '5-7 day shipping, 18/6 WhatsApp support', categories: ['business'] },
  'stop-aliexpress': { title: 'Stop Using AliExpress Now', description: 'Why AliExpress destroys your brand', categories: ['business'] },
  'ltv-cheat-code': { title: 'The LTV Cheat Code', description: 'How 5% of customers generate 95% of revenue', categories: ['business'] },
  'million-dollar-roadmap': { title: 'The Roadmap to $1M/Month', description: '33 customers per day formula', categories: ['business'] },
  'geo-announcement-bar': { title: 'GEO-Location Announcement Bar', description: '67% conversion rate increase', categories: ['business'] },
  'wishlist-effect': { title: 'The Wishlist Effect', description: 'Endowment Effect psychology (+8% CVR)', categories: ['psychology', 'business'] },
  'email-vs-sms': { title: 'Email vs SMS Revenue', description: 'Which generates more revenue?', categories: ['business'] },
  'abandoned-cart-recovery': { title: 'Abandoned Cart Recovery', description: 'AI SMS vs Email: 85% vs 60%', categories: ['business'] },
  'pareto-law-ecommerce': { title: 'The Pareto Law in eCommerce', description: '5% customers = 95% revenue', categories: ['business'] },
  'whatsapp-support': { title: 'Should You Add WhatsApp Support?', description: 'Why email-only is better', categories: ['business'] },
  'meta-attribution-test': { title: 'Is Meta Lying About Creatives?', description: 'Meta only tracks 67% of purchases', categories: ['meta-ads'] },
  'post-purchase-surveys': { title: 'Post Purchase Surveys', description: 'Know your customers with data', categories: ['business'] },
  'fonts-psychology': { title: 'The Truth About Fonts', description: 'How fonts affect trust and conversions', categories: ['psychology', 'branding'] },
  // New article-based lessons (batch 2)
  'brand-search-campaign': { title: 'Brand Search Campaign', description: '18 ROAS on Google with brand search', categories: ['google-ads'] },
  'swatch-variants': { title: 'Swatch Variants Test', description: '3.4% CVR increase with image swatches', categories: ['business'] },
  'buy-now-button': { title: 'Buy Now Button Analysis', description: 'Removing it increased REV/VISIT by 15.9%', categories: ['business'] },
  'rounded-button': { title: 'Rounded Add to Cart Button', description: '28px rounded = highest CVR', categories: ['business'] },
  'best-shopify-theme': { title: 'Best Shopify Theme', description: 'Shrine vs Impulse: 34.9% CVR difference', categories: ['business'] },
  'coupon-leaking': { title: 'Coupon Leaking Problem', description: 'Stop losing profit to extensions', categories: ['business'] },
  'meta-andromeda': { title: 'Meta\'s Andromeda Brain', description: 'How to operate under Meta\'s new AI', categories: ['meta-ads'] },
  'gillette-model': { title: 'The Gillette Model', description: 'Cheap entry, expensive consumables', categories: ['business'] },
  'best-niches-2026': { title: 'Best Niches for 2026', description: 'Niches with long customer journeys', categories: ['business'] },
  'two-meta-rules': { title: 'Two Meta Product Rules', description: 'Special enough + not too specific', categories: ['meta-ads'] },
  'pinned-comment-cac': { title: 'Pinned Comment CAC Trick', description: 'Reduce CAC with objection-handling comments', categories: ['meta-ads', 'business'] },
  'mastercard-psychology': { title: 'Mastercard Logo Effect', description: 'Payment logos increase willingness to pay', categories: ['psychology'] },
  'formula-to-sell': { title: 'The Formula to Sell Anything', description: '4 elements: Dream, Likelihood, Time, Effort', categories: ['copywriting'] },
  'choose-products': { title: 'How to Choose Products', description: 'Two rules for winning products', categories: ['business'] },
  'gary-halbert-secret': { title: 'Gary Halbert\'s Secret', description: 'Sell what people already want', categories: ['copywriting'] },
  'pet-rock-story': { title: 'Pet Rock: $30M from Rocks', description: 'How to sell meaning, not products', categories: ['branding', 'business'] },
  'starbucks-ltv': { title: 'Starbucks $14,099 LTV', description: 'How 5% generate 95% of revenue', categories: ['business'] },
  'killer-headlines': { title: 'Killer Ad Headlines', description: '80% of success is in the headline', categories: ['copywriting'] },
  'two-dirty-tricks': { title: 'Two Dirty Tricks to Sell', description: 'Dream Outcome + Social Proof', categories: ['copywriting'] },
  'golden-lookalike': { title: 'Golden Lookalike Audience', description: 'LLA on top 5% spenders = $8-10 CAC', categories: ['meta-ads'] },
  'cbo-vs-abo': { title: 'CBO vs ABO Under Andromeda', description: 'ABO for testing, CBO for scaling', categories: ['meta-ads'] },
  'geo-personalization': { title: 'GEO Personalization Power', description: 'Location-based offers increase CVR', categories: ['business'] },
  'no-one-cares': { title: 'No One Cares About You', description: 'Self-interest drives all purchases', categories: ['psychology', 'copywriting'] },
  'creative-volume-2026': { title: 'Creative Volume in 2026', description: '40-70 creatives weekly for Andromeda', categories: ['meta-ads'] },
  // Psychology of Sales lessons
  'autopilot-sale': { title: 'The Autopilot Sale', description: 'How mental shortcuts make customers buy without thinking', categories: ['psychology'] },
  'borrowed-trust': { title: 'Borrowed Trust', description: 'Authority and Liking principles that bypass skepticism', categories: ['psychology'] },
  'herd-instinct': { title: 'The Herd Instinct', description: 'Social proof and similar others create buying pressure', categories: ['psychology'] },
  'gift-that-sells': { title: 'The Gift That Sells', description: 'Reciprocity loops that drive sales', categories: ['psychology'] },
  'micro-yes-mastery': { title: 'Micro-Yes Mastery', description: 'Tiny commitments create inevitable conversions', categories: ['psychology'] },
  // Additional Psychology lessons
  'authority-over-hope': { title: 'Authority Over Hope', description: 'Stop hoping they buy. Guide them with certainty.', categories: ['psychology'] },
  'certainty-transfer': { title: 'Certainty Transfer', description: 'Master the art of transferring conviction', categories: ['psychology'] },
  'conviction-architecture': { title: 'Conviction Architecture', description: 'The 3-layer pyramid of influence', categories: ['psychology'] },
  'digital-pause-power': { title: 'The Digital Pause', description: 'Confident silence converts better than discounts', categories: ['psychology'] },
  'fomo-engineering': { title: 'FOMO Engineering', description: 'Turn passive interest into urgent action', categories: ['psychology'] },
  'framing-effect-mastery': { title: 'The Framing Effect', description: 'Same facts. Wildly different decisions.', categories: ['psychology'] },
  'identity-marketing': { title: 'Identity Marketing', description: 'Sell to who they WANT to be', categories: ['psychology', 'branding'] },
  'marketers-delusion': { title: "The Marketer's Delusion", description: 'The fatal error killing conversions', categories: ['psychology'] },
  'pain-escalation-ladder': { title: 'The Pain Escalation Ladder', description: 'Ethically escalate pain to action', categories: ['psychology', 'copywriting'] },
  'telescope-flip': { title: 'The Telescope Flip', description: '97% of marketers hold it backwards', categories: ['psychology'] },
  'trust-blueprint': { title: 'The Trust Blueprint', description: 'Build instant credibility that converts', categories: ['psychology'] },
  'value-perception-lever': { title: 'The Value Perception Lever', description: 'Make price irrelevant', categories: ['psychology'] },
  'three-brains-wallet': { title: 'The 3 Brains Controlling Your Customer\'s Wallet', description: 'Which brain controls the wallet', categories: ['psychology'] },
  'pre-suasion-hack': { title: 'The Pre-Suasion Hack', description: 'Win before the pitch', categories: ['psychology'] },
  'pattern-interrupts': { title: 'Pattern Interrupts', description: 'Hijack their attention', categories: ['psychology'] },
  'dopamine-blueprint': { title: 'The Dopamine Blueprint', description: 'Create addictive loops', categories: ['psychology'] },
  'anti-sell-mastery': { title: 'The Anti-Sell', description: 'Pull, don\'t push', categories: ['psychology'] },
  // Primal Playbook lessons
  'decoy-effect': { title: 'The Decoy Effect', description: 'Why a "useless" option boosts sales by 43%', categories: ['psychology'] },
  'precise-price-trick': { title: 'The Precise Price Trick', description: 'Why $4,988 beats $5,000', categories: ['psychology'] },
  'paradox-of-choice': { title: 'The Paradox of Choice', description: 'Why fewer options = more sales', categories: ['psychology'] },
  'forty-million-mistake': { title: 'The $40 Million Mistake', description: 'Data without emotion = disaster', categories: ['psychology'] },
  'fly-in-the-urinal': { title: 'The Fly in the Urinal', description: 'Nudge psychology in action', categories: ['psychology'] },
  // Conversion Blueprint lessons
  'thirty-two-violinist': { title: 'The $32 Violinist', description: 'Context dictates perceived value', categories: ['psychology'] },
  'invisible-influence': { title: 'The Invisible Influence', description: 'How backgrounds prime buying decisions', categories: ['psychology'] },
  'price-format-code': { title: 'The Price Format Code', description: 'How formatting changes price perception', categories: ['psychology'] },
  'cost-of-standing-still': { title: 'The Cost of Standing Still', description: 'Sell the cost of NOT buying', categories: ['psychology', 'copywriting'] },
  'unity-principle': { title: 'The Unity Principle', description: 'One word turns customers into partners', categories: ['psychology'] },
  'visual-priming': { title: 'The Invisible Influencer', description: 'How background images decide what customers buy', categories: ['psychology'] },
  'objection-inversion': { title: 'The Objection Judo Trick', description: 'Turn objections into reasons to buy', categories: ['psychology', 'copywriting'] },
  'primal-stimuli': { title: 'The 6 Primal Buy Buttons', description: 'The only 6 triggers that get the reptile brain to say YES', categories: ['psychology'] },
  // CRO Flywheel + Direct Response Brand lessons
  'leaky-bucket-audit': { title: 'The $50,000 Hole in Your Funnel', description: 'PPV metric reveals where you\'re bleeding money', categories: ['psychology', 'business'] },
  'price-chunking-yesloop': { title: 'The Yes-Loop: How to 3X Your AOV', description: 'Break big prices into irresistible small yeses', categories: ['psychology'] },
  'objection-destroyer': { title: 'The At First I Thought Framework', description: 'Turn objections into conversions with one sentence', categories: ['psychology', 'copywriting'] },
  'product-page-anatomy': { title: 'The 5-Element Product Page', description: 'The exact anatomy of pages that convert at 8%+', categories: ['psychology', 'business'] },
  'post-purchase-goldmine': { title: 'The Hidden Revenue You\'re Ignoring', description: 'Turn $40 customers into $120 instantly', categories: ['psychology', 'business'] },
  'bottom-up-brand': { title: 'Why Movements Beat Marketing', description: 'Build a brand like a movement, not a corporation', categories: ['psychology', 'branding'] },
  'halo-serial-position': { title: 'The First & Last Impression Hack', description: '0.05 seconds decides if they trust you', categories: ['psychology'] },
  'ikea-effect': { title: 'The IKEA Effect', description: 'Why DIY = 63% higher perceived value', categories: ['psychology'] },
  'von-restorff-effect': { title: 'The Von Restorff Effect', description: 'Make your CTA impossible to miss', categories: ['psychology'] },
  'jakobs-law': { title: 'Jakob\'s Law', description: 'Why "unique" checkout flows kill conversions', categories: ['psychology'] },
  // Unseen Seller + Psychological Commerce lessons
  'gaze-direction': { title: 'The Gaze Hack', description: 'Where they look is where they click', categories: ['psychology'] },
  'five-second-test': { title: 'The 5-Second Test', description: 'Why clarity crushes cleverness', categories: ['psychology'] },
  'speed-equals-trust': { title: 'The $1.7 Billion Speed Bump', description: '0.1 second = 1% more sales', categories: ['psychology'] },
  'imperceptible-nudge': { title: 'The $200 Million Color', description: 'Invisible nudges that drive millions', categories: ['psychology'] },
  'cognitive-load-trap': { title: 'The Easy Brain Wins', description: 'Reduce friction, increase trust', categories: ['psychology'] },
  'placebo-product': { title: 'Your Product Is a Placebo', description: 'Perception literally alters reality', categories: ['psychology'] },
  'information-asymmetry': { title: 'The Prada Mystery Play', description: 'Hide information to elevate status', categories: ['psychology', 'branding'] },
  'visual-shorthand': { title: 'Toothpaste Stripes Psychology', description: 'Visual cues shortcut to quality', categories: ['psychology'] },
  'radical-honesty-play': { title: 'The Inside Joke Effect', description: 'Admit you\'re marketing to win', categories: ['psychology'] },
  'hermes-doctrine': { title: 'The Hermès Infinite Game', description: 'Protect the Birkin, play forever', categories: ['psychology', 'branding'] },
  // DTC Growth + Luxury Status + Psychology Growth lessons
  'hero-mechanism': { title: 'The $4,225 Question', description: 'Why Oura Ring costs $399 vs $12 knockoff', categories: ['branding'] },
  'scammer-playbook-good': { title: "The Scammer's Playbook (Used for Good)", description: '7 ethical persuasion levers', categories: ['branding', 'psychology'] },
  'us-vs-them': { title: 'The David vs Goliath Play', description: 'Create tribal identity through enemies', categories: ['branding'] },
  'brand-universe': { title: 'Build a World, Not Just a Store', description: 'Create universes, not products', categories: ['branding'] },
  'product-to-identity': { title: 'From Product to Identity Purchase', description: 'Transform commodities to identity', categories: ['branding'] },
  'commodity-escape': { title: 'The Commodity Trap', description: 'How Starbucks charges $6 for $0.50 coffee', categories: ['branding'] },
  'myth-and-urgency': { title: 'Weaving Myth & Manufacturing Urgency', description: 'Create irresistible desire through scarcity + story', categories: ['branding'] },
  'value-ladder': { title: 'The Value Ladder & Hidden Menu', description: 'Secret tiers that create aspiration', categories: ['branding', 'business'] },
  'box-worth-300': { title: 'The $300 Empty Box', description: "Tiffany's packaging IS the product", categories: ['branding'] },
  'story-taste-experiment': { title: 'Your Story Changes How Products TASTE', description: 'Story literally alters perception', categories: ['branding', 'psychology'] },
  'scarcity-calendar': { title: "Le Creuset's Scarcity Engine", description: 'One color per year creates collectors', categories: ['branding'] },
  'anchor-moments': { title: "Ralph Lauren's Anchor Moments", description: '$20K bag makes $200 polo feel cheap', categories: ['branding', 'psychology'] },
  'irrational-loyalty': { title: 'The Pizza Test & Sock Test', description: 'Once identity forms, logic dies', categories: ['branding', 'psychology'] },
  'reciprocity-engine': { title: "The 42% Sales Trick (That's Not a Trick)", description: 'Why giving away free samples increased sales 42%', categories: ['branding', 'psychology'] },
  'gucci-short-termism': { title: 'Why Gucci Is Dying', description: 'Fashion chases trends. Luxury chases timelessness', categories: ['branding'] },
  'ethical-persuasion-compass': { title: 'The Magic Show Test', description: 'The ethical line between persuasion and manipulation', categories: ['branding', 'psychology'] },
  'two-worlds-mastery': { title: 'The Two Worlds Every DTC Founder Must Master', description: 'Performance marketing vs brand building', categories: ['branding', 'business'] },
  'race-to-bottom-escape': { title: 'Why Your ROAS Is Killing Your Business', description: "You're winning every battle and losing the war", categories: ['branding', 'business'] },
  'founder-operating-system': { title: 'The 4 Traits of Legendary Brand Founders', description: 'What separates iconic founders from the rest', categories: ['branding', 'business'] },
  '13800-percent-effect': { title: 'Why 10% Better = 13,800% Better', description: 'Small improvements compound into massive advantages', categories: ['branding', 'business'] },
  'dior-pricing-secret': { title: 'The $57 Bag That Sells for $3,500', description: 'What Dior and Rolex know about pricing', categories: ['branding'] },
  'consumption-conversion': { title: "Why Your Product Page Isn't Converting", description: 'The gap between consumption and conversion', categories: ['branding', 'business'] },
  'luxury-mindset-shift': { title: 'The 4 Mindset Shifts That Create Premium Brands', description: 'Transform your thinking from commodity to luxury', categories: ['branding'] },
  // CRO & Testing lessons
  'three-cro-tests': { title: 'The 3 CRO Tests That Actually Move Revenue', description: 'Focus on tests that impact the bottom line', categories: ['branding', 'business'] },
  'digital-velvet-rope': { title: 'The Digital Velvet Rope', description: 'Create exclusive experiences that elevate perception', categories: ['branding'] },
  'hidden-menu-psychology': { title: 'The Hidden Menu Effect', description: 'Secret options that create status and belonging', categories: ['branding', 'psychology'] },
  'celebrity-gifting-flywheel': { title: 'The Celebrity Gifting Flywheel', description: 'Turn free products into millions in influence', categories: ['branding'] },
  'forbidden-coffee-hook': { title: 'The Forbidden Coffee Hook', description: 'Mystery and exclusivity wrapped in a story', categories: ['branding'] },
  // Meta Ads 2026 lessons (Andromeda)
  'meta-three-second-hook': { title: 'The 3-Second Hook Rule', description: 'Meta judges your creative in the first 3 seconds', categories: ['meta-ads'] },
  'meta-70-20-10-rule': { title: 'The 70/20/10 Creative Rule', description: '70% proven, 20% iteration, 10% wild experiments', categories: ['meta-ads'] },
  'meta-ga4-integration': { title: 'The GA4 Signal Hack', description: 'Feed Meta high-quality signals via GA4', categories: ['meta-ads'] },
  'meta-1-1-x-structure': { title: 'The 1-1-X Structure', description: '1 campaign, 1 ad set, X creatives', categories: ['meta-ads'] },
  // Meta Ads 2026 lessons (Performance)
  'meta-auction-formula': { title: 'The Meta Auction Formula', description: 'Total Value = Bid × EAR × Quality', categories: ['meta-ads'] },
  'meta-controls-vs-suggestions': { title: 'Controls vs Suggestions', description: 'Hard boundaries vs soft signals in targeting', categories: ['meta-ads'] },
  'meta-creative-ecosystem': { title: 'The Creative Ecosystem', description: 'Build 20-50 meaningfully different ads', categories: ['meta-ads'] },
  'meta-capi-pixel-setup': { title: 'CAPI + Pixel Setup', description: 'Dual tracking is now mandatory', categories: ['meta-ads'] },
  // Additional missing lessons
  'product-reviews-test': { title: 'Product Reviews Test', description: 'Do reviews actually increase conversions?', categories: ['business'] },
  'ascension-ladder': { title: 'The Ascension Ladder', description: 'Move customers up the value chain', categories: ['business'] },
  'brain-friendly-ux': { title: 'Brain-Friendly UX', description: 'Design for how the brain actually works', categories: ['psychology', 'business'] },
  'brand-moat': { title: 'The Brand Moat', description: 'Build defensible competitive advantages', categories: ['branding', 'business'] },
  'brand-promise-code': { title: 'The Brand Promise Code', description: 'Craft promises that convert', categories: ['branding', 'copywriting'] },
  'checkout-line-effect': { title: 'The Checkout Line Effect', description: 'Last-minute impulse psychology', categories: ['psychology', 'business'] },
  'compound-testing-effect': { title: 'The Compound Testing Effect', description: 'How small wins stack into massive gains', categories: ['business'] },
  'emotional-gap': { title: 'The Emotional Gap', description: 'Bridge the gap between desire and action', categories: ['psychology'] },
  'emotional-problem': { title: 'The Emotional Problem', description: 'Find the real problem behind the problem', categories: ['psychology'] },
  'five-value-heuristics': { title: 'The 5 Value Heuristics', description: 'Mental shortcuts for perceived value', categories: ['psychology'] },
  'ice-prioritization': { title: 'ICE Prioritization', description: 'Impact, Confidence, Ease framework', categories: ['business'] },
  'identity-shift-effect': { title: 'The Identity Shift Effect', description: 'When buying becomes becoming', categories: ['psychology', 'branding'] },
  'le-creuset-scarcity-engine': { title: 'The Le Creuset Scarcity Engine', description: 'Limited colors create collectors', categories: ['branding'] },
  'local-holiday-legitimacy': { title: 'Local Holiday Legitimacy', description: 'Cultural moments that drive sales', categories: ['business'] },
  'logo-is-worthless': { title: 'Your Logo Is Worthless', description: 'Brand equity isn\'t in the symbol', categories: ['branding'] },
  'micro-yes-engine': { title: 'The Micro-Yes Engine', description: 'Build momentum through tiny commitments', categories: ['psychology'] },
  'missing-piece-effect': { title: 'The Missing Piece Effect', description: 'Incomplete sets drive completion urge', categories: ['psychology'] },
  'nine-trust-levers': { title: 'The 9 Trust Levers', description: 'Every element that builds credibility', categories: ['psychology'] },
  'ninety-seven-percent-leak': { title: 'The 97% Leak', description: 'Most visitors leave without buying', categories: ['business'] },
  'offer-is-everything': { title: 'The Offer Is Everything', description: 'Your offer matters more than your copy', categories: ['copywriting', 'business'] },
  'owned-audience-effect': { title: 'The Owned Audience Effect', description: 'Build assets you control', categories: ['business'] },
  'pain-dream-bridge': { title: 'The Pain-Dream Bridge', description: 'Connect current pain to desired future', categories: ['copywriting'] },
  'performance-engine': { title: 'The Performance Engine', description: 'Systems that scale profitably', categories: ['business'] },
  'poppy-disruptor-blueprint': { title: 'The Poppy Disruptor Blueprint', description: 'Break category conventions', categories: ['branding'] },
  'post-purchase-momentum': { title: 'Post-Purchase Momentum', description: 'Turn buyers into repeat customers', categories: ['business'] },
  'premium-flywheel': { title: 'The Premium Flywheel', description: 'Compound premium positioning', categories: ['branding'] },
  'price-creates-value': { title: 'Price Creates Value', description: 'Higher prices increase perception', categories: ['psychology', 'branding'] },
  'psychological-moat': { title: 'The Psychological Moat', description: 'Mental barriers that protect your brand', categories: ['psychology', 'branding'] },
  'self-selection-principle': { title: 'The Self-Selection Principle', description: 'Let customers qualify themselves', categories: ['psychology'] },
  'sell-the-identity': { title: 'Sell the Identity', description: 'Products are identity purchases', categories: ['branding'] },
  'shape-psychology': { title: 'Shape Psychology', description: 'How shapes affect perception', categories: ['psychology'] },
  'smallest-viable-market': { title: 'The Smallest Viable Market', description: 'Dominate a niche before expanding', categories: ['business'] },
  'sms-open-rate-secret': { title: 'The SMS Open Rate Secret', description: 'Why SMS beats email for engagement', categories: ['business'] },
  'story-changes-taste': { title: 'Story Changes Taste', description: 'Narrative literally alters perception', categories: ['psychology', 'branding'] },
  'thirty-five-thousand-decisions': { title: '35,000 Decisions', description: 'Reduce decision fatigue to convert', categories: ['psychology'] },
  'whale-customer-paradox': { title: 'The Whale Customer Paradox', description: 'Your best customers behave differently', categories: ['business'] },
  // Google Ads 2026 lessons
  'google-highest-cpa-wins': { title: 'Why The Highest CPA Wins', description: 'The counterintuitive truth about Google Ads dominance', categories: ['google-ads'] },
  'google-product-feed-mastery': { title: 'Your Product Feed IS Your Ad', description: 'The hidden weapon for Shopping & PMax success', categories: ['google-ads'] },
  'google-pmax-blueprint': { title: 'The PMax Asset Group Blueprint', description: 'Stop forcing Google AI to guess', categories: ['google-ads'] },
  'google-data-quality-edge': { title: 'Better Data In, Better AI Out', description: 'The quality edge that wins in 2026', categories: ['google-ads'] },
  'google-competitor-conquest': { title: 'Competitor Conquest', description: 'Steal market share legally with Google Ads', categories: ['google-ads'] },
  // Google Shopping Blueprint lessons
  'google-shopping-intent': { title: 'Active Intent: Why Google Shopping Wins', description: 'Capture users who are actively searching to buy', categories: ['google-ads'] },
  'google-store-trust-checklist': { title: 'Earn Google\'s Trust First', description: 'The store readiness checklist to avoid suspension', categories: ['google-ads'] },
  'google-hero-product-funnel': { title: 'Find Your Hero Products', description: 'From clicks to winners - buying data not profit', categories: ['google-ads'] },
  'google-click-fraud-shield': { title: 'Shield Your Budget from Click Fraud', description: 'Protect your data from bots and competitors', categories: ['google-ads'] },
  'google-ai-max-decision': { title: 'AI Max: Power vs Control', description: 'The decision framework for Google\'s AI automation', categories: ['google-ads'] },
  // Google Growth Engine lessons
  'google-negative-keyword-colander': { title: 'The Negative Keyword Colander', description: 'Filter out waste - only profitable clicks get through', categories: ['google-ads'] },
  'google-optimization-cadence': { title: 'The Optimization Rhythm', description: 'Stop random tinkering - follow a disciplined cadence', categories: ['google-ads'] },
  'google-ad-assets-arsenal': { title: 'Free Real Estate: Ad Assets', description: 'Make your ads bigger and more clickable - for free', categories: ['google-ads'] },
  'google-landing-page-bridge': { title: 'The Click is Only Half the Battle', description: 'What happens AFTER the click determines success', categories: ['google-ads'] },
  'google-ai-overviews-opportunity': { title: 'Ads in AI Overviews', description: 'Capture users in Google\'s new AI-powered search results', categories: ['google-ads'] },
  // Google Ads Advanced lessons
  'google-brand-moat': { title: 'Brand is the Ultimate Moat', description: 'The barrier competitors can\'t copy with a bigger budget', categories: ['google-ads', 'branding'] },
  'google-budget-reallocation': { title: 'Feed Your Winners', description: 'How to go from 2.8x to 5.1x ROAS by reallocating budget', categories: ['google-ads'] },
  'google-focus-firepower': { title: 'Focus Your Firepower', description: 'Stop spreading thin - consolidate budget on bestsellers', categories: ['google-ads'] },
  'google-influencer-creative': { title: 'Outsource Your Creative Genius', description: 'The scaling hack: hire influencers for ad content', categories: ['google-ads'] },
  // Business Fundamentals lessons
  'biz-infinite-money-engine': { title: 'The Infinite Money Engine', description: 'The single equation that transforms eCommerce into a video game with unlimited money', categories: ['business'] },
  'biz-rat-brain-hijack': { title: 'The Rat Brain Hijack', description: 'How to command attention by triggering the subconscious mind', categories: ['business', 'psychology'] },
  'biz-velocity-advantage': { title: 'The Velocity Advantage', description: 'Why speed is the biggest unfair advantage in business', categories: ['business'] },
  'biz-remarkable-product': { title: 'Build Something Remarkable', description: 'Why good enough products fight the laws of the matrix forever', categories: ['business'] },
  'biz-asset-not-job': { title: 'Build an Asset, Not a Job', description: 'The $3 million difference between earning income and building wealth', categories: ['business'] },
  // Business Leverage Playbook lessons
  'biz-leverage-equation': { title: 'The Leverage Equation', description: 'Stop working harder. Start working smarter with the equation that changes everything.', categories: ['business'] },
  'biz-counter-position': { title: 'The Counter-Position Strategy', description: 'Create a battlefield where the giants\' money is worthless.', categories: ['business'] },
  'biz-awareness-sweet-spot': { title: 'The Market Awareness Sweet Spot', description: 'Enter markets where customers feel the pain but don\'t know the solution exists.', categories: ['business'] },
  'biz-barbell-strategy': { title: 'The Barbell Strategy', description: '5% big swings. 95% small wins. Avoid the dangerous middle.', categories: ['business'] },
  'biz-one-pager-blueprint': { title: 'The One-Pager Blueprint', description: 'Kill shiny object syndrome with the 4 questions that become your North Star.', categories: ['business'] },
  // E-commerce Cheat Code Business lessons
  'biz-infinite-money-loop': { title: 'The Infinite Money Loop', description: 'The 6-step flywheel that turns paid advertising into infinite profit', categories: ['business'] },
  'biz-marketing-company': { title: "You're Not a Brand", description: 'The identity shift that separates winners from wannabes', categories: ['business', 'branding'] },
  'biz-product-expansion': { title: 'The Ridge Playbook', description: 'How Ridge solved their LTV problem with product expansion', categories: ['business'] },
  'biz-zero-cac-engine': { title: 'The $0 CAC Engine', description: 'Get customers for free before you ever spend on ads', categories: ['business'] },
  'biz-creative-targeting': { title: 'Creative is the New Targeting', description: 'Volume + Diversity + Measurement: The system for winning', categories: ['business', 'meta-ads'] },
  // The Infinite Money Equation lessons
  'biz-3x-threshold': { title: 'The 3x Threshold', description: 'The single equation that separates struggling stores from money-printing machines', categories: ['business'] },
  'biz-asymmetric-monopoly': { title: 'The Asymmetric Monopoly', description: 'How a 1400:1 ratio creates a legal monopoly nobody can compete with', categories: ['business'] },
  'biz-authenticity-anchor': { title: 'The Authenticity Anchor', description: 'How Nike stayed cool for 40 years while competitors chased trends and died', categories: ['business', 'branding'] },
  'biz-brand-ltv-engine': { title: 'The Brand LTV Engine', description: 'How Ralph Lauren, LEGO, and Le Creuset engineer endless reasons to return', categories: ['business', 'branding'] },
  'biz-brand-temple': { title: 'The Brand Temple Strategy', description: 'How Ralph Lauren, LEGO, and Le Creuset built billion-dollar empires through loyalty', categories: ['business', 'branding'] },
  'biz-cash-conversion': { title: 'The Negative Cash Conversion Cycle', description: 'How Davie Fogarty bootstrapped The Oodie to nearly $1B using customer money', categories: ['business'] },
  'biz-closer-framework': { title: 'The CLOSER Framework', description: 'Alex Hormozi\'s battle-tested 6-step sales system that converts without being pushy', categories: ['business', 'copywriting'] },
  'biz-courage-variable': { title: 'The Courage Variable', description: 'The hidden code behind every empire: 7,000 failures, £2 profit, and betting it all', categories: ['business'] },
  'biz-empathy-engine': { title: 'The Empathy Engine', description: 'The invisible difference between good service and service that creates lifelong customers', categories: ['business'] },
  'biz-four-pillars': { title: 'The Four Pillars Protocol', description: 'The complete framework to escape the wheel and build a business that prints money', categories: ['business'] },
  'biz-hamster-wheel': { title: 'The Hamster Wheel Trap', description: 'The Matrix-level prison keeping 99% of eCommerce stores broke—and how to escape', categories: ['business'] },
  'biz-infinite-flywheel': { title: 'The Infinite Money Flywheel', description: 'How $100 ad spend becomes a predictable, scalable money machine', categories: ['business'] },
  'biz-leaders-burden': { title: 'The Leader\'s Burden', description: 'If the system fails, the leader failed. The ultimate accountability framework', categories: ['business'] },
  'biz-lifetime-gross-profit': { title: 'Lifetime Gross Profit', description: 'The number everyone calculates wrong—and why it kills businesses', categories: ['business'] },
  'biz-logic-trap': { title: 'The Logic Trap', description: 'Why the smartest marketing decision can destroy your sales overnight', categories: ['business', 'psychology'] },
  'biz-ltv-cac-dashboard': { title: 'The Operator\'s Dashboard', description: 'The LTV:CAC ratios that separate struggling businesses from unstoppable ones', categories: ['business'] },
  'biz-ltv-levers': { title: 'The LTV Control Panel', description: '7 levers to increase customer lifetime value and maximize profitability', categories: ['business'] },
  'biz-model-vs-method': { title: 'Model vs Method', description: 'Why the best model beats the best tactics every single time', categories: ['business'] },
  'biz-objection-dance': { title: 'The Objection Dance', description: 'Handling objections is a dance, not a fight. 4 techniques that disarm resistance', categories: ['business', 'psychology'] },
  'biz-operator-mindset': { title: 'The Operator\'s Mindset', description: 'How Ben Francis built Gymshark to $1.5B by putting the model above his ego', categories: ['business'] },
  'biz-purchase-cycle-engine': { title: 'The Purchase Cycle Engineer', description: 'How Le Creuset turned a once-a-decade purchase into an annual buying event', categories: ['business'] },
  'biz-replication-protocol': { title: 'The Replication Protocol', description: 'Alex Hormozi\'s secret: Simple scales, fancy fails. Why systems beat talent', categories: ['business'] },
  'biz-rfm-secret': { title: 'The RFM Secret', description: 'How to identify your best customers and make more money from fewer people', categories: ['business'] },
  'biz-rule-of-100': { title: 'The Rule of 100', description: 'The volume strategy that separates dreamers from millionaires', categories: ['business'] },
  'biz-valley-protocol': { title: 'The Valley of Despair Protocol', description: 'Why 97% of entrepreneurs quit at the exact moment they should push harder', categories: ['business'] },
  // New LTV:CAC Playbook lessons
  'biz-high-margin-fortress': { title: 'The High Margin Fortress', description: 'Build a margin moat that competitors can\'t cross', categories: ['business'] },
  'biz-ridge-wallet-protocol': { title: 'The Ridge Wallet Protocol', description: 'How Ridge solved the one-product problem and unlocked infinite LTV', categories: ['business'] },
  'biz-20-domination': { title: 'The 20% Domination Rule', description: '20% of your customers generate 80% of your revenue', categories: ['business'] },
  'biz-channel-mix-formula': { title: 'The Channel Mix Formula', description: 'Master the optimal channel allocation for maximum ROI', categories: ['business'] },
  'biz-next-best-dollar': { title: 'The Next Best Dollar', description: 'Think like a capital allocator, not a channel manager', categories: ['business'] },
  // E-commerce Cheat Code PDF #2 lessons
  'biz-authenticity-engine': { title: 'The Authenticity Engine', description: 'The compounding force that makes your brand impossible to replicate', categories: ['business', 'branding'] },
  'biz-creator-army': { title: 'The Creator Army', description: 'Build 500+ micro-creators instead of hiring expensive agencies', categories: ['business'] },
  'biz-mission-driven-brand': { title: 'The Mission-Driven Brand', description: 'Why brands with a cause outperform everyone else', categories: ['business', 'branding'] },
  'biz-savage-mentality': { title: 'The Savage Mentality', description: 'The relentless execution mindset that separates winners from dreamers', categories: ['business'] },
  'biz-systems-architect': { title: 'The Systems Architect', description: 'The transition from player to systems architect that unlocks $10M+', categories: ['business'] },
  // Infinite Money Game PDF lessons
  'biz-90-percent-trap': { title: 'The 90% Trap', description: 'Why 90% of stores guess their way to failure—while 1% use math', categories: ['business'] },
  'biz-animal-mindset': { title: 'The Animal Mindset', description: 'How Davie Fogarty built a $500M empire through relentless action', categories: ['business'] },
  'biz-channel-cac-decoder': { title: 'Channel CAC Decoder', description: 'Why your blended CAC is lying to you', categories: ['business'] },
  'biz-6-to-1-problem': { title: 'The 6:1 Problem', description: 'Why your "amazing" LTV:CAC ratio might be killing growth', categories: ['business'] },
  'biz-survival-cycle': { title: 'The Survival Cycle', description: 'The doom loop that kills 97% of stores', categories: ['business'] },
  'biz-infinite-money-glitch': { title: 'The Infinite Money Glitch', description: 'The self-fueling growth flywheel', categories: ['business'] },
  'biz-price-anchoring': { title: 'Price Anchoring Power', description: 'Why your $47 offer looks irresistible next to $297', categories: ['business', 'psychology'] },
  'biz-look-back-window': { title: 'The Look-Back Window', description: 'Why your 30-day data is lying to you', categories: ['business'] },
};

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Articles', icon: BookOpen },
  { id: 'ltv', name: 'LTV & Growth', icon: TrendingUp },
  { id: 'conversion', name: 'Conversion', icon: Target },
  { id: 'marketing', name: 'Marketing', icon: Zap },
  { id: 'operations', name: 'Operations', icon: BarChart3 },
  { id: 'psychology', name: 'Psychology', icon: Users },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Component to handle URL search params (must be wrapped in Suspense)
function LessonParamsHandler({
  onLessonOpen
}: {
  onLessonOpen: (slug: string, slide: number | null) => void
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lessonParam = searchParams.get('lesson');
    const slideParam = searchParams.get('slide');

    if (lessonParam && lessonMeta[lessonParam]) {
      onLessonOpen(lessonParam, slideParam ? parseInt(slideParam, 10) : null);
      // Clear the URL params after opening the lesson
      router.replace('/learn', { scroll: false });
    }
  }, [searchParams, router, onLessonOpen]);

  return null;
}

export default function LearnPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [initialSlide, setInitialSlide] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('Builder');
  const [activeLessonCategory, setActiveLessonCategory] = useState<string>('all');
  const [customThumbnails, setCustomThumbnails] = useState<Record<string, string>>({});

  // Fetch custom thumbnails from database
  useEffect(() => {
    async function fetchThumbnails() {
      try {
        const { data } = await (supabase
          .from('lesson_thumbnails') as ReturnType<typeof supabase.from>)
          .select('slug, thumbnail_url');

        if (data && Array.isArray(data)) {
          const thumbnailMap: Record<string, string> = {};
          data.forEach((item: { slug: string; thumbnail_url: string | null }) => {
            if (item.thumbnail_url) {
              thumbnailMap[item.slug] = item.thumbnail_url;
            }
          });
          setCustomThumbnails(thumbnailMap);
        }
      } catch (error) {
        console.error('Failed to fetch custom thumbnails:', error);
      }
    }
    fetchThumbnails();
  }, []);

  // Callback for URL params handler
  const handleLessonFromUrl = useCallback((slug: string, slide: number | null) => {
    setSelectedLesson(slug);
    setInitialSlide(slide);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch user's name for lesson personalization
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return;

      // First try user_metadata
      const metaName = user.user_metadata?.full_name;
      if (metaName) {
        setUserName(metaName.split(' ')[0]);
        return;
      }

      // Fallback to profile
      const { data: profile } = await getUserProfile(user.id);
      if (profile?.full_name) {
        setUserName(profile.full_name.split(' ')[0]);
      }
    };

    fetchUserName();
  }, [user]);

  // Handle opening a lesson
  const openLesson = useCallback((slug: string) => {
    setSelectedLesson(slug);
  }, []);

  // Handle closing a lesson
  const closeLesson = useCallback(() => {
    setSelectedLesson(null);
    setInitialSlide(null);
  }, []);

  // Get lesson info for modal
  const selectedLessonInfo = selectedLesson ? lessonMeta[selectedLesson] : null;

  const filteredArticles = useMemo(() => articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, searchQuery]);

  const featuredArticles = useMemo(() => filteredArticles.filter((a) => a.isFeatured), [filteredArticles]);
  const regularArticles = useMemo(() => filteredArticles.filter((a) => !a.isFeatured), [filteredArticles]);

  // Calculate lesson category counts
  const lessonCategoryCounts = useMemo(() => {
    const allLessonSlugs = Object.keys(lessonMeta);
    const counts: Record<string, number> = { all: allLessonSlugs.length };

    lessonCategories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = Object.values(lessonMeta).filter((m) =>
          m.categories.includes(cat.id as LessonCategory)
        ).length;
      }
    });

    return counts;
  }, []);

  // Filter lessons by active category and search query
  const filteredLessons = useMemo(() => {
    return Object.entries(lessonMeta).filter((entry) => {
      const meta = entry[1];
      const matchesCategory = activeLessonCategory === 'all' ||
        meta.categories.includes(activeLessonCategory as LessonCategory);
      const matchesSearch = !searchQuery ||
        meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meta.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeLessonCategory, searchQuery]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* URL params handler wrapped in Suspense for SSR compatibility */}
      <Suspense fallback={null}>
        <LessonParamsHandler onLessonOpen={handleLessonFromUrl} />
      </Suspense>

      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Learning Center</h1>
              <p>274 interactive lessons + 38 in-depth articles on scaling strategies</p>
            </div>

            {/* Search */}
            <div className="search-input w-full md:w-72">
              <Search className="search-input-icon" size={18} strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search lessons & articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>
        </header>

        {/* Lesson Modal - opens ON TOP of everything */}
        {selectedLesson && selectedLessonInfo && (
          <LessonModal
            slug={selectedLesson}
            title={selectedLessonInfo.title}
            description={selectedLessonInfo.description}
            userName={userName}
            onClose={closeLesson}
            initialSlide={initialSlide}
          />
        )}

        {/* Interactive Lessons Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={20} className="text-[var(--text-secondary)]" strokeWidth={1.5} />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Interactive Lessons</h2>
          </div>

          {/* Glass Toggle Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {lessonCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeLessonCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveLessonCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl
                    backdrop-blur-md border transition-all whitespace-nowrap
                    ${isActive
                      ? 'bg-black/85 border-black/90 text-white shadow-lg'
                      : 'bg-white/10 border-white/20 text-gray-600 hover:bg-white/20 hover:border-black/10'
                    }
                  `}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span className="font-medium text-sm">{cat.name}</span>
                  <span className={`text-xs ${isActive ? 'opacity-70' : 'opacity-60'}`}>
                    ({lessonCategoryCounts[cat.id]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lessons Grid */}
          <AnimatePresence mode="wait">
            {filteredLessons.length > 0 ? (
              <motion.div
                key={activeLessonCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid-3 mt-6"
              >
                {filteredLessons.map(([slug, meta]) => (
                  <motion.div key={slug} variants={itemVariants}>
                    <LessonCard
                      slug={slug}
                      title={meta.title}
                      description={meta.description}
                      categories={meta.categories}
                      onLessonClick={openLesson}
                      customThumbnail={customThumbnails[slug]}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="empty-state mt-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[var(--bg-secondary)]">
                  <Search size={24} className="text-[var(--text-tertiary)]" strokeWidth={1.5} />
                </div>
                <h3>No lessons found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Articles Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={20} className="text-[var(--text-secondary)]" strokeWidth={1.5} />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Articles</h2>
        </div>

        {/* Categories Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-[var(--primary)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-hover)]'
                }`}
                style={isActive ? { color: '#FFFFFF' } : undefined}
              >
                <category.icon size={16} strokeWidth={1.5} style={isActive ? { color: '#FFFFFF' } : undefined} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="section">
            <div className="section-header">
              <Sparkles size={20} className="section-icon" />
              <h2 className="section-title">Featured Articles</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid-3"
            >
              {featuredArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <ArticleCard article={article} featured onLessonClick={openLesson} customThumbnails={customThumbnails} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.name}
              <span className="ml-2 font-normal text-[var(--text-muted)]">
                ({filteredArticles.length})
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid-3"
              >
                {regularArticles.map((article) => (
                  <motion.div key={article.id} variants={itemVariants}>
                    <ArticleCard article={article} onLessonClick={openLesson} customThumbnails={customThumbnails} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="empty-state"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[var(--bg-secondary)]">
                  <Search size={24} className="text-[var(--text-tertiary)]" strokeWidth={1.5} />
                </div>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </DashboardLayout>
  );
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  onLessonClick: (slug: string) => void;
  customThumbnails?: Record<string, string>;
}

function ArticleCard({ article, featured, onLessonClick, customThumbnails }: ArticleCardProps) {
  // Check if this is a lesson (has directUrl like /learn/lessons/xxx)
  const isLesson = !!article.directUrl && article.directUrl.includes('/lessons/');

  // Extract slug from directUrl for lessons
  const lessonSlug = isLesson
    ? article.directUrl?.split('/lessons/')[1] || ''
    : '';

  // Use custom thumbnail from database if available, otherwise use static thumbnail
  const thumbnailSrc = (lessonSlug && customThumbnails?.[lessonSlug]) || article.thumbnail;

  // For lessons: open modal. For articles: navigate to page
  const handleClick = (e: React.MouseEvent) => {
    if (isLesson && lessonSlug) {
      e.preventDefault();
      onLessonClick(lessonSlug);
    }
  };

  // Link href - lessons will be intercepted by onClick, articles navigate normally
  const linkHref = isLesson ? '#' : `/learn/${article.slug}`;

  const CardContent = () => (
    <>
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-secondary)]">
        <Image
          src={thumbnailSrc}
          alt={article.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {featured && (
          <div className="absolute top-4 left-4 badge badge-primary">
            Featured
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 backdrop-blur-md rounded-full bg-white/90 border border-white/50">
          <Clock size={14} className="text-[var(--text-muted)]" strokeWidth={1.5} />
          <span className="text-xs font-medium text-[var(--text-secondary)]">{article.readTime} min read</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge badge-gold capitalize">
            {article.category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:opacity-70 transition-opacity">
          {article.title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Stats if available */}
        {article.stats && article.stats.length > 0 && (
          <div className="flex gap-4 mb-4">
            {article.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[var(--text-primary)]">{stat.value}</span>
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 font-medium text-sm text-[var(--text-primary)] group-hover:gap-2 transition-all">
          {isLesson ? 'Start lesson' : 'Read article'}
          <ChevronRight size={16} strokeWidth={1.5} />
        </div>
      </div>
    </>
  );

  // For lessons, use a button/div with onClick. For articles, use Link
  if (isLesson) {
    return (
      <button
        onClick={handleClick}
        className={`card card-hover group block overflow-hidden text-left w-full ${featured ? 'border-[var(--border-strong)]' : ''}`}
        style={{ padding: 0 }}
      >
        <CardContent />
      </button>
    );
  }

  return (
    <Link
      href={linkHref}
      className={`card card-hover group block overflow-hidden ${featured ? 'border-[var(--border-strong)]' : ''}`}
      style={{ padding: 0 }}
    >
      <CardContent />
    </Link>
  );
}

// Lesson Card component for the lessons grid
interface LessonCardProps {
  slug: string;
  title: string;
  description: string;
  categories: LessonCategory[];
  onLessonClick: (slug: string) => void;
  customThumbnail?: string;
}

function LessonCard({ slug, title, description, categories, onLessonClick, customThumbnail }: LessonCardProps) {
  // Default thumbnail path based on slug
  const defaultThumbnail = `/images/lessons/${slug}.png`;
  const thumbnailSrc = customThumbnail || defaultThumbnail;

  // Category label mapping for display
  const categoryLabels: Record<LessonCategory, string> = {
    'copywriting': 'Copywriting',
    'psychology': 'Psychology',
    'branding': 'Branding',
    'meta-ads': 'Meta Ads',
    'google-ads': 'Google Ads',
    'business': 'Business',
  };

  return (
    <button
      onClick={() => onLessonClick(slug)}
      className="card card-hover group block overflow-hidden text-left w-full"
      style={{ padding: 0 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--bg-secondary)]">
        <Image
          src={thumbnailSrc}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {categories.slice(0, 2).map((cat) => (
              <span key={cat} className="badge badge-gold">
                {categoryLabels[cat]}
              </span>
            ))}
            {categories.length > 2 && (
              <span className="text-xs text-[var(--text-muted)]">+{categories.length - 2}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <Clock size={14} strokeWidth={1.5} />
            <span className="text-xs font-medium">3 min</span>
          </div>
        </div>

        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:opacity-70 transition-opacity">
          {title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1 font-medium text-sm text-[var(--text-primary)] group-hover:gap-2 transition-all">
          Start lesson
          <ChevronRight size={16} strokeWidth={1.5} />
        </div>
      </div>
    </button>
  );
}
