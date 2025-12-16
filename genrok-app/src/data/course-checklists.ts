// Default checklists generated from course modules
// These can be overridden via the admin interface

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
}

export interface CourseChecklist {
  courseSlug: string;
  items: ChecklistItem[];
}

// Generate a unique ID for checklist items
const generateId = (slug: string, index: number) => `${slug}-item-${index}`;

export const defaultChecklists: Record<string, ChecklistItem[]> = {
  'subconscious-trap': [
    // Preparation
    {
      id: generateId('subconscious-trap', 1),
      title: 'Install Shrine Theme on your store',
      description: 'Get it here: https://shrinesolutions.com/?ref=0d9fe741',
    },
    {
      id: generateId('subconscious-trap', 2),
      title: 'Delete all default texts via Edit default theme content',
      description: 'Clean slate for your store copy',
    },
    {
      id: generateId('subconscious-trap', 3),
      title: 'Install Post-Purchase Survey',
      description: 'Know exactly what drives your audience. Get it: https://apps.shopify.com/grapevine?mref=lsbqcbva',
    },
    {
      id: generateId('subconscious-trap', 4),
      title: 'Connect external analytics for accurate tracking (free)',
      description: 'Track sales and creatives precisely: https://triplewhale.com/',
    },
    {
      id: generateId('subconscious-trap', 5),
      title: 'Install free sections app (used throughout the course)',
      description: 'Get it here: https://apps.shopify.com/section-factory?mref=lsbqcbva',
    },
    // Colors and Fonts
    {
      id: generateId('subconscious-trap', 6),
      title: 'Choose a color palette from the course tables',
      description: 'Select based on the emotion you want to convey',
    },
    {
      id: generateId('subconscious-trap', 7),
      title: 'Set background color, primary color, and action color',
      description: 'Apply your chosen palette to the theme settings',
    },
    {
      id: generateId('subconscious-trap', 8),
      title: 'Choose and apply a font set from the course',
      description: 'Apply it consistently across the entire site',
    },
    // Hero Section
    {
      id: generateId('subconscious-trap', 9),
      title: 'Choose Hero image that conveys emotion (not product)',
      description: 'Use Freepik, Lummi, AI tools, or ChatGPT to find the right image',
    },
    {
      id: generateId('subconscious-trap', 10),
      title: 'Edit Hero image in Canva with text overlay',
      description: 'Add compelling headline text to your hero image',
    },
    {
      id: generateId('subconscious-trap', 11),
      title: 'Add Hero #1 Section and disable Parallax',
      description: 'Using Section Factory: https://apps.shopify.com/section-factory?mref=lsbqcbva',
    },
    // Homepage
    {
      id: generateId('subconscious-trap', 12),
      title: 'Add slider for 2 main collections (Slider #7 Section)',
      description: 'E.g., Men/Women, Indoor/Outdoor. Settings per course instructions',
    },
    {
      id: generateId('subconscious-trap', 13),
      title: 'Add Hero for popular/new collection (Hero #11 Section)',
      description: 'Highlight your best-selling or newest collection',
    },
    {
      id: generateId('subconscious-trap', 14),
      title: 'Add Best Sellers Slider with real products only',
      description: 'Only include actual best-selling products',
    },
    {
      id: generateId('subconscious-trap', 15),
      title: 'Add Featured Collection #18 Section',
      description: 'Showcase a featured collection prominently',
    },
    {
      id: generateId('subconscious-trap', 16),
      title: 'Add UGC area using Product Videos Section',
      description: 'Display user-generated content videos',
    },
    // Announcement Bar - The Heavy Gun
    {
      id: generateId('subconscious-trap', 17),
      title: 'Add geo-location based Announcement Bar',
      description: '60-70% avg increase in conversions! Get it: https://geo-convert.com/',
    },
    {
      id: generateId('subconscious-trap', 18),
      title: 'Set up different coupon codes by wealth groups',
      description: 'Recommended discount range: 5-15%',
    },
    {
      id: generateId('subconscious-trap', 19),
      title: 'Create the coupon codes in Shopify admin',
      description: 'Match codes from geo-targeting app in your Shopify discounts',
    },
    {
      id: generateId('subconscious-trap', 20),
      title: 'Add Square banner to homepage with background image',
      description: 'Place it relatively low on the homepage',
    },
    // Footer
    {
      id: generateId('subconscious-trap', 21),
      title: 'Build Footer menus via Shopify Menus',
      description: 'Create organized navigation for your footer',
    },
    {
      id: generateId('subconscious-trap', 22),
      title: 'Add Footer using Footer #7 Section',
      description: 'Professional footer design from Section Factory',
    },
    // Collection Page
    {
      id: generateId('subconscious-trap', 23),
      title: 'Unify all product images to one visual style',
      description: 'Consistency is key for professional appearance',
    },
    {
      id: generateId('subconscious-trap', 24),
      title: 'Remove backgrounds from images if needed',
      description: 'All or nothing - be consistent. Use: https://www.photoroom.com/',
    },
    {
      id: generateId('subconscious-trap', 25),
      title: 'Ensure all images have same angle, lighting and style',
      description: 'Visual consistency across entire catalog',
    },
    // Product Page
    {
      id: generateId('subconscious-trap', 26),
      title: 'Add product reviews app',
      description: 'Build social proof: https://loox.io/app/LASERCRO',
    },
    {
      id: generateId('subconscious-trap', 27),
      title: 'Add Low Stock Alert',
      description: 'Create urgency with stock notifications',
    },
    {
      id: generateId('subconscious-trap', 28),
      title: 'Remove Buy Now button',
      description: 'Simplify the purchase flow',
    },
    {
      id: generateId('subconscious-trap', 29),
      title: 'Add Wishlist button above Add to Cart',
      description: 'Get it: https://vitals.app/shopify/12548540',
    },
    {
      id: generateId('subconscious-trap', 30),
      title: 'Add UGC videos below Add to Cart button',
      description: 'Using Section Factory Product Videos section',
    },
    {
      id: generateId('subconscious-trap', 31),
      title: 'Convert description to Tabs (Product Tabs #5 Pro)',
      description: 'Organize product info into clean tabs',
    },
    {
      id: generateId('subconscious-trap', 32),
      title: 'Add Product Features section (Product Features #19)',
      description: 'Highlight key product features visually',
    },
    {
      id: generateId('subconscious-trap', 33),
      title: 'Add Featured Collection section (#18)',
      description: 'Cross-sell related products',
    },
    {
      id: generateId('subconscious-trap', 34),
      title: 'Add 4-6 top recommended collections (Collections #5)',
      description: 'Help customers discover more products',
    },
    {
      id: generateId('subconscious-trap', 35),
      title: 'Add Full Product Reviews section',
      description: 'Display all reviews: https://loox.io/app/LASERCRO',
    },
    // Checkout
    {
      id: generateId('subconscious-trap', 36),
      title: 'Upload minimal logo to Checkout',
      description: 'Must have transparent background!',
    },
    // Optimization
    {
      id: generateId('subconscious-trap', 37),
      title: 'Install A/B Testing system',
      description: 'Get it: https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel',
    },
    {
      id: generateId('subconscious-trap', 38),
      title: 'Run A/B tests: one element at a time',
      description: 'Let each test run for several days (thousands of sessions). Go with winner, then test next element.',
    },
  ],

  'ltv-system': [
    {
      id: generateId('ltv-system', 1),
      title: 'Understand the LTV Engine Blueprint',
      description: 'Learn the psychological and technical system',
    },
    {
      id: generateId('ltv-system', 2),
      title: 'Map your current customer journey',
      description: 'Identify gaps in retention',
    },
    {
      id: generateId('ltv-system', 3),
      title: 'Study the Laws of Human Persuasion',
      description: 'Master attention and craving triggers',
    },
    {
      id: generateId('ltv-system', 4),
      title: 'Build first automation loop',
      description: 'Create self-sustaining customer system',
    },
    {
      id: generateId('ltv-system', 5),
      title: 'Set up email flow automations',
      description: 'Configure 24/7 revenue generation',
    },
    {
      id: generateId('ltv-system', 6),
      title: 'Create loyalty system structure',
      description: 'Build customer loyalty program',
    },
    {
      id: generateId('ltv-system', 7),
      title: 'Implement Rebuy Technology System',
      description: 'Trigger automatic repeat purchases',
    },
    {
      id: generateId('ltv-system', 8),
      title: 'Design product upsell sequences',
      description: 'Maximize cart value automatically',
    },
    {
      id: generateId('ltv-system', 9),
      title: 'Configure post-purchase automation',
      description: 'Set up follow-up sequences',
    },
    {
      id: generateId('ltv-system', 10),
      title: 'Apply Empire Growth Formula',
      description: 'Scale using psychology and automation',
    },
    {
      id: generateId('ltv-system', 11),
      title: 'Calculate customer LTV metrics',
      description: 'Track progress toward $1,000 per customer',
    },
    {
      id: generateId('ltv-system', 12),
      title: 'Optimize email timing and frequency',
      description: 'Maximize open and click rates',
    },
    {
      id: generateId('ltv-system', 13),
      title: 'Test SMS sequence integration',
      description: 'Add SMS to automation mix',
    },
    {
      id: generateId('ltv-system', 14),
      title: 'Review and refine after 30 days',
      description: 'Analyze initial results',
    },
    {
      id: generateId('ltv-system', 15),
      title: 'Scale winning automations',
      description: 'Double down on best performers',
    },
  ],

  'email-marketing': [
    {
      id: generateId('email-marketing', 1),
      title: 'Set up advanced BI configuration',
      description: 'Configure per-customer optimization',
    },
    {
      id: generateId('email-marketing', 2),
      title: 'Configure send time optimization',
      description: 'Send when customers convert most',
    },
    {
      id: generateId('email-marketing', 3),
      title: 'Set up frequency controls',
      description: 'Optimize email cadence',
    },
    {
      id: generateId('email-marketing', 4),
      title: 'Build customer segments',
      description: 'Create behavioral segments',
    },
    {
      id: generateId('email-marketing', 5),
      title: 'Implement AI-powered personalization',
      description: 'Set up automated personalization',
    },
    {
      id: generateId('email-marketing', 6),
      title: 'Create predictive automation flows',
      description: 'Build AI-driven sequences',
    },
    {
      id: generateId('email-marketing', 7),
      title: 'Write precision-engineered email copy',
      description: 'Apply psychological triggers',
    },
    {
      id: generateId('email-marketing', 8),
      title: 'Design email templates',
      description: 'Create high-converting designs',
    },
    {
      id: generateId('email-marketing', 9),
      title: 'Set up welcome sequence',
      description: 'Configure new subscriber flow',
    },
    {
      id: generateId('email-marketing', 10),
      title: 'Build browse abandonment flow',
      description: 'Recover interested visitors',
    },
    {
      id: generateId('email-marketing', 11),
      title: 'Create win-back campaign',
      description: 'Re-engage inactive customers',
    },
    {
      id: generateId('email-marketing', 12),
      title: 'Test subject lines',
      description: 'A/B test for higher opens',
    },
    {
      id: generateId('email-marketing', 13),
      title: 'Optimize preview text',
      description: 'Improve inbox appearance',
    },
    {
      id: generateId('email-marketing', 14),
      title: 'Monitor deliverability',
      description: 'Track inbox placement',
    },
    {
      id: generateId('email-marketing', 15),
      title: 'Analyze revenue attribution',
      description: 'Measure email ROI',
    },
  ],

  'abandoned-checkout': [
    {
      id: generateId('abandoned-checkout', 1),
      title: 'Calculate current abandonment rate',
      description: 'Understand your baseline',
    },
    {
      id: generateId('abandoned-checkout', 2),
      title: 'Set up email tracking',
      description: 'Configure abandonment detection',
    },
    {
      id: generateId('abandoned-checkout', 3),
      title: 'Import Email 1 template',
      description: 'Deploy first recovery email',
    },
    {
      id: generateId('abandoned-checkout', 4),
      title: 'Configure Email 1 timing (1 hour)',
      description: 'Set optimal send time',
    },
    {
      id: generateId('abandoned-checkout', 5),
      title: 'Import Email 2 template',
      description: 'Deploy second recovery email',
    },
    {
      id: generateId('abandoned-checkout', 6),
      title: 'Configure Email 2 timing (24 hours)',
      description: 'Set second email timing',
    },
    {
      id: generateId('abandoned-checkout', 7),
      title: 'Import Email 3 template',
      description: 'Deploy third recovery email',
    },
    {
      id: generateId('abandoned-checkout', 8),
      title: 'Import Email 4 template',
      description: 'Deploy fourth recovery email',
    },
    {
      id: generateId('abandoned-checkout', 9),
      title: 'Import Email 5 template',
      description: 'Deploy fifth recovery email',
    },
    {
      id: generateId('abandoned-checkout', 10),
      title: 'Import Email 6 template',
      description: 'Deploy sixth recovery email',
    },
    {
      id: generateId('abandoned-checkout', 11),
      title: 'Import Email 7 template',
      description: 'Deploy seventh recovery email',
    },
    {
      id: generateId('abandoned-checkout', 12),
      title: 'Customize email branding',
      description: 'Add your logo and colors',
    },
    {
      id: generateId('abandoned-checkout', 13),
      title: 'Test full sequence',
      description: 'Verify all emails send correctly',
    },
    {
      id: generateId('abandoned-checkout', 14),
      title: 'Monitor recovery rate',
      description: 'Track recovered revenue',
    },
    {
      id: generateId('abandoned-checkout', 15),
      title: 'Optimize based on results',
      description: 'Improve underperforming emails',
    },
  ],

  'the-social-proof': [
    {
      id: generateId('the-social-proof', 1),
      title: 'Learn hidden laws of human psychology',
      description: 'Understand purchase triggers',
    },
    {
      id: generateId('the-social-proof', 2),
      title: 'Audit current social proof elements',
      description: 'Find gaps in your strategy',
    },
    {
      id: generateId('the-social-proof', 3),
      title: 'Build Social Perception Engine',
      description: 'Control brain perception',
    },
    {
      id: generateId('the-social-proof', 4),
      title: 'Create social proof framework',
      description: 'Build irresistible proof system',
    },
    {
      id: generateId('the-social-proof', 5),
      title: 'Implement Subconscious Conversion Machine',
      description: 'Transform doubt into belief',
    },
    {
      id: generateId('the-social-proof', 6),
      title: 'Apply emotional triggers',
      description: 'Bypass logical resistance',
    },
    {
      id: generateId('the-social-proof', 7),
      title: 'Master Psychology of Certainty',
      description: 'Shape customer perception',
    },
    {
      id: generateId('the-social-proof', 8),
      title: 'Position brand as leader',
      description: 'Establish authority',
    },
    {
      id: generateId('the-social-proof', 9),
      title: 'Apply Dark Proof Protocol',
      description: 'Program customer beliefs',
    },
    {
      id: generateId('the-social-proof', 10),
      title: 'Collect customer testimonials',
      description: 'Gather powerful proof',
    },
    {
      id: generateId('the-social-proof', 11),
      title: 'Create UGC system',
      description: 'Generate user content',
    },
    {
      id: generateId('the-social-proof', 12),
      title: 'Add proof to ads',
      description: 'Engineer proof into creatives',
    },
    {
      id: generateId('the-social-proof', 13),
      title: 'Add proof to product pages',
      description: 'Optimize page social proof',
    },
    {
      id: generateId('the-social-proof', 14),
      title: 'Test ROAS improvement',
      description: 'Measure ad performance lift',
    },
    {
      id: generateId('the-social-proof', 15),
      title: 'Scale winning proof tactics',
      description: 'Expand what works',
    },
  ],

  'product-mapping': [
    {
      id: generateId('product-mapping', 1),
      title: 'Learn Law of Multiple Options',
      description: 'Understand choice psychology',
    },
    {
      id: generateId('product-mapping', 2),
      title: 'Audit current product organization',
      description: 'Map existing structure',
    },
    {
      id: generateId('product-mapping', 3),
      title: 'Apply Billion-Dollar Mapping System',
      description: 'Implement elite framework',
    },
    {
      id: generateId('product-mapping', 4),
      title: 'Create product ecosystems',
      description: 'Guide toward higher purchases',
    },
    {
      id: generateId('product-mapping', 5),
      title: 'Build Strategic Product Mapping Framework',
      description: 'Analyze and organize products',
    },
    {
      id: generateId('product-mapping', 6),
      title: 'Maximize perceived value',
      description: 'Optimize product presentation',
    },
    {
      id: generateId('product-mapping', 7),
      title: 'Implement Anchor Product Effect',
      description: 'Use anchoring psychology',
    },
    {
      id: generateId('product-mapping', 8),
      title: 'Position core offerings strategically',
      description: 'Make deals feel incredible',
    },
    {
      id: generateId('product-mapping', 9),
      title: 'Build Hidden Funnel Strategy',
      description: 'Create invisible conversion paths',
    },
    {
      id: generateId('product-mapping', 10),
      title: 'Automate product recommendations',
      description: 'Set up smart suggestions',
    },
    {
      id: generateId('product-mapping', 11),
      title: 'Test product placement changes',
      description: 'Measure AOV impact',
    },
    {
      id: generateId('product-mapping', 12),
      title: 'Optimize collection pages',
      description: 'Improve browse experience',
    },
    {
      id: generateId('product-mapping', 13),
      title: 'Refine cross-sell strategy',
      description: 'Increase basket size',
    },
    {
      id: generateId('product-mapping', 14),
      title: 'Track AOV metrics',
      description: 'Measure improvement',
    },
    {
      id: generateId('product-mapping', 15),
      title: 'Scale winning configurations',
      description: 'Expand successful layouts',
    },
  ],

  'quiz-tactic': [
    {
      id: generateId('quiz-tactic', 1),
      title: 'Learn Psychology Framework',
      description: 'Understand quiz conversion power',
    },
    {
      id: generateId('quiz-tactic', 2),
      title: 'Choose quiz platform',
      description: 'Select best tool for your store',
    },
    {
      id: generateId('quiz-tactic', 3),
      title: 'Study Quiz Architecture Blueprint',
      description: 'Learn proven question structure',
    },
    {
      id: generateId('quiz-tactic', 4),
      title: 'Design quiz questions',
      description: 'Create engaging questions',
    },
    {
      id: generateId('quiz-tactic', 5),
      title: 'Build Personalization Engine',
      description: 'Create tailored recommendations',
    },
    {
      id: generateId('quiz-tactic', 6),
      title: 'Set up result pages',
      description: 'Design personalized results',
    },
    {
      id: generateId('quiz-tactic', 7),
      title: 'Customize Implementation Templates',
      description: 'Adapt for your niche',
    },
    {
      id: generateId('quiz-tactic', 8),
      title: 'Connect quiz to products',
      description: 'Map results to offerings',
    },
    {
      id: generateId('quiz-tactic', 9),
      title: 'Implement Data Collection Strategy',
      description: 'Capture valuable customer data',
    },
    {
      id: generateId('quiz-tactic', 10),
      title: 'Set up email capture',
      description: 'Build list from quiz',
    },
    {
      id: generateId('quiz-tactic', 11),
      title: 'Apply Conversion Optimization Secrets',
      description: 'Optimize every detail',
    },
    {
      id: generateId('quiz-tactic', 12),
      title: 'Test quiz flow',
      description: 'Verify user experience',
    },
    {
      id: generateId('quiz-tactic', 13),
      title: 'Launch quiz to traffic',
      description: 'Go live with quiz',
    },
    {
      id: generateId('quiz-tactic', 14),
      title: 'Monitor conversion rate',
      description: 'Track quiz performance',
    },
    {
      id: generateId('quiz-tactic', 15),
      title: 'Optimize based on data',
      description: 'Improve weak points',
    },
  ],

  'laser-targeting': [
    {
      id: generateId('laser-targeting', 1),
      title: 'Learn 0.001% Targeting Method',
      description: 'Identify perfect buyers',
    },
    {
      id: generateId('laser-targeting', 2),
      title: 'Audit current targeting setup',
      description: 'Review existing audiences',
    },
    {
      id: generateId('laser-targeting', 3),
      title: 'Implement Meta AI Injection System',
      description: 'Train algorithm for you',
    },
    {
      id: generateId('laser-targeting', 4),
      title: 'Configure data inputs',
      description: 'Feed AI optimal signals',
    },
    {
      id: generateId('laser-targeting', 5),
      title: 'Build Multi-Angle Attack Strategy',
      description: 'Target from multiple angles',
    },
    {
      id: generateId('laser-targeting', 6),
      title: 'Combine AI for lower costs',
      description: 'Optimize traffic costs',
    },
    {
      id: generateId('laser-targeting', 7),
      title: 'Apply Avatar Mapping Protocol',
      description: 'Target subconscious desires',
    },
    {
      id: generateId('laser-targeting', 8),
      title: 'Create buyer personas',
      description: 'Define ideal customers',
    },
    {
      id: generateId('laser-targeting', 9),
      title: 'Build Remarketing Mastery sequences',
      description: 'Create compulsion-based retargeting',
    },
    {
      id: generateId('laser-targeting', 10),
      title: 'Set up remarketing audiences',
      description: 'Configure pixel events',
    },
    {
      id: generateId('laser-targeting', 11),
      title: 'Implement Bloodhound System',
      description: 'Automate customer hunting',
    },
    {
      id: generateId('laser-targeting', 12),
      title: 'Launch test campaigns',
      description: 'Test new targeting',
    },
    {
      id: generateId('laser-targeting', 13),
      title: 'Monitor ROAS metrics',
      description: 'Track targeting performance',
    },
    {
      id: generateId('laser-targeting', 14),
      title: 'Scale winning audiences',
      description: 'Increase budget on winners',
    },
    {
      id: generateId('laser-targeting', 15),
      title: 'Optimize underperformers',
      description: 'Fix or pause losers',
    },
  ],

  'ai-photographer': [
    {
      id: generateId('ai-photographer', 1),
      title: 'Set up AI photography tools',
      description: 'Configure free AI tools',
    },
    {
      id: generateId('ai-photographer', 2),
      title: 'Learn AI Photography Fundamentals',
      description: 'Master core concepts',
    },
    {
      id: generateId('ai-photographer', 3),
      title: 'Practice prompt writing',
      description: 'Learn to write effective prompts',
    },
    {
      id: generateId('ai-photographer', 4),
      title: 'Study Product Photography Mastery',
      description: 'Generate stunning product shots',
    },
    {
      id: generateId('ai-photographer', 5),
      title: 'Create first product images',
      description: 'Generate initial photos',
    },
    {
      id: generateId('ai-photographer', 6),
      title: 'Learn lighting techniques',
      description: 'Master AI lighting',
    },
    {
      id: generateId('ai-photographer', 7),
      title: 'Build Model & Lifestyle Shots',
      description: 'Create model images',
    },
    {
      id: generateId('ai-photographer', 8),
      title: 'Generate lifestyle scenes',
      description: 'Create contextual photos',
    },
    {
      id: generateId('ai-photographer', 9),
      title: 'Apply Brand Consistency System',
      description: 'Create consistent imagery',
    },
    {
      id: generateId('ai-photographer', 10),
      title: 'Build style guide',
      description: 'Document your visual style',
    },
    {
      id: generateId('ai-photographer', 11),
      title: 'Create prompt templates',
      description: 'Save successful prompts',
    },
    {
      id: generateId('ai-photographer', 12),
      title: 'Generate full product catalog',
      description: 'Create all product images',
    },
    {
      id: generateId('ai-photographer', 13),
      title: 'Update store with new images',
      description: 'Replace old photos',
    },
    {
      id: generateId('ai-photographer', 14),
      title: 'Create ad creative variations',
      description: 'Generate ad images',
    },
    {
      id: generateId('ai-photographer', 15),
      title: 'A/B test AI vs old images',
      description: 'Measure conversion impact',
    },
  ],

  'meta-ad-templates': [
    {
      id: generateId('meta-ad-templates', 1),
      title: 'Access template library',
      description: 'Open Canva templates',
    },
    {
      id: generateId('meta-ad-templates', 2),
      title: 'Browse template categories',
      description: 'Explore available styles',
    },
    {
      id: generateId('meta-ad-templates', 3),
      title: 'Select templates for your niche',
      description: 'Choose relevant designs',
    },
    {
      id: generateId('meta-ad-templates', 4),
      title: 'Set up Canva account',
      description: 'Prepare free Canva account',
    },
    {
      id: generateId('meta-ad-templates', 5),
      title: 'Customize first template',
      description: 'Add your brand elements',
    },
    {
      id: generateId('meta-ad-templates', 6),
      title: 'Add your logo',
      description: 'Brand the templates',
    },
    {
      id: generateId('meta-ad-templates', 7),
      title: 'Update color scheme',
      description: 'Match your brand colors',
    },
    {
      id: generateId('meta-ad-templates', 8),
      title: 'Replace placeholder images',
      description: 'Add your product photos',
    },
    {
      id: generateId('meta-ad-templates', 9),
      title: 'Write compelling copy',
      description: 'Add your messaging',
    },
    {
      id: generateId('meta-ad-templates', 10),
      title: 'Export in multiple sizes',
      description: 'Create feed, story versions',
    },
    {
      id: generateId('meta-ad-templates', 11),
      title: 'Create 5+ ad variations',
      description: 'Build testing set',
    },
    {
      id: generateId('meta-ad-templates', 12),
      title: 'Launch test campaigns',
      description: 'Deploy new creatives',
    },
    {
      id: generateId('meta-ad-templates', 13),
      title: 'Monitor ad performance',
      description: 'Track CTR and ROAS',
    },
    {
      id: generateId('meta-ad-templates', 14),
      title: 'Identify winning templates',
      description: 'Find best performers',
    },
    {
      id: generateId('meta-ad-templates', 15),
      title: 'Scale winning creatives',
      description: 'Increase budget on winners',
    },
  ],

  'ad-copy-templates': [
    {
      id: generateId('ad-copy-templates', 1),
      title: 'Access copy template library',
      description: 'Open all 50+ templates',
    },
    {
      id: generateId('ad-copy-templates', 2),
      title: 'Study Headline Formulas',
      description: 'Learn scroll-stopping headlines',
    },
    {
      id: generateId('ad-copy-templates', 3),
      title: 'Practice headline writing',
      description: 'Create variations for your product',
    },
    {
      id: generateId('ad-copy-templates', 4),
      title: 'Master Hook Structures',
      description: 'Learn attention-grabbing openers',
    },
    {
      id: generateId('ad-copy-templates', 5),
      title: 'Write 5+ hook variations',
      description: 'Create testing options',
    },
    {
      id: generateId('ad-copy-templates', 6),
      title: 'Apply Story Frameworks',
      description: 'Build emotional connection',
    },
    {
      id: generateId('ad-copy-templates', 7),
      title: 'Create story-based ad',
      description: 'Write narrative copy',
    },
    {
      id: generateId('ad-copy-templates', 8),
      title: 'Use CTA Templates',
      description: 'Write compelling CTAs',
    },
    {
      id: generateId('ad-copy-templates', 9),
      title: 'Test different CTA styles',
      description: 'Find what converts',
    },
    {
      id: generateId('ad-copy-templates', 10),
      title: 'Write primary ad copy',
      description: 'Create main ad text',
    },
    {
      id: generateId('ad-copy-templates', 11),
      title: 'Create short-form variations',
      description: 'Write story/reel copy',
    },
    {
      id: generateId('ad-copy-templates', 12),
      title: 'Launch copy test campaigns',
      description: 'A/B test different copy',
    },
    {
      id: generateId('ad-copy-templates', 13),
      title: 'Analyze copy performance',
      description: 'Track CTR by copy version',
    },
    {
      id: generateId('ad-copy-templates', 14),
      title: 'Optimize winning copy',
      description: 'Refine best performers',
    },
    {
      id: generateId('ad-copy-templates', 15),
      title: 'Document winning formulas',
      description: 'Save what works for you',
    },
  ],

  'meta-headlines': [
    {
      id: generateId('meta-headlines', 1),
      title: 'Access headline library',
      description: 'Open all 85 headlines',
    },
    {
      id: generateId('meta-headlines', 2),
      title: 'Study headline psychology',
      description: 'Understand why they work',
    },
    {
      id: generateId('meta-headlines', 3),
      title: 'Select headlines for your niche',
      description: 'Choose relevant templates',
    },
    {
      id: generateId('meta-headlines', 4),
      title: 'Customize first headline set',
      description: 'Adapt for your product',
    },
    {
      id: generateId('meta-headlines', 5),
      title: 'Study hook templates',
      description: 'Learn attention-grabbing hooks',
    },
    {
      id: generateId('meta-headlines', 6),
      title: 'Create custom hooks',
      description: 'Write your own variations',
    },
    {
      id: generateId('meta-headlines', 7),
      title: 'Combine headlines and hooks',
      description: 'Create full ad openers',
    },
    {
      id: generateId('meta-headlines', 8),
      title: 'Test on current ads',
      description: 'Update existing campaigns',
    },
    {
      id: generateId('meta-headlines', 9),
      title: 'Launch A/B tests',
      description: 'Test headline variations',
    },
    {
      id: generateId('meta-headlines', 10),
      title: 'Monitor CTR metrics',
      description: 'Track headline performance',
    },
    {
      id: generateId('meta-headlines', 11),
      title: 'Identify winning headlines',
      description: 'Find best performers',
    },
    {
      id: generateId('meta-headlines', 12),
      title: 'Scale winning headlines',
      description: 'Use across campaigns',
    },
    {
      id: generateId('meta-headlines', 13),
      title: 'Create headline swipe file',
      description: 'Save best performers',
    },
    {
      id: generateId('meta-headlines', 14),
      title: 'Test new variations monthly',
      description: 'Keep testing fresh ideas',
    },
    {
      id: generateId('meta-headlines', 15),
      title: 'Document top performers',
      description: 'Build personal formula library',
    },
  ],

  'offer-workshop': [
    {
      id: generateId('offer-workshop', 1),
      title: 'Learn Core Framework',
      description: 'Understand offer psychology',
    },
    {
      id: generateId('offer-workshop', 2),
      title: 'Audit current offer structure',
      description: 'Review existing offers',
    },
    {
      id: generateId('offer-workshop', 3),
      title: 'Identify offer weaknesses',
      description: 'Find improvement areas',
    },
    {
      id: generateId('offer-workshop', 4),
      title: 'Study Implementation Guide',
      description: 'Learn step-by-step process',
    },
    {
      id: generateId('offer-workshop', 5),
      title: 'Design main offer',
      description: 'Create irresistible core offer',
    },
    {
      id: generateId('offer-workshop', 6),
      title: 'Build value stack',
      description: 'Add compelling bonuses',
    },
    {
      id: generateId('offer-workshop', 7),
      title: 'Apply Advanced Strategies',
      description: 'Add elite offer tactics',
    },
    {
      id: generateId('offer-workshop', 8),
      title: 'Create urgency elements',
      description: 'Add scarcity triggers',
    },
    {
      id: generateId('offer-workshop', 9),
      title: 'Design guarantee',
      description: 'Remove purchase risk',
    },
    {
      id: generateId('offer-workshop', 10),
      title: 'Write offer copy',
      description: 'Communicate value clearly',
    },
    {
      id: generateId('offer-workshop', 11),
      title: 'Create offer page',
      description: 'Design landing page',
    },
    {
      id: generateId('offer-workshop', 12),
      title: 'Test new offer',
      description: 'Launch to small audience',
    },
    {
      id: generateId('offer-workshop', 13),
      title: 'Monitor conversion rate',
      description: 'Track offer performance',
    },
    {
      id: generateId('offer-workshop', 14),
      title: 'Gather customer feedback',
      description: 'Learn what resonates',
    },
    {
      id: generateId('offer-workshop', 15),
      title: 'Optimize and scale',
      description: 'Refine and expand',
    },
  ],

  '20-laws': [
    {
      id: generateId('20-laws', 1),
      title: 'Study Law 1: The Law of Authority',
      description: 'Establish expert positioning',
    },
    {
      id: generateId('20-laws', 2),
      title: 'Study Law 2: The Law of Scarcity',
      description: 'Create urgency effectively',
    },
    {
      id: generateId('20-laws', 3),
      title: 'Study Law 3: The Law of Social Proof',
      description: 'Leverage crowd psychology',
    },
    {
      id: generateId('20-laws', 4),
      title: 'Study Law 4: The Law of Reciprocity',
      description: 'Give value first',
    },
    {
      id: generateId('20-laws', 5),
      title: 'Study Law 5: The Law of Commitment',
      description: 'Get small yeses',
    },
    {
      id: generateId('20-laws', 6),
      title: 'Study Laws 6-10',
      description: 'Master middle section',
    },
    {
      id: generateId('20-laws', 7),
      title: 'Study Laws 11-15',
      description: 'Learn advanced principles',
    },
    { id: generateId('20-laws', 8), title: 'Study Laws 16-20', description: 'Complete the system' },
    {
      id: generateId('20-laws', 9),
      title: 'Audit current selling approach',
      description: 'Identify missing laws',
    },
    {
      id: generateId('20-laws', 10),
      title: 'Apply first 5 laws to store',
      description: 'Implement foundational laws',
    },
    {
      id: generateId('20-laws', 11),
      title: 'Apply laws 6-10 to marketing',
      description: 'Enhance messaging',
    },
    {
      id: generateId('20-laws', 12),
      title: 'Apply laws 11-20 to ads',
      description: 'Optimize ad psychology',
    },
    {
      id: generateId('20-laws', 13),
      title: 'Review and refine implementation',
      description: 'Check all touchpoints',
    },
    {
      id: generateId('20-laws', 14),
      title: 'Test law combinations',
      description: 'Stack multiple laws',
    },
    {
      id: generateId('20-laws', 15),
      title: 'Document winning combinations',
      description: 'Save what works best',
    },
  ],

  'ugly-ads': [
    {
      id: generateId('ugly-ads', 1),
      title: 'Learn Core Framework',
      description: 'Understand ugly ad psychology',
    },
    {
      id: generateId('ugly-ads', 2),
      title: 'Study why simple ads convert',
      description: 'Understand the science',
    },
    {
      id: generateId('ugly-ads', 3),
      title: 'Analyze ugly ad examples',
      description: 'See real winning ads',
    },
    {
      id: generateId('ugly-ads', 4),
      title: 'Study Implementation Guide',
      description: 'Learn step-by-step creation',
    },
    {
      id: generateId('ugly-ads', 5),
      title: 'Create first ugly ad',
      description: 'Make your first simple ad',
    },
    {
      id: generateId('ugly-ads', 6),
      title: 'Write authentic copy',
      description: 'Keep messaging real',
    },
    {
      id: generateId('ugly-ads', 7),
      title: 'Apply Advanced Strategies',
      description: 'Add elite ugly ad tactics',
    },
    {
      id: generateId('ugly-ads', 8),
      title: 'Create 5+ variations',
      description: 'Build testing set',
    },
    {
      id: generateId('ugly-ads', 9),
      title: 'Launch test campaign',
      description: 'Deploy ugly ads',
    },
    {
      id: generateId('ugly-ads', 10),
      title: 'Compare to polished ads',
      description: 'A/B test approaches',
    },
    {
      id: generateId('ugly-ads', 11),
      title: 'Monitor performance metrics',
      description: 'Track CTR and ROAS',
    },
    {
      id: generateId('ugly-ads', 12),
      title: 'Identify winning formats',
      description: 'Find best performers',
    },
    {
      id: generateId('ugly-ads', 13),
      title: 'Scale winning ugly ads',
      description: 'Increase budget on winners',
    },
    {
      id: generateId('ugly-ads', 14),
      title: 'Create more variations',
      description: 'Expand winning concepts',
    },
    {
      id: generateId('ugly-ads', 15),
      title: 'Document winning formula',
      description: 'Save your process',
    },
  ],
};

export const getDefaultChecklist = (courseSlug: string): ChecklistItem[] => {
  return defaultChecklists[courseSlug] || [];
};
