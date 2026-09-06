import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Layers, Lock, Cpu, Sparkles, Check } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

interface ThreeWaysSectionProps {
  onOpenDemo: () => void;
}

export const ThreeWaysSection: React.FC<ThreeWaysSectionProps> = ({ onOpenDemo }) => {
  const data = SITE_DATA.three_ways_section;

  return (
    <section id="three-ways-section" className="py-24 bg-white border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#0A0A0A] text-[#E5FE54] px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase rounded-full border border-neutral-800 shadow-enterprise-xs">
              ACT 03 // MODALITIES
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">
              {data.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight mt-2 leading-[1.08]">
            {data.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            {data.description}
          </p>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.ways.map((way) => {
            const isFeatured = way.label === 'Featured';
            return (
              <div
                key={way.title}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 ${
                  isFeatured
                    ? 'bg-white border-2 border-neutral-900 shadow-enterprise-md'
                    : 'bg-white border border-neutral-200/90 shadow-enterprise-xs hover:shadow-enterprise-md hover:border-neutral-300'
                }`}
              >
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isFeatured
                          ? 'bg-[#E5FE54]/30 text-neutral-950 border-[#E5FE54]'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {way.label}
                    </span>

                    {isFeatured && (
                      <span className="text-xs font-semibold text-neutral-900 flex items-center space-x-1">
                        <Sparkles size={13} className="text-neutral-900" />
                        <span className="uppercase text-[10px] tracking-wider font-mono">Most Popular</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-neutral-950 tracking-tight leading-snug">
                    {way.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
                    {way.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                    {way.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2.5 text-xs font-medium text-neutral-800">
                        <div className="w-4 h-4 rounded-full bg-[#E5FE54]/50 border border-black/10 flex items-center justify-center text-neutral-950 shrink-0">
                          <Check size={11} strokeWidth={2.5} />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={onOpenDemo}
                    className={`w-full py-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isFeatured
                        ? 'bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 shadow-enterprise-xs hover:shadow-enterprise-sm active:scale-[0.99]'
                        : 'bg-[#0A0A0A] hover:bg-[#222222] text-white border border-neutral-900 shadow-enterprise-xs hover:shadow-enterprise-sm active:scale-[0.99]'
                    }`}
                  >
                    <span>{way.cta.label}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
