'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface WordCloudWord {
  text: string;
  weight: number;
  color?: string;
}

interface WordCloudProps {
  words: WordCloudWord[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

// Seeded random for deterministic positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function WordCloud({
  words,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: WordCloudProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';

  const width = 500;
  const height = 350;
  const cx = width / 2;
  const cy = height / 2;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EC4899', '#06B6D4'];

  // Sort by weight and limit
  const sortedWords = useMemo(() =>
    [...words].sort((a, b) => b.weight - a.weight).slice(0, 30),
    [words]
  );

  const placements = useMemo(() => {
    if (sortedWords.length === 0) return [];

    const maxWeight = Math.max(...sortedWords.map(w => w.weight));
    const minWeight = Math.min(...sortedWords.map(w => w.weight));
    const result: { word: WordCloudWord; x: number; y: number; fontSize: number; rotation: number }[] = [];

    sortedWords.forEach((word, i) => {
      const weightRatio = maxWeight === minWeight ? 0.5 : (word.weight - minWeight) / (maxWeight - minWeight);
      const fontSize = 12 + weightRatio * 28;

      // Spiral positioning with seeded random for consistency
      const angle = i * 0.7;
      const radius = 15 + i * 8;
      const x = cx + radius * Math.cos(angle) + (seededRandom(i * 3) - 0.5) * 40;
      const y = cy + radius * Math.sin(angle) + (seededRandom(i * 3 + 1) - 0.5) * 30;
      const rotation = (seededRandom(i * 3 + 2) - 0.5) * 30;

      result.push({
        word,
        x: Math.max(60, Math.min(width - 60, x)),
        y: Math.max(40, Math.min(height - 40, y)),
        fontSize,
        rotation,
      });
    });

    return result;
  }, [sortedWords, cx, cy]);

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
        {placements.map((p, i) => (
          <motion.text
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.03, type: 'spring' }}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={p.word.color || colors[i % colors.length]}
            fontSize={p.fontSize}
            fontWeight={p.fontSize > 25 ? 'bold' : 'normal'}
            transform={`rotate(${p.rotation}, ${p.x}, ${p.y})`}
            style={{
              transformOrigin: `${p.x}px ${p.y}px`,
              fontFamily: "'General Sans', sans-serif",
            }}
          >
            {p.word.text}
          </motion.text>
        ))}
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

export default WordCloud;
