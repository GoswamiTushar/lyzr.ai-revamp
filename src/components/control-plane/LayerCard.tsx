'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LayerItem {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
}

interface LayerCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  activeLayer: LayerItem;
  sectionDescription: string;
  layers: LayerItem[];
  activeLayerIndex: number;
  isSideBySide: boolean;
  onJumpToLayer: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LayerCard: React.FC<LayerCardProps> = ({
  cardRef,
  activeLayer,
  sectionDescription,
  layers,
  activeLayerIndex,
  isSideBySide,
  onJumpToLayer,
  onNext,
  onPrev,
}) => {
  return (
    <div
      ref={cardRef}
      className="w-full lg:w-[44%] xl:w-[40%] max-w-lg lg:max-w-[450px] z-30 flex items-center justify-center shrink-0 mb-1 sm:mb-2 lg:my-auto lg:self-center px-1 sm:px-0"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer.id}
          initial={{ opacity: 0, x: isSideBySide ? 14 : 0, y: isSideBySide ? 0 : 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: isSideBySide ? -10 : 0, y: isSideBySide ? 0 : -6 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="w-full bg-neutral-950 text-white rounded-2xl p-3 sm:p-4 lg:p-6 shadow-enterprise-xl border border-neutral-800 relative overflow-hidden backdrop-blur-xl max-h-[calc(100dvh-310px)] sm:max-h-[calc(100dvh-340px)] md:max-h-[calc(100dvh-360px)] lg:max-h-[calc(100dvh-130px)] flex flex-col justify-between"
        >
          {/* Scrollable container inside card to prevent any cutoff on small vertical displays */}
          <div className="overflow-y-auto scrollbar-thin pr-1">
            {/* Accent Header Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-3 sm:h-3.5 bg-[#E5FE54] rounded-full inline-block" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#E5FE54] uppercase">
                  LAYER 0{activeLayer.id} // ACTIVE
                </span>
              </div>

              <span className="text-[9.5px] sm:text-[11px] font-mono font-semibold bg-neutral-900 border border-neutral-700/80 text-neutral-300 px-2 py-0.5 rounded-full">
                WING 0{activeLayer.id}
              </span>
            </div>

            {/* Layer Title strictly from JSON */}
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white tracking-tight leading-snug">
              {activeLayer.title}
            </h3>

            {/* Primary Associated Description Text strictly from JSON */}
            <p className="mt-1.5 text-xs sm:text-sm lg:text-base text-neutral-200 font-medium leading-relaxed">
              {activeLayer.description}
            </p>

            {/* Architectural Section Context */}
            <p className="mt-1.5 text-[10.5px] sm:text-xs text-neutral-400 leading-normal line-clamp-2 sm:line-clamp-none">
              {sectionDescription}
            </p>

            {/* Protocol / Architecture Tags strictly from JSON */}
            <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex flex-wrap gap-1 sm:gap-1.5">
              {activeLayer.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] sm:text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 px-1.5 sm:px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Stepper Bar (Direct Click & Touch Navigation) */}
          <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              {layers.map((l, idx) => (
                <button
                  key={l.id}
                  onClick={() => onJumpToLayer(idx)}
                  className={`h-5 sm:h-6 px-1.5 sm:px-2 text-[9px] sm:text-[10px] font-mono font-bold rounded transition-all cursor-pointer ${
                    idx === activeLayerIndex
                      ? 'bg-[#E5FE54] text-neutral-950 shadow-xs scale-105'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                  title={`Rotate to Layer ${l.id}: ${l.title}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <div className="text-[10px] font-mono text-neutral-400 hidden sm:block">
              Scroll to rotate 3D model
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={onPrev}
                disabled={activeLayerIndex === 0}
                className="w-6 h-6 rounded bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous layer"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={onNext}
                disabled={activeLayerIndex === layers.length - 1}
                className="w-6 h-6 rounded bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next layer"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
