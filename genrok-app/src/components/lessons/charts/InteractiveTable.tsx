'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface TableRow {
  [key: string]: string | number;
}

interface InteractiveTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * InteractiveTable - Table with sortable columns and animated rows
 * White slide background with dark rounded block
 */
export function InteractiveTable({
  columns,
  rows,
  title,
  variant = 'dark',
}: InteractiveTableProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';
  const headerBg = isDark ? 'bg-white/5' : 'bg-black/5';

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;

    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortConfig) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal);
    const bStr = String(bVal);
    return sortConfig.direction === 'asc'
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-6`}
        >
          {title}
        </motion.h3>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={headerBg}>
              {columns.map((col, i) => (
                <motion.th
                  key={col.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={`px-4 py-3 ${getAlignClass(col.align)} ${mutedColor} text-xs font-semibold uppercase tracking-wider ${borderColor} border-b ${col.sortable ? 'cursor-pointer select-none' : ''}`}
                >
                  <span className="inline-flex items-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <span className="text-xs">
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === 'asc' ? '↑' : '↓'
                        ) : (
                          '↕'
                        )}
                      </span>
                    )}
                  </span>
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + rowIndex * 0.05 }}
                className={`${borderColor} border-b ${hoverBg} transition-colors`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${getAlignClass(col.align)} ${colIndex === 0 ? `font-medium ${textColor}` : mutedColor} text-sm`}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sort indicator */}
      {sortConfig && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-center text-xs ${mutedColor}`}
        >
          Sorted by {columns.find(c => c.key === sortConfig.key)?.label} ({sortConfig.direction === 'asc' ? 'ascending' : 'descending'})
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

export default InteractiveTable;
