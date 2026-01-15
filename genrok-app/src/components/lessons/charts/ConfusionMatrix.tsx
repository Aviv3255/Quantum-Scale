'use client';

import { motion } from 'framer-motion';

interface ConfusionMatrixProps {
  matrix?: number[][];
  labels?: string[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultMatrix = [
  [85, 15],
  [10, 90],
];

const defaultLabels = ['Negative', 'Positive'];

export function ConfusionMatrix({
  matrix = defaultMatrix,
  labels = defaultLabels,
  title = 'Confusion Matrix',
  accentColor = '#88da1c',
  variant = 'dark',
}: ConfusionMatrixProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const maxValue = Math.max(...matrix.flat());
  const minValue = Math.min(...matrix.flat());
  const range = maxValue - minValue || 1;

  const getColor = (value: number, rowIdx: number, colIdx: number) => {
    const intensity = (value - minValue) / range;
    // True positives and true negatives (diagonal) should be green
    // False positives and false negatives (off-diagonal) should be red-ish
    const isDiagonal = rowIdx === colIdx;
    if (isDiagonal) {
      return `rgba(136, 218, 28, ${0.2 + intensity * 0.6})`;
    } else {
      return `rgba(255, 59, 48, ${0.2 + intensity * 0.6})`;
    }
  };

  const total = matrix.flat().reduce((a, b) => a + b, 0);
  const accuracy = ((matrix[0][0] + matrix[1][1]) / total * 100).toFixed(1);
  const precision = (matrix[1][1] / (matrix[0][1] + matrix[1][1]) * 100).toFixed(1);
  const recall = (matrix[1][1] / (matrix[1][0] + matrix[1][1]) * 100).toFixed(1);

  const cellSize = 100;
  const padding = 80;
  const width = labels.length * cellSize + padding * 2;
  const height = labels.length * cellSize + padding * 2;

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

      <svg viewBox={`0 0 ${width} ${height + 80}`} className="w-full max-w-md mx-auto">
        {/* Axis labels */}
        <text
          x={width / 2}
          y={25}
          textAnchor="middle"
          fill={labelFill}
          fontSize="12"
          fontWeight="600"
        >
          Predicted
        </text>
        <text
          x={25}
          y={height / 2 + 20}
          textAnchor="middle"
          fill={labelFill}
          fontSize="12"
          fontWeight="600"
          transform={`rotate(-90, 25, ${height / 2 + 20})`}
        >
          Actual
        </text>

        {/* Column labels (Predicted) */}
        {labels.map((label, i) => (
          <text
            key={`col-${i}`}
            x={padding + i * cellSize + cellSize / 2}
            y={padding - 15}
            textAnchor="middle"
            fill={labelFill}
            fontSize="11"
          >
            {label}
          </text>
        ))}

        {/* Row labels (Actual) */}
        {labels.map((label, i) => (
          <text
            key={`row-${i}`}
            x={padding - 15}
            y={padding + i * cellSize + cellSize / 2 + 5}
            textAnchor="end"
            fill={labelFill}
            fontSize="11"
          >
            {label}
          </text>
        ))}

        {/* Matrix cells */}
        {matrix.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <motion.g key={`${rowIdx}-${colIdx}`}>
              <motion.rect
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + (rowIdx * labels.length + colIdx) * 0.1 }}
                x={padding + colIdx * cellSize + 4}
                y={padding + rowIdx * cellSize + 4}
                width={cellSize - 8}
                height={cellSize - 8}
                fill={getColor(value, rowIdx, colIdx)}
                rx="8"
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + (rowIdx * labels.length + colIdx) * 0.1 }}
                x={padding + colIdx * cellSize + cellSize / 2}
                y={padding + rowIdx * cellSize + cellSize / 2 + 8}
                textAnchor="middle"
                fill={isDark ? '#fff' : '#000'}
                fontSize="24"
                fontWeight="bold"
              >
                {value}
              </motion.text>
            </motion.g>
          ))
        )}

        {/* Cell type labels */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <text
            x={padding + cellSize / 2}
            y={padding + cellSize - 15}
            textAnchor="middle"
            fill={mutedColor}
            fontSize="9"
          >
            TN
          </text>
          <text
            x={padding + cellSize * 1.5}
            y={padding + cellSize - 15}
            textAnchor="middle"
            fill={mutedColor}
            fontSize="9"
          >
            FP
          </text>
          <text
            x={padding + cellSize / 2}
            y={padding + cellSize * 2 - 15}
            textAnchor="middle"
            fill={mutedColor}
            fontSize="9"
          >
            FN
          </text>
          <text
            x={padding + cellSize * 1.5}
            y={padding + cellSize * 2 - 15}
            textAnchor="middle"
            fill={mutedColor}
            fontSize="9"
          >
            TP
          </text>
        </motion.g>

        {/* Metrics */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <text
            x={padding + cellSize / 2}
            y={height + 30}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            Accuracy
          </text>
          <text
            x={padding + cellSize / 2}
            y={height + 48}
            textAnchor="middle"
            fill={accentColor}
            fontSize="14"
            fontWeight="bold"
          >
            {accuracy}%
          </text>

          <text
            x={padding + cellSize}
            y={height + 30}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            Precision
          </text>
          <text
            x={padding + cellSize}
            y={height + 48}
            textAnchor="middle"
            fill={accentColor}
            fontSize="14"
            fontWeight="bold"
          >
            {precision}%
          </text>

          <text
            x={padding + cellSize * 1.5}
            y={height + 30}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            Recall
          </text>
          <text
            x={padding + cellSize * 1.5}
            y={height + 48}
            textAnchor="middle"
            fill={accentColor}
            fontSize="14"
            fontWeight="bold"
          >
            {recall}%
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

export default ConfusionMatrix;
