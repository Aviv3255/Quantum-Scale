'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Search, CheckCircle, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { submitPollVote, getUserPollVotes, getAllPollVotes } from '@/lib/supabase';

// Base votes per poll option (100,000 total per poll distributed by percentage)
// This ensures each individual vote has minimal impact on percentages
const BASE_TOTAL_VOTES = 100000;

// Helper to calculate initial votes from percentage
const votesFromPercentage = (percentage: number, totalVotes: number = BASE_TOTAL_VOTES) => {
  return Math.round((percentage / 100) * totalVotes);
};

// All polls data with base vote counts
const pollsData = [
  {
    id: 1,
    question: 'Do you display reviews on your product page?',
    options: [
      { text: 'Yes', percentage: 61.80 },
      { text: 'No', percentage: 14.40 },
      { text: 'Did not try', percentage: 23.80 },
    ],
    buttons: [{ text: 'Add product reviews', url: 'https://loox.io/app/LASERCRO' }]
  },
  {
    id: 2,
    question: 'Do you use Bid Caps / Cost Caps?',
    options: [
      { text: 'Only for high-scale or borderline CPA', percentage: 31.34 },
      { text: 'No', percentage: 66.87 },
      { text: 'Yes, almost always', percentage: 1.80 },
    ],
  },
  {
    id: 3,
    question: 'What is your average shipping time for customers?',
    options: [
      { text: '5-7 days', percentage: 41.20 },
      { text: '8-12 days', percentage: 35.40 },
      { text: 'Over 13 days', percentage: 23.40 },
    ],
  },
  {
    id: 4,
    question: 'Do you work with a private agent or AliExpress?',
    options: [
      { text: 'Private agent', percentage: 53.40 },
      { text: 'AliExpress', percentage: 4.00 },
      { text: 'I hold my own inventory', percentage: 42.60 },
    ],
    buttons: [{ text: 'Connect Private Agent', url: 'https://erp.matedropshipping.com/login?invite_id=915' }]
  },
  {
    id: 5,
    question: 'Is your customer support available through WhatsApp?',
    options: [
      { text: 'Yes', percentage: 14.80 },
      { text: 'No', percentage: 85.20 },
    ],
  },
  {
    id: 6,
    question: 'Which fulfillment company or private agent do you work with?',
    options: [
      { text: 'HyperSKU', percentage: 16.17 },
      { text: 'Mate', percentage: 51.70 },
      { text: 'CJ Dropshipping', percentage: 7.39 },
      { text: 'AutoDS', percentage: 5.39 },
      { text: 'Other', percentage: 19.36 },
    ],
  },
  {
    id: 7,
    question: 'Which method do you use to recover abandoned checkouts?',
    options: [
      { text: 'Email only', percentage: 23.60 },
      { text: 'SMS only', percentage: 29.40 },
      { text: 'Email and SMS', percentage: 47.00 },
    ],
    buttons: [
      { text: 'Create Email Automation', url: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner' },
      { text: 'Create SMS Automation', url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva' }
    ]
  },
  {
    id: 8,
    question: 'By how much is your CPA lower in remarketing compared to cold audiences?',
    options: [
      { text: 'Actually higher', percentage: 6.80 },
      { text: 'Almost the same', percentage: 13.40 },
      { text: '15-25% lower', percentage: 31.80 },
      { text: '25-50% lower', percentage: 39.80 },
      { text: "I don't know", percentage: 8.20 },
    ],
  },
  {
    id: 9,
    question: 'Did the Geolocation Announcement Bar actually increase your conversion rate?',
    options: [
      { text: 'Yes', percentage: 43.20 },
      { text: 'No', percentage: 2.40 },
      { text: 'Did not try / did not measure', percentage: 54.40 },
    ],
    buttons: [{ text: 'Add to your store', url: 'https://parityrocket.com/' }]
  },
  {
    id: 10,
    question: 'Do you offer free returns?',
    options: [
      { text: 'Yes', percentage: 25.80 },
      { text: 'No', percentage: 53.20 },
      { text: 'In some cases', percentage: 21.00 },
    ],
  },
  {
    id: 11,
    question: 'Which type of sale works best for you?',
    options: [
      { text: 'Reduce price (compare at price)', percentage: 8.00 },
      { text: 'Apply a coupon code on product page and ad', percentage: 12.80 },
      { text: 'Country-specific coupon code in the announcement bar', percentage: 68.40 },
      { text: 'Never tried', percentage: 10.80 },
    ],
    buttons: [{ text: 'Add location-based Announcement Bar', url: 'https://parityrocket.com/' }]
  },
  {
    id: 12,
    question: 'Do you use a heatmap tool to analyze your site? If yes, which one?',
    options: [
      { text: 'Hotjar', percentage: 32.80 },
      { text: 'Microsoft Clarity', percentage: 29.80 },
      { text: "I don't use any heatmap tool", percentage: 37.40 },
    ],
    buttons: [
      { text: 'Connect Hotjar', url: 'https://hotjar.com/r/r3ceda9' },
      { text: 'Connect Microsoft Clarity', url: 'https://clarity.microsoft.com/' }
    ]
  },
  {
    id: 13,
    question: 'Which Shopify theme are you currently using?',
    options: [
      { text: 'Impulse', percentage: 12.77 },
      { text: 'Dawn', percentage: 22.75 },
      { text: 'Shrine', percentage: 32.93 },
      { text: 'Glint', percentage: 7.19 },
      { text: 'Vision', percentage: 8.38 },
      { text: 'Other', percentage: 15.97 },
    ],
    buttons: [
      { text: 'View Impulse', url: 'https://themes.shopify.com/themes/impulse/presets/impulse' },
      { text: 'View Shrine (15% off: LASERCRO)', url: 'https://shrinesolutions.com/?ref=0d9fe741' },
      { text: 'View Dawn', url: 'https://themes.shopify.com/themes/dawn/presets/dawn' },
      { text: 'View Glint', url: 'https://themes.shopify.com/themes/sleek/presets/glint' },
      { text: 'View Vision', url: 'https://themes.shopify.com/themes/vision/presets/vision' }
    ]
  },
  {
    id: 14,
    question: 'Did adding a Wishlist to your site improve your conversion rate?',
    options: [
      { text: 'Yes', percentage: 34.00 },
      { text: 'No', percentage: 10.80 },
      { text: 'Did not try / did not measure', percentage: 55.20 },
    ],
    buttons: [{ text: 'Add Wishlist', url: 'https://vitals.app/shopify/12548540' }]
  },
  {
    id: 15,
    question: 'Do you offer one-time payment or multiple installments on your site?',
    options: [
      { text: 'One-time payment', percentage: 15.80 },
      { text: 'Installments', percentage: 41.80 },
      { text: 'Installments above a certain amount', percentage: 42.40 },
    ],
  },
  {
    id: 16,
    question: 'Do you offer free shipping above a certain threshold?',
    options: [
      { text: 'Yes', percentage: 63.40 },
      { text: 'No', percentage: 15.20 },
      { text: 'Always free shipping', percentage: 21.40 },
    ],
  },
  {
    id: 17,
    question: 'What is your REV/Visit on post-purchase upsells?',
    options: [
      { text: 'Under 2 USD', percentage: 12.80 },
      { text: '2-5 USD', percentage: 37.40 },
      { text: 'Above 5 USD', percentage: 38.60 },
      { text: "I don't have post-purchase upsells", percentage: 11.20 },
    ],
    buttons: [{ text: 'Add post purchase upsells', url: 'https://apps.shopify.com/reconvert-upsell-cross-sell?mref=lsbqcbva' }]
  },
  {
    id: 18,
    question: 'Do you use Post-Purchase Surveys, and did they reveal anything useful about your customers?',
    options: [
      { text: 'Never tried', percentage: 19.40 },
      { text: 'Yes, revealed a lot', percentage: 39.80 },
      { text: 'Yes, revealed a little', percentage: 30.20 },
      { text: 'Tried, revealed nothing', percentage: 10.60 },
    ],
  },
  {
    id: 19,
    question: 'Does price comparison against other brands increase trust in your opinion?',
    options: [
      { text: 'Yes', percentage: 38.60 },
      { text: 'Sometimes', percentage: 30.40 },
      { text: 'No', percentage: 31.00 },
    ],
  },
  {
    id: 20,
    question: 'Has using a Helpdesk improved your customer service?',
    options: [
      { text: 'Yes', percentage: 38.20 },
      { text: 'Partially', percentage: 22.60 },
      { text: 'Never tried', percentage: 39.20 },
    ],
    buttons: [{ text: 'Connect Helpdesk', url: 'https://apps.shopify.com/helpdesk' }]
  },
  {
    id: 21,
    question: 'Do you believe offering free shipping above a certain amount increases AOV?',
    options: [
      { text: 'Yes', percentage: 63.80 },
      { text: 'No', percentage: 14.80 },
      { text: 'Depends on product', percentage: 21.40 },
    ],
  },
  {
    id: 22,
    question: 'Do you create UGC using AI?',
    options: [
      { text: 'Yes', percentage: 39.80 },
      { text: 'No', percentage: 20.40 },
      { text: 'Tried, looked bad', percentage: 39.80 },
    ],
  },
  {
    id: 23,
    question: 'Which AI tools do you use to create UGC?',
    options: [
      { text: 'Heygen', percentage: 25.00 },
      { text: 'Creatify', percentage: 29.80 },
      { text: 'Other', percentage: 10.40 },
      { text: "I'm not creating AI-UGCs", percentage: 34.80 },
    ],
    buttons: [
      { text: 'Try HeyGen', url: 'https://www.heygen.com/?sid=rewardful&via=quantum' },
      { text: 'Try Creatify', url: 'https://creatify.ai/?via=quantum-scale' }
    ]
  },
  {
    id: 24,
    question: 'Do you use Lookalike based on RFM segments?',
    options: [
      { text: 'Yes, this is my strongest LLA by far', percentage: 51.40 },
      { text: 'No, did not work well for me', percentage: 14.60 },
      { text: 'Never tried / my audience is too small', percentage: 34.00 },
    ],
    buttons: [{ text: 'Create RFM Audience', url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva' }]
  },
  {
    id: 25,
    question: 'Does Open Targeting work better for you?',
    options: [
      { text: 'Yes', percentage: 38.80 },
      { text: 'Depends on product and campaign', percentage: 34.20 },
      { text: 'No, I still add interests', percentage: 27.00 },
    ],
  },
  {
    id: 26,
    question: 'How frequently do you run remarketing campaigns per month?',
    options: [
      { text: 'More than 10', percentage: 52.00 },
      { text: '5-10', percentage: 34.20 },
      { text: 'Under 5', percentage: 13.80 },
    ],
  },
  {
    id: 27,
    question: 'What time window do you use for remarketing?',
    options: [
      { text: '7 days', percentage: 11.00 },
      { text: '30 days', percentage: 17.40 },
      { text: '180 days', percentage: 71.60 },
    ],
  },
  {
    id: 28,
    question: 'What works better for you in scaling?',
    options: [
      { text: 'CBO', percentage: 65.20 },
      { text: 'ABO', percentage: 34.80 },
    ],
  },
  {
    id: 29,
    question: 'Do you use Advantage+ Shopping?',
    options: [
      { text: 'Yes', percentage: 48.20 },
      { text: 'Sometimes', percentage: 31.80 },
      { text: 'No', percentage: 20.00 },
    ],
  },
  {
    id: 30,
    question: 'Has Purchase Lookalike worked well for you?',
    options: [
      { text: 'Yes', percentage: 36.20 },
      { text: 'Sometimes', percentage: 23.40 },
      { text: 'No', percentage: 18.60 },
      { text: 'Never tried', percentage: 21.80 },
    ],
  },
  {
    id: 31,
    question: 'Do you split campaigns by country?',
    options: [
      { text: 'Yes, sometimes', percentage: 25.80 },
      { text: 'No, everything in one campaign', percentage: 74.20 },
    ],
  },
  {
    id: 32,
    question: 'Which creative format works best for you?',
    options: [
      { text: 'Video / UGC', percentage: 55.40 },
      { text: 'Carousel', percentage: 14.80 },
      { text: 'Image', percentage: 29.80 },
    ],
  },
  {
    id: 33,
    question: 'How many new creatives do you upload per week?',
    options: [
      { text: '1-10', percentage: 19.60 },
      { text: '10-20', percentage: 40.20 },
      { text: 'Over 20', percentage: 40.20 },
    ],
  },
  {
    id: 34,
    question: 'Is a Before/After ad effective for you?',
    options: [
      { text: 'Yes, works quite well', percentage: 34.60 },
      { text: 'No', percentage: 24.80 },
      { text: "Not relevant / didn't try", percentage: 40.60 },
    ],
  },
  {
    id: 35,
    question: 'Does a catalog campaign work well for you?',
    options: [
      { text: 'Yes', percentage: 19.40 },
      { text: 'Only for some brands/audiences', percentage: 42.80 },
      { text: 'Almost never', percentage: 37.80 },
    ],
  },
  {
    id: 36,
    question: 'How do you create your UGC videos?',
    options: [
      { text: 'Insense', percentage: 40.20 },
      { text: 'Collabstr', percentage: 21.40 },
      { text: 'Fiverr', percentage: 29.00 },
      { text: 'Other', percentage: 9.40 },
    ],
    buttons: [
      { text: 'Try Insense', url: 'https://insense.pro/?ref=mmiwmtd' },
      { text: 'Try Collabstr', url: 'https://collabstr.com/?ref=ef5e00' },
      { text: 'Try Fiverr', url: 'https://go.fiverr.com/visit/?bta=837001&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fsearch%252Fgigs%253Fquery%253DUGC%2526source%253Dtop-bar' }
    ]
  },
  {
    id: 37,
    question: 'Do you give influencers a script?',
    options: [
      { text: 'Full script', percentage: 14.80 },
      { text: 'General direction', percentage: 45.40 },
      { text: 'Full creative freedom', percentage: 39.80 },
    ],
  },
  {
    id: 38,
    question: 'From your experience, does positive engagement improve ROAS?',
    options: [
      { text: 'Yes', percentage: 50.20 },
      { text: 'No', percentage: 10.20 },
      { text: 'Not tested', percentage: 39.60 },
    ],
  },
  {
    id: 39,
    question: 'Do you test variations of the Hook only?',
    options: [
      { text: 'Yes, I add several hooks to every creative', percentage: 49.80 },
      { text: 'No', percentage: 25.00 },
      { text: 'Sometimes', percentage: 25.20 },
    ],
  },
  // ============ NEW POLLS (40-51) ============
  {
    id: 40,
    question: 'Do you use post-purchase upsells (one-click upsells after checkout)?',
    options: [
      { text: 'Yes, generates significant revenue', percentage: 24.60 },
      { text: 'Tried it, minimal impact', percentage: 19.40 },
      { text: 'Not yet implemented', percentage: 56.00 },
    ],
    buttons: [
      { text: 'Add Post-Purchase Upsells →', url: 'https://apps.shopify.com/reconvert-upsell-cross-sell?mref=lsbqcbva' }
    ]
  },
  {
    id: 41,
    question: 'What is the maximum discount you set on TxtCart?',
    options: [
      { text: '5-10%', percentage: 13.40 },
      { text: '10-15%', percentage: 54.27 },
      { text: '15-20%', percentage: 12.60 },
      { text: '20%+', percentage: 6.20 },
      { text: "I don't use it", percentage: 13.53 },
    ],
    buttons: [
      { text: 'Set Up TxtCart →', url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva' }
    ]
  },
  {
    id: 42,
    question: 'Do you use real or fake countdown timers?',
    options: [
      { text: 'Real (sale actually ends)', percentage: 21.60 },
      { text: 'Fake timers (reset daily)', percentage: 11.80 },
      { text: "Don't use timers", percentage: 11.20 },
      { text: 'Auto Geo-location based Holiday discount', percentage: 32.00 },
      { text: 'Planning to try', percentage: 23.40 },
    ],
    buttons: [
      { text: 'Add Regular Timer →', url: 'https://platform.shoffi.app/r/rl_6EEzhlj9' },
      { text: 'Add Geo-location Timer →', url: 'https://geo-convert.com/' }
    ]
  },
  {
    id: 43,
    question: 'Meta ad copy: Short or long?',
    options: [
      { text: 'Shortest as possible', percentage: 17.50 },
      { text: 'Longest as possible', percentage: 19.00 },
      { text: 'Mid (80-150 words)', percentage: 63.50 },
    ],
  },
  {
    id: 44,
    question: 'If you could start over, what would you do FIRST?',
    options: [
      { text: 'Pick better niche (not trending one)', percentage: 48.20 },
      { text: 'Build email list from day 1', percentage: 32.60 },
      { text: 'Test products before scaling ads', percentage: 14.80 },
      { text: 'Hire expert instead of DIY everything', percentage: 4.40 },
    ],
    buttons: [
      { text: 'Build an Email List →', url: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner' }
    ]
  },
  {
    id: 45,
    question: 'Your first sale - how long did it take?',
    options: [
      { text: 'Within first week', percentage: 18.20 },
      { text: '2-4 weeks', percentage: 32.80 },
      { text: '1-3 months', percentage: 38.40 },
      { text: '3+ months', percentage: 10.60 },
    ],
  },
  {
    id: 46,
    question: 'The one app you wish you installed from DAY ONE?',
    options: [
      { text: 'Email marketing (Klaviyo)', percentage: 14.20 },
      { text: 'SMS Cart recovery (TxtCart)', percentage: 12.00 },
      { text: 'Help desk', percentage: 3.00 },
      { text: 'DataDrew (Customer LTV)', percentage: 26.00 },
      { text: 'Geo Convert', percentage: 24.00 },
      { text: 'Reviews app', percentage: 3.00 },
      { text: 'All of them', percentage: 11.80 },
      { text: 'Other', percentage: 6.00 },
    ],
    buttons: [
      { text: 'Connect Klaviyo →', url: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL' },
      { text: 'Add Cart Recovery →', url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva' },
      { text: 'Connect Geo Convert →', url: 'https://geo-convert.com/' },
      { text: 'Connect DataDrew →', url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva' }
    ]
  },
  {
    id: 47,
    question: 'Reddit/4chan marketing - would you try it?',
    options: [
      { text: 'Yes, untapped audience', percentage: 24.60 },
      { text: 'Maybe for specific niches', percentage: 42.80 },
      { text: 'Too risky', percentage: 28.20 },
      { text: 'Already tried', percentage: 4.40 },
    ],
  },
  {
    id: 48,
    question: 'How do you handle returns/refunds?',
    options: [
      { text: 'Give best service to prevent them', percentage: 42.80 },
      { text: 'It happens, just deal with it', percentage: 28.60 },
      { text: 'Struggling to manage them', percentage: 18.40 },
      { text: 'Part of business, small % anyway', percentage: 10.20 },
    ],
  },
  {
    id: 49,
    question: 'Are you using Google Shopping ads?',
    options: [
      { text: 'Yes, main traffic source', percentage: 18.40 },
      { text: 'Yes, testing it out', percentage: 32.60 },
      { text: 'Not yet, planning to', percentage: 24.80 },
      { text: 'No, focusing on other channels', percentage: 24.20 },
    ],
  },
  {
    id: 50,
    question: 'Where do you get ad creative inspiration?',
    options: [
      { text: 'Competitor ads (Facebook Ad Library)', percentage: 28.20 },
      { text: 'Creative templates', percentage: 23.00 },
      { text: 'TikTok/Instagram trending content', percentage: 26.20 },
      { text: 'Hire UGC creators', percentage: 14.20 },
      { text: 'Make it myself / wing it', percentage: 8.40 },
    ],
  },
  {
    id: 51,
    question: "What's your Refund policy?",
    options: [
      { text: '30-day money back guarantee', percentage: 35.60 },
      { text: '14-day return window', percentage: 45.40 },
      { text: 'No returns (final sale)', percentage: 8.80 },
      { text: 'Case by case basis', percentage: 10.20 },
    ],
  },
];

interface PollOption {
  text: string;
  percentage: number;
}

interface PollButton {
  text: string;
  url: string;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  buttons?: PollButton[];
}

// Vote data structure for backend tracking
interface PollVoteData {
  votes: number[];  // Vote count per option
  totalVotes: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Initialize vote data from poll percentages with 100k base
const initializeVoteData = (): Record<number, PollVoteData> => {
  const data: Record<number, PollVoteData> = {};
  pollsData.forEach(poll => {
    const votes = poll.options.map(opt => votesFromPercentage(opt.percentage));
    data[poll.id] = {
      votes,
      totalVotes: votes.reduce((sum, v) => sum + v, 0),
    };
  });
  return data;
};

// Calculate live percentages from vote counts
const calculatePercentages = (voteData: PollVoteData): number[] => {
  if (voteData.totalVotes === 0) return voteData.votes.map(() => 0);
  return voteData.votes.map(v => (v / voteData.totalVotes) * 100);
};

// Aggregate real votes from Supabase into vote counts per poll
const aggregateVotes = (
  votes: { poll_id: number; option_index: number }[],
  baseVoteData: Record<number, PollVoteData>
): Record<number, PollVoteData> => {
  const result = { ...baseVoteData };

  // Count real votes per poll per option
  votes.forEach(vote => {
    if (result[vote.poll_id]) {
      const pollData = { ...result[vote.poll_id] };
      pollData.votes = [...pollData.votes];
      pollData.votes[vote.option_index]++;
      pollData.totalVotes++;
      result[vote.poll_id] = pollData;
    }
  });

  return result;
};

export default function DataCenterPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [userVotes, setUserVotes] = useState<Record<number, number>>({});
  const [pollVoteData, setPollVoteData] = useState<Record<number, PollVoteData>>(() => initializeVoteData());
  const [isVoting, setIsVoting] = useState<number | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load votes from Supabase on mount
  useEffect(() => {
    const loadVotes = async () => {
      if (!user) return;

      try {
        // Fetch user's votes and all community votes in parallel
        const [userVotesResult, allVotesResult] = await Promise.all([
          getUserPollVotes(user.id),
          getAllPollVotes()
        ]);

        // Set user's votes
        if (userVotesResult.data) {
          const votesMap: Record<number, number> = {};
          userVotesResult.data.forEach(v => {
            votesMap[v.poll_id] = v.option_index;
          });
          setUserVotes(votesMap);
        }

        // Aggregate all community votes on top of base votes
        if (allVotesResult.data) {
          const baseData = initializeVoteData();
          const aggregatedData = aggregateVotes(allVotesResult.data, baseData);
          setPollVoteData(aggregatedData);
        }

        setDataLoaded(true);
      } catch (e) {
        console.error('Error loading poll votes:', e);
        setDataLoaded(true);
      }
    };

    if (user && !dataLoaded) {
      loadVotes();
    }
  }, [user, dataLoaded]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Handle voting with Supabase backend
  const handleVote = useCallback(async (pollId: number, optionIndex: number) => {
    if (!user || isVoting !== null) return;

    const previousVote = userVotes[pollId];
    if (previousVote === optionIndex) return; // Already voted for this option

    setIsVoting(pollId);

    try {
      // Submit vote to Supabase
      const { error } = await submitPollVote(
        pollId,
        optionIndex,
        user.id,
        user.email || undefined,
        user.user_metadata?.full_name || undefined
      );

      if (error) {
        console.error('Error submitting vote:', error);
        setIsVoting(null);
        return;
      }

      // Update local state optimistically
      setPollVoteData(prev => {
        const pollData = { ...prev[pollId] };
        pollData.votes = [...pollData.votes];

        // If changing vote, decrement old option
        if (previousVote !== undefined) {
          pollData.votes[previousVote] = Math.max(0, pollData.votes[previousVote] - 1);
          pollData.totalVotes--;
        }

        // Increment new option
        pollData.votes[optionIndex]++;
        pollData.totalVotes++;

        return { ...prev, [pollId]: pollData };
      });

      // Update user votes
      setUserVotes(prev => ({ ...prev, [pollId]: optionIndex }));

    } catch (e) {
      console.error('Error voting:', e);
    } finally {
      setIsVoting(null);
    }
  }, [user, userVotes, isVoting]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const filteredPolls = pollsData.filter(poll =>
    poll.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Data Center</h1>
              <p>Real insights from real eCommerce operators. Updated live as the community votes.</p>
            </div>
            <button className="btn btn-secondary flex-shrink-0">
              <Plus size={16} strokeWidth={1.5} />
              Post a Poll
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search polls..."
              className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{filteredPolls.length} polls</p>
        </div>

          {/* Polls Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredPolls.map((poll) => {
              const voteData = pollVoteData[poll.id];
              const livePercentages = voteData ? calculatePercentages(voteData) : poll.options.map(o => o.percentage);

              return (
                <motion.div key={poll.id} variants={itemVariants} className="h-full">
                  <PollCard
                    poll={poll}
                    userVote={userVotes[poll.id]}
                    livePercentages={livePercentages}
                    totalVotes={voteData?.totalVotes || BASE_TOTAL_VOTES}
                    isVoting={isVoting === poll.id}
                    onVote={(optionIndex) => handleVote(poll.id, optionIndex)}
                  />
                </motion.div>
              );
            })}
          </motion.div>

        {filteredPolls.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-[var(--text-muted)]">
              No polls found
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

interface PollCardProps {
  poll: Poll;
  userVote?: number;
  livePercentages: number[];
  totalVotes: number;
  isVoting?: boolean;
  onVote: (optionIndex: number) => void;
}

function PollCard({ poll, userVote, livePercentages, totalVotes, isVoting, onVote }: PollCardProps) {
  const maxPercentage = Math.max(...livePercentages);

  // Format total votes (e.g., 100,234 -> "100.2K")
  const formatVotes = (votes: number) => {
    if (votes >= 1000000) return `${(votes / 1000000).toFixed(1)}M`;
    if (votes >= 1000) return `${(votes / 1000).toFixed(1)}K`;
    return votes.toString();
  };

  return (
    <div className="card card-hover h-full flex flex-col" style={{ padding: 0 }}>
      {/* Question */}
      <div className="p-5 pb-3">
        <h3 className="text-sm font-semibold leading-tight text-[var(--text-primary)]">
          {poll.question}
        </h3>
        <p className="text-[10px] text-[var(--text-muted)] mt-1">
          {formatVotes(totalVotes)} votes
        </p>
      </div>

      {/* Options */}
      <div className="px-5 pb-4 space-y-2 flex-1">
        {poll.options.map((option, index) => {
          const isUserChoice = userVote === index;
          const percentage = livePercentages[index] || 0;
          const isTopChoice = percentage === maxPercentage && percentage > 0;

          return (
            <button
              key={index}
              onClick={() => onVote(index)}
              disabled={isVoting}
              className="w-full text-left relative overflow-hidden rounded-lg transition-all hover:border-[var(--primary)] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                border: isUserChoice ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                cursor: isVoting ? 'not-allowed' : 'pointer'
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background: isUserChoice
                    ? 'linear-gradient(90deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.02) 100%)'
                    : isTopChoice
                    ? 'linear-gradient(90deg, rgba(0, 125, 255, 0.08) 0%, rgba(0, 125, 255, 0.02) 100%)'
                    : 'linear-gradient(90deg, rgba(0, 125, 255, 0.03) 0%, transparent 100%)',
                  width: `${percentage}%`
                }}
              />

              <div className="relative px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {isUserChoice ? (
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-[var(--primary)]"
                    >
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-[var(--border-medium)]"
                    />
                  )}
                  <span className="text-xs text-[var(--text-secondary)] truncate">
                    {option.text}
                  </span>
                </div>
                <span className={`font-bold text-xs flex-shrink-0 ml-2 ${isTopChoice ? 'text-[var(--info)]' : 'text-[var(--text-muted)]'}`}>
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA Buttons */}
      {poll.buttons && poll.buttons.length > 0 && (
        <div className="p-5 pt-0 mt-auto">
          <div className="flex flex-col gap-2 pt-3 border-t border-[var(--border-light)]">
            {poll.buttons.map((button, idx) => (
              <a
                key={idx}
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center text-xs py-2"
              >
                {button.text}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
