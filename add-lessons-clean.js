const fs = require('fs');
const path = 'C:/Projects/Quantum-Scale/genrok-app/src/data/articles.ts';
let content = fs.readFileSync(path, 'utf8');

const newArticles = `
    {
      id: 161,
      thumbnail: '/images/lessons/hero-mechanism.png',
      title: 'The $$4,225 Question',
      intro: 'Why Oura Ring costs $$399 vs $$12 knockoff.',
      directUrl: '/learn/lessons/hero-mechanism',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Brand Psychology', label: 'Focus' }
      ],
      content: \`## The Hero Mechanism

Why does Oura Ring sell for $$399 while Alibaba has the same features for $$12? The answer is the Hero Mechanism - a unique, believable reason WHY your product works.

**Open the interactive lesson to discover the $$4,225 difference.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/hero-mechanism/lesson.html' }
      ]
    },
    {
      id: 162,
      thumbnail: '/images/lessons/scammer-playbook-good.png',
      title: "The Scammer's Playbook (Used for Good)",
      intro: '7 ethical persuasion levers.',
      directUrl: '/learn/lessons/scammer-playbook-good',
      specialFeatures: [
        { value: '7 min', label: 'Duration' },
        { value: 'Persuasion', label: 'Focus' }
      ],
      content: \`## The Scammer's Playbook

Con artists use 7 psychological levers to manipulate. But these same levers can be used ETHICALLY to help people make decisions they'll thank you for.

**Open the interactive lesson to master ethical persuasion.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/scammer-playbook-good/lesson.html' }
      ]
    },
    {
      id: 163,
      thumbnail: '/images/lessons/us-vs-them.png',
      title: 'The David vs Goliath Play',
      intro: 'Create tribal identity through enemies.',
      directUrl: '/learn/lessons/us-vs-them',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Positioning', label: 'Focus' }
      ],
      content: \`## The David vs Goliath Play

Apple vs IBM. Harley vs Japanese bikes. Great brands position against an ENEMY to create tribal identity.

**Open the interactive lesson to find your Goliath.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/us-vs-them/lesson.html' }
      ]
    },
    {
      id: 164,
      thumbnail: '/images/lessons/brand-universe.png',
      title: 'Build a World, Not Just a Store',
      intro: 'Create universes, not products.',
      directUrl: '/learn/lessons/brand-universe',
      specialFeatures: [
        { value: '7 min', label: 'Duration' },
        { value: 'Brand Building', label: 'Focus' }
      ],
      content: \`## Build a World, Not Just a Store

Patagonia is an environmental movement. Apple is creative rebellion. Nike is athletic excellence. Great brands create UNIVERSES, not just products.

**Open the interactive lesson to build your brand universe.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/brand-universe/lesson.html' }
      ]
    },
    {
      id: 165,
      thumbnail: '/images/lessons/product-to-identity.png',
      title: 'From Product to Identity Purchase',
      intro: 'Transform commodities to identity.',
      directUrl: '/learn/lessons/product-to-identity',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Psychology', label: 'Focus' }
      ],
      content: \`## From Product to Identity Purchase

Rolex is not a watch - it is I have made it. Tesla is not a car - it is I am the future. Transform what you sell from a COMMODITY to an IDENTITY purchase.

**Open the interactive lesson to reframe your product.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/product-to-identity/lesson.html' }
      ]
    },
    {
      id: 166,
      thumbnail: '/images/lessons/commodity-escape.png',
      title: 'The Commodity Trap',
      intro: 'How Starbucks charges $$6 for $$0.50 coffee.',
      directUrl: '/learn/lessons/commodity-escape',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Pricing', label: 'Focus' }
      ],
      content: \`## The Commodity Trap

Starbucks sells coffee that costs them $$0.50 for $$6. They escaped the commodity trap where price is the only differentiator. You can too.

**Open the interactive lesson to escape the commodity trap.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/commodity-escape/lesson.html' }
      ]
    },
    {
      id: 167,
      thumbnail: '/images/lessons/myth-and-urgency.png',
      title: 'Weaving Myth and Manufacturing Urgency',
      intro: 'Create irresistible desire through scarcity plus story.',
      directUrl: '/learn/lessons/myth-and-urgency',
      specialFeatures: [
        { value: '7 min', label: 'Duration' },
        { value: 'Luxury Marketing', label: 'Focus' }
      ],
      content: \`## Weaving Myth and Manufacturing Urgency

Hermes creates mythology around Birkin bags. Rolex weaves origin stories. Limited editions become sacred objects. Scarcity plus Story equals irresistible desire.

**Open the interactive lesson to weave your myth.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/myth-and-urgency/lesson.html' }
      ]
    },
    {
      id: 168,
      thumbnail: '/images/lessons/value-ladder.png',
      title: 'The Value Ladder and Hidden Menu',
      intro: 'Secret tiers that create aspiration.',
      directUrl: '/learn/lessons/value-ladder',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Revenue', label: 'Focus' }
      ],
      content: \`## The Value Ladder and Hidden Menu

High-end restaurants have secret menus for VIPs. Your store should too. Build a value ladder from entry to elite where each tier unlocks the next.

**Open the interactive lesson to build your value ladder.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/value-ladder/lesson.html' }
      ]
    },
    {
      id: 169,
      thumbnail: '/images/lessons/box-worth-300.png',
      title: 'The $$300 Empty Box',
      intro: 'Tiffany packaging IS the product.',
      directUrl: '/learn/lessons/box-worth-300',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Packaging', label: 'Focus' }
      ],
      content: \`## The $$300 Empty Box

Tiffany iconic blue box is worth money EMPTY. People pay for the box. Apple unboxing is a ritual. Your packaging IS the product experience.

**Open the interactive lesson to transform your packaging.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/box-worth-300/lesson.html' }
      ]
    },
    {
      id: 170,
      thumbnail: '/images/lessons/story-taste-experiment.png',
      title: 'Your Story Changes How Products TASTE',
      intro: 'Story literally alters perception.',
      directUrl: '/learn/lessons/story-taste-experiment',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Psychology', label: 'Focus' }
      ],
      content: \`## Your Story Changes How Products TASTE

Stanford wine experiment: Same wine, different stories equals different taste ratings. The story you tell LITERALLY changes how the product is experienced.

**Open the interactive lesson to craft your story.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/story-taste-experiment/lesson.html' }
      ]
    },
    {
      id: 171,
      thumbnail: '/images/lessons/scarcity-calendar.png',
      title: 'Le Creuset Scarcity Engine',
      intro: 'One color per year creates collectors.',
      directUrl: '/learn/lessons/scarcity-calendar',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Scarcity', label: 'Focus' }
      ],
      content: \`## Le Creuset Scarcity Engine

Le Creuset releases ONE new color per year. Creates collector mentality, artificial scarcity, calendar-driven demand. Missed colors sell at premium.

**Open the interactive lesson to build your scarcity engine.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/scarcity-calendar/lesson.html' }
      ]
    },
    {
      id: 172,
      thumbnail: '/images/lessons/anchor-moments.png',
      title: 'Ralph Lauren Anchor Moments',
      intro: '$$20K bag makes $$200 polo feel cheap.',
      directUrl: '/learn/lessons/anchor-moments',
      specialFeatures: [
        { value: '6 min', label: 'Duration' },
        { value: 'Pricing Psychology', label: 'Focus' }
      ],
      content: \`## Ralph Lauren Anchor Moments

Ralph Lauren displays a $$20,000 handbag. Nobody buys it. But suddenly the $$200 polo feels like a STEAL. The anchor is not meant to sell.

**Open the interactive lesson to create anchor moments.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/anchor-moments/lesson.html' }
      ]
    },
    {
      id: 173,
      thumbnail: '/images/lessons/irrational-loyalty.png',
      title: 'The Pizza Test and Sock Test',
      intro: 'Once identity forms, logic dies.',
      directUrl: '/learn/lessons/irrational-loyalty',
      specialFeatures: [
        { value: '7 min', label: 'Duration' },
        { value: 'Loyalty', label: 'Focus' }
      ],
      content: \`## The Pizza Test and Sock Test

People defend their favorite pizza shop even if it is objectively worse. Same with socks - I am a Bombas person. Once identity forms, they will defend you against logic.

**Open the interactive lesson to create irrational loyalty.**\`,
      buttons: [
        { text: 'Open Interactive Lesson', url: '/lessons/irrational-loyalty/lesson.html' }
      ]
    }`;

// Replace $$ with $ (we use $$ to avoid regex replacement issues)
const cleanArticles = newArticles.replace(/\$\$/g, '$');

// Find the array end and insert before it
const arrayEndIndex = content.lastIndexOf('  ];');
if (arrayEndIndex > 0) {
  const before = content.substring(0, arrayEndIndex);
  const after = content.substring(arrayEndIndex);
  content = before + ',' + cleanArticles + '\n' + after;
  fs.writeFileSync(path, content);
  console.log('Successfully added 13 new lessons (IDs 161-173)');
} else {
  console.log('Could not find array end');
}
