import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  TrendingUp,
  Award,
} from 'lucide-react';

interface ProductionStatsSectionProps {
  onOpenDemo?: () => void;
}

// ----------------------------------------------------
// Mouse-tracking Spotlight Card in our signature UI style
// ----------------------------------------------------
const SpotlightStatCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}> = ({ children, className = '', glowColor = 'rgba(229, 254, 84, 0.22)' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -3, scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${className}`}
    >
      {/* Dynamic Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(380px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
};

// ----------------------------------------------------
// Animated Count-Up Hook / Component that re-animates on view
// ----------------------------------------------------
interface StatNumberProps {
  value: string;
  isInView: boolean;
}

const StatNumber: React.FC<StatNumberProps> = ({ value, isInView }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Parse value pattern
    const raw = value.trim();
    if (raw === '1M+') {
      if (!isInView) {
        setDisplayValue('0M+');
        return;
      }
      let start: number | null = null;
      let frameId: number;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 1100, 1);
        const current = progress < 1 ? (progress * 1).toFixed(1) : '1';
        setDisplayValue(`${current === '1.0' || current === '1' ? '1' : current}M+`);
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue('1M+');
        }
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }

    if (raw === '300%') {
      if (!isInView) {
        setDisplayValue('0%');
        return;
      }
      let start: number | null = null;
      let frameId: number;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 1200, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(easeOut * 300);
        setDisplayValue(`${current}%`);
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue('300%');
        }
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }

    if (raw === '2026') {
      if (!isInView) {
        setDisplayValue('2000');
        return;
      }
      let start: number | null = null;
      let frameId: number;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 1200, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = 2000 + Math.round(easeOut * 26);
        setDisplayValue(`${current}`);
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue('2026');
        }
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }

    setDisplayValue(value);
  }, [value, isInView]);

  return <span>{displayValue}</span>;
};

// ----------------------------------------------------
// Main Section: Build Agents Anywhere. Control from One Place.
// ----------------------------------------------------
export const ProductionStatsSection: React.FC<ProductionStatsSectionProps> = ({ onOpenDemo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="production-stats-section"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-white border-b border-neutral-200 overflow-hidden"
    >
      {/* Ambient background tech grid & subtle radial glow in our signature styling */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-28 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-[#E5FE54]/12 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 right-10 w-[500px] h-[300px] bg-neutral-200/40 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* ---------------------------------------------------- */}
          {/* Left Column: Headline, Narrative & "Go to open controller" */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
            <div>
              {/* Exact Data Headline from User Screenshot */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.12]"
              >
                Build agents anywhere. <br />
                <span className="text-neutral-900">Control them from one place.</span> <br />
                <span className="bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
                  Your IP stays yours.
                </span>
              </motion.h2>

              {/* Supporting narrative in Lyzr design tone */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-6 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-xl"
              >
                Orchestrate multi-agent workloads seamlessly across AWS, Azure, GCP, or on-premises servers. Deploy autonomous swarms inside your sovereign VPC perimeter with zero code leaks, zero data retention, and centralized security policy control.
              </motion.p>
            </div>

            {/* CTA: Go to open controller linking to https://www.lyzr.ai/control-plane/ */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-2"
            >
              <a
                href="https://www.lyzr.ai/control-plane/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-3.5 px-6 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-sans font-bold text-sm sm:text-base border border-neutral-800 shadow-enterprise-md hover:shadow-enterprise-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                <span>Go to open controller</span>
                <span className="w-7 h-7 rounded-full bg-[#E5FE54] text-neutral-950 flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight size={16} className="stroke-[2.5]" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Right Column: 3 Structured Spotlight Cards (Matching Height) */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 lg:gap-5 h-full">
            
            {/* Stat Card 1: 1M+ Production Agents */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex-1 flex flex-col"
            >
              <SpotlightStatCard
                className="h-full flex flex-col justify-center bg-white border-neutral-200/90 p-6 sm:p-7 shadow-enterprise-xs hover:border-neutral-400 hover:shadow-enterprise-md transition-all group"
                glowColor="rgba(229, 254, 84, 0.35)"
              >
                {/* Electric lime top accent indicator */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-transparent group-hover:bg-[#E5FE54] transition-colors duration-300 rounded-full" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                        GLOBAL FLEET SCALE
                      </span>
                    </div>

                    <div className="text-5xl sm:text-6xl font-extrabold text-neutral-950 tracking-tight font-sans">
                      <StatNumber value="1M+" isInView={isInView} />
                    </div>
                  </div>

                  <div className="sm:max-w-[260px] text-left">
                    <p className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
                      Production agents running across customer environments
                    </p>
                    <span className="inline-block mt-2 text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200/60">
                      Multi-tenant &amp; isolated VPCs
                    </span>
                  </div>
                </div>
              </SpotlightStatCard>
            </motion.div>

            {/* Stat Card 2: 300% QoQ Growth */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <SpotlightStatCard
                className="h-full flex flex-col justify-center bg-white border-neutral-200/90 p-6 sm:p-7 shadow-enterprise-xs hover:border-neutral-400 hover:shadow-enterprise-md transition-all group"
                glowColor="rgba(229, 254, 84, 0.35)"
              >
                {/* Electric lime top accent indicator */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-transparent group-hover:bg-[#E5FE54] transition-colors duration-300 rounded-full" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <TrendingUp size={14} className="text-neutral-950" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                        WORKLOAD VELOCITY
                      </span>
                    </div>

                    <div className="text-5xl sm:text-6xl font-extrabold text-neutral-950 tracking-tight font-sans">
                      <StatNumber value="300%" isInView={isInView} />
                    </div>
                  </div>

                  <div className="sm:max-w-[260px] text-left">
                    <p className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
                      Quarter-on-quarter growth in deployed agentic workloads
                    </p>
                    <span className="inline-block mt-2 text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200/60">
                      Enterprise production scale
                    </span>
                  </div>
                </div>
              </SpotlightStatCard>
            </motion.div>

            {/* Stat Card 3: 2026 CB Insights Top AI Startups */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <SpotlightStatCard
                className="h-full flex flex-col justify-center bg-neutral-950 text-white border-neutral-800 p-6 sm:p-7 shadow-enterprise-md hover:border-neutral-700 hover:shadow-enterprise-xl transition-all group"
                glowColor="rgba(229, 254, 84, 0.28)"
              >
                {/* Electric lime top accent indicator */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-[#E5FE54] rounded-full" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <Award size={14} className="text-[#E5FE54]" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E5FE54]">
                        GLOBAL RECOGNITION
                      </span>
                    </div>

                    <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
                      <StatNumber value="2026" isInView={isInView} />
                    </div>
                  </div>

                  <div className="sm:max-w-[260px] text-left">
                    <p className="text-sm sm:text-base font-semibold text-neutral-200 leading-snug">
                      Named one of the top AI startups by CB Insights
                    </p>
                    <span className="inline-block mt-2 text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md">
                      Annual AI 100 Cohort
                    </span>
                  </div>
                </div>
              </SpotlightStatCard>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
