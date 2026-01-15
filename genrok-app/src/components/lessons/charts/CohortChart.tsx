'use client';

import { motion } from 'framer-motion';

interface CohortData {
  cohort: string;
  periods: number[];
}

interface CohortChartProps {
  data?: CohortData[];
  periodLabels?: string[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: CohortData[] = [
  { cohort: 'Jan', periods: [100, 75, 60, 50, 42, 38] },
  { cohort: 'Feb', periods: [100, 72, 58, 48, 40] },
  { cohort: 'Mar', periods: [100, 78, 62, 52] },
  { cohort: 'Apr', periods: [100, 70, 55] },
  { cohort: 'May', periods: [100, 68] },
  { cohort: 'Jun', periods: [100] },
];

const defaultPeriodLabels = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

export function CohortChart({
  data = defaultData,
  periodLabels = defaultPeriodLabels,
  title = 'Cohort Retention Analysis',
  accentColor = '#88da1c',
  variant = 'dark',
}: CohortChartProps) {
  const isDark = variant === 'dark';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const maxPeriods = Math.max(...data.map(d => d.periods.length));
  const cellWidth = 60;
  const cellHeight = 40;
  const padding = 80;
  const width = maxPeriods * cellWidth + padding + 40;
  const height = data.length * cellHeight + padding + 20;

  const getColor = (value: number) => {
    // Color scale from low retention (red) to high retention (green)
    const intensity = value / 100;
    if (intensity > 0.7) {
      return `rgba(136, 218, 28, ${0.3 + intensity * 0.5})`;
    } else if (intensity > 0.4) {
      return `rgba(255, 149, 0, ${0.3 + intensity * 0.5})`;
    } else {
      return `rgba(255, 59, 48, ${0.3 + (1 - intensity) * 0.3})`;
    }
  };

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
        {/* Period labels (columns) */}
        {periodLabels.slice(0, maxPeriods).map((label, i) => (
          <motion.text
            key={`period-${i}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            x={padding + i * cellWidth + cellWidth / 2}
            y={25}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            {label}
          </motion.text>
        ))}

        {/* Cohort labels (rows) */}
        {data.map((cohort, i) => (
          <motion.text
            key={`cohort-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            x={padding - 10}
            y={padding - 10 + i * cellHeight + cellHeight / 2}
            textAnchor="end"
            fill={labelFill}
            fontSize="11"
            fontWeight="500"
          >
            {cohort.cohort}
          </motion.text>
        ))}

        {/* Cohort header */}
        <text
          x={padding - 40}
          y={25}
          textAnchor="middle"
          fill={labelFill}
          fontSize="10"
          fontWeight="600"
        >
          Cohort
        </text>

        {/* Matrix cells */}
        {data.map((cohort, rowIdx) =>
          cohort.periods.map((value, colIdx) => (
            <motion.g key={`${rowIdx}-${colIdx}`}>
              <motion.rect
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.02 * (rowIdx * maxPeriods + colIdx),
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                x={padding + colIdx * cellWidth + 2}
                y={padding - 10 + rowIdx * cellHeight + 2}
                width={cellWidth - 4}
                height={cellHeight - 4}
                fill={getColor(value)}
                rx="4"
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + 0.02 * (rowIdx * maxPeriods + colIdx) }}
                x={padding + colIdx * cellWidth + cellWidth / 2}
                y={padding - 10 + rowIdx * cellHeight + cellHeight / 2 + 4}
                textAnchor="middle"
                fill={isDark ? '#fff' : '#000'}
                fontSize="11"
                fontWeight="500"
              >
                {value}%
              </motion.text>
            </motion.g>
          ))
        )}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <defs>
            <linearGradient id="cohortLegend" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 59, 48, 0.6)" />
              <stop offset="50%" stopColor="rgba(255, 149, 0, 0.6)" />
              <stop offset="100%" stopColor="rgba(136, 218, 28, 0.8)" />
            </linearGradient>
          </defs>
          <rect
            x={padding}
            y={height - 15}
            width={100}
            height="8"
            fill="url(#cohortLegend)"
            rx="4"
          />
          <text
            x={padding}
            y={height - 2}
            fill={labelFill}
            fontSize="9"
          >
            0%
          </text>
          <text
            x={padding + 100}
            y={height - 2}
            textAnchor="end"
            fill={labelFill}
            fontSize="9"
          >
            100%
          </text>
        </motion.g>
      </svg>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {content}
        </div>
      )}
    </div>
  );
}

export default CohortChart;
