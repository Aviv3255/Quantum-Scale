'use client';

import { motion } from 'framer-motion';

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  tags?: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function KanbanBoard({
  columns,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: KanbanBoardProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const cardBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const cardHoverBg = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const columnColors = ['#88da1c', '#F59E0B', '#3B82F6', '#A855F7', '#EF4444'];

  const priorityColors = {
    low: '#22C55E',
    medium: '#F59E0B',
    high: '#EF4444',
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

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column, colIndex) => {
          const columnColor = column.color || columnColors[colIndex % columnColors.length];
          return (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + colIndex * 0.1 }}
              className="flex-shrink-0 w-56"
            >
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + colIndex * 0.1, type: 'spring' }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: columnColor }}
                />
                <span className={`font-semibold text-sm ${textColor}`}>
                  {column.title}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full ml-auto"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    color: mutedColor
                  }}
                >
                  {column.tasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {column.tasks.map((task, taskIndex) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + colIndex * 0.1 + taskIndex * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-lg cursor-pointer transition-colors"
                    style={{ backgroundColor: cardBg }}
                  >
                    {/* Priority indicator */}
                    {task.priority && (
                      <div className="flex items-center gap-1 mb-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: priorityColors[task.priority] }}
                        />
                        <span
                          className="text-xs capitalize"
                          style={{ color: priorityColors[task.priority] }}
                        >
                          {task.priority}
                        </span>
                      </div>
                    )}

                    {/* Task title */}
                    <h4 className={`text-sm font-medium ${textColor} mb-1`}>
                      {task.title}
                    </h4>

                    {/* Description */}
                    {task.description && (
                      <p
                        className="text-xs mb-2 line-clamp-2"
                        style={{ color: mutedColor }}
                      >
                        {task.description}
                      </p>
                    )}

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {task.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${columnColor}20`,
                              color: columnColor,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Assignee */}
                    {task.assignee && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: columnColor, color: '#fff' }}
                        >
                          {task.assignee.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs" style={{ color: mutedColor }}>
                          {task.assignee}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Add task placeholder */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + colIndex * 0.1 }}
                  className="p-2 rounded-lg border-2 border-dashed text-center cursor-pointer transition-colors"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                    color: mutedColor,
                  }}
                >
                  <span className="text-xs">+ Add task</span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-6 w-full max-w-4xl overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {content}
      </div>
    </div>
  );
}

export default KanbanBoard;
