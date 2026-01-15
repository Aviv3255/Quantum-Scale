'use client';

import { motion } from 'framer-motion';

interface FlowStep {
  id: string;
  label: string;
  type?: 'start' | 'end' | 'action' | 'decision' | 'page';
  dropoff?: number;
  conversion?: number;
}

interface FlowPath {
  from: string;
  to: string;
  label?: string;
  isAlternate?: boolean;
}

interface UserFlowDiagramProps {
  title?: string;
  steps: FlowStep[];
  paths: FlowPath[];
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function UserFlowDiagram({
  title,
  steps,
  paths,
  accentColor = '#88da1c',
  variant = 'dark',
}: UserFlowDiagramProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const altStrokeColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

  const width = 700;
  const height = 400;
  const nodeWidth = 100;
  const nodeHeight = 40;

  const typeColors: Record<string, string> = {
    start: accentColor,
    end: '#22C55E',
    action: '#3B82F6',
    decision: '#F59E0B',
    page: '#A855F7',
  };

  // Calculate positions based on steps
  const getStepPosition = (step: FlowStep, index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    return {
      x: 80 + col * 160,
      y: 60 + row * 100,
    };
  };

  const positions = new Map(
    steps.map((step, i) => [step.id, getStepPosition(step, i)])
  );

  const getNodeShape = (step: FlowStep, pos: { x: number; y: number }) => {
    const color = typeColors[step.type || 'action'];

    switch (step.type) {
      case 'start':
      case 'end':
        return (
          <ellipse
            cx={pos.x}
            cy={pos.y}
            rx={nodeWidth / 2}
            ry={nodeHeight / 2}
            fill={color}
          />
        );
      case 'decision':
        const size = 35;
        return (
          <polygon
            points={`${pos.x},${pos.y - size} ${pos.x + size},${pos.y} ${pos.x},${pos.y + size} ${pos.x - size},${pos.y}`}
            fill={color}
          />
        );
      case 'page':
        return (
          <>
            <rect
              x={pos.x - nodeWidth / 2}
              y={pos.y - nodeHeight / 2}
              width={nodeWidth}
              height={nodeHeight}
              rx={4}
              fill={color}
            />
            <rect
              x={pos.x - nodeWidth / 2}
              y={pos.y - nodeHeight / 2}
              width={nodeWidth}
              height={8}
              rx={4}
              fill="rgba(255,255,255,0.3)"
            />
          </>
        );
      default:
        return (
          <rect
            x={pos.x - nodeWidth / 2}
            y={pos.y - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx={8}
            fill={color}
          />
        );
    }
  };

  const getPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      const startX = from.x + (dx > 0 ? nodeWidth / 2 : -nodeWidth / 2);
      const endX = to.x + (dx > 0 ? -nodeWidth / 2 : nodeWidth / 2);
      const midX = (startX + endX) / 2;
      return `M ${startX} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${endX} ${to.y}`;
    } else {
      const startY = from.y + (dy > 0 ? nodeHeight / 2 : -nodeHeight / 2);
      const endY = to.y + (dy > 0 ? -nodeHeight / 2 : nodeHeight / 2);
      const midY = (startY + endY) / 2;
      return `M ${from.x} ${startY} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${endY}`;
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

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center gap-4 mb-4 flex-wrap"
      >
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded"
              style={{
                backgroundColor: color,
                borderRadius: type === 'start' || type === 'end' ? '50%' : '4px',
              }}
            />
            <span className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
        ))}
      </motion.div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <marker
            id="userFlowArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}
            />
          </marker>
          <marker
            id="userFlowArrowAlt"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
            />
          </marker>
        </defs>

        {/* Paths */}
        {paths.map((path, i) => {
          const fromPos = positions.get(path.from);
          const toPos = positions.get(path.to);
          if (!fromPos || !toPos) return null;

          return (
            <motion.g key={`path-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                d={getPath(fromPos, toPos)}
                stroke={path.isAlternate ? altStrokeColor : strokeColor}
                strokeWidth={path.isAlternate ? 1 : 2}
                strokeDasharray={path.isAlternate ? '4,4' : 'none'}
                fill="none"
                markerEnd={
                  path.isAlternate ? 'url(#userFlowArrowAlt)' : 'url(#userFlowArrow)'
                }
              />
              {path.label && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  x={(fromPos.x + toPos.x) / 2}
                  y={(fromPos.y + toPos.y) / 2 - 8}
                  textAnchor="middle"
                  fill={mutedColor}
                  fontSize="9"
                  fontWeight="500"
                >
                  {path.label}
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* Steps/Nodes */}
        {steps.map((step, i) => {
          const pos = positions.get(step.id);
          if (!pos) return null;

          return (
            <motion.g key={step.id}>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              >
                {getNodeShape(step, pos)}
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  fontWeight="600"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {step.label}
                </text>
              </motion.g>

              {/* Metrics */}
              {(step.dropoff !== undefined || step.conversion !== undefined) && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                >
                  {step.conversion !== undefined && (
                    <text
                      x={pos.x}
                      y={pos.y + nodeHeight / 2 + 14}
                      textAnchor="middle"
                      fill="#22C55E"
                      fontSize="9"
                      fontWeight="600"
                    >
                      {step.conversion}% conv
                    </text>
                  )}
                  {step.dropoff !== undefined && (
                    <text
                      x={pos.x}
                      y={pos.y + nodeHeight / 2 + (step.conversion !== undefined ? 24 : 14)}
                      textAnchor="middle"
                      fill="#EF4444"
                      fontSize="9"
                      fontWeight="600"
                    >
                      -{step.dropoff}% drop
                    </text>
                  )}
                </motion.g>
              )}
            </motion.g>
          );
        })}
      </svg>
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

export default UserFlowDiagram;
