'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

interface AnnouncementBarProps {
  onAccessClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onAccessClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const data = SITE_DATA.announcement_bar;

  if (!isVisible) return null;

  return (
    <div
      id="announcement-bar"
      className="relative z-50 w-full bg-black text-white min-h-9 sm:h-10 flex items-center justify-center text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border-b border-black px-3 sm:px-6 py-1.5 sm:py-0"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-3 pr-6 sm:pr-0 max-w-full overflow-hidden">
        <span className="bg-[#E5FE54] text-black px-1.5 py-0.5 rounded-xs font-black border border-black text-[9px] sm:text-[10px] shrink-0">
          {data.badge}
        </span>
        <span className="text-neutral-200 truncate font-semibold tracking-normal sm:tracking-wide">
          {data.text}
        </span>
        <span className="hidden xs:inline text-neutral-500">—</span>
        <button
          onClick={onAccessClick}
          className="underline text-[#E5FE54] hover:text-white transition-colors cursor-pointer font-bold shrink-0 whitespace-nowrap"
        >
          {data.cta.label}
        </button>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#E5FE54] p-1.5 transition-colors cursor-pointer"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};
