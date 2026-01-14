'use client';

import { motion } from 'framer-motion';

interface SunburstNode {
  name: string;
  value?: number;
  color?: string;
  children?: SunburstNode[];
}

interface SunburstChartProps {
  data: SunburstNode;
  title?: string;
  accentColor?: string;
}

export function SunburstChart({
  data,
  title,
  accentColor = '#88da1c',
}: SunburstChartProps) {
  const width = 400;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 20;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  // Calculate total value
  const calculateValue = (node: SunburstNode): number => {
    if (node.value !== undefined) return node.value;
    if (node.children) {
      return node.children.reduce((sum, child) => sum + calculateValue(child), 0);
    }
    return 0;
  };

  const totalValue = calculateValue(data);

  // Generate arcs
  interface Arc {
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
    color: string;
    name: string;
    depth: number;
  }

  const arcs: Arc[] = [];

  const generateArcs = (
    node: SunburstNode,
    startAngle: number,
    endAngle: number,
    depth: number,
    colorIndex: number
  ) => {
    const nodeValue = calculateValue(node);
    const color = node.color || colors[colorIndex % colors.length];

    if (depth > 0) {
      const innerRadius = (depth - 1) * (maxRadius / 3) + 20;
      const outerRadius = depth * (maxRadius / 3) + 20;

      arcs.push({
        startAngle,
        endAngle,
        innerRadius,
        outerRadius,
        color,
        name: node.name,
        depth,
      });
    }

    if (node.children) {
      let currentAngle = startAngle;
      node.children.forEach((child, i) => {
        const childValue = calculateValue(child);
        const childAngle = ((endAngle - startAngle) * childValue) / nodeValue;
        generateArcs(child, currentAngle, currentAngle + childAngle, depth + 1, i);
        currentAngle += childAngle;
      });
    }
  };

  generateArcs(data, 0, 2 * Math.PI, 0, 0);

  // Create arc path
  const createArcPath = (arc: Arc) => {
    const { startAngle, endAngle, innerRadius, outerRadius } = arc;
    const startOuter = {
      x: cx + outerRadius * Math.cos(startAngle - Math.PI / 2),
      y: cy + outerRadius * Math.sin(startAngle - Math.PI / 2),
    };
    const endOuter = {
      x: cx + outerRadius * Math.cos(endAngle - Math.PI / 2),
      y: cy + outerRadius * Math.sin(endAngle - Math.PI / 2),
    };
    const startInner = {
      x: cx + innerRadius * Math.cos(endAngle - Math.PI / 2),
      y: cy + innerRadius * Math.sin(endAngle - Math.PI / 2),
    };
    const endInner = {
      x: cx + innerRadius * Math.cos(startAngle - Math.PI / 2),
      y: cy + innerRadius * Math.sin(startAngle - Math.PI / 2),
    };

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `
      M ${startOuter.x} ${startOuter.y}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}
      L ${startInner.x} ${startInner.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}
      Z
    `;
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white text-center mb-6"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h3>
        )}

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          {arcs.map((arc, i) => (
            <motion.path
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: arc.depth * 0.1 + i * 0.02 }}
              d={createArcPath(arc)}
              fill={arc.color}
              stroke="black"
              strokeWidth="1"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}

          {/* Center label */}
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            {data.name}
          </motion.text>
        </svg>
      </div>
    </div>
  );
}

export default SunburstChart;
