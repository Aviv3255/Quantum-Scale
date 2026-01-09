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

  // Mascot
  monkey: '/reference-thumbnails/monkey-mascot.png',

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
  | 'single-object'
  // PREVIOUS PREMIUM STYLES
  | 'product-table'      // Product on wooden table + big headline + grid bg
  | 'illustrated-char'   // Kurzgesagt-style character + money floating
  | 'money-product'      // Product sitting on $100 bills pile + mascot
  | 'brand-collage'      // Retro editorial collage with brands
  | 'tech-ui'            // Software interface mockup style
  | 'arrow-callout'      // Big arrow pointing to element + logo
  // WORLD-CLASS PREMIUM FORMULAS (from 18 reference images)
  | 'product-surface'       // Real product on wooden table + money headline (like $2.3M, $100M thumbnails)
  | '3d-mascot-dramatic'    // 3D rendered mascot with worn texture + flames/drama (like GAME OVER Reddit)
  | 'split-brain-scan'      // Medical brain split before/after (like brain MRI thumbnails)
  | 'person-with-curve'     // Person + growth curve red→green (like "You're Here" thumbnail)
  | 'minimal-logos'         // Ultra clean white bg + lowercase text + logos (like "copy them." thumbnail)
  | 'strikethrough-list'   // Dark bg + words with red strikethrough (like social media/dropshipping thumbnail)
  // NEW SURREAL/ARTISTIC FORMULAS (ChatGPT excels at these)
  | 'surreal-transformation' // Object melting/morphing/transforming (like package disintegrating, person becoming treasure)
  | 'surreal-split'          // Split composition showing dramatic contrast (exploding head vs calm head)
  | 'surreal-landscape'     // Epic 3D rendered landscape with symbolic elements (mountain with valley)
  | 'minimal-dark'           // Simple element on pure black background (ultra clean)
  | 'reference-based';       // Copy reference image with modifications

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
  // ========================================
  // NEW PREMIUM YOUTUBE THUMBNAIL STYLES
  // ========================================
  'product-table': {
    id: 'product-table',
    name: 'Product Table',
    description: 'Product on wooden table + big money headline',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Premium product showcase like "$100 MILLION" thumbnails. BACKGROUND: White with subtle grid paper texture at top, warm wooden table/surface at bottom third. LAYOUT: BIG bold headline top 40%, product hero shot on wooden surface bottom 60%. TEXT: Yellow or white ALL CAPS impact font with black outline/shadow, money amounts ($X MILLION, $X IN Y DAYS). VISUAL: Real product packaging/bottle/bag sitting on natural wood surface, crisp product photography look. Optional: floating brand logo, red arrow pointing to product.`,
  },
  'illustrated-char': {
    id: 'illustrated-char',
    name: 'Illustrated Character',
    description: 'Kurzgesagt-style character + money floating',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Kurzgesagt/animated explainer style. BACKGROUND: Dark blue/teal gradient with subtle texture/grain. LAYOUT: Text top 35%, illustrated character center-right 65%. TEXT: White bold sans-serif "HOW TO MAKE $X" style, money amounts prominent. VISUAL: Flat-design illustrated person/character in hoodie or business casual, simple geometric shapes, $100 bills floating around, small brand icon in corner. Modern, premium animation studio aesthetic.`,
  },
  'money-product': {
    id: 'money-product',
    name: 'Money Product',
    description: 'Product on $100 bills pile + 3D mascot',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: "Genius" Stanley cup style. BACKGROUND: White with grid paper texture. LAYOUT: Lowercase text top-left 25%, product on money center 50%, mascot right 25%. TEXT: One word lowercase black sans-serif ("genius", "works", "viral"). VISUAL: Product (cup, bottle, gadget) sitting on messy pile of crisp $100 bills, 3D mascot character (owl, figure) on right side looking at product. Fun, playful, money-focused.`,
  },
  'brand-collage': {
    id: 'brand-collage',
    name: 'Brand Collage',
    description: 'Retro editorial collage with brands',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Fashion editorial collage like 70s/80s magazine. BACKGROUND: Collage of overlapping brand imagery, vintage ads, magazine covers. LAYOUT: Central figure/face 60%, surrounding brand elements 40%. TEXT: Minimal or none, let visuals speak. VISUAL: Fashion model or iconic face in center wearing helmet/glasses, surrounded by luxury brand logos (Ferrari, Chanel, etc), vintage magazine cutouts, retro color palette (red, cream, gold). High fashion meets nostalgia.`,
  },
  'tech-ui': {
    id: 'tech-ui',
    name: 'Tech UI',
    description: 'Software interface mockup style',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Framer/Figma software demo style. BACKGROUND: Dark charcoal/black with subtle gradient. LAYOUT: UI element left 40%, result/output right 60%, connected by dotted line. TEXT: Inside UI input fields, clean sans-serif. VISUAL: Software interface mockup showing input field on left, arrow/dotted line connecting to result on right (phone screen, dashboard, etc). Tech product demo aesthetic, floating app logos, glassmorphism effects.`,
  },
  'arrow-callout': {
    id: 'arrow-callout',
    name: 'Arrow Callout',
    description: 'Big arrow pointing to key element + logo',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: "this is sticky" Figma style. BACKGROUND: Clean white or light gray. LAYOUT: Text left 40% (stacked, multi-line), visual right 60% with arrow. TEXT: Lowercase black serif or sans-serif, 2-3 lines stacked ("this is", "sticky"). VISUAL: Big bold black curved arrow pointing from text to key element (phone, UI, product), brand logo floating in corner (Figma, Shopify, etc). Minimal, editorial, design-forward.`,
  },
  // ========================================
  // WORLD-CLASS PREMIUM FORMULAS (from 18 reference images)
  // ========================================
  'product-surface': {
    id: 'product-surface',
    name: 'Product on Surface',
    description: 'Real product on wooden table + money headline (like $2.3M, $100M thumbnails)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Premium product photography like "$2.3M IN 90 DAYS" or "$100 MILLION" creatine thumbnails. BACKGROUND: Dark smoky atmosphere at TOP, transitioning to warm wooden table surface at BOTTOM. Product photography lighting. LAYOUT: Big money headline at top, product hero shot on wooden surface at bottom. TEXT: Yellow/gold ALL CAPS with thick black outline, money amounts prominent. VISUAL: Real product packaging sitting on natural wood surface, RED ARROW pointing to product, platform logo badge (TikTok, Shopify) in corner. Professional product photography aesthetic.`,
  },
  '3d-mascot-dramatic': {
    id: '3d-mascot-dramatic',
    name: '3D Mascot Dramatic',
    description: '3D rendered mascot with worn texture + flames/drama (like GAME OVER Reddit)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Like "GAME OVER" Reddit Snoo thumbnail. BACKGROUND: Dark, smoky, dramatic - black with orange/red glow from flames. Apocalyptic energy. LAYOUT: 3D mascot center, flames at bottom, text at top. TEXT: "GAME OVER" style - white ALL CAPS with quotes, thick black outline. VISUAL: 3D RENDERED brand mascot/product with WORN/WEATHERED TEXTURE (cracked, scratched, dented like concrete), flames/fire licking up from bottom, RED DOWNWARD ARROWS behind, percentage badge (-99%, +300%). Dramatic rim lighting from behind.`,
  },
  'split-brain-scan': {
    id: 'split-brain-scan',
    name: 'Split Brain Scan',
    description: 'Medical brain split before/after (like brain MRI thumbnails)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Like "BEFORE/AFTER" brain MRI scan thumbnails. BACKGROUND: Pure BLACK, nothing else. LAYOUT: Single brain centered, split down the middle. TEXT: "Before" and "After" labels with arrows, white italic font. VISUAL: Human BRAIN viewed from above, SPLIT perfectly down middle - LEFT HALF grayscale/gray (bad state), RIGHT HALF vibrant heat map colors (oranges, yellows, reds showing activity). Medical illustration aesthetic. Brain glows on colorful side.`,
  },
  'person-with-curve': {
    id: 'person-with-curve',
    name: 'Person with Curve',
    description: 'Person + growth curve red→green (like "You\'re Here" thumbnail)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Like "You're Here" Alex Hormozi thumbnail. BACKGROUND: Dark/BLACK with thin GRID LINES (graph paper on dark background). Tech visualization feel. LAYOUT: Person silhouette on left, growth curve chart on right. TEXT: "You're Here" or percentage in white, pointing to curve. VISUAL: Confident person figure (arms crossed) on LEFT, growth CURVE on RIGHT going up→down into valley→up dramatically, colors transition green→yellow→red→yellow→green, WHITE DOT on curve with arrow pointing to it. Curve glows slightly.`,
  },
  'minimal-logos': {
    id: 'minimal-logos',
    name: 'Minimal Logos',
    description: 'Ultra clean white bg + lowercase text + logos (like "copy them." thumbnail)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Like "copy them." or "genius" thumbnails - ultra minimal, editorial. BACKGROUND: Pure WHITE or light gray with subtle grid paper texture. LOTS of whitespace. LAYOUT: Lowercase text at top, graphic elements below with generous spacing. TEXT: 2-3 words max, lowercase black sans-serif (Inter/Helvetica), clean and clever. VISUAL: 2-4 brand logos or 3D mascots arranged horizontally, or product on pile of $100 bills. No dramatic effects. Minimal, premium, editorial feel.`,
  },
  'strikethrough-list': {
    id: 'strikethrough-list',
    name: 'Strikethrough List',
    description: 'Dark bg + words with red strikethrough (like social media/dropshipping thumbnail)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Like "social media / dropshipping / clothing brand" strikethrough thumbnail. BACKGROUND: Pure BLACK or dark charcoal, clean and dramatic. LAYOUT: Bold text on left, stacked crossed-out words on right. TEXT: Main word in massive white ALL CAPS on left ("STOP.", "NO."), faded white words with RED STRIKETHROUGH lines on right. VISUAL: Stack of 3+ words, each with bold red line through them, words slightly transparent/faded. Creates "what NOT to do" energy. High contrast, graphic style.`,
  },
  // ========================================
  // SURREAL/ARTISTIC FORMULAS (ChatGPT excels at these)
  // ========================================
  'surreal-transformation': {
    id: 'surreal-transformation',
    name: 'Surreal Transformation',
    description: 'Object melting/morphing/transforming dramatically (ChatGPT strength)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Surreal 3D hyper-realistic transformation. BACKGROUND: Dramatic gradient with glows. LAYOUT: Central transformation focal point. TEXT: One or two words max, bold impact. VISUAL: Object or figure mid-transformation - melting, morphing, disintegrating, or metamorphosing into something else. Salvador Dali meets premium product photography. Visceral, memorable, impossible to scroll past.`,
  },
  'surreal-split': {
    id: 'surreal-split',
    name: 'Surreal Split',
    description: 'Split composition showing dramatic surreal contrast (exploding vs calm, chaos vs crystal)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Dramatic split composition with surreal elements. BACKGROUND: Split gradient - contrasting colors each side. LAYOUT: 50/50 split with extreme visual contrast. TEXT: Simple comparison text at top. VISUAL: Two halves showing dramatic opposites - one side chaotic/exploding/turbulent, other side calm/crystallized/peaceful. Hyper-realistic 3D render. Shows paradox or transformation visually.`,
  },
  'surreal-landscape': {
    id: 'surreal-landscape',
    name: 'Surreal Landscape',
    description: 'Epic 3D rendered symbolic landscape (mountain with valley, journey visualization)',
    promptStructure: `YouTube thumbnail, 16:10 (1600x1000px). STYLE: Epic cinematic 3D landscape like movie poster. BACKGROUND: Dramatic sky gradient - stormy to golden. LAYOUT: Landscape with symbolic elements and tiny figures. TEXT: Simple impactful text at top or integrated into scene. VISUAL: 3D rendered symbolic landscape - mountains, valleys, paths with tiny human figures showing journey. Epic scale, dramatic lighting, god-rays, treasure/light at destination. Inspirational yet shows harsh reality.`,
  },
  'minimal-dark': {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    description: 'Simple element on pure black background - ultra clean and professional',
    promptStructure: `YouTube thumbnail, 16:9 aspect ratio. STYLE: Ultra minimal, professional. BACKGROUND: Pure black. LAYOUT: One or two simple elements centered. TEXT: Bold text at top (white or accent color). VISUAL: Single focal element, clean execution, lots of negative space. No clutter, no effects, just clean professional simplicity.`,
  },
  'reference-based': {
    id: 'reference-based',
    name: 'Reference-Based',
    description: 'Copy reference image exactly with specific modifications',
    promptStructure: `Copy the reference image EXACTLY with the specified modifications. Keep everything else the same - style, layout, colors, effects. 16:10 ratio. Don't put the time block.`,
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
// referenceImage is for 'reference-based' template - the screenshot from Lessons-covers-refferance folder
const lessonConceptData: Record<string, { concept: string; images: string[]; template: TemplateType; referenceImage?: string }> = {

  // ============================================
  // PSYCHOLOGY & COPYWRITING CORE (32 lessons)
  // ============================================

  'familiar-surprise-secret': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "THE FAMILIAR SURPRISE"
- Replace the brand logos on the brain with: Apple logo, iPhone icon, AirPods icon
- Replace any person with our monkey mascot (attached) - he's wearing an Apple Store employee blue shirt, looking clever and knowing

Keep EVERYTHING else exactly the same - the brain visual, the purple glow, the style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey, imageAssets.apple],
  },

  'red-button-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191722.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Make the central object a MASSIVE glossy red arcade button - glowing, pulsing with forbidden energy
- Text: "DON'T." in huge letters above the button
- Our monkey mascot (attached) with his finger HOVERING over the button, sweating, can't resist the urge
- Dark dramatic background with red glow emanating from the button
- Small text: "You're going to press it anyway"

Make it feel like the button is CALLING to you. Premium, cinematic, irresistible.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'fred-method': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint diagram to show "F.R.E.D." with 4 icons: Fear, Reason, Ego, Desire
- Replace the person with our monkey mascot (attached) - he's holding a marker and pointing at the blueprint like a professor teaching
- Keep the blue blueprint background exactly the same

16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'emotion-decides': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181654.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "EMOTION WINS." in bold
- Replace both people with Daniel Kahneman (attached) on one side looking wise
- Replace the hoodie product with a giant red 3D HEART wearing a golden crown
- Add small gray brain being pushed aside by the heart

Keep the podcast/interview style layout, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.danielKahneman],
  },

  'gatekeeper-method': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "4 DOORS TO THE BRAIN"
- On the brain, add 4 small golden doors instead of brand logos - one door is OPEN with light streaming out
- Add our monkey mascot (attached) holding a golden key, looking like he knows the secret

Keep the purple brain glow, the dramatic lighting, the premium feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'three-second-rule': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change "OLD" to "SLOW" with red X
- Change "NEW" to "3 SEC" with green checkmark
- Replace the tech logos with: Left side = hourglass/slow clock, Right side = lightning bolt stopwatch showing "00:03"
- Add our monkey mascot (attached) pointing urgently at the 3 seconds side, looking stressed about time

Keep the comparison layout, the arrows, the grid background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'science-of-selling': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183115.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: "OLD SCHOOL" with old-fashioned sales letter/typewriter
- Right side: "SCIENCE" with modern brain scan + data visualization
- Keep the split comparison layout exactly the same

16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'persuasion-blueprint': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "THE PERSUASION BLUEPRINT"
- Keep the money pyramid but add "6 PRINCIPLES" text on it
- Replace the hand/figures at top with Robert Cialdini (attached) standing confidently at the peak
- Add floating icons around: heart, clock, star, handshake, lock, crowd

Keep the money flying, the clean style, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.robertCialdini],
  },

  'persuasion-stack': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "STACK OR FAIL"
- Instead of money pyramid, show 5 colorful building blocks stacked like a tower
- Each block labeled: "PROOF", "STORY", "OFFER", "URGENCY", "TRUST"
- Add our monkey mascot (attached) at the top of the stack, arms raised in victory

Keep the money flying around, the dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'architecture-of-influence': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint to show a "MIND ARCHITECTURE" diagram
- Show brain blueprint with labeled sections: Logic, Emotion, Trust, Fear
- Replace the person with Robert Cialdini (attached) pointing at the blueprint

Keep the blue blueprint background, the professional teaching style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.robertCialdini],
  },

  'wiifm-principle': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "WHAT'S IN IT FOR ME?"
- Replace the person with our monkey mascot (attached) - he's pointing DIRECTLY at the viewer like Uncle Sam, intense eye contact, demanding
- Make the pointing more aggressive, like "I'm talking to YOU"

Keep the red background, the dramatic paper-cut style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'three-canons-of-craft': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183952.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show 3 GOLDEN GATES/DOORS in a row - copy must pass through all three
- Gate 1: "CLEAR?" with magnifying glass icon
- Gate 2: "COMPELLING?" with magnet icon
- Gate 3: "CREDIBLE?" with badge/seal icon
- Text at top: "3 GATES YOUR COPY MUST PASS"
- Our monkey mascot (attached) standing at the entrance, clipboard in hand, judging

Premium gold and black aesthetic. Make it feel like elite quality control.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'cpppb-proof-loop': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint to show a circular loop diagram with 5 nodes
- Each node labeled: C → P → P → P → B (Claim, Proof, Proof, Proof, Benefit)
- Arrows connecting them in an infinite loop
- Replace the person with our monkey mascot (attached) - he's standing in the center of the loop, conducting it like an orchestra

Keep the blue blueprint style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'damaging-admission': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "I WAS WRONG." with a cracked effect
- Replace the banana with a CRACKED MIRROR showing golden light through the crack
- Add our monkey mascot (attached) looking humble and sincere, hand on heart, admitting a mistake
- Add small text: "and that's why you should trust me"

Keep the clean layout, the grid background, the modern style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'emotional-precision': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "Hit the EXACT emotion"
- Replace the car/luxury item with a giant glowing red HEART with a bullseye target on it
- Replace the person doing "shh" with our monkey mascot (attached) - he's holding a dart, about to throw it at the heart target, focused and precise
- Add an arrow pointing to the heart saying "the secret"

Keep the luxurious feel, the dramatic composition.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'blind-spot-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "They can't see THIS"
- Replace the person with our monkey mascot (attached) - he's covering one eye with his hand, other eye wide open looking mysterious
- Add a glowing golden dollar sign floating in the "blind spot" area he can't see

Keep the podcast/interview style, the teal background, the dramatic quote format.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'customer-voice-mining': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "THEIR WORDS = GOLD"
- Replace the banana with a golden speech bubble icon, shiny and premium
- Keep the clean minimal style, white background

16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'double-bind-of-fear': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183115.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: "ACT" with flames/fire visual (danger)
- Right side: "DON'T ACT" with flames/fire visual (also danger)
- Both sides look equally dangerous - that's the point
- Add text "DAMNED EITHER WAY" at top

Keep the split comparison layout.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'emotion-spectrum': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "THE EMOTION SPECTRUM"
- Replace the brand logos on the brain with emotion icons: 😰 Fear, 😤 Anger, 😢 Sadness, 😊 Joy, 🤩 Desire
- Each emotion in a different color forming a rainbow spectrum around the brain

Keep the purple brain glow, the dramatic lighting.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'forty-forty-twenty-rule': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "THE 40/40/20 RULE"
- Show 3 boxes with percentages: "40%" (green), "40%" (green), "20%" (red)
- Labels under: "List", "Offer", "Copy"

Keep the dark background, the comparison box style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'four-primal-needs': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "4 BUY BUTTONS"
- Replace the brand logos on the brain with 4 glowing red "BUY" buttons
- Add our monkey mascot (attached) reaching toward one of the buttons, looking like he's about to press it

Keep the purple brain glow, the dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'ocpb-formula': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the word to "O.C.P.B."
- Replace the Spotify logo with 4 colored blocks: O (orange), C (blue), P (green), B (purple)
- Each letter is a building block stacked together
- Keep the cursor pointing at it

Keep the minimal white background, the clean typography.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'sales-message-anatomy': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint to show a "SALES PAGE ANATOMY" diagram
- Show a sales page wireframe with labeled parts: HOOK, STORY, OFFER, PROOF, CTA
- Arrows pointing to each section like an anatomy chart

Keep the blue blueprint style, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'self-persuasion-architecture': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "They SELL themselves"
- Replace the person with our monkey mascot (attached) - he's looking smug and knowing, finger on chin
- Add a mirror reflection showing the monkey holding money

Keep the podcast quote style, the teal background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'structural-tension': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "TENSION SELLS"
- Replace the banana with a rubber band stretched to breaking point, about to snap
- Add golden sparks where the tension is highest

Keep the minimal clean style, white background.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'three-growth-levers': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "3 LEVERS = 3X REVENUE"
- Show 3 boxes with lever icons: "CUSTOMERS" (green up arrow), "FREQUENCY" (green up arrow), "AOV" (green up arrow)
- Each box showing improvement

Keep the dark background, the comparison style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'three-levels-of-change': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "3 LEVELS OF CHANGE"
- Replace the money pyramid with a 3-tier pyramid: Bottom = "BEHAVIOR", Middle = "BELIEF", Top = "IDENTITY"
- Add our monkey mascot (attached) climbing from bottom to top, reaching for the peak

Keep the dramatic style, money flying around.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'trust-architecture': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "The TRUST blueprint"
- Replace the car with a golden Greek temple with pillars labeled: PROOF, AUTHORITY, SOCIAL, GUARANTEE
- Replace the person doing "shh" gesture with Dan Kennedy (attached) pointing at the temple
- Arrow pointing to temple saying "the secret"

Keep the luxurious feel, dramatic composition.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.danKennedy],
  },

  'unique-mechanism': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the word to "mechanism"
- Replace the Spotify logo with a glowing golden gear/cog icon
- Keep the cursor pointing at it like discovering a secret

Keep the minimal white background, clean typography.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'master-key-framework': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "THE MASTER KEY"
- Replace the car with a giant ornate golden key with gems, glowing
- Replace the person with our monkey mascot (attached) - he's holding the key proudly, looking powerful
- Arrow pointing to the key saying "unlocks everything"

Keep the luxurious dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'rule-of-one': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the tweet text to "One reader. One idea. One offer. That's it."
- Replace the person with Gary Halbert (attached) looking wise and confident
- Keep the tweet card style

Keep the dark green background, the tweet format.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.garyHalbert],
  },

  'architecture-of-belief': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "BELIEF ARCHITECTURE"
- Show the brain with 3 layers labeled: FACT → FEELING → IDENTITY
- Arrows showing the progression from outer to inner brain

Keep the purple brain glow, dramatic lighting.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'copywriters-codex': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185309.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "The CODEX"
- Show images of famous copywriters: Gary Halbert, David Ogilvy, Eugene Schwartz
- Ancient book/scroll aesthetic with their faces

Keep the creative direction collage style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.garyHalbert, imageAssets.davidOgilvy, imageAssets.eugeneSchwartz],
  },

  // ============================================
  // ARTICLE-BASED LESSONS (15 lessons)
  // ============================================

  'best-private-agent': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "SHIPPING SPEED TEST"
- Left box (red): "AliExpress" with "30-60 DAYS" - bad
- Right box (green): "Private Agent" with "5-7 DAYS" - good
- Show package icons in each box

Keep the dark background, comparison box style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'stop-aliexpress': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "STOP USING ALIEXPRESS."
- Replace the person with a damaged AliExpress package with a big red X over it
- Make it look dramatic and urgent

Keep the red background, the bold dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'ltv-cheat-code': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "5% = 95% OF REVENUE"
- Replace the money pyramid with a tiny group of VIP customers (5%) sitting on a massive pile of money (95%)
- Crown on top of the money pile

Keep the money flying, dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'million-dollar-roadmap': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint to show a "ROADMAP TO $1M" path diagram
- Show milestones: $0 → $10K → $100K → $1M with icons at each stage
- X marks the spot at $1M with golden glow
- Replace the person with our monkey mascot (attached) pointing at the $1M destination

Keep the blue blueprint style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'geo-announcement-bar': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185613.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show TWO ANNOUNCEMENT BARS side by side:
- Left bar (BORING): "Free Shipping Available" - gray, generic, nobody cares
- Right bar (MAGIC): "FREE SHIPPING TO NEW YORK! 🗽" - personalized, glowing gold, "+67% CVR" badge
- A location PIN icon transforming the left into the right
- Our monkey mascot (attached) pointing at the personalized bar, excited
- Text: "ONE WORD = +67%"

Make it feel like you're revealing a SECRET one-word change.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'wishlist-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the word to "wishlist"
- Replace the Spotify logo with a glowing red heart/wishlist icon
- Add "+8% CVR" badge near it
- Cursor pointing at the heart like clicking to add

Keep the minimal white background, clean style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'email-vs-sms': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183115.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: "EMAIL" with envelope icon and open rate "21%"
- Right side: "SMS" with phone icon and open rate "98%" (winner)
- Make SMS side glow green as the winner

Keep the split comparison layout.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.klaviyo],
  },

  'abandoned-cart-recovery': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185632.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show an ABANDONED SHOPPING CART in the center, items falling out, looking sad
- TWO ARMS reaching to save it:
- Left arm: "EMAIL" - slow, 60% recovery rate, weaker grip
- Right arm: "AI SMS" - fast, 85% recovery rate, GOLDEN strong grip, WINNER
- The SMS arm is clearly WINNING, pulling the cart back
- Text: "SAVE YOUR CARTS"
- Our monkey mascot (attached) driving the AI SMS arm like a rescue mission

Make it feel like a RESCUE OPERATION. SMS wins.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'pareto-law-ecommerce': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191745.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- DARK, dramatic, premium aesthetic
- Our monkey mascot (attached) in a POWERFUL pose above, like a puppet master
- He's controlling MONEY BAGS below with GOLDEN PUPPET STRINGS attached to his fingers
- The money bags represent customers - 5 small ones (95%) and 1 GIANT glowing one (5%)
- Text: "5% CONTROL 95%"
- The giant money bag is the whale customer, glowing gold
- Dark cinematic background with spotlight on the puppet master monkey

Make it feel like a dark revelation. Premium, powerful, controlling.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'whatsapp-support': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "DON'T USE WHATSAPP."
- Show WhatsApp logo with a big red X over it
- Add our monkey mascot (attached) doing a "stop" hand gesture, serious face

Keep the red background, dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'meta-attribution-test': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185649.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show Meta logo wearing a PINOCCHIO NOSE - the nose is growing!
- Left side: "META SAYS: 33% ROAS" with suspicious eyes emoji
- Right side: "REALITY: 100% ROAS" - revealing the HIDDEN 67%
- Triple Whale logo (attached) as the truth-detector revealing the lie
- Text: "IS META LYING?"
- Our monkey mascot (attached) holding a magnifying glass, investigating

Make it feel like you're EXPOSING a secret. Meta isn't telling the full story.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.tripleWhale, imageAssets.monkey],
  },

  'post-purchase-surveys': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "Just ASK them."
- Replace the person with our monkey mascot (attached) - he's holding a clipboard with survey checkboxes, looking smart
- Add floating question marks and checkboxes around him

Keep the podcast quote style, teal background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'fonts-psychology': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183115.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: "CHEAP" in ugly Comic Sans font - looks amateur
- Right side: "PREMIUM" in elegant serif font - looks expensive
- Same product shown on both sides, different font makes it look different price

Keep the split comparison layout.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'brand-search-campaign': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the tweet to "Brand search campaigns = 18X ROAS. Why isn't everyone doing this?"
- Replace the person with our monkey mascot (attached) looking confident and knowing
- Add Google logo somewhere visible

Keep the tweet card style, dark green background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'swatch-variants': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184057.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a PREMIUM product configurator - sleek phone or watch on display
- One side shows boring text labels: "Red, Blue, Black" in plain text
- Other side shows BEAUTIFUL color swatches - glossy circles of actual colors
- Big badge: "+3.4% CVR" in green
- Text: "WORDS VS VISUALS"
- Make the visual swatches look irresistibly clickable

Premium product photography style. Clean, modern, Apple-esque.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  // ============================================
  // CRO & TESTING LESSONS (20 lessons)
  // ============================================

  'buy-now-button': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184815.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a "BUY NOW" button being DELETED - trash can icon, red X through it
- Our monkey mascot (attached) aggressively removing the button with a crowbar
- Money EXPLODING out from where the button was removed: "+15.9% REVENUE"
- Text: "DELETE THIS BUTTON"
- Counterintuitive visual - removing something = more money

Dark dramatic background. Make it feel rebellious and smart.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'rounded-button': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the word to "28px"
- Replace the Spotify logo with a perfectly rounded CTA button glowing
- Cursor pointing at the button corner showing the border-radius

Keep the minimal white background, clean style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'best-shopify-theme': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182608.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "THE 34.9% THEME"
- Show a ROYAL CROWN sitting on top of a Shopify store mockup - the winning theme
- Left side: pile of rejected themes (gray, crossed out, "2-3% CVR")
- Right side: THE WINNER theme glowing gold, wearing the crown, "34.9% CVR"
- Our monkey mascot (attached) placing the crown on the winner, looking like a judge
- Shopify logo visible

Make it feel like a CORONATION. The best theme being crowned.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.shopify, imageAssets.monkey],
  },

  'coupon-leaking': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "YOUR PROFIT IS LEAKING."
- Show a bucket with money/coins falling out through holes
- Honey browser extension logo floating nearby as the villain
- Add our monkey mascot (attached) trying to plug the holes, looking stressed

Keep the red background, dramatic urgent style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'gillette-model': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182640.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a TRAP - beautiful shiny razor handle in the center looking cheap ($2)
- MONEY STRINGS attached to the razor, leading to EXPENSIVE blade refills stacked like gold bars
- Our monkey mascot (attached) as the mastermind behind the trap, rubbing hands together, evil genius grin
- Text: "THE $2 TRAP"
- Small pile of razor blades = mountain of money

Make it feel like you're revealing the GENIUS behind the business model.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'best-niches-2026': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "2026 BEST NICHES"
- Replace the car with a treasure chest overflowing with golden niche icons (pet, beauty, fitness)
- Replace the person with our monkey mascot (attached) - he's looking through a telescope at the treasure, doing "shh" gesture
- Arrow pointing to chest saying "the gold"

Keep the luxurious dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'two-meta-rules': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182718.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show TWO MASSIVE GOLDEN GATES - the only path to Meta success
- Gate 1: "SPECIAL ENOUGH" with sparkle icon
- Gate 2: "NOT TOO SPECIFIC" with target icon
- Products trying to pass through - some getting REJECTED (red X), some PASSING (green check)
- Meta logo glowing at the end of the path
- Our monkey mascot (attached) as the gatekeeper, arms crossed, deciding who passes

Make it feel EXCLUSIVE. These are the 2 rules that decide if you win or lose.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'pinned-comment-cac': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the tweet to "Pinned comments dropped my CAC by 23%. Here's the exact template..."
- Replace the person with our monkey mascot (attached) looking clever and secretive
- Add a pin 📌 icon near the tweet

Keep the tweet card style, dark green background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'mastercard-psychology': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185309.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "TRUST BADGES"
- Show collage of payment logos: Visa, Mastercard, Amex, PayPal
- Add secure checkout icons and trust badges
- Premium editorial style

Keep the creative direction collage layout.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.mastercard],
  },

  'formula-to-sell': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the tweet to "Value = (Dream × Likelihood) ÷ (Time × Effort). That's it. That's the formula."
- Replace the person with Alex Hormozi (attached) looking intense
- Add equation symbols floating around

Keep the tweet card style, dark green background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.alexHormozi],
  },

  'choose-products': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint to show "2 PRODUCT RULES" checklist
- Show funnel diagram: Many products → Filter → 2 checkmarks → Winners
- Add golden checkmark icons

Keep the blue blueprint style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'gary-halbert-secret': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "Find a STARVING crowd"
- Replace the person with Gary Halbert (attached) looking wise and legendary
- Add hungry crowd silhouettes reaching with money in the background

Keep the podcast quote style, teal background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.garyHalbert],
  },

  'pet-rock-story': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182823.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a STUPID GRAY ROCK in the center - literally just a rock
- The rock is wearing a tiny GOLDEN CROWN and sitting on a THRONE made of $100 bills
- Money raining down around it like confetti
- Text: "$30,000,000" with arrow pointing to the rock
- Small text: "from a rock."
- Our monkey mascot (attached) bowing down to the rock, looking completely baffled

Make it ABSURD. The contrast between worthless rock and massive money is the joke.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'starbucks-ltv': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182912.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a SINGLE Starbucks coffee cup in the center, GLOWING like it's made of gold
- Above the cup: "$14,099" in massive bold letters
- The cup has golden aura/rays emanating from it
- Show a timeline below: "1 coffee → 2 coffees → 1000 coffees → $14,099"
- Starbucks logo (attached) prominently displayed
- Our monkey mascot (attached) holding the cup, looking at it like it's a magic money printer

Make the viewer understand: ONE customer = $14,099 lifetime value.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.starbucks, imageAssets.monkey],
  },

  'killer-headlines': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "80% is the HEADLINE"
- Replace the person with Dan Kennedy (attached) looking wise and authoritative
- Add floating newspaper headline snippets in background

Keep the podcast quote style, teal background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.danKennedy],
  },

  'two-dirty-tricks': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "2 DIRTY TRICKS"
- Replace the car with a magician's top hat with golden sparkles coming out
- Replace the person with our monkey mascot (attached) - he's doing a "shh" gesture wearing a magician cape
- Arrow pointing to the hat saying "the secrets"

Keep the luxurious dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'golden-lookalike': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183014.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a GOLDEN TARGET/BULLSEYE in the center - this is the golden audience
- Around the target: scattered gray/regular audience dots (messy, expensive)
- In the center gold zone: concentrated golden dots (your whales, cheap to acquire)
- Text: "THE 5% GOLDMINE"
- Meta logo (attached) floating
- Numbers contrast: "$30 CAC" on the outside gray zone, "$8 CAC" in the golden center
- Our monkey mascot (attached) with a golden bow and arrow, aiming at the bullseye

Make it feel like you're revealing a SECRET targeting hack.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'cbo-vs-abo': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183047.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show TWO BOXING GLOVES in an epic face-off
- Left glove (BLUE): "CBO" - automated, AI-controlled, "SCALING" written on it
- Right glove (RED): "ABO" - manual control, precision, "TESTING" written on it
- Meta logo in the center between them
- Text at top: "THE FIGHT YOU'RE GETTING WRONG"
- Our monkey mascot (attached) as the referee, whistle in mouth, ready to call the winner

Make it feel like an EPIC BATTLE. Two strategies going head to head.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'geo-personalization': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183157.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a WORLD MAP with glowing location pins dropping onto it
- Each pin has a personalized message: "Free Shipping to NEW YORK", "Hey LONDON!", "SYDNEY Special"
- The pins are GOLDEN and landing with impact sparkles
- Text: "+67% CVR" in massive letters
- Our monkey mascot (attached) dropping the pins from above like a targeting god, looking strategic

Make it feel like PRECISION TARGETING. Location = conversions.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'no-one-cares': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "No one CARES about you."
- Replace the person with our monkey mascot (attached) - looking brutally honest, arms crossed
- Spotlight only on him, everything else dark

Keep the podcast quote style, teal background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  // ============================================
  // PSYCHOLOGY OF SALES (25 lessons)
  // ============================================

  'autopilot-sale': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "AUTOPILOT MODE"
- Replace the brand logos with: Shopify logo, money bag icon, "BUY NOW" button
- Keep the brain visual with cables plugging in

Keep the purple brain glow, dramatic lighting.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'borrowed-trust': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181654.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "BORROWED TRUST" in bold white
- Replace the people with Robert Cialdini (attached) on one side
- On the other side, add our monkey mascot (attached) in a doctor's white coat with stethoscope, looking trustworthy and authoritative
- Between them, floating badges: "PhD", "Expert", "Authority"

Keep the professional podcast interview style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.robertCialdini, imageAssets.monkey],
  },

  'herd-instinct': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "Follow the HERD"
- Replace the person with Rory Sutherland (attached) looking knowing
- Add silhouettes of crowd following arrows in the background

Keep the podcast quote style, teal background.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.rorySutherland],
  },

  'gift-that-sells': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "THE FREE GIFT TRICK"
- Replace the car with a golden gift box with ribbons and sparkles
- Replace the person with our monkey mascot (attached) offering the gift, looking generous
- Arrow pointing to gift saying "reciprocity"

Keep the luxurious dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'micro-yes-mastery': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183235.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a DOMINO CHAIN reaction - small "yes" dominos knocking over increasingly LARGER ones
- First domino: tiny "yes" (newsletter signup)
- Middle dominos: growing "YES" (add to cart, enter email)
- Final MASSIVE domino: "BUY NOW" crashing down into a pile of money
- Text: "THE YES LADDER"
- Our monkey mascot (attached) at the beginning, flicking the first tiny domino with one finger, smirking

Make it feel INEVITABLE. Small yeses lead to the BIG yes.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'authority-over-hope': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183322.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: WEAK figure with crossed fingers, praying gesture, "please buy..." energy, GRAY and pathetic
- Right side: POWERFUL figure standing like a general, commanding presence, pointing finger saying "BUY.", GOLDEN glow
- The authority side has money flowing toward it, the hope side is empty
- Text: "LEADERS DON'T BEG"
- Our monkey mascot (attached) on the authority side, wearing a crown, looking commanding

Make the contrast BRUTAL. Hope = weakness. Authority = power.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'certainty-transfer': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183933.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Keep the two brain comparison exactly the same (gray vs colorful)
- Change labels to "DOUBT" (left, gray) and "CERTAIN" (right, colorful)
- Add our monkey mascot (attached) between the brains, transferring energy from right to left with his hands glowing
- Add "CERTAINTY TRANSFER" text at top

Keep the black background, the medical brain imagery, the scientific look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'conviction-architecture': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the blueprint to show "CONVICTION ARCHITECTURE"
- Show 3-tier pyramid blueprint: "LOGIC" base → "EMOTION" middle → "IDENTITY" top (glowing)
- Replace the person with Robert Cialdini (attached) drawing the pyramid like an architect

Keep the blue blueprint style, professional teaching vibe.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.robertCialdini],
  },

  'digital-pause-power': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185933.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show our monkey mascot (attached) with arms crossed, intense confident stare at the camera
- MASSIVE speech bubble with just "..." (three dots) - nothing else
- The silence is DEAFENING - visual tension in the air
- Text below: "SILENCE SELLS"
- Dark dramatic background, spotlight on the monkey
- The vibe is: I said nothing, and they bought everything

Make the PAUSE feel POWERFUL. The silence is the strategy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'fomo-engineering': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "SOLD OUT."
- Show an empty shelf with "SOLD OUT" red tag - last item being grabbed by a hand
- Add our monkey mascot (attached) looking stressed, reaching for the last item, FOMO in his eyes

Keep the red background, urgent dramatic energy. Make it feel like PANIC.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'framing-effect-mastery': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183420.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show IDENTICAL DIAMOND in two different settings:
- Left: Diamond on newspaper, harsh lighting, "$50" price tag, looks like costume jewelry
- Right: SAME diamond on black velvet, spotlight, "$50,000" price tag, looks priceless
- The diamonds are LITERALLY the same size - but perception is everything
- Text: "PERCEPTION IS PRICE"
- Daniel Kahneman (attached) in the corner with knowing expression

Make viewer realize: THE FRAME changes EVERYTHING. Same thing, 1000x price.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.danielKahneman],
  },

  'identity-marketing': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "BECOME."
- Show transformation: weak silhouette → superhero silhouette with cape, golden glow
- Replace the person with our monkey mascot (attached) mid-transformation, half normal half superhero, cape flowing
- Arrow pointing to transformation saying "identity sells"

Keep the luxurious dramatic style. Make it feel like EVOLUTION.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'marketers-delusion': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "THE DELUSION."
- Show a blindfolded figure walking toward a cliff edge, warning signs everywhere
- Dramatic danger energy - they can't see the drop

Keep the red background, make it feel like IMMINENT DISASTER.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'pain-escalation-ladder': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183640.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a STAIRCASE made of PAIN LEVELS going upward:
- Step 1 (bottom): "Mild annoyance" - small flame
- Step 2: "Frustration" - medium flame
- Step 3: "Burning problem" - large flame
- Step 4 (top): "URGENT PAIN" - EXPLOSION of fire
- At the top of the stairs: a door labeled "SOLUTION" with golden light behind it
- Money flows MORE as pain increases - pain = purchase urgency
- Our monkey mascot (attached) guiding someone UP the stairs with a torch

Make it feel STRATEGIC. Escalate pain, provide relief.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'telescope-flip': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183707.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a TELESCOPE being FLIPPED/ROTATED in the center - dramatic rotation motion
- Left: "WRONG WAY" - person looking through small end, sees TINY blurry world, looks confused
- Right: "RIGHT WAY" - our monkey mascot (attached) looking through big end, sees MASSIVE opportunity/treasure
- Arrow showing the 180° flip
- Text: "97% HOLD IT WRONG"
- The correct side shows GOLD and opportunity, the wrong side shows confusion

Make it feel like a REVELATION. The simple flip changes everything.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'trust-blueprint': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184924.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a SHIELD being BUILT in layers:
- Layer 1 (foundation): "CREDIBILITY" - solid base
- Layer 2: "AUTHORITY" - badge icon
- Layer 3: "PROOF" - star reviews
- Layer 4 (top): "TRUST" glowing golden crown
- Robert Cialdini (attached) standing next to the completed shield like an architect presenting his masterpiece
- Text: "BUILD INSTANT TRUST"

Make it feel like you're learning the SECRET architecture of trust.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.robertCialdini],
  },

  'value-perception-lever': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to "PRICE IS A LIE"
- Add a visual of a small golden lever on the left, and a MASSIVE boulder labeled "$$$" being lifted on the right
- Show the lever multiplying force: "1x" → "100x" visual
- Add our monkey mascot (attached) casually pushing the tiny lever with one finger, looking smug while the massive value boulder rises

Keep the podcast quote style, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'three-brains-wallet': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183933.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Keep the brain comparison format but show 3 SECTIONS in the colorful brain:
  - REPTILE BRAIN (bottom) in RED - labeled "SURVIVAL" - puppet strings going to a wallet
  - EMOTIONAL BRAIN (middle) in ORANGE - labeled "FEEL" - puppet strings going to a wallet
  - LOGICAL BRAIN (top) in BLUE - labeled "THINK" - thin strings, wallet barely moves
- One big wallet at bottom with 3 sets of puppet strings controlling it
- Text: "WHO CONTROLS THE WALLET?"
- The reptile section has the THICKEST strings (it wins)

Keep the brain MRI style, the scientific look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.danielKahneman],
  },

  'pre-suasion-hack': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "WON BEFORE YOU STARTED"
- Show a luxurious chess board with the OPPONENT'S KING already toppled - game over before it began
- Replace any person with Robert Cialdini (attached) - sitting confidently behind the chess board, fingers steepled, knowing smile
- Add subtle "pre-suasion" text at the bottom

Keep the dark luxury style, the secretive elite feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.robertCialdini],
  },

  'pattern-interrupts': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "STOP SCROLLING."
- Replace the person with our monkey mascot (attached) - massive STOP HAND gesture, palm facing camera, urgent expression
- His palm is GLOWING RED with energy radiating outward
- Add attention lines/rays exploding from his hand
- Everything else should feel frozen mid-scroll

Keep the red dramatic background, the paper-cut effect.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'dopamine-blueprint': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "ADDICTIVE BY DESIGN"
- Replace the brand logos on the brain with DOPAMINE MOLECULES - small pink/purple molecular structures
- Add pleasure/reward cables plugged INTO the brain - colorful wires leading to a "REWARD" button
- Add our monkey mascot (attached) with a mischievous grin, finger hovering over a giant "DOPAMINE" button
- Small text: "Create addictive loops"

Keep the purple brain glow, the neuroscience style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'anti-sell-mastery': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the tweet text to: "I told them NOT to buy. They bought 3x more."
- Make it look like a viral marketing insight tweet
- Replace any avatar with Gary Halbert (attached) - looking clever, knowing something
- Add small icons: ❌ "DON'T BUY" crossed out, ✓ "SOLD OUT" badge
- Engagement metrics showing high virality

Keep the tweet style, the social proof feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.garyHalbert],
  },

  'decoy-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184957.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show THREE POPCORN BUCKETS (movie theater classic):
- SMALL: $3 - tiny, pathetic
- MEDIUM: $6.50 - awkward size, "THE TRAP" written above with arrow, crossed out
- LARGE: $7 - MASSIVE, glowing gold, "+43% SALES" badge
- Customer eyes drawn to the LARGE because the medium makes it look like a deal
- Our monkey mascot (attached) as the movie theater vendor, pointing at the large with a wink
- Text: "THE USELESS OPTION"

Make it feel like you're revealing the psychology TRICK behind pricing.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'precise-price-trick': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: "$5,000" in RED, crossed out, looks "round and suspicious"
- Right side: "$4,988" in GREEN, glowing, looks "precise and calculated"
- Arrow pointing from $5,000 → $4,988 with text "FEELS CHEAPER"
- Small brain icon showing the psychology behind it
- Text at top: "THE $12 THAT MAKES MILLIONS"

Keep the minimal word + icon style, the clean impact.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'paradox-of-choice': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185241.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show TWO TABLES with JAM JARS:
- Left table: 24 jars CRAMMED together chaotically, person standing frozen, brain exploding, "0% BOUGHT"
- Right table: 6 jars neatly displayed, person confidently grabbing one, "$$$" flying, "+340% SALES"
- Sheena Iyengar (attached) in lab coat presenting the experiment results
- Text: "THE JAM EXPERIMENT"
- Our monkey mascot (attached) at the 6-jar table happily shopping

Make it feel like a SCIENTIFIC BREAKTHROUGH. Fewer options = more sales.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.sheenaIyengar, imageAssets.monkey],
  },

  // ============================================
  // PRIMAL PLAYBOOK (10 lessons)
  // ============================================

  'forty-million-mistake': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "$40 MILLION MISTAKE"
- Replace the person with a CRACKED, DAMAGED Coca-Cola bottle (attached) - looking destroyed, weathered, crumbling
- Add flames/fire at the bottom licking upward
- Add a big red "-$40M" badge
- Red downward crash arrows in background

Keep the red dramatic background, the apocalyptic feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.cocaCola],
  },

  'fly-in-the-urinal': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185358.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a MAGNIFYING GLASS zooming in on a TINY FLY STICKER
- The fly is small but POWERFUL - arrows showing all attention focused on it
- Before/After split: "BEFORE" side messy, "AFTER" side perfectly clean
- "+80% ACCURACY" badge glowing
- Text: "THE $1 NUDGE"
- Our monkey mascot (attached) holding the magnifying glass, looking AMAZED at how something so small works so well

Make it feel like discovering a TINY detail with MASSIVE impact.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'thirty-two-violinist': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185420.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left: DIRTY SUBWAY - violinist in shadows, people rushing past ignoring, tip jar with "$32"
- Right: GRAND CONCERT HALL - SAME violinist in spotlight, standing ovation, orchestra, "$1,000,000 TICKETS SOLD"
- A DOTTED LINE connecting the two showing it's the SAME PERSON
- Text: "SAME VIOLIN. SAME MUSIC."
- Our monkey mascot (attached) in the audience of the concert hall, clapping

Make viewer realize: CONTEXT IS EVERYTHING. Same talent, wildly different results.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'invisible-influence': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "YOU CAN'T SEE IT"
- Replace the brand logos on the brain with GHOSTLY SHAPES - subtle patterns, colors, background elements floating INTO the brain
- The brain doesn't know it's being influenced - add question marks around it
- Add our monkey mascot (attached) behind the brain, secretly placing the influences, finger to lips "shhh" gesture

Keep the purple brain glow, the neuroscience style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'price-format-code': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: "$99.00" looking HEAVY, cluttered, the decimals weighing it down like anchors
- Right side: "$99" looking LIGHT, clean, floating, glowing green
- Arrow pointing from cluttered to clean: "FEELS 23% CHEAPER"
- Text at top: "KILL THE DECIMALS"

Keep the minimal word + icon style, the clean impact.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'cost-of-standing-still': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185507.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a person FROZEN like a statue, covered in cobwebs and dust
- Money is FLYING AWAY from them in all directions - $100 bills escaping
- A red timer/clock above showing time passing: "DAY 1... DAY 30... DAY 365..."
- Text: "-$30,000/YEAR OF WAITING"
- Our monkey mascot (attached) desperately trying to catch the flying money, reaching out

Make it feel URGENT. Every second you wait = money lost.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'unity-principle': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185549.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show TWO FIGURES far apart on opposite sides
- In the CENTER: the word "WE" in MASSIVE golden letters, glowing like a sun
- Golden lines/beams connecting the figures THROUGH the word "WE"
- The figures are being PULLED together by the word
- Robert Cialdini (attached) presenting this as his "7th principle"
- Text: "THE SECRET 7TH PRINCIPLE"

Make it feel like discovering the FINAL piece of the persuasion puzzle.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.robertCialdini],
  },

  'visual-priming': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183115.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left side: Same product on CHEAP background (white plastic, fluorescent lighting) - looks like $20
- Right side: SAME product on PREMIUM background (marble, soft lighting, velvet) - looks like $200
- Text at top: "SAME PRODUCT. 10X PRICE."
- Add price tags: "$20" on left (red), "$200" on right (green)
- The product is IDENTICAL - only the background changed

Keep the OLD vs NEW comparison layout, the split screen drama.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'objection-inversion': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the tweet to: "They said 'too expensive.' I said 'exactly.' They bought 2."
- Make it look like a viral sales wisdom tweet
- Add our monkey mascot (attached) as the avatar - wearing a black belt, looking wise
- Show an objection arrow coming IN, then being FLIPPED and redirected out as a "SOLD" arrow
- Engagement showing viral reach

Keep the tweet style, the social proof feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'primal-stimuli': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the text to "6 BUY BUTTONS"
- Replace the brand logos with 6 GLOWING RED BUTTONS on the brain - each labeled: SELF, CONTRAST, TANGIBLE, BEGINNING/END, VISUAL, EMOTION
- The brain is the REPTILE brain (primitive, rough texture)
- One button is being PRESSED and glowing bright - showing activation
- Add our monkey mascot (attached) with his finger hovering over one button, ready to press

Keep the purple brain glow, the neuroscience style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  // ============================================
  // CRO FLYWHEEL LESSONS (15 lessons)
  // ============================================

  'leaky-bucket-audit': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "THE $50,000 HOLE"
- Replace the money pyramid with a METAL BUCKET with VISIBLE HOLES - money pouring out through the holes
- Flashlight beam exposing one of the holes dramatically
- Money bills falling/leaking through each hole
- Add our monkey mascot (attached) with a flashlight, discovering the holes, shocked expression

Keep the dramatic money visual, the urgent feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'price-chunking-yesloop': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190004.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a SCARY PRICE "$597" as a massive mountain/wall blocking the path
- Then show it CRUMBLING into small chunks: "$1.99/day" stepping stones
- Customer walking easily across the small chunks toward "SOLD!"
- Our monkey mascot (attached) with a hammer, breaking the big price into chunks
- Text: "CHUNK IT = 3X AOV"
- Each chunk has "YES" written on it

Make the BIG price feel scary, but the chunks feel EASY.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'objection-destroyer': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to: "At first I thought it was too expensive... then I realized what I was REALLY paying for."
- Show an objection word "TOO EXPENSIVE" dissolving/transforming into "WORTH EVERY PENNY"
- The transformation happening in real-time visual
- Text at bottom: "The 7-word objection killer"

Keep the podcast quote style, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'product-page-anatomy': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change to a product page BLUEPRINT showing 5 labeled sections:
  1. HERO IMAGE (top) - glowing
  2. HEADLINE (trust hook)
  3. SOCIAL PROOF (reviews)
  4. BENEFITS (not features)
  5. CTA (buy button)
- Each element has an arrow pointing to it with conversion % impact
- Text at top: "THE 8% CONVERSION PAGE"
- Badge: "5 ELEMENTS"

Keep the blue blueprint background, the technical diagram style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'post-purchase-goldmine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "$40 → $120 (INSTANTLY)"
- Show an order confirmation page with a GLOWING "Thank You" that transforms into a golden upsell popup
- Money multiplying: $40 bill transforming into three $40 bills = $120
- The post-purchase moment is the GOLDMINE - show gold radiating from it
- Add our monkey mascot (attached) behind the popup, pulling a lever, looking mischievous

Keep the dramatic money flying, the multiplication visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'bottom-up-brand': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181805.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left: CORPORATE PYRAMID - cold, gray, executives at top, customers at bottom being CRUSHED
- Right: MOVEMENT - people holding flags, building UPWARD together, fire and passion, golden glow
- The movement side has 10x more people, energy, LIFE
- Text: "BUILD A MOVEMENT"
- Our monkey mascot (attached) leading the movement side, flag in hand, rallying the troops

Make the contrast BRUTAL. Corporations die. Movements live forever.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'halo-serial-position': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a STOPWATCH frozen at "0.05" seconds - this is all the time you have
- Lightning bolt striking at that moment - FLASH of first impression
- Split visual: One side shows "TRUST" forming instantly (green), other shows "DISTRUST" (red)
- Text at top: "YOU HAVE 0.05 SECONDS"
- Small brain icon showing the instant judgment

Keep the minimal word + icon style, the clean impact.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'ikea-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181840.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show an IKEA bookshelf being assembled - Allen key, screws, instructions visible
- The ASSEMBLED version is GLOWING with pride and love hearts around it
- Our monkey mascot (attached) proudly standing next to HIS creation, sweaty but triumphant, Allen key in hand
- Text: "I BUILT THIS = +63% VALUE"
- IKEA logo (attached) floating
- Price comparison: Pre-made "$100" vs Self-built "PRICELESS (to them)"

Make it feel like the JOY of creating something yourself.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.ikea, imageAssets.monkey],
  },

  'von-restorff-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a ROW of 7 identical gray circles
- ONE circle in the middle is BRIGHT GOLD and larger - impossible to ignore
- Big arrow pointing to the gold one: "THIS ONE"
- Text at top: "THE ISOLATION EFFECT"
- Everyone's attention (eye icons) focused on the gold one

Keep the minimal word + icon style, the clean impact.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'jakobs-law': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181904.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left: "CREATIVE" checkout page - confusing, unique, weird layout - person with question marks, looking LOST
- Right: "AMAZON STYLE" checkout - familiar, simple, Amazon-like - person breezing through, dollar signs flying
- Text: "STOP BEING UNIQUE"
- Amazon logo (attached) on the winning side as the template to copy
- Our monkey mascot (attached) dragging people from the confusing side to the familiar side

Make it feel COUNTERINTUITIVE. Creativity kills conversions.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.amazon, imageAssets.monkey],
  },

  'gaze-direction': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the quote to: "Their eyes follow YOUR eyes"
- Show a face on one side LOOKING at a "BUY NOW" button
- GAZE LINES drawn from the face's eyes to the button
- The viewer's eyes naturally follow the same path
- Text at bottom: "The gaze hack"
- Add our monkey mascot (attached) at the button, eyes making contact with the viewer

Keep the podcast quote style, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'five-second-test': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181933.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a STOPWATCH frozen at "5" in the center - dramatic, ticking
- Left: "CONFUSING" site - visitor with "???" thought bubble, bouncing away, RED X
- Right: "CLEAR" site - visitor with "I NEED THIS!" thought bubble, clicking buy, GREEN check
- Text: "5 SECONDS. WIN OR LOSE."
- Our monkey mascot (attached) holding the stopwatch like a referee, ready to make the call

Make it feel like a RACE. You have 5 seconds to make them understand.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'speed-equals-trust': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182129.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a LOADING BAR stuck at 99% - frozen, buffering, spinning wheel of death
- Money is POURING OUT underneath the loading bar like a broken pipe
- "-$1.7 BILLION" in red, dramatic letters
- Small text: "every 0.1 second = -1% sales"
- Amazon logo (attached) as the source of this data
- Our monkey mascot (attached) trying to plug the leak, money escaping through his fingers

Make it feel like EVERY MILLISECOND COSTS YOU MONEY.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.amazon, imageAssets.monkey],
  },

  'imperceptible-nudge': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show Amazon's ORANGE "Add to Cart" button GLOWING with power
- Text at top: "THE $200 MILLION COLOR"
- Color psychology spectrum showing orange = urgency + action
- Amazon logo (attached)
- The button looks like it's RADIATING money/conversions

Keep the minimal word + icon style, the clean impact.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.amazon],
  },

  'cognitive-load-trap': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183933.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Left brain: TANGLED, complex pathways - red, stressed, overloaded, "TOO HARD" label
- Right brain: SMOOTH, simple pathways - green, calm, flowing, "EASY" label
- Arrow showing customers choosing the EASY path every time
- Text at top: "COMPLEXITY KILLS CONVERSIONS"

Keep the brain MRI style, the scientific look.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  // ============================================
  // LUXURY & BRAND LESSONS (25 lessons)
  // ============================================

  'placebo-product': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "YOUR PRODUCT IS A PLACEBO"
- Show a premium golden PILL floating in a spotlight
- Reality-bending visual around it - the pill is CHANGING perception
- Text: "Perception becomes reality"
- The pill is glowing with belief/expectation energy

Keep the dark luxury style, the secretive elite feel.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'information-asymmetry': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "HIDE TO SELL MORE"
- Show a Prada bag (attached) partially hidden behind velvet curtain - only a glimpse visible
- The mystery makes it MORE desirable
- Shadow and intrigue around the hidden product
- Text: "Information asymmetry = status"

Keep the dark luxury style, the secretive elite feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.prada],
  },

  'visual-shorthand': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show toothpaste tube with colorful STRIPES coming out
- Arrow pointing to the stripes: "THIS = PREMIUM"
- Text at top: "WHY STRIPES SELL"
- Brain icon showing the shortcut: stripes → quality → trust → buy
- The stripes are the visual shorthand for premium

Keep the minimal word + icon style, the clean impact.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'radical-honesty-play': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the tweet to: "Yes, this is marketing. Yes, I want your money. Yes, you'll love it anyway."
- Add a WINK emoji - inside joke energy
- The honesty is DISARMING
- Engagement showing massive virality - people respect the honesty
- Add our monkey mascot (attached) as the avatar - winking, confident smirk

Keep the tweet style, the social proof feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'hermes-doctrine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Change the headline to "2 YEAR WAITLIST"
- Show Hermès Birkin bag (attached) under a GLASS MUSEUM DOME - protected like crown jewels
- Velvet rope barrier in front - you can't just BUY it
- The bag is GLOWING with golden light like a sacred artifact
- Text: "Why rejection creates desire"
- Hermès logo floating elegantly

Keep the dark luxury style, the secretive elite feel.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.hermes],
  },

  'hero-mechanism': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show TWO RINGS side by side in DRAMATIC contrast:
- Left: CHEAP $12 knockoff fitness ring on cheap plastic, harsh fluorescent lighting, looks like junk
- Right: PREMIUM Oura Ring on black velvet, golden spotlight, looks like jewelry worth $1000
- Both track the same things - but one is WORTHLESS, one is DESIRED
- Text: "$12 vs $399"
- Oura logo (attached) on the premium side glowing
- Our monkey mascot (attached) looking confused at why people pay 30x more

Make it feel like a REVELATION. Same function, wildly different value.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.oura, imageAssets.monkey],
  },

  'scammer-playbook-good': {
    template: 'tech-ui',
    concept: `TEXT: "7 LEVERS" white bold
VISUAL: Control panel interface with 7 ethical switches/sliders, all positioned for good, dashboard style
BACKGROUND: Dark tech gradient
EXTRA: The Scammer's Playbook (used for good). 7 ethical persuasion levers.`,
    images: [],
  },

  'us-vs-them': {
    template: 'versus',
    concept: `TEXT: "DAVID vs GOLIATH" white bold dramatic
VISUAL: Tiny figure with slingshot facing massive giant, underdog energy, tribal war paint
BACKGROUND: Dark dramatic arena lighting
EXTRA: Create tribal identity through enemies. The David vs Goliath play.`,
    images: [],
  },

  'brand-universe': {
    template: 'illustrated-char',
    concept: `TEXT: "the universe." white italic elegant
VISUAL: Illustrated snow globe containing entire world/universe, brand world-building visual
BACKGROUND: Dark space with stars
EXTRA: Create universes, not products. Build a world, not just a store.`,
    images: [],
  },

  'product-to-identity': {
    template: 'face-morph',
    concept: `TEXT: "become." white lowercase massive
VISUAL: Product package morphing/transforming into a person's silhouette, identity transformation
BACKGROUND: White with subtle gradient
EXTRA: Transform commodities to identity purchases. You become what you buy.`,
    images: [],
  },

  'commodity-escape': {
    template: 'product-table',
    concept: `TEXT: "$0.50 → $6" green bold with arrow
VISUAL: Coffee beans on left transforming into premium Starbucks cup on right, both on wooden table, Starbucks logo floating
BACKGROUND: White grid top, warm wood bottom
EXTRA: How Starbucks charges $6 for $0.50 coffee. The commodity escape.`,
    images: [imageAssets.starbucks],
  },

  'myth-and-urgency': {
    template: 'dramatic-quote',
    concept: `TEXT: "NOW." white bold massive
VISUAL: Hourglass with sand running out, mythical story elements swirling around it
BACKGROUND: Dark dramatic gradient
EXTRA: Scarcity + story creates irresistible desire. Manufacturing urgency.`,
    images: [],
  },

  'value-ladder': {
    template: 'product-table',
    concept: `TEXT: "HIDDEN MENU" gold lowercase elegant
VISUAL: Velvet rope parting to reveal secret VIP tier, golden ladder ascending, Rolex logo floating
BACKGROUND: Dark luxurious gradient, warm wood bottom
EXTRA: Secret tiers that create aspiration. VIP exclusivity.`,
    images: [imageAssets.rolex],
  },

  'box-worth-300': {
    template: 'product-table',
    concept: `TEXT: "$300" gold bold
VISUAL: Empty Tiffany blue box open on wooden table, nothing inside, box glowing with value
BACKGROUND: White grid top, warm wood bottom
EXTRA: Tiffany's packaging IS the product. Box worth more than contents.`,
    images: [imageAssets.tiffany],
  },

  'story-taste-experiment': {
    template: 'brand-collage',
    concept: `TEXT: "story changes taste." white lowercase elegant
VISUAL: Retro editorial collage - same wine bottle with different story labels, taste perception visual
BACKGROUND: White with texture
EXTRA: Your story literally alters how products taste. Narrative power.`,
    images: [],
  },

  'scarcity-calendar': {
    template: 'product-table',
    concept: `TEXT: "1 PER YEAR" yellow bold
VISUAL: Rainbow Le Creuset Dutch ovens on wooden table, most with "SOLD OUT" tags, one color available
BACKGROUND: White grid top, warm wood bottom
EXTRA: Limited colors create collectors. Le Creuset scarcity engine.`,
    images: [imageAssets.leCreuset],
  },

  'anchor-moments': {
    template: 'product-table',
    concept: `TEXT: "$20K → $200" green bold with arrow
VISUAL: Expensive bag ($20K tag) next to polo shirt ($200 tag) on wooden table, polo looks cheap in comparison, Ralph Lauren logo
BACKGROUND: White grid top, warm wood bottom
EXTRA: $20K bag makes $200 polo feel cheap. Anchor moments psychology.`,
    images: [imageAssets.ralphLauren],
  },

  'irrational-loyalty': {
    template: 'brain-cables',
    concept: `TEXT: "logic dies." white lowercase elegant
VISUAL: Brain with heart overtaking the logical section, cables disconnecting from reason, emotional override
BACKGROUND: Dark gradient
EXTRA: Once identity forms, logic dies. The Pizza Test & Sock Test.`,
    images: [],
  },

  'reciprocity-engine': {
    template: 'illustrated-char',
    concept: `TEXT: "+42%" green bold
VISUAL: Illustrated character giving gift, receiving money back in a loop, reciprocity flywheel visual
BACKGROUND: White with grid texture
EXTRA: Why giving away free samples increased sales 42%. Give to get.`,
    images: [],
  },

  'gucci-short-termism': {
    template: 'versus',
    concept: `TEXT: "DYING" red vs "FOREVER" gold
VISUAL: Gucci logo fading/dying on left vs Hermès logo strong and timeless on right
BACKGROUND: Split - dark decaying left, golden eternal right
EXTRA: Fashion chases trends. Luxury chases timelessness. Why Gucci is dying.`,
    images: [imageAssets.gucci, imageAssets.hermes],
  },

  'ethical-persuasion-compass': {
    template: 'single-object',
    concept: `TEXT: "the line." white lowercase elegant
VISUAL: Golden compass with ethics needle pointing to the right direction, moral boundary visual
BACKGROUND: White clean
EXTRA: The ethical line between persuasion and manipulation. Magic show test.`,
    images: [],
  },

  'two-worlds-mastery': {
    template: 'split-screen',
    concept: `TEXT: "TWO WORLDS" white bold
VISUAL: Split - analytical performance marketing dashboard (left) vs creative brand storytelling (right)
BACKGROUND: Blue analytical left, warm creative right
EXTRA: Performance marketing vs brand building. Master both worlds.`,
    images: [],
  },

  'race-to-bottom-escape': {
    template: 'growth-curve',
    concept: `TEXT: "KILLING YOU" red bold dramatic
VISUAL: ROAS line going UP while profit line going DOWN, scissors cutting the profit line
BACKGROUND: White with grid overlay
EXTRA: You're winning every battle and losing the war. ROAS is killing your business.`,
    images: [],
  },

  'founder-operating-system': {
    template: 'product-table',
    concept: `TEXT: "4 TRAITS" gold bold
VISUAL: Golden crown with 4 distinct points on wooden table, each point representing a trait, legendary aura
BACKGROUND: Dark gradient, warm wood bottom
EXTRA: What separates iconic founders from the rest. The 4 traits.`,
    images: [],
  },

  '13800-percent-effect': {
    template: 'growth-curve',
    concept: `TEXT: "13,800%" green massive bold
VISUAL: Exponential compound curve shooting upward, small 10% improvements stacking into massive gains
BACKGROUND: White with grid overlay
EXTRA: Small improvements compound into massive advantages. 10% better = 13,800% better.`,
    images: [],
  },

  // ============================================
  // META ADS 2026 (15 lessons)
  // ============================================

  'meta-three-second-hook': {
    template: 'phone-mockup',
    concept: `TEXT: "3 SECONDS" yellow bold ALL CAPS
VISUAL: iPhone with dramatic "00:03" timer on screen, Meta logo floating above, attention lines
BACKGROUND: White clean
EXTRA: Meta judges your creative in the first 3 seconds. The 3-second hook rule.`,
    images: [imageAssets.meta],
  },

  'meta-70-20-10-rule': {
    template: 'tech-ui',
    concept: `TEXT: "70/20/10" white bold
VISUAL: Dashboard with three bars - 70% proven (green), 20% iteration (yellow), 10% wild (red), pie chart
BACKGROUND: Dark tech gradient with grid
EXTRA: 70% proven, 20% iteration, 10% wild experiments. The creative rule.`,
    images: [imageAssets.meta],
  },

  'meta-ga4-integration': {
    template: 'tech-ui',
    concept: `TEXT: "GA4 + META" white bold
VISUAL: Two data streams (GA4 and Meta) merging into one powerful signal, tech pipeline visual
BACKGROUND: Dark tech gradient
EXTRA: Feed Meta high-quality signals via GA4. Signal quality matters.`,
    images: [imageAssets.meta, imageAssets.google],
  },

  'meta-1-1-x-structure': {
    template: 'tech-ui',
    concept: `TEXT: "1-1-X" white bold massive
VISUAL: Flowchart diagram: 1 Campaign → 1 Ad Set → X Creatives (expanding), clean architecture visual
BACKGROUND: White with subtle grid
EXTRA: 1 campaign, 1 ad set, X creatives. Structure simplicity wins.`,
    images: [imageAssets.meta],
  },

  'meta-auction-formula': {
    template: 'product-table',
    concept: `TEXT: "Bid × EAR × Quality" yellow bold equation
VISUAL: Mathematical formula written on vintage chalkboard sitting on wooden table, Meta logo floating
BACKGROUND: Dark gradient, warm wood bottom
EXTRA: Total Value = Bid × Estimated Action Rate × Quality. The Meta auction formula.`,
    images: [imageAssets.meta],
  },

  'meta-controls-vs-suggestions': {
    template: 'versus',
    concept: `TEXT: "HARD vs SOFT" white bold
VISUAL: Brick wall (controls/hard boundaries) vs soft pillow (suggestions/soft signals), Meta logo in center
BACKGROUND: Split - solid left, soft right
EXTRA: Hard boundaries vs soft signals in targeting. Controls vs Suggestions.`,
    images: [imageAssets.meta],
  },

  'meta-creative-ecosystem': {
    template: 'illustrated-char',
    concept: `TEXT: "50 ADS" white bold massive
VISUAL: Illustrated phone exploding with grid of 50 ad thumbnails, creative variety visual, Meta logo
BACKGROUND: Dark gradient (Kurzgesagt style)
EXTRA: Build 20-50 meaningfully different ads. The creative ecosystem.`,
    images: [imageAssets.meta],
  },

  'meta-capi-pixel-setup': {
    template: 'tech-ui',
    concept: `TEXT: "CAPI + PIXEL" white bold
VISUAL: Two tracking streams (browser Pixel + server CAPI) merging, dual signal visual, tech diagram
BACKGROUND: Dark tech gradient
EXTRA: Dual tracking is now mandatory. CAPI + Pixel setup.`,
    images: [imageAssets.meta],
  },

  'meta-andromeda': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show META LOGO in the center TRANSFORMING into a COSMIC AI BRAIN
- Andromeda galaxy swirling around it - purple, cosmic, powerful
- Neural network lines flowing from the brain like tentacles
- Text: "THE ANDROMEDA ERA"
- Meta logo (attached) morphing into something larger, more intelligent
- Our monkey mascot (attached) looking up at the cosmic brain in awe, realizing the game has changed

Make it feel COSMIC. Meta's AI is becoming something bigger.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'creative-volume-2026': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail, but with these changes:
- Show a FACTORY/CONVEYOR BELT producing AD CREATIVES at HIGH SPEED
- Creatives are flying off the belt: 40, 50, 60, 70 per week
- Stack of creatives piling up like money
- Text: "40-70 CREATIVES/WEEK"
- Meta logo (attached) as the machine that needs to be FED
- Our monkey mascot (attached) operating the machine, pressing buttons, working hard

Make it feel like a PRODUCTION LINE. Volume is the new game.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'product-reviews-test': {
    template: 'split-screen',
    concept: `TEXT: "REVIEWS?" white bold
VISUAL: Split - product page WITHOUT reviews (left) vs WITH reviews and stars (right), A/B test visual
BACKGROUND: Split - bare left, rich right
EXTRA: Do reviews actually increase conversions? The A/B test.`,
    images: [],
  },

  'ascension-ladder': {
    template: 'illustrated-char',
    concept: `TEXT: "ascend." gold lowercase elegant
VISUAL: Illustrated customer climbing golden value ladder, each rung = higher ticket, money floating around top
BACKGROUND: White with gradient
EXTRA: Move customers up the value chain. The ascension ladder.`,
    images: [],
  },

  'brain-friendly-ux': {
    template: 'brain-cables',
    concept: `TEXT: "brain first." white lowercase elegant
VISUAL: Brain with smooth, easy pathways highlighted in green, complex paths blocked in red
BACKGROUND: White clean
EXTRA: Design for how the brain actually works. Cognitive design.`,
    images: [],
  },

  'brand-moat': {
    template: 'product-table',
    concept: `TEXT: "THE MOAT" gold bold
VISUAL: Castle surrounded by water/moat on wooden table, brand shield on castle, defensive walls
BACKGROUND: Dark gradient, warm wood bottom
EXTRA: Build defensible competitive advantages. The brand moat.`,
    images: [],
  },

  'brand-promise-code': {
    template: 'minimal-text',
    concept: `TEXT: "promise." gold lowercase elegant, massive
VISUAL: Minimal - just the word with subtle handshake icon behind it, trust energy
BACKGROUND: White vast expanse
EXTRA: Craft promises that convert. The brand promise code.`,
    images: [],
  },

  // ============================================
  // GOOGLE ADS 2026 (20 lessons)
  // ============================================

  'google-highest-cpa-wins': {
    template: 'product-table',
    concept: `TEXT: "HIGHEST WINS" yellow bold ALL CAPS
VISUAL: Gold trophy with "$50 CPA" engraved sitting on wooden table, Google logo floating, winner podium
BACKGROUND: White grid top, warm wood bottom
EXTRA: Counterintuitive truth. The highest CPA wins in Google Ads.`,
    images: [imageAssets.google],
  },

  'google-pmax-blueprint': {
    template: 'tech-ui',
    concept: `TEXT: "PMax" white bold
VISUAL: Blueprint/architecture diagram showing PMax campaign structure, Google logo, technical schematic
BACKGROUND: Dark tech gradient with grid
EXTRA: The PMax blueprint. Campaign architecture for 2026.`,
    images: [imageAssets.google],
  },

  'google-product-feed-mastery': {
    template: 'tech-ui',
    concept: `TEXT: "FEED = AD" white bold
VISUAL: Spreadsheet transforming into polished ad creative, data flowing, Google + Shopify logos
BACKGROUND: Dark tech gradient
EXTRA: Your feed IS your ad. Feed mastery = ad mastery.`,
    images: [imageAssets.google, imageAssets.shopify],
  },

  'google-shopping-intent': {
    template: 'illustrated-char',
    concept: `TEXT: "ACTIVE INTENT" green bold
VISUAL: Illustrated buyer character with money ready in hand, actively searching, Google logo above
BACKGROUND: White with subtle gradient
EXTRA: Google Shopping captures high-intent buyers. Active intent gold.`,
    images: [imageAssets.google],
  },

  'google-brand-moat': {
    template: 'product-table',
    concept: `TEXT: "BRAND MOAT" white bold
VISUAL: Castle with Google colors surrounded by protective moat on wooden table, defensive fortress
BACKGROUND: Dark gradient, warm wood bottom
EXTRA: Unbeatable defense. Your brand search moat.`,
    images: [imageAssets.google],
  },

  'google-data-quality-edge': {
    template: 'tech-ui',
    concept: `TEXT: "DATA IN → AI OUT" white bold with arrow
VISUAL: Data quality funnel feeding into AI brain, garbage in/garbage out visual, Google logo
BACKGROUND: Dark tech gradient with grid
EXTRA: Better data = better AI performance. The data quality edge.`,
    images: [imageAssets.google],
  },

  'google-competitor-conquest': {
    template: 'versus',
    concept: `TEXT: "CONQUEST" gold bold
VISUAL: Flag being planted on competitor territory, victory visual, Google logo as the conquering force
BACKGROUND: Dark dramatic gradient
EXTRA: Legal market share steal. Competitor conquest campaigns.`,
    images: [imageAssets.google],
  },

  'google-store-trust-checklist': {
    template: 'arrow-callout',
    concept: `TEXT: "TRUST FIRST" white bold
VISUAL: Big arrow pointing to checklist with green checkmarks, trust badges, Google Merchant Center logo
BACKGROUND: White with subtle grid
EXTRA: Avoid suspension. The store trust checklist.`,
    images: [imageAssets.google],
  },

  'google-hero-product-funnel': {
    template: 'illustrated-char',
    concept: `TEXT: "HERO PRODUCTS" yellow bold
VISUAL: Illustrated funnel with products being filtered, winners emerging at bottom glowing, Google logo
BACKGROUND: White with grid texture
EXTRA: Find your winners. The hero product funnel.`,
    images: [imageAssets.google],
  },

  'google-click-fraud-shield': {
    template: 'single-object',
    concept: `TEXT: "SHIELD" white bold
VISUAL: Golden shield blocking red evil bot icons, protection force field, Google logo embedded in shield
BACKGROUND: Dark gradient
EXTRA: Protect your budget from click fraud. The fraud shield.`,
    images: [imageAssets.google],
  },

  'google-ai-max-decision': {
    template: 'split-screen',
    concept: `TEXT: "POWER vs CONTROL" white bold
VISUAL: Split - powerful AI brain (left) vs human hand with control (right), balance visual, Google logo
BACKGROUND: Split - AI blue left, human warm right
EXTRA: When to use AI Max. The power vs control decision.`,
    images: [imageAssets.google],
  },

  'google-negative-keyword-colander': {
    template: 'arrow-callout',
    concept: `TEXT: "FILTER" white bold
VISUAL: Big arrow pointing to colander/filter with bad keywords draining out, only good clicks staying
BACKGROUND: White with subtle grid
EXTRA: Only good clicks pass through. Negative keyword mastery.`,
    images: [imageAssets.google],
  },

  'google-optimization-cadence': {
    template: 'tech-ui',
    concept: `TEXT: "RHYTHM" white bold
VISUAL: Calendar dashboard showing optimization schedule, weekly/monthly cadence, Google logo
BACKGROUND: Dark tech gradient with grid
EXTRA: Disciplined optimization cadence. The rhythm of winning.`,
    images: [imageAssets.google],
  },

  'google-ad-assets-arsenal': {
    template: 'tech-ui',
    concept: `TEXT: "FREE REAL ESTATE" yellow bold
VISUAL: Expanded Google ad showing all assets utilized, bigger ad taking more screen space
BACKGROUND: White with subtle grid
EXTRA: Bigger ads for free. Your ad assets arsenal.`,
    images: [imageAssets.google],
  },

  'google-landing-page-bridge': {
    template: 'arrow-callout',
    concept: `TEXT: "AFTER THE CLICK" white bold
VISUAL: Big arrow showing journey from ad click to landing page, bridge visual, conversion path
BACKGROUND: White with subtle grid
EXTRA: Half the battle happens after the click. The landing page bridge.`,
    images: [imageAssets.google],
  },

  'google-ai-overviews-opportunity': {
    template: 'phone-mockup',
    concept: `TEXT: "AI OVERVIEWS" white bold
VISUAL: Phone showing Google AI overview results page, new search format, opportunity highlight
BACKGROUND: White clean
EXTRA: The new opportunity in Google Search. AI overviews.`,
    images: [imageAssets.google],
  },

  'google-budget-reallocation': {
    template: 'growth-curve',
    concept: `TEXT: "2.8x → 5.1x" green bold with arrow
VISUAL: Money flowing from losing campaigns to winner, ROAS curve going up, Google logo
BACKGROUND: White with grid overlay
EXTRA: Feed winners, starve losers. Budget reallocation mastery.`,
    images: [imageAssets.google],
  },

  'google-focus-firepower': {
    template: 'arrow-callout',
    concept: `TEXT: "FOCUS" white bold massive
VISUAL: Laser beam concentrating on single target, scattered vs focused comparison, Google logo
BACKGROUND: Dark gradient
EXTRA: Consolidate your budget. Focus your firepower.`,
    images: [imageAssets.google],
  },

  'google-influencer-creative': {
    template: 'illustrated-char',
    concept: `TEXT: "OUTSOURCE" white bold
VISUAL: Illustrated influencer character creating content, content flowing to Google ads, creative factory
BACKGROUND: White with gradient
EXTRA: Outsource creative production. The influencer creative hack.`,
    images: [imageAssets.google],
  },

  // ============================================
  // BUSINESS FUNDAMENTALS (50+ lessons)
  // ============================================

  'biz-infinite-money-engine': {
    template: 'money-product',
    concept: `TEXT: "∞ MONEY" yellow bold with infinity symbol
VISUAL: Infinity loop made of $100 bills sitting on pile of cash, flywheel motion visual, Hormozi portrait floating
BACKGROUND: White with grid texture
EXTRA: The infinite money engine. Alex Hormozi's flywheel.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-rat-brain-hijack': {
    template: 'brain-cables',
    concept: `TEXT: "HIJACK" white bold dramatic
VISUAL: Rat brain with attention cables being plugged in, subconscious trigger visualization
BACKGROUND: Dark blue gradient
EXTRA: Hijack their subconscious. Rat brain marketing.`,
    images: [],
  },

  'biz-velocity-advantage': {
    template: 'illustrated-char',
    concept: `TEXT: "SPEED" white bold massive
VISUAL: Illustrated rocket character accelerating past competitors, velocity trails, unfair advantage visual
BACKGROUND: White with grid texture
EXTRA: Speed is your unfair advantage. Move faster than everyone.`,
    images: [],
  },

  'biz-remarkable-product': {
    template: 'single-object',
    concept: `TEXT: "remarkable." gold italic elegant
VISUAL: Product floating with purple cow glow aura, standing out dramatically from gray background
BACKGROUND: White with gray products faded behind
EXTRA: Stand out or die. Be remarkable or invisible.`,
    images: [],
  },

  'biz-asset-not-job': {
    template: 'split-screen',
    concept: `TEXT: "ASSET vs JOB" white bold
VISUAL: Split - building/asset growing (left) vs person trapped in hamster wheel (right)
BACKGROUND: Green wealth left, red exhaustion right
EXTRA: $3M difference. Build an asset, not a job.`,
    images: [],
  },

  'biz-leverage-equation': {
    template: 'illustrated-char',
    concept: `TEXT: "LEVERAGE" white bold
VISUAL: Illustrated character using fulcrum lever to lift massive boulder with tiny effort
BACKGROUND: White with subtle gradient
EXTRA: Work smarter, not harder. The leverage equation.`,
    images: [],
  },

  'biz-counter-position': {
    template: 'versus',
    concept: `TEXT: "NEW BATTLEFIELD" white bold
VISUAL: Small player on advantaged high ground vs giants stuck in valley, terrain advantage visual
BACKGROUND: Dark dramatic gradient
EXTRA: Giants' money is worthless here. Counter-positioning.`,
    images: [],
  },

  'biz-awareness-sweet-spot': {
    template: 'arrow-callout',
    concept: `TEXT: "SWEET SPOT" gold bold
VISUAL: Big arrow pointing to golden center of Venn diagram - pain + no solution intersection
BACKGROUND: White clean
EXTRA: They know the pain, don't know the solution. The sweet spot.`,
    images: [],
  },

  'biz-barbell-strategy': {
    template: 'product-table',
    concept: `TEXT: "5% + 95%" white bold
VISUAL: Barbell sitting on wooden table - heavy weights on each end, nothing in middle, Taleb portrait floating
BACKGROUND: White grid top, warm wood bottom
EXTRA: Avoid the middle. Nassim Taleb's barbell strategy.`,
    images: [imageAssets.nassimTaleb],
  },

  'biz-one-pager-blueprint': {
    template: 'single-object',
    concept: `TEXT: "ONE PAGE" white bold
VISUAL: Single glowing document floating, surrounded by crossed-out shiny objects
BACKGROUND: White clean
EXTRA: Kill shiny object syndrome. One page blueprint.`,
    images: [],
  },

  'biz-infinite-money-loop': {
    template: 'illustrated-char',
    concept: `TEXT: "6 STEPS" yellow bold
VISUAL: Illustrated circular flywheel with 6 parts, each part glowing, infinite loop energy
BACKGROUND: White with grid texture
EXTRA: The 6 steps to infinite profit. The money loop.`,
    images: [],
  },

  'biz-marketing-company': {
    template: 'minimal-text',
    concept: `TEXT: "you're not a brand." white lowercase, massive
VISUAL: Minimal - mirror reflection showing marketing company instead of brand
BACKGROUND: White vast expanse
EXTRA: Identity shift. You're a marketing company that sells products.`,
    images: [],
  },

  'biz-product-expansion': {
    template: 'product-table',
    concept: `TEXT: "RIDGE" white bold
VISUAL: Ridge Wallet on wooden table expanding into full product line - bags, accessories, gear
BACKGROUND: White grid top, warm wood bottom
EXTRA: Single product to empire. The Ridge Wallet expansion.`,
    images: [imageAssets.ridgeWallet],
  },

  'biz-zero-cac-engine': {
    template: 'money-product',
    concept: `TEXT: "$0 CAC" green bold massive
VISUAL: Customers flowing in without ad spend, organic flywheel visual, zero cost acquisition
BACKGROUND: White with grid texture
EXTRA: Free customers first, paid second. Zero CAC engine.`,
    images: [],
  },

  'biz-creative-targeting': {
    template: 'tech-ui',
    concept: `TEXT: "CREATIVE = TARGETING" white bold
VISUAL: Creative ad with target overlay merging together, Meta logo, new era visualization
BACKGROUND: Dark tech gradient
EXTRA: Your creative IS your targeting now. Meta's new reality.`,
    images: [imageAssets.meta],
  },

  'biz-3x-threshold': {
    template: 'money-product',
    concept: `TEXT: "3X" gold metallic massive
VISUAL: Giant 3X number sitting on pile of $100 bills, glowing threshold energy, Hormozi portrait
BACKGROUND: Black dramatic
EXTRA: LTV must be 3X CAC. The magic threshold.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-asymmetric-monopoly': {
    template: 'arrow-callout',
    concept: `TEXT: "1400:1" white bold massive
VISUAL: Big arrow pointing to massive advantage ratio, David vs Goliath scale visual
BACKGROUND: White with subtle grid
EXTRA: Legal monopoly through asymmetric advantage. 1400:1 ratio.`,
    images: [],
  },

  'biz-authenticity-anchor': {
    template: 'brand-collage',
    concept: `TEXT: "40 YEARS" white bold
VISUAL: Retro editorial collage - Nike logo staying consistent through decades, evolution timeline
BACKGROUND: White with texture
EXTRA: Stay cool forever. Nike's 40-year authenticity anchor.`,
    images: [imageAssets.nike],
  },

  'biz-brand-ltv-engine': {
    template: 'illustrated-char',
    concept: `TEXT: "RETURN REASONS" white bold
VISUAL: Illustrated arrows pointing back to store from multiple directions, Le Creuset + LEGO logos floating
BACKGROUND: White with grid texture
EXTRA: Engineer reasons for them to return. Brand LTV engine.`,
    images: [imageAssets.leCreuset, imageAssets.lego],
  },

  'biz-brand-temple': {
    template: 'product-table',
    concept: `TEXT: "THE TEMPLE" gold bold
VISUAL: Greek temple with brand pillars sitting on wooden table, each pillar labeled, Ralph Lauren logo
BACKGROUND: White grid top, warm wood bottom
EXTRA: Build loyalty like a temple. The brand temple.`,
    images: [imageAssets.ralphLauren],
  },

  'biz-cash-conversion': {
    template: 'money-product',
    concept: `TEXT: "-30 DAYS" green bold
VISUAL: Money flowing backwards in time, getting paid before delivery, Oodie product + Davie Fogarty
BACKGROUND: White with grid texture
EXTRA: Get paid before you ship. Negative cash conversion cycle.`,
    images: [imageAssets.davieFogarty, imageAssets.theOodie],
  },

  'biz-closer-framework': {
    template: 'product-table',
    concept: `TEXT: "C.L.O.S.E.R." gold bold
VISUAL: 6 steps descending like staircase on wooden table, each letter as a step, Hormozi portrait floating
BACKGROUND: White grid top, warm wood bottom
EXTRA: Alex Hormozi's sales system. The CLOSER framework.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-courage-variable': {
    template: 'growth-curve',
    concept: `TEXT: "7,000 FAILURES" white bold
VISUAL: 7,000 small failures on bottom building up to massive success peak, mountain of attempts
BACKGROUND: Dark with grid overlay
EXTRA: Bet it all. 7,000 failures before success.`,
    images: [],
  },

  'biz-empathy-engine': {
    template: 'illustrated-char',
    concept: `TEXT: "FEEL THEM" white lowercase elegant
VISUAL: Illustrated heart connecting to customer via empathy beams, understanding energy
BACKGROUND: White warm gradient
EXTRA: Lifelong customer service through empathy. Feel what they feel.`,
    images: [],
  },

  'biz-four-pillars': {
    template: 'product-table',
    concept: `TEXT: "4 PILLARS" white bold
VISUAL: Four pillars holding up roof structure on wooden table, each pillar labeled with fundamentals
BACKGROUND: White grid top, warm wood bottom
EXTRA: The complete framework. Four pillars of business.`,
    images: [],
  },

  'biz-hamster-wheel': {
    template: 'illustrated-char',
    concept: `TEXT: "THE TRAP" white bold
VISUAL: Illustrated person trapped running in giant hamster wheel, exhaustion, prison bars around wheel
BACKGROUND: Dark gradient
EXTRA: Prison or business? Are you trapped in the hamster wheel?`,
    images: [],
  },

  'biz-infinite-flywheel': {
    template: 'illustrated-char',
    concept: `TEXT: "$100 → ∞" green bold
VISUAL: Illustrated flywheel with money multiplying each rotation, $100 in, infinite out
BACKGROUND: White with grid texture
EXTRA: Predictable money machine. The infinite flywheel.`,
    images: [],
  },

  'biz-leaders-burden': {
    template: 'single-object',
    concept: `TEXT: "YOUR FAULT" white bold
VISUAL: Heavy weight/burden on shoulders silhouette, responsibility visualization
BACKGROUND: Dark gradient
EXTRA: Ultimate accountability. Everything is your fault.`,
    images: [],
  },

  'biz-lifetime-gross-profit': {
    template: 'arrow-callout',
    concept: `TEXT: "WRONG" red bold massive
VISUAL: Big arrow pointing to calculator showing wrong LTV calculation, red X, common mistake exposed
BACKGROUND: White clean
EXTRA: You're calculating LTV wrong. Lifetime gross profit.`,
    images: [],
  },

  'biz-logic-trap': {
    template: 'brain-cables',
    concept: `TEXT: "LOGIC FAILS" white bold
VISUAL: Brain being fooled, logical decision leading to trap, smart choice = disaster
BACKGROUND: Dark gradient
EXTRA: Smart decisions that kill you. The logic trap.`,
    images: [],
  },

  'biz-ltv-cac-dashboard': {
    template: 'tech-ui',
    concept: `TEXT: "THE DASHBOARD" white bold
VISUAL: Cockpit dashboard with LTV:CAC gauges, speedometers, operator metrics, tech interface
BACKGROUND: Dark tech gradient
EXTRA: Fly your business like a pilot. The operator dashboard.`,
    images: [],
  },

  'biz-ltv-levers': {
    template: 'tech-ui',
    concept: `TEXT: "7 LEVERS" yellow bold
VISUAL: Control panel dashboard with 7 sliders/levers, each controlling LTV component
BACKGROUND: White with subtle grid
EXTRA: Control your LTV. 7 levers to pull.`,
    images: [],
  },

  'biz-model-vs-method': {
    template: 'versus',
    concept: `TEXT: "MODEL vs METHOD" white bold
VISUAL: Blueprint/model (left) vs toolbox/method (right), model clearly winning
BACKGROUND: Split - strategic left, tactical right
EXTRA: Model wins every time. Model vs method.`,
    images: [],
  },

  'biz-objection-dance': {
    template: 'illustrated-char',
    concept: `TEXT: "DANCE" white lowercase elegant
VISUAL: Two illustrated figures dancing together gracefully, not fighting, objection transformed
BACKGROUND: White with warm gradient
EXTRA: Dance with objections, don't fight them. 4 techniques.`,
    images: [],
  },

  'biz-operator-mindset': {
    template: 'tech-ui',
    concept: `TEXT: "OPERATOR" white bold
VISUAL: Cockpit dashboard interface, operator metrics, Ben Francis portrait + Gymshark logo
BACKGROUND: Dark tech gradient
EXTRA: Think like an operator, not a marketer. Gymshark mindset.`,
    images: [imageAssets.benFrancis, imageAssets.gymshark],
  },

  'biz-purchase-cycle-engine': {
    template: 'product-table',
    concept: `TEXT: "10 YEARS → 1 YEAR" green bold with arrow
VISUAL: Compressed purchase cycle visual on wooden table, Le Creuset products, time compression
BACKGROUND: White grid top, warm wood bottom
EXTRA: Shrink the purchase cycle. Le Creuset's genius.`,
    images: [imageAssets.leCreuset],
  },

  'biz-replication-protocol': {
    template: 'illustrated-char',
    concept: `TEXT: "SIMPLE SCALES" white bold
VISUAL: Illustrated copy machine duplicating success repeatedly, systems beating talent
BACKGROUND: White with grid texture
EXTRA: Systems > talent. Hormozi's replication protocol.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-rfm-secret': {
    template: 'tech-ui',
    concept: `TEXT: "R.F.M." gold bold
VISUAL: Three-axis chart showing Recency, Frequency, Monetary value, best customer quadrant highlighted
BACKGROUND: White with subtle grid
EXTRA: Identify your best customers. The RFM secret.`,
    images: [],
  },

  'biz-rule-of-100': {
    template: 'money-product',
    concept: `TEXT: "100" gold metallic massive
VISUAL: The number 100 in bold sitting on pile of money, volume strategy visualization
BACKGROUND: Black dramatic
EXTRA: Do 100 of everything first. The Rule of 100.`,
    images: [],
  },

  'biz-valley-protocol': {
    template: 'person-with-curve',
    concept: `YouTube thumbnail, 16:9 aspect ratio.

A simple growth curve line that goes up, dips down into a valley, then rises again. Colors transition: green start, red valley, green peak. A white dot on the valley with arrow saying "97% quit here."

Background: Dark black with thin grid lines
Text: "You're Here" style arrow pointing to the valley
Style: Exactly like the Alex Hormozi "You're Here" growth curve thumbnail`,
    images: [],
  },

  'biz-high-margin-fortress': {
    template: 'product-table',
    concept: `TEXT: "FORTRESS" gold bold
VISUAL: Castle/fortress made of stacked margins on wooden table, impenetrable walls
BACKGROUND: Dark gradient, warm wood bottom
EXTRA: Build a fortress of margins. High margin moat.`,
    images: [],
  },

  'biz-ridge-wallet-protocol': {
    template: 'product-table',
    concept: `TEXT: "RIDGE" white bold
VISUAL: Single Ridge Wallet on wooden table expanding into infinite product variants
BACKGROUND: White grid top, warm wood bottom
EXTRA: Single product, infinite LTV. The Ridge Wallet protocol.`,
    images: [imageAssets.ridgeWallet],
  },

  'biz-20-domination': {
    template: 'money-product',
    concept: `TEXT: "20% = 80%" yellow bold
VISUAL: Small group of VIP customers generating massive pile of money, Pareto visualization
BACKGROUND: White with grid texture
EXTRA: 20% of customers = 80% of revenue. Dominate your 20%.`,
    images: [],
  },

  'biz-channel-mix-formula': {
    template: 'tech-ui',
    concept: `TEXT: "THE MIX" white bold
VISUAL: Pie chart dashboard showing optimal channel allocation, percentages labeled
BACKGROUND: Dark tech gradient with grid
EXTRA: Optimal channel allocation. The mix formula.`,
    images: [],
  },

  'biz-next-best-dollar': {
    template: 'arrow-callout',
    concept: `TEXT: "NEXT DOLLAR" white bold
VISUAL: Big arrow pointing from dollar to best investment spot, capital allocation visual
BACKGROUND: White with subtle grid
EXTRA: Where should your next dollar go? Capital allocator mindset.`,
    images: [],
  },

  'biz-authenticity-engine': {
    template: 'single-object',
    concept: `TEXT: "CAN'T COPY" gold bold
VISUAL: Fingerprint with unique pattern glowing, impossible to replicate visual
BACKGROUND: White clean
EXTRA: Impossible to replicate. Your authenticity engine.`,
    images: [],
  },

  'biz-creator-army': {
    template: 'illustrated-char',
    concept: `TEXT: "500+ CREATORS" white bold
VISUAL: Illustrated army of content creators marching, vs single expensive agency crossed out
BACKGROUND: White with gradient
EXTRA: 500+ creators vs expensive agency. Build an army.`,
    images: [],
  },

  'biz-mission-driven-brand': {
    template: 'single-object',
    concept: `TEXT: "THE CAUSE" white bold
VISUAL: Flag with mission symbol waving heroically, cause-driven energy
BACKGROUND: White with warm gradient
EXTRA: Cause outperforms features. Mission-driven brand.`,
    images: [],
  },

  'biz-savage-mentality': {
    template: 'dramatic-quote',
    concept: `TEXT: "SAVAGE" white bold massive
VISUAL: Lion/predator eyes in darkness, relentless execution energy
BACKGROUND: Dark dramatic gradient
EXTRA: Relentless execution. The savage mentality.`,
    images: [],
  },

  'biz-systems-architect': {
    template: 'tech-ui',
    concept: `TEXT: "ARCHITECT" white bold
VISUAL: Blueprint dashboard with interconnected systems, $10M+ business architecture
BACKGROUND: Dark tech gradient with grid
EXTRA: Build systems, not tactics. The $10M+ transition.`,
    images: [],
  },

  'biz-90-percent-trap': {
    template: 'arrow-callout',
    concept: `TEXT: "90%" red bold massive
VISUAL: Big arrow pointing to dice/gambling, guessing vs math, trap visualization
BACKGROUND: White clean
EXTRA: 90% are guessing, not calculating. The trap.`,
    images: [],
  },

  'biz-animal-mindset': {
    template: 'money-product',
    concept: `TEXT: "$500M" gold bold massive
VISUAL: Davie Fogarty portrait on pile of money, intense relentless expression, Oodie in background
BACKGROUND: Dark dramatic gradient
EXTRA: Relentless action. The $500M animal mindset.`,
    images: [imageAssets.davieFogarty],
  },

  'biz-channel-cac-decoder': {
    template: 'tech-ui',
    concept: `TEXT: "BLENDED LIES" red bold
VISUAL: Dashboard revealing hidden true CAC behind blended number, exposed truth
BACKGROUND: White with subtle grid
EXTRA: Blended CAC lies to you. Decode true channel cost.`,
    images: [],
  },

  'biz-6-to-1-problem': {
    template: 'arrow-callout',
    concept: `TEXT: "6:1" red bold massive
VISUAL: Big arrow pointing to amazing ratio that's actually killing growth, warning visual
BACKGROUND: White clean
EXTRA: Too good is actually bad. The 6:1 problem.`,
    images: [],
  },

  'biz-survival-cycle': {
    template: 'illustrated-char',
    concept: `TEXT: "DOOM LOOP" red bold
VISUAL: Illustrated downward spiral cycle, characters trapped in survival mode, 97% death trap
BACKGROUND: Dark gradient
EXTRA: 97% are trapped here. The survival doom loop.`,
    images: [],
  },

  'biz-infinite-money-glitch': {
    template: 'illustrated-char',
    concept: `TEXT: "THE GLITCH" gold bold
VISUAL: Illustrated flywheel with infinity symbol, money multiplying like video game glitch
BACKGROUND: White with grid texture
EXTRA: Self-fueling growth. The infinite money glitch.`,
    images: [],
  },

  'biz-price-anchoring': {
    template: 'split-screen',
    concept: `TEXT: "$47 vs $297" white bold
VISUAL: Split - small price next to massive anchor price, $47 looks tiny next to $297
BACKGROUND: Split - small left, massive right
EXTRA: Makes your price look cheap. Price anchoring.`,
    images: [],
  },

  'biz-look-back-window': {
    template: 'arrow-callout',
    concept: `TEXT: "30 DAYS LIES" red bold
VISUAL: Big arrow pointing to calendar with blindspot, wrong attribution window exposed
BACKGROUND: White with subtle grid
EXTRA: Your lookback window is lying to you. Wrong attribution.`,
    images: [],
  },

  // ============================================
  // ADDITIONAL CRO LESSONS (20 lessons)
  // ============================================

  'checkout-line-effect': {
    template: 'arrow-callout',
    concept: `TEXT: "IMPULSE" yellow bold
VISUAL: Big arrow pointing to checkout lane candy/small items, last-minute add visualization
BACKGROUND: White with subtle grid
EXTRA: The checkout line effect. Last-minute impulse psychology.`,
    images: [],
  },

  'compound-testing-effect': {
    template: 'growth-curve',
    concept: `TEXT: "1% + 1% + 1%..." white bold
VISUAL: Small 1% wins stacking into exponential curve, compound effect visualization
BACKGROUND: White with grid overlay
EXTRA: How small wins stack into massive gains. Compound testing.`,
    images: [],
  },

  'emotional-gap': {
    template: 'illustrated-char',
    concept: `TEXT: "THE GAP" white bold
VISUAL: Illustrated bridge connecting desire (left) to action (right), gap visualization
BACKGROUND: White with gradient
EXTRA: Bridge the gap between desire and action. Close the emotional gap.`,
    images: [],
  },

  'emotional-problem': {
    template: 'illustrated-char',
    concept: `TEXT: "THE REAL PROBLEM" white bold
VISUAL: Surface problem iceberg tip, massive deeper emotional problem underwater
BACKGROUND: Dark blue gradient
EXTRA: Dig deeper. Find the real problem behind the problem.`,
    images: [],
  },

  'five-value-heuristics': {
    template: 'brain-cables',
    concept: `TEXT: "5 SHORTCUTS" yellow bold
VISUAL: Brain with 5 fast neural pathways highlighted, mental shortcut visualization
BACKGROUND: White clean
EXTRA: The 5 value heuristics. Mental shortcuts for perceived value.`,
    images: [],
  },

  'ice-prioritization': {
    template: 'tech-ui',
    concept: `TEXT: "I.C.E." gold bold
VISUAL: Dashboard with three columns - Impact, Confidence, Ease - scored and ranked
BACKGROUND: White with subtle grid
EXTRA: Impact × Confidence × Ease. ICE prioritization framework.`,
    images: [],
  },

  'identity-shift-effect': {
    template: 'face-morph',
    concept: `TEXT: "BECOME" white bold massive
VISUAL: Person transforming/morphing from before state to after state, identity shift
BACKGROUND: Split transformation visual
EXTRA: When buying becomes becoming. The identity shift effect.`,
    images: [],
  },

  'le-creuset-scarcity-engine': {
    template: 'product-table',
    concept: `TEXT: "1 COLOR" yellow bold
VISUAL: Rainbow of Le Creuset Dutch ovens on wooden table, all sold out except one color available
BACKGROUND: White grid top, warm wood bottom
EXTRA: Collector FOMO. Limited colors create collectors.`,
    images: [imageAssets.leCreuset],
  },

  'local-holiday-legitimacy': {
    template: 'illustrated-char',
    concept: `TEXT: "LOCAL WINS" white bold
VISUAL: Illustrated calendar with cultural holidays/events highlighted, globe with regions
BACKGROUND: White with warm gradient
EXTRA: Cultural moments that drive sales. Local holiday legitimacy.`,
    images: [],
  },

  'logo-is-worthless': {
    template: 'minimal-text',
    concept: `TEXT: "worthless." white lowercase massive
VISUAL: Minimal - logo symbol faded/crossed out in background, truth revealed
BACKGROUND: White vast expanse
EXTRA: Your logo is worthless. Brand equity isn't in the symbol.`,
    images: [],
  },

  'micro-yes-engine': {
    template: 'illustrated-char',
    concept: `TEXT: "yes, yes, YES!" white growing size
VISUAL: Illustrated steps ascending with "yes" on each step, momentum building to final big YES
BACKGROUND: White with grid texture
EXTRA: Build momentum through tiny commitments. The micro-yes engine.`,
    images: [],
  },

  'missing-piece-effect': {
    template: 'arrow-callout',
    concept: `TEXT: "ALMOST COMPLETE" white bold
VISUAL: Big arrow pointing to puzzle with one piece missing, completion urge visualization
BACKGROUND: White clean
EXTRA: Incomplete sets drive completion urge. The missing piece effect.`,
    images: [],
  },

  'nine-trust-levers': {
    template: 'tech-ui',
    concept: `TEXT: "9 LEVERS" yellow bold
VISUAL: Trust control panel dashboard with 9 sliders/levers, all credibility elements labeled
BACKGROUND: White with subtle grid
EXTRA: Every element that builds credibility. The 9 trust levers.`,
    images: [],
  },

  'ninety-seven-percent-leak': {
    template: 'money-product',
    concept: `TEXT: "97%" red bold massive
VISUAL: Funnel with 97% of visitors/money leaking out, dramatic loss visualization
BACKGROUND: White with grid texture
EXTRA: 97% of visitors leave without buying. The massive leak.`,
    images: [],
  },

  'offer-is-everything': {
    template: 'product-table',
    concept: `TEXT: "THE OFFER" gold bold massive
VISUAL: Glowing offer box sitting on wooden table, outshining copy/design elements, Hormozi portrait
BACKGROUND: White vast with wood bottom
EXTRA: Your offer matters more than your copy. Offer is everything.`,
    images: [imageAssets.alexHormozi],
  },

  'owned-audience-effect': {
    template: 'illustrated-char',
    concept: `TEXT: "OWN IT" white bold
VISUAL: Illustrated audience/customers in your pocket/controlled, platform-independent asset
BACKGROUND: White with gradient
EXTRA: Build assets you control. The owned audience effect.`,
    images: [],
  },

  'pain-dream-bridge': {
    template: 'illustrated-char',
    concept: `TEXT: "BRIDGE" white bold
VISUAL: Illustrated pain (dark left) connected via bridge to dream future (golden right)
BACKGROUND: Split - dark pain left, golden dream right
EXTRA: Connect current pain to desired future. The pain-dream bridge.`,
    images: [],
  },

  'performance-engine': {
    template: 'tech-ui',
    concept: `TEXT: "THE ENGINE" white bold
VISUAL: Well-oiled machine/engine diagram, all parts working together, scalable systems
BACKGROUND: Dark tech gradient with grid
EXTRA: Systems that scale profitably. The performance engine.`,
    images: [],
  },

  'poppy-disruptor-blueprint': {
    template: 'single-object',
    concept: `TEXT: "DISRUPT" gold bold
VISUAL: Poppy flower breaking through concrete, disruption energy, convention-breaking visual
BACKGROUND: White clean
EXTRA: Break category conventions. The Poppy disruptor blueprint.`,
    images: [],
  },

  'post-purchase-momentum': {
    template: 'growth-curve',
    concept: `TEXT: "AFTER THE SALE" white bold
VISUAL: Growth curve continuing upward after purchase point, repeat buyer acceleration
BACKGROUND: White with grid overlay
EXTRA: Turn buyers into repeat customers. Post-purchase momentum.`,
    images: [],
  },

  // ============================================
  // REMAINING LESSONS (30+ lessons)
  // ============================================

  'premium-flywheel': {
    template: 'illustrated-char',
    concept: `TEXT: "PREMIUM" gold bold
VISUAL: Illustrated flywheel with luxury elements - velvet, gold, crystals, compound motion
BACKGROUND: Dark gradient
EXTRA: Compound premium positioning. The premium flywheel.`,
    images: [],
  },

  'price-creates-value': {
    template: 'arrow-callout',
    concept: `TEXT: "PRICE = VALUE" white bold
VISUAL: Big arrow pointing to higher price creating more glow/perceived value, price as signal
BACKGROUND: White clean
EXTRA: Higher prices increase perception. Price creates value.`,
    images: [],
  },

  'psychological-moat': {
    template: 'brain-cables',
    concept: `TEXT: "MENTAL MOAT" white bold
VISUAL: Brain protected by defensive barriers/moat, mental defense visualization
BACKGROUND: Dark gradient
EXTRA: Mental barriers that protect your brand. The psychological moat.`,
    images: [],
  },

  'self-selection-principle': {
    template: 'illustrated-char',
    concept: `TEXT: "THEY CHOOSE" white bold
VISUAL: Illustrated customers self-sorting into different tiers, qualification happening naturally
BACKGROUND: White with gradient
EXTRA: Let customers qualify themselves. Self-selection principle.`,
    images: [],
  },

  'sell-the-identity': {
    template: 'face-morph',
    concept: `TEXT: "SELL WHO THEY BECOME" white bold
VISUAL: Person silhouette transforming into their ideal self, identity transformation
BACKGROUND: White with gradient
EXTRA: Products are identity purchases. Sell the identity.`,
    images: [],
  },

  'shape-psychology': {
    template: 'arrow-callout',
    concept: `TEXT: "SHAPES MATTER" white bold
VISUAL: Big arrows pointing to circle (friendly), square (stability), triangle (power) with meanings
BACKGROUND: White clean
EXTRA: How shapes affect perception. Shape psychology.`,
    images: [],
  },

  'smallest-viable-market': {
    template: 'product-table',
    concept: `TEXT: "TINY" white bold
VISUAL: Small circle dominating its space on wooden table before expanding outward, Seth Godin portrait
BACKGROUND: White grid top, warm wood bottom
EXTRA: Dominate a niche before expanding. Smallest viable market.`,
    images: [imageAssets.sethGodin],
  },

  'sms-open-rate-secret': {
    template: 'tech-ui',
    concept: `TEXT: "98%" green bold massive
VISUAL: SMS notification badge with 98% open rate, crushing email's rate, dashboard comparison
BACKGROUND: White with subtle grid
EXTRA: Why SMS beats email for engagement. 98% open rate.`,
    images: [],
  },

  'story-changes-taste': {
    template: 'brand-collage',
    concept: `TEXT: "STORY = TASTE" white bold
VISUAL: Retro editorial collage - same wine/product with different story labels, taste perception visual
BACKGROUND: White with texture
EXTRA: Narrative literally alters perception. Story changes taste.`,
    images: [],
  },

  'thirty-five-thousand-decisions': {
    template: 'brain-cables',
    concept: `TEXT: "35,000" white bold massive
VISUAL: Overwhelmed brain with 35,000 decision pathways, decision fatigue visualization
BACKGROUND: Dark gradient
EXTRA: Reduce decision fatigue to convert. 35,000 daily decisions.`,
    images: [],
  },

  'whale-customer-paradox': {
    template: 'money-product',
    concept: `TEXT: "THE WHALES" gold bold
VISUAL: Small group of VIP whale customers on pile of money, different behavior than average
BACKGROUND: White with grid texture
EXTRA: Your best customers behave differently. The whale paradox.`,
    images: [],
  },

  'dior-pricing-secret': {
    template: 'split-screen',
    concept: `TEXT: "$57 → $3,500" white bold
VISUAL: Split - same bag at $57 (left) vs $3,500 (right), 60x markup, Dior logo
BACKGROUND: Cheap production left, luxury retail right
EXTRA: What Dior and Rolex know about pricing. The $57 bag that sells for $3,500.`,
    images: [imageAssets.dior],
  },

  'consumption-conversion': {
    template: 'arrow-callout',
    concept: `TEXT: "THE GAP" red bold
VISUAL: Big arrow pointing to gap between consumption (reading) and conversion (buying)
BACKGROUND: White clean
EXTRA: Why your product page isn't converting. The consumption gap.`,
    images: [],
  },

  'luxury-mindset-shift': {
    template: 'illustrated-char',
    concept: `TEXT: "4 SHIFTS" gold bold
VISUAL: Illustrated mind transforming through 4 stages, commodity to luxury mindset progression
BACKGROUND: Dark gradient
EXTRA: Transform your thinking from commodity to luxury. 4 mindset shifts.`,
    images: [],
  },

  'three-cro-tests': {
    template: 'tech-ui',
    concept: `TEXT: "3 TESTS" yellow bold
VISUAL: Dashboard showing 3 test tubes with results, revenue impact metrics, only 3 that matter
BACKGROUND: White with subtle grid
EXTRA: Focus on tests that impact the bottom line. The 3 CRO tests.`,
    images: [],
  },

  'digital-velvet-rope': {
    template: 'product-table',
    concept: `TEXT: "VELVET ROPE" gold bold
VISUAL: Red velvet rope on wooden table, digital exclusivity visualization, VIP access
BACKGROUND: Dark gradient, warm wood bottom
EXTRA: Create exclusive experiences that elevate perception. Digital velvet rope.`,
    images: [],
  },

  'hidden-menu-psychology': {
    template: 'illustrated-char',
    concept: `TEXT: "SECRET MENU" white bold
VISUAL: Illustrated hidden menu being revealed, secret options, status and belonging visual
BACKGROUND: Dark gradient
EXTRA: Secret options that create status and belonging. Hidden menu psychology.`,
    images: [],
  },

  'celebrity-gifting-flywheel': {
    template: 'illustrated-char',
    concept: `TEXT: "FREE → MILLIONS" green bold with arrow
VISUAL: Illustrated gift transforming into influence/money, celebrity amplification flywheel
BACKGROUND: White with gradient
EXTRA: Turn free products into millions in influence. Celebrity gifting flywheel.`,
    images: [],
  },

  'forbidden-coffee-hook': {
    template: 'single-object',
    concept: `TEXT: "FORBIDDEN" white bold
VISUAL: Coffee cup with mysterious dark aura, forbidden fruit energy, exclusivity story
BACKGROUND: Dark dramatic gradient
EXTRA: Mystery and exclusivity wrapped in a story. The forbidden coffee hook.`,
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
                      {/* MAIN Reference Image - The Style Reference */}
                      {conceptData.referenceImage && (
                        <div className="mb-4">
                          <p className="text-xs font-bold text-purple-600 mb-2 uppercase tracking-wide">📸 STYLE REFERENCE (upload this to ChatGPT first):</p>
                          <button
                            onClick={async () => {
                              const imgUrl = `/reference-thumbnails/${conceptData.referenceImage}`;
                              try {
                                const response = await fetch(imgUrl);
                                const blob = await response.blob();
                                const pngBlob = blob.type === 'image/png' ? blob : await new Promise<Blob>((resolve) => {
                                  const img = document.createElement('img');
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
                                setMessage({ type: 'success', text: 'Reference image copied!' });
                              } catch (err) {
                                console.error('Failed to copy image:', err);
                                setMessage({ type: 'error', text: 'Failed to copy image - right-click and save instead' });
                              }
                            }}
                            className="relative w-full h-48 rounded-lg overflow-hidden border-4 border-purple-500 hover:border-purple-600 transition-all group bg-white"
                            title="Click to copy reference image"
                          >
                            <Image
                              src={`/reference-thumbnails/${conceptData.referenceImage}`}
                              alt="Style Reference"
                              fill
                              className="object-contain"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <div className="bg-purple-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 flex items-center gap-2">
                                <Copy size={16} />
                                Click to Copy Image
                              </div>
                            </div>
                          </button>
                          <p className="text-xs text-gray-500 mt-1 text-center">{conceptData.referenceImage}</p>
                        </div>
                      )}

                      {/* Additional Images (Monkey, Entrepreneur photos, etc.) */}
                      {conceptData.images.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">🎭 Also attach these images (click to copy):</p>
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
