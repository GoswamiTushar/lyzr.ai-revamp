'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Plus, X, Layers, Cpu, Compass, Box } from 'lucide-react';

interface EcosystemLayer {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
}

const LAYERS: EcosystemLayer[] = [
  {
    id: 'open-controller',
    name: 'Open Controller',
    description:
      'Centralized governance, observability, and neutral control plane across all agents, frameworks, and LLMs in your enterprise.',
    tags: ['Observability', 'Governance', 'Audit Trail', 'Cost Controls'],
    icon: Compass,
  },
  {
    id: 'architect',
    name: 'Architect',
    description:
      'Build any agent with plain language. Logic, integrations, access controls, and UI delivered ready for production.',
    tags: ['Natural Language', 'No-Code', 'Auto-Wiring', 'RBAC Ready'],
    icon: Cpu,
  },
  {
    id: 'agent-studio',
    name: 'Agent Studio',
    description:
      'The pro-code workbench for engineering teams. Design, test, and ship production agents from one place.',
    tags: ['Workflows', 'Integrations', 'Testing', 'Deployments'],
    icon: Layers,
  },
  {
    id: 'agent-blocks',
    name: 'Agent Blocks',
    description:
      'Modular, production-tested primitives for memory, RAG, tool calling, and multi-agent orchestration.',
    tags: ['Cognis Memory', 'Knowledge Base', 'RAG Pipelines', 'Tool Calling'],
    icon: Box,
  },
];

interface EcosystemArchitectureSectionProps {
  onOpenDemo?: () => void;
}

interface LayerTheme {
  name: string;
  gradientId: string;
  gradientIdMob: string;
  gradientStart: string;
  gradientEnd: string;
  frontLeft: string;
  frontRight: string;
  planeTextColor: string;
  badgeBg: string;
  badgeTextColor: string;
  accentLine: string;
  tabActiveBg: string;
  tabActiveText: string;
}

// Custom theme color per active layer:
// 1st Layer: Green
// 2nd Layer: Red
// 3rd Layer: Yellow (with high-contrast dark text)
// 4th Layer: Black
const LAYER_THEMES: LayerTheme[] = [
  {
    name: 'Open Controller',
    gradientId: 'layerGradGreen',
    gradientIdMob: 'layerGradGreenMob',
    gradientStart: '#16A34A',
    gradientEnd: '#0D5C3A',
    frontLeft: '#09452B',
    frontRight: '#052A1A',
    planeTextColor: '#FFFFFF',
    badgeBg: 'bg-[#15803D]',
    badgeTextColor: 'text-white',
    accentLine: 'bg-[#15803D]',
    tabActiveBg: 'bg-[#15803D]',
    tabActiveText: 'text-white',
  },
  {
    name: 'Architect',
    gradientId: 'layerGradRed',
    gradientIdMob: 'layerGradRedMob',
    gradientStart: '#EF4444',
    gradientEnd: '#B91C1C',
    frontLeft: '#881313',
    frontRight: '#5C0D0D',
    planeTextColor: '#FFFFFF',
    badgeBg: 'bg-[#DC2626]',
    badgeTextColor: 'text-white',
    accentLine: 'bg-[#DC2626]',
    tabActiveBg: 'bg-[#DC2626]',
    tabActiveText: 'text-white',
  },
  {
    name: 'Agent Studio',
    gradientId: 'layerGradYellow',
    gradientIdMob: 'layerGradYellowMob',
    gradientStart: '#FDE047',
    gradientEnd: '#EAB308',
    frontLeft: '#B45309',
    frontRight: '#78350F',
    planeTextColor: '#0A0A0A',
    badgeBg: 'bg-[#FACC15]',
    badgeTextColor: 'text-neutral-950 font-bold',
    accentLine: 'bg-[#EAB308]',
    tabActiveBg: 'bg-[#FACC15]',
    tabActiveText: 'text-neutral-950 font-bold',
  },
  {
    name: 'Agent Blocks',
    gradientId: 'layerGradBlack',
    gradientIdMob: 'layerGradBlackMob',
    gradientStart: '#2E2E2E',
    gradientEnd: '#0A0A0A',
    frontLeft: '#1A1A1A',
    frontRight: '#000000',
    planeTextColor: '#FFFFFF',
    badgeBg: 'bg-[#0A0A0A]',
    badgeTextColor: 'text-white',
    accentLine: 'bg-[#0A0A0A]',
    tabActiveBg: 'bg-[#0A0A0A]',
    tabActiveText: 'text-white',
  },
];

export const EcosystemArchitectureSection: React.FC<EcosystemArchitectureSectionProps> = ({ onOpenDemo: _onOpenDemo }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const mobileProgressBarRef = useRef<HTMLDivElement>(null);

  // Scroll-driven Parallax Dot Grid matching Hero Section (without aurora)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const bgDotsY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  // Scroll listener to update active layer based on scroll progress within the sticky section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const navOffset = window.innerWidth >= 640 ? 72 : 64;
      const totalScrollable = containerRef.current.offsetHeight - windowHeight;

      if (totalScrollable <= 0) return;

      // Distance scrolled past sticky lock point under navbar
      const scrolled = -(rect.top - navOffset);
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Direct GPU transform update for zero-latency, 100% analog response on every scroll pixel
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      if (mobileProgressBarRef.current) {
        mobileProgressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // Map progress across the 4 layers:
      // [0, 0.25) -> Layer 0 (Open Controller)
      // [0.25, 0.50) -> Layer 1 (Architect)
      // [0.50, 0.75) -> Layer 2 (Agent Studio)
      // [0.75, 1.00] -> Layer 3 (Agent Blocks)
      const targetIndex = Math.min(LAYERS.length - 1, Math.floor(progress * LAYERS.length));
      setActiveIndex(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly scroll to a specific layer on manual click
  const scrollToLayer = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    const navOffset = window.innerWidth >= 640 ? 72 : 64;
    const containerTop = currentScrollY + rect.top - navOffset;
    const totalScrollable = containerRef.current.offsetHeight - windowHeight();

    // Center the target scroll within that layer's segment
    const targetOffset = ((index + 0.5) / LAYERS.length) * totalScrollable;
    window.scrollTo({
      top: containerTop + targetOffset,
      behavior: 'smooth',
    });
  };

  const windowHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 800);

  // Isometric Diamond Planes Configuration from Top (idx 0) to Bottom (idx 3)
  const planeConfigs = [
    { index: 0, name: 'Open Controller', baseY: 30 },
    { index: 1, name: 'Architect', baseY: 140 },
    { index: 2, name: 'Agent Studio', baseY: 250 },
    { index: 3, name: 'Agent Blocks', baseY: 360 },
  ];

  // Render planes from Bottom to Top (3 -> 2 -> 1 -> 0) so each upper plane's bottom overlays
  // the top corner of the plane below, keeping all 4 labels completely visible!
  const renderedPlanes = [...planeConfigs].reverse();

  const currentLayer = LAYERS[activeIndex];
  const CurrentIcon = currentLayer.icon;

  return (
    <>
      {/* 1. Normal Flow Heading Section: Scrolls up naturally and does NOT stay pinned in the mounted component */}
      <div className="relative w-full bg-[#FCFCFB] pt-16 sm:pt-20 pb-8 sm:pb-12 border-t border-neutral-200 overflow-hidden">
        {/* Ambient Dot Grid matching Hero Section */}
        <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-950 leading-[1.12]">
            Your entire agent ecosystem,<br />
            One view.
          </h2>
        </div>
      </div>

      {/* 2. Scroll-Track Container for Sticky Pinning */}
      <div
        ref={containerRef}
        id="agent-ecosystem-section"
        className="relative w-full h-[320vh] bg-[#FCFCFB]"
      >
        {/* Pinned Sticky Section (Docks directly below navbar, never behind it) */}
        <section className="sticky top-[60px] sm:top-[68px] h-[calc(100dvh-60px)] sm:h-[calc(100dvh-68px)] w-full overflow-hidden bg-[#FCFCFB] text-neutral-900 border-b border-neutral-200 flex flex-col justify-between px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2.5 lg:py-6 select-none z-20">
          {/* Parallax Dot Grid Background (matching Hero Section without aurora) */}
          <motion.div
            style={{ y: bgDotsY }}
            className="absolute -inset-y-36 inset-x-0 bg-dot-grid opacity-75 pointer-events-none z-0 will-change-transform"
          />

          <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between lg:justify-center min-h-0 relative z-10">

            {/* DESKTOP VIEW (lg+ >= 1024px) - Two-column interactive layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full my-auto">

              {/* Left Column: 3D Stacked Isometric Planes */}
              <div className="lg:col-span-7 flex items-center justify-center relative w-full h-full max-h-[520px] lg:max-h-[600px]">
                <svg
                  viewBox="0 0 740 640"
                  className="w-full h-full max-w-[540px] lg:max-w-[660px] drop-shadow-sm select-none"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    {LAYER_THEMES.map((theme) => (
                      <linearGradient key={theme.gradientId} id={theme.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={theme.gradientStart} />
                        <stop offset="100%" stopColor={theme.gradientEnd} />
                      </linearGradient>
                    ))}
                  </defs>

                  {renderedPlanes.map((plane) => {
                    const idx = plane.index;
                    const isActive = activeIndex === idx;
                    const theme = LAYER_THEMES[idx];
                    const baseY = plane.baseY;
                    const slabThickness = 16;

                    // Diamond plane corners
                    const pLeft = { x: 30, y: baseY + 120 };
                    const pTop = { x: 270, y: baseY };
                    const pRight = { x: 690, y: baseY + 150 };
                    const pBottom = { x: 440, y: baseY + 270 };

                    const topFaceD = `M ${pLeft.x} ${pLeft.y} L ${pTop.x} ${pTop.y} L ${pRight.x} ${pRight.y} L ${pBottom.x} ${pBottom.y} Z`;
                    const frontLeftD = `M ${pLeft.x} ${pLeft.y} L ${pBottom.x} ${pBottom.y} L ${pBottom.x} ${pBottom.y + slabThickness} L ${pLeft.x} ${pLeft.y + slabThickness} Z`;
                    const frontRightD = `M ${pBottom.x} ${pBottom.y} L ${pRight.x} ${pRight.y} L ${pRight.x} ${pRight.y + slabThickness} L ${pBottom.x} ${pBottom.y + slabThickness} Z`;

                    // Text position: placed along the exposed lower plane face
                    const textX = 390;
                    const textY = baseY + 225;

                    return (
                      <g
                        key={`plane-${plane.name}`}
                        onClick={() => scrollToLayer(idx)}
                        className="cursor-pointer transition-all duration-300 group"
                      >
                        {/* Front-left edge thickness */}
                        <path
                          d={frontLeftD}
                          fill={isActive ? theme.frontLeft : '#FFFFFF'}
                          stroke="#171717"
                          strokeWidth={isActive ? '1.8' : '1.4'}
                          strokeLinejoin="round"
                        />

                        {/* Front-right edge thickness */}
                        <path
                          d={frontRightD}
                          fill={isActive ? theme.frontRight : '#E5E5E5'}
                          stroke="#171717"
                          strokeWidth={isActive ? '1.8' : '1.4'}
                          strokeLinejoin="round"
                        />

                        {/* Top Diamond Face */}
                        <path
                          d={topFaceD}
                          fill={isActive ? `url(#${theme.gradientId})` : '#FFFFFF'}
                          stroke="#171717"
                          strokeWidth={isActive ? '1.8' : '1.4'}
                          strokeLinejoin="round"
                          className="transition-colors duration-300"
                        />

                        {/* Label Text rendered on the lower surface of the plane, tilted at 20° along plane axis */}
                        <g transform={`translate(${textX}, ${textY}) rotate(20)`}>
                          <text
                            x="0"
                            y="0"
                            textAnchor="middle"
                            fill={isActive ? theme.planeTextColor : '#171717'}
                            fontSize="24"
                            fontWeight={isActive ? '600' : '400'}
                            letterSpacing="-0.02em"
                            fontFamily="inherit"
                            className="transition-colors duration-300 pointer-events-none select-none"
                          >
                            {plane.name}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Right Column: Accordion List */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="border-t border-[#EAE3DA]">
                  {LAYERS.map((layer, index) => {
                    const isActive = activeIndex === index;
                    const layerTheme = LAYER_THEMES[index];
                    const Icon = layer.icon;

                    return (
                      <div
                        key={layer.id}
                        className="border-b border-[#EAE3DA] relative transition-colors duration-200"
                      >
                        {/* Header Row */}
                        <button
                          onClick={() => scrollToLayer(index)}
                          className="w-full py-4 sm:py-5 flex items-center justify-between text-left cursor-pointer group focus:outline-none"
                          aria-expanded={isActive}
                        >
                          <div className="flex items-center space-x-2.5">
                            {/* Layer custom colored square icon when active */}
                            {isActive && (
                              <span className={`w-5 h-5 rounded ${layerTheme.badgeBg} ${layerTheme.badgeTextColor} flex items-center justify-center shrink-0`}>
                                <Icon size={12} strokeWidth={2.2} />
                              </span>
                            )}

                            <span
                              className={`text-base sm:text-lg lg:text-xl transition-colors ${isActive
                                ? 'font-semibold text-neutral-950'
                                : 'font-normal text-neutral-800 group-hover:text-neutral-950'
                                }`}
                            >
                              {layer.name}
                            </span>
                          </div>

                          {/* Right Expand / Collapse icon */}
                          <span className="text-[#9C9488] p-1 flex items-center justify-center">
                            {isActive ? (
                              <X size={18} strokeWidth={1.5} className="text-[#C07060]" />
                            ) : (
                              <Plus size={18} strokeWidth={1.5} className="group-hover:text-neutral-700 transition-colors" />
                            )}
                          </span>
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pb-5 pt-0">
                                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-lg mb-4">
                                  {layer.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-2">
                                  {layer.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-3 py-1 text-xs font-normal text-neutral-700 bg-white border border-neutral-300 rounded-full shadow-2xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Active Custom Layer Accent Line */}
                              <div className={`w-full h-[2px] ${layerTheme.accentLine} mt-1`} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Step indicator with real-time Noticeable Analog Scroll Progress Bar */}
                <div className="mt-8 pt-3.5 border-neutral-200 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span className="flex items-center gap-2 text-neutral-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
                      <span>Scroll to step through layers</span>
                    </span>
                    <span className="font-semibold text-neutral-900 tracking-wider">
                      0{activeIndex + 1} / 0{LAYERS.length}
                    </span>
                  </div>

                  {/* Noticeable Analog Scroll Progress Track */}
                  <div className="w-full h-1.5 bg-neutral-200/90 rounded-full overflow-hidden">
                    <div
                      ref={progressBarRef}
                      className="h-full w-full bg-neutral-900 rounded-full origin-left will-change-transform"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* MOBILE & TABLET VIEW (< lg / under 1024px) - Balanced vertical layout */}
            <div className="flex lg:hidden flex-col justify-between items-center h-full min-h-0 px-2 sm:px-4 pt-3.5 sm:pt-4.5 pb-4 sm:pb-6">

              {/* 1. Mobile Top Scroll Indicator & Progress Bar (anchors top with comfortable space below navbar) */}
              <div className="flex flex-col gap-1.5 text-center text-[10px] sm:text-[11px] font-mono text-neutral-500 shrink-0 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto px-1 pt-1 pb-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
                    <span>Scroll to step through layers ↓</span>
                  </span>
                  <span className="font-bold text-neutral-900">0{activeIndex + 1} / 04</span>
                </div>
                <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    ref={mobileProgressBarRef}
                    className="h-full w-full bg-neutral-900 rounded-full origin-left will-change-transform"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              </div>

              {/* Dynamic Body: Justified and equal spacing around layers illustration and text card box */}
              <div className="flex-1 w-full flex flex-col justify-evenly items-center min-h-0 py-1 sm:py-2">

                {/* 2. 3D Layers SVG - Proportional presence */}
                <div className="w-full flex items-center justify-center relative shrink-0">
                  <svg
                    viewBox="10 15 720 635"
                    className="h-[27dvh] sm:h-[31dvh] md:h-[35dvh] min-h-[185px] sm:min-h-[225px] md:min-h-[265px] max-h-[260px] sm:max-h-[305px] md:max-h-[355px] w-auto max-w-[285px] sm:max-w-[345px] md:max-w-[405px] drop-shadow-md select-none object-contain"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      {LAYER_THEMES.map((theme) => (
                        <linearGradient key={theme.gradientIdMob} id={theme.gradientIdMob} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={theme.gradientStart} />
                          <stop offset="100%" stopColor={theme.gradientEnd} />
                        </linearGradient>
                      ))}
                    </defs>

                    {renderedPlanes.map((plane) => {
                      const idx = plane.index;
                      const isActive = activeIndex === idx;
                      const theme = LAYER_THEMES[idx];
                      const baseY = plane.baseY;
                      const slabThickness = 17;

                      const pLeft = { x: 30, y: baseY + 120 };
                      const pTop = { x: 270, y: baseY };
                      const pRight = { x: 690, y: baseY + 150 };
                      const pBottom = { x: 440, y: baseY + 270 };

                      const topFaceD = `M ${pLeft.x} ${pLeft.y} L ${pTop.x} ${pTop.y} L ${pRight.x} ${pRight.y} L ${pBottom.x} ${pBottom.y} Z`;
                      const frontLeftD = `M ${pLeft.x} ${pLeft.y} L ${pBottom.x} ${pBottom.y} L ${pBottom.x} ${pBottom.y + slabThickness} L ${pLeft.x} ${pLeft.y + slabThickness} Z`;
                      const frontRightD = `M ${pBottom.x} ${pBottom.y} L ${pRight.x} ${pRight.y} L ${pRight.x} ${pRight.y + slabThickness} L ${pBottom.x} ${pBottom.y + slabThickness} Z`;

                      const textX = 390;
                      const textY = baseY + 225;

                      return (
                        <g
                          key={`mob-plane-${plane.name}`}
                          onClick={() => scrollToLayer(idx)}
                          className="cursor-pointer transition-all duration-300"
                        >
                          <path
                            d={frontLeftD}
                            fill={isActive ? theme.frontLeft : '#FFFFFF'}
                            stroke="#171717"
                            strokeWidth={isActive ? '2.2' : '1.5'}
                            strokeLinejoin="round"
                          />
                          <path
                            d={frontRightD}
                            fill={isActive ? theme.frontRight : '#E5E5E5'}
                            stroke="#171717"
                            strokeWidth={isActive ? '2.2' : '1.5'}
                            strokeLinejoin="round"
                          />
                          <path
                            d={topFaceD}
                            fill={isActive ? `url(#${theme.gradientIdMob})` : '#FFFFFF'}
                            stroke="#171717"
                            strokeWidth={isActive ? '2.2' : '1.5'}
                            strokeLinejoin="round"
                          />
                          <g transform={`translate(${textX}, ${textY}) rotate(20)`}>
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill={isActive ? theme.planeTextColor : '#171717'}
                              fontSize="26"
                              fontWeight={isActive ? '700' : '600'}
                              letterSpacing="-0.02em"
                              fontFamily="inherit"
                            >
                              {plane.name}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* 3. Below: Content card with generous height, breathing room, and structured spacing */}
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-white/95 backdrop-blur-xs border border-[#E7E2D9] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-2.5 sm:gap-3 shrink-0 min-h-[148px] sm:min-h-[162px]">

                  {/* Active Layer Header with Icon & Counter */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${LAYER_THEMES[activeIndex].badgeBg} ${LAYER_THEMES[activeIndex].badgeTextColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                        <CurrentIcon size={14} strokeWidth={2.2} />
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-950 tracking-tight">
                        {currentLayer.name}
                      </h3>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-neutral-600 bg-neutral-100 font-semibold px-2.5 py-1 rounded-md border border-neutral-200/60">
                      {activeIndex + 1} / {LAYERS.length}
                    </span>
                  </div>

                  {/* Description & Tags */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLayer.id}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.16 }}
                      className="flex flex-col"
                    >
                      <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mb-3 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
                        {currentLayer.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {currentLayer.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200/80 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                </div>

              </div>

            </div>

          </div>

        </section>
      </div>
    </>
  );
};
