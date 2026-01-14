'use client';

import { motion } from 'framer-motion';

interface ScenarioData {
  title: string;
  description: string;
  outcome: string;
  highlighted?: boolean;
}

interface ScenarioCompareLayoutProps {
  headline?: string;
  scenarios: [ScenarioData, ScenarioData];
  accentColor?: string;
}

export function ScenarioCompareLayout({
  headline,
  scenarios,
  accentColor = '#88da1c',
}: ScenarioCompareLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full max-w-4xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`rounded-2xl overflow-hidden ${
                scenario.highlighted
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/5'
              }`}
            >
              <div
                className="h-1"
                style={{
                  backgroundColor: scenario.highlighted
                    ? accentColor
                    : 'rgba(255,255,255,0.1)',
                }}
              />

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: scenario.highlighted
                        ? `${accentColor}20`
                        : 'rgba(255,255,255,0.1)',
                      color: scenario.highlighted ? accentColor : 'white',
                    }}
                  >
                    Scenario {index + 1}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    color: scenario.highlighted ? accentColor : 'white',
                  }}
                >
                  {scenario.title}
                </h3>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  {scenario.description}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40 uppercase tracking-wider block mb-1">
                    Outcome
                  </span>
                  <span className="text-white/70 text-sm font-medium">
                    {scenario.outcome}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScenarioCompareLayout;
