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
 * White slide background with dark rounded block
 */
export function IconGrid({
  items,
  title,
  columns = 3,
  accentColor = '#88da1c',
}: IconGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        {title && (
          <h3 className="text-xl font-bold text-white mb-8 text-center">{title}</h3>
        )}

        <div className={`grid ${gridCols[columns]} gap-4`}>
          {items.map((item, index) => {
            const Icon = item.icon || (item.iconName ? iconMap[item.iconName.toLowerCase()] : Sparkles);

            return (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
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
                <h4 className="font-semibold text-white mb-1">
                  {item.label}
                </h4>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-white/60">
                    {item.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default IconGrid;
