const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/src/data/articles.ts';
let content = fs.readFileSync(path, 'utf8');

const newArticles = `,
    {
      id: 174,
      thumbnail: '/images/lessons/reciprocity-engine.png',
      title: 'The 42% Sales Trick (That\\'s Not a Trick)',
      intro: 'Why giving away free samples increased sales 42%.',
      directUrl: '/learn/lessons/reciprocity-engine',
      specialFeatures: [
        { value: '5 min', label: 'Duration' },
        { value: 'Psychology', label: 'Focus' }
      ],
      content: \`## The Reciprocity Engine

A candy shop gave free samples. Sales went up 42%. But customers bought DIFFERENT candies—not the one they tasted. It wasn't about liking the sample. It was about discharging social debt.

**Open the interactive lesson to weaponize reciprocity.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/reciprocity-engine/lesson.html' }
      ]
    },
    {
      id: 175,
      thumbnail: '/images/lessons/gucci-short-termism.png',
      title: 'Why Gucci Is Dying (And What It Teaches You)',
      intro: 'Fashion chases trends. Luxury chases timelessness.',
      directUrl: '/learn/lessons/gucci-short-termism',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Brand Strategy', label: 'Focus' }
      ],
      content: \`## Why Gucci Is Dying

Gucci's sales tripled with trendy products. Then they overexposed everything. Products went from exclusive to ubiquitous. Stock tumbled. Meanwhile, Hermès thrives with ruthless scarcity.

**Open the interactive lesson to learn from Gucci's mistake.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/gucci-short-termism/lesson.html' }
      ]
    },
    {
      id: 176,
      thumbnail: '/images/lessons/ethical-persuasion-compass.png',
      title: 'The Magic Show Test: Influence vs Manipulation',
      intro: 'The ethical line between persuasion and manipulation.',
      directUrl: '/learn/lessons/ethical-persuasion-compass',
      specialFeatures: [
        { value: '5 min', label: 'Duration' },
        { value: 'Ethics', label: 'Focus' }
      ],
      content: \`## The Magic Show Test

Frame branding as a magic show. Is the audience in on the joke, willingly suspending disbelief? That's entertainment. Are you convincing them the magic is real? That's manipulation.

**Open the interactive lesson to find the ethical line.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/ethical-persuasion-compass/lesson.html' }
      ]
    },
    {
      id: 177,
      thumbnail: '/images/lessons/two-worlds-mastery.png',
      title: 'The Two Worlds Every DTC Founder Must Master',
      intro: 'Performance marketing vs brand building—you need both.',
      directUrl: '/learn/lessons/two-worlds-mastery',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Strategy', label: 'Focus' }
      ],
      content: \`## The Two Worlds

Direct response wins battles. Brand building wins wars. Master one without the other and you'll either burn out or fade away. The legends do both.

**Open the interactive lesson to master both worlds.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/two-worlds-mastery/lesson.html' }
      ]
    },
    {
      id: 178,
      thumbnail: '/images/lessons/race-to-bottom-escape.png',
      title: 'Why Your ROAS Is Killing Your Business',
      intro: 'You\\'re winning every battle and losing the war.',
      directUrl: '/learn/lessons/race-to-bottom-escape',
      specialFeatures: [
        { value: '7 min', label: 'Duration' },
        { value: 'Performance', label: 'Focus' }
      ],
      content: \`## The Three Death Spirals

Rising costs. Commoditization. Zero loyalty. When you play only the direct response game, you enter three simultaneous races to the bottom.

**Open the interactive lesson to escape the death spiral.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/race-to-bottom-escape/lesson.html' }
      ]
    },
    {
      id: 179,
      thumbnail: '/images/lessons/founder-operating-system.png',
      title: 'The 4 Traits of Legendary Brand Founders',
      intro: 'What separates iconic founders from the rest.',
      directUrl: '/learn/lessons/founder-operating-system',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Leadership', label: 'Focus' }
      ],
      content: \`## The Founder Operating System

Legendary founders share 4 traits: consumer-grade intuition, creative direction, calculated risk-taking, and vision without delusion. Which do you have?

**Open the interactive lesson to develop founder DNA.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/founder-operating-system/lesson.html' }
      ]
    },
    {
      id: 180,
      thumbnail: '/images/lessons/13800-percent-effect.png',
      title: 'Why 10% Better = 13,800% Better',
      intro: 'Small improvements compound into massive advantages.',
      directUrl: '/learn/lessons/13800-percent-effect',
      specialFeatures: [
        { value: '5 min', label: 'Duration' },
        { value: 'Growth', label: 'Focus' }
      ],
      content: \`## The 13,800% Effect

Be 10% better at 50 things. 1.1^50 = 117x better overall. That's not incremental improvement—that's category domination through compounding marginal gains.

**Open the interactive lesson to unlock compound advantages.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/13800-percent-effect/lesson.html' }
      ]
    },
    {
      id: 181,
      thumbnail: '/images/lessons/dior-pricing-secret.png',
      title: 'The $57 Bag That Sells for $3,500',
      intro: 'What Dior and Rolex know about pricing that you don\\'t.',
      directUrl: '/learn/lessons/dior-pricing-secret',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Pricing', label: 'Focus' }
      ],
      content: \`## The Dior Pricing Secret

A canvas tote costs $57 to make. Dior sells it for $3,500. That's not a markup—that's a masterclass in selling status, not products.

**Open the interactive lesson to learn premium pricing.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/dior-pricing-secret/lesson.html' }
      ]
    },
    {
      id: 182,
      thumbnail: '/images/lessons/consumption-conversion.png',
      title: 'Why Your Product Page Isn\\'t Converting',
      intro: 'The gap between consumption and conversion.',
      directUrl: '/learn/lessons/consumption-conversion',
      specialFeatures: [
        { value: '5 min', label: 'Duration' },
        { value: 'Conversion', label: 'Focus' }
      ],
      content: \`## The Consumption Gap

People consume your content but don't convert. Why? Because consumption is passive. Conversion requires active transformation. Bridge the gap.

**Open the interactive lesson to close the conversion gap.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/consumption-conversion/lesson.html' }
      ]
    },
    {
      id: 183,
      thumbnail: '/images/lessons/luxury-mindset-shift.png',
      title: 'The 4 Mindset Shifts That Create Premium Brands',
      intro: 'Transform your thinking from commodity to luxury.',
      directUrl: '/learn/lessons/luxury-mindset-shift',
      specialFeatures: [
        { value: '7 min', label: 'Duration' },
        { value: 'Brand Building', label: 'Focus' }
      ],
      content: \`## The Luxury Mindset

Premium brands think differently. From product-first to customer-first. From features to feelings. From transactions to relationships. From selling to serving.

**Open the interactive lesson to adopt the luxury mindset.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/luxury-mindset-shift/lesson.html' }
      ]
    }`;

// Find the array end and insert before it
const arrayEnd = content.lastIndexOf('  ];');
if (arrayEnd > 0) {
  const before = content.substring(0, arrayEnd);
  const after = content.substring(arrayEnd);
  content = before + newArticles + '\n' + after;
  fs.writeFileSync(path, content);
  console.log('Successfully added 10 new lessons (IDs 174-183)');
} else {
  console.log('Could not find array end');
}
