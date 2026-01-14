'use client';

import { motion } from 'framer-motion';

interface ChordData {
  labels: string[];
  matrix: number[][];
}

interface ChordDiagramProps {
  data: ChordData;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function ChordDiagram({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: ChordDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

  const width = 450;
  const height = 450;
  const cx = width / 2;
  const cy = height / 2;
  const outerRadius = Math.min(width, height) / 2 - 40;
  const innerRadius = outerRadius - 20;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  // Calculate totals
  const totals = data.labels.map((_, i) =>
    data.matrix[i].reduce((sum, val) => sum + val, 0) +
    data.matrix.reduce((sum, row) => sum + row[i], 0)
  );
  const grandTotal = totals.reduce((sum, t) => sum + t, 0);

  // Calculate arc positions
  const arcData: { startAngle: number; endAngle: number; color: string; label: string }[] = [];
  let currentAngle = 0;
  const gap = 0.02; // Gap between arcs

  data.labels.forEach((label, i) => {
    const angleSize = ((totals[i] / grandTotal) * (2 * Math.PI - gap * data.labels.length));
    arcData.push({
      startAngle: currentAngle,
      endAngle: currentAngle + angleSize,
      color: colors[i % colors.length],
      label,
    });
    currentAngle += angleSize + gap;
  });

  // Create arc path
  const createArcPath = (start: number, end: number, r: number) => {
    const startX = cx + r * Math.cos(start - Math.PI / 2);
    const startY = cy + r * Math.sin(start - Math.PI / 2);
    const endX = cx + r * Math.cos(end - Math.PI / 2);
    const endY = cy + r * Math.sin(end - Math.PI / 2);
    const largeArc = end - start > Math.PI ? 1 : 0;

    return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`;
  };

  // Create chord path
  const createChordPath = (
    sourceStart: number, sourceEnd: number,
    targetStart: number, targetEnd: number,
    r: number
  ) => {
    const ss = cx + r * Math.cos(sourceStart - Math.PI / 2);
    const sy1 = cy + r * Math.sin(sourceStart - Math.PI / 2);
    const se = cx + r * Math.cos(sourceEnd - Math.PI / 2);
    const sy2 = cy + r * Math.sin(sourceEnd - Math.PI / 2);

    const ts = cx + r * Math.cos(targetStart - Math.PI / 2);
    const ty1 = cy + r * Math.sin(targetStart - Math.PI / 2);
    const te = cx + r * Math.cos(targetEnd - Math.PI / 2);
    const ty2 = cy + r * Math.sin(targetEnd - Math.PI / 2);

    return `
      M ${ss} ${sy1}
      Q ${cx} ${cy} ${ts} ${ty1}
      A ${r} ${r} 0 0 1 ${te} ${ty2}
      Q ${cx} ${cy} ${se} ${sy2}
      A ${r} ${r} 0 0 1 ${ss} ${sy1}
      Z
    `;
  };

  // Generate chords
  const chords: { path: string; color: string; opacity: number }[] = [];
  data.matrix.forEach((row, i) => {
    row.forEach((val, j) => {
      if (val > 0 && i !== j) {
        const sourceArc = arcData[i];
        const targetArc = arcData[j];
        const sourceAngleSize = (val / totals[i]) * (sourceArc.endAngle - sourceArc.startAngle);
        const targetAngleSize = (val / totals[j]) * (targetArc.endAngle - targetArc.startAngle);

        chords.push({
          path: createChordPath(
            sourceArc.startAngle,
            sourceArc.startAngle + sourceAngleSize,
            targetArc.startAngle,
            targetArc.startAngle + targetAngleSize,
            innerRadius
          ),
          color: sourceArc.color,
          opacity: 0.4,
        });
      }
    });
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
        {/* Chords */}
        {chords.map((chord, i) => (
          <motion.path
            key={`chord-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: chord.opacity }}
            transition={{ delay: 0.3 + i * 0.02 }}
            d={chord.path}
            fill={chord.color}
          />
        ))}

        {/* Arcs */}
        {arcData.map((arc, i) => (
          <motion.g key={`arc-${i}`}>
            {/* Outer arc */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              d={createArcPath(arc.startAngle, arc.endAngle, outerRadius)}
              fill="none"
              stroke={arc.color}
              strokeWidth="20"
            />

            {/* Label */}
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              x={cx + (outerRadius + 25) * Math.cos((arc.startAngle + arc.endAngle) / 2 - Math.PI / 2)}
              y={cy + (outerRadius + 25) * Math.sin((arc.startAngle + arc.endAngle) / 2 - Math.PI / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={mutedColor}
              fontSize="10"
            >
              {arc.label}
            </motion.text>
          </motion.g>
        ))}
      </svg>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-lg">
        {content}
      </div>
    </div>
  );
}

export default ChordDiagram;
