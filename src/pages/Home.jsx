import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Calculator, CheckSquare, Package, BarChart3, ExternalLink, Target, Palette, Bell, Brain, Gift, X, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const getTimeBasedGreeting = (firstName) => {
  const hour = new Date().getHours();
  const greetings = {
    early: [
      `Up early again, ${firstName}. That's how winners are made.`,
      `Morning hustle already? You don't rest, ${firstName}.`,
      `You're up before the world, ${firstName}. Respect.`,
      `Early start, ${firstName}. Let's make it count.`
    ],
    morning: [
      `Good morning, ${firstName}. Time to make something happen.`,
      `Fresh start, ${firstName}. Let's crush it today.`,
      `Morning focus hits different, ${firstName}. Let's go.`,
      `You're right on time, ${firstName} — success doesn't wait.`
    ],
    work: [
      `Let's lock in, ${firstName}. No distractions.`,
      `Deep focus hour, ${firstName}. This is where it happens.`,
      `Dialed in, ${firstName}? Perfect — time to execute.`,
      `Stay sharp, ${firstName}. Small moves, big outcomes.`
    ],
    midday: [
      `Still going strong, ${firstName}. That's the difference.`,
      `Midday energy's a weapon, ${firstName}. Use it.`,
      `Keep pushing, ${firstName} — the day's still young.`,
      `You're in the zone, ${firstName}. Don't lose it.`
    ],
    afternoon: [
      `Afternoon grind, ${firstName}. Let's keep the fire going.`,
      `Don't slow down now, ${firstName}. You're just getting started.`,
      `Most people fade now — you don't, ${firstName}.`,
      `Energy's dipping? Not you, ${firstName}. Let's move.`
    ],
    power: [
      `Golden hours, ${firstName}. Time to finish strong.`,
      `Wrap it up with style, ${firstName}.`,
      `Every hour counts, ${firstName} — make this one matter.`,
      `You've come too far today to coast now, ${firstName}.`
    ],
    evening: [
      `Still grinding, ${firstName}? That's the spirit.`,
      `Most people stop now — you keep building, ${firstName}.`,
      `You're wired different, ${firstName}. No doubt about it.`,
      `Late-day energy hits hard when it's purpose, ${firstName}.`
    ],
    night: [
      `Evening focus mode, ${firstName}. Quiet = power.`,
      `Lights on, mind sharp. You're built for this, ${firstName}.`,
      `You move when others chill, ${firstName}. Respect.`,
      `Night work always pays off, ${firstName}.`
    ],
    latenight: [
      `Late night grind again, ${firstName}? You never quit.`,
      `That after-hours drive's rare, ${firstName}. Keep it.`,
      `You're the type that makes others wonder how, ${firstName}.`,
      `Late nights, big dreams — you're living it, ${firstName}.`
    ],
    nightowl: [
      `Still up, ${firstName}? That's dedication.`,
      `Night owl, huh? You're dangerous, ${firstName}.`,
      `Late night hustler mode activated, ${firstName}.`,
      `Sleep's overrated when you're building empires, ${firstName}.`
    ]
  };

  let timeGreetings;
  if (hour >= 5 && hour < 7) timeGreetings = greetings.early;
  else if (hour >= 7 && hour < 9) timeGreetings = greetings.morning;
  else if (hour >= 9 && hour < 11) timeGreetings = greetings.work;
  else if (hour >= 11 && hour < 13) timeGreetings = greetings.midday;
  else if (hour >= 13 && hour < 15) timeGreetings = greetings.afternoon;
  else if (hour >= 15 && hour < 17) timeGreetings = greetings.power;
  else if (hour >= 17 && hour < 19) timeGreetings = greetings.evening;
  else if (hour >= 19 && hour < 21) timeGreetings = greetings.night;
  else if (hour >= 21 && hour < 23) timeGreetings = greetings.latenight;
  else timeGreetings = greetings.nightowl;

  return timeGreetings[Math.floor(Math.random() * timeGreetings.length)];
};

export default function Home() {
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [greeting, setGreeting] = useState('');

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const profiles = await base44.entities.UserProfile.list();
      return profiles[0];
    }
  });

  useEffect(() => {
    if (userProfile?.first_name) {
      setGreeting(getTimeBasedGreeting(userProfile.first_name));
    }
  }, [userProfile]);

  const features = [
  {
    title: 'Profit Calculator',
    description: 'Forecast your profit potential in seconds',
    icon: Calculator,
    url: createPageUrl('Calculators'),
    color: '#007DFF',
    gradient: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)'
  },
  {
    title: '$100K Blueprint',
    description: 'The exact metrics that turn potential into scale',
    icon: Target,
    url: createPageUrl('Blueprint100K'),
    color: '#00C4B4',
    gradient: 'linear-gradient(135deg, #00C4B4 0%, #00D78F 100%)'
  },
  {
    title: 'Setup Checklist',
    description: 'Launch the right way - no wasted steps',
    icon: CheckSquare,
    url: createPageUrl('Checklist'),
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)'
  },
  {
    title: 'A/B Test Results',
    description: 'Find your proven winners instantly',
    icon: BarChart3,
    url: createPageUrl('ABTestResults'),
    color: '#00D78F',
    gradient: 'linear-gradient(135deg, #00D78F 0%, #10B981 100%)'
  },
  {
    title: 'Secret Apps',
    description: 'Tools used by top-performing stores',
    icon: Package,
    url: createPageUrl('SecretApps'),
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)'
  },
  {
    title: 'AI Tools',
    description: 'Cutting-edge intelligence for your store',
    icon: Brain,
    url: createPageUrl('AITools'),
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)'
  },
  {
    title: 'Design Inspiration',
    description: 'Premium UI patterns that convert',
    icon: Palette,
    url: createPageUrl('WebUIInspiration'),
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)'
  },
  {
    title: 'Platform Updates',
    description: 'Latest features and improvements',
    icon: Bell,
    url: createPageUrl('Updates'),
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)'
  }];


  return (
    <div className="min-h-screen" style={{ background: '#F9FBFF' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{
            color: '#010C31',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            {greeting || 'Ready to make money?'}
          </h1>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              to={createPageUrl('Calculators')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0, 125, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 125, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 125, 255, 0.3)';
              }}
            >
              <Calculator className="w-5 h-5" />
              Calculate Profits
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to={createPageUrl('SecretApps')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: '#FFFFFF',
                color: '#007DFF',
                border: '2px solid #007DFF',
                boxShadow: '0 2px 12px rgba(0, 125, 255, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EFF6FF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 125, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 125, 255, 0.15)';
              }}
            >
              <Package className="w-5 h-5" />
              Discover Secret Apps
            </Link>

            <button
              onClick={() => setShowWhatsAppPopup(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: '#EFF6FF',
                color: '#007DFF',
                border: '2px solid #007DFF',
                boxShadow: '0 2px 12px rgba(0, 125, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 125, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#EFF6FF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 125, 255, 0.1)';
              }}
            >
              <Gift className="w-5 h-5" />
              Exclusive Bonus
            </button>

            <a
              href="https://quantum-scale.co/pages/bundle-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: '#FFFFFF',
                color: '#6B7280',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#007DFF';
                e.currentTarget.style.borderColor = '#DBEAFE';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 125, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6B7280';
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Build Your Bundle
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Growth Path Hero Block */}
        <div className="mb-8 p-10 md:p-12 rounded-2xl relative overflow-hidden" style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
        }}>
          {/* Subtle Background Gradient */}
          <div className="absolute inset-0 opacity-30" style={{
            background: 'radial-gradient(circle at top right, rgba(0, 125, 255, 0.08), transparent 60%)'
          }} />

          <div className="relative z-10 grid md:grid-cols-5 gap-10 items-center">
            {/* Left: Text Content (40%) */}
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight" style={{
                color: '#010C31',
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '-0.02em',
                lineHeight: '1.3'
              }}>The path to $100,000 profit per month is crystal clear.
You know what to do - now make it happen.

              </h2>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{
                  background: '#EFF6FF',
                  color: '#007DFF'
                }}>
                  $30 CAC
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{
                  background: '#ECFDF5',
                  color: '#00D78F'
                }}>
                  $700 LTV
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{
                  background: '#FEF3C7',
                  color: '#F59E0B'
                }}>
                  $240 Daily Budget
                </span>
              </div>
            </div>

            {/* Right: Growth Chart Visual (60%) */}
            <div className="md:col-span-3 relative h-56 md:h-64">
              <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#007DFF" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#007DFF" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#007DFF" stopOpacity="0.02" />
                  </linearGradient>
                  <filter id="glowShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#007DFF" />
                    <stop offset="100%" stopColor="#00A8FF" />
                  </linearGradient>
                </defs>
                
                {/* Grid Lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={30 + i * 30}
                    x2="480"
                    y2={30 + i * 30}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                ))}
                
                {/* Gradient Fill Area with Shadow */}
                <path
                  d="M 40 190 
                     Q 80 185, 100 175 
                     Q 120 165, 140 150 
                     Q 160 135, 180 115 
                     Q 220 85, 260 65 
                     Q 300 50, 340 40 
                     Q 380 32, 420 28 
                     Q 450 25, 480 23
                     L 480 190 L 40 190 Z"
                  fill="url(#areaGradient)"
                  filter="url(#glowShadow)"
                />
                
                {/* Growth Line - Animated */}
                <path
                  d="M 40 190 
                     Q 80 185, 100 175 
                     Q 120 165, 140 150 
                     Q 160 135, 180 115 
                     Q 220 85, 260 65 
                     Q 300 50, 340 40 
                     Q 380 32, 420 28 
                     Q 450 25, 480 23"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: '800',
                    strokeDashoffset: '800',
                    animation: 'drawLine 2.5s ease-out forwards'
                  }}
                />
                
                {/* Key Data Points - Static Filled Dots with fade-in */}
                {[
                  { x: 100, y: 175 },
                  { x: 180, y: 115 },
                  { x: 260, y: 65 },
                  { x: 340, y: 40 },
                  { x: 420, y: 28 },
                  { x: 480, y: 23 }
                ].map((point, idx) => (
                  <circle
                    key={idx}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#FFFFFF"
                    stroke="#007DFF"
                    strokeWidth="2.5"
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.4s ease-out ${0.6 + idx * 0.15}s forwards`
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Feature Grid - 8 Clean Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link
                key={idx}
                to={feature.url}
                className="group relative p-7 rounded-2xl transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = `0 16px 40px ${feature.color}15`;
                  e.currentTarget.style.borderColor = `${feature.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }}>

                {/* Icon Container with Gradient Background */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden"
                  style={{
                    background: `${feature.color}10`,
                    border: `1px solid ${feature.color}20`
                  }}>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: feature.gradient,
                      mixBlendMode: 'soft-light'
                    }} />

                  <Icon
                    className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: feature.color }} />

                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#010C31' }}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: '#8A94A6' }}>
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Glow Effect on Hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${feature.color}08, transparent 70%)`,
                    mixBlendMode: 'screen'
                  }} />

              </Link>);

          })}
        </div>
      </div>

      {/* WhatsApp Popup */}
      {showWhatsAppPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowWhatsAppPopup(false)}
        >
          <div 
            className="max-w-md w-full p-8 rounded-2xl relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              border: '2px solid #007DFF',
              boxShadow: '0 12px 40px rgba(0, 125, 255, 0.3), 0 0 60px rgba(0, 125, 255, 0.15)'
            }}
          >
            <button
              onClick={() => setShowWhatsAppPopup(false)}
              className="absolute top-4 right-4 p-2 rounded-full transition-all"
              style={{ background: '#F9FAFB' }}
            >
              <X className="w-5 h-5" style={{ color: '#6B7280' }} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)' }}>
                <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>
                Secret WhatsApp
              </h2>
              
              <div className="space-y-2 mb-4">
                <p className="text-base" style={{ color: '#4B5563' }}>
                  Content worth thousands of dollars.
                </p>
                <p className="text-base" style={{ color: '#4B5563' }}>
                  Never sent via email. No spam.
                </p>
                <p className="text-base font-semibold" style={{ color: '#1E1E1E' }}>
                  Only the critical stuff.
                </p>
              </div>

              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Click below → "JOIN" is already typed → Hit Send
              </p>

              <a
                href="https://wa.me/message/TUTK7WBVXQX3I1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-all w-full justify-center"
                style={{
                  background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 16px rgba(0, 125, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 125, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 125, 255, 0.3)';
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Join Now
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}