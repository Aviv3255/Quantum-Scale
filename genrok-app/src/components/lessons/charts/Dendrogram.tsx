'use client';

import { motion } from 'framer-motion';

interface DendrogramNode {
  name: string;
  children?: DendrogramNode[];
}

interface DendrogramProps {
  data: DendrogramNode;
  title?: string;
  orientation?: 'horizontal' | 'vertical';
  accentColor?: string;
}

export function Dendrogram({
  data,
  title,
  orientation = 'horizontal',
  accentColor = '#88da1c',
}: DendrogramProps) {
  const width = 500;
  const height = 350;
  const padding = 60;

  // Count leaf nodes
  const countLeaves = (node: DendrogramNode): number => {
    if (!node.children || node.children.length === 0) return 1;
    return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
  };

  // Calculate depth
  const getDepth = (node: DendrogramNode): number => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + Math.max(...node.children.map(getDepth));
  };

  const totalLeaves = countLeaves(data);
  const depth = getDepth(data);

  interface NodePosition {
    x: number;
    y: number;
    name: string;
    level: number;
    parent?: NodePosition;
    isLeaf: boolean;
  }

  const positions: NodePosition[] = [];

  // Calculate positions
  const calculatePositions = (
    node: DendrogramNode,
    level: number,
    startLeaf: number,
    endLeaf: number,
    parent?: NodePosition
  ): NodePosition => {
    const isLeaf = !node.children || node.children.length === 0;
    const leafPos = (startLeaf + endLeaf) / 2;

    let x: number, y: number;
    if (orientation === 'horizontal') {
      x = padding + (level / depth) * (width - 2 * padding);
      y = padding + (leafPos / totalLeaves) * (height - 2 * padding);
    } else {
      x = padding + (leafPos / totalLeaves) * (width - 2 * padding);
      y = padding + (level / depth) * (height - 2 * padding);
    }

    const pos: NodePosition = { x, y, name: node.name, level, parent, isLeaf };
    positions.push(pos);

    if (node.children && node.children.length > 0) {
      let currentLeaf = startLeaf;
      node.children.forEach(child => {
        const childLeaves = countLeaves(child);
        calculatePositions(child, level + 1, currentLeaf, currentLeaf + childLeaves, pos);
        currentLeaf += childLeaves;
      });
    }

    return pos;
  };

  calculatePositions(data, 0, 0, totalLeaves);

  // Create elbow connector
  const createConnector = (from: NodePosition, to: NodePosition) => {
    if (orientation === 'horizontal') {
      const midX = (from.x + to.x) / 2;
      return `M ${from.x} ${from.y} H ${midX} V ${to.y} H ${to.x}`;
    } else {
      const midY = (from.y + to.y) / 2;
      return `M ${from.x} ${from.y} V ${midY} H ${to.x} V ${to.y}`;
    }
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
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
          {/* Connections */}
          {positions.map((pos, i) =>
            pos.parent ? (
              <motion.path
                key={`path-${i}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.1 + pos.level * 0.1, duration: 0.5 }}
                d={createConnector(pos.parent, pos)}
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
                strokeOpacity="0.6"
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
                r={pos.isLeaf ? 8 : 6}
                fill={pos.isLeaf ? accentColor : `${accentColor}60`}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + pos.level * 0.1 }}
                x={pos.isLeaf ? (orientation === 'horizontal' ? pos.x + 15 : pos.x) : pos.x}
                y={pos.isLeaf ? (orientation === 'horizontal' ? pos.y + 4 : pos.y + 20) : pos.y - 12}
                textAnchor={pos.isLeaf && orientation === 'horizontal' ? 'start' : 'middle'}
                fill="rgba(255,255,255,0.8)"
                fontSize="10"
              >
                {pos.name}
              </motion.text>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default Dendrogram;
