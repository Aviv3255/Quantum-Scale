'use client';

import { motion } from 'framer-motion';

interface AdjacencyMatrixProps {
  nodes?: string[];
  matrix?: number[][];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultNodes = ['Marketing', 'Sales', 'Product', 'Engineering', 'Design', 'Support'];

const defaultMatrix = [
  [0, 8, 5, 3, 6, 4],  // Marketing connections
  [8, 0, 7, 4, 3, 9],  // Sales connections
  [5, 7, 0, 10, 8, 5], // Product connections
  [3, 4, 10, 0, 7, 3], // Engineering connections
  [6, 3, 8, 7, 0, 4],  // Design connections
  [4, 9, 5, 3, 4, 0],  // Support connections
];

export function AdjacencyMatrix({
  nodes = defaultNodes,
  matrix = defaultMatrix,
  title = 'Team Collaboration Network',
  accentColor = '#88da1c',
  variant = 'dark',
}: AdjacencyMatrixProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 450;
  const padding = { top: 100, right: 40, bottom: 40, left: 100 };

  const textColor = isDark ? 'text-white' : 'text-black';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const cellWidth = chartWidth / nodes.length;
  const cellHeight = chartHeight / nodes.length;
  const cellGap = 2;

  const maxValue = Math.max(...matrix.flat().filter(v => v > 0));

  const getColor = (value: number) => {
    if (value === 0) return isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const intensity = value / maxValue;
    const r = parseInt(accentColor.slice(1, 3), 16);
    const g = parseInt(accentColor.slice(3, 5), 16);
    const b = parseInt(accentColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${0.2 + intensity * 0.8})`;
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-6`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h3>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Column labels (top) */}
        {nodes.map((node, i) => (
          <motion.text
            key={`col-${i}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 * i }}
            x={padding.left + i * cellWidth + cellWidth / 2}
            y={padding.top - 15}
            textAnchor="end"
            fill={labelFill}
            fontSize="10"
            fontWeight="500"
            transform={`rotate(-45, ${padding.left + i * cellWidth + cellWidth / 2}, ${padding.top - 15})`}
          >
            {node}
          </motion.text>
        ))}

        {/* Row labels (left) */}
        {nodes.map((node, i) => (
          <motion.text
            key={`row-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.03 * i }}
            x={padding.left - 10}
            y={padding.top + i * cellHeight + cellHeight / 2 + 4}
            textAnchor="end"
            fill={labelFill}
            fontSize="10"
            fontWeight="500"
          >
            {node}
          </motion.text>
        ))}

        {/* Matrix cells */}
        {matrix.map((row, i) =>
          row.map((value, j) => (
            <motion.g key={`${i}-${j}`}>
              <motion.rect
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.02 * (i * nodes.length + j), duration: 0.2 }}
                x={padding.left + j * cellWidth + cellGap / 2}
                y={padding.top + i * cellHeight + cellGap / 2}
                width={cellWidth - cellGap}
                height={cellHeight - cellGap}
                fill={getColor(value)}
                stroke={gridStroke}
                strokeWidth={0.5}
                rx="4"
                style={{ transformOrigin: `${padding.left + j * cellWidth + cellWidth / 2}px ${padding.top + i * cellHeight + cellHeight / 2}px` }}
              />
              {value > 0 && cellWidth > 35 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + 0.02 * (i * nodes.length + j) }}
                  x={padding.left + j * cellWidth + cellWidth / 2}
                  y={padding.top + i * cellHeight + cellHeight / 2 + 4}
                  textAnchor="middle"
                  fill={value / maxValue > 0.5 ? '#fff' : labelFill}
                  fontSize="10"
                  fontWeight="600"
                >
                  {value}
                </motion.text>
              )}
            </motion.g>
          ))
        )}

        {/* Diagonal highlight line */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          x1={padding.left}
          y1={padding.top}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
          strokeWidth={1}
          strokeDasharray="4,4"
        />

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <text
            x={width - 35}
            y={padding.top + chartHeight - 80}
            textAnchor="middle"
            fill={labelFill}
            fontSize="9"
            fontWeight="600"
          >
            Strength
          </text>
          {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
            <g key={i} transform={`translate(${width - 50}, ${padding.top + chartHeight - 70 + i * 14})`}>
              <rect
                width="30"
                height="10"
                fill={`rgba(${parseInt(accentColor.slice(1, 3), 16)}, ${parseInt(accentColor.slice(3, 5), 16)}, ${parseInt(accentColor.slice(5, 7), 16)}, ${0.2 + intensity * 0.8})`}
                rx="2"
              />
            </g>
          ))}
          <text x={width - 35} y={padding.top + chartHeight - 2} textAnchor="middle" fill={labelFill} fontSize="8">
            0
          </text>
          <text x={width - 35} y={padding.top + chartHeight + 10} textAnchor="middle" fill={labelFill} fontSize="8">
            {maxValue}
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

export default AdjacencyMatrix;
