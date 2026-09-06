import React from 'react';

interface LyzrLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'badge' | 'glyph' | 'default';
  inverted?: boolean;
}

export const LyzrLogo: React.FC<LyzrLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'default',
  inverted = false,
}) => {
  const sizeMap = {
    sm: { icon: 22, text: 'text-base', badge: 'w-7 h-7 rounded-lg' },
    md: { icon: 28, text: 'text-xl', badge: 'w-9 h-9 rounded-xl' },
    lg: { icon: 36, text: 'text-2xl', badge: 'w-11 h-11 rounded-2xl' },
    xl: { icon: 48, text: 'text-3xl', badge: 'w-14 h-14 rounded-2xl' },
  };

  const currentSize = sizeMap[size];

  // The authentic Lyzr emblem: stylized intersecting geometric origami ribbons with bottom accent point
  const renderGlyph = (widthHeight: number, forceColor?: string) => {
    const strokeColor = forceColor || (inverted ? '#FFFFFF' : '#0A0A0A');
    return (
      <svg
        width={widthHeight}
        height={widthHeight}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-label="Lyzr Brand Emblem"
      >
        {/* Stroke 1: Continuous diagonal from top-right antenna (66, 17) down-left to left apex (27, 58), then down-right to (51, 82) */}
        <path
          d="M66 17 L27 58 L51 82"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Stroke 2: Top-left antenna descending towards crossing */}
        <path
          d="M34 17 L46.5 29.5"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Stroke 3: Passing behind/over into right apex (73, 58) and turning down-left to (56, 75) */}
        <path
          d="M53.5 36.5 L73 58 L56 75"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Stroke 4: Distinct signature bottom accent dot */}
        <circle
          cx="42.5"
          cy="85.5"
          r="4"
          fill={strokeColor}
        />
      </svg>
    );
  };

  return (
    <div id="lyzr-brand-logo" className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
      {variant === 'badge' || variant === 'default' ? (
        <div
          className={`flex items-center justify-center p-1.5 transition-all duration-200 ${
            inverted
              ? 'bg-white border border-white/30 shadow-xs'
              : 'bg-white border border-black/15 shadow-xs hover:border-black'
          } ${currentSize.badge}`}
        >
          {/* Always render black emblem inside the white badge for maximum contrast */}
          {renderGlyph(currentSize.icon - 4, '#0A0A0A')}
        </div>
      ) : (
        renderGlyph(currentSize.icon)
      )}

      {showText && (
        <span
          className={`${currentSize.text} tracking-[-0.03em] font-bold ${
            inverted ? 'text-white' : 'text-[#0A0A0A]'
          } transition-colors`}
        >
          Lyzr
        </span>
      )}
    </div>
  );
};

