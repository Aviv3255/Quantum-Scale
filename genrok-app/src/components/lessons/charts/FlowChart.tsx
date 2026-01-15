'use client';

import { motion } from 'framer-motion';

interface FlowNode {
  id: string;
  label: string;
  type?: 'start' | 'end' | 'process' | 'decision' | 'io';
  x: number;
  y: number;
  color?: string;
}

interface FlowConnection {
  from: string;
  to: string;
  label?: string;
}

interface FlowChartProps {
  nodes: FlowNode[];
  connections: FlowConnection[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function FlowChart({
  nodes,
  connections,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: FlowChartProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const width = 600;
  const height = 400;
  const nodeWidth = 120;
  const nodeHeight = 50;

  const getNodeShape = (node: FlowNode, color: string) => {
    const centerX = node.x;
    const centerY = node.y;

    switch (node.type) {
      case 'start':
      case 'end':
        // Rounded rectangle (pill shape)
        return (
          <rect
            x={centerX - nodeWidth / 2}
            y={centerY - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx={nodeHeight / 2}
            fill={node.type === 'start' ? color : '#EF4444'}
          />
        );
      case 'decision':
        // Diamond shape
        const size = 45;
        return (
          <polygon
            points={`${centerX},${centerY - size} ${centerX + size},${centerY} ${centerX},${centerY + size} ${centerX - size},${centerY}`}
            fill={color}
          />
        );
      case 'io':
        // Parallelogram
        const skew = 15;
        return (
          <polygon
            points={`${centerX - nodeWidth / 2 + skew},${centerY - nodeHeight / 2}
                     ${centerX + nodeWidth / 2 + skew},${centerY - nodeHeight / 2}
                     ${centerX + nodeWidth / 2 - skew},${centerY + nodeHeight / 2}
                     ${centerX - nodeWidth / 2 - skew},${centerY + nodeHeight / 2}`}
            fill={color}
          />
        );
      default:
        // Process - Rectangle
        return (
          <rect
            x={centerX - nodeWidth / 2}
            y={centerY - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx={8}
            fill={color}
          />
        );
    }
  };

  const getConnectionPath = (conn: FlowConnection) => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return '';

    const fromY = fromNode.y + (fromNode.type === 'decision' ? 45 : nodeHeight / 2);
    const toY = toNode.y - (toNode.type === 'decision' ? 45 : nodeHeight / 2);

    // Check if it's a horizontal or vertical connection
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection
      const fromX = fromNode.x + (dx > 0 ? nodeWidth / 2 : -nodeWidth / 2);
      const toX = toNode.x + (dx > 0 ? -nodeWidth / 2 : nodeWidth / 2);
      const midX = (fromX + toX) / 2;
      return `M ${fromX} ${fromNode.y} C ${midX} ${fromNode.y}, ${midX} ${toNode.y}, ${toX} ${toNode.y}`;
    } else {
      // Vertical connection
      const midY = (fromY + toY) / 2;
      return `M ${fromNode.x} ${fromY} C ${fromNode.x} ${midY}, ${toNode.x} ${midY}, ${toNode.x} ${toY}`;
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
            id="flowArrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'}
            />
          </marker>
          <filter id="flowShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => (
          <motion.g key={`conn-${i}`}>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              d={getConnectionPath(conn)}
              stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              strokeWidth="2"
              fill="none"
              markerEnd="url(#flowArrowhead)"
            />
            {conn.label && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                x={(nodes.find(n => n.id === conn.from)?.x || 0) +
                   ((nodes.find(n => n.id === conn.to)?.x || 0) - (nodes.find(n => n.id === conn.from)?.x || 0)) / 2}
                y={(nodes.find(n => n.id === conn.from)?.y || 0) +
                   ((nodes.find(n => n.id === conn.to)?.y || 0) - (nodes.find(n => n.id === conn.from)?.y || 0)) / 2 - 8}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="10"
                fontWeight="500"
              >
                {conn.label}
              </motion.text>
            )}
          </motion.g>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const color = node.color || colors[i % colors.length];
          return (
            <motion.g key={node.id} filter="url(#flowShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                {getNodeShape(node, color)}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="600"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  {node.label}
                </text>
              </motion.g>
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

export default FlowChart;
