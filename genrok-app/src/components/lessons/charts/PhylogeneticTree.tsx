'use client';

import { motion } from 'framer-motion';

interface PhyloNode {
  id: string;
  label: string;
  branchLength: number;
  children?: PhyloNode[];
}

interface PhylogeneticTreeProps {
  data?: PhyloNode;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
  showBranchLengths?: boolean;
}

const defaultData: PhyloNode = {
  id: 'root',
  label: '',
  branchLength: 0,
  children: [
    {
      id: 'a1',
      label: '',
      branchLength: 2,
      children: [
        {
          id: 'a1a',
          label: '',
          branchLength: 1.5,
          children: [
            { id: 'species1', label: 'Species A', branchLength: 3 },
            { id: 'species2', label: 'Species B', branchLength: 2.5 },
          ],
        },
        { id: 'species3', label: 'Species C', branchLength: 4.5 },
      ],
    },
    {
      id: 'b1',
      label: '',
      branchLength: 3,
      children: [
        {
          id: 'b1a',
          label: '',
          branchLength: 2,
          children: [
            { id: 'species4', label: 'Species D', branchLength: 2 },
            { id: 'species5', label: 'Species E', branchLength: 1.8 },
          ],
        },
        {
          id: 'b1b',
          label: '',
          branchLength: 1,
          children: [
            { id: 'species6', label: 'Species F', branchLength: 3 },
            { id: 'species7', label: 'Species G', branchLength: 3.2 },
          ],
        },
      ],
    },
  ],
};

function countLeaves(node: PhyloNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
}

function getMaxDepth(node: PhyloNode, currentDepth: number = 0): number {
  if (!node.children || node.children.length === 0) return currentDepth + node.branchLength;
  return Math.max(...node.children.map(child => getMaxDepth(child, currentDepth + node.branchLength)));
}

export function PhylogeneticTree({
  data = defaultData,
  title = 'Phylogenetic Tree - Evolutionary Relationships',
  accentColor = '#88da1c',
  variant = 'dark',
  showBranchLengths = true,
}: PhylogeneticTreeProps) {
  const isDark = variant === 'dark';
  const width = 550;
  const height = 400;
  const padding = { top: 50, right: 120, bottom: 40, left: 40 };

  const textColor = isDark ? 'text-white' : 'text-black';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const branchStroke = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const totalLeaves = countLeaves(data);
  const maxDepth = getMaxDepth(data);
  const scaleX = chartWidth / maxDepth;
  const leafSpacing = chartHeight / (totalLeaves - 1 || 1);

  const paths: { d: string; delay: number }[] = [];
  const nodes: { x: number; y: number; label: string; isLeaf: boolean; branchLength: number; delay: number }[] = [];
  let leafIndex = 0;
  let pathIndex = 0;

  function processNode(node: PhyloNode, x: number, yRange: [number, number]): number {
    const currentX = x + node.branchLength * scaleX;

    if (!node.children || node.children.length === 0) {
      // Leaf node
      const y = padding.top + leafIndex * leafSpacing;
      leafIndex++;

      nodes.push({
        x: currentX,
        y,
        label: node.label,
        isLeaf: true,
        branchLength: node.branchLength,
        delay: pathIndex * 0.05,
      });

      // Horizontal branch to leaf
      paths.push({
        d: `M ${x} ${y} L ${currentX} ${y}`,
        delay: pathIndex * 0.05,
      });
      pathIndex++;

      return y;
    }

    // Internal node - calculate child positions
    const childYs: number[] = [];
    let currentLeafCount = 0;

    node.children.forEach((child, i) => {
      const childLeaves = countLeaves(child);
      const startLeaf = leafIndex;
      const childY = processNode(
        child,
        currentX,
        [yRange[0] + currentLeafCount * leafSpacing, yRange[0] + (currentLeafCount + childLeaves) * leafSpacing]
      );
      childYs.push(childY);
      currentLeafCount += childLeaves;
    });

    const nodeY = (Math.min(...childYs) + Math.max(...childYs)) / 2;

    // Horizontal branch to this node
    if (node.branchLength > 0) {
      paths.push({
        d: `M ${x} ${nodeY} L ${currentX} ${nodeY}`,
        delay: pathIndex * 0.05,
      });
      pathIndex++;
    }

    // Vertical connector
    if (childYs.length > 1) {
      paths.push({
        d: `M ${currentX} ${Math.min(...childYs)} L ${currentX} ${Math.max(...childYs)}`,
        delay: pathIndex * 0.05,
      });
      pathIndex++;
    }

    // Node marker
    nodes.push({
      x: currentX,
      y: nodeY,
      label: node.label,
      isLeaf: false,
      branchLength: node.branchLength,
      delay: pathIndex * 0.05,
    });

    return nodeY;
  }

  processNode(data, padding.left, [padding.top, padding.top + chartHeight]);

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
        {/* Scale bar */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <line
            x1={padding.left}
            y1={height - 15}
            x2={padding.left + scaleX * 2}
            y2={height - 15}
            stroke={labelFill}
            strokeWidth={2}
          />
          <line x1={padding.left} y1={height - 20} x2={padding.left} y2={height - 10} stroke={labelFill} strokeWidth={1} />
          <line x1={padding.left + scaleX * 2} y1={height - 20} x2={padding.left + scaleX * 2} y2={height - 10} stroke={labelFill} strokeWidth={1} />
          <text x={padding.left + scaleX} y={height - 3} textAnchor="middle" fill={labelFill} fontSize="9">
            2.0 units
          </text>
        </motion.g>

        {/* Branches */}
        {paths.map((path, i) => (
          <motion.path
            key={i}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: path.delay, duration: 0.3 }}
            d={path.d}
            stroke={branchStroke}
            strokeWidth={2}
            fill="none"
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={i}>
            {node.isLeaf ? (
              <>
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: node.delay + 0.2, duration: 0.2 }}
                  cx={node.x}
                  cy={node.y}
                  r={5}
                  fill={accentColor}
                  stroke={isDark ? '#fff' : '#000'}
                  strokeWidth={1}
                />
                <motion.text
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: node.delay + 0.3 }}
                  x={node.x + 10}
                  y={node.y + 4}
                  fill={labelFill}
                  fontSize="11"
                  fontWeight="500"
                >
                  {node.label}
                </motion.text>
              </>
            ) : (
              <motion.circle
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: node.delay + 0.2, duration: 0.2 }}
                cx={node.x}
                cy={node.y}
                r={3}
                fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              />
            )}
            {showBranchLengths && node.branchLength > 0 && !node.isLeaf && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: node.delay + 0.4 }}
                x={node.x - 15}
                y={node.y - 8}
                fill={labelFill}
                fontSize="8"
                textAnchor="middle"
              >
                {node.branchLength.toFixed(1)}
              </motion.text>
            )}
          </motion.g>
        ))}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <circle cx={width - 100} cy={padding.top} r={5} fill={accentColor} stroke={isDark ? '#fff' : '#000'} strokeWidth={1} />
          <text x={width - 90} y={padding.top + 4} fill={labelFill} fontSize="9">Leaf (Species)</text>
          <circle cx={width - 100} cy={padding.top + 20} r={3} fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
          <text x={width - 90} y={padding.top + 24} fill={labelFill} fontSize="9">Internal Node</text>
        </motion.g>
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

export default PhylogeneticTree;
