'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  // Card 1 (Accenture) is active by default as shown in screenshot
  const [activeIndex, setActiveIndex] = useState(1);

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
      className="relative py-20 lg:py-28 bg-white border-b border-neutral-200 overflow-hidden"
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
          {ENTERPRISE_STORIES.map((story, idx) => {
            const isExpanded = activeIndex === idx;

            return (
              <div
                key={story.id}
                id={`enterprise-card-${story.id}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isExpanded
                    ? 'flex-[3.5] shadow-xl ring-1 ring-black/10'
                    : 'flex-1 hover:flex-[1.4] shadow-sm'
                }`}
              >
                {/* Background Image: B&W when collapsed, full color when expanded/hovered */}
                <img
                  src={story.imageUrl}
                  alt={story.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                    isExpanded
                      ? 'grayscale-0 brightness-[0.88] scale-100'
                      : 'grayscale contrast-[1.08] brightness-[0.75] scale-105 group-hover:grayscale-0 group-hover:brightness-[0.82]'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient overlay for text readability */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-black/85 via-black/40 to-black/15'
                      : 'bg-gradient-to-t from-black/75 via-black/30 to-black/10 group-hover:from-black/80'
                  }`}
                />

                {/* Top Logo Container */}
                <div className="absolute top-8 left-8 z-20">
                  <div className="flex items-center">
                    <img
                      src={story.logoSrc}
                      alt={story.logoAlt}
                      className={`h-7 sm:h-8 w-auto object-contain filter brightness-0 invert transition-all duration-500 ${
                        isExpanded ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                </div>

                {/* Narrative Text: Only displayed when card is expanded */}
                <div
                  className={`absolute inset-0 p-8 sm:p-10 flex flex-col justify-end z-20 transition-all duration-500 ${
                    isExpanded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <p className="text-xl sm:text-2xl lg:text-[26px] font-normal text-white leading-snug tracking-tight max-w-xl">
                    {story.text}
                  </p>
                </div>
              </div>
            );
          })}
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
        <div className="mt-10 lg:mt-14 flex items-center justify-center space-x-8 sm:space-x-14">
          {ENTERPRISE_STORIES.map((story, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <button
                key={`logo-nav-${story.id}`}
                id={`enterprise-logo-tab-${story.id}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                aria-label={`View ${story.company} case story`}
                className="relative py-3 group cursor-pointer transition-all duration-300 focus:outline-hidden"
              >
                <img
                  src={story.logoSrc}
                  alt={story.logoAlt}
                  className={`h-5 sm:h-6 w-auto object-contain transition-all duration-300 ${
                    isSelected
                      ? 'opacity-100 filter drop-shadow-xs scale-105'
                      : 'opacity-40 grayscale group-hover:opacity-80 group-hover:grayscale-0'
                  }`}
                />

                {/* Underline indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="activeEnterpriseLogoIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: story.brandColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
