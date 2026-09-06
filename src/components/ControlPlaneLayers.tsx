'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Cpu,
} from 'lucide-react';
import { Hero3DCanvas, WingPosition } from './Hero3DCanvas';
import { SITE_DATA } from '../data/siteContent';

interface ControlPlaneLayersProps {
  onOpenDemo?: () => void;
}

export const ControlPlaneLayers: React.FC<ControlPlaneLayersProps> = ({ onOpenDemo }) => {
  const sectionData = SITE_DATA.control_plane_layers;
  const layers = sectionData.layers;

  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [wingPos, setWingPos] = useState<WingPosition | null>(null);
  const [cardAnchor, setCardAnchor] = useState<{ x: number; y: number } | null>(null);
  const [isSideBySide, setIsSideBySide] = useState<boolean>(true);

  const outerTrackRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Responsive layout detection: Desktop (>= 1024px) uses side-by-side, Tablets (< 1024px) & Mobile use stacked mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsSideBySide(window.innerWidth >= 1024);
      updateCardAnchor();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalculate card connection anchor position
  const updateCardAnchor = useCallback(() => {
    if (!stageRef.current || !cardRef.current) return;

    const stageRect = stageRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    if (window.innerWidth >= 1024) {
      // Desktop: Connect to left edge of the card
      const anchorX = cardRect.left - stageRect.left;
      const anchorY = cardRect.top - stageRect.top + Math.min(60, cardRect.height * 0.25);
      setCardAnchor({ x: Math.max(0, anchorX), y: Math.max(0, anchorY) });
    } else {
      // Mobile & Tablet: Connect to top edge of card
      const anchorX = cardRect.left - stageRect.left + cardRect.width * 0.5;
      const anchorY = cardRect.top - stageRect.top;
      setCardAnchor({ x: Math.max(0, anchorX), y: Math.max(0, anchorY) });
    }
  }, []);

  // Synchronize scroll with 3D model rotation through all 7 layers
  useEffect(() => {
    const handleScroll = () => {
      if (!outerTrackRef.current) return;

      const rect = outerTrackRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(rawProgress);

      // Quantize progress into 7 discrete layer steps (0 to 6)
      const numLayers = layers.length; // 7
      const calculatedIndex = Math.min(
        numLayers - 1,
        Math.floor(rawProgress * numLayers)
      );

      setActiveLayerIndex(calculatedIndex);
      updateCardAnchor();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateCardAnchor, layers.length]);

  // Jump to specific layer by programmatic scroll
  const handleJumpToLayer = (index: number) => {
    if (!outerTrackRef.current) return;
    const rect = outerTrackRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const stepRatio = (index + 0.5) / layers.length;
    const targetScrollY = window.scrollY + rect.top + stepRatio * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const nextIdx = Math.min(layers.length - 1, activeLayerIndex + 1);
    handleJumpToLayer(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeLayerIndex - 1);
    handleJumpToLayer(prevIdx);
  };

  const activeLayer = layers[activeLayerIndex] || layers[0];

  // Dynamic SVG Graph Line calculation
  const startPt = wingPos
    ? { x: wingPos.x, y: wingPos.y }
    : {
        x: stageRef.current ? stageRef.current.clientWidth * (isSideBySide ? 0.35 : 0.5) : 300,
        y: stageRef.current ? stageRef.current.clientHeight * (isSideBySide ? 0.45 : 0.25) : 250,
      };

  const endPt = cardAnchor
    ? cardAnchor
    : {
        x: stageRef.current ? stageRef.current.clientWidth * (isSideBySide ? 0.65 : 0.5) : 450,
        y: stageRef.current ? stageRef.current.clientHeight * (isSideBySide ? 0.45 : 0.55) : 350,
      };

  const deltaX = endPt.x - startPt.x;
  const deltaY = endPt.y - startPt.y;

  let graphPath = '';
  if (isSideBySide) {
    const midX = startPt.x + deltaX * 0.55;
    graphPath = `M ${startPt.x} ${startPt.y} L ${midX} ${startPt.y} L ${midX} ${endPt.y} L ${endPt.x} ${endPt.y}`;
  } else {
    const midY = startPt.y + deltaY * 0.5;
    graphPath = `M ${startPt.x} ${startPt.y} L ${startPt.x} ${midY} L ${endPt.x} ${midY} L ${endPt.x} ${endPt.y}`;
  }

  return (
    <section
      id="control-plane-section"
      ref={outerTrackRef}
      className="relative bg-white border-b border-neutral-200 min-h-[420vh] sm:min-h-[480vh] lg:min-h-[500vh]"
    >
      {/* Sticky Viewport pinned while scrolling through all 7 layers - Uses 100dvh for exact viewport height */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-white z-20">
        
        {/* Top Header: strictly adheres to title & subtitle from JSON */}
        <div className="w-full border-b border-neutral-100 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-2 z-30 shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                {sectionData.title}
              </span>
              <span className="text-neutral-300">/</span>
              <h2 className="text-xs sm:text-sm font-bold text-neutral-950 tracking-tight flex items-center space-x-2">
                <Layers size={14} className="text-neutral-700" />
                <span>{sectionData.subtitle}</span>
              </h2>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="hidden sm:flex items-center space-x-1.5 text-neutral-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px]">100% IN-VPC</span>
              </div>
              <div className="flex items-center space-x-1.5 text-neutral-950 font-bold bg-[#E5FE54]/40 border border-[#E5FE54] px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span>LAYER 0{activeLayerIndex + 1} OF 07</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Main Stage: 3D Canvas + SVG Graph Line + Dynamic Layer Card */}
        <div
          ref={stageRef}
          className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between overflow-hidden py-1 min-h-0"
        >
          {/* 1. 3D Model Stage with the 7 Wings rotating on scroll - Scaled with DVH to prevent pushing card offscreen on tablets */}
          <div className="relative w-full lg:w-[56%] xl:w-[58%] h-[26dvh] sm:h-[30dvh] md:h-[32dvh] max-h-[220px] sm:max-h-[260px] md:max-h-[290px] lg:max-h-none lg:h-full flex items-center justify-center select-none shrink-0 lg:shrink">
            <Hero3DCanvas
              activeLayerIndex={activeLayerIndex}
              scrollProgress={scrollProgress}
              onActiveWingPositionChange={(pos) => {
                setWingPos(pos);
                updateCardAnchor();
              }}
              className="w-full h-full min-h-[160px] sm:min-h-[190px] md:min-h-[220px] lg:min-h-[520px]"
            />
          </div>

          {/* 2. Live Dynamic SVG Graph Line (Directly connects rotated wing beacon to descriptive text) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="graphLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0a0a0a" stopOpacity="1" />
                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Background trace line */}
            <path
              d={graphPath}
              fill="none"
              stroke="#E5E5E5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Core technical leader graph line */}
            <path
              d={graphPath}
              fill="none"
              stroke="url(#graphLineGrad)"
              strokeWidth="2"
              strokeDasharray="5 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Origin Hotspot on the Rotated 3D Wing */}
            <g transform={`translate(${startPt.x}, ${startPt.y})`}>
              <circle
                r="9"
                fill="none"
                stroke="#E5FE54"
                strokeWidth="2"
                opacity="0.85"
                className="animate-ping"
              />
              <circle
                r="5"
                fill="#E5FE54"
                stroke="#0a0a0a"
                strokeWidth="2"
              />
              <text
                x="12"
                y="-5"
                fill="#0a0a0a"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="700"
                className="select-none"
              >
                LAYER 0{activeLayerIndex + 1}
              </text>
            </g>

            {/* Terminal node entering the descriptive card */}
            <g transform={`translate(${endPt.x}, ${endPt.y})`}>
              <circle
                r="4.5"
                fill="#0a0a0a"
                stroke="#E5FE54"
                strokeWidth="2"
              />
            </g>
          </svg>

          {/* 3. Associated Descriptive Text Card (Guaranteed never to be cut off across any DVH) */}
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
                    {sectionData.description}
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
                        onClick={() => handleJumpToLayer(idx)}
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
                      onClick={handlePrev}
                      disabled={activeLayerIndex === 0}
                      className="w-6 h-6 rounded bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous layer"
                    >
                      <ChevronLeft size={13} />
                    </button>
                    <button
                      onClick={handleNext}
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
        </div>

        {/* Minimal Bottom Bar with Real-time Scroll Indicator & Layer Breadcrumbs */}
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

      </div>
    </section>
  );
};
