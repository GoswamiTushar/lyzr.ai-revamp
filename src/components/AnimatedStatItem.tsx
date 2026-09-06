'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedStatItemProps {
  value: string;
  label: string;
  isInView: boolean;
}

export const AnimatedStatItem: React.FC<AnimatedStatItemProps> = ({
  value,
  label,
  isInView,
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Parse value to see if numeric or formatted
    const raw = value.trim();
    const sanitized = raw.replace(/,/g, '');
    const match = sanitized.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);

    if (!match) {
      // Non-numeric values (e.g. "Git-native", "Any")
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const hasComma = raw.includes(',');
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    const startZero = decimals > 0 ? (0).toFixed(decimals) : '0';

    // If out of view, reset to zero so it's ready to count up fresh next time it scrolls into view
    if (!isInView) {
      setDisplayValue(`${prefix}${startZero}${suffix}`);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200; // 1.2s smooth count-up
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural decelerating momentum
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = target * easeOut;

      let formattedNum: string;
      if (decimals > 0) {
        formattedNum = currentNum.toFixed(decimals);
      } else {
        const rounded = Math.round(currentNum);
        formattedNum = hasComma ? rounded.toLocaleString('en-US') : rounded.toString();
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        // Ensure exact target precision at completion
        setDisplayValue(value);
      }
    };

    // Initialize from 0
    setDisplayValue(`${prefix}${startZero}${suffix}`);
    animationFrameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, isInView]);

  return (
    <div className="group cursor-pointer p-2.5 sm:p-3 -m-2 sm:-m-2.5 rounded-xl transition-all duration-300 hover:bg-neutral-50/90 select-none">
      {/* 
        Number with interactive color-shift on mouse hover:
        Default: text-neutral-950 (obsidian)
        Hover: text-emerald-600 with electric lime ambient glow
      */}
      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 font-sans tracking-tight transition-all duration-250 group-hover:text-emerald-600 group-hover:drop-shadow-[0_2px_10px_rgba(229,254,84,0.6)]">
        {displayValue}
      </div>

      {/* 
        Label with subtle darkening on hover
      */}
      <div className="text-xs sm:text-sm text-neutral-600 font-medium leading-snug mt-1.5 transition-colors duration-250 group-hover:text-neutral-950">
        {label}
      </div>

      {/* Symmetrical hover accent underline */}
      <div className="h-0.5 w-0 group-hover:w-8 bg-[#E5FE54] transition-all duration-300 mt-2 rounded-full mx-auto md:mx-0" />
    </div>
  );
};
