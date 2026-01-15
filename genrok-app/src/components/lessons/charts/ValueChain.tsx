'use client';

import { motion } from 'framer-motion';

interface ValueChainActivity {
  name: string;
  description?: string;
  color?: string;
}

interface ValueChainProps {
  primaryActivities?: ValueChainActivity[];
  supportActivities?: ValueChainActivity[];
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * ValueChain - Porter's value chain diagram
 * Visualizes primary and support activities
 */
export function ValueChain({
  primaryActivities = [
    { name: 'Inbound Logistics' },
    { name: 'Operations' },
    { name: 'Outbound Logistics' },
    { name: 'Marketing & Sales' },
    { name: 'Service' },
  ],
  supportActivities = [
    { name: 'Firm Infrastructure' },
    { name: 'Human Resources' },
    { name: 'Technology Development' },
    { name: 'Procurement' },
  ],
  title,
  variant = 'dark',
}: ValueChainProps) {
  const isDark = variant === 'dark';
  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const bgMuted = isDark ? 'bg-white/5' : 'bg-black/5';

  const primaryColors = ['#007AFF', '#5AC8FA', '#34C759', '#88da1c', '#FF9500'];
  const supportColors = ['#AF52DE', '#FF2D55', '#FF9500', '#FFCC00'];

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

      <div className="flex flex-col gap-4">
        {/* Support Activities */}
        <div className="space-y-2">
          <motion.p
            className="text-xs uppercase tracking-wider mb-2"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Support Activities
          </motion.p>
          <div className="space-y-1">
            {supportActivities.map((activity, i) => (
              <motion.div
                key={i}
                className={`${bgMuted} border ${borderColor} rounded-lg p-3 flex items-center gap-3`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: activity.color || supportColors[i % supportColors.length] }}
                />
                <div>
                  <span className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#000' }}>{activity.name}</span>
                  {activity.description && (
                    <p className="text-xs mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{activity.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Primary Activities */}
        <div>
          <motion.p
            className="text-xs uppercase tracking-wider mb-2"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Primary Activities
          </motion.p>
          <div className="flex gap-1">
            {primaryActivities.map((activity, i) => (
              <motion.div
                key={i}
                className={`flex-1 ${bgMuted} border ${borderColor} rounded-lg p-3 text-center relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: activity.color || primaryColors[i % primaryColors.length] }}
                />
                <span className="text-xs font-medium block mt-1" style={{ color: isDark ? '#fff' : '#000' }}>
                  {activity.name}
                </span>
                {activity.description && (
                  <p className="text-xs mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{activity.description}</p>
                )}
              </motion.div>
            ))}

            {/* Margin arrow */}
            <motion.div
              className={`w-16 ${bgMuted} border ${borderColor} rounded-lg flex items-center justify-center relative overflow-hidden`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              style={{
                clipPath: 'polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)',
              }}
            >
              <span className="text-xs font-bold rotate-90" style={{ color: isDark ? '#fff' : '#000' }}>MARGIN</span>
            </motion.div>
          </div>
        </div>

        {/* Flow arrow */}
        <motion.div
          className="flex justify-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-2" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
            <span className="text-xs">Value Creation Flow</span>
            <svg width="60" height="12" viewBox="0 0 60 12">
              <path
                d="M0 6 L50 6 M45 2 L50 6 L45 10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>
      </div>
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

export default ValueChain;
