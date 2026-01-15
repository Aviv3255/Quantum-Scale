'use client';

import { motion } from 'framer-motion';

interface ProcessStep {
  id: string;
  label: string;
  type?: 'start' | 'end' | 'process' | 'decision' | 'subprocess' | 'document' | 'data';
  description?: string;
  duration?: string;
  nextSteps?: string[];
  color?: string;
}

interface ProcessMapProps {
  steps: ProcessStep[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function ProcessMap({
  steps,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: ProcessMapProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const typeColors: Record<string, string> = {
    start: '#22C55E',
    end: '#EF4444',
    process: '#3B82F6',
    decision: '#F59E0B',
    subprocess: '#A855F7',
    document: '#06B6D4',
    data: '#EC4899',
  };

  const width = 650;
  const height = 380;
  const padding = 40;

  // Layout steps in a grid-like manner
  const cols = Math.ceil(Math.sqrt(steps.length * 1.5));
  const rows = Math.ceil(steps.length / cols);
  const cellWidth = (width - 2 * padding) / cols;
  const cellHeight = (height - 2 * padding) / rows;

  const stepPositions = steps.map((step, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    // Snake pattern for better flow
    const actualCol = row % 2 === 0 ? col : cols - 1 - col;
    return {
      step,
      x: padding + actualCol * cellWidth + cellWidth / 2,
      y: padding + row * cellHeight + cellHeight / 2,
    };
  });

  const getShapePath = (type: string, x: number, y: number, w: number, h: number) => {
    switch (type) {
      case 'start':
      case 'end':
        // Rounded rectangle (terminal)
        return `M ${x - w / 2} ${y - h / 2 + h / 3}
                Q ${x - w / 2} ${y - h / 2}, ${x - w / 2 + w / 6} ${y - h / 2}
                L ${x + w / 2 - w / 6} ${y - h / 2}
                Q ${x + w / 2} ${y - h / 2}, ${x + w / 2} ${y - h / 2 + h / 3}
                L ${x + w / 2} ${y + h / 2 - h / 3}
                Q ${x + w / 2} ${y + h / 2}, ${x + w / 2 - w / 6} ${y + h / 2}
                L ${x - w / 2 + w / 6} ${y + h / 2}
                Q ${x - w / 2} ${y + h / 2}, ${x - w / 2} ${y + h / 2 - h / 3}
                Z`;
      case 'decision':
        // Diamond
        return `M ${x} ${y - h / 2}
                L ${x + w / 2} ${y}
                L ${x} ${y + h / 2}
                L ${x - w / 2} ${y}
                Z`;
      case 'subprocess':
        // Rectangle with double borders
        return `M ${x - w / 2} ${y - h / 2}
                L ${x + w / 2} ${y - h / 2}
                L ${x + w / 2} ${y + h / 2}
                L ${x - w / 2} ${y + h / 2}
                Z`;
      case 'document':
        // Document shape
        return `M ${x - w / 2} ${y - h / 2}
                L ${x + w / 2} ${y - h / 2}
                L ${x + w / 2} ${y + h / 2 - 8}
                Q ${x} ${y + h / 2 + 5}, ${x - w / 2} ${y + h / 2 - 8}
                Z`;
      case 'data':
        // Parallelogram
        const skew = 12;
        return `M ${x - w / 2 + skew} ${y - h / 2}
                L ${x + w / 2 + skew} ${y - h / 2}
                L ${x + w / 2 - skew} ${y + h / 2}
                L ${x - w / 2 - skew} ${y + h / 2}
                Z`;
      default:
        // Process - Rectangle
        return `M ${x - w / 2} ${y - h / 2}
                L ${x + w / 2} ${y - h / 2}
                L ${x + w / 2} ${y + h / 2}
                L ${x - w / 2} ${y + h / 2}
                Z`;
    }
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
        <defs>
          <marker
            id="processArrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
            />
          </marker>
          <filter id="processGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Connections */}
        {stepPositions.map((pos, i) => {
          const nextSteps = pos.step.nextSteps || (i < steps.length - 1 ? [steps[i + 1].id] : []);

          return nextSteps.map((nextId, j) => {
            const nextPos = stepPositions.find(p => p.step.id === nextId);
            if (!nextPos) return null;

            const dx = nextPos.x - pos.x;
            const dy = nextPos.y - pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Calculate start and end points
            const startOffset = 35;
            const endOffset = 35;
            const angle = Math.atan2(dy, dx);

            const startX = pos.x + Math.cos(angle) * startOffset;
            const startY = pos.y + Math.sin(angle) * startOffset;
            const endX = nextPos.x - Math.cos(angle) * endOffset;
            const endY = nextPos.y - Math.sin(angle) * endOffset;

            // Use bezier curve for smoother connections
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            const ctrlOffset = Math.abs(dy) > Math.abs(dx) ? 30 : 0;

            return (
              <motion.path
                key={`conn-${pos.step.id}-${nextId}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                d={`M ${startX} ${startY} Q ${midX + ctrlOffset} ${midY} ${endX} ${endY}`}
                stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#processArrow)"
              />
            );
          });
        })}

        {/* Steps */}
        {stepPositions.map((pos, i) => {
          const { step, x, y } = pos;
          const type = step.type || 'process';
          const color = step.color || typeColors[type] || typeColors.process;
          const shapeW = type === 'decision' ? 70 : 90;
          const shapeH = type === 'decision' ? 50 : 45;

          return (
            <motion.g key={step.id} filter="url(#processGlow)">
              <motion.path
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                d={getShapePath(type, x, y, shapeW, shapeH)}
                fill={color}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              {/* Subprocess inner border */}
              {type === 'subprocess' && (
                <motion.rect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  x={x - shapeW / 2 + 5}
                  y={y - shapeH / 2 + 5}
                  width={shapeW - 10}
                  height={shapeH - 10}
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
              )}

              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="#fff"
                fontSize="9"
                fontWeight="600"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {step.label.length > 12 ? step.label.slice(0, 12) + '...' : step.label}
              </motion.text>

              {/* Duration badge */}
              {step.duration && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                >
                  <rect
                    x={x + shapeW / 2 - 25}
                    y={y - shapeH / 2 - 8}
                    width={30}
                    height={14}
                    rx="7"
                    fill={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
                  />
                  <text
                    x={x + shapeW / 2 - 10}
                    y={y - shapeH / 2 + 2}
                    textAnchor="middle"
                    fill={mutedColor}
                    fontSize="8"
                  >
                    {step.duration}
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap justify-center gap-4 mt-4"
      >
        {Object.entries(typeColors).slice(0, 5).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className={`w-3 h-3 ${type === 'decision' ? 'rotate-45' : 'rounded-sm'}`}
              style={{ backgroundColor: color }}
            />
            <span className="text-xs capitalize" style={{ color: mutedColor }}>
              {type}
            </span>
          </div>
        ))}
      </motion.div>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-6 w-full max-w-3xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {content}
      </div>
    </div>
  );
}

export default ProcessMap;
