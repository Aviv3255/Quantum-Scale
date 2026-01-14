'use client';

import { motion } from 'framer-motion';

interface TreeMapItem {
  label: string;
  value: number;
  color?: string;
}

interface TreeMapProps {
  data: TreeMapItem[];
  title?: string;
  accentColor?: string;
}

export function TreeMap({
  data,
  title,
  accentColor = '#88da1c',
}: TreeMapProps) {
  const width = 500;
  const height = 300;
  const padding = 20;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Simple squarified treemap algorithm
  const calculateRects = () => {
    const rects: { x: number; y: number; w: number; h: number; item: TreeMapItem }[] = [];
    let x = padding;
    let y = padding;
    let availableWidth = width - 2 * padding;
    let availableHeight = height - 2 * padding;
    let remainingValue = total;

    sortedData.forEach((item, i) => {
      const ratio = item.value / remainingValue;

      if (i % 2 === 0) {
        // Horizontal slice
        const h = availableHeight * ratio;
        rects.push({ x, y, w: availableWidth, h, item });
        y += h;
        availableHeight -= h;
      } else {
        // Vertical slice
        const w = availableWidth * ratio;
        rects.push({ x, y, w, h: availableHeight, item });
        x += w;
        availableWidth -= w;
      }
      remainingValue -= item.value;
    });

    return rects;
  };

  const rects = calculateRects();
  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];

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
          {rects.map((rect, i) => (
            <motion.g key={i}>
              <motion.rect
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05, type: 'spring' }}
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
                fill={rect.item.color || colors[i % colors.length]}
                stroke="black"
                strokeWidth="2"
                rx="4"
              />
              {rect.w > 60 && rect.h > 40 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  x={rect.x + rect.w / 2}
                  y={rect.y + rect.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize={Math.min(14, rect.w / 6)}
                  fontWeight="bold"
                >
                  {rect.item.label}
                </motion.text>
              )}
              {rect.w > 60 && rect.h > 50 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  x={rect.x + rect.w / 2}
                  y={rect.y + rect.h / 2 + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize={Math.min(11, rect.w / 8)}
                >
                  {((rect.item.value / total) * 100).toFixed(0)}%
                </motion.text>
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default TreeMap;
