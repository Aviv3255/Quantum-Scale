'use client';

import { motion } from 'framer-motion';

interface MosaicCell {
  row: string;
  column: string;
  value: number;
}

interface MosaicPlotProps {
  data?: MosaicCell[];
  title?: string;
  rowLabel?: string;
  columnLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: MosaicCell[] = [
  // Age Group x Purchase Frequency
  { row: '18-24', column: 'Rare', value: 15 },
  { row: '18-24', column: 'Occasional', value: 35 },
  { row: '18-24', column: 'Frequent', value: 25 },
  { row: '25-34', column: 'Rare', value: 10 },
  { row: '25-34', column: 'Occasional', value: 40 },
  { row: '25-34', column: 'Frequent', value: 45 },
  { row: '35-44', column: 'Rare', value: 20 },
  { row: '35-44', column: 'Occasional', value: 35 },
  { row: '35-44', column: 'Frequent', value: 30 },
  { row: '45-54', column: 'Rare', value: 25 },
  { row: '45-54', column: 'Occasional', value: 25 },
  { row: '45-54', column: 'Frequent', value: 20 },
  { row: '55+', column: 'Rare', value: 30 },
  { row: '55+', column: 'Occasional', value: 20 },
  { row: '55+', column: 'Frequent', value: 10 },
];

export function MosaicPlot({
  data = defaultData,
  title = 'Mosaic Plot - Age vs Purchase Frequency',
  rowLabel = 'Age Group',
  columnLabel = 'Purchase Frequency',
  accentColor = '#88da1c',
  variant = 'dark',
}: MosaicPlotProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 400;
  const padding = { top: 60, right: 100, bottom: 80, left: 80 };

  const textColor = isDark ? 'text-white' : 'text-black';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const borderStroke = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  const rows = [...new Set(data.map(d => d.row))];
  const columns = [...new Set(data.map(d => d.column))];

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate row totals and column totals for proportional sizing
  const rowTotals = rows.map(row => ({
    row,
    total: data.filter(d => d.row === row).reduce((sum, d) => sum + d.value, 0),
  }));
  const grandTotal = rowTotals.reduce((sum, rt) => sum + rt.total, 0);

  const colors = [accentColor, '#FF6B6B', '#4ECDC4', '#FFE66D', '#D4A5FF'];
  const cellGap = 2;

  // Calculate positions
  const cells: { x: number; y: number; width: number; height: number; data: MosaicCell; color: string }[] = [];

  let currentY = padding.top;
  rows.forEach((row, rowIndex) => {
    const rowTotal = rowTotals.find(rt => rt.row === row)!.total;
    const rowHeight = (rowTotal / grandTotal) * chartHeight;

    let currentX = padding.left;
    columns.forEach((col, colIndex) => {
      const cell = data.find(d => d.row === row && d.column === col);
      if (cell) {
        const cellWidth = (cell.value / rowTotal) * chartWidth;
        cells.push({
          x: currentX,
          y: currentY,
          width: cellWidth - cellGap,
          height: rowHeight - cellGap,
          data: cell,
          color: colors[colIndex % colors.length],
        });
        currentX += cellWidth;
      }
    });
    currentY += rowHeight;
  });

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
        {/* Mosaic cells */}
        {cells.map((cell, i) => (
          <motion.g key={i}>
            <motion.rect
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              transition={{ delay: 0.03 * i, duration: 0.3 }}
              x={cell.x}
              y={cell.y}
              width={cell.width}
              height={cell.height}
              fill={cell.color}
              stroke={borderStroke}
              strokeWidth={1}
              rx="4"
              style={{ transformOrigin: `${cell.x + cell.width / 2}px ${cell.y + cell.height / 2}px` }}
            />
            {cell.width > 30 && cell.height > 20 && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + 0.03 * i }}
                x={cell.x + cell.width / 2}
                y={cell.y + cell.height / 2 + 4}
                textAnchor="middle"
                fill="#fff"
                fontSize="10"
                fontWeight="600"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {cell.data.value}
              </motion.text>
            )}
          </motion.g>
        ))}

        {/* Row labels (left side) */}
        {rows.map((row, i) => {
          const rowCells = cells.filter(c => c.data.row === row);
          if (rowCells.length === 0) return null;
          const y = rowCells[0].y + rowCells[0].height / 2;
          return (
            <motion.text
              key={row}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              fill={labelFill}
              fontSize="10"
              fontWeight="500"
            >
              {row}
            </motion.text>
          );
        })}

        {/* Row label title */}
        <text
          x={20}
          y={padding.top + chartHeight / 2}
          textAnchor="middle"
          fill={labelFill}
          fontSize="11"
          fontWeight="600"
          transform={`rotate(-90, 20, ${padding.top + chartHeight / 2})`}
        >
          {rowLabel}
        </text>

        {/* Column label title */}
        <text
          x={padding.left + chartWidth / 2}
          y={height - 15}
          textAnchor="middle"
          fill={labelFill}
          fontSize="11"
          fontWeight="600"
        >
          {columnLabel}
        </text>

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {columns.map((col, i) => (
            <g key={col} transform={`translate(${width - 90}, ${padding.top + i * 22})`}>
              <rect
                width="14"
                height="14"
                fill={colors[i % colors.length]}
                rx="3"
              />
              <text x="20" y="11" fill={labelFill} fontSize="10">
                {col}
              </text>
            </g>
          ))}
        </motion.g>

        {/* Border */}
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          x={padding.left}
          y={padding.top}
          width={chartWidth}
          height={chartHeight}
          fill="none"
          stroke={borderStroke}
          strokeWidth={1}
          rx="4"
        />
      </svg>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
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

export default MosaicPlot;
