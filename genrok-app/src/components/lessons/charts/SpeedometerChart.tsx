'use client';

import { motion } from 'framer-motion';

interface SpeedometerChartProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  label?: string;
  unit?: string;
  zones?: { min: number; max: number; color: string; label?: string }[];
  title?: string;
  accentColor?: string;
}

export function SpeedometerChart({
  value,
  minValue = 0,
  maxValue = 100,
  label,
  unit,
  zones,
  title,
  accentColor = '#88da1c',
}: SpeedometerChartProps) {
  const width = 400;
  const height = 280;
  const cx = width / 2;
  const cy = height - 40;
  const radius = 150;
  const startAngle = -180;
  const endAngle = 0;
  const angleRange = endAngle - startAngle;

  const defaultZones = [
    { min: 0, max: 33, color: '#EF4444', label: 'Low' },
    { min: 33, max: 66, color: '#F59E0B', label: 'Medium' },
    { min: 66, max: 100, color: '#22C55E', label: 'High' },
  ];

  const effectiveZones = zones || defaultZones;

  const valueToAngle = (val: number) => {
    const ratio = (val - minValue) / (maxValue - minValue);
    return startAngle + ratio * angleRange;
  };

  const valueAngle = valueToAngle(value);

  const polarToCartesian = (angle: number, r: number) => ({
    x: cx + r * Math.cos((angle * Math.PI) / 180),
    y: cy + r * Math.sin((angle * Math.PI) / 180),
  });

  const createArcPath = (start: number, end: number, r: number) => {
    const startPoint = polarToCartesian(start, r);
    const endPoint = polarToCartesian(end, r);
    const largeArc = end - start > 180 ? 1 : 0;

    return `M ${startPoint.x} ${startPoint.y} A ${r} ${r} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`;
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white text-center mb-4"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h3>
        )}

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Background arc */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            d={createArcPath(startAngle, endAngle, radius)}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="30"
            strokeLinecap="round"
          />

          {/* Zone arcs */}
          {effectiveZones.map((zone, i) => {
            const zoneStartAngle = valueToAngle(zone.min);
            const zoneEndAngle = valueToAngle(zone.max);

            return (
              <motion.path
                key={i}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                d={createArcPath(zoneStartAngle, zoneEndAngle, radius)}
                fill="none"
                stroke={zone.color}
                strokeWidth="30"
                strokeLinecap="butt"
                opacity="0.6"
              />
            );
          })}

          {/* Needle */}
          <motion.g
            initial={{ rotate: startAngle }}
            animate={{ rotate: valueAngle }}
            transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - radius + 40}
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx={cx} cy={cy} r="12" fill="white" />
            <circle cx={cx} cy={cy} r="6" fill="black" />
          </motion.g>

          {/* Value display */}
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            x={cx}
            y={cy + 50}
            textAnchor="middle"
            fill="white"
            fontSize="32"
            fontWeight="bold"
          >
            {value}
            {unit && <tspan fontSize="16" fill="rgba(255,255,255,0.5)"> {unit}</tspan>}
          </motion.text>

          {/* Label */}
          {label && (
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              x={cx}
              y={cy + 80}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="14"
            >
              {label}
            </motion.text>
          )}

          {/* Min/Max labels */}
          <text
            x={cx - radius - 10}
            y={cy + 20}
            textAnchor="end"
            fill="rgba(255,255,255,0.4)"
            fontSize="12"
          >
            {minValue}
          </text>
          <text
            x={cx + radius + 10}
            y={cy + 20}
            textAnchor="start"
            fill="rgba(255,255,255,0.4)"
            fontSize="12"
          >
            {maxValue}
          </text>
        </svg>
      </div>
    </div>
  );
}

export default SpeedometerChart;
