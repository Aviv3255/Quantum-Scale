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
  const firstName = userName?.split(' ')[0] || 'אורח';

  if (hour >= 5 && hour < 12) {
    return {
      greeting: `בוקר טוב, ${firstName}`,
      icon: Sun,
      message: "התחלה חדשה, הזדמנויות חדשות. בואו נהפוך את היום הזה למשמעותי.",
      mood: 'morning',
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: `צהריים טובים, ${firstName}`,
      icon: Rocket,
      message: "אתה בזרימה. תשמור על המומנטום.",
      mood: 'afternoon',
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: `ערב טוב, ${firstName}`,
      icon: Sparkles,
      message: "מסיימים את היום? קחו רגע לחגוג את ההצלחות של היום.",
      mood: 'evening',
    };
  } else {
    return {
      greeting: `עובדים מאוחר, ${firstName}?`,
      icon: Moon,
      message: "ינשופי לילה בונים אימפריות. אבל אל תשכחו לנוח.",
      mood: 'night',
    };
  }
}

const stats = [
  {
    label: 'התקדמות בצ׳קליסט',
    value: '12',
    total: '250',
    unit: 'צעדים',
    change: '+3 השבוע',
    positive: true,
    icon: CheckSquare,
  },
  {
    label: 'מאמרים שנקראו',
    value: '5',
    total: '38',
    unit: 'מאמרים',
    change: '+2 השבוע',
    positive: true,
    icon: BookOpen,
  },
  {
    label: 'רצף נוכחי',
    value: '7',
    unit: 'ימים',
    change: 'המשיכו כך!',
    positive: true,
    icon: Flame,
  },
  {
    label: 'כלים בשימוש',
    value: '3',
    unit: 'כלים',
    change: 'נסו עוד',
    positive: true,
    icon: Zap,
  },
];

const quickActions = [
  {
    title: 'המשך בצ׳קליסט',
    description: 'המשיכו מאיפה שעצרתם',
    href: '/checklist',
    icon: CheckSquare,
    color: 'bg-[var(--accent-gold-bg)]',
    iconColor: 'text-[var(--accent-gold)]',
  },
  {
    title: 'קראו מאמרים',
    description: '38+ מדריכים מעמיקים',
    href: '/learn',
    icon: BookOpen,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'מחשבונים',
    description: 'כלי רווח ו-KPI',
    href: '/calculators',
    icon: TrendingUp,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'גלו אפליקציות',
    description: 'מאגר אפליקציות מומלצות',
    href: '/apps/shopify',
    icon: Target,
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full" />
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
                <GreetingIcon size={28} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
              </h1>
              <p className="mt-2">{message}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <Flame size={16} className="text-[var(--accent-gold)]" />
              <span className="text-sm font-medium text-[var(--accent-gold)]">רצף של 7 ימים</span>
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
            <h2 className="section-title">פעולות מהירות</h2>
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
                <div className="flex items-center gap-1 text-sm font-medium text-[var(--accent-gold)] group-hover:gap-2 transition-all">
                  התחילו עכשיו
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
            <h2 className="section-title">המסע שלכם</h2>
          </div>
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  צ׳קליסט הצלחה של 250 צעדים
                </h3>
                <p className="text-[var(--text-muted)] mb-4">
                  אתם מתקדמים. כל צעד מקרב אתכם לבניית מותג איקומרס מצליח.
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
                  המשיכו בצ׳קליסט
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
              <div className="w-full md:w-48 h-32 rounded-2xl bg-[var(--accent-gold-bg)] flex items-center justify-center">
                {/* Monkey illustration placeholder */}
                <svg width="100" height="100" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="90" cy="70" r="35" fill="#C4A574"/>
                  <ellipse cx="90" cy="78" rx="24" ry="20" fill="#E8D5B7"/>
                  <circle cx="78" cy="68" r="6" fill="white"/>
                  <circle cx="102" cy="68" r="6" fill="white"/>
                  <circle cx="79" cy="69" r="3" fill="#2D1810"/>
                  <circle cx="103" cy="69" r="3" fill="#2D1810"/>
                  <ellipse cx="90" cy="80" rx="5" ry="3" fill="#A67B4C"/>
                  <path d="M82 86 Q90 92 98 86" stroke="#A67B4C" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <circle cx="57" cy="65" r="12" fill="#C4A574"/>
                  <circle cx="57" cy="65" r="7" fill="#E8D5B7"/>
                  <circle cx="123" cy="65" r="12" fill="#C4A574"/>
                  <circle cx="123" cy="65" r="7" fill="#E8D5B7"/>
                  {/* Thumbs up hand */}
                  <path d="M60 110 L65 100 L75 100 L75 130 L55 130 L55 115 Z" fill="#C4A574"/>
                  <ellipse cx="70" cy="95" rx="8" ry="6" fill="#C4A574"/>
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
            <h2 className="section-title">שמרו על המומנטום</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <h4 className="font-semibold text-[var(--text-primary)] mb-2">מאמר מומלץ</h4>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                בהתאם להתקדמות שלכם, אנחנו ממליצים לקרוא על אופטימיזציה של ערך חיי לקוח (CLV).
              </p>
              <Link href="/learn" className="text-sm font-medium text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] inline-flex items-center gap-1">
                קראו עכשיו <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card">
              <h4 className="font-semibold text-[var(--text-primary)] mb-2">הפוקוס של היום</h4>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                השלימו עוד 3 פריטים בצ׳קליסט כדי לשמור על הרצף ולפתוח את אבן הדרך הבאה.
              </p>
              <Link href="/checklist" className="text-sm font-medium text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] inline-flex items-center gap-1">
                לצ׳קליסט <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
