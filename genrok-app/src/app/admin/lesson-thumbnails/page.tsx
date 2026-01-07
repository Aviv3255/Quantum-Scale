'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Upload,
  Search,
  CheckCircle,
  AlertCircle,
  X,
  ImageIcon,
  Loader2,
  ArrowLeft,
  Grid,
  List,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase } from '@/lib/supabase';

// Get all lesson slugs from the filesystem
interface LessonThumbnail {
  slug: string;
  title: string;
  thumbnail_url: string | null;
  updated_at: string | null;
}

// Brand/Entrepreneur image URLs
const imageAssets = {
  // Entrepreneurs
  alexHormozi: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/eov911dsc81vaj73li2pag9pt7-removebg-preview.png',
  davieFogarty: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/hq720__1_-removebg-preview.png',
  benFrancis: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/channels4_profile__2_-removebg-preview.png',
  garyHalbert: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Gary-Halbert-removebg-preview.png',
  robertCialdini: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Robert+Cialdini-removebg-preview.png',
  danKennedy: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/49ea87c868c8056976c1f5f231c786f2.png',
  sethGodin: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/seth-godin-brian-bloom-xl.jpg',
  rorySutherland: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/6aab00d0-a2dc-11ed-bfe6-65e61c4b531d-Rory_Headshot_Colour_Change_16-removebg-preview.png',
  eugeneSchwartz: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/eugene-schwartz.webp',
  simonSinek: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/MoS_SimonSinek_colorcutout.webp',
  jeffBezos: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc_._V1_-removebg-preview.png',
  elonMusk: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/elon_musk_royal_society-removebg-preview.png',
  warrenBuffett: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/warren-buffett-inc-2_535185_ug6kpf-removebg-preview.png',
  davidOgilvy: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/GettyImages-517368152-web_91453-removebg-preview.png',
  danielKahneman: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Daniel+Kahneman+Headshot-removebg-preview.png',
  nassimTaleb: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Nassim-Taleb-removebg-preview.png',
  sheenaIyengar: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/SheenaIyengar_2011S-embed-removebg-preview.png',
  jensenHuang: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/NVIDIA-Jensen-Huang-removebg-preview.png',

  // Brands
  apple: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Apple_logo_black.svg.png',
  nike: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Nike-Logo.png',
  starbucks: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Starbucks_Corporation_Logo_2011.svg.png',
  leCreuset: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/le-creuset-logo-vector-2022.png',
  rolex: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolex_logo.svg.png',
  theOodie: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/the-oodie-logo.png',
  gymshark: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Gymshark_logo.svg.png',
  ralphLauren: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Ralph_Lauren_logo.svg.png',
  tiffany: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Tiffany_%26_Co_Logo.svg.png',
  hermes: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Hermes-Logo.png',
  dior: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Christian_Dior_logo.svg.png',
  gucci: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Gucci-Logo.png',
  prada: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Prada-Logo.png',
  tesla: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Tesla_Motors.svg.png',
  amazon: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Amazon_logo.svg.png',
  meta: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Meta_Platforms_Inc._logo.svg.png',
  google: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Google_2015_logo.svg.png',
  shopify: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Shopify_logo_2018.svg.png',
  tripleWhale: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/67e3c7b0162e6313d4bdc706_Logo%20Icon.webp',
  klaviyo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klaviyo-primary-logo-charcoal.svg.png',
  reconvert: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CIuoqfrDj_sCEAE=.webp',
  joyLoyalty: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/joy-loyalty-logo.png',
  abconvert: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/abconvert-logo.png',
  vitals: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/vitals-logo.png',
  grapevine: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CP2bp6uL9YoDEAE=.webp',
  tapita: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tapita-seo-logo.png',
  ridgeWallet: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/ridge-wallet-logo.png',
  liquidDeath: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Liquid_Death_logo.svg.png',
  oura: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Oura-Logo.png',
  lego: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LEGO_logo.svg.png',
  cocaCola: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Coca-Cola_logo.svg.png',
  chipotle: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chipotle_Mexican_Grill_logo.svg.png',
  drSquatch: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dr_Squatch_logo.png',
  spotify: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Spotify_logo_with_text.svg.png',
  netflix: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png',
  mastercard: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Mastercard-Logo.png',
  ikea: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/IKEA_logo.svg.png',
};

// Prompt data for each lesson - ChatGPT thumbnail generation prompts
const lessonPromptData: Record<string, { prompt: string; images: string[] }> = {
  // Psychology & Copywriting Core
  'familiar-surprise-secret': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Split brain visual - one half shows familiar comfort (home icon), other half shows exciting surprise (lightning bolt). Text overlay: "MAYA" in bold. Use dramatic lighting with gold accents. Clean white background with subtle grid pattern. In the style I uploaded you.',
    images: [imageAssets.apple],
  },
  'red-button-effect': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Giant glowing red "DO NOT PRESS" button with a finger hovering above it. Intense psychological tension. Text: "WHY YOU CANT RESIST". Dark dramatic background with red glow. High contrast, cinematic feel. In the style I uploaded you.',
    images: [],
  },
  'fred-method': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Four brain sections labeled F-R-E-D, each glowing different color. Text: "F.R.E.D." prominently displayed. Professional mind-mapping aesthetic. Clean white background with subtle neural network patterns. In the style I uploaded you.',
    images: [],
  },
  'emotion-decides': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Human head split in two - emotional colorful side vs logical grayscale side. Heart symbol dominating. Text: "Emotion DECIDES". Clean background, dramatic contrast between emotional warmth and logical coldness. In the style I uploaded you.',
    images: [imageAssets.danielKahneman],
  },
  'gatekeeper-method': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Brain with four different colored doors/gates, one opening with light streaming through. Text: "4 MOVES" in bold. Premium look with gold accents. Suggests bypassing mental barriers. In the style I uploaded you.',
    images: [],
  },
  'three-second-rule': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Stopwatch frozen at 3 seconds with dramatic lighting. Attention grabbing urgency. Text: "3 SECONDS" as main focus. High contrast with time-critical red accents. Countdown aesthetic. In the style I uploaded you.',
    images: [],
  },
  'science-of-selling': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Laboratory beaker filled with dollar signs, scientific formula written on board. Text: "The FORMULA". Clean scientific aesthetic with money elements. White lab coat vibes meets wealth. In the style I uploaded you.',
    images: [],
  },
  'persuasion-blueprint': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Architectural blueprint unrolling with persuasion elements as building blocks. Text: "BLUEPRINT" in technical font. Premium dark blue background with white line drawings. Engineering meets psychology. In the style I uploaded you.',
    images: [imageAssets.robertCialdini],
  },
  'persuasion-stack': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Stacked layers like a premium sandwich or tech stack, each layer labeled. Text: "THE STACK" bold. Colors progressing from bottom to top. Clean 3D visualization. In the style I uploaded you.',
    images: [],
  },
  'wiifm-principle': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Radio tuner dial with "WIIFM" frequency highlighted and glowing. Text: "WIIFM" prominently. Retro radio meets modern design. Customer asking "Whats In It For Me?" implied. In the style I uploaded you.',
    images: [],
  },
  'rule-of-one': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Single powerful number "1" in gold, surrounded by crossed out multiples. Text: "RULE OF ONE". Minimalist, premium feel. The power of singular focus visualized. In the style I uploaded you.',
    images: [imageAssets.garyHalbert],
  },

  // Meta Ads Lessons
  'meta-three-second-hook': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Phone screen with Meta logo and a dramatic hook visual. Stopwatch at 3 seconds. Text: "3 SEC HOOK". Split second attention capture aesthetic. Meta blue with urgent red accents. In the style I uploaded you.',
    images: [imageAssets.meta],
  },
  'meta-70-20-10-rule': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Pie chart showing 70/20/10 split in Meta brand colors. Text: "70/20/10" prominently. Clean data visualization with creative elements flowing from each section. In the style I uploaded you.',
    images: [imageAssets.meta],
  },
  'meta-creative-ecosystem': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Ecosystem visualization with 20-50 ad creatives orbiting like planets around Meta logo sun. Text: "CREATIVE ECOSYSTEM". Vibrant, dynamic, showing volume and diversity. In the style I uploaded you.',
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },
  'meta-capi-pixel-setup': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Two tracking signals merging - Pixel and CAPI visualized as data streams combining. Text: "CAPI + PIXEL". Technical but clean, showing dual tracking power. In the style I uploaded you.',
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },
  'meta-automated-rules': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Robot hand adjusting campaign settings with automation gears. Text: "AUTO RULES". Efficiency and automation aesthetic. Meta blue with mechanical elements. In the style I uploaded you.',
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },
  'cbo-vs-abo': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Boxing ring with "CBO" vs "ABO" in opposite corners. Text: "CBO vs ABO" as main title. Competitive tension, decision point visual. Meta colors with dramatic lighting. In the style I uploaded you.',
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  // Google Ads Lessons
  'google-highest-cpa-wins': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Trophy with highest CPA number, competitors with lower CPAs below. Text: "HIGHEST CPA WINS". Counterintuitive concept visual. Google colors with gold trophy. In the style I uploaded you.',
    images: [imageAssets.google],
  },
  'google-pmax-blueprint': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: PMax structure diagram with asset groups visualized as building blocks. Text: "PMAX BLUEPRINT". Google colors, architectural precision. Technical but accessible. In the style I uploaded you.',
    images: [imageAssets.google],
  },
  'google-product-feed-mastery': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Product feed transforming into a powerful ad. Data flowing into shopping results. Text: "FEED = AD". Clean visualization of feed optimization. In the style I uploaded you.',
    images: [imageAssets.google, imageAssets.shopify],
  },

  // Business & Strategy Lessons
  'biz-infinite-money-engine': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Perpetual motion machine made of dollar bills, infinite loop visual. Text: "INFINITE MONEY". Gold and green money colors, mechanical precision. Wealth generation visualized. In the style I uploaded you. I uploaded an image of Alex Hormozi.',
    images: [imageAssets.alexHormozi],
  },
  'biz-3x-threshold': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Calculator showing "3X" result with dramatic breakthrough visual. Text: "3X THRESHOLD". Line between struggling and thriving stores. Mathematical precision meets business success. In the style I uploaded you.',
    images: [imageAssets.alexHormozi],
  },
  'biz-operator-mindset': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Control room dashboard with metrics, pilot/operator aesthetic. Text: "OPERATOR MINDSET". Professional command center vibes. Clean, systematic. In the style I uploaded you. I uploaded an image of Ben Francis.',
    images: [imageAssets.benFrancis, imageAssets.gymshark],
  },
  'biz-cash-conversion': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Cash flowing in negative/reverse cycle, money multiplying. Text: "NEGATIVE CASH CYCLE". Mind-bending money visualization. Shows bootstrapping power. In the style I uploaded you. I uploaded an image of Davie Fogarty.',
    images: [imageAssets.davieFogarty, imageAssets.theOodie],
  },
  'biz-closer-framework': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Six steps arranged as ascending staircase to a handshake/close. Text: "C.L.O.S.E.R." in bold. Sales mastery aesthetic. Professional, conversion-focused. In the style I uploaded you. I uploaded an image of Alex Hormozi.',
    images: [imageAssets.alexHormozi],
  },

  // Psychology of Sales
  'borrowed-trust': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Trust being transferred like energy between two figures, one authoritative. Text: "BORROWED TRUST". Authority badges and social proof elements. Clean, credible aesthetic. In the style I uploaded you.',
    images: [imageAssets.robertCialdini],
  },
  'certainty-transfer': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Conviction/certainty visualized as glowing energy transferring to customer. Text: "CERTAINTY TRANSFER". Confident seller, convinced buyer visual. In the style I uploaded you.',
    images: [],
  },
  'authority-over-hope': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Authority figure guiding vs hopeful person wishing. Split comparison. Text: "AUTHORITY > HOPE". Confident guidance aesthetic. Premium trust badges visible. In the style I uploaded you.',
    images: [],
  },
  'dopamine-blueprint': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Brain with dopamine pathways lighting up, reward loop visualization. Text: "DOPAMINE LOOP". Addictive design aesthetic, neural pathways. Purple/gold colors. In the style I uploaded you.',
    images: [],
  },
  'unity-principle': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: "WE" replacing "I/YOU" visually, two figures merging into one. Text: "WE > YOU". Partnership and belonging visual. Warm, inclusive aesthetic. In the style I uploaded you.',
    images: [imageAssets.robertCialdini],
  },

  // Conversion & CRO Lessons
  'decoy-effect': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Three pricing options with middle one as obvious "decoy". Text: "THE DECOY". 43% increase callout. Pricing psychology visual. Clean, comparative layout. In the style I uploaded you.',
    images: [],
  },
  'paradox-of-choice': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Overwhelmed person facing 24 options vs calm person facing 6. Text: "LESS = MORE". Jam jar experiment visual. Choice overload contrast. In the style I uploaded you. I uploaded an image of Sheena Iyengar.',
    images: [imageAssets.sheenaIyengar],
  },
  'ice-prioritization': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: ICE cube with I-C-E letters, prioritization matrix visual. Text: "I.C.E." prominently. Clean testing framework aesthetic. Data-driven decision visual. In the style I uploaded you.',
    images: [],
  },
  'five-second-test': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Website blurring after 5 seconds, clarity vs confusion. Text: "5 SECOND TEST". Timer countdown aesthetic. First impression importance. In the style I uploaded you.',
    images: [],
  },
  'framing-effect-mastery': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Same object in two different frames looking completely different. Text: "SAME FACTS. DIFFERENT FRAME." Perception manipulation visual. In the style I uploaded you.',
    images: [imageAssets.danielKahneman],
  },
  'speed-equals-trust': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Loading bar with dollar signs filling up as speed increases. Text: "$1.7B SPEED BUMP". Performance equals revenue visual. Urgency and optimization. In the style I uploaded you.',
    images: [imageAssets.amazon],
  },

  // Luxury & Brand Lessons
  'value-ladder': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Hidden menu behind velvet rope, ascending tiers from basic to VIP. Text: "HIDDEN MENU". Luxury exclusivity visual. Premium gold and black. In the style I uploaded you.',
    images: [imageAssets.rolex, imageAssets.reconvert],
  },
  'ascension-ladder': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Customer climbing golden ladder through product tiers. Text: "ASCENSION". Upward mobility visual. Premium progression aesthetic. In the style I uploaded you.',
    images: [imageAssets.reconvert],
  },
  'post-purchase-goldmine': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Gold nuggets hidden behind thank you page, $40 transforming to $120. Text: "$40 to $120". Hidden revenue discovery visual. Gold rush aesthetic. In the style I uploaded you.',
    images: [imageAssets.reconvert],
  },
  'le-creuset-scarcity-engine': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Colorful Le Creuset pots with "LIMITED" and "SOLD OUT" tags, collectors lined up. Text: "SCARCITY ENGINE". FOMO and collection urge visual. Premium cookware aesthetic. In the style I uploaded you.',
    images: [imageAssets.leCreuset],
  },
  'wishlist-effect': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Heart wishlist icon with ownership glow around products. Text: "+8% CVR" callout. Endowment effect visual. Emotional attachment to items. In the style I uploaded you.',
    images: [imageAssets.vitals],
  },
  'blind-spot-effect': {
    prompt: 'Create a premium 5:4 wide thumbnail. Concept: Eye with visible blind spot, hidden opportunities in peripheral. Text: "BLIND SPOT". What customers cant see about themselves. Revelation visual. In the style I uploaded you.',
    images: [imageAssets.grapevine],
  },

  // Default for lessons without specific prompts
};

// Fill in remaining lessons with generic but high-quality prompts
const defaultLessons: Record<string, { title: string; description: string }> = {
  'architecture-of-influence': { title: 'Architecture of Influence', description: 'Framework of persuasive communication' },
  'three-canons-of-craft': { title: 'The Three Canons of Craft', description: 'Three tests every sentence must pass' },
  'cpppb-proof-loop': { title: 'The CPPPB Proof Loop', description: 'Five-element framework for persuasion' },
  'damaging-admission': { title: 'The Damaging Admission', description: 'Why revealing weakness builds trust' },
  'emotional-precision': { title: 'Emotional Precision', description: 'Target precise emotions that drive action' },
  'customer-voice-mining': { title: 'Voice of Customer Mining', description: 'Extract the exact words customers use' },
  'double-bind-of-fear': { title: 'The Double Bind of Fear', description: 'Leverage action and inaction fears' },
  'emotion-spectrum': { title: 'The Emotion Spectrum', description: 'Map the full range of persuasive emotions' },
  'forty-forty-twenty-rule': { title: 'The 40/40/20 Rule', description: 'The marketing success formula' },
  'four-primal-needs': { title: 'The Four Primal Needs', description: 'Deep drivers behind every purchase' },
  'ocpb-formula': { title: 'The OCPB Formula', description: 'Offer, Copy, Proof, Bonus stack' },
  'sales-message-anatomy': { title: 'Sales Message Anatomy', description: 'Dissect what makes copy convert' },
  'self-persuasion-architecture': { title: 'Self-Persuasion Architecture', description: 'Let prospects convince themselves' },
  'structural-tension': { title: 'Structural Tension', description: 'Create irresistible forward momentum' },
  'three-growth-levers': { title: 'The Three Growth Levers', description: 'Customers, frequency, transaction size' },
  'three-levels-of-change': { title: 'The Three Levels of Change', description: 'Transform behavior, beliefs, identity' },
  'trust-architecture': { title: 'The Trust Architecture', description: 'Build unshakeable credibility' },
  'unique-mechanism': { title: 'The Unique Mechanism', description: 'Proprietary reason your solution works' },
  'master-key-framework': { title: 'The Master Key Framework', description: 'First-principles guide to copy' },
  'architecture-of-belief': { title: 'The Architecture of Belief', description: 'Three levels of mastery' },
  'copywriters-codex': { title: 'The Copywriter\'s Codex', description: 'A synthesized playbook from the masters' },
  'best-private-agent': { title: 'Who Is the Best Private Agent', description: '5-7 day shipping, 18/6 WhatsApp support' },
  'stop-aliexpress': { title: 'Stop Using AliExpress Now', description: 'Why AliExpress destroys your brand' },
  'ltv-cheat-code': { title: 'The LTV Cheat Code', description: 'How 5% of customers generate 95% of revenue' },
  'million-dollar-roadmap': { title: 'The Roadmap to $1M/Month', description: '33 customers per day formula' },
  'meta-learning-loop': { title: 'Meta Learning Loop', description: 'Continuous optimization through data' },
  'meta-value-rules': { title: 'Meta Value Rules', description: 'Optimize for true value, not vanity metrics' },
};

// Generate prompts for lessons that don't have specific ones
Object.keys(defaultLessons).forEach(slug => {
  if (!lessonPromptData[slug]) {
    const lesson = defaultLessons[slug];
    lessonPromptData[slug] = {
      prompt: `Create a premium 5:4 wide thumbnail. Topic: "${lesson.title}". Concept: ${lesson.description}. Create a visually striking, conceptual image that captures this idea. Bold text overlay with the key concept. Clean white or gradient background. Premium aesthetic with dramatic lighting. In the style I uploaded you.`,
      images: [],
    };
  }
});

// Lesson metadata (from learn page)
const lessonMeta: Record<string, { title: string; description: string }> = {
  'familiar-surprise-secret': { title: 'The Familiar Surprise Secret', description: 'Master the MAYA principle' },
  'red-button-effect': { title: 'The Red Button Effect', description: 'Understanding psychological reactance' },
  'fred-method': { title: 'The F.R.E.D. Method', description: 'A framework for audience psychology' },
  'emotion-decides': { title: 'Emotion Decides, Logic Justifies', description: 'How emotions drive purchases' },
  'gatekeeper-method': { title: 'The Gatekeeper Method', description: 'Bypass the brain\'s attention filter' },
  'three-second-rule': { title: 'The 3-Second Rule', description: 'The critical window to capture attention' },
  'science-of-selling': { title: 'The Science of Selling', description: 'Systematic approach to conversion' },
  'persuasion-blueprint': { title: 'The Persuasion Blueprint', description: 'Master plan for influential copy' },
  'persuasion-stack': { title: 'The Persuasion Stack', description: 'Layered persuasion techniques' },
  'architecture-of-influence': { title: 'Architecture of Influence', description: 'Framework of persuasive communication' },
  'wiifm-principle': { title: 'The WIIFM Principle', description: 'What\'s In It For Me' },
  'three-canons-of-craft': { title: 'The Three Canons of Craft', description: 'Three tests every sentence must pass' },
  'cpppb-proof-loop': { title: 'The CPPPB Proof Loop', description: 'Five-element framework for persuasion' },
  'damaging-admission': { title: 'The Damaging Admission', description: 'Why revealing weakness builds trust' },
  'emotional-precision': { title: 'Emotional Precision', description: 'Target precise emotions that drive action' },
  'blind-spot-effect': { title: 'The Blind Spot Effect', description: 'What prospects can\'t see about themselves' },
  'customer-voice-mining': { title: 'Voice of Customer Mining', description: 'Extract the exact words customers use' },
  'double-bind-of-fear': { title: 'The Double Bind of Fear', description: 'Leverage action and inaction fears' },
  'emotion-spectrum': { title: 'The Emotion Spectrum', description: 'Map the full range of persuasive emotions' },
  'forty-forty-twenty-rule': { title: 'The 40/40/20 Rule', description: 'The marketing success formula' },
  'four-primal-needs': { title: 'The Four Primal Needs', description: 'Deep drivers behind every purchase' },
  'ocpb-formula': { title: 'The OCPB Formula', description: 'Offer, Copy, Proof, Bonus stack' },
  'sales-message-anatomy': { title: 'Sales Message Anatomy', description: 'Dissect what makes copy convert' },
  'self-persuasion-architecture': { title: 'Self-Persuasion Architecture', description: 'Let prospects convince themselves' },
  'structural-tension': { title: 'Structural Tension', description: 'Create irresistible forward momentum' },
  'three-growth-levers': { title: 'The Three Growth Levers', description: 'Customers, frequency, transaction size' },
  'three-levels-of-change': { title: 'The Three Levels of Change', description: 'Transform behavior, beliefs, identity' },
  'trust-architecture': { title: 'The Trust Architecture', description: 'Build unshakeable credibility' },
  'unique-mechanism': { title: 'The Unique Mechanism', description: 'Proprietary reason your solution works' },
  'master-key-framework': { title: 'The Master Key Framework', description: 'First-principles guide to copy' },
  'rule-of-one': { title: 'The Rule of One', description: 'One reader, one idea, one offer, one action' },
  'architecture-of-belief': { title: 'The Architecture of Belief', description: 'Three levels of mastery' },
  'copywriters-codex': { title: 'The Copywriter\'s Codex', description: 'A synthesized playbook from the masters' },
  'best-private-agent': { title: 'Who Is the Best Private Agent', description: '5-7 day shipping, 18/6 WhatsApp support' },
  'stop-aliexpress': { title: 'Stop Using AliExpress Now', description: 'Why AliExpress destroys your brand' },
  'ltv-cheat-code': { title: 'The LTV Cheat Code', description: 'How 5% of customers generate 95% of revenue' },
  'million-dollar-roadmap': { title: 'The Roadmap to $1M/Month', description: '33 customers per day formula' },
  'value-ladder': { title: 'The Value Ladder & Hidden Menu', description: 'Secret tiers that create aspiration' },
  'ascension-ladder': { title: 'The Ascension Ladder', description: 'Move customers up the value chain' },
  'post-purchase-goldmine': { title: 'The Hidden Revenue You\'re Ignoring', description: 'Turn $40 customers into $120 instantly' },
  'dopamine-blueprint': { title: 'The Dopamine Blueprint', description: 'Create addictive loops' },
  'unity-principle': { title: 'The Unity Principle', description: 'One word turns customers into partners' },
  'borrowed-trust': { title: 'Borrowed Trust', description: 'Authority and Liking principles that bypass skepticism' },
  'certainty-transfer': { title: 'Certainty Transfer', description: 'Master the art of transferring conviction' },
  'authority-over-hope': { title: 'Authority Over Hope', description: 'Stop hoping they buy. Guide them with certainty.' },
  'wishlist-effect': { title: 'The Wishlist Effect', description: 'Endowment Effect psychology (+8% CVR)' },
  'le-creuset-scarcity-engine': { title: 'The Le Creuset Scarcity Engine', description: 'Limited colors create collectors' },
  'paradox-of-choice': { title: 'The Paradox of Choice', description: 'Why fewer options = more sales' },
  'speed-equals-trust': { title: 'The $1.7 Billion Speed Bump', description: '0.1 second = 1% more sales' },
  'ice-prioritization': { title: 'ICE Prioritization', description: 'Impact, Confidence, Ease framework' },
  'decoy-effect': { title: 'The Decoy Effect', description: 'Why a "useless" option boosts sales by 43%' },
  'five-second-test': { title: 'The 5-Second Test', description: 'Why clarity crushes cleverness' },
  'framing-effect-mastery': { title: 'The Framing Effect', description: 'Same facts. Wildly different decisions.' },
  'cbo-vs-abo': { title: 'CBO vs ABO Under Andromeda', description: 'ABO for testing, CBO for scaling' },
  'meta-automated-rules': { title: 'Meta Automated Rules', description: 'Set rules for automatic optimization' },
  'meta-creative-ecosystem': { title: 'The Creative Ecosystem', description: 'Build 20-50 meaningfully different ads' },
  'meta-learning-loop': { title: 'Meta Learning Loop', description: 'Continuous optimization through data' },
  'meta-value-rules': { title: 'Meta Value Rules', description: 'Optimize for true value, not vanity metrics' },
  'meta-capi-pixel-setup': { title: 'CAPI + Pixel Setup', description: 'Dual tracking is now mandatory' },
  'meta-three-second-hook': { title: 'The 3-Second Hook Rule', description: 'Meta judges your creative in the first 3 seconds' },
  'meta-70-20-10-rule': { title: 'The 70/20/10 Creative Rule', description: '70% proven, 20% iteration, 10% wild experiments' },
  'google-highest-cpa-wins': { title: 'Why The Highest CPA Wins', description: 'The counterintuitive truth about Google Ads dominance' },
  'google-pmax-blueprint': { title: 'The PMax Asset Group Blueprint', description: 'Stop forcing Google AI to guess' },
  'google-product-feed-mastery': { title: 'Your Product Feed IS Your Ad', description: 'The hidden weapon for Shopping & PMax success' },
  'biz-infinite-money-engine': { title: 'The Infinite Money Engine', description: 'The single equation that transforms eCommerce' },
  'biz-3x-threshold': { title: 'The 3x Threshold', description: 'The equation separating struggling from thriving' },
  'biz-operator-mindset': { title: 'The Operator\'s Mindset', description: 'How Ben Francis built Gymshark to $1.5B' },
  'biz-cash-conversion': { title: 'The Negative Cash Conversion Cycle', description: 'How Davie Fogarty bootstrapped The Oodie' },
  'biz-closer-framework': { title: 'The CLOSER Framework', description: 'Alex Hormozi\'s 6-step sales system' },
};

export default function AdminLessonThumbnailsPage() {
  const { user, isLoading: authLoading } = useAuthStore();
  const [lessons, setLessons] = useState<LessonThumbnail[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<LessonThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingSlug, setUploadingSlug] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'with' | 'without'>('all');
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Admin email check
  const ADMIN_EMAILS = ['admin@quantum-scale.co', 'aviv32552@gmail.com'];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  // Copy prompt to clipboard
  const copyPrompt = useCallback(async (slug: string) => {
    const promptData = lessonPromptData[slug];
    if (promptData) {
      await navigator.clipboard.writeText(promptData.prompt);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  }, []);

  // Load lessons and their thumbnails
  useEffect(() => {
    async function loadLessons() {
      setIsLoading(true);

      // Get all lesson slugs from lessonMeta
      const allSlugs = Object.keys(lessonMeta);

      // Fetch existing thumbnails from Supabase
      const { data: thumbnailData } = await supabase
        .from('lesson_thumbnails')
        .select('*');

      const thumbnailMap = new Map(
        (thumbnailData || []).map((t: { slug: string; thumbnail_url: string; updated_at: string }) => [t.slug, t])
      );

      // Combine lesson meta with thumbnail data
      const lessonList: LessonThumbnail[] = allSlugs.map(slug => ({
        slug,
        title: lessonMeta[slug]?.title || slug,
        thumbnail_url: (thumbnailMap.get(slug) as { thumbnail_url?: string } | undefined)?.thumbnail_url || null,
        updated_at: (thumbnailMap.get(slug) as { updated_at?: string } | undefined)?.updated_at || null,
      }));

      // Sort: lessons without thumbnails first, then alphabetically
      lessonList.sort((a, b) => {
        if (!a.thumbnail_url && b.thumbnail_url) return -1;
        if (a.thumbnail_url && !b.thumbnail_url) return 1;
        return a.title.localeCompare(b.title);
      });

      setLessons(lessonList);
      setFilteredLessons(lessonList);
      setIsLoading(false);
    }

    if (user) {
      loadLessons();
    }
  }, [user]);

  // Filter lessons based on search and filter
  useEffect(() => {
    let filtered = lessons;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(query) ||
        l.slug.toLowerCase().includes(query)
      );
    }

    // Apply filter
    if (filter === 'with') {
      filtered = filtered.filter(l => l.thumbnail_url);
    } else if (filter === 'without') {
      filtered = filtered.filter(l => !l.thumbnail_url);
    }

    setFilteredLessons(filtered);
  }, [lessons, searchQuery, filter]);

  // Handle file upload
  const handleFileUpload = useCallback(async (slug: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' });
      return;
    }

    setUploadingSlug(slug);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      const filePath = `lesson-thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      const thumbnailUrl = urlData.publicUrl;

      // Upsert to database
      const { error: dbError } = await supabase
        .from('lesson_thumbnails')
        .upsert({
          slug,
          thumbnail_url: thumbnailUrl,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'slug' });

      if (dbError) throw dbError;

      // Update local state
      setLessons(prev => prev.map(l =>
        l.slug === slug
          ? { ...l, thumbnail_url: thumbnailUrl, updated_at: new Date().toISOString() }
          : l
      ));

      setMessage({ type: 'success', text: `Thumbnail uploaded for "${lessonMeta[slug]?.title || slug}"` });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Failed to upload thumbnail. Please try again.' });
    } finally {
      setUploadingSlug(null);
    }
  }, []);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent, slug: string) => {
    e.preventDefault();
    setDragOver(null);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(slug, files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent, slug: string) => {
    e.preventDefault();
    setDragOver(slug);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(null);
  }, []);

  // Stats
  const withThumbnails = lessons.filter(l => l.thumbnail_url).length;
  const withoutThumbnails = lessons.length - withThumbnails;

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Access Denied</h2>
            <p className="text-[var(--text-muted)]">
              You don&apos;t have permission to access this page.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Message Toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
                message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span className="max-w-xs truncate">{message.text}</span>
              <button onClick={() => setMessage(null)} className="ml-2">
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin"
              className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1>Lesson Thumbnails</h1>
              <p className="mt-1">Upload thumbnails for interactive lessons. Drag & drop images directly onto cards.</p>
            </div>
          </div>

          {/* Stats & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--text-primary)]">{lessons.length}</div>
                <div className="text-xs text-[var(--text-muted)]">Total Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{withThumbnails}</div>
                <div className="text-xs text-[var(--text-muted)]">With Thumbnail</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{withoutThumbnails}</div>
                <div className="text-xs text-[var(--text-muted)]">Need Thumbnail</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="search-input w-64">
                <Search className="search-input-icon" size={18} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>

              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'with' | 'without')}
                className="input py-2 px-3"
              >
                <option value="all">All Lessons</option>
                <option value="without">Missing Thumbnail</option>
                <option value="with">Has Thumbnail</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center border border-[var(--border-light)] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-secondary)]'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-secondary)]'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
          >
            {filteredLessons.map((lesson) => {
              const promptData = lessonPromptData[lesson.slug];

              return (
                <motion.div
                  key={lesson.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`
                    relative rounded-xl overflow-hidden border transition-all bg-white
                    ${dragOver === lesson.slug ? 'border-[var(--primary)] border-2' : 'border-[var(--border-light)]'}
                    ${!lesson.thumbnail_url ? 'ring-2 ring-orange-200' : ''}
                  `}
                >
                  {/* Thumbnail Upload Area */}
                  <div
                    className={`relative aspect-video bg-[var(--bg-secondary)] overflow-hidden`}
                    onDrop={(e) => handleDrop(e, lesson.slug)}
                    onDragOver={(e) => handleDragOver(e, lesson.slug)}
                    onDragLeave={handleDragLeave}
                  >
                    {lesson.thumbnail_url ? (
                      <Image
                        src={lesson.thumbnail_url}
                        alt={lesson.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-muted)] bg-gradient-to-br from-orange-50 to-orange-100">
                        <ImageIcon size={40} className="mb-2 text-orange-400" />
                        <span className="text-sm font-medium text-orange-600">Drop thumbnail here</span>
                      </div>
                    )}

                    {/* Upload Overlay */}
                    {uploadingSlug === lesson.slug && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 size={32} className="animate-spin text-white" />
                      </div>
                    )}

                    {/* Drag Overlay */}
                    {dragOver === lesson.slug && (
                      <div className="absolute inset-0 bg-[var(--primary)]/30 flex items-center justify-center border-4 border-dashed border-[var(--primary)]">
                        <Upload size={40} className="text-[var(--primary)]" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                      lesson.thumbnail_url
                        ? 'bg-green-500 text-white'
                        : 'bg-orange-500 text-white'
                    }`}>
                      {lesson.thumbnail_url ? 'Done' : 'Needs Image'}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mb-3">{lesson.slug}</p>

                    {/* Upload Button */}
                    <label className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors mb-4
                      ${lesson.thumbnail_url
                        ? 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                        : 'bg-[var(--primary)] text-white hover:opacity-90'
                      }
                    `}>
                      <Upload size={16} />
                      {lesson.thumbnail_url ? 'Replace Thumbnail' : 'Upload Thumbnail'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(lesson.slug, file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>

                  {/* Prompt Section - White Container */}
                  {promptData && (
                    <div className="border-t border-[var(--border-light)] bg-gray-50 p-4">
                      {/* Reference Images Row */}
                      {promptData.images.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">Reference Images (click to copy URL):</p>
                          <div className="flex gap-2 flex-wrap">
                            {promptData.images.map((imgUrl, idx) => (
                              <button
                                key={idx}
                                onClick={async () => {
                                  await navigator.clipboard.writeText(imgUrl);
                                  setMessage({ type: 'success', text: 'Image URL copied!' });
                                }}
                                className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-transparent hover:border-[var(--primary)] transition-all group"
                                title="Click to copy image URL"
                              >
                                <Image
                                  src={imgUrl}
                                  alt="Reference"
                                  fill
                                  className="object-contain bg-white"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <Copy size={12} className="text-white opacity-0 group-hover:opacity-100" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Prompt Text */}
                      <div className="relative">
                        <p className="text-xs font-medium text-[var(--text-muted)] mb-2">ChatGPT Prompt:</p>
                        <div className="bg-white rounded-lg p-3 border border-[var(--border-light)] text-sm text-[var(--text-secondary)] leading-relaxed">
                          {promptData.prompt}
                        </div>

                        {/* Copy Button */}
                        <button
                          onClick={() => copyPrompt(lesson.slug)}
                          className={`
                            mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                            ${copiedSlug === lesson.slug
                              ? 'bg-green-500 text-white'
                              : 'bg-[var(--primary)] text-white hover:opacity-90'
                            }
                          `}
                        >
                          {copiedSlug === lesson.slug ? (
                            <>
                              <Check size={16} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              Copy Prompt
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredLessons.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No lessons found</h3>
            <p className="text-[var(--text-muted)]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
