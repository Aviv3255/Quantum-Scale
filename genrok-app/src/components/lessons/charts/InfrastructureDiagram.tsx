'use client';

import { motion } from 'framer-motion';

interface InfraComponent {
  id: string;
  name: string;
  type: 'vpc' | 'subnet' | 'ec2' | 'rds' | 's3' | 'lambda' | 'apigateway' | 'cloudfront' | 'elb' | 'nat' | 'igw' | 'container';
  x: number;
  y: number;
  width?: number;
  height?: number;
  zone?: string;
  color?: string;
}

interface InfraConnection {
  from: string;
  to: string;
  label?: string;
  type?: 'data' | 'request' | 'internal';
}

interface InfraRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

interface InfrastructureDiagramProps {
  components: InfraComponent[];
  connections: InfraConnection[];
  regions?: InfraRegion[];
  title?: string;
  provider?: 'aws' | 'azure' | 'gcp' | 'generic';
  variant?: 'dark' | 'light';
}

export function InfrastructureDiagram({
  components,
  connections,
  regions = [],
  title,
  provider = 'generic',
  variant = 'dark',
}: InfrastructureDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const strokeColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  const providerColors: Record<string, Record<string, string>> = {
    aws: {
      vpc: '#FF9900',
      subnet: '#FF9900',
      ec2: '#FF9900',
      rds: '#3B48CC',
      s3: '#569A31',
      lambda: '#FF9900',
      apigateway: '#FF4F8B',
      cloudfront: '#8C4FFF',
      elb: '#FF9900',
      nat: '#FF9900',
      igw: '#FF9900',
      container: '#FF9900',
    },
    azure: {
      vpc: '#0089D6',
      subnet: '#0089D6',
      ec2: '#0089D6',
      rds: '#0089D6',
      s3: '#0089D6',
      lambda: '#0089D6',
      apigateway: '#0089D6',
      cloudfront: '#0089D6',
      elb: '#0089D6',
      nat: '#0089D6',
      igw: '#0089D6',
      container: '#0089D6',
    },
    gcp: {
      vpc: '#4285F4',
      subnet: '#4285F4',
      ec2: '#4285F4',
      rds: '#4285F4',
      s3: '#4285F4',
      lambda: '#4285F4',
      apigateway: '#4285F4',
      cloudfront: '#4285F4',
      elb: '#4285F4',
      nat: '#4285F4',
      igw: '#4285F4',
      container: '#4285F4',
    },
    generic: {
      vpc: '#88da1c',
      subnet: '#22C55E',
      ec2: '#3B82F6',
      rds: '#A855F7',
      s3: '#F59E0B',
      lambda: '#EF4444',
      apigateway: '#EC4899',
      cloudfront: '#8B5CF6',
      elb: '#06B6D4',
      nat: '#84CC16',
      igw: '#10B981',
      container: '#F97316',
    },
  };

  const colors = providerColors[provider] || providerColors.generic;

  const width = 750;
  const height = 500;
  const defaultCompWidth = 70;
  const defaultCompHeight = 50;

  const getIcon = (type: string) => {
    switch (type) {
      case 'ec2':
        return '🖥️';
      case 'rds':
        return '🗄️';
      case 's3':
        return '📦';
      case 'lambda':
        return 'λ';
      case 'apigateway':
        return '🚪';
      case 'cloudfront':
        return '🌐';
      case 'elb':
        return '⚖️';
      case 'nat':
        return '🔄';
      case 'igw':
        return '🌍';
      case 'container':
        return '📦';
      default:
        return '☁️';
    }
  };

  const getComponentCenter = (comp: InfraComponent) => ({
    x: comp.x + (comp.width || defaultCompWidth) / 2,
    y: comp.y + (comp.height || defaultCompHeight) / 2,
  });

  const getConnectionPath = (conn: InfraConnection) => {
    const fromComp = components.find(c => c.id === conn.from);
    const toComp = components.find(c => c.id === conn.to);
    if (!fromComp || !toComp) return { path: '', labelPos: { x: 0, y: 0 } };

    const from = getComponentCenter(fromComp);
    const to = getComponentCenter(toComp);

    const fromW = (fromComp.width || defaultCompWidth) / 2;
    const fromH = (fromComp.height || defaultCompHeight) / 2;
    const toW = (toComp.width || defaultCompWidth) / 2;
    const toH = (toComp.height || defaultCompHeight) / 2;

    const dx = to.x - from.x;
    const dy = to.y - from.y;

    let startX = from.x + (dx > 0 ? fromW : -fromW);
    let startY = from.y;
    let endX = to.x + (dx > 0 ? -toW : toW);
    let endY = to.y;

    if (Math.abs(dy) > Math.abs(dx)) {
      startX = from.x;
      startY = from.y + (dy > 0 ? fromH : -fromH);
      endX = to.x;
      endY = to.y + (dy > 0 ? -toH : toH);
    }

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    const path = `M ${startX} ${startY} L ${endX} ${endY}`;

    return {
      path,
      labelPos: { x: midX, y: midY - 8 },
    };
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
        <defs>
          <marker
            id="infraArrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={strokeColor} />
          </marker>
          <filter id="infraShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Regions/VPCs */}
        {regions.map((region, i) => (
          <motion.g key={region.id}>
            <motion.rect
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              x={region.x}
              y={region.y}
              width={region.width}
              height={region.height}
              rx={12}
              fill="transparent"
              stroke={region.color || (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')}
              strokeWidth="2"
              strokeDasharray="8,4"
            />
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              x={region.x + 12}
              y={region.y + 20}
              fill={mutedColor}
              fontSize="11"
              fontWeight="600"
            >
              {region.name}
            </motion.text>
          </motion.g>
        ))}

        {/* Connections */}
        {connections.map((conn, i) => {
          const { path, labelPos } = getConnectionPath(conn);
          const isInternal = conn.type === 'internal';

          return (
            <motion.g key={`conn-${i}`}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                d={path}
                stroke={strokeColor}
                strokeWidth="2"
                strokeDasharray={isInternal ? '4,2' : 'none'}
                fill="none"
                markerEnd="url(#infraArrow)"
              />
              {conn.label && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fill={mutedColor}
                  fontSize="9"
                  fontWeight="500"
                >
                  {conn.label}
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* Components */}
        {components.map((comp, i) => {
          const color = comp.color || colors[comp.type] || '#88da1c';
          const compWidth = comp.width || defaultCompWidth;
          const compHeight = comp.height || defaultCompHeight;

          return (
            <motion.g key={comp.id} filter="url(#infraShadow)">
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${comp.x + compWidth / 2}px ${comp.y + compHeight / 2}px` }}
              >
                <rect
                  x={comp.x}
                  y={comp.y}
                  width={compWidth}
                  height={compHeight}
                  rx={8}
                  fill={color}
                />
                <text
                  x={comp.x + compWidth / 2}
                  y={comp.y + compHeight / 2 - 2}
                  textAnchor="middle"
                  fontSize="18"
                >
                  {getIcon(comp.type)}
                </text>
                <text
                  x={comp.x + compWidth / 2}
                  y={comp.y + compHeight + 14}
                  textAnchor="middle"
                  fill={isDark ? '#fff' : '#000'}
                  fontSize="9"
                  fontWeight="500"
                >
                  {comp.name}
                </text>
                {comp.zone && (
                  <text
                    x={comp.x + compWidth / 2}
                    y={comp.y + compHeight + 26}
                    textAnchor="middle"
                    fill={mutedColor}
                    fontSize="8"
                  >
                    {comp.zone}
                  </text>
                )}
              </motion.g>
            </motion.g>
          );
        })}
      </svg>

      {/* Provider Badge */}
      {provider !== 'generic' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-4"
        >
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              isDark ? 'bg-white/10 text-white/70' : 'bg-black/5 text-black/60'
            }`}
          >
            {provider.toUpperCase()} Infrastructure
          </span>
        </motion.div>
      )}
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

export default InfrastructureDiagram;
