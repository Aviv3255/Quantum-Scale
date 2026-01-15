'use client';

import { motion } from 'framer-motion';

interface DecisionNode {
  id: string;
  label: string;
  type: 'decision' | 'outcome';
  yes?: string;
  no?: string;
  color?: string;
}

interface DecisionTreeProps {
  nodes: DecisionNode[];
  rootId: string;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function DecisionTree({
  nodes,
  rootId,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: DecisionTreeProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const decisionColor = '#3B82F6';
  const yesColor = '#22C55E';
  const noColor = '#EF4444';
  const outcomeColor = '#A855F7';

  const width = 600;
  const height = 400;
  const nodeWidth = 100;
  const nodeHeight = 40;

  // Calculate node positions using a tree layout
  interface PositionedNode {
    node: DecisionNode;
    x: number;
    y: number;
    level: number;
  }

  const positionedNodes: PositionedNode[] = [];
  const connections: { from: PositionedNode; to: PositionedNode; type: 'yes' | 'no' }[] = [];

  const positionNode = (
    nodeId: string,
    x: number,
    y: number,
    level: number,
    spread: number
  ): void => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const posNode: PositionedNode = { node, x, y, level };
    positionedNodes.push(posNode);

    const nextY = y + 90;
    const nextSpread = spread * 0.55;

    if (node.yes) {
      const yesNode = nodes.find(n => n.id === node.yes);
      if (yesNode) {
        const yesX = x - spread;
        positionNode(node.yes, yesX, nextY, level + 1, nextSpread);
        const targetNode = positionedNodes.find(p => p.node.id === node.yes);
        if (targetNode) {
          connections.push({ from: posNode, to: targetNode, type: 'yes' });
        }
      }
    }

    if (node.no) {
      const noNode = nodes.find(n => n.id === node.no);
      if (noNode) {
        const noX = x + spread;
        positionNode(node.no, noX, nextY, level + 1, nextSpread);
        const targetNode = positionedNodes.find(p => p.node.id === node.no);
        if (targetNode) {
          connections.push({ from: posNode, to: targetNode, type: 'no' });
        }
      }
    }
  };

  // Start positioning from root
  positionNode(rootId, width / 2, 50, 0, 140);

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
        <defs>
          <marker
            id="decisionArrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
            />
          </marker>
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const fromY = conn.from.y + (conn.from.node.type === 'decision' ? 28 : nodeHeight / 2);
          const toY = conn.to.y - (conn.to.node.type === 'decision' ? 28 : nodeHeight / 2);
          const midY = (fromY + toY) / 2;

          const pathD = `M ${conn.from.x} ${fromY}
                        C ${conn.from.x} ${midY}, ${conn.to.x} ${midY}, ${conn.to.x} ${toY}`;

          return (
            <motion.g key={`conn-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                d={pathD}
                stroke={conn.type === 'yes' ? yesColor : noColor}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#decisionArrow)"
              />
              {/* Yes/No label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                x={(conn.from.x + conn.to.x) / 2 + (conn.type === 'yes' ? -15 : 15)}
                y={midY}
                textAnchor="middle"
                fill={conn.type === 'yes' ? yesColor : noColor}
                fontSize="10"
                fontWeight="600"
              >
                {conn.type === 'yes' ? 'Yes' : 'No'}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Nodes */}
        {positionedNodes.map((posNode, i) => {
          const { node, x, y } = posNode;
          const isDecision = node.type === 'decision';
          const color = node.color || (isDecision ? decisionColor : outcomeColor);

          return (
            <motion.g key={node.id} filter="url(#nodeShadow)">
              {isDecision ? (
                // Diamond shape for decision
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  <polygon
                    points={`${x},${y - 28} ${x + 55},${y} ${x},${y + 28} ${x - 55},${y}`}
                    fill={color}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    {node.label}
                  </text>
                </motion.g>
              ) : (
                // Rounded rectangle for outcome
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  <rect
                    x={x - nodeWidth / 2}
                    y={y - nodeHeight / 2}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx={nodeHeight / 2}
                    fill={color}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    {node.label}
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
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rotate-45" style={{ backgroundColor: decisionColor }} />
          <span className="text-xs" style={{ color: mutedColor }}>Decision</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: outcomeColor }} />
          <span className="text-xs" style={{ color: mutedColor }}>Outcome</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5" style={{ backgroundColor: yesColor }} />
          <span className="text-xs" style={{ color: yesColor }}>Yes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5" style={{ backgroundColor: noColor }} />
          <span className="text-xs" style={{ color: noColor }}>No</span>
        </div>
      </motion.div>
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

export default DecisionTree;
