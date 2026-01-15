'use client';

import { motion } from 'framer-motion';

interface ArchComponent {
  id: string;
  name: string;
  type: 'client' | 'server' | 'database' | 'service' | 'queue' | 'cache' | 'loadbalancer' | 'container';
  layer?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
}

interface ArchConnection {
  from: string;
  to: string;
  label?: string;
  type?: 'sync' | 'async' | 'bidirectional';
}

interface ArchLayer {
  id: string;
  name: string;
  y: number;
  height: number;
  color?: string;
}

interface ArchitectureDiagramProps {
  components: ArchComponent[];
  connections: ArchConnection[];
  layers?: ArchLayer[];
  title?: string;
  variant?: 'dark' | 'light';
}

export function ArchitectureDiagram({
  components,
  connections,
  layers = [],
  title,
  variant = 'dark',
}: ArchitectureDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const width = 700;
  const height = 500;
  const defaultCompWidth = 90;
  const defaultCompHeight = 50;

  const getIcon = (type: string) => {
    switch (type) {
      case 'client':
        return (
          <path
            d="M2 4h16v10H2V4zm1 1v8h14V5H3zm3 10h8v2H6v-2z"
            fill="currentColor"
            transform="scale(1.5)"
          />
        );
      case 'server':
        return (
          <path
            d="M2 2h16v4H2V2zm0 6h16v4H2V8zm0 6h16v4H2v-4zm2-10v2h2V4H4zm0 6v2h2v-2H4zm0 6v2h2v-2H4z"
            fill="currentColor"
            transform="scale(1.3)"
          />
        );
      case 'database':
        return (
          <path
            d="M10 2c-4 0-8 1-8 3v10c0 2 4 3 8 3s8-1 8-3V5c0-2-4-3-8-3zm0 2c3.9 0 6 .9 6 1s-2.1 1-6 1-6-.9-6-1 2.1-1 6-1zm6 11c0 .1-2.1 1-6 1s-6-.9-6-1v-2.5c1.5.8 3.6 1.5 6 1.5s4.5-.7 6-1.5V15zm0-4c0 .1-2.1 1-6 1s-6-.9-6-1V8.5c1.5.8 3.6 1.5 6 1.5s4.5-.7 6-1.5V11z"
            fill="currentColor"
            transform="scale(1.2)"
          />
        );
      case 'queue':
        return (
          <path
            d="M4 6h2v8H4V6zm4 0h2v8H8V6zm4 0h2v8h-2V6zm4 0h2v8h-2V6z"
            fill="currentColor"
            transform="scale(1.5)"
          />
        );
      case 'cache':
        return (
          <path
            d="M10 2L2 10l8 8 8-8-8-8zm0 3l5 5-5 5-5-5 5-5z"
            fill="currentColor"
            transform="scale(1.3)"
          />
        );
      case 'loadbalancer':
        return (
          <path
            d="M10 2l-8 6h5v4H2l8 6 8-6h-5v-4h5l-8-6z"
            fill="currentColor"
            transform="scale(1.2)"
          />
        );
      default:
        return (
          <rect x="2" y="4" width="16" height="12" rx="2" fill="currentColor" transform="scale(1.3)" />
        );
    }
  };

  const getComponentCenter = (comp: ArchComponent) => ({
    x: comp.x + (comp.width || defaultCompWidth) / 2,
    y: comp.y + (comp.height || defaultCompHeight) / 2
  });

  const getConnectionPath = (conn: ArchConnection) => {
    const fromComp = components.find(c => c.id === conn.from);
    const toComp = components.find(c => c.id === conn.to);
    if (!fromComp || !toComp) return { path: '', labelPos: { x: 0, y: 0 } };

    const from = getComponentCenter(fromComp);
    const to = getComponentCenter(toComp);

    const fromW = (fromComp.width || defaultCompWidth) / 2;
    const fromH = (fromComp.height || defaultCompHeight) / 2;
    const toW = (toComp.width || defaultCompWidth) / 2;
    const toH = (toComp.height || defaultCompHeight) / 2;

    const dx = to.x - from.x;
    const dy = to.y - from.y;

    let startX = from.x;
    let startY = from.y;
    let endX = to.x;
    let endY = to.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      startX = from.x + (dx > 0 ? fromW : -fromW);
      endX = to.x + (dx > 0 ? -toW : toW);
    } else {
      startY = from.y + (dy > 0 ? fromH : -fromH);
      endY = to.y + (dy > 0 ? -toH : toH);
    }

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    const path = `M ${startX} ${startY} L ${endX} ${endY}`;

    return {
      path,
      labelPos: { x: midX, y: midY - 8 },
      start: { x: startX, y: startY },
      end: { x: endX, y: endY }
    };
  };

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
            id="archArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={strokeColor} />
          </marker>
          <marker
            id="archArrowReverse"
            markerWidth="10"
            markerHeight="7"
            refX="1"
            refY="3.5"
            orient="auto"
          >
            <polygon points="10 0, 0 3.5, 10 7" fill={strokeColor} />
          </marker>
          <filter id="archShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Layers */}
        {layers.map((layer, i) => (
          <motion.g key={layer.id}>
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              x={20}
              y={layer.y}
              width={width - 40}
              height={layer.height}
              rx={8}
              fill={layer.color || (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')}
              stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
              strokeWidth="1"
            />
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              x={35}
              y={layer.y + 20}
              fill={mutedColor}
              fontSize="11"
              fontWeight="600"
              style={{ textTransform: 'uppercase' }}
            >
              {layer.name}
            </motion.text>
          </motion.g>
        ))}

        {/* Connections */}
        {connections.map((conn, i) => {
          const { path, labelPos } = getConnectionPath(conn);
          const isBidirectional = conn.type === 'bidirectional';
          const isAsync = conn.type === 'async';

          return (
            <motion.g key={`conn-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                d={path}
                stroke={strokeColor}
                strokeWidth="2"
                strokeDasharray={isAsync ? '5,3' : 'none'}
                fill="none"
                markerEnd="url(#archArrow)"
                markerStart={isBidirectional ? 'url(#archArrowReverse)' : undefined}
              />
              {conn.label && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fill={mutedColor}
                  fontSize="9"
                  fontWeight="500"
                >
                  {conn.label}
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* Components */}
        {components.map((comp, i) => {
          const color = comp.color || colors[i % colors.length];
          const compWidth = comp.width || defaultCompWidth;
          const compHeight = comp.height || defaultCompHeight;

          return (
            <motion.g key={comp.id} filter="url(#archShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${comp.x + compWidth / 2}px ${comp.y + compHeight / 2}px` }}
              >
                <rect
                  x={comp.x}
                  y={comp.y}
                  width={compWidth}
                  height={compHeight}
                  rx={8}
                  fill={color}
                />
                <g
                  transform={`translate(${comp.x + compWidth / 2 - 15}, ${comp.y + 8})`}
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {getIcon(comp.type)}
                </g>
                <text
                  x={comp.x + compWidth / 2}
                  y={comp.y + compHeight - 8}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  fontWeight="600"
                >
                  {comp.name}
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
        <div className="bg-black rounded-2xl p-8 w-full max-w-3xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {content}
      </div>
    </div>
  );
}

export default ArchitectureDiagram;
