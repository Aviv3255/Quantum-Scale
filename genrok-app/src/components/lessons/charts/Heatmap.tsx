'use client';

import { motion } from 'framer-motion';

interface HeatmapCell {
  row: string;
  col: string;
  value: number;
}

interface HeatmapProps {
  data: HeatmapCell[];
  rows: string[];
  cols: string[];
  title?: string;
  minColor?: string;
  maxColor?: string;
  showValues?: boolean;
}

/**
 * Heatmap - Animated color matrix visualization
 * White slide background with dark rounded block
 */
export function Heatmap({
  data,
  rows,
  cols,
  title,
  minColor = '#1a1a1a',
  maxColor = '#88da1c',
  showValues = true,
}: HeatmapProps) {
  const values = data.map(d => d.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const valueRange = maxValue - minValue || 1;

  // Get value for a cell
  const getValue = (row: string, col: string) => {
    const cell = data.find(d => d.row === row && d.col === col);
    return cell?.value || 0;
  };

  // Calculate color based on value
  const getColor = (value: number) => {
    const normalized = (value - minValue) / valueRange;

    // Parse colors
    const parseHex = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 0, g: 0, b: 0 };
    };

    const min = parseHex(minColor);
    const max = parseHex(maxColor);

    const r = Math.round(min.r + (max.r - min.r) * normalized);
    const g = Math.round(min.g + (max.g - min.g) * normalized);
    const b = Math.round(min.b + (max.b - min.b) * normalized);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Calculate text color based on background brightness
  const getTextColor = (value: number) => {
    const normalized = (value - minValue) / valueRange;
    return normalized > 0.5 ? '#000000' : '#ffffff';
  };

  const cellSize = 56;
  const labelWidth = 80;

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        {title && (
          <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
        )}

        <div className="overflow-x-auto">
          <div className="inline-block">
            {/* Column headers */}
            <div className="flex" style={{ marginLeft: labelWidth }}>
              {cols.map((col, i) => (
                <motion.div
                  key={col}
                  className="flex items-center justify-center text-xs font-medium text-white/50"
                  style={{ width: cellSize, height: 32 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {col}
                </motion.div>
              ))}
            </div>

            {/* Rows */}
            {rows.map((row, rowIndex) => (
              <div key={row} className="flex items-center">
                {/* Row label */}
                <motion.div
                  className="text-xs font-medium text-white/50 pr-3"
                  style={{ width: labelWidth }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIndex * 0.05 }}
                >
                  {row}
                </motion.div>

                {/* Cells */}
                {cols.map((col, colIndex) => {
                  const value = getValue(row, col);
                  const color = getColor(value);
                  const textColor = getTextColor(value);

                  return (
                    <motion.div
                      key={`${row}-${col}`}
                      className="flex items-center justify-center rounded-md m-0.5 font-semibold text-sm"
                      style={{
                        width: cellSize - 4,
                        height: cellSize - 4,
                        backgroundColor: color,
                        color: textColor,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.1 + rowIndex * 0.05 + colIndex * 0.03,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      {showValues && value}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-xs text-white/50">Low</span>
          <div
            className="w-32 h-3 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${minColor}, ${maxColor})`,
            }}
          />
          <span className="text-xs text-white/50">High</span>
        </motion.div>
      </div>
    </div>
  );
}

export default Heatmap;
