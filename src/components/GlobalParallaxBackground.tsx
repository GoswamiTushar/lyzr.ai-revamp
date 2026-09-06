'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export const GlobalParallaxBackground: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768 && window.matchMedia('(pointer: fine)').matches);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });

  // Deep background grid - slower subtle drift
  const gridY = useTransform(smoothProgress, [0, 1], [0, 380]);
  
  // Floating ambient light orbs at different depths for full 3D spatial presence
  const orb1Y = useTransform(smoothProgress, [0, 1], [-60, 500]);
  const orb1X = useTransform(smoothProgress, [0, 1], [0, -70]);
  const orb1Scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.25, 0.95]);

  const orb2Y = useTransform(smoothProgress, [0, 1], [300, -350]);
  const orb2X = useTransform(smoothProgress, [0, 1], [0, 90]);

  const orb3Y = useTransform(smoothProgress, [0, 1], [700, 150]);
  const orb3Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.3, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Deep Parallax Coordinate Dot Matrix */}
      <motion.div
        style={isDesktop ? { y: gridY } : undefined}
        className="absolute inset-x-0 -top-40 -bottom-40 bg-dot-grid opacity-60 pointer-events-none"
      />

      {/* 2. Floating 3D Ambient Orbs */}
      {/* Top right Lyzr Electric Lime Glow */}
      <motion.div
        style={isDesktop ? { y: orb1Y, x: orb1X, scale: orb1Scale } : undefined}
        className="absolute -top-24 right-8 w-[380px] sm:w-[550px] h-[380px] sm:h-[550px] rounded-full bg-gradient-to-br from-[#E5FE54]/25 via-[#E5FE54]/8 to-transparent blur-[80px] sm:blur-[110px]"
      />

      {/* Mid-page architectural amber-gold atmosphere */}
      <motion.div
        style={isDesktop ? { y: orb2Y, x: orb2X } : undefined}
        className="absolute top-[35%] -left-28 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-amber-400/15 via-amber-200/5 to-transparent blur-[80px] sm:blur-[120px]"
      />

      {/* Lower-page deep platinum aura */}
      <motion.div
        style={isDesktop ? { y: orb3Y, scale: orb3Scale } : undefined}
        className="absolute top-[65%] right-[12%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-bl from-neutral-300/25 via-emerald-100/15 to-transparent blur-[70px] sm:blur-[100px]"
      />
    </div>
  );
};
