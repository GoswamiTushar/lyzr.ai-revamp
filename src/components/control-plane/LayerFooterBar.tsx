'use client';

import React from 'react';

interface LayerFooterBarProps {
  layers: { id: string | number; title: string }[];
  activeLayerIndex: number;
}

export const LayerFooterBar: React.FC<LayerFooterBarProps> = ({
  layers,
  activeLayerIndex,
}) => {
  return (
    <div className="w-full border-t border-neutral-100 bg-white/95 backdrop-blur-md px-3 sm:px-8 py-2 z-30 shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-1.5 text-neutral-500 text-[10px] sm:text-xs shrink-0">
          <span className="hidden sm:inline">Scroll to reveal layers</span>
          <span className="sm:hidden font-semibold text-neutral-700">0{activeLayerIndex + 1}</span>
          <span className="sm:hidden text-neutral-400">/ 07</span>
          <span className="hidden sm:inline">↓</span>
        </div>

        {/* Discrete 7-segment progress bar */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 px-1.5">
          {layers.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeLayerIndex
                  ? 'w-4 sm:w-7 bg-neutral-950'
                  : idx < activeLayerIndex
                  ? 'w-1.5 sm:w-3 bg-neutral-400'
                  : 'w-1.5 sm:w-3 bg-neutral-200'
              }`}
            />
          ))}
        </div>

        <div className="text-neutral-500 text-[10px] sm:text-[11px] shrink-0 font-medium">
          <span className="hidden sm:inline">
            {activeLayerIndex === 6 ? 'Scroll to continue →' : `${activeLayerIndex + 1} / 7`}
          </span>
          <span className="sm:hidden text-neutral-600">
            {activeLayerIndex === 6 ? 'Continue ↓' : 'Scroll ↓'}
          </span>
        </div>
      </div>
    </div>
  );
};
