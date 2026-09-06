'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface HeroAuroraProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const HeroAurora: React.FC<HeroAuroraProps> = ({ containerRef }) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.4 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const targetPos = useRef({ x: 0.5, y: 0.4 });
  const currentPos = useRef({ x: 0.5, y: 0.4 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch or mobile device
    const mobileCheck = window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches;
    setIsMobile(mobileCheck);

    if (mobileCheck) {
      return;
    }

    const targetElement = containerRef?.current || document.getElementById('hero');
    if (!targetElement) return;

    const animate = () => {
      const ease = 0.08;
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      if (Math.abs(dx) > 0.0008 || Math.abs(dy) > 0.0008) {
        currentPos.current.x += dx * ease;
        currentPos.current.y += dy * ease;
        setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
        requestRef.current = requestAnimationFrame(animate);
      } else {
        requestRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = targetElement.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      targetPos.current = { x, y };
      if (!isHovered) setIsHovered(true);

      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      targetPos.current = { x: 0.5, y: 0.4 };
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    targetElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    targetElement.addEventListener('mouseenter', handleMouseEnter);
    targetElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      targetElement.removeEventListener('mousemove', handleMouseMove);
      targetElement.removeEventListener('mouseenter', handleMouseEnter);
      targetElement.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [containerRef, isHovered]);

  // Dynamic calculations based on mouse coordinates
  const offsetX = (mousePos.x - 0.5) * 80;
  const offsetY = (mousePos.y - 0.5) * 60;
  const spotlightX = mousePos.x * 100;
  const spotlightY = mousePos.y * 100;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none transition-opacity duration-700"
      aria-hidden="true"
    >
      {/* 1. Base Ambient Aurora Light Bands (CSS Animated Flow) */}
      <div
        className="absolute -top-[25%] -left-[15%] w-[130%] h-[120%] opacity-45 sm:opacity-55 filter blur-[65px] sm:blur-[90px] will-change-transform"
        style={{
          transform: `translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Band A: Primary Electric Lime (#E5FE54) Ribbon */}
        <motion.div
          animate={
            isMobile
              ? undefined
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -35, 25, 0],
                  scale: isHovered ? [1, 1.08, 1] : [1, 1.03, 1],
                  rotate: [0, 6, -4, 0],
                }
          }
          transition={
            isMobile
              ? undefined
              : {
                  duration: isHovered ? 12 : 18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          className="absolute top-[10%] right-[15%] w-[450px] sm:w-[680px] h-[350px] sm:h-[480px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(229, 254, 84, 0.42) 0%, rgba(229, 254, 84, 0.18) 45%, transparent 75%)',
          }}
        />

        {/* Band B: Deep Cyber Emerald / Mint Aurora Ribbon */}
        <motion.div
          animate={
            isMobile
              ? undefined
              : {
                  x: [0, -45, 35, 0],
                  y: [0, 30, -20, 0],
                  scale: [1, 1.1, 0.95, 1],
                  rotate: [0, -8, 5, 0],
                }
          }
          transition={
            isMobile
              ? undefined
              : {
                  duration: isHovered ? 14 : 22,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }
          }
          className="absolute top-[25%] left-[20%] w-[400px] sm:w-[600px] h-[320px] sm:h-[450px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.28) 0%, rgba(52, 211, 153, 0.12) 50%, transparent 75%)',
          }}
        />

        {/* Band C: Cool Atmospheric Sky Cyan Glow */}
        <motion.div
          animate={
            isMobile
              ? undefined
              : {
                  x: [0, 25, -40, 0],
                  y: [0, -20, 35, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={
            isMobile
              ? undefined
              : {
                  duration: 16,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }
          }
          className="absolute top-[5%] left-[45%] w-[380px] sm:w-[520px] h-[280px] sm:h-[380px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.08) 55%, transparent 75%)',
          }}
        />
      </div>

      {/* 2. Interactive Aurora Spotlight that dynamically warps and follows mouse cursor */}
      {!isMobile && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.85 : 0.35,
            background: `radial-gradient(600px circle at ${spotlightX}% ${spotlightY}%, rgba(229, 254, 84, 0.16) 0%, rgba(16, 185, 129, 0.08) 35%, transparent 70%)`,
          }}
        />
      )}

      {/* 3. Subtle chromatic shimmer beam on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[380px] transition-all duration-700 pointer-events-none ${
          isHovered ? 'opacity-30' : 'opacity-15'
        }`}
        style={{
          background: `conic-gradient(from ${mousePos.x * 120}deg at ${spotlightX}% ${spotlightY}%, transparent 0deg, rgba(229, 254, 84, 0.15) 60deg, rgba(16, 185, 129, 0.1) 120deg, transparent 180deg)`,
          filter: 'blur(70px)',
        }}
      />

      {/* 4. Bottom Vignette Mask to blend gently into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
    </div>
  );
};
