'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowUpRight,
  Layers,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Scale,
  Building2,
  Cloud,
  ShoppingCart,
  Activity,
  FileCheck2,
  Users,
  Boxes,
  ShieldAlert,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { HeroAurora } from './HeroAurora';

interface AgentUseCase {
  id: string;
  sector: string;
  focus: string;
  title: string;
  body: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const ROW_1: AgentUseCase[] = [
  {
    id: 'banking-reg',
    sector: 'Banking',
    focus: 'SEC & FINRA Compliance',
    title: 'Regulatory Filing Preparation Agent',
    body: 'Automates regulatory filings with strict precision, continuous validation, and SEC/FINRA compliance across jurisdictions.',
    href: 'https://www.lyzr.ai/blueprints/banking/regulatory-filing-preparation-agent/',
    icon: Landmark,
  },
  {
    id: 'insurance-fraud',
    sector: 'Insurance',
    focus: 'Fraud & Tampering Defense',
    title: 'Fraudulent Document Detection Agent',
    body: 'Analyzes submitted policy documents and claims in real time, flags tampering or metadata anomalies, and accelerates reviews.',
    href: 'https://www.lyzr.ai/blueprints/insurance/fraudulent-document-detection-agent/',
    icon: ShieldCheck,
  },
  {
    id: 'finance-treasury',
    sector: 'Finance',
    focus: 'Liquidity & Cash Forecasting',
    title: 'Treasury Forecasting Agent',
    body: 'Ingests ERP signals, banking feeds, and market seasonality to project multi-horizon cash flow and optimize liquidity.',
    href: 'https://www.lyzr.ai/blueprints/finance/treasury-forecasting-agent/',
    icon: TrendingUp,
  },
  {
    id: 'legal-nda',
    sector: 'Legal',
    focus: 'Playbook Redline Analysis',
    title: 'NDA Negotiator Agent',
    body: 'Automates contract review, compares redlines against standard legal playbooks, and drafts compliant counter-proposals.',
    href: 'https://www.lyzr.ai/blueprints/legal/nda-negotiator-agent/',
    icon: Scale,
  },
  {
    id: 'hr-talent',
    sector: 'HR & People',
    focus: 'Technical Competency Evaluation',
    title: 'Technical Talent Sourcing Agent',
    body: 'Analyzes technical competencies, evaluates code contributions, and synthesizes candidate summaries for engineering leads.',
    href: 'https://www.lyzr.ai/blueprints/',
    icon: Users,
  },
  {
    id: 'healthcare-discharge',
    sector: 'Healthcare',
    focus: 'Zero-Retention PHI Trials',
    title: 'Clinical Protocol Assistant Agent',
    body: 'Evaluates patient eligibility against clinical trial protocols with zero-retention PHI data isolation.',
    href: 'https://www.lyzr.ai/blueprints/',
    icon: Activity,
  },
];

const ROW_2: AgentUseCase[] = [
  {
    id: 'govt-citizen',
    sector: 'Government',
    focus: 'Constituent Ticket Routing',
    title: 'Citizen Service Request Agent',
    body: 'Intelligently routes municipal service tickets, resolves common constituent inquiries, and eliminates dispatch delays.',
    href: 'https://www.lyzr.ai/blueprints/government/citizen-service-request-agent/',
    icon: Building2,
  },
  {
    id: 'it-cloud',
    sector: 'IT & Cloud',
    focus: 'FinOps & Compute Optimization',
    title: 'Cloud Cost Analyzer Agent',
    body: 'Continuously detects idle resources, underutilized compute clusters, and provides autonomous cost optimization recommendations.',
    href: 'https://www.lyzr.ai/blueprints/it/cloud-cost-analyzer-agent/',
    icon: Cloud,
  },
  {
    id: 'procurement-vendor',
    sector: 'Procurement',
    focus: 'Vendor Onboarding & Verification',
    title: 'Supplier Onboarding Agent',
    body: 'Automates vendor tax verification, compliance checks, and approval workflows, reducing onboarding cycle time by 75%.',
    href: 'https://www.lyzr.ai/blueprints/finance/supplier-onboarding-agent/',
    icon: ShoppingCart,
  },
  {
    id: 'security-soc',
    sector: 'Cybersecurity',
    focus: 'SIEM Incident Correlation',
    title: 'Security Incident Triage Agent',
    body: 'Correlates distributed SIEM telemetry, enriches endpoint context, and isolates compromised assets within seconds.',
    href: 'https://www.lyzr.ai/blueprints/',
    icon: ShieldAlert,
  },
  {
    id: 'retail-inventory',
    sector: 'Supply Chain',
    focus: 'Predictive Regional Rebalancing',
    title: 'Dynamic Inventory Allocation Agent',
    body: 'Rebalances regional warehouse inventory based on predictive demand surges, transit lead times, and fulfillment SLAs.',
    href: 'https://www.lyzr.ai/blueprints/',
    icon: Boxes,
  },
  {
    id: 'insurance-claims',
    sector: 'Insurance',
    focus: 'Casualty Severity Scoring',
    title: 'Claims Severity Prediction Agent',
    body: 'Scores incoming casualty and auto claims by predicted loss severity to instantly route complex cases to specialized adjusters.',
    href: 'https://www.lyzr.ai/blueprints/insurance/claims-severity-prediction-agent/',
    icon: FileCheck2,
  },
];

export interface InteractiveMarqueeRowHandle {
  scrollByAmount: (amount: number) => void;
}

interface InteractiveMarqueeRowProps {
  items: AgentUseCase[];
  direction: 'left' | 'right';
  rowId: string;
  isSectionPaused: boolean;
  tappedCardId: string | null;
  onCardClick: (e: React.MouseEvent<HTMLAnchorElement>, uc: AgentUseCase) => void;
  isSectionVisible: boolean;
}

const InteractiveMarqueeRow = forwardRef<InteractiveMarqueeRowHandle, InteractiveMarqueeRowProps>(
  (
    {
      items,
      direction,
      rowId,
      isSectionPaused,
      tappedCardId,
      onCardClick,
      isSectionVisible,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const lastMouseXRef = useRef(0);
    const dragDistanceRef = useRef(0);
    const startTouchXRef = useRef(0);
    const hasMovedRef = useRef(false);
    const isUserActiveRef = useRef(false);
    const isAutoScrollingRef = useRef(false);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const singleSetWidthRef = useRef(0);
    const [isHovered, setIsHovered] = useState(false);

    // 6 repeated sets ensure there is always ample card track in both directions
    const repeatedItems = useMemo(
      () => [...items, ...items, ...items, ...items, ...items, ...items],
      [items]
    );

    // Measure and set initial position in the center sets
    useEffect(() => {
      const updateDimensions = () => {
        if (!trackRef.current || !containerRef.current) return;
        const totalWidth = trackRef.current.scrollWidth;
        const setWidth = totalWidth / 6;
        singleSetWidthRef.current = setWidth;

        if (containerRef.current.scrollLeft === 0 && setWidth > 0) {
          containerRef.current.scrollLeft = direction === 'left' ? setWidth * 2 : setWidth * 2.5;
        }
      };

      updateDimensions();
      const timer = setTimeout(updateDimensions, 100);

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
        resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(trackRef.current);
      }

      window.addEventListener('resize', updateDimensions);
      return () => {
        clearTimeout(timer);
        if (resizeObserver) resizeObserver.disconnect();
        window.removeEventListener('resize', updateDimensions);
      };
    }, [direction]);

    // Seamless wrap: keeps scrollLeft safely bounded between [setWidth * 1.5, setWidth * 3.5]
    const checkWrap = useCallback(() => {
      const el = containerRef.current;
      const sWidth = singleSetWidthRef.current;
      if (!el || sWidth <= 0) return;

      while (el.scrollLeft >= sWidth * 3.5) {
        el.scrollLeft -= sWidth;
      }
      while (el.scrollLeft < sWidth * 1.5) {
        el.scrollLeft += sWidth;
      }
    }, []);

    // Expose programmatic swipe/nudge via imperative handle
    useImperativeHandle(ref, () => ({
      scrollByAmount: (amount: number) => {
        const el = containerRef.current;
        if (!el) return;
        isUserActiveRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        el.scrollBy({
          left: amount,
          behavior: 'smooth',
        });
        resumeTimeoutRef.current = setTimeout(() => {
          isUserActiveRef.current = false;
          checkWrap();
        }, 1200);
      },
    }));

    // Continuous auto-scroll loop via requestAnimationFrame
    useEffect(() => {
      let animId: number;
      let lastTime = performance.now();
      // 0.55 px per 16.67ms frame (~33px/sec) matches the leisurely pace
      const speed = direction === 'left' ? 0.55 : -0.55;

      const tick = (now: number) => {
        const delta = Math.min(32, now - lastTime);
        lastTime = now;

        const el = containerRef.current;
        if (
          el &&
          !isSectionPaused &&
          !isHovered &&
          !isUserActiveRef.current &&
          !isDraggingRef.current &&
          isSectionVisible
        ) {
          isAutoScrollingRef.current = true;
          el.scrollLeft += speed * (delta / 16.67);
          checkWrap();
          // Reset programmatic flag after frame
          requestAnimationFrame(() => {
            isAutoScrollingRef.current = false;
          });
        }

        animId = requestAnimationFrame(tick);
      };

      animId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animId);
    }, [direction, isSectionPaused, isHovered, isSectionVisible, checkWrap]);

    // Handle scroll events (tracks native touch momentum, trackpad swipe, wheel, or auto-scroll)
    const handleScroll = () => {
      checkWrap();
      if (!isAutoScrollingRef.current) {
        isUserActiveRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
          isUserActiveRef.current = false;
          hasMovedRef.current = false;
        }, 1200);
      }
    };

    // Native touch gestures for mobile / tablet swiping
    const handleTouchStart = (e: React.TouchEvent) => {
      isUserActiveRef.current = true;
      hasMovedRef.current = false;
      startTouchXRef.current = e.touches[0].pageX;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      const deltaX = Math.abs(e.touches[0].pageX - startTouchXRef.current);
      if (deltaX > 8) {
        hasMovedRef.current = true;
      }
    };

    const handleTouchEnd = () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isUserActiveRef.current = false;
        hasMovedRef.current = false;
      }, 1200);
    };

    // Mouse drag handlers for desktop click-and-drag swiping
    const handleMouseDown = (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      isDraggingRef.current = true;
      hasMovedRef.current = false;
      isUserActiveRef.current = true;
      lastMouseXRef.current = e.pageX;
      dragDistanceRef.current = 0;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current || !containerRef.current) return;
        const deltaX = e.pageX - lastMouseXRef.current;
        lastMouseXRef.current = e.pageX;
        dragDistanceRef.current += Math.abs(deltaX);

        if (dragDistanceRef.current > 5) {
          hasMovedRef.current = true;
        }

        containerRef.current.scrollLeft -= deltaX;
        checkWrap();
      };

      const handleMouseUp = () => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
          isUserActiveRef.current = false;
        }, 1000);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [checkWrap]);

    const handleMouseEnter = () => {
      if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleCardClickProxy = (e: React.MouseEvent<HTMLAnchorElement>, uc: AgentUseCase) => {
      if (hasMovedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
          hasMovedRef.current = false;
        }, 50);
        return;
      }
      onCardClick(e, uc);
    };

    return (
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="marquee-row w-full flex py-2 sm:py-3 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none [touch-action:pan-x_pan-y]"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div ref={trackRef} className="flex shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6 py-2">
          {repeatedItems.map((uc, index) => {
            const isTapped = tappedCardId === uc.id;
            const IconComponent = uc.icon;

            return (
              <a
                key={`${rowId}-${index}`}
                href={uc.href}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onClick={(e) => handleCardClickProxy(e, uc)}
                className={`use-case-card relative shrink-0 w-[310px] sm:w-[370px] md:w-[410px] bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 select-none group cursor-pointer ${isTapped
                    ? 'z-30 border-2 border-neutral-900 shadow-enterprise-md scale-[1.015] bg-white ring-4 ring-neutral-900/10'
                    : 'z-10 hover:z-20 border border-neutral-200/90 hover:border-neutral-900 shadow-enterprise-xs hover:shadow-enterprise-md hover:-translate-y-1.5'
                  }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-neutral-100/95 border border-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-800 group-hover:bg-[#E5FE54] group-hover:text-black group-hover:border-black/20 transition-colors shadow-xs">
                        <IconComponent size={20} className="stroke-[1.9]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-[13px] font-bold text-neutral-900 tracking-tight truncate">
                          {uc.sector}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-500 tracking-tight truncate">
                          {uc.focus}
                        </div>
                      </div>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-neutral-100/80 group-hover:bg-neutral-950 text-neutral-500 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight size={13} strokeWidth={2.2} />
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-[17px] font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-neutral-900 transition-colors line-clamp-2">
                    {uc.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal line-clamp-3">
                    {uc.body}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors">
                  <span className={isTapped ? 'text-neutral-900 font-semibold' : ''}>
                    {isTapped ? 'Click again to open' : 'View Blueprint'}
                  </span>
                  <span className="text-neutral-400 group-hover:translate-x-0.5 transition-transform font-mono">
                    →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
);

export const AgentUseCasesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<InteractiveMarqueeRowHandle>(null);
  const row2Ref = useRef<InteractiveMarqueeRowHandle>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [tappedCardId, setTappedCardId] = useState<string | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  // Parallax scroll effect matching Hero Section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgAuroraY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const bgGridY = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const ambientRingsY = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const ambientRingsRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Section visibility observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle card click / tap
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, uc: AgentUseCase) => {
    // If movement is running, clicking or tapping a card pauses the marquee
    if (!isPaused || tappedCardId !== uc.id) {
      e.preventDefault();
      setIsPaused(true);
      setTappedCardId(uc.id);
      return;
    }
    // If the card is already paused and selected, clicking again opens the blueprint link
  };

  // Clicking outside on the section or mouse leave resumes motion
  const handleSectionClick = (e: React.MouseEvent) => {
    if (isPaused && !(e.target as HTMLElement).closest('.use-case-card')) {
      setIsPaused(false);
      setTappedCardId(null);
    }
  };

  const handleSectionMouseLeave = () => {
    if (isPaused) {
      setIsPaused(false);
      setTappedCardId(null);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (isPaused) {
      setTappedCardId(null);
    }
  };

  // Step backwards across both rows
  const handlePrev = () => {
    row1Ref.current?.scrollByAmount(-390);
    row2Ref.current?.scrollByAmount(390);
  };

  // Step forwards across both rows
  const handleNext = () => {
    row1Ref.current?.scrollByAmount(390);
    row2Ref.current?.scrollByAmount(-390);
  };

  return (
    <section
      id="agent-use-cases"
      ref={sectionRef}
      onClick={handleSectionClick}
      onMouseLeave={handleSectionMouseLeave}
      className="py-20 lg:py-28 bg-white border-b border-neutral-200 overflow-hidden relative"
    >
      {/* ========================================================================= */}
      {/* Background Layers (Same as Hero Section with Parallax)                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* 1. Parallax Interactive Aurora Light Layer */}
        <motion.div
          style={{ y: bgAuroraY }}
          className="absolute inset-0 pointer-events-none"
        >
          <HeroAurora containerRef={sectionRef} />
        </motion.div>

        {/* 2. Parallax Dot Grid & Ambient Coordinate Mesh */}
        <motion.div
          style={{ y: bgGridY }}
          className="absolute inset-x-0 -top-28 -bottom-28 bg-dot-grid opacity-75 pointer-events-none"
        />

        {/* 3. Floating 3D Geometric Depth Accents */}
        <motion.div
          style={{ y: ambientRingsY, rotate: ambientRingsRotate }}
          className="absolute -top-12 -right-12 w-[550px] h-[550px] pointer-events-none opacity-40"
        >
          <div className="w-full h-full rounded-full border border-dashed border-neutral-300 animate-[spin_80s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-neutral-200/60" />
          <div className="absolute inset-24 rounded-full border border-neutral-200/40" />
        </motion.div>

        {/* 4. Ambient Pedestal Glow */}
        <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] -translate-y-1/2 pedestal-glow pointer-events-none rounded-full blur-3xl opacity-50" />

        {/* Bottom Vignette Mask to blend gently */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
              <Layers size={14} className="text-neutral-700" />
              <span>Agent Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight leading-[1.15]">
              Agent use cases across enterprise workflows
            </h2>
          </div>

          {/* Pause / Play + Interactive Swipe Navigation Controls */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={togglePause}
              className="flex items-center space-x-2 text-xs font-mono text-neutral-700 bg-white/90 hover:bg-neutral-50 border border-neutral-200/90 hover:border-neutral-400 px-3.5 py-2 rounded-full w-fit shrink-0 shadow-enterprise-xs transition-all cursor-pointer backdrop-blur-xs select-none"
              aria-label={isPaused ? 'Resume infinite marquee' : 'Pause infinite marquee'}
            >
              {isPaused ? (
                <>
                  <Play size={12} className="text-amber-600 fill-amber-600" />
                  <span className="font-semibold text-neutral-900">Paused</span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-500">Tap or click to resume</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-neutral-600">Hover or tap card to pause</span>
                </>
              )}
            </button>

            {/* Back & Forward Quick Swipe Buttons */}
            <div className="flex items-center bg-white/90 border border-neutral-200/90 rounded-full p-0.5 shadow-enterprise-xs backdrop-blur-xs">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Swipe blueprints backward"
                title="Swipe backward"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="w-px h-4 bg-neutral-200" />
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Swipe blueprints forward"
                title="Swipe forward"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Ramp.com-Style Multi-Row Infinite Marquee Carousel (2 Lines)              */}
      {/* Supports continuous auto-scroll + interactive swipe forward/backward       */}
      {/* on mobile, tablet, and desktop                                            */}
      {/* ========================================================================= */}
      <div
        className="relative w-full overflow-hidden flex flex-col gap-1 sm:gap-2 py-2 z-10 select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
        }}
      >
        {/* Row 1: Leftward Infinite Marquee (Draggable & Swipable) */}
        <InteractiveMarqueeRow
          ref={row1Ref}
          items={ROW_1}
          direction="left"
          rowId="row-1"
          isSectionPaused={isPaused}
          tappedCardId={tappedCardId}
          onCardClick={handleCardClick}
          isSectionVisible={isSectionVisible}
        />

        {/* Row 2: Rightward Infinite Marquee (Alternating Flow, Draggable & Swipable) */}
        <InteractiveMarqueeRow
          ref={row2Ref}
          items={ROW_2}
          direction="right"
          rowId="row-2"
          isSectionPaused={isPaused}
          tappedCardId={tappedCardId}
          onCardClick={handleCardClick}
          isSectionVisible={isSectionVisible}
        />
      </div>
    </section>
  );
};



