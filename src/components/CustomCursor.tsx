'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);

  // Direct mouse coordinates (zero lag)
  const mouseRef = useRef({ x: -100, y: -100 });
  // Lerped smooth follower coordinates
  const followerRef = useRef({ x: -100, y: -100 });
  // Trailing history points for trailing comet / particle ribbon
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const nextPointId = useRef(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop/mouse/trackpad)
    // Never on mobile/touch screens to ensure 100% responsiveness and touch usability
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsEnabled(true);
    document.body.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-interactive]')
        );
        const isInput = Boolean(target.closest('input, textarea, [contenteditable="true"]'));
        setIsHovered(isInteractive);
        setIsTextHover(isInput);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Animation loop for lerped follower and trailing ribbon
    let lastTrailTime = 0;
    const animate = (time: number) => {
      // Lerp follower toward mouse coordinates
      const lerp = 0.18;
      followerRef.current.x += (mouseRef.current.x - followerRef.current.x) * lerp;
      followerRef.current.y += (mouseRef.current.y - followerRef.current.y) * lerp;

      // Append trailing points periodically (every ~35ms)
      if (time - lastTrailTime > 32 && isVisible) {
        lastTrailTime = time;
        // Only add if moving
        const dx = mouseRef.current.x - (trailRef.current[0]?.x ?? 0);
        const dy = mouseRef.current.y - (trailRef.current[0]?.y ?? 0);
        if (Math.hypot(dx, dy) > 3) {
          const newPoint: TrailPoint = {
            x: followerRef.current.x,
            y: followerRef.current.y,
            id: nextPointId.current++,
          };
          // Keep up to 6 trailing points
          trailRef.current = [newPoint, ...trailRef.current.slice(0, 5)];
          setTrailPoints([...trailRef.current]);
        }
      }

      // Update follower DOM directly for 60fps jitter-free transform
      const followerEl = document.getElementById('custom-cursor-follower');
      const dotEl = document.getElementById('custom-cursor-dot');
      if (followerEl) {
        followerEl.style.transform = `translate3d(${followerRef.current.x}px, ${followerRef.current.y}px, 0)`;
      }
      if (dotEl) {
        dotEl.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Trailing Particle / Ribbon Trail */}
      {trailPoints.map((point, index) => {
        // Fading scale and opacity down the tail
        const scale = Math.max(0.2, 1 - index * 0.16);
        const opacity = Math.max(0.1, 0.65 - index * 0.12);
        return (
          <div
            key={point.id}
            className="absolute top-0 left-0 w-3 h-3 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-[#E5FE54] blur-[1px] transition-transform duration-75"
            style={{
              transform: `translate3d(${point.x}px, ${point.y}px, 0) scale(${scale})`,
              opacity: opacity,
              boxShadow: '0 0 8px rgba(229, 254, 84, 0.6)',
            }}
          />
        );
      })}

      {/* 2. Lerped Follower Ring */}
      <div
        id="custom-cursor-follower"
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isTextHover
            ? 'w-1 h-6 rounded-none bg-neutral-900 border-neutral-900'
            : isHovered
            ? 'w-12 h-12 bg-[#E5FE54]/15 border-[#E5FE54] shadow-[0_0_20px_rgba(229,254,84,0.45)]'
            : isClicking
            ? 'w-7 h-7 bg-neutral-900/10 border-neutral-900 scale-90'
            : 'w-9 h-9 bg-black/[0.03] border-neutral-800/60'
        }`}
      >
        {/* Subtle inner focal ring when hovering */}
        {isHovered && !isTextHover && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5FE54] animate-ping opacity-60" />
        )}
      </div>

      {/* 3. Instant Core Precision Dot */}
      <div
        id="custom-cursor-dot"
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform rounded-full transition-all duration-100 ${
          isTextHover
            ? 'opacity-0'
            : isHovered
            ? 'w-2 h-2 bg-[#0A0A0A] shadow-[0_0_6px_#E5FE54]'
            : isClicking
            ? 'w-3 h-3 bg-[#E5FE54] shadow-[0_0_10px_#E5FE54]'
            : 'w-2 h-2 bg-[#0A0A0A] border border-white/80 shadow-[0_0_4px_rgba(0,0,0,0.3)]'
        }`}
      />
    </div>
  );
};
