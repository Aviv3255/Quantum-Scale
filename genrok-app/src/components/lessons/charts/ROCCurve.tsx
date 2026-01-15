'use client';

import { motion } from 'framer-motion';

interface ROCPoint {
  fpr: number; // False Positive Rate (x-axis)
  tpr: number; // True Positive Rate (y-axis)
}

interface ROCCurveProps {
  data?: ROCPoint[];
  auc?: number;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: ROCPoint[] = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.35 },
  { fpr: 0.1, tpr: 0.55 },
  { fpr: 0.15, tpr: 0.68 },
  { fpr: 0.2, tpr: 0.75 },
  { fpr: 0.3, tpr: 0.82 },
  { fpr: 0.4, tpr: 0.88 },
  { fpr: 0.5, tpr: 0.92 },
  { fpr: 0.6, tpr: 0.95 },
  { fpr: 0.7, tpr: 0.97 },
  { fpr: 0.8, tpr: 0.98 },
  { fpr: 0.9, tpr: 0.99 },
  { fpr: 1, tpr: 1 },
];

export function ROCCurve({
  data = defaultData,
  auc = 0.87,
  title = 'ROC Curve',
  accentColor = '#88da1c',
  variant = 'dark',
}: ROCCurveProps) {
  const isDark = variant === 'dark';
  const width = 400;
  const height = 400;
  const padding = 50;

  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const scaleX = (val: number) => padding + val * (width - 2 * padding);
  const scaleY = (val: number) => height - padding - val * (height - 2 * padding);

  const pathData = data
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(point.fpr)} ${scaleY(point.tpr)}`)
    .join(' ');

  const areaPath = `${pathData} L ${scaleX(1)} ${scaleY(0)} L ${scaleX(0)} ${scaleY(0)} Z`;

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
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((val, i) => (
          <motion.g key={i}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              x1={padding}
              y1={scaleY(val)}
              x2={width - padding}
              y2={scaleY(val)}
              stroke={gridStroke}
            />
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              x1={scaleX(val)}
              y1={padding}
              x2={scaleX(val)}
              y2={height - padding}
              stroke={gridStroke}
            />
          </motion.g>
        ))}

        {/* Diagonal reference line (random classifier) */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          x1={scaleX(0)}
          y1={scaleY(0)}
          x2={scaleX(1)}
          y2={scaleY(1)}
          stroke={mutedColor}
          strokeWidth="2"
          strokeDasharray="8 4"
        />

        {/* AUC area */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          d={areaPath}
          fill={accentColor}
        />

        {/* ROC curve */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          d={pathData}
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.03 }}
            cx={scaleX(point.fpr)}
            cy={scaleY(point.tpr)}
            r="4"
            fill={accentColor}
          />
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={axisStroke}
          strokeWidth="2"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisStroke}
          strokeWidth="2"
        />

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fill={labelFill}
          fontSize="12"
        >
          False Positive Rate
        </text>
        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          fill={labelFill}
          fontSize="12"
          transform={`rotate(-90, 15, ${height / 2})`}
        >
          True Positive Rate
        </text>

        {/* AUC label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <rect
            x={width - padding - 80}
            y={padding + 10}
            width="70"
            height="35"
            fill={isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)'}
            rx="6"
          />
          <text
            x={width - padding - 45}
            y={padding + 25}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            AUC
          </text>
          <text
            x={width - padding - 45}
            y={padding + 40}
            textAnchor="middle"
            fill={accentColor}
            fontSize="14"
            fontWeight="bold"
          >
            {auc.toFixed(2)}
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

export default ROCCurve;
