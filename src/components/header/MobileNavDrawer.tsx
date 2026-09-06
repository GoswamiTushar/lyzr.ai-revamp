'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
  onSelectSection: (id: string) => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onOpenDemo,
  onSelectSection,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLinkClick = (id: string) => {
    onClose();
    onSelectSection(id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden border-t border-neutral-200/80 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-enterprise-xl overflow-hidden"
        >
          <div className="space-y-1 pt-1 max-w-lg mx-auto">
            {/* 1. Product (Expandable Sub-accordion) */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              className="border-b border-neutral-100"
            >
              <div
                onClick={() =>
                  setExpandedCategory(expandedCategory === 'product' ? null : 'product')
                }
                onMouseEnter={() => setHoveredItem('product')}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center justify-between py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 cursor-pointer transition-colors relative group"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      hoveredItem === 'product' || expandedCategory === 'product'
                        ? 'bg-[#E5FE54] scale-125'
                        : 'bg-neutral-300'
                    }`}
                  />
                  <span className="text-sm">Product</span>
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
                    7 Layers
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === 'product' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-neutral-400 group-hover:text-neutral-800" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedCategory === 'product' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden pl-5 pr-2 pb-3 space-y-1.5 text-xs"
                  >
                    <button
                      onClick={() => handleLinkClick('control-plane-section')}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                    >
                      <span>7-Layer Agent Control Plane</span>
                      <span className="text-[9px] font-mono font-bold bg-[#E5FE54]/40 px-1.5 py-0.5 rounded">
                        CORE
                      </span>
                    </button>
                    <button
                      onClick={() => handleLinkClick('production-stats-section')}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                    >
                      <span>Sovereign VPC Engine</span>
                      <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        ZERO RETENTION
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 2. Solutions (Expandable Sub-accordion) */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.25 }}
              className="border-b border-neutral-100"
            >
              <div
                onClick={() =>
                  setExpandedCategory(expandedCategory === 'solutions' ? null : 'solutions')
                }
                onMouseEnter={() => setHoveredItem('solutions')}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center justify-between py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 cursor-pointer transition-colors relative group"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      hoveredItem === 'solutions' || expandedCategory === 'solutions'
                        ? 'bg-[#E5FE54] scale-125'
                        : 'bg-neutral-300'
                    }`}
                  />
                  <span className="text-sm">Solutions</span>
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
                    Architecture
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === 'solutions' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-neutral-400 group-hover:text-neutral-800" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedCategory === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden pl-5 pr-2 pb-3 space-y-1.5 text-xs"
                  >
                    <button
                      onClick={() => handleLinkClick('production-gap-section')}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                    >
                      <span>Productionization Gap</span>
                      <ArrowRight size={13} className="text-neutral-400" />
                    </button>
                    <button
                      onClick={() => handleLinkClick('recognition-section')}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                    >
                      <span>Security & Compliance</span>
                      <span className="text-[9px] font-mono text-neutral-500">SOC 2 / ISO</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 3. Developers */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16, duration: 0.25 }}
              className="border-b border-neutral-100"
            >
              <button
                onClick={() => handleLinkClick('production-gap-section')}
                onMouseEnter={() => setHoveredItem('developers')}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      hoveredItem === 'developers' ? 'bg-[#E5FE54] scale-125' : 'bg-neutral-300'
                    }`}
                  />
                  <span className="text-sm">Developers & The Chasm</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-700">
                  VS FRAMEWORKS →
                </span>
              </button>
            </motion.div>

            {/* 4. Security & Compliance */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              className="border-b border-neutral-100"
            >
              <button
                onClick={() => handleLinkClick('recognition-section')}
                onMouseEnter={() => setHoveredItem('resources')}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      hoveredItem === 'resources' ? 'bg-[#E5FE54] scale-125' : 'bg-neutral-300'
                    }`}
                  />
                  <span className="text-sm">Security & Compliance</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-700">
                  ENTERPRISE
                </span>
              </button>
            </motion.div>

            {/* 5. Pricing & Demo */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.24, duration: 0.25 }}
              className="border-b border-neutral-100"
            >
              <button
                onClick={() => {
                  onClose();
                  onOpenDemo();
                }}
                onMouseEnter={() => setHoveredItem('pricing')}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      hoveredItem === 'pricing' ? 'bg-[#E5FE54] scale-125' : 'bg-neutral-300'
                    }`}
                  />
                  <span className="text-sm">Pricing & Custom VPC Demo</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-900 bg-[#E5FE54]/30 px-2 py-0.5 rounded-full font-semibold border border-[#E5FE54]">
                  ENTERPRISE
                </span>
              </button>
            </motion.div>
          </div>

          {/* Action CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.25 }}
            className="pt-5 flex flex-col space-y-2.5 max-w-lg mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onClose();
                onOpenDemo();
              }}
              className="w-full bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 py-3 px-4 rounded-xl text-center font-bold text-sm shadow-enterprise-sm hover:shadow-enterprise-md transition-all flex items-center justify-center space-x-2 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
              <span>Get started for free</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>

            <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-neutral-500 font-mono">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck size={12} className="text-neutral-700" />
                <span>Zero Data Retention</span>
              </div>
              <a
                href="https://studio.lyzr.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-950 transition-colors"
              >
                Open Agent Studio ↗
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
