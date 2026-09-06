'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPLIANCE_ITEMS, ComplianceCard } from './security/ComplianceCard';

export const SecurityGovernanceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Desktop scroll-driven spotlight tracking
  const [activeDesktopIndex, setActiveDesktopIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax scroll effect matching Footer section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });
  const dotParallaxY = useTransform(smoothProgress, [0, 1], [-90, 90]);
  const orbParallaxY = useTransform(smoothProgress, [0, 1], [80, -80]);
  const secondaryOrbParallaxY = useTransform(smoothProgress, [0, 1], [-60, 60]);

  // Bi-directional Scrolljacking on mobile and tablet (< 1024px)
  const handleMobileScroll = useCallback(() => {
    if (window.innerWidth >= 1024) return;
    if (!trackRef.current || !cardsTrackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const navbarHeight = window.innerWidth >= 640 ? 68 : 60;
    const totalScrollable = trackRect.height - window.innerHeight;

    if (totalScrollable <= 0) return;

    // Distance scrolled past sticky pinning point under navbar
    const scrolled = navbarHeight - trackRect.top;
    const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
    setScrollProgress(progress);

    const containerEl = cardsTrackRef.current.parentElement;
    if (!containerEl) return;

    // Total distance needed for horizontal traversal (including right padding)
    const maxTranslate = Math.max(0, cardsTrackRef.current.scrollWidth - containerEl.clientWidth);
    const targetX = -progress * maxTranslate;

    cardsTrackRef.current.style.transform = `translateX(${targetX}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    window.addEventListener('resize', handleMobileScroll);
    handleMobileScroll();
    return () => {
      window.removeEventListener('scroll', handleMobileScroll);
      window.removeEventListener('resize', handleMobileScroll);
    };
  }, [handleMobileScroll]);

  // Desktop active card scroll tracking (>= 1024px)
  useEffect(() => {
    const handleDesktopScroll = () => {
      if (window.innerWidth < 1024) return;
      const focusY = window.innerHeight * 0.45;
      let closestIndex = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenterY = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(cardCenterY - focusY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveDesktopIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
    };

    window.addEventListener('scroll', handleDesktopScroll, { passive: true });
    window.addEventListener('resize', handleDesktopScroll);
    handleDesktopScroll();

    return () => {
      window.removeEventListener('scroll', handleDesktopScroll);
      window.removeEventListener('resize', handleDesktopScroll);
    };
  }, []);

  // Step button navigation for mobile/tablet
  const scrollToCard = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const totalScrollable = trackRef.current.clientHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    const step = totalScrollable / 4;
    const currentStep = Math.round(scrollProgress * 4);
    const targetStep = direction === 'left' ? Math.max(0, currentStep - 1) : Math.min(4, currentStep + 1);
    const navbarHeight = window.innerWidth >= 640 ? 68 : 60;
    const trackTop = trackRef.current.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = trackTop - navbarHeight + targetStep * step;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const activeCardIndex = Math.min(4, Math.floor(scrollProgress * 4.99));

  return (
    <section
      id="security-governance"
      ref={sectionRef}
      className="section-deferred relative bg-[#0A0A0A] border-y border-neutral-800 text-white"
    >
      {/* ========================================================================= */}
      {/* Background Layers (Same as Footer Section with Parallax & Added Blur)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* 1. Dotted Coordinate Matrix with Parallax Scroll Effect (Matching Footer) */}
        <motion.div
          style={{ y: dotParallaxY }}
          className="absolute inset-x-0 -top-48 -bottom-48 bg-dot-grid-dark opacity-85"
        />

        {/* 2. Floating Ambient Electric Lime Glow with Parallax Float (Matching Footer) */}
        <motion.div
          style={{ y: orbParallaxY }}
          className="absolute top-1/4 right-1/4 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-[#E5FE54]/18 via-[#E5FE54]/5 to-transparent blur-[120px]"
        />

        <motion.div
          style={{ y: secondaryOrbParallaxY }}
          className="absolute -bottom-24 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-neutral-800/40 via-[#E5FE54]/5 to-transparent blur-[130px]"
        />

        {/* 3. Added Blur & Diffusion Layer: Softens background grid so text is crisp and properly visible */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-[#0A0A0A]/40" />
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET VIEW (< 1024px): 100% Preserved Scrolljacked Carousel     */}
      {/* ========================================================================= */}
      <div
        ref={trackRef}
        className="lg:hidden relative min-h-[200vh] sm:min-h-[220vh] z-10"
      >
        <div className="sticky top-[60px] sm:top-[68px] h-[calc(100dvh-60px)] sm:h-[calc(100dvh-68px)] w-full overflow-hidden flex flex-col justify-between py-2 sm:py-3.5 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full h-full flex flex-col justify-between min-h-0">
            {/* Top Split Header on Mobile/Tablet with subtle frosted plate for clarity */}
            <div className="p-4 -m-2 rounded-2xl bg-[#0A0A0A]/75 backdrop-blur-md border border-white/5 flex flex-col justify-between gap-2 sm:gap-3.5 mb-1.5 sm:mb-3 pb-2 sm:pb-3 border-b border-neutral-800/60 shrink-0">
              <div>
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#E5FE54] mb-1 sm:mb-1.5">
                  <ShieldCheck size={13} className="text-[#E5FE54]" />
                  <span>Enterprise Grade Trust & Sovereignty</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-white tracking-tight leading-[1.12]">
                  Strong on offense.<br />
                  <span className="text-neutral-200">Serious on defense.</span>
                </h2>
              </div>

              <div className="max-w-md">
                <p className="text-neutral-300 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Lyzr is built for enterprise security, governance, and compliance across identity, data, access, and infrastructure.
                </p>

                {/* Status and Mobile/Tablet Scrolljacking Controls */}
                <div className="mt-1.5 sm:mt-2.5 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono text-neutral-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-time SOC 2 & ISO monitor active</span>
                  </div>

                  {/* Interactive Progress & Controls on Mobile/Tablet */}
                  <div className="flex items-center space-x-2.5">
                    <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs font-mono text-neutral-400">
                      <span className="text-[#E5FE54] font-bold">0{activeCardIndex + 1}</span>
                      <span>/ 05</span>
                      <div className="w-14 sm:w-20 h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#E5FE54] transition-all duration-75"
                          style={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => scrollToCard('left')}
                        aria-label="Scroll badges left"
                        disabled={activeCardIndex === 0}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-700 bg-neutral-900/80 hover:border-neutral-500 disabled:opacity-40 disabled:pointer-events-none text-neutral-300 hover:text-white flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() => scrollToCard('right')}
                        aria-label="Scroll badges right"
                        disabled={activeCardIndex === 4}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-700 bg-neutral-900/80 hover:border-neutral-500 disabled:opacity-40 disabled:pointer-events-none text-neutral-300 hover:text-white flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Track: Horizontal carousel for mobile/tablet */}
            <div className="relative w-full overflow-hidden flex-1 flex items-center min-h-0 py-1 sm:py-2">
              <div
                ref={cardsTrackRef}
                className="flex flex-nowrap gap-3 sm:gap-4 items-stretch will-change-transform w-full"
              >
                {COMPLIANCE_ITEMS.map((item) => (
                  <ComplianceCard key={item.id} item={item} layout="vertical" />
                ))}
                <div className="shrink-0 w-2 sm:w-4 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* Bottom Trust & Scroll Indicator Bar on Mobile/Tablet */}
            <div className="mt-1.5 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-neutral-800/60 shrink-0 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono text-neutral-400">
                <span className="text-[#E5FE54]">↔</span>
                <span>Scroll vertically to pan through all certifications</span>
              </div>
              <div className="flex items-center space-x-2.5 sm:space-x-4 text-[9.5px] sm:text-[10.5px] font-mono text-neutral-500">
                <span>Zero-Egress VPC</span>
                <span>•</span>
                <span>AES-256</span>
                <span>•</span>
                <span>SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= 1024px): Two-Column Layout (Sticky Left, Scroll Stream Right) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative py-20 xl:py-28 overflow-visible z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-row items-start gap-12 xl:gap-16">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT COLUMN: 35% - 40% width, Sticky as user scrolls cards    */}
            {/* ------------------------------------------------------------- */}
            <div className="w-[38%] xl:w-[36%] shrink-0 sticky top-28 xl:top-32 self-start">
              
              {/* Frosted backdrop plate for 100% crisp text readability over parallax dot grid */}
              <div className="p-6 -m-4 xl:p-8 xl:-m-6 rounded-3xl bg-[#0A0A0A]/75 backdrop-blur-md border border-white/5 shadow-2xl space-y-6 xl:space-y-8">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#E5FE54] px-3.5 py-1.5 rounded-full bg-[#E5FE54]/10 border border-[#E5FE54]/25 backdrop-blur-xs">
                  <ShieldCheck size={14} className="text-[#E5FE54]" />
                  <span>Enterprise Grade Trust & Sovereignty</span>
                </div>

                {/* Main Heading */}
                <div>
                  <h2 className="text-3xl xl:text-4xl 2xl:text-[44px] font-normal text-white tracking-tight leading-[1.14]">
                    Strong on offense.<br />
                    <span className="text-neutral-200">Serious on defense.</span>
                  </h2>
                </div>

                {/* Subheading / Description */}
                <p className="text-neutral-300 text-sm xl:text-base leading-relaxed font-sans">
                  Lyzr is built for enterprise security, governance, and compliance across identity, data, access, and infrastructure.
                </p>

                {/* Real-time Monitor Status Badge */}
                <div className="flex items-center space-x-2.5 text-xs font-mono text-neutral-300 bg-neutral-900/90 border border-neutral-800 px-4 py-2.5 rounded-xl w-fit shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  <span>Real-time SOC 2 & ISO monitor active</span>
                </div>
              </div>

            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT COLUMN: Scrolling Cards Stream (60% - 65% width)        */}
            {/* ------------------------------------------------------------- */}
            <div className="flex-1 min-w-0 flex flex-col gap-6 xl:gap-8 pb-12">
              {COMPLIANCE_ITEMS.map((item, idx) => {
                const isActive = idx === activeDesktopIndex;
                const isRevealed = idx <= activeDesktopIndex;
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="w-full transition-transform duration-300"
                  >
                    <ComplianceCard
                      item={item}
                      layout="horizontal"
                      isActive={isActive}
                      isRevealed={isRevealed}
                    />
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};


