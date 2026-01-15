'use client';

import { motion } from 'framer-motion';

interface EulerSet {
  id: string;
  label: string;
  size: number;
  parent?: string;
}

interface EulerDiagramProps {
  sets?: EulerSet[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultSets: EulerSet[] = [
  { id: 'all', label: 'All Customers', size: 100 },
  { id: 'active', label: 'Active Users', size: 70, parent: 'all' },
  { id: 'premium', label: 'Premium', size: 25, parent: 'active' },
  { id: 'enterprise', label: 'Enterprise', size: 8, parent: 'premium' },
];

export function EulerDiagram({
  sets = defaultSets,
  title = 'Customer Segmentation',
  accentColor = '#88da1c',
  variant = 'dark',
}: EulerDiagramProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;

  const textColor = isDark ? 'text-white' : 'text-black';
  const labelFill = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)';

  // Calculate positions for nested sets
  const maxSize = Math.max(...sets.map(s => s.size));
  const maxRadius = Math.min(width, height) / 2 - 60;

  // Sort sets by size (largest first for proper nesting)
  const sortedSets = [...sets].sort((a, b) => b.size - a.size);

  const colors = [
    accentColor,
    '#4ECDC4',
    '#FF6B6B',
    '#FFE66D',
    '#D4A5FF',
  ];

  // Calculate set positions (nested arrangement)
  const setPositions = sortedSets.map((set, i) => {
    const radius = (set.size / maxSize) * maxRadius;
    // Slight offset for visual interest
    const offsetX = i * 5;
    const offsetY = i * 8;
    return {
      ...set,
      x: centerX + offsetX,
      y: centerY + offsetY,
      radius,
      color: colors[i % colors.length],
    };
  });

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
        {/* Sets (largest to smallest for proper layering) */}
        {setPositions.map((set, i) => (
          <motion.g key={set.id}>
            <motion.ellipse
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 * i, duration: 0.5, type: 'spring' }}
              cx={set.x}
              cy={set.y}
              rx={set.radius}
              ry={set.radius * 0.85}
              fill={set.color}
              fillOpacity={0.3}
              stroke={set.color}
              strokeWidth={2}
              style={{ transformOrigin: `${set.x}px ${set.y}px` }}
            />
          </motion.g>
        ))}

        {/* Labels with values */}
        {setPositions.map((set, i) => {
          // Position labels based on set size
          const labelY = set.y - set.radius * 0.5 + i * 20;
          const labelX = set.x;

          return (
            <motion.g key={`label-${set.id}`}>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + 0.15 * i }}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fill={labelFill}
                fontSize="12"
                fontWeight="600"
              >
                {set.label}
              </motion.text>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + 0.15 * i }}
                x={labelX}
                y={labelY + 16}
                textAnchor="middle"
                fill={set.color}
                fontSize="18"
                fontWeight="700"
              >
                {set.size}%
              </motion.text>
            </motion.g>
          );
        })}

        {/* Connection lines showing containment */}
        {setPositions.slice(0, -1).map((set, i) => {
          const nextSet = setPositions[i + 1];
          if (!nextSet) return null;

          return (
            <motion.line
              key={`line-${set.id}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ delay: 0.5 + 0.1 * i }}
              x1={set.x + set.radius * 0.7}
              y1={set.y}
              x2={nextSet.x + nextSet.radius * 0.7}
              y2={nextSet.y}
              stroke={labelFill}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          );
        })}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <text x={30} y={height - 60} fill={labelFill} fontSize="10" fontWeight="600">
            Subset Relationship
          </text>
          {setPositions.slice(0, 3).map((set, i) => (
            <g key={`legend-${set.id}`} transform={`translate(30, ${height - 45 + i * 16})`}>
              <rect width="12" height="12" fill={set.color} fillOpacity="0.5" stroke={set.color} strokeWidth="1" rx="2" />
              <text x="18" y="10" fill={labelFill} fontSize="9">{set.label}</text>
            </g>
          ))}
        </motion.g>

        {/* Annotation showing containment */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <text
            x={width - 30}
            y={height - 30}
            textAnchor="end"
            fill={labelFill}
            fontSize="9"
            opacity="0.6"
          >
            Inner sets are subsets of outer sets
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

export default EulerDiagram;
