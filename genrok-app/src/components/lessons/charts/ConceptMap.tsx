'use client';

import { motion } from 'framer-motion';

interface ConceptNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type?: 'primary' | 'secondary' | 'tertiary';
}

interface ConceptRelation {
  source: string;
  target: string;
  label: string;
}

interface ConceptMapProps {
  nodes?: ConceptNode[];
  relations?: ConceptRelation[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultNodes: ConceptNode[] = [
  { id: 'business', label: 'Business Model', x: 250, y: 50, type: 'primary' },
  { id: 'revenue', label: 'Revenue', x: 100, y: 140, type: 'secondary' },
  { id: 'costs', label: 'Costs', x: 400, y: 140, type: 'secondary' },
  { id: 'customers', label: 'Customers', x: 50, y: 250, type: 'tertiary' },
  { id: 'products', label: 'Products', x: 180, y: 250, type: 'tertiary' },
  { id: 'fixed', label: 'Fixed Costs', x: 320, y: 250, type: 'tertiary' },
  { id: 'variable', label: 'Variable Costs', x: 450, y: 250, type: 'tertiary' },
  { id: 'profit', label: 'Profit', x: 250, y: 340, type: 'primary' },
];

const defaultRelations: ConceptRelation[] = [
  { source: 'business', target: 'revenue', label: 'generates' },
  { source: 'business', target: 'costs', label: 'incurs' },
  { source: 'revenue', target: 'customers', label: 'from' },
  { source: 'revenue', target: 'products', label: 'through' },
  { source: 'costs', target: 'fixed', label: 'includes' },
  { source: 'costs', target: 'variable', label: 'includes' },
  { source: 'revenue', target: 'profit', label: 'contributes to' },
  { source: 'costs', target: 'profit', label: 'reduces' },
];

export function ConceptMap({
  nodes = defaultNodes,
  relations = defaultRelations,
  title = 'Business Concept Map',
  accentColor = '#88da1c',
  variant = 'dark',
}: ConceptMapProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 420;

  const textColor = isDark ? 'text-white' : 'text-black';
  const labelFill = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
  const relationLabelFill = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const linkStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const colors = {
    primary: accentColor,
    secondary: '#4ECDC4',
    tertiary: '#FFE66D',
  };

  // Create a map for quick node lookup
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Calculate link paths with labels
  const links = relations.map(rel => {
    const source = nodeMap.get(rel.source);
    const target = nodeMap.get(rel.target);
    if (!source || !target) return null;

    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;

    // Calculate curve control point
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const perpX = -dy * 0.1;
    const perpY = dx * 0.1;
    const ctrlX = midX + perpX;
    const ctrlY = midY + perpY;

    return {
      source,
      target,
      relation: rel,
      path: `M ${source.x} ${source.y} Q ${ctrlX} ${ctrlY} ${target.x} ${target.y}`,
      labelX: ctrlX,
      labelY: ctrlY,
    };
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
        <defs>
          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={linkStroke}
            />
          </marker>
        </defs>

        {/* Relation links */}
        {links.map((link, i) => link && (
          <motion.g key={i}>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              d={link.path}
              stroke={linkStroke}
              strokeWidth={2}
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            {/* Relation label background */}
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + 0.1 * i }}
              x={link.labelX - link.relation.label.length * 3 - 4}
              y={link.labelY - 8}
              width={link.relation.label.length * 6 + 8}
              height="16"
              fill={isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)'}
              rx="4"
            />
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + 0.1 * i }}
              x={link.labelX}
              y={link.labelY + 4}
              textAnchor="middle"
              fill={relationLabelFill}
              fontSize="9"
              fontStyle="italic"
            >
              {link.relation.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Concept nodes */}
        {nodes.map((node, i) => {
          const nodeColor = colors[node.type || 'tertiary'];
          const nodeWidth = node.label.length * 7 + 30;
          const nodeHeight = 32;

          return (
            <motion.g key={node.id}>
              {/* Node background */}
              <motion.rect
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 * i, duration: 0.3, type: 'spring' }}
                x={node.x - nodeWidth / 2}
                y={node.y - nodeHeight / 2}
                width={nodeWidth}
                height={nodeHeight}
                fill={nodeColor}
                fillOpacity={0.2}
                stroke={nodeColor}
                strokeWidth={2}
                rx="16"
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              {/* Node label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + 0.05 * i }}
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill={labelFill}
                fontSize="11"
                fontWeight="600"
              >
                {node.label}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <text x={20} y={height - 50} fill={labelFill} fontSize="10" fontWeight="600">
            Node Types:
          </text>
          {Object.entries(colors).map(([type, color], i) => (
            <g key={type} transform={`translate(20, ${height - 35 + i * 16})`}>
              <rect width="12" height="12" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" rx="6" />
              <text x="18" y="10" fill={labelFill} fontSize="9" style={{ textTransform: 'capitalize' }}>
                {type}
              </text>
            </g>
          ))}
        </motion.g>

        {/* Instruction */}
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          x={width - 20}
          y={height - 10}
          textAnchor="end"
          fill={relationLabelFill}
          fontSize="9"
        >
          Arrows show relationships between concepts
        </motion.text>
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

export default ConceptMap;
