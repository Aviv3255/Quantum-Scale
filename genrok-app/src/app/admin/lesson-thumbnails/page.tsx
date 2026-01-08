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
// Based on analysis of 24+ reference thumbnails
// 15 world-class visual formulas
// ==============================================

type TemplateType =
  | 'product-hero'
  | 'diagram'
  | 'brain-cables'
  | 'person-metric'
  | 'logo-mashup'
  | 'before-after'
  | 'minimal-text'
  | 'money-stack'
  | 'face-morph'
  | 'phone-mockup'
  | 'split-screen'
  | 'dramatic-quote'
  | 'growth-curve'
  | 'versus'
  | 'single-object';

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
    description: 'Big headline + floating product photo',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Product Hero like "$300M shopify store". BACKGROUND: White or black. LAYOUT: Headline top 40%, floating product 60%. TEXT: ALL CAPS bold sans-serif. VISUAL: Product floating with shadow.`,
  },
  'diagram': {
    id: 'diagram',
    name: 'Diagram',
    description: 'Simple flowchart or process visual',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Diagram like "peak-end rule". BACKGROUND: White + grid texture. LAYOUT: Text left 40%, diagram right 60%. TEXT: Lowercase sans-serif. VISUAL: Simple boxes/arrows or curve with brand logos.`,
  },
  'brain-cables': {
    id: 'brain-cables',
    name: 'Brain Cables',
    description: 'Brain with cables connecting to icons',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Brain Cables like "Offers". BACKGROUND: White grid or dark. LAYOUT: Brain central 60%, text 40%. TEXT: One bold word. VISUAL: Top of head, brain exposed, colored cables from floating icons.`,
  },
  'person-metric': {
    id: 'person-metric',
    name: 'Person + Metric',
    description: 'Person cutout with floating UI/numbers',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Person+Metric like Reddit CPC guy. BACKGROUND: White. LAYOUT: Person 50%, metrics 50%. TEXT: Headline + numbers. VISUAL: Person cutout with glow, floating metric badges.`,
  },
  'logo-mashup': {
    id: 'logo-mashup',
    name: 'Logo Mashup',
    description: 'Multiple brand logos + simple text',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Logo Mashup like "copy them." BACKGROUND: White minimal. LAYOUT: Text top 30%, logos 70%. TEXT: Lowercase + period. VISUAL: 3-4 brand logos in row.`,
  },
  'before-after': {
    id: 'before-after',
    name: 'Before/After',
    description: '50/50 split transformation',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Before/After split. BACKGROUND: Dark/black. LAYOUT: 50/50 vertical split. TEXT: "Before" left, "After" right. VISUAL: Same subject - left gray, right vibrant.`,
  },
  'minimal-text': {
    id: 'minimal-text',
    name: 'Minimal Text',
    description: 'Just 2-3 words, ultra clean',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Minimal like "it works." BACKGROUND: Clean white or solid color. LAYOUT: Big text 70%, tiny accent 30%. TEXT: 2-3 words lowercase + period. VISUAL: One tiny supporting element.`,
  },
  'money-stack': {
    id: 'money-stack',
    name: 'Money Stack',
    description: 'Object on pile of cash',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Money Stack like "genius" Stanley. BACKGROUND: White + grid. LAYOUT: Text top 30%, money pile 70%. TEXT: One word lowercase. VISUAL: Crisp $100 bills pile with object on top.`,
  },
  'face-morph': {
    id: 'face-morph',
    name: 'Face Morph',
    description: 'Surreal face transformation',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Face Morph like Steve Jobs. BACKGROUND: Solid bold color (red/blue). LAYOUT: Face 80%, text 20%. TEXT: Short ALL CAPS white. VISUAL: Two faces blending/morphing.`,
  },
  'phone-mockup': {
    id: 'phone-mockup',
    name: 'Phone Mockup',
    description: 'Hand holding phone with result',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Phone Mockup like "the future". BACKGROUND: White. LAYOUT: Text+arrow left 40%, phone right 60%. TEXT: Lowercase + arrow pointing. VISUAL: Hand holding iPhone showing result.`,
  },
  'split-screen': {
    id: 'split-screen',
    name: 'Split Screen',
    description: 'Half light/half dark contrast',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Split Screen like Figma Export. BACKGROUND: Half white, half black. LAYOUT: Contrasting elements each side. TEXT: Action word centered or on button. VISUAL: Same thing in light vs dark mode.`,
  },
  'dramatic-quote': {
    id: 'dramatic-quote',
    name: 'Dramatic Quote',
    description: 'Big quoted provocative text',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Dramatic Quote like "GAME OVER". BACKGROUND: Dark dramatic. LAYOUT: Giant text 70%, visual 30%. TEXT: "QUOTED TEXT" in white ALL CAPS. VISUAL: Dramatic element below, optional fire/effects.`,
  },
  'growth-curve': {
    id: 'growth-curve',
    name: 'Growth Curve',
    description: 'Exponential line with marker',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Growth Curve like "You're Here". BACKGROUND: Dark + grid. LAYOUT: Optional person left, curve right. TEXT: "You're Here" + arrow. VISUAL: Exponential line red-to-green, dot marker.`,
  },
  'versus': {
    id: 'versus',
    name: 'Versus',
    description: 'Two things competing/facing off',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Versus like Framer vs Webflow. BACKGROUND: Dark. LAYOUT: Left vs Right tension. TEXT: Optional "VS" or none. VISUAL: Two logos facing off, one winning.`,
  },
  'single-object': {
    id: 'single-object',
    name: 'Single Object',
    description: 'One hero object, dramatic',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Single Object like Porsche aesthetics. BACKGROUND: White/light. LAYOUT: Text 30%, object 70%. TEXT: "the [word]" one word italic. VISUAL: Beautiful single object hero-shot.`,
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
  // PSYCHOLOGY & COPYWRITING CORE (32 lessons)
  // ============================================

  'familiar-surprise-secret': {
    template: 'logo-mashup',
    concept: `TEXT: "it works." lowercase black
VISUAL: Apple logo + iPhone floating with shadow
BACKGROUND: White minimal
EXTRA: Apple keynote aesthetic`,
    images: [imageAssets.apple],
  },

  'red-button-effect': {
    template: 'single-object',
    concept: `TEXT: "don't press." lowercase white
VISUAL: Giant glossy red 3D button, arcade style
BACKGROUND: Pure black
EXTRA: Tempting, forbidden feel`,
    images: [],
  },

  'fred-method': {
    template: 'brain-cables',
    concept: `TEXT: "F.R.E.D." each letter different color
VISUAL: Brain exposed, 4 colored cables plugging in
BACKGROUND: White with grid
EXTRA: Scientific diagram style`,
    images: [],
  },

  'emotion-decides': {
    template: 'versus',
    concept: `TEXT: None
VISUAL: Giant red heart wearing crown VS tiny gray brain
BACKGROUND: Cream white
EXTRA: Heart wins - dramatic size contrast`,
    images: [imageAssets.danielKahneman],
  },

  'gatekeeper-method': {
    template: 'brain-cables',
    concept: `TEXT: "4 doors." lowercase white
VISUAL: Brain with 4 small doors, one open with light
BACKGROUND: Dark charcoal
EXTRA: Mysterious, intriguing`,
    images: [],
  },

  'three-second-rule': {
    template: 'dramatic-quote',
    concept: `TEXT: Giant "3" white, "seconds." below
VISUAL: Stopwatch icon
BACKGROUND: Solid red
EXTRA: Urgent warning sign energy`,
    images: [],
  },

  'science-of-selling': {
    template: 'diagram',
    concept: `TEXT: "the formula." lowercase black
VISUAL: Brain + $ = $$$ equation
BACKGROUND: White with grid
EXTRA: Whiteboard diagram style`,
    images: [],
  },

  'persuasion-blueprint': {
    template: 'single-object',
    concept: `TEXT: "the blueprint." italic
VISUAL: Rolled blueprint paper unrolling
BACKGROUND: White clean
EXTRA: Architect document reveal`,
    images: [imageAssets.robertCialdini],
  },

  'persuasion-stack': {
    template: 'diagram',
    concept: `TEXT: "the stack." lowercase
VISUAL: 5 horizontal colored bars stacked
BACKGROUND: White
EXTRA: Progress bar visualization`,
    images: [],
  },

  'architecture-of-influence': {
    template: 'diagram',
    concept: `TEXT: "architect." lowercase white
VISUAL: Wireframe head outline, geometric
BACKGROUND: Dark navy
EXTRA: Apple meets architecture`,
    images: [],
  },

  'wiifm-principle': {
    template: 'person-metric',
    concept: `TEXT: "what about me?" lowercase
VISUAL: Hand pointing at viewer (Uncle Sam style)
BACKGROUND: Light gray
EXTRA: Direct, confrontational`,
    images: [],
  },

  'three-canons-of-craft': {
    template: 'diagram',
    concept: `TEXT: "3 tests." lowercase black
VISUAL: Three checkboxes in a row, all checked
BACKGROUND: White with grid
EXTRA: Checklist simplicity`,
    images: [],
  },

  'cpppb-proof-loop': {
    template: 'diagram',
    concept: `TEXT: "C.P.P.P.B." each letter different color
VISUAL: 5 elements in circular loop with arrows
BACKGROUND: White clean
EXTRA: Framework wheel`,
    images: [],
  },

  'damaging-admission': {
    template: 'minimal-text',
    concept: `TEXT: "I was wrong." lowercase white
VISUAL: Small crack/break visual
BACKGROUND: Dark gray
EXTRA: Vulnerability power`,
    images: [],
  },

  'emotional-precision': {
    template: 'diagram',
    concept: `TEXT: "precision." lowercase
VISUAL: Bullseye/target with heart in center
BACKGROUND: White
EXTRA: Emotional targeting`,
    images: [],
  },

  'blind-spot-effect': {
    template: 'face-morph',
    concept: `TEXT: "they can't see." white
VISUAL: Face with one eye covered/blind
BACKGROUND: Dark blue
EXTRA: Mysterious blindspot`,
    images: [],
  },

  'customer-voice-mining': {
    template: 'diagram',
    concept: `TEXT: "their words." lowercase
VISUAL: Speech bubbles being collected into gold
BACKGROUND: White with grid
EXTRA: Mining/extraction visual`,
    images: [],
  },

  'double-bind-of-fear': {
    template: 'split-screen',
    concept: `TEXT: "damned if you do." white
VISUAL: Two paths both leading to fire
BACKGROUND: Half dark, half darker
EXTRA: No-win dilemma`,
    images: [],
  },

  'emotion-spectrum': {
    template: 'diagram',
    concept: `TEXT: "the spectrum." lowercase
VISUAL: Rainbow gradient bar with emotion icons
BACKGROUND: White
EXTRA: Color emotion mapping`,
    images: [],
  },

  'forty-forty-twenty-rule': {
    template: 'diagram',
    concept: `TEXT: "40/40/20" bold black
VISUAL: Three pie chart segments
BACKGROUND: White with grid
EXTRA: The formula breakdown`,
    images: [],
  },

  'four-primal-needs': {
    template: 'brain-cables',
    concept: `TEXT: "4 needs." lowercase white
VISUAL: Brain with 4 glowing spots
BACKGROUND: Dark
EXTRA: Primal brain visualization`,
    images: [],
  },

  'ocpb-formula': {
    template: 'diagram',
    concept: `TEXT: "O.C.P.B." in gold
VISUAL: 4 stacking blocks tower
BACKGROUND: White
EXTRA: Building blocks of sales`,
    images: [],
  },

  'sales-message-anatomy': {
    template: 'diagram',
    concept: `TEXT: "anatomy." lowercase
VISUAL: Sales letter with labeled parts
BACKGROUND: White with grid
EXTRA: Blueprint dissection`,
    images: [],
  },

  'self-persuasion-architecture': {
    template: 'diagram',
    concept: `TEXT: "convince yourself." lowercase
VISUAL: Person looking in mirror, nodding
BACKGROUND: White
EXTRA: Self-selling visual`,
    images: [],
  },

  'structural-tension': {
    template: 'growth-curve',
    concept: `TEXT: "tension." lowercase white
VISUAL: Stretched rubber band about to snap
BACKGROUND: Dark
EXTRA: Building tension energy`,
    images: [],
  },

  'three-growth-levers': {
    template: 'diagram',
    concept: `TEXT: "3 levers." lowercase
VISUAL: Three physical levers side by side
BACKGROUND: White with grid
EXTRA: Mechanical control`,
    images: [],
  },

  'three-levels-of-change': {
    template: 'diagram',
    concept: `TEXT: "3 levels." lowercase
VISUAL: Pyramid with 3 tiers labeled
BACKGROUND: White
EXTRA: Hierarchy visualization`,
    images: [],
  },

  'trust-architecture': {
    template: 'diagram',
    concept: `TEXT: "trust." lowercase gold
VISUAL: Building/temple with trust pillars
BACKGROUND: White
EXTRA: Foundation metaphor`,
    images: [],
  },

  'unique-mechanism': {
    template: 'single-object',
    concept: `TEXT: "the mechanism." italic
VISUAL: Glowing gear/cog machine part
BACKGROUND: Dark
EXTRA: Proprietary secret feel`,
    images: [],
  },

  'master-key-framework': {
    template: 'single-object',
    concept: `TEXT: "master key." lowercase gold
VISUAL: Ornate golden skeleton key
BACKGROUND: Black
EXTRA: Unlocking secrets`,
    images: [],
  },

  'rule-of-one': {
    template: 'single-object',
    concept: `TEXT: "just one." white lowercase
VISUAL: Massive gold metallic "1"
BACKGROUND: Pure black
EXTRA: Rolex-quality aesthetic`,
    images: [imageAssets.garyHalbert],
  },

  'architecture-of-belief': {
    template: 'diagram',
    concept: `TEXT: "3 levels." lowercase
VISUAL: Brain cross-section with 3 layers
BACKGROUND: White with grid
EXTRA: Belief architecture`,
    images: [],
  },

  'copywriters-codex': {
    template: 'single-object',
    concept: `TEXT: "the codex." italic gold
VISUAL: Ancient leather-bound book glowing
BACKGROUND: Dark
EXTRA: Sacred text energy`,
    images: [],
  },

  // ============================================
  // ARTICLE-BASED LESSONS (15 lessons)
  // ============================================

  'best-private-agent': {
    template: 'person-metric',
    concept: `TEXT: "5-7 days." lowercase
VISUAL: Package with fast delivery icon
BACKGROUND: White
EXTRA: Speed promise`,
    images: [],
  },

  'stop-aliexpress': {
    template: 'dramatic-quote',
    concept: `TEXT: "STOP." white ALL CAPS
VISUAL: AliExpress logo with red X over it
BACKGROUND: Dark red
EXTRA: Warning/prohibition`,
    images: [],
  },

  'ltv-cheat-code': {
    template: 'money-stack',
    concept: `TEXT: "5% = 95%" white bold
VISUAL: Small group of figures on pile of cash
BACKGROUND: Dark
EXTRA: Pareto visualization`,
    images: [],
  },

  'million-dollar-roadmap': {
    template: 'growth-curve',
    concept: `TEXT: "$1M" large, "roadmap." below
VISUAL: Dotted path with milestones to flag
BACKGROUND: White with grid
EXTRA: Journey map`,
    images: [],
  },

  'geo-announcement-bar': {
    template: 'phone-mockup',
    concept: `TEXT: "+67% CVR" green
VISUAL: Phone with announcement bar at top
BACKGROUND: White
EXTRA: Location pin icon`,
    images: [],
  },

  'wishlist-effect': {
    template: 'diagram',
    concept: `TEXT: "+8% CVR" green badge
VISUAL: Heart/wishlist icon glowing
BACKGROUND: White
EXTRA: Endowment effect`,
    images: [],
  },

  'email-vs-sms': {
    template: 'versus',
    concept: `TEXT: "EMAIL" vs "SMS"
VISUAL: Email icon vs phone icon facing off
BACKGROUND: Dark
EXTRA: Battle energy`,
    images: [imageAssets.klaviyo],
  },

  'abandoned-cart-recovery': {
    template: 'diagram',
    concept: `TEXT: "85% vs 60%" bold
VISUAL: Shopping cart with recovery arrow
BACKGROUND: White with grid
EXTRA: AI SMS winning`,
    images: [],
  },

  'pareto-law-ecommerce': {
    template: 'diagram',
    concept: `TEXT: "5% = 95%" bold black
VISUAL: Pie chart showing dramatic split
BACKGROUND: White
EXTRA: Pareto principle`,
    images: [],
  },

  'whatsapp-support': {
    template: 'versus',
    concept: `TEXT: "NO." bold red
VISUAL: WhatsApp logo with question mark
BACKGROUND: White
EXTRA: Counterintuitive answer`,
    images: [],
  },

  'meta-attribution-test': {
    template: 'diagram',
    concept: `TEXT: "67%" large red
VISUAL: Meta logo with missing piece
BACKGROUND: White with grid
EXTRA: Attribution gap`,
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  'post-purchase-surveys': {
    template: 'diagram',
    concept: `TEXT: "ask them." lowercase
VISUAL: Survey form with checkboxes
BACKGROUND: White
EXTRA: Data collection`,
    images: [],
  },

  'fonts-psychology': {
    template: 'split-screen',
    concept: `TEXT: "Aa" in serif vs sans-serif
VISUAL: Same text, different fonts
BACKGROUND: Half white, half black
EXTRA: Typography contrast`,
    images: [],
  },

  'brand-search-campaign': {
    template: 'person-metric',
    concept: `TEXT: "18x ROAS" green bold
VISUAL: Google search bar with brand name
BACKGROUND: White
EXTRA: Google logo floating`,
    images: [imageAssets.google],
  },

  'swatch-variants': {
    template: 'phone-mockup',
    concept: `TEXT: "+3.4% CVR" green
VISUAL: Phone showing color swatches
BACKGROUND: White
EXTRA: A/B test visual`,
    images: [],
  },

  // ============================================
  // CRO & TESTING LESSONS (20 lessons)
  // ============================================

  'buy-now-button': {
    template: 'split-screen',
    concept: `TEXT: "+15.9%" green
VISUAL: Product page with vs without button
BACKGROUND: Half and half
EXTRA: Removal test`,
    images: [],
  },

  'rounded-button': {
    template: 'single-object',
    concept: `TEXT: "28px" in white
VISUAL: Perfectly rounded button glowing
BACKGROUND: Dark
EXTRA: CTA optimization`,
    images: [],
  },

  'best-shopify-theme': {
    template: 'versus',
    concept: `TEXT: "34.9%" green badge
VISUAL: Two theme previews facing off
BACKGROUND: Dark
EXTRA: Winner highlighted`,
    images: [imageAssets.shopify],
  },

  'coupon-leaking': {
    template: 'diagram',
    concept: `TEXT: "leaking." lowercase red
VISUAL: Coupon code with holes/leaks
BACKGROUND: White
EXTRA: Money draining visual`,
    images: [],
  },

  'gillette-model': {
    template: 'diagram',
    concept: `TEXT: "cheap razor." lowercase
VISUAL: Razor handle cheap, blade expensive
BACKGROUND: White with grid
EXTRA: Business model visual`,
    images: [],
  },

  'best-niches-2026': {
    template: 'growth-curve',
    concept: `TEXT: "2026" bold
VISUAL: Multiple rising trend lines
BACKGROUND: Dark with grid
EXTRA: Future opportunity`,
    images: [],
  },

  'two-meta-rules': {
    template: 'diagram',
    concept: `TEXT: "2 rules." lowercase
VISUAL: Two golden rules on stone tablets
BACKGROUND: White
EXTRA: Commandment style`,
    images: [imageAssets.meta],
  },

  'pinned-comment-cac': {
    template: 'phone-mockup',
    concept: `TEXT: "pinned." lowercase
VISUAL: Phone showing pinned comment
BACKGROUND: White
EXTRA: CAC reduction trick`,
    images: [],
  },

  'mastercard-psychology': {
    template: 'logo-mashup',
    concept: `TEXT: "trust." lowercase
VISUAL: Mastercard logo with trust badge
BACKGROUND: White
EXTRA: Payment psychology`,
    images: [imageAssets.mastercard],
  },

  'formula-to-sell': {
    template: 'diagram',
    concept: `TEXT: "THE FORMULA" gold
VISUAL: Dream + Likelihood + Time + Effort equation
BACKGROUND: White with grid
EXTRA: Hormozi equation`,
    images: [imageAssets.alexHormozi],
  },

  'choose-products': {
    template: 'diagram',
    concept: `TEXT: "2 rules." lowercase
VISUAL: Two checkmarks, product icons
BACKGROUND: White
EXTRA: Selection criteria`,
    images: [],
  },

  'gary-halbert-secret': {
    template: 'person-metric',
    concept: `TEXT: "starving crowd." lowercase
VISUAL: Crowd reaching with money
BACKGROUND: Vintage sepia
EXTRA: Direct response legend`,
    images: [imageAssets.garyHalbert],
  },

  'pet-rock-story': {
    template: 'money-stack',
    concept: `TEXT: "$30M" gold
VISUAL: Rock on velvet with crown
BACKGROUND: White
EXTRA: Absurdist success`,
    images: [],
  },

  'starbucks-ltv': {
    template: 'money-stack',
    concept: `TEXT: "$14,099" massive
VISUAL: Starbucks cup overflowing with cash
BACKGROUND: White
EXTRA: Mind-blowing LTV`,
    images: [imageAssets.starbucks],
  },

  'killer-headlines': {
    template: 'dramatic-quote',
    concept: `TEXT: "80%" huge white
VISUAL: Newspaper headline emphasized
BACKGROUND: Dark
EXTRA: Headline power`,
    images: [],
  },

  'two-dirty-tricks': {
    template: 'diagram',
    concept: `TEXT: "2 tricks." lowercase
VISUAL: Magic wand with sparkles
BACKGROUND: Dark
EXTRA: Persuasion secrets`,
    images: [],
  },

  'golden-lookalike': {
    template: 'person-metric',
    concept: `TEXT: "$8-10 CAC" green
VISUAL: Golden audience icon
BACKGROUND: White
EXTRA: Meta targeting`,
    images: [imageAssets.meta],
  },

  'cbo-vs-abo': {
    template: 'versus',
    concept: `TEXT: "CBO" vs "ABO" in gold
VISUAL: Two boxing gloves
BACKGROUND: Dark dramatic
EXTRA: Meta fight night`,
    images: [imageAssets.meta],
  },

  'geo-personalization': {
    template: 'phone-mockup',
    concept: `TEXT: "hello, [city]." lowercase
VISUAL: Phone with location pin
BACKGROUND: White
EXTRA: Personalization power`,
    images: [],
  },

  'no-one-cares': {
    template: 'minimal-text',
    concept: `TEXT: "no one cares." lowercase
VISUAL: Tiny ignored figure
BACKGROUND: White vast
EXTRA: Brutal truth`,
    images: [],
  },

  // ============================================
  // PSYCHOLOGY OF SALES (25 lessons)
  // ============================================

  'autopilot-sale': {
    template: 'brain-cables',
    concept: `TEXT: "autopilot." lowercase white
VISUAL: Brain with automation gears
BACKGROUND: Dark
EXTRA: Mental shortcuts`,
    images: [],
  },

  'borrowed-trust': {
    template: 'person-metric',
    concept: `TEXT: "borrow it." lowercase
VISUAL: Trust badge transferring between figures
BACKGROUND: White
EXTRA: Authority transfer`,
    images: [imageAssets.robertCialdini],
  },

  'herd-instinct': {
    template: 'diagram',
    concept: `TEXT: "the herd." lowercase
VISUAL: Crowd moving in one direction
BACKGROUND: White
EXTRA: FOMO visualization`,
    images: [],
  },

  'gift-that-sells': {
    template: 'single-object',
    concept: `TEXT: "free." lowercase
VISUAL: Gift box with golden glow
BACKGROUND: White
EXTRA: Reciprocity power`,
    images: [],
  },

  'micro-yes-mastery': {
    template: 'diagram',
    concept: `TEXT: "yes. yes. YES." growing size
VISUAL: Stepping stones leading up
BACKGROUND: White with grid
EXTRA: Commitment ladder`,
    images: [],
  },

  'authority-over-hope': {
    template: 'split-screen',
    concept: `TEXT: "stop hoping." white
VISUAL: Crossed fingers vs pointing finger
BACKGROUND: Half red, half green
EXTRA: Certainty wins`,
    images: [],
  },

  'certainty-transfer': {
    template: 'before-after',
    concept: `TEXT: "before" / "after" white
VISUAL: Worried face to confident face
BACKGROUND: Dark split
EXTRA: Transformation`,
    images: [],
  },

  'conviction-architecture': {
    template: 'diagram',
    concept: `TEXT: "3 layers." lowercase
VISUAL: Pyramid with 3 tiers
BACKGROUND: White
EXTRA: Conviction pyramid`,
    images: [],
  },

  'digital-pause-power': {
    template: 'minimal-text',
    concept: `TEXT: "..." three dots
VISUAL: Empty space, powerful pause
BACKGROUND: White vast
EXTRA: Silence sells`,
    images: [],
  },

  'fomo-engineering': {
    template: 'dramatic-quote',
    concept: `TEXT: "SOLD OUT" red
VISUAL: Empty shelf/spot
BACKGROUND: Dark
EXTRA: Urgency creation`,
    images: [],
  },

  'framing-effect-mastery': {
    template: 'split-screen',
    concept: `TEXT: "same thing." lowercase
VISUAL: Same product, different contexts
BACKGROUND: Half cheap, half luxury
EXTRA: Context is everything`,
    images: [imageAssets.danielKahneman],
  },

  'identity-marketing': {
    template: 'face-morph',
    concept: `TEXT: "become." lowercase white
VISUAL: Person morphing into ideal self
BACKGROUND: Dark gradient
EXTRA: Identity purchase`,
    images: [],
  },

  'marketers-delusion': {
    template: 'brain-cables',
    concept: `TEXT: "the delusion." lowercase
VISUAL: Brain with blindfold
BACKGROUND: Dark
EXTRA: Fatal error exposed`,
    images: [],
  },

  'pain-escalation-ladder': {
    template: 'growth-curve',
    concept: `TEXT: "escalate." lowercase red
VISUAL: Pain meter rising
BACKGROUND: White with grid
EXTRA: Ethical pain ladder`,
    images: [],
  },

  'telescope-flip': {
    template: 'single-object',
    concept: `TEXT: "backwards." lowercase
VISUAL: Telescope held wrong way
BACKGROUND: White
EXTRA: 97% get it wrong`,
    images: [],
  },

  'trust-blueprint': {
    template: 'diagram',
    concept: `TEXT: "instant trust." lowercase
VISUAL: Blueprint with trust elements
BACKGROUND: White with grid
EXTRA: Credibility formula`,
    images: [],
  },

  'value-perception-lever': {
    template: 'diagram',
    concept: `TEXT: "perception." lowercase
VISUAL: Lever multiplying value
BACKGROUND: White
EXTRA: Price becomes irrelevant`,
    images: [],
  },

  'three-brains-wallet': {
    template: 'brain-cables',
    concept: `TEXT: "3 brains." lowercase
VISUAL: Three brain sections controlling wallet
BACKGROUND: Dark
EXTRA: Neuroscience of buying`,
    images: [],
  },

  'pre-suasion-hack': {
    template: 'diagram',
    concept: `TEXT: "already won." lowercase
VISUAL: Chess board, king already toppled
BACKGROUND: White
EXTRA: Win before the pitch`,
    images: [imageAssets.robertCialdini],
  },

  'pattern-interrupts': {
    template: 'dramatic-quote',
    concept: `TEXT: "WAIT." white bold
VISUAL: Stop hand gesture
BACKGROUND: Red
EXTRA: Attention hijack`,
    images: [],
  },

  'dopamine-blueprint': {
    template: 'brain-cables',
    concept: `TEXT: "addicted." lowercase white
VISUAL: Brain with pleasure cables plugged in
BACKGROUND: Dark
EXTRA: Dopamine triggers`,
    images: [],
  },

  'anti-sell-mastery': {
    template: 'minimal-text',
    concept: `TEXT: "don't buy." lowercase
VISUAL: Reverse psychology arrow
BACKGROUND: White
EXTRA: Pull not push`,
    images: [],
  },

  'decoy-effect': {
    template: 'diagram',
    concept: `TEXT: "+43%" green badge
VISUAL: Three pricing cards, middle glowing
BACKGROUND: White
EXTRA: Decoy pricing`,
    images: [],
  },

  'precise-price-trick': {
    template: 'split-screen',
    concept: `TEXT: "$4,988" vs "$5,000"
VISUAL: Precise price wins
BACKGROUND: Half and half
EXTRA: Precision psychology`,
    images: [],
  },

  'paradox-of-choice': {
    template: 'split-screen',
    concept: `TEXT: "less = more." lowercase
VISUAL: 24 jars vs 6 jars
BACKGROUND: Split
EXTRA: Choice paralysis`,
    images: [imageAssets.sheenaIyengar],
  },

  // ============================================
  // PRIMAL PLAYBOOK (10 lessons)
  // ============================================

  'forty-million-mistake': {
    template: 'dramatic-quote',
    concept: `TEXT: "$40 MILLION" red
VISUAL: Data on fire, heart rising from ashes
BACKGROUND: Dark
EXTRA: New Coke disaster`,
    images: [imageAssets.cocaCola],
  },

  'fly-in-the-urinal': {
    template: 'single-object',
    concept: `TEXT: "80%" green badge
VISUAL: Target with tiny fly in center
BACKGROUND: White
EXTRA: Nudge psychology`,
    images: [],
  },

  'thirty-two-violinist': {
    template: 'split-screen',
    concept: `TEXT: "$32" vs "$1M"
VISUAL: Same violinist, subway vs concert hall
BACKGROUND: Split contrast
EXTRA: Context is value`,
    images: [],
  },

  'invisible-influence': {
    template: 'diagram',
    concept: `TEXT: "invisible." lowercase
VISUAL: Background image affecting choice
BACKGROUND: White with subtle pattern
EXTRA: Priming power`,
    images: [],
  },

  'price-format-code': {
    template: 'split-screen',
    concept: `TEXT: "$99" vs "$99.00"
VISUAL: Same price, different formats
BACKGROUND: Half and half
EXTRA: Format psychology`,
    images: [],
  },

  'cost-of-standing-still': {
    template: 'growth-curve',
    concept: `TEXT: "the cost." lowercase red
VISUAL: Declining curve for inaction
BACKGROUND: Dark with grid
EXTRA: Sell not buying`,
    images: [],
  },

  'unity-principle': {
    template: 'diagram',
    concept: `TEXT: "we." lowercase gold
VISUAL: Two figures merging into one
BACKGROUND: White warm
EXTRA: Shared identity`,
    images: [imageAssets.robertCialdini],
  },

  'visual-priming': {
    template: 'phone-mockup',
    concept: `TEXT: "background." lowercase
VISUAL: Phone showing product on different backgrounds
BACKGROUND: White
EXTRA: Invisible influencer`,
    images: [],
  },

  'objection-inversion': {
    template: 'diagram',
    concept: `TEXT: "judo." lowercase
VISUAL: Objection arrow being redirected
BACKGROUND: White
EXTRA: Turn objections around`,
    images: [],
  },

  'primal-stimuli': {
    template: 'brain-cables',
    concept: `TEXT: "6 buttons." lowercase
VISUAL: Reptile brain with 6 glowing buttons
BACKGROUND: Dark
EXTRA: Primal triggers`,
    images: [],
  },

  // ============================================
  // CRO FLYWHEEL LESSONS (15 lessons)
  // ============================================

  'leaky-bucket-audit': {
    template: 'diagram',
    concept: `TEXT: "$50K hole." lowercase
VISUAL: Bucket leaking money, flashlight beam
BACKGROUND: Dark
EXTRA: Find the leak`,
    images: [],
  },

  'price-chunking-yesloop': {
    template: 'diagram',
    concept: `TEXT: "3X AOV" green
VISUAL: Big price broken into small yeses
BACKGROUND: White with grid
EXTRA: Yes-loop`,
    images: [],
  },

  'objection-destroyer': {
    template: 'minimal-text',
    concept: `TEXT: "at first I thought..." lowercase
VISUAL: Objection dissolving
BACKGROUND: White
EXTRA: One sentence fix`,
    images: [],
  },

  'product-page-anatomy': {
    template: 'diagram',
    concept: `TEXT: "5 elements." lowercase
VISUAL: Product page exploded diagram
BACKGROUND: White with grid
EXTRA: Conversion blueprint`,
    images: [],
  },

  'post-purchase-goldmine': {
    template: 'money-stack',
    concept: `TEXT: "$40 → $120" green
VISUAL: Order confirmation with upsell
BACKGROUND: White
EXTRA: Hidden revenue`,
    images: [],
  },

  'bottom-up-brand': {
    template: 'diagram',
    concept: `TEXT: "movement." lowercase
VISUAL: Grassroots community building
BACKGROUND: White
EXTRA: Movement vs marketing`,
    images: [],
  },

  'halo-serial-position': {
    template: 'diagram',
    concept: `TEXT: "0.05 seconds." lowercase
VISUAL: First impression flash
BACKGROUND: White
EXTRA: Primacy effect`,
    images: [],
  },

  'ikea-effect': {
    template: 'diagram',
    concept: `TEXT: "+63%" green badge
VISUAL: DIY furniture with value glow
BACKGROUND: White
EXTRA: Build = value`,
    images: [imageAssets.ikea],
  },

  'von-restorff-effect': {
    template: 'diagram',
    concept: `TEXT: "stand out." lowercase
VISUAL: Row of gray circles, one gold
BACKGROUND: White
EXTRA: Isolation effect`,
    images: [],
  },

  'jakobs-law': {
    template: 'split-screen',
    concept: `TEXT: "familiar wins." lowercase
VISUAL: Custom checkout vs Amazon checkout
BACKGROUND: Split
EXTRA: UX principle`,
    images: [imageAssets.amazon],
  },

  'gaze-direction': {
    template: 'diagram',
    concept: `TEXT: "look here." lowercase
VISUAL: Eyes pointing to CTA
BACKGROUND: White
EXTRA: Gaze follows gaze`,
    images: [],
  },

  'five-second-test': {
    template: 'split-screen',
    concept: `TEXT: "5 seconds." lowercase
VISUAL: Blurry vs clear website
BACKGROUND: Split
EXTRA: Clarity wins`,
    images: [],
  },

  'speed-equals-trust': {
    template: 'diagram',
    concept: `TEXT: "$1.7 BILLION" red
VISUAL: Loading bar stuck, money draining
BACKGROUND: White
EXTRA: Amazon speed lesson`,
    images: [imageAssets.amazon],
  },

  'imperceptible-nudge': {
    template: 'single-object',
    concept: `TEXT: "$200M" gold
VISUAL: Orange button glowing
BACKGROUND: White
EXTRA: Amazon button color`,
    images: [imageAssets.amazon],
  },

  'cognitive-load-trap': {
    template: 'brain-cables',
    concept: `TEXT: "easy wins." lowercase
VISUAL: Brain with simplified pathways
BACKGROUND: White
EXTRA: Reduce friction`,
    images: [],
  },

  // ============================================
  // LUXURY & BRAND LESSONS (25 lessons)
  // ============================================

  'placebo-product': {
    template: 'single-object',
    concept: `TEXT: "placebo." lowercase white
VISUAL: Pill/product glowing mysteriously
BACKGROUND: Dark
EXTRA: Perception is reality`,
    images: [],
  },

  'information-asymmetry': {
    template: 'single-object',
    concept: `TEXT: "mystery." lowercase gold
VISUAL: Prada bag partially hidden
BACKGROUND: Dark
EXTRA: Hide to elevate`,
    images: [imageAssets.prada],
  },

  'visual-shorthand': {
    template: 'diagram',
    concept: `TEXT: "stripes." lowercase
VISUAL: Toothpaste with colored stripes
BACKGROUND: White
EXTRA: Visual = quality`,
    images: [],
  },

  'radical-honesty-play': {
    template: 'minimal-text',
    concept: `TEXT: "yes, it's marketing." lowercase
VISUAL: Wink emoji subtly
BACKGROUND: White
EXTRA: Inside joke effect`,
    images: [],
  },

  'hermes-doctrine': {
    template: 'single-object',
    concept: `TEXT: "2 year waitlist." lowercase gold
VISUAL: Birkin under glass dome
BACKGROUND: Dark museum
EXTRA: Protect the Birkin`,
    images: [imageAssets.hermes],
  },

  'hero-mechanism': {
    template: 'split-screen',
    concept: `TEXT: "$12" vs "$399"
VISUAL: Cheap tracker vs Oura ring
BACKGROUND: Split cheap/premium
EXTRA: 32X premium`,
    images: [imageAssets.oura],
  },

  'scammer-playbook-good': {
    template: 'diagram',
    concept: `TEXT: "7 levers." lowercase
VISUAL: Control panel with ethical switches
BACKGROUND: White
EXTRA: Persuasion for good`,
    images: [],
  },

  'us-vs-them': {
    template: 'versus',
    concept: `TEXT: "david" vs "goliath"
VISUAL: Small figure vs giant
BACKGROUND: Dark dramatic
EXTRA: Tribal identity`,
    images: [],
  },

  'brand-universe': {
    template: 'single-object',
    concept: `TEXT: "the universe." italic
VISUAL: Snow globe with entire world inside
BACKGROUND: Dark space
EXTRA: Build a world`,
    images: [],
  },

  'product-to-identity': {
    template: 'face-morph',
    concept: `TEXT: "become." lowercase
VISUAL: Product morphing into person
BACKGROUND: White
EXTRA: Identity purchase`,
    images: [],
  },

  'commodity-escape': {
    template: 'diagram',
    concept: `TEXT: "$0.50 → $6" green
VISUAL: Coffee beans transforming to Starbucks cup
BACKGROUND: White
EXTRA: Commodity escape`,
    images: [imageAssets.starbucks],
  },

  'myth-and-urgency': {
    template: 'dramatic-quote',
    concept: `TEXT: "NOW." white bold
VISUAL: Hourglass with story swirling
BACKGROUND: Dark
EXTRA: Scarcity + story`,
    images: [],
  },

  'value-ladder': {
    template: 'diagram',
    concept: `TEXT: "hidden menu." lowercase gold
VISUAL: Velvet rope parting to reveal secret tier
BACKGROUND: Dark
EXTRA: VIP exclusivity`,
    images: [imageAssets.rolex],
  },

  'box-worth-300': {
    template: 'single-object',
    concept: `TEXT: "$300" gold
VISUAL: Empty Tiffany blue box open
BACKGROUND: White
EXTRA: Box > contents`,
    images: [imageAssets.tiffany],
  },

  'story-taste-experiment': {
    template: 'diagram',
    concept: `TEXT: "story changes taste." lowercase
VISUAL: Same wine, different labels
BACKGROUND: White
EXTRA: Narrative power`,
    images: [],
  },

  'scarcity-calendar': {
    template: 'diagram',
    concept: `TEXT: "1 per year." lowercase
VISUAL: Rainbow Dutch ovens, most sold out
BACKGROUND: White
EXTRA: Le Creuset scarcity`,
    images: [imageAssets.leCreuset],
  },

  'anchor-moments': {
    template: 'diagram',
    concept: `TEXT: "$20K → $200" green
VISUAL: Expensive bag makes polo cheap
BACKGROUND: White
EXTRA: Price anchoring`,
    images: [imageAssets.ralphLauren],
  },

  'irrational-loyalty': {
    template: 'brain-cables',
    concept: `TEXT: "logic dies." lowercase
VISUAL: Brain with heart overtaking
BACKGROUND: Dark
EXTRA: Identity > reason`,
    images: [],
  },

  'reciprocity-engine': {
    template: 'diagram',
    concept: `TEXT: "+42%" green
VISUAL: Gift icon creating sales loop
BACKGROUND: White
EXTRA: Give to get`,
    images: [],
  },

  'gucci-short-termism': {
    template: 'versus',
    concept: `TEXT: "dying." lowercase red
VISUAL: Gucci fading vs Hermès strong
BACKGROUND: Split
EXTRA: Trends kill brands`,
    images: [imageAssets.gucci, imageAssets.hermes],
  },

  'ethical-persuasion-compass': {
    template: 'diagram',
    concept: `TEXT: "the line." lowercase
VISUAL: Compass with ethics needle
BACKGROUND: White
EXTRA: Magic show test`,
    images: [],
  },

  'two-worlds-mastery': {
    template: 'split-screen',
    concept: `TEXT: "two worlds." lowercase
VISUAL: Performance vs Brand split
BACKGROUND: Half analytical, half creative
EXTRA: Master both`,
    images: [],
  },

  'race-to-bottom-escape': {
    template: 'growth-curve',
    concept: `TEXT: "killing you." lowercase red
VISUAL: ROAS going up, profit going down
BACKGROUND: White with grid
EXTRA: Winning battles, losing war`,
    images: [],
  },

  'founder-operating-system': {
    template: 'diagram',
    concept: `TEXT: "4 traits." lowercase gold
VISUAL: Crown with 4 points
BACKGROUND: Dark
EXTRA: Legendary founders`,
    images: [],
  },

  '13800-percent-effect': {
    template: 'growth-curve',
    concept: `TEXT: "13,800%" huge green
VISUAL: Exponential compound curve
BACKGROUND: White with grid
EXTRA: 10% better compounds`,
    images: [],
  },

  // ============================================
  // META ADS 2026 (15 lessons)
  // ============================================

  'meta-three-second-hook': {
    template: 'phone-mockup',
    concept: `TEXT: "3 seconds." lowercase
VISUAL: iPhone with "00:03" timer
BACKGROUND: White
EXTRA: Meta logo floating`,
    images: [imageAssets.meta],
  },

  'meta-70-20-10-rule': {
    template: 'diagram',
    concept: `TEXT: "70/20/10" bold
VISUAL: Three bars descending
BACKGROUND: White with grid
EXTRA: Creative rule`,
    images: [imageAssets.meta],
  },

  'meta-ga4-integration': {
    template: 'diagram',
    concept: `TEXT: "GA4 + META" white
VISUAL: Two data streams merging
BACKGROUND: Dark tech
EXTRA: Signal quality`,
    images: [imageAssets.meta, imageAssets.google],
  },

  'meta-1-1-x-structure': {
    template: 'minimal-text',
    concept: `TEXT: "1-1-X" bold black
VISUAL: Flowchart 1 → 1 → X expanding
BACKGROUND: White with grid
EXTRA: Structure simplicity`,
    images: [imageAssets.meta],
  },

  'meta-auction-formula': {
    template: 'diagram',
    concept: `TEXT: "Bid × EAR × Quality" white
VISUAL: Formula equation visual
BACKGROUND: Dark
EXTRA: Meta auction`,
    images: [imageAssets.meta],
  },

  'meta-controls-vs-suggestions': {
    template: 'versus',
    concept: `TEXT: "hard" vs "soft"
VISUAL: Brick wall vs soft pillow
BACKGROUND: Split
EXTRA: Targeting modes`,
    images: [imageAssets.meta],
  },

  'meta-creative-ecosystem': {
    template: 'dramatic-quote',
    concept: `TEXT: "50 ADS" white
VISUAL: Grid of ad thumbnails
BACKGROUND: Dark gradient
EXTRA: Volume needed`,
    images: [imageAssets.meta],
  },

  'meta-capi-pixel-setup': {
    template: 'diagram',
    concept: `TEXT: "CAPI + PIXEL" white
VISUAL: Two streams merging
BACKGROUND: Dark tech
EXTRA: Dual tracking`,
    images: [imageAssets.meta],
  },

  'meta-andromeda': {
    template: 'single-object',
    concept: `TEXT: "andromeda." lowercase white
VISUAL: Meta logo as AI brain, cosmic
BACKGROUND: Deep space purple
EXTRA: New AI era`,
    images: [imageAssets.meta],
  },

  'creative-volume-2026': {
    template: 'product-hero',
    concept: `TEXT: "40-70 WEEKLY" bold
VISUAL: Phone exploding with creatives
BACKGROUND: Dark
EXTRA: Volume scale`,
    images: [imageAssets.meta],
  },

  'product-reviews-test': {
    template: 'split-screen',
    concept: `TEXT: "reviews?" lowercase
VISUAL: Product with vs without reviews
BACKGROUND: Split
EXTRA: A/B test`,
    images: [],
  },

  'ascension-ladder': {
    template: 'growth-curve',
    concept: `TEXT: "ascend." lowercase gold
VISUAL: Customer climbing value ladder
BACKGROUND: White
EXTRA: Move them up`,
    images: [],
  },

  'brain-friendly-ux': {
    template: 'brain-cables',
    concept: `TEXT: "brain first." lowercase
VISUAL: Brain with smooth pathways
BACKGROUND: White
EXTRA: Cognitive design`,
    images: [],
  },

  'brand-moat': {
    template: 'single-object',
    concept: `TEXT: "the moat." lowercase
VISUAL: Castle surrounded by water
BACKGROUND: Dark
EXTRA: Defensible brand`,
    images: [],
  },

  'brand-promise-code': {
    template: 'minimal-text',
    concept: `TEXT: "promise." lowercase gold
VISUAL: Handshake icon subtle
BACKGROUND: White
EXTRA: Craft promises`,
    images: [],
  },

  // ============================================
  // GOOGLE ADS 2026 (20 lessons)
  // ============================================

  'google-highest-cpa-wins': {
    template: 'diagram',
    concept: `TEXT: "highest wins." lowercase
VISUAL: Gold trophy "$50 CPA"
BACKGROUND: White with grid
EXTRA: Counterintuitive truth`,
    images: [imageAssets.google],
  },

  'google-pmax-blueprint': {
    template: 'diagram',
    concept: `TEXT: "PMax." lowercase
VISUAL: Blueprint diagram
BACKGROUND: White with grid
EXTRA: Campaign architecture`,
    images: [imageAssets.google],
  },

  'google-product-feed-mastery': {
    template: 'diagram',
    concept: `TEXT: "feed = ad." lowercase
VISUAL: Spreadsheet transforming to ad
BACKGROUND: White
EXTRA: Feed is the ad`,
    images: [imageAssets.google, imageAssets.shopify],
  },

  'google-shopping-intent': {
    template: 'person-metric',
    concept: `TEXT: "active intent." lowercase
VISUAL: Buyer with money ready
BACKGROUND: White
EXTRA: High intent`,
    images: [imageAssets.google],
  },

  'google-brand-moat': {
    template: 'single-object',
    concept: `TEXT: "brand moat." lowercase
VISUAL: Castle with Google colors
BACKGROUND: Dark
EXTRA: Unbeatable defense`,
    images: [imageAssets.google],
  },

  'google-data-quality-edge': {
    template: 'diagram',
    concept: `TEXT: "data in, AI out." lowercase
VISUAL: Data funnel to AI brain
BACKGROUND: White with grid
EXTRA: Quality edge`,
    images: [imageAssets.google],
  },

  'google-competitor-conquest': {
    template: 'versus',
    concept: `TEXT: "conquest." lowercase gold
VISUAL: Flag planting on competitor territory
BACKGROUND: Dark
EXTRA: Legal market share steal`,
    images: [imageAssets.google],
  },

  'google-store-trust-checklist': {
    template: 'diagram',
    concept: `TEXT: "trust first." lowercase
VISUAL: Checklist with checkmarks
BACKGROUND: White
EXTRA: Avoid suspension`,
    images: [imageAssets.google],
  },

  'google-hero-product-funnel': {
    template: 'diagram',
    concept: `TEXT: "hero products." lowercase
VISUAL: Funnel with products filtering
BACKGROUND: White with grid
EXTRA: Find winners`,
    images: [imageAssets.google],
  },

  'google-click-fraud-shield': {
    template: 'single-object',
    concept: `TEXT: "shield." lowercase white
VISUAL: Shield blocking red bots
BACKGROUND: Dark
EXTRA: Fraud protection`,
    images: [imageAssets.google],
  },

  'google-ai-max-decision': {
    template: 'split-screen',
    concept: `TEXT: "power vs control"
VISUAL: AI brain vs human hand
BACKGROUND: Split
EXTRA: AI Max choice`,
    images: [imageAssets.google],
  },

  'google-negative-keyword-colander': {
    template: 'diagram',
    concept: `TEXT: "filter." lowercase
VISUAL: Colander filtering bad keywords
BACKGROUND: White
EXTRA: Only good clicks`,
    images: [imageAssets.google],
  },

  'google-optimization-cadence': {
    template: 'diagram',
    concept: `TEXT: "rhythm." lowercase
VISUAL: Calendar with optimization schedule
BACKGROUND: White with grid
EXTRA: Disciplined cadence`,
    images: [imageAssets.google],
  },

  'google-ad-assets-arsenal': {
    template: 'diagram',
    concept: `TEXT: "free real estate." lowercase
VISUAL: Expanded ad with all assets
BACKGROUND: White
EXTRA: Bigger ads free`,
    images: [imageAssets.google],
  },

  'google-landing-page-bridge': {
    template: 'diagram',
    concept: `TEXT: "after the click." lowercase
VISUAL: Click arrow to landing page
BACKGROUND: White with grid
EXTRA: Half the battle`,
    images: [imageAssets.google],
  },

  'google-ai-overviews-opportunity': {
    template: 'phone-mockup',
    concept: `TEXT: "AI overviews." lowercase
VISUAL: Phone showing Google AI results
BACKGROUND: White
EXTRA: New opportunity`,
    images: [imageAssets.google],
  },

  'google-budget-reallocation': {
    template: 'growth-curve',
    concept: `TEXT: "2.8x → 5.1x" green
VISUAL: Money flowing to winner
BACKGROUND: White with grid
EXTRA: Feed winners`,
    images: [imageAssets.google],
  },

  'google-focus-firepower': {
    template: 'diagram',
    concept: `TEXT: "focus." lowercase white
VISUAL: Laser beam on single target
BACKGROUND: Dark
EXTRA: Consolidate budget`,
    images: [imageAssets.google],
  },

  'google-influencer-creative': {
    template: 'person-metric',
    concept: `TEXT: "outsource." lowercase
VISUAL: Influencer with content flowing
BACKGROUND: White
EXTRA: Creative scaling hack`,
    images: [imageAssets.google],
  },

  // ============================================
  // BUSINESS FUNDAMENTALS (50+ lessons)
  // ============================================

  'biz-infinite-money-engine': {
    template: 'diagram',
    concept: `TEXT: "∞ money." lowercase gold
VISUAL: Infinity loop made of money
BACKGROUND: White
EXTRA: The flywheel`,
    images: [imageAssets.alexHormozi],
  },

  'biz-rat-brain-hijack': {
    template: 'brain-cables',
    concept: `TEXT: "hijack." lowercase white
VISUAL: Rat brain with attention cables
BACKGROUND: Dark
EXTRA: Subconscious trigger`,
    images: [],
  },

  'biz-velocity-advantage': {
    template: 'growth-curve',
    concept: `TEXT: "speed." lowercase
VISUAL: Rocket accelerating
BACKGROUND: White with grid
EXTRA: Unfair advantage`,
    images: [],
  },

  'biz-remarkable-product': {
    template: 'single-object',
    concept: `TEXT: "remarkable." italic gold
VISUAL: Product with purple cow glow
BACKGROUND: White
EXTRA: Stand out or die`,
    images: [],
  },

  'biz-asset-not-job': {
    template: 'split-screen',
    concept: `TEXT: "asset vs job"
VISUAL: Building vs hamster wheel
BACKGROUND: Split
EXTRA: $3M difference`,
    images: [],
  },

  'biz-leverage-equation': {
    template: 'diagram',
    concept: `TEXT: "leverage." lowercase
VISUAL: Fulcrum lever lifting boulder
BACKGROUND: White
EXTRA: Work smarter`,
    images: [],
  },

  'biz-counter-position': {
    template: 'versus',
    concept: `TEXT: "new battlefield." lowercase
VISUAL: Small player on advantaged terrain
BACKGROUND: Dark
EXTRA: Giants money worthless`,
    images: [],
  },

  'biz-awareness-sweet-spot': {
    template: 'diagram',
    concept: `TEXT: "sweet spot." lowercase gold
VISUAL: Venn diagram with golden center
BACKGROUND: White
EXTRA: Pain + no solution`,
    images: [],
  },

  'biz-barbell-strategy': {
    template: 'diagram',
    concept: `TEXT: "5% + 95%" bold
VISUAL: Barbell shape visualization
BACKGROUND: White with grid
EXTRA: Avoid the middle`,
    images: [imageAssets.nassimTaleb],
  },

  'biz-one-pager-blueprint': {
    template: 'single-object',
    concept: `TEXT: "one page." lowercase
VISUAL: Single document glowing
BACKGROUND: White
EXTRA: Kill shiny objects`,
    images: [],
  },

  'biz-infinite-money-loop': {
    template: 'diagram',
    concept: `TEXT: "6 steps." lowercase
VISUAL: Circular flywheel with 6 parts
BACKGROUND: White with grid
EXTRA: Infinite profit`,
    images: [],
  },

  'biz-marketing-company': {
    template: 'minimal-text',
    concept: `TEXT: "you're not a brand." lowercase
VISUAL: Mirror reflection
BACKGROUND: White vast
EXTRA: Identity shift`,
    images: [],
  },

  'biz-product-expansion': {
    template: 'diagram',
    concept: `TEXT: "ridge." lowercase
VISUAL: Wallet expanding to product line
BACKGROUND: White
EXTRA: LTV solution`,
    images: [imageAssets.ridgeWallet],
  },

  'biz-zero-cac-engine': {
    template: 'diagram',
    concept: `TEXT: "$0 CAC" green
VISUAL: Customers flowing without ad spend
BACKGROUND: White with grid
EXTRA: Free customers first`,
    images: [],
  },

  'biz-creative-targeting': {
    template: 'diagram',
    concept: `TEXT: "creative = targeting." lowercase
VISUAL: Creative ad with target overlay
BACKGROUND: White
EXTRA: New targeting`,
    images: [imageAssets.meta],
  },

  'biz-3x-threshold': {
    template: 'single-object',
    concept: `TEXT: "3X" massive gold metallic
VISUAL: Glowing threshold number
BACKGROUND: Black
EXTRA: LTV:CAC magic`,
    images: [imageAssets.alexHormozi],
  },

  'biz-asymmetric-monopoly': {
    template: 'diagram',
    concept: `TEXT: "1400:1" bold
VISUAL: Massive vs tiny comparison
BACKGROUND: White
EXTRA: Legal monopoly`,
    images: [],
  },

  'biz-authenticity-anchor': {
    template: 'logo-mashup',
    concept: `TEXT: "40 years." lowercase
VISUAL: Nike logo staying consistent
BACKGROUND: White
EXTRA: Stay cool forever`,
    images: [imageAssets.nike],
  },

  'biz-brand-ltv-engine': {
    template: 'diagram',
    concept: `TEXT: "return reasons." lowercase
VISUAL: Multiple arrows pointing back to store
BACKGROUND: White with grid
EXTRA: Engineer returns`,
    images: [imageAssets.leCreuset, imageAssets.lego],
  },

  'biz-brand-temple': {
    template: 'diagram',
    concept: `TEXT: "the temple." lowercase gold
VISUAL: Greek temple with brand pillars
BACKGROUND: White
EXTRA: Build loyalty`,
    images: [imageAssets.ralphLauren],
  },

  'biz-cash-conversion': {
    template: 'diagram',
    concept: `TEXT: "-30 DAYS" bold green
VISUAL: Money flowing backwards
BACKGROUND: White with grid
EXTRA: Get paid first`,
    images: [imageAssets.davieFogarty, imageAssets.theOodie],
  },

  'biz-closer-framework': {
    template: 'diagram',
    concept: `TEXT: "C.L.O.S.E.R." gold
VISUAL: 6 steps descending
BACKGROUND: White
EXTRA: Hormozi sales system`,
    images: [imageAssets.alexHormozi],
  },

  'biz-courage-variable': {
    template: 'growth-curve',
    concept: `TEXT: "7,000 failures." lowercase
VISUAL: Failures leading to success peak
BACKGROUND: Dark with grid
EXTRA: Bet it all`,
    images: [],
  },

  'biz-empathy-engine': {
    template: 'diagram',
    concept: `TEXT: "feel them." lowercase
VISUAL: Heart connecting to customer
BACKGROUND: White
EXTRA: Lifelong service`,
    images: [],
  },

  'biz-four-pillars': {
    template: 'diagram',
    concept: `TEXT: "4 pillars." lowercase
VISUAL: Four pillars holding up roof
BACKGROUND: White
EXTRA: Complete framework`,
    images: [],
  },

  'biz-hamster-wheel': {
    template: 'single-object',
    concept: `TEXT: "the trap." lowercase white
VISUAL: Person running in giant wheel
BACKGROUND: Dark
EXTRA: Prison or business`,
    images: [],
  },

  'biz-infinite-flywheel': {
    template: 'diagram',
    concept: `TEXT: "$100 → $∞" green
VISUAL: Money multiplying in flywheel
BACKGROUND: White with grid
EXTRA: Predictable machine`,
    images: [],
  },

  'biz-leaders-burden': {
    template: 'single-object',
    concept: `TEXT: "your fault." lowercase white
VISUAL: Weight on shoulders
BACKGROUND: Dark
EXTRA: Ultimate accountability`,
    images: [],
  },

  'biz-lifetime-gross-profit': {
    template: 'diagram',
    concept: `TEXT: "wrong." lowercase red
VISUAL: Calculator with red X
BACKGROUND: White
EXTRA: Common mistake`,
    images: [],
  },

  'biz-logic-trap': {
    template: 'brain-cables',
    concept: `TEXT: "logic fails." lowercase
VISUAL: Brain being fooled
BACKGROUND: Dark
EXTRA: Smart decision kills`,
    images: [],
  },

  'biz-ltv-cac-dashboard': {
    template: 'diagram',
    concept: `TEXT: "the dashboard." lowercase
VISUAL: Cockpit with LTV:CAC gauges
BACKGROUND: Dark tech
EXTRA: Operator view`,
    images: [],
  },

  'biz-ltv-levers': {
    template: 'diagram',
    concept: `TEXT: "7 levers." lowercase
VISUAL: Control panel with 7 sliders
BACKGROUND: White with grid
EXTRA: LTV control`,
    images: [],
  },

  'biz-model-vs-method': {
    template: 'versus',
    concept: `TEXT: "model" vs "method"
VISUAL: Blueprint vs toolbox
BACKGROUND: Split
EXTRA: Model wins`,
    images: [],
  },

  'biz-objection-dance': {
    template: 'diagram',
    concept: `TEXT: "dance." lowercase
VISUAL: Two figures dancing, not fighting
BACKGROUND: White
EXTRA: 4 techniques`,
    images: [],
  },

  'biz-operator-mindset': {
    template: 'diagram',
    concept: `TEXT: "operator." lowercase
VISUAL: Cockpit dashboard
BACKGROUND: Dark tech
EXTRA: Gymshark mindset`,
    images: [imageAssets.benFrancis, imageAssets.gymshark],
  },

  'biz-purchase-cycle-engine': {
    template: 'diagram',
    concept: `TEXT: "10 years → 1 year" green
VISUAL: Compressed purchase cycle
BACKGROUND: White with grid
EXTRA: Le Creuset genius`,
    images: [imageAssets.leCreuset],
  },

  'biz-replication-protocol': {
    template: 'diagram',
    concept: `TEXT: "simple scales." lowercase
VISUAL: Copy machine duplicating success
BACKGROUND: White
EXTRA: Systems > talent`,
    images: [imageAssets.alexHormozi],
  },

  'biz-rfm-secret': {
    template: 'diagram',
    concept: `TEXT: "R.F.M." gold
VISUAL: Three axes chart
BACKGROUND: White with grid
EXTRA: Best customer ID`,
    images: [],
  },

  'biz-rule-of-100': {
    template: 'single-object',
    concept: `TEXT: "100" massive gold
VISUAL: The number 100 in bold
BACKGROUND: Black
EXTRA: Volume strategy`,
    images: [],
  },

  'biz-valley-protocol': {
    template: 'growth-curve',
    concept: `TEXT: "97% quit here." red
VISUAL: Valley on growth curve
BACKGROUND: White with grid
EXTRA: Push harder`,
    images: [],
  },

  'biz-high-margin-fortress': {
    template: 'single-object',
    concept: `TEXT: "fortress." lowercase gold
VISUAL: Castle made of margins
BACKGROUND: Dark
EXTRA: Margin moat`,
    images: [],
  },

  'biz-ridge-wallet-protocol': {
    template: 'diagram',
    concept: `TEXT: "ridge." lowercase
VISUAL: Single product expanding
BACKGROUND: White
EXTRA: Infinite LTV`,
    images: [imageAssets.ridgeWallet],
  },

  'biz-20-domination': {
    template: 'diagram',
    concept: `TEXT: "20% = 80%" bold
VISUAL: Small group generating most revenue
BACKGROUND: White
EXTRA: Pareto rule`,
    images: [],
  },

  'biz-channel-mix-formula': {
    template: 'diagram',
    concept: `TEXT: "the mix." lowercase
VISUAL: Pie chart of channels
BACKGROUND: White with grid
EXTRA: Optimal allocation`,
    images: [],
  },

  'biz-next-best-dollar': {
    template: 'diagram',
    concept: `TEXT: "next dollar." lowercase
VISUAL: Dollar with arrow pointing to best spot
BACKGROUND: White
EXTRA: Capital allocator`,
    images: [],
  },

  'biz-authenticity-engine': {
    template: 'single-object',
    concept: `TEXT: "can't copy." lowercase gold
VISUAL: Fingerprint unique pattern
BACKGROUND: White
EXTRA: Impossible to replicate`,
    images: [],
  },

  'biz-creator-army': {
    template: 'diagram',
    concept: `TEXT: "500+ creators." lowercase
VISUAL: Army of content creators
BACKGROUND: White
EXTRA: Vs expensive agency`,
    images: [],
  },

  'biz-mission-driven-brand': {
    template: 'single-object',
    concept: `TEXT: "the cause." lowercase
VISUAL: Flag with mission symbol
BACKGROUND: White
EXTRA: Cause outperforms`,
    images: [],
  },

  'biz-savage-mentality': {
    template: 'dramatic-quote',
    concept: `TEXT: "SAVAGE" white bold
VISUAL: Lion/predator eyes
BACKGROUND: Dark
EXTRA: Relentless execution`,
    images: [],
  },

  'biz-systems-architect': {
    template: 'diagram',
    concept: `TEXT: "architect." lowercase
VISUAL: Blueprint with systems
BACKGROUND: White with grid
EXTRA: $10M+ transition`,
    images: [],
  },

  'biz-90-percent-trap': {
    template: 'diagram',
    concept: `TEXT: "90%" red
VISUAL: Dice/gambling visual
BACKGROUND: White
EXTRA: Guess vs math`,
    images: [],
  },

  'biz-animal-mindset': {
    template: 'person-metric',
    concept: `TEXT: "$500M" gold
VISUAL: Davie Fogarty intense
BACKGROUND: Dark
EXTRA: Relentless action`,
    images: [imageAssets.davieFogarty],
  },

  'biz-channel-cac-decoder': {
    template: 'diagram',
    concept: `TEXT: "blended lies." lowercase red
VISUAL: Hidden CAC revealed
BACKGROUND: White with grid
EXTRA: True channel cost`,
    images: [],
  },

  'biz-6-to-1-problem': {
    template: 'diagram',
    concept: `TEXT: "6:1" red
VISUAL: Amazing ratio killing growth
BACKGROUND: White
EXTRA: Too good is bad`,
    images: [],
  },

  'biz-survival-cycle': {
    template: 'diagram',
    concept: `TEXT: "doom loop." lowercase red
VISUAL: Downward spiral cycle
BACKGROUND: Dark
EXTRA: 97% death trap`,
    images: [],
  },

  'biz-infinite-money-glitch': {
    template: 'diagram',
    concept: `TEXT: "the glitch." lowercase gold
VISUAL: Flywheel with infinity symbol
BACKGROUND: White
EXTRA: Self-fueling growth`,
    images: [],
  },

  'biz-price-anchoring': {
    template: 'split-screen',
    concept: `TEXT: "$47" vs "$297"
VISUAL: Small price next to anchor
BACKGROUND: Split
EXTRA: Looks cheap`,
    images: [],
  },

  'biz-look-back-window': {
    template: 'diagram',
    concept: `TEXT: "30 days lies." lowercase red
VISUAL: Calendar with blindspot
BACKGROUND: White with grid
EXTRA: Wrong window`,
    images: [],
  },

  // ============================================
  // ADDITIONAL CRO LESSONS (20 lessons)
  // ============================================

  'checkout-line-effect': {
    template: 'diagram',
    concept: `TEXT: "impulse." lowercase
VISUAL: Checkout lane with candy
BACKGROUND: White
EXTRA: Last-minute add`,
    images: [],
  },

  'compound-testing-effect': {
    template: 'growth-curve',
    concept: `TEXT: "1% + 1% + 1%..." lowercase
VISUAL: Small wins stacking exponentially
BACKGROUND: White with grid
EXTRA: Compound gains`,
    images: [],
  },

  'emotional-gap': {
    template: 'diagram',
    concept: `TEXT: "the gap." lowercase
VISUAL: Bridge connecting desire to action
BACKGROUND: White
EXTRA: Bridge it`,
    images: [],
  },

  'emotional-problem': {
    template: 'diagram',
    concept: `TEXT: "the real problem." lowercase
VISUAL: Surface problem hiding deeper one
BACKGROUND: Dark
EXTRA: Dig deeper`,
    images: [],
  },

  'five-value-heuristics': {
    template: 'diagram',
    concept: `TEXT: "5 shortcuts." lowercase
VISUAL: Brain with 5 fast paths
BACKGROUND: White
EXTRA: Mental shortcuts`,
    images: [],
  },

  'ice-prioritization': {
    template: 'diagram',
    concept: `TEXT: "I.C.E." gold
VISUAL: Three columns scored
BACKGROUND: White with grid
EXTRA: Impact, Confidence, Ease`,
    images: [],
  },

  'identity-shift-effect': {
    template: 'face-morph',
    concept: `TEXT: "become." lowercase
VISUAL: Before/after identity shift
BACKGROUND: Split
EXTRA: Buying = becoming`,
    images: [],
  },

  'le-creuset-scarcity-engine': {
    template: 'diagram',
    concept: `TEXT: "1 color." lowercase
VISUAL: Rainbow with one available
BACKGROUND: White
EXTRA: Collector FOMO`,
    images: [imageAssets.leCreuset],
  },

  'local-holiday-legitimacy': {
    template: 'diagram',
    concept: `TEXT: "local wins." lowercase
VISUAL: Calendar with cultural events
BACKGROUND: White
EXTRA: Cultural moments`,
    images: [],
  },

  'logo-is-worthless': {
    template: 'minimal-text',
    concept: `TEXT: "worthless." lowercase
VISUAL: Logo crossed out subtly
BACKGROUND: White vast
EXTRA: Symbol ≠ equity`,
    images: [],
  },

  'micro-yes-engine': {
    template: 'diagram',
    concept: `TEXT: "yes, yes, YES." growing
VISUAL: Steps ascending
BACKGROUND: White
EXTRA: Momentum builder`,
    images: [],
  },

  'missing-piece-effect': {
    template: 'diagram',
    concept: `TEXT: "almost complete." lowercase
VISUAL: Puzzle with one piece missing
BACKGROUND: White
EXTRA: Completion urge`,
    images: [],
  },

  'nine-trust-levers': {
    template: 'diagram',
    concept: `TEXT: "9 levers." lowercase
VISUAL: Trust control panel
BACKGROUND: White with grid
EXTRA: All credibility elements`,
    images: [],
  },

  'ninety-seven-percent-leak': {
    template: 'diagram',
    concept: `TEXT: "97%" huge red
VISUAL: Visitors leaving funnel
BACKGROUND: White
EXTRA: Most leave`,
    images: [],
  },

  'offer-is-everything': {
    template: 'minimal-text',
    concept: `TEXT: "the offer." lowercase gold
VISUAL: Offer box glowing
BACKGROUND: White vast
EXTRA: Offer > copy`,
    images: [imageAssets.alexHormozi],
  },

  'owned-audience-effect': {
    template: 'diagram',
    concept: `TEXT: "own it." lowercase
VISUAL: Audience in your pocket
BACKGROUND: White
EXTRA: Build assets`,
    images: [],
  },

  'pain-dream-bridge': {
    template: 'diagram',
    concept: `TEXT: "bridge." lowercase
VISUAL: Pain on left, dream on right, bridge
BACKGROUND: White
EXTRA: Connect them`,
    images: [],
  },

  'performance-engine': {
    template: 'diagram',
    concept: `TEXT: "the engine." lowercase
VISUAL: Well-oiled machine visual
BACKGROUND: White with grid
EXTRA: Scalable systems`,
    images: [],
  },

  'poppy-disruptor-blueprint': {
    template: 'single-object',
    concept: `TEXT: "disrupt." lowercase gold
VISUAL: Poppy flower breaking through
BACKGROUND: White
EXTRA: Break conventions`,
    images: [],
  },

  'post-purchase-momentum': {
    template: 'growth-curve',
    concept: `TEXT: "after the sale." lowercase
VISUAL: Growth continuing post-purchase
BACKGROUND: White with grid
EXTRA: Repeat buyers`,
    images: [],
  },

  // ============================================
  // REMAINING LESSONS (30+ lessons)
  // ============================================

  'premium-flywheel': {
    template: 'diagram',
    concept: `TEXT: "premium." lowercase gold
VISUAL: Flywheel with luxury elements
BACKGROUND: Dark
EXTRA: Compound positioning`,
    images: [],
  },

  'price-creates-value': {
    template: 'diagram',
    concept: `TEXT: "price = value." lowercase
VISUAL: Higher price creating more glow
BACKGROUND: White
EXTRA: High price signals`,
    images: [],
  },

  'psychological-moat': {
    template: 'brain-cables',
    concept: `TEXT: "mental moat." lowercase
VISUAL: Brain protected by barriers
BACKGROUND: Dark
EXTRA: Mental defense`,
    images: [],
  },

  'self-selection-principle': {
    template: 'diagram',
    concept: `TEXT: "they choose." lowercase
VISUAL: Customers self-sorting
BACKGROUND: White
EXTRA: Qualify themselves`,
    images: [],
  },

  'sell-the-identity': {
    template: 'face-morph',
    concept: `TEXT: "sell who they become." lowercase
VISUAL: Person transforming
BACKGROUND: White
EXTRA: Identity purchase`,
    images: [],
  },

  'shape-psychology': {
    template: 'diagram',
    concept: `TEXT: "shapes matter." lowercase
VISUAL: Circle, square, triangle meanings
BACKGROUND: White
EXTRA: Shape perception`,
    images: [],
  },

  'smallest-viable-market': {
    template: 'diagram',
    concept: `TEXT: "tiny." lowercase
VISUAL: Small circle dominating before expanding
BACKGROUND: White
EXTRA: Niche first`,
    images: [imageAssets.sethGodin],
  },

  'sms-open-rate-secret': {
    template: 'diagram',
    concept: `TEXT: "98%" green
VISUAL: SMS notification badge
BACKGROUND: White
EXTRA: SMS beats email`,
    images: [],
  },

  'story-changes-taste': {
    template: 'diagram',
    concept: `TEXT: "story = taste." lowercase
VISUAL: Same wine, different stories
BACKGROUND: White
EXTRA: Narrative power`,
    images: [],
  },

  'thirty-five-thousand-decisions': {
    template: 'brain-cables',
    concept: `TEXT: "35,000" white
VISUAL: Overwhelmed brain
BACKGROUND: Dark
EXTRA: Decision fatigue`,
    images: [],
  },

  'whale-customer-paradox': {
    template: 'diagram',
    concept: `TEXT: "the whales." lowercase gold
VISUAL: Small group of big spenders
BACKGROUND: White
EXTRA: Different behavior`,
    images: [],
  },

  'dior-pricing-secret': {
    template: 'split-screen',
    concept: `TEXT: "$57 → $3,500"
VISUAL: Same bag, 60x markup
BACKGROUND: Split cheap/luxury
EXTRA: Luxury pricing`,
    images: [imageAssets.dior],
  },

  'consumption-conversion': {
    template: 'diagram',
    concept: `TEXT: "the gap." lowercase red
VISUAL: Consumption vs conversion disconnect
BACKGROUND: White
EXTRA: Why pages fail`,
    images: [],
  },

  'luxury-mindset-shift': {
    template: 'diagram',
    concept: `TEXT: "4 shifts." lowercase gold
VISUAL: Mind transforming
BACKGROUND: Dark
EXTRA: Commodity to luxury`,
    images: [],
  },

  'three-cro-tests': {
    template: 'diagram',
    concept: `TEXT: "3 tests." lowercase
VISUAL: Three test tubes with results
BACKGROUND: White with grid
EXTRA: Revenue impact`,
    images: [],
  },

  'digital-velvet-rope': {
    template: 'single-object',
    concept: `TEXT: "velvet rope." lowercase gold
VISUAL: Red velvet rope online
BACKGROUND: Dark
EXTRA: Digital exclusivity`,
    images: [],
  },

  'hidden-menu-psychology': {
    template: 'diagram',
    concept: `TEXT: "secret menu." lowercase
VISUAL: Hidden menu revealed
BACKGROUND: Dark
EXTRA: Status belonging`,
    images: [],
  },

  'celebrity-gifting-flywheel': {
    template: 'diagram',
    concept: `TEXT: "free → millions." lowercase
VISUAL: Gift turning into influence
BACKGROUND: White
EXTRA: Gifting ROI`,
    images: [],
  },

  'forbidden-coffee-hook': {
    template: 'single-object',
    concept: `TEXT: "forbidden." lowercase white
VISUAL: Coffee cup with mystery aura
BACKGROUND: Dark
EXTRA: Exclusivity story`,
    images: [],
  },
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
