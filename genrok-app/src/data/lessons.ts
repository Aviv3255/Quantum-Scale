/**
 * Shared Lesson Metadata - 250+ lessons across all categories
 * Used by /learn and /learn-v2 pages
 */

// Lesson category types
export type LessonCategory = 'copywriting' | 'psychology' | 'branding' | 'meta-ads' | 'google-ads' | 'business';

// Lesson metadata interface
export interface LessonMeta {
  title: string;
  description: string;
  categories: LessonCategory[];
  duration?: string;
}

// Complete lesson metadata
export const lessonMeta: Record<string, LessonMeta> = {
  'familiar-surprise-secret': { title: 'The Familiar Surprise Secret', description: 'Master the MAYA principle', categories: ['copywriting'], duration: '8 min' },
  'red-button-effect': { title: 'The Red Button Effect', description: 'Understanding psychological reactance', categories: ['copywriting', 'psychology'], duration: '6 min' },
  'fred-method': { title: 'The F.R.E.D. Method', description: 'A framework for audience psychology', categories: ['copywriting'], duration: '10 min' },
  'emotion-decides': { title: 'Emotion Decides, Logic Justifies', description: 'How emotions drive purchases', categories: ['copywriting', 'psychology'], duration: '7 min' },
  'gatekeeper-method': { title: 'The Gatekeeper Method', description: 'Bypass the brain\'s attention filter', categories: ['copywriting'], duration: '9 min' },
  'three-second-rule': { title: 'The 3-Second Rule', description: 'The critical window to capture attention', categories: ['copywriting'], duration: '5 min' },
  'science-of-selling': { title: 'The Science of Selling', description: 'Systematic approach to conversion', categories: ['copywriting'], duration: '12 min' },
  'persuasion-blueprint': { title: 'The Persuasion Blueprint', description: 'Master plan for influential copy', categories: ['copywriting'], duration: '11 min' },
  'persuasion-stack': { title: 'The Persuasion Stack', description: 'Layered persuasion techniques', categories: ['copywriting'], duration: '8 min' },
  'architecture-of-influence': { title: 'Architecture of Influence', description: 'Framework of persuasive communication', categories: ['copywriting'], duration: '10 min' },
  'wiifm-principle': { title: 'The WIIFM Principle', description: 'What\'s In It For Me', categories: ['copywriting'], duration: '6 min' },
  'three-canons-of-craft': { title: 'The Three Canons of Craft', description: 'Three tests every sentence must pass', categories: ['copywriting'], duration: '7 min' },
  'cpppb-proof-loop': { title: 'The CPPPB Proof Loop', description: 'Five-element framework for persuasion', categories: ['copywriting'], duration: '9 min' },
  'damaging-admission': { title: 'The Damaging Admission', description: 'Why revealing weakness builds trust', categories: ['copywriting'], duration: '6 min' },
  'emotional-precision': { title: 'Emotional Precision', description: 'Target precise emotions that drive action', categories: ['copywriting'], duration: '8 min' },
  'blind-spot-effect': { title: 'The Blind Spot Effect', description: 'What prospects can\'t see about themselves', categories: ['copywriting'], duration: '7 min' },
  'customer-voice-mining': { title: 'Voice of Customer Mining', description: 'Extract the exact words customers use', categories: ['copywriting'], duration: '10 min' },
  'double-bind-of-fear': { title: 'The Double Bind of Fear', description: 'Leverage action and inaction fears', categories: ['copywriting'], duration: '8 min' },
  'emotion-spectrum': { title: 'The Emotion Spectrum', description: 'Map the full range of persuasive emotions', categories: ['copywriting'], duration: '9 min' },
  'forty-forty-twenty-rule': { title: 'The 40/40/20 Rule', description: 'The marketing success formula', categories: ['copywriting', 'business'], duration: '7 min' },
  'four-primal-needs': { title: 'The Four Primal Needs', description: 'Deep drivers behind every purchase', categories: ['copywriting', 'psychology'], duration: '8 min' },
  'ocpb-formula': { title: 'The OCPB Formula', description: 'Offer, Copy, Proof, Bonus stack', categories: ['copywriting'], duration: '10 min' },
  'sales-message-anatomy': { title: 'Sales Message Anatomy', description: 'Dissect what makes copy convert', categories: ['copywriting'], duration: '11 min' },
  'self-persuasion-architecture': { title: 'Self-Persuasion Architecture', description: 'Let prospects convince themselves', categories: ['copywriting', 'psychology'], duration: '9 min' },
  'structural-tension': { title: 'Structural Tension', description: 'Create irresistible forward momentum', categories: ['copywriting'], duration: '7 min' },
  'three-growth-levers': { title: 'The Three Growth Levers', description: 'Customers, frequency, transaction size', categories: ['copywriting', 'business'], duration: '8 min' },
  'three-levels-of-change': { title: 'The Three Levels of Change', description: 'Transform behavior, beliefs, identity', categories: ['copywriting', 'psychology'], duration: '9 min' },
  'trust-architecture': { title: 'The Trust Architecture', description: 'Build unshakeable credibility', categories: ['copywriting'], duration: '8 min' },
  'unique-mechanism': { title: 'The Unique Mechanism', description: 'Proprietary reason your solution works', categories: ['copywriting'], duration: '7 min' },
  'master-key-framework': { title: 'The Master Key Framework', description: 'First-principles guide to copy', categories: ['copywriting'], duration: '12 min' },
  'rule-of-one': { title: 'The Rule of One', description: 'One reader, one idea, one offer, one action', categories: ['copywriting'], duration: '6 min' },
  'architecture-of-belief': { title: 'The Architecture of Belief', description: 'Three levels of mastery', categories: ['copywriting'], duration: '10 min' },
  'copywriters-codex': { title: 'The Copywriter\'s Codex', description: 'A synthesized playbook from the masters', categories: ['copywriting'], duration: '15 min' },
  // Article-based lessons
  'best-private-agent': { title: 'Who Is the Best Private Agent', description: '5-7 day shipping, 18/6 WhatsApp support', categories: ['business'], duration: '5 min' },
  'stop-aliexpress': { title: 'Stop Using AliExpress Now', description: 'Why AliExpress destroys your brand', categories: ['business'], duration: '6 min' },
  'ltv-cheat-code': { title: 'The LTV Cheat Code', description: 'How 5% of customers generate 95% of revenue', categories: ['business'], duration: '8 min' },
  'million-dollar-roadmap': { title: 'The Roadmap to $1M/Month', description: '33 customers per day formula', categories: ['business'], duration: '10 min' },
  'geo-announcement-bar': { title: 'GEO-Location Announcement Bar', description: '67% conversion rate increase', categories: ['business'], duration: '5 min' },
  'wishlist-effect': { title: 'The Wishlist Effect', description: 'Endowment Effect psychology (+8% CVR)', categories: ['psychology', 'business'], duration: '6 min' },
  'email-vs-sms': { title: 'Email vs SMS Revenue', description: 'Which generates more revenue?', categories: ['business'], duration: '5 min' },
  'abandoned-cart-recovery': { title: 'Abandoned Cart Recovery', description: 'AI SMS vs Email: 85% vs 60%', categories: ['business'], duration: '7 min' },
  'pareto-law-ecommerce': { title: 'The Pareto Law in eCommerce', description: '5% customers = 95% revenue', categories: ['business'], duration: '6 min' },
  'whatsapp-support': { title: 'Should You Add WhatsApp Support?', description: 'Why email-only is better', categories: ['business'], duration: '5 min' },
  'meta-attribution-test': { title: 'Is Meta Lying About Creatives?', description: 'Meta only tracks 67% of purchases', categories: ['meta-ads'], duration: '8 min' },
  'post-purchase-surveys': { title: 'Post Purchase Surveys', description: 'Know your customers with data', categories: ['business'], duration: '6 min' },
  'fonts-psychology': { title: 'The Truth About Fonts', description: 'How fonts affect trust and conversions', categories: ['psychology', 'branding'], duration: '7 min' },
  // New article-based lessons (batch 2)
  'brand-search-campaign': { title: 'Brand Search Campaign', description: '18 ROAS on Google with brand search', categories: ['google-ads'], duration: '8 min' },
  'swatch-variants': { title: 'Swatch Variants Test', description: '3.4% CVR increase with image swatches', categories: ['business'], duration: '5 min' },
  'buy-now-button': { title: 'Buy Now Button Analysis', description: 'Removing it increased REV/VISIT by 15.9%', categories: ['business'], duration: '6 min' },
  'rounded-button': { title: 'Rounded Add to Cart Button', description: '28px rounded = highest CVR', categories: ['business'], duration: '4 min' },
  'best-shopify-theme': { title: 'Best Shopify Theme', description: 'Shrine vs Impulse: 34.9% CVR difference', categories: ['business'], duration: '7 min' },
  'coupon-leaking': { title: 'Coupon Leaking Problem', description: 'Stop losing profit to extensions', categories: ['business'], duration: '6 min' },
  'meta-andromeda': { title: 'Meta\'s Andromeda Brain', description: 'How to operate under Meta\'s new AI', categories: ['meta-ads'], duration: '12 min' },
  'gillette-model': { title: 'The Gillette Model', description: 'Cheap entry, expensive consumables', categories: ['business'], duration: '7 min' },
  'best-niches-2026': { title: 'Best Niches for 2026', description: 'Niches with long customer journeys', categories: ['business'], duration: '9 min' },
  'two-meta-rules': { title: 'Two Meta Product Rules', description: 'Special enough + not too specific', categories: ['meta-ads'], duration: '6 min' },
  'pinned-comment-cac': { title: 'Pinned Comment CAC Trick', description: 'Reduce CAC with objection-handling comments', categories: ['meta-ads', 'business'], duration: '5 min' },
  'mastercard-psychology': { title: 'Mastercard Logo Effect', description: 'Payment logos increase willingness to pay', categories: ['psychology'], duration: '5 min' },
  'formula-to-sell': { title: 'The Formula to Sell Anything', description: '4 elements: Dream, Likelihood, Time, Effort', categories: ['copywriting'], duration: '8 min' },
  'choose-products': { title: 'How to Choose Products', description: 'Two rules for winning products', categories: ['business'], duration: '6 min' },
  'gary-halbert-secret': { title: 'Gary Halbert\'s Secret', description: 'Sell what people already want', categories: ['copywriting'], duration: '7 min' },
  'pet-rock-story': { title: 'Pet Rock: $30M from Rocks', description: 'How to sell meaning, not products', categories: ['branding', 'business'], duration: '8 min' },
  'starbucks-ltv': { title: 'Starbucks $14,099 LTV', description: 'How 5% generate 95% of revenue', categories: ['business'], duration: '7 min' },
  'killer-headlines': { title: 'Killer Ad Headlines', description: '80% of success is in the headline', categories: ['copywriting'], duration: '9 min' },
  'two-dirty-tricks': { title: 'Two Dirty Tricks to Sell', description: 'Dream Outcome + Social Proof', categories: ['copywriting'], duration: '6 min' },
  'golden-lookalike': { title: 'Golden Lookalike Audience', description: 'LLA on top 5% spenders = $8-10 CAC', categories: ['meta-ads'], duration: '7 min' },
  'cbo-vs-abo': { title: 'CBO vs ABO Under Andromeda', description: 'ABO for testing, CBO for scaling', categories: ['meta-ads'], duration: '8 min' },
  'geo-personalization': { title: 'GEO Personalization Power', description: 'Location-based offers increase CVR', categories: ['business'], duration: '6 min' },
  'no-one-cares': { title: 'No One Cares About You', description: 'Self-interest drives all purchases', categories: ['psychology', 'copywriting'], duration: '5 min' },
  'creative-volume-2026': { title: 'Creative Volume in 2026', description: '40-70 creatives weekly for Andromeda', categories: ['meta-ads'], duration: '7 min' },
  // Psychology of Sales lessons
  'autopilot-sale': { title: 'The Autopilot Sale', description: 'How mental shortcuts make customers buy without thinking', categories: ['psychology'], duration: '7 min' },
  'borrowed-trust': { title: 'Borrowed Trust', description: 'Authority and Liking principles that bypass skepticism', categories: ['psychology'], duration: '6 min' },
  'herd-instinct': { title: 'The Herd Instinct', description: 'Social proof and similar others create buying pressure', categories: ['psychology'], duration: '8 min' },
  'gift-that-sells': { title: 'The Gift That Sells', description: 'Reciprocity loops that drive sales', categories: ['psychology'], duration: '5 min' },
  'micro-yes-mastery': { title: 'Micro-Yes Mastery', description: 'Tiny commitments create inevitable conversions', categories: ['psychology'], duration: '9 min' },
  // Additional Psychology lessons
  'authority-over-hope': { title: 'Authority Over Hope', description: 'Stop hoping they buy. Guide them with certainty.', categories: ['psychology'], duration: '7 min' },
  'certainty-transfer': { title: 'Certainty Transfer', description: 'Master the art of transferring conviction', categories: ['psychology'], duration: '6 min' },
  'conviction-architecture': { title: 'Conviction Architecture', description: 'The 3-layer pyramid of influence', categories: ['psychology'], duration: '8 min' },
  'digital-pause-power': { title: 'The Digital Pause', description: 'Confident silence converts better than discounts', categories: ['psychology'], duration: '5 min' },
  'fomo-engineering': { title: 'FOMO Engineering', description: 'Turn passive interest into urgent action', categories: ['psychology'], duration: '8 min' },
  'framing-effect-mastery': { title: 'The Framing Effect', description: 'Same facts. Wildly different decisions.', categories: ['psychology'], duration: '10 min' },
  'identity-marketing': { title: 'Identity Marketing', description: 'Sell to who they WANT to be', categories: ['psychology', 'branding'], duration: '9 min' },
  'marketers-delusion': { title: "The Marketer's Delusion", description: 'The fatal error killing conversions', categories: ['psychology'], duration: '6 min' },
  'pain-escalation-ladder': { title: 'The Pain Escalation Ladder', description: 'Ethically escalate pain to action', categories: ['psychology', 'copywriting'], duration: '8 min' },
  'telescope-flip': { title: 'The Telescope Flip', description: '97% of marketers hold it backwards', categories: ['psychology'], duration: '5 min' },
  'trust-blueprint': { title: 'The Trust Blueprint', description: 'Build instant credibility that converts', categories: ['psychology'], duration: '7 min' },
  'value-perception-lever': { title: 'The Value Perception Lever', description: 'Make price irrelevant', categories: ['psychology'], duration: '8 min' },
  'three-brains-wallet': { title: 'The 3 Brains Controlling Your Customer\'s Wallet', description: 'Which brain controls the wallet', categories: ['psychology'], duration: '9 min' },
  'pre-suasion-hack': { title: 'The Pre-Suasion Hack', description: 'Win before the pitch', categories: ['psychology'], duration: '6 min' },
  'pattern-interrupts': { title: 'Pattern Interrupts', description: 'Hijack their attention', categories: ['psychology'], duration: '5 min' },
  'dopamine-blueprint': { title: 'The Dopamine Blueprint', description: 'Create addictive loops', categories: ['psychology'], duration: '8 min' },
  'anti-sell-mastery': { title: 'The Anti-Sell', description: 'Pull, don\'t push', categories: ['psychology'], duration: '7 min' },
  // Primal Playbook lessons
  'decoy-effect': { title: 'The Decoy Effect', description: 'Why a "useless" option boosts sales by 43%', categories: ['psychology'], duration: '6 min' },
  'precise-price-trick': { title: 'The Precise Price Trick', description: 'Why $4,988 beats $5,000', categories: ['psychology'], duration: '5 min' },
  'paradox-of-choice': { title: 'The Paradox of Choice', description: 'Why fewer options = more sales', categories: ['psychology'], duration: '7 min' },
  'forty-million-mistake': { title: 'The $40 Million Mistake', description: 'Data without emotion = disaster', categories: ['psychology'], duration: '8 min' },
  'fly-in-the-urinal': { title: 'The Fly in the Urinal', description: 'Nudge psychology in action', categories: ['psychology'], duration: '5 min' },
  // Conversion Blueprint lessons
  'thirty-two-violinist': { title: 'The $32 Violinist', description: 'Context dictates perceived value', categories: ['psychology'], duration: '6 min' },
  'invisible-influence': { title: 'The Invisible Influence', description: 'How backgrounds prime buying decisions', categories: ['psychology'], duration: '7 min' },
  'price-format-code': { title: 'The Price Format Code', description: 'How formatting changes price perception', categories: ['psychology'], duration: '5 min' },
  'cost-of-standing-still': { title: 'The Cost of Standing Still', description: 'Sell the cost of NOT buying', categories: ['psychology', 'copywriting'], duration: '8 min' },
  'unity-principle': { title: 'The Unity Principle', description: 'One word turns customers into partners', categories: ['psychology'], duration: '6 min' },
  'visual-priming': { title: 'The Invisible Influencer', description: 'How background images decide what customers buy', categories: ['psychology'], duration: '7 min' },
  'objection-inversion': { title: 'The Objection Judo Trick', description: 'Turn objections into reasons to buy', categories: ['psychology', 'copywriting'], duration: '6 min' },
  'primal-stimuli': { title: 'The 6 Primal Buy Buttons', description: 'The only 6 triggers that get the reptile brain to say YES', categories: ['psychology'], duration: '9 min' },
  // CRO Flywheel + Direct Response Brand lessons
  'leaky-bucket-audit': { title: 'The $50,000 Hole in Your Funnel', description: 'PPV metric reveals where you\'re bleeding money', categories: ['psychology', 'business'], duration: '8 min' },
  'price-chunking-yesloop': { title: 'The Yes-Loop: How to 3X Your AOV', description: 'Break big prices into irresistible small yeses', categories: ['psychology'], duration: '7 min' },
  'objection-destroyer': { title: 'The At First I Thought Framework', description: 'Turn objections into conversions with one sentence', categories: ['psychology', 'copywriting'], duration: '6 min' },
  'product-page-anatomy': { title: 'The 5-Element Product Page', description: 'The exact anatomy of pages that convert at 8%+', categories: ['psychology', 'business'], duration: '10 min' },
  'post-purchase-goldmine': { title: 'The Hidden Revenue You\'re Ignoring', description: 'Turn $40 customers into $120 instantly', categories: ['psychology', 'business'], duration: '7 min' },
  'bottom-up-brand': { title: 'Why Movements Beat Marketing', description: 'Build a brand like a movement, not a corporation', categories: ['psychology', 'branding'], duration: '9 min' },
  'halo-serial-position': { title: 'The First & Last Impression Hack', description: '0.05 seconds decides if they trust you', categories: ['psychology'], duration: '6 min' },
  'ikea-effect': { title: 'The IKEA Effect', description: 'Why DIY = 63% higher perceived value', categories: ['psychology'], duration: '5 min' },
  'von-restorff-effect': { title: 'The Von Restorff Effect', description: 'Make your CTA impossible to miss', categories: ['psychology'], duration: '5 min' },
  'jakobs-law': { title: 'Jakob\'s Law', description: 'Why "unique" checkout flows kill conversions', categories: ['psychology'], duration: '6 min' },
  // Unseen Seller + Psychological Commerce lessons
  'gaze-direction': { title: 'The Gaze Hack', description: 'Where they look is where they click', categories: ['psychology'], duration: '5 min' },
  'five-second-test': { title: 'The 5-Second Test', description: 'Why clarity crushes cleverness', categories: ['psychology'], duration: '4 min' },
  'speed-equals-trust': { title: 'The $1.7 Billion Speed Bump', description: '0.1 second = 1% more sales', categories: ['psychology'], duration: '6 min' },
  'imperceptible-nudge': { title: 'The $200 Million Color', description: 'Invisible nudges that drive millions', categories: ['psychology'], duration: '5 min' },
  'cognitive-load-trap': { title: 'The Easy Brain Wins', description: 'Reduce friction, increase trust', categories: ['psychology'], duration: '7 min' },
  'placebo-product': { title: 'Your Product Is a Placebo', description: 'Perception literally alters reality', categories: ['psychology'], duration: '8 min' },
  'information-asymmetry': { title: 'The Prada Mystery Play', description: 'Hide information to elevate status', categories: ['psychology', 'branding'], duration: '7 min' },
  'visual-shorthand': { title: 'Toothpaste Stripes Psychology', description: 'Visual cues shortcut to quality', categories: ['psychology'], duration: '5 min' },
  'radical-honesty-play': { title: 'The Inside Joke Effect', description: 'Admit you\'re marketing to win', categories: ['psychology'], duration: '6 min' },
  'hermes-doctrine': { title: 'The Hermès Infinite Game', description: 'Protect the Birkin, play forever', categories: ['psychology', 'branding'], duration: '9 min' },
  // DTC Growth + Luxury Status + Psychology Growth lessons
  'hero-mechanism': { title: 'The $4,225 Question', description: 'Why Oura Ring costs $399 vs $12 knockoff', categories: ['branding'], duration: '8 min' },
  'scammer-playbook-good': { title: "The Scammer's Playbook (Used for Good)", description: '7 ethical persuasion levers', categories: ['branding', 'psychology'], duration: '10 min' },
  'us-vs-them': { title: 'The David vs Goliath Play', description: 'Create tribal identity through enemies', categories: ['branding'], duration: '7 min' },
  'brand-universe': { title: 'Build a World, Not Just a Store', description: 'Create universes, not products', categories: ['branding'], duration: '11 min' },
  'product-to-identity': { title: 'From Product to Identity Purchase', description: 'Transform commodities to identity', categories: ['branding'], duration: '9 min' },
  'commodity-escape': { title: 'The Commodity Trap', description: 'How Starbucks charges $6 for $0.50 coffee', categories: ['branding'], duration: '10 min' },
  'myth-and-urgency': { title: 'Weaving Myth & Manufacturing Urgency', description: 'Create irresistible desire through scarcity + story', categories: ['branding'], duration: '9 min' },
  'value-ladder': { title: 'The Value Ladder & Hidden Menu', description: 'Secret tiers that create aspiration', categories: ['branding', 'business'], duration: '8 min' },
  'box-worth-300': { title: 'The $300 Empty Box', description: "Tiffany's packaging IS the product", categories: ['branding'], duration: '6 min' },
  'story-taste-experiment': { title: 'Your Story Changes How Products TASTE', description: 'Story literally alters perception', categories: ['branding', 'psychology'], duration: '7 min' },
  'scarcity-calendar': { title: "Le Creuset's Scarcity Engine", description: 'One color per year creates collectors', categories: ['branding'], duration: '8 min' },
  'anchor-moments': { title: "Ralph Lauren's Anchor Moments", description: '$20K bag makes $200 polo feel cheap', categories: ['branding', 'psychology'], duration: '7 min' },
  'irrational-loyalty': { title: 'The Pizza Test & Sock Test', description: 'Once identity forms, logic dies', categories: ['branding', 'psychology'], duration: '6 min' },
  'reciprocity-engine': { title: "The 42% Sales Trick (That's Not a Trick)", description: 'Why giving away free samples increased sales 42%', categories: ['branding', 'psychology'], duration: '7 min' },
  'gucci-short-termism': { title: 'Why Gucci Is Dying', description: 'Fashion chases trends. Luxury chases timelessness', categories: ['branding'], duration: '9 min' },
  'ethical-persuasion-compass': { title: 'The Magic Show Test', description: 'The ethical line between persuasion and manipulation', categories: ['branding', 'psychology'], duration: '8 min' },
  'two-worlds-mastery': { title: 'The Two Worlds Every DTC Founder Must Master', description: 'Performance marketing vs brand building', categories: ['branding', 'business'], duration: '10 min' },
  'race-to-bottom-escape': { title: 'Why Your ROAS Is Killing Your Business', description: "You're winning every battle and losing the war", categories: ['branding', 'business'], duration: '9 min' },
  'founder-operating-system': { title: 'The 4 Traits of Legendary Brand Founders', description: 'What separates iconic founders from the rest', categories: ['branding', 'business'], duration: '11 min' },
  '13800-percent-effect': { title: 'Why 10% Better = 13,800% Better', description: 'Small improvements compound into massive advantages', categories: ['branding', 'business'], duration: '7 min' },
  'dior-pricing-secret': { title: 'The $57 Bag That Sells for $3,500', description: 'What Dior and Rolex know about pricing', categories: ['branding'], duration: '8 min' },
  'consumption-conversion': { title: "Why Your Product Page Isn't Converting", description: 'The gap between consumption and conversion', categories: ['branding', 'business'], duration: '7 min' },
  'luxury-mindset-shift': { title: 'The 4 Mindset Shifts That Create Premium Brands', description: 'Transform your thinking from commodity to luxury', categories: ['branding'], duration: '10 min' },
  // CRO & Testing lessons
  'three-cro-tests': { title: 'The 3 CRO Tests That Actually Move Revenue', description: 'Focus on tests that impact the bottom line', categories: ['branding', 'business'], duration: '8 min' },
  'digital-velvet-rope': { title: 'The Digital Velvet Rope', description: 'Create exclusive experiences that elevate perception', categories: ['branding'], duration: '7 min' },
  'hidden-menu-psychology': { title: 'The Hidden Menu Effect', description: 'Secret options that create status and belonging', categories: ['branding', 'psychology'], duration: '6 min' },
  'celebrity-gifting-flywheel': { title: 'The Celebrity Gifting Flywheel', description: 'Turn free products into millions in influence', categories: ['branding'], duration: '9 min' },
  'forbidden-coffee-hook': { title: 'The Forbidden Coffee Hook', description: 'Mystery and exclusivity wrapped in a story', categories: ['branding'], duration: '7 min' },
  // Meta Ads 2026 lessons (Andromeda)
  'meta-three-second-hook': { title: 'The 3-Second Hook Rule', description: 'Meta judges your creative in the first 3 seconds', categories: ['meta-ads'], duration: '6 min' },
  'meta-70-20-10-rule': { title: 'The 70/20/10 Creative Rule', description: '70% proven, 20% iteration, 10% wild experiments', categories: ['meta-ads'], duration: '8 min' },
  'meta-ga4-integration': { title: 'The GA4 Signal Hack', description: 'Feed Meta high-quality signals via GA4', categories: ['meta-ads'], duration: '9 min' },
  'meta-1-1-x-structure': { title: 'The 1-1-X Structure', description: '1 campaign, 1 ad set, X creatives', categories: ['meta-ads'], duration: '7 min' },
  // Meta Ads 2026 lessons (Performance)
  'meta-auction-formula': { title: 'The Meta Auction Formula', description: 'Total Value = Bid × EAR × Quality', categories: ['meta-ads'], duration: '10 min' },
  'meta-controls-vs-suggestions': { title: 'Controls vs Suggestions', description: 'Hard boundaries vs soft signals in targeting', categories: ['meta-ads'], duration: '6 min' },
  'meta-creative-ecosystem': { title: 'The Creative Ecosystem', description: 'Build 20-50 meaningfully different ads', categories: ['meta-ads'], duration: '9 min' },
  'meta-capi-pixel-setup': { title: 'CAPI + Pixel Setup', description: 'Dual tracking is now mandatory', categories: ['meta-ads'], duration: '8 min' },
  // Additional missing lessons
  'product-reviews-test': { title: 'Product Reviews Test', description: 'Do reviews actually increase conversions?', categories: ['business'], duration: '5 min' },
  'ascension-ladder': { title: 'The Ascension Ladder', description: 'Move customers up the value chain', categories: ['business'], duration: '8 min' },
  'brain-friendly-ux': { title: 'Brain-Friendly UX', description: 'Design for how the brain actually works', categories: ['psychology', 'business'], duration: '7 min' },
  'brand-moat': { title: 'The Brand Moat', description: 'Build defensible competitive advantages', categories: ['branding', 'business'], duration: '9 min' },
  'brand-promise-code': { title: 'The Brand Promise Code', description: 'Craft promises that convert', categories: ['branding', 'copywriting'], duration: '7 min' },
  'checkout-line-effect': { title: 'The Checkout Line Effect', description: 'Last-minute impulse psychology', categories: ['psychology', 'business'], duration: '6 min' },
  'compound-testing-effect': { title: 'The Compound Testing Effect', description: 'How small wins stack into massive gains', categories: ['business'], duration: '7 min' },
  'emotional-gap': { title: 'The Emotional Gap', description: 'Bridge the gap between desire and action', categories: ['psychology'], duration: '6 min' },
  'emotional-problem': { title: 'The Emotional Problem', description: 'Find the real problem behind the problem', categories: ['psychology'], duration: '7 min' },
  'five-value-heuristics': { title: 'The 5 Value Heuristics', description: 'Mental shortcuts for perceived value', categories: ['psychology'], duration: '8 min' },
  'ice-prioritization': { title: 'ICE Prioritization', description: 'Impact, Confidence, Ease framework', categories: ['business'], duration: '5 min' },
  'identity-shift-effect': { title: 'The Identity Shift Effect', description: 'When buying becomes becoming', categories: ['psychology', 'branding'], duration: '7 min' },
  'le-creuset-scarcity-engine': { title: 'The Le Creuset Scarcity Engine', description: 'Limited colors create collectors', categories: ['branding'], duration: '8 min' },
  'local-holiday-legitimacy': { title: 'Local Holiday Legitimacy', description: 'Cultural moments that drive sales', categories: ['business'], duration: '6 min' },
  'logo-is-worthless': { title: 'Your Logo Is Worthless', description: 'Brand equity isn\'t in the symbol', categories: ['branding'], duration: '7 min' },
  'micro-yes-engine': { title: 'The Micro-Yes Engine', description: 'Build momentum through tiny commitments', categories: ['psychology'], duration: '8 min' },
  'missing-piece-effect': { title: 'The Missing Piece Effect', description: 'Incomplete sets drive completion urge', categories: ['psychology'], duration: '6 min' },
  'nine-trust-levers': { title: 'The 9 Trust Levers', description: 'Every element that builds credibility', categories: ['psychology'], duration: '9 min' },
  'ninety-seven-percent-leak': { title: 'The 97% Leak', description: 'Most visitors leave without buying', categories: ['business'], duration: '7 min' },
  'offer-is-everything': { title: 'The Offer Is Everything', description: 'Your offer matters more than your copy', categories: ['copywriting', 'business'], duration: '8 min' },
  'owned-audience-effect': { title: 'The Owned Audience Effect', description: 'Build assets you control', categories: ['business'], duration: '7 min' },
  'pain-dream-bridge': { title: 'The Pain-Dream Bridge', description: 'Connect current pain to desired future', categories: ['copywriting'], duration: '6 min' },
  'performance-engine': { title: 'The Performance Engine', description: 'Systems that scale profitably', categories: ['business'], duration: '9 min' },
  'poppy-disruptor-blueprint': { title: 'The Poppy Disruptor Blueprint', description: 'Break category conventions', categories: ['branding'], duration: '8 min' },
  'post-purchase-momentum': { title: 'Post-Purchase Momentum', description: 'Turn buyers into repeat customers', categories: ['business'], duration: '7 min' },
  'premium-flywheel': { title: 'The Premium Flywheel', description: 'Compound premium positioning', categories: ['branding'], duration: '9 min' },
  'price-creates-value': { title: 'Price Creates Value', description: 'Higher prices increase perception', categories: ['psychology', 'branding'], duration: '6 min' },
  'psychological-moat': { title: 'The Psychological Moat', description: 'Mental barriers that protect your brand', categories: ['psychology', 'branding'], duration: '8 min' },
  'self-selection-principle': { title: 'The Self-Selection Principle', description: 'Let customers qualify themselves', categories: ['psychology'], duration: '7 min' },
  'sell-the-identity': { title: 'Sell the Identity', description: 'Products are identity purchases', categories: ['branding'], duration: '6 min' },
  'shape-psychology': { title: 'Shape Psychology', description: 'How shapes affect perception', categories: ['psychology'], duration: '5 min' },
  'smallest-viable-market': { title: 'The Smallest Viable Market', description: 'Dominate a niche before expanding', categories: ['business'], duration: '8 min' },
  'sms-open-rate-secret': { title: 'The SMS Open Rate Secret', description: 'Why SMS beats email for engagement', categories: ['business'], duration: '5 min' },
  'story-changes-taste': { title: 'Story Changes Taste', description: 'Narrative literally alters perception', categories: ['psychology', 'branding'], duration: '7 min' },
  'thirty-five-thousand-decisions': { title: '35,000 Decisions', description: 'Reduce decision fatigue to convert', categories: ['psychology'], duration: '6 min' },
  'whale-customer-paradox': { title: 'The Whale Customer Paradox', description: 'Your best customers behave differently', categories: ['business'], duration: '8 min' },
  // Google Ads 2026 lessons
  'google-highest-cpa-wins': { title: 'Why The Highest CPA Wins', description: 'The counterintuitive truth about Google Ads dominance', categories: ['google-ads'], duration: '9 min' },
  'google-product-feed-mastery': { title: 'Your Product Feed IS Your Ad', description: 'The hidden weapon for Shopping & PMax success', categories: ['google-ads'], duration: '11 min' },
  'google-pmax-blueprint': { title: 'The PMax Asset Group Blueprint', description: 'Stop forcing Google AI to guess', categories: ['google-ads'], duration: '10 min' },
  'google-data-quality-edge': { title: 'Better Data In, Better AI Out', description: 'The quality edge that wins in 2026', categories: ['google-ads'], duration: '8 min' },
  'google-competitor-conquest': { title: 'Competitor Conquest', description: 'Steal market share legally with Google Ads', categories: ['google-ads'], duration: '9 min' },
  // Google Shopping Blueprint lessons
  'google-shopping-intent': { title: 'Active Intent: Why Google Shopping Wins', description: 'Capture users who are actively searching to buy', categories: ['google-ads'], duration: '7 min' },
  'google-store-trust-checklist': { title: 'Earn Google\'s Trust First', description: 'The store readiness checklist to avoid suspension', categories: ['google-ads'], duration: '8 min' },
  'google-hero-product-funnel': { title: 'Find Your Hero Products', description: 'From clicks to winners - buying data not profit', categories: ['google-ads'], duration: '10 min' },
  'google-click-fraud-shield': { title: 'Shield Your Budget from Click Fraud', description: 'Protect your data from bots and competitors', categories: ['google-ads'], duration: '7 min' },
  'google-ai-max-decision': { title: 'AI Max: Power vs Control', description: 'The decision framework for Google\'s AI automation', categories: ['google-ads'], duration: '9 min' },
  // Google Growth Engine lessons
  'google-negative-keyword-colander': { title: 'The Negative Keyword Colander', description: 'Filter out waste - only profitable clicks get through', categories: ['google-ads'], duration: '8 min' },
  'google-optimization-cadence': { title: 'The Optimization Rhythm', description: 'Stop random tinkering - follow a disciplined cadence', categories: ['google-ads'], duration: '7 min' },
  'google-ad-assets-arsenal': { title: 'Free Real Estate: Ad Assets', description: 'Make your ads bigger and more clickable - for free', categories: ['google-ads'], duration: '6 min' },
  'google-landing-page-bridge': { title: 'The Click is Only Half the Battle', description: 'What happens AFTER the click determines success', categories: ['google-ads'], duration: '8 min' },
  'google-ai-overviews-opportunity': { title: 'Ads in AI Overviews', description: 'Capture users in Google\'s new AI-powered search results', categories: ['google-ads'], duration: '7 min' },
  // Google Ads Advanced lessons
  'google-brand-moat': { title: 'Brand is the Ultimate Moat', description: 'The barrier competitors can\'t copy with a bigger budget', categories: ['google-ads', 'branding'], duration: '8 min' },
  'google-budget-reallocation': { title: 'Feed Your Winners', description: 'How to go from 2.8x to 5.1x ROAS by reallocating budget', categories: ['google-ads'], duration: '9 min' },
  'google-focus-firepower': { title: 'Focus Your Firepower', description: 'Stop spreading thin - consolidate budget on bestsellers', categories: ['google-ads'], duration: '7 min' },
  'google-influencer-creative': { title: 'Outsource Your Creative Genius', description: 'The scaling hack: hire influencers for ad content', categories: ['google-ads'], duration: '8 min' },
  // Business Fundamentals lessons
  'biz-infinite-money-engine': { title: 'The Infinite Money Engine', description: 'The single equation that transforms eCommerce into a video game with unlimited money', categories: ['business'], duration: '15 min' },
  'biz-rat-brain-hijack': { title: 'The Rat Brain Hijack', description: 'How to command attention by triggering the subconscious mind', categories: ['business', 'psychology'], duration: '9 min' },
  'biz-velocity-advantage': { title: 'The Velocity Advantage', description: 'Why speed is the biggest unfair advantage in business', categories: ['business'], duration: '8 min' },
  'biz-remarkable-product': { title: 'Build Something Remarkable', description: 'Why good enough products fight the laws of the matrix forever', categories: ['business'], duration: '10 min' },
  'biz-asset-not-job': { title: 'Build an Asset, Not a Job', description: 'The $3 million difference between earning income and building wealth', categories: ['business'], duration: '11 min' },
  // Business Leverage Playbook lessons
  'biz-leverage-equation': { title: 'The Leverage Equation', description: 'Stop working harder. Start working smarter with the equation that changes everything.', categories: ['business'], duration: '10 min' },
  'biz-counter-position': { title: 'The Counter-Position Strategy', description: 'Create a battlefield where the giants\' money is worthless.', categories: ['business'], duration: '9 min' },
  'biz-awareness-sweet-spot': { title: 'The Market Awareness Sweet Spot', description: 'Enter markets where customers feel the pain but don\'t know the solution exists.', categories: ['business'], duration: '8 min' },
  'biz-barbell-strategy': { title: 'The Barbell Strategy', description: '5% big swings. 95% small wins. Avoid the dangerous middle.', categories: ['business'], duration: '7 min' },
  'biz-one-pager-blueprint': { title: 'The One-Pager Blueprint', description: 'Kill shiny object syndrome with the 4 questions that become your North Star.', categories: ['business'], duration: '6 min' },
  // E-commerce Cheat Code Business lessons
  'biz-infinite-money-loop': { title: 'The Infinite Money Loop', description: 'The 6-step flywheel that turns paid advertising into infinite profit', categories: ['business'], duration: '12 min' },
  'biz-marketing-company': { title: "You're Not a Brand", description: 'The identity shift that separates winners from wannabes', categories: ['business', 'branding'], duration: '8 min' },
  'biz-product-expansion': { title: 'The Ridge Playbook', description: 'How Ridge solved their LTV problem with product expansion', categories: ['business'], duration: '9 min' },
  'biz-zero-cac-engine': { title: 'The $0 CAC Engine', description: 'Get customers for free before you ever spend on ads', categories: ['business'], duration: '10 min' },
  'biz-creative-targeting': { title: 'Creative is the New Targeting', description: 'Volume + Diversity + Measurement: The system for winning', categories: ['business', 'meta-ads'], duration: '8 min' },
  // The Infinite Money Equation lessons
  'biz-3x-threshold': { title: 'The 3x Threshold', description: 'The single equation that separates struggling stores from money-printing machines', categories: ['business'], duration: '8 min' },
  'biz-asymmetric-monopoly': { title: 'The Asymmetric Monopoly', description: 'How a 1400:1 ratio creates a legal monopoly nobody can compete with', categories: ['business'], duration: '10 min' },
  'biz-authenticity-anchor': { title: 'The Authenticity Anchor', description: 'How Nike stayed cool for 40 years while competitors chased trends and died', categories: ['business', 'branding'], duration: '9 min' },
  'biz-brand-ltv-engine': { title: 'The Brand LTV Engine', description: 'How Ralph Lauren, LEGO, and Le Creuset engineer endless reasons to return', categories: ['business', 'branding'], duration: '11 min' },
  'biz-brand-temple': { title: 'The Brand Temple Strategy', description: 'How Ralph Lauren, LEGO, and Le Creuset built billion-dollar empires through loyalty', categories: ['business', 'branding'], duration: '10 min' },
  'biz-cash-conversion': { title: 'The Negative Cash Conversion Cycle', description: 'How Davie Fogarty bootstrapped The Oodie to nearly $1B using customer money', categories: ['business'], duration: '12 min' },
  'biz-closer-framework': { title: 'The CLOSER Framework', description: 'Alex Hormozi\'s battle-tested 6-step sales system that converts without being pushy', categories: ['business', 'copywriting'], duration: '11 min' },
  'biz-courage-variable': { title: 'The Courage Variable', description: 'The hidden code behind every empire: 7,000 failures, £2 profit, and betting it all', categories: ['business'], duration: '9 min' },
  'biz-empathy-engine': { title: 'The Empathy Engine', description: 'The invisible difference between good service and service that creates lifelong customers', categories: ['business'], duration: '8 min' },
  'biz-four-pillars': { title: 'The Four Pillars Protocol', description: 'The complete framework to escape the wheel and build a business that prints money', categories: ['business'], duration: '14 min' },
  'biz-hamster-wheel': { title: 'The Hamster Wheel Trap', description: 'The Matrix-level prison keeping 99% of eCommerce stores broke—and how to escape', categories: ['business'], duration: '12 min' },
  'biz-infinite-flywheel': { title: 'The Infinite Money Flywheel', description: 'How $100 ad spend becomes a predictable, scalable money machine', categories: ['business'], duration: '10 min' },
  'biz-leaders-burden': { title: 'The Leader\'s Burden', description: 'If the system fails, the leader failed. The ultimate accountability framework', categories: ['business'], duration: '8 min' },
  'biz-lifetime-gross-profit': { title: 'Lifetime Gross Profit', description: 'The number everyone calculates wrong—and why it kills businesses', categories: ['business'], duration: '9 min' },
  'biz-logic-trap': { title: 'The Logic Trap', description: 'Why the smartest marketing decision can destroy your sales overnight', categories: ['business', 'psychology'], duration: '7 min' },
  'biz-ltv-cac-dashboard': { title: 'The Operator\'s Dashboard', description: 'The LTV:CAC ratios that separate struggling businesses from unstoppable ones', categories: ['business'], duration: '10 min' },
  'biz-ltv-levers': { title: 'The LTV Control Panel', description: '7 levers to increase customer lifetime value and maximize profitability', categories: ['business'], duration: '11 min' },
  'biz-model-vs-method': { title: 'Model vs Method', description: 'Why the best model beats the best tactics every single time', categories: ['business'], duration: '8 min' },
  'biz-objection-dance': { title: 'The Objection Dance', description: 'Handling objections is a dance, not a fight. 4 techniques that disarm resistance', categories: ['business', 'psychology'], duration: '9 min' },
  'biz-operator-mindset': { title: 'The Operator\'s Mindset', description: 'How Ben Francis built Gymshark to $1.5B by putting the model above his ego', categories: ['business'], duration: '10 min' },
  'biz-purchase-cycle-engine': { title: 'The Purchase Cycle Engineer', description: 'How Le Creuset turned a once-a-decade purchase into an annual buying event', categories: ['business'], duration: '9 min' },
  'biz-replication-protocol': { title: 'The Replication Protocol', description: 'Alex Hormozi\'s secret: Simple scales, fancy fails. Why systems beat talent', categories: ['business'], duration: '8 min' },
  'biz-rfm-secret': { title: 'The RFM Secret', description: 'How to identify your best customers and make more money from fewer people', categories: ['business'], duration: '9 min' },
  'biz-rule-of-100': { title: 'The Rule of 100', description: 'The volume strategy that separates dreamers from millionaires', categories: ['business'], duration: '7 min' },
  'biz-valley-protocol': { title: 'The Valley of Despair Protocol', description: 'Why 97% of entrepreneurs quit at the exact moment they should push harder', categories: ['business'], duration: '10 min' },
  // New LTV:CAC Playbook lessons
  'biz-high-margin-fortress': { title: 'The High Margin Fortress', description: 'Build a margin moat that competitors can\'t cross', categories: ['business'], duration: '9 min' },
  'biz-ridge-wallet-protocol': { title: 'The Ridge Wallet Protocol', description: 'How Ridge solved the one-product problem and unlocked infinite LTV', categories: ['business'], duration: '10 min' },
  'biz-20-domination': { title: 'The 20% Domination Rule', description: '20% of your customers generate 80% of your revenue', categories: ['business'], duration: '7 min' },
  'biz-channel-mix-formula': { title: 'The Channel Mix Formula', description: 'Master the optimal channel allocation for maximum ROI', categories: ['business'], duration: '8 min' },
  'biz-next-best-dollar': { title: 'The Next Best Dollar', description: 'Think like a capital allocator, not a channel manager', categories: ['business'], duration: '8 min' },
  // E-commerce Cheat Code PDF #2 lessons
  'biz-authenticity-engine': { title: 'The Authenticity Engine', description: 'The compounding force that makes your brand impossible to replicate', categories: ['business', 'branding'], duration: '9 min' },
  'biz-creator-army': { title: 'The Creator Army', description: 'Build 500+ micro-creators instead of hiring expensive agencies', categories: ['business'], duration: '10 min' },
  'biz-mission-driven-brand': { title: 'The Mission-Driven Brand', description: 'Why brands with a cause outperform everyone else', categories: ['business', 'branding'], duration: '8 min' },
  'biz-savage-mentality': { title: 'The Savage Mentality', description: 'The relentless execution mindset that separates winners from dreamers', categories: ['business'], duration: '9 min' },
  'biz-systems-architect': { title: 'The Systems Architect', description: 'The transition from player to systems architect that unlocks $10M+', categories: ['business'], duration: '11 min' },
  // Infinite Money Game PDF lessons
  'biz-90-percent-trap': { title: 'The 90% Trap', description: 'Why 90% of stores guess their way to failure—while 1% use math', categories: ['business'], duration: '8 min' },
  'biz-animal-mindset': { title: 'The Animal Mindset', description: 'How Davie Fogarty built a $500M empire through relentless action', categories: ['business'], duration: '10 min' },
  'biz-channel-cac-decoder': { title: 'Channel CAC Decoder', description: 'Why your blended CAC is lying to you', categories: ['business'], duration: '7 min' },
  'biz-6-to-1-problem': { title: 'The 6:1 Problem', description: 'Why your "amazing" LTV:CAC ratio might be killing growth', categories: ['business'], duration: '8 min' },
  'biz-survival-cycle': { title: 'The Survival Cycle', description: 'The doom loop that kills 97% of stores', categories: ['business'], duration: '9 min' },
  'biz-infinite-money-glitch': { title: 'The Infinite Money Glitch', description: 'The self-fueling growth flywheel', categories: ['business'], duration: '10 min' },
  'biz-price-anchoring': { title: 'Price Anchoring Power', description: 'Why your $47 offer looks irresistible next to $297', categories: ['business', 'psychology'], duration: '6 min' },
  'biz-look-back-window': { title: 'The Look-Back Window', description: 'Why your 30-day data is lying to you', categories: ['business'], duration: '7 min' },
};

// Lesson categories for filtering
export const lessonCategories = [
  { id: 'all', name: 'All Lessons', icon: 'BookOpen' },
  { id: 'copywriting', name: 'Copywriting', icon: 'PenTool' },
  { id: 'psychology', name: 'Psychology', icon: 'Brain' },
  { id: 'branding', name: 'Branding', icon: 'Palette' },
  { id: 'meta-ads', name: 'Meta Ads', icon: 'Target' },
  { id: 'google-ads', name: 'Google Ads', icon: 'Search' },
  { id: 'business', name: 'Business', icon: 'Briefcase' },
] as const;

// Get total lesson count
export const getTotalLessonsCount = () => Object.keys(lessonMeta).length;

// Get lessons by category
export const getLessonsByCategory = (category: string): [string, LessonMeta][] => {
  if (category === 'all') {
    return Object.entries(lessonMeta);
  }
  return Object.entries(lessonMeta).filter(([, meta]) =>
    meta.categories.includes(category as LessonCategory)
  );
};

// Get category counts
export const getLessonCategoryCounts = (): Record<string, number> => {
  const counts: Record<string, number> = { all: Object.keys(lessonMeta).length };

  lessonCategories.forEach((cat) => {
    if (cat.id !== 'all') {
      counts[cat.id] = Object.values(lessonMeta).filter(
        (meta) => meta.categories.includes(cat.id as LessonCategory)
      ).length;
    }
  });

  return counts;
};
