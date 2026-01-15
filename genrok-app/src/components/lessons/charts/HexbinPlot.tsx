'use client';

import { motion } from 'framer-motion';

interface HexbinPoint {
  x: number;
  y: number;
}

interface HexbinPlotProps {
  data?: HexbinPoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
  hexRadius?: number;
}

const defaultData: HexbinPoint[] = Array.from({ length: 200 }, () => ({
  x: Math.random() * 100 + Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1),
  y: Math.random() * 100 + Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1),
}));

function hexbin(data: HexbinPoint[], radius: number, width: number, height: number) {
  const hexWidth = radius * 2;
  const hexHeight = Math.sqrt(3) * radius;
  const bins: Map<string, { x: number; y: number; count: number }> = new Map();

  data.forEach(point => {
    const col = Math.round(point.x / (hexWidth * 0.75));
    const row = Math.round(point.y / hexHeight - (col % 2) * 0.5);
    const key = `${col},${row}`;

    const centerX = col * hexWidth * 0.75;
    const centerY = (row + (col % 2) * 0.5) * hexHeight;

    if (!bins.has(key)) {
      bins.set(key, { x: centerX, y: centerY, count: 0 });
    }
    bins.get(key)!.count++;
  });

  return Array.from(bins.values());
}

function hexagonPath(radius: number): string {
  const angles = [0, 60, 120, 180, 240, 300].map(a => (a * Math.PI) / 180);
  return angles
    .map((angle, i) => {
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';
}

export function HexbinPlot({
  data = defaultData,
  title = 'Hexagonal Binning - Data Density',
  xLabel = 'Variable X',
  yLabel = 'Variable Y',
  accentColor = '#88da1c',
  variant = 'dark',
  hexRadius = 12,
}: HexbinPlotProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 400;
  const padding = { top: 50, right: 40, bottom: 60, left: 60 };

  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  // Normalize data to chart dimensions
  const xMin = Math.min(...data.map(d => d.x));
  const xMax = Math.max(...data.map(d => d.x));
  const yMin = Math.min(...data.map(d => d.y));
  const yMax = Math.max(...data.map(d => d.y));

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const normalizedData = data.map(d => ({
    x: ((d.x - xMin) / (xMax - xMin)) * chartWidth,
    y: ((d.y - yMin) / (yMax - yMin)) * chartHeight,
  }));

  const bins = hexbin(normalizedData, hexRadius, chartWidth, chartHeight);
  const maxCount = Math.max(...bins.map(b => b.count));

  const getColor = (count: number) => {
    const intensity = count / maxCount;
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
          className="text-xl font-bold text-center mb-6"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <motion.g key={i}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.02 * i }}
              x1={padding.left}
              y1={padding.top + t * chartHeight}
              x2={padding.left + chartWidth}
              y2={padding.top + t * chartHeight}
              stroke={gridStroke}
              strokeWidth={1}
            />
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.02 * i }}
              x1={padding.left + t * chartWidth}
              y1={padding.top}
              x2={padding.left + t * chartWidth}
              y2={padding.top + chartHeight}
              stroke={gridStroke}
              strokeWidth={1}
            />
          </motion.g>
        ))}

        {/* Hexagons */}
        {bins.map((bin, i) => (
          <motion.g
            key={i}
            transform={`translate(${padding.left + bin.x}, ${padding.top + chartHeight - bin.y})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.005 * i, duration: 0.3 }}
          >
            <path
              d={hexagonPath(hexRadius - 1)}
              fill={getColor(bin.count)}
              stroke={accentColor}
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
            {bin.count > maxCount * 0.3 && (
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isDark ? '#fff' : '#000'}
                fontSize="8"
                fontWeight="600"
              >
                {bin.count}
              </text>
            )}
          </motion.g>
        ))}

        {/* Axes */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke={labelFill}
          strokeWidth={1}
        />
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke={labelFill}
          strokeWidth={1}
        />

        {/* Labels */}
        <text
          x={padding.left + chartWidth / 2}
          y={height - 15}
          textAnchor="middle"
          fill={labelFill}
          fontSize="12"
        >
          {xLabel}
        </text>
        <text
          x={20}
          y={padding.top + chartHeight / 2}
          textAnchor="middle"
          fill={labelFill}
          fontSize="12"
          transform={`rotate(-90, 20, ${padding.top + chartHeight / 2})`}
        >
          {yLabel}
        </text>

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <text
            x={width - 80}
            y={padding.top + 10}
            fill={labelFill}
            fontSize="10"
            fontWeight="600"
          >
            Density
          </text>
          {[0.2, 0.4, 0.6, 0.8, 1].map((intensity, i) => (
            <g key={i} transform={`translate(${width - 80}, ${padding.top + 20 + i * 18})`}>
              <rect
                width="14"
                height="14"
                fill={`rgba(${parseInt(accentColor.slice(1, 3), 16)}, ${parseInt(accentColor.slice(3, 5), 16)}, ${parseInt(accentColor.slice(5, 7), 16)}, ${intensity})`}
                rx="2"
              />
              <text x="20" y="11" fill={labelFill} fontSize="9">
                {Math.round(intensity * maxCount)}
              </text>
            </g>
          ))}
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

export default HexbinPlot;
