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
  Flag,
  MessageSquare,
  ClipboardList,
  Settings,
  Plus,
  Trash2,
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
  needs_new_prompt?: boolean;
  prompt_feedback?: string;
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

// ==============================================
// VISUAL TEMPLATE SYSTEM FOR THUMBNAIL PROMPTS
// ==============================================
// Based on analysis of 24 reference thumbnails
// 6 proven visual formulas that work
// ==============================================

type TemplateType = 'product-hero' | 'diagram' | 'brain-cables' | 'person-metric' | 'logo-mashup' | 'before-after';

interface VisualTemplate {
  id: TemplateType;
  name: string;
  description: string;
  promptStructure: string;
}

const VISUAL_TEMPLATES: Record<TemplateType, VisualTemplate> = {
  'product-hero': {
    id: 'product-hero',
    name: 'Product Hero',
    description: 'Big money headline + product photo + brand badge',
    promptStructure: `YouTube thumbnail, 16:10 ratio (1600x1000px).

STYLE: Product Hero - like "$300 MILLION shopify store" thumbnails
BACKGROUND: Clean white OR solid black, with subtle grid paper texture
LAYOUT: Big headline text at top (40%), product/visual below (60%)
TEXT STYLE: ALL CAPS, bold sans-serif, high contrast (black on white or white on black)
VISUAL: Real product photo or mockup, floating with soft shadow, slightly angled`,
  },
  'diagram': {
    id: 'diagram',
    name: 'Diagram',
    description: 'Simple chart/graph + arrows + brand logos',
    promptStructure: `YouTube thumbnail, 16:10 ratio (1600x1000px).

STYLE: Diagram - like "peak-end rule" or "You're Here" growth curve thumbnails
BACKGROUND: White or light gray with subtle grid paper texture
LAYOUT: Text on left (40%), diagram/chart on right (60%)
TEXT STYLE: Lowercase or mixed case, clean sans-serif font (like Inter)
VISUAL: Simple 2D diagram - growth curve, flowchart, or comparison chart. Use arrows to point at key elements. Brand logos floating near relevant points.`,
  },
  'brain-cables': {
    id: 'brain-cables',
    name: 'Brain Cables',
    description: 'Exposed brain + cables connecting to logos',
    promptStructure: `YouTube thumbnail, 16:10 ratio (1600x1000px).

STYLE: Brain Cables - like "Offers" thumbnail with brain connected to brand logos
BACKGROUND: White with grid paper texture OR dark gradient
LAYOUT: Large brain visual (60%), text above or below (40%)
TEXT STYLE: Bold, simple, one powerful word or short phrase
VISUAL: Top of human head with brain exposed, multiple colored cables/wires plugging into brain from different brand logos or icons floating around. Premium 3D render style.`,
  },
  'person-metric': {
    id: 'person-metric',
    name: 'Person + Metric',
    description: 'Person cutout + glow outline + floating UI/metric',
    promptStructure: `YouTube thumbnail, 16:10 ratio (1600x1000px).

STYLE: Person + Metric - like Reddit CPC guy or ROAS thumbnails
BACKGROUND: Clean white OR solid dark
LAYOUT: Person cutout on one side (50%), text and metrics on other side (50%)
TEXT STYLE: Mix of lowercase text and highlighted numbers/metrics
VISUAL: Clean person photo cutout with subtle colored glow/outline around edges. Floating UI elements nearby - notification badges, metric displays, app logos.`,
  },
  'logo-mashup': {
    id: 'logo-mashup',
    name: 'Logo Mashup',
    description: '3+ brand logos + simple lowercase text',
    promptStructure: `YouTube thumbnail, 16:10 ratio (1600x1000px).

STYLE: Logo Mashup - like "copy them." with Revolut, Ghost, Duolingo logos
BACKGROUND: White or very light gray, clean and minimal
LAYOUT: Simple text at top (30%), row of 3-4 brand logos below (70%)
TEXT STYLE: Lowercase, casual, short phrase ending with period. Black sans-serif.
VISUAL: 3-4 recognizable brand logos or app icons arranged in a row, clean and large. May include 3D mascots (like Duolingo owl).`,
  },
  'before-after': {
    id: 'before-after',
    name: 'Before/After',
    description: 'Split composition comparing two states',
    promptStructure: `YouTube thumbnail, 16:10 ratio (1600x1000px).

STYLE: Before/After Split - like brain scan comparison thumbnails
BACKGROUND: Dark/black works best for dramatic contrast
LAYOUT: Perfect 50/50 split - "Before" on left, "After" on right
TEXT STYLE: Simple "Before" and "After" labels, white text on dark background
VISUAL: Same subject shown in two states - left side dull/gray/negative, right side vibrant/colorful/positive. Arrows pointing to each side.`,
  },
};

// Function to build full prompt from template + specific concept
const buildFullPrompt = (specificConcept: string, templateId: TemplateType) => {
  const template = VISUAL_TEMPLATES[templateId];
  return `${template.promptStructure}

=== SPECIFIC CONCEPT ===
${specificConcept}

IMPORTANT: Keep it SIMPLE. Maximum 3 main elements. Lots of whitespace. One clear focal point.`;
};

// Store concept + recommended template for each lesson
const lessonConceptData: Record<string, { concept: string; images: string[]; template: TemplateType }> = {

  // ============================================
  // PSYCHOLOGY & COPYWRITING CORE
  // ============================================

  'familiar-surprise-secret': {
    template: 'logo-mashup',
    concept: `TEXT: "it works." in lowercase black sans-serif
VISUAL: Apple logo + floating iPhone with soft shadow
EXTRA: Ultra minimal Apple keynote aesthetic, lots of whitespace`,
    images: [imageAssets.apple],
  },

  'red-button-effect': {
    template: 'product-hero',
    concept: `TEXT: "don't press." in lowercase white sans-serif at top
VISUAL: Big glossy red 3D button (arcade style) center frame, slight angle, soft shadow
BACKGROUND: Solid black
EXTRA: Button should look tempting and forbidden. Ultra simple composition.`,
    images: [],
  },

  'fred-method': {
    template: 'brain-cables',
    concept: `TEXT: "F.R.E.D." each letter a different color (Red, Blue, Green, Yellow)
VISUAL: Top of head with brain exposed, 4 colored cables plugging in from above
BACKGROUND: White with subtle grid paper texture
EXTRA: Like the "Offers" thumbnail reference. Clean, scientific diagram style.`,
    images: [],
  },

  'emotion-decides': {
    template: 'diagram',
    concept: `Concept: "EMOTION WINS" - The heart beats the brain in purchasing decisions.
Soft cream/warm gradient background.
MASSIVE realistic 3D anatomical heart (red, glossy, detailed) on left - 3x larger than brain.
Smaller realistic brain on right looking small/defeated.
Golden crown sitting on top of the heart.
Bold black text "EMOTION WINS." at bottom.
Warm golden hour lighting.
Visceral, emotional, premium CGI quality.`,
    images: [imageAssets.danielKahneman],
  },

  'gatekeeper-method': {
    template: 'brain-cables',
    concept: `TEXT: "4 doors." in lowercase white sans-serif
VISUAL: Brain with 4 small doors on different areas, one slightly open with light coming out
BACKGROUND: Dark charcoal gray
EXTRA: Mysterious, intriguing. Simple composition.`,
    images: [],
  },

  'three-second-rule': {
    template: 'product-hero',
    concept: `TEXT: Giant "3" in white, "seconds." below in lowercase
VISUAL: Simple stopwatch icon next to the 3
BACKGROUND: Solid red (#FF0000)
EXTRA: Urgent, high contrast. Like a warning sign. Super simple.`,
    images: [],
  },

  'science-of-selling': {
    template: 'diagram',
    concept: `TEXT: "the formula." in lowercase black sans-serif
VISUAL: Simple equation: Brain icon + $ icon = $$$ with arrow pointing right
BACKGROUND: White with grid paper texture
EXTRA: Like a whiteboard diagram. Clean, minimal, scientific.`,
    images: [],
  },

  'persuasion-blueprint': {
    template: 'diagram',
    concept: `Concept: "BLUEPRINT" - The master plan for persuasion.
Aged paper/architect desk texture background.
Rolled blueprint paper partially unrolled showing brain diagram with neural connections.
Classic blue/white blueprint aesthetic.
Brass compass and pencil nearby.
Bold black text "BLUEPRINT." stamped like official document.
Warm desk lamp lighting.
Intellectual, exclusive, premium.`,
    images: [imageAssets.robertCialdini],
  },

  'persuasion-stack': {
    template: 'diagram',
    concept: `TEXT: "the stack." in lowercase black sans-serif on left
VISUAL: 5 horizontal colored bars stacked vertically (like a bar chart rotated) - Red, Orange, Yellow, Green, Blue
BACKGROUND: White, clean
EXTRA: Simple layered visualization. Like a progress bar stack.`,
    images: [],
  },

  'architecture-of-influence': {
    template: 'diagram',
    concept: `TEXT: "architect." in lowercase white sans-serif
VISUAL: Simple wireframe head outline made of geometric lines, like a blueprint
BACKGROUND: Dark navy blue
EXTRA: Minimal, elegant. Think Apple design meets architecture.`,
    images: [],
  },

  'wiifm-principle': {
    template: 'person-metric',
    concept: `TEXT: "what about me?" in lowercase black sans-serif
VISUAL: Hand pointing at viewer (like Uncle Sam poster)
BACKGROUND: White/light gray
EXTRA: Direct, confrontational. Simple composition.`,
    images: [],
  },

  'rule-of-one': {
    template: 'diagram',
    concept: `Concept: "JUST ONE" - One reader, one idea, one offer, one action.
Pure black background.
Massive gold metallic "1" dominating the frame - luxury 3D render.
The 1 should look like a gold bar or Rolex-quality gold.
Subtle gold particle effects around it.
Bold white text "JUST ONE." below.
Premium like a luxury watch advertisement.
Simplicity equals power.`,
    images: [imageAssets.garyHalbert],
  },

  // ============================================
  // META ADS LESSONS
  // ============================================

  'meta-three-second-hook': {
    template: 'diagram',
    concept: `Concept: "3 SECONDS" - Meta judges your creative in the first 3 seconds.
Tech/digital aesthetic with Meta logo I'm uploading.
Show a phone screen with video ad and countdown timer at 00:03.
Electric blue and neon purple color scheme.
Bold white text "3 SECONDS" at top.
Modern Silicon Valley meets MrBeast urgency.
Premium tech product photography style.`,
    images: [imageAssets.meta],
  },

  'meta-70-20-10-rule': {
    template: 'diagram',
    concept: `Concept: "70/20/10" - The creative allocation rule (70% proven, 20% iteration, 10% wild).
Three 3D money stacks of different heights: tallest (70%), medium (20%), small (10%).
Meta logo floating above with soft shadow.
Clean white/light background with subtle grid.
Bold black text "70/20/10" prominently displayed.
Data-driven wealth visualization.
Professional infographic meets YouTube energy.`,
    images: [imageAssets.meta],
  },

  'meta-creative-ecosystem': {
    template: 'diagram',
    concept: `Concept: "50 ADS" - You need 20-50 meaningfully different ads to win.
Epic visualization: ad creatives orbiting like planets around glowing Meta logo.
Deep space/cosmic dark blue background.
Bold white text "50 ADS" dominating top.
Overwhelming scale - showing the volume needed.
Cinematic, sci-fi aesthetic.
Include Meta and Triple Whale logos I'm uploading.`,
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  'meta-capi-pixel-setup': {
    template: 'diagram',
    concept: `Concept: "CAPI + PIXEL" - Dual tracking is mandatory for success.
Two glowing data streams (blue and purple) merging into powerful light.
Dark tech/developer aesthetic background.
Meta logo prominent with soft shadow.
Bold text "CAPI + PIXEL" in white.
Matrix-style digital rain subtly in background.
Premium tech visualization.
Include logos I'm uploading.`,
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  'cbo-vs-abo': {
    template: 'diagram',
    concept: `Concept: "CBO vs ABO" - The epic campaign structure showdown.
Split screen dramatic comparison - boxing match energy.
"CBO" on left side (blue), "ABO" on right side (red).
Giant "VS" in dramatic metallic gold center.
Fight night/championship event aesthetic.
Meta logo at top center.
Intense, competitive energy.`,
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  'meta-andromeda': {
    template: 'diagram',
    concept: `Concept: "ANDROMEDA" - Meta's AI brain that controls everything.
Cosmic deep space background with galaxy swirls.
Meta logo transformed into glowing AI neural network/brain.
Bold white text "ANDROMEDA" with cosmic glow.
Sci-fi, awe-inspiring, slightly intimidating.
Blue and purple nebula colors.
Premium space/tech CGI quality.`,
    images: [imageAssets.meta],
  },

  'meta-1-1-x-structure': {
    template: 'diagram',
    concept: `Concept: "1-1-X" - The winning campaign structure (1 campaign, 1 ad set, X creatives).
Clean white background with subtle grid.
Premium flowchart: 1 → 1 → X expanding outward.
Bold black text "1-1-X" dominating frame.
Meta logo floating with soft shadow.
Simplicity equals power aesthetic.
Minimal, strategic, Apple-keynote style.`,
    images: [imageAssets.meta],
  },

  'creative-volume-2026': {
    template: 'diagram',
    concept: `Concept: "40-70 WEEKLY" - The insane creative volume needed in 2026.
Flood/tsunami wave of ad creatives pouring out of a smartphone.
Overwhelming but exciting energy.
Bold text "40-70 WEEKLY" in white against colorful chaos.
High energy, dynamic composition.
Tech meets MrBeast overwhelming scale.
Premium 3D render of creative explosion.`,
    images: [imageAssets.meta],
  },

  // ============================================
  // GOOGLE ADS LESSONS
  // ============================================

  'google-highest-cpa-wins': {
    template: 'diagram',
    concept: `Concept: "HIGHEST WINS" - Counterintuitively, the highest CPA bid wins on Google.
Gold trophy with "$50 CPA" beating smaller silver/bronze trophies.
Challenges everything you thought you knew about bidding.
Google logo floating with soft shadow.
Clean white background with subtle grid.
Bold black text "HIGHEST WINS" at top.`,
    images: [imageAssets.google],
  },

  'google-pmax-blueprint': {
    template: 'diagram',
    concept: `Concept: "PMax SETUP" - The Performance Max campaign architecture.
Blueprint/technical diagram aesthetic with blue and white.
Google logo prominent.
Bold text "PMax SETUP" in clean typography.
Technical mastery aesthetic - for serious marketers.
Professional architectural diagram feel.`,
    images: [imageAssets.google],
  },

  'google-product-feed-mastery': {
    template: 'diagram',
    concept: `Concept: "FEED = AD" - Your product feed IS your ad.
Data/spreadsheet visually transforming into beautiful shopping ads.
Magical transformation visualization with sparkles.
Google and Shopify logos I'm uploading.
Bold text "FEED = AD" prominently displayed.`,
    images: [imageAssets.google, imageAssets.shopify],
  },

  'google-shopping-intent': {
    template: 'diagram',
    concept: `Concept: "ACTIVE INTENT" - Google Shopping captures people who WANT to buy.
Search bar showing "buy [product]" with target/crosshairs on buyer.
High intent visualization - money in hand ready to purchase.
Google logo floating with soft shadow.
Bold text "ACTIVE INTENT" at top.`,
    images: [imageAssets.google],
  },

  'google-brand-moat': {
    template: 'diagram',
    concept: `Concept: "BRAND MOAT" - Brand is the fortress competitors can't breach.
Majestic castle/fortress surrounded by deep moat in Google colors.
Medieval meets digital aesthetic.
Epic, metaphorical visualization.
Bold white text "BRAND MOAT" with dramatic shadow.`,
    images: [imageAssets.google],
  },

  // ============================================
  // BUSINESS & STRATEGY LESSONS
  // ============================================

  'biz-infinite-money-engine': {
    template: 'diagram',
    concept: `Concept: "INFINITE MONEY" - The flywheel that never stops generating cash.
Money arranged in glowing infinity loop symbol (∞).
Cash piling up in background.
I'm uploading Alex Hormozi's image - include him as authority figure.
Money green and gold aesthetic.
Bold text "INFINITE MONEY" at top.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-3x-threshold': {
    template: 'diagram',
    concept: `Concept: "3X" - The LTV:CAC threshold that changes everything.
MASSIVE metallic gold "3X" dominating the frame.
Mathematical breakthrough energy.
Red and black powerful color scheme.
I'm uploading Alex Hormozi's image - include him.
Bold, aggressive, game-changing feel.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-operator-mindset': {
    template: 'diagram',
    concept: `Concept: "OPERATOR MODE" - Running your business like a pilot runs a cockpit.
Airplane cockpit dashboard with business metrics as gauges.
Aviation meets business aesthetic.
I'm uploading Ben Francis (Gymshark) and Gymshark logo.
Bold text "OPERATOR MODE" at top.
Professional, in-control energy.`,
    images: [imageAssets.benFrancis, imageAssets.gymshark],
  },

  'biz-cash-conversion': {
    template: 'diagram',
    concept: `Concept: "NEGATIVE CASH" - Get paid before you spend (negative cash conversion).
Money flowing BACKWARDS with reverse arrows.
Bold "-30 DAYS" prominently displayed.
I'm uploading Davie Fogarty and The Oodie images.
Mind-bending financial concept visualization.
Clean background with focus on impossible money flow.`,
    images: [imageAssets.davieFogarty, imageAssets.theOodie],
  },

  'biz-closer-framework': {
    template: 'diagram',
    concept: `Concept: "6 STEPS" - The C.L.O.S.E.R. framework for closing sales.
Premium checklist/steps visualization with the letters C.L.O.S.E.R.
Each letter glowing as a step.
I'm uploading Alex Hormozi's image - the sales master.
Professional sales training aesthetic.
Bold text "6 STEPS" or "C.L.O.S.E.R." at top.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-hamster-wheel': {
    template: 'diagram',
    concept: `Concept: "THE TRAP" - Are you building a business or a prison?
Business person in suit running endlessly in giant hamster wheel.
Money flying off the wheel but never accumulating.
Dark, confrontational, makes you think.
Bold text "THE TRAP" with quotes for impact.
Existential business crisis visualization.`,
    images: [],
  },

  'biz-leverage-equation': {
    template: 'diagram',
    concept: `Concept: "LEVERAGE" - Work smarter, not harder.
Classic lever/fulcrum with small finger pushing down, lifting massive boulder.
Physics of success visualization.
Educational but premium, scientific aesthetic.
Bold text "LEVERAGE" prominently displayed.
Clean background with dramatic lighting.`,
    images: [],
  },

  'starbucks-ltv': {
    template: 'diagram',
    concept: `Concept: "$14,099" - The mind-blowing lifetime value of one Starbucks customer.
Starbucks coffee cup OVERFLOWING with $100 bills.
Money spilling out onto surface.
Bold text "$14,099" in massive font - the shocking number.
I'm uploading Starbucks logo - make it prominent.
Mind-blowing LTV revelation.`,
    images: [imageAssets.starbucks],
  },

  'million-dollar-roadmap': {
    template: 'diagram',
    concept: `TEXT: "$1M" in large black text, "roadmap." in lowercase below
VISUAL: Simple dotted line path with milestones (like a simple journey map) leading to a flag
BACKGROUND: White with grid paper texture
EXTRA: Like the "You're Here" growth curve reference. Clean, simple, aspirational.`,
    images: [],
  },

  // ============================================
  // PSYCHOLOGY OF SALES
  // ============================================

  'borrowed-trust': {
    template: 'diagram',
    concept: `Concept: "BORROW IT" - Transfer trust from authorities to yourself.
Trust badges/golden energy visually transferring between two figures.
I'm uploading Robert Cialdini's image - the persuasion master.
Magical but professional energy transfer.
Bold text "BORROW IT" at top.
Warm, authoritative, trust visualization.`,
    images: [imageAssets.robertCialdini],
  },

  'certainty-transfer': {
    template: 'before-after',
    concept: `TEXT: "Before" on left, "After" on right in white
VISUAL: Split screen - Left: worried face emoji/icon (gray). Right: confident face emoji/icon (bright)
BACKGROUND: Dark/black
EXTRA: Simple transformation visual. Shows doubt becoming certainty.`,
    images: [],
  },

  'authority-over-hope': {
    template: 'diagram',
    concept: `Concept: "STOP HOPING" - Hope is not a strategy, authority is.
Split screen: LEFT = crossed fingers (hoping, weak) with X over it.
RIGHT = confident pointing finger (knowing, powerful) with checkmark.
Brutal truth energy - confrontational.
Bold text "STOP HOPING" with quotes.
Red and green color coding.`,
    images: [],
  },

  'dopamine-blueprint': {
    template: 'diagram',
    concept: `Concept: "ADDICTED" - The dopamine triggers that create purchase addiction.
Hyper-realistic brain with notifications, likes, hearts, rewards plugged in.
Cables and wires connecting social media icons to pleasure centers.
Dark background, slightly uncomfortable neuroscience reveal.
Bold text "ADDICTED" at top.
Dark, revealing, uncomfortable but fascinating.`,
    images: [],
  },

  'unity-principle': {
    template: 'diagram',
    concept: `Concept: "WE > YOU" - Shared identity wins over individual selling.
Two silhouette figures merging/blending into ONE unified figure.
Glowing "WE" text in the merged center.
I'm uploading Robert Cialdini's image - include him.
Warm, connective, tribal energy.
Light background with warm golden tones.`,
    images: [imageAssets.robertCialdini],
  },

  'pre-suasion-hack': {
    template: 'diagram',
    concept: `Concept: "WIN BEFORE" - The sale is won before you even speak.
Chess board with winning move already made, king toppled.
Or puppet master hands controlling the scene from above.
Bold text "ALREADY WON" or "WIN BEFORE" at top.
I'm uploading Robert Cialdini's image - include him.
Strategic, intellectual, masterful energy.`,
    images: [imageAssets.robertCialdini],
  },

  'herd-instinct': {
    template: 'diagram',
    concept: `Concept: "THE HERD" - Social proof and following the crowd.
Massive crowd of people all moving in one direction, money in hands.
"SOLD OUT" signs and "EVERYONE'S BUYING" energy.
Bold text "THE HERD" at top.
High energy, FOMO-inducing crowd psychology.
Premium 3D crowd visualization.`,
    images: [],
  },

  // ============================================
  // CONVERSION & CRO LESSONS
  // ============================================

  'decoy-effect': {
    template: 'diagram',
    concept: `Concept: "THE DECOY" - The pricing trick that makes middle option irresistible (+43%).
Three pricing cards/options displayed.
Middle one GLOWING with golden light - the winner.
"+43%" floating near the middle card.
Bold text "THE DECOY" at top.
Clean white background, premium pricing visualization.`,
    images: [],
  },

  'paradox-of-choice': {
    template: 'diagram',
    concept: `Concept: "LESS = MORE" - Fewer options equals more sales (the jam study).
Split screen: LEFT = 24 jam jars (chaos, overwhelm, X mark).
RIGHT = 6 jam jars (clarity, organized, checkmark).
I'm uploading Sheena Iyengar's image - include her.
Bold text "LESS = MORE" at top.
Choice paralysis visualization.`,
    images: [imageAssets.sheenaIyengar],
  },

  'five-second-test': {
    template: 'diagram',
    concept: `Concept: "5 SECONDS" - If they don't get it instantly, they leave.
Website split: LEFT half = blurry/unclear, RIGHT half = crystal clear.
Stopwatch showing exactly 5 seconds.
Bold text "5 SECONDS" in urgent style.
Clarity test visualization.
Clean background with dramatic split effect.`,
    images: [],
  },

  'framing-effect-mastery': {
    template: 'diagram',
    concept: `Concept: "SAME THING" - Context changes everything (framing effect).
SAME product shown twice: LEFT = cheap context, RIGHT = luxury context.
Mind-bending same item, wildly different perception.
I'm uploading Daniel Kahneman's image - include him.
Bold text "SAME THING" with quotes for impact.
Split screen with dramatic contrast.`,
    images: [imageAssets.danielKahneman],
  },

  'speed-equals-trust': {
    template: 'diagram',
    concept: `Concept: "0.1 SECOND" - Amazon's $1.7B lesson on page speed.
Loading bar stuck at 99% with money visibly draining/evaporating.
Bold text "0.1 SECOND" or "$1.7 BILLION" prominently.
I'm uploading Amazon logo - make it prominent.
Terrifying cost of slowness visualization.
Red/urgent color scheme.`,
    images: [imageAssets.amazon],
  },

  'leaky-bucket-audit': {
    template: 'diagram',
    concept: `Concept: "$50K HOLE" - You're bleeding money and don't know it.
Large bucket with money (crisp $100 bills) visibly leaking through holes.
Flashlight beam exposing one of the holes.
Bold text "$50K HOLE" or "LEAKING" at top.
Urgent, actionable, problem-exposing energy.
Dark background with spotlight on bucket.`,
    images: [],
  },

  'von-restorff-effect': {
    template: 'diagram',
    concept: `Concept: "STAND OUT" - The different one gets remembered (isolation effect).
Row of identical gray circles/figures - all the same.
ONE circle/figure in bright RED or GOLD - glowing, different.
Bold text "STAND OUT" at top.
Simple but powerful psychology visualization.
Clean background, maximum contrast.`,
    images: [],
  },

  // ============================================
  // LUXURY & BRAND LESSONS
  // ============================================

  'value-ladder': {
    template: 'diagram',
    concept: `Concept: "HIDDEN MENU" - The VIP level above what customers see.
Red velvet rope dramatically parting to reveal secret/exclusive menu.
Luxury exclusivity visualization.
I'm uploading Rolex logo - premium brand reference.
Bold text "HIDDEN MENU" at top.
Dark, mysterious, exclusive club energy.`,
    images: [imageAssets.rolex, imageAssets.reconvert],
  },

  'box-worth-300': {
    template: 'diagram',
    concept: `Concept: "$300 BOX" - Tiffany's box is worth more than what's inside.
Empty iconic Tiffany blue box as the star - OPEN and EMPTY.
"$300" price tag floating near the empty box.
I'm uploading Tiffany logo - make it prominent.
Luxury psychology exposed.
Clean white background with soft shadows.`,
    images: [imageAssets.tiffany],
  },

  'hermes-doctrine': {
    template: 'diagram',
    concept: `Concept: "PROTECT THE BIRKIN" - Hermès infinite game strategy.
Birkin bag displayed under glass dome like museum piece.
"2 YEAR WAITLIST" floating text.
Ultra-luxury, scarcity is strategy visualization.
I'm uploading Hermès logo - make it elegant.
Dark, prestigious museum gallery aesthetic.`,
    images: [imageAssets.hermes],
  },

  'dior-pricing-secret': {
    template: 'diagram',
    concept: `Concept: "$57 → $3,500" - The 60x luxury markup customers happily pay.
SAME bag shown twice with dramatically different price tags.
Left: "$57" with cheap look. Right: "$3,500" with luxury presentation.
Bold text "$57 → $3,500" showing the transformation.
I'm uploading Dior logo.
Luxury pricing psychology exposed.`,
    images: [imageAssets.dior],
  },

  'gucci-short-termism': {
    template: 'diagram',
    concept: `Concept: "WHY GUCCI IS DYING" - Trend chasing kills brands.
Split screen: LEFT = Gucci logo fading/crumbling.
RIGHT = Hermès/Rolex still strong and shiny.
Confrontational, newsworthy energy.
Bold text "WHY GUCCI IS DYING" at top.
I'm uploading logos for both brands.`,
    images: [imageAssets.gucci, imageAssets.hermes],
  },

  'scarcity-calendar': {
    template: 'diagram',
    concept: `Concept: "ONE PER YEAR" - Le Creuset's scarcity engine (one color annually).
Colorful Dutch ovens in rainbow arrangement.
"SOLD OUT" banner dramatically across most of them.
Calendar showing limited availability.
I'm uploading Le Creuset logo.
Collector psychology and FOMO visualization.`,
    images: [imageAssets.leCreuset],
  },

  'anchor-moments': {
    template: 'diagram',
    concept: `Concept: "$20K makes $200 CHEAP" - Ralph Lauren's price anchoring.
Expensive $20K bag on pedestal (spotlight, premium).
Polo shirt nearby looking like a bargain at $200.
Bold text showing the price anchor psychology.
I'm uploading Ralph Lauren logo.
Luxury retail psychology exposed.`,
    images: [imageAssets.ralphLauren],
  },

  // ============================================
  // PRIMAL/BEHAVIORAL PSYCHOLOGY
  // ============================================

  'primal-stimuli': {
    template: 'diagram',
    concept: `Concept: "6 BUY BUTTONS" - The reptile brain triggers that work on everyone.
Ancient/primitive style brain with 6 glowing modern buttons embedded.
Prehistoric meets neuroscience visualization.
Bold text "6 BUY BUTTONS" at top.
Dark background with dramatic lighting on brain.
Primal psychology exposed.`,
    images: [],
  },

  'fly-in-the-urinal': {
    template: 'diagram',
    concept: `Concept: "THE FLY" - Amsterdam airport nudge that changed behavior 80%.
Target/bullseye with small fly in center.
"80%" stat prominently displayed.
Behavioral economics case study visualization.
Bold text "THE FLY" at top.
Unexpected, fascinating, clean design.`,
    images: [],
  },

  'forty-million-mistake': {
    template: 'diagram',
    concept: `Concept: "$40 MILLION MISTAKE" - New Coke disaster (data without emotion).
Data charts/graphs literally on FIRE, burning.
Red heart emerging triumphant from the ashes.
I'm uploading Coca-Cola logo - include subtly.
Bold text "$40 MILLION MISTAKE" at top.
Cautionary tale about ignoring emotion.`,
    images: [imageAssets.cocaCola],
  },

  'precise-price-trick': {
    template: 'diagram',
    concept: `Concept: "$4,988 BEATS $5,000" - Precise numbers feel researched.
Two price tags side by side: "$5,000" (X over it) vs "$4,988" (checkmark).
Precise price GLOWING as winner.
Counterintuitive pricing psychology.
Bold text showing both numbers.
Clean white background with dramatic comparison.`,
    images: [],
  },

  // ============================================
  // CRO & TESTING
  // ============================================

  'product-page-anatomy': {
    template: 'diagram',
    concept: `Concept: "5 ELEMENTS" - The anatomy of pages that convert 8%+.
Exploded product page diagram - each section separated and labeled.
Like an engineering blueprint but for websites.
Bold text "5 ELEMENTS" at top.
Clean white background with technical diagram aesthetic.
Blueprint for conversion success.`,
    images: [],
  },

  'jakobs-law': {
    template: 'diagram',
    concept: `Concept: "FAMILIAR WINS" - Don't be unique in checkout (Jakob's Law).
Split: LEFT = confusing custom UI with X mark.
RIGHT = familiar Amazon-style checkout with checkmark.
UX principle visualization.
Bold text "FAMILIAR WINS" at top.
Clean comparison layout.`,
    images: [],
  },

  'ikea-effect': {
    template: 'diagram',
    concept: `Concept: "DIY = +63%" - We value what we build (IKEA effect).
Assembled furniture with "+63% VALUE" badge glowing.
Assembly tools (Allen key, screwdriver) visible nearby.
I'm uploading IKEA logo - make it prominent.
Bold text "DIY = +63%" at top.
Participation psychology visualization.`,
    images: [imageAssets.ikea],
  },

  // ============================================
  // ADDITIONAL LESSONS
  // ============================================

  'pet-rock-story': {
    template: 'diagram',
    concept: `Concept: "$30M FROM ROCKS" - Pet Rock sold meaning, not products.
Simple rock on red velvet cushion wearing tiny golden crown.
Money ($100 bills) raining down around it.
Bold text "$30M FROM ROCKS" at top.
Absurdist but true - ultimate marketing story.
Clean background with dramatic spotlight on rock.`,
    images: [],
  },

  'gary-halbert-secret': {
    template: 'diagram',
    concept: `Concept: "STARVING CROWD" - Find the hungry market first.
Massive crowd reaching desperately with money in hands.
Everyone demanding something urgently.
I'm uploading Gary Halbert's image - include him as authority.
Bold text "STARVING CROWD" at top.
Vintage direct response aesthetic.`,
    images: [imageAssets.garyHalbert],
  },

  'formula-to-sell': {
    template: 'diagram',
    concept: `Concept: "THE FORMULA" - Dream + Likelihood + Time + Effort = Sale.
Beautiful equation visualization with icons for each element.
Mathematical selling representation.
I'm uploading Alex Hormozi's image - include him.
Bold text "THE FORMULA" at top.
Clean, scientific, premium.`,
    images: [imageAssets.alexHormozi],
  },

  'no-one-cares': {
    template: 'diagram',
    concept: `Concept: "NO ONE CARES" - Brutal truth that everyone only cares about themselves.
Person with megaphone being completely ignored by phone-scrolling crowd.
Everyone absorbed in their own world.
Bold text "NO ONE CARES" in quotes for impact.
Confrontational wake-up call energy.
Clean composition showing isolation.`,
    images: [],
  },

  'imperceptible-nudge': {
    template: 'diagram',
    concept: `Concept: "THE $200M COLOR" - Amazon's button color change that made $200M.
A/B test visualization with two buttons side by side.
Winning orange button GLOWING with "$200M" floating above it.
I'm uploading Amazon logo - make it prominent.
Bold text "$200M COLOR" at top.
Micro-optimization power revealed.`,
    images: [imageAssets.amazon],
  },

  'hero-mechanism': {
    template: 'diagram',
    concept: `Concept: "THE $4,225 QUESTION" - Why Oura Ring costs $399 vs $12 knockoffs (32X).
Split screen: LEFT = pile of cheap $12 trackers looking cheap.
RIGHT = Oura Ring on pedestal, glowing, premium, "$399".
I'm uploading Oura logo - make it prominent.
Bold text showing the 32X premium.
Premium positioning psychology exposed.`,
    images: [imageAssets.oura],
  },

  // Default empty for auto-generated prompts
};

// Lesson metadata - EXACT SAME ORDER as learn page
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
  // Article-based lessons
  'best-private-agent': { title: 'Who Is the Best Private Agent', description: '5-7 day shipping, 18/6 WhatsApp support' },
  'stop-aliexpress': { title: 'Stop Using AliExpress Now', description: 'Why AliExpress destroys your brand' },
  'ltv-cheat-code': { title: 'The LTV Cheat Code', description: 'How 5% of customers generate 95% of revenue' },
  'million-dollar-roadmap': { title: 'The Roadmap to $1M/Month', description: '33 customers per day formula' },
  'geo-announcement-bar': { title: 'GEO-Location Announcement Bar', description: '67% conversion rate increase' },
  'wishlist-effect': { title: 'The Wishlist Effect', description: 'Endowment Effect psychology (+8% CVR)' },
  'email-vs-sms': { title: 'Email vs SMS Revenue', description: 'Which generates more revenue?' },
  'abandoned-cart-recovery': { title: 'Abandoned Cart Recovery', description: 'AI SMS vs Email: 85% vs 60%' },
  'pareto-law-ecommerce': { title: 'The Pareto Law in eCommerce', description: '5% customers = 95% revenue' },
  'whatsapp-support': { title: 'Should You Add WhatsApp Support?', description: 'Why email-only is better' },
  'meta-attribution-test': { title: 'Is Meta Lying About Creatives?', description: 'Meta only tracks 67% of purchases' },
  'post-purchase-surveys': { title: 'Post Purchase Surveys', description: 'Know your customers with data' },
  'fonts-psychology': { title: 'The Truth About Fonts', description: 'How fonts affect trust and conversions' },
  // New article-based lessons (batch 2)
  'brand-search-campaign': { title: 'Brand Search Campaign', description: '18 ROAS on Google with brand search' },
  'swatch-variants': { title: 'Swatch Variants Test', description: '3.4% CVR increase with image swatches' },
  'buy-now-button': { title: 'Buy Now Button Analysis', description: 'Removing it increased REV/VISIT by 15.9%' },
  'rounded-button': { title: 'Rounded Add to Cart Button', description: '28px rounded = highest CVR' },
  'best-shopify-theme': { title: 'Best Shopify Theme', description: 'Shrine vs Impulse: 34.9% CVR difference' },
  'coupon-leaking': { title: 'Coupon Leaking Problem', description: 'Stop losing profit to extensions' },
  'meta-andromeda': { title: 'Meta\'s Andromeda Brain', description: 'How to operate under Meta\'s new AI' },
  'gillette-model': { title: 'The Gillette Model', description: 'Cheap entry, expensive consumables' },
  'best-niches-2026': { title: 'Best Niches for 2026', description: 'Niches with long customer journeys' },
  'two-meta-rules': { title: 'Two Meta Product Rules', description: 'Special enough + not too specific' },
  'pinned-comment-cac': { title: 'Pinned Comment CAC Trick', description: 'Reduce CAC with objection-handling comments' },
  'mastercard-psychology': { title: 'Mastercard Logo Effect', description: 'Payment logos increase willingness to pay' },
  'formula-to-sell': { title: 'The Formula to Sell Anything', description: '4 elements: Dream, Likelihood, Time, Effort' },
  'choose-products': { title: 'How to Choose Products', description: 'Two rules for winning products' },
  'gary-halbert-secret': { title: 'Gary Halbert\'s Secret', description: 'Sell what people already want' },
  'pet-rock-story': { title: 'Pet Rock: $30M from Rocks', description: 'How to sell meaning, not products' },
  'starbucks-ltv': { title: 'Starbucks $14,099 LTV', description: 'How 5% generate 95% of revenue' },
  'killer-headlines': { title: 'Killer Ad Headlines', description: '80% of success is in the headline' },
  'two-dirty-tricks': { title: 'Two Dirty Tricks to Sell', description: 'Dream Outcome + Social Proof' },
  'golden-lookalike': { title: 'Golden Lookalike Audience', description: 'LLA on top 5% spenders = $8-10 CAC' },
  'cbo-vs-abo': { title: 'CBO vs ABO Under Andromeda', description: 'ABO for testing, CBO for scaling' },
  'geo-personalization': { title: 'GEO Personalization Power', description: 'Location-based offers increase CVR' },
  'no-one-cares': { title: 'No One Cares About You', description: 'Self-interest drives all purchases' },
  'creative-volume-2026': { title: 'Creative Volume in 2026', description: '40-70 creatives weekly for Andromeda' },
  // Psychology of Sales lessons
  'autopilot-sale': { title: 'The Autopilot Sale', description: 'How mental shortcuts make customers buy without thinking' },
  'borrowed-trust': { title: 'Borrowed Trust', description: 'Authority and Liking principles that bypass skepticism' },
  'herd-instinct': { title: 'The Herd Instinct', description: 'Social proof and similar others create buying pressure' },
  'gift-that-sells': { title: 'The Gift That Sells', description: 'Reciprocity loops that drive sales' },
  'micro-yes-mastery': { title: 'Micro-Yes Mastery', description: 'Tiny commitments create inevitable conversions' },
  // Additional Psychology lessons
  'authority-over-hope': { title: 'Authority Over Hope', description: 'Stop hoping they buy. Guide them with certainty.' },
  'certainty-transfer': { title: 'Certainty Transfer', description: 'Master the art of transferring conviction' },
  'conviction-architecture': { title: 'Conviction Architecture', description: 'The 3-layer pyramid of influence' },
  'digital-pause-power': { title: 'The Digital Pause', description: 'Confident silence converts better than discounts' },
  'fomo-engineering': { title: 'FOMO Engineering', description: 'Turn passive interest into urgent action' },
  'framing-effect-mastery': { title: 'The Framing Effect', description: 'Same facts. Wildly different decisions.' },
  'identity-marketing': { title: 'Identity Marketing', description: 'Sell to who they WANT to be' },
  'marketers-delusion': { title: "The Marketer's Delusion", description: 'The fatal error killing conversions' },
  'pain-escalation-ladder': { title: 'The Pain Escalation Ladder', description: 'Ethically escalate pain to action' },
  'telescope-flip': { title: 'The Telescope Flip', description: '97% of marketers hold it backwards' },
  'trust-blueprint': { title: 'The Trust Blueprint', description: 'Build instant credibility that converts' },
  'value-perception-lever': { title: 'The Value Perception Lever', description: 'Make price irrelevant' },
  'three-brains-wallet': { title: 'The 3 Brains Controlling Your Customer\'s Wallet', description: 'Which brain controls the wallet' },
  'pre-suasion-hack': { title: 'The Pre-Suasion Hack', description: 'Win before the pitch' },
  'pattern-interrupts': { title: 'Pattern Interrupts', description: 'Hijack their attention' },
  'dopamine-blueprint': { title: 'The Dopamine Blueprint', description: 'Create addictive loops' },
  'anti-sell-mastery': { title: 'The Anti-Sell', description: 'Pull, don\'t push' },
  // Primal Playbook lessons
  'decoy-effect': { title: 'The Decoy Effect', description: 'Why a "useless" option boosts sales by 43%' },
  'precise-price-trick': { title: 'The Precise Price Trick', description: 'Why $4,988 beats $5,000' },
  'paradox-of-choice': { title: 'The Paradox of Choice', description: 'Why fewer options = more sales' },
  'forty-million-mistake': { title: 'The $40 Million Mistake', description: 'Data without emotion = disaster' },
  'fly-in-the-urinal': { title: 'The Fly in the Urinal', description: 'Nudge psychology in action' },
  // Conversion Blueprint lessons
  'thirty-two-violinist': { title: 'The $32 Violinist', description: 'Context dictates perceived value' },
  'invisible-influence': { title: 'The Invisible Influence', description: 'How backgrounds prime buying decisions' },
  'price-format-code': { title: 'The Price Format Code', description: 'How formatting changes price perception' },
  'cost-of-standing-still': { title: 'The Cost of Standing Still', description: 'Sell the cost of NOT buying' },
  'unity-principle': { title: 'The Unity Principle', description: 'One word turns customers into partners' },
  'visual-priming': { title: 'The Invisible Influencer', description: 'How background images decide what customers buy' },
  'objection-inversion': { title: 'The Objection Judo Trick', description: 'Turn objections into reasons to buy' },
  'primal-stimuli': { title: 'The 6 Primal Buy Buttons', description: 'The only 6 triggers that get the reptile brain to say YES' },
  // CRO Flywheel + Direct Response Brand lessons
  'leaky-bucket-audit': { title: 'The $50,000 Hole in Your Funnel', description: 'PPV metric reveals where you\'re bleeding money' },
  'price-chunking-yesloop': { title: 'The Yes-Loop: How to 3X Your AOV', description: 'Break big prices into irresistible small yeses' },
  'objection-destroyer': { title: 'The At First I Thought Framework', description: 'Turn objections into conversions with one sentence' },
  'product-page-anatomy': { title: 'The 5-Element Product Page', description: 'The exact anatomy of pages that convert at 8%+' },
  'post-purchase-goldmine': { title: 'The Hidden Revenue You\'re Ignoring', description: 'Turn $40 customers into $120 instantly' },
  'bottom-up-brand': { title: 'Why Movements Beat Marketing', description: 'Build a brand like a movement, not a corporation' },
  'halo-serial-position': { title: 'The First & Last Impression Hack', description: '0.05 seconds decides if they trust you' },
  'ikea-effect': { title: 'The IKEA Effect', description: 'Why DIY = 63% higher perceived value' },
  'von-restorff-effect': { title: 'The Von Restorff Effect', description: 'Make your CTA impossible to miss' },
  'jakobs-law': { title: 'Jakob\'s Law', description: 'Why "unique" checkout flows kill conversions' },
  // Unseen Seller + Psychological Commerce lessons
  'gaze-direction': { title: 'The Gaze Hack', description: 'Where they look is where they click' },
  'five-second-test': { title: 'The 5-Second Test', description: 'Why clarity crushes cleverness' },
  'speed-equals-trust': { title: 'The $1.7 Billion Speed Bump', description: '0.1 second = 1% more sales' },
  'imperceptible-nudge': { title: 'The $200 Million Color', description: 'Invisible nudges that drive millions' },
  'cognitive-load-trap': { title: 'The Easy Brain Wins', description: 'Reduce friction, increase trust' },
  'placebo-product': { title: 'Your Product Is a Placebo', description: 'Perception literally alters reality' },
  'information-asymmetry': { title: 'The Prada Mystery Play', description: 'Hide information to elevate status' },
  'visual-shorthand': { title: 'Toothpaste Stripes Psychology', description: 'Visual cues shortcut to quality' },
  'radical-honesty-play': { title: 'The Inside Joke Effect', description: 'Admit you\'re marketing to win' },
  'hermes-doctrine': { title: 'The Hermès Infinite Game', description: 'Protect the Birkin, play forever' },
  // DTC Growth + Luxury Status + Psychology Growth lessons
  'hero-mechanism': { title: 'The $4,225 Question', description: 'Why Oura Ring costs $399 vs $12 knockoff' },
  'scammer-playbook-good': { title: "The Scammer's Playbook (Used for Good)", description: '7 ethical persuasion levers' },
  'us-vs-them': { title: 'The David vs Goliath Play', description: 'Create tribal identity through enemies' },
  'brand-universe': { title: 'Build a World, Not Just a Store', description: 'Create universes, not products' },
  'product-to-identity': { title: 'From Product to Identity Purchase', description: 'Transform commodities to identity' },
  'commodity-escape': { title: 'The Commodity Trap', description: 'How Starbucks charges $6 for $0.50 coffee' },
  'myth-and-urgency': { title: 'Weaving Myth & Manufacturing Urgency', description: 'Create irresistible desire through scarcity + story' },
  'value-ladder': { title: 'The Value Ladder & Hidden Menu', description: 'Secret tiers that create aspiration' },
  'box-worth-300': { title: 'The $300 Empty Box', description: "Tiffany's packaging IS the product" },
  'story-taste-experiment': { title: 'Your Story Changes How Products TASTE', description: 'Story literally alters perception' },
  'scarcity-calendar': { title: "Le Creuset's Scarcity Engine", description: 'One color per year creates collectors' },
  'anchor-moments': { title: "Ralph Lauren's Anchor Moments", description: '$20K bag makes $200 polo feel cheap' },
  'irrational-loyalty': { title: 'The Pizza Test & Sock Test', description: 'Once identity forms, logic dies' },
  'reciprocity-engine': { title: "The 42% Sales Trick (That's Not a Trick)", description: 'Why giving away free samples increased sales 42%' },
  'gucci-short-termism': { title: 'Why Gucci Is Dying', description: 'Fashion chases trends. Luxury chases timelessness' },
  'ethical-persuasion-compass': { title: 'The Magic Show Test', description: 'The ethical line between persuasion and manipulation' },
  'two-worlds-mastery': { title: 'The Two Worlds Every DTC Founder Must Master', description: 'Performance marketing vs brand building' },
  'race-to-bottom-escape': { title: 'Why Your ROAS Is Killing Your Business', description: "You're winning every battle and losing the war" },
  'founder-operating-system': { title: 'The 4 Traits of Legendary Brand Founders', description: 'What separates iconic founders from the rest' },
  '13800-percent-effect': { title: 'Why 10% Better = 13,800% Better', description: 'Small improvements compound into massive advantages' },
  'dior-pricing-secret': { title: 'The $57 Bag That Sells for $3,500', description: 'What Dior and Rolex know about pricing' },
  'consumption-conversion': { title: "Why Your Product Page Isn't Converting", description: 'The gap between consumption and conversion' },
  'luxury-mindset-shift': { title: 'The 4 Mindset Shifts That Create Premium Brands', description: 'Transform your thinking from commodity to luxury' },
  // CRO & Testing lessons
  'three-cro-tests': { title: 'The 3 CRO Tests That Actually Move Revenue', description: 'Focus on tests that impact the bottom line' },
  'digital-velvet-rope': { title: 'The Digital Velvet Rope', description: 'Create exclusive experiences that elevate perception' },
  'hidden-menu-psychology': { title: 'The Hidden Menu Effect', description: 'Secret options that create status and belonging' },
  'celebrity-gifting-flywheel': { title: 'The Celebrity Gifting Flywheel', description: 'Turn free products into millions in influence' },
  'forbidden-coffee-hook': { title: 'The Forbidden Coffee Hook', description: 'Mystery and exclusivity wrapped in a story' },
  // Meta Ads 2026 lessons (Andromeda)
  'meta-three-second-hook': { title: 'The 3-Second Hook Rule', description: 'Meta judges your creative in the first 3 seconds' },
  'meta-70-20-10-rule': { title: 'The 70/20/10 Creative Rule', description: '70% proven, 20% iteration, 10% wild experiments' },
  'meta-ga4-integration': { title: 'The GA4 Signal Hack', description: 'Feed Meta high-quality signals via GA4' },
  'meta-1-1-x-structure': { title: 'The 1-1-X Structure', description: '1 campaign, 1 ad set, X creatives' },
  // Meta Ads 2026 lessons (Performance)
  'meta-auction-formula': { title: 'The Meta Auction Formula', description: 'Total Value = Bid × EAR × Quality' },
  'meta-controls-vs-suggestions': { title: 'Controls vs Suggestions', description: 'Hard boundaries vs soft signals in targeting' },
  'meta-creative-ecosystem': { title: 'The Creative Ecosystem', description: 'Build 20-50 meaningfully different ads' },
  'meta-capi-pixel-setup': { title: 'CAPI + Pixel Setup', description: 'Dual tracking is now mandatory' },
  // Additional missing lessons
  'product-reviews-test': { title: 'Product Reviews Test', description: 'Do reviews actually increase conversions?' },
  'ascension-ladder': { title: 'The Ascension Ladder', description: 'Move customers up the value chain' },
  'brain-friendly-ux': { title: 'Brain-Friendly UX', description: 'Design for how the brain actually works' },
  'brand-moat': { title: 'The Brand Moat', description: 'Build defensible competitive advantages' },
  'brand-promise-code': { title: 'The Brand Promise Code', description: 'Craft promises that convert' },
  'checkout-line-effect': { title: 'The Checkout Line Effect', description: 'Last-minute impulse psychology' },
  'compound-testing-effect': { title: 'The Compound Testing Effect', description: 'How small wins stack into massive gains' },
  'emotional-gap': { title: 'The Emotional Gap', description: 'Bridge the gap between desire and action' },
  'emotional-problem': { title: 'The Emotional Problem', description: 'Find the real problem behind the problem' },
  'five-value-heuristics': { title: 'The 5 Value Heuristics', description: 'Mental shortcuts for perceived value' },
  'ice-prioritization': { title: 'ICE Prioritization', description: 'Impact, Confidence, Ease framework' },
  'identity-shift-effect': { title: 'The Identity Shift Effect', description: 'When buying becomes becoming' },
  'le-creuset-scarcity-engine': { title: 'The Le Creuset Scarcity Engine', description: 'Limited colors create collectors' },
  'local-holiday-legitimacy': { title: 'Local Holiday Legitimacy', description: 'Cultural moments that drive sales' },
  'logo-is-worthless': { title: 'Your Logo Is Worthless', description: 'Brand equity isn\'t in the symbol' },
  'micro-yes-engine': { title: 'The Micro-Yes Engine', description: 'Build momentum through tiny commitments' },
  'missing-piece-effect': { title: 'The Missing Piece Effect', description: 'Incomplete sets drive completion urge' },
  'nine-trust-levers': { title: 'The 9 Trust Levers', description: 'Every element that builds credibility' },
  'ninety-seven-percent-leak': { title: 'The 97% Leak', description: 'Most visitors leave without buying' },
  'offer-is-everything': { title: 'The Offer Is Everything', description: 'Your offer matters more than your copy' },
  'owned-audience-effect': { title: 'The Owned Audience Effect', description: 'Build assets you control' },
  'pain-dream-bridge': { title: 'The Pain-Dream Bridge', description: 'Connect current pain to desired future' },
  'performance-engine': { title: 'The Performance Engine', description: 'Systems that scale profitably' },
  'poppy-disruptor-blueprint': { title: 'The Poppy Disruptor Blueprint', description: 'Break category conventions' },
  'post-purchase-momentum': { title: 'Post-Purchase Momentum', description: 'Turn buyers into repeat customers' },
  'premium-flywheel': { title: 'The Premium Flywheel', description: 'Compound premium positioning' },
  'price-creates-value': { title: 'Price Creates Value', description: 'Higher prices increase perception' },
  'psychological-moat': { title: 'The Psychological Moat', description: 'Mental barriers that protect your brand' },
  'self-selection-principle': { title: 'The Self-Selection Principle', description: 'Let customers qualify themselves' },
  'sell-the-identity': { title: 'Sell the Identity', description: 'Products are identity purchases' },
  'shape-psychology': { title: 'Shape Psychology', description: 'How shapes affect perception' },
  'smallest-viable-market': { title: 'The Smallest Viable Market', description: 'Dominate a niche before expanding' },
  'sms-open-rate-secret': { title: 'The SMS Open Rate Secret', description: 'Why SMS beats email for engagement' },
  'story-changes-taste': { title: 'Story Changes Taste', description: 'Narrative literally alters perception' },
  'thirty-five-thousand-decisions': { title: '35,000 Decisions', description: 'Reduce decision fatigue to convert' },
  'whale-customer-paradox': { title: 'The Whale Customer Paradox', description: 'Your best customers behave differently' },
  // Google Ads 2026 lessons
  'google-highest-cpa-wins': { title: 'Why The Highest CPA Wins', description: 'The counterintuitive truth about Google Ads dominance' },
  'google-product-feed-mastery': { title: 'Your Product Feed IS Your Ad', description: 'The hidden weapon for Shopping & PMax success' },
  'google-pmax-blueprint': { title: 'The PMax Asset Group Blueprint', description: 'Stop forcing Google AI to guess' },
  'google-data-quality-edge': { title: 'Better Data In, Better AI Out', description: 'The quality edge that wins in 2026' },
  'google-competitor-conquest': { title: 'Competitor Conquest', description: 'Steal market share legally with Google Ads' },
  // Google Shopping Blueprint lessons
  'google-shopping-intent': { title: 'Active Intent: Why Google Shopping Wins', description: 'Capture users who are actively searching to buy' },
  'google-store-trust-checklist': { title: 'Earn Google\'s Trust First', description: 'The store readiness checklist to avoid suspension' },
  'google-hero-product-funnel': { title: 'Find Your Hero Products', description: 'From clicks to winners - buying data not profit' },
  'google-click-fraud-shield': { title: 'Shield Your Budget from Click Fraud', description: 'Protect your data from bots and competitors' },
  'google-ai-max-decision': { title: 'AI Max: Power vs Control', description: 'The decision framework for Google\'s AI automation' },
  // Google Growth Engine lessons
  'google-negative-keyword-colander': { title: 'The Negative Keyword Colander', description: 'Filter out waste - only profitable clicks get through' },
  'google-optimization-cadence': { title: 'The Optimization Rhythm', description: 'Stop random tinkering - follow a disciplined cadence' },
  'google-ad-assets-arsenal': { title: 'Free Real Estate: Ad Assets', description: 'Make your ads bigger and more clickable - for free' },
  'google-landing-page-bridge': { title: 'The Click is Only Half the Battle', description: 'What happens AFTER the click determines success' },
  'google-ai-overviews-opportunity': { title: 'Ads in AI Overviews', description: 'Capture users in Google\'s new AI-powered search results' },
  // Google Ads Advanced lessons
  'google-brand-moat': { title: 'Brand is the Ultimate Moat', description: 'The barrier competitors can\'t copy with a bigger budget' },
  'google-budget-reallocation': { title: 'Feed Your Winners', description: 'How to go from 2.8x to 5.1x ROAS by reallocating budget' },
  'google-focus-firepower': { title: 'Focus Your Firepower', description: 'Stop spreading thin - consolidate budget on bestsellers' },
  'google-influencer-creative': { title: 'Outsource Your Creative Genius', description: 'The scaling hack: hire influencers for ad content' },
  // Business Fundamentals lessons
  'biz-infinite-money-engine': { title: 'The Infinite Money Engine', description: 'The single equation that transforms eCommerce into a video game with unlimited money' },
  'biz-rat-brain-hijack': { title: 'The Rat Brain Hijack', description: 'How to command attention by triggering the subconscious mind' },
  'biz-velocity-advantage': { title: 'The Velocity Advantage', description: 'Why speed is the biggest unfair advantage in business' },
  'biz-remarkable-product': { title: 'Build Something Remarkable', description: 'Why good enough products fight the laws of the matrix forever' },
  'biz-asset-not-job': { title: 'Build an Asset, Not a Job', description: 'The $3 million difference between earning income and building wealth' },
  // Business Leverage Playbook lessons
  'biz-leverage-equation': { title: 'The Leverage Equation', description: 'Stop working harder. Start working smarter with the equation that changes everything.' },
  'biz-counter-position': { title: 'The Counter-Position Strategy', description: 'Create a battlefield where the giants\' money is worthless.' },
  'biz-awareness-sweet-spot': { title: 'The Market Awareness Sweet Spot', description: 'Enter markets where customers feel the pain but don\'t know the solution exists.' },
  'biz-barbell-strategy': { title: 'The Barbell Strategy', description: '5% big swings. 95% small wins. Avoid the dangerous middle.' },
  'biz-one-pager-blueprint': { title: 'The One-Pager Blueprint', description: 'Kill shiny object syndrome with the 4 questions that become your North Star.' },
  // E-commerce Cheat Code Business lessons
  'biz-infinite-money-loop': { title: 'The Infinite Money Loop', description: 'The 6-step flywheel that turns paid advertising into infinite profit' },
  'biz-marketing-company': { title: "You're Not a Brand", description: 'The identity shift that separates winners from wannabes' },
  'biz-product-expansion': { title: 'The Ridge Playbook', description: 'How Ridge solved their LTV problem with product expansion' },
  'biz-zero-cac-engine': { title: 'The $0 CAC Engine', description: 'Get customers for free before you ever spend on ads' },
  'biz-creative-targeting': { title: 'Creative is the New Targeting', description: 'Volume + Diversity + Measurement: The system for winning' },
  // The Infinite Money Equation lessons
  'biz-3x-threshold': { title: 'The 3x Threshold', description: 'The single equation that separates struggling stores from money-printing machines' },
  'biz-asymmetric-monopoly': { title: 'The Asymmetric Monopoly', description: 'How a 1400:1 ratio creates a legal monopoly nobody can compete with' },
  'biz-authenticity-anchor': { title: 'The Authenticity Anchor', description: 'How Nike stayed cool for 40 years while competitors chased trends and died' },
  'biz-brand-ltv-engine': { title: 'The Brand LTV Engine', description: 'How Ralph Lauren, LEGO, and Le Creuset engineer endless reasons to return' },
  'biz-brand-temple': { title: 'The Brand Temple Strategy', description: 'How Ralph Lauren, LEGO, and Le Creuset built billion-dollar empires through loyalty' },
  'biz-cash-conversion': { title: 'The Negative Cash Conversion Cycle', description: 'How Davie Fogarty bootstrapped The Oodie to nearly $1B using customer money' },
  'biz-closer-framework': { title: 'The CLOSER Framework', description: 'Alex Hormozi\'s battle-tested 6-step sales system that converts without being pushy' },
  'biz-courage-variable': { title: 'The Courage Variable', description: 'The hidden code behind every empire: 7,000 failures, £2 profit, and betting it all' },
  'biz-empathy-engine': { title: 'The Empathy Engine', description: 'The invisible difference between good service and service that creates lifelong customers' },
  'biz-four-pillars': { title: 'The Four Pillars Protocol', description: 'The complete framework to escape the wheel and build a business that prints money' },
  'biz-hamster-wheel': { title: 'The Hamster Wheel Trap', description: 'The Matrix-level prison keeping 99% of eCommerce stores broke—and how to escape' },
  'biz-infinite-flywheel': { title: 'The Infinite Money Flywheel', description: 'How $100 ad spend becomes a predictable, scalable money machine' },
  'biz-leaders-burden': { title: 'The Leader\'s Burden', description: 'If the system fails, the leader failed. The ultimate accountability framework' },
  'biz-lifetime-gross-profit': { title: 'Lifetime Gross Profit', description: 'The number everyone calculates wrong—and why it kills businesses' },
  'biz-logic-trap': { title: 'The Logic Trap', description: 'Why the smartest marketing decision can destroy your sales overnight' },
  'biz-ltv-cac-dashboard': { title: 'The Operator\'s Dashboard', description: 'The LTV:CAC ratios that separate struggling businesses from unstoppable ones' },
  'biz-ltv-levers': { title: 'The LTV Control Panel', description: '7 levers to increase customer lifetime value and maximize profitability' },
  'biz-model-vs-method': { title: 'Model vs Method', description: 'Why the best model beats the best tactics every single time' },
  'biz-objection-dance': { title: 'The Objection Dance', description: 'Handling objections is a dance, not a fight. 4 techniques that disarm resistance' },
  'biz-operator-mindset': { title: 'The Operator\'s Mindset', description: 'How Ben Francis built Gymshark to $1.5B by putting the model above his ego' },
  'biz-purchase-cycle-engine': { title: 'The Purchase Cycle Engineer', description: 'How Le Creuset turned a once-a-decade purchase into an annual buying event' },
  'biz-replication-protocol': { title: 'The Replication Protocol', description: 'Alex Hormozi\'s secret: Simple scales, fancy fails. Why systems beat talent' },
  'biz-rfm-secret': { title: 'The RFM Secret', description: 'How to identify your best customers and make more money from fewer people' },
  'biz-rule-of-100': { title: 'The Rule of 100', description: 'The volume strategy that separates dreamers from millionaires' },
  'biz-valley-protocol': { title: 'The Valley of Despair Protocol', description: 'Why 97% of entrepreneurs quit at the exact moment they should push harder' },
  // New LTV:CAC Playbook lessons
  'biz-high-margin-fortress': { title: 'The High Margin Fortress', description: 'Build a margin moat that competitors can\'t cross' },
  'biz-ridge-wallet-protocol': { title: 'The Ridge Wallet Protocol', description: 'How Ridge solved the one-product problem and unlocked infinite LTV' },
  'biz-20-domination': { title: 'The 20% Domination Rule', description: '20% of your customers generate 80% of your revenue' },
  'biz-channel-mix-formula': { title: 'The Channel Mix Formula', description: 'Master the optimal channel allocation for maximum ROI' },
  'biz-next-best-dollar': { title: 'The Next Best Dollar', description: 'Think like a capital allocator, not a channel manager' },
  // E-commerce Cheat Code PDF #2 lessons
  'biz-authenticity-engine': { title: 'The Authenticity Engine', description: 'The compounding force that makes your brand impossible to replicate' },
  'biz-creator-army': { title: 'The Creator Army', description: 'Build 500+ micro-creators instead of hiring expensive agencies' },
  'biz-mission-driven-brand': { title: 'The Mission-Driven Brand', description: 'Why brands with a cause outperform everyone else' },
  'biz-savage-mentality': { title: 'The Savage Mentality', description: 'The relentless execution mindset that separates winners from dreamers' },
  'biz-systems-architect': { title: 'The Systems Architect', description: 'The transition from player to systems architect that unlocks $10M+' },
  // Infinite Money Game PDF lessons
  'biz-90-percent-trap': { title: 'The 90% Trap', description: 'Why 90% of stores guess their way to failure—while 1% use math' },
  'biz-animal-mindset': { title: 'The Animal Mindset', description: 'How Davie Fogarty built a $500M empire through relentless action' },
  'biz-channel-cac-decoder': { title: 'Channel CAC Decoder', description: 'Why your blended CAC is lying to you' },
  'biz-6-to-1-problem': { title: 'The 6:1 Problem', description: 'Why your "amazing" LTV:CAC ratio might be killing growth' },
  'biz-survival-cycle': { title: 'The Survival Cycle', description: 'The doom loop that kills 97% of stores' },
  'biz-infinite-money-glitch': { title: 'The Infinite Money Glitch', description: 'The self-fueling growth flywheel' },
  'biz-price-anchoring': { title: 'Price Anchoring Power', description: 'Why your $47 offer looks irresistible next to $297' },
  'biz-look-back-window': { title: 'The Look-Back Window', description: 'Why your 30-day data is lying to you' },
};
// Generate concepts for lessons that don't have custom concepts
Object.keys(lessonMeta).forEach(slug => {
  if (!lessonConceptData[slug]) {
    const lesson = lessonMeta[slug];
    const shortTitle = lesson.title.replace(/^The\s+/i, '');
    const hookWords = shortTitle.split(' ').slice(0, 3).join(' ').toLowerCase();
    lessonConceptData[slug] = {
      template: 'diagram' as TemplateType,
      concept: `TEXT: "${hookWords}." in lowercase black sans-serif
VISUAL: Simple visual metaphor for: ${lesson.description}
EXTRA: Keep it minimal, clean, editorial style`,
      images: [],
    };
  }
});

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
  const [promptTasks, setPromptTasks] = useState<Record<string, { needsNewPrompt: boolean; feedback: string }>>({});
  const [showTasksPanel, setShowTasksPanel] = useState(false);
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);

  // Template overrides per lesson - stored in localStorage
  const [templateOverrides, setTemplateOverrides] = useState<Record<string, TemplateType>>({});

  // Load template overrides from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('templateOverrides');
    if (saved) {
      try {
        setTemplateOverrides(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved template overrides:', e);
      }
    }
  }, []);

  // Save template override for a lesson
  const setLessonTemplate = useCallback((slug: string, template: TemplateType) => {
    setTemplateOverrides(prev => {
      const updated = { ...prev, [slug]: template };
      localStorage.setItem('templateOverrides', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get the effective template for a lesson (override or default)
  const getEffectiveTemplate = useCallback((slug: string): TemplateType => {
    if (templateOverrides[slug]) {
      return templateOverrides[slug];
    }
    const conceptData = lessonConceptData[slug];
    return conceptData?.template || 'diagram';
  }, [templateOverrides]);

  // Load prompt tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('promptTasks');
    if (saved) {
      setPromptTasks(JSON.parse(saved));
    }
  }, []);

  // Save prompt tasks to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(promptTasks).length > 0) {
      localStorage.setItem('promptTasks', JSON.stringify(promptTasks));
    }
  }, [promptTasks]);

  // Toggle needs new prompt flag
  const toggleNeedsNewPrompt = useCallback((slug: string) => {
    setPromptTasks(prev => {
      const current = prev[slug] || { needsNewPrompt: false, feedback: '' };
      const updated = { ...prev, [slug]: { ...current, needsNewPrompt: !current.needsNewPrompt } };
      // Remove entry if both values are false/empty
      if (!updated[slug].needsNewPrompt && !updated[slug].feedback) {
        delete updated[slug];
      }
      return updated;
    });
  }, []);

  // Update feedback for a lesson
  const updateFeedback = useCallback((slug: string, feedback: string) => {
    setPromptTasks(prev => {
      const current = prev[slug] || { needsNewPrompt: false, feedback: '' };
      const updated = { ...prev, [slug]: { ...current, feedback } };
      // Remove entry if both values are false/empty
      if (!updated[slug].needsNewPrompt && !updated[slug].feedback) {
        delete updated[slug];
      }
      return updated;
    });
  }, []);

  // Clear a task (after prompt is updated)
  const clearTask = useCallback((slug: string) => {
    setPromptTasks(prev => {
      const updated = { ...prev };
      delete updated[slug];
      localStorage.setItem('promptTasks', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get count of tasks needing attention
  const tasksCount = Object.values(promptTasks).filter(t => t.needsNewPrompt).length;

  // Admin email check
  const ADMIN_EMAILS = ['admin@quantum-scale.co', 'aviv32552@gmail.com'];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  // Copy prompt to clipboard (includes template + specific concept)
  const copyPrompt = useCallback(async (slug: string) => {
    const conceptData = lessonConceptData[slug];
    if (conceptData) {
      const template = getEffectiveTemplate(slug);
      const fullPrompt = buildFullPrompt(conceptData.concept, template);
      await navigator.clipboard.writeText(fullPrompt);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  }, [getEffectiveTemplate]);

  // Load lessons and their thumbnails
  useEffect(() => {
    async function loadLessons() {
      setIsLoading(true);

      // Get all lesson slugs from lessonMeta
      const allSlugs = Object.keys(lessonMeta);

      // Fetch existing thumbnails from Supabase (using type assertion since table may not be in generated types yet)
      const { data: thumbnailData } = await (supabase
        .from('lesson_thumbnails') as ReturnType<typeof supabase.from>)
        .select('*');

      const thumbnailMap = new Map(
        (thumbnailData || []).map((t: { slug: string; thumbnail_url: string; updated_at: string }) => [t.slug, t])
      );

      // Combine lesson meta with thumbnail data - KEEP ORIGINAL ORDER from lessonMeta (same as learn page)
      const lessonList: LessonThumbnail[] = allSlugs.map(slug => ({
        slug,
        title: lessonMeta[slug]?.title || slug,
        thumbnail_url: (thumbnailMap.get(slug) as { thumbnail_url?: string } | undefined)?.thumbnail_url || null,
        updated_at: (thumbnailMap.get(slug) as { updated_at?: string } | undefined)?.updated_at || null,
      }));

      // NO SORTING - keep the exact same order as the learn page's lessonMeta

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

      // Upsert to database (using type assertion since table may not be in generated types yet)
      const { error: dbError } = await (supabase
        .from('lesson_thumbnails') as ReturnType<typeof supabase.from>)
        .upsert({
          slug,
          thumbnail_url: thumbnailUrl,
          updated_at: new Date().toISOString(),
        } as Record<string, unknown>, { onConflict: 'slug' });

      if (dbError) throw dbError;

      // Update local state
      setLessons(prev => prev.map(l =>
        l.slug === slug
          ? { ...l, thumbnail_url: thumbnailUrl, updated_at: new Date().toISOString() }
          : l
      ));

      setMessage({ type: 'success', text: `Thumbnail uploaded for "${lessonMeta[slug]?.title || slug}"` });
    } catch (error: unknown) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessage({ type: 'error', text: `Upload failed: ${errorMessage}` });
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

        {/* Tasks Panel Modal */}
        <AnimatePresence>
          {showTasksPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowTasksPanel(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-[var(--border-light)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                        <ClipboardList size={20} className="text-red-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">Prompt Tasks</h2>
                        <p className="text-sm text-[var(--text-muted)]">{tasksCount} prompts need attention</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTasksPanel(false)}
                      className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {tasksCount === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">All caught up!</h3>
                      <p className="text-[var(--text-muted)]">No prompts need attention right now.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(promptTasks)
                        .filter(([, task]) => task.needsNewPrompt)
                        .map(([slug, task]) => (
                          <div key={slug} className="border border-[var(--border-light)] rounded-xl p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-[var(--text-primary)]">
                                  {lessonMeta[slug]?.title || slug}
                                </h4>
                                <p className="text-xs text-[var(--text-muted)] mt-1">Slug: {slug}</p>

                                {task.feedback && (
                                  <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-xs font-medium text-red-600 mb-1">Your feedback:</p>
                                    <p className="text-sm text-red-800">{task.feedback}</p>
                                  </div>
                                )}

                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-xs font-medium text-[var(--text-muted)] mb-1">Current concept:</p>
                                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3">
                                    {lessonConceptData[slug]?.concept || 'No custom concept'}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => clearTask(slug)}
                                className="shrink-0 p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                title="Mark as resolved"
                              >
                                <Check size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {tasksCount > 0 && (
                  <div className="p-4 border-t border-[var(--border-light)] bg-gray-50">
                    <p className="text-xs text-[var(--text-muted)] text-center">
                      Tell Claude to &quot;review prompt tasks&quot; to update these prompts based on your feedback.
                    </p>
                  </div>
                )}
              </motion.div>
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
              {/* Review Tasks Button */}
              <button
                onClick={() => setShowTasksPanel(true)}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all ${
                  tasksCount > 0
                    ? 'bg-red-100 hover:bg-red-200 border-2 border-red-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className={`text-2xl font-bold ${tasksCount > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                  {tasksCount}
                </div>
                <div className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <ClipboardList size={12} />
                  Prompt Tasks
                </div>
              </button>

              {/* Templates Info */}
              <div className="flex flex-col items-center px-4 py-2 rounded-lg bg-purple-100">
                <div className="text-2xl font-bold text-purple-500">
                  {Object.keys(VISUAL_TEMPLATES).length}
                </div>
                <div className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <Grid size={12} />
                  Templates
                </div>
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
              const conceptData = lessonConceptData[lesson.slug];

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
                  {/* Thumbnail Upload Area - 5:4 Wide Format */}
                  <div
                    className={`relative aspect-[5/4] bg-[var(--bg-secondary)] overflow-hidden`}
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
                  {conceptData && (
                    <div className="border-t border-[var(--border-light)] bg-gray-50 p-4">
                      {/* Reference Images Row */}
                      {conceptData.images.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">Reference Images (click to copy image):</p>
                          <div className="flex gap-2 flex-wrap">
                            {conceptData.images.map((imgUrl, idx) => (
                              <button
                                key={idx}
                                onClick={async () => {
                                  try {
                                    // Fetch the image and copy as actual image to clipboard
                                    const response = await fetch(imgUrl);
                                    const blob = await response.blob();

                                    // Convert to PNG if needed (clipboard prefers PNG)
                                    const pngBlob = blob.type === 'image/png' ? blob : await new Promise<Blob>((resolve) => {
                                      const img = document.createElement('img');
                                      img.crossOrigin = 'anonymous';
                                      img.onload = () => {
                                        const canvas = document.createElement('canvas');
                                        canvas.width = img.naturalWidth;
                                        canvas.height = img.naturalHeight;
                                        const ctx = canvas.getContext('2d');
                                        ctx?.drawImage(img, 0, 0);
                                        canvas.toBlob((b) => resolve(b || blob), 'image/png');
                                      };
                                      img.onerror = () => resolve(blob);
                                      img.src = imgUrl;
                                    });

                                    await navigator.clipboard.write([
                                      new ClipboardItem({ 'image/png': pngBlob })
                                    ]);
                                    setMessage({ type: 'success', text: 'Image copied to clipboard!' });
                                  } catch (err) {
                                    console.error('Failed to copy image:', err);
                                    // Fallback to copying URL
                                    await navigator.clipboard.writeText(imgUrl);
                                    setMessage({ type: 'success', text: 'Image URL copied (image copy not supported)' });
                                  }
                                }}
                                className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-transparent hover:border-[var(--primary)] transition-all group"
                                title="Click to copy image"
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

                      {/* Template Selector */}
                      <div className="mb-3">
                        <p className="text-xs font-medium text-[var(--text-muted)] mb-2">Visual Template:</p>
                        <select
                          value={getEffectiveTemplate(lesson.slug)}
                          onChange={(e) => setLessonTemplate(lesson.slug, e.target.value as TemplateType)}
                          className="w-full px-3 py-2 text-sm border border-[var(--border-light)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {Object.values(VISUAL_TEMPLATES).map((tmpl) => (
                            <option key={tmpl.id} value={tmpl.id}>
                              {tmpl.name} {conceptData.template === tmpl.id ? '(Recommended)' : ''} - {tmpl.description}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Prompt Text */}
                      <div className="relative">
                        <p className="text-xs font-medium text-[var(--text-muted)] mb-2">ChatGPT Prompt:</p>
                        <div className="bg-white rounded-lg p-3 border border-[var(--border-light)] text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                          {buildFullPrompt(conceptData.concept, getEffectiveTemplate(lesson.slug))}
                        </div>

                        {/* Copy Button + Flag Button Row */}
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => copyPrompt(lesson.slug)}
                            className={`
                              flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
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

                          {/* Flag for New Prompt Button */}
                          <button
                            onClick={() => toggleNeedsNewPrompt(lesson.slug)}
                            className={`
                              flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                              ${promptTasks[lesson.slug]?.needsNewPrompt
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600'
                              }
                            `}
                            title={promptTasks[lesson.slug]?.needsNewPrompt ? 'Remove from tasks' : 'Flag for new prompt'}
                          >
                            <Flag size={16} />
                          </button>
                        </div>

                        {/* Feedback Input (shown when flagged or has feedback) */}
                        {(promptTasks[lesson.slug]?.needsNewPrompt || promptTasks[lesson.slug]?.feedback) && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                <MessageSquare size={12} />
                                Feedback for Claude:
                              </div>
                              {promptTasks[lesson.slug]?.feedback && (
                                <span className="flex items-center gap-1 text-xs text-green-600">
                                  <Check size={12} />
                                  Saved
                                </span>
                              )}
                            </div>
                            <textarea
                              value={promptTasks[lesson.slug]?.feedback || ''}
                              onChange={(e) => updateFeedback(lesson.slug, e.target.value)}
                              placeholder="What's wrong with this prompt? What should be different?"
                              className="w-full px-3 py-2 text-sm border border-[var(--border-light)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                              rows={2}
                            />
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                              Feedback auto-saves. Click the task counter above to review all flagged prompts.
                            </p>
                          </div>
                        )}
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
