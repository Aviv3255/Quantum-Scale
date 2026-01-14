'use client';

import { useState, useMemo } from 'react';

interface ChartDataPoint {
  date: string;
  day: string;
  count: number;
  cumulative: number;
}

type TimePeriod = 'week' | 'month' | 'max';

interface StatisticsChartProps {
  getDataByDays: (days: number) => ChartDataPoint[];
  totalCompleted: number;
  totalLessons: number;
}

export function StatisticsChart({ getDataByDays, totalCompleted, totalLessons }: StatisticsChartProps) {
  const [period, setPeriod] = useState<TimePeriod>('week');

  // Get data based on selected period
  const chartData = useMemo(() => {
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
    return getDataByDays(days);
  }, [period, getDataByDays]);

  // Generate SVG path for the area chart
  const { linePath, areaPath, points } = useMemo(() => {
    if (chartData.length === 0) {
      return { linePath: '', areaPath: '', points: [] };
    }

    const width = 280;
    const height = 120;
    const padding = { top: 10, right: 10, bottom: 10, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Get min/max for scaling
    const values = chartData.map(d => d.cumulative);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    // Generate points
    const pts = chartData.map((d, i) => {
      const x = padding.left + (i / (chartData.length - 1 || 1)) * chartWidth;
      const y = padding.top + chartHeight - ((d.cumulative - minVal) / range) * chartHeight;
      return { x, y, data: d };
    });

    // Create smooth curve using cardinal spline
    const tension = 0.3;
    let linePath = '';
    let areaPath = '';

    if (pts.length > 0) {
      // Start path
      linePath = `M ${pts[0].x} ${pts[0].y}`;
      areaPath = `M ${pts[0].x} ${height - padding.bottom} L ${pts[0].x} ${pts[0].y}`;

      // Create smooth curve
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(pts.length - 1, i + 2)];

        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;

        linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        areaPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }

      // Close area path
      areaPath += ` L ${pts[pts.length - 1].x} ${height - padding.bottom} Z`;
    }

    return { linePath, areaPath, points: pts };
  }, [chartData]);

  // Get labels for x-axis
  const xLabels = useMemo(() => {
    if (chartData.length === 0) return [];

    if (period === 'week') {
      return chartData.map(d => d.day.toLowerCase());
    } else if (period === 'month') {
      // Show every 5th day
      return chartData.filter((_, i) => i % 5 === 0 || i === chartData.length - 1)
        .map(d => {
          const date = new Date(d.date);
          return `${date.getDate()}/${date.getMonth() + 1}`;
        });
    } else {
      // Show monthly labels for max view
      return chartData.filter((_, i) => i % 15 === 0 || i === chartData.length - 1)
        .map(d => {
          const date = new Date(d.date);
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return months[date.getMonth()];
        });
    }
  }, [chartData, period]);

  const lastPoint = points[points.length - 1];

  return (
    <div className="statistics-chart-card">
      {/* Header with title and period tabs */}
      <div className="statistics-chart-header">
        <h3 className="statistics-chart-title">Lessons Completed</h3>
        <div className="statistics-period-tabs">
          <button
            className={`statistics-period-tab ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            Week
          </button>
          <button
            className={`statistics-period-tab ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
          <button
            className={`statistics-period-tab ${period === 'max' ? 'active' : ''}`}
            onClick={() => setPeriod('max')}
          >
            Max
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="statistics-chart-container">
        <svg viewBox="0 0 280 120" className="statistics-chart-svg">
          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(136, 218, 28, 0.4)" />
              <stop offset="50%" stopColor="rgba(136, 218, 28, 0.15)" />
              <stop offset="100%" stopColor="rgba(136, 218, 28, 0)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <g className="chart-grid">
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="10"
                y1={10 + (i * 100 / 3)}
                x2="270"
                y2={10 + (i * 100 / 3)}
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Area fill */}
          {areaPath && (
            <path
              d={areaPath}
              fill="url(#chartGradient)"
              className="chart-area"
            />
          )}

          {/* Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#88da1c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line"
            />
          )}

          {/* Glowing dot at the end */}
          {lastPoint && (
            <g filter="url(#glow)">
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r="6"
                fill="#88da1c"
                className="chart-dot-outer"
              />
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r="3"
                fill="#ffffff"
                className="chart-dot-inner"
              />
            </g>
          )}
        </svg>

        {/* X-axis labels */}
        <div className="statistics-chart-labels">
          {xLabels.map((label, i) => (
            <span key={i} className="statistics-chart-label">{label}</span>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="statistics-summary-simple">
        <span className="statistics-progress-text">{totalCompleted}/{totalLessons} lessons completed</span>
      </div>
    </div>
  );
}
