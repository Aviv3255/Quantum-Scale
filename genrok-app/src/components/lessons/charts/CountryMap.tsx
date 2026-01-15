'use client';

import { motion } from 'framer-motion';

interface CountryData {
  code: string;
  name: string;
  value?: number;
}

interface CountryMapProps {
  highlightedCountries: CountryData[];
  title?: string;
  highlightColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * CountryMap - Simple world map with highlighted countries
 * White slide background with dark rounded block
 */
export function CountryMap({
  highlightedCountries,
  title,
  highlightColor = '#88da1c',
  variant = 'dark',
}: CountryMapProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const mapBaseColor = isDark ? '#333333' : '#e5e5e5';

  // Simplified continent/region representations
  const regions = [
    { id: 'na', name: 'North America', x: 80, y: 100, width: 120, height: 80, codes: ['US', 'CA', 'MX'] },
    { id: 'sa', name: 'South America', x: 120, y: 200, width: 60, height: 100, codes: ['BR', 'AR', 'CO', 'CL', 'PE'] },
    { id: 'eu', name: 'Europe', x: 280, y: 80, width: 80, height: 60, codes: ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE'] },
    { id: 'af', name: 'Africa', x: 280, y: 150, width: 70, height: 100, codes: ['ZA', 'NG', 'EG', 'KE', 'MA'] },
    { id: 'as', name: 'Asia', x: 380, y: 80, width: 140, height: 120, codes: ['CN', 'JP', 'IN', 'KR', 'SG', 'TH', 'VN'] },
    { id: 'oc', name: 'Oceania', x: 480, y: 220, width: 60, height: 50, codes: ['AU', 'NZ'] },
  ];

  const highlightedCodes = new Set(highlightedCountries.map(c => c.code));

  const isRegionHighlighted = (codes: string[]) => {
    return codes.some(code => highlightedCodes.has(code));
  };

  const getRegionCountries = (codes: string[]) => {
    return highlightedCountries.filter(c => codes.includes(c.code));
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

      {/* Map Container */}
      <div className="relative">
        <svg viewBox="0 0 600 320" className="w-full h-auto">
          {/* Background */}
          <rect x="0" y="0" width="600" height="320" fill="transparent" />

          {/* Regions */}
          {regions.map((region, index) => {
            const isHighlighted = isRegionHighlighted(region.codes);
            return (
              <motion.g key={region.id}>
                <motion.rect
                  x={region.x}
                  y={region.y}
                  width={region.width}
                  height={region.height}
                  rx={8}
                  fill={isHighlighted ? highlightColor : mapBaseColor}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
                {isHighlighted && (
                  <motion.rect
                    x={region.x}
                    y={region.y}
                    width={region.width}
                    height={region.height}
                    rx={8}
                    fill="none"
                    stroke={highlightColor}
                    strokeWidth={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.g>
            );
          })}

          {/* Connection lines between highlighted regions */}
          {regions.filter(r => isRegionHighlighted(r.codes)).map((region, i, arr) => {
            if (i === 0) return null;
            const prev = arr[i - 1];
            return (
              <motion.line
                key={`line-${region.id}`}
                x1={prev.x + prev.width / 2}
                y1={prev.y + prev.height / 2}
                x2={region.x + region.width / 2}
                y2={region.y + region.height / 2}
                stroke={highlightColor}
                strokeWidth={1}
                strokeDasharray="4,4"
                opacity={0.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <h4 className={`text-sm font-semibold ${textColor} mb-3`}>Highlighted Countries</h4>
        <div className="flex flex-wrap gap-2">
          {highlightedCountries.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{ backgroundColor: `${highlightColor}20` }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: highlightColor }}
              />
              <span className={`text-xs font-medium ${textColor}`}>{country.name}</span>
              {country.value !== undefined && (
                <span className={`text-xs ${mutedColor}`}>({country.value}%)</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className={`text-center mt-4 text-sm ${mutedColor}`}
      >
        {highlightedCountries.length} countries selected across{' '}
        {regions.filter(r => isRegionHighlighted(r.codes)).length} regions
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

export default CountryMap;
