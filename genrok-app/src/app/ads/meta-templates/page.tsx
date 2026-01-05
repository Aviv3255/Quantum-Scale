'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Copy, Check, Users, Lock, Gift, Sparkles, ExternalLink, MessageSquare, Twitter, ChevronDown, ChevronUp, X } from 'lucide-react';
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
  { topic: 'Just did the math on how much I spent on courses and I want to throw up', content: `Okay so I finally sat down and went through my credit card statements from the past two years. I knew it was bad but I didnt realize HOW bad until I saw the actual numbers staring back at me.

$2,400 on a Facebook ads "masterclass" that was basically just screen recordings of some guy clicking around ads manager while saying "trust the process" every five minutes. $997 on an email marketing course that taught me how to set up Klaviyo flows which literally has free tutorials on their own website. $1,500 on a product research course that was just a guy showing his winning products from 2021 that dont even work anymore. And dont even get me started on the $500 monthly mastermind I stayed in for 8 months because of sunk cost fallacy.

Thats over $9,000. On information. That I never properly used.

My buddy sent me this link last week [LINK] and I literally learned more practical stuff in one weekend than I did from that entire $2,400 course. Im not saying this to promote anything, Im saying this because Im genuinely angry at myself and maybe this helps someone else avoid being an idiot like me.

The worst part? My store still isnt profitable. Meanwhile the guy who sold me that course just posted another Lamborghini pic on Instagram. Wonder where he got the money for that.` },

  { topic: 'Wife found the receipts. This is my confession.', content: `Throwaway because she knows my main account.

We've been trying to save for a house for three years. She thinks we're behind because of inflation and stagnant wages. The truth is I've been secretly spending money on ecommerce courses hoping to build something that would let us buy that house outright.

It started with a $500 course. Then a $1,200 one because the first didnt work. Then I convinced myself that the $3,000 one would be the one that finally cracked the code. You see where this is going.

Last night she found an old credit card statement I forgot to hide. $847 charge from some guru's website. She asked what it was.

I told her everything. Every course. Every failed store. Every secret purchase over the past 18 months. Total damage: somewhere around $7,000.

She didnt yell. She just cried. That was worse.

This morning I found a free resource [LINK] that honestly has more actionable information than any course I bought. I built a new store today using their templates. Its not about the money anymore, its about proving to her and myself that I can actually do this without throwing more cash at gurus.

If youre reading this and youre hiding purchases from your partner, please stop. The shame spiral only gets worse. And apparently the information is free if you know where to look.` },

  { topic: 'I interviewed 3 people making $50k+/month. None of them bought courses.', content: `So I run this small Discord server for ecommerce people and we did this thing where successful members shared their stories. I was honestly expecting to hear about which courses helped them scale. Instead I got a reality check.

First guy, does $62k/month selling pet products. Never bought a course. Learned everything from YouTube, trial and error, and free resources. Took him 14 months to hit $10k/month, then scaled from there.

Second person, woman doing $53k/month in the beauty niche. Same story. Said she almost bought a $2k course once but chickened out. Ended up just figuring it out herself with free content.

Third guy was the most interesting. He actually DID buy courses early on. Spent around $4k total. Said they were "fine but not worth it" and that he learned way more from free stuff later. He specifically mentioned some platform [LINK] that he said had better organized content than what he paid for.

The pattern was clear: success came from DOING, not from buying more information. Every single one of them said their breakthrough came when they stopped consuming and started testing.

Im posting this because I see people asking which course to buy every single day in this sub. The answer might be none of them.` },

  { topic: 'The exact moment I realized the course industry is a scam', content: `So Im in this $200/month mastermind group right. Been in it for about 6 months. Yesterday the guru running it did a Q&A and someone asked about his actual ecommerce revenue.

He dodged the question at first. Talked about "multiple income streams" and "diversification". Someone pressed him. He finally admitted that his COURSE sales are his main income. His actual ecommerce stores? He hasnt run one actively in over two years.

Let that sink in. The guy teaching us how to run ecommerce businesses hasnt run one since 2022. His entire income comes from selling the DREAM of ecommerce success.

I immediately cancelled my membership. Then I spent the rest of the night going down a rabbit hole looking for actual resources from people who still practice what they preach.

Found a few good YouTube channels. Found a free platform someone mentioned on Twitter [LINK] that actually shows current strategies. Started rebuilding my store using methods that apparently work in 2024, not 2021.

The whole experience made me realize something: if someone's making more money teaching than doing, their incentives are completely misaligned with yours. They dont need you to succeed. They just need you to keep paying.

Question every guru. Check if they still do what they teach. Most of them dont.` },

  { topic: 'My accountant asked why I have $11k in "education expenses"', content: `Tax season is fun when you have to explain to a professional why you spent more on courses than on actual business expenses.

He literally laughed. Not in a mean way, more like a sad knowing laugh. Said he sees this all the time with people trying to start online businesses. Everyone thinks theres some secret information they need to unlock first.

His advice? "Spend money on things that directly generate revenue. Education should be free in 2024."

He wasnt wrong. I went home and actually googled "free ecommerce resources" for the first time instead of searching for the "best ecommerce course". Found several decent options including this one [LINK] that had pretty much everything I learned in my expensive courses, organized better.

The kicker? My accountant said his most successful small business clients are the ones who spent the LEAST on courses and the MOST on actual business operations. Ads, inventory, tools. Not gurus telling them what to do.

Felt like an idiot but also felt free. No more courses. Using that budget for ad testing now. Will report back in a few months.` },

  { topic: 'Day 47 of only using free resources. Results inside.', content: `Alright so I made a post about 6 weeks ago saying I was going to stop buying courses cold turkey and only use free resources. A few people asked for updates so here we go.

Background: I had previously spent around $5k on various courses over 2 years with nothing to show for it. Store was barely making sales. I was convinced I needed MORE information.

What I did instead: Found free resources. Main ones I used were YouTube tutorials from actual practitioners not gurus, Reddit advice from people actually in the trenches, and this one platform someone recommended [LINK] that had really solid templates and calculators.

Results after 47 days:
- Launched new store from scratch using free methods
- $3,400 in revenue so far
- About $900 in profit after ad spend and COGS
- Actually understand what Im doing instead of blindly following guru advice

Its not life changing money yet but its MORE than I made in 2 years of course buying. And I spent $0 on education this time.

The difference I think is that free resources tend to be more practical and current. Paid courses have this incentive to pad things out, make it seem more complex than it is, justify the price tag. Free stuff just tells you what to do.

I'll keep updating if people are interested. But honestly just wanted to say: try going free-only for a few months. You might be surprised.` },

  { topic: 'To everyone asking "which course should I buy" - read this first', content: `I see this question posted here multiple times per day and I want to share some perspective from someone whos been in this space for 4 years.

I have bought courses. Plural. Many of them. Probably close to 10 different programs totaling somewhere around $8,000. Some were okay. Most were disappointing. All of them taught information I later found available for free.

The dirty secret of this industry is that theres no secret. Product research is product research. Facebook ads work the same way whether a guru teaches you or a YouTube video does. Email marketing principles havent changed in years.

What courses ACTUALLY sell you is:
1. Organization of freely available info
2. A sense of community (often disappointing)
3. The FEELING of taking action without actually taking action

If you absolutely feel like you need structure, fine. But please exhaust free options first. Theres literally a platform [LINK] that organizes everything major courses teach. For free. With no upsells.

I wish someone had told me this when I started. Instead I spent thousands on information I could have gotten elsewhere. The opportunity cost of that money not going into ads or inventory probably set me back years.

Stop asking which course to buy. Start asking how you can learn for free. The answer is easier than you think.` },

  { topic: 'Rant: Why do we normalize spending thousands before making a single sale?', content: `This might get downvoted but whatever, I need to say it.

Every single day I see beginners on here with ZERO sales asking about which $1,000+ course to buy. And people actually recommend them specific courses! Like its totally normal to spend your rent money on digital education before youve proven the business model works.

In what other industry do we do this? Nobody tells a first time restaurant owner to spend $5k on a cooking course before theyve served their first customer. Nobody tells a freelance writer to buy a $2k writing masterclass before landing their first client.

But in ecommerce? Oh you DEFINITELY need to buy the course first. You DEFINITELY need the inner circle access. You DEFINITELY cant figure this out with free resources and trial and error.

Its insane. And its designed to be that way. The course sellers have successfully convinced everyone that paid education is a prerequisite. Its not.

I learned everything I know for free. YouTube videos. Reddit posts. Free platforms like [LINK]. Am I a millionaire? No. But I make a consistent $6-8k/month and I didnt pay a single guru to get here.

If youre new: please try free first. Give it 6 months of genuine effort with free resources before you spend a dime on courses. You might realize you never needed them.` },

  { topic: 'The $997 course I bought literally just linked to free YouTube videos', content: `I have to share this because I still cant believe it actually happened.

Bought a course last month. $997. Promised to teach Facebook ads from beginner to advanced. Reviews looked legit. Guru had testimonials and everything.

Got access. Started going through the modules. First few videos were okay, basic stuff. Then I noticed something weird. Some of the "lessons" were just talking about concepts without actually showing anything.

Module 4 was when it got ridiculous. The video was literally the guru saying "for this part, I recommend watching this tutorial" and then LINKING TO A FREE YOUTUBE VIDEO. A 40 minute YouTube video that anyone could find by searching "Facebook ads tutorial".

Multiple modules did this. Hed introduce a topic, talk about it for 5 minutes, then link to external free content.

I paid nearly $1,000 to be linked to YouTube videos I could have found myself.

Requested a refund. Got denied because I had "accessed more than 25% of the content." Which I had to do to realize it was garbage.

After that experience I found some free resources that are honestly better organized [LINK] and actually have original content.

Lesson learned: always search for free alternatives first. Always check refund policies. Never trust testimonials.` },

  { topic: 'Just cancelled my $400/month mentorship. Here is what happened.', content: `For the past 7 months I was paying $400 every month for "direct access" to a successful ecommerce entrepreneur. Personal mentorship. Weekly calls. Discord access. The whole thing.

Total spent: $2,800

What I actually got:
- Group calls, not personal calls. There were like 30 people on each call.
- Generic advice that applied to everyone and no one specifically
- Discord access where the mentor barely participated
- Templates that were honestly not that different from free ones available online

The final straw was last week when I asked a specific question about my store and he gave me advice that I later found VERBATIM on a free YouTube video. He was literally regurgitating content he didnt even create.

I cancelled yesterday. Felt like a weight lifted.

Spent today finding free alternatives. Someone in another sub mentioned [LINK] and honestly the templates there are comparable to what I was paying for. The calculators might actually be better.

Im not saying all mentorship is bad. But verify what youre getting is actually personalized and valuable. A lot of it is just expensive packaging around freely available information.

$2,800 lesson learned. At least I can put that monthly $400 into ads now.` },

  { topic: 'Update: 6 months after quitting courses cold turkey', content: `Posted here back in June about how I was done with courses after spending probably $6k total over three years with nothing to show for it. People asked me to update so here it is.

What I did for 6 months:
- Zero spending on courses or paid education
- Used only free resources: YouTube, Reddit communities, one platform someone recommended [LINK] that had good organized content
- Focused that money on actual business expenses instead

Results:
- Current store does about $12k/month revenue
- Profit margin around 25% after everything
- Thats roughly $3k/month profit
- More importantly I actually UNDERSTAND what Im doing now

The weird thing is I feel like I learned MORE in these 6 months than in 3 years of course buying. I think its because free resources tend to be more direct and practical. Courses pad things out to justify the price. They make simple things seem complex so you feel like youre getting value.

My advice to anyone thinking about buying a course: give yourself a 90 day challenge using only free resources first. Really commit to it. Actually DO the things instead of just consuming information.

You might discover you never needed to pay in the first place.` },

  { topic: 'The uncomfortable conversation I had with a "guru" at an event', content: `So I went to this ecommerce conference last weekend. Mostly networking, some okay speakers, typical stuff.

During a break I ended up next to one of the course sellers who was speaking. Nice guy honestly. We started chatting and I asked him straight up: "If you could start over today, would you buy your own course?"

He laughed nervously. Then he actually answered honestly.

He said probably not. Said most of the information is available free now. Said his course is really about "accountability and community" more than the actual information.

I pushed a little. Asked if thats worth $1,500 to him.

He paused. Then said "for some people, maybe. Others could probably figure it out for free."

I appreciated his honesty but it also made me realize the game. These guys KNOW their information isnt unique. They KNOW free alternatives exist. They just bet that people will pay for packaging and convenience.

After that conversation I did some digging. Found free resources that cover everything his course does. One platform [LINK] basically has the same curriculum but organized differently and free.

Not saying all courses are scams. But that conversation confirmed what I suspected: youre mostly paying for presentation, not information.` },

  { topic: 'My $4,500 course creator just got exposed. I want a refund.', content: `This is happening in real time and I dont know what to do.

So theres this guru I bought a course from about 8 months ago. $4,500. Promised proven strategies, case studies from his own stores, the whole thing.

Yesterday someone posted proof that his "case studies" were fake. The stores he showed screenshots from? They were either other peoples stores or edited screenshots. His supposed $500k months? Couldnt be verified and now look clearly manipulated.

The Discord is going crazy. People are demanding refunds. Hes gone silent. Payment processors are getting involved.

Im sick to my stomach. $4,500 is a lot of money for me. That was supposed to be my ad budget for Q4.

The kicker is everything he taught could probably be found free anyway. I just verified this by checking some resources people posted as alternatives [LINK]. Same strategies. Same concepts. No fake screenshots needed.

Im not sure what my legal options are. Has anyone dealt with something like this? How do I get my money back from a potentially fraudulent course?

And if youre reading this thinking about buying from ANY guru: demand verified proof. Ask for revenue screenshots with identifiable info. Most of them wont provide it because they cant.` },

  { topic: 'Comparing my $3k course notes to free resources. Theyre basically identical.', content: `Okay so I spent the entire weekend doing something that made me feel really dumb.

I took my notes from the $3,000 course I bought last year. Detailed notes. Every major concept, strategy, and tactic. Probably 30 pages worth.

Then I searched for each concept using free resources. YouTube. Blog posts. Reddit threads. And specifically this one platform someone mentioned a while back [LINK].

The result? About 90% of my course notes can be found for free. Almost everything. Product research methods? Free on YouTube. Ad creative strategies? Free tutorials everywhere. Email marketing flows? The platforms themselves teach this.

The 10% that seemed somewhat unique? Honestly not that valuable in hindsight. Fancy sounding but not actually practical.

So what did I pay $3,000 for? Organization. Someone put the free information in a sequence and charged me for it.

I dont know if this makes me angry or just sad. I worked hard for that money. I could have spent it on inventory or ads or literally anything that would have moved my business forward.

If youre considering a course, do this exercise first: take the curriculum and search each topic. Bet you find most of it free. Save yourself thousands.` },

  { topic: 'Why I stopped recommending courses to beginners', content: `I used to be that guy who would recommend courses when people asked. Figured I was being helpful pointing them to structured education.

Then I started paying attention to the outcomes.

In the past year I have personally recommended courses to maybe 10-12 people who asked me. Followed up with all of them recently.

Results:
- 0 of them have profitable stores
- 3 of them never even finished the course
- 2 of them bought ADDITIONAL courses after the first one didnt work
- Most of them spent more on courses than on their actual business

Compare that to a few people I pointed toward free resources instead:
- 2 out of 4 have stores doing at least a few thousand per month
- They actually launched faster because they werent stuck in consumption mode

The difference is striking. Course buyers seem to get stuck in a loop. They buy information, feel like they accomplished something, dont implement, buy more information.

Free resource users seem to implement faster. Maybe because theres no sunk cost making them feel like they need to "get their moneys worth" by watching every video first.

Now when people ask me for course recommendations I just send them to free resources [LINK]. Better outcomes. No financial barrier to starting.` },

  { topic: 'Be honest: has a course ever actually been the reason you succeeded?', content: `Genuine question for people who have actually built profitable stores: did a paid course actually make the difference? Or would you have figured it out anyway?

Im asking because I just had an interesting conversation with someone doing $30k/month. I asked about his education path. He mentioned he bought a course early on but admitted he didnt really use most of it. His actual breakthroughs came from testing and YouTube tutorials.

Then I talked to someone doing about $15k/month. Similar story. Bought a course, thought it was "fine", but credits most of her learning to free resources and just doing the thing.

Im starting to wonder if courses are just expensive comfort blankets. They make you feel prepared without actually preparing you.

Meanwhile the people actually succeeding seem to have figured it out through free resources and experimentation.

I recently found some free platforms [LINK] that cover everything major courses teach. Looking at the curriculum versus my paid course notes, its honestly comparable.

What has been your experience? Did a paid course actually move the needle for you? Or was it something else?` },

  { topic: 'I audited my last 2 years. Heres exactly where the money went.', content: `Did something slightly painful this week. Went through every single expense related to my ecommerce "education" over the past two years.

The numbers:

Courses: $4,200
Masterminds/coaching: $1,800
Tools with educational components: $600
Books (only counting business ones): $300
Conferences: $500

Total: $7,400

Revenue from my stores in those two years: roughly $22,000
Profit: maybe $3,500

So I spent more than double my profit on learning how to make that profit. The math is embarrassing.

But heres the really painful part. I recently started over with a new store using entirely free resources. Found some organized free content [LINK], used YouTube for specific tactics, asked questions in free Discord communities.

That store made $1,800 profit in its first 6 weeks. Approaching what took me 2 years the old way. Education cost this time: $0.

I cant prove causation but the correlation is hard to ignore. Maybe when you dont have the crutch of "Im still learning", you actually start doing.

Track your education spending. You might be surprised how much is going out versus what youre getting back.` },

  { topic: 'The real reason course gurus push "mindset" content', content: `Had a realization about why so many courses have hours of mindset content and relatively little practical strategy.

Just went through a course library I bought access to. Sorted by video length.

Top 10 longest videos:
- Believing in yourself (47 mins)
- Overcoming fear of failure (39 mins)
- Morning routines of successful entrepreneurs (36 mins)
- Visualization techniques (33 mins)
- How to stay motivated (31 mins)

Product research video: 12 minutes
Facebook ads setup: 18 minutes
Email marketing: 15 minutes

See the pattern? The soft fluffy content is LONG. The actually useful tactical content is SHORT.

Why? Because tactical content is hard to differentiate. Anyone can teach you how to set up a Facebook ad. But not everyone can make you FEEL inspired for 47 minutes.

Courses are products. The longer they feel, the more valuable they seem. Mindset content is easy to produce and makes courses feel comprehensive.

Meanwhile free resources tend to be pure tactics. Someone on YouTube isnt trying to justify a $2k price tag. They just show you how to do the thing.

Found some free resources recently [LINK] that are basically all tactics, no fluff. Refreshing compared to courses where half the content is basically podcast material.

Stop paying for motivation. Its free everywhere. Pay for tactics if you must, but honestly those are free too.` },

  { topic: 'Honest question: has anyone actually gotten a course refund?', content: `Asking because Im trying to get one and its a nightmare.

Bought a course 3 weeks ago. $1,200. Realized pretty quickly that the content is outdated and the tactics dont work in current year. Strategy relies on stuff that Facebook changed like 18 months ago.

Requested refund citing outdated content. Got a response saying I accessed more than their threshold so Im not eligible. The threshold is 20% and you basically hit that in the first module just looking around.

Now theyre ignoring my emails.

Has anyone successfully gotten a course refund? What worked for you? Credit card chargeback? Threats of reviews? Actual legal action?

The frustrating thing is I found free resources after the fact [LINK] that have more current strategies. Could have used that money for actual business expenses.

Also if youre thinking about buying any course: READ THE REFUND POLICY CAREFULLY. Most of them are designed to be basically impossible to use. Low thresholds, short windows, vague terms.

This industry really is designed to extract money while providing minimal recourse when the product sucks.` },

  { topic: 'What I tell my friends when they say they want to start dropshipping', content: `Three friends have come to me in the last few months saying they want to start dropshipping after seeing stuff on TikTok or YouTube.

My standard response now:

"Cool, dont buy any courses. Use free resources for at least 3 months before spending money on education. The information is the same. Here are some links."

Then I send them to:
- A few specific YouTube channels from actual practitioners
- This subreddit for questions
- Free organized platforms like [LINK]
- Some Discord communities with helpful people

Every single one of them has been surprised that free alternatives exist. The YouTube and TikTok algorithm has convinced them that courses are required.

Two of them actually launched stores. One is doing about $2k/month already. Neither spent money on courses.

The third one ignored my advice, bought a $1,500 course, and still hasnt launched. Says hes "still going through the material." That was 4 months ago.

The pattern is consistent. Course buyers consume. Free resource users build. Not always, but often enough that I notice it.

Save your friends from the course trap. The information is free. What costs money is implementation.` },

  { topic: 'Exposed: how course creators fake their income screenshots', content: `Okay this might ruffle some feathers but people need to know this.

I used to work in digital marketing for a company that helped course creators with their launches. I know how the sausage gets made.

Those income screenshots? Often manipulated. Sometimes the numbers are real but from a different business. Sometimes theyre just edited. Revenue screenshots specifically are often just gross revenue, not profit.

The "student testimonials"? Sometimes paid. Sometimes incentivized with bonuses or affiliate commissions. Sometimes just straight up actors.

The "limited spots available"? Almost never real. Urgency is manufactured.

The "price going up soon"? Sometimes real, usually not.

I left that industry because it felt gross. Now Im building my own thing using free resources like [LINK] and Reddit communities.

My point is: be skeptical of everything you see promoting courses. The entire industry is built on manufactured social proof. The courses that need aggressive marketing are usually the ones with questionable value.

Real value spreads through word of mouth. The good free resources I use? Found them from genuine recommendations, not from aggressive funnels.

Question everything. Verify claims. Most importantly, remember that free alternatives exist for almost everything being sold.` },

  { topic: 'I interviewed my supplier about courses. His answer was eye-opening.', content: `So I have a pretty good relationship with one of my main suppliers in China. Weve been working together for about a year. Guy speaks decent English and weve had some interesting conversations.

Last week I asked him: do Chinese suppliers ever buy courses on how to work with Western dropshippers?

He laughed. Said no. Said they learn by doing. By talking to customers. By watching what sells.

Then he asked me why Western entrepreneurs buy so many courses. Said his other dropshipping customers talk about courses all the time but the most successful ones never mention them.

That hit different.

These suppliers work with hundreds of dropshippers. They see who succeeds and who fails. And theyre noticing that course-buyers arent the successful ones.

He specifically said the customers who ask the most basic questions and then just TRY things tend to do better than the ones who seem like they "know everything" from courses but never take action.

Made me rethink my whole approach. Stopped looking for more courses. Started looking for free practical resources [LINK] and just implementing faster.

Sometimes outside perspective cuts through the BS.` },

  { topic: 'The math that made me quit buying courses forever', content: `Simple exercise that changed my perspective completely.

I wrote down every course I ever bought and what it cost. Total: around $6,000 over three years.

Then I wrote down what I would have done with that money if I spent it on actual business expenses:
- $6,000 in Facebook ads at my current CPM = roughly 600,000 impressions
- $6,000 in inventory = enough to test probably 20+ products properly
- $6,000 in better tooling = could have afforded premium Shopify, better apps, etc.

Then I asked myself: would $6,000 in ads have taught me more about ads than any course? Almost certainly yes. Real data beats theory every time.

Would testing 20 products have taught me more about product selection than any course? Definitely yes. You learn way more from failure than from watching someone explain their successes.

Courses feel like progress. But theyre actually progress avoidance. Youre buying the feeling of moving forward without the risk of actually moving forward.

Since realizing this Ive spent $0 on courses. Use free resources only [LINK]. Put all money into the actual business.

Results: way better than when I was course-hopping.

Do the math on your own education spending. Compare it to what that money could have done in your actual business. The answer might surprise you.` },

  { topic: 'Day 1 vs Day 365: What actually changed', content: `A year ago today I was obsessed with finding the "perfect course" before starting. Thought I needed more information before I could take action.

Today I have a store doing consistent $8-10k months. Heres what actually changed:

What I THOUGHT I needed a year ago:
- The right course ($1,000-3,000)
- A mentor ($500/month)
- Premium tools ($200/month)
- Complete knowledge before starting

What I ACTUALLY needed:
- Free resources to get started [LINK]
- Willingness to look stupid and fail publicly
- $500 to test my first products
- 2-3 hours per day of actual work

The gap between these two lists cost me months of paralysis and thousands of dollars.

If youre where I was a year ago, stuck in research mode, afraid to start until you have "enough" knowledge: you already have enough. The learning happens WHILE doing, not before doing.

Every successful person I talk to says the same thing. They figured it out by doing, not by preparing to do.

Just start. Use free resources. Fail fast. Iterate. The courses and mentors will always be there if you truly need them later (you probably wont).` },

  { topic: 'Accidentally found out my "mentor" uses freelancers for his stores', content: `This one stings.

Been paying $300/month for "mentorship" from a guy who claims to run multiple 7-figure stores. Showed screenshots, case studies, the whole thing.

Last week I was hiring a freelancer on Upwork for some product research help. Found a profile that looked familiar. Clicked through. This freelancers client list included MY MENTORS BRAND NAME.

Dug deeper. Found more freelancers who have worked with him. Designers, virtual assistants, ad managers.

Which would be fine except... his entire selling point is that HE runs these stores. His course is about HIS methods. His mentorship is supposedly access to HIS expertise.

But hes outsourced everything. The "strategies" hes teaching might not even be his. The stores are basically run by freelancers while he focuses on selling courses and mentorship.

Confronted him about it. He got defensive, said "delegation is part of scaling" and that I was "missing the point."

Maybe. Or maybe Im paying $300/month to learn from someone who doesnt actually do the work anymore.

Cancelled immediately. Found better free resources [LINK] from people who seem to still be in the trenches.

Verify your mentors actually do what they teach. Many of them dont.` },

  { topic: 'Why the "price going up tomorrow" tactic should be a red flag', content: `If you spend any time around course marketing youve seen this:

"Price going up at midnight!"
"Last chance at this rate!"
"Investing in myself before the price increase!"

I used to fall for this constantly. Bought at least 3 courses I wasnt even sure I wanted just because of artificial urgency.

Then I started paying attention. Same course, same "prices going up" email, several times per year. The price occasionally does go up. Then theres a "sale" back to the old price. Rinse repeat.

Its manufactured urgency. And its a red flag.

Good products dont need aggressive urgency tactics. They sell on actual value. Free resources definitely dont need urgency - theyre just available whenever.

Now when I see "price going up" I immediately close the tab. Its a signal that the creator is more focused on marketing psychology than on actual value.

Instead I look for resources that are just... available. No countdown timers. No scarcity games. Just good information.

Found several like this [LINK]. Surprisingly most of the non-manipulative resources are free.

The course industry runs on psychological manipulation. Recognizing it is the first step to avoiding it.` },

  { topic: 'I teach ecommerce on YouTube. Heres why I dont sell a course.', content: `Posting this on a throwaway because I dont want to self promote but I think this perspective might help.

I have a YouTube channel about ecommerce. Pretty decent size. Get approached almost weekly by people wanting to help me create and sell a course.

Always say no. Heres why:

I know what courses require to be profitable. High prices. Aggressive marketing. Constant upsells. Pressure tactics. Thats just how the economics work.

But the information I teach? Its not worth $997 or $1,997 or whatever. Its worth... maybe $0. Because its freely available. Im just organizing it and adding my perspective.

Creating a course would force me to either overcharge for basic information OR create artificial complexity to justify the price. Neither feels good.

Instead I just make free content. Recommend other free resources when people ask [LINK]. Make money through ads and affiliates which feels more honest somehow.

Not saying everyone selling courses is evil. But the economics push them toward certain behaviors. The incentives are weird.

When someone is giving you free information, their only incentive is to be actually helpful. When someone is selling you something, they have multiple incentives and helpfulness is only one of them.

Something to think about when deciding where to learn.` },

  { topic: 'My therapist asked about my course spending. That was the wake up call.', content: `Okay this is weird to post but maybe it helps someone.

Ive been seeing a therapist for general anxiety stuff. Last session she asked about my finances as part of understanding stress triggers. I mentioned my side business.

She asked how much Id invested. I mentioned the actual business costs. Then she asked about education. I started listing courses.

Her eyebrows went up. She asked if I thought this spending pattern was healthy. I got defensive at first. But then she helped me see it.

Course buying was a coping mechanism. Each purchase gave me a dopamine hit. Felt like progress without risk. Avoided the scary part (actually doing things) while feeling productive.

She called it "productive procrastination." Spending money to feel like Im working without actually working.

That conversation was 3 months ago. Havent bought a course since. Use free resources now [LINK]. Actually build things instead of preparing to build things.

My anxiety is actually lower now. The pressure of needing to "get my moneys worth" from expensive courses was adding stress. Free resources have no such pressure.

If youre buying course after course and still not implementing, maybe ask yourself why. The answer might not be "I need more information."` },

  { topic: 'Breakdown: Why most $2000 courses are worth $200', content: `Actually sat down and analyzed a few courses Ive bought to understand the value breakdown.

Take a typical $2,000 ecommerce course:

Content hours: usually 10-20 hours of video
Unique information: maybe 10-20% (rest available free)
Templates/tools: often basic, reproducible in an afternoon
Community: usually dead after a few months
Updates: rare or nonexistent

If I hired someone on Upwork to create original educational content at $50/hour, 20 hours would cost $1,000. But most courses are 80% non-original content, so the actual original value is maybe $200.

The templates? Could hire a VA to create similar ones for $100.

The community? Free communities exist that are often more active.

So a $2,000 course has maybe $300 worth of actual original value. The other $1,700 is marketing costs, profit margin, and paying for your feeling of having access to something "exclusive."

Once I did this math I couldnt unsee it.

Now I use free resources [LINK] and only pay for genuinely unique services. Save thousands.

Do your own value breakdown before buying any course. Strip away the marketing. What are you ACTUALLY getting?` },

  { topic: 'Success stories: How 5 random redditors built $10k+/month stores with $0 education', content: `Did a thing where I reached out to people in various ecommerce subs who mentioned doing $10k+ months. Asked if theyd share their education background.

Got 5 detailed responses. Anonymous here but all verified their numbers.

Person 1: $14k/month. Zero courses. Learned from YouTube and trial and error. Took 11 months.

Person 2: $10k/month. Bought one course for $500 early on. Says he didnt really use it. Credits free resources.

Person 3: $23k/month. No courses. Used free platforms [LINK] and Reddit. Took 8 months to hit 10k.

Person 4: $11k/month. Spent about $2k on courses. Says they were "fine" but could have learned it all free.

Person 5: $18k/month. No courses. Learned everything from practicing and asking questions in free communities.

Sample size is small. But the pattern is interesting. Success doesnt seem to correlate with course spending.

What DOES seem to correlate: time spent actually doing things. All 5 mentioned how much they tested, failed, and iterated.

Maybe thats the real lesson. Money spent on education isnt the differentiator. Time spent on execution is.` },

  { topic: 'The course that broke me (and why Im grateful now)', content: `Bought a course 2 years ago. $3,500. Biggest single purchase of my life at the time.

It was fine. Content was decent. But it wasnt worth $3,500. It was worth maybe a few hundred for the time it saved organizing information.

I was devastated. Felt scammed even though technically I got what was advertised. Just thought "what was advertised" would be more valuable.

For a while this made me bitter about the whole ecommerce space. Felt like everything was a scam.

But eventually it was the best thing that happened to me.

That experience made me allergic to paying for information. Started hunting obsessively for free alternatives. Found incredible resources [LINK]. Found communities of people who actually help each other without upselling.

Made me a better critical thinker. Now I question every claim, verify every screenshot, research every guru.

Most importantly, made me actually DO things instead of buying more preparation.

My store is now profitable. Built on free resources and lots of failure. That $3,500 mistake was expensive tuition for a valuable lesson.

If youve been burned by courses, dont get bitter. Get better. The free alternatives are out there.` },

  { topic: 'Real talk: What actually happens in most "exclusive masterminds"', content: `Spent 6 months in a $500/month mastermind. Let me tell you what actually happens in these things.

The pitch: exclusive access to high level entrepreneurs, personalized advice, accountability, networking with others at your level.

The reality:

"Exclusive access" = Group calls with 30-50 people where you maybe get to ask one question if youre lucky.

"Personalized advice" = Generic responses that apply to everyone. "Have you tried testing more creatives?" level insights.

"Accountability" = Nobody actually checks in on you. The accountability is you paying monthly and not wanting to waste it.

"Networking" = A Discord server where most people are lurkers and the few who post are mostly complaining or asking basic questions.

I lasted 6 months because of sunk cost. Every month I thought "this month Ill get value from it."

When I finally cancelled I felt relief. Found free communities that were honestly more helpful [LINK]. Actual practitioners sharing real insights without gatekeeping.

Masterminds CAN be valuable. But most of them are just expensive Discord servers with occasional group calls. Verify what youre actually getting before committing to monthly fees.` },

  { topic: 'My supplier taught me more than any course', content: `Weird realization I had recently.

Ive been working with a supplier for about 8 months now. We chat regularly. He gives me feedback on product selection, pricing, packaging, all sorts of stuff.

Yesterday I realized: Ive learned more from him than from any course I ever bought.

He tells me:
- What products are actually selling right now (real data, not guru guesses)
- What packaging gets good unboxing experiences
- How to negotiate better terms as volume increases
- What other successful dropshippers are doing differently

This is practical, current, actionable information. From someone with direct incentive for me to succeed (he makes more money when I order more).

Compare to courses:
- Often outdated information
- Theoretical not practical
- No incentive alignment (they got paid whether I succeed or not)

Building relationships with suppliers, manufacturers, other practitioners... this seems way more valuable than buying packaged information.

For everyone starting out: yes use free resources to learn basics [LINK]. But then focus on building real relationships in the industry. Those connections teach more than any course.` },

  { topic: 'Unpopular opinion: Most people fail because of courses not despite them', content: `Hot take but hear me out.

The standard narrative: people fail at ecommerce because they didnt learn enough, didnt buy the right course, didnt find the secret sauce.

My counter-theory: many people fail BECAUSE of courses.

Heres why:

Courses create false confidence. You watch the videos, feel like you know stuff, then get crushed by reality.

Courses create financial pressure. You spent thousands so you feel pressure to make it back quickly. This leads to bad decisions.

Courses create consumption addiction. The habit of learning replaces the habit of doing. You keep buying courses instead of building stores.

Courses teach outdated tactics. By the time something is in a course its often already saturated or changed.

Courses attract the wrong mindset. People looking for shortcuts and secrets instead of people willing to do the work.

The most successful ecommerce people I know either never bought courses or barely used the ones they bought.

They learned by DOING. By failing. By iterating.

Free resources [LINK] and just starting seems to work better than expensive education and endless preparation.

Maybe the best thing you can do for your ecommerce journey is commit to never buying a course.` },

  { topic: 'Why I refund every student who asks (and why other course creators hate me)', content: `I run a very small paid community. $50/month. More of a support group than a course.

My policy: anyone can get a full refund, any time, no questions asked. Even months in.

Other course creators think Im insane. They say people will abuse it. That Ill lose money.

Heres the thing: almost no one asks for refunds. Maybe 5% ever. And those 5%? They probably werent getting value anyway, so why should they pay?

But more importantly: this policy forces me to actually provide value EVERY MONTH. I cant coast on past content or rely on people forgetting to cancel. I have to keep delivering.

Compare to courses with "no refund after 24 hours" or similar policies. What incentive do they have to make the content actually good once theyve made the sale?

If a course creator wont give you a refund, ask yourself why. Usually its because they know the value doesnt match the price.

For those who prefer free: there are genuinely free alternatives [LINK] with no money at risk.

The refund policy tells you a lot about how confident someone is in their product.` },

  { topic: 'I tracked my hourly rate learning from courses vs free resources', content: `Did an interesting experiment over 6 months.

Tracked time spent learning from paid courses versus free resources. Then tracked what actionable insights came from each.

Results were stark.

Paid courses (total spend: $1,800):
- Hours spent: 47 hours
- Actionable insights: 12
- Cost per insight: $150
- Insight quality: mostly generic/obvious

Free resources [LINK] and YouTube:
- Hours spent: 31 hours
- Actionable insights: 23
- Cost per insight: $0
- Insight quality: mix of basic and genuinely useful

So free resources gave me nearly 2x the insights in 66% of the time at $0 cost.

Why the difference?

I think paid courses optimize for WATCH TIME not insight density. They need to feel worth the money so they pad content.

Free resources have no such incentive. A 10-minute YouTube video can give one solid insight and thats fine. A $2,000 course with 10 minutes of content would feel like a ripoff.

Track your own learning. You might find youre paying a lot for low-density information when high-density alternatives exist for free.` },

  { topic: 'Beware the "free training" to paid course pipeline', content: `This is so common now that I feel like everyone should know about it.

Guru announces "free training webinar" or "free masterclass." You sign up thinking youre getting actual free value.

What you actually get:
- 10-15 minutes of generic information you could find anywhere
- 30-45 minutes of selling a paid course
- Artificial urgency and scarcity ("only X spots")
- Emotional manipulation and success stories

These "free trainings" are not free education. Theyre sales presentations disguised as education.

I wasted hours on these before I realized the pattern. Now I immediately close any webinar that starts selling within the first 15 minutes.

If you want actually free education, look for resources with no upsell attached [LINK]. Content that exists just to be helpful, not as a funnel to something paid.

The gurus know that "free" is a powerful word. They use it to get you in the door then slam you with high-pressure sales tactics.

True free resources dont need webinars. They just exist and help people.` },

  { topic: 'Month 3 of zero paid education. Numbers and observations.', content: `Following up on my commitment to use only free resources for my ecommerce learning.

Month 3 update:

What I used:
- YouTube tutorials from actual practitioners (not gurus with courses to sell)
- Reddit communities for specific questions
- Free organized platform [LINK] for structure
- Discord servers with other beginners

What I spent on education: $0

What I spent on actual business: $2,100 (ads, inventory, tools)

Results: $4,800 revenue, roughly $1,200 profit

Observations:

The free resources I found are honestly better than courses I paid for previously. More current. More practical. Less fluff.

Learning while doing is incredibly effective. Every lesson has immediate application.

The money I didnt spend on courses went directly into testing. More tests = faster learning.

My stress level is lower. No pressure to "get my moneys worth" from expensive programs.

Only downside: requires more curation effort. Have to filter through some bad free content. But thats a small price for thousands in savings.

Will continue updating. But so far: free education + more capital for actual business = better results than expensive courses + less capital for business.` },

  { topic: 'Asked an AI to compare a $2000 course to free resources. Results were telling.', content: `Did something interesting today.

Took the curriculum outline from a $2,000 course I was considering. Fed it to ChatGPT along with outlines from free resources I found [LINK] and a few YouTube playlists.

Asked it to compare:
- Topic coverage
- Depth of information
- Practical applicability
- Currency of information

The AI analysis:

Topic coverage: roughly equal. Free resources actually covered MORE topics.

Depth: paid course had slightly more depth in some areas but padded with "mindset" content that free resources skip.

Practical applicability: free resources rated higher because they were more recent.

Currency: free resources were generally more up to date. Paid course had tactics from 2022.

Now obviously AI analysis has limitations. But it was interesting to see an objective comparison without the marketing and emotion.

The $2,000 course didnt offer much that free alternatives dont provide. It mainly offers packaging and the feeling of having invested in something.

Try this exercise before your next course purchase. You might talk yourself out of it.` },

  { topic: 'The one thing courses cant teach (and its the most important thing)', content: `After years of course buying and eventually switching to free resources, I finally understand what courses fundamentally cannot provide.

Resilience through failure.

Courses can teach you tactics. Strategies. Frameworks. Systems.

But they cant make you experience the gut-punch of your first failed product. The confusion of an ad account ban. The disappointment of zero sales after a launch.

And those experiences are what actually build successful entrepreneurs.

Every successful ecommerce person I know has a collection of failures. Lost money. Bad decisions. Embarrassing mistakes. The courses they bought didnt prevent any of that. The success came from surviving it.

Free resources [LINK] give you the same information as courses. But more importantly, they get you started faster with less financial pressure, which means you start failing (and learning from failure) sooner.

The best education isnt what you read or watch. Its what you survive.

Stop trying to prevent failure through more preparation. Start failing sooner so you can start learning sooner.` },

  { topic: 'Why I tell people to spend their course budget on failed products instead', content: `If you have $2,000 set aside for an ecommerce course, here is what I would suggest instead:

Take that $2,000 and test 10-20 products.

Each product test: $100-200 in ads. Proper testing. Real data.

Most will fail. Thats the point.

From those failures you will learn:
- What your target market actually responds to
- How Facebook ads actually work (not theory, practice)
- What creative styles get clicks
- How to read data and make decisions
- Emotional resilience

No course can teach these things as effectively as doing them.

After $2,000 in product tests youll have real experience and real data. Maybe youll even find a winner.

After $2,000 in courses youll have notes you might or might not implement and the same zero experience you started with.

Use free resources to learn the basics [LINK]. Then spend money on the business, not on learning about the business.

Paid education is the only industry where the product gets consumed before you know if it works. In every other context we call that a scam.` },

  { topic: 'Confessions of a former course affiliate', content: `Used to promote courses for affiliate commission. Made good money. Eventually stopped because I couldnt live with myself.

Heres what you should know about course affiliate marketing:

Commissions are HUGE. Often 30-50% of the course price. A $2,000 course might pay $600-1000 per sale. This creates massive incentive to promote regardless of quality.

Most affiliates havent taken the course. Theyre promoting based on the sales page and commission rate, not actual experience with the content.

Testimonials are often from affiliates. "This course changed my life!" Yeah, the affiliate commissions changed their life.

The best marketing usually means the worst product. Courses with aggressive affiliate programs often have the least substance. They need affiliates because the product cant sell itself.

Once I realized I was promoting stuff Id never recommend to a friend, I quit.

Now I only recommend free resources [LINK] and things I actually use. No affiliate angle. Just genuinely trying to help.

When someone is recommending a course, always ask: are they an affiliate? The answer changes everything about their motivation.` },

  { topic: 'What happened when I asked for my course money back (full story)', content: `This is a long one but I think people should hear how this actually plays out.

Bought a course. $1,500. Two weeks in I realized the content was outdated and not what was promised.

Day 14: Requested refund citing specific issues with content accuracy.

Day 16: Got a response saying theyd "look into it" and asking for specific examples. I provided 5 detailed examples of outdated or inaccurate content.

Day 22: Response saying they "disagreed with my assessment" and that the content was "foundational principles that dont change." Refund denied.

Day 23: Replied pointing out their guarantee says "satisfaction guaranteed." I was clearly not satisfied.

Day 30: No response. Sent follow-up.

Day 35: Got a response offering a "store credit" for future purchases. No cash refund.

Day 36: I pushed back. Said I wanted the actual refund as per their policy.

Day 45: After multiple emails, they finally agreed to refund but it would take "4-6 weeks to process."

Day 78: Actually received refund.

Thats 2.5 months of fighting for money that should have been returned in days.

Now I only use free resources [LINK]. Cant ask for a refund on something that cost $0, and surprisingly the quality is comparable.

If youre considering a course, assume the refund process will be a nightmare. Because it probably will be.` },

  { topic: 'The "guru ecosystem" and why theyre all promoting each other', content: `Notice how ecommerce gurus always seem to know each other? Always promoting each others products? Always appearing on each others podcasts?

Its not coincidence. Its an ecosystem designed to keep you in a buying loop.

Heres how it works:

Guru A sells you course A. In course A, he mentions his friend Guru B who has "the best email marketing course."

You buy Guru Bs course. Guru A gets affiliate commission. In Guru Bs course, he mentions Guru C for Facebook ads.

You buy Guru Cs course. Guru B gets commission. In Guru Cs course... you see the pattern.

They all promote each other. They all take cuts from each other. The ecosystem is designed so that once youre in, you keep cycling between them and they all profit.

The information? Largely redundant. You probably didnt need course B if you really absorbed course A.

Breaking out of this ecosystem was hard. I had to consciously seek resources OUTSIDE the guru network [LINK]. People who dont have affiliate arrangements with the usual suspects.

If you keep seeing the same names recommended, ask yourself if its because theyre actually best or because the referrer is getting paid.` },

  { topic: 'Real numbers from my transition: courses to free resources', content: `People ask for specifics so here are mine.

BEFORE (course buying phase, 2 years):
- Courses purchased: 6
- Total course spend: $7,200
- Mastermind memberships: $2,400
- Total education spend: $9,600
- Revenue generated: ~$18,000
- Profit: ~$2,000

AFTER (free resources only, 1 year):
- Courses purchased: 0
- Education spend: $0
- Main resources: YouTube, Reddit, free platforms [LINK]
- Revenue generated: ~$72,000
- Profit: ~$18,000

Same person. Same work ethic. Completely different approach and completely different results.

Why the difference?

The money I saved on courses went into ads and inventory. More testing = faster learning = better results.

Without course pressure, I actually implemented instead of endlessly consuming.

Free resources are more current. Courses from 2022 teach 2022 tactics.

Im not saying courses are why I failed before or free resources are why I succeeded after. But the correlation is hard to ignore.

Track your own numbers. The results might surprise you.` },

  { topic: 'How my 63-year-old mom learned dropshipping without courses', content: `My mom wanted to start a small online business after retirement. Asked me for advice.

Old me would have recommended courses. New me took a different approach.

I spent a Sunday afternoon showing her:
- How to find free tutorials on YouTube
- This one platform [LINK] that has everything organized
- How to ask questions on Reddit
- Basic store setup (which Shopify basically walks you through anyway)

Thats it. No courses. No paid mentorship.

Three months later she has a small store selling craft supplies. Does about $1,500/month revenue. Modest but real.

She asked me recently how much she should spend on courses to "go to the next level."

I told her: nothing. Keep doing what youre doing. The information you need is free.

If a 63-year-old with minimal tech skills can build a profitable store using only free resources, the "you need courses" narrative is clearly false.

The information isnt the barrier. Action is the barrier. And courses often delay action while free resources encourage it.` },

  { topic: 'A message for anyone who feels stupid for buying courses', content: `If youre reading this and feeling bad about money youve spent on courses: you shouldnt.

The course industry has BILLIONS of dollars and some of the smartest marketers in the world making you feel like you need to buy. The psychological manipulation is sophisticated. Scarcity. Social proof. Authority. Urgency. They use all of it.

You didnt fall for a scam because youre stupid. You fell for a very well-designed marketing machine.

What matters is what you do next.

Some options:

Stop buying. Use free resources from now on [LINK]. Theyre often just as good.

Actually USE what you bought. If you have courses sitting unfinished, maybe complete them before buying more.

Redirect that budget. Every dollar not spent on courses can go into actual business building.

Forgive yourself. Seriously. Learn from it and move on.

The most successful people I know all have a "wasted money on courses" story. Its almost a rite of passage in this industry.

What separates people who eventually succeed: they stopped buying and started doing.

You can start doing today. The information is free. The only cost is your time and effort.` },
];

// Viral posts for X/Twitter
const X_POSTS = [
  { topic: 'spent $6k on courses before finding this', content: `genuinely sick thinking about how much money i wasted on ecommerce courses

finally found free resources that taught me more in a weekend than $6k worth of courses did in 2 years

if youre starting out please dont make my mistake. the info is free if you know where to look [LINK]` },

  { topic: 'hot take: courses are a scam', content: `controversial opinion: 90% of ecommerce courses are just repackaged youtube videos with a price tag

the gurus know this. they just bet you wont search for free alternatives first

found a free platform recently that has literally everything [LINK]. saved myself another $2k` },

  { topic: 'my accountant roasted me', content: `tax season hit different this year

accountant: "why did you spend more on courses than on your actual business?"

me: *silence*

switched to free resources only. wish someone told me this stuff was free years ago [LINK]` },

  { topic: 'friend bought a $3k course, I didnt', content: `my friend bought a $3,000 dropshipping course

i used free resources instead

6 months later were at similar revenue

difference: hes still paying off the credit card. im not.

the information is free yall [LINK]` },

  { topic: 'the math that changed everything', content: `did the math on my ecommerce journey:

courses bought: $4,800
profit from those courses: $0

free resources used: $0
profit after switching: $23k

the correlation is hard to ignore [LINK]` },

  { topic: 'guru exposed himself', content: `asked a guru in his Q&A what his actual store revenue was

he dodged, then admitted his main income is... course sales

bro hasnt run a store since 2022 but charges $2k to teach it

found actually free resources from people still doing it [LINK]` },

  { topic: 'beginner advice thread', content: `if youre just starting ecommerce:

- dont buy courses
- use free resources [LINK]
- spend that money on ads instead
- learn by doing not watching

this wouldve saved me $5k+ and 18 months of paralysis` },

  { topic: 'unpopular opinion incoming', content: `you dont need to "invest in yourself" before starting a business

thats guru marketing talk to justify charging $2k for youtube content

free resources exist. good ones. [LINK]

the real investment is your time and action, not courses` },

  { topic: '12 months course-free', content: `update: 12 months without buying a single course

results: best year in business
education spend: $0
stress level: way down

turns out free resources [LINK] + actually doing stuff works better than endless preparation` },

  { topic: 'what courses actually sell you', content: `what courses promise: success secrets
what courses actually sell: organization of free info + the feeling of progress

you can get organization free [LINK]
progress comes from action not purchases

save your money` },

  { topic: 'started with $200', content: `started my store with $200 total

no course budget
no mentor budget
no mastermind budget

just free resources and lots of failing forward

now at $7-8k months. the info was never the barrier [LINK]` },

  { topic: 'refund horror story', content: `tried to get a refund on a course that was clearly outdated

their response: "you accessed 21% of content, threshold is 20%"

designed to be non-refundable

now i only use free stuff. cant scam me if its free [LINK]` },

  { topic: 'the question that saves thousands', content: `before buying any course ask:

"can i find this information for free?"

the answer is almost always yes

been doing this for 2 years now. saved probably $8k+ [LINK]` },

  { topic: 'suppliers perspective', content: `my chinese supplier told me something interesting

he works with hundreds of dropshippers. says the successful ones never mention courses

the ones obsessed with courses? rarely make it

made me think. switched to free resources only [LINK]` },

  { topic: 'productive procrastination', content: `my therapist called my course buying "productive procrastination"

spending money to feel like im working without actually working

ouch but true

stopped buying. started doing. free resources are enough [LINK]` },

  { topic: 'the guru ecosystem', content: `notice how gurus always promote each others courses?

guru A mentions guru Bs course
guru B mentions guru Cs course
all taking affiliate cuts

its designed to keep you buying forever

break the cycle. free alternatives exist [LINK]` },

  { topic: 'real numbers', content: `2 years of courses: $7,200 spent, $2k profit
1 year of free resources: $0 spent, $18k profit

same person. same work ethic.

the difference was where the money went [LINK]` },

  { topic: 'what i tell friends now', content: `friend: "which course should i buy to learn ecommerce?"

me: "none. use free resources for 3 months first. heres some links [LINK]. if you still want a course after that, go for it"

none of them have bought courses. most are doing fine` },

  { topic: 'permission slip', content: `in case you need to hear this:

you dont need a course to start
you dont need a mentor to succeed
you dont need to spend money to learn

free resources work [LINK]

you have permission to keep your money` },

  { topic: 'the real secret', content: `the "secret" gurus dont want you to know:

theres no secret

product research is product research
ads are ads
email is email

the info is free [LINK]. what costs money is actually doing it.` },
];

// Subreddits for posting viral content
const SUBREDDITS = [
  { name: 'r/dropship', url: 'https://reddit.com/r/dropship', members: '180k+', description: 'Main dropshipping community' },
  { name: 'r/ecommerce', url: 'https://reddit.com/r/ecommerce', members: '150k+', description: 'General ecommerce discussion' },
  { name: 'r/shopify', url: 'https://reddit.com/r/shopify', members: '120k+', description: 'Shopify store owners' },
  { name: 'r/Entrepreneur', url: 'https://reddit.com/r/Entrepreneur', members: '2M+', description: 'General entrepreneurship' },
  { name: 'r/smallbusiness', url: 'https://reddit.com/r/smallbusiness', members: '1.5M+', description: 'Small business owners' },
  { name: 'r/juststart', url: 'https://reddit.com/r/juststart', members: '100k+', description: 'Starting online businesses' },
  { name: 'r/SideProject', url: 'https://reddit.com/r/SideProject', members: '200k+', description: 'Side projects and startups' },
  { name: 'r/EntrepreneurRideAlong', url: 'https://reddit.com/r/EntrepreneurRideAlong', members: '180k+', description: 'Building businesses together' },
  { name: 'r/sweatystartup', url: 'https://reddit.com/r/sweatystartup', members: '150k+', description: 'Service-based businesses' },
  { name: 'r/digital_marketing', url: 'https://reddit.com/r/digital_marketing', members: '100k+', description: 'Digital marketing strategies' },
  { name: 'r/PPC', url: 'https://reddit.com/r/PPC', members: '80k+', description: 'Pay-per-click advertising' },
  { name: 'r/FacebookAds', url: 'https://reddit.com/r/FacebookAds', members: '50k+', description: 'Meta/Facebook advertising' },
  { name: 'r/AmazonFBA', url: 'https://reddit.com/r/AmazonFBA', members: '100k+', description: 'Amazon sellers' },
  { name: 'r/FulfillmentByAmazon', url: 'https://reddit.com/r/FulfillmentByAmazon', members: '120k+', description: 'FBA sellers community' },
  { name: 'r/WorkOnline', url: 'https://reddit.com/r/WorkOnline', members: '800k+', description: 'Online income opportunities' },
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
  const [showSubreddits, setShowSubreddits] = useState(false);
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
                        <strong>Important:</strong> Each referral must be from a different IP address and email.
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
                        <pre className="mt-3 text-sm text-black whitespace-pre-wrap font-sans leading-relaxed">
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

              {/* Subreddit Link */}
              {postPlatform === 'reddit' && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowSubreddits(true)}
                    className="text-xs text-[var(--text-muted)] hover:text-black underline underline-offset-2 transition-colors"
                  >
                    Where to post? View recommended subreddits
                  </button>
                </div>
              )}
            </motion.div>
          </section>

        {/* Subreddit Modal */}
        {showSubreddits && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowSubreddits(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Recommended Subreddits</h3>
                <button
                  onClick={() => setShowSubreddits(false)}
                  className="p-1 rounded-lg hover:bg-black/5 transition-colors"
                >
                  <X size={20} className="text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Post your referral content in these communities. Read each subreddit&apos;s rules before posting.
                </p>
                <div className="space-y-2">
                  {SUBREDDITS.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-black/[0.02] border border-transparent hover:border-black/10 transition-all group"
                    >
                      <div>
                        <span className="font-medium text-sm text-[var(--text-primary)] group-hover:text-black">
                          {sub.name}
                        </span>
                        <p className="text-xs text-[var(--text-muted)]">{sub.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] bg-black/5 px-2 py-0.5 rounded">
                          {sub.members}
                        </span>
                        <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-black" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-black/10 bg-black/[0.02]">
                <p className="text-xs text-[var(--text-muted)] text-center">
                  Always provide value first. Avoid spammy behavior to prevent bans.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
