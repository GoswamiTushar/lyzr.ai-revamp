'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { EnterpriseStory } from './EnterpriseStoryCard';

interface EnterpriseTabNavProps {
  stories: EnterpriseStory[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const EnterpriseTabNav: React.FC<EnterpriseTabNavProps> = ({
  stories,
  activeIndex,
  onSelect,
}) => {
  return (
    <div className="mt-10 lg:mt-14 flex items-center justify-center space-x-8 sm:space-x-14">
      {stories.map((story, idx) => {
        const isSelected = activeIndex === idx;

        return (
          <button
            key={`logo-nav-${story.id}`}
            id={`enterprise-logo-tab-${story.id}`}
            onClick={() => onSelect(idx)}
            onMouseEnter={() => onSelect(idx)}
            aria-label={`View ${story.company} case story`}
            className="relative py-3 group cursor-pointer transition-all duration-300 focus:outline-hidden"
          >
            <img
              src={story.logoSrc}
              alt={story.logoAlt}
              width="120"
              height="28"
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
                style={{ backgroundColor: story.brandColor || '#0a0a0a' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
