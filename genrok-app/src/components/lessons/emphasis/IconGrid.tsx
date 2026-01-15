'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Zap, Target, Shield, Globe, Sparkles, Heart,
  Clock, Award, TrendingUp, Users, Star, Check
} from 'lucide-react';

interface IconItem {
  icon?: LucideIcon;
  iconName?: string;
  label: string;
  description?: string;
}

interface IconGridProps {
  items: IconItem[];
  title?: string;
  columns?: 2 | 3 | 4;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

// Icon map for string-based icon names
const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  target: Target,
  shield: Shield,
  globe: Globe,
  sparkles: Sparkles,
  heart: Heart,
  clock: Clock,
  award: Award,
  trending: TrendingUp,
  users: Users,
  star: Star,
  check: Check,
};

/**
 * IconGrid - Grid of icons with labels
 * Dark: White slide background with dark rounded block
 * Light: White background only
 */
export function IconGrid({
  items,
  title,
  columns = 3,
  accentColor = '#88da1c',
  variant = 'dark',
}: IconGridProps) {
  const isDark = variant === 'dark';

  // Color variables
  const itemBg = isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10';

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  // Content
  const content = (
    <>
      {title && (
        <h3
          className="text-xl font-bold mb-8 text-center"
          style={{ color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </h3>
      )}

      <div className={`grid ${gridCols[columns]} gap-4`}>
        {items.map((item, index) => {
          const Icon = item.icon || (item.iconName ? iconMap[item.iconName.toLowerCase()] : Sparkles);

          return (
            <motion.div
              key={index}
              className={`${itemBg} rounded-xl p-6 text-center transition-colors`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-4 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2 + index * 0.08,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Icon size={24} style={{ color: accentColor }} />
                </div>
              </motion.div>

              {/* Label */}
              <h4
                className="font-semibold mb-1"
                style={{ color: isDark ? '#fff' : '#000' }}
              >
                {item.label}
              </h4>

              {/* Description */}
              {item.description && (
                <p
                  className="text-sm"
                  style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
                >
                  {item.description}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );

  // Conditional rendering based on variant
  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      {content}
    </div>
  );
}

export default IconGrid;
