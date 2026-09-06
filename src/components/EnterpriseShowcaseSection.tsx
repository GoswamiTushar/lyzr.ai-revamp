'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EnterpriseStoryCard } from './showcase/EnterpriseStoryCard';
import { EnterpriseTabNav } from './showcase/EnterpriseTabNav';

interface EnterpriseStory {
  id: string;
  company: string;
  logoSrc: string;
  logoAlt: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
  brandColor: string;
}

const ENTERPRISE_STORIES: EnterpriseStory[] = [
  {
    id: 'crown-castle',
    company: 'Crown Castle',
    logoSrc: '/logos/logo-crowncastle.webp',
    logoAlt: 'Crown Castle',
    text: 'Crown Castle automated cell tower diagnostics and field maintenance dispatch across 40,000+ distributed infrastructure nodes.',
    imageUrl: '/images/enterprise-telecom.jpg',
    imageAlt: 'Telecommunications cellular tower antenna',
    brandColor: '#F59E0B',
  },
  {
    id: 'accenture',
    company: 'Accenture',
    logoSrc: '/logos/logo-accenture.webp',
    logoAlt: 'Accenture',
    text: 'Accenture took a client’s finance close from pilot to production in nine weeks by rebuilding core workflows around agents.',
    imageUrl: '/images/enterprise-accenture.jpg',
    imageAlt: 'Modern corporate glass skyscraper architecture',
    brandColor: '#A100FF',
  },
  {
    id: 'wtw',
    company: 'WTW',
    logoSrc: '/logos/logo-wtw.webp',
    logoAlt: 'WTW',
    text: 'WTW scaled submission triage across carrier workflows adding 3.1x more broker throughput.',
    imageUrl: '/images/enterprise-wtw.jpg',
    imageAlt: 'Chicago architectural skyline featuring Willis Tower',
    brandColor: '#7B2CBF',
  },
  {
    id: 'verifone',
    company: 'Verifone',
    logoSrc: '/logos/logo-verifone.webp',
    logoAlt: 'Verifone',
    text: 'Verifone accelerated point-of-sale payment triage and merchant dispute routing across millions of daily retail transactions.',
    imageUrl: '/images/enterprise-verifone.jpg',
    imageAlt: 'Contactless payment terminal with credit card tap',
    brandColor: '#0066FF',
  },
];

interface EnterpriseShowcaseSectionProps {
  onOpenDemo?: () => void;
}

const getCircularOffset = (index: number, active: number, total: number) => {
  let diff = (index - active) % total;
  while (diff > total / 2) diff -= total;
  while (diff <= -total / 2) diff += total;
  return diff;
};

export const EnterpriseShowcaseSection: React.FC<EnterpriseShowcaseSectionProps> = ({ onOpenDemo }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const pauseTemporarily = useCallback((durationMs = 4500) => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, durationMs);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % ENTERPRISE_STORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + ENTERPRISE_STORIES.length) % ENTERPRISE_STORIES.length);
  }, []);

  const onPrevClick = () => {
    handlePrev();
    pauseTemporarily();
  };

  const onNextClick = () => {
    handleNext();
    pauseTemporarily();
  };

  // Continuous auto-rotation between cards
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
        pauseTemporarily();
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
        pauseTemporarily();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, pauseTemporarily]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && touchStartY.current !== null) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    pauseTemporarily(4000);
  };

  return (
    <section
      id="enterprises-run-on-lyzr"
      className="section-deferred relative py-20 lg:py-28 bg-white border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block: Title + Sharp Prev/Next Controls */}
        <div className="flex items-center justify-between gap-6 mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight font-sans">
            The world’s top enterprises <br />
            <span className="text-neutral-950 font-normal">run on Lyzr</span>
          </h2>

          {/* Carousel Arrows (Prev / Next) - Sharp edges */}
          <div className="flex items-center space-x-3">
            <button
              id="enterprise-carousel-prev"
              onClick={onPrevClick}
              aria-label="Previous story"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-none border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-800 flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              id="enterprise-carousel-next"
              onClick={onNextClick}
              aria-label="Next story"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-none border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-800 flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* DESKTOP EXPERIENCE: Expands on hover, B&W to Color    */}
        {/* ---------------------------------------------------- */}
        <div className="hidden lg:flex gap-5 items-stretch h-[480px] w-full">
          {ENTERPRISE_STORIES.map((story, idx) => (
            <EnterpriseStoryCard
              key={story.id}
              story={story}
              isExpanded={activeIndex === idx}
              onSelect={() => {
                setActiveIndex(idx);
                pauseTemporarily();
              }}
            />
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* TABLET & MOBILE EXPERIENCE: 3D Stacked Coverflow      */}
        {/* Middle card in front & fully visible, side cards      */}
        {/* flanking on either side, auto-rotating, sharp edges   */}
        {/* ---------------------------------------------------- */}
        <div className="block lg:hidden">
          <div
            className="relative w-full h-[460px] sm:h-[500px] overflow-hidden select-none touch-pan-y"
            style={{ perspective: 1000 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {ENTERPRISE_STORIES.map((story, idx) => {
              const offset = getCircularOffset(idx, activeIndex, ENTERPRISE_STORIES.length);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              const xPos = isCenter ? '-50%' : isLeft ? '-104%' : isRight ? '4%' : '-50%';
              const scaleVal = isCenter ? 1 : isVisible ? 0.85 : 0.7;
              const rotY = isCenter ? 0 : isLeft ? 8 : isRight ? -8 : 0;
              const opacityVal = isCenter ? 1 : isVisible ? 0.62 : 0;
              const zIndexVal = isCenter ? 30 : isVisible ? 20 : 10;

              return (
                <motion.div
                  key={story.id}
                  initial={false}
                  animate={{
                    x: xPos,
                    scale: scaleVal,
                    rotateY: rotY,
                    opacity: opacityVal,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{
                    zIndex: zIndexVal,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  onClick={() => {
                    if (isLeft) {
                      handlePrev();
                      pauseTemporarily();
                    } else if (isRight) {
                      handleNext();
                      pauseTemporarily();
                    }
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-[74%] max-w-[320px] h-[420px] sm:h-[450px] rounded-none overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl transition-shadow duration-300 ${
                    isCenter ? 'cursor-default shadow-black/60' : 'cursor-pointer shadow-black/30'
                  }`}
                >
                  {/* Full color image with sharp corners */}
                  <img
                    src={story.imageUrl}
                    alt={story.imageAlt}
                    width="600"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover grayscale-0 brightness-[0.84] rounded-none pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Permanent gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 rounded-none pointer-events-none" />

                  {/* Top Logo */}
                  <div className="absolute top-6 left-6 z-20 pointer-events-none">
                    <img
                      src={story.logoSrc}
                      alt={story.logoAlt}
                      width="140"
                      height="32"
                      className="h-6 sm:h-7 w-auto object-contain filter brightness-0 invert"
                    />
                  </div>

                  {/* Narrative text: only visible when in center */}
                  <div
                    className={`absolute inset-0 p-6 sm:p-7 flex flex-col justify-end z-20 pointer-events-none transition-opacity duration-300 ${
                      isCenter ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-base sm:text-lg font-normal text-white leading-relaxed">
                      {story.text}
                    </p>
                  </div>

                  {/* Dark scrim over side cards */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none rounded-none" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Slide Indicators: Sharp, clean, modern dashes (no round edges) */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {ENTERPRISE_STORIES.map((story, i) => (
              <button
                key={story.id}
                onClick={() => {
                  setActiveIndex(i);
                  pauseTemporarily();
                }}
                aria-label={`Go to ${story.company}`}
                className={`h-1 transition-all duration-300 cursor-pointer rounded-none ${
                  activeIndex === i
                    ? 'w-7 bg-neutral-950'
                    : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BOTTOM LOGOS SELECTOR (Matching the reference ss)     */}
        {/* ---------------------------------------------------- */}
        {/* <EnterpriseTabNav
          stories={ENTERPRISE_STORIES}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        /> */}

      </div>
    </section>
  );
};
