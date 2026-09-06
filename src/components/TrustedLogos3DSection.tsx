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

  // 3D Rolling Cylinder responsive radius is handled via .cylinder-stage CSS variables
  // to guarantee 100% byte-for-byte SSR hydration match without window.innerWidth divergence

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
        {/* MOBILE & TABLET: Continuous Infinite Auto-Scroll      */}
        {/* Multiple logos visible simultaneously, zero gap,      */}
        {/* silky-smooth 60fps continuous horizontal stream       */}
        {/* ---------------------------------------------------- */}
        <div className="block lg:hidden relative w-full overflow-hidden py-3 select-none">
          {/* Edge gradient fade masks */}
          <div className="absolute left-0 inset-y-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-12 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div
            className="flex w-max animate-marquee"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Track 1 */}
            <div className="flex shrink-0 items-center gap-3.5 sm:gap-4 pr-3.5 sm:pr-4">
              {CLIENT_LOGOS.map((logo) => (
                <AdaptiveLogoCard key={`mobile-t1-${logo.name}`} logo={logo} />
              ))}
            </div>
            {/* Track 2 (Duplicate for unbroken loop) */}
            <div className="flex shrink-0 items-center gap-3.5 sm:gap-4 pr-3.5 sm:pr-4" aria-hidden="true">
              {CLIENT_LOGOS.map((logo) => (
                <AdaptiveLogoCard key={`mobile-t2-${logo.name}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* DESKTOP EXPERIENCE: 3D Rolling Cylinder with Drag     */}
        {/* Balanced spacing between blades, zero cutoff         */}
        {/* ---------------------------------------------------- */}
        <div
          className="hidden lg:flex relative h-[165px] md:h-[180px] items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleDragEnd();
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
        >
          {/* Subtle bottom shadow floor */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-radial from-neutral-200/30 via-transparent to-transparent blur-md pointer-events-none" />

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
              className="cylinder-stage relative w-[165px] h-[74px]"
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
                      transform: `rotateY(${angle}deg) translateZ(var(--cylinder-radius, 480px))`,
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
      className="group relative flex flex-col items-center justify-center shrink-0 w-[135px] sm:w-[155px] md:w-[175px] h-[64px] sm:h-[72px] md:h-[78px] px-3 py-1.5 rounded-xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300 select-none"
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
