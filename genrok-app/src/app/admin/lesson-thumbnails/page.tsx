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

// Brand/Entrepreneur image URLs - Using LOCAL paths for clipboard copy support
const imageAssets = {
  // Entrepreneurs (LOCAL - clipboard copy works)
  alexHormozi: '/additional-images/entrepreneurs/alex-hormozi.png',
  davieFogarty: '/additional-images/entrepreneurs/davie-fogarty.png',
  benFrancis: '/additional-images/entrepreneurs/ben-francis.png',
  garyHalbert: '/additional-images/entrepreneurs/gary-halbert.png',
  robertCialdini: '/additional-images/entrepreneurs/robert-cialdini.png',
  danKennedy: '/additional-images/entrepreneurs/dan-kennedy.png',
  sethGodin: '/additional-images/entrepreneurs/seth-godin.jpg',
  rorySutherland: '/additional-images/entrepreneurs/rory-sutherland.png',
  eugeneSchwartz: '/additional-images/entrepreneurs/eugene-schwartz.webp',
  simonSinek: '/additional-images/entrepreneurs/simon-sinek.webp',
  jeffBezos: '/additional-images/entrepreneurs/jeff-bezos.png',
  elonMusk: '/additional-images/entrepreneurs/elon-musk.png',
  warrenBuffett: '/additional-images/entrepreneurs/warren-buffett.png',
  davidOgilvy: '/additional-images/entrepreneurs/david-ogilvy.png',
  danielKahneman: '/additional-images/entrepreneurs/daniel-kahneman.png',
  nassimTaleb: '/additional-images/entrepreneurs/nassim-taleb.png',
  sheenaIyengar: '/additional-images/entrepreneurs/sheena-iyengar.png',
  jensenHuang: '/additional-images/entrepreneurs/jensen-huang.png',
  // Additional entrepreneurs
  caseyNeistat: '/additional-images/entrepreneurs/casey-neistat.png',
  jasonFladlien: '/additional-images/entrepreneurs/jason-fladlien.png',
  robertGreene: '/additional-images/entrepreneurs/robert-greene.png',
  ellenLanger: '/additional-images/entrepreneurs/ellen-langer.png',
  michaelPorter: '/additional-images/entrepreneurs/michael-porter.png',
  vilfredoPareto: '/additional-images/entrepreneurs/vilfredo-pareto.png',
  hudsonLeogrande: '/additional-images/entrepreneurs/hudson-leogrande.png',
  albertBandura: '/additional-images/entrepreneurs/albert-bandura.jpg',
  geraldZaltman: '/additional-images/entrepreneurs/gerald-zaltman.jpg',
  robertoGoizueta: '/additional-images/entrepreneurs/roberto-goizueta.jpg',
  alfredNorthWhitehead: '/additional-images/entrepreneurs/alfred-north-whitehead.jpg',

  // Mascot
  monkey: '/reference-thumbnails/monkey-mascot.png',

  // Brands (LOCAL - clipboard copy works)
  klaviyo: '/additional-images/brands/klaviyo.png',
  reconvert: '/additional-images/brands/reconvert.webp',
  grapevine: '/additional-images/brands/grapevine-surveys.webp',
  tripleWhale: '/additional-images/brands/triple-whale.webp',
  netflix: '/additional-images/brands/netflix.png',
  mastercard: '/additional-images/brands/mastercard.png',
  adidas: '/additional-images/brands/adidas.png',
  tiktok: '/additional-images/brands/tiktok.png',
  instagram: '/additional-images/brands/instagram.webp',
  youtube: '/additional-images/brands/youtube.png',
  visa: '/additional-images/brands/visa.png',
  paypal: '/additional-images/brands/paypal.jpg',
  stripe: '/additional-images/brands/stripe.webp',
  klarna: '/additional-images/brands/klarna.png',
  affirm: '/additional-images/brands/affirm.png',
  afterpay: '/additional-images/brands/afterpay.png',
  americanExpress: '/additional-images/brands/american-express.png',
  alibaba: '/additional-images/brands/alibaba.png',
  bigcommerce: '/additional-images/brands/bigcommerce.png',
  woocommerce: '/additional-images/brands/woocommerce.png',
  autods: '/additional-images/brands/autods.svg',
  hypersku: '/additional-images/brands/hypersku.png',
  hyros: '/additional-images/brands/hyros.png',
  keepcart: '/additional-images/brands/keepcart.webp',
  txtcart: '/additional-images/brands/txtcart.webp',
  datadrew: '/additional-images/brands/datadrew.jpg',
  geoConvert: '/additional-images/brands/geo-convert.jpg',
  slack: '/additional-images/brands/slack.png',
  canva: '/additional-images/brands/canva.svg',
  framer: '/additional-images/brands/framer.svg',
  squarespace: '/additional-images/brands/squarespace.png',
  headspace: '/additional-images/brands/headspace.jpg',
  peloton: '/additional-images/brands/peloton.png',
  allbirds: '/additional-images/brands/allbirds.png',
  hims: '/additional-images/brands/hims.png',
  ritual: '/additional-images/brands/ritual.svg',
  honey: '/additional-images/brands/honey.png',
  dollarShaveClub: '/additional-images/brands/dollar-shave-club.webp',
  supreme: '/additional-images/brands/supreme.jpg',
  zara: '/additional-images/brands/zara.webp',
  hm: '/additional-images/brands/h-m.png',
  lululemon: '/additional-images/brands/lululemon.jpg',
  rei: '/additional-images/brands/rei.png',
  chanel: '/additional-images/brands/chanel.png',
  lvmh: '/additional-images/brands/lvmh.png',
  deBeers: '/additional-images/brands/de-beers.png',
  ferrari: '/additional-images/brands/ferrari.png',
  lamborghini: '/additional-images/brands/lamborghini.png',
  porsche: '/additional-images/brands/porsche.svg',
  bmw: '/additional-images/brands/bmw.svg',
  lexus: '/additional-images/brands/lexus.jpg',
  rollsRoyce: '/additional-images/brands/rolls-royce.jpg',
  lucid: '/additional-images/brands/lucid.jpg',
  pepsi: '/additional-images/brands/pepsi.svg',
  subway: '/additional-images/brands/subway.png',
  pizzaHut: '/additional-images/brands/pizza-hut.png',
  cheesecakeFactory: '/additional-images/brands/cheesecake-factory.jpg',
  unilever: '/additional-images/brands/unilever.svg',
  // Working local brand images (from Wikipedia SVGs)
  nike: '/additional-images/brands/nike.png',
  starbucks: '/additional-images/brands/starbucks.png',
  google: '/additional-images/brands/google.png',
  chipotle: '/additional-images/brands/chipotle.png',
  apple: '/additional-images/brands/apple.png',
  meta: '/additional-images/brands/meta.png',
  ikea: '/additional-images/brands/ikea.png',
  tesla: '/additional-images/brands/tesla.png',
  amazon: '/additional-images/brands/amazon.svg',
  shopify: '/additional-images/brands/shopify.svg',
  cocaCola: '/additional-images/brands/coca-cola.svg',
  lego: '/additional-images/brands/lego.svg',
  gucci: '/additional-images/brands/gucci.svg',
  prada: '/additional-images/brands/prada.svg',
  spotify: '/additional-images/brands/spotify.svg',
  // Fallback to similar brands or monkey for unavailable logos
  rolex: '/additional-images/brands/chanel.png', // Using Chanel as luxury placeholder
  tiffany: '/additional-images/brands/chanel.png', // Using Chanel as luxury placeholder
  hermes: '/additional-images/brands/lvmh.png', // Using LVMH as luxury placeholder
  dior: '/additional-images/brands/chanel.png', // Using Chanel as luxury placeholder
  leCreuset: '/additional-images/brands/rei.png', // Using REI as home goods placeholder
  ralphLauren: '/additional-images/brands/adidas.png', // Using Adidas as apparel placeholder
  gymshark: '/additional-images/brands/adidas.png', // Using Adidas as fitness apparel placeholder
  theOodie: '/additional-images/brands/supreme.jpg', // Using Supreme as apparel placeholder
  ridgeWallet: '/reference-thumbnails/monkey-mascot.png', // No close match, using monkey
  oura: '/additional-images/brands/peloton.png', // Using Peloton as fitness tech placeholder
  joyLoyalty: '/additional-images/brands/klaviyo.png', // Using Klaviyo as Shopify app placeholder
  abconvert: '/additional-images/brands/klaviyo.png', // Using Klaviyo as Shopify app placeholder
  vitals: '/additional-images/brands/klaviyo.png', // Using Klaviyo as Shopify app placeholder
  tapita: '/additional-images/brands/klaviyo.png', // Using Klaviyo as Shopify app placeholder
  liquidDeath: '/additional-images/brands/pepsi.svg', // Using Pepsi as beverage placeholder
  drSquatch: '/reference-thumbnails/monkey-mascot.png', // No close match, using monkey
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
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "7 LEVERS"
- Show a CONTROL PANEL with 7 ethical switches/sliders
- All positioned for good - green lights on each lever
- Our monkey mascot (attached) operating the control panel ethically

Keep the same tech/dashboard energy, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'us-vs-them': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "DAVID vs GOLIATH"
- LEFT side: Tiny underdog figure with slingshot (small but fierce)
- RIGHT side: Massive giant figure (intimidating but vulnerable)
- Our monkey mascot (attached) as David, ready to fight

Keep the same comparison/versus energy, the dramatic contrast.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'brand-universe': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE UNIVERSE"
- Show a SNOW GLOBE containing an entire world/universe inside
- Brand world-building visual - stars, planets, your own cosmos
- Our monkey mascot (attached) holding the snow globe, creating worlds

Keep the same brain/cosmos energy, the premium look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'product-to-identity': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "BECOME."
- Show a PRODUCT morphing into a person's silhouette
- Identity transformation visual - you become what you buy
- Our monkey mascot (attached) transforming alongside

Keep the same transformation energy, the identity shift visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'commodity-escape': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "$0.50 → $6"
- Show coffee beans (left) transforming into premium Starbucks cup (right)
- Massive value transformation visualization
- Add Starbucks logo (attached) subtly

Keep the same wealth/success energy, the transformation visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.starbucks],
  },

  'myth-and-urgency': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "NOW."
- Show an HOURGLASS with sand running out dramatically
- Mythical story elements swirling around - urgency energy
- Our monkey mascot (attached) racing against time

Keep the same dramatic energy, the urgency visualization.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'value-ladder': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "HIDDEN MENU"
- Show a VELVET ROPE parting to reveal secret VIP tier
- Golden ladder ascending to exclusive levels
- Our monkey mascot (attached) as VIP bouncer revealing secrets

Keep the same premium energy, the exclusivity visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'box-worth-300': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "$300 BOX"
- Show an EMPTY Tiffany blue box, nothing inside, box glowing with value
- The packaging IS the product visualization
- Our monkey mascot (attached) marveling at the empty but valuable box

Keep the same premium reveal energy, the value perception visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'story-taste-experiment': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "STORY = TASTE"
- Show the SAME WINE with different story labels
- One tastes cheap, one tastes premium - same wine
- Our monkey mascot (attached) as sommelier revealing the secret

Keep the same editorial energy, the perception-changing visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'scarcity-calendar': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "1 PER YEAR"
- Show colorful Dutch ovens with most having "SOLD OUT" tags
- Only ONE color available - scarcity creates collectors
- Our monkey mascot (attached) desperately wanting the sold out ones

Keep the same strategic energy, the scarcity visualization.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'anchor-moments': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "$20K → $200"
- LEFT: $20K expensive bag, RIGHT: $200 polo shirt
- Polo looks CHEAP in comparison - anchor pricing psychology
- Our monkey mascot (attached) shocked at the price perception

Keep the same comparison energy, the price anchoring visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'irrational-loyalty': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "LOGIC DIES."
- Show a BRAIN with HEART overtaking the logical section
- Cables disconnecting from reason - emotional override
- Our monkey mascot (attached) controlled by heart not brain

Keep the same brain visual energy, the emotional takeover visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'reciprocity-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "+42%"
- Show a GIFT being given, money coming back in a loop
- Reciprocity flywheel - give to get visualization
- Our monkey mascot (attached) giving gifts and receiving money

Keep the same growth energy, the flywheel visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'gucci-short-termism': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "DYING vs FOREVER"
- LEFT: Gucci logo fading/dying (red X)
- RIGHT: Luxury brand logo strong and timeless (green check)
- Fashion chases trends, luxury chases timelessness

Keep the same comparison energy, the contrast visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.gucci],
  },

  'ethical-persuasion-compass': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE LINE."
- Show a GOLDEN COMPASS with ethics needle
- Pointing to the right direction - moral boundary visual
- Our monkey mascot (attached) holding compass, making ethical choices

Keep the same clean reveal energy, the moral clarity visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'two-worlds-mastery': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "TWO WORLDS"
- LEFT: Analytical dashboard (blue, data)
- RIGHT: Creative storytelling (warm, artistic)
- Our monkey mascot (attached) standing in the middle, mastering both

Keep the same split comparison energy, the duality visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'race-to-bottom-escape': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "KILLING YOU"
- Show ROAS line going UP while profit line going DOWN
- Scissors cutting the profit line - winning battles losing war
- Our monkey mascot (attached) alarmed at the trend

Keep the same chart/growth energy, the warning visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'founder-operating-system': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "4 TRAITS"
- Show a GOLDEN CROWN with 4 distinct points
- Each point representing a legendary founder trait
- Our monkey mascot (attached) wearing the crown

Keep the same wealth/success energy, the leadership visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  '13800-percent-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "13,800%"
- Show an EXPONENTIAL curve shooting upward dramatically
- Small 10% improvements stacking into massive gains
- Our monkey mascot (attached) riding the exponential curve

Keep the same growth energy, the compound effect visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  // ============================================
  // META ADS 2026 (15 lessons)
  // ============================================

  'meta-three-second-hook': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "3 SECONDS"
- Show an iPhone with dramatic "00:03" timer on screen
- Meta logo floating above - attention urgency
- Our monkey mascot (attached) racing against the 3 second clock

Keep the same tech energy, the urgency visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey, imageAssets.meta],
  },

  'meta-70-20-10-rule': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "70/20/10"
- Show a dashboard with three bars: 70% proven (green), 20% iteration (yellow), 10% wild (red)
- Creative testing rule visualization
- Our monkey mascot (attached) balancing the ratios

Keep the same tech/dashboard energy, the allocation visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey, imageAssets.meta],
  },

  'meta-ga4-integration': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "GA4 + META"
- Show two data streams merging into one powerful signal
- Tech pipeline visual - signal quality matters
- Add Google and Meta logos (attached)

Keep the same tech/systems energy, the integration visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.google],
  },

  'meta-1-1-x-structure': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "1-1-X"
- Show a FLOWCHART: 1 Campaign → 1 Ad Set → X Creatives expanding
- Simple architecture visualization
- Add Meta logo (attached)

Keep the same tech/dashboard energy, the structure visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'meta-auction-formula': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE FORMULA"
- Show equation: Bid × EAR × Quality on a chalkboard/blueprint
- Mathematical formula visualization
- Add Meta logo (attached)

Keep the same blueprint energy, the formula visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'meta-controls-vs-suggestions': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "HARD vs SOFT"
- LEFT: Brick wall (hard controls/boundaries)
- RIGHT: Soft pillow (suggestions/soft signals)
- Add Meta logo (attached) in the center

Keep the same comparison energy, the contrast visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta],
  },

  'meta-creative-ecosystem': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "50 ADS"
- Show a PHONE exploding with grid of 50 ad thumbnails
- Creative variety visualization
- Add Meta logo (attached)

Keep the same tech/systems energy, the volume visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.meta, imageAssets.monkey],
  },

  'meta-capi-pixel-setup': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "CAPI + PIXEL"
- Show two tracking streams merging into one powerful signal
- Dual tracking visualization - browser + server
- Add Meta logo (attached)

Keep the same tech/systems energy, the integration visual.
16:10 ratio. Don't put the time block.`,
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
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "REVIEWS?"
- LEFT: Product page WITHOUT reviews (bare)
- RIGHT: Product page WITH reviews and stars (rich)
- A/B test visualization

Keep the same comparison energy, the test visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'ascension-ladder': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "ASCEND."
- Show customer climbing GOLDEN VALUE LADDER
- Each rung = higher ticket purchase, money floating around top
- Our monkey mascot (attached) at the top celebrating

Keep the same growth energy, the ladder visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'brain-friendly-ux': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "BRAIN FIRST."
- Show BRAIN with smooth easy pathways in GREEN
- Complex paths blocked in RED
- Our monkey mascot (attached) designing the easy path

Keep the same brain visual energy, the UX simplicity visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'brand-moat': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE MOAT"
- Show CASTLE surrounded by water/moat
- Brand shield on castle, defensive walls
- Our monkey mascot (attached) defending the castle

Keep the same wealth/success energy, the protection visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'brand-promise-code': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "PROMISE."
- Show a HANDSHAKE icon with trust energy
- Minimal, elegant, powerful
- Our monkey mascot (attached) making a promise

Keep the same clean reveal energy, the trust visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  // ============================================
  // GOOGLE ADS 2026 (20 lessons)
  // ============================================

  'google-highest-cpa-wins': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "HIGHEST WINS"
- Show GOLD TROPHY with "$50 CPA" engraved
- Winner podium, victory visual
- Add Google logo (attached)

Keep the same wealth/success energy, the winning visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-pmax-blueprint': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "PMax BLUEPRINT"
- Show BLUEPRINT diagram of PMax campaign structure
- Technical schematic visualization
- Add Google logo (attached)

Keep the same blueprint energy, the architecture visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-product-feed-mastery': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FEED = AD"
- Show SPREADSHEET transforming into polished ad creative
- Data flowing visualization
- Add Google and Shopify logos (attached)

Keep the same tech/systems energy, the transformation visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.shopify],
  },

  'google-shopping-intent': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "ACTIVE INTENT"
- Show BUYER with money ready in hand, actively searching
- High-intent visualization
- Add Google logo (attached)

Keep the same growth energy, the buyer intent visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-brand-moat': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "BRAND MOAT"
- Show CASTLE with Google colors surrounded by protective moat
- Defensive fortress visualization
- Add Google logo (attached)

Keep the same wealth/success energy, the defense visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-data-quality-edge': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "DATA IN → AI OUT"
- Show DATA QUALITY FUNNEL feeding into AI brain
- Garbage in/garbage out visualization
- Add Google logo (attached)

Keep the same tech/systems energy, the data quality visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google],
  },

  'google-competitor-conquest': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "CONQUEST"
- Show FLAG being planted on competitor territory
- Victory visualization
- Add Google logo (attached)

Keep the same comparison energy, the conquest visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-store-trust-checklist': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "TRUST FIRST"
- Show CHECKLIST with green checkmarks
- Trust badges visualization
- Add Google logo (attached)

Keep the same tech/dashboard energy, the checklist visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google],
  },

  'google-hero-product-funnel': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "HERO PRODUCTS"
- Show FUNNEL with products being filtered
- Winners emerging at bottom glowing
- Add Google logo (attached)

Keep the same growth energy, the funnel visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-click-fraud-shield': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "SHIELD"
- Show GOLDEN SHIELD blocking red evil bot icons
- Protection force field visualization
- Add Google logo (attached)

Keep the same brain/protection energy, the shield visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-ai-max-decision': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "POWER vs CONTROL"
- LEFT: Powerful AI brain
- RIGHT: Human hand with control
- Add Google logo (attached)

Keep the same comparison energy, the balance visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google],
  },

  'google-negative-keyword-colander': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FILTER"
- Show COLANDER/FILTER with bad keywords draining out
- Only good clicks staying visualization
- Add Google logo (attached)

Keep the same tech/dashboard energy, the filter visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-optimization-cadence': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "RHYTHM"
- Show CALENDAR DASHBOARD with optimization schedule
- Weekly/monthly cadence visualization
- Add Google logo (attached)

Keep the same tech/dashboard energy, the cadence visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google],
  },

  'google-ad-assets-arsenal': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FREE REAL ESTATE"
- Show EXPANDED Google ad with all assets utilized
- Bigger ad taking more screen space
- Add Google logo (attached)

Keep the same tech energy, the expanded visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google],
  },

  'google-landing-page-bridge': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182152.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "AFTER THE CLICK"
- Show arrow journey from ad click to landing page
- Bridge visualization - conversion path
- Add Google logo (attached)

Keep the same tech/dashboard energy, the journey visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-ai-overviews-opportunity': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "AI OVERVIEWS"
- Show PHONE with Google AI overview results page
- New search format, opportunity highlight
- Add Google logo (attached)

Keep the same tech energy, the opportunity visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-budget-reallocation': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "2.8x → 5.1x"
- Show MONEY flowing from losing campaigns to winners
- ROAS curve going up
- Add Google logo (attached)

Keep the same growth energy, the reallocation visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-focus-firepower': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FOCUS"
- Show LASER BEAM concentrating on single target
- Scattered vs focused comparison
- Add Google logo (attached)

Keep the same dramatic energy, the focus visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  'google-influencer-creative': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "OUTSOURCE"
- Show INFLUENCER creating content flowing to Google ads
- Creative factory visualization
- Add Google logo (attached)

Keep the same tech/systems energy, the production visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.google, imageAssets.monkey],
  },

  // ============================================
  // BUSINESS FUNDAMENTALS (50+ lessons)
  // ============================================

  'biz-infinite-money-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "∞ MONEY"
- Show INFINITY LOOP made of $100 bills
- Flywheel motion visualization
- Add Alex Hormozi (attached)

Keep the same wealth/success energy, the infinite loop visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-rat-brain-hijack': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "HIJACK"
- Show RAT BRAIN with attention cables being plugged in
- Subconscious trigger visualization
- Our monkey mascot (attached) pulling the strings

Keep the same brain visual energy, the control visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-velocity-advantage': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "SPEED"
- Show ROCKET accelerating past competitors
- Velocity trails, unfair advantage visual
- Our monkey mascot (attached) riding the rocket

Keep the same growth energy, the speed visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-remarkable-product': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "REMARKABLE."
- Show PRODUCT floating with purple cow glow aura
- Standing out dramatically from gray background
- Our monkey mascot (attached) presenting the remarkable product

Keep the same clean reveal energy, the standout visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-asset-not-job': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171322.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "ASSET vs JOB"
- Left side: Show a GROWING BUILDING/SKYSCRAPER getting taller, money raining down, green glow
- Right side: Person trapped in HAMSTER WHEEL, exhausted, spinning forever, red glow
- Add "$3M DIFFERENCE" badge at bottom
- Our monkey mascot (attached) escaping from the wheel side to the asset side

Keep the same split-screen drama, the contrast energy, the professional look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-leverage-equation': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171356.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "LEVERAGE"
- Show our monkey mascot (attached) using a SMALL LEVER to lift a MASSIVE BOULDER
- The lever is TINY, the boulder is HUGE - visual contrast showing leverage power
- Add physics diagram lines showing the fulcrum advantage
- Text: "WORK SMARTER" at bottom

Keep the same visual style, the educational diagram energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-counter-position': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171439.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "NEW BATTLEFIELD"
- Show SMALL WARRIOR (our monkey mascot attached) on HIGH GROUND with tactical advantage
- GIANTS with money bags stuck in the valley below, confused, their size is useless here
- The terrain favors the small player - arrows showing strategic advantage
- Text: "THEIR MONEY IS WORTHLESS HERE"

Keep the same dramatic warfare visual, the strategic positioning energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-awareness-sweet-spot': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171528.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE SWEET SPOT"
- Show a VENN DIAGRAM with two circles: "FEEL THE PAIN" and "DON'T KNOW SOLUTION"
- The INTERSECTION is GLOWING GOLD - this is THE sweet spot
- Big arrow pointing to the golden center: "ENTER HERE"
- Our monkey mascot (attached) standing in the sweet spot, arms crossed confidently

Keep the same clean diagram style, the strategic clarity.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-barbell-strategy': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "5% + 95%"
- Show a BARBELL with heavy weights on each end - NOTHING in the middle (empty bar)
- Left side: "SAFE 95%" (bonds, cash) - Right side: "WILD 5%" (moonshots)
- The MIDDLE is crossed out - avoid mediocrity
- Our monkey mascot (attached) holding the barbell perfectly balanced

Keep the same blueprint/strategic diagram style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-one-pager-blueprint': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171654.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "ONE PAGE"
- Show a SINGLE GLOWING DOCUMENT in the center - the blueprint
- Around it: crossed-out shiny objects (social media icons, new tools, trends) all REJECTED
- The one page is FOCUSED, everything else is noise
- Our monkey mascot (attached) holding the one page like a sacred scroll

Keep the same minimal focus, the clarity over chaos energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-infinite-money-loop': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171741.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "6 STEPS TO ∞"
- Show a CIRCULAR FLYWHEEL with 6 glowing segments
- Money flowing through the loop, getting bigger each rotation
- Arrows showing the infinite cycle motion
- Our monkey mascot (attached) in the center, spinning the wheel

Keep the same flywheel energy, the money multiplication visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-marketing-company': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171901.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "you're not a brand."
- Show a MIRROR with reflection - person sees "MARKETING COMPANY" reflected back
- The identity shift visual - what you think vs what you are
- Lowercase text, editorial minimal style
- Small text: "you sell products"

Keep the same minimal aesthetic, the profound simplicity.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-product-expansion': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172423.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "1 → 100"
- Show a SINGLE WALLET in center exploding outward into infinite products
- Arrows radiating out to: bags, cases, accessories, rings, straps
- The expansion tree visual - one hero product becoming an empire
- Ridge Wallet brand aesthetic - minimalist, premium, metal

Keep the same expansion/multiplication visual energy.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-zero-cac-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 171938.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "$0 CAC"
- Show customers FLOWING IN through a door marked "FREE ENTRY"
- No ads, no spend - organic traffic visualization
- Money appearing without paying for it
- Our monkey mascot (attached) at the door welcoming free customers, holding sign "$0"

Keep the same visual energy, the money flow aesthetic.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-creative-targeting': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "CREATIVE = TARGETING"
- Show a creative ad image MERGING with a target/bullseye into ONE thing
- The two becoming ONE - creative IS targeting now
- Meta logo floating, representing the new AI era
- Equals sign glowing between creative and targeting
- Our monkey mascot (attached) holding both creative and target, combining them

Keep the same dark tech dashboard aesthetic.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey, imageAssets.meta],
  },

  'biz-3x-threshold': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to massive "3X" in gold metallic
- Show the 3X as a THRESHOLD barrier - below it is danger zone (red), above it is success (green)
- LTV:CAC ratio visualization - 3X is the magic number
- Money piles growing once you cross the 3X line
- Alex Hormozi (attached) at the 3X mark, pointing at it as the rule

Keep the same money pyramid dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-asymmetric-monopoly': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172004.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "1400:1"
- Show massive ratio visualization - tiny figure VS 1400 competitors crushed below
- The asymmetric advantage is VISUAL - one small thing defeating everything
- Text: "LEGAL MONOPOLY"
- Our monkey mascot (attached) at the top of the 1400:1 mountain

Keep the same dramatic scale contrast, the dominance visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-authenticity-anchor': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 185720.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "40 YEARS"
- Show a TIMELINE of Nike logo through the decades - 1984 to 2024
- The swoosh NEVER changes - consistent, authentic, anchored
- Trends and fads fading around it, but Nike stays the same
- "Still cool" badge glowing

Keep the same evolution/timeline visual, the longevity energy.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-brand-ltv-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172357.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "RETURN REASONS"
- Show a STORE in center with multiple ARROWS pointing BACK to it from customers
- Each arrow labeled: "New Color", "Collector", "Gift", "Upgrade"
- Customers returning again and again - the loop
- Le Creuset and LEGO logos as examples
- Our monkey mascot (attached) at the store entrance, welcoming returning customers

Keep the same multiplication/return visual energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-brand-temple': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172512.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE TEMPLE"
- Show a GREEK TEMPLE structure with brand pillars
- Each pillar labeled: "QUALITY", "STORY", "STATUS", "HERITAGE"
- Golden light emanating from within the temple
- Ralph Lauren polo horse logo floating above as the deity
- Our monkey mascot (attached) as temple guardian at the entrance

Keep the same architectural/structural visual energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-cash-conversion': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "-30 DAYS"
- Show a REVERSE CLOCK or timeline - money arriving BEFORE the product ships
- Green arrow going backwards in time
- Cash flowing in, product going out later
- The negative cash conversion cycle visual
- Our monkey mascot (attached) collecting money while holding "SHIPS LATER" sign

Keep the same clean money visual style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-closer-framework': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "C.L.O.S.E.R."
- Show a 6-STEP STAIRCASE descending - each step is one letter
- C = Clarify, L = Label, O = Overview, S = Sell, E = Explain, R = Reinforce
- Golden glow on the final "R" step at the bottom
- Alex Hormozi (attached) standing confidently at the bottom, having closed the deal

Keep the same blueprint/framework diagram style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-courage-variable': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172030.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "7,000 FAILURES"
- Show a MOUNTAIN made of 7,000 small failures/X marks building up to SUCCESS at peak
- The failures are the foundation - you need them to reach the top
- Golden light at the summit
- Our monkey mascot (attached) climbing over the failures toward the peak

Keep the same growth trajectory visual, the perseverance energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-empathy-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172100.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FEEL THEM"
- Show two hearts CONNECTED by glowing empathy beams
- One heart is the business, one is the customer - connected deeply
- Warm energy flowing between them
- Our monkey mascot (attached) with hand on heart, genuinely caring

Keep the same emotional connection visual, the warmth energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-four-pillars': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172150.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "4 PILLARS"
- Show FOUR GREEK PILLARS holding up a golden roof structure
- Each pillar labeled with a fundamental: PRODUCT, MARKETING, OPERATIONS, FINANCE
- The structure only stands with ALL four pillars
- Our monkey mascot (attached) as the architect presenting the structure

Keep the same architectural diagram visual, the foundational energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-hamster-wheel': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172239.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE TRAP"
- Show our monkey mascot (attached) TRAPPED in a giant HAMSTER WHEEL
- He's running exhausted but going nowhere - the wheel spins endlessly
- Prison bars around the wheel - it's a cage disguised as a business
- Red warning glow around the trap

Keep the same trapped energy, the escape urgency.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-infinite-flywheel': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172357.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "$100 → ∞"
- Show a FLYWHEEL spinning with $100 going IN and INFINITE money coming OUT
- Each rotation multiplies - the flywheel gets faster and faster
- Green money glow increasing with momentum
- Our monkey mascot (attached) pushing the flywheel, getting momentum

Keep the same money multiplication visual, the infinite loop energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-leaders-burden': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172423.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "YOUR FAULT"
- Show our monkey mascot (attached) carrying HEAVY WEIGHT on shoulders
- The weight is labeled with all business responsibilities
- He's bearing it willingly - ultimate accountability
- Dark dramatic lighting, silhouette energy

Keep the same burden visualization, the responsibility energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-lifetime-gross-profit': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172512.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "YOU'RE WRONG"
- Show a CALCULATOR with wrong LTV formula - big RED X through it
- The common mistake exposed - everyone calculates this wrong
- Arrow pointing to the correct formula glowing green
- Our monkey mascot (attached) shocked at the mistake

Keep the same callout style, the mistake revelation energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-logic-trap': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 173654.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "LOGIC FAILS"
- Show a BRAIN making a "smart" decision that leads into a TRAP
- The logical path leads to disaster - arrows showing the trap
- What looks right is WRONG
- Our monkey mascot (attached) with lightbulb but walking into trap

Keep the same brain visual, the counterintuitive trap energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-ltv-cac-dashboard': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 182037.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE DASHBOARD"
- Show a PILOT COCKPIT with business gauges: LTV:CAC ratio, ROAS, Margin
- Speedometers and dials showing business health metrics
- Tech interface overlay, dark dramatic background
- Our monkey mascot (attached) as the pilot, hands on controls

Keep the same tech dashboard visual, the operator cockpit energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-ltv-levers': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 185133.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "7 LEVERS"
- Show a CONTROL PANEL with 7 physical levers/sliders
- Each lever controls an LTV component: AOV, Frequency, Retention, etc.
- Some levers pushed up (green), optimization visualization
- Our monkey mascot (attached) pulling the levers strategically

Keep the same control panel visual, the optimization energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-model-vs-method': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 185328.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "MODEL vs METHOD"
- Left side: BLUEPRINT/architectural plan (MODEL) - glowing, strategic, winning
- Right side: TOOLBOX with random tools (METHOD) - messy, tactical, losing
- Model side clearly superior - green check vs red X
- Arrow showing MODEL always beats METHOD

Keep the same versus comparison visual, the strategic superiority energy.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-objection-dance': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 185553.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "DANCE"
- Show two figures DANCING elegantly together - not fighting
- One figure is the salesperson, one is the objection
- They move together gracefully - objection transformed into partner
- Our monkey mascot (attached) leading the dance, smooth and confident

Keep the same elegant movement visual, the graceful persuasion energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-operator-mindset': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "OPERATOR"
- Show a COCKPIT DASHBOARD with business metrics on screens
- Control panels showing: CAC, LTV, ROAS, Margins, Inventory
- The pilot's seat perspective - you're in control
- Our monkey mascot (attached) in pilot gear, hands on controls, focused and operational
- Gymshark logo subtle in corner as case study

Keep the same dark tech dashboard aesthetic.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey, imageAssets.gymshark],
  },

  'biz-purchase-cycle-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Left side: "10 YEARS" with red X (old slow purchase cycle)
- Right side: "1 YEAR" with green checkmark (compressed cycle)
- Visual: Long timeline being SQUEEZED into short one
- Le Creuset Dutch ovens as the product example
- Compression arrows showing 10x faster repurchase

Keep the same comparison/before-after layout style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-replication-protocol': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172357.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "COPY MACHINE"
- Show a XEROX MACHINE duplicating success - one winning ad going in, 100 copies coming out
- The replication visual - systems beating talent
- Assembly line of identical winning creatives
- Our monkey mascot (attached) operating the copy machine, mass-producing winners

Keep the same multiplication/scaling visual energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-rfm-secret': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "R.F.M."
- Show a 3D CUBE chart with three axes: Recency, Frequency, Monetary
- One golden quadrant highlighted - "BEST CUSTOMERS" with crown
- Other quadrants grayed out
- Data visualization aesthetic - clean, analytical
- Our monkey mascot (attached) pointing at the golden quadrant with magnifying glass

Keep the same dark tech/data dashboard aesthetic.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-rule-of-100': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to massive "100" in gold metallic
- Show the number 100 as a MONUMENT - huge, unavoidable, powerful
- Small icons around it: 100 ads, 100 calls, 100 emails, 100 products
- Volume before optimization - do 100 first
- Our monkey mascot (attached) at the base of the 100 monument, looking up in awe

Keep the same money/success pyramid dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-valley-protocol': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Keep the growth curve concept - UP, DOWN (valley), UP again
- Colors: Green start → Red valley → Green peak
- Arrow pointing to the valley: "97% QUIT HERE"
- The valley is the danger zone, the dip that kills most businesses
- Our monkey mascot (attached) climbing OUT of the valley toward the second peak
- Text: "YOU'RE HERE" with arrow pointing to wherever viewer is

Keep the same curve/journey visual, the Hormozi growth curve energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-high-margin-fortress': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172512.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FORTRESS"
- Show a CASTLE/FORTRESS built from stacked margin blocks (60%, 70%, 80%)
- Impenetrable walls - competitors can't break through
- Golden light emanating from within - treasure protected
- Moat around the fortress filled with money
- Our monkey mascot (attached) as the fortress king on top

Keep the same architectural/structure visual energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-ridge-wallet-protocol': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172150.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "∞ LTV"
- Show a SINGLE Ridge Wallet in center with infinite symbol above it
- Customer journey: Buy wallet → Buy case → Buy bag → Buy ring → Forever
- The infinite LTV loop visualization
- Arrows showing customers never leaving the ecosystem
- Minimalist, premium metal aesthetic

Keep the same product-focused showcase style.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-20-domination': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "20% = 80%"
- Show a SMALL VIP GROUP (20%) connected to MASSIVE money pile (80%)
- Pareto visualization - few customers, most revenue
- Crown on the 20% group - they're the royalty
- Golden connection line between small group and big pile
- Our monkey mascot (attached) standing with the VIP 20%, arms crossed

Keep the same money pyramid dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-channel-mix-formula': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE MIX"
- Show a PIE CHART dashboard with optimal channel allocation
- Slices labeled: Meta 40%, Google 30%, TikTok 20%, Other 10%
- Each slice with its platform icon and color
- The perfect balance visualization
- Our monkey mascot (attached) as the DJ mixing the channels like a soundboard

Keep the same dark tech dashboard aesthetic.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey, imageAssets.meta],
  },

  'biz-next-best-dollar': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182129.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "NEXT DOLLAR"
- Show a SINGLE DOLLAR with multiple arrows pointing to different investments
- One arrow glowing brighter than the rest - the BEST next dollar spot
- Options: More ads, New product, Hire, Inventory, Save
- Capital allocator decision visualization
- Our monkey mascot (attached) holding the dollar, pointing at the glowing best option

Keep the same decision/arrow visual, the strategic allocation energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-authenticity-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 185720.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "CAN'T COPY"
- Show a FINGERPRINT glowing with unique, one-of-a-kind pattern
- The fingerprint is YOUR brand DNA - impossible to replicate
- Competitor logos trying and failing to copy, crumbling
- Gold/premium energy around the fingerprint

Keep the same unique identity visual, the irreplaceable energy.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-creator-army': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 185921.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "500+ CREATORS"
- Show an ARMY of 500+ micro-creators marching together with cameras/phones
- On the other side: ONE expensive agency crossed out with red X
- The army is WINNING - more content, lower cost
- Our monkey mascot (attached) leading the creator army like a general

Keep the same versus comparison visual, the volume advantage energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-mission-driven-brand': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 190055.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE CAUSE"
- Show a FLAG waving heroically with mission/purpose symbol
- People rallying behind the flag - movement energy
- The cause INSPIRES action - hearts and fire emojis
- Our monkey mascot (attached) proudly holding the flag

Keep the same inspirational movement visual, the purpose-driven energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-savage-mentality': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 190144.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "SAVAGE"
- Show PREDATOR EYES glowing in darkness - lion or wolf
- The eyes are RELENTLESS - pure execution energy
- Dark dramatic background, red/orange glow from eyes
- Our monkey mascot (attached) with the same savage eyes

Keep the same predator intensity visual, the relentless execution energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-systems-architect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 190218.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "ARCHITECT"
- Show an ARCHITECTURAL BLUEPRINT with interconnected business systems
- Each system connected to others - marketing, ops, finance, product
- The $10M+ business structure visualized
- Our monkey mascot (attached) as the architect with blueprint in hand

Keep the same systems architecture visual, the strategic builder energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-90-percent-trap': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 190255.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "90% TRAPPED"
- Show 90% of people GAMBLING with dice, blindfolded, guessing
- The other 10% using CALCULATORS, data, math
- Arrow pointing to the trap: "GUESSING = DEATH"
- Our monkey mascot (attached) holding calculator, not guessing

Keep the same trap revelation visual, the math vs luck energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-animal-mindset': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to massive "$500M" in gold
- Show Davie Fogarty (attached) at the top of a money mountain with INTENSE expression
- Animal energy - relentless, unstoppable, savage
- The Oodie product subtly in background as the $500M machine
- Fire/energy radiating from the intensity

Keep the same money pyramid dramatic style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.davieFogarty],
  },

  'biz-channel-cac-decoder': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 190436.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "BLENDED LIES"
- Show a DASHBOARD with "Blended CAC" number peeling away to reveal HIDDEN TRUE CAC underneath
- The true number is MUCH worse - exposed truth
- Red warning badge: "YOUR DATA IS LYING"
- Our monkey mascot (attached) peeling back the layer, shocked at real number

Keep the same reveal/expose visual, the data truth energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-6-to-1-problem': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 190626.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "6:1 PROBLEM"
- Show a "6:1" ratio that looks GREAT but has a BOMB underneath it
- The amazing ratio is actually KILLING growth - ticking time bomb
- Arrow: "THIS IS BAD"
- Our monkey mascot (attached) trying to defuse the bomb, worried

Keep the same warning/trap visual, the counterintuitive danger energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-survival-cycle': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-18 190731.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "DOOM LOOP"
- Show a DOWNWARD SPIRAL with people trapped spinning down
- 97% badge showing how many are trapped
- The cycle keeps repeating - no escape visualization
- Our monkey mascot (attached) breaking out of the spiral upward

Keep the same trapped spiral visual, the escape urgency energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-infinite-money-glitch': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190630.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE GLITCH"
- Show a VIDEO GAME GLITCH with money DUPLICATING infinitely
- Matrix/glitch visual effects - the system is being exploited
- ∞ symbol made of money
- Our monkey mascot (attached) found the glitch, excited

Keep the same visual style with glitch effect energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'biz-price-anchoring': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190651.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "$47 vs $297"
- Show $47 price tag looking TINY next to MASSIVE $297 anchor
- The anchor makes the small price feel like a steal
- Arrow: "FEELS CHEAP"
- Visual scale showing the psychological trick

Keep the same comparison visual, the anchoring psychology energy.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'biz-look-back-window': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190752.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "30 DAYS LIES"
- Show a CALENDAR with only 30 days visible - but MASSIVE blind spot beyond
- The true conversion data is HIDDEN beyond the window
- Arrow pointing to blind spot: "YOU CAN'T SEE THIS"
- Our monkey mascot (attached) shining flashlight into the blind spot

Keep the same blind spot revelation visual, the hidden truth energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  // ============================================
  // ADDITIONAL CRO LESSONS (20 lessons)
  // ============================================

  'checkout-line-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190813.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "IMPULSE"
- Show a CHECKOUT LANE with candy/small items at eye level
- Shopping cart with main items, but HAND reaching for impulse add
- "+23% AOV" badge showing the effect
- Our monkey mascot (attached) strategically placing items at checkout

Keep the same retail psychology visual, the impulse purchase energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'compound-testing-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190832.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "1% + 1% + 1%..."
- Show small 1% BLOCKS stacking up into EXPONENTIAL CURVE
- Each small win builds on the last - compound growth visualization
- The curve EXPLODES upward at the end
- Text: "SMALL WINS = BIG RESULTS"

Keep the same growth trajectory visual, the compound effect energy.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'emotional-gap': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190901.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE GAP"
- Show a CANYON/GAP between "DESIRE" (left) and "ACTION" (right)
- A BRIDGE being built across the gap
- Our monkey mascot (attached) building the bridge, connecting the two sides
- Customers crossing the bridge = conversions

Keep the same gap/bridge visual, the connection energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'emotional-problem': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191004.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE REAL PROBLEM"
- Show an ICEBERG with tiny tip visible above water "Surface Problem"
- MASSIVE hidden problem underwater "Emotional Problem" 10x bigger
- Arrow pointing down: "DIG DEEPER"
- Our monkey mascot (attached) diving down to the real problem

Keep the same iceberg metaphor visual, the hidden depth energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'five-value-heuristics': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191221.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "5 SHORTCUTS"
- Show a BRAIN with 5 LIGHTNING BOLT pathways highlighted
- Each pathway is a fast mental shortcut to "YES"
- The shortcuts bypass slow thinking
- Our monkey mascot (attached) pointing to the 5 pathways

Keep the same brain pathway visual, the mental shortcut energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'ice-prioritization': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191250.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "I.C.E."
- Show a SCORECARD/DASHBOARD with three columns: Impact, Confidence, Ease
- Tests ranked by ICE score - top ones glowing green
- The framework visualized as prioritization tool
- Our monkey mascot (attached) checking off the highest score test

Keep the same framework dashboard visual, the prioritization clarity energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'identity-shift-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191449.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "BECOME"
- Show person TRANSFORMING/MORPHING from "BEFORE" to "AFTER" state
- The product is the CATALYST for the transformation
- Identity shift in progress - butterfly effect
- Our monkey mascot (attached) facilitating the transformation

Keep the same transformation visual, the identity shift energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'le-creuset-scarcity-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2025-12-17 172423.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "1 COLOR LEFT"
- Show a RAINBOW of Le Creuset Dutch ovens - all faded/sold out except ONE vibrant color
- "SOLD OUT" stamps on most colors
- The one available color GLOWING with scarcity energy
- Collector FOMO visualization - limited colors create collectors
- Our monkey mascot (attached) holding the last available color like a trophy

Keep the same product showcase multiplication style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'local-holiday-legitimacy': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191516.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "LOCAL WINS"
- Show a GLOBE with different regions highlighted with their cultural holidays
- Calendar icons with local celebrations - Diwali, Chinese New Year, etc.
- "$+40% SALES" badge showing local relevance impact
- Our monkey mascot (attached) celebrating with local flag

Keep the same global/local visual, the cultural relevance energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'logo-is-worthless': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191534.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "worthless."
- Show a LOGO symbol fading/dissolving into nothing
- The logo has NO value by itself - exposed truth
- Minimal, editorial, provocative style
- Small text: "brand equity isn't in the symbol"

Keep the same minimal confrontational visual, the truth bomb energy.
16:10 ratio. Don't put the time block.`,
    images: [],
  },

  'micro-yes-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191556.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "yes, yes, YES!"
- Show STEPS ascending with "yes" on each step getting BIGGER
- Small yes → medium YES → MASSIVE YES at the top
- Momentum building visualization
- Our monkey mascot (attached) climbing the yes steps to the top

Keep the same momentum/escalation visual, the micro-commitment energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'missing-piece-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191618.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "ALMOST COMPLETE"
- Show a PUZZLE with ONE PIECE missing - 99% complete
- The missing piece is GLOWING - it's calling to be filled
- Brain can't resist completing it
- Our monkey mascot (attached) holding the missing piece, about to complete

Keep the same completion urge visual, the incompleteness psychology energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'nine-trust-levers': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191641.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "9 LEVERS"
- Show a CONTROL PANEL with 9 trust levers/switches
- Each lever labeled: Reviews, Guarantees, Social Proof, Badges, etc.
- Some levers ON (green), showing optimization
- Our monkey mascot (attached) at the control panel, pulling levers

Keep the same control panel visual, the trust optimization energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'ninety-seven-percent-leak': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191702.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "97% LEAK"
- Show a FUNNEL with 97% of visitors/money POURING OUT of holes
- Only 3% making it through to purchase
- Red dramatic loss visualization
- Our monkey mascot (attached) trying to plug the holes

Keep the same leaky funnel visual, the conversion loss urgency energy.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'offer-is-everything': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE OFFER IS EVERYTHING"
- Replace the pyramid/money visual with a GLOWING GIFT BOX that outshines everything else
- Add Alex Hormozi (attached) looking at the box knowingly
- Everything else (copy, design elements) should be dim compared to the offer box

Keep the same wealth/success energy, the premium professional look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.alexHormozi],
  },

  'owned-audience-effect': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185309.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "OWN YOUR AUDIENCE"
- Show an audience/crowd that's IN YOUR POCKET - literally a pocket with followers inside
- Our monkey mascot (attached) holding the pocket protectively, away from social media platforms
- Platform logos (Instagram, TikTok) faded in background, unable to reach

Keep the same ownership energy, the control visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'pain-dream-bridge': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the layout to: LEFT side = PAIN (dark, red, person suffering)
- RIGHT side = DREAM (golden, bright, person thriving)
- Add a BRIDGE connecting them in the middle, glowing
- Our monkey mascot (attached) standing on the bridge, guiding the way
- Text: "THE BRIDGE" at top

Keep the same comparison layout energy, the transformation visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'performance-engine': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182542.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the visual to a WELL-OILED ENGINE with gears turning
- All parts working together, arrows showing flow
- Text: "THE PERFORMANCE ENGINE"
- Our monkey mascot (attached) as the engineer, tweaking the machine

Keep the same tech/systems energy, the professional dashboard look.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'poppy-disruptor-blueprint': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "DISRUPT"
- Show a POPPY FLOWER breaking through CONCRETE - beautiful disruption
- Convention-breaking visual, something unexpected emerging
- Our monkey mascot (attached) helping the flower break through

Keep the same clean modern energy, the breakthrough visual impact.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'post-purchase-momentum': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "AFTER THE SALE"
- Show a GROWTH CURVE that CONTINUES UPWARD after the purchase point
- Mark the purchase point, then show acceleration after
- Our monkey mascot (attached) celebrating on the rising curve
- Add "$$$ REPEAT BUYERS" visualization

Keep the same growth/momentum energy, the chart visual style.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  // ============================================
  // REMAINING LESSONS (30+ lessons)
  // ============================================

  'premium-flywheel': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183933.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "PREMIUM FLYWHEEL"
- Show a GOLDEN FLYWHEEL spinning with luxury elements - velvet, crystals, compound motion
- Each spin adds more value/prestige
- Our monkey mascot (attached) in a tuxedo, keeping the flywheel spinning elegantly

Keep the same premium energy, the compound growth visualization.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'price-creates-value': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182406.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "PRICE = VALUE"
- Show two identical products: LEFT = $50 (dim, cheap looking), RIGHT = $500 (glowing, premium aura)
- Arrow pointing from price to perceived value glow
- Our monkey mascot (attached) revealing the pricing secret

Keep the same comparison energy, the revelation visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'psychological-moat': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "MENTAL MOAT"
- Show a BRAIN protected by a MOAT with water, castle walls
- Competitors trying to get in but can't - the moat protects
- Our monkey mascot (attached) as the castle guard, keeping others out

Keep the same brain visual energy, the protection imagery.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'self-selection-principle': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183115.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THEY CHOOSE YOU"
- Show customers SELF-SORTING into different tiers/doors
- Gold door (premium customers), silver door (regular), bronze door (budget)
- Our monkey mascot (attached) watching them naturally sort themselves

Keep the same sorting/filtering energy, the qualification visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'sell-the-identity': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182023.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "SELL WHO THEY BECOME"
- Show a person TRANSFORMING into their ideal self - silhouette becoming golden
- Before (gray, small) → After (golden, confident, powerful)
- Our monkey mascot (attached) as the transformation guide

Keep the same transformation energy, the identity shift visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'shape-psychology': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181735.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "SHAPES TALK"
- Show 3 shapes with meanings: CIRCLE (friendly, soft), SQUARE (stable, trustworthy), TRIANGLE (powerful, dynamic)
- Each shape glowing with its energy
- Our monkey mascot (attached) pointing at the shapes like a professor

Keep the same blueprint/educational energy, the teaching visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'smallest-viable-market': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191421.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "START TINY"
- Show a SMALL CIRCLE that dominates its space, then arrows showing expansion
- Niche domination visual - be big in small pond first
- Add Seth Godin (attached) looking wise, approving the strategy

Keep the same strategic energy, the market positioning visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.sethGodin],
  },

  'sms-open-rate-secret': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182304.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "98% OPEN RATE"
- Show SMS notification badge CRUSHING email (98% vs 20%)
- Phone with SMS winning over laptop with email
- Our monkey mascot (attached) holding phone victoriously

Keep the same tech/comparison energy, the winning visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'story-changes-taste': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183541.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "STORY = TASTE"
- Show the SAME WINE with different story labels - cheap story vs premium story
- The wine with rich story GLOWS, the one without looks dull
- Our monkey mascot (attached) as a sommelier, revealing the secret

Keep the same editorial energy, the perception-changing visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'thirty-five-thousand-decisions': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 185217.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "35,000 DECISIONS"
- Show an OVERWHELMED BRAIN with too many pathways, decision fatigue
- Numbers floating everywhere, paralysis visualization
- Our monkey mascot (attached) exhausted from all the choices

Keep the same brain visual energy, the overwhelm feeling.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'whale-customer-paradox': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191052.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE WHALES"
- Show a SMALL GROUP of VIP whale customers on massive pile of money
- They behave differently than the masses - crown them
- Our monkey mascot (attached) bowing to the whale customers

Keep the same wealth energy, the VIP visualization.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'dior-pricing-secret': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 184733.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the layout to: LEFT = "$57" (factory), RIGHT = "$3,500" (luxury store)
- Same bag, 60x markup visualization
- Add Dior/luxury brand logo subtly
- Our monkey mascot (attached) revealing the pricing secret, mind blown

Keep the same comparison energy, the price disparity shock.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey, imageAssets.chanel],
  },

  'consumption-conversion': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182608.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "THE GAP"
- Show a CANYON between "Reading" (left) and "Buying" (right)
- People falling into the gap - the conversion loss
- Our monkey mascot (attached) building a bridge across the gap

Keep the same dramatic energy, the gap visualization.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'luxury-mindset-shift': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 181654.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "4 MINDSET SHIFTS"
- Show a MIND transforming through 4 stages: commodity → premium
- Each stage more golden and elevated
- Our monkey mascot (attached) ascending through the mindset levels

Keep the same transformation energy, the progression visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'three-cro-tests': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 182129.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "ONLY 3 TESTS"
- Show 3 TEST TUBES with results - these 3 matter, others grayed out
- Revenue impact metrics visible
- Our monkey mascot (attached) as a scientist, running the tests

Keep the same tech/dashboard energy, the testing visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'digital-velvet-rope': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 190557.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "VELVET ROPE"
- Show a RED VELVET ROPE barrier with VIP glow behind it
- Some people allowed through (exclusive), others waiting
- Our monkey mascot (attached) as the bouncer, controlling access

Keep the same dramatic energy, the exclusivity visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'hidden-menu-psychology': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183359.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "SECRET MENU"
- Show a HIDDEN MENU being revealed - secret options glowing
- Regular menu faded, secret menu golden
- Our monkey mascot (attached) with a knowing wink, revealing the secrets

Keep the same reveal energy, the insider knowledge visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'celebrity-gifting-flywheel': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 191148.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FREE → MILLIONS"
- Show a GIFT BOX transforming into massive influence/money cloud
- Free product → celebrity post → millions in sales arrow
- Our monkey mascot (attached) gifting the product strategically

Keep the same growth energy, the flywheel transformation visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
  },

  'forbidden-coffee-hook': {
    template: 'reference-based',
    referenceImage: 'Screenshot 2026-01-08 183640.png',
    concept: `Hey! Create me this EXACT same YouTube thumbnail style, but with these changes:
- Change the text to "FORBIDDEN"
- Show a COFFEE CUP with mysterious dark aura, forbidden fruit energy
- Exclusivity and mystery wrapped together - you can't have it easily
- Our monkey mascot (attached) guarding the forbidden coffee

Keep the same dramatic dark energy, the forbidden mystique visual.
16:10 ratio. Don't put the time block.`,
    images: [imageAssets.monkey],
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
  const [filter, setFilter] = useState<'all' | 'with' | 'without' | 'fixlater'>('all');
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [promptTasks, setPromptTasks] = useState<Record<string, { needsNewPrompt: boolean; feedback: string }>>({});
  const [showTasksPanel, setShowTasksPanel] = useState(false);
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);
  const [fixLaterLessons, setFixLaterLessons] = useState<Set<string>>(new Set());

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

  // Load fix later lessons from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fixLaterLessons');
    if (saved) {
      try {
        setFixLaterLessons(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to parse fix later lessons:', e);
      }
    }
  }, []);

  // Save fix later lessons to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fixLaterLessons', JSON.stringify([...fixLaterLessons]));
  }, [fixLaterLessons]);

  // Toggle fix later for a lesson
  const toggleFixLater = useCallback((slug: string) => {
    setFixLaterLessons(prev => {
      const updated = new Set(prev);
      if (updated.has(slug)) {
        updated.delete(slug);
      } else {
        updated.add(slug);
      }
      return updated;
    });
  }, []);

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

  // Load lessons and their thumbnails (only once per session)
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

    // Only load if user is present and we haven't loaded lessons yet
    if (user && lessons.length === 0) {
      loadLessons();
    }
  }, [user, lessons.length]);

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
    } else if (filter === 'fixlater') {
      filtered = filtered.filter(l => fixLaterLessons.has(l.slug));
    }

    setFilteredLessons(filtered);
  }, [lessons, searchQuery, filter, fixLaterLessons]);

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

  // Only show loading spinner on initial load
  // If lessons are already loaded, keep showing content even during auth refresh
  if ((authLoading || !user) && lessons.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Only show access denied if we haven't loaded content yet
  // (prevents flash of "Access Denied" during auth refresh)
  if (!isAdmin && lessons.length === 0) {
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
                onChange={(e) => setFilter(e.target.value as 'all' | 'with' | 'without' | 'fixlater')}
                className="input py-2 px-3"
              >
                <option value="all">All Lessons</option>
                <option value="without">Missing Thumbnail</option>
                <option value="with">Has Thumbnail</option>
                <option value="fixlater">Fix Later ({fixLaterLessons.size})</option>
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

                    {/* Status Badge + Fix Later Button */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {/* Fix Later Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFixLater(lesson.slug);
                        }}
                        className={`
                          p-1.5 rounded-full text-xs font-medium transition-all
                          ${fixLaterLessons.has(lesson.slug)
                            ? 'bg-yellow-500 text-white shadow-lg'
                            : 'bg-white/80 text-gray-500 hover:bg-yellow-100 hover:text-yellow-600'
                          }
                        `}
                        title={fixLaterLessons.has(lesson.slug) ? 'Remove from Fix Later' : 'Add to Fix Later'}
                      >
                        <AlertCircle size={14} />
                      </button>

                      {/* Status Badge */}
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lesson.thumbnail_url
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-500 text-white'
                      }`}>
                        {lesson.thumbnail_url ? 'Done' : 'Needs Image'}
                      </div>
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
