'use client';

import { motion } from 'framer-motion';

interface IsotypeData {
  category: string;
  value: number;
  icon?: 'person' | 'dollar' | 'star' | 'heart' | 'cart' | 'box';
}

interface IsotypeChartProps {
  data?: IsotypeData[];
  title?: string;
  unitValue?: number;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: IsotypeData[] = [
  { category: '2021', value: 45, icon: 'person' },
  { category: '2022', value: 68, icon: 'person' },
  { category: '2023', value: 82, icon: 'person' },
  { category: '2024', value: 95, icon: 'person' },
];

const icons = {
  person: (color: string) => (
    <g>
      <circle cx="10" cy="5" r="4" fill={color} />
      <path d="M3 20 L5 12 Q10 9 15 12 L17 20 Z" fill={color} />
    </g>
  ),
  dollar: (color: string) => (
    <g>
      <circle cx="10" cy="10" r="9" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
      <text x="10" y="14" textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">$</text>
    </g>
  ),
  star: (color: string) => (
    <path
      d="M10 2 L12.5 7.5 L18 8 L14 12 L15 18 L10 15 L5 18 L6 12 L2 8 L7.5 7.5 Z"
      fill={color}
    />
  ),
  heart: (color: string) => (
    <path
      d="M10 18 C5 13 2 9 2 6 C2 3 4 1 7 1 C9 1 10 3 10 3 C10 3 11 1 13 1 C16 1 18 3 18 6 C18 9 15 13 10 18 Z"
      fill={color}
    />
  ),
  cart: (color: string) => (
    <g>
      <path d="M2 2 L4 2 L6 14 L16 14 L18 6 L5 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="2" fill={color} />
      <circle cx="15" cy="17" r="2" fill={color} />
    </g>
  ),
  box: (color: string) => (
    <g>
      <rect x="2" y="6" width="16" height="12" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" rx="2" />
      <path d="M2 10 L18 10" stroke={color} strokeWidth="1.5" />
      <path d="M10 6 L10 18" stroke={color} strokeWidth="1.5" />
    </g>
  ),
};

export function IsotypeChart({
  data = defaultData,
  title = 'User Growth Over Time',
  unitValue = 10,
  accentColor = '#88da1c',
  variant = 'dark',
}: IsotypeChartProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 400;
  const padding = { top: 60, right: 40, bottom: 60, left: 80 };

  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map(d => d.value));
  const maxIcons = Math.ceil(maxValue / unitValue);
  const iconSize = 20;
  const iconGap = 4;
  const rowHeight = chartHeight / data.length;

  const colors = [accentColor, '#FF6B6B', '#4ECDC4', '#FFE66D'];

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
        {/* Row backgrounds */}
        {data.map((item, rowIndex) => (
          <motion.rect
            key={`bg-${rowIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: rowIndex % 2 === 0 ? 0.05 : 0 }}
            x={padding.left - 10}
            y={padding.top + rowIndex * rowHeight}
            width={chartWidth + 20}
            height={rowHeight}
            fill={isDark ? '#fff' : '#000'}
            rx="4"
          />
        ))}

        {/* Category labels */}
        {data.map((item, rowIndex) => (
          <motion.text
            key={`label-${rowIndex}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * rowIndex }}
            x={padding.left - 15}
            y={padding.top + rowIndex * rowHeight + rowHeight / 2 + 4}
            textAnchor="end"
            fill={labelFill}
            fontSize="12"
            fontWeight="600"
          >
            {item.category}
          </motion.text>
        ))}

        {/* Icons */}
        {data.map((item, rowIndex) => {
          const numIcons = Math.ceil(item.value / unitValue);
          const color = colors[rowIndex % colors.length];
          const iconType = item.icon || 'person';
          const IconComponent = icons[iconType];

          return Array.from({ length: numIcons }).map((_, iconIndex) => {
            const isPartial = iconIndex === numIcons - 1 && item.value % unitValue !== 0;
            const fillPercent = isPartial ? (item.value % unitValue) / unitValue : 1;

            return (
              <motion.g
                key={`icon-${rowIndex}-${iconIndex}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: fillPercent < 1 ? 0.4 : 1 }}
                transition={{ delay: 0.02 * iconIndex + 0.1 * rowIndex, duration: 0.2 }}
                transform={`translate(${padding.left + iconIndex * (iconSize + iconGap)}, ${padding.top + rowIndex * rowHeight + (rowHeight - iconSize) / 2})`}
              >
                {IconComponent(color)}
              </motion.g>
            );
          });
        })}

        {/* Value labels */}
        {data.map((item, rowIndex) => {
          const numIcons = Math.ceil(item.value / unitValue);
          const x = padding.left + numIcons * (iconSize + iconGap) + 10;
          const y = padding.top + rowIndex * rowHeight + rowHeight / 2 + 4;

          return (
            <motion.text
              key={`value-${rowIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + 0.1 * rowIndex }}
              x={x}
              y={y}
              fill={colors[rowIndex % colors.length]}
              fontSize="14"
              fontWeight="700"
            >
              {item.value}
            </motion.text>
          );
        })}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <g transform={`translate(${padding.left}, ${height - 30})`}>
            {icons.person(labelFill)}
          </g>
          <text
            x={padding.left + 25}
            y={height - 18}
            fill={labelFill}
            fontSize="10"
          >
            = {unitValue} users
          </text>
          <text
            x={width - padding.right}
            y={height - 18}
            textAnchor="end"
            fill={labelFill}
            fontSize="9"
            opacity="0.6"
          >
            Each icon represents {unitValue} units
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

export default IsotypeChart;
