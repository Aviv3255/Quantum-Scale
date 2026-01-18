/**
 * Section Reference Images
 *
 * This file maps each custom section to its original reference screenshot.
 * Use these references when comparing or fixing sections to match the original designs.
 *
 * Reference images are located in: C:\Users\aviv3\Pictures\Screenshots\
 */

export const sectionReferences: Record<string, {
  sectionId: string;
  sectionName: string;
  referenceImage: string;
  description: string;
}> = {
  // ========== 11 NEW SECTIONS ADDED 2026-01-16 ==========

  'social-proof-avatar-bar': {
    sectionId: 'social-proof-avatar-bar',
    sectionName: 'Social Proof - Avatar Bar',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131739.png',
    description: 'Pill-shaped container with overlapping avatars, name with verified checkmark, and "joined the community" text. White background with rounded pill wrapper.'
  },

  'trustpilot-reviews-carousel': {
    sectionId: 'trustpilot-reviews-carousel',
    sectionName: 'Testimonials - Trustpilot Reviews Carousel',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131713.png',
    description: 'Mint green background (#e8f5e9). Italic heading "Our customers tell it better than we do!". Trustpilot rating with individual green square star badges. Review cards with titles, navigation arrows (< >), and black "View All" button at bottom.'
  },

  'video-testimonials-grid': {
    sectionId: 'video-testimonials-grid',
    sectionName: 'Testimonials - Video Grid',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131636.png',
    description: 'Grid of video testimonial cards. Play button positioned at bottom-left of each card (not centered). Navigation arrow on right side. No heading text above grid.'
  },

  'category-cards-row': {
    sectionId: 'category-cards-row',
    sectionName: 'Product - Category Cards Row',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 132046.png',
    description: 'Row of category cards with large rounded corners. Each card has "YOUR PERFECT FIT" label at top, category name, and "SHOP NOW" button. Images fill the card background.'
  },

  'hero-split-yellow-badge': {
    sectionId: 'hero-split-yellow-badge',
    sectionName: 'Hero - Split Yellow with Badge',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 132015.png',
    description: 'Split layout with yellow/cream background on left. Italic heading "Consciously Created". SVG rotating badge with circular text "FREE SHIPPING • WORLDWIDE •" around a dark circle. Product image on right.'
  },

  'hero-pink-product': {
    sectionId: 'hero-pink-product',
    sectionName: 'Hero - Pink Product Showcase',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131955.png',
    description: 'Pink gradient background. Heading "It\'s all about the crave". Overlapping circular avatar images. Trustpilot rating badge with stars and score. "Shop Now" and "Shop chips" buttons. Product images (candy/snacks) on right.'
  },

  'hero-skincare-review': {
    sectionId: 'hero-skincare-review',
    sectionName: 'Hero - Skincare with Review',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131931.png',
    description: 'Split layout with product image on left. Dark teal/green background on right. Italic serif heading "Buy One, Get One Half Off". Customer review with avatar, name, stars. White bordered pill button "Shop now".'
  },

  'faq-accordion-elegant': {
    sectionId: 'faq-accordion-elegant',
    sectionName: 'FAQ - Elegant Accordion',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131903.png',
    description: 'Light beige/cream background (#f5f5f0). Only 2 accordion items: "Description" (collapsed, chevron down) and "Size & Fit" (expanded, chevron up). Lorem ipsum text in expanded section. Black "Sizing" button with pencil/ruler icon.'
  },

  'reviews-carousel-minimal': {
    sectionId: 'reviews-carousel-minimal',
    sectionName: 'Testimonials - Reviews Carousel',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131844.png',
    description: 'Minimal reviews carousel with 4 slides. Each slide shows square-ish avatar (rounded corners), reviewer name in bold italic with stars next to it on same line. Review text below. Navigation arrows and dot indicators for sliding between reviews.'
  },

  'features-connecting-lines': {
    sectionId: 'features-connecting-lines',
    sectionName: 'Features - Connecting Lines',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131824.png',
    description: 'Split layout: skincare image (woman with face mask) on left. Heading "All glow. No gimmicks." in bold dark navy blue (#1e3a5f). Continuous vertical navy blue line on left with dot markers for each feature. 4 features with bold titles and descriptions. "Shop now" navy blue pill button at bottom.'
  },

  'testimonials-brand-love': {
    sectionId: 'testimonials-brand-love',
    sectionName: 'Testimonials - Brand Love Cards',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-16 131801.png',
    description: 'Orange pill badge "Half if the stock is already sold!" at top. Heading "Why people love our brand." with "our brand." in coral/orange italic. Subtext "Here\'s what they have to say". Orange "View All Reviews" button. 4 review cards with circular gray avatar, name, role, Trustpilot green star boxes (5 squares), and review text with bold/underlined highlights.'
  },

  // ========== 24 NEW SECTIONS ADDED 2026-01-16 (Batch 2) ==========

  'collection-cards-3up': {
    sectionId: 'collection-cards-3up',
    sectionName: 'Collection - Cards 3-Up',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 142156.png',
    description: 'Three large collection cards (RUGS, TOWELS, THROWS) with full-bleed images, white overlay text titles, and white "SHOP" buttons. Clean grid layout.'
  },

  'adventure-image-carousel': {
    sectionId: 'adventure-image-carousel',
    sectionName: 'Gallery - Adventure Carousel',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 142128.png',
    description: 'Image carousel with 4 adventure/lifestyle images. Navigation arrows on sides. Rounded corners on images. Horizontal scrollable layout.'
  },

  'hero-asymmetric-gallery': {
    sectionId: 'hero-asymmetric-gallery',
    sectionName: 'Hero - Asymmetric Gallery',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 142104.png',
    description: 'Asymmetric hero layout with tennis/sports imagery. Large main image with smaller images arranged asymmetrically. Yellow accent elements. "Summer 2024" text overlay.'
  },

  'social-media-cards': {
    sectionId: 'social-media-cards',
    sectionName: 'Social - Media Cards',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 142039.png',
    description: 'Four social media video cards with thumbnails, usernames, and view counts. Rounded corners. Platform icons (TikTok, YouTube, etc.).'
  },

  'shop-category-toggle': {
    sectionId: 'shop-category-toggle',
    sectionName: 'Category - Toggle Cards',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 142012.png',
    description: 'Category cards with toggle between "MEN" and "WOMEN". Product images for sunglasses, skincare, caps. White rounded cards on gray background.'
  },

  'product-video-features': {
    sectionId: 'product-video-features',
    sectionName: 'Product - Video Features Split',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141945.png',
    description: 'Split layout with video on left, feature list on right. Play button overlay on video. Checkmark icons for features. "Shop Now" CTA button.'
  },

  'how-it-works-steps': {
    sectionId: 'how-it-works-steps',
    sectionName: 'Features - How It Works',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141912.png',
    description: 'Three-step "How It Works" section. Numbered steps (1, 2, 3) with icons, titles, and descriptions. Green accent color. Clean minimal design.'
  },

  'tips-timeline-blue': {
    sectionId: 'tips-timeline-blue',
    sectionName: 'Content - Tips Timeline',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141846.png',
    description: 'Blue background section with skincare tips timeline. Numbers 1-4 with connecting line. Tips for skincare routine with icons. "Shop All" button.'
  },

  'bestsellers-product-grid': {
    sectionId: 'bestsellers-product-grid',
    sectionName: 'Product - Bestsellers Grid',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141817.png',
    description: 'Product grid showing bestsellers. Product images with names, prices, and "Add" buttons. Star ratings. Navigation arrows for carousel.'
  },

  'discover-category-accordion': {
    sectionId: 'discover-category-accordion',
    sectionName: 'Category - Discover Accordion',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141750.png',
    description: 'Accordion-style category section. Large product image on right. Category list (Cleansers, Eye Creams, etc.) with expandable items. "Discover Skincare" heading.'
  },

  'google-reviews-carousel': {
    sectionId: 'google-reviews-carousel',
    sectionName: 'Testimonials - Google Reviews',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141721.png',
    description: 'Google reviews carousel with "Over 3,500 Google Reviews" heading. Review cards with avatars, names, star ratings, and review text. Progress bar navigation.'
  },

  'dark-product-card-neon': {
    sectionId: 'dark-product-card-neon',
    sectionName: 'Product - Dark Neon Card',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141654.png',
    description: 'Dark background product card. "Focus Reimagined" heading. Neon yellow/green accent button. Product image (glasses) on right. Premium tech aesthetic.'
  },

  'product-hotspots-showcase': {
    sectionId: 'product-hotspots-showcase',
    sectionName: 'Product - Hotspots Showcase',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141654.png',
    description: 'Product image with interactive hotspot markers. Clicking hotspots reveals product details popup. Benefits list with checkmarks. "SHOP NOW" CTA.'
  },

  'trust-icons-bar': {
    sectionId: 'trust-icons-bar',
    sectionName: 'Trust - Icons Bar',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141542.png',
    description: 'Horizontal bar with 4 trust icons: Lifetime Guarantee (briefcase), Secure Payment (card+shield), Free Shipping (truck), See In Action (play). Line icons with labels.'
  },

  'as-seen-on-dark': {
    sectionId: 'as-seen-on-dark',
    sectionName: 'Social - As Seen On (Dark)',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 141007.png',
    description: 'Dark background bar with "AS SEEN ON" label. Publication logos: NewScientist, PureWow (italic), COSMOPOLITAN (caps), GLAMOUR (caps), Inc. White text on dark.'
  },

  'as-seen-on-light': {
    sectionId: 'as-seen-on-light',
    sectionName: 'Social - As Seen On (Light)',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140947.png',
    description: 'Light/white background with "As seen on" label. Grayscale publication logos: GLAMOUR, healthline, marie claire, NewScientist, PureWow. Rounded pill container.'
  },

  'beauty-hero-video-gallery': {
    sectionId: 'beauty-hero-video-gallery',
    sectionName: 'Hero - Beauty Video Gallery',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140918.png',
    description: 'Pink background hero. Main video with play/pause controls. 3 thumbnail images below. "5 Reasons Why Beauty Serum Will Improve Your sleep, skin & energy" heading. Testimonial with avatar. Pink "ORDER NEW" button. Benefits grid with checkmarks.'
  },

  'product-upgrade-testimonial': {
    sectionId: 'product-upgrade-testimonial',
    sectionName: 'Product - Upgrade Testimonial',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140854.png',
    description: 'Split layout. "Reasons to upgrade your water bottle" heading with italic accent. Testimonial with avatar quote. Video gallery on right with thumbnails. Feature icons: cold 24h, hot 12h, double-wall, made to last.'
  },

  'faq-tabbed-accordion': {
    sectionId: 'faq-tabbed-accordion',
    sectionName: 'FAQ - Tabbed Accordion',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140825.png',
    description: 'FAQ section with italic serif heading "Frequently Asked Questions". 3 category tabs (General, Shipping, Returns) in pill container. Accordion questions with + icons. Navy blue accent colors.'
  },

  'bento-gallery-grid': {
    sectionId: 'bento-gallery-grid',
    sectionName: 'Gallery - Bento Grid',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140745.png',
    description: 'Bento-style gallery grid with varying sizes. 5 images with overlaid italic text and white CTA buttons: "Soft to the touch/SHOP THROWS", "Bedsheet/USAGE GUIDE", "Thick as a towel/SHOP RUGS", "Boost your home/INSPIRATION", "Reversible design/SEE HOW".'
  },

  'circular-category-icons': {
    sectionId: 'circular-category-icons',
    sectionName: 'Category - Circular Icons',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140618.png',
    description: 'Beige background with 5 circular category images: Dresses, Suits & Tailoring, Loungewear, Accessories, Jewelry. Model photos cropped in circles with labels below.'
  },

  'food-allergen-badges': {
    sectionId: 'food-allergen-badges',
    sectionName: 'Product - Allergen Badges',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140542.png',
    description: 'Split layout. Yellow "gluten-free" badge, "Energy cookies" heading, italic description. Product image (cookie) overlapping blueberry background. Allergen badges: lactose-free (yellow), gluten-free (green), nut-free (orange), egg-free (teal).'
  },

  'instagram-feed-grid': {
    sectionId: 'instagram-feed-grid',
    sectionName: 'Social - Instagram Feed',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140506.png',
    description: 'Instagram feed section. "FOLLOW US ON SOCIALS" label, "Tune in, for good stuff." heading. Black "@undabrand" button. Grid of lifestyle photos with varying heights (some tall, some square). Rounded corners.'
  },

  'hero-vertical-marquee': {
    sectionId: 'hero-vertical-marquee',
    sectionName: 'Hero - Vertical Marquee',
    referenceImage: 'C:\\Users\\aviv3\\Downloads\\Screenshot 2026-01-16 140438.png',
    description: 'Split hero layout. Left side beige with "Targeted Solutions" heading and description. Vertical marquee text "just in • just in •" scrolling on right edge. Full-height product image on right (skincare model).'
  },

  // ========== 11 NEW SECTIONS ADDED 2026-01-17 (Batch 3) ==========

  'results-before-after-grid': {
    sectionId: 'results-before-after-grid',
    sectionName: 'Product - Results Before/After Grid',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 180407.png',
    description: 'Grid of 4 before/after result cards. "Visible results in weeks" heading. Each card has toggle to switch between before/after images. "Week X" labels. Hair treatment/skincare results focus.'
  },

  'lifestyle-mosaic-text': {
    sectionId: 'lifestyle-mosaic-text',
    sectionName: 'Gallery - Lifestyle Mosaic',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 180436.png',
    description: 'Split layout with green text sidebar on left containing "Take it anywhere. Own for a lifetime." heading. 6-image mosaic grid on right with rounded corners. Clean lifestyle photography.'
  },

  'results-circular-stats': {
    sectionId: 'results-circular-stats',
    sectionName: 'Trust - Results Stats',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 180517.png',
    description: 'Split layout with product image on left. "Results" heading on right with 3 circular progress indicators showing percentages (e.g., 95% saw results). Animated progress rings.'
  },

  'before-after-tabs-slider': {
    sectionId: 'before-after-tabs-slider',
    sectionName: 'Product - Before/After Tabs',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 180619.png',
    description: 'Tabbed comparison slider. "90% hair reduction" headline. Tabs for different body areas (ARMS, LEGS, etc.). Draggable before/after slider with center handle.'
  },

  'hero-sale-logo-marquee': {
    sectionId: 'hero-sale-logo-marquee',
    sectionName: 'Hero - Sale with Logo Marquee',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 180651.png',
    description: 'Full-width hero banner with "Fall Sale" headline. CTA buttons. Scrolling logo marquee bar at bottom showing partner/publication logos.'
  },

  'how-it-works-split-accordion': {
    sectionId: 'how-it-works-split-accordion',
    sectionName: 'Features - How It Works Accordion',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 180758.png',
    description: 'Split layout with product image on left. "HOW IT WORKS" heading on right with numbered accordion (01, 02, 03). Expandable step descriptions. Clean minimal design.'
  },

  'black-friday-countdown-products': {
    sectionId: 'black-friday-countdown-products',
    sectionName: 'CTA - Black Friday Countdown',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 180951.png',
    description: 'Dark background Black Friday section. "Black Friday Event" heading with animated countdown timer (days:hours:mins:secs). "Shop Now" CTA. 4-product grid below with images and prices.'
  },

  'glow-up-before-after-features': {
    sectionId: 'glow-up-before-after-features',
    sectionName: 'Product - Glow-Up Features',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 181041.png',
    description: '"FEATURED" badge at top. "Glow-Up Without Surgery" heading. Feature checkmarks list. Two before/after comparison images side by side with labels.'
  },

  'product-features-icons-light': {
    sectionId: 'product-features-icons-light',
    sectionName: 'Product - Features with Icons',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 181122.png',
    description: 'Light background product section. "Pure Ceremonial Energy" heading. Product image on left. Feature grid on right with icons (leaf, lightning, heart, etc.) and descriptions.'
  },

  'dark-tech-features-card': {
    sectionId: 'dark-tech-features-card',
    sectionName: 'Product - Dark Tech Card',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 181148.png',
    description: 'Dark/black background product card. "Engineering Grade 5" heading with tech aesthetic. Product image with feature callouts. Minimal dark theme with white text.'
  },

  'sleep-wellness-hero': {
    sectionId: 'sleep-wellness-hero',
    sectionName: 'Hero - Sleep Wellness',
    referenceImage: 'C:\\Users\\aviv3\\Pictures\\Screenshots\\Screenshot 2026-01-17 181221.png',
    description: 'Sleep/wellness hero with gradient overlay on lifestyle image. Trust badges row. Bold heading with sleep benefits. Dual CTAs (primary and secondary buttons).'
  }
};

/**
 * Get reference image path for a section
 */
export function getSectionReference(sectionId: string) {
  return sectionReferences[sectionId] || null;
}

/**
 * Get all section references
 */
export function getAllSectionReferences() {
  return Object.values(sectionReferences);
}
