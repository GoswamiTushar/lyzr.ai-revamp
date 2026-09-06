import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Users, Code, Activity, Unlock } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

const REASON_ICONS = [Users, Code, CheckCircle2, Activity, Unlock];

export const WhyEnterprisesSection: React.FC = () => {
  const [selectedReasonId, setSelectedReasonId] = useState('01');
  const data = SITE_DATA.why_enterprises_choose;

  const currentReason =
    data.reasons.find((r) => r.id === selectedReasonId) || data.reasons[0];

  return (
    <section id="why-choose-section" className="py-24 bg-white border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#0A0A0A] text-[#E5FE54] px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase rounded-full border border-neutral-800 shadow-enterprise-xs">
              ACT 05 // THE VERDICT
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">
              {data.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight mt-2 leading-[1.08]">
            {data.headline}
          </h2>
        </motion.div>

        {/* 5 Reasons Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-4 space-y-2.5">
            {data.reasons.map((reason) => {
              const isSelected = reason.id === selectedReasonId;

              return (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReasonId(reason.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A0A0A] text-white border-neutral-900 shadow-enterprise-sm'
                      : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-200/80 hover:border-neutral-300 shadow-enterprise-xs'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                        isSelected ? 'bg-[#E5FE54] text-neutral-950 border-black/10' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {reason.id}
                    </span>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block font-mono">
                        {reason.category}
                      </span>
                      <span className="text-sm font-bold block leading-snug mt-0.5">
                        {reason.title}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Reason Deep Dive */}
          <div className="lg:col-span-8 bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-10 shadow-enterprise-md">
            
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="text-xs font-mono font-medium bg-neutral-50 text-neutral-700 px-3 py-1 rounded-md border border-neutral-200">
                REASON {currentReason.id} — {currentReason.category.toUpperCase()}
              </span>
              <span className="text-xs font-medium text-neutral-900 bg-[#E5FE54]/25 border border-[#E5FE54] px-3 py-1 rounded-full shadow-enterprise-xs">
                Proven Enterprise Formula
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
              {currentReason.title}
            </h3>

            <p className="text-base text-neutral-600 leading-relaxed mt-3 font-normal">
              {currentReason.description}
            </p>

            {/* 3 Core Points */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-neutral-100">
              {currentReason.points.map((pt) => (
                <div key={pt.title} className="space-y-2">
                  <h4 className="text-sm font-bold text-neutral-950">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {pt.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlight Callout Box */}
            <div className="mt-8 bg-[#E5FE54]/15 border border-[#E5FE54] rounded-xl p-4 sm:p-5 flex items-center space-x-3 shadow-enterprise-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5FE54] border border-black/20 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-neutral-950">
                {currentReason.highlight}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
