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

export const EnterpriseShowcaseSection: React.FC<EnterpriseShowcaseSectionProps> = ({ onOpenDemo }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % ENTERPRISE_STORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + ENTERPRISE_STORIES.length) % ENTERPRISE_STORIES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentMobileStory = ENTERPRISE_STORIES[activeIndex];

  return (
    <section
      id="enterprises-run-on-lyzr"
      className="section-deferred relative py-20 lg:py-28 bg-white border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block: Exact Title from Screenshot + Prev/Next Controls */}
        <div className="flex items-center justify-between gap-6 mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight font-sans">
            The world’s top enterprises <br />
            <span className="text-neutral-950 font-normal">run on Lyzr</span>
          </h2>

          {/* Carousel Arrows (Prev / Next) */}
          <div className="flex items-center space-x-3">
            <button
              id="enterprise-carousel-prev"
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-800 flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              id="enterprise-carousel-next"
              onClick={handleNext}
              aria-label="Next story"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-800 flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
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
              onSelect={() => setActiveIndex(idx)}
            />
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* TABLET & MOBILE EXPERIENCE: Zero interaction needed  */}
        {/* Full color immediately, permanent text and logos    */}
        {/* ---------------------------------------------------- */}
        <div className="block lg:hidden">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-950 h-[440px] sm:h-[480px]">
            {/* Always in full, rich color */}
            <img
              src={currentMobileStory.imageUrl}
              alt={currentMobileStory.imageAlt}
              width="600"
              height="480"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover grayscale-0 brightness-[0.82]"
              referrerPolicy="no-referrer"
            />

            {/* Permanent gradient overlay for maximum readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

            {/* Top Logo */}
            <div className="absolute top-6 left-6 z-20">
              <img
                src={currentMobileStory.logoSrc}
                alt={currentMobileStory.logoAlt}
                width="160"
                height="36"
                className="h-7 sm:h-8 w-auto object-contain filter brightness-0 invert"
              />
            </div>

            {/* Permanent Text (No hover or interaction required) */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-20">
              <p className="text-lg sm:text-xl font-normal text-white leading-relaxed">
                {currentMobileStory.text}
              </p>
            </div>
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
