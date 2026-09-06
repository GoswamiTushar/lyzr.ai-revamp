import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Layers } from 'lucide-react';
import { HeroAurora } from './HeroAurora';
import { TypingHeading } from './TypingHeading';
import { SITE_DATA } from '../data/siteContent';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onExploreLayers: () => void;
  isDeveloperMode?: boolean;
  onToggleDeveloperMode?: (val: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemo,
  onExploreLayers,
  isDeveloperMode: externalDeveloperMode,
  onToggleDeveloperMode,
}) => {
  const heroData = SITE_DATA.hero_section;
  const [internalDeveloperMode, setInternalDeveloperMode] = useState(heroData.toggle.default);
  const isDeveloperMode = externalDeveloperMode !== undefined ? externalDeveloperMode : internalDeveloperMode;
  const setIsDeveloperMode = onToggleDeveloperMode || setInternalDeveloperMode;

  const heroContainerRef = useRef<HTMLElement | null>(null);

  // 1. Scroll-driven 3D Parallax using Framer Motion
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transform layers with smooth easing
  const bgAuroraY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const bgGlowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgGlowOpacity = useTransform(scrollYProgress, [0, 0.85], [0.65, 0.1]);

  // Floating ambient 3D geometric rings
  const ambientRingsY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const ambientRingsRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Typography parallax layer
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const headlineRotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const subheadlineY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const subheadlineOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  const ctaRowY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Dynamic content based on developer toggle state
  const currentContent = isDeveloperMode ? heroData.developer : heroData.enterprise;

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative flex flex-col justify-center overflow-hidden pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 lg:pb-10 bg-white"
      style={{ perspective: '1200px' }}
    >
      {/* 1. Parallax Background Layer: Interactive Aurora Light */}
      <motion.div
        style={{ y: bgAuroraY, scale: bgGlowScale, opacity: bgGlowOpacity }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <HeroAurora containerRef={heroContainerRef} />
      </motion.div>

      {/* 2. Parallax Dot Grid & Ambient Coordinate Mesh */}
      <motion.div
        style={{ y: bgGridY }}
        className="absolute inset-0 bg-dot-grid opacity-75 pointer-events-none z-0"
      />

      {/* 3. Floating 3D Geometric Depth Accents */}
      <motion.div
        style={{ y: ambientRingsY, rotate: ambientRingsRotate }}
        className="absolute -top-12 -right-12 w-[550px] h-[550px] pointer-events-none z-0 opacity-40"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full border border-dashed border-neutral-300 animate-[spin_80s_linear_infinite]" />
        <div className="absolute inset-8 rounded-full border border-neutral-200/60" />
        <div className="absolute inset-24 rounded-full border border-neutral-200/40" />
      </motion.div>

      {/* Ambient pedestal glow */}
      <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] -translate-y-1/2 pedestal-glow pointer-events-none rounded-full blur-3xl opacity-50" />

      {/* Main Hero Content Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl space-y-4 sm:space-y-5">
          
          {/* Developer Mode Switch Toggle + Eyebrow with Parallax */}
          <motion.div
            style={{ y: eyebrowY, opacity: eyebrowOpacity }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-full px-3 py-1 shadow-enterprise-xs">
              <span
                className={`text-[11px] font-bold tracking-wider transition-colors cursor-pointer select-none ${
                  isDeveloperMode ? 'text-neutral-950 font-bold' : 'text-neutral-500'
                }`}
                onClick={() => setIsDeveloperMode(!isDeveloperMode)}
              >
                {heroData.toggle.label}
              </span>

              <button
                id="hero-dev-toggle"
                type="button"
                onClick={() => setIsDeveloperMode(!isDeveloperMode)}
                className={`w-9 h-5 rounded-full relative p-0.5 transition-colors cursor-pointer border ${
                  isDeveloperMode ? 'bg-[#0A0A0A] border-black' : 'bg-neutral-300 border-neutral-400'
                }`}
                aria-label="Toggle Developer Perspective"
              >
                <div
                  className={`w-3.5 h-3.5 bg-[#E5FE54] rounded-full transition-transform duration-200 ${
                    isDeveloperMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="text-[12px] font-bold text-gray-500 tracking-[0.2em] uppercase font-mono">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDeveloperMode ? 'dev-eye' : 'ent-eye'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {currentContent.eyebrow}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main Headline with Parallax & Typewriter effect with blinking cursor (repeats after 5 seconds) */}
          <motion.div
            style={{ y: headlineY, rotateX: headlineRotateX }}
          >
            <TypingHeading
              text={currentContent.headline}
              isDeveloperMode={isDeveloperMode}
              repeatDelay={5000}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.08]"
            />
          </motion.div>

          {/* Subheadline with Parallax & tight responsive line-spacing on mobile */}
          <motion.p
            style={{ y: subheadlineY, opacity: subheadlineOpacity }}
            className="text-[13.5px] sm:text-base md:text-lg lg:text-xl text-neutral-600 leading-[1.38] sm:leading-relaxed max-w-3xl font-normal min-h-0 sm:min-h-[2.8em]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDeveloperMode ? 'dev-sub' : 'ent-sub'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {currentContent.subheadline}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          {/* Primary and Secondary CTA Buttons - Single row on mobile devices */}
          <motion.div
            style={{ y: ctaRowY }}
            className="pt-1 sm:pt-2 flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-primary-cta"
              onClick={onOpenDemo}
              className="flex-1 sm:flex-initial bg-[#0A0A0A] hover:bg-[#222222] text-white px-3 sm:px-7 py-3 sm:py-3.5 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl border border-neutral-900 shadow-enterprise-md hover:shadow-enterprise-xl active:scale-[0.99] transition-all cursor-pointer group whitespace-nowrap"
            >
              <span>{heroData.primary_cta.label.replace('→', '').trim()}</span>
              <ArrowRight size={14} className="sm:w-[15px] sm:h-[15px] group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onExploreLayers}
              className="flex-1 sm:flex-initial bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 px-3 sm:px-6 py-3 sm:py-3.5 font-bold text-xs sm:text-sm rounded-xl border border-black/10 shadow-enterprise-xs hover:shadow-enterprise-md active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
            >
              <Layers size={14} className="sm:w-4 sm:h-4 shrink-0" />
              <span>Explore 7 Layers</span>
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
