'use client';

import React from 'react';

export interface EnterpriseStory {
  id: string;
  company: string;
  logoSrc: string;
  logoAlt: string;
  imageUrl: string;
  imageAlt: string;
  text: string;
  brandColor?: string;
}

interface EnterpriseStoryCardProps {
  story: EnterpriseStory;
  isExpanded: boolean;
  onSelect: () => void;
}

export const EnterpriseStoryCard: React.FC<EnterpriseStoryCardProps> = ({
  story,
  isExpanded,
  onSelect,
}) => {
  return (
    <div
      id={`enterprise-card-${story.id}`}
      onMouseEnter={onSelect}
      onClick={onSelect}
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
        width="800"
        height="520"
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
            width="160"
            height="36"
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
};
