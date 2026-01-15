'use client';

import { motion } from 'framer-motion';

interface State {
  id: string;
  name: string;
  type?: 'initial' | 'final' | 'normal' | 'composite';
  x: number;
  y: number;
  color?: string;
  entryAction?: string;
  exitAction?: string;
}

interface Transition {
  from: string;
  to: string;
  trigger?: string;
  guard?: string;
  action?: string;
}

interface StateDiagramProps {
  states: State[];
  transitions: Transition[];
  title?: string;
  variant?: 'dark' | 'light';
}

export function StateDiagram({
  states,
  transitions,
  title,
  variant = 'dark',
}: StateDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const width = 650;
  const height = 450;
  const stateWidth = 100;
  const stateHeight = 50;

  const getStateShape = (state: State, color: string) => {
    const { x, y, type } = state;

    switch (type) {
      case 'initial':
        return (
          <circle cx={x} cy={y} r={12} fill={color} />
        );
      case 'final':
        return (
          <g>
            <circle cx={x} cy={y} r={14} fill="none" stroke={color} strokeWidth="2" />
            <circle cx={x} cy={y} r={10} fill={color} />
          </g>
        );
      case 'composite':
        return (
          <rect
            x={x - stateWidth / 2 - 20}
            y={y - stateHeight / 2 - 10}
            width={stateWidth + 40}
            height={stateHeight + 20}
            rx={12}
            fill="transparent"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8,4"
          />
        );
      default: // normal
        return (
          <rect
            x={x - stateWidth / 2}
            y={y - stateHeight / 2}
            width={stateWidth}
            height={stateHeight}
            rx={10}
            fill={color}
          />
        );
    }
  };

  const getTransitionPath = (trans: Transition) => {
    const fromState = states.find(s => s.id === trans.from);
    const toState = states.find(s => s.id === trans.to);
    if (!fromState || !toState) return { path: '', labelPos: { x: 0, y: 0 } };

    // Self-transition
    if (trans.from === trans.to) {
      const x = fromState.x;
      const y = fromState.y - stateHeight / 2;
      const loopSize = 30;
      return {
        path: `M ${x - 15} ${y} C ${x - 15} ${y - loopSize}, ${x + 15} ${y - loopSize}, ${x + 15} ${y}`,
        labelPos: { x: x, y: y - loopSize - 5 }
      };
    }

    const getRadius = (type?: string) => {
      if (type === 'initial' || type === 'final') return 14;
      return Math.max(stateWidth, stateHeight) / 2;
    };

    const fromR = getRadius(fromState.type);
    const toR = getRadius(toState.type);

    const dx = toState.x - fromState.x;
    const dy = toState.y - fromState.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Adjust start and end points
    let fromX = fromState.x;
    let fromY = fromState.y;
    let toX = toState.x;
    let toY = toState.y;

    if (fromState.type === 'normal' || fromState.type === undefined) {
      if (Math.abs(dx) > Math.abs(dy)) {
        fromX = fromState.x + (dx > 0 ? stateWidth / 2 : -stateWidth / 2);
      } else {
        fromY = fromState.y + (dy > 0 ? stateHeight / 2 : -stateHeight / 2);
      }
    } else {
      fromX = fromState.x + Math.cos(angle) * fromR;
      fromY = fromState.y + Math.sin(angle) * fromR;
    }

    if (toState.type === 'normal' || toState.type === undefined) {
      if (Math.abs(dx) > Math.abs(dy)) {
        toX = toState.x + (dx > 0 ? -stateWidth / 2 : stateWidth / 2);
      } else {
        toY = toState.y + (dy > 0 ? -stateHeight / 2 : stateHeight / 2);
      }
    } else {
      toX = toState.x - Math.cos(angle) * toR;
      toY = toState.y - Math.sin(angle) * toR;
    }

    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    // Add curve offset for parallel transitions
    const curveOffset = 0;
    const path = `M ${fromX} ${fromY} Q ${midX + curveOffset} ${midY + curveOffset}, ${toX} ${toY}`;

    return {
      path,
      labelPos: { x: midX, y: midY - 12 }
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
            id="stateArrow"
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
          <filter id="stateShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Transitions */}
        {transitions.map((trans, i) => {
          const { path, labelPos } = getTransitionPath(trans);
          const label = [trans.trigger, trans.guard ? `[${trans.guard}]` : '', trans.action ? `/ ${trans.action}` : '']
            .filter(Boolean).join(' ');

          return (
            <motion.g key={`trans-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                d={path}
                stroke={strokeColor}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#stateArrow)"
              />
              {label && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fill={isDark ? '#fff' : '#000'}
                  fontSize="10"
                  fontWeight="500"
                >
                  {label}
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* States */}
        {states.map((state, i) => {
          const color = state.color || colors[i % colors.length];
          const showLabel = state.type !== 'initial' && state.type !== 'final';

          return (
            <motion.g key={state.id} filter="url(#stateShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${state.x}px ${state.y}px` }}
              >
                {getStateShape(state, color)}
                {showLabel && (
                  <text
                    x={state.x}
                    y={state.y + 5}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {state.name}
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

export default StateDiagram;
