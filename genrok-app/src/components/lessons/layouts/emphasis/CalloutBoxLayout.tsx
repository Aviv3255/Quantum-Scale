'use client';

import { motion } from 'framer-motion';
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface CalloutBoxLayoutProps {
  title?: string;
  content: string;
  type?: 'info' | 'warning' | 'success' | 'error' | 'tip';
}

export function CalloutBoxLayout({
  title,
  content,
  type = 'info',
}: CalloutBoxLayoutProps) {
  const configs = {
    info: {
      icon: Info,
      color: '#3B82F6',
      label: 'Information',
    },
    warning: {
      icon: AlertTriangle,
      color: '#F59E0B',
      label: 'Warning',
    },
    success: {
      icon: CheckCircle,
      color: '#22C55E',
      label: 'Success',
    },
    error: {
      icon: XCircle,
      color: '#EF4444',
      label: 'Error',
    },
    tip: {
      icon: Lightbulb,
      color: '#88da1c',
      label: 'Pro Tip',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: `${config.color}10` }}
        >
          {/* Top accent bar */}
          <div
            className="h-1"
            style={{ backgroundColor: config.color }}
          />

          <div className="p-8">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <Icon size={24} style={{ color: config.color }} />
              </motion.div>

              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: config.color }}
                >
                  {title || config.label}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-white/70 leading-relaxed"
                >
                  {content}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CalloutBoxLayout;
