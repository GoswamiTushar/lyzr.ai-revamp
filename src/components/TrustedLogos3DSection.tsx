import React, { useState, useEffect, useRef } from 'react';

export interface ClientLogoItem {
  name: string;
  src: string;
}

export const CLIENT_LOGOS: ClientLogoItem[] = [
  { name: 'Accenture', src: '/logos/logo-accenture.webp' },
  { name: 'AWS', src: '/logos/logo-aws.webp' },
  { name: 'KPMG', src: '/logos/logo-kpmg.webp' },
  { name: 'Crown Castle', src: '/logos/logo-crowncastle.webp' },
  { name: 'WTW', src: '/logos/logo-wtw.webp' },
  { name: 'Verifone', src: '/logos/logo-verifone.webp' },
  { name: 'Hitachi', src: '/logos/logo-hitachi.webp' },
  { name: 'Movate', src: '/logos/logo-movate.webp' },
  { name: 'Firstsource', src: '/logos/logo-firstsource.webp' },
  { name: 'Persistent', src: '/logos/logo-persistent.webp' },
  { name: 'MSP Corp', src: '/logos/logo-msp-corp.webp' },
  { name: 'AirAsia MOVE', src: '/logos/logo-airasia-move.webp' },
];

export const TrustedLogos3DSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const rotationRef = useRef(0);
  const autoSpinAnimRef = useRef<number | null>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  // Viewport intersection observer: only animate when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth, slow auto-rotation (~5.4 deg/sec) deferred after initial paint to prevent competing with FCP/LCP
  useEffect(() => {
    let lastTime = performance.now();
    const spinSpeed = 0.009; // degrees per ms
    let startTimer: NodeJS.Timeout;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isDraggingRef.current && !isPaused && isVisibleRef.current) {
        rotationRef.current = (rotationRef.current + spinSpeed * delta) % 360;
        if (cylinderRef.current) {
          cylinderRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }
      autoSpinAnimRef.current = requestAnimationFrame(tick);
    };

    // Defer start by 800ms so initial paint & LCP have 0 competing main-thread rAF ticks
    startTimer = setTimeout(() => {
      lastTime = performance.now();
      autoSpinAnimRef.current = requestAnimationFrame(tick);
    }, 800);

    return () => {
      clearTimeout(startTimer);
      if (autoSpinAnimRef.current) cancelAnimationFrame(autoSpinAnimRef.current);
    };
  }, [isPaused]);

  // Interactive mouse/touch drag
  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = clientX - startXRef.current;
    startXRef.current = clientX;
    rotationRef.current = (rotationRef.current + delta * 0.35) % 360;
    if (cylinderRef.current) {
      cylinderRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  // Cylinder radius calibrated to provide balanced, cohesive spacing without huge gaps or clipping
  const [cylinderRadius, setCylinderRadius] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w < 640) return 230;
      if (w < 1024) return 380;
    }
    return 480;
  });

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setCylinderRadius(230);
      else if (w < 1024) setCylinderRadius(380);
      else setCylinderRadius(480);
    };
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <div
      id="trusted-enterprises-3d"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none bg-transparent pt-2 sm:pt-6 pb-3 sm:pb-8"
      style={{ perspective: '1600px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Subtle eyebrow label for context */}
        <div className="text-center mb-1 sm:mb-0">
          <p className="text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400">
            Trusted by Leading Enterprise AI Teams
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* REACT BITS 3D ROLLING CYLINDER                       */}
        {/* Balanced spacing between blades, zero cutoff         */}
        {/* ---------------------------------------------------- */}
        <div
          className="relative h-[115px] sm:h-[165px] md:h-[180px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleDragEnd();
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {/* Subtle bottom shadow floor */}
          <div className="absolute inset-x-0 bottom-0 h-6 sm:h-8 bg-radial from-neutral-200/30 via-transparent to-transparent blur-md pointer-events-none" />

          {/* 3D Cylinder Stage with ample vertical headroom to prevent clipping */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              perspective: '1600px',
              transformStyle: 'preserve-3d',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            }}
          >
            <div
              ref={cylinderRef}
              className="relative w-[96px] sm:w-[150px] md:w-[165px] h-[50px] sm:h-[70px] md:h-[74px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(0deg)',
                willChange: 'transform',
              }}
            >
              {CLIENT_LOGOS.map((logo, index) => {
                const angle = (index * 360) / CLIENT_LOGOS.length;

                return (
                  <div
                    key={`cyl-${logo.name}`}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${angle}deg) translateZ(${cylinderRadius}px)`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <AdaptiveLogoCard logo={logo} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ----------------------------------------------------
// Clean Adaptive Logo Card Component
// Hidden backface prevents reverse mirrored bleed-through
// ----------------------------------------------------
interface AdaptiveLogoCardProps {
  logo: ClientLogoItem;
}

const AdaptiveLogoCard: React.FC<AdaptiveLogoCardProps> = ({ logo }) => {
  return (
    <div
      className="group relative flex flex-col items-center justify-center w-[135px] sm:w-[155px] md:w-[175px] h-[64px] sm:h-[72px] md:h-[78px] px-3 py-1.5 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300 select-none"
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Electric lime top indicator on hover */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-0 group-hover:w-8 h-[2px] bg-[#E5FE54] transition-all duration-300 rounded-full" />

      {/* Logo Image with brightness-0 filter for high contrast on light cards */}
      <div className="relative h-6 sm:h-7 md:h-8 w-full flex items-center justify-center">
        <img
          src={logo.src}
          alt={`${logo.name} logo`}
          width="120"
          height="32"
          className="max-h-full max-w-[82%] object-contain filter brightness-0 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 select-none pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Company Name */}
      <span className="text-[9px] sm:text-[9.5px] font-mono tracking-wider uppercase text-neutral-400 group-hover:text-neutral-800 transition-colors duration-200 mt-0.5">
        {logo.name}
      </span>
    </div>
  );
};
