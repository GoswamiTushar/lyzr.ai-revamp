'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

export const CaseStudiesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = SITE_DATA.case_studies_carousel;
  const cases = data.cases;
  const founder = SITE_DATA.founder_vision;
  const testimonials = SITE_DATA.testimonials;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const currentCase = cases[currentIndex];

  return (
    <section id="case-studies-section" className="py-24 bg-white border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-wrap items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#0A0A0A] text-[#E5FE54] px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase rounded-full border border-neutral-800 shadow-enterprise-xs">
                ACT 06 // BATTLE-TESTED
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {data.title}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight mt-2 leading-[1.08]">
              {data.subtitle}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {data.description}
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono font-medium text-neutral-500">
              {currentIndex + 1} / {cases.length}
            </span>
            <div className="flex items-center space-x-2">
              <button
                id="case-prev-btn"
                onClick={handlePrev}
                className="w-9 h-9 rounded-lg bg-white border border-neutral-200 shadow-enterprise-xs hover:bg-neutral-50 flex items-center justify-center text-neutral-700 transition-all cursor-pointer"
                aria-label="Previous case study"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                id="case-next-btn"
                onClick={handleNext}
                className="w-9 h-9 rounded-lg bg-[#0A0A0A] hover:bg-[#222222] text-white border border-neutral-900 shadow-enterprise-xs flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next case study"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Company Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cases.map((c, idx) => (
            <button
              key={c.company}
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                currentIndex === idx
                  ? 'bg-[#0A0A0A] text-[#E5FE54] border-neutral-900 shadow-enterprise-xs'
                  : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200/80 hover:border-neutral-300'
              }`}
            >
              {c.company}
            </button>
          ))}
        </div>

        {/* Active Case Study Spotlight Card */}
        <div className="bg-white border border-neutral-200/90 rounded-2xl p-8 sm:p-12 shadow-enterprise-md transition-all duration-200 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-mono font-medium bg-neutral-50 text-neutral-800 px-3 py-1 rounded-md border border-neutral-200">
                  {currentCase.company}
                </span>
                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200 font-mono inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live in Production
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                {currentCase.title}
              </h3>

              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                "{currentCase.quote}"
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-neutral-50 border border-neutral-200 text-neutral-700 px-3 py-1 rounded-md font-medium font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Key Verified Metrics */}
            <div className="lg:col-span-4 bg-neutral-50/80 border border-neutral-200/80 rounded-xl p-6 sm:p-8 space-y-6 shadow-enterprise-xs">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-900 block border-b border-neutral-200 pb-2">
                Verified Production Metrics
              </span>

              {currentCase.metrics.map((m) => (
                <div key={m.label} className="border-b border-neutral-200/80 pb-4 last:border-0 last:pb-0">
                  <div className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs text-neutral-600 font-normal mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Founder Vision Spotlight */}
        <div className="bg-[#0A0A0A] text-white border border-neutral-800 rounded-2xl p-8 sm:p-14 mb-20 relative overflow-hidden shadow-enterprise-lg">
          <div className="max-w-4xl relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#E5FE54] text-xs font-mono font-medium tracking-wider uppercase">
              <Quote size={18} />
              <span>Founder Vision</span>
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium leading-snug text-neutral-100">
              "{founder.quote}"
            </blockquote>

            <div className="pt-4 border-t border-neutral-800 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#E5FE54] text-neutral-950 font-bold flex items-center justify-center text-base border border-black/10">
                SS
              </div>
              <div>
                <div className="font-bold text-base text-white">{founder.author}</div>
                <div className="text-xs text-neutral-400 font-normal">{founder.title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why They Chose Lyzr Testimonials Grid */}
        <div>
          <h3 className="text-2xl font-bold text-neutral-950 tracking-tight mb-8">
            {testimonials.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.items.map((t) => (
              <div
                key={t.company}
                className="bg-white border border-neutral-200/90 rounded-xl p-7 flex flex-col justify-between shadow-enterprise-xs hover:shadow-enterprise-md hover:border-neutral-300 transition-all duration-200"
              >
                <p className="text-sm text-neutral-700 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <div className="font-bold text-sm text-neutral-950">{t.company}</div>
                  <div className="text-xs text-neutral-500 font-normal">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
