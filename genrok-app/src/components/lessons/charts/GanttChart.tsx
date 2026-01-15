'use client';

import { motion } from 'framer-motion';

interface GanttTask {
  id: string;
  name: string;
  start: number;
  duration: number;
  color?: string;
  dependencies?: string[];
  progress?: number;
}

interface GanttChartProps {
  tasks: GanttTask[];
  title?: string;
  totalDays?: number;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function GanttChart({
  tasks,
  title,
  totalDays = 30,
  accentColor = '#88da1c',
  variant = 'dark',
}: GanttChartProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const width = 600;
  const height = 60 + tasks.length * 50;
  const leftPadding = 120;
  const topPadding = 40;
  const barHeight = 30;
  const rowHeight = 50;

  const chartWidth = width - leftPadding - 20;
  const dayWidth = chartWidth / totalDays;

  // Generate week markers
  const weeks = Math.ceil(totalDays / 7);
  const weekMarkers = Array.from({ length: weeks + 1 }, (_, i) => i * 7);

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-6"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Grid lines */}
        {weekMarkers.map((day, i) => (
          <motion.g key={`grid-${i}`}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              x1={leftPadding + day * dayWidth}
              y1={topPadding - 10}
              x2={leftPadding + day * dayWidth}
              y2={height - 10}
              stroke={gridColor}
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              x={leftPadding + day * dayWidth}
              y={topPadding - 20}
              textAnchor="middle"
              fill={mutedColor}
              fontSize="10"
            >
              Week {i}
            </motion.text>
          </motion.g>
        ))}

        {/* Tasks */}
        {tasks.map((task, i) => {
          const y = topPadding + i * rowHeight;
          const x = leftPadding + task.start * dayWidth;
          const taskWidth = task.duration * dayWidth;
          const color = task.color || colors[i % colors.length];
          const progress = task.progress || 0;

          return (
            <motion.g key={task.id}>
              {/* Task name */}
              <motion.text
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                x={leftPadding - 10}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                fill={isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'}
                fontSize="11"
                fontWeight="500"
              >
                {task.name}
              </motion.text>

              {/* Task bar background */}
              <motion.rect
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                x={x}
                y={y}
                width={taskWidth}
                height={barHeight}
                fill={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                rx="6"
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              {/* Task bar progress */}
              <motion.rect
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                x={x}
                y={y}
                width={taskWidth * (progress / 100)}
                height={barHeight}
                fill={color}
                rx="6"
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              {/* Progress text */}
              {progress > 0 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  x={x + taskWidth / 2}
                  y={y + barHeight / 2 + 4}
                  textAnchor="middle"
                  fill={progress > 50 ? '#fff' : mutedColor}
                  fontSize="10"
                  fontWeight="600"
                >
                  {progress}%
                </motion.text>
              )}

              {/* Dependencies arrows */}
              {task.dependencies?.map((depId, depIndex) => {
                const depTask = tasks.find(t => t.id === depId);
                if (!depTask) return null;
                const depTaskIndex = tasks.findIndex(t => t.id === depId);
                const depY = topPadding + depTaskIndex * rowHeight;
                const depEndX = leftPadding + (depTask.start + depTask.duration) * dayWidth;

                return (
                  <motion.path
                    key={`dep-${depId}-${depIndex}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                    d={`M ${depEndX} ${depY + barHeight / 2}
                        L ${depEndX + 10} ${depY + barHeight / 2}
                        L ${depEndX + 10} ${y + barHeight / 2}
                        L ${x - 5} ${y + barHeight / 2}`}
                    stroke={color}
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
            </motion.g>
          );
        })}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
            />
          </marker>
        </defs>
      </svg>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {content}
      </div>
    </div>
  );
}

export default GanttChart;
