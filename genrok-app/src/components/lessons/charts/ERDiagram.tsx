'use client';

import { motion } from 'framer-motion';

interface Entity {
  id: string;
  name: string;
  attributes: {
    name: string;
    type: string;
    isPrimary?: boolean;
    isForeign?: boolean;
  }[];
  x: number;
  y: number;
  color?: string;
}

interface Relationship {
  from: string;
  to: string;
  label?: string;
  fromCardinality: '1' | 'N' | '0..1' | '0..N' | '1..N';
  toCardinality: '1' | 'N' | '0..1' | '0..N' | '1..N';
}

interface ERDiagramProps {
  entities: Entity[];
  relationships: Relationship[];
  title?: string;
  variant?: 'dark' | 'light';
}

export function ERDiagram({
  entities,
  relationships,
  title,
  variant = 'dark',
}: ERDiagramProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const bgColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const width = 700;
  const height = 500;
  const entityWidth = 160;
  const headerHeight = 32;
  const attrHeight = 24;

  const getEntityHeight = (entity: Entity) => headerHeight + entity.attributes.length * attrHeight + 8;

  const getConnectionPath = (rel: Relationship) => {
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);
    if (!fromEntity || !toEntity) return { path: '', labelPos: { x: 0, y: 0 }, fromPos: { x: 0, y: 0 }, toPos: { x: 0, y: 0 } };

    const fromH = getEntityHeight(fromEntity);
    const toH = getEntityHeight(toEntity);

    const fromCenterX = fromEntity.x + entityWidth / 2;
    const fromCenterY = fromEntity.y + fromH / 2;
    const toCenterX = toEntity.x + entityWidth / 2;
    const toCenterY = toEntity.y + toH / 2;

    const dx = toCenterX - fromCenterX;
    const dy = toCenterY - fromCenterY;

    let fromX, fromY, toX, toY;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection
      if (dx > 0) {
        fromX = fromEntity.x + entityWidth;
        toX = toEntity.x;
      } else {
        fromX = fromEntity.x;
        toX = toEntity.x + entityWidth;
      }
      fromY = fromCenterY;
      toY = toCenterY;
    } else {
      // Vertical connection
      if (dy > 0) {
        fromY = fromEntity.y + fromH;
        toY = toEntity.y;
      } else {
        fromY = fromEntity.y;
        toY = toEntity.y + toH;
      }
      fromX = fromCenterX;
      toX = toCenterX;
    }

    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    const path = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;

    return {
      path,
      labelPos: { x: midX, y: midY },
      fromPos: { x: fromX, y: fromY },
      toPos: { x: toX, y: toY }
    };
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-6"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <filter id="erdShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
          <filter id="erdTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Relationships */}
        {relationships.map((rel, i) => {
          const { path, labelPos, fromPos, toPos } = getConnectionPath(rel);
          return (
            <motion.g key={`rel-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                d={path}
                stroke={strokeColor}
                strokeWidth="2"
                fill="none"
              />
              {/* From cardinality */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                x={fromPos.x + (toPos.x > fromPos.x ? 15 : -15)}
                y={fromPos.y + (toPos.y > fromPos.y ? 15 : -8)}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="11"
                fontWeight="600"
              >
                {rel.fromCardinality}
              </motion.text>
              {/* To cardinality */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                x={toPos.x + (toPos.x > fromPos.x ? -15 : 15)}
                y={toPos.y + (toPos.y > fromPos.y ? -8 : 15)}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="11"
                fontWeight="600"
              >
                {rel.toCardinality}
              </motion.text>
              {/* Relationship label */}
              {rel.label && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
                  <rect
                    x={labelPos.x - 30}
                    y={labelPos.y - 10}
                    width={60}
                    height={20}
                    rx={10}
                    fill={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 4}
                    textAnchor="middle"
                    fill={mutedColor}
                    fontSize="10"
                    fontWeight="500"
                  >
                    {rel.label}
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}

        {/* Entities */}
        {entities.map((entity, i) => {
          const color = entity.color || colors[i % colors.length];
          const entityHeight = getEntityHeight(entity);

          return (
            <motion.g
              key={entity.id}
              filter="url(#erdShadow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 150 }}
              style={{ transformOrigin: `${entity.x + entityWidth / 2}px ${entity.y + entityHeight / 2}px` }}
            >
              {/* Entity background */}
              <rect
                x={entity.x}
                y={entity.y}
                width={entityWidth}
                height={entityHeight}
                rx={8}
                fill={bgColor}
                stroke={strokeColor}
                strokeWidth="1"
              />
              {/* Header */}
              <rect
                x={entity.x}
                y={entity.y}
                width={entityWidth}
                height={headerHeight}
                rx={8}
                fill={color}
              />
              <rect
                x={entity.x}
                y={entity.y + headerHeight - 8}
                width={entityWidth}
                height={8}
                fill={color}
              />
              <text
                x={entity.x + entityWidth / 2}
                y={entity.y + headerHeight / 2 + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize="13"
                fontWeight="700"
                filter="url(#erdTextShadow)"
              >
                {entity.name}
              </text>
              {/* Attributes */}
              {entity.attributes.map((attr, j) => (
                <g key={`${entity.id}-attr-${j}`}>
                  <text
                    x={entity.x + 12}
                    y={entity.y + headerHeight + 18 + j * attrHeight}
                    fill={isDark ? '#fff' : '#000'}
                    fontSize="11"
                    fontWeight={attr.isPrimary ? '600' : '400'}
                  >
                    {attr.isPrimary && '🔑 '}
                    {attr.isForeign && '🔗 '}
                    {attr.name}
                  </text>
                  <text
                    x={entity.x + entityWidth - 12}
                    y={entity.y + headerHeight + 18 + j * attrHeight}
                    textAnchor="end"
                    fill={mutedColor}
                    fontSize="10"
                  >
                    {attr.type}
                  </text>
                </g>
              ))}
            </motion.g>
          );
        })}
      </svg>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-8 w-full max-w-3xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {content}
      </div>
    </div>
  );
}

export default ERDiagram;
