import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ComplianceItem {
  id: string;
  badgeCode: string;
  name: string;
  scope: string;
  details: string;
  renderEmblem: () => React.ReactNode;
}

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

  const complianceItems: ComplianceItem[] = [
    {
      id: 'gdpr',
      badgeCode: 'EU-2016/679',
      name: 'GDPR COMPLIANT',
      scope: 'European Data Protection',
      details: 'Strict enforcement of data subject rights, EU data sovereignty, and Article 28 data processing compliance.',
      renderEmblem: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
          {/* 12 EU Stars in a ring */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 50 + 38 * Math.cos(rad);
            const cy = 50 + 38 * Math.sin(rad);
            return (
              <polygon
                key={deg}
                points={`${cx},${cy - 2.8} ${cx + 0.8},${cy - 0.9} ${cx + 2.8},${cy - 0.9} ${cx + 1.2},${cy + 0.5} ${cx + 1.8},${cy + 2.5} ${cx},${cy + 1.2} ${cx - 1.8},${cy + 2.5} ${cx - 1.2},${cy + 0.5} ${cx - 2.8},${cy - 0.9} ${cx - 0.8},${cy - 0.9}`}
                fill="white"
              />
            );
          })}
          {/* Center Padlock */}
          <path
            d="M43 43V38C43 34.134 46.134 31 50 31C53.866 31 57 34.134 57 38V43"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect x="40" y="43" width="20" height="15" rx="2.5" stroke="white" strokeWidth="2.2" />
          <circle cx="50" cy="48.5" r="1.5" fill="white" />
          <path d="M50 50V53" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          {/* Text inside */}
          <text
            x="50"
            y="67"
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="900"
            letterSpacing="0.06em"
          >
            GDPR
          </text>
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fill="white"
            fontSize="4.5"
            fontWeight="bold"
            letterSpacing="0.08em"
          >
            COMPLIANT
          </text>
        </svg>
      ),
    },
    {
      id: 'soc2',
      badgeCode: 'TYPE-II AUDITED',
      name: 'SOC 2 TYPE II',
      scope: 'Security & Availability',
      details: 'Independently audited AICPA Trust Services Criteria with continuous automated control monitoring.',
      renderEmblem: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
          {/* Concentric rings */}
          <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="39" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
          <text
            x="50"
            y="45"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="900"
            letterSpacing="0.08em"
          >
            AICPA
          </text>
          <line x1="30" y1="51" x2="70" y2="51" stroke="white" strokeWidth="1.2" />
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="900"
            letterSpacing="0.06em"
          >
            SOC2
          </text>
        </svg>
      ),
    },
    {
      id: 'iso27001',
      badgeCode: 'ISO/IEC-27001',
      name: 'ISO 27001 CERTIFIED',
      scope: 'InfoSec Management',
      details: 'Global gold standard for Information Security Management Systems (ISMS) across entire agent lifecycle.',
      renderEmblem: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
          {/* Shield Outline */}
          <path
            d="M20 18H80V52C80 69 50 86 50 86C50 86 20 69 20 52V18Z"
            stroke="white"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M20 38H80" stroke="white" strokeWidth="1.4" />
          <text
            x="50"
            y="28"
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="900"
            letterSpacing="0.06em"
          >
            ISO 27001
          </text>
          <text
            x="50"
            y="35"
            textAnchor="middle"
            fill="white"
            fontSize="4.4"
            fontWeight="bold"
            letterSpacing="0.08em"
          >
            CERTIFIED
          </text>
          {/* Globe Grid lines inside lower shield */}
          <circle cx="50" cy="58" r="18" stroke="white" strokeWidth="1.2" />
          <line x1="32" y1="58" x2="68" y2="58" stroke="white" strokeWidth="1" />
          <line x1="50" y1="40" x2="50" y2="76" stroke="white" strokeWidth="1" />
          <ellipse cx="50" cy="58" rx="9" ry="18" stroke="white" strokeWidth="1" />
        </svg>
      ),
    },
    {
      id: 'hipaa',
      badgeCode: 'HITECH READY',
      name: 'HIPAA COMPLIANT',
      scope: 'Healthcare Data Privacy',
      details: 'Business Associate Agreement (BAA) ready with end-to-end PHI encryption and zero retention policies.',
      renderEmblem: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
          {/* Concentric rings */}
          <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="39" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
          {/* Caduceus Emblem */}
          <path
            d="M50 23V39M44 26C46.5 24 53.5 24 56 26M42 30C46 27 54 27 58 30"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="22" r="1.5" fill="white" />
          <text
            x="50"
            y="52"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="900"
            letterSpacing="0.08em"
          >
            HIPAA
          </text>
          <text
            x="50"
            y="61"
            textAnchor="middle"
            fill="white"
            fontSize="4.8"
            fontWeight="bold"
            letterSpacing="0.08em"
          >
            COMPLIANT
          </text>
        </svg>
      ),
    },
    {
      id: 'ccpa',
      badgeCode: 'CPRA ALIGNED',
      name: 'CCPA',
      scope: 'California Privacy Rights',
      details: 'Full consumer opt-out support, granular data mapping, and continuous privacy threshold compliance.',
      renderEmblem: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
          {/* Concentric rings */}
          <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="39" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
          {/* Checkmark */}
          <path
            d="M42 35L48 41L58 29"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="900"
            letterSpacing="0.08em"
          >
            CCPA
          </text>
          <text
            x="50"
            y="63"
            textAnchor="middle"
            fill="white"
            fontSize="4.8"
            fontWeight="bold"
            letterSpacing="0.08em"
          >
            COMPLIANT
          </text>
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={trackRef}
      id="security-governance"
      className="relative bg-[#0D0D0D] border-y border-neutral-800/80 text-white min-h-[200vh] sm:min-h-[220vh] lg:min-h-0"
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
          
          {/* Top Split Header - Compact on mobile & tablet so it is never pushed offscreen */}
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

          {/* Cards Track: Scrolljacked on Mobile/Tablet (< lg), 5-column grid on Desktop (lg+) - Fills stage vertically */}
          <div className="relative w-full overflow-hidden flex-1 flex items-center min-h-0 py-1 sm:py-2">
            <div
              ref={cardsTrackRef}
              className="flex lg:grid flex-nowrap lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 items-stretch will-change-transform w-full"
              style={{
                transform: isDesktop ? 'none' : undefined,
              }}
            >
              {complianceItems.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 w-[240px] sm:w-[265px] md:w-[285px] lg:w-auto relative group bg-[#161616]/90 border border-white/10 hover:border-[#E5FE54]/50 rounded-2xl p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center text-center justify-between transition-all duration-300 backdrop-blur-xs hover:shadow-[0_0_25px_rgba(229,254,84,0.08)] hover:bg-[#1c1c1c] h-full max-h-[50dvh] sm:max-h-[54dvh] md:max-h-[58dvh] min-h-[290px] sm:min-h-[320px] md:min-h-[350px] lg:min-h-[345px]"
                >
                  {/* Top Code Badge */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5 sm:mb-2">
                    <span className="tracking-wider text-neutral-400">{item.badgeCode}</span>
                    <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                  </div>

                  {/* SVG Emblem with subtle aura */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 my-1 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.renderEmblem()}
                  </div>

                  {/* Middle Label & Scope */}
                  <div className="mt-2 pt-2 border-t border-white/5 w-full">
                    <div className="text-xs sm:text-[13px] font-mono font-bold tracking-wider text-white uppercase group-hover:text-[#E5FE54] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[10.5px] sm:text-[11px] text-neutral-400 mt-0.5 font-sans">
                      {item.scope}
                    </div>
                  </div>

                  {/* Detail Info: Always visible by default on mobile & tablet; smoothly fades in on desktop with ZERO layout shift */}
                  <div className="mt-2 pt-1.5 border-t border-white/5 w-full min-h-[44px] sm:min-h-[48px] flex items-center justify-center">
                    <p className="text-[10px] sm:text-[11px] text-neutral-300 leading-relaxed font-sans opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Extra trailing spacing for mobile/tablet to ensure card 5 finishes cleanly with edge padding */}
              <div className="shrink-0 w-2 sm:w-4 lg:hidden pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* Bottom Trust & Scroll Indicator Bar on Mobile/Tablet - Eliminates empty space below cards */}
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
