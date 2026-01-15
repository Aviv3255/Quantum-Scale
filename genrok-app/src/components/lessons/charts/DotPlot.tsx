'use client';

import { motion } from 'framer-motion';

interface DotPlotData {
  label: string;
  value: number;
  value2?: number;
}

interface DotPlotProps {
  data: DotPlotData[];
  title?: string;
  valueLabel?: string;
  value2Label?: string;
  accentColor?: string;
  accentColor2?: string;
  variant?: 'dark' | 'light';
}

export function DotPlot({
  data,
  title,
  valueLabel,
  value2Label,
  accentColor = '#88da1c',
  accentColor2 = '#3B82F6',
  variant = 'dark',
}: DotPlotProps) {
  const isDark = variant === 'dark';
  const mutedFill = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const width = 500;
  const height = 350;
  const padding = { top: 40, right: 40, bottom: 60, left: 120 };

  const allValues = data.flatMap(d => [d.value, d.value2].filter((v): v is number => v !== undefined));
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  const rowHeight = (height - padding.top - padding.bottom) / data.length;

  const scaleX = (val: number) =>
    padding.left + ((val - minValue) / (maxValue - minValue)) * (width - padding.left - padding.right);

  const hasValue2 = data.some(d => d.value2 !== undefined);

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
        {[0, 25, 50, 75, 100].map((pct, i) => {
          const x = padding.left + (pct / 100) * (width - padding.left - padding.right);
          return (
            <motion.line
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              x1={x}
              y1={padding.top}
              x2={x}
              y2={height - padding.bottom}
              stroke={gridStroke}
            />
          );
        })}

        {/* X axis */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke={axisStroke}
          strokeWidth="2"
        />

        {/* Rows */}
        {data.map((d, i) => {
          const y = padding.top + (i + 0.5) * rowHeight;

          return (
            <motion.g key={i}>
              {/* Connecting line (if two values) */}
              {d.value2 !== undefined && (
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  x1={scaleX(d.value)}
                  y1={y}
                  x2={scaleX(d.value2)}
                  y2={y}
                  stroke={axisStroke}
                  strokeWidth="2"
                />
              )}

              {/* Primary dot */}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05, type: 'spring' }}
                cx={scaleX(d.value)}
                cy={y}
                r="8"
                fill={accentColor}
              />

              {/* Secondary dot */}
              {d.value2 !== undefined && (
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, type: 'spring' }}
                  cx={scaleX(d.value2)}
                  cy={y}
                  r="8"
                  fill={accentColor2}
                />
              )}

              {/* Label */}
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fill={labelFill}
                fontSize="11"
              >
                {d.label}
              </text>
            </motion.g>
          );
        })}

        {/* X axis labels */}
        {[minValue, (minValue + maxValue) / 2, maxValue].map((val, i) => (
          <text
            key={i}
            x={scaleX(val)}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            fill={mutedFill}
            fontSize="10"
          >
            {val.toFixed(0)}
          </text>
        ))}
      </svg>

      {/* Legend */}
      {hasValue2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6 mt-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{valueLabel || 'Value 1'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor2 }} />
            <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{value2Label || 'Value 2'}</span>
          </div>
        </motion.div>
      )}
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

export default DotPlot;
