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
  darkMode?: boolean;
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
 * Elite design for feature lists and benefits
 */
export function IconGrid({
  items,
  title,
  columns = 3,
  accentColor = '#88da1c',
  darkMode = true,
}: IconGridProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';
  const cardBgClass = darkMode ? 'bg-white/5' : 'bg-black/5';

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className={`${bgClass} p-8 rounded-2xl`}>
      {title && (
        <h3 className={`text-xl font-bold ${textClass} mb-8 text-center`}>{title}</h3>
      )}

      <div className={`grid ${gridCols[columns]} gap-4`}>
        {items.map((item, index) => {
          const Icon = item.icon || (item.iconName ? iconMap[item.iconName.toLowerCase()] : Sparkles);

          return (
            <motion.div
              key={index}
              className={`${cardBgClass} rounded-xl p-6 text-center hover:bg-white/10 transition-colors`}
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
              <h4 className={`font-semibold ${textClass} mb-1`}>
                {item.label}
              </h4>

              {/* Description */}
              {item.description && (
                <p className={`text-sm ${mutedClass}`}>
                  {item.description}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default IconGrid;
