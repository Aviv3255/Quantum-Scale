'use client';

import { motion } from 'framer-motion';

interface IcicleNode {
  name: string;
  value?: number;
  children?: IcicleNode[];
  color?: string;
}

interface IcicleChartProps {
  data: IcicleNode;
  title?: string;
  orientation?: 'horizontal' | 'vertical';
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function IcicleChart({
  data,
  title,
  orientation = 'vertical',
  accentColor = '#88da1c',
  variant = 'dark',
}: IcicleChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const strokeColor = isDark ? 'black' : 'white';
  const width = 500;
  const height = 350;
  const padding = 20;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  // Calculate value
  const getValue = (node: IcicleNode): number => {
    if (node.value !== undefined) return node.value;
    if (node.children) {
      return node.children.reduce((sum, child) => sum + getValue(child), 0);
    }
    return 0;
  };

  // Calculate depth
  const getDepth = (node: IcicleNode): number => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + Math.max(...node.children.map(getDepth));
  };

  const totalValue = getValue(data);
  const depth = getDepth(data);

  interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
    name: string;
    color: string;
    level: number;
  }

  const rects: Rect[] = [];

  const calculateRects = (
    node: IcicleNode,
    level: number,
    start: number,
    end: number,
    colorIndex: number
  ) => {
    const nodeValue = getValue(node);
    const color = node.color || colors[colorIndex % colors.length];

    const innerWidth = width - 2 * padding;
    const innerHeight = height - 2 * padding;
    const levelSize = orientation === 'vertical' ? innerHeight / depth : innerWidth / depth;

    let x: number, y: number, w: number, h: number;

    if (orientation === 'vertical') {
      x = padding + start * innerWidth;
      y = padding + level * levelSize;
      w = (end - start) * innerWidth;
      h = levelSize - 2;
    } else {
      x = padding + level * levelSize;
      y = padding + start * innerHeight;
      w = levelSize - 2;
      h = (end - start) * innerHeight;
    }

    rects.push({ x, y, w, h, name: node.name, color, level });

    if (node.children && node.children.length > 0) {
      let currentStart = start;
      node.children.forEach((child, i) => {
        const childValue = getValue(child);
        const childEnd = currentStart + (childValue / nodeValue) * (end - start);
        calculateRects(child, level + 1, currentStart, childEnd, i);
        currentStart = childEnd;
      });
    }
  };

  calculateRects(data, 0, 0, 1, 0);

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
        {rects.map((rect, i) => (
          <motion.g key={i}>
            <motion.rect
              initial={{
                scaleX: orientation === 'vertical' ? 0 : 1,
                scaleY: orientation === 'horizontal' ? 0 : 1,
                opacity: 0
              }}
              animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
              transition={{ delay: rect.level * 0.15 + i * 0.01 }}
              x={rect.x}
              y={rect.y}
              width={Math.max(rect.w, 0)}
              height={Math.max(rect.h, 0)}
              fill={rect.color}
              stroke={strokeColor}
              strokeWidth="1"
              rx="2"
              style={{
                transformOrigin: orientation === 'vertical'
                  ? `${rect.x}px ${rect.y + rect.h / 2}px`
                  : `${rect.x + rect.w / 2}px ${rect.y}px`
              }}
            />
            {rect.w > 40 && rect.h > 15 && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rect.level * 0.15 + 0.2 }}
                x={rect.x + rect.w / 2}
                y={rect.y + rect.h / 2 + 4}
                textAnchor="middle"
                fill="white"
                fontSize={Math.min(10, rect.w / 5, rect.h / 2)}
                fontWeight="bold"
              >
                {rect.name}
              </motion.text>
            )}
          </motion.g>
        ))}
      </svg>
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

export default IcicleChart;
