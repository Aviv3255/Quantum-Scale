'use client';

import { motion } from 'framer-motion';

interface ComparisonItem {
  feature: string;
  description?: string;
}

interface ComparisonColumn {
  name: string;
  values: (boolean | string | 'partial')[];
  highlight?: boolean;
}

interface FeatureComparisonProps {
  title?: string;
  features: ComparisonItem[];
  columns: ComparisonColumn[];
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function FeatureComparison({
  title,
  features,
  columns,
  accentColor = '#88da1c',
  variant = 'dark',
}: FeatureComparisonProps) {
  const isDark = variant === 'dark';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const headerBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const rowBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';
  const highlightBg = isDark ? 'bg-white/10' : 'bg-black/10';

  const CheckIcon = () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#22C55E" />
      <path
        d="M6 10L9 13L14 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const CrossIcon = () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#EF4444" />
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const PartialIcon = () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#F59E0B" />
      <path
        d="M6 10H14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const renderValue = (value: boolean | string | 'partial') => {
    if (value === true) return <CheckIcon />;
    if (value === false) return <CrossIcon />;
    if (value === 'partial') return <PartialIcon />;
    return (
      <span className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#000' }}>{value}</span>
    );
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-8"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={headerBg}
            >
              <th
                className={`py-4 px-4 text-left border-b ${borderColor}`}
                style={{ width: '40%' }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                  Feature
                </span>
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`py-4 px-4 text-center border-b ${borderColor} ${
                    col.highlight ? highlightBg : ''
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className="font-bold"
                      style={{ color: col.highlight ? accentColor : (isDark ? '#fff' : '#000') }}
                    >
                      {col.name}
                    </span>
                    {col.highlight && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          backgroundColor: `${accentColor}20`,
                          color: accentColor,
                        }}
                      >
                        Recommended
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </motion.tr>
          </thead>

          {/* Body */}
          <tbody>
            {features.map((feature, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + rowIndex * 0.05 }}
                className={`${rowBg} transition-colors`}
              >
                <td className={`py-4 px-4 border-b ${borderColor}`}>
                  <div>
                    <span className="font-medium" style={{ color: isDark ? '#fff' : '#000' }}>
                      {feature.feature}
                    </span>
                    {feature.description && (
                      <p className="text-sm mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                        {feature.description}
                      </p>
                    )}
                  </div>
                </td>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-4 text-center border-b ${borderColor} ${
                      col.highlight ? highlightBg : ''
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2 + rowIndex * 0.05 + colIndex * 0.03,
                        type: 'spring',
                        stiffness: 300,
                      }}
                      className="flex justify-center"
                    >
                      {renderValue(col.values[rowIndex])}
                    </motion.div>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-6 mt-6"
      >
        <div className="flex items-center gap-2">
          <CheckIcon />
          <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>Included</span>
        </div>
        <div className="flex items-center gap-2">
          <PartialIcon />
          <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <CrossIcon />
          <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>Not Included</span>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-3xl">{content}</div>
      ) : (
        <div className="w-full max-w-3xl">{content}</div>
      )}
    </div>
  );
}

export default FeatureComparison;
