'use client';

import { motion } from 'framer-motion';

interface PyramidChartProps {
  data: { label: string; value: number; color?: string }[];
  title?: string;
  accentColor?: string;
}

export function PyramidChart({
  data,
  title,
  accentColor = '#88da1c',
}: PyramidChartProps) {
  const width = 400;
  const height = 350;
  const padding = 40;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const maxValue = Math.max(...data.map(d => d.value));
  const segmentHeight = (height - 2 * padding) / data.length;

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
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
          {data.map((d, i) => {
            const widthRatio = d.value / maxValue;
            const topWidth = widthRatio * (width - 2 * padding) * (1 - i / data.length);
            const bottomWidth = widthRatio * (width - 2 * padding) * (1 - (i + 1) / data.length);
            const y = padding + i * segmentHeight;

            const cx = width / 2;
            const topLeft = cx - topWidth / 2;
            const topRight = cx + topWidth / 2;
            const bottomLeft = cx - bottomWidth / 2;
            const bottomRight = cx + bottomWidth / 2;

            const path = `
              M ${topLeft} ${y}
              L ${topRight} ${y}
              L ${bottomRight} ${y + segmentHeight}
              L ${bottomLeft} ${y + segmentHeight}
              Z
            `;

            const color = d.color || colors[i % colors.length];

            return (
              <motion.g key={i}>
                <motion.path
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  d={path}
                  fill={color}
                  stroke="black"
                  strokeWidth="2"
                  style={{ transformOrigin: `${cx}px ${y}px` }}
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  x={width - padding + 10}
                  y={y + segmentHeight / 2 + 4}
                  fill="rgba(255,255,255,0.8)"
                  fontSize="11"
                >
                  {d.label}
                </motion.text>
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  x={cx}
                  y={y + segmentHeight / 2 + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {d.value}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default PyramidChart;
