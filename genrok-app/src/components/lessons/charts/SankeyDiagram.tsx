'use client';

import { motion } from 'framer-motion';

interface SankeyNode {
  id: string;
  label: string;
  color?: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyDiagramProps {
  nodes: SankeyNode[];
  links: SankeyLink[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function SankeyDiagram({
  nodes,
  links,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: SankeyDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

  const width = 550;
  const height = 350;
  const padding = 40;
  const nodeWidth = 20;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  // Group nodes by column (sources, targets)
  const sourceIds = new Set(links.map(l => l.source));
  const targetIds = new Set(links.map(l => l.target));

  const leftNodes = nodes.filter(n => sourceIds.has(n.id) && !targetIds.has(n.id));
  const middleNodes = nodes.filter(n => sourceIds.has(n.id) && targetIds.has(n.id));
  const rightNodes = nodes.filter(n => !sourceIds.has(n.id) && targetIds.has(n.id));

  // Calculate node positions
  const nodePositions = new Map<string, { x: number; y: number; height: number }>();

  const positionColumn = (columnNodes: SankeyNode[], xPos: number) => {
    const totalValue = columnNodes.reduce((sum, node) => {
      const nodeValue = links
        .filter(l => l.source === node.id || l.target === node.id)
        .reduce((s, l) => s + l.value, 0);
      return sum + nodeValue;
    }, 0);

    let currentY = padding;
    const availableHeight = height - 2 * padding;

    columnNodes.forEach((node, i) => {
      const nodeValue = links
        .filter(l => l.source === node.id || l.target === node.id)
        .reduce((s, l) => s + l.value, 0);
      const nodeHeight = (nodeValue / totalValue) * availableHeight * 0.8;

      nodePositions.set(node.id, {
        x: xPos,
        y: currentY,
        height: nodeHeight,
      });

      currentY += nodeHeight + 10;
    });
  };

  positionColumn(leftNodes, padding);
  positionColumn(middleNodes, width / 2 - nodeWidth / 2);
  positionColumn(rightNodes, width - padding - nodeWidth);

  // Create Sankey link path
  const createLinkPath = (link: SankeyLink, linkIndex: number) => {
    const sourcePos = nodePositions.get(link.source);
    const targetPos = nodePositions.get(link.target);
    if (!sourcePos || !targetPos) return '';

    // Calculate offsets within nodes
    const sourceLinks = links.filter(l => l.source === link.source);
    const targetLinks = links.filter(l => l.target === link.target);

    const sourceLinkIndex = sourceLinks.findIndex(l => l === link);
    const targetLinkIndex = targetLinks.findIndex(l => l === link);

    const sourceTotal = sourceLinks.reduce((s, l) => s + l.value, 0);
    const targetTotal = targetLinks.reduce((s, l) => s + l.value, 0);

    const sourceOffset = sourceLinks.slice(0, sourceLinkIndex).reduce((s, l) => s + l.value, 0);
    const targetOffset = targetLinks.slice(0, targetLinkIndex).reduce((s, l) => s + l.value, 0);

    const linkHeight = (link.value / sourceTotal) * sourcePos.height;
    const targetLinkHeight = (link.value / targetTotal) * targetPos.height;

    const x0 = sourcePos.x + nodeWidth;
    const y0 = sourcePos.y + (sourceOffset / sourceTotal) * sourcePos.height;
    const x1 = targetPos.x;
    const y1 = targetPos.y + (targetOffset / targetTotal) * targetPos.height;

    const curvature = 0.5;
    const xi = (x0 + x1) * curvature;

    return `
      M ${x0} ${y0}
      C ${xi} ${y0}, ${xi} ${y1}, ${x1} ${y1}
      L ${x1} ${y1 + targetLinkHeight}
      C ${xi} ${y1 + targetLinkHeight}, ${xi} ${y0 + linkHeight}, ${x0} ${y0 + linkHeight}
      Z
    `;
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
        {/* Links */}
        {links.map((link, i) => {
          const sourceNode = nodes.find(n => n.id === link.source);
          const nodeIndex = nodes.findIndex(n => n.id === link.source);
          const color = sourceNode?.color || colors[nodeIndex % colors.length];

          return (
            <motion.path
              key={`link-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              d={createLinkPath(link, i)}
              fill={color}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;

          const color = node.color || colors[i % colors.length];

          return (
            <motion.g key={node.id}>
              <motion.rect
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                x={pos.x}
                y={pos.y}
                width={nodeWidth}
                height={pos.height}
                fill={color}
                rx="4"
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.03 }}
                x={pos.x < width / 2 ? pos.x - 5 : pos.x + nodeWidth + 5}
                y={pos.y + pos.height / 2 + 4}
                textAnchor={pos.x < width / 2 ? 'end' : 'start'}
                fill={mutedColor}
                fontSize="11"
              >
                {node.label}
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

export default SankeyDiagram;
