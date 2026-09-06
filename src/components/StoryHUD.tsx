import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ShieldCheck, ChevronRight, Terminal, Volume2, VolumeX, Eye } from 'lucide-react';

export interface Chapter {
  id: string;
  act: string;
  title: string;
  tagline: string;
}

export const CHAPTERS: Chapter[] = [
  { id: 'hero', act: 'PROLOGUE', title: 'The Platform', tagline: 'The Autonomous Enterprise' },
  { id: 'control-plane-section', act: 'ACT 01', title: '7-Layer Control Plane', tagline: '3D Sovereign Architecture' },
  { id: 'production-gap-section', act: 'ACT 02', title: 'Production Chasm', tagline: 'Why 92% of POCs Fail' },
  { id: 'three-ways-section', act: 'ACT 03', title: 'Execution Modalities', tagline: 'Three Ways to Ship' },
  { id: 'agent-studio-section', act: 'ACT 04', title: 'Agent Studio', tagline: 'Visual Orchestration' },
  { id: 'why-choose-section', act: 'ACT 05', title: 'Enterprise Proof', tagline: 'The 5 Core Reasons' },
  { id: 'case-studies-section', act: 'ACT 06', title: 'Field Realities', tagline: 'Live in Production' },
  { id: 'final-cta-section', act: 'EPILOGUE', title: 'VPC Handshake', tagline: 'Zero-Egress Deployment' },
];

interface StoryHUDProps {
  currentChapterId: string;
  onSelectChapter: (id: string) => void;
  scrollProgress: number; // 0 to 100
}

export const StoryHUD: React.FC<StoryHUDProps> = ({
  currentChapterId,
  onSelectChapter,
  scrollProgress,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [soundSimulation, setSoundSimulation] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().substring(11, 19) + ' UTC'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeChapterIndex = CHAPTERS.findIndex((c) => c.id === currentChapterId);
  const currentChapter = CHAPTERS[activeChapterIndex >= 0 ? activeChapterIndex : 0];

  return (
    <>
      {/* Top Fixed Telemetry Progress Ribbon */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        {/* Continuous high-precision progress line */}
        <div className="h-[2px] w-full bg-neutral-200">
          <motion.div
            className="h-full bg-neutral-950 relative"
            style={{ width: `${scrollProgress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          >
            {/* Tracer head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#E5FE54] border border-black/20 shadow-enterprise-xs" />
          </motion.div>
        </div>
      </div>

      {/* Floating Cinematic Story Navigator Bar (Bottom Center) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] sm:w-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0A0A0A]/95 backdrop-blur-md text-white border border-neutral-800 rounded-full shadow-enterprise-lg px-4 py-2 flex items-center justify-between gap-3 sm:gap-6 font-mono text-xs"
        >
          {/* Act Badge & Title */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2.5 cursor-pointer select-none group"
            title="Click to expand story chapter guide"
          >
            <span className="bg-[#E5FE54] text-neutral-950 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-black/10 group-hover:bg-white transition-colors">
              {currentChapter.act}
            </span>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-white group-hover:text-[#E5FE54] transition-colors leading-tight flex items-center gap-1">
                <span>{currentChapter.title}</span>
                <ChevronRight
                  size={12}
                  className={`transition-transform duration-200 ${
                    isExpanded ? '-rotate-90' : 'rotate-90'
                  }`}
                />
              </span>
              <span className="text-[10px] text-neutral-400 hidden sm:inline leading-none mt-0.5">
                {currentChapter.tagline}
              </span>
            </div>
          </div>

          {/* Chapter Timeline Pips (Clickable) */}
          <div className="hidden md:flex items-center space-x-1 bg-neutral-900/80 border border-neutral-800 px-2 py-1 rounded-full">
            {CHAPTERS.map((ch, idx) => {
              const isActive = ch.id === currentChapterId;
              const isPast = idx < activeChapterIndex;

              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectChapter(ch.id)}
                  title={`${ch.act}: ${ch.title}`}
                  className="group/pip relative py-1 px-1 focus:outline-none cursor-pointer"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-200 border ${
                      isActive
                        ? 'w-6 bg-[#E5FE54] border-black/20'
                        : isPast
                        ? 'w-2 bg-neutral-300 border-neutral-400'
                        : 'w-2 bg-neutral-700 border-neutral-700 group-hover/pip:border-neutral-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Telemetry & Scroll Percentage */}
          <div className="flex items-center space-x-3 text-neutral-400 text-[11px] border-l border-neutral-800 pl-3">
            <div className="hidden lg:flex items-center space-x-1.5 text-neutral-300">
              <Activity size={12} className="text-[#E5FE54] animate-pulse" />
              <span>{currentTime}</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold text-white">
              <span className="text-[#E5FE54]">{Math.round(scrollProgress)}%</span>
            </div>

            {/* Simulated Haptic/Audio Wave Indicator */}
            <button
              onClick={() => setSoundSimulation(!soundSimulation)}
              className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
              title={soundSimulation ? 'Telemetry Audio Active' : 'Enable Telemetry Pulse'}
            >
              {soundSimulation ? (
                <Volume2 size={13} className="text-[#E5FE54] animate-bounce" />
              ) : (
                <VolumeX size={13} />
              )}
            </button>
          </div>
        </motion.div>

        {/* Expanded Narrative Chapter Menu Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute bottom-full mb-3 left-0 right-0 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-2xl p-5 shadow-enterprise-xl text-neutral-900"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <Terminal size={14} className="text-neutral-950" />
                  <span className="font-semibold uppercase tracking-wider font-mono">
                    ENTERPRISE NARRATIVE DIRECTORY
                  </span>
                </div>
                <span className="text-neutral-500 font-medium font-mono">8 ACTS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = ch.id === currentChapterId;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        onSelectChapter(ch.id);
                        setIsExpanded(false);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#0A0A0A] text-white border-neutral-900 shadow-enterprise-xs'
                          : 'bg-neutral-50 hover:bg-neutral-100/80 text-neutral-900 border-neutral-200/80 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-medium mb-1">
                        <span className={isActive ? 'text-[#E5FE54]' : 'text-neutral-500'}>
                          {ch.act}
                        </span>
                        <span className="text-neutral-400">0{idx + 1}</span>
                      </div>
                      <div className="font-bold text-xs leading-snug">{ch.title}</div>
                      <div
                        className={`text-[10px] mt-0.5 line-clamp-1 ${
                          isActive ? 'text-neutral-300' : 'text-neutral-500'
                        }`}
                      >
                        {ch.tagline}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
