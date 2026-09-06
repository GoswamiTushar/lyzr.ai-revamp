'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ComparatorPresetControls, type ComparatorMode } from './comparator/ComparatorPresetControls';
import { GovernedProductionStage } from './comparator/GovernedProductionStage';
import { UngovernedPrototypeStage } from './comparator/UngovernedPrototypeStage';
import { ComparatorDividerHandle } from './comparator/ComparatorDividerHandle';

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
  const currentMode: ComparatorMode =
    sliderPosition >= 90 ? 'prototype' : sliderPosition <= 10 ? 'production' : 'split';

  return (
    <div className="my-8 sm:my-14 select-none font-sans">
      {/* 1. Top Segmented Preset Controls Bar */}
      <ComparatorPresetControls
        currentMode={currentMode}
        onSelectPreset={setSliderPosition}
      />

      {/* 2. Interactive Comparison Stage - True Curtain Architecture */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative w-full border border-neutral-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-enterprise-xl bg-[#0F0F0F] cursor-ew-resize touch-none select-none flex flex-col min-h-[360px] sm:min-h-[420px]"
      >
        {/* BASE LAYER: Lyzr Governed Production (Full Width, Static Layout) */}
        <GovernedProductionStage />

        {/* CURTAIN LAYER: Un-Governed Prototype Graveyard (Clipped Cleanly by Slider Position) */}
        <UngovernedPrototypeStage
          sliderPosition={sliderPosition}
          isDragging={isDragging}
        />

        {/* DRAGGABLE CURTAIN DIVIDER & HANDLE */}
        <ComparatorDividerHandle
          sliderPosition={sliderPosition}
          isDragging={isDragging}
        />
      </div>
    </div>
  );
};
