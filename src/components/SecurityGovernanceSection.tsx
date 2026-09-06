'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPLIANCE_ITEMS, ComplianceCard } from './security/ComplianceCard';

export const SecurityGovernanceSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Monitor desktop vs mobile/tablet viewport
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bi-directional Scrolljacking on mobile and tablet
  const handleScroll = useCallback(() => {
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

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
    <div
      ref={trackRef}
      id="security-governance"
      className="section-deferred relative bg-[#0D0D0D] border-y border-neutral-800/80 text-white min-h-[200vh] sm:min-h-[220vh] lg:min-h-0"
    >
      {/* Sticky Pinned Viewport on mobile & tablet, static section on desktop */}
      <section
        className="sticky top-[60px] sm:top-[68px] lg:static h-[calc(100dvh-60px)] sm:h-[calc(100dvh-68px)] lg:h-auto w-full overflow-hidden flex flex-col justify-between py-2 sm:py-3.5 lg:py-24 relative z-20"
      >
        {/* Ambient Decorative Background Grid & Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-neutral-800/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[300px] bg-[#E5FE54]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-between min-h-0">
          
          {/* Top Split Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 sm:gap-3.5 lg:gap-8 mb-1.5 sm:mb-3 lg:mb-16 pb-2 sm:pb-3 lg:pb-10 border-b border-neutral-800/60 shrink-0">
            <div>
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#E5FE54] mb-1 sm:mb-1.5">
                <ShieldCheck size={13} className="text-[#E5FE54]" />
                <span>Enterprise Grade Trust & Sovereignty</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-normal text-white tracking-tight leading-[1.12]">
                Strong on offense.<br />
                <span className="text-neutral-200">Serious on defense.</span>
              </h2>
            </div>

            <div className="max-w-md lg:text-right">
              <p className="text-neutral-300 text-[11px] sm:text-xs lg:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
                Lyzr is built for enterprise security, governance, and compliance across identity, data, access, and infrastructure.
              </p>
              
              {/* Status and Mobile/Tablet Scrolljacking Controls */}
              <div className="mt-1.5 sm:mt-2.5 flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-time SOC 2 & ISO monitor active</span>
                </div>

                {/* Interactive Progress & Controls on Mobile/Tablet */}
                <div className="flex lg:hidden items-center space-x-2.5">
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

          {/* Cards Track: Scrolljacked on Mobile/Tablet (< lg), 5-column grid on Desktop (lg+) */}
          <div className="relative w-full overflow-hidden flex-1 flex items-center min-h-0 py-1 sm:py-2">
            <div
              ref={cardsTrackRef}
              className="flex lg:grid flex-nowrap lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 items-stretch will-change-transform w-full"
              style={{
                transform: isDesktop ? 'none' : undefined,
              }}
            >
              {COMPLIANCE_ITEMS.map((item) => (
                <ComplianceCard key={item.id} item={item} />
              ))}
              
              {/* Extra trailing spacing for mobile/tablet */}
              <div className="shrink-0 w-2 sm:w-4 lg:hidden pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* Bottom Trust & Scroll Indicator Bar on Mobile/Tablet */}
          <div className="mt-1.5 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-neutral-800/60 shrink-0 lg:hidden flex flex-wrap items-center justify-between gap-2">
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
      </section>
    </div>
  );
};
