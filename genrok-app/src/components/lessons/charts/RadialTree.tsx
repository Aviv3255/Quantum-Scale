'use client';

import { motion } from 'framer-motion';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface RadialTreeProps {
  data: TreeNode;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function RadialTree({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: RadialTreeProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const labelFill = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
  const width = 450;
  const height = 450;
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 40;

  // Calculate tree depth
  const getDepth = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + Math.max(...node.children.map(getDepth));
  };

  const depth = getDepth(data);
  const levelRadius = maxRadius / depth;

  interface NodePosition {
    x: number;
    y: number;
    name: string;
    level: number;
    parent?: NodePosition;
  }

  const positions: NodePosition[] = [];

  // Calculate positions
  const calculatePositions = (
    node: TreeNode,
    level: number,
    startAngle: number,
    angleRange: number,
    parent?: NodePosition
  ) => {
    const angle = startAngle + angleRange / 2;
    const radius = level * levelRadius;
    const x = cx + radius * Math.cos(angle - Math.PI / 2);
    const y = cy + radius * Math.sin(angle - Math.PI / 2);

    const pos: NodePosition = { x, y, name: node.name, level, parent };
    positions.push(pos);

    if (node.children && node.children.length > 0) {
      const childAngleRange = angleRange / node.children.length;
      node.children.forEach((child, i) => {
        calculatePositions(
          child,
          level + 1,
          startAngle + i * childAngleRange,
          childAngleRange,
          pos
        );
      });
    }
  };

  calculatePositions(data, 0, 0, 2 * Math.PI);

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
        {/* Concentric circles for reference */}
        {Array.from({ length: depth }, (_, i) => (
          <motion.circle
            key={`circle-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * i }}
            cx={cx}
            cy={cy}
            r={(i + 1) * levelRadius}
            fill="none"
            stroke={gridColor}
            strokeWidth="1"
          />
        ))}

        {/* Connections */}
        {positions.map((pos, i) =>
          pos.parent ? (
            <motion.line
              key={`line-${i}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.1 + pos.level * 0.1 }}
              x1={pos.parent.x}
              y1={pos.parent.y}
              x2={pos.x}
              y2={pos.y}
              stroke={accentColor}
              strokeWidth="2"
              strokeOpacity="0.5"
            />
          ) : null
        )}

        {/* Nodes */}
        {positions.map((pos, i) => (
          <motion.g key={`node-${i}`}>
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + pos.level * 0.1, type: 'spring' }}
              cx={pos.x}
              cy={pos.y}
              r={pos.level === 0 ? 20 : 12}
              fill={pos.level === 0 ? accentColor : `${accentColor}80`}
            />
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + pos.level * 0.1 }}
              x={pos.x}
              y={pos.level === 0 ? pos.y + 35 : pos.y + 25}
              textAnchor="middle"
              fill={labelFill}
              fontSize={pos.level === 0 ? 12 : 9}
            >
              {pos.name}
            </motion.text>
          </motion.g>
        ))}
      </svg>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-lg">{content}</div>
      ) : (
        <div className="w-full max-w-lg">{content}</div>
      )}
    </div>
  );
}

export default RadialTree;
