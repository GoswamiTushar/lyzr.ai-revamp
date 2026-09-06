'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { WingPosition } from './Hero3DCanvas';
import { Hero3DCanvasDeferred } from './control-plane/Hero3DCanvasDeferred';
import { LayerHeaderBar } from './control-plane/LayerHeaderBar';
import { LayerFooterBar } from './control-plane/LayerFooterBar';
import { LayerCard } from './control-plane/LayerCard';
import { SITE_DATA } from '../data/siteContent';

interface ControlPlaneLayersProps {
  onOpenDemo?: () => void;
}

export const ControlPlaneLayers: React.FC<ControlPlaneLayersProps> = () => {
  const sectionData = SITE_DATA.control_plane_layers;
  const layers = sectionData.layers;

  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [wingPos, setWingPos] = useState<WingPosition | null>(null);
  const [cardAnchor, setCardAnchor] = useState<{ x: number; y: number } | null>(null);
  const [isSideBySide, setIsSideBySide] = useState<boolean>(true);

  const outerTrackRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
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
  // Offset projected wing beacon by canvasContainer position relative to stageRef
  let startPt = {
    x: stageRef.current ? stageRef.current.clientWidth * (isSideBySide ? 0.35 : 0.5) : 300,
    y: stageRef.current ? stageRef.current.clientHeight * (isSideBySide ? 0.45 : 0.35) : 250,
  };

  if (wingPos && stageRef.current && canvasContainerRef.current) {
    const stageRect = stageRef.current.getBoundingClientRect();
    const canvasRect = canvasContainerRef.current.getBoundingClientRect();
    startPt = {
      x: canvasRect.left - stageRect.left + wingPos.x,
      y: canvasRect.top - stageRect.top + wingPos.y,
    };
  } else if (wingPos) {
    startPt = { x: wingPos.x, y: wingPos.y };
  }

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
    // Mobile and Tablet: short technical stepped connector downwards into the card top
    const midY = startPt.y + Math.max(8, deltaY * 0.5);
    graphPath = `M ${startPt.x} ${startPt.y} L ${startPt.x} ${midY} L ${endPt.x} ${midY} L ${endPt.x} ${endPt.y}`;
  }

  return (
    <section
      id="control-plane-section"
      ref={outerTrackRef}
      className="relative bg-white border-b border-neutral-200 min-h-[420vh] sm:min-h-[480vh] lg:min-h-[500vh]"
    >
      {/* Sticky Viewport pinned while scrolling through all 7 layers - Generous breathing room below sticky navbar on all devices */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-white z-20 pt-[78px] sm:pt-[88px] lg:pt-[94px]">
        
        {/* Top Header: strictly adheres to title & subtitle from JSON */}
        <LayerHeaderBar
          title={sectionData.title}
          subtitle={sectionData.subtitle}
          activeLayerIndex={activeLayerIndex}
        />

        {/* Unified Main Stage: 3D Canvas + SVG Graph Line + Dynamic Layer Card */}
        <div
          ref={stageRef}
          className="relative flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between overflow-hidden py-1 min-h-0 gap-1 sm:gap-2 lg:gap-8"
        >
          {/* 1. 3D Model Stage with the 7 Wings rotating on scroll - Scaled with DVH */}
          <div
            ref={canvasContainerRef}
            className="relative w-full lg:w-[56%] xl:w-[58%] h-[38dvh] sm:h-[42dvh] md:h-[45dvh] min-h-[260px] sm:min-h-[300px] md:min-h-[340px] max-h-[340px] sm:max-h-[400px] md:max-h-[460px] lg:max-h-none lg:h-full flex items-center justify-center select-none shrink-0 lg:shrink"
          >
            <Hero3DCanvasDeferred
              activeLayerIndex={activeLayerIndex}
              scrollProgress={scrollProgress}
              onActiveWingPositionChange={(pos) => {
                setWingPos(pos);
                updateCardAnchor();
              }}
              className="w-full h-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[520px]"
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
                r="10"
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
              {/* Frosted callout pill badge for ultra-crisp legibility */}
              <g transform="translate(10, -18)">
                <rect
                  x="0"
                  y="0"
                  width="72"
                  height="19"
                  rx="9.5"
                  fill="rgba(255, 255, 255, 0.95)"
                  stroke="#171717"
                  strokeWidth="1"
                  className="shadow-xs"
                />
                <text
                  x="36"
                  y="13"
                  textAnchor="middle"
                  fill="#0a0a0a"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="700"
                  className="select-none"
                >
                  LAYER 0{activeLayerIndex + 1}
                </text>
              </g>
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

          {/* 3. Associated Descriptive Text Card (Vertically centered on desktop) */}
          <LayerCard
            cardRef={cardRef}
            activeLayer={activeLayer}
            sectionDescription={sectionData.description}
            layers={layers}
            activeLayerIndex={activeLayerIndex}
            isSideBySide={isSideBySide}
            onJumpToLayer={handleJumpToLayer}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>

        {/* Minimal Bottom Bar with Real-time Scroll Indicator & Layer Breadcrumbs */}
        <LayerFooterBar
          layers={layers}
          activeLayerIndex={activeLayerIndex}
        />

      </div>
    </section>
  );
};
