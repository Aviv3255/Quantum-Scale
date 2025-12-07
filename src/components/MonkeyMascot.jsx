import React from 'react';

/**
 * MonkeyMascot - A custom animated monkey character for Quantum Scale
 * States: idle, waving, celebrating, thinking, pointing, sad
 */
export default function MonkeyMascot({
  state = 'idle',
  size = 120,
  className = ''
}) {
  // Animation styles based on state
  const getAnimationStyle = () => {
    switch (state) {
      case 'idle':
        return {
          animation: 'monkey-idle 2s ease-in-out infinite'
        };
      case 'waving':
        return {
          animation: 'monkey-wave 0.5s ease-in-out'
        };
      case 'celebrating':
        return {
          animation: 'monkey-celebrate 0.5s ease-in-out'
        };
      case 'thinking':
        return {
          animation: 'monkey-think 3s ease-in-out infinite'
        };
      case 'sad':
        return {
          animation: 'monkey-sad 2s ease-in-out infinite'
        };
      default:
        return {};
    }
  };

  // Eye expression based on state
  const getEyeExpression = () => {
    switch (state) {
      case 'celebrating':
        return { eyeScale: 1.1, eyeY: -2 };
      case 'sad':
        return { eyeScale: 0.9, eyeY: 2 };
      case 'thinking':
        return { eyeScale: 1, eyeY: 0, lookUp: true };
      default:
        return { eyeScale: 1, eyeY: 0 };
    }
  };

  const eyeExpr = getEyeExpression();

  return (
    <>
      <style>{`
        @keyframes monkey-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes monkey-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }

        @keyframes monkey-celebrate {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }

        @keyframes monkey-think {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }

        @keyframes monkey-sad {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        @keyframes arm-wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(30deg); }
        }

        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        .monkey-eye {
          animation: blink 4s ease-in-out infinite;
        }

        .monkey-arm-right.waving {
          animation: arm-wave 0.5s ease-in-out infinite;
          transform-origin: 145px 120px;
        }
      `}</style>

      <div className={className} style={getAnimationStyle()}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradient for fur */}
            <linearGradient id="furGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A0692E" />
              <stop offset="50%" stopColor="#8B5A2B" />
              <stop offset="100%" stopColor="#704214" />
            </linearGradient>

            {/* Gradient for face */}
            <radialGradient id="faceGradient" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#E8D4B8" />
              <stop offset="100%" stopColor="#D4A574" />
            </radialGradient>

            {/* Subtle shadow */}
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Body */}
          <ellipse
            cx="100"
            cy="145"
            rx="40"
            ry="45"
            fill="url(#furGradient)"
            filter="url(#dropShadow)"
          />

          {/* Belly */}
          <ellipse
            cx="100"
            cy="150"
            rx="28"
            ry="32"
            fill="#F5E6C8"
          />

          {/* Left Arm */}
          <path
            d="M 60 125 Q 35 145 45 175"
            stroke="url(#furGradient)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
          {/* Left Hand */}
          <circle cx="45" cy="175" r="10" fill="#D4A574" />

          {/* Right Arm - Can wave */}
          <g className={`monkey-arm-right ${state === 'waving' ? 'waving' : ''}`}>
            <path
              d="M 140 125 Q 165 145 155 175"
              stroke="url(#furGradient)"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right Hand */}
            <circle cx="155" cy="175" r="10" fill="#D4A574" />
          </g>

          {/* Head */}
          <circle
            cx="100"
            cy="70"
            r="48"
            fill="url(#furGradient)"
            filter="url(#dropShadow)"
          />

          {/* Left Ear */}
          <circle cx="52" cy="55" r="18" fill="url(#furGradient)" />
          <circle cx="52" cy="55" r="12" fill="#D4A574" />

          {/* Right Ear */}
          <circle cx="148" cy="55" r="18" fill="url(#furGradient)" />
          <circle cx="148" cy="55" r="12" fill="#D4A574" />

          {/* Face */}
          <ellipse
            cx="100"
            cy="78"
            rx="32"
            ry="28"
            fill="url(#faceGradient)"
          />

          {/* Eyes Container */}
          <g
            className="monkey-eye"
            style={{
              transform: `scale(${eyeExpr.eyeScale}) translateY(${eyeExpr.eyeY}px)`,
              transformOrigin: '100px 65px'
            }}
          >
            {/* Left Eye White */}
            <ellipse cx="82" cy="65" rx="10" ry="11" fill="#FFFFFF" />
            {/* Left Eye Pupil */}
            <circle
              cx={eyeExpr.lookUp ? "82" : "84"}
              cy={eyeExpr.lookUp ? "62" : "66"}
              r="6"
              fill="#2D2D2D"
            />
            {/* Left Eye Shine */}
            <circle cx="86" cy="63" r="2.5" fill="#FFFFFF" />

            {/* Right Eye White */}
            <ellipse cx="118" cy="65" rx="10" ry="11" fill="#FFFFFF" />
            {/* Right Eye Pupil */}
            <circle
              cx={eyeExpr.lookUp ? "118" : "120"}
              cy={eyeExpr.lookUp ? "62" : "66"}
              r="6"
              fill="#2D2D2D"
            />
            {/* Right Eye Shine */}
            <circle cx="122" cy="63" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Nose */}
          <ellipse cx="100" cy="82" rx="8" ry="5" fill="#5D4037" />

          {/* Mouth - Changes with state */}
          {state === 'celebrating' || state === 'waving' ? (
            // Happy smile
            <path
              d="M 85 95 Q 100 110 115 95"
              stroke="#5D4037"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          ) : state === 'sad' ? (
            // Sad frown
            <path
              d="M 85 100 Q 100 90 115 100"
              stroke="#5D4037"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          ) : state === 'thinking' ? (
            // Thinking expression - small 'o'
            <ellipse cx="100" cy="97" rx="5" ry="6" fill="#5D4037" />
          ) : (
            // Neutral slight smile
            <path
              d="M 88 95 Q 100 102 112 95"
              stroke="#5D4037"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* Eyebrows - Express emotion */}
          {state === 'sad' && (
            <>
              <line x1="74" y1="52" x2="88" y2="56" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="126" y1="52" x2="112" y2="56" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {state === 'thinking' && (
            <>
              <line x1="74" y1="55" x2="90" y2="52" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
              <line x1="126" y1="55" x2="110" y2="52" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Cheek blush for happy states */}
          {(state === 'celebrating' || state === 'waving') && (
            <>
              <ellipse cx="68" cy="80" rx="8" ry="5" fill="#FFCDD2" opacity="0.5" />
              <ellipse cx="132" cy="80" rx="8" ry="5" fill="#FFCDD2" opacity="0.5" />
            </>
          )}
        </svg>
      </div>
    </>
  );
}
