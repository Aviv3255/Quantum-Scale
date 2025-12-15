'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Search, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// All polls from original Base44 data
const pollsData = [
  {
    id: 1,
    question: 'Do you display reviews on your product page?',
    options: [
      { text: 'Yes', percentage: 61.8 },
      { text: 'No', percentage: 14.4 },
      { text: 'Did not try', percentage: 23.8 },
    ],
    buttons: [{ text: 'Add product reviews', url: 'https://loox.io/app/LASERCRO' }],
  },
  {
    id: 2,
    question: 'Do you use Bid Caps / Cost Caps?',
    options: [
      { text: 'Only for high-scale or borderline CPA', percentage: 31.34 },
      { text: 'No', percentage: 66.87 },
      { text: 'Yes, almost always', percentage: 1.8 },
    ],
  },
  {
    id: 3,
    question: 'What is your average shipping time for customers?',
    options: [
      { text: '5-7 days', percentage: 41.2 },
      { text: '8-12 days', percentage: 35.4 },
      { text: 'Over 13 days', percentage: 23.4 },
    ],
  },
  {
    id: 4,
    question: 'Do you work with a private agent or AliExpress?',
    options: [
      { text: 'Private agent', percentage: 53.4 },
      { text: 'AliExpress', percentage: 4.0 },
      { text: 'I hold my own inventory', percentage: 42.6 },
    ],
    buttons: [
      {
        text: 'Connect Private Agent',
        url: 'https://erp.matedropshipping.com/login?invite_id=915',
      },
    ],
  },
  {
    id: 5,
    question: 'Is your customer support available through WhatsApp?',
    options: [
      { text: 'Yes', percentage: 14.8 },
      { text: 'No', percentage: 85.2 },
    ],
  },
  {
    id: 6,
    question: 'Which fulfillment company or private agent do you work with?',
    options: [
      { text: 'HyperSKU', percentage: 16.17 },
      { text: 'Mate', percentage: 51.7 },
      { text: 'CJ Dropshipping', percentage: 7.39 },
      { text: 'AutoDS', percentage: 5.39 },
      { text: 'Other', percentage: 19.36 },
    ],
  },
  {
    id: 7,
    question: 'Which method do you use to recover abandoned checkouts?',
    options: [
      { text: 'Email only', percentage: 23.6 },
      { text: 'SMS only', percentage: 29.4 },
      { text: 'Email and SMS', percentage: 47.0 },
    ],
    buttons: [
      {
        text: 'Create Email Automation',
        url: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner',
      },
      { text: 'Create SMS Automation', url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva' },
    ],
  },
  {
    id: 8,
    question: 'By how much is your CPA lower in remarketing compared to cold audiences?',
    options: [
      { text: 'Actually higher', percentage: 6.8 },
      { text: 'Almost the same', percentage: 13.4 },
      { text: '15-25% lower', percentage: 31.8 },
      { text: '25-50% lower', percentage: 39.8 },
      { text: "I don't know", percentage: 8.2 },
    ],
  },
  {
    id: 9,
    question: 'Did the Geolocation Announcement Bar actually increase your conversion rate?',
    options: [
      { text: 'Yes', percentage: 43.2 },
      { text: 'No', percentage: 2.4 },
      { text: 'Did not try / did not measure', percentage: 54.4 },
    ],
    buttons: [{ text: 'Add to your store', url: 'https://parityrocket.com/' }],
  },
  {
    id: 10,
    question: 'Do you offer free returns?',
    options: [
      { text: 'Yes', percentage: 25.8 },
      { text: 'No', percentage: 53.2 },
      { text: 'In some cases', percentage: 21.0 },
    ],
  },
  {
    id: 11,
    question: 'Which type of sale works best for you?',
    options: [
      { text: 'Reduce price (compare at price)', percentage: 8.0 },
      { text: 'Apply a coupon code on product page and ad', percentage: 12.8 },
      { text: 'Country-specific coupon code in the announcement bar', percentage: 68.4 },
      { text: 'Never tried', percentage: 10.8 },
    ],
    buttons: [{ text: 'Add location-based Announcement Bar', url: 'https://parityrocket.com/' }],
  },
  {
    id: 12,
    question: 'Do you use a heatmap tool to analyze your site? If yes, which one?',
    options: [
      { text: 'Hotjar', percentage: 32.8 },
      { text: 'Microsoft Clarity', percentage: 29.8 },
      { text: "I don't use any heatmap tool", percentage: 37.4 },
    ],
    buttons: [
      { text: 'Connect Hotjar', url: 'https://hotjar.com/r/r3ceda9' },
      { text: 'Connect Microsoft Clarity', url: 'https://clarity.microsoft.com/' },
    ],
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
      { text: 'View Vision', url: 'https://themes.shopify.com/themes/vision/presets/vision' },
    ],
  },
  {
    id: 14,
    question: 'Did adding a Wishlist to your site improve your conversion rate?',
    options: [
      { text: 'Yes', percentage: 34.0 },
      { text: 'No', percentage: 10.8 },
      { text: 'Did not try / did not measure', percentage: 55.2 },
    ],
    buttons: [{ text: 'Add Wishlist', url: 'https://vitals.app/shopify/12548540' }],
  },
  {
    id: 15,
    question: 'Do you offer one-time payment or multiple installments on your site?',
    options: [
      { text: 'One-time payment', percentage: 15.8 },
      { text: 'Installments', percentage: 41.8 },
      { text: 'Installments above a certain amount', percentage: 42.4 },
    ],
  },
  {
    id: 16,
    question: 'Do you offer free shipping above a certain threshold?',
    options: [
      { text: 'Yes', percentage: 63.4 },
      { text: 'No', percentage: 15.2 },
      { text: 'Always free shipping', percentage: 21.4 },
    ],
  },
  {
    id: 17,
    question: 'What is your REV/Visit on post-purchase upsells?',
    options: [
      { text: 'Under 2 USD', percentage: 12.8 },
      { text: '2-5 USD', percentage: 37.4 },
      { text: 'Above 5 USD', percentage: 38.6 },
      { text: "I don't have post-purchase upsells", percentage: 11.2 },
    ],
    buttons: [
      {
        text: 'Add post purchase upsells',
        url: 'https://apps.shopify.com/reconvert-upsell-cross-sell?mref=lsbqcbva',
      },
    ],
  },
  {
    id: 18,
    question:
      'Do you use Post-Purchase Surveys, and did they reveal anything useful about your customers?',
    options: [
      { text: 'Never tried', percentage: 19.4 },
      { text: 'Yes, revealed a lot', percentage: 39.8 },
      { text: 'Yes, revealed a little', percentage: 30.2 },
      { text: 'Tried, revealed nothing', percentage: 10.6 },
    ],
  },
  {
    id: 19,
    question: 'Does price comparison against other brands increase trust in your opinion?',
    options: [
      { text: 'Yes', percentage: 38.6 },
      { text: 'Sometimes', percentage: 30.4 },
      { text: 'No', percentage: 31.0 },
    ],
  },
  {
    id: 20,
    question: 'Has using a Helpdesk improved your customer service?',
    options: [
      { text: 'Yes', percentage: 38.2 },
      { text: 'Partially', percentage: 22.6 },
      { text: 'Never tried', percentage: 39.2 },
    ],
    buttons: [{ text: 'Connect Helpdesk', url: 'https://apps.shopify.com/helpdesk' }],
  },
  {
    id: 21,
    question: 'Do you believe offering free shipping above a certain amount increases AOV?',
    options: [
      { text: 'Yes', percentage: 63.8 },
      { text: 'No', percentage: 14.8 },
      { text: 'Depends on product', percentage: 21.4 },
    ],
  },
  {
    id: 22,
    question: 'Do you create UGC using AI?',
    options: [
      { text: 'Yes', percentage: 39.8 },
      { text: 'No', percentage: 20.4 },
      { text: 'Tried, looked bad', percentage: 39.8 },
    ],
  },
  {
    id: 23,
    question: 'Which AI tools do you use to create UGC?',
    options: [
      { text: 'Heygen', percentage: 25.0 },
      { text: 'Creatify', percentage: 29.8 },
      { text: 'Other', percentage: 10.4 },
      { text: "I'm not creating AI-UGCs", percentage: 34.8 },
    ],
    buttons: [
      { text: 'Try HeyGen', url: 'https://www.heygen.com/?sid=rewardful&via=quantum' },
      { text: 'Try Creatify', url: 'https://creatify.ai/?via=quantum-scale' },
    ],
  },
  {
    id: 24,
    question: 'Do you use Lookalike based on RFM segments?',
    options: [
      { text: 'Yes, this is my strongest LLA by far', percentage: 51.4 },
      { text: 'No, did not work well for me', percentage: 14.6 },
      { text: 'Never tried / my audience is too small', percentage: 34.0 },
    ],
    buttons: [
      {
        text: 'Create RFM Audience',
        url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
      },
    ],
  },
  {
    id: 25,
    question: 'Does Open Targeting work better for you?',
    options: [
      { text: 'Yes', percentage: 38.8 },
      { text: 'Depends on product and campaign', percentage: 34.2 },
      { text: 'No, I still add interests', percentage: 27.0 },
    ],
  },
  {
    id: 26,
    question: 'How frequently do you run remarketing campaigns per month?',
    options: [
      { text: 'More than 10', percentage: 52.0 },
      { text: '5-10', percentage: 34.2 },
      { text: 'Under 5', percentage: 13.8 },
    ],
  },
  {
    id: 27,
    question: 'What time window do you use for remarketing?',
    options: [
      { text: '7 days', percentage: 11.0 },
      { text: '30 days', percentage: 17.4 },
      { text: '180 days', percentage: 71.6 },
    ],
  },
  {
    id: 28,
    question: 'What works better for you in scaling?',
    options: [
      { text: 'CBO', percentage: 65.2 },
      { text: 'ABO', percentage: 34.8 },
    ],
  },
  {
    id: 29,
    question: 'Do you use Advantage+ Shopping?',
    options: [
      { text: 'Yes', percentage: 48.2 },
      { text: 'Sometimes', percentage: 31.8 },
      { text: 'No', percentage: 20.0 },
    ],
  },
  {
    id: 30,
    question: 'Has Purchase Lookalike worked well for you?',
    options: [
      { text: 'Yes', percentage: 36.2 },
      { text: 'Sometimes', percentage: 23.4 },
      { text: 'No', percentage: 18.6 },
      { text: 'Never tried', percentage: 21.8 },
    ],
  },
  {
    id: 31,
    question: 'Do you split campaigns by country?',
    options: [
      { text: 'Yes, sometimes', percentage: 25.8 },
      { text: 'No, everything in one campaign', percentage: 74.2 },
    ],
  },
  {
    id: 32,
    question: 'Which creative format works best for you?',
    options: [
      { text: 'Video / UGC', percentage: 55.4 },
      { text: 'Carousel', percentage: 14.8 },
      { text: 'Image', percentage: 29.8 },
    ],
  },
  {
    id: 33,
    question: 'How many new creatives do you upload per week?',
    options: [
      { text: '1-10', percentage: 19.6 },
      { text: '10-20', percentage: 40.2 },
      { text: 'Over 20', percentage: 40.2 },
    ],
  },
  {
    id: 34,
    question: 'Is a Before/After ad effective for you?',
    options: [
      { text: 'Yes, works quite well', percentage: 34.6 },
      { text: 'No', percentage: 24.8 },
      { text: "Not relevant / didn't try", percentage: 40.6 },
    ],
  },
  {
    id: 35,
    question: 'Does a catalog campaign work well for you?',
    options: [
      { text: 'Yes', percentage: 19.4 },
      { text: 'Only for some brands/audiences', percentage: 42.8 },
      { text: 'Almost never', percentage: 37.8 },
    ],
  },
  {
    id: 36,
    question: 'How do you create your UGC videos?',
    options: [
      { text: 'Insense', percentage: 40.2 },
      { text: 'Collabstr', percentage: 21.4 },
      { text: 'Fiverr', percentage: 29.0 },
      { text: 'Other', percentage: 9.4 },
    ],
    buttons: [
      { text: 'Try Insense', url: 'https://insense.pro/?ref=mmiwmtd' },
      { text: 'Try Collabstr', url: 'https://collabstr.com/?ref=ef5e00' },
      {
        text: 'Try Fiverr',
        url: 'https://go.fiverr.com/visit/?bta=837001&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fsearch%252Fgigs%253Fquery%253DUGC%2526source%253Dtop-bar',
      },
    ],
  },
  {
    id: 37,
    question: 'Do you give influencers a script?',
    options: [
      { text: 'Full script', percentage: 14.8 },
      { text: 'General direction', percentage: 45.4 },
      { text: 'Full creative freedom', percentage: 39.8 },
    ],
  },
  {
    id: 38,
    question: 'From your experience, does positive engagement improve ROAS?',
    options: [
      { text: 'Yes', percentage: 50.2 },
      { text: 'No', percentage: 10.2 },
      { text: 'Not tested', percentage: 39.6 },
    ],
  },
  {
    id: 39,
    question: 'Do you test variations of the Hook only?',
    options: [
      { text: 'Yes, I add several hooks to every creative', percentage: 49.8 },
      { text: 'No', percentage: 25.0 },
      { text: 'Sometimes', percentage: 25.2 },
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

export default function DataCenterPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [userVotes, setUserVotes] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleVote = (pollId: number, optionIndex: number) => {
    setUserVotes((prev) => ({ ...prev, [pollId]: optionIndex }));
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  const filteredPolls = pollsData.filter((poll) =>
    poll.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1>Data Center</h1>
              <p>
                Real insights from real eCommerce operators. Updated live as the community votes.
              </p>
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
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search polls..."
              className="w-full rounded-xl border border-[var(--border-light)] bg-[var(--bg-secondary)] py-3 pl-12 pr-4 text-sm text-[var(--text-primary)] transition-colors focus:border-[var(--primary)] focus:outline-none"
            />
          </div>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{filteredPolls.length} polls</p>
        </div>

        {/* Polls Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {filteredPolls.map((poll) => (
            <motion.div key={poll.id} variants={itemVariants} className="h-full">
              <PollCard
                poll={poll}
                userVote={userVotes[poll.id]}
                onVote={(optionIndex) => handleVote(poll.id, optionIndex)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredPolls.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-xl text-[var(--text-muted)]">No polls found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

interface PollCardProps {
  poll: Poll;
  userVote?: number;
  onVote: (optionIndex: number) => void;
}

function PollCard({ poll, userVote, onVote }: PollCardProps) {
  const maxPercentage = Math.max(...poll.options.map((o) => o.percentage));

  return (
    <div className="card card-hover flex h-full flex-col" style={{ padding: 0 }}>
      {/* Question */}
      <div className="p-5 pb-3">
        <h3 className="text-sm font-semibold leading-tight text-[var(--text-primary)]">
          {poll.question}
        </h3>
      </div>

      {/* Options */}
      <div className="flex-1 space-y-2 px-5 pb-4">
        {poll.options.map((option, index) => {
          const isUserChoice = userVote === index;
          const isTopChoice = option.percentage === maxPercentage;

          return (
            <button
              key={index}
              onClick={() => onVote(index)}
              className="relative w-full overflow-hidden rounded-lg text-left transition-all hover:border-[var(--primary)]"
              style={{
                border: isUserChoice ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                cursor: 'pointer',
              }}
            >
              <div
                className="absolute inset-0 transition-all"
                style={{
                  background: isUserChoice
                    ? 'linear-gradient(90deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.01) 100%)'
                    : 'linear-gradient(90deg, rgba(0, 125, 255, 0.02) 0%, transparent 100%)',
                  width: `${option.percentage}%`,
                }}
              />

              <div className="relative flex items-center justify-between px-3 py-2">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  {isUserChoice ? (
                    <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-[var(--border-medium)]" />
                  )}
                  <span className="truncate text-xs text-[var(--text-secondary)]">
                    {option.text}
                  </span>
                </div>
                <span
                  className={`ml-2 flex-shrink-0 text-xs font-bold ${isTopChoice ? 'text-[var(--info)]' : 'text-[var(--text-muted)]'}`}
                >
                  {option.percentage.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Buttons */}
      {poll.buttons && poll.buttons.length > 0 && (
        <div className="mt-auto p-5 pt-0">
          <div className="flex flex-col gap-2 border-t border-[var(--border-light)] pt-3">
            {poll.buttons.map((button, idx) => (
              <a
                key={idx}
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center py-2 text-xs"
              >
                {button.text}
                <ArrowRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
