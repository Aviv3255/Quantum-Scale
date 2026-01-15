'use client';

import { motion } from 'framer-motion';

interface NetworkNode {
  id: string;
  label: string;
  size?: number;
  color?: string;
}

interface NetworkEdge {
  source: string;
  target: string;
  weight?: number;
}

interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function NetworkGraph({
  nodes,
  edges,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: NetworkGraphProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

  const width = 500;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 60;

  // Position nodes in a circle
  const nodePositions = new Map<string, { x: number; y: number }>();
  nodes.forEach((node, i) => {
    const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
    nodePositions.set(node.id, {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  });

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
        {/* Edges */}
        {edges.map((edge, i) => {
          const source = nodePositions.get(edge.source);
          const target = nodePositions.get(edge.target);
          if (!source || !target) return null;

          return (
            <motion.line
              key={`edge-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ delay: 0.1 + i * 0.02, duration: 0.3 }}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={accentColor}
              strokeWidth={edge.weight || 2}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;

          return (
            <motion.g key={node.id}>
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
                cx={pos.x}
                cy={pos.y}
                r={node.size || 20}
                fill={node.color || accentColor}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                x={pos.x}
                y={pos.y + (node.size || 20) + 15}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="11"
              >
                {node.label}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {content}
      </div>
    </div>
  );
}

export default NetworkGraph;
