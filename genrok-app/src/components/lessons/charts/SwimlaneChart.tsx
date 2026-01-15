'use client';

import { motion } from 'framer-motion';

interface SwimlaneTask {
  id: string;
  label: string;
  lane: string;
  column: number;
  connectedTo?: string[];
  color?: string;
}

interface SwimlaneLane {
  id: string;
  name: string;
  icon?: string;
}

interface SwimlaneChartProps {
  lanes: SwimlaneLane[];
  tasks: SwimlaneTask[];
  columns?: string[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function SwimlaneChart({
  lanes,
  tasks,
  columns = ['Start', 'Process', 'Review', 'Complete'],
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: SwimlaneChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const lineColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const laneBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  const laneColors = ['#88da1c', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];
  const taskColors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const width = 700;
  const height = 100 + lanes.length * 80;
  const laneHeight = 80;
  const headerHeight = 50;
  const leftPadding = 100;
  const columnWidth = (width - leftPadding) / columns.length;

  const getTaskPosition = (task: SwimlaneTask) => {
    const laneIndex = lanes.findIndex(l => l.id === task.lane);
    const x = leftPadding + (task.column + 0.5) * columnWidth;
    const y = headerHeight + laneIndex * laneHeight + laneHeight / 2;
    return { x, y };
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
            id="swimlaneArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
            />
          </marker>
        </defs>

        {/* Column headers */}
        {columns.map((col, i) => (
          <motion.g key={`col-${i}`}>
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              x={leftPadding + i * columnWidth}
              y={0}
              width={columnWidth}
              height={headerHeight}
              fill={i % 2 === 0 ? 'transparent' : laneBg}
            />
            <motion.text
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              x={leftPadding + (i + 0.5) * columnWidth}
              y={headerHeight / 2 + 5}
              textAnchor="middle"
              fill={mutedColor}
              fontSize="12"
              fontWeight="600"
            >
              {col}
            </motion.text>
          </motion.g>
        ))}

        {/* Swimlanes */}
        {lanes.map((lane, laneIndex) => {
          const laneColor = laneColors[laneIndex % laneColors.length];
          const y = headerHeight + laneIndex * laneHeight;

          return (
            <motion.g key={lane.id}>
              {/* Lane background (alternating) */}
              <motion.rect
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                x={0}
                y={y}
                width={width}
                height={laneHeight}
                fill={laneIndex % 2 === 0 ? laneBg : 'transparent'}
              />

              {/* Lane divider */}
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 + laneIndex * 0.05 }}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke={lineColor}
                strokeWidth="1"
                style={{ transformOrigin: '0px 0px' }}
              />

              {/* Lane label */}
              <motion.g
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + laneIndex * 0.05 }}
              >
                <rect
                  x={5}
                  y={y + laneHeight / 2 - 15}
                  width={90}
                  height={30}
                  rx="6"
                  fill={`${laneColor}20`}
                />
                <text
                  x={50}
                  y={y + laneHeight / 2 + 5}
                  textAnchor="middle"
                  fill={laneColor}
                  fontSize="11"
                  fontWeight="600"
                >
                  {lane.name}
                </text>
              </motion.g>
            </motion.g>
          );
        })}

        {/* Bottom lane divider */}
        <motion.line
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
          x1={0}
          y1={headerHeight + lanes.length * laneHeight}
          x2={width}
          y2={headerHeight + lanes.length * laneHeight}
          stroke={lineColor}
          strokeWidth="1"
        />

        {/* Connections */}
        {tasks.map((task, i) => {
          if (!task.connectedTo) return null;
          const fromPos = getTaskPosition(task);

          return task.connectedTo.map((targetId, j) => {
            const targetTask = tasks.find(t => t.id === targetId);
            if (!targetTask) return null;
            const toPos = getTaskPosition(targetTask);

            // Calculate path with curves
            const midX = (fromPos.x + toPos.x) / 2;
            const pathD = `M ${fromPos.x + 25} ${fromPos.y}
                          C ${midX} ${fromPos.y}, ${midX} ${toPos.y}, ${toPos.x - 30} ${toPos.y}`;

            return (
              <motion.path
                key={`conn-${task.id}-${targetId}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                d={pathD}
                stroke={task.color || taskColors[i % taskColors.length]}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#swimlaneArrow)"
              />
            );
          });
        })}

        {/* Tasks */}
        {tasks.map((task, i) => {
          const pos = getTaskPosition(task);
          const color = task.color || taskColors[i % taskColors.length];

          return (
            <motion.g key={task.id}>
              <motion.rect
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 200 }}
                x={pos.x - 50}
                y={pos.y - 18}
                width={100}
                height={36}
                rx="8"
                fill={color}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill="#fff"
                fontSize="10"
                fontWeight="600"
              >
                {task.label}
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
        <div className="bg-black rounded-2xl p-6 w-full max-w-3xl">
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

export default SwimlaneChart;
