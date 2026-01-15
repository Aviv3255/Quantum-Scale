'use client';

import { motion } from 'framer-motion';

interface SWOTItem {
  text: string;
}

interface SWOTProps {
  strengths?: SWOTItem[];
  weaknesses?: SWOTItem[];
  opportunities?: SWOTItem[];
  threats?: SWOTItem[];
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * SWOT - SWOT analysis visualization
 * Four-quadrant display of Strengths, Weaknesses, Opportunities, Threats
 */
export function SWOT({
  strengths = [{ text: 'Strong brand' }, { text: 'Loyal customers' }, { text: 'Unique technology' }],
  weaknesses = [{ text: 'Limited resources' }, { text: 'Narrow product line' }],
  opportunities = [{ text: 'Market expansion' }, { text: 'New partnerships' }, { text: 'Digital growth' }],
  threats = [{ text: 'Competition' }, { text: 'Economic downturn' }, { text: 'Regulation changes' }],
  title,
  variant = 'dark',
}: SWOTProps) {
  const isDark = variant === 'dark';
  const borderColor = isDark ? 'border-white/20' : 'border-black/20';

  const quadrants = [
    {
      title: 'Strengths',
      items: strengths,
      color: '#34C759',
      icon: 'S',
      position: 'Internal / Positive',
    },
    {
      title: 'Weaknesses',
      items: weaknesses,
      color: '#FF9500',
      icon: 'W',
      position: 'Internal / Negative',
    },
    {
      title: 'Opportunities',
      items: opportunities,
      color: '#007AFF',
      icon: 'O',
      position: 'External / Positive',
    },
    {
      title: 'Threats',
      items: threats,
      color: '#FF3B30',
      icon: 'T',
      position: 'External / Negative',
    },
  ];

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-6"
          style={{ color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <div className="grid grid-cols-2 gap-4">
        {quadrants.map((quadrant, i) => (
          <motion.div
            key={i}
            className={`border ${borderColor} rounded-xl p-4 relative overflow-hidden`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
          >
            {/* Color accent */}
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ backgroundColor: quadrant.color }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-3 mt-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: quadrant.color }}
              >
                {quadrant.icon}
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: isDark ? '#fff' : '#000' }}>{quadrant.title}</h4>
                <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{quadrant.position}</p>
              </div>
            </div>

            {/* Items */}
            <ul className="space-y-2">
              {quadrant.items.map((item, j) => (
                <motion.li
                  key={j}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: isDark ? '#fff' : '#000' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 + j * 0.05 }}
                >
                  <span style={{ color: quadrant.color }}>•</span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        className="mt-6 flex justify-center gap-6 text-xs"
        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-16 h-px bg-gradient-to-r from-green-500 to-yellow-500" />
          <span>Internal Factors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-red-500" />
          <span>External Factors</span>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">{content}</div>
      ) : (
        <div className="w-full max-w-2xl">{content}</div>
      )}
    </div>
  );
}

export default SWOT;
