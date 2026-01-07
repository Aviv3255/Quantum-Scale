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
// ULTRA-PREMIUM $10,000/THUMBNAIL PROMPT SYSTEM
// ==============================================
// Style Philosophy: MrBeast meets Apple meets Hormozi
// - Hyper-realistic 3D renders and photographic elements
// - Bold, provocative 2-4 word headlines
// - Dramatic lighting with cinematic depth
// - Diverse backgrounds but cohesive premium feel
// - Every thumbnail should stop the scroll
// ==============================================

// Background Style Categories for Diversity:
// 1. CLEAN WHITE - Minimal, Apple-style, grid paper texture
// 2. DEEP BLACK LUXURY - Rich blacks, gold accents, premium feel
// 3. ELECTRIC BLUE TECH - Neon gradients, digital aesthetic
// 4. MONEY GREEN/GOLD - Wealth visualization, success imagery
// 5. URGENT RED - Warning, mistakes, critical lessons
// 6. SPLIT SCREEN - Comparison, before/after
// 7. GRADIENT MODERN - Contemporary, innovative concepts
// 8. CINEMATIC DARK - Movie poster style, dramatic lighting

const lessonPromptData: Record<string, { prompt: string; images: string[] }> = {

  // ============================================
  // PSYCHOLOGY & COPYWRITING CORE
  // ============================================

  'familiar-surprise-secret': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle grid paper texture, like an Apple product shot. COMPOSITION: Left side - giant bold black Impact font text "IT WORKS." with period for emphasis. Right side - floating Apple logo hovering 2 inches above a pristine iPhone 15 Pro, both with soft drop shadows on the white surface. The Apple logo should have a subtle rainbow reflection. LIGHTING: Soft studio lighting from top-left, creating gentle shadows. STYLE: MrBeast meets Apple keynote. Ultra-clean, premium, makes you stop scrolling. The kind of thumbnail a Fortune 500 company would pay $10K for. I uploaded style reference images - match that exact quality level.`,
    images: [imageAssets.apple],
  },

  'red-button-effect': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Pure matte black void, like an OLED screen. HERO ELEMENT: Massive hyper-realistic glossy red button in center - think arcade button or nuclear launch button. It should have: chrome metal rim, glass-like dome top catching light, text embossed "DO NOT PRESS" in white. The button should have dramatic rim lighting (red glow underneath). TYPOGRAPHY: Bold white Impact text at top "WHY YOU CLICK" with slight 3D depth. LIGHTING: Single dramatic spotlight from above creating a pool of light on the button. MOOD: Mysterious, irresistible, psychological. The button should look so real you want to reach through the screen. MrBeast thumbnail energy. I uploaded style references - match that premium quality.`,
    images: [],
  },

  'fred-method': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clinical white with faint blue grid lines, like a neuroscience lab. HERO ELEMENT: Hyper-realistic 3D human brain (pink/coral tones, visible folds and texture) floating in center. Four thick cables/wires plugged into the brain - RED cable labeled F, BLUE labeled R, GREEN labeled E, YELLOW labeled D. Cables should look like premium audio cables with metallic connectors. TYPOGRAPHY: Bold black "F.R.E.D." text below brain, each letter matching its cable color. LIGHTING: Bright, even, medical-grade lighting. STYLE: Scientific diagram meets MrBeast. Educational but irresistible to click. Premium 3D rendering quality. I uploaded reference styles - replicate that exact aesthetic.`,
    images: [],
  },

  'emotion-decides': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Soft cream/off-white gradient, warm and inviting. COMPOSITION: LEFT SIDE - Massive hyper-realistic 3D anatomical heart (red, glossy, with visible arteries) - make it 3x larger than the brain. RIGHT SIDE - Smaller realistic brain looking almost defeated in comparison. A golden crown sits on top of the heart. TYPOGRAPHY: Bold black text "EMOTION WINS." positioned at bottom. LIGHTING: Warm golden hour lighting from left side, creating depth. I uploaded an image of Daniel Kahneman - place his professional cutout in bottom right corner, small, looking up at the heart with knowing expression. MOOD: The heart dominates. Visceral. Makes you feel something. $10K production value. Match my uploaded style references exactly.`,
    images: [imageAssets.danielKahneman],
  },

  'gatekeeper-method': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Deep charcoal gray with subtle texture. HERO ELEMENT: Massive hyper-realistic 3D brain with a small ornate golden door built into the frontal lobe. The door is slightly ajar with brilliant golden/white light streaming out, creating volumetric light rays (god rays). The brain should look wet/organic, the door should look ancient and precious. TYPOGRAPHY: Bold white text "4 DOORS." with dramatic shadow. LIGHTING: The golden light from the door is the main light source, illuminating the brain from within. MOOD: Mysterious, exclusive, like you're about to learn a secret. Premium CGI quality like a movie poster. Match the uploaded reference styles exactly.`,
    images: [],
  },

  'three-second-rule': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Solid urgent RED (#FF0000) - pure, intense, no gradients. HERO ELEMENT: Giant white bold Impact font "3" with a realistic silver stopwatch/timer overlaid on or next to it. The stopwatch should show exactly 3 seconds. TYPOGRAPHY: Large white text "SECONDS." below the 3. Add small text "YOU HAVE" above in smaller font. LIGHTING: Flat but the 3 has subtle 3D depth/shadow. MOOD: URGENT. This thumbnail should create anxiety. MrBeast-style high contrast. The red should feel like an alarm. Time is running out energy. Premium but aggressive. Match uploaded reference quality.`,
    images: [],
  },

  'science-of-selling': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white laboratory setting with faint grid lines. HERO ELEMENT: Tall glass laboratory beaker (Erlenmeyer flask style) overflowing with crisp $100 bills. The money should be spilling over the top and scattered on the white surface. Chemical formula symbols floating nearby (like $+Psychology=💰). TYPOGRAPHY: Bold black "THE FORMULA." in clean Impact font. Add a small "=" symbol before it. LIGHTING: Bright, clinical, scientific lighting. MOOD: The secret formula for money. Scientific credibility meets wealth. Premium product photography style. Educational thumbnail that promises riches. Match my uploaded style references.`,
    images: [],
  },

  'persuasion-blueprint': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Aged paper texture, like an architect's desk. HERO ELEMENT: Rolled up blueprint paper partially unrolled, revealing a detailed brain diagram with connection lines and labels (like a circuit diagram but organic). The blueprint should have that classic blue/white blueprint look. A fancy brass compass and pencil nearby. TYPOGRAPHY: Bold black "BLUEPRINT." stamped like an official document. LIGHTING: Warm desk lamp lighting from top-left. I uploaded an image of Robert Cialdini - place his cutout on the right side, dressed professionally, pointing at the blueprint with authority. He should look like the architect of persuasion. MOOD: Exclusive access to the master plan. Premium, intellectual, timeless. Match uploaded styles.`,
    images: [imageAssets.robertCialdini],
  },

  'persuasion-stack': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Soft gradient from light gray at top to white at bottom. HERO ELEMENT: A vertical stack of 5 distinct colorful layers, like a deconstructed burger but abstract/geometric. Each layer is a different vibrant color (red, blue, green, yellow, purple) with slight gaps between them showing they're separate elements. The stack should look 3D with shadows between layers. TYPOGRAPHY: Bold black "THE STACK." next to or below the stack. LIGHTING: Soft studio lighting creating depth between layers. MOOD: Building blocks of persuasion. Each layer matters. Premium 3D render quality like a tech company diagram. Clean, modern, strategic. Match uploaded reference styles.`,
    images: [],
  },

  'architecture-of-influence': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Deep navy blue gradient, sophisticated and premium. HERO ELEMENT: A beautiful golden architectural blueprint/wireframe of a building that's shaped like or contains a human head profile. Combine architecture with psychology - golden lines forming both a structure and a mind. TYPOGRAPHY: Bold white "ARCHITECT" with gold accent on the A. LIGHTING: Golden accent lighting on the wireframe structure. MOOD: You're designing minds. Powerful, intellectual, premium. Like the poster for a Christopher Nolan film about influence. $10K movie poster quality. Match my uploaded style references exactly.`,
    images: [],
  },

  'wiifm-principle': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle texture. HERO ELEMENT: A realistic person silhouette/figure pointing aggressively at themselves with both hands (like "ME! ME!"). Above them, floating thought bubbles containing money, products, success symbols. TYPOGRAPHY: Giant bold black "WHAT ABOUT ME?" - the ME should be 2x larger and in red. LIGHTING: Bright, direct, confrontational. MOOD: Selfish but relatable. Everyone thinks this. Call out the truth. The kind of bold, provocative thumbnail that gets clicks because it's uncomfortably honest. Match uploaded style quality.`,
    images: [],
  },

  'rule-of-one': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Pure matte black, luxury void. HERO ELEMENT: Massive metallic GOLD number "1" in center - hyper-realistic 3D render with perfect reflections, like a gold bar or trophy. The 1 should be thick, bold, and have that satisfying weight. Subtle gold particles/dust floating around it. TYPOGRAPHY: Clean white "JUST ONE." below in elegant font. LIGHTING: Dramatic spotlight from above creating a pool of light on the gold 1. Rim lighting on edges. I uploaded Gary Halbert's image - small cutout in bottom corner, looking wise. MOOD: Luxury, simplicity, power. The one rule that matters. Premium like a Rolex ad. Match uploaded references.`,
    images: [imageAssets.garyHalbert],
  },

  // ============================================
  // META ADS LESSONS - Tech/Digital Aesthetic
  // ============================================

  'meta-three-second-hook': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Electric blue gradient with subtle digital grid pattern, techy and modern. LEFT SIDE: Large floating Meta logo (3D, glossy). RIGHT SIDE: Realistic iPhone 15 Pro showing a video ad mid-play, with a giant red "3" overlaid on the screen like a countdown timer. Swipe-up gesture arrow visible. TYPOGRAPHY: Bold white "3 SECONDS." with blue glow effect. LIGHTING: Neon blue rim lighting on devices. MOOD: Fast, digital, urgent. Meta's algorithm is watching. Modern tech aesthetic meets MrBeast urgency. Premium digital marketing vibe. I uploaded the Meta logo - use it prominently. Match style references.`,
    images: [imageAssets.meta],
  },

  'meta-70-20-10-rule': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with Meta's signature blue as accent color. COMPOSITION: Three stacks of money, dramatically different heights - TALL stack (70% label), MEDIUM stack (20%), TINY stack (10%). Money should be crisp $100 bills, photorealistic. Meta logo floating above like it's blessing the money. TYPOGRAPHY: Bold "70/20/10" in black, each number above its respective stack. LIGHTING: Bright, clean, corporate but exciting. MOOD: The perfect formula. Data-driven wealth. This is how the pros do it. Premium infographic meets MrBeast money shot. Use the Meta logo I uploaded.`,
    images: [imageAssets.meta],
  },

  'meta-creative-ecosystem': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Deep space black with subtle blue nebula clouds. HERO ELEMENT: Meta logo as a glowing sun in the center, with 30-50 small ad creative thumbnails orbiting around it like planets in a solar system. Each mini-thumbnail should show different ad types (video, image, carousel icons). Orbital paths visible as glowing rings. TYPOGRAPHY: Bold white "50 ADS." with cosmic glow. LIGHTING: The Meta logo emits light, illuminating the orbiting ads. MOOD: Scale. Volume. A universe of creative. Epic, cinematic, makes you feel small but inspired. Premium CGI quality. Use uploaded Meta and Triple Whale logos.`,
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  'meta-capi-pixel-setup': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Dark charcoal with subtle code/matrix pattern. HERO ELEMENT: Two data streams - one BLUE (Pixel), one PURPLE (CAPI) - flowing from opposite sides and merging into a single powerful golden stream in the center. The streams should look like flowing light/data particles. Meta logo where they merge. Code brackets { } visible. TYPOGRAPHY: Bold white "CAPI + PIXEL" in tech font with subtle glow. LIGHTING: The data streams provide the lighting, creating a high-tech atmosphere. MOOD: Technical power. Dual tracking superiority. Premium developer/tech aesthetic. Use Meta and Triple Whale logos I uploaded.`,
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  'cbo-vs-abo': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Split screen - LEFT side blue, RIGHT side green. CENTER: Dramatic red dividing line with "VS" in white bold text. LEFT SIDE: "CBO" in bold white with a money bag icon, looking corporate/consolidated. RIGHT SIDE: "ABO" in bold white with multiple small ad icons, looking granular/controlled. Meta logo at the top center. TYPOGRAPHY: The VS should be massive and dramatic, like a boxing match poster. LIGHTING: Each side lit in its respective color. MOOD: Epic showdown. Which one wins? Fight night energy for marketers. MrBeast comparison thumbnail style. Premium and dramatic.`,
    images: [imageAssets.meta, imageAssets.tripleWhale],
  },

  'meta-andromeda': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Deep space with the Andromeda galaxy visible - purple and blue cosmic clouds, stars scattered. HERO ELEMENT: Meta logo transformed into a glowing cosmic brain, connected to constellation lines forming an AI neural network across the galaxy. Binary code (0s and 1s) floating like stardust. TYPOGRAPHY: Bold white "ANDROMEDA" in futuristic font with cosmic glow. Smaller text "Meta's AI Brain" below. LIGHTING: Cosmic glow from the galaxy and neural network. MOOD: The future is here. Meta's AI is watching everything. Awe-inspiring and slightly intimidating. Cinematic sci-fi quality. Use uploaded Meta logo.`,
    images: [imageAssets.meta],
  },

  'meta-1-1-x-structure': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean dark blue gradient, minimal and strategic. HERO ELEMENT: A simple but powerful diagram - one large box labeled "1 CAMPAIGN" at top, connected by lines to "1 AD SET" below, which connects to multiple (X) smaller boxes representing creatives spreading out like a tree. The structure should look like a flowchart but premium. Meta logo in corner. TYPOGRAPHY: Bold white "1-1-X" in center, clean and mathematical. LIGHTING: Soft glow on the diagram lines. MOOD: Simplicity is power. The winning structure revealed. Clean, strategic, premium. Match uploaded reference quality.`,
    images: [imageAssets.meta],
  },

  'creative-volume-2026': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Dynamic gradient from electric blue to purple, energetic and modern. HERO ELEMENT: A massive flood/wave of ad creative thumbnails (40-70 visible) pouring out of a phone screen, overwhelming and impressive. Each thumbnail is tiny but recognizable as different ad content. TYPOGRAPHY: Bold white "40-70 WEEKLY" in impactful font. Add "CREATIVES" smaller below. LIGHTING: The creatives glow slightly, creating energy. MOOD: Volume wins in 2026. Overwhelming but exciting. The new reality of advertising. High energy, MrBeast style meets tech marketing. Premium and bold.`,
    images: [imageAssets.meta],
  },

  // ============================================
  // GOOGLE ADS LESSONS
  // ============================================

  'google-highest-cpa-wins': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle Google colors (red, yellow, blue, green) as accents. HERO ELEMENT: A gold first-place trophy with "$50 CPA" engraved on it, shining brilliantly. Behind it, two smaller bronze/silver trophies labeled "$20 CPA" and "$30 CPA" looking defeated. Dollar signs floating upward from the winner. TYPOGRAPHY: Bold black "HIGHEST WINS." - counterintuitive and attention-grabbing. Google logo small in corner. LIGHTING: Spotlight on the winning trophy. MOOD: Counterintuitive truth bomb. Challenges everything you thought you knew. Premium trophy photography. Match uploaded references.`,
    images: [imageAssets.google],
  },

  'google-pmax-blueprint': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Blueprint blue paper texture, technical and strategic. HERO ELEMENT: A detailed flowchart/architecture diagram showing PMax campaign structure - boxes connected by lines, labeled with "Asset Groups", "Signals", "Audiences". The diagram should look complex but organized, like a master plan. Google logo integrated into the design. TYPOGRAPHY: Bold white "PMax SETUP" with blueprint aesthetic. LIGHTING: Flat, technical, like an engineering document. MOOD: The secret architecture revealed. Technical mastery. For serious marketers who want to understand the machine. Premium and educational.`,
    images: [imageAssets.google],
  },

  'google-product-feed-mastery': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white transitioning to Google Shopping's light blue. HERO ELEMENT: LEFT - A spreadsheet/data feed (rows and columns, product data visible). RIGHT - The same data transformed into a beautiful Google Shopping ad carousel. A magical transformation arrow or particles connecting them. Shopify logo small. TYPOGRAPHY: Bold black "FEED = AD" like a mathematical equation. LIGHTING: Bright, clean, e-commerce professional. MOOD: Your product feed IS your ad. Data transformation magic. The unsexy secret to Shopping success. Premium and enlightening. Use Google and Shopify logos I uploaded.`,
    images: [imageAssets.google, imageAssets.shopify],
  },

  'google-shopping-intent': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Google's signature white with colorful shopping bag elements. HERO ELEMENT: A person silhouette holding a phone, with a giant search bar above them showing "buy [product]". Shopping cart icon with dollar signs. A target/bullseye on the shopper indicating "high intent". TYPOGRAPHY: Bold "ACTIVE INTENT" in Google's colors. Smaller text "Why Shopping Wins". LIGHTING: Bright, commercial, retail energy. MOOD: These people WANT to buy. Google Shopping captures demand. Premium retail marketing aesthetic. Use Google logo prominently.`,
    images: [imageAssets.google],
  },

  'google-brand-moat': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Medieval fortress aesthetic with modern twist - stone texture meets digital. HERO ELEMENT: A castle/fortress made of brand logos (your brand) surrounded by a moat filled with Google Ads colors (blue, red, yellow, green water). Competitors outside the moat looking envious. TYPOGRAPHY: Bold "BRAND MOAT" in stone-carved style with modern font. LIGHTING: Dramatic castle lighting, slightly medieval. MOOD: Build a fortress competitors can't breach. Brand is the ultimate defense. Premium and metaphorical. Epic like a movie poster.`,
    images: [imageAssets.google],
  },

  // ============================================
  // BUSINESS & STRATEGY LESSONS - Money/Success Theme
  // ============================================

  'biz-infinite-money-engine': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Rich dark green gradient (money green) with subtle gold particles floating. HERO ELEMENT: A massive circular loop made of $100 bills arranged in an infinity symbol (∞) or circular arrow pattern. In the center of the loop, a mountain of cash piling up infinitely. The money should look crisp, photorealistic, satisfying. TYPOGRAPHY: Bold gold "INFINITE MONEY." with metallic shine. LIGHTING: Warm golden lighting making the money glow. I uploaded Alex Hormozi's image - place his cutout on right side, arms crossed confidently, looking at the money machine he built. MOOD: The money never stops. Premium wealth visualization. Match uploaded references.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-3x-threshold': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with dramatic red accent lighting. HERO ELEMENT: Absolutely MASSIVE "3X" text dominating the frame - the 3 in bold red, the X in black. The text should have 3D depth, almost jumping out of the screen. A subtle graph line showing exponential growth behind it. TYPOGRAPHY: Smaller text "THE THRESHOLD" below in clean black. LIGHTING: Dramatic spotlight on the 3X creating intense shadows. I uploaded Alex Hormozi's image - place him small in corner, pointing up at the 3X with conviction. MOOD: This is the number that changes everything. Mathematical breakthrough. Powerful and bold. Premium quality.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-operator-mindset': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Cockpit/control room aesthetic - dark with glowing screens and instruments. HERO ELEMENT: A pilot's cockpit dashboard, but instead of flight instruments, the gauges show business metrics: "REVENUE", "LTV", "CAC", "ROAS". All dials in the green zone. Control yoke visible. Gymshark logo on a screen. TYPOGRAPHY: Bold white "OPERATOR MODE." with subtle glow, like a cockpit display. LIGHTING: Dashboard glow illuminating the scene, blue and green instrument lights. I uploaded Ben Francis's image - place his cutout as the pilot, hands on controls, looking focused and professional. MOOD: You're in control of the machine. Premium aviation meets business aesthetic.`,
    images: [imageAssets.benFrancis, imageAssets.gymshark],
  },

  'biz-cash-conversion': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Dark gradient with money green accents. HERO ELEMENT: A visual representation of negative cash conversion - money flowing IN before flowing OUT. Show a timeline with "-30 DAYS" prominently displayed, with cash multiplying. A customer hands over money that immediately multiplies. The Oodie blanket hoodie product visible in the money flow. TYPOGRAPHY: Bold green "NEGATIVE CASH." which sounds bad but is actually amazing. LIGHTING: Money emits a soft green glow. I uploaded Davie Fogarty's image - place his cutout on right side with a knowing smile, like he's sharing his secret. MOOD: Get paid before you spend. Premium financial concept visualization. Match uploaded styles.`,
    images: [imageAssets.davieFogarty, imageAssets.theOodie],
  },

  'biz-closer-framework': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle grid, professional and systematic. HERO ELEMENT: A vertical checklist showing "C.L.O.S.E.R." with each letter on its own line, each with a checkbox (some checked in green). A handshake silhouette with dollar signs emanating from it. The checklist should look premium, like a framed document. TYPOGRAPHY: Bold black "6 STEPS." at top, with C.L.O.S.E.R. as the main visual. LIGHTING: Bright, professional, success-oriented. I uploaded Alex Hormozi's image - place his cutout pointing at the checklist with authority, teaching pose. MOOD: Follow the system. Close every deal. Premium sales training aesthetic. Match uploaded references.`,
    images: [imageAssets.alexHormozi],
  },

  'biz-hamster-wheel': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Dark, almost ominous gradient - gray to black. HERO ELEMENT: A realistic hamster wheel, but instead of a hamster, there's a silhouette of a business person in a suit running endlessly. The wheel is connected to nothing - just spinning. Dollar bills flying off but never accumulating. Cage bars visible around it. TYPOGRAPHY: Bold red "THE TRAP." with urgency. Add small text "Are you stuck?" LIGHTING: Harsh overhead light casting shadows, prison-like. MOOD: Are you building a business or a prison? Confrontational, makes you think. Dark but premium quality. Escape the wheel.`,
    images: [],
  },

  'biz-leverage-equation': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle mathematical symbols floating. HERO ELEMENT: A giant lever/fulcrum diagram - small effort on one side lifting massive results on the other. The small side shows a person pushing down, the large side shows money, success, freedom lifting up. Mathematical equations floating nearby. TYPOGRAPHY: Bold black "LEVERAGE." in clean font. Add the actual equation smaller below. LIGHTING: Bright, educational, empowering. MOOD: Work smarter, not harder. Physics of success. Premium educational diagram. The secret to 10x results with 1x effort. Match uploaded style quality.`,
    images: [],
  },

  'starbucks-ltv': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Starbucks green gradient, rich and branded. HERO ELEMENT: A Starbucks coffee cup that's overflowing with $100 bills instead of coffee. The cup should be photorealistic. Giant text "$14,099" floating above the cup like steam. A timeline showing 20 years of purchases. TYPOGRAPHY: Bold white "LTV SECRET." at top. The $14,099 should be HUGE and golden. LIGHTING: Warm coffee shop lighting with golden highlights on the money. MOOD: One customer. $14,099 lifetime value. Mind-blowing revelation. Premium brand case study. Use the Starbucks logo I uploaded prominently.`,
    images: [imageAssets.starbucks],
  },

  'million-dollar-roadmap': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Dark navy transitioning to gold at the edges, premium and aspirational. HERO ELEMENT: A literal golden roadmap/path leading to a mountain peak with "$1M/MONTH" flag at the top. Milestones along the path: "$10K", "$50K", "$100K", "$500K". The path should glow gold. TYPOGRAPHY: Bold white "THE ROADMAP" with gold outline. Add "33 customers/day" as smaller text. LIGHTING: The golden path illuminates the scene. MOOD: The exact path to $1M. Clear, achievable, premium. Aspiration meets strategy. Cinematic quality.`,
    images: [],
  },

  // ============================================
  // PSYCHOLOGY OF SALES
  // ============================================

  'borrowed-trust': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Soft blue gradient, trustworthy and professional. HERO ELEMENT: Two business silhouettes - one has a glowing blue checkmark/badge of trust, with visible "trust energy" (blue particles/light) transferring to the other person. Verification badges, trust symbols floating. The transfer should look magical but professional. TYPOGRAPHY: Bold black "BORROW IT." - intriguing and tactical. LIGHTING: The trust badges glow and create the main lighting. I uploaded Robert Cialdini's image - small cutout in corner with approving nod. MOOD: You can transfer trust instantly. Premium psychology visualization. Match uploaded styles.`,
    images: [imageAssets.robertCialdini],
  },

  'certainty-transfer': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Gradient from dark (uncertain) on left to bright (certain) on right. HERO ELEMENT: Two silhouettes facing each other - the left one is dim and doubtful, the right one (seller) is glowing with golden confidence. A visible beam of light/energy transfers from seller to buyer. The buyer is beginning to glow. TYPOGRAPHY: Bold white "TRANSFER IT." with glowing effect. LIGHTING: Dramatic contrast - seller radiates light. MOOD: Conviction is contagious. Your certainty becomes their certainty. Powerful psychological concept visualization. Premium and transformative.`,
    images: [],
  },

  'authority-over-hope': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Split screen - LEFT side is blurry/gray, RIGHT side is sharp/vibrant. HERO ELEMENT: LEFT - Crossed fingers, wishing pose, weak body language, "HOPING" text. RIGHT - Confident pointing gesture, strong stance, glowing with authority, "KNOWING" text. A big red X over the hoping side. TYPOGRAPHY: Bold red "STOP HOPING." demanding attention. LIGHTING: Left side dim and uncertain, right side bright and powerful. MOOD: Brutal truth. Hope is not a strategy. Harsh but transformative. Premium split-screen composition. Match uploaded style quality.`,
    images: [],
  },

  'dopamine-blueprint': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Dark purple/black with subtle neural network patterns. HERO ELEMENT: A hyper-realistic 3D brain with smartphone notifications, hearts, likes, and reward symbols physically attached/embedded in it. A red notification bubble showing "99+" is prominent. The brain should look slightly hypnotized, overwhelmed with stimuli. Dopamine molecule structure subtle in background. TYPOGRAPHY: Bold white "ADDICTED." with slight red glow. LIGHTING: The notifications and rewards emit colored light. MOOD: This is what addiction looks like. Dark, revealing, slightly uncomfortable. Premium neuroscience visualization. Cinematic quality.`,
    images: [],
  },

  'unity-principle': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Warm cream gradient, inviting and connected. HERO ELEMENT: Two separate silhouettes on the left merging into ONE unified figure on the right. The word "WE" is prominent where they merge, glowing with golden light. Connection lines between the figures. TYPOGRAPHY: Bold black "WE > YOU." - the WE in gold, mathematical comparison. LIGHTING: Warm, inclusive light where the figures merge. I uploaded Robert Cialdini's image - small cutout in corner with warm, approving expression. MOOD: Shared identity wins. The power of we. Premium psychological concept. Match uploaded reference styles.`,
    images: [imageAssets.robertCialdini],
  },

  'pre-suasion-hack': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Chess board pattern fading into darkness - strategic and intellectual. HERO ELEMENT: A chess hand making a move BEFORE the game starts - setting up the board strategically. Or a puppet master's hands visible above chess pieces. The word "BEFORE" is crossed out, replaced with "ALREADY WON". TYPOGRAPHY: Bold white "WIN BEFORE." with checkmate symbolism. LIGHTING: Dramatic spotlight on the strategic move. MOOD: The sale is won before you speak. Master strategist energy. Cialdini-level psychology. Premium and intellectual.`,
    images: [imageAssets.robertCialdini],
  },

  'herd-instinct': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Wide open space, crowd dynamic visual. HERO ELEMENT: A massive crowd of silhouettes all walking in one direction, with one highlighted figure in the middle being pulled along by the group energy. Arrows showing direction of movement. "SOLD OUT" signs visible. Social proof indicators (star ratings, review counts) floating above. TYPOGRAPHY: Bold "THE HERD." with crowd texture. LIGHTING: Mass movement lighting, stadium-like. MOOD: Everyone's buying. You should too. Powerful social proof visualization. Premium crowd dynamics.`,
    images: [],
  },

  // ============================================
  // CONVERSION & CRO LESSONS
  // ============================================

  'decoy-effect': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle price tag textures. HERO ELEMENT: Three pricing cards in a row - SMALL (cheap), MEDIUM (highlighted with golden glow, green checkmark, "+43%" badge), LARGE (expensive). The medium option should have visual emphasis like a spotlight or "BEST VALUE" banner. The decoy (small) should look intentionally worse. TYPOGRAPHY: Bold black "THE DECOY." revealing the trick. LIGHTING: Spotlight effect on the middle option. MOOD: Pricing psychology exposed. The trick every SaaS uses. Premium pricing visualization. Educational but revealing. Match uploaded styles.`,
    images: [],
  },

  'paradox-of-choice': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Split screen - LEFT chaotic, RIGHT calm. HERO ELEMENT: LEFT SIDE - Overwhelming wall of 24 jam jars, cluttered, stressful, with a confused customer frozen. RIGHT SIDE - Clean display of just 6 jam jars, happy customer pointing decisively. Big red X over the 24, green checkmark over the 6. TYPOGRAPHY: Bold black "LESS = MORE." counterintuitive revelation. LIGHTING: Left side harsh/overwhelming, right side soft/inviting. I uploaded Sheena Iyengar's image - place her cutout in center pointing at the 6 jars approvingly. MOOD: Choice paralysis is real. Fewer options win. Premium split-screen psychology. Match uploaded references.`,
    images: [imageAssets.sheenaIyengar],
  },

  'five-second-test': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean gradient, testing/clinical feel. HERO ELEMENT: A website screenshot that's half blurred/half crystal clear - LEFT side is a confusing mess (blurred), RIGHT side is clear and converts. A large stopwatch in the center showing "5" seconds. Red X over blurred side, green checkmark over clear side. TYPOGRAPHY: Bold black "5 SECONDS." with timer styling. LIGHTING: Bright, clinical, testing environment. MOOD: If they don't get it in 5 seconds, they leave. Clarity test. Premium UX psychology visualization. Match uploaded style quality.`,
    images: [],
  },

  'framing-effect-mastery': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Split composition - left side dingy/cheap, right side premium/luxury. HERO ELEMENT: The EXACT SAME PRODUCT shown twice - LEFT in a cheap context (bad lighting, no staging, discount stickers). RIGHT in a luxury context (beautiful lighting, premium display, high-end backdrop). It's clearly the same item but feels completely different. TYPOGRAPHY: Bold black "SAME THING." - mind-bending revelation. LIGHTING: Demonstrates the power of framing through lighting. I uploaded Daniel Kahneman's image - small cutout looking knowingly at the comparison. MOOD: Context changes everything. Powerful framing psychology. Premium demonstration.`,
    images: [imageAssets.danielKahneman],
  },

  'speed-equals-trust': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Amazon orange/dark gradient with digital speed lines. HERO ELEMENT: A loading progress bar at 99%, stuck. Dollar signs actively falling/draining away as it loads. Giant red text "$1.7 BILLION" showing the cost of slowness. Amazon logo prominent. Clock/timer showing milliseconds. TYPOGRAPHY: Bold white "0.1 SECOND." - the small number that costs billions. LIGHTING: Urgent, digital, time-pressure lighting. MOOD: Speed IS money. Amazon's billion-dollar lesson. Terrifying cost of slowness. Premium data visualization. Use Amazon logo I uploaded.`,
    images: [imageAssets.amazon],
  },

  'leaky-bucket-audit': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Dark blue gradient with water/liquid effects. HERO ELEMENT: A bucket filled with money/gold coins, but there are visible holes in the bucket with dollars actively leaking/pouring out. A flashlight illuminating the holes. "$50,000" in red showing what's lost. Repair tools nearby suggesting you can fix it. TYPOGRAPHY: Bold red "$50K HOLE." urgent and costly. LIGHTING: Dramatic flashlight beam exposing the leaks. MOOD: You're bleeding money and don't know it. Audit your funnel. Premium metaphor visualization. Urgent and actionable.`,
    images: [],
  },

  'von-restorff-effect': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with a row of identical gray circles. HERO ELEMENT: 10 identical gray circles in a row, but ONE circle is bright red/orange and glowing - standing out dramatically. The red circle should be impossible to ignore. Eye/attention lines pointing to the different one. TYPOGRAPHY: Bold black "STAND OUT." with the O in red/highlighted. LIGHTING: The odd one out literally glows and catches all light. MOOD: The different one gets remembered. Isolation effect. Premium psychology principle visualization. Simple but powerful.`,
    images: [],
  },

  // ============================================
  // LUXURY & BRAND LESSONS - Premium Black/Gold
  // ============================================

  'value-ladder': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Pure luxurious black with subtle velvet texture. HERO ELEMENT: A red velvet rope with brass stands (VIP line), slightly parted to reveal a glimpse of a glowing "SECRET MENU" card. Rolex logo subtly visible. Golden light emanating from behind the rope. High-end club exclusivity vibe. TYPOGRAPHY: Elegant white/gold "HIDDEN MENU." in premium serif font. LIGHTING: Golden glow from the exclusive area, dramatic shadows on the velvet rope. MOOD: There's a level above what you see. Luxury exclusivity. Premium VIP aesthetic. Use Rolex logo I uploaded subtly.`,
    images: [imageAssets.rolex, imageAssets.reconvert],
  },

  'box-worth-300': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Tiffany Blue (that iconic color) with subtle sparkle. HERO ELEMENT: An empty Tiffany blue box in the center, perfectly lit like a product shot. But the price tag shows "$300" for just the box. A diamond ring outside the box worth less than the packaging. The box is the star. TYPOGRAPHY: Elegant white "$300 BOX." in premium font. LIGHTING: Jewelry store lighting, the box glows with perceived value. MOOD: The packaging IS the product. Tiffany's genius. Premium luxury psychology. Use Tiffany logo I uploaded. Match style references.`,
    images: [imageAssets.tiffany],
  },

  'hermes-doctrine': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Rich orange (Hermès orange) gradient to black, ultra-luxury. HERO ELEMENT: An iconic Hermès Birkin bag on a pedestal, under glass like a museum piece. A velvet rope around it. Waitlist counter showing "2 YEARS". Security guard silhouette. The bag glows with exclusivity. TYPOGRAPHY: Elegant white "PROTECT THE BIRKIN." in luxury serif font. LIGHTING: Museum spotlight on the bag, reverent and exclusive. MOOD: Scarcity is the strategy. Hermès never discounts. Forever premium. Use Hermès logo I uploaded. Ultra-luxury aesthetic.`,
    images: [imageAssets.hermes],
  },

  'dior-pricing-secret': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Soft pink/gray luxury gradient, Dior aesthetic. HERO ELEMENT: Two identical luxury bags side by side - one has a "$57" price tag (cost), the other has "$3,500" (retail). A 60x multiplier visual connecting them. Dior logo prominent. Calculator showing the math. TYPOGRAPHY: Elegant "$57 → $3,500" in luxury font, showing the transformation. LIGHTING: High-end product photography lighting. MOOD: The 60x markup that customers pay happily. Luxury pricing exposed. Premium fashion industry insight. Use Dior logo I uploaded.`,
    images: [imageAssets.dior],
  },

  'gucci-short-termism': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Split - LEFT side vibrant and trendy, RIGHT side faded and dead. HERO ELEMENT: Gucci logo on LEFT looking flashy but cracking/fading. Compared to timeless brands (Hermès, Rolex) on RIGHT still strong. A declining graph overlay. "2024: DYING" headline style. TYPOGRAPHY: Bold red "WHY GUCCI IS DYING." confrontational and newsworthy. LIGHTING: Left side garish, right side classic and stable. MOOD: Short-term thinking kills brands. Trend chasing is death. Premium cautionary tale. Use Gucci and Hermès logos I uploaded.`,
    images: [imageAssets.gucci, imageAssets.hermes],
  },

  'scarcity-calendar': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Warm kitchen colors with Le Creuset aesthetic. HERO ELEMENT: A row of colorful Le Creuset Dutch ovens, but one is covered with "SOLD OUT" red banner and a calendar showing "1 COLOR/YEAR". Collector's shelf behind showing the full collection. Scarcity creates desire. TYPOGRAPHY: Bold black "ONE PER YEAR." with urgency. LIGHTING: Warm, cozy, collectible lighting. MOOD: Artificial scarcity creates collectors. Le Creuset's genius. Premium collector psychology. Use Le Creuset logo I uploaded.`,
    images: [imageAssets.leCreuset],
  },

  'anchor-moments': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Ralph Lauren navy blue, preppy and premium. HERO ELEMENT: A $20,000 alligator bag on an extreme high pedestal, far above. Below it, a $200 polo shirt that now looks incredibly affordable in comparison. Price anchoring visual. The expensive item makes the cheap item feel reasonable. TYPOGRAPHY: Elegant "$20K makes $200 CHEAP." in Ralph Lauren style font. LIGHTING: Luxury retail lighting, aspirational. MOOD: Price anchoring psychology. Ralph Lauren's strategy. Premium comparison visualization. Use Ralph Lauren logo I uploaded.`,
    images: [imageAssets.ralphLauren],
  },

  // ============================================
  // PRIMAL/BEHAVIORAL PSYCHOLOGY
  // ============================================

  'primal-stimuli': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Prehistoric cave wall texture meeting modern brain scan imagery. HERO ELEMENT: A realistic reptilian brain (lizard brain) with 6 glowing buttons on it - each button a different color and symbol representing primal triggers (fear, self, contrast, tangible, beginning/end, visual). The brain looks ancient but the buttons are modern. TYPOGRAPHY: Bold "6 BUY BUTTONS." in primal, impactful font. LIGHTING: Ancient fire light meets modern neon glow. MOOD: Prehistoric triggers still control us. The only 6 buttons that work. Premium neuroscience meets anthropology.`,
    images: [],
  },

  'fly-in-the-urinal': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white bathroom tile aesthetic, clinical and behavioral. HERO ELEMENT: A realistic urinal with a small fly icon etched near the drain - the famous Amsterdam airport nudge. An arrow showing "80% BETTER AIM". Behavioral economics visualization. TYPOGRAPHY: Bold black "THE FLY." intriguing and unusual. LIGHTING: Bright, clinical, public restroom lighting. MOOD: The smallest nudge changes behavior. Nudge psychology. Premium behavioral economics case study. Unexpected but fascinating.`,
    images: [],
  },

  'forty-million-mistake': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Corporate gray transitioning to red (warning). HERO ELEMENT: A massive pile of data/charts/graphs stacked high, BUT on fire or crumbling. Dollar signs burning: "$40 MILLION" in flames. A heart symbol emerging from the ashes - emotion surviving data. Coca-Cola logo subtly visible (New Coke disaster). TYPOGRAPHY: Bold red "$40 MILLION MISTAKE." catastrophic energy. LIGHTING: Fire and destruction lighting, dramatic. MOOD: Data without emotion = disaster. New Coke's lesson. Premium cautionary tale. Use Coca-Cola logo subtly.`,
    images: [imageAssets.cocaCola],
  },

  'precise-price-trick': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle price tag elements. HERO ELEMENT: Two large price displays side by side - LEFT: "$5,000" looking rounded and negotiable. RIGHT: "$4,988" looking precise and calculated, with a green glow indicating it wins. Checkmark on precise, X on rounded. TYPOGRAPHY: Bold black "$4,988 BEATS $5,000." counterintuitive truth. LIGHTING: Bright, retail pricing environment. MOOD: Precise numbers feel researched. Pricing psychology trick. Premium retail insight. Numbers matter.`,
    images: [],
  },

  // ============================================
  // CRO & TESTING
  // ============================================

  'product-page-anatomy': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with subtle e-commerce grid. HERO ELEMENT: An exploded/deconstructed product page showing 5 distinct sections floating apart but connected - like an anatomical diagram. Each section labeled: 1. Hero, 2. Benefits, 3. Social Proof, 4. FAQ, 5. CTA. "8%+ CVR" badge glowing green. TYPOGRAPHY: Bold black "5 ELEMENTS." in clean technical font. LIGHTING: Bright, clinical, educational. MOOD: The exact anatomy of pages that convert. Blueprint for success. Premium UX visualization.`,
    images: [],
  },

  'jakobs-law': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Split - LEFT chaotic custom UI, RIGHT familiar/standard UI. HERO ELEMENT: LEFT - A bizarre, unique checkout flow that's confusing (X over it). RIGHT - A standard, familiar checkout (Amazon/Shopify style) that converts (checkmark). Users looking confused on left, happy on right. TYPOGRAPHY: Bold black "FAMILIAR WINS." revealing the truth. LIGHTING: Left harsh and confusing, right soft and welcoming. MOOD: Don't be unique in checkout. Jakob's Law. Premium UX principle visualization. Match uploaded styles.`,
    images: [],
  },

  'ikea-effect': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean IKEA-style room aesthetic, Scandinavian minimal. HERO ELEMENT: A simple piece of furniture with "+63% VALUE" badge on it, next to an identical pre-assembled one without the badge. Assembly tools (allen key) visible. The DIY one glows with perceived value. TYPOGRAPHY: Bold "DIY = +63%." in clean IKEA-style font. LIGHTING: Bright, showroom lighting. MOOD: We value what we build. IKEA's psychology. Premium participation effect visualization. Use IKEA logo I uploaded.`,
    images: [imageAssets.ikea],
  },

  // ============================================
  // ADDITIONAL PREMIUM LESSONS
  // ============================================

  'pet-rock-story': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Gradient from dull gray (rock) to brilliant gold (money). HERO ELEMENT: A plain gray rock sitting on a velvet cushion, wearing a tiny crown, with $100 bills raining down around it. Price tag showing "$4" on the rock. "$30 MILLION" in giant gold text floating above. Box labeled "PET ROCK" visible. TYPOGRAPHY: Bold "$30M FROM ROCKS." unbelievable but true. LIGHTING: Spotlight on the rock like it's precious. MOOD: Sell the meaning, not the product. Ultimate marketing story. Premium absurdist business case study.`,
    images: [],
  },

  'gary-halbert-secret': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Aged paper, vintage advertising aesthetic from the 70s/80s. HERO ELEMENT: A starving crowd of people reaching toward something (demand visualization), with money in their outstretched hands. Old-school direct mail letters floating. Typewriter visible. TYPOGRAPHY: Bold vintage "STARVING CROWD." in retro advertising font. LIGHTING: Warm, nostalgic, direct response era. I uploaded Gary Halbert's image - place his cutout as the wise teacher figure, holding a sales letter. MOOD: Find the hungry market first. Halbert's #1 lesson. Premium vintage direct response aesthetic.`,
    images: [imageAssets.garyHalbert],
  },

  'formula-to-sell': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Clean white with mathematical equation aesthetics. HERO ELEMENT: A beautiful equation visualization: DREAM + LIKELIHOOD + TIME + EFFORT = SALE. Each element as a visual icon - dream cloud, probability percentage, clock, muscle/effort, equals sign, money. The formula should look elegant and scientific. TYPOGRAPHY: Bold black "THE FORMULA." clean and mathematical. LIGHTING: Bright, educational, breakthrough moment. MOOD: Selling reduced to 4 variables. Alex Hormozi's equation. Premium mathematical visualization. Match uploaded styles.`,
    images: [imageAssets.alexHormozi],
  },

  'no-one-cares': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Stark, confrontational red gradient. HERO ELEMENT: A megaphone pointed at a crowd of people who are all looking at their phones, ignoring it completely. The speaker looks frustrated. "YOUR BRAND" written on the megaphone. People only care about themselves visualization. TYPOGRAPHY: Brutal bold white "NO ONE CARES." harsh truth. LIGHTING: Harsh, exposing, uncomfortable. MOOD: Brutal wake-up call. Everyone is focused on themselves. The uncomfortable truth about marketing. Premium confrontational design.`,
    images: [],
  },

  'imperceptible-nudge': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Amazon/e-commerce aesthetic, shopping environment. HERO ELEMENT: An "Add to Cart" button that's slightly larger, a specific shade of orange that's been tested. A/B test visualization with the winning button glowing. "$200 MILLION" floating above showing revenue impact from color change. TYPOGRAPHY: Bold "THE $200M COLOR." shocking revelation. LIGHTING: E-commerce product lighting, commercial. MOOD: Invisible changes. Massive results. Amazon's A/B testing culture. Premium micro-optimization visualization.`,
    images: [imageAssets.amazon],
  },

  'hero-mechanism': {
    prompt: `Create a $10,000-budget YouTube thumbnail, 5:4 wide aspect ratio. BACKGROUND: Split - cheap products on left, premium Oura Ring on right. HERO ELEMENT: LEFT - Pile of cheap fitness trackers with "$12" price tag. RIGHT - Oura Ring on a velvet pedestal, glowing, with "$399" price tag and "32X PREMIUM" badge. The mechanism (what makes it special) visualized as golden tech inside the Oura ring. TYPOGRAPHY: Bold "THE $4,225 QUESTION." intriguing and premium. LIGHTING: Left cheap lighting, right luxury spotlight. MOOD: Why we pay 32X for essentially the same function. Premium positioning. Use Oura logo I uploaded.`,
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
// Generate prompts for lessons that don't have custom prompts in lessonPromptData
// Uses the premium YouTube thumbnail style: white grid paper, bold simple text, clean visuals
Object.keys(lessonMeta).forEach(slug => {
  if (!lessonPromptData[slug]) {
    const lesson = lessonMeta[slug];
    // Extract a short 2-3 word hook from the title
    const shortTitle = lesson.title.replace(/^The\s+/i, '').toLowerCase();
    lessonPromptData[slug] = {
      prompt: `Create a 5:4 wide YouTube thumbnail. White grid paper background. Visual concept for: "${lesson.description}". Bold black text: "${shortTitle.split(' ').slice(0, 3).join(' ')}." Create a simple, clean visual metaphor - use real objects, not abstract illustrations. Professional shadows, minimal elements. High-end YouTube thumbnail style like MrBeast or Alex Hormozi. In the styles I uploaded you.`,
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
                                  <p className="text-xs font-medium text-[var(--text-muted)] mb-1">Current prompt:</p>
                                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3">
                                    {lessonPromptData[slug]?.prompt || 'No custom prompt'}
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
                          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">Reference Images (click to copy image):</p>
                          <div className="flex gap-2 flex-wrap">
                            {promptData.images.map((imgUrl, idx) => (
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

                      {/* Prompt Text */}
                      <div className="relative">
                        <p className="text-xs font-medium text-[var(--text-muted)] mb-2">ChatGPT Prompt:</p>
                        <div className="bg-white rounded-lg p-3 border border-[var(--border-light)] text-sm text-[var(--text-secondary)] leading-relaxed">
                          {promptData.prompt}
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
