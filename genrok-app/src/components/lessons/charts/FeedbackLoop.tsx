'use client';

import { motion } from 'framer-motion';

interface LoopStep {
  id: string;
  label: string;
  description?: string;
  icon?: 'input' | 'process' | 'output' | 'feedback' | 'measure' | 'analyze';
}

interface FeedbackLoopProps {
  title?: string;
  steps: LoopStep[];
  centerLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultSteps: LoopStep[] = [
  { id: '1', label: 'Plan', icon: 'input' },
  { id: '2', label: 'Do', icon: 'process' },
  { id: '3', label: 'Check', icon: 'measure' },
  { id: '4', label: 'Act', icon: 'feedback' },
];

const iconPaths: Record<string, string> = {
  input: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  process: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  output: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  feedback: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5',
  measure: 'M12 20V10M18 20V4M6 20v-4',
  analyze: 'M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V3M21 7l-4.5 4.5-4-4L7 13',
};

export function FeedbackLoop({
  title,
  steps = defaultSteps,
  centerLabel = 'Continuous Improvement',
  accentColor = '#88da1c',
  variant = 'dark',
}: FeedbackLoopProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const mutedColor70 = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  const stepColors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 130;
  const nodeRadius = 40;
  const arrowRadius = radius + 15;

  // Calculate positions for each step
  const getStepPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      angle: angle,
    };
  };

  // Create curved arrow path between two points
  const createArrowPath = (
    startAngle: number,
    endAngle: number,
    r: number
  ) => {
    const startX = centerX + r * Math.cos(startAngle + 0.15);
    const startY = centerY + r * Math.sin(startAngle + 0.15);
    const endX = centerX + r * Math.cos(endAngle - 0.15);
    const endY = centerY + r * Math.sin(endAngle - 0.15);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`;
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

      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto">
        <defs>
          <marker
            id="feedbackArrow"
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
        </defs>

        {/* Center circle with label */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
        >
          <circle
            cx={centerX}
            cy={centerY}
            r={50}
            fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            stroke={strokeColor}
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            fill={mutedColor70}
            fontSize="10"
            fontWeight="600"
          >
            {centerLabel.split(' ')[0]}
          </text>
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            fill={mutedColor70}
            fontSize="10"
            fontWeight="600"
          >
            {centerLabel.split(' ').slice(1).join(' ')}
          </text>
        </motion.g>

        {/* Connection arrows */}
        {steps.map((_, i) => {
          const nextIndex = (i + 1) % steps.length;
          const currentPos = getStepPosition(i, steps.length);
          const nextPos = getStepPosition(nextIndex, steps.length);

          return (
            <motion.path
              key={`arrow-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              d={createArrowPath(currentPos.angle, nextPos.angle, arrowRadius)}
              fill="none"
              stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
              strokeWidth="2"
              markerEnd="url(#feedbackArrow)"
            />
          );
        })}

        {/* Step nodes */}
        {steps.map((step, i) => {
          const pos = getStepPosition(i, steps.length);
          const color = stepColors[i % stepColors.length];

          return (
            <motion.g
              key={step.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 200 }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={color}
              />

              {/* Icon */}
              {step.icon && (
                <g transform={`translate(${pos.x - 12}, ${pos.y - 18})`}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={iconPaths[step.icon]} />
                  </svg>
                </g>
              )}

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + (step.icon ? 18 : 4)}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="700"
              >
                {step.label}
              </text>

              {/* Step number badge */}
              <circle
                cx={pos.x + nodeRadius * 0.7}
                cy={pos.y - nodeRadius * 0.7}
                r={12}
                fill={isDark ? '#000' : '#fff'}
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={pos.x + nodeRadius * 0.7}
                y={pos.y - nodeRadius * 0.7 + 4}
                textAnchor="middle"
                fill={color}
                fontSize="10"
                fontWeight="700"
              >
                {i + 1}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Descriptions */}
      {steps.some((s) => s.description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="flex items-start gap-2 p-2 rounded-lg"
              style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: stepColors[i % stepColors.length] }}
              >
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: stepColors[i % stepColors.length] }}
                >
                  {step.label}
                </span>
                {step.description && (
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: mutedColor }}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">{content}</div>
      ) : (
        <div className="w-full max-w-2xl">{content}</div>
      )}
    </div>
  );
}

export default FeedbackLoop;
