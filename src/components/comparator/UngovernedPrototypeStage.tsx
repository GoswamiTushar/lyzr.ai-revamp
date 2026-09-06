import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface UngovernedPrototypeStageProps {
  sliderPosition: number;
  isDragging: boolean;
}

export const UngovernedPrototypeStage: React.FC<UngovernedPrototypeStageProps> = ({
  sliderPosition,
  isDragging,
}) => {
  return (
    <div
      style={{
        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        transition: isDragging ? 'none' : 'clip-path 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="absolute inset-0 w-full h-full bg-[#FFF8F8] text-neutral-950 p-4 sm:p-6 lg:p-8 flex flex-col justify-between pointer-events-none select-none z-20"
    >
      {/* Header Row: Calibrated min-height for pixel-perfect alignment across curtain */}
      <div className="min-h-[110px] sm:min-h-[125px] flex flex-col justify-start">
        <div className="flex items-center justify-between gap-2 border-b border-red-200/70 pb-2.5 sm:pb-3.5 h-[34px] sm:h-[38px]">
          <span className="inline-flex items-center bg-red-100/90 text-red-700 text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase border border-red-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
            UN-GOVERNED PROTOTYPE
          </span>
          <div className="flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs text-red-700 font-semibold bg-red-100/90 border border-red-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
            <AlertTriangle size={12} className="text-red-600 shrink-0 sm:w-3.5 sm:h-3.5" />
            <span>Security Vetoed</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-neutral-950 tracking-tight mt-2.5 sm:mt-4 leading-snug min-h-[28px] sm:min-h-[36px] flex items-center">
          Fragile, Leaky &amp; Non-Compliant
        </h3>
        <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-600 mt-1 leading-relaxed font-normal min-h-[32px] sm:min-h-[40px] flex items-center">
          Where 92% of enterprise AI agent experiments stall before compliance sign-off.
        </p>
      </div>

      {/* 3 Metrics Row: Explicit height matching curtain base */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 my-auto py-2">
        <div className="bg-white/90 border border-red-100/80 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between shadow-xs h-[96px] sm:h-[112px]">
          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600 tracking-tight h-[28px] sm:h-[36px] flex items-center">
            ~24%
          </div>
          <div className="h-[36px] sm:h-[42px] flex flex-col justify-end">
            <div className="text-[10px] sm:text-xs font-semibold text-neutral-900 mt-0.5 sm:mt-1 truncate">
              Hallucination
            </div>
            <div className="text-[9px] sm:text-[11px] text-neutral-500 mt-0.5 leading-snug hidden sm:block truncate">
              Breaks in edge cases
            </div>
          </div>
        </div>

        <div className="bg-white/90 border border-red-100/80 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between shadow-xs h-[96px] sm:h-[112px]">
          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600 tracking-tight h-[28px] sm:h-[36px] flex items-center">
            ZERO
          </div>
          <div className="h-[36px] sm:h-[42px] flex flex-col justify-end">
            <div className="text-[10px] sm:text-xs font-semibold text-neutral-900 mt-0.5 sm:mt-1 truncate">
              Audit Lineage
            </div>
            <div className="text-[9px] sm:text-[11px] text-neutral-500 mt-0.5 leading-snug hidden sm:block truncate">
              Black-box API calls
            </div>
          </div>
        </div>

        <div className="bg-white/90 border border-red-100/80 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between shadow-xs h-[96px] sm:h-[112px]">
          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600 tracking-tight h-[28px] sm:h-[36px] flex items-center">
            HIGH
          </div>
          <div className="h-[36px] sm:h-[42px] flex flex-col justify-end">
            <div className="text-[10px] sm:text-xs font-semibold text-neutral-900 mt-0.5 sm:mt-1 truncate">
              Injection Risk
            </div>
            <div className="text-[9px] sm:text-[11px] text-neutral-500 mt-0.5 leading-snug hidden sm:block truncate">
              Unchecked inputs
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Chips: Fixed height & single row symmetry */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-red-200/70 h-[44px] sm:h-[48px] text-[10px] sm:text-xs text-red-800">
        <span className="inline-flex items-center gap-1 bg-red-100/70 border border-red-200 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 whitespace-nowrap">
          <AlertTriangle size={11} className="text-red-600 shrink-0 sm:w-3 sm:h-3" /> Vendor Lock-in
        </span>
        <span className="inline-flex items-center gap-1 bg-red-100/70 border border-red-200 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 whitespace-nowrap">
          <AlertTriangle size={11} className="text-red-600 shrink-0 sm:w-3 sm:h-3" /> Hardcoded Keys
        </span>
        <span className="inline-flex items-center gap-1 bg-red-100/70 border border-red-200 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 whitespace-nowrap">
          <AlertTriangle size={11} className="text-red-600 shrink-0 sm:w-3 sm:h-3" /> Model Deprecations
        </span>
      </div>
    </div>
  );
};
