'use client';

import { motion } from 'framer-motion';

interface CalendarHeatmapProps {
  data: { date: string; value: number }[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function CalendarHeatmap({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: CalendarHeatmapProps) {
  const isDark = variant === 'dark';
  const mutedColor40 = isDark ? 'text-white/40' : 'text-black/40';
  const svgMutedFill = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const emptyCell = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const width = 550;
  const height = 180;
  const cellSize = 14;
  const cellGap = 3;
  const padding = { top: 30, left: 40, right: 20, bottom: 20 };

  const weeks = 52;
  const daysPerWeek = 7;

  const maxValue = Math.max(...data.map(d => d.value), 1);

  const dataMap = new Map(data.map(d => [d.date, d.value]));

  const getColor = (value: number) => {
    if (value === 0) return emptyCell;
    const ratio = value / maxValue;
    return `rgba(136, 218, 28, ${0.2 + ratio * 0.8})`;
  };

  // Generate weeks
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (weeks * 7));

  const cells: { x: number; y: number; date: string; value: number }[] = [];

  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < daysPerWeek; day++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + week * 7 + day);
      const dateStr = cellDate.toISOString().split('T')[0];

      cells.push({
        x: padding.left + week * (cellSize + cellGap),
        y: padding.top + day * (cellSize + cellGap),
        date: dateStr,
        value: dataMap.get(dateStr) || 0,
      });
    }
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-4"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Day labels */}
        {[1, 3, 5].map(day => (
          <text
            key={day}
            x={padding.left - 10}
            y={padding.top + day * (cellSize + cellGap) + cellSize / 2 + 3}
            textAnchor="end"
            fill={svgMutedFill}
            fontSize="9"
          >
            {dayLabels[day]}
          </text>
        ))}

        {/* Cells */}
        {cells.map((cell, i) => (
          <motion.rect
            key={cell.date}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.001 }}
            x={cell.x}
            y={cell.y}
            width={cellSize}
            height={cellSize}
            rx="2"
            fill={getColor(cell.value)}
            style={{ transformOrigin: `${cell.x + cellSize / 2}px ${cell.y + cellSize / 2}px` }}
          />
        ))}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end items-center gap-2 mt-2 pr-4"
      >
        <span className={`${mutedColor40} text-xs`}>Less</span>
        <div className="flex gap-1">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor:
                  ratio === 0
                    ? emptyCell
                    : `rgba(136, 218, 28, ${0.2 + ratio * 0.8})`,
              }}
            />
          ))}
        </div>
        <span className={`${mutedColor40} text-xs`}>More</span>
      </motion.div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-6 w-full max-w-2xl">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {content}
        </div>
      )}
    </div>
  );
}

export default CalendarHeatmap;
