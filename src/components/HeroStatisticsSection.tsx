import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedStatItem } from './AnimatedStatItem';
import { SITE_DATA } from '../data/siteContent';

interface HeroStatisticsSectionProps {
  isDeveloperMode: boolean;
}

export const HeroStatisticsSection: React.FC<HeroStatisticsSectionProps> = ({ isDeveloperMode }) => {
  const heroData = SITE_DATA.hero_section;
  const currentContent = isDeveloperMode ? heroData.developer : heroData.enterprise;
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsInView, setStatsInView] = useState(false);

  // Trigger count-up animation whenever statistics section enters viewport
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sets to true on enter, false on exit so count-up re-triggers when scrolling past and returning
        setStatsInView(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="statistics-section"
      className="pt-2 pb-12 sm:pb-16 bg-transparent relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Delicate soft-fading divider transitioning smoothly from 3D logos into stats */}
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-neutral-200/60 to-transparent mb-8 sm:mb-10" />

        <div ref={statsRef} className="w-full">
          {/* 
            Responsive Layout Strategy:
            - Desktop/Tablets (md: and up): Fits ALL 5 items in a SINGLE ROW (md:flex-nowrap md:justify-between) with clean vertical dividers.
            - Mobile/Small Tablets (< md:): 3 items on top row, 2 items on second row,
              centrally aligned with equal left and right spacing.
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isDeveloperMode ? 'dev' : 'ent'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap justify-center md:justify-between items-start gap-y-8 gap-x-3 sm:gap-x-5 md:gap-x-3 lg:gap-6 w-full"
            >
              {currentContent.stats.map((stat, idx) => (
                <div
                  key={`${isDeveloperMode ? 'dev' : 'ent'}-${idx}-${stat.value}`}
                  className="w-[29%] sm:w-[28%] md:w-auto md:flex-1 min-w-[90px] max-w-[155px] md:max-w-none text-center md:text-left md:border-r md:border-neutral-200/50 md:last:border-r-0 md:pr-4 lg:pr-6"
                >
                  <AnimatedStatItem
                    value={stat.value}
                    label={stat.label}
                    isInView={statsInView}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
