'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';

// Articles data (same as in the list page)
const articles = [
  {
    id: 1,
    slug: 'best-private-agent',
    title: 'Who Is the Best Private Agent in the Market Today',
    description: '5-days home shipping, 18/6 Whatsapp support, cheaper prices..',
    category: 'operations',
    readTime: 5,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails.jpg?v=1763290577',
    content: `## What We Tested

We ran two independent tests to create a realistic comparison.

• First test: 55 identical orders sent to several agents to compare pricing for the exact same products.
• Second test: a full working period of approximately 500 customer orders with each agent. This allowed us to measure real delivery speed, service consistency, support availability, and scale performance.
• Company names are not listed to keep the evaluation neutral and professional

## Shipping Speed

• Winning agent: consistent delivery in 5 to 7 days across key destinations.
• Other agents: slower and less stable average delivery times

## Pricing Comparison

• Across the 55 repeated orders, pricing was almost identical between all agents.
• No significant cost advantage for any provider

## Service Quality

• The winning agent provided the fastest response times, including immediate WhatsApp availability.
• Strong personal support, smooth handling of volume spikes, and no operational delays

## Conclusion

With pricing nearly identical, the deciding factors were speed, scale readiness, and service efficiency. The winning agent delivered faster shipping, more stable performance, and significantly better support, making it the strongest choice for long-term scaling.`,
    buttons: [
      { text: 'Connect the winning agent to your store', url: 'https://erp.matedropshipping.com/login?invite_id=915' }
    ]
  },
  {
    id: 2,
    slug: 'stop-using-aliexpress',
    title: 'Stop Using AliExpress Now',
    description: 'AliExpress destroys your store faster than you realize.',
    category: 'operations',
    readTime: 6,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails_1.jpg?v=1763290608',
    content: `## Why AliExpress Damages Your Brand

### Problem 1: Slow Shipping Times
AliExpress averages 21 to 45 days.
Modern consumers expect fast delivery. Slow shipping creates frustration, cancellations, and heavy customer service workload. Repeat purchases collapse.

### Problem 2: No Quality Control
You never see the actual product shipped to the customer.
Items arrive crushed, low quality, or different from the photos. Trust disappears instantly.

### Problem 3: No Real Support
When an issue appears, you contact random suppliers with response times of 10 to 14 days.
This cannot be managed at scale with thousands of orders.

## The Subconscious Effect

A customer waits weeks, walks to a pickup point, receives a thin unbranded plastic bag, opens it, and sees poorly folded items.
Within 0.4 seconds, the subconscious decides: never again.

## The Alternative: A Real Brand Experience

Delivery in five days.
A courier at the door.
A black box with an embossed logo.
Clean folding.
A small gift that costs you 0.5 dollars.
A thank you card that elevates emotion.

The subconscious forms the opposite conclusion: this brand is real and worth returning to.

## The Six Advantages of a Private Agent

**1. Central Contact**
One person for all issues. Direct communication with factories.

**2. Quality Control**
Top selling products inspected before shipping. Defects eliminated.

**3. Kitting and Bundling**
Multiple items packed into one clean box instead of several envelopes.

**4. Branding Options**
Custom packaging, boxes, cards, clothing tags, jewelry boxes, fragrances.

**5. Automated Operations**
Orders appear automatically in the agent's system.
You pay, they handle procurement, packing, consolidation, and shipping.

**6. Stronger Pricing**
Factory relationships often reduce product cost by 10%-30%

**7. No Fees**
No subscription. No commitments. No minimum quantity.
If you have no orders, you pay nothing.

## Conclusion

AliExpress might look simple, but it destroys customer experience and eliminates repeat customers.
A private agent fixes every weakness and gives your brand the foundation required for real scale.`,
    buttons: [
      { text: 'Connect Private agent', url: 'https://erp.matedropshipping.com/login?invite_id=915' }
    ]
  },
  {
    id: 3,
    slug: 'product-reviews-conversion',
    title: 'Do Product Reviews Increase Conversion?',
    description: "We've did a test if product reviews increase CVR, Here's the results",
    category: 'conversion',
    readTime: 4,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails_2.jpg?v=1763290696',
    content: `## What We Tested

We tested Shopify product reviews across multiple stores.
Each product had between 2 and 55 reviews.
We compared conversion between pages with strong, credible reviews and pages with no reviews at all.

**Version A**
Product page with realistic, well structured reviews.

**Version B**
Product page without any reviews.

## Results

Removing reviews reduced conversion by 12.7%.
Version A outperformed Version B across every product tested.

## Why It Happens

Reviews create social certainty and reduce hesitation.
Without them, visitors rely only on photos and price, which increases risk perception and slows the decision.

## Critical Note

Reviews must look real.
Credible names, natural writing style, real timestamps and clean images are essential.
Fake looking reviews can lower conversion instead of increasing it.

## Conclusion

Authentic product reviews improve trust and increase conversion.
Removing them creates a measurable drop of 12.7%.`,
    buttons: [
      { text: 'Add product reviews', url: 'https://loox.io/app/LASERCRO' },
      { text: 'Social Proof course', url: 'https://quantum-scale.co/pages/the-social-proof' }
    ]
  },
  {
    id: 4,
    slug: 'ecommerce-success-cheat-code',
    title: 'Important: The Cheat Code for Ecommerce Success',
    description: 'Do this to understand exactly how much each customer is worth to you',
    category: 'ltv',
    readTime: 7,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails_3.jpg?v=1763297153',
    content: `## Have you heard of the Pareto principle?

20% of the actions generate 80% of the results.

This is even more relevant in ecommerce, and not only for actions but also for customers. In ecommerce the winners are those who understand precisely how much each customer is worth to them over time. Without measurement everything becomes speculation. With measurement you become a precise entrepreneur who understands where the significant profit lies.

And as you know, we are **obsessed with LTV** (Customer Lifetime Value). This is the ultimate formula. It is the breakthrough that separates regular stores from businesses that reach millions.

Dan Kennedy expressed it in the clearest way:
**"The person who can spend more to acquire a customer is the one who wins."**

With this remarkable and **free** tool, you will see exactly how much each customer is worth to you in every time frame from the moment they join. You will know their value after 1 month from the first purchase, 3 months, 6 months, 1 year, 2 years.

## Back to Pareto.

Remember what we said? 20% of the customers generate 80% of the revenue.
Once you connect the software to your store, you will discover that it is actually **5% of the customers who generate 95% of the money**.

The top 25% of spenders, already by November, meaning 2 to 3 months after their first purchase, were worth on average about **$796 per customer**, and these 25% generated for us almost 1.6 million dollars.

In contrast, all the remaining customers, 25% to 100%, were worth significantly less, and these 75% generated an estimated $700,000.

## What is the conclusion?

With this application we can:

✔️ Understand how much each customer is worth on average
✔️ Understand the customer segmentation by percentiles
✔️ Identify who these top 25% spenders are, what they share, and begin targeting individuals with similar characteristics
✔️ Export within the application those top 25% spenders and create a Lookalike Audience in Meta`,
    buttons: [
      { text: 'Connect app', url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva' },
      { text: 'LTV Course', url: 'https://quantum-scale.co/pages/test1' }
    ]
  },
  {
    id: 5,
    slug: 'roadmap-to-1m-month',
    title: 'The Roadmap to $1M/Month',
    description: 'When you build a system strong enough, You cannot be stopped.',
    category: 'ltv',
    readTime: 8,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails_4.jpg?v=1763297241',
    content: `## Step 1: Building a 1,000 Dollar LTV Machine for Every Customer

This is the entire secret.
A 1,000 dollar LTV machine for every customer is what allows you to reach the truly large numbers.

When every customer is worth $1,000 on average within one to two years from their first purchase:
• To reach $1,000,000 per month you only need 1,000 customers per month.
• Which is about 33 new customers per day only.

Once you understand this, the game becomes simple.

You do not need thousands of sales per day.
You need few customers, but the right ones.

And the CAC? Not limited. If it rises from $20 dollars to $40, who cares?

## Step 2: Building an Infrastructure That Holds Massive Scale

Before running campaigns, you must turn the business into a stable machine.

**The foundations:**

• High level customer service
• An abandonment system that recovers more than 70 percent
• A complete SMS marketing system
• A complete email marketing system
• A fast private agent that provides 5 - 8 day shipping with an option for home delivery

A strong infrastructure creates resilience.
Chasing algorithms is for the weak, you are not like that.

## Step 3: A Website That Converts Above 6% of visitors

6% conversion rate sounds high, but this is the new standard for strong brands.

✔️ Website design at the highest psychological level
✔️ Adding enough products, and the right products, to the store
✔️ Using advanced tactics such as social proof, laser targeting

**What this means in numbers:**
• If the website converts at six percent
• And if your CAC is 20 dollars
• You need about 550 visitors per day to reach 33 sales per day.

At a low CPC, 0.70 dollars on average, this is approximately:
**$385 daily budget only.**

From this you build a system of $1M Per month.

## Conclusion

The path to one million dollars per month is not a dream.
It is simple mathematics plus a smart system plus high LTV.

33 customers per day.
$385 per day.

From here, your business becomes a machine that cannot be stopped.`,
    buttons: [
      { text: 'The Automatic System That Earn 1,000 Dollars per Customer', url: 'https://quantum-scale.co/pages/test1' },
      { text: 'The Subconscious Trap', url: 'https://quantum-scale.co/pages/test2' }
    ]
  },
  {
    id: 6,
    slug: 'geo-location-announcement-bar',
    title: 'Does a GEO-Location Announcement Bar Increase Conversion?',
    description: 'We conducted an extensive test, and the results change the rules entirely.',
    category: 'conversion',
    readTime: 6,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails_5.jpg?v=1763297318',
    content: `First, no need to keep you curious, we will begin with the conclusion.

The answer is absolutely **YES**, and by a significant margin.

How significant? **A 67% increase in conversion rate.**

These results come from multiple tests performed across four stores, with more than 64,000 visitors.

In the three other stores, improvement ranged between **40%-75%** in conversion rate.

And despite offering a discount, surprisingly, carts also became larger in several stores.

## Let's understand what this announcement bar actually is:

It appears at the top of the website, based on the visitor's location.

## What does this mean?

The discount size is automatically adapted to the purchasing power of the visitor's location. You set a maximum discount in advance.

For example, if someone enters from India, they may receive a maximum discount such as 15%, while a visitor from New York may receive 5%.

But there is more.

No matter when or from where the visitor enters, the system will always justify the discount with a local-based reason. Even if no local holiday exists, the banner will display something like "Summer Sale for Hungary".

## Summary

The system works fully automatically and is VPN-resistant. If a visitor attempts to cheat by switching to an Indian VPN to receive a larger discount, the system bypasses the VPN and shows the offer according to the real country.

This leads to an immediate uplift of **45% to 70%** in conversion rates.

**Advantage 1: Matching income level and purchasing power**

Certain audiences entering from strong US states do not rely heavily on discounts, so they receive only 5%.

In contrast, visitors from countries with weaker purchasing power will receive 10% or even 15% to motivate them to act.

**Advantage 2: Strong sense of personalization**

Imagine you are Polish during the Epiphany Holiday. You enter a global website and see a banner saying:
"Happy Epiphany! Use code POL10 for 10% OFF."

This feels extremely personal, as if the site was Polish. It creates a sense of luck and exclusivity.

## Field results: 45% to 70% increase in conversions`,
    buttons: [
      { text: 'Add the announcement bar to my store', url: 'https://parityrocket.com/' }
    ]
  },
  {
    id: 7,
    slug: 'wishlist-rev-per-visit',
    title: 'Does a Wishlist on Your Website Increase REV/Visit?',
    description: 'We conducted several A/B tests, and the results may surprise you.',
    category: 'conversion',
    readTime: 5,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails_6.jpg?v=1763297348',
    content: `Many major brands use a Wishlist feature on their websites (see example: farfetch.com).

A few years ago, we decided to test why, and how significant it truly is.

For this reason, we added an **Add to wishlist** button instead of a **Buy now** button.

The result is quite noticeable: an **8% lift in conversion rate** and a significant **22% increase in AOV**.

The truth is that there is also a logical explanation for this: The moment a visitor clicks Add to wishlist, the brain experiences a sense of partial ownership over the product.

This is a deep and well-researched psychological mechanism called the **Endowment Effect**.

When a visitor clicks Add to wishlist, they enter a physical-shopping-like experience similar to "collecting items" on the way to a fitting room in a retail store. However, unlike adding to cart, this action does not feel sales-driven.

The brain's defense mechanism, the frugal instinct, does not resist the action, because it is "only adding to the wishlist".

But in practice, the visitor begins playfully exploring the site, adding items to the wishlist, and slowly, without noticing, they develop emotional attachment to more and more products.

Suddenly, without having planned it, they find themselves on the checkout page, entering payment details, often with a larger cart, because the experience felt like "collecting products".

## So no,

A Wishlist is not just a cosmetic addition.

It is a layer of consumer behavior that deepens buying intention, increases positive emotional connection to the product, and generates a clear rise in revenue per visit.

It is one of the simplest features to install, yet one of the most impactful for Rev/Visit, AOV, and overall conversions.`,
    buttons: [
      { text: 'Add wishlist to your site', url: 'https://vitals.app/shopify/12548540' }
    ]
  },
  {
    id: 8,
    slug: 'email-vs-sms-revenue',
    title: 'Email vs SMS: Which Generates More Revenue?',
    description: 'On the 4th of July, we sent both an SMS and an email campaign to the same audience...',
    category: 'marketing',
    readTime: 5,
    thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Article_thumnails_7.jpg?v=1763297381',
    content: `There is constant debate around SMS and email, which one is better.
We decided to test it out of pure curiosity.

We took one major event, the 4th of July, and within the same brand, to the exact same audience, we sent both an email campaign and an SMS campaign, with the same offer, same main text, and same timing.

The offer was a **15% sitewide coupon for 24 hours**.

The goal was to measure cleanly which channel delivers higher Rev/Recipient, and which one performs better in real time.

## Here are the results.

In simple terms,
Every recipient on the SMS list was worth **several times more** than a recipient on the email list for this holiday campaign.

## Surprising? Not really.

SMS consistently delivers around **98% open rate**, with nearly **90% of messages opened within 3 minutes**.

Email open rates are **20%-28%**, and many subscribers open the message a day or two later, when the promotion is already over.

## Does this mean you should rely only on SMS?

Absolutely not. Do not be lazy.

Emails are almost free, SMS is also inexpensive, and you should send whenever the opportunity is right.

It is money waiting to be collected, just like the **28,000$+** generated from a single email blast that took 5 minutes to send.`,
    buttons: [
      { text: 'The SMS Platform we use', url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva' },
      { text: 'The Email marketing platform we use', url: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner' }
    ]
  },
];

function parseMarkdown(content: string): string {
  return content
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/^• (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
    .replace(/^✔️ (.*$)/gim, '<li class="ml-4 mb-2 text-green-700">✔️ $1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-600 leading-relaxed">')
    .replace(/^(?!<[hlu])/gm, '')
    ;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Learning Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Learning Center
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full capitalize">
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600">
              {article.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <FadeIn delay={0.1}>
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{
                __html: `<p class="mb-4 text-gray-600 leading-relaxed">${parseMarkdown(article.content)}</p>`
              }}
            />

            {/* Action Buttons */}
            {article.buttons && article.buttons.length > 0 && (
              <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Take Action</h3>
                <div className="flex flex-wrap gap-3">
                  {article.buttons.map((button, index) => (
                    <a
                      key={index}
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      {button.text}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Continue Learning</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {articles
              .filter(a => a.slug !== slug)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/learn/${relatedArticle.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relatedArticle.thumbnail}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                      Read more
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
