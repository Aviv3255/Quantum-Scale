'use client';

import { motion } from 'framer-motion';

interface VennSet {
  label: string;
  color?: string;
}

interface VennDiagramProps {
  sets: [VennSet, VennSet] | [VennSet, VennSet, VennSet];
  intersectionLabel?: string;
  title?: string;
  accentColor?: string;
}

export function VennDiagram({
  sets,
  intersectionLabel,
  title,
  accentColor = '#88da1c',
}: VennDiagramProps) {
  const width = 450;
  const height = 350;
  const cx = width / 2;
  const cy = height / 2;

  const colors = ['#88da1c', '#3B82F6', '#A855F7'];
  const isTwoSets = sets.length === 2;

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white text-center mb-6"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h3>
        )}

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          <defs>
            {/* Create clip paths for intersections */}
            <clipPath id="clip-a">
              <circle cx={isTwoSets ? cx - 50 : cx - 60} cy={isTwoSets ? cy : cy + 30} r="100" />
            </clipPath>
            <clipPath id="clip-b">
              <circle cx={isTwoSets ? cx + 50 : cx + 60} cy={isTwoSets ? cy : cy + 30} r="100" />
            </clipPath>
            {!isTwoSets && (
              <clipPath id="clip-c">
                <circle cx={cx} cy={cy - 50} r="100" />
              </clipPath>
            )}
          </defs>

          {/* Set A */}
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            cx={isTwoSets ? cx - 50 : cx - 60}
            cy={isTwoSets ? cy : cy + 30}
            r="100"
            fill={sets[0].color || colors[0]}
            style={{ transformOrigin: `${isTwoSets ? cx - 50 : cx - 60}px ${isTwoSets ? cy : cy + 30}px` }}
          />

          {/* Set B */}
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            cx={isTwoSets ? cx + 50 : cx + 60}
            cy={isTwoSets ? cy : cy + 30}
            r="100"
            fill={sets[1].color || colors[1]}
            style={{ transformOrigin: `${isTwoSets ? cx + 50 : cx + 60}px ${isTwoSets ? cy : cy + 30}px` }}
          />

          {/* Set C (if 3 sets) */}
          {!isTwoSets && sets[2] && (
            <motion.circle
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              cx={cx}
              cy={cy - 50}
              r="100"
              fill={sets[2].color || colors[2]}
              style={{ transformOrigin: `${cx}px ${cy - 50}px` }}
            />
          )}

          {/* Labels */}
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            x={isTwoSets ? cx - 100 : cx - 110}
            y={isTwoSets ? cy : cy + 50}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            {sets[0].label}
          </motion.text>

          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            x={isTwoSets ? cx + 100 : cx + 110}
            y={isTwoSets ? cy : cy + 50}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            {sets[1].label}
          </motion.text>

          {!isTwoSets && sets[2] && (
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              x={cx}
              y={cy - 130}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {sets[2].label}
            </motion.text>
          )}

          {/* Intersection label */}
          {intersectionLabel && (
            <motion.text
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              x={cx}
              y={isTwoSets ? cy : cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="11"
              fontWeight="bold"
            >
              {intersectionLabel}
            </motion.text>
          )}
        </svg>
      </div>
    </div>
  );
}

export default VennDiagram;
