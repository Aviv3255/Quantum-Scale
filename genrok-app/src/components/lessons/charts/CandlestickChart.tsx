'use client';

import { motion } from 'framer-motion';

interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: CandleData[];
  title?: string;
  upColor?: string;
  downColor?: string;
}

export function CandlestickChart({
  data,
  title,
  upColor = '#22C55E',
  downColor = '#EF4444',
}: CandlestickChartProps) {
  const width = 500;
  const height = 300;
  const padding = 50;

  const allPrices = data.flatMap(d => [d.open, d.high, d.low, d.close]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const scaleY = (val: number) =>
    height - padding - ((val - minPrice) / (maxPrice - minPrice)) * (height - 2 * padding);

  const candleWidth = Math.min(20, (width - 2 * padding) / data.length - 4);

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
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
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct, i) => (
            <motion.line
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              x1={padding}
              y1={padding + ((height - 2 * padding) * pct) / 100}
              x2={width - padding}
              y2={padding + ((height - 2 * padding) * pct) / 100}
              stroke="rgba(255,255,255,0.1)"
            />
          ))}

          {/* Y axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

          {/* Candles */}
          {data.map((candle, i) => {
            const isUp = candle.close >= candle.open;
            const color = isUp ? upColor : downColor;
            const centerX = padding + ((i + 0.5) * (width - 2 * padding)) / data.length;
            const bodyTop = scaleY(Math.max(candle.open, candle.close));
            const bodyBottom = scaleY(Math.min(candle.open, candle.close));
            const bodyHeight = bodyBottom - bodyTop;

            return (
              <motion.g key={i}>
                {/* Wick */}
                <motion.line
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.1 + i * 0.02 }}
                  x1={centerX}
                  y1={scaleY(candle.high)}
                  x2={centerX}
                  y2={scaleY(candle.low)}
                  stroke={color}
                  strokeWidth="2"
                />

                {/* Body */}
                <motion.rect
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.15 + i * 0.02 }}
                  x={centerX - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={Math.max(bodyHeight, 2)}
                  fill={isUp ? color : color}
                  stroke={color}
                  strokeWidth="1"
                  rx="2"
                />
              </motion.g>
            );
          })}

          {/* Y axis labels */}
          {[0, 0.5, 1].map((pct, i) => {
            const value = minPrice + pct * (maxPrice - minPrice);
            return (
              <text
                key={i}
                x={padding - 10}
                y={scaleY(value) + 4}
                textAnchor="end"
                fill="rgba(255,255,255,0.5)"
                fontSize="10"
              >
                ${value.toFixed(0)}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default CandlestickChart;
