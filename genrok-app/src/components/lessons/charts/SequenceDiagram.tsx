'use client';

import { motion } from 'framer-motion';

interface Actor {
  id: string;
  name: string;
  color?: string;
}

interface Message {
  from: string;
  to: string;
  label: string;
  type?: 'sync' | 'async' | 'return' | 'self';
}

interface SequenceDiagramProps {
  actors: Actor[];
  messages: Message[];
  title?: string;
  variant?: 'dark' | 'light';
}

export function SequenceDiagram({
  actors,
  messages,
  title,
  variant = 'dark',
}: SequenceDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const lineColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const width = 600;
  const height = 450;
  const actorWidth = 80;
  const actorHeight = 40;
  const padding = 60;
  const messageSpacing = 50;

  const actorSpacing = (width - 2 * padding) / (actors.length - 1 || 1);

  const getActorX = (actorId: string) => {
    const index = actors.findIndex(a => a.id === actorId);
    return padding + index * actorSpacing;
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
            id="seqArrowSync"
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
          <marker
            id="seqArrowAsync"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <path
              d="M 0 0 L 10 3.5 L 0 7"
              fill="none"
              stroke={isDark ? '#fff' : '#000'}
              strokeWidth="1.5"
            />
          </marker>
          <marker
            id="seqArrowReturn"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <path
              d="M 0 0 L 10 3.5 L 0 7"
              fill="none"
              stroke={mutedColor}
              strokeWidth="1.5"
            />
          </marker>
        </defs>

        {/* Actor lifelines */}
        {actors.map((actor, i) => {
          const x = getActorX(actor.id);
          return (
            <motion.line
              key={`lifeline-${actor.id}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              x1={x}
              y1={actorHeight + 30}
              x2={x}
              y2={height - 20}
              stroke={lineColor}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          );
        })}

        {/* Actors (boxes at top) */}
        {actors.map((actor, i) => {
          const x = getActorX(actor.id);
          const color = actor.color || colors[i % colors.length];
          return (
            <motion.g key={actor.id}>
              <motion.rect
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                x={x - actorWidth / 2}
                y={10}
                width={actorWidth}
                height={actorHeight}
                rx={6}
                fill={color}
                style={{ transformOrigin: `${x}px ${10 + actorHeight / 2}px` }}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                x={x}
                y={10 + actorHeight / 2 + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                fontWeight="600"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {actor.name}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Messages */}
        {messages.map((msg, i) => {
          const fromX = getActorX(msg.from);
          const toX = getActorX(msg.to);
          const y = actorHeight + 60 + i * messageSpacing;
          const isSelf = msg.type === 'self' || msg.from === msg.to;
          const isReturn = msg.type === 'return';
          const isAsync = msg.type === 'async';

          if (isSelf) {
            const loopWidth = 40;
            const loopHeight = 25;
            return (
              <motion.g key={`msg-${i}`}>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                  d={`M ${fromX} ${y} H ${fromX + loopWidth} V ${y + loopHeight} H ${fromX}`}
                  stroke={isDark ? '#fff' : '#000'}
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#seqArrowSync)"
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  x={fromX + loopWidth + 5}
                  y={y + loopHeight / 2 + 4}
                  fill={isDark ? '#fff' : '#000'}
                  fontSize="10"
                  fontWeight="500"
                >
                  {msg.label}
                </motion.text>
              </motion.g>
            );
          }

          const direction = toX > fromX ? 1 : -1;
          const arrowId = isReturn ? 'seqArrowReturn' : isAsync ? 'seqArrowAsync' : 'seqArrowSync';

          return (
            <motion.g key={`msg-${i}`}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                x1={fromX}
                y1={y}
                x2={toX}
                y2={y}
                stroke={isReturn ? mutedColor : (isDark ? '#fff' : '#000')}
                strokeWidth="1.5"
                strokeDasharray={isReturn ? '5,3' : 'none'}
                markerEnd={`url(#${arrowId})`}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                x={(fromX + toX) / 2}
                y={y - 8}
                textAnchor="middle"
                fill={isReturn ? mutedColor : (isDark ? '#fff' : '#000')}
                fontSize="10"
                fontWeight="500"
              >
                {msg.label}
              </motion.text>
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

export default SequenceDiagram;
