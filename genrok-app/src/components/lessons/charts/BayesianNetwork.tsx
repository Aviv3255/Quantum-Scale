'use client';

import { motion } from 'framer-motion';

interface BayesNode {
  id: string;
  name: string;
  probability?: number;
  states?: { name: string; probability: number }[];
  x: number;
  y: number;
  color?: string;
}

interface BayesEdge {
  from: string;
  to: string;
  strength?: number; // 0-1 representing conditional dependency strength
}

interface BayesianNetworkProps {
  nodes: BayesNode[];
  edges: BayesEdge[];
  title?: string;
  showProbabilities?: boolean;
  variant?: 'dark' | 'light';
}

export function BayesianNetwork({
  nodes,
  edges,
  title,
  showProbabilities = true,
  variant = 'dark',
}: BayesianNetworkProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const width = 650;
  const height = 450;
  const nodeWidth = 110;
  const nodeHeight = 60;

  const getEdgePath = (edge: BayesEdge) => {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) return '';

    const fromCenterX = fromNode.x + nodeWidth / 2;
    const fromCenterY = fromNode.y + nodeHeight / 2;
    const toCenterX = toNode.x + nodeWidth / 2;
    const toCenterY = toNode.y + nodeHeight / 2;

    const dx = toCenterX - fromCenterX;
    const dy = toCenterY - fromCenterY;
    const angle = Math.atan2(dy, dx);

    // Calculate start and end points on node edges
    let startX, startY, endX, endY;

    if (Math.abs(dx) > Math.abs(dy)) {
      startX = fromNode.x + (dx > 0 ? nodeWidth : 0);
      startY = fromCenterY;
      endX = toNode.x + (dx > 0 ? 0 : nodeWidth);
      endY = toCenterY;
    } else {
      startX = fromCenterX;
      startY = fromNode.y + (dy > 0 ? nodeHeight : 0);
      endX = toCenterX;
      endY = toNode.y + (dy > 0 ? 0 : nodeHeight);
    }

    // Create curved path
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    return `M ${startX} ${startY} Q ${midX} ${startY}, ${midX} ${midY} Q ${midX} ${endY}, ${endX} ${endY}`;
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
            id="bayesArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={isDark ? '#fff' : '#000'} />
          </marker>
          <filter id="bayesShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
          </filter>
          <filter id="bayesTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
          </filter>
          <linearGradient id="probGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#88da1c" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const path = getEdgePath(edge);
          const opacity = edge.strength !== undefined ? 0.3 + edge.strength * 0.7 : 1;

          return (
            <motion.path
              key={`edge-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              d={path}
              stroke={isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`}
              strokeWidth={1.5 + (edge.strength || 0.5) * 1.5}
              fill="none"
              markerEnd="url(#bayesArrow)"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const color = node.color || colors[i % colors.length];
          const hasStates = node.states && node.states.length > 0;
          const actualHeight = hasStates ? nodeHeight + node.states!.length * 18 : nodeHeight;

          return (
            <motion.g key={node.id} filter="url(#bayesShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${node.x + nodeWidth / 2}px ${node.y + actualHeight / 2}px` }}
              >
                {/* Node background */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={actualHeight}
                  rx={10}
                  fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}
                  stroke={strokeColor}
                  strokeWidth="1"
                />

                {/* Header */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={35}
                  rx={10}
                  fill={color}
                />
                <rect
                  x={node.x}
                  y={node.y + 25}
                  width={nodeWidth}
                  height={10}
                  fill={color}
                />

                {/* Node name */}
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + 22}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="11"
                  fontWeight="600"
                  filter="url(#bayesTextShadow)"
                >
                  {node.name}
                </text>

                {/* Probability or states */}
                {showProbabilities && (
                  <>
                    {node.probability !== undefined && !hasStates && (
                      <text
                        x={node.x + nodeWidth / 2}
                        y={node.y + 50}
                        textAnchor="middle"
                        fill={isDark ? '#fff' : '#000'}
                        fontSize="14"
                        fontWeight="700"
                      >
                        P = {(node.probability * 100).toFixed(0)}%
                      </text>
                    )}

                    {hasStates && node.states!.map((state, j) => (
                      <g key={`${node.id}-state-${j}`}>
                        <text
                          x={node.x + 8}
                          y={node.y + 50 + j * 18}
                          fill={isDark ? '#fff' : '#000'}
                          fontSize="10"
                          fontWeight="500"
                        >
                          {state.name}
                        </text>
                        <rect
                          x={node.x + nodeWidth - 45}
                          y={node.y + 40 + j * 18}
                          width={35}
                          height={12}
                          rx={3}
                          fill={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
                        />
                        <rect
                          x={node.x + nodeWidth - 45}
                          y={node.y + 40 + j * 18}
                          width={35 * state.probability}
                          height={12}
                          rx={3}
                          fill={color}
                          opacity={0.7}
                        />
                        <text
                          x={node.x + nodeWidth - 28}
                          y={node.y + 50 + j * 18}
                          textAnchor="middle"
                          fill={isDark ? '#fff' : '#000'}
                          fontSize="8"
                          fontWeight="600"
                        >
                          {(state.probability * 100).toFixed(0)}%
                        </text>
                      </g>
                    ))}
                  </>
                )}
              </motion.g>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <svg width="30" height="10">
            <line x1="0" y1="5" x2="20" y2="5" stroke={mutedColor} strokeWidth="2" />
            <polygon points="20,2 28,5 20,8" fill={mutedColor} />
          </svg>
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Conditional Dependency
          </span>
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

export default BayesianNetwork;
