'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface GraphNode {
  id: string;
  label: string;
  size?: number;
  color?: string;
}

interface GraphEdge {
  source: string;
  target: string;
  strength?: number;
}

interface ForceDirectedGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

// Seeded random for deterministic initial positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function ForceDirectedGraph({
  nodes,
  edges,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: ForceDirectedGraphProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

  const width = 500;
  const height = 400;

  // Calculate initial positions using seeded random for consistency
  const initialPositions = useMemo(() => {
    const pos: Record<string, { x: number; y: number; vx: number; vy: number }> = {};
    nodes.forEach((node, i) => {
      pos[node.id] = {
        x: width / 4 + seededRandom(i * 2) * width / 2,
        y: height / 4 + seededRandom(i * 2 + 1) * height / 2,
        vx: 0,
        vy: 0,
      };
    });
    return pos;
  }, [nodes]);

  const [positions, setPositions] = useState(initialPositions);

  // Simple force simulation
  useEffect(() => {
    let iterations = 0;
    const maxIterations = 100;

    const simulate = () => {
      if (iterations >= maxIterations) return;

      setPositions(prev => {
        const newPos = { ...prev };
        const damping = 0.9;
        const repulsion = 2000;
        const attraction = 0.01;
        const centerPull = 0.01;

        // Apply forces
        nodes.forEach(node => {
          let fx = 0;
          let fy = 0;

          // Center pull
          fx += (width / 2 - newPos[node.id].x) * centerPull;
          fy += (height / 2 - newPos[node.id].y) * centerPull;

          // Repulsion from other nodes
          nodes.forEach(other => {
            if (node.id === other.id) return;
            const dx = newPos[node.id].x - newPos[other.id].x;
            const dy = newPos[node.id].y - newPos[other.id].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = repulsion / (dist * dist);
            fx += (dx / dist) * force;
            fy += (dy / dist) * force;
          });

          // Attraction along edges
          edges.forEach(edge => {
            if (edge.source === node.id || edge.target === node.id) {
              const otherId = edge.source === node.id ? edge.target : edge.source;
              const dx = newPos[otherId].x - newPos[node.id].x;
              const dy = newPos[otherId].y - newPos[node.id].y;
              fx += dx * attraction * (edge.strength || 1);
              fy += dy * attraction * (edge.strength || 1);
            }
          });

          newPos[node.id] = {
            ...newPos[node.id],
            vx: (newPos[node.id].vx + fx) * damping,
            vy: (newPos[node.id].vy + fy) * damping,
          };
        });

        // Update positions
        nodes.forEach(node => {
          newPos[node.id] = {
            ...newPos[node.id],
            x: Math.max(50, Math.min(width - 50, newPos[node.id].x + newPos[node.id].vx)),
            y: Math.max(50, Math.min(height - 50, newPos[node.id].y + newPos[node.id].vy)),
          };
        });

        return newPos;
      });

      iterations++;
      if (iterations < maxIterations) {
        requestAnimationFrame(simulate);
      }
    };

    const timeoutId = setTimeout(simulate, 500);
    return () => clearTimeout(timeoutId);
  }, [nodes, edges]);

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

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
        {/* Edges */}
        {edges.map((edge, i) => (
          <motion.line
            key={`edge-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.3,
              x1: positions[edge.source]?.x || 0,
              y1: positions[edge.source]?.y || 0,
              x2: positions[edge.target]?.x || 0,
              y2: positions[edge.target]?.y || 0,
            }}
            transition={{ duration: 0.1 }}
            stroke={accentColor}
            strokeWidth={edge.strength || 2}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={node.id}>
            <motion.circle
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                cx: positions[node.id]?.x || 0,
                cy: positions[node.id]?.y || 0,
              }}
              transition={{ duration: 0.1, scale: { delay: 0.1 + i * 0.05, type: 'spring' } }}
              r={node.size || 15}
              fill={node.color || colors[i % colors.length]}
            />
            <motion.text
              animate={{
                x: positions[node.id]?.x || 0,
                y: (positions[node.id]?.y || 0) + (node.size || 15) + 15,
              }}
              transition={{ duration: 0.1 }}
              textAnchor="middle"
              fill={mutedColor}
              fontSize="10"
            >
              {node.label}
            </motion.text>
          </motion.g>
        ))}
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

export default ForceDirectedGraph;
