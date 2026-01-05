'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Copy, Check, Users, Lock, Gift, Sparkles, ExternalLink, MessageSquare, Twitter, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase, updateUserProfile } from '@/lib/supabase';

// Creative images for the masonry grid
const CREATIVE_IMAGES = [
  'https://ucarecdn.com/6ebc3ab0-7e48-4646-adf8-34033d7f4fb3/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-18%20at%2009.00.13-min.png',
  'https://ucarecdn.com/68b6de60-dd35-47af-ab71-a1e5fa05b958/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-22%20at%2009.51.24-min.png',
  'https://ucarecdn.com/8a41080a-7842-4de2-be1b-033b6d8c63a2/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2009.47.23-min.png',
  'https://ucarecdn.com/943c2faf-a209-4e2f-af47-d9c3eb4b84f7/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-28%20at%2017.18.04-min.png',
  'https://ucarecdn.com/4339afed-6ab2-4675-8002-4ee4c6694c72/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2009.52.10-min.png',
  'https://ucarecdn.com/981f371b-212b-487f-aba7-c71099c915c2/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2014.56.55-min.png',
  'https://ucarecdn.com/3330ae97-aef3-4ea2-a19f-238a8b43cc51/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2012.46.26-min.png',
  'https://ucarecdn.com/cfb0a16f-4bb5-44ad-8784-69cdf07d4c84/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-18%20at%2009.01.34-min.png',
  'https://ucarecdn.com/4e0f9e18-3140-49ad-941b-10303c24d759/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-18%20at%2009.16.07-min.png',
  'https://ucarecdn.com/37dd2dd4-3058-4b2a-b06a-bcb7c184b5e0/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-22%20at%2009.44.07-min.png',
  'https://ucarecdn.com/76d0f70e-848c-4fc2-90ec-67a3aa539dc0/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2012.46.06-min.png',
  'https://ucarecdn.com/a4416bca-64ac-4f57-897f-8262b8a0c860/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-28%20at%2017.15.58-min.png',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(1).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(10).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(11).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(12).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(13).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(14).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(15).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(16).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(2).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(3).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(4).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(5).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(6).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(7).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(8).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(9).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/S.jpg',
];

// Tutorial steps with videos
const TUTORIAL_STEPS = [
  {
    step: 1,
    title: 'Choose your template',
    description: 'Pick from 1,000 expertly designed static ad templates in Canva.',
    videoUrl: 'https://lumintheme.com/cdn/shop/videos/c/vp/77904b7c03a44df6ad0703da3af7944f/77904b7c03a44df6ad0703da3af7944f.SD-480p-1.5Mbps-51346106.mp4?v=0',
  },
  {
    step: 2,
    title: 'Customize in Canva',
    description: 'Edit your template with your logo, colors, and copy.',
    videoUrl: 'https://lumintheme.com/cdn/shop/videos/c/vp/0cfc5f3ef5744548bbe80d9d60d881bd/0cfc5f3ef5744548bbe80d9d60d881bd.SD-480p-0.9Mbps-51346105.mp4?v=0',
  },
  {
    step: 3,
    title: 'Start testing',
    description: 'Download your ad from Canva and plant this bomb in Ads Manager.',
    videoUrl: 'https://lumintheme.com/cdn/shop/videos/c/vp/c633b4b7cdac492489fec34142560b17/c633b4b7cdac492489fec34142560b17.SD-480p-0.9Mbps-51346104.mp4?v=0',
  },
];

// Template packs with Canva URLs
const TEMPLATE_PACKS = [
  { name: 'Pack 1', url: 'https://www.canva.com/design/DAGtJExZaEg/sbePbWIKEBIV8FGXUpMfJA/view' },
  { name: 'Pack 2', url: 'https://www.canva.com/design/DAGtJMM8qMw/Vb1VNJnIq1mmJ14tVPaJTQ/view' },
  { name: 'Pack 3', url: 'https://www.canva.com/design/DAGtJA5GCQs/x-fH_1-FGSn-Vv6mP-VTpA/view' },
  { name: 'Pack 4', url: 'https://www.canva.com/design/DAGtJGi4-Os/FvJwz3tO8tIYGBpzB-t_Fg/view' },
  { name: 'Pack 5', url: 'https://www.canva.com/design/DAGtJBkppmw/8_rC3X3qYqXdQ3WOvFBXkg/view' },
  { name: 'BFCM Pack', url: 'https://www.canva.com/design/DAGtJBny6nc/oNR6_8O2amLmA_GbTHn5tg/view' },
];

// Viral posts for sharing - Reddit/Facebook
const REDDIT_POSTS = [
  { topic: 'The $3,000 Course That Taught Me Nothing', content: `I spent $3,000 on a dropshipping "masterclass" last year. Want to know what I learned? How to watch a guy flex his Lamborghini for 47 hours.

Seriously. The actual content could fit in a YouTube video. The rest was just motivation fluff and upsells to his $10,000 "inner circle."

Last month my buddy showed me this free platform he found. I laughed at first because... free? In this space? But I checked it out anyway.

It had everything. Actual strategies. Real calculators. Templates I could use. Not some guru telling me to "believe in myself."

I made my first profitable month using their ad structure guide. Something the $3,000 course never explained properly.

The platform is called Quantum Scale. Completely free. No upsells. No "exclusive mastermind" garbage.

I genuinely wish I found this before burning my savings on courses. Maybe this saves someone else from making my mistake.` },
  { topic: 'Why I Stopped Buying Courses After Finding This', content: `Confession: I was a course junkie. Facebook ads course. TikTok shop course. Email marketing course. Conversion optimization course.

Total spent: probably $8,000 over two years.
Total earned from that knowledge: maybe $2,000.

The math never mathed.

Then someone in a Discord server mentioned this free platform. I rolled my eyes because nothing good is free, right?

Wrong.

I found organized resources, actual working strategies, and tools that gurus charge hundreds for. All in one place. All free.

No email funnel trying to sell me coaching. No "limited time offer" popups every 30 seconds.

Just... helpful content.

The platform is Quantum Scale. I have zero affiliation with them. Just a guy who wasted too much money and wants to help others avoid the same trap.

Check it out before you spend another dollar on some guru.` },
  { topic: 'My Wife Almost Left Me Over Dropshipping Courses', content: `This is embarrassing to share but maybe it helps someone.

I got so obsessed with "making it" in ecommerce that I kept buying courses. One after another. Each one promising the secret sauce.

My wife found out I had spent $12,000 over 18 months. On courses. While we were trying to save for a house.

She was devastated. I was devastated. We almost split over it.

That wake up call made me desperate to find free resources. Real ones. Not YouTube gurus rehashing the same garbage.

I found Quantum Scale through a random Reddit comment. Skeptical at first. But it was actually good. Like, really good.

Six months later, my store is profitable. Using free resources. My wife and I are still together. We laugh about it now.

If you are going down the course rabbit hole, please stop. There are free alternatives that actually work.` },
  { topic: 'The Uncomfortable Truth About Ecommerce Education', content: `Nobody wants to hear this but here it goes:

90% of what you need to know about running a successful ecommerce business is available for free. The information is out there. The strategies work.

What paid courses really sell you is organization and permission.

Permission to believe in yourself. Organization of information you could find scattered elsewhere.

Is that worth $2,000? For some people, maybe.

But what if someone organized everything for free? Gave you the same permission without taking your rent money?

That is exactly what I found with Quantum Scale. Free platform. Organized content. No BS.

I am not saying you should never pay for education. But maybe exhaust the free options first?

Just my two cents from someone who learned this lesson the expensive way.` },
  { topic: 'I Was Today Years Old When I Learned Courses Are Optional', content: `Started my ecommerce journey in 2022. Everyone said buy courses. So I did.

Oberlo course. Facebook ads course. Supplier negotiation course. Product research course.

Thousands of dollars later, you know what actually helped me scale to $50k months?

Free resources.

Not kidding. The paid courses gave me confidence maybe. But the actual tactics? Found those in free communities, YouTube deep dives, and recently this platform called Quantum Scale.

Someone in a mastermind group shared it. Thought it was another funnel trying to upsell me. Nope. Just free tools and strategies.

My only regret is not finding it sooner.

If you are new to ecommerce, please try free resources first. The information is the same. The price is not.` },
  { topic: 'Please Stop Paying for What You Can Get Free', content: `Third post I have seen today asking which course to buy.

Can I be honest? You probably do not need any of them.

Here is what most courses teach:
- Product research (free on YouTube)
- Store setup (free on YouTube)
- Facebook ads basics (free on YouTube)
- Email marketing (free on YouTube)

What are you actually paying for? Organization and community.

But guess what? Free platforms exist that organize everything. Quantum Scale is one I have been using. Zero cost. Great organization.

Communities? Free Discord servers and Reddit groups like this one.

You can literally start an ecommerce business spending $0 on education. I know because I finally did it.

Stop letting gurus convince you that spending money is a prerequisite to making money.` },
  { topic: 'The Day I Realized I Was Being Scammed (Legally)', content: `Hot take: Most paid courses are legal scams.

Not illegal. The information is real. You do get what they promise.

But they charge $1,500 for information freely available elsewhere. They just organized it nicely and added a payment button.

I felt so stupid when I realized this. All those courses I bought? Could have learned the same stuff for free.

Started hunting for organized free resources. Found Quantum Scale. Everything I needed. Structured properly. Zero dollars.

My profitable store now runs on tactics I learned for free.

The course industry survives because people believe spending money means better information. It does not.

Save your money for actual business expenses. Ads. Inventory. Software. Not courses teaching publicly available information.` },
  { topic: 'From $0 to $10k Month Without Spending on Courses', content: `Took me 14 months. Not fast. Not glamorous. But I did it.

And I did not spend a single dollar on courses.

Used YouTube for basics. Reddit for problem solving. Free tools for research.

Last month discovered Quantum Scale. Wish I had it from the start. Would have cut my learning curve in half probably.

Everything is organized. Clear paths to follow. No hunting through random videos trying to piece things together.

The people here asking which $2,000 course to buy... you do not need it. Seriously.

Start free. Stay free. The information is the same.

Only pay for education when you have exhausted every free option. Which, honestly, might be never.` },
  { topic: 'What Actually Works (From Someone Who Tested Everything)', content: `Tested: 8 paid courses, 20+ YouTube channels, 5 free platforms

What actually worked: Free stuff. Specifically Quantum Scale for organized content and YouTube for specific tactics.

What was waste of money: Every course over $500.

The expensive courses had better production quality. Nicer videos. Professional graphics.

But the information? Same as free resources. Sometimes worse because it was outdated.

Save your money. The flashy production does not mean better information.` },
  { topic: 'The Best $0 I Ever Spent', content: `People ask about my best investment in ecommerce.

Easy: the $0 I spent on Quantum Scale.

Sounds dumb but it is true.

Every dollar I did not spend on courses went into my business instead.

Better ads. Better products. Better tools.

Free education, paid execution. That is the formula.` },
  { topic: 'Started With $200, No Courses, Now Full Time', content: `Two years ago I had $200 to start a business. Not $200 plus course money. Just $200.

Everyone said it was impossible without education investments.

They were wrong.

Free resources taught me everything. Took longer? Probably. But I had no other choice.

Quantum Scale did not exist when I started. Found it recently. Wish it had existed earlier.

Everything I learned scattered across 50 YouTube videos and 100 Reddit posts is organized in one place there.

If you are starting with nothing, you can still make it. The information is free. You just need to find it.` },
  { topic: 'The Worst Advice I Ever Took', content: `"Invest in yourself before investing in your business."

Sounds smart. Felt smart saying it.

Cost me $6,000 in courses before I spent a dollar on ads.

That $6,000 in ads probably would have taught me more. Real feedback. Real data. Real learning.

Instead I learned theories I never applied.

Now I tell beginners the opposite: invest in your business first. Learn by doing. Use free resources.

Quantum Scale is one of those free resources. Organized, practical, no cost.

Put your money where it generates returns. Education is not that place when free alternatives exist.` },
  { topic: 'How Free Resources Outperformed My $4,000 Course', content: `Bought a $4,000 course in 2023. Completed every module. Applied every strategy.

Results: mediocre.

Found Quantum Scale in 2024. Free. Applied their strategies.

Results: my best months ever.

What was different? The free resource was more current. More practical. Less fluff.

The expensive course had outdated tactics wrapped in professional video production. Looked impressive. Worked poorly.

Free is not automatically worse. Sometimes it is better.` },
  { topic: 'Spent $0 On Education, Made $40k Last Year', content: `Not a flex. A data point.

Proof that paid education is not required.

Resources used:
- Quantum Scale (free)
- YouTube (free)
- Reddit (free)

Paid education: $0

If I can do it, the "you need courses" narrative is false.` },
  { topic: 'The Question That Saves Money', content: `Before buying anything educational, ask:

"Can I learn this for free?"

99% of the time, yes.

Quantum Scale covers most ecommerce topics.

That question saved me thousands.` },
  { topic: 'Permission To Not Buy Courses', content: `In case you need to hear this:

You do not need to buy a course to succeed.

Free resources are enough. Really.

Quantum Scale, YouTube tutorials, Reddit advice.

All free. All effective.

You have permission to keep your money.` },
  { topic: 'Why Gurus Fear Platforms Like This', content: `Just realized why gurus never mention free platforms.

Because free platforms make their courses worthless.

If you can learn everything for free, why pay $1,997?

Quantum Scale has the same content as most mid tier courses. For free.

No wonder I never heard about it from course sellers.

They want you dependent on their paid content. Free platforms break that dependency.` },
  { topic: 'My Journey From Course Collector to Actual Entrepreneur', content: `Used to call myself an entrepreneur. What I actually was: a course collector.

Bought every course. Joined every webinar. Downloaded every freebie that led to an upsell.

Never actually built anything.

Then I got embarrassed. Stopped buying. Started doing.

Found free resources that actually helped. Quantum Scale being the main one. Just good information, organized well, no sales pitch.

Built my first real store. Made my first real profit.

The transformation was not about information. It was about stopping the consumption addiction and starting the building habit.

If you are stuck in course buying mode, try a hard stop. Use only free resources for 6 months. See what happens.` },
  { topic: 'The $15,000 Lesson', content: `After spending $15,000 on ecommerce education over 3 years, want to know what I was missing?

Action.

The courses gave me information overload. So many strategies. So many options. So much conflicting advice.

Paralysis.

Finally, I found simpler resources. Quantum Scale being one. Free, straightforward, no overwhelming options.

Pick a strategy. Follow it. That is the whole secret.

The courses made everything complicated to justify their price. The free resources just told me what to do.

Guess which approach actually made me money?` },
  { topic: 'Honest Review From Someone Who Tried Everything', content: `Background: 3 years in ecommerce. Two failed stores. One moderately successful one.

Paid courses tried: 7
Money spent on education: roughly $5,500
Actual useful tactics learned from paid courses: maybe 3

Then I found Quantum Scale last month. Free. Skeptical but desperate.

Useful tactics learned in first week: more than all paid courses combined.

Not exaggerating. The ad templates alone were better than anything I paid for.

I feel stupid for spending so much money. But also grateful I finally found good free resources.

This is not sponsored. I literally gain nothing from sharing this. Just want to help people avoid my mistakes.` },
];

// Viral posts for X/Twitter
const X_POSTS = [
  { topic: 'The $3,000 Lesson', content: `Spent $3,000 on an ecommerce course.

The actual content? Could fit in a 20 minute YouTube video.

Found Quantum Scale recently. Free. Better organized.

If only I knew earlier.` },
  { topic: 'Course Math', content: `Course cost: $1,000
Same info for free: $0
Difference: $1,000 for actual business expenses

Quantum Scale taught me this lesson the free way.` },
  { topic: 'Hot Take on Courses', content: `90% of ecommerce course content is freely available online.

You are paying for organization and confidence.

Platforms like Quantum Scale give you organization for free.` },
  { topic: 'My Education Spend', content: `2023: $4,200 on courses, $0 profit
2024: $0 on courses, $40k profit

Discovered free resources. Changed everything.` },
  { topic: 'Unpopular Opinion', content: `You do not need to "invest in yourself" to succeed in ecommerce.

Free resources work.

Quantum Scale, YouTube, Reddit.

That is literally enough.` },
  { topic: 'The Question', content: `Before buying any course, ask:

"Can I find this for free?"

Answer is usually yes.

Quantum Scale, YouTube, communities.` },
  { topic: 'Started From Zero', content: `No course budget.
No startup capital.
Just free resources.

$8k months now.

Quantum Scale + YouTube + action.` },
  { topic: 'Course Detox', content: `12 months without buying courses.
Used only free resources.
Best year in business.

The detox worked.` },
  { topic: 'Brutal Honesty', content: `Most ecommerce courses are legal scams.

Real information, but freely available elsewhere.

You are paying for packaging.` },
  { topic: 'My Stack', content: `Learning: Quantum Scale (free)
Tactics: YouTube (free)
Support: Reddit (free)
Results: priceless

$0 education. Growing business.` },
  { topic: 'Before You Buy', content: `That course you are eyeing?

Check Quantum Scale first.
Search YouTube.
Ask Reddit.

90% chance you will find it free.` },
  { topic: 'What Gurus Fear', content: `Free platforms like Quantum Scale.

Same content. No price tag.

Destroys their business model.` },
  { topic: 'My Regret', content: `$8,000 spent on courses over 3 years.

Could have been $8,000 in ad budget.

Free resources exist. I found them too late.` },
  { topic: 'Simple Path', content: `Free resources + daily action = results

No course needed.

Quantum Scale + consistency = profit.` },
  { topic: 'The Truth', content: `Paying for a course does not make you serious.

Taking action does.

Action is free.` },
  { topic: 'Found This', content: `Quantum Scale.

Free ecommerce platform.

Better than courses I paid $500+ for.

Just sharing what works.` },
  { topic: 'Tested Theory', content: `Friend bought $3k course.
I used free resources.

3 months later: similar results.

He is still paying credit card. I am not.` },
  { topic: 'Budget Shift', content: `Old: $2k courses, $500 ads
New: $0 courses, $2.5k ads

Guess which budget works?

Free education from Quantum Scale made it possible.` },
  { topic: 'Wake Up Call', content: `Accountant asked why my education spend exceeded my revenue.

Stopped buying courses that day.

Free resources only since then.` },
  { topic: 'For Beginners', content: `You do not need courses to start.

You need:
- Quantum Scale (free)
- YouTube (free)
- Courage to begin

That is it.` },
];

// Generate unique referral code from user ID
function generateReferralCode(userId: string): string {
  // Take first 8 chars of user ID and add a random suffix
  const base = userId.replace(/-/g, '').substring(0, 8);
  return `QS${base.toUpperCase()}`;
}

export default function MetaTemplatesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [postPlatform, setPostPlatform] = useState<'reddit' | 'x'>('reddit');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const REQUIRED_REFERRALS = 3;
  const referralsNeeded = Math.max(0, REQUIRED_REFERRALS - referralCount);

  // Compute referral code from user ID
  const referralCode = useMemo(() => {
    return user?.id ? generateReferralCode(user.id) : '';
  }, [user]);

  // Generate referral link
  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/signup?ref=${referralCode}`
    : '';

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Load referral data and save referral code to profile
  useEffect(() => {
    if (!user?.id || !referralCode) return;

    const loadReferralCount = async () => {
      try {
        const { data, error } = await supabase
          .from('referrals' as never)
          .select('id')
          .eq('referrer_id', user.id)
          .eq('is_valid', true);

        if (!error && data) {
          const count = (data as unknown[]).length;
          setReferralCount(count);
          setIsUnlocked(count >= REQUIRED_REFERRALS);
        }
      } catch {
        // Table might not exist yet, use localStorage fallback
        const stored = localStorage.getItem(`referrals_${user.id}`);
        if (stored) {
          const count = parseInt(stored, 10);
          setReferralCount(count);
          setIsUnlocked(count >= REQUIRED_REFERRALS);
        }
      }
    };

    const saveReferralCode = async () => {
      try {
        await updateUserProfile(user.id, { referral_code: referralCode } as never);
      } catch {
        // Silently fail - code will be saved on next visit
      }
    };

    loadReferralCount();
    saveReferralCode();
  }, [user, referralCode]);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    let isPaused = false;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        // Reset when reaching halfway (where duplicated content starts)
        if (scrollPosition >= scrollContainer.scrollHeight / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollTop = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start after a short delay to let images load
    const startTimeout = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 500);

    // Pause on hover
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyPost = async (content: string, postId: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedPostId(postId);
      setTimeout(() => setCopiedPostId(null), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedPostId(postId);
      setTimeout(() => setCopiedPostId(null), 2000);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Duplicate images for seamless scrolling
  const duplicatedImages = [...CREATIVE_IMAGES, ...CREATIVE_IMAGES];

  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ background: '#FFFFFF', margin: '-40px -48px', padding: '48px' }}>
        {/* Section 1: Hero with Referral + Scrolling Gallery */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Referral Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-sm text-[var(--text-muted)] mb-4">
                  <Gift size={14} />
                  <span>100% Free Access</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
                  1,000 Meta Ad Templates
                </h1>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Drag-and-drop Canva templates from the world&apos;s biggest brands.
                  Completely free. No catch.
                </p>
              </motion.div>

              {/* Unlock Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-2xl border border-black/10"
                style={{ background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F7 100%)' }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                    {isUnlocked ? (
                      <Check size={24} className="text-white" />
                    ) : (
                      <Lock size={20} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">
                      {isUnlocked ? 'Access Unlocked!' : 'Unlock Full Access'}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {isUnlocked
                        ? 'You now have lifetime access to all 1,000 templates.'
                        : 'Refer 3 friends to get lifetime access to all templates.'}
                    </p>
                  </div>
                </div>

                {!isUnlocked && (
                  <>
                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[var(--text-secondary)]">Your progress</span>
                        <span className="text-sm font-bold text-[var(--text-primary)]">{referralCount}/{REQUIRED_REFERRALS}</span>
                      </div>
                      <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-black rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(referralCount / REQUIRED_REFERRALS) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">
                        You still need to refer <span className="font-bold text-[var(--text-primary)]">{referralsNeeded}</span> more {referralsNeeded === 1 ? 'person' : 'people'}.
                      </p>
                    </div>

                    {/* Referral Link */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Your unique referral link</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={referralLink}
                          readOnly
                          className="flex-1 px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[var(--text-primary)] font-mono"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="px-5 py-3 rounded-xl bg-black text-white font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Requirements Notice */}
                    <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-xs text-amber-800">
                        <strong>Important:</strong> Each referral must be from a different email address.
                        The platform is free, so share it with friends who will actually use it!
                      </p>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-6 pt-6 border-t border-black/10">
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-[var(--text-muted)]" />
                        <p className="text-sm text-[var(--text-muted)]">
                          Usually from a simple Reddit or X post, <span className="font-semibold text-[var(--text-primary)]">50-70 new users</span> sign up.
                          The platform is completely free, so the conversion rate is insane.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Right Side - Auto-scrolling Masonry Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[600px] overflow-hidden rounded-2xl"
            >
              {/* Top fade */}
              <div
                className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, white, transparent)' }}
              />

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, white, transparent)' }}
              />

              {/* Scrolling container */}
              <div
                ref={scrollRef}
                className="h-full"
                style={{ overflowY: 'scroll', scrollBehavior: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', padding: '4px' }}>
                  {duplicatedImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden"
                      style={{ aspectRatio: '1/1' }}
                    >
                      <Image
                        src={img}
                        alt={`Template ${idx + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
              How It Works
            </h2>
            <p className="text-[var(--text-muted)] max-w-lg mx-auto">
              1,000 ads from huge brands. Simply use the templates and within 20 seconds
              you have the same genius ad for your brand.
            </p>
          </motion.div>

          <div className="space-y-16">
            {TUTORIAL_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className={`flex items-center gap-12 ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Video */}
                <div className="flex-1">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-black">
                    <video
                      src={step.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Blurred Preview / CTA */}
        <section className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Blurred Grid Background */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '4px',
                padding: '4px',
                filter: 'blur(4px)'
              }}
            >
              {CREATIVE_IMAGES.slice(0, 30).map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={img}
                    alt=""
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Overlay */}
            <div
              className="relative z-10 py-20 px-8 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)' }}
            >
              <div className="max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                  {isUnlocked
                    ? 'You Have Full Access!'
                    : `Refer ${referralsNeeded} More ${referralsNeeded === 1 ? 'Friend' : 'Friends'}`}
                </h2>
                <p className="text-[var(--text-muted)] mb-8">
                  {isUnlocked
                    ? 'Enjoy lifetime access to all 1,000 Canva templates. Start creating winning ads today.'
                    : 'Get lifetime access to all 1,000 Canva templates. Professional ad designs from the world\'s biggest brands.'}
                </p>
                {isUnlocked ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
                    {TEMPLATE_PACKS.map((pack) => (
                      <a
                        key={pack.name}
                        href={pack.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors text-sm"
                      >
                        {pack.name}
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Link Copied!' : 'Copy Your Referral Link'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 4: Viral Posts - Always visible */}
        <section className="max-w-4xl mx-auto mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Ready-to-Post Examples
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Copy these viral posts to share on social media and get referrals
                </p>
              </div>

              {/* Platform Toggle */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg p-1 bg-black/5">
                  <button
                    onClick={() => setPostPlatform('reddit')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      postPlatform === 'reddit'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-black'
                    }`}
                  >
                    <MessageSquare size={16} />
                    Reddit / Facebook
                  </button>
                  <button
                    onClick={() => setPostPlatform('x')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      postPlatform === 'x'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-black'
                    }`}
                  >
                    <Twitter size={16} />
                    X / Twitter
                  </button>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-3">
                {(postPlatform === 'reddit' ? REDDIT_POSTS : X_POSTS).map((post, idx) => (
                  <div
                    key={idx}
                    className="border border-black/10 rounded-xl overflow-hidden bg-white"
                  >
                    {/* Post Header */}
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-black/[0.02] transition-colors"
                      onClick={() => setExpandedPost(expandedPost === idx ? null : idx)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[var(--text-muted)] bg-black/5 px-2 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                        <span className="font-medium text-sm text-[var(--text-primary)]">
                          {post.topic}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyPost(post.content, idx);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            copiedPostId === idx
                              ? 'bg-green-100 text-green-700'
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                        >
                          {copiedPostId === idx ? (
                            <>
                              <Check size={12} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              Copy
                            </>
                          )}
                        </button>
                        {expandedPost === idx ? (
                          <ChevronUp size={18} className="text-[var(--text-muted)]" />
                        ) : (
                          <ChevronDown size={18} className="text-[var(--text-muted)]" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedPost === idx && (
                      <div className="px-4 pb-4 border-t border-black/5">
                        <pre className="mt-3 text-sm text-[var(--text-secondary)] whitespace-pre-wrap font-sans leading-relaxed">
                          {post.content}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 rounded-xl bg-black/[0.02] border border-black/5">
                <p className="text-xs text-[var(--text-muted)] text-center">
                  <strong>Tip:</strong> Personalize these posts with your own story for better authenticity.
                  Post during peak hours (9-11am or 7-9pm) for maximum reach.
                </p>
              </div>
            </motion.div>
          </section>
      </div>
    </DashboardLayout>
  );
}
