'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface FlowNode {
  id: string;
  label: string;
  type?: 'start' | 'end' | 'decision' | 'action';
}

interface FlowchartLayoutProps {
  headline?: string;
  nodes: FlowNode[];
  accentColor?: string;
}

export function FlowchartLayout({
  headline,
  nodes,
  accentColor = '#88da1c',
}: FlowchartLayoutProps) {
  const getNodeStyle = (type?: string) => {
    switch (type) {
      case 'start':
        return {
          background: accentColor,
          color: 'black',
          borderRadius: '9999px',
        };
      case 'end':
        return {
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          borderRadius: '9999px',
        };
      case 'decision':
        return {
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
          borderRadius: '8px',
          transform: 'rotate(0deg)',
          border: `2px solid ${accentColor}`,
        };
      default:
        return {
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
          borderRadius: '12px',
        };
    }
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full">
        {headline && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {headline}
          </motion.h2>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="px-6 py-3 text-sm font-medium"
                style={getNodeStyle(node.type)}
              >
                {node.label}
              </motion.div>

              {index < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                  className="mx-3"
                >
                  <ArrowRight size={20} style={{ color: accentColor }} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowchartLayout;
