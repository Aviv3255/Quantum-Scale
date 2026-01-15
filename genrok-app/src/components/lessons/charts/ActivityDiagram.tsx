'use client';

import { motion } from 'framer-motion';

interface ActivityNode {
  id: string;
  label: string;
  type: 'start' | 'end' | 'action' | 'decision' | 'merge' | 'fork' | 'join';
  x: number;
  y: number;
  color?: string;
}

interface ActivityFlow {
  from: string;
  to: string;
  label?: string;
  condition?: string;
}

interface ActivityDiagramProps {
  nodes: ActivityNode[];
  flows: ActivityFlow[];
  title?: string;
  variant?: 'dark' | 'light';
}

export function ActivityDiagram({
  nodes,
  flows,
  title,
  variant = 'dark',
}: ActivityDiagramProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const width = 600;
  const height = 450;

  const getNodeShape = (node: ActivityNode, color: string) => {
    const { x, y, type } = node;

    switch (type) {
      case 'start':
        return (
          <circle cx={x} cy={y} r={15} fill={color} />
        );
      case 'end':
        return (
          <g>
            <circle cx={x} cy={y} r={15} fill="none" stroke={color} strokeWidth="3" />
            <circle cx={x} cy={y} r={10} fill={color} />
          </g>
        );
      case 'decision':
      case 'merge':
        return (
          <polygon
            points={`${x},${y - 25} ${x + 25},${y} ${x},${y + 25} ${x - 25},${y}`}
            fill={type === 'decision' ? color : 'transparent'}
            stroke={color}
            strokeWidth="2"
          />
        );
      case 'fork':
      case 'join':
        return (
          <rect
            x={x - 60}
            y={y - 4}
            width={120}
            height={8}
            rx={2}
            fill={isDark ? '#fff' : '#000'}
          />
        );
      default: // action
        return (
          <rect
            x={x - 60}
            y={y - 20}
            width={120}
            height={40}
            rx={20}
            fill={color}
          />
        );
    }
  };

  const getConnectionPath = (flow: ActivityFlow) => {
    const fromNode = nodes.find(n => n.id === flow.from);
    const toNode = nodes.find(n => n.id === flow.to);
    if (!fromNode || !toNode) return '';

    const getNodeRadius = (type: string) => {
      switch (type) {
        case 'start':
        case 'end': return 15;
        case 'decision':
        case 'merge': return 25;
        case 'fork':
        case 'join': return 4;
        default: return 20;
      }
    };

    const fromRadius = getNodeRadius(fromNode.type);
    const toRadius = getNodeRadius(toNode.type);

    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const angle = Math.atan2(dy, dx);

    const startX = fromNode.x + Math.cos(angle) * (fromNode.type === 'action' ? 60 : fromRadius);
    const startY = fromNode.y + Math.sin(angle) * fromRadius;
    const endX = toNode.x - Math.cos(angle) * (toNode.type === 'action' ? 60 : toRadius);
    const endY = toNode.y - Math.sin(angle) * toRadius;

    if (Math.abs(dx) < 10) {
      // Vertical line
      return `M ${fromNode.x} ${fromNode.y + fromRadius} L ${toNode.x} ${toNode.y - toRadius}`;
    } else if (Math.abs(dy) < 10) {
      // Horizontal line
      const fromX = fromNode.x + (dx > 0 ? (fromNode.type === 'action' ? 60 : fromRadius) : -(fromNode.type === 'action' ? 60 : fromRadius));
      const toX = toNode.x + (dx > 0 ? -(toNode.type === 'action' ? 60 : toRadius) : (toNode.type === 'action' ? 60 : toRadius));
      return `M ${fromX} ${fromNode.y} L ${toX} ${toNode.y}`;
    } else {
      // Curved path
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      return `M ${startX} ${startY} Q ${midX} ${startY}, ${midX} ${midY} Q ${midX} ${endY}, ${endX} ${endY}`;
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
            id="activityArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={strokeColor}
            />
          </marker>
          <filter id="activityShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2" />
          </filter>
          <filter id="activityTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Flows/Connections */}
        {flows.map((flow, i) => (
          <motion.g key={`flow-${i}`}>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              d={getConnectionPath(flow)}
              stroke={strokeColor}
              strokeWidth="2"
              fill="none"
              markerEnd="url(#activityArrow)"
            />
            {flow.condition && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                x={(nodes.find(n => n.id === flow.from)?.x || 0) +
                   ((nodes.find(n => n.id === flow.to)?.x || 0) - (nodes.find(n => n.id === flow.from)?.x || 0)) / 2}
                y={(nodes.find(n => n.id === flow.from)?.y || 0) +
                   ((nodes.find(n => n.id === flow.to)?.y || 0) - (nodes.find(n => n.id === flow.from)?.y || 0)) / 2 - 8}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="10"
                fontWeight="500"
              >
                [{flow.condition}]
              </motion.text>
            )}
          </motion.g>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const color = node.color || colors[i % colors.length];
          const showLabel = !['start', 'end', 'fork', 'join', 'merge'].includes(node.type);

          return (
            <motion.g key={node.id} filter="url(#activityShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                {getNodeShape(node, color)}
                {showLabel && (
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="11"
                    fontWeight="600"
                    filter="url(#activityTextShadow)"
                  >
                    {node.label}
                  </text>
                )}
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

export default ActivityDiagram;
