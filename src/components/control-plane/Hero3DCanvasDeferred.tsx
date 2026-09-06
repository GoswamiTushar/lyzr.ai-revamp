'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { WingPosition } from '../Hero3DCanvas';
import { LyzrLogo } from '../LyzrLogo';

// Dynamically import the heavy Three.js canvas component
const Hero3DCanvas = dynamic(
  () => import('../Hero3DCanvas').then((mod) => mod.Hero3DCanvas),
  {
    ssr: false,
    loading: () => <Hero3DPlaceholder />,
  }
);

interface Hero3DCanvasDeferredProps {
  activeLayerIndex?: number;
  scrollProgress?: number;
  onActiveWingPositionChange?: (pos: WingPosition) => void;
  className?: string;
}

const Hero3DPlaceholder: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
      {/* Soft ambient pedestal glow */}
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#E5FE54]/10 blur-2xl pointer-events-none animate-pulse" />
      <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
        <div className="opacity-80 scale-125">
          <LyzrLogo size="lg" showText={false} />
        </div>
        <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">
          Initializing 3D Control Plane...
        </span>
      </div>
    </div>
  );
};

export const Hero3DCanvasDeferred: React.FC<Hero3DCanvasDeferredProps> = (props) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is unavailable or if already triggered, load immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        // Generous 450px threshold so 3D model is ready before user arrives
        rootMargin: '450px 0px',
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      {shouldLoad ? (
        <Hero3DCanvas {...props} />
      ) : (
        <Hero3DPlaceholder />
      )}
    </div>
  );
};
