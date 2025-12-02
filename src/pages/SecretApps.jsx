
import React, { useState } from 'react';
import { ExternalLink, Zap, Shield, TrendingUp, DollarSign, BarChart3, Globe, CreditCard, Info, X, Sparkles } from 'lucide-react';

export default function SecretApps() {
  const [selectedApp, setSelectedApp] = useState(null);

  const apps = [
    {
      id: 1,
      name: 'ABConvert',
      category: 'A/B Testing',
      icon: BarChart3,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121227.284.png?v=1760087566',
      shortDesc: 'A single test increased conversions by 220%. If you\'re not testing, you\'re leaving money on the floor.',
      description: 'As we revealed in The Subconscious Trap course, there were individual A/B tests that improved conversion rates by 220%. A single test has the power to completely transform your site, and usually it\'s the most minor thing you wouldn\'t think would improve your site. If you\'re not running a test on your traffic at any given moment, you probably just don\'t like money - because you\'re leaving it on the floor without picking it up. This app is currently the world\'s best A/B Testing app that allows you to automatically test between different versions - product pages, sections, themes, product prices, shipping prices, etc. Never rely on what seems right to you, only on data. Use code LASERCRO when installing through our link for 10% off.',
      url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel',
      couponCode: 'LASERCRO',
      testIdeas: [
        'Test sticky Add to Cart button on mobile vs. standard placement',
        'Compare "Best Seller" badge vs. no badge on products',
        'Test UGC video reviews vs. text-only reviews',
        'Compare countdown timer urgency vs. simple "Limited Time" text',
        'Test "Place Order" vs. "Complete Order" button text',
        'Compare social proof banner vs. no banner',
        'Test delivery time estimate below CTA vs. no estimate',
        'Compare payment logos (Visa, Mastercard, PayPal) vs. minimal checkout',
        'Test free shipping progress bar vs. no indicator',
        'Compare product page layouts: gallery left vs. gallery right'
      ]
    },
    {
      id: 2,
      name: 'KeepCart',
      category: 'Coupon Protection',
      icon: Shield,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122003.978.png?v=1760088020',
      shortDesc: 'Stop Honey and coupon extensions from stealing your profits. Block unauthorized discounts instantly.',
      description: 'If you have at least one active coupon code on your site, you\'re losing a lot of money... (For example, a 20% discount code for customers who abandoned their cart after a month...) A large portion of your customers use extensions like Honey and hundreds of others that leak your coupon codes to the public. This means customers who weren\'t supposed to get the discount are still using it - and you\'re losing money. The KeepCart app blocks these extensions\' access to your site and ensures your coupon codes aren\'t leaked. Installing through this link will give you an extended free trial period.',
      url: 'https://platform.shoffi.app/r/rl_U2L0seLE'
    },
    {
      id: 3,
      name: 'Post-Purchase Survey',
      category: 'Customer Intelligence',
      icon: TrendingUp,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_1.jpg?v=1761567071',
      shortDesc: 'Know exactly what makes customers buy. This data is pure gold for scaling your store.',
      description: 'Data is power. The more you know about your customers, the more you can get inside their minds, triple your conversion rate, and sell to each customer again and again. That\'s why we always put a post-purchase survey - you have no idea how valuable this is! This information will surprise you and serve you well. We recommend putting 3-4 questions (and changing them all the time after you\'ve gathered data that answers the question reliably).',
      url: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
      surveyQuestions: [
        {
          q: 'How did you first hear about us?',
          options: ['Saw an ad on Facebook/Instagram', 'Found you on Google', 'Through a friend or recommendation', 'From a video or influencer', 'Other']
        },
        {
          q: 'How many times did you see our brand before placing your order?',
          options: ['This was my first time', '2-3 times', 'I\'ve seen you several times in the past few weeks', 'Not sure/don\'t remember']
        },
        {
          q: 'What made you decide to buy right now?',
          options: ['A sale or discount', 'I finally wanted to try it', 'I saw reviews or a convincing video', 'Someone mentioned you', 'Other']
        },
        {
          q: 'Was there anything that made you hesitate before ordering?',
          options: ['No, I decided right away', 'I wasn\'t sure about the product', 'I wasn\'t sure the site was trustworthy', 'I was worried about returns or customer service', 'Other']
        }
      ]
    },
    {
      id: 4,
      name: 'ReConvert',
      category: 'Post-Purchase Upsells',
      icon: DollarSign,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_9.png?v=1761567186',
      shortDesc: 'Free money. Adds $7.4 pure profit per order. 1:46 ROI. Absolute must-have.',
      description: 'Simply put, free money. And a real deal breaker. This app on average adds $7.4 pure profit to each order for us. Without doing anything. A must for every site. These $7.4 can be your deal breaker - take you from loss to profit, or give you the ability to pay an additional $7.4 more for customer acquisition. In addition, the average ROI on Post Purchase upsell apps is 1:46 - meaning for every $1 you pay the app you earn an average of $46, it\'s a return on investment you won\'t find anywhere else. In short - a must. We personally used a specific app in the past but a year ago we switched all brands to ReConvert, this change gave us a radical shift in the extended functional consistency they offer, profit per order thanks to upsells increased from $2.15 to $7.4.',
      url: 'https://apps.shopify.com/reconvert-upsell-cross-sell?mref=lsbqcbva',
      stats: {
        avgProfit: '$7.4',
        roi: '1:46'
      }
    },
    {
      id: 5,
      name: 'Cart Drawer Upsell',
      category: 'Cart Optimization',
      icon: Zap,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_2.jpg?v=1761567244',
      shortDesc: 'The Starbucks checkout trick. Add impulse buys at cart - pure profit on every order.',
      description: 'How many times have you stood at the checkout at Starbucks, a convenience store, or a gas station - and added a cheap product at the register? Gum, a small snack, a drink bottle? Welcome to small money that becomes big money. Put 8-10 general upsells in the cart that many will want for $20-$50, simply money on the floor. Installing through our link will give you a free trial + free plan.',
      url: 'https://platform.shoffi.app/r/rl_cm697iNI',
      exampleImage: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_17.19.34_22a0366c.jpg?v=1761492014'
    },
    {
      id: 6,
      name: 'DataDrew',
      category: 'Analytics',
      icon: BarChart3,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_3.jpg?v=1761567329',
      shortDesc: 'Know your numbers. LTV, repeat rate, top customers - all the metrics that matter. Free.',
      description: 'Data is everything. Every student of ours knows this! You must know how much each customer is worth to you, how much an average customer in the top 10%/25%/50% is worth to you, what your Re-purchase rate is, and every possible metric. And yes, it\'s a completely free app through our link.',
      url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
      exampleImage: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_10.png?v=1761567461',
      isFree: true
    },
    {
      id: 7,
      name: 'Parity Rocket',
      category: 'Geo-Targeting',
      icon: Globe,
      logo: 'https://parityrocket.com/wp-content/uploads/2025/04/logo-lander.png',
      shortDesc: 'Easy cheat code: 45-70% conversion lift. Geo-targeted discounts that print money.',
      description: 'Simply an easy cheat code for high conversion rates. Parity Rocket creates a banner with a coupon code according to the country the visitor enters from, and according to the purchasing power of the country it offers a coupon code (for example in India it will give a 20% coupon code, in New York 5% discount) of course according to the settings you set, and in addition it also adapts it to special events of the country, local holidays, etc. For us personally this usually increases conversion rates by 45-70%, without a doubt the discount we give customers is minor after something like this.',
      url: 'https://parityrocket.com/',
      conversionLift: '45-70%'
    },
    {
      id: 8,
      name: 'Triple Whale',
      category: 'Attribution',
      icon: TrendingUp,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_4.jpg?v=1761567632',
      shortDesc: '100% accurate attribution. Stop making decisions blindfolded. Free under $250K revenue.',
      description: 'If to see where your sales came from you look at the Meta/Google Ads dashboard, you\'re on the way to drastic failure, because you\'re doing heart surgery with your eyes closed. Since iOS 14, Meta and Google receive partial data on purchases, which causes them to simply not really know where sales come from, and this creates 2 problems: 1 - Only 70% of purchases appear in their dashboard 2 - Of the 70% that appear, they guess a lot, attribute sales to completely different campaigns and creatives, and completely mislead you. Triple Whale uses advanced technology and overcomes this with 100% accuracy. With a simple and completely free installation (if your annual turnover is under $250K) you\'ll be able to see all the data before your eyes, exactly where the campaign came from (from which platform, campaign, ad set, creative) - and make only correct decisions.',
      url: 'https://www.triplewhale.com/',
      isFree: true,
      freeUpTo: '$250K annual revenue'
    },
    {
      id: 9,
      name: 'PayPal Tracking Sync',
      category: 'Payment Protection',
      icon: CreditCard,
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122054.732.png?v=1760088059',
      shortDesc: 'Don\'t get $60K locked for 180 days. Auto-sync tracking to PayPal instantly.',
      description: 'Processing through PayPal on your site? Make sure you\'re not going to get blocked and $60,000 locked in your account for 180 days (speaking from experience, there isn\'t one who hasn\'t experienced this). This app automatically updates order status in PayPal + tracking number directly. Because this happens very quickly (immediately), it ensures PayPal will rank your account high (won\'t limit you in terms of volume of funds), and also won\'t block your money. A must for anyone processing with PayPal on their site!',
      url: 'https://platform.shoffi.app/r/rl_Fn8dZcAb'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#F59E0B' }} />
            <span className="text-sm font-semibold" style={{ color: '#D97706' }}>SECRET GROWTH STACK</span>
          </div>

          <h1 className="text-5xl font-bold mb-4" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Secret Apps
          </h1>
          
          <p className="text-xl" style={{ color: '#6B7280', maxWidth: '800px', margin: '0 auto' }}>
            The right apps can transform your business 180 degrees. Each app does something small and critical - 
            together they create massive change. This is your must-install checklist for success.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Logo */}
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: '#F9FAFB' }}>
                  <img 
                    src={app.logo} 
                    alt={app.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                {/* Content */}
                <div className="mb-4">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5" style={{ color: '#3B82F6' }} />
                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                      {app.category}
                    </span>
                  </div>

                  {/* App Name */}
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1E1E1E' }}>
                    {app.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                    {app.shortDesc}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 rounded-xl font-semibold text-sm text-center transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                    }}
                  >
                    Install with Discount
                  </a>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="flex items-center justify-center w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      color: '#3B82F6'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3B82F6';
                      e.currentTarget.style.background = '#EFF6FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.background = '#FFFFFF';
                    }}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selectedApp && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedApp(null)}
          >
            <div 
              className="max-w-3xl w-full max-h-[85vh] overflow-y-auto relative rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
            >
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute top-4 right-4 p-2 rounded-full transition-all z-10"
                style={{ background: '#F0F4F8' }}
              >
                <X className="w-5 h-5" style={{ color: '#6B7280' }} />
              </button>

              <div className="p-6 md:p-8">
                {/* Logo & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center" style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB'
                  }}>
                    <img 
                      src={selectedApp.logo} 
                      alt={selectedApp.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <selectedApp.icon className="w-5 h-5" style={{ color: '#3B82F6' }} />
                      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{
                        background: '#EFF6FF',
                        color: '#3B82F6',
                        border: '1px solid #DBEAFE'
                      }}>
                        {selectedApp.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#1E1E1E' }}>
                      {selectedApp.name}
                    </h2>
                  </div>
                </div>

                {/* Full Description */}
                <p className="text-base leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                  {selectedApp.description}
                </p>

                {/* Special Features */}
                {selectedApp.testIdeas && (
                  <div className="mb-6 p-4 rounded-lg" style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB'
                  }}>
                    <h4 className="font-semibold mb-3 text-sm" style={{ color: '#3B82F6' }}>
                      10 Meaningful Test Ideas:
                    </h4>
                    <ul className="space-y-2">
                      {selectedApp.testIdeas.map((idea, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2" style={{ color: '#4B5563' }}>
                          <span style={{ color: '#3B82F6' }}>•</span>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedApp.surveyQuestions && (
                  <div className="mb-6 p-4 rounded-lg" style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB'
                  }}>
                    <h4 className="font-semibold mb-3 text-sm" style={{ color: '#3B82F6' }}>
                      Example Survey Questions:
                    </h4>
                    <div className="space-y-3">
                      {selectedApp.surveyQuestions.map((sq, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium mb-1" style={{ color: '#1E1E1E' }}>{sq.q}</p>
                          <ul className="ml-4 space-y-1">
                            {sq.options.map((opt, i) => (
                              <li key={i} style={{ color: '#6B7280' }}>☐ {opt}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedApp.exampleImage && (
                  <div className="mb-6">
                    <img 
                      src={selectedApp.exampleImage} 
                      alt={`${selectedApp.name} example`}
                      className="rounded-lg w-full"
                      style={{ border: '1px solid #E5E7EB' }}
                    />
                  </div>
                )}

                {/* Stats */}
                {selectedApp.stats && (
                  <div className="flex gap-4 mb-6">
                    <div className="px-4 py-2 rounded-lg" style={{
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0'
                    }}>
                      <p className="text-xs" style={{ color: '#22C55E' }}>Avg Profit/Order</p>
                      <p className="text-xl font-bold" style={{ color: '#16A34A' }}>{selectedApp.stats.avgProfit}</p>
                    </div>
                    <div className="px-4 py-2 rounded-lg" style={{
                      background: '#EFF6FF',
                      border: '1px solid #DBEAFE'
                    }}>
                      <p className="text-xs" style={{ color: '#3B82F6' }}>ROI</p>
                      <p className="text-xl font-bold" style={{ color: '#2563EB' }}>{selectedApp.stats.roi}</p>
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedApp.isFree && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{
                      background: '#F0FDF4',
                      color: '#22C55E',
                      border: '1px solid #BBF7D0'
                    }}>
                      FREE
                    </span>
                  )}
                  {selectedApp.couponCode && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{
                      background: '#FEFCE8',
                      color: '#D97706',
                      border: '1px solid #FDE68A'
                    }}>
                      Code: {selectedApp.couponCode}
                    </span>
                  )}
                  {selectedApp.conversionLift && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{
                      background: '#EFF6FF',
                      color: '#3B82F6',
                      border: '1px solid #DBEAFE'
                    }}>
                      +{selectedApp.conversionLift} CVR
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <a
                  href={selectedApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                  }}
                >
                  Install {selectedApp.name} with Discount
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
