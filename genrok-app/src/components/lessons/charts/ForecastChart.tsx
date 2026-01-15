'use client';

import { motion } from 'framer-motion';

interface TimeSeriesPoint {
  date: string;
  value: number;
  isActual: boolean;
  lowerBound?: number;
  upperBound?: number;
}

interface ForecastChartProps {
  data?: TimeSeriesPoint[];
  title?: string;
  accentColor?: string;
  forecastColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: TimeSeriesPoint[] = [
  // Historical data
  { date: 'Jan', value: 42, isActual: true },
  { date: 'Feb', value: 48, isActual: true },
  { date: 'Mar', value: 45, isActual: true },
  { date: 'Apr', value: 52, isActual: true },
  { date: 'May', value: 58, isActual: true },
  { date: 'Jun', value: 62, isActual: true },
  { date: 'Jul', value: 68, isActual: true },
  { date: 'Aug', value: 72, isActual: true },
  // Forecast data with confidence intervals
  { date: 'Sep', value: 78, isActual: false, lowerBound: 72, upperBound: 84 },
  { date: 'Oct', value: 82, isActual: false, lowerBound: 74, upperBound: 90 },
  { date: 'Nov', value: 88, isActual: false, lowerBound: 78, upperBound: 98 },
  { date: 'Dec', value: 95, isActual: false, lowerBound: 82, upperBound: 108 },
];

export function ForecastChart({
  data = defaultData,
  title = 'Revenue Forecast',
  accentColor = '#88da1c',
  forecastColor = '#007AFF',
  variant = 'dark',
}: ForecastChartProps) {
  const isDark = variant === 'dark';
  const width = 520;
  const height = 320;
  const padding = 60;

  const textColor = isDark ? 'text-white' : 'text-black';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const allValues = data.flatMap(d => [d.value, d.lowerBound || d.value, d.upperBound || d.value]);
  const minValue = Math.min(...allValues) * 0.9;
  const maxValue = Math.max(...allValues) * 1.1;

  const scaleX = (index: number) => padding + (index / (data.length - 1)) * (width - 2 * padding);
  const scaleY = (val: number) =>
    height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  const actualData = data.filter(d => d.isActual);
  const forecastData = data.filter(d => !d.isActual);
  const lastActualIndex = actualData.length - 1;

  // Create paths
  const actualPath = actualData
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(point.value)}`)
    .join(' ');

  const forecastPath = forecastData
    .map((point, i) => {
      const index = lastActualIndex + i;
      return `${i === 0 ? `M ${scaleX(lastActualIndex)} ${scaleY(actualData[lastActualIndex].value)} L` : 'L'} ${scaleX(index + 1)} ${scaleY(point.value)}`;
    })
    .join(' ');

  // Confidence interval area
  const confidenceAreaPath = (() => {
    if (forecastData.length === 0) return '';

    const upperPoints = forecastData.map((point, i) => {
      const index = lastActualIndex + i + 1;
      return `${scaleX(index)},${scaleY(point.upperBound || point.value)}`;
    });

    const lowerPoints = forecastData.map((point, i) => {
      const index = lastActualIndex + i + 1;
      return `${scaleX(index)},${scaleY(point.lowerBound || point.value)}`;
    }).reverse();

    const startX = scaleX(lastActualIndex);
    const startY = scaleY(actualData[lastActualIndex].value);

    return `M ${startX},${startY} L ${upperPoints.join(' L ')} L ${lowerPoints.join(' L ')} Z`;
  })();

  // Calculate forecast metrics
  const lastActual = actualData[actualData.length - 1].value;
  const lastForecast = forecastData[forecastData.length - 1]?.value || lastActual;
  const growthRate = ((lastForecast - lastActual) / lastActual * 100).toFixed(1);

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

      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct, i) => {
          const y = padding + ((height - 2 * padding) * pct) / 100;
          const value = maxValue - (pct / 100) * (maxValue - minValue);
          return (
            <motion.g key={i}>
              <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.03 * i }}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke={gridStroke}
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fill={labelFill}
                fontSize="10"
              >
                {Math.round(value)}
              </text>
            </motion.g>
          );
        })}

        {/* X-axis labels */}
        {data.map((point, i) => (
          <text
            key={i}
            x={scaleX(i)}
            y={height - padding + 20}
            textAnchor="middle"
            fill={point.isActual ? labelFill : forecastColor}
            fontSize="10"
            fontStyle={point.isActual ? 'normal' : 'italic'}
          >
            {point.date}
          </text>
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

        {/* Forecast/Actual divider */}
        <motion.line
          initial={{ opacity: 0, y1: height - padding, y2: height - padding }}
          animate={{ opacity: 1, y1: padding, y2: height - padding }}
          transition={{ delay: 0.5, duration: 0.5 }}
          x1={scaleX(lastActualIndex)}
          x2={scaleX(lastActualIndex)}
          stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}
          strokeWidth="1"
          strokeDasharray="6 4"
        />

        {/* Confidence interval area */}
        {confidenceAreaPath && (
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            d={confidenceAreaPath}
            fill={forecastColor}
          />
        )}

        {/* Actual line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          d={actualPath}
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Forecast line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          d={forecastPath}
          fill="none"
          stroke={forecastColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 4"
        />

        {/* Actual data points */}
        {actualData.map((point, i) => (
          <motion.circle
            key={`actual-${i}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            cx={scaleX(i)}
            cy={scaleY(point.value)}
            r="5"
            fill={accentColor}
          />
        ))}

        {/* Forecast data points */}
        {forecastData.map((point, i) => {
          const index = lastActualIndex + i + 1;
          return (
            <motion.circle
              key={`forecast-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.08 }}
              cx={scaleX(index)}
              cy={scaleY(point.value)}
              r="5"
              fill={forecastColor}
              stroke={isDark ? '#000' : '#fff'}
              strokeWidth="2"
            />
          );
        })}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <rect
            x={width - padding - 120}
            y={padding}
            width="110"
            height="75"
            fill={isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)'}
            rx="8"
          />

          <circle cx={width - padding - 105} cy={padding + 18} r="4" fill={accentColor} />
          <text x={width - padding - 95} y={padding + 22} fill={labelFill} fontSize="10">
            Actual
          </text>

          <circle cx={width - padding - 105} cy={padding + 38} r="4" fill={forecastColor} />
          <text x={width - padding - 95} y={padding + 42} fill={labelFill} fontSize="10">
            Forecast
          </text>

          <rect
            x={width - padding - 110}
            y={padding + 50}
            width="15"
            height="10"
            fill={`${forecastColor}40`}
            rx="2"
          />
          <text x={width - padding - 90} y={padding + 58} fill={labelFill} fontSize="10">
            95% CI
          </text>
        </motion.g>

        {/* Growth indicator */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <text
            x={width - padding - 65}
            y={height}
            textAnchor="middle"
            fill={parseFloat(growthRate) >= 0 ? '#34C759' : '#FF3B30'}
            fontSize="12"
            fontWeight="bold"
          >
            {parseFloat(growthRate) >= 0 ? '+' : ''}{growthRate}% projected
          </text>
        </motion.g>

        {/* Labels */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <text
            x={scaleX(lastActualIndex / 2)}
            y={padding - 5}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            Historical
          </text>
          <text
            x={scaleX(lastActualIndex + (forecastData.length + 1) / 2)}
            y={padding - 5}
            textAnchor="middle"
            fill={forecastColor}
            fontSize="10"
          >
            Forecast
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

export default ForecastChart;
