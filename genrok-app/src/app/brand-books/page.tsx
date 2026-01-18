'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Palette,
  Type,
  Sparkles,
  Copy,
  Check,
  Shirt,
  Home,
  Smartphone,
  Dumbbell,
  Coffee,
  Baby,
  Dog,
  Mountain,
  X,
  TrendingUp,
  Globe,
  Target,
  ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// TypeScript Interfaces
interface BrandBook {
  id: number;
  name: string;
  niche: string;
  nicheId: string;
  emotions: string[];
  headingFont: {
    name: string;
    weight: string;
  };
  bodyFont: {
    name: string;
    weight: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
}

interface NicheCategory {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface GeoBarVariation {
  country: string;
  countryCode: string;
  holiday: string;
  discount: number;
  code: string;
}

// 30 Geo-Convert Bar Variations with PPP-based discounts
const geoBarVariations: GeoBarVariation[] = [
  // Tier 1: High income countries - 5% discount
  { country: 'USA', countryCode: 'us', holiday: '4th of July', discount: 5, code: 'JULY4' },
  { country: 'UK', countryCode: 'gb', holiday: 'Boxing Day', discount: 5, code: 'BOXING5' },
  { country: 'Germany', countryCode: 'de', holiday: 'Oktoberfest', discount: 5, code: 'OKTOBER' },
  { country: 'Canada', countryCode: 'ca', holiday: 'Canada Day', discount: 5, code: 'CANADA1' },
  { country: 'Australia', countryCode: 'au', holiday: 'Australia Day', discount: 5, code: 'AUSSIE5' },
  { country: 'France', countryCode: 'fr', holiday: 'Bastille Day', discount: 5, code: 'BASTILLE' },
  { country: 'Japan', countryCode: 'jp', holiday: 'Golden Week', discount: 5, code: 'GOLDEN5' },
  { country: 'Netherlands', countryCode: 'nl', holiday: "King's Day", discount: 5, code: 'KING5' },
  { country: 'Sweden', countryCode: 'se', holiday: 'Midsummer', discount: 5, code: 'SUMMER5' },
  { country: 'Switzerland', countryCode: 'ch', holiday: 'National Day', discount: 5, code: 'SWISS5' },
  // Tier 2: Middle income countries - 10% discount
  { country: 'Brazil', countryCode: 'br', holiday: 'Carnival', discount: 10, code: 'CARNAVAL' },
  { country: 'Mexico', countryCode: 'mx', holiday: 'Día de Muertos', discount: 10, code: 'MUERTOS' },
  { country: 'Poland', countryCode: 'pl', holiday: 'Summer Festival', discount: 10, code: 'POLSKA10' },
  { country: 'Turkey', countryCode: 'tr', holiday: 'Republic Day', discount: 10, code: 'TURKIYE' },
  { country: 'South Africa', countryCode: 'za', holiday: 'Heritage Day', discount: 10, code: 'HERITAGE' },
  { country: 'Thailand', countryCode: 'th', holiday: 'Songkran', discount: 10, code: 'SONGKRAN' },
  { country: 'Malaysia', countryCode: 'my', holiday: 'Hari Raya', discount: 10, code: 'RAYA10' },
  { country: 'Chile', countryCode: 'cl', holiday: 'Fiestas Patrias', discount: 10, code: 'CHILE10' },
  { country: 'Romania', countryCode: 'ro', holiday: 'National Day', discount: 10, code: 'ROMANIA' },
  { country: 'Argentina', countryCode: 'ar', holiday: 'Independence Day', discount: 10, code: 'VIVA10' },
  // Tier 3: Lower income countries - 15% discount
  { country: 'India', countryCode: 'in', holiday: 'Diwali', discount: 15, code: 'DIWALI15' },
  { country: 'Philippines', countryCode: 'ph', holiday: 'Pasko', discount: 15, code: 'PASKO15' },
  { country: 'Indonesia', countryCode: 'id', holiday: 'Lebaran', discount: 15, code: 'LEBARAN' },
  { country: 'Vietnam', countryCode: 'vn', holiday: 'Tết', discount: 15, code: 'TET15' },
  { country: 'Nigeria', countryCode: 'ng', holiday: 'Independence Day', discount: 15, code: 'NAIJA15' },
  { country: 'Egypt', countryCode: 'eg', holiday: 'Eid', discount: 15, code: 'EID15' },
  { country: 'Colombia', countryCode: 'co', holiday: 'Independence Day', discount: 15, code: 'COLOMBIA' },
  { country: 'Peru', countryCode: 'pe', holiday: 'Fiestas Patrias', discount: 15, code: 'PERU15' },
  { country: 'Pakistan', countryCode: 'pk', holiday: 'Eid', discount: 15, code: 'JASHN15' },
  { country: 'Bangladesh', countryCode: 'bd', holiday: 'Pohela Boishakh', discount: 15, code: 'BOISHAKH' },
];

// Niche Categories
const nicheCategories: NicheCategory[] = [
  { id: 'all', name: 'All Brands', icon: Sparkles },
  { id: 'fashion', name: 'Fashion', icon: Shirt },
  { id: 'beauty', name: 'Beauty', icon: Sparkles },
  { id: 'home', name: 'Home & Living', icon: Home },
  { id: 'tech', name: 'Tech & Gadgets', icon: Smartphone },
  { id: 'fitness', name: 'Fitness', icon: Dumbbell },
  { id: 'food', name: 'Food & Beverage', icon: Coffee },
  { id: 'kids', name: 'Kids & Baby', icon: Baby },
  { id: 'pets', name: 'Pets', icon: Dog },
  { id: 'outdoor', name: 'Outdoor & Travel', icon: Mountain },
];

// 30 Brand Books Data - Premium Billion-Dollar Brand Level Colors
const brandBooks: BrandBook[] = [
  // FASHION (5)
  {
    id: 1,
    name: 'Luxury Fashion',
    niche: 'Fashion',
    nicheId: 'fashion',
    emotions: ['Luxury', 'Premium', 'Elegant'],
    headingFont: { name: 'Playfair Display', weight: '700' },
    bodyFont: { name: 'Inter', weight: '400' },
    colors: {
      primary: '#0D0D0D',
      secondary: '#C4A77D',
      accent: '#F5F1EB',
    },
    description: 'Inspired by Chanel and Dior. Deep black, champagne gold, and warm ivory for timeless luxury.',
  },
  {
    id: 2,
    name: 'Streetwear Edge',
    niche: 'Fashion',
    nicheId: 'fashion',
    emotions: ['Bold', 'Urban', 'Edgy'],
    headingFont: { name: 'Bebas Neue', weight: '400' },
    bodyFont: { name: 'Space Grotesk', weight: '400' },
    colors: {
      primary: '#000000',
      secondary: '#FF5A00',
      accent: '#E8E8E8',
    },
    description: 'Inspired by Off-White and Supreme. Pure black, electric orange, and concrete gray.',
  },
  {
    id: 3,
    name: 'Minimalist Chic',
    niche: 'Fashion',
    nicheId: 'fashion',
    emotions: ['Clean', 'Modern', 'Sophisticated'],
    headingFont: { name: 'Poppins', weight: '600' },
    bodyFont: { name: 'Poppins', weight: '300' },
    colors: {
      primary: '#1A1A1A',
      secondary: '#A0A0A0',
      accent: '#FAFAFA',
    },
    description: 'Inspired by COS and The Row. Refined charcoal, sophisticated gray, and pure white.',
  },
  {
    id: 4,
    name: 'Bohemian Spirit',
    niche: 'Fashion',
    nicheId: 'fashion',
    emotions: ['Free', 'Artistic', 'Warm'],
    headingFont: { name: 'Cormorant Garamond', weight: '600' },
    bodyFont: { name: 'Karla', weight: '400' },
    colors: {
      primary: '#5C4033',
      secondary: '#D4A574',
      accent: '#F7F3EF',
    },
    description: 'Inspired by Free People. Rich espresso, desert sand, and natural linen.',
  },
  {
    id: 5,
    name: 'Athleisure Vibes',
    niche: 'Fashion',
    nicheId: 'fashion',
    emotions: ['Dynamic', 'Fresh', 'Active'],
    headingFont: { name: 'Montserrat', weight: '700' },
    bodyFont: { name: 'Open Sans', weight: '400' },
    colors: {
      primary: '#0A1628',
      secondary: '#00D4AA',
      accent: '#F0F4F8',
    },
    description: 'Inspired by Lululemon and Nike. Midnight navy, vibrant teal, and cloud white.',
  },

  // BEAUTY (5)
  {
    id: 6,
    name: 'Clean Beauty',
    niche: 'Beauty',
    nicheId: 'beauty',
    emotions: ['Natural', 'Pure', 'Gentle'],
    headingFont: { name: 'Jost', weight: '500' },
    bodyFont: { name: 'DM Sans', weight: '400' },
    colors: {
      primary: '#2D4A3E',
      secondary: '#A8C5B5',
      accent: '#F9F7F4',
    },
    description: 'Inspired by Aesop and Herbivore. Forest green, sage mist, and organic cream.',
  },
  {
    id: 7,
    name: 'Glam Luxe',
    niche: 'Beauty',
    nicheId: 'beauty',
    emotions: ['Glamorous', 'Bold', 'Confident'],
    headingFont: { name: 'Libre Bodoni', weight: '700' },
    bodyFont: { name: 'Lato', weight: '400' },
    colors: {
      primary: '#1C1C1C',
      secondary: '#D4AF37',
      accent: '#FDF8F3',
    },
    description: 'Inspired by Tom Ford and Charlotte Tilbury. Jet black, true gold, and soft blush.',
  },
  {
    id: 8,
    name: 'K-Beauty Fresh',
    niche: 'Beauty',
    nicheId: 'beauty',
    emotions: ['Playful', 'Youthful', 'Fun'],
    headingFont: { name: 'Quicksand', weight: '600' },
    bodyFont: { name: 'Nunito', weight: '400' },
    colors: {
      primary: '#FF6B9D',
      secondary: '#C490E4',
      accent: '#FFF5F8',
    },
    description: 'Inspired by Glossier and Innisfree. Soft pink, lavender dream, and petal white.',
  },
  {
    id: 9,
    name: 'Wellness Spa',
    niche: 'Beauty',
    nicheId: 'beauty',
    emotions: ['Calm', 'Serene', 'Healing'],
    headingFont: { name: 'Cormorant', weight: '500' },
    bodyFont: { name: 'Source Sans Pro', weight: '400' },
    colors: {
      primary: '#4A6670',
      secondary: '#B8D4D9',
      accent: '#F8FBFC',
    },
    description: 'Inspired by Tatcha and La Mer. Ocean slate, spa blue, and morning mist.',
  },
  {
    id: 10,
    name: "Men's Grooming",
    niche: 'Beauty',
    nicheId: 'beauty',
    emotions: ['Masculine', 'Refined', 'Strong'],
    headingFont: { name: 'Oswald', weight: '600' },
    bodyFont: { name: 'Roboto', weight: '400' },
    colors: {
      primary: '#1A1A1A',
      secondary: '#8B7355',
      accent: '#F5F2EE',
    },
    description: 'Inspired by Byredo and Le Labo. Rich black, warm tobacco, and raw cotton.',
  },

  // HOME & LIVING (4)
  {
    id: 11,
    name: 'Scandinavian Modern',
    niche: 'Home & Living',
    nicheId: 'home',
    emotions: ['Simple', 'Warm', 'Cozy'],
    headingFont: { name: 'DM Serif Display', weight: '400' },
    bodyFont: { name: 'Work Sans', weight: '400' },
    colors: {
      primary: '#2C2C2C',
      secondary: '#C9B99A',
      accent: '#FAF8F5',
    },
    description: 'Inspired by Muji and HAY. Soft charcoal, warm oat, and nordic white.',
  },
  {
    id: 12,
    name: 'Industrial Loft',
    niche: 'Home & Living',
    nicheId: 'home',
    emotions: ['Raw', 'Urban', 'Authentic'],
    headingFont: { name: 'Anton', weight: '400' },
    bodyFont: { name: 'IBM Plex Sans', weight: '400' },
    colors: {
      primary: '#2D2D2D',
      secondary: '#B87333',
      accent: '#E8E4E1',
    },
    description: 'Inspired by Restoration Hardware. Graphite, oxidized copper, and concrete.',
  },
  {
    id: 13,
    name: 'Coastal Living',
    niche: 'Home & Living',
    nicheId: 'home',
    emotions: ['Relaxed', 'Fresh', 'Breezy'],
    headingFont: { name: 'Josefin Sans', weight: '600' },
    bodyFont: { name: 'Raleway', weight: '400' },
    colors: {
      primary: '#1B4965',
      secondary: '#5FA8D3',
      accent: '#FBF9F7',
    },
    description: 'Inspired by Serena & Lily. Deep ocean, sky blue, and driftwood white.',
  },
  {
    id: 14,
    name: 'Maximalist Eclectic',
    niche: 'Home & Living',
    nicheId: 'home',
    emotions: ['Bold', 'Colorful', 'Expressive'],
    headingFont: { name: 'Abril Fatface', weight: '400' },
    bodyFont: { name: 'Mulish', weight: '400' },
    colors: {
      primary: '#1E3A5F',
      secondary: '#C45B28',
      accent: '#F5E6D3',
    },
    description: 'Inspired by Anthropologie. Prussian blue, burnt sienna, and antique cream.',
  },

  // TECH & GADGETS (3)
  {
    id: 15,
    name: 'Sleek Tech',
    niche: 'Tech & Gadgets',
    nicheId: 'tech',
    emotions: ['Futuristic', 'Premium', 'Innovative'],
    headingFont: { name: 'Inter', weight: '600' },
    bodyFont: { name: 'Inter', weight: '400' },
    colors: {
      primary: '#000000',
      secondary: '#0071E3',
      accent: '#F5F5F7',
    },
    description: 'Inspired by Apple. Pure black, signature blue, and silver gray.',
  },
  {
    id: 16,
    name: 'Gaming Edge',
    niche: 'Tech & Gadgets',
    nicheId: 'tech',
    emotions: ['Powerful', 'Exciting', 'Dynamic'],
    headingFont: { name: 'Orbitron', weight: '700' },
    bodyFont: { name: 'Exo 2', weight: '400' },
    colors: {
      primary: '#0D0D0D',
      secondary: '#00F0B5',
      accent: '#1A1A2E',
    },
    description: 'Inspired by Razer. Pitch black, neon green, and deep purple-black.',
  },
  {
    id: 17,
    name: 'Smart Home',
    niche: 'Tech & Gadgets',
    nicheId: 'tech',
    emotions: ['Connected', 'Modern', 'Efficient'],
    headingFont: { name: 'Outfit', weight: '600' },
    bodyFont: { name: 'Outfit', weight: '400' },
    colors: {
      primary: '#202124',
      secondary: '#4285F4',
      accent: '#F8F9FA',
    },
    description: 'Inspired by Google and Nest. Material dark, Google blue, and cloud white.',
  },

  // FITNESS (3)
  {
    id: 18,
    name: 'Performance Pro',
    niche: 'Fitness',
    nicheId: 'fitness',
    emotions: ['Strong', 'Intense', 'Focused'],
    headingFont: { name: 'Barlow Condensed', weight: '700' },
    bodyFont: { name: 'Barlow', weight: '400' },
    colors: {
      primary: '#000000',
      secondary: '#FF0000',
      accent: '#FFFFFF',
    },
    description: 'Inspired by Under Armour. Pure black, power red, and clean white.',
  },
  {
    id: 19,
    name: 'Yoga Zen',
    niche: 'Fitness',
    nicheId: 'fitness',
    emotions: ['Peaceful', 'Balanced', 'Mindful'],
    headingFont: { name: 'Philosopher', weight: '700' },
    bodyFont: { name: 'Nunito Sans', weight: '400' },
    colors: {
      primary: '#3D5A4C',
      secondary: '#9BB5A0',
      accent: '#F7F6F3',
    },
    description: 'Inspired by Alo Yoga. Deep eucalyptus, soft sage, and studio white.',
  },
  {
    id: 20,
    name: 'Outdoor Adventure',
    niche: 'Fitness',
    nicheId: 'fitness',
    emotions: ['Rugged', 'Free', 'Exploratory'],
    headingFont: { name: 'Teko', weight: '600' },
    bodyFont: { name: 'Rubik', weight: '400' },
    colors: {
      primary: '#1C2B1A',
      secondary: '#E87E04',
      accent: '#F4F1EC',
    },
    description: 'Inspired by Patagonia. Pine forest, sunset orange, and trail dust.',
  },

  // FOOD & BEVERAGE (3)
  {
    id: 21,
    name: 'Artisan Coffee',
    niche: 'Food & Beverage',
    nicheId: 'food',
    emotions: ['Craft', 'Warm', 'Authentic'],
    headingFont: { name: 'Fraunces', weight: '700' },
    bodyFont: { name: 'Libre Franklin', weight: '400' },
    colors: {
      primary: '#2C1810',
      secondary: '#C9A66B',
      accent: '#FAF6F1',
    },
    description: 'Inspired by Blue Bottle and Stumptown. Rich espresso, caramel, and cream.',
  },
  {
    id: 22,
    name: 'Organic Farm',
    niche: 'Food & Beverage',
    nicheId: 'food',
    emotions: ['Fresh', 'Wholesome', 'Natural'],
    headingFont: { name: 'Bitter', weight: '700' },
    bodyFont: { name: 'Cabin', weight: '400' },
    colors: {
      primary: '#2D5016',
      secondary: '#8BC34A',
      accent: '#FDFCFA',
    },
    description: 'Inspired by Whole Foods and Sweetgreen. Forest green, lime fresh, and clean white.',
  },
  {
    id: 23,
    name: 'Premium Spirits',
    niche: 'Food & Beverage',
    nicheId: 'food',
    emotions: ['Sophisticated', 'Rich', 'Celebratory'],
    headingFont: { name: 'Cinzel', weight: '700' },
    bodyFont: { name: 'Crimson Text', weight: '400' },
    colors: {
      primary: '#0A0A14',
      secondary: '#C5A572',
      accent: '#F8F4EF',
    },
    description: 'Inspired by Hennessy and Dom Perignon. Midnight black, aged gold, and parchment.',
  },

  // KIDS & BABY (2)
  {
    id: 24,
    name: 'Playful Kids',
    niche: 'Kids & Baby',
    nicheId: 'kids',
    emotions: ['Fun', 'Bright', 'Energetic'],
    headingFont: { name: 'Baloo 2', weight: '600' },
    bodyFont: { name: 'Nunito', weight: '400' },
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFF9F0',
    },
    description: 'Inspired by Lego and Primary. Coral red, turquoise pop, and soft cream.',
  },
  {
    id: 25,
    name: 'Gentle Baby',
    niche: 'Kids & Baby',
    nicheId: 'kids',
    emotions: ['Soft', 'Safe', 'Nurturing'],
    headingFont: { name: 'Comfortaa', weight: '600' },
    bodyFont: { name: 'Poppins', weight: '300' },
    colors: {
      primary: '#7EB5A6',
      secondary: '#F2C4B3',
      accent: '#FFFCFA',
    },
    description: 'Inspired by Honest Company and Burt\'s Bees Baby. Soft teal, blush peach, and pure white.',
  },

  // PETS (2)
  {
    id: 26,
    name: 'Premium Pets',
    niche: 'Pets',
    nicheId: 'pets',
    emotions: ['Loving', 'Quality', 'Trustworthy'],
    headingFont: { name: 'Lexend', weight: '600' },
    bodyFont: { name: 'Public Sans', weight: '400' },
    colors: {
      primary: '#1F3044',
      secondary: '#E08D3C',
      accent: '#FBF9F6',
    },
    description: 'Inspired by Chewy and BarkBox. Navy trust, golden retriever, and clean white.',
  },
  {
    id: 27,
    name: 'Natural Pet Care',
    niche: 'Pets',
    nicheId: 'pets',
    emotions: ['Organic', 'Gentle', 'Eco-friendly'],
    headingFont: { name: 'Aleo', weight: '700' },
    bodyFont: { name: 'Karla', weight: '400' },
    colors: {
      primary: '#4A6741',
      secondary: '#A8C69F',
      accent: '#F9F8F5',
    },
    description: 'Inspired by Wild One. Deep moss, meadow green, and natural white.',
  },

  // OUTDOOR & TRAVEL (3)
  {
    id: 28,
    name: 'Adventure Gear',
    niche: 'Outdoor & Travel',
    nicheId: 'outdoor',
    emotions: ['Rugged', 'Durable', 'Adventurous'],
    headingFont: { name: 'Fjalla One', weight: '400' },
    bodyFont: { name: 'Roboto Condensed', weight: '400' },
    colors: {
      primary: '#1A1A1A',
      secondary: '#FF6B35',
      accent: '#F0EFED',
    },
    description: 'Inspired by The North Face and Arc\'teryx. Technical black, safety orange, and stone.',
  },
  {
    id: 29,
    name: 'Luxury Travel',
    niche: 'Outdoor & Travel',
    nicheId: 'outdoor',
    emotions: ['Exclusive', 'Aspirational', 'Premium'],
    headingFont: { name: 'Tenor Sans', weight: '400' },
    bodyFont: { name: 'Libre Baskerville', weight: '400' },
    colors: {
      primary: '#1C1C1C',
      secondary: '#B8860B',
      accent: '#FAF8F5',
    },
    description: 'Inspired by Louis Vuitton and Rimowa. Jet black, heritage gold, and travel cream.',
  },
  {
    id: 30,
    name: 'Eco Explorer',
    niche: 'Outdoor & Travel',
    nicheId: 'outdoor',
    emotions: ['Sustainable', 'Conscious', 'Natural'],
    headingFont: { name: 'Manrope', weight: '700' },
    bodyFont: { name: 'Manrope', weight: '400' },
    colors: {
      primary: '#264653',
      secondary: '#2A9D8F',
      accent: '#F4F1DE',
    },
    description: 'Inspired by Cotopaxi. Deep teal, ocean green, and sun-bleached canvas.',
  },
];

// Google Fonts import string
const googleFontsUrl = `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Bebas+Neue&family=Poppins:wght@300;600&family=Cormorant+Garamond:wght@600&family=Montserrat:wght@700&family=Jost:wght@500&family=Libre+Bodoni:wght@700&family=Quicksand:wght@600&family=Cormorant:wght@500&family=Oswald:wght@600&family=DM+Serif+Display&family=Anton&family=Josefin+Sans:wght@600&family=Abril+Fatface&family=Inter:wght@400;600&family=Orbitron:wght@700&family=Outfit:wght@400;600&family=Barlow+Condensed:wght@700&family=Barlow:wght@400&family=Philosopher:wght@700&family=Teko:wght@600&family=Fraunces:wght@700&family=Bitter:wght@700&family=Cinzel:wght@700&family=Baloo+2:wght@600&family=Comfortaa:wght@600&family=Lexend:wght@600&family=Aleo:wght@700&family=Fjalla+One&family=Tenor+Sans&family=Manrope:wght@400;700&family=Space+Grotesk:wght@400&family=Karla:wght@400&family=Open+Sans:wght@400&family=DM+Sans:wght@400&family=Lato:wght@400&family=Nunito:wght@400&family=Source+Sans+Pro:wght@400&family=Roboto:wght@400&family=Work+Sans:wght@400&family=IBM+Plex+Sans:wght@400&family=Raleway:wght@400&family=Mulish:wght@400&family=Exo+2:wght@400&family=Nunito+Sans:wght@400&family=Rubik:wght@400&family=Libre+Franklin:wght@400&family=Cabin:wght@400&family=Crimson+Text:wght@400&family=Public+Sans:wght@400&family=Roboto+Condensed:wght@400&family=Libre+Baskerville:wght@400&display=swap`;

// Animation variants
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

// Color Swatch Component - 10:6 ratio (taller than wide)
function ColorSwatch({ color, label, onCopy, copied }: { color: string; label: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={onCopy}
        className="cursor-pointer transition-all hover:scale-105 rounded-lg shadow-sm"
        style={{
          backgroundColor: color,
          width: '60px',
          height: '100px', // 10:6 ratio
          border: '1px solid rgba(0,0,0,0.08)',
        }}
        title={`Click to copy ${color}`}
      />
      <button
        onClick={onCopy}
        className="flex items-center gap-1 text-xs font-mono transition-colors hover:opacity-70"
        style={{ color: '#666' }}
      >
        {color.toUpperCase()}
        {copied ? (
          <Check size={10} className="text-green-500" />
        ) : (
          <Copy size={10} style={{ opacity: 0.5 }} />
        )}
      </button>
    </div>
  );
}

// Helper function to determine if a color is light or dark
function isLightColor(hexColor: string): boolean {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

// Geo-Convert Info Modal Component
function GeoConvertModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - top right */}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}
        >
          <X size={18} className="text-gray-500" />
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 pr-8">
          What is this bar?
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-[var(--text-muted)] mb-6">
          A genius conversion tool that leverages the most powerful influence methods in psychology.
        </p>

        {/* Stat Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black mb-6">
          <TrendingUp size={16} style={{ color: '#32CD32' }} />
          <span className="text-sm font-semibold" style={{ color: '#32CD32' }}>
            60-70% conversion increase
          </span>
        </div>

        {/* Two Main Reasons */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold" style={{ color: '#32CD32' }}>1</span>
            </div>
            <div>
              <p className="text-sm text-[var(--text-primary)]" style={{ fontWeight: 700 }}>Hyper-Personalization</p>
              <p className="text-sm text-[var(--text-muted)]">Auto-detects visitor location and displays personalized discounts tied to local holidays and events — creating urgency and relevance.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold" style={{ color: '#32CD32' }}>2</span>
            </div>
            <div>
              <p className="text-sm text-[var(--text-primary)]" style={{ fontWeight: 700 }}>Purchasing Power Parity</p>
              <p className="text-sm text-[var(--text-muted)]">Smart discount ranges based on each country&apos;s economy — higher discounts for developing markets, maximizing conversions globally.</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://geo-convert.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-black text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Add announcement bar
          <ExternalLink size={16} />
        </a>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// Geo-Convert Announcement Bar Component
function GeoConvertBar({ brand, variation }: { brand: BrandBook; variation: GeoBarVariation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use primary color as background
  const bgColor = brand.colors.primary;
  // Determine text color based on background brightness
  const isLightBg = isLightColor(bgColor);
  const textColor = isLightBg ? '#000000' : '#FFFFFF';
  // Use secondary for highlighted text (event name, discount)
  const highlightColor = brand.colors.secondary;

  return (
    <>
      {/* Bar - using flex to keep button always visible */}
      <div
        className="w-full py-2 px-3 flex items-center justify-between gap-2"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {/* Text content */}
        <div className="flex items-center justify-center gap-1 flex-wrap flex-1 min-w-0">
          <span style={{ fontSize: '11px', color: textColor }}>
            <span style={{ color: highlightColor, fontWeight: '600' }}>
              {variation.holiday}
            </span>{' '}
            Sale for
          </span>
          <img
            src={`https://flagcdn.com/w20/${variation.countryCode}.png`}
            srcSet={`https://flagcdn.com/w40/${variation.countryCode}.png 2x`}
            width="14"
            height="10"
            alt={variation.country}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          <span style={{ fontSize: '11px', color: textColor }}>
            {variation.country} : Use code{' '}
            <span
              style={{
                border: `1px dashed ${isLightBg ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)'}`,
                padding: '1px 5px',
                borderRadius: '3px',
                fontWeight: '600',
                color: highlightColor,
              }}
            >
              {variation.code}
            </span>{' '}
            for{' '}
            <span style={{ color: highlightColor, fontWeight: '600' }}>
              {variation.discount}% OFF
            </span>
          </span>
        </div>
        {/* Question mark button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: isLightBg ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)',
            color: textColor,
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
          }}
          title="What is this?"
        >
          ?
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <GeoConvertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// Brand Card Component
function BrandBookCard({ brand }: { brand: BrandBook }) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = async (color: string) => {
    await navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colorEntries = [
    { key: 'primary', color: brand.colors.primary },
    { key: 'secondary', color: brand.colors.secondary },
    { key: 'accent', color: brand.colors.accent },
  ];

  return (
    <motion.div variants={itemVariants}>
      <div className="card card-hover overflow-hidden h-full flex flex-col" style={{ padding: 0 }}>
        {/* Preview Section - Simulated Store UI */}
        <div
          className="p-6 relative"
          style={{
            background: '#FFFFFF',
          }}
        >
          {/* Font Preview */}
          <h3
            style={{
              fontFamily: `"${brand.headingFont.name}", sans-serif`,
              fontWeight: brand.headingFont.weight,
              color: brand.colors.primary,
              fontSize: '24px',
              marginBottom: '6px',
              lineHeight: '1.2',
            }}
          >
            Premium Collection
          </h3>
          <p
            style={{
              fontFamily: `"${brand.bodyFont.name}", sans-serif`,
              fontWeight: brand.bodyFont.weight,
              color: '#666666',
              fontSize: '13px',
              marginBottom: '16px',
              lineHeight: '1.5',
            }}
          >
            Discover our curated selection of premium products.
          </p>

          {/* Sample Button */}
          <button
            style={{
              fontFamily: `"${brand.bodyFont.name}", sans-serif`,
              fontWeight: '500',
              fontSize: '12px',
              padding: '8px 16px',
              backgroundColor: brand.colors.primary,
              color: brand.colors.accent,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Shop Now
          </button>

          {/* Color Swatches - 3 rectangles with 10:6 ratio */}
          <div className="flex justify-center gap-4 mt-6 pt-6" style={{ borderTop: '1px solid #f0f0f0' }}>
            {colorEntries.map(({ key, color }) => (
              <ColorSwatch
                key={key}
                color={color}
                label={key}
                onCopy={() => copyColor(color)}
                copied={copiedColor === color}
              />
            ))}
          </div>
        </div>

        {/* Geo-Convert Announcement Bar Preview */}
        <GeoConvertBar brand={brand} variation={geoBarVariations[(brand.id - 1) % geoBarVariations.length]} />

        {/* Details Section */}
        <div className="p-5 flex-1 flex flex-col" style={{ backgroundColor: '#FAFAFA' }}>
          {/* Tags */}
          <div className="mb-3">
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: '#000000' }}
            >
              <span style={{ color: '#88da1c' }}>{brand.niche}:</span>
              <span style={{ color: '#FFFFFF', marginLeft: '4px' }}>{brand.emotions.join(', ')}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold mb-1.5" style={{ color: '#1a1a1a' }}>
            {brand.name}
          </h3>
          <p className="text-xs mb-3" style={{ color: '#888', lineHeight: '1.5' }}>
            {brand.description}
          </p>

          <div className="flex-1" />

          {/* Font Info */}
          <div className="flex items-center gap-2 text-xs" style={{ color: '#888' }}>
            <Type size={12} />
            <span style={{ fontWeight: '500', color: '#555' }}>
              {brand.headingFont.name}
            </span>
            <span>+</span>
            <span>{brand.bodyFont.name}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BrandBooksPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeNiche, setActiveNiche] = useState('all');

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = googleFontsUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Auth check - TEMP DISABLED FOR PREVIEW
  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, isLoading, router]);

  // if (isLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-white">
  //       <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
  //     </div>
  //   );
  // }

  const filteredBrands = brandBooks.filter(
    (brand) => activeNiche === 'all' || brand.nicheId === activeNiche
  );

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Brand Books</h1>
              <p>30 professional brand identities for eCommerce stores</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)]">
              <Palette size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                30 Brand Books
              </span>
            </div>
          </div>
        </header>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8" style={{ scrollbarWidth: 'none' }}>
          {nicheCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeNiche === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveNiche(category.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-medium"
                style={{
                  backgroundColor: isActive ? '#000000' : 'var(--bg-card)',
                  color: isActive ? '#88da1c' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-light)',
                }}
              >
                <Icon size={16} strokeWidth={1.5} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Brand Books Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNiche}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid-3"
          >
            {filteredBrands.map((brand) => (
              <BrandBookCard key={brand.id} brand={brand} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-16">
            <Palette size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <h3 className="text-lg font-semibold mb-2">No brand books found</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
