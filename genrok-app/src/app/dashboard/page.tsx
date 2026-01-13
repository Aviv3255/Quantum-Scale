'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sun,
  Moon,
  Rocket,
  Sparkles,
  CheckSquare,
  BookOpen,
  TrendingUp,
  Target,
  ArrowRight,
  Flame,
  Trophy,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

function getTimeBasedGreeting(userName: string) {
  const hour = new Date().getHours();
  const firstName = userName?.split(' ')[0] || 'there';

  if (hour >= 5 && hour < 12) {
    return {
      greeting: `Good morning, ${firstName}`,
      icon: Sun,
      message: "The empire awaits. Your competitors are sleeping - you're not.",
      mood: 'morning',
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: `Good afternoon, ${firstName}`,
      icon: Rocket,
      message: "Peak hours. Every action now compounds into future millions.",
      mood: 'afternoon',
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: `Good evening, ${firstName}`,
      icon: Sparkles,
      message: "The grind doesn't stop. Neither do winners.",
      mood: 'evening',
    };
  } else {
    return {
      greeting: `Working late, ${firstName}?`,
      icon: Moon,
      message: "Night owls build empires. This is where legends are made.",
      mood: 'night',
    };
  }
}

const stats = [
  {
    label: 'Checklist Progress',
    value: '12',
    total: '250',
    unit: 'steps',
    change: '+3 this week',
    positive: true,
    icon: CheckSquare,
  },
  {
    label: 'Articles Read',
    value: '5',
    total: '38',
    unit: 'articles',
    change: '+2 this week',
    positive: true,
    icon: BookOpen,
  },
  {
    label: 'Current Streak',
    value: '7',
    unit: 'days',
    change: 'Keep it going!',
    positive: true,
    icon: Flame,
  },
  {
    label: 'Tools Used',
    value: '3',
    unit: 'tools',
    change: 'Try more',
    positive: true,
    icon: Zap,
  },
];

const quickActions = [
  {
    title: 'Continue Checklist',
    description: 'Pick up where you left off',
    href: '/checklist',
    icon: CheckSquare,
    color: 'bg-[var(--primary)]',
    iconColor: 'text-white',
  },
  {
    title: 'Read Articles',
    description: '38+ in-depth guides',
    href: '/learn',
    icon: BookOpen,
    color: 'bg-[var(--bg-secondary)]',
    iconColor: 'text-[var(--text-primary)]',
  },
  {
    title: 'Use Calculators',
    description: 'Profit & KPI tools',
    href: '/calculators',
    icon: TrendingUp,
    color: 'bg-[var(--bg-secondary)]',
    iconColor: 'text-[var(--text-primary)]',
  },
  {
    title: 'Browse Apps',
    description: 'Curated app directory',
    href: '/apps/shopify',
    icon: Target,
    color: 'bg-[var(--bg-secondary)]',
    iconColor: 'text-[var(--text-primary)]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const { greeting, icon: GreetingIcon, message } = getTimeBasedGreeting(userName);

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header with Greeting */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="flex items-center gap-3">
                {greeting}
                <GreetingIcon size={28} className="text-[var(--text-tertiary)]" strokeWidth={1.5} />
              </h1>
              <p className="mt-2">{message}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]" style={{ color: '#FFFFFF' }}>
              <Flame size={16} style={{ color: '#FFFFFF' }} />
              <span className="text-sm font-medium">Day 7 Streak</span>
            </div>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="stats-grid"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="stat-card">
              <div className="stat-icon">
                <stat.icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">
                  {stat.value}
                  {stat.total && (
                    <span className="text-base font-normal text-[var(--text-muted)]">
                      /{stat.total}
                    </span>
                  )}
                </span>
                <div className="stat-change positive">{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section"
        >
          <div className="section-header">
            <Target size={20} className="section-icon" />
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="grid-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="card card-hover group"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon size={22} className={action.iconColor} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {action.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] group-hover:gap-2 transition-all">
                  Get Started
                  <ArrowRight size={14} strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Journey Progress */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="section"
        >
          <div className="section-header">
            <Trophy size={20} className="section-icon" />
            <h2 className="section-title">Your Journey</h2>
          </div>
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  250-Step Success Checklist
                </h3>
                <p className="text-[var(--text-muted)] mb-4">
                  You&apos;re making progress. Every step brings you closer to building a successful eCommerce brand.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: '4.8%' }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    12/250
                  </span>
                </div>
                <Link
                  href="/checklist"
                  className="btn btn-primary"
                >
                  Continue Checklist
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
              <div className="w-full md:w-48 h-32 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
                {/* Monkey illustration placeholder */}
                <svg width="100" height="100" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="90" cy="70" r="35" fill="#555"/>
                  <ellipse cx="90" cy="78" rx="24" ry="20" fill="#888"/>
                  <circle cx="78" cy="68" r="6" fill="white"/>
                  <circle cx="102" cy="68" r="6" fill="white"/>
                  <circle cx="79" cy="69" r="3" fill="#1a1a1a"/>
                  <circle cx="103" cy="69" r="3" fill="#1a1a1a"/>
                  <ellipse cx="90" cy="80" rx="5" ry="3" fill="#444"/>
                  <path d="M82 86 Q90 92 98 86" stroke="#444" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <circle cx="57" cy="65" r="12" fill="#555"/>
                  <circle cx="57" cy="65" r="7" fill="#888"/>
                  <circle cx="123" cy="65" r="12" fill="#555"/>
                  <circle cx="123" cy="65" r="7" fill="#888"/>
                  {/* Thumbs up hand */}
                  <path d="M60 110 L65 100 L75 100 L75 130 L55 130 L55 115 Z" fill="#555"/>
                  <ellipse cx="70" cy="95" rx="8" ry="6" fill="#555"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header">
            <Sparkles size={20} className="section-icon" />
            <h2 className="section-title">Keep the Momentum</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <h4 className="font-semibold text-[var(--text-primary)] mb-2">Recommended Article</h4>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Based on your progress, we recommend reading about customer lifetime value optimization.
              </p>
              <Link href="/learn" className="text-sm font-medium text-[var(--text-primary)] hover:opacity-70 inline-flex items-center gap-1">
                Read Now <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card">
              <h4 className="font-semibold text-[var(--text-primary)] mb-2">Today&apos;s Focus</h4>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Complete 3 more checklist items to maintain your streak and unlock your next milestone.
              </p>
              <Link href="/checklist" className="text-sm font-medium text-[var(--text-primary)] hover:opacity-70 inline-flex items-center gap-1">
                View Checklist <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
