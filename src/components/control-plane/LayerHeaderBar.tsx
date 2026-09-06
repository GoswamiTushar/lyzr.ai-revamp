'use client';

import React from 'react';
import { Layers } from 'lucide-react';

interface LayerHeaderBarProps {
  title: string;
  subtitle: string;
  activeLayerIndex: number;
}

export const LayerHeaderBar: React.FC<LayerHeaderBarProps> = ({
  title,
  subtitle,
  activeLayerIndex,
}) => {
  return (
    <div className="w-full border-b border-neutral-100 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-2 z-30 shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
            {title}
          </span>
          <span className="text-neutral-300">/</span>
          <h2 className="text-xs sm:text-sm font-bold text-neutral-950 tracking-tight flex items-center space-x-2">
            <Layers size={14} className="text-neutral-700" />
            <span>{subtitle}</span>
          </h2>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-neutral-950 font-bold bg-[#E5FE54]/40 border border-[#E5FE54] px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>LAYER 0{activeLayerIndex + 1} OF 07</span>
          </div>
        </div>
      </div>
    </div>
  );
};
