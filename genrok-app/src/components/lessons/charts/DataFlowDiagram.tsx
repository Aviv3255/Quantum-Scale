'use client';

import { motion } from 'framer-motion';

interface DFDElement {
  id: string;
  name: string;
  type: 'process' | 'external' | 'datastore';
  x: number;
  y: number;
  color?: string;
}

interface DataFlow {
  from: string;
  to: string;
  label: string;
}

interface DataFlowDiagramProps {
  elements: DFDElement[];
  flows: DataFlow[];
  title?: string;
  variant?: 'dark' | 'light';
}

export function DataFlowDiagram({
  elements,
  flows,
  title,
  variant = 'dark',
}: DataFlowDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const width = 650;
  const height = 450;
  const processRadius = 40;
  const externalSize = 70;
  const storeWidth = 120;
  const storeHeight = 35;

  const getElementShape = (element: DFDElement, color: string) => {
    const { x, y, type, name } = element;

    switch (type) {
      case 'process':
        return (
          <g>
            <circle cx={x} cy={y} r={processRadius} fill={color} />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fill="#fff"
              fontSize="11"
              fontWeight="600"
              filter="url(#dfdTextShadow)"
            >
              {name}
            </text>
          </g>
        );
      case 'external':
        return (
          <g>
            <rect
              x={x - externalSize / 2}
              y={y - externalSize / 2}
              width={externalSize}
              height={externalSize}
              fill={color}
              rx={4}
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fill="#fff"
              fontSize="11"
              fontWeight="600"
              filter="url(#dfdTextShadow)"
            >
              {name}
            </text>
          </g>
        );
      case 'datastore':
        return (
          <g>
            {/* Open rectangle (two horizontal lines) */}
            <line
              x1={x - storeWidth / 2}
              y1={y - storeHeight / 2}
              x2={x + storeWidth / 2}
              y2={y - storeHeight / 2}
              stroke={color}
              strokeWidth="3"
            />
            <line
              x1={x - storeWidth / 2}
              y1={y + storeHeight / 2}
              x2={x + storeWidth / 2}
              y2={y + storeHeight / 2}
              stroke={color}
              strokeWidth="3"
            />
            {/* Left vertical line */}
            <line
              x1={x - storeWidth / 2}
              y1={y - storeHeight / 2}
              x2={x - storeWidth / 2}
              y2={y + storeHeight / 2}
              stroke={color}
              strokeWidth="3"
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fill={isDark ? '#fff' : '#000'}
              fontSize="11"
              fontWeight="600"
            >
              {name}
            </text>
          </g>
        );
    }
  };

  const getElementRadius = (type: string) => {
    switch (type) {
      case 'process': return processRadius;
      case 'external': return externalSize / 2;
      case 'datastore': return storeWidth / 2;
      default: return 40;
    }
  };

  const getFlowPath = (flow: DataFlow) => {
    const fromEl = elements.find(e => e.id === flow.from);
    const toEl = elements.find(e => e.id === flow.to);
    if (!fromEl || !toEl) return { path: '', labelPos: { x: 0, y: 0 } };

    const dx = toEl.x - fromEl.x;
    const dy = toEl.y - fromEl.y;
    const angle = Math.atan2(dy, dx);

    const fromR = getElementRadius(fromEl.type);
    const toR = getElementRadius(toEl.type);

    let fromX = fromEl.x;
    let fromY = fromEl.y;
    let toX = toEl.x;
    let toY = toEl.y;

    // Adjust exit point based on element type
    if (fromEl.type === 'process') {
      fromX = fromEl.x + Math.cos(angle) * fromR;
      fromY = fromEl.y + Math.sin(angle) * fromR;
    } else if (fromEl.type === 'external') {
      if (Math.abs(dx) > Math.abs(dy)) {
        fromX = fromEl.x + (dx > 0 ? externalSize / 2 : -externalSize / 2);
      } else {
        fromY = fromEl.y + (dy > 0 ? externalSize / 2 : -externalSize / 2);
      }
    } else if (fromEl.type === 'datastore') {
      if (Math.abs(dx) > Math.abs(dy)) {
        fromX = fromEl.x + (dx > 0 ? storeWidth / 2 : -storeWidth / 2);
      } else {
        fromY = fromEl.y + (dy > 0 ? storeHeight / 2 : -storeHeight / 2);
      }
    }

    // Adjust entry point based on element type
    if (toEl.type === 'process') {
      toX = toEl.x - Math.cos(angle) * toR;
      toY = toEl.y - Math.sin(angle) * toR;
    } else if (toEl.type === 'external') {
      if (Math.abs(dx) > Math.abs(dy)) {
        toX = toEl.x + (dx > 0 ? -externalSize / 2 : externalSize / 2);
      } else {
        toY = toEl.y + (dy > 0 ? -externalSize / 2 : externalSize / 2);
      }
    } else if (toEl.type === 'datastore') {
      if (Math.abs(dx) > Math.abs(dy)) {
        toX = toEl.x + (dx > 0 ? -storeWidth / 2 : storeWidth / 2);
      } else {
        toY = toEl.y + (dy > 0 ? -storeHeight / 2 : storeHeight / 2);
      }
    }

    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    const path = `M ${fromX} ${fromY} L ${toX} ${toY}`;

    return {
      path,
      labelPos: { x: midX, y: midY - 10 }
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
            id="dfdArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDark ? '#fff' : '#000'}
            />
          </marker>
          <filter id="dfdShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
          </filter>
          <filter id="dfdTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Data Flows */}
        {flows.map((flow, i) => {
          const { path, labelPos } = getFlowPath(flow);
          return (
            <motion.g key={`flow-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                d={path}
                stroke={isDark ? '#fff' : '#000'}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#dfdArrow)"
              />
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <rect
                  x={labelPos.x - flow.label.length * 3.5}
                  y={labelPos.y - 10}
                  width={flow.label.length * 7}
                  height={16}
                  rx={4}
                  fill={isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)'}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y + 2}
                  textAnchor="middle"
                  fill={isDark ? '#fff' : '#000'}
                  fontSize="10"
                  fontWeight="500"
                >
                  {flow.label}
                </text>
              </motion.g>
            </motion.g>
          );
        })}

        {/* Elements */}
        {elements.map((element, i) => {
          const color = element.color || colors[i % colors.length];
          return (
            <motion.g key={element.id} filter="url(#dfdShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${element.x}px ${element.y}px` }}
              >
                {getElementShape(element, color)}
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
          <div className="w-4 h-4 rounded-full bg-gray-500" />
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>Process</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-gray-500" />
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>External Entity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-3 border-t-2 border-b-2 border-l-2 border-gray-500" />
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>Data Store</span>
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

export default DataFlowDiagram;
