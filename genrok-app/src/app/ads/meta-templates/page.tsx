'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Copy, Check, Users, Lock, Gift, Sparkles, ExternalLink } from 'lucide-react';
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

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollTop = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate); };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
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
                className="h-full overflow-hidden"
                style={{ scrollBehavior: 'auto' }}
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
      </div>
    </DashboardLayout>
  );
}
