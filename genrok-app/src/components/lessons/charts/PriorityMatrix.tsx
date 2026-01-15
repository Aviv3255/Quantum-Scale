'use client';

import { motion } from 'framer-motion';

interface TaskItem {
  label: string;
  urgent: boolean;
  important: boolean;
}

interface PriorityMatrixProps {
  tasks?: TaskItem[];
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * PriorityMatrix - Eisenhower matrix visualization
 * Four quadrants: Do, Schedule, Delegate, Eliminate
 */
export function PriorityMatrix({
  tasks = [
    { label: 'Crisis handling', urgent: true, important: true },
    { label: 'Strategic planning', urgent: false, important: true },
    { label: 'Email responses', urgent: true, important: false },
    { label: 'Social media', urgent: false, important: false },
  ],
  title,
  variant = 'dark',
}: PriorityMatrixProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const borderColor = isDark ? 'border-white/20' : 'border-black/20';

  const quadrants = [
    {
      title: 'DO',
      subtitle: 'Urgent & Important',
      color: '#FF3B30',
      bgColor: 'rgba(255, 59, 48, 0.1)',
      tasks: tasks.filter(t => t.urgent && t.important),
      action: 'Do it now',
    },
    {
      title: 'SCHEDULE',
      subtitle: 'Not Urgent & Important',
      color: '#007AFF',
      bgColor: 'rgba(0, 122, 255, 0.1)',
      tasks: tasks.filter(t => !t.urgent && t.important),
      action: 'Schedule time',
    },
    {
      title: 'DELEGATE',
      subtitle: 'Urgent & Not Important',
      color: '#FF9500',
      bgColor: 'rgba(255, 149, 0, 0.1)',
      tasks: tasks.filter(t => t.urgent && !t.important),
      action: 'Assign to others',
    },
    {
      title: 'ELIMINATE',
      subtitle: 'Not Urgent & Not Important',
      color: '#8E8E93',
      bgColor: 'rgba(142, 142, 147, 0.1)',
      tasks: tasks.filter(t => !t.urgent && !t.important),
      action: 'Remove or limit',
    },
  ];

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-6`}
        >
          {title}
        </motion.h3>
      )}

      {/* Axis labels */}
      <div className="flex justify-center mb-2">
        <motion.span
          className={`text-sm font-medium ${textColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          URGENT
        </motion.span>
        <span className="flex-1" />
        <motion.span
          className={`text-sm font-medium ${mutedColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          NOT URGENT
        </motion.span>
      </div>

      <div className="flex gap-4">
        {/* Y-axis label */}
        <div className="flex flex-col justify-center">
          <motion.span
            className={`text-sm font-medium ${textColor} writing-vertical rotate-180`}
            style={{ writingMode: 'vertical-lr' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            IMPORTANT
          </motion.span>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {quadrants.map((quadrant, i) => (
            <motion.div
              key={i}
              className={`border ${borderColor} rounded-xl p-4 relative overflow-hidden`}
              style={{ backgroundColor: quadrant.bgColor }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: quadrant.color }}
                  >
                    {quadrant.title}
                  </h4>
                  <p className={`text-xs ${mutedColor}`}>{quadrant.subtitle}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: quadrant.color }}
                >
                  {quadrant.tasks.length}
                </div>
              </div>

              {/* Tasks */}
              <ul className="space-y-2 mb-3">
                {quadrant.tasks.map((task, j) => (
                  <motion.li
                    key={j}
                    className={`flex items-center gap-2 text-sm ${textColor}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 + j * 0.05 }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: quadrant.color }}
                    />
                    {task.label}
                  </motion.li>
                ))}
                {quadrant.tasks.length === 0 && (
                  <li className={`text-sm ${mutedColor} italic`}>No tasks</li>
                )}
              </ul>

              {/* Action */}
              <motion.div
                className={`text-xs ${mutedColor} pt-2 border-t ${borderColor}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                Action: <span className={textColor}>{quadrant.action}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Y-axis label (bottom) */}
        <div className="flex flex-col justify-center">
          <motion.span
            className={`text-sm font-medium ${mutedColor} writing-vertical rotate-180`}
            style={{ writingMode: 'vertical-lr' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            NOT IMPORTANT
          </motion.span>
        </div>
      </div>

      {/* Summary */}
      <motion.div
        className={`mt-6 flex justify-center gap-4 text-xs ${mutedColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {quadrants.map((q, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: q.color }}
            />
            <span>{q.title}: {q.tasks.length}</span>
          </div>
        ))}
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

export default PriorityMatrix;
