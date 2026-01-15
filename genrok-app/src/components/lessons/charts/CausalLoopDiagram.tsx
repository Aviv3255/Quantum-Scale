'use client';

import { motion } from 'framer-motion';

interface CausalVariable {
  id: string;
  name: string;
  x: number;
  y: number;
  color?: string;
}

interface CausalLink {
  from: string;
  to: string;
  polarity: '+' | '-'; // Positive or negative feedback
  delay?: boolean; // Indicates a delay in the causal effect
}

interface CausalLoop {
  id: string;
  name: string;
  type: 'reinforcing' | 'balancing';
  x: number;
  y: number;
}

interface CausalLoopDiagramProps {
  variables: CausalVariable[];
  links: CausalLink[];
  loops?: CausalLoop[];
  title?: string;
  variant?: 'dark' | 'light';
}

export function CausalLoopDiagram({
  variables,
  links,
  loops = [],
  title,
  variant = 'dark',
}: CausalLoopDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const positiveColor = '#22C55E';
  const negativeColor = '#EF4444';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const width = 650;
  const height = 450;
  const nodeRadius = 45;

  const getLinkPath = (link: CausalLink) => {
    const fromVar = variables.find(v => v.id === link.from);
    const toVar = variables.find(v => v.id === link.to);
    if (!fromVar || !toVar) return { path: '', midPoint: { x: 0, y: 0 }, angle: 0 };

    // Self-loop
    if (link.from === link.to) {
      const x = fromVar.x;
      const y = fromVar.y - nodeRadius;
      const loopSize = 35;
      return {
        path: `M ${x - 20} ${y} C ${x - 20} ${y - loopSize * 1.5}, ${x + 20} ${y - loopSize * 1.5}, ${x + 20} ${y}`,
        midPoint: { x, y: y - loopSize * 1.2 },
        angle: 0
      };
    }

    const dx = toVar.x - fromVar.x;
    const dy = toVar.y - fromVar.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Start and end points on circle edges
    const startX = fromVar.x + Math.cos(angle) * nodeRadius;
    const startY = fromVar.y + Math.sin(angle) * nodeRadius;
    const endX = toVar.x - Math.cos(angle) * (nodeRadius + 10); // Extra space for arrow
    const endY = toVar.y - Math.sin(angle) * (nodeRadius + 10);

    // Calculate curved path with offset for parallel links
    const curveOffset = 30;
    const perpX = -Math.sin(angle) * curveOffset;
    const perpY = Math.cos(angle) * curveOffset;

    const midX = (startX + endX) / 2 + perpX;
    const midY = (startY + endY) / 2 + perpY;

    const path = `M ${startX} ${startY} Q ${midX} ${midY}, ${endX} ${endY}`;

    // Calculate angle at endpoint for arrowhead rotation
    const endAngle = Math.atan2(endY - midY, endX - midX) * (180 / Math.PI);

    return {
      path,
      midPoint: { x: midX, y: midY },
      angle: endAngle
    };
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
            id="causalArrowPos"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill={positiveColor} />
          </marker>
          <marker
            id="causalArrowNeg"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill={negativeColor} />
          </marker>
          <filter id="causalShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Loop indicators */}
        {loops.map((loop, i) => (
          <motion.g
            key={loop.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
          >
            <circle
              cx={loop.x}
              cy={loop.y}
              r={25}
              fill={loop.type === 'reinforcing' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}
              stroke={loop.type === 'reinforcing' ? positiveColor : negativeColor}
              strokeWidth="2"
            />
            <text
              x={loop.x}
              y={loop.y - 3}
              textAnchor="middle"
              fill={loop.type === 'reinforcing' ? positiveColor : negativeColor}
              fontSize="16"
              fontWeight="700"
            >
              {loop.type === 'reinforcing' ? 'R' : 'B'}
            </text>
            {loop.name && (
              <text
                x={loop.x}
                y={loop.y + 10}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="8"
                fontWeight="500"
              >
                {loop.name}
              </text>
            )}
            {/* Circular arrow indicator */}
            <path
              d={loop.type === 'reinforcing'
                ? `M ${loop.x + 20} ${loop.y - 15} A 20 20 0 1 1 ${loop.x + 15} ${loop.y + 20}`
                : `M ${loop.x - 20} ${loop.y - 15} A 20 20 0 1 0 ${loop.x - 15} ${loop.y + 20}`
              }
              fill="none"
              stroke={loop.type === 'reinforcing' ? positiveColor : negativeColor}
              strokeWidth="1.5"
              opacity={0.5}
            />
          </motion.g>
        ))}

        {/* Links */}
        {links.map((link, i) => {
          const { path, midPoint } = getLinkPath(link);
          const isPositive = link.polarity === '+';
          const color = isPositive ? positiveColor : negativeColor;

          return (
            <motion.g key={`link-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                d={path}
                stroke={color}
                strokeWidth="2.5"
                strokeDasharray={link.delay ? '8,4' : 'none'}
                fill="none"
                markerEnd={isPositive ? 'url(#causalArrowPos)' : 'url(#causalArrowNeg)'}
              />
              {/* Polarity indicator */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <circle
                  cx={midPoint.x}
                  cy={midPoint.y}
                  r={12}
                  fill={isDark ? '#000' : '#fff'}
                  stroke={color}
                  strokeWidth="2"
                />
                <text
                  x={midPoint.x}
                  y={midPoint.y + 5}
                  textAnchor="middle"
                  fill={color}
                  fontSize="14"
                  fontWeight="700"
                >
                  {link.polarity}
                </text>
              </motion.g>
              {/* Delay indicator */}
              {link.delay && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  x={midPoint.x + 18}
                  y={midPoint.y + 5}
                  fill={mutedColor}
                  fontSize="10"
                  fontWeight="500"
                >
                  ||
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* Variables */}
        {variables.map((variable, i) => {
          const color = variable.color || colors[i % colors.length];

          return (
            <motion.g key={variable.id} filter="url(#causalShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${variable.x}px ${variable.y}px` }}
              >
                <circle
                  cx={variable.x}
                  cy={variable.y}
                  r={nodeRadius}
                  fill={color}
                />
                {/* Variable name with word wrap */}
                <foreignObject
                  x={variable.x - nodeRadius + 5}
                  y={variable.y - nodeRadius / 2}
                  width={nodeRadius * 2 - 10}
                  height={nodeRadius}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      textAlign: 'center',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#fff',
                      lineHeight: 1.2,
                    }}
                  >
                    {variable.name}
                  </div>
                </foreignObject>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center gap-6 mt-4 flex-wrap"
      >
        <div className="flex items-center gap-2">
          <svg width="40" height="16">
            <line x1="0" y1="8" x2="25" y2="8" stroke={positiveColor} strokeWidth="2" />
            <polygon points="25,4 35,8 25,12" fill={positiveColor} />
          </svg>
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Positive (+)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="40" height="16">
            <line x1="0" y1="8" x2="25" y2="8" stroke={negativeColor} strokeWidth="2" />
            <polygon points="25,4 35,8 25,12" fill={negativeColor} />
          </svg>
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Negative (-)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="40" height="16">
            <line x1="0" y1="8" x2="35" y2="8" stroke={mutedColor} strokeWidth="2" strokeDasharray="4,2" />
          </svg>
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Delay
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-500 text-xs font-bold">
            R
          </div>
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Reinforcing
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 text-xs font-bold">
            B
          </div>
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Balancing
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

export default CausalLoopDiagram;
