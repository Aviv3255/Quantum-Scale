
import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle2, Circle, ExternalLink, Monitor, Info, Edit3, Sparkles } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import CorrelationInsights from '../components/CorrelationInsights';
import RevenueInputModal from '../components/RevenueInputModal';
import { motion } from 'framer-motion';

export default function ScaleChecklist() {
  const [userName, setUserName] = useState('');
  const [progressMessage, setProgressMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);
  const [showCheckAnimation, setShowCheckAnimation] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const profiles = await base44.entities.UserProfile.list();
      return profiles[0];
    }
  });

  const { data: userPerformance } = useQuery({
    queryKey: ['userPerformance'],
    queryFn: async () => {
      const user = await base44.auth.me();
      const performances = await base44.entities.UserPerformance.filter({ user_email: user.email });
      return performances[0] || null;
    }
  });

  const { data: completedItemsQueryData } = useQuery({
    queryKey: ['checklistItems'],
    queryFn: async () => {
      const user = await base44.auth.me();
      const items = await base44.entities.ChecklistItem.filter({ user_email: user.email });
      return { user, items };
    }
  });

  const completedItems = completedItemsQueryData?.items || [];
  const userEmail = completedItemsQueryData?.user?.email;

  useEffect(() => {
    if (userProfile?.first_name) {
      setUserName(userProfile.first_name);
      // Ensure checklistItems is defined before calculating percentage
      const percentage = Math.round((completedItems.length / checklistItems.length) * 100);
      setProgressMessage(getProgressMessage(percentage, userProfile.first_name));
    }
  }, [userProfile, completedItems.length]);

  const saveRevenueMutation = useMutation({
    mutationFn: async (data) => {
      const user = await base44.auth.me();
      
      if (userPerformance) {
        // Calculate new consistency score and update count
        const totalUpdates = (userPerformance.total_updates || 0) + 1;
        // Use existing first_update_date, or current date if somehow missing (shouldn't happen if userPerformance exists)
        const firstUpdate = userPerformance.first_update_date || new Date().toISOString(); 
        
        // Calculate months tracking. Ensure firstUpdate is a Date object.
        const firstUpdateDateObj = new Date(firstUpdate);
        const now = new Date();
        // Calculate difference in milliseconds, then convert to months
        const diffTime = Math.abs(now.getTime() - firstUpdateDateObj.getTime());
        // A month is approximately 30.44 days on average. For simplicity, we can use 30 days or calculate based on actual month difference.
        // The outline's formula implies 30 days.
        const monthsTracking = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
        
        // Consistency score: based on regularity and duration
        // Max score when updating weekly for 3+ months
        const idealUpdatesPerMonth = 4; // Weekly updates
        const actualUpdatesPerMonth = totalUpdates / Math.max(monthsTracking, 1); // Avoid division by zero
        const consistencyScore = Math.min(100, Math.round((actualUpdatesPerMonth / idealUpdatesPerMonth) * 100));
        
        await base44.entities.UserPerformance.update(userPerformance.id, {
          daily_revenue: data.daily_revenue,
          roas: data.roas,
          last_updated: new Date().toISOString(),
          total_updates: totalUpdates,
          first_update_date: firstUpdate, // Preserve existing first_update_date
          consistency_score: consistencyScore
        });
      } else {
        await base44.entities.UserPerformance.create({
          user_email: user.email,
          daily_revenue: data.daily_revenue,
          roas: data.roas,
          last_updated: new Date().toISOString(),
          first_update_date: new Date().toISOString(),
          total_updates: 1,
          consistency_score: 25 // Starting score
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPerformance'] });
      // The outline explicitly removed setIsRevenueModalOpen(false) from onSuccess here.
    },
    onError: (err) => {
      console.error("Failed to save performance data:", err);
      // Optionally show a user-friendly error message
    }
  });

  const toggleItemMutation = useMutation({
    mutationFn: async ({ itemId, currentlyCompleted }) => {
      // userEmail is already available from completedItemsQueryData, no need to call base44.auth.me() again
      if (!userEmail) {
        throw new Error("User email not available for mutation.");
      }

      if (currentlyCompleted) {
        const existingItem = completedItems.find(item => item.item_id === itemId);
        if (existingItem) {
          await base44.entities.ChecklistItem.delete(existingItem.id);
        }
      } else {
        // Show check animation
        setShowCheckAnimation(itemId);
        setTimeout(() => setShowCheckAnimation(null), 800);
        
        await base44.entities.ChecklistItem.create({
          user_email: userEmail,
          item_id: itemId,
          completed: true,
          completed_at: new Date().toISOString()
        });
      }
    },
    onMutate: async ({ itemId, currentlyCompleted }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['checklistItems'] });
      
      // Snapshot the previous value
      const previousItems = queryClient.getQueryData(['checklistItems']);
      
      // Optimistically update to the new value
      queryClient.setQueryData(['checklistItems'], (oldQueryData = { user: null, items: [] }) => {
        const oldItems = oldQueryData.items;
        const newUser = oldQueryData.user;

        if (currentlyCompleted) {
          return { ...oldQueryData, items: oldItems.filter(item => item.item_id !== itemId) };
        } else {
          // Add a new item for the optimistic update
          return {
            ...oldQueryData,
            items: [...oldItems, {
              id: `temp_${Date.now()}`, // Temporary ID for optimistic UI
              item_id: itemId,
              completed: true,
              user_email: newUser?.email || 'optimistic_user', // Use actual user email if available, otherwise a placeholder
              completed_at: new Date().toISOString()
            }]
          };
        }
      });
      
      // Return a context object with the snapshotted value
      return { previousItems };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context for a rollback
      if (context?.previousItems) {
        queryClient.setQueryData(['checklistItems'], context.previousItems);
      }
      // TODO: Optionally, show a toast or error message to the user
    },
    onSettled: () => {
      // Always refetch after error or success:
      // Invalidate the cache to ensure the UI is in sync with the server
      queryClient.invalidateQueries({ queryKey: ['checklistItems'] });
    }
  });

  const isItemCompleted = (itemId) => {
    return completedItems.some(item => item.item_id === itemId && item.completed);
  };

  const handleItemLinkClick = (item) => {
    if (item.desktopOnly && isMobile) {
      alert('This feature is only available on desktop. Please open this page on your computer to access this tool.');
      return;
    }
    
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  const completionPercentage = Math.round((completedItems.length / checklistItems.length) * 100);

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ 
                 background: 'rgba(0, 125, 255, 0.08)',
                 border: '1px solid rgba(0, 125, 255, 0.2)'
               }}>
            <Sparkles className="w-4 h-4" style={{ color: '#007DFF' }} />
            <span className="text-sm font-semibold" style={{ color: '#007DFF' }}>YOUR ROADMAP TO SUCCESS</span>
          </div>

          <h1 className="text-5xl font-bold mb-4" style={{ 
            color: '#000000',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.03em'
          }}>
            {progressMessage}
          </h1>
          
          <p className="text-lg leading-relaxed mb-8" style={{ 
            color: '#6B7280',
            maxWidth: '800px'
          }}>
            This isn't just a checklist—it's the exact system that separates million-dollar stores from those that never scale.
          </p>

          {/* Revenue Update Button */}
          <button
            onClick={() => setIsRevenueModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
            style={{
              background: 'rgba(0, 125, 255, 0.08)',
              border: '1px solid rgba(0, 125, 255, 0.2)',
              color: '#007DFF'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 125, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 125, 255, 0.08)';
            }}
          >
            <Edit3 className="w-4 h-4" />
            {userPerformance?.daily_revenue || userPerformance?.roas ? 'Update' : 'Add'} Performance Data
          </button>
        </div>

        {/* Correlation Insights */}
        <CorrelationInsights 
          completionPercentage={completionPercentage}
          dailyRevenue={userPerformance?.daily_revenue || null}
          roas={userPerformance?.roas || null}
          userName={userProfile?.first_name || null}
        />

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold" style={{ 
              color: '#000000',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {completionPercentage}% Complete
            </h2>
            <span className="text-sm font-medium" style={{ color: '#6B7280' }}>
              {completedItems.length} of {checklistItems.length} steps
            </span>
          </div>

          <div 
            className="w-full rounded-full overflow-hidden"
            style={{ 
              height: '12px',
              background: '#F3F4F6'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ 
                background: 'linear-gradient(90deg, #007DFF 0%, #00C6FF 100%)',
                boxShadow: '0 0 10px rgba(0, 125, 255, 0.5)'
              }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {checklistItems.map((item) => {
            const completed = isItemCompleted(item.id);
            const isDesktopOnlyOnMobile = item.desktopOnly && isMobile;
            const showAnim = showCheckAnimation === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group p-5 rounded-2xl transition-all relative overflow-hidden"
                style={{
                  background: completed ? 'rgba(16, 185, 129, 0.04)' : '#FFFFFF',
                  border: completed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid #E5E7EB'
                }}
              >
                {/* Check Animation Overlay */}
                {showAnim && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 3, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  >
                    <CheckCircle2 className="w-32 h-32" style={{ color: '#10B981' }} />
                  </motion.div>
                )}

                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleItemMutation.mutate({ 
                      itemId: item.id, 
                      currentlyCompleted: completed 
                    })}
                    className="flex-shrink-0 transition-transform"
                    style={{ cursor: 'pointer' }}
                  >
                    {completed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle2 className="w-7 h-7" style={{ color: '#10B981' }} />
                      </motion.div>
                    ) : (
                      <Circle className="w-7 h-7" style={{ color: '#D1D5DB' }} />
                    )}
                  </button>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base" style={{ 
                      color: completed ? '#059669' : '#1F2937',
                      textDecoration: completed ? 'line-through' : 'none'
                    }}>
                      {item.title}
                      {isDesktopOnlyOnMobile && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs" 
                              style={{ background: '#FEF3C7', color: '#92400E' }}>
                          <Monitor className="w-3 h-3" />
                          Desktop Only
                        </span>
                      )}
                    </h4>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Info Button */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredInfo(item.id)}
                        onMouseLeave={() => setHoveredInfo(null)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                        style={{
                          background: '#F9FAFB',
                          border: '1px solid #E5E7EB'
                        }}
                      >
                        <Info className="w-4 h-4" style={{ color: '#6B7280' }} />
                      </button>

                      {hoveredInfo === item.id && (
                        <div 
                          className="absolute right-0 bottom-full mb-2 p-4 rounded-xl z-50"
                          style={{
                            background: '#000000',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                            minWidth: '320px',
                            maxWidth: '400px'
                          }}
                        >
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Link Button */}
                    {item.link && (
                      <button
                        onClick={() => handleItemLinkClick(item)}
                        className="px-4 py-2 rounded-lg transition-all font-medium text-sm flex items-center gap-2"
                        style={{ 
                          background: '#000000',
                          color: '#FFFFFF',
                          border: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#1a1a1a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#000000';
                        }}
                      >
                        {item.buttonText || 'Open'}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 p-10 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)'
            }}
          >
            <h2 className="text-3xl font-bold mb-3" style={{ 
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif'
            }}>
              🎉 System Complete. You're Ready to Scale.
            </h2>
            <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              Every piece is in place. Now it's just execution.
            </p>
          </motion.div>
        )}
      </div>

      {/* Revenue Input Modal */}
      <RevenueInputModal
        isOpen={isRevenueModalOpen}
        onClose={() => setIsRevenueModalOpen(false)}
        onSave={(data) => {
          saveRevenueMutation.mutate(data);
          setIsRevenueModalOpen(false); // Close modal on success if mutation is successful. This handles closing locally.
        }}
        currentData={userPerformance}
      />
    </div>
  );
}

const getProgressMessage = (percentage, firstName) => {
  const messages = {
    0: [
      `${firstName}, every empire starts here. Step one complete.`,
      `Welcome to the real game, ${firstName}. Let's build.`,
      `The difference between dreamers and doers? You just crossed it.`
    ],
    10: [
      `You're ahead of 90% who never start, ${firstName}.`,
      `Good work. You're starting to look dangerous.`,
      `You're not testing anymore—you're constructing.`
    ],
    20: [
      `The boring part builds the money machine, ${firstName}.`,
      `Quiet progress, loud results. Keep that tempo.`,
      `Foundations aren't sexy. But neither is failure.`
    ],
    30: [
      `You're not guessing anymore, ${firstName}. You're engineering.`,
      `Each step adds real infrastructure.`,
      `From here on, everything starts compounding.`
    ],
    40: [
      `Halfway in, ${firstName}. That's momentum, not luck.`,
      `Systems don't fail—people do. You're becoming the system.`,
      `You're past the tipping point. It's getting exciting.`
    ],
    50: [
      `Now it's visible, ${firstName}. The dots connect.`,
      `You've built half the rocket. Time to fuel the rest.`,
      `You're in the phase where growth feels inevitable.`
    ],
    60: [
      `This isn't a checklist anymore—it's a command center.`,
      `You're entering operational mode. Scale's no longer theory.`,
      `You've officially outgrown the learning curve, ${firstName}.`
    ],
    70: [
      `The system breathes profit now. It's chasing you.`,
      `Every dollar you put in from here multiplies.`,
      `This is where ordinary turns into unfair advantage.`
    ],
    80: [
      `Welcome to optimization, ${firstName}. The fun part.`,
      `You've built a machine. Now you make it elegant.`,
      `This isn't luck. It's controlled dominance.`
    ],
    90: [
      `Full system online. You've built what most only imagine.`,
      `No more theory. Just scale, predictability, and freedom.`,
      `${firstName}, you just graduated from setup to supremacy.`
    ]
  };

  let bracket = 0;
  if (percentage >= 90) bracket = 90;
  else if (percentage >= 80) bracket = 80;
  else if (percentage >= 70) bracket = 70;
  else if (percentage >= 60) bracket = 60;
  else if (percentage >= 50) bracket = 50;
  else if (percentage >= 40) bracket = 40;
  else if (percentage >= 30) bracket = 30;
  else if (percentage >= 20) bracket = 20;
  else if (percentage >= 10) bracket = 10;

  const options = messages[bracket];
  return options[Math.floor(Math.random() * options.length)];
};

const checklistItems = [
  {
    id: 'domain',
    title: 'Purchase Domain (.com/.co)',
    description: 'Get your professional domain name. This is your brand\'s home on the internet.',
    link: 'https://www.godaddy.com',
    buttonText: 'Get Domain'
  },
  {
    id: 'professional_email',
    title: 'Setup Professional Email',
    description: 'Create a business email under your domain (e.g., hello@yourbrand.com) - builds trust and credibility.',
    link: 'https://www.godaddy.com',
    buttonText: 'Setup Email'
  },
  {
    id: 'email_to_shopify',
    title: 'Connect Email to Shopify',
    description: 'Link your professional email in Shopify settings so all customer communications come from your branded address.'
  },
  {
    id: 'footer_policies',
    title: 'Add Footer Policies',
    description: 'Add Shipping Policy, Terms of Service, Privacy Policy, and Refund Policy to your footer menu. Required for trust and legal protection.'
  },
  {
    id: 'logo_transparent',
    title: 'Add Transparent Logo',
    description: 'Upload a professional logo with transparent background to Shopify and add it to your header. First impression matters.'
  },
  {
    id: 'paypal',
    title: 'Connect PayPal',
    description: 'Enable PayPal payments. Many customers prefer this payment method.'
  },
  {
    id: 'credit_card',
    title: 'Connect Credit Card Processing',
    description: 'Enable credit card payments including Google Pay and Apple Pay. Essential for maximizing conversions.'
  },
  {
    id: 'test_purchase',
    title: 'Complete Test Purchase',
    description: 'Make a test order to ensure your entire checkout process works perfectly.'
  },
  {
    id: 'private_agent',
    title: 'Connect Private Agent',
    description: 'Get cheaper prices than AliExpress, branding options, 5-7 day shipping, pickup/home delivery, no upfront payment, and personal WhatsApp support.',
    link: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'meta_verified',
    title: 'Enable Meta Verified',
    description: 'Get the blue verification badge on your Facebook business page - builds massive trust and credibility.',
    link: 'https://business.facebook.com/business/loginpage/?next=https%253A%25252F%25252Fbusiness.facebook.com%25252F%3Fnav_ref%253Dbiz_unified_f3_login_page_to_mbs&login_options%5B0%5D=FB&login_options%5B1%5D=IG&login_options%5B2%5D=SSO&config_ref=biz_login_tool_flavor_mbs',
    buttonText: 'Verify'
  },
  {
    id: 'premium_theme',
    title: 'Install Premium Theme (Shrine)',
    description: 'Professional, conversion-optimized theme. Use code QUANTUMSCALE for 15% off.',
    link: 'https://shrinesolutions.com/?ref=0d9fe741',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'meta_pixel',
    title: 'Install Meta Pixel',
    description: 'Track conversions, build audiences, and optimize your ads. Absolutely critical for scaling.'
  },
  {
    id: 'product_catalog',
    title: 'Build Quality Product Catalog',
    description: 'Add a wide, high-quality product selection. Test different products to find winners.'
  },
  {
    id: 'klaviyo',
    title: 'Connect Klaviyo',
    description: 'Email marketing automation - recover abandoned carts and build customer relationships.',
    link: 'https://www.klaviyo.com/',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'coupon_blocker',
    title: 'Install Coupon Code Leak Blocker',
    description: 'Prevent unauthorized coupon sites from leaking your discount codes and killing your margins.',
    link: 'https://platform.shoffi.app/r/rl_U2L0seLE',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'paypal_tracking',
    title: 'Auto PayPal Tracking Sync',
    description: 'Upload tracking numbers to PayPal at lightning speed. This gives you an excellent rating with PayPal, prevents account holds (getting $70k frozen for 6 months is not fun), and significantly increases your monthly cash flow limit.',
    link: 'https://platform.shoffi.app/r/rl_Fn8dZcAb',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'data_app',
    title: 'Install Data Monitoring App',
    description: 'Track all your numbers, customer segmentation, top spenders, RFM analysis, and LTV across all time periods. Essential for data-driven decisions.',
    link: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'triple_whale',
    title: 'Connect Triple Whale',
    description: 'Look at campaigns ONLY in Triple Whale dashboard, not Meta/Google. Triple Whale tracks 100% of conversions and attributes them with 100% accuracy to the right creatives/campaigns, unlike Meta and Google.',
    link: 'https://triplewhale.com/',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'google_analytics',
    title: 'Install Google Analytics',
    description: 'Track your traffic sources, user behavior, and conversions. Data is power.',
    link: 'https://go.fiverr.com/visit/?bta=837001&brand=fiverrcpa&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fjosswalle%252Fset-up-google-analytics-4%253Fcontext_referrer%253Dsearch_gigs_with_recommendations_row_3%2526source%253Dtop-bar%2526ref_ctx_id%253D05a2e24337284f9e8a20821d7de8b00f%2526pckg_id%253D1%2526pos%253D6%2526context_type%253Dauto%2526funnel%253D05a2e24337284f9e8a20821d7de8b00f%2526imp_id%253D74771019-4b64-4081-a739-dfa5d1409fd4',
    desktopOnly: true,
    buttonText: 'Hire on Fiverr'
  },
  {
    id: 'post_purchase_survey',
    title: 'Install Post Purchase Survey',
    description: 'Understand where your customers come from, what influenced their decision, and how to replicate success. This data is gold for scaling.',
    link: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'abandoned_checkout_flow',
    title: 'Build 70%+ Abandoned Checkout Recovery Flow',
    description: 'Convert at least 70% of abandoned checkouts with a strategic automated flow. Massive revenue recovery opportunity.',
    link: 'https://quantum-scale.co/products/abandoned-checkout-finisher',
    desktopOnly: true,
    buttonText: 'Apply'
  },
  {
    id: 'customer_1000_system',
    title: 'Install System That Turns Every Customer Into $1,000',
    description: 'Implement the automatic system that turns single purchases into $1,000+ lifetime value per customer.',
    link: 'https://quantum-scale.co/products/the-automatic-system-that-earn-1-000-per-customer',
    desktopOnly: true,
    buttonText: 'Apply'
  },
  {
    id: 'sell_these_products',
    title: 'Upload Wide & Proven Product Catalog',
    description: 'Add products that are already winning in the market. Don\'t guess - use proven winners.',
    link: createPageUrl('SellTheseProducts'),
    buttonText: 'View Products'
  },
  {
    id: 'facebook_posts',
    title: 'Post 3-5 Times on Facebook Business Page',
    description: 'If your page is empty, people coming from ads will leave immediately without purchasing. Fill it with engaging content first.'
  },
  {
    id: 'psychological_design',
    title: 'Design Your Store With Design That Forces The Brain to Buy',
    description: 'Transform your site from basic to a conversion machine using psychological design principles that bypass conscious decision-making.',
    link: 'https://quantum-scale.co/products/the-subconscious-switch',
    desktopOnly: true,
    buttonText: 'Apply'
  },
  {
    id: 'cart_upsells',
    title: 'Install Cart Upsells',
    description: 'Add 8-12 relatively general products that most buyers will love, priced at $20-50. Increase AOV effortlessly.',
    link: 'https://platform.shoffi.app/r/rl_cm697iNI',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'extreme_social_proof',
    title: 'Implement Extreme Social Proof',
    description: 'It\'s all about whether the customer believes you. Herd mentality is the most contagious phenomenon in influence. Master this and you\'ll never go hungry.',
    link: 'https://quantum-scale.co/products/the-social-proof',
    desktopOnly: true,
    buttonText: 'Apply'
  },
  {
    id: 'product_order',
    title: 'Organize Products in The Right Order (10+ Products)',
    description: 'Like walking into Zara - if you find 1 item you like, you ask "should I buy?". But find 7 items, and the question becomes "what should I buy?". Strategic product placement changes everything.',
    link: 'https://quantum-scale.co/products/product-mapping',
    desktopOnly: true,
    buttonText: 'Apply'
  },
  {
    id: 'quiz_tactic',
    title: 'Implement The Quiz Tactic',
    description: 'A game-changing tactic that serves as a 24/7 data machine, converting visitors on autopilot and completely transforming your conversion rate benchmarks.',
    link: 'https://quantum-scale.co/products/the-quiz-tactic',
    desktopOnly: true,
    buttonText: 'Apply'
  },
  {
    id: 'parity_rocket',
    title: 'Add Parity Rocket',
    description: 'Smart discount bar that auto-adjusts to visitor\'s country and local purchasing power. Creates personal connection, reduces price gaps, and increases conversions by 45-70% on average.',
    link: 'https://parityrocket.com/',
    desktopOnly: true,
    buttonText: 'Connect'
  },
  {
    id: 'ai_chatbot',
    title: 'Add AI Chatbot',
    description: 'Answer questions 24/7, reduce cart abandonment, and increase trust with intelligent automated support.',
    link: 'https://affiliate.tidio.com/d41qmpi2a46g',
    desktopOnly: true,
    buttonText: 'Connect'
  }
];
