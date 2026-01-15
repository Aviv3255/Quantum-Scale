'use client';

import { motion } from 'framer-motion';

interface AlluvialNode {
  id: string;
  label: string;
  column: number;
}

interface AlluvialFlow {
  source: string;
  target: string;
  value: number;
}

interface AlluvialDiagramProps {
  nodes?: AlluvialNode[];
  flows?: AlluvialFlow[];
  title?: string;
  columnLabels?: string[];
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultNodes: AlluvialNode[] = [
  // Column 0 - Source
  { id: 'organic', label: 'Organic', column: 0 },
  { id: 'paid', label: 'Paid Ads', column: 0 },
  { id: 'referral', label: 'Referral', column: 0 },
  // Column 1 - Engagement
  { id: 'browse', label: 'Browsing', column: 1 },
  { id: 'search', label: 'Search', column: 1 },
  { id: 'direct', label: 'Direct Nav', column: 1 },
  // Column 2 - Action
  { id: 'cart', label: 'Add to Cart', column: 2 },
  { id: 'wishlist', label: 'Wishlist', column: 2 },
  { id: 'abandon', label: 'Abandon', column: 2 },
  // Column 3 - Outcome
  { id: 'purchase', label: 'Purchase', column: 3 },
  { id: 'return', label: 'Return Later', column: 3 },
  { id: 'churn', label: 'Churn', column: 3 },
];

const defaultFlows: AlluvialFlow[] = [
  // Source to Engagement
  { source: 'organic', target: 'browse', value: 40 },
  { source: 'organic', target: 'search', value: 25 },
  { source: 'paid', target: 'browse', value: 30 },
  { source: 'paid', target: 'direct', value: 20 },
  { source: 'referral', target: 'search', value: 15 },
  { source: 'referral', target: 'direct', value: 10 },
  // Engagement to Action
  { source: 'browse', target: 'cart', value: 35 },
  { source: 'browse', target: 'wishlist', value: 20 },
  { source: 'browse', target: 'abandon', value: 15 },
  { source: 'search', target: 'cart', value: 25 },
  { source: 'search', target: 'abandon', value: 15 },
  { source: 'direct', target: 'cart', value: 20 },
  { source: 'direct', target: 'wishlist', value: 10 },
  // Action to Outcome
  { source: 'cart', target: 'purchase', value: 55 },
  { source: 'cart', target: 'return', value: 15 },
  { source: 'cart', target: 'churn', value: 10 },
  { source: 'wishlist', target: 'purchase', value: 10 },
  { source: 'wishlist', target: 'return', value: 15 },
  { source: 'wishlist', target: 'churn', value: 5 },
  { source: 'abandon', target: 'return', value: 10 },
  { source: 'abandon', target: 'churn', value: 20 },
];

const defaultColumnLabels = ['Traffic Source', 'Behavior', 'Action', 'Outcome'];

export function AlluvialDiagram({
  nodes = defaultNodes,
  flows = defaultFlows,
  title = 'Customer Journey Flow',
  columnLabels = defaultColumnLabels,
  accentColor = '#88da1c',
  variant = 'dark',
}: AlluvialDiagramProps) {
  const isDark = variant === 'dark';
  const width = 600;
  const height = 400;
  const padding = { top: 60, right: 30, bottom: 40, left: 30 };

  const textColor = isDark ? 'text-white' : 'text-black';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const columns = [...new Set(nodes.map(n => n.column))].sort((a, b) => a - b);
  const columnWidth = chartWidth / (columns.length - 1);
  const nodeWidth = 16;
  const nodePadding = 10;

  // Calculate node positions
  const nodePositions: Map<string, { x: number; y: number; height: number; inOffset: number; outOffset: number }> = new Map();

  columns.forEach(col => {
    const colNodes = nodes.filter(n => n.column === col);
    const x = padding.left + col * columnWidth - (col === columns.length - 1 ? nodeWidth : 0);

    // Calculate total value for each node
    const nodeValues = colNodes.map(node => {
      const inValue = flows.filter(f => f.target === node.id).reduce((sum, f) => sum + f.value, 0);
      const outValue = flows.filter(f => f.source === node.id).reduce((sum, f) => sum + f.value, 0);
      return { node, value: Math.max(inValue, outValue) || 30 };
    });

    const totalValue = nodeValues.reduce((sum, nv) => sum + nv.value, 0);
    const totalPadding = (colNodes.length - 1) * nodePadding;
    const availableHeight = chartHeight - totalPadding;

    let currentY = padding.top;
    nodeValues.forEach(({ node, value }) => {
      const nodeHeight = (value / totalValue) * availableHeight;
      nodePositions.set(node.id, { x, y: currentY, height: nodeHeight, inOffset: 0, outOffset: 0 });
      currentY += nodeHeight + nodePadding;
    });
  });

  // Generate flow paths
  const colors = [accentColor, '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#D4A5FF'];

  const flowPaths = flows.map((flow, index) => {
    const sourcePos = nodePositions.get(flow.source)!;
    const targetPos = nodePositions.get(flow.target)!;

    if (!sourcePos || !targetPos) return null;

    const sourceOutTotal = flows.filter(f => f.source === flow.source).reduce((sum, f) => sum + f.value, 0);
    const targetInTotal = flows.filter(f => f.target === flow.target).reduce((sum, f) => sum + f.value, 0);

    const flowHeightSource = (flow.value / sourceOutTotal) * sourcePos.height;
    const flowHeightTarget = (flow.value / targetInTotal) * targetPos.height;

    const sourceY = sourcePos.y + sourcePos.outOffset;
    const targetY = targetPos.y + targetPos.inOffset;

    sourcePos.outOffset += flowHeightSource;
    targetPos.inOffset += flowHeightTarget;

    const x1 = sourcePos.x + nodeWidth;
    const x2 = targetPos.x;
    const cpOffset = (x2 - x1) * 0.4;

    const path = `
      M ${x1} ${sourceY}
      C ${x1 + cpOffset} ${sourceY}, ${x2 - cpOffset} ${targetY}, ${x2} ${targetY}
      L ${x2} ${targetY + flowHeightTarget}
      C ${x2 - cpOffset} ${targetY + flowHeightTarget}, ${x1 + cpOffset} ${sourceY + flowHeightSource}, ${x1} ${sourceY + flowHeightSource}
      Z
    `;

    return { path, flow, color: colors[index % colors.length] };
  }).filter(Boolean);

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
        {/* Column labels */}
        {columns.map((col, i) => (
          <motion.text
            key={col}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            x={padding.left + col * columnWidth - (col === columns.length - 1 ? nodeWidth / 2 : -nodeWidth / 2)}
            y={padding.top - 25}
            textAnchor="middle"
            fill={labelFill}
            fontSize="11"
            fontWeight="600"
          >
            {columnLabels[i] || `Stage ${i + 1}`}
          </motion.text>
        ))}

        {/* Flows */}
        {flowPaths.map((fp, i) => fp && (
          <motion.path
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 + i * 0.02, duration: 0.5 }}
            d={fp.path}
            fill={fp.color}
            stroke="none"
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;

          const colIndex = node.column;
          const isLast = colIndex === columns.length - 1;

          return (
            <motion.g key={node.id}>
              <motion.rect
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1 * colIndex, duration: 0.4 }}
                x={pos.x}
                y={pos.y}
                width={nodeWidth}
                height={pos.height}
                fill={colors[i % colors.length]}
                rx="4"
                style={{ transformOrigin: `${pos.x + nodeWidth / 2}px ${pos.y}px` }}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + 0.1 * colIndex }}
                x={isLast ? pos.x + nodeWidth + 8 : pos.x - 8}
                y={pos.y + pos.height / 2 + 4}
                textAnchor={isLast ? 'start' : 'end'}
                fill={labelFill}
                fontSize="9"
                fontWeight="500"
              >
                {node.label}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-3xl">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          {content}
        </div>
      )}
    </div>
  );
}

export default AlluvialDiagram;
