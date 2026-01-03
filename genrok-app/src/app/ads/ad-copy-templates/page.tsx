'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, ChevronDown, Sparkles, Target, Users, ShoppingCart, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Template {
  id: string;
  title: string;
  template: string;
  placeholders: string[];
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  templates: Template[];
}

// Helper to extract placeholders from template
const extractPlaceholders = (template: string): string[] => {
  const matches = template.match(/\[([^\]]+)\]/g) || [];
  return [...new Set(matches.map(m => m.slice(1, -1)))];
};

// All 50+ templates organized by category
const CATEGORIES: Category[] = [
  {
    id: 'attract-attention',
    title: 'Attract',
    subtitle: 'Drive Attention & Awareness',
    icon: <Sparkles size={20} />,
    color: '#FF6B6B',
    templates: [
      {
        id: 'attract-1',
        title: 'Problem Agitation',
        template: `Tired of [common frustration]?

You're not alone. [Statistic or relatable statement].

[Product Name] was designed to [key benefit] — so you can finally [desired outcome].

Try it risk-free today.`,
        placeholders: extractPlaceholders(`Tired of [common frustration]?

You're not alone. [Statistic or relatable statement].

[Product Name] was designed to [key benefit] — so you can finally [desired outcome].

Try it risk-free today.`)
      },
      {
        id: 'attract-2',
        title: 'Bold Claim Opener',
        template: `What if [bold, curiosity-driven claim]?

That's exactly what [Product Name] delivers.

[One-liner benefit]. [Second benefit]. [Third benefit].

See why [number]+ people made the switch.`,
        placeholders: extractPlaceholders(`What if [bold, curiosity-driven claim]?

That's exactly what [Product Name] delivers.

[One-liner benefit]. [Second benefit]. [Third benefit].

See why [number]+ people made the switch.`)
      },
      {
        id: 'attract-3',
        title: 'Story Hook',
        template: `I used to [relatable struggle].

Then I discovered [Product Name] — and everything changed.

Now I [positive transformation].

If you're dealing with [pain point], this is for you.`,
        placeholders: extractPlaceholders(`I used to [relatable struggle].

Then I discovered [Product Name] — and everything changed.

Now I [positive transformation].

If you're dealing with [pain point], this is for you.`)
      },
      {
        id: 'attract-4',
        title: 'Myth Buster',
        template: `Think [common misconception]? Think again.

[Product Name] proves that [truth statement].

[Key differentiator] + [Unexpected benefit].

Join [number]+ who've seen the difference.`,
        placeholders: extractPlaceholders(`Think [common misconception]? Think again.

[Product Name] proves that [truth statement].

[Key differentiator] + [Unexpected benefit].

Join [number]+ who've seen the difference.`)
      },
      {
        id: 'attract-5',
        title: 'Question Cascade',
        template: `Ever feel like [emotional pain point]?

Struggling with [specific challenge]?

Wishing you had [desired solution]?

Meet [Product Name] — your answer to [problem].`,
        placeholders: extractPlaceholders(`Ever feel like [emotional pain point]?

Struggling with [specific challenge]?

Wishing you had [desired solution]?

Meet [Product Name] — your answer to [problem].`)
      },
      {
        id: 'attract-6',
        title: 'Future Pacing',
        template: `Imagine waking up and [ideal morning scenario].

No more [pain point]. No more [frustration].

Just [desired feeling].

[Product Name] makes it possible. Start today.`,
        placeholders: extractPlaceholders(`Imagine waking up and [ideal morning scenario].

No more [pain point]. No more [frustration].

Just [desired feeling].

[Product Name] makes it possible. Start today.`)
      },
      {
        id: 'attract-7',
        title: 'Statistic Shock',
        template: `[Shocking statistic about problem].

Most people don't realize [insight].

[Product Name] was built to change that — giving you [key benefit] without [common drawback].

See how it works.`,
        placeholders: extractPlaceholders(`[Shocking statistic about problem].

Most people don't realize [insight].

[Product Name] was built to change that — giving you [key benefit] without [common drawback].

See how it works.`)
      },
      {
        id: 'attract-8',
        title: 'Before/After Snapshot',
        template: `Before [Product Name]: [negative before state].

After [Product Name]: [positive after state].

The difference? [Key feature or ingredient].

Ready to transform your [area of life]?`,
        placeholders: extractPlaceholders(`Before [Product Name]: [negative before state].

After [Product Name]: [positive after state].

The difference? [Key feature or ingredient].

Ready to transform your [area of life]?`)
      },
      {
        id: 'attract-9',
        title: 'Us vs. Them',
        template: `Most [product category] [common flaw].

[Product Name] is different.

We [key differentiator] so you get [benefit] — without [sacrifice].

Finally, a [product type] that actually works.`,
        placeholders: extractPlaceholders(`Most [product category] [common flaw].

[Product Name] is different.

We [key differentiator] so you get [benefit] — without [sacrifice].

Finally, a [product type] that actually works.`)
      },
      {
        id: 'attract-10',
        title: 'Pattern Interrupt',
        template: `Stop scrolling. This is for you.

If you've tried [common solution] and it didn't work — [Product Name] is your next move.

[Unique benefit]. [Social proof].

Tap to learn more.`,
        placeholders: extractPlaceholders(`Stop scrolling. This is for you.

If you've tried [common solution] and it didn't work — [Product Name] is your next move.

[Unique benefit]. [Social proof].

Tap to learn more.`)
      }
    ]
  },
  {
    id: 'attract-buyers',
    title: 'Attract',
    subtitle: 'Bring In New Buyers',
    icon: <Target size={20} />,
    color: '#4ECDC4',
    templates: [
      {
        id: 'buyers-1',
        title: 'First-Time Buyer Offer',
        template: `New here? Welcome.

Get [discount/offer] on your first order of [Product Name].

[Benefit 1]. [Benefit 2]. [Benefit 3].

Use code [CODE] at checkout. Limited time only.`,
        placeholders: extractPlaceholders(`New here? Welcome.

Get [discount/offer] on your first order of [Product Name].

[Benefit 1]. [Benefit 2]. [Benefit 3].

Use code [CODE] at checkout. Limited time only.`)
      },
      {
        id: 'buyers-2',
        title: 'Risk Reversal',
        template: `Not sure if [Product Name] is right for you?

Try it for [number] days. If you don't love it, we'll refund every penny.

No questions asked. No hassle.

Your [desired outcome] is just one click away.`,
        placeholders: extractPlaceholders(`Not sure if [Product Name] is right for you?

Try it for [number] days. If you don't love it, we'll refund every penny.

No questions asked. No hassle.

Your [desired outcome] is just one click away.`)
      },
      {
        id: 'buyers-3',
        title: 'Social Proof Stack',
        template: `[Number]+ happy customers can't be wrong.

"[Short testimonial quote]" — [Customer name]

[Product Name] delivers [core benefit] that you can feel from day one.

Join the movement.`,
        placeholders: extractPlaceholders(`[Number]+ happy customers can't be wrong.

"[Short testimonial quote]" — [Customer name]

[Product Name] delivers [core benefit] that you can feel from day one.

Join the movement.`)
      },
      {
        id: 'buyers-4',
        title: 'Scarcity + Urgency',
        template: `Only [number] left in stock.

[Product Name] is selling fast — and once it's gone, it's gone.

Don't miss your chance to [key benefit].

Order now before it's too late.`,
        placeholders: extractPlaceholders(`Only [number] left in stock.

[Product Name] is selling fast — and once it's gone, it's gone.

Don't miss your chance to [key benefit].

Order now before it's too late.`)
      },
      {
        id: 'buyers-5',
        title: 'Bundle Value',
        template: `Why buy one when you can get [bundle offer]?

For a limited time, get [Product Name] + [Bonus item] for just [price].

That's [value breakdown] — a no-brainer.

Shop the bundle now.`,
        placeholders: extractPlaceholders(`Why buy one when you can get [bundle offer]?

For a limited time, get [Product Name] + [Bonus item] for just [price].

That's [value breakdown] — a no-brainer.

Shop the bundle now.`)
      },
      {
        id: 'buyers-6',
        title: 'Comparison Contrast',
        template: `You could keep using [inferior alternative]...

Or you could upgrade to [Product Name] and finally get [desired result].

[Key differentiator]. [Benefit]. [Social proof].

Make the switch today.`,
        placeholders: extractPlaceholders(`You could keep using [inferior alternative]...

Or you could upgrade to [Product Name] and finally get [desired result].

[Key differentiator]. [Benefit]. [Social proof].

Make the switch today.`)
      },
      {
        id: 'buyers-7',
        title: 'Authority Endorsement',
        template: `Recommended by [authority figure/publication].

[Product Name] is trusted by [target audience] who demand [quality/standard].

[Key benefit]. [Secondary benefit].

See why the experts choose us.`,
        placeholders: extractPlaceholders(`Recommended by [authority figure/publication].

[Product Name] is trusted by [target audience] who demand [quality/standard].

[Key benefit]. [Secondary benefit].

See why the experts choose us.`)
      }
    ]
  },
  {
    id: 'nurture-educate',
    title: 'Nurture & Educate',
    subtitle: 'Build Trust & Knowledge',
    icon: <Users size={20} />,
    color: '#45B7D1',
    templates: [
      {
        id: 'nurture-1',
        title: 'Educational Hook',
        template: `Did you know [surprising fact about problem/industry]?

Most people don't — and it's costing them [consequence].

[Product Name] was created to [solution] so you can [benefit].

Learn more inside.`,
        placeholders: extractPlaceholders(`Did you know [surprising fact about problem/industry]?

Most people don't — and it's costing them [consequence].

[Product Name] was created to [solution] so you can [benefit].

Learn more inside.`)
      },
      {
        id: 'nurture-2',
        title: 'How It Works',
        template: `Here's how [Product Name] works:

Step 1: [First step]
Step 2: [Second step]
Step 3: [Third step]

Simple. Effective. Life-changing.

Try it for yourself.`,
        placeholders: extractPlaceholders(`Here's how [Product Name] works:

Step 1: [First step]
Step 2: [Second step]
Step 3: [Third step]

Simple. Effective. Life-changing.

Try it for yourself.`)
      },
      {
        id: 'nurture-3',
        title: 'Ingredient/Feature Spotlight',
        template: `The secret behind [Product Name]? [Key ingredient/feature].

[Ingredient/feature] is proven to [benefit] — and we use [unique aspect].

That's why our customers see [result] in just [timeframe].

Discover the difference.`,
        placeholders: extractPlaceholders(`The secret behind [Product Name]? [Key ingredient/feature].

[Ingredient/feature] is proven to [benefit] — and we use [unique aspect].

That's why our customers see [result] in just [timeframe].

Discover the difference.`)
      },
      {
        id: 'nurture-4',
        title: 'Common Mistakes',
        template: `[Number] mistakes people make when [relevant action]:

1. [Mistake 1]
2. [Mistake 2]
3. [Mistake 3]

[Product Name] helps you avoid all of them — and get [desired result] faster.`,
        placeholders: extractPlaceholders(`[Number] mistakes people make when [relevant action]:

1. [Mistake 1]
2. [Mistake 2]
3. [Mistake 3]

[Product Name] helps you avoid all of them — and get [desired result] faster.`)
      },
      {
        id: 'nurture-5',
        title: 'FAQ Style',
        template: `"Does [Product Name] really work?"

Yes — and here's why:

[Reason 1]. [Reason 2]. [Reason 3].

Plus, we back it with a [guarantee].

Still have questions? We've got answers.`,
        placeholders: extractPlaceholders(`"Does [Product Name] really work?"

Yes — and here's why:

[Reason 1]. [Reason 2]. [Reason 3].

Plus, we back it with a [guarantee].

Still have questions? We've got answers.`)
      },
      {
        id: 'nurture-6',
        title: 'Behind the Brand',
        template: `We started [Brand Name] because [founder story/mission].

Every [Product Name] is made with [quality commitment].

Our mission? To help you [customer-centric goal].

Join [number]+ who trust us.`,
        placeholders: extractPlaceholders(`We started [Brand Name] because [founder story/mission].

Every [Product Name] is made with [quality commitment].

Our mission? To help you [customer-centric goal].

Join [number]+ who trust us.`)
      },
      {
        id: 'nurture-7',
        title: 'Tip/Hack Format',
        template: `Pro tip: [Actionable advice related to product use].

Most people don't know this — but it can [benefit].

[Product Name] makes it even easier by [feature].

Try it and see the difference.`,
        placeholders: extractPlaceholders(`Pro tip: [Actionable advice related to product use].

Most people don't know this — but it can [benefit].

[Product Name] makes it even easier by [feature].

Try it and see the difference.`)
      },
      {
        id: 'nurture-8',
        title: 'Testimonial Deep Dive',
        template: `"[Detailed customer quote about their experience]."

— [Customer name], [location/title]

[Product Name] helped [customer] go from [before state] to [after state].

Your transformation starts here.`,
        placeholders: extractPlaceholders(`"[Detailed customer quote about their experience]."

— [Customer name], [location/title]

[Product Name] helped [customer] go from [before state] to [after state].

Your transformation starts here.`)
      },
      {
        id: 'nurture-9',
        title: 'Myth vs. Fact',
        template: `MYTH: [Common misconception].

FACT: [Truth about product/industry].

[Product Name] is proof — delivering [benefit] without [drawback].

Don't believe the myths. Believe the results.`,
        placeholders: extractPlaceholders(`MYTH: [Common misconception].

FACT: [Truth about product/industry].

[Product Name] is proof — delivering [benefit] without [drawback].

Don't believe the myths. Believe the results.`)
      },
      {
        id: 'nurture-10',
        title: 'Value Justification',
        template: `Yes, [Product Name] costs [price].

But here's what you're really getting:

[Value point 1]
[Value point 2]
[Value point 3]

That's [total value] for a fraction of the cost.`,
        placeholders: extractPlaceholders(`Yes, [Product Name] costs [price].

But here's what you're really getting:

[Value point 1]
[Value point 2]
[Value point 3]

That's [total value] for a fraction of the cost.`)
      }
    ]
  },
  {
    id: 'convert',
    title: 'Convert',
    subtitle: 'With Confidence',
    icon: <ShoppingCart size={20} />,
    color: '#96CEB4',
    templates: [
      {
        id: 'convert-1',
        title: 'Direct CTA',
        template: `Ready to [desired outcome]?

[Product Name] is waiting for you.

[Benefit 1]. [Benefit 2]. [Benefit 3].

Click below and start your journey today.`,
        placeholders: extractPlaceholders(`Ready to [desired outcome]?

[Product Name] is waiting for you.

[Benefit 1]. [Benefit 2]. [Benefit 3].

Click below and start your journey today.`)
      },
      {
        id: 'convert-2',
        title: 'Last Chance',
        template: `This is your last chance.

[Offer] ends [deadline].

Don't miss out on [Product Name] — the [key benefit] you've been waiting for.

Act now or regret later.`,
        placeholders: extractPlaceholders(`This is your last chance.

[Offer] ends [deadline].

Don't miss out on [Product Name] — the [key benefit] you've been waiting for.

Act now or regret later.`)
      },
      {
        id: 'convert-3',
        title: 'Objection Handler',
        template: `"I'm not sure if [Product Name] is for me."

We get it. That's why we offer [guarantee/trial].

Try it for [timeframe]. If it's not for you, [refund policy].

Zero risk. All reward.`,
        placeholders: extractPlaceholders(`"I'm not sure if [Product Name] is for me."

We get it. That's why we offer [guarantee/trial].

Try it for [timeframe]. If it's not for you, [refund policy].

Zero risk. All reward.`)
      },
      {
        id: 'convert-4',
        title: 'FOMO Trigger',
        template: `[Number] people are viewing [Product Name] right now.

[Number] bought it in the last [timeframe].

Will you be next?

Don't let [desired outcome] slip away.`,
        placeholders: extractPlaceholders(`[Number] people are viewing [Product Name] right now.

[Number] bought it in the last [timeframe].

Will you be next?

Don't let [desired outcome] slip away.`)
      },
      {
        id: 'convert-5',
        title: 'Summary Close',
        template: `Let's recap what you're getting with [Product Name]:

✓ [Benefit 1]
✓ [Benefit 2]
✓ [Benefit 3]
✓ [Bonus/Guarantee]

All for just [price]. Ready to claim yours?`,
        placeholders: extractPlaceholders(`Let's recap what you're getting with [Product Name]:

✓ [Benefit 1]
✓ [Benefit 2]
✓ [Benefit 3]
✓ [Bonus/Guarantee]

All for just [price]. Ready to claim yours?`)
      },
      {
        id: 'convert-6',
        title: 'Reminder Retarget',
        template: `Still thinking about [Product Name]?

Here's a reminder of why [number]+ people already made the choice:

[Key benefit]. [Social proof]. [Guarantee].

Your [desired outcome] is one click away.`,
        placeholders: extractPlaceholders(`Still thinking about [Product Name]?

Here's a reminder of why [number]+ people already made the choice:

[Key benefit]. [Social proof]. [Guarantee].

Your [desired outcome] is one click away.`)
      },
      {
        id: 'convert-7',
        title: 'Exclusive Access',
        template: `This offer is exclusive to [audience segment].

Get [discount/bonus] on [Product Name] — available only through this link.

[Benefit]. [Urgency element].

Claim your exclusive deal now.`,
        placeholders: extractPlaceholders(`This offer is exclusive to [audience segment].

Get [discount/bonus] on [Product Name] — available only through this link.

[Benefit]. [Urgency element].

Claim your exclusive deal now.`)
      },
      {
        id: 'convert-8',
        title: 'Final Nudge',
        template: `You're so close.

[Product Name] is in your cart — waiting to [deliver benefit].

Complete your order now and get [bonus/benefit].

Don't let this opportunity pass you by.`,
        placeholders: extractPlaceholders(`You're so close.

[Product Name] is in your cart — waiting to [deliver benefit].

Complete your order now and get [bonus/benefit].

Don't let this opportunity pass you by.`)
      },
      {
        id: 'convert-9',
        title: 'Social Proof Closer',
        template: `Join [number]+ customers who chose [Product Name].

"[Short testimonial]" — [Customer]

Your [desired outcome] is waiting.

Order now and see why everyone's talking about us.`,
        placeholders: extractPlaceholders(`Join [number]+ customers who chose [Product Name].

"[Short testimonial]" — [Customer]

Your [desired outcome] is waiting.

Order now and see why everyone's talking about us.`)
      },
      {
        id: 'convert-10',
        title: 'Problem-Solution Close',
        template: `The problem: [Pain point].

The solution: [Product Name].

The result: [Desired outcome].

It's that simple. Get yours today.`,
        placeholders: extractPlaceholders(`The problem: [Pain point].

The solution: [Product Name].

The result: [Desired outcome].

It's that simple. Get yours today.`)
      }
    ]
  },
  {
    id: 'evergreen',
    title: 'Evergreen',
    subtitle: 'Brand Ads',
    icon: <Heart size={20} />,
    color: '#DDA0DD',
    templates: [
      {
        id: 'evergreen-1',
        title: 'Brand Mission',
        template: `At [Brand Name], we believe [core belief].

That's why we created [Product Name] — to help you [mission-driven benefit].

[Quality commitment]. [Social impact].

Join us in [movement/cause].`,
        placeholders: extractPlaceholders(`At [Brand Name], we believe [core belief].

That's why we created [Product Name] — to help you [mission-driven benefit].

[Quality commitment]. [Social impact].

Join us in [movement/cause].`)
      },
      {
        id: 'evergreen-2',
        title: 'Lifestyle Aspiration',
        template: `[Product Name] isn't just a [product category].

It's a lifestyle.

[Aspirational statement]. [Emotional benefit].

Live the life you deserve.`,
        placeholders: extractPlaceholders(`[Product Name] isn't just a [product category].

It's a lifestyle.

[Aspirational statement]. [Emotional benefit].

Live the life you deserve.`)
      },
      {
        id: 'evergreen-3',
        title: 'Quality Promise',
        template: `We don't cut corners.

Every [Product Name] is [quality process].

[Material/ingredient quality]. [Testing/certification].

Because you deserve the best.`,
        placeholders: extractPlaceholders(`We don't cut corners.

Every [Product Name] is [quality process].

[Material/ingredient quality]. [Testing/certification].

Because you deserve the best.`)
      },
      {
        id: 'evergreen-4',
        title: 'Customer-Centric',
        template: `Our customers are our everything.

That's why [Product Name] is designed with [customer need] in mind.

[Feature for customer]. [Benefit for customer].

You come first. Always.`,
        placeholders: extractPlaceholders(`Our customers are our everything.

That's why [Product Name] is designed with [customer need] in mind.

[Feature for customer]. [Benefit for customer].

You come first. Always.`)
      },
      {
        id: 'evergreen-5',
        title: 'Innovation Story',
        template: `[Number] years in the making.

[Product Name] represents [innovation/breakthrough].

[Technical achievement]. [Customer benefit].

The future of [category] is here.`,
        placeholders: extractPlaceholders(`[Number] years in the making.

[Product Name] represents [innovation/breakthrough].

[Technical achievement]. [Customer benefit].

The future of [category] is here.`)
      },
      {
        id: 'evergreen-6',
        title: 'Community Focus',
        template: `[Number]+ strong and growing.

The [Brand Name] community is more than customers — it's a family.

[Community benefit]. [Shared value].

Be part of something bigger.`,
        placeholders: extractPlaceholders(`[Number]+ strong and growing.

The [Brand Name] community is more than customers — it's a family.

[Community benefit]. [Shared value].

Be part of something bigger.`)
      },
      {
        id: 'evergreen-7',
        title: 'Heritage/Legacy',
        template: `Since [year], [Brand Name] has been [legacy statement].

[Product Name] continues that tradition with [modern benefit].

[Heritage value]. [Future vision].

Trusted for generations.`,
        placeholders: extractPlaceholders(`Since [year], [Brand Name] has been [legacy statement].

[Product Name] continues that tradition with [modern benefit].

[Heritage value]. [Future vision].

Trusted for generations.`)
      },
      {
        id: 'evergreen-8',
        title: 'Sustainability',
        template: `Good for you. Good for the planet.

[Product Name] is made with [sustainable practice].

[Environmental benefit]. [Social responsibility].

Choose better. Choose [Brand Name].`,
        placeholders: extractPlaceholders(`Good for you. Good for the planet.

[Product Name] is made with [sustainable practice].

[Environmental benefit]. [Social responsibility].

Choose better. Choose [Brand Name].`)
      },
      {
        id: 'evergreen-9',
        title: 'Emotional Connection',
        template: `Some things are worth more than [price reference].

[Product Name] gives you [emotional benefit].

[Moment/memory it creates]. [Feeling it delivers].

Because life's too short for [inferior alternative].`,
        placeholders: extractPlaceholders(`Some things are worth more than [price reference].

[Product Name] gives you [emotional benefit].

[Moment/memory it creates]. [Feeling it delivers].

Because life's too short for [inferior alternative].`)
      }
    ]
  }
];

// Template Card Component
function TemplateCard({ template, categoryColor }: { template: Template; categoryColor: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleValueChange = (placeholder: string, value: string) => {
    setValues(prev => ({ ...prev, [placeholder]: value }));
  };

  const getFilledTemplate = useCallback(() => {
    let result = template.template;
    template.placeholders.forEach(placeholder => {
      const value = values[placeholder] || placeholder;
      result = result.replace(new RegExp(`\\[${placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`, 'g'), value);
    });
    return result;
  }, [template, values]);

  const renderPreview = useCallback(() => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /\[([^\]]+)\]/g;
    let match;

    while ((match = regex.exec(template.template)) !== null) {
      // Add text before placeholder
      if (match.index > lastIndex) {
        parts.push(template.template.slice(lastIndex, match.index));
      }

      const placeholder = match[1];
      const value = values[placeholder];

      if (value && value.trim()) {
        // Filled - normal text
        parts.push(value);
      } else {
        // Unfilled - red text
        parts.push(<span key={match.index} className="text-red-500">{placeholder}</span>);
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < template.template.length) {
      parts.push(template.template.slice(lastIndex));
    }

    return parts;
  }, [template, values]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFilledTemplate());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const filledCount = Object.values(values).filter(v => v.trim()).length;
  const totalPlaceholders = template.placeholders.length;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: categoryColor }}
          />
          <span className="font-medium text-[var(--text-primary)]">{template.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {filledCount > 0 && (
            <span className="text-xs text-[var(--text-muted)] bg-gray-100 px-2 py-1 rounded-full">
              {filledCount}/{totalPlaceholders} filled
            </span>
          )}
          <ChevronDown
            size={18}
            className={`text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">
              {/* Placeholders */}
              {template.placeholders.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                    Fill in the blanks
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {template.placeholders.map((placeholder, idx) => (
                      <div key={idx}>
                        <label className="block text-xs text-[var(--text-secondary)] mb-1.5 truncate">
                          {placeholder}
                        </label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={values[placeholder] || ''}
                          onChange={(e) => handleValueChange(placeholder, e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-light)] bg-[var(--bg-secondary)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview */}
              <div className="space-y-3">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                  Preview
                </p>
                <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                  <pre className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                    {renderPreview()}
                  </pre>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-green-500'
                    : 'bg-[var(--primary)] hover:bg-[var(--primary-hover)]'
                }`}
                style={{ color: '#FFFFFF' }}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Ad Copy
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Category Section Component
function CategorySection({ category, index }: { category: Category; index: number }) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-4"
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-[var(--border-light)] hover:border-gray-300 transition-all"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            {category.icon}
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {category.title}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {category.subtitle} · {category.templates.length} templates
            </p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Templates */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 pl-4"
          >
            {category.templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                categoryColor={category.color}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AdCopyTemplatesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const totalTemplates = CATEGORIES.reduce((acc, cat) => acc + cat.templates.length, 0);

  return (
    <DashboardLayout>
      <div className="page-wrapper max-w-4xl">
        {/* Hero Header */}
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-medium rounded-full mb-6"
          >
            <Zap size={14} />
            {totalTemplates} Ready-to-Use Templates
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            Ad Copy Templates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto"
          >
            Fill-in-the-blank templates that convert. Choose a category,
            customize your copy, and start selling.
          </motion.p>
        </header>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-5 gap-4 mb-12"
        >
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className="text-center p-4 bg-white rounded-xl border border-[var(--border-light)]"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                {cat.icon}
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {cat.templates.length}
              </p>
              <p className="text-xs text-[var(--text-muted)] truncate">
                {cat.title}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Categories */}
        <div className="space-y-6">
          {CATEGORIES.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-[var(--border-light)] text-center"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Pro tip: Test multiple templates and track which ones perform best for your audience.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
