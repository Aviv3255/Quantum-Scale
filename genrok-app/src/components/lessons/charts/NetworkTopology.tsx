'use client';

import { motion } from 'framer-motion';

interface NetworkNode {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'server' | 'computer' | 'hub' | 'firewall' | 'cloud' | 'printer';
  x: number;
  y: number;
  color?: string;
}

interface NetworkLink {
  from: string;
  to: string;
  bandwidth?: string;
  type?: 'wired' | 'wireless';
}

interface NetworkTopologyProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  topology?: 'star' | 'ring' | 'mesh' | 'bus' | 'tree' | 'custom';
  title?: string;
  variant?: 'dark' | 'light';
}

export function NetworkTopology({
  nodes,
  links,
  topology = 'custom',
  title,
  variant = 'dark',
}: NetworkTopologyProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const width = 650;
  const height = 450;
  const nodeSize = 40;

  const getNodeIcon = (type: string, color: string) => {
    const iconColor = '#fff';
    switch (type) {
      case 'router':
        return (
          <g>
            <circle cx="0" cy="0" r={nodeSize / 2} fill={color} />
            <path
              d="M-12 0 L12 0 M0 -12 L0 12 M-8 -8 L8 8 M8 -8 L-8 8"
              stroke={iconColor}
              strokeWidth="2"
              fill="none"
            />
          </g>
        );
      case 'switch':
        return (
          <g>
            <rect x={-nodeSize / 2} y={-nodeSize / 3} width={nodeSize} height={nodeSize / 1.5} rx="4" fill={color} />
            <circle cx="-12" cy="0" r="3" fill={iconColor} />
            <circle cx="-4" cy="0" r="3" fill={iconColor} />
            <circle cx="4" cy="0" r="3" fill={iconColor} />
            <circle cx="12" cy="0" r="3" fill={iconColor} />
          </g>
        );
      case 'server':
        return (
          <g>
            <rect x={-nodeSize / 3} y={-nodeSize / 2} width={nodeSize / 1.5} height={nodeSize} rx="4" fill={color} />
            <line x1="-8" y1="-12" x2="8" y2="-12" stroke={iconColor} strokeWidth="1.5" />
            <line x1="-8" y1="-4" x2="8" y2="-4" stroke={iconColor} strokeWidth="1.5" />
            <line x1="-8" y1="4" x2="8" y2="4" stroke={iconColor} strokeWidth="1.5" />
            <circle cx="-5" cy="-12" r="2" fill={iconColor} />
            <circle cx="-5" cy="-4" r="2" fill={iconColor} />
            <circle cx="-5" cy="4" r="2" fill={iconColor} />
          </g>
        );
      case 'computer':
        return (
          <g>
            <rect x={-nodeSize / 2} y={-nodeSize / 2.5} width={nodeSize} height={nodeSize / 1.5} rx="3" fill={color} />
            <rect x={-nodeSize / 4} y={nodeSize / 4} width={nodeSize / 2} height="4" fill={color} />
            <rect x={-nodeSize / 3} y={nodeSize / 3} width={nodeSize / 1.5} height="3" fill={color} />
          </g>
        );
      case 'hub':
        return (
          <g>
            <circle cx="0" cy="0" r={nodeSize / 2} fill={color} />
            <circle cx="0" cy="0" r={nodeSize / 4} fill={iconColor} opacity="0.3" />
          </g>
        );
      case 'firewall':
        return (
          <g>
            <rect x={-nodeSize / 2} y={-nodeSize / 2} width={nodeSize} height={nodeSize} rx="4" fill={color} />
            <path
              d="M-8 -8 L0 -14 L8 -8 L8 8 L0 14 L-8 8 Z"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
            />
          </g>
        );
      case 'cloud':
        return (
          <g>
            <ellipse cx="0" cy="0" rx={nodeSize / 1.5} ry={nodeSize / 2} fill={color} />
            <text x="0" y="5" textAnchor="middle" fill={iconColor} fontSize="16" fontWeight="bold">
              ☁
            </text>
          </g>
        );
      case 'printer':
        return (
          <g>
            <rect x={-nodeSize / 2} y={-nodeSize / 3} width={nodeSize} height={nodeSize / 1.5} rx="4" fill={color} />
            <rect x={-nodeSize / 3} y={-nodeSize / 2} width={nodeSize / 1.5} height={nodeSize / 3} rx="2" fill={color} opacity="0.7" />
            <line x1={-nodeSize / 3} y1="4" x2={nodeSize / 3} y2="4" stroke={iconColor} strokeWidth="1" />
            <line x1={-nodeSize / 3} y1="8" x2={nodeSize / 3} y2="8" stroke={iconColor} strokeWidth="1" />
          </g>
        );
      default:
        return <circle cx="0" cy="0" r={nodeSize / 2} fill={color} />;
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
          <filter id="netShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
          </filter>
          <pattern id="wirelessPattern" patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="4" cy="4" r="1" fill={strokeColor} />
          </pattern>
        </defs>

        {/* Links */}
        {links.map((link, i) => {
          const fromNode = nodes.find(n => n.id === link.from);
          const toNode = nodes.find(n => n.id === link.to);
          if (!fromNode || !toNode) return null;

          const isWireless = link.type === 'wireless';
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;

          return (
            <motion.g key={`link-${i}`}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isWireless ? 'url(#wirelessPattern)' : strokeColor}
                strokeWidth={isWireless ? 4 : 2}
                strokeDasharray={isWireless ? '6,4' : 'none'}
              />
              {link.bandwidth && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <rect
                    x={midX - 20}
                    y={midY - 8}
                    width={40}
                    height={16}
                    rx={4}
                    fill={isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)'}
                  />
                  <text
                    x={midX}
                    y={midY + 4}
                    textAnchor="middle"
                    fill={mutedColor}
                    fontSize="9"
                    fontWeight="500"
                  >
                    {link.bandwidth}
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const color = node.color || colors[i % colors.length];

          return (
            <motion.g
              key={node.id}
              filter="url(#netShadow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <g transform={`translate(${node.x}, ${node.y})`}>
                {getNodeIcon(node.type, color)}
              </g>
              <text
                x={node.x}
                y={node.y + nodeSize / 2 + 15}
                textAnchor="middle"
                fill={isDark ? '#fff' : '#000'}
                fontSize="10"
                fontWeight="500"
              >
                {node.name}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-4 mt-4 flex-wrap"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-gray-400" />
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>Wired</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 border-t-2 border-dashed border-gray-400" />
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>Wireless</span>
        </div>
        {topology !== 'custom' && (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>
              Topology: {topology.charAt(0).toUpperCase() + topology.slice(1)}
            </span>
          </div>
        )}
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

export default NetworkTopology;
