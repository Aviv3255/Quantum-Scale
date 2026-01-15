'use client';

import { motion } from 'framer-motion';

interface MatrixChartProps {
  data: number[][];
  rowLabels: string[];
  columnLabels: string[];
  title?: string;
  accentColor?: string;
  showValues?: boolean;
  variant?: 'dark' | 'light';
}

export function MatrixChart({
  data,
  rowLabels,
  columnLabels,
  title,
  accentColor = '#88da1c',
  showValues = true,
  variant = 'dark',
}: MatrixChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const legendMutedClass = isDark ? 'text-white/50' : 'text-black/50';
  // Cell text should be black on bright colored backgrounds for contrast
  const cellTextColor = 'black';

  const width = 500;
  const height = 400;
  const padding = 80;

  const rows = data.length;
  const cols = data[0]?.length || 0;

  const cellWidth = (width - 2 * padding) / cols;
  const cellHeight = (height - 2 * padding) / rows;

  const maxValue = Math.max(...data.flat());
  const minValue = Math.min(...data.flat());

  const getColor = (value: number) => {
    const ratio = (value - minValue) / (maxValue - minValue);
    // Gradient from transparent to accent color
    return `rgba(136, 218, 28, ${0.2 + ratio * 0.8})`;
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
        {/* Column labels */}
        {columnLabels.map((label, i) => (
          <motion.text
            key={`col-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.02 }}
            x={padding + i * cellWidth + cellWidth / 2}
            y={padding - 10}
            textAnchor="middle"
            fill={mutedColor}
            fontSize="10"
          >
            {label}
          </motion.text>
        ))}

        {/* Row labels */}
        {rowLabels.map((label, i) => (
          <motion.text
            key={`row-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.02 }}
            x={padding - 10}
            y={padding + i * cellHeight + cellHeight / 2 + 4}
            textAnchor="end"
            fill={mutedColor}
            fontSize="10"
          >
            {label}
          </motion.text>
        ))}

        {/* Cells */}
        {data.map((row, i) =>
          row.map((value, j) => (
            <motion.g key={`cell-${i}-${j}`}>
              <motion.rect
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + (i * cols + j) * 0.01 }}
                x={padding + j * cellWidth + 2}
                y={padding + i * cellHeight + 2}
                width={cellWidth - 4}
                height={cellHeight - 4}
                fill={getColor(value)}
                rx="4"
                style={{
                  transformOrigin: `${padding + j * cellWidth + cellWidth / 2}px ${padding + i * cellHeight + cellHeight / 2}px`,
                }}
              />
              {showValues && cellWidth > 30 && cellHeight > 20 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (i * cols + j) * 0.01 }}
                  x={padding + j * cellWidth + cellWidth / 2}
                  y={padding + i * cellHeight + cellHeight / 2 + 4}
                  textAnchor="middle"
                  fill={cellTextColor}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {value}
                </motion.text>
              )}
            </motion.g>
          ))
        )}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center items-center gap-2 mt-4"
      >
        <span className={`${legendMutedClass} text-xs`}>{minValue}</span>
        <div
          className="w-32 h-3 rounded"
          style={{
            background: `linear-gradient(to right, rgba(136, 218, 28, 0.2), ${accentColor})`,
          }}
        />
        <span className={`${legendMutedClass} text-xs`}>{maxValue}</span>
      </motion.div>
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

export default MatrixChart;
