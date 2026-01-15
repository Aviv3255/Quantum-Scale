'use client';

import { motion } from 'framer-motion';

interface RiskItem {
  label: string;
  probability: number; // 1-5 (Low to High)
  impact: number; // 1-5 (Low to High)
}

interface RiskMatrixProps {
  risks: RiskItem[];
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * RiskMatrix - Risk probability/impact matrix
 * 5x5 grid showing risk positioning based on likelihood and severity
 */
export function RiskMatrix({
  risks = [
    { label: 'Data breach', probability: 2, impact: 5 },
    { label: 'Staff turnover', probability: 4, impact: 2 },
    { label: 'Market shift', probability: 3, impact: 4 },
  ],
  title,
  variant = 'dark',
}: RiskMatrixProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const fillLabel = isDark ? 'fill-white' : 'fill-black';
  const fillMuted = isDark ? 'fill-white/50' : 'fill-black/50';

  const gridSize = 5;
  const cellSize = 50;
  const size = gridSize * cellSize;
  const padding = 50;

  // Risk level colors based on probability * impact
  const getRiskColor = (prob: number, impact: number) => {
    const score = prob * impact;
    if (score >= 16) return '#FF3B30'; // Critical
    if (score >= 9) return '#FF9500'; // High
    if (score >= 4) return '#FFCC00'; // Medium
    return '#34C759'; // Low
  };

  const getRiskLevel = (prob: number, impact: number) => {
    const score = prob * impact;
    if (score >= 16) return 'Critical';
    if (score >= 9) return 'High';
    if (score >= 4) return 'Medium';
    return 'Low';
  };

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

      <div className="flex justify-center">
        <svg width={size + padding * 2} height={size + padding * 2} className="overflow-visible">
          {/* Grid cells with gradient colors */}
          {Array.from({ length: gridSize }).map((_, row) =>
            Array.from({ length: gridSize }).map((_, col) => {
              const prob = col + 1;
              const impact = gridSize - row;
              const color = getRiskColor(prob, impact);

              return (
                <motion.rect
                  key={`${row}-${col}`}
                  x={padding + col * cellSize}
                  y={padding + row * cellSize}
                  width={cellSize - 2}
                  height={cellSize - 2}
                  fill={color}
                  fillOpacity={0.2}
                  stroke={color}
                  strokeWidth={1}
                  strokeOpacity={0.5}
                  rx={4}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + (row * gridSize + col) * 0.02 }}
                />
              );
            })
          )}

          {/* Risk items */}
          {risks.map((risk, i) => {
            const cx = padding + (risk.probability - 0.5) * cellSize;
            const cy = padding + (gridSize - risk.impact + 0.5) * cellSize;
            const color = getRiskColor(risk.probability, risk.impact);

            return (
              <motion.g key={i}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={18}
                  fill={color}
                  fillOpacity={0.8}
                  stroke={isDark ? '#000' : '#fff'}
                  strokeWidth={2}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                />
                <motion.text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-xs font-bold ${isDark ? 'fill-black' : 'fill-white'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {i + 1}
                </motion.text>
              </motion.g>
            );
          })}

          {/* Axis labels */}
          <motion.text
            x={padding + size / 2}
            y={size + padding + 35}
            textAnchor="middle"
            className={`text-sm font-medium ${fillLabel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Probability
          </motion.text>
          <motion.text
            x={padding - 35}
            y={padding + size / 2}
            textAnchor="middle"
            className={`text-sm font-medium ${fillLabel}`}
            transform={`rotate(-90, ${padding - 35}, ${padding + size / 2})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Impact
          </motion.text>

          {/* Scale labels */}
          {['Low', 'Med', 'High'].map((label, i) => (
            <motion.text
              key={`x-${i}`}
              x={padding + (i * 2 + 1) * cellSize}
              y={size + padding + 15}
              textAnchor="middle"
              className={`text-xs ${fillMuted}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {label}
            </motion.text>
          ))}
          {['Low', 'Med', 'High'].map((label, i) => (
            <motion.text
              key={`y-${i}`}
              x={padding - 10}
              y={padding + (gridSize - 1 - i * 2) * cellSize + cellSize / 2}
              textAnchor="end"
              dominantBaseline="middle"
              className={`text-xs ${fillMuted}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {label}
            </motion.text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <motion.div
        className="mt-6 space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {risks.map((risk, i) => (
            <div key={i} className={`flex items-center gap-2 ${borderColor} border rounded-lg px-3 py-1.5`}>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: getRiskColor(risk.probability, risk.impact), color: isDark ? '#000' : '#fff' }}
              >
                {i + 1}
              </div>
              <span className={`text-sm ${textColor}`}>{risk.label}</span>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded"
                style={{ backgroundColor: getRiskColor(risk.probability, risk.impact), color: isDark ? '#000' : '#fff' }}
              >
                {getRiskLevel(risk.probability, risk.impact)}
              </span>
            </div>
          ))}
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

export default RiskMatrix;
