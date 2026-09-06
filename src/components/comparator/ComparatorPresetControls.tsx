import React from 'react';

export type ComparatorMode = 'prototype' | 'split' | 'production';

interface ComparatorPresetControlsProps {
  currentMode: ComparatorMode;
  onSelectPreset: (position: number) => void;
}

export const ComparatorPresetControls: React.FC<ComparatorPresetControlsProps> = ({
  currentMode,
  onSelectPreset,
}) => {
  return (
    <div className="flex items-center justify-start gap-2 sm:gap-3 mb-3 sm:mb-5 overflow-x-auto pb-1">
      {/* Left Preset: Prototype Graveyard */}
      <button
        type="button"
        onClick={() => onSelectPreset(100)}
        className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${currentMode === 'prototype'
          ? 'bg-red-50 border-red-300 text-red-900 shadow-xs ring-1 ring-red-200'
          : 'bg-white border-neutral-200 text-neutral-600 hover:text-red-700 hover:border-red-200'
          }`}
      >
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 inline-block shrink-0" />
        <span className="tracking-tight uppercase">The 92% Prototype</span>
      </button>

      {/* Right Preset: Governed Production */}
      <button
        type="button"
        onClick={() => onSelectPreset(0)}
        className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${currentMode === 'production'
          ? 'bg-neutral-900 border-neutral-900 text-[#E5FE54] shadow-xs ring-1 ring-neutral-800'
          : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300'
          }`}
      >
        <span className="tracking-tight uppercase">Governed Production</span>
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E5FE54] border border-black/20 inline-block shrink-0" />
      </button>
    </div>
  );
};
