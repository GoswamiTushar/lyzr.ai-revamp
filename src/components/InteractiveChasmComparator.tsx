import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ArrowLeftRight,
  SlidersHorizontal,
} from 'lucide-react';

export const InteractiveChasmComparator: React.FC = () => {
  // sliderPosition: 0 = 100% Lyzr Production, 50 = 50/50 Curtain Split, 100 = 100% Prototype
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPos = ((clientX - rect.left) / rect.width) * 100;
    // Allow full travel from 0% all the way to 100%
    const clampedPos = Math.max(0, Math.min(100, rawPos));
    setSliderPosition(clampedPos);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  // Global window pointer listeners while dragging for uninterrupted control on touch and mouse
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalPointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX);
    };

    const handleGlobalPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [isDragging, updatePosition]);

  // Determine current active preset mode
  const currentMode =
    sliderPosition >= 90 ? 'prototype' : sliderPosition <= 10 ? 'production' : 'split';

  return (
    <div className="my-8 sm:my-14 select-none font-sans">
      {/* Top Segmented Controls Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-5 overflow-x-auto pb-1">
        {/* Left Preset: Prototype Graveyard */}
        <button
          type="button"
          onClick={() => setSliderPosition(100)}
          className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            currentMode === 'prototype'
              ? 'bg-red-50 border-red-300 text-red-900 shadow-xs ring-1 ring-red-200'
              : 'bg-white border-neutral-200 text-neutral-600 hover:text-red-700 hover:border-red-200'
          }`}
        >
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 inline-block shrink-0" />
          <span className="tracking-tight uppercase">The 92% Prototype</span>
        </button>

        {/* Center: 50 / 50 Split Reset */}
        <button
          type="button"
          onClick={() => setSliderPosition(50)}
          className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            currentMode === 'split'
              ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
          }`}
        >
          <SlidersHorizontal size={12} className="sm:w-3.5 sm:h-3.5" />
          <span>50 / 50 Split</span>
        </button>

        {/* Right Preset: Governed Production */}
        <button
          type="button"
          onClick={() => setSliderPosition(0)}
          className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            currentMode === 'production'
              ? 'bg-neutral-900 border-neutral-900 text-[#E5FE54] shadow-xs ring-1 ring-neutral-800'
              : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300'
          }`}
        >
          <span className="tracking-tight uppercase">Governed Production</span>
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E5FE54] border border-black/20 inline-block shrink-0" />
        </button>
      </div>

      {/* Comparison Stage for Desktop, Tablet & Mobile - True Curtain Architecture */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative w-full border border-neutral-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-enterprise-xl bg-[#0F0F0F] cursor-ew-resize touch-none select-none min-h-[360px] sm:min-h-[420px]"
      >
        {/* ========================================================================= */}
        {/* BASE LAYER (BOTTOM): Lyzr Governed Production (Full Width, Static Layout) */}
        {/* ========================================================================= */}
        <div className="w-full h-full bg-[#0F0F0F] text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-between select-none">
          {/* Header Row */}
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2.5 sm:pb-3.5">
              <span className="inline-flex items-center bg-[#E5FE54]/15 text-[#E5FE54] text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase border border-[#E5FE54]/30 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
                LYZR GOVERNED PRODUCTION
              </span>
              <div className="flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs text-[#E5FE54] font-semibold bg-neutral-900 border border-neutral-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
                <ShieldCheck size={12} className="text-[#E5FE54] shrink-0 sm:w-3.5 sm:h-3.5" />
                <span>Zero Data Egress</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mt-2.5 sm:mt-4 leading-snug">
              Deterministic, Isolated & Continuous
            </h3>
            <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-400 mt-1 leading-relaxed font-normal">
              Sovereign VPC execution with Six Sigma simulation and continuous guardrails.
            </p>
          </div>

          {/* 3 Metrics Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-6">
            <div className="bg-white/[0.04] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between">
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E5FE54] tracking-tight">
                99.99%
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-white mt-0.5 sm:mt-1 truncate">
                  Reliability Target
                </div>
                <div className="text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 leading-snug hidden sm:block">
                  Six Sigma simulated
                </div>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between">
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E5FE54] tracking-tight">
                &lt; 1.2ms
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-white mt-0.5 sm:mt-1 truncate">
                  Control Overhead
                </div>
                <div className="text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 leading-snug hidden sm:block">
                  Async tracing in VPC
                </div>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between">
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E5FE54] tracking-tight">
                100%
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-white mt-0.5 sm:mt-1 truncate">
                  Audit Lineage
                </div>
                <div className="text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 leading-snug hidden sm:block">
                  Cryptographic hashes
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-neutral-800 text-[10px] sm:text-xs text-neutral-300">
            <span className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1">
              <CheckCircle2 size={11} className="text-[#E5FE54] shrink-0 sm:w-3 sm:h-3" /> Private VPC
            </span>
            <span className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1">
              <CheckCircle2 size={11} className="text-[#E5FE54] shrink-0 sm:w-3 sm:h-3" /> Model Failover
            </span>
            <span className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1">
              <CheckCircle2 size={11} className="text-[#E5FE54] shrink-0 sm:w-3 sm:h-3" /> SOC 2 / HIPAA Gatekeeper
            </span>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* CURTAIN LAYER (TOP): The 92% Prototype Graveyard (Full Width, Zero Reflow, Clipped Clean) */}
        {/* ========================================================================================= */}
        <div
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transition: isDragging ? 'none' : 'clip-path 250ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute inset-0 w-full h-full bg-[#FFF8F8] text-neutral-950 p-4 sm:p-6 lg:p-8 flex flex-col justify-between pointer-events-none select-none z-20"
        >
          {/* Header Row */}
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-red-200/70 pb-2.5 sm:pb-3.5">
              <span className="inline-flex items-center bg-red-100/90 text-red-700 text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase border border-red-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
                UN-GOVERNED PROTOTYPE
              </span>
              <div className="flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs text-red-700 font-semibold bg-red-100/90 border border-red-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
                <AlertTriangle size={12} className="text-red-600 shrink-0 sm:w-3.5 sm:h-3.5" />
                <span>Security Vetoed</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-neutral-950 tracking-tight mt-2.5 sm:mt-4 leading-snug">
              Fragile, Leaky & Non-Compliant
            </h3>
            <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-600 mt-1 leading-relaxed font-normal">
              Where 92% of enterprise AI agent experiments stall before compliance sign-off.
            </p>
          </div>

          {/* 3 Metrics Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-6">
            <div className="bg-white/90 border border-red-100/80 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between shadow-xs">
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600 tracking-tight">
                ~24%
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-neutral-900 mt-0.5 sm:mt-1 truncate">
                  Hallucination
                </div>
                <div className="text-[9px] sm:text-[11px] text-neutral-500 mt-0.5 leading-snug hidden sm:block">
                  Breaks in edge cases
                </div>
              </div>
            </div>

            <div className="bg-white/90 border border-red-100/80 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between shadow-xs">
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600 tracking-tight">
                ZERO
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-neutral-900 mt-0.5 sm:mt-1 truncate">
                  Audit Lineage
                </div>
                <div className="text-[9px] sm:text-[11px] text-neutral-500 mt-0.5 leading-snug hidden sm:block">
                  Black-box API calls
                </div>
              </div>
            </div>

            <div className="bg-white/90 border border-red-100/80 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between shadow-xs">
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600 tracking-tight">
                HIGH
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-neutral-900 mt-0.5 sm:mt-1 truncate">
                  Injection Risk
                </div>
                <div className="text-[9px] sm:text-[11px] text-neutral-500 mt-0.5 leading-snug hidden sm:block">
                  Unchecked inputs
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-red-200/70 text-[10px] sm:text-xs text-red-800">
            <span className="inline-flex items-center gap-1 bg-red-100/70 border border-red-200 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1">
              <AlertTriangle size={11} className="text-red-600 shrink-0 sm:w-3 sm:h-3" /> Vendor Lock-in
            </span>
            <span className="inline-flex items-center gap-1 bg-red-100/70 border border-red-200 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1">
              <AlertTriangle size={11} className="text-red-600 shrink-0 sm:w-3 sm:h-3" /> Hardcoded Keys
            </span>
            <span className="inline-flex items-center gap-1 bg-red-100/70 border border-red-200 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1">
              <AlertTriangle size={11} className="text-red-600 shrink-0 sm:w-3 sm:h-3" /> Model Deprecations
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DRAGGABLE CURTAIN DIVIDER & PILL HANDLE (Positioned Exactly at Slider %)  */}
        {/* ========================================================================= */}
        <div
          style={{
            left: `${sliderPosition}%`,
            transition: isDragging ? 'none' : 'left 250ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/90 z-30 shadow-[0_0_12px_rgba(229,254,84,0.7)] pointer-events-none"
        >
          {/* Center Handle Button */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E5FE54] border-2 border-neutral-950 flex items-center justify-center shadow-enterprise-xl pointer-events-auto cursor-ew-resize transition-transform ${
              isDragging ? 'scale-115' : 'hover:scale-110'
            }`}
            title="Drag curtain to compare"
          >
            <ArrowLeftRight size={13} className="text-neutral-950 stroke-[2.5] sm:w-3.5 sm:h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
