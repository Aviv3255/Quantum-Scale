'use client';

import { motion } from 'framer-motion';

interface MindMapNode {
  label: string;
  children?: MindMapNode[];
  color?: string;
}

interface MindMapProps {
  data: MindMapNode;
  title?: string;
  accentColor?: string;
}

export function MindMap({
  data,
  title,
  accentColor = '#88da1c',
}: MindMapProps) {
  const width = 550;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  interface NodePosition {
    x: number;
    y: number;
    label: string;
    level: number;
    color: string;
    parent?: NodePosition;
  }

  const positions: NodePosition[] = [];

  const calculatePositions = (
    node: MindMapNode,
    level: number,
    angle: number,
    angleSpread: number,
    parent?: NodePosition,
    colorIndex = 0
  ) => {
    const radius = level === 0 ? 0 : 60 + level * 70;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const color = node.color || colors[colorIndex % colors.length];

    const pos: NodePosition = { x, y, label: node.label, level, color, parent };
    positions.push(pos);

    if (node.children && node.children.length > 0) {
      const childAngleSpread = angleSpread / node.children.length;
      const startAngle = angle - angleSpread / 2 + childAngleSpread / 2;

      node.children.forEach((child, i) => {
        calculatePositions(
          child,
          level + 1,
          startAngle + i * childAngleSpread,
          childAngleSpread * 0.8,
          pos,
          i
        );
      });
    }
  };

  calculatePositions(data, 0, 0, 2 * Math.PI);

  // Create curved path
  const createCurvedPath = (from: NodePosition, to: NodePosition) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const perpX = -dy * 0.15;
    const perpY = dx * 0.15;

    return `M ${from.x} ${from.y} Q ${midX + perpX} ${midY + perpY} ${to.x} ${to.y}`;
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
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
          {/* Connections */}
          {positions.map((pos, i) =>
            pos.parent ? (
              <motion.path
                key={`path-${i}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: pos.level * 0.15, duration: 0.5 }}
                d={createCurvedPath(pos.parent, pos)}
                fill="none"
                stroke={pos.color}
                strokeWidth="2"
                strokeOpacity="0.6"
              />
            ) : null
          )}

          {/* Nodes */}
          {positions.map((pos, i) => {
            const isCenter = pos.level === 0;
            const nodeWidth = isCenter ? 100 : 70;
            const nodeHeight = isCenter ? 40 : 28;

            return (
              <motion.g key={`node-${i}`}>
                <motion.rect
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: pos.level * 0.1 + 0.1, type: 'spring' }}
                  x={pos.x - nodeWidth / 2}
                  y={pos.y - nodeHeight / 2}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={nodeHeight / 2}
                  fill={pos.color}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: pos.level * 0.1 + 0.2 }}
                  x={pos.x}
                  y={pos.y + (isCenter ? 5 : 4)}
                  textAnchor="middle"
                  fill={isCenter ? 'black' : 'white'}
                  fontSize={isCenter ? 13 : 10}
                  fontWeight="bold"
                >
                  {pos.label}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default MindMap;
