'use client';

import { motion } from 'framer-motion';

interface BumpChartSeries {
  label: string;
  rankings: number[];
  color?: string;
}

interface BumpChartProps {
  data: BumpChartSeries[];
  periods: string[];
  title?: string;
  accentColor?: string;
}

export function BumpChart({
  data,
  periods,
  title,
  accentColor = '#88da1c',
}: BumpChartProps) {
  const width = 500;
  const height = 350;
  const padding = { top: 40, right: 80, bottom: 60, left: 80 };

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const maxRank = Math.max(...data.flatMap(d => d.rankings));
  const columnWidth = (width - padding.left - padding.right) / (periods.length - 1);

  const scaleX = (index: number) => padding.left + index * columnWidth;
  const scaleY = (rank: number) =>
    padding.top + ((rank - 1) / (maxRank - 1)) * (height - padding.top - padding.bottom);

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white text-center mb-6"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h3>
        )}

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Grid columns */}
          {periods.map((_, i) => (
            <motion.line
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              x1={scaleX(i)}
              y1={padding.top}
              x2={scaleX(i)}
              y2={height - padding.bottom}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Bump lines */}
          {data.map((series, seriesIndex) => {
            const color = series.color || colors[seriesIndex % colors.length];
            const path = series.rankings
              .map((rank, i) => {
                const x = scaleX(i);
                const y = scaleY(rank);
                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              })
              .join(' ');

            return (
              <motion.g key={seriesIndex}>
                {/* Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2 + seriesIndex * 0.1, duration: 0.8 }}
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                />

                {/* Points */}
                {series.rankings.map((rank, i) => (
                  <motion.circle
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + seriesIndex * 0.1 + i * 0.05 }}
                    cx={scaleX(i)}
                    cy={scaleY(rank)}
                    r="8"
                    fill={color}
                  />
                ))}

                {/* Start label */}
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + seriesIndex * 0.1 }}
                  x={padding.left - 10}
                  y={scaleY(series.rankings[0]) + 4}
                  textAnchor="end"
                  fill={color}
                  fontSize="11"
                >
                  {series.label}
                </motion.text>

                {/* End label */}
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + seriesIndex * 0.1 }}
                  x={scaleX(periods.length - 1) + 10}
                  y={scaleY(series.rankings[series.rankings.length - 1]) + 4}
                  textAnchor="start"
                  fill={color}
                  fontSize="11"
                >
                  #{series.rankings[series.rankings.length - 1]}
                </motion.text>
              </motion.g>
            );
          })}

          {/* Period labels */}
          {periods.map((period, i) => (
            <motion.text
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              x={scaleX(i)}
              y={height - padding.bottom + 25}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="11"
            >
              {period}
            </motion.text>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default BumpChart;
