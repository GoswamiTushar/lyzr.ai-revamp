import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';
import { InteractiveChasmComparator } from './InteractiveChasmComparator';

interface ProductionizationGapProps {
  onOpenDemo: () => void;
}

export const ProductionizationGap: React.FC<ProductionizationGapProps> = ({ onOpenDemo }) => {
  const gap = SITE_DATA.productionization_gap;

  return (
    <section id="production-gap-section" className="py-24 bg-white border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 font-mono">
              {gap.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight mt-2 leading-[1.08]">
            {gap.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            {gap.description}
          </p>

          {/* Bridge Points Pill Row */}
          <div className="flex flex-wrap gap-2 mt-5">
            {gap.bridge_points.map((pt) => (
              <span
                key={pt}
                className="inline-flex items-center space-x-1.5 bg-[#E5FE54]/25 text-neutral-950 border border-[#E5FE54] text-xs font-semibold px-3 py-1 rounded-full shadow-enterprise-xs"
              >
                <CheckCircle size={13} className="text-neutral-950" />
                <span>{pt}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Interactive Cinematic Chasm Comparator: Prototype Graveyard vs Governed Production */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <InteractiveChasmComparator />
        </motion.div>
      </div>
    </section>
  );
};
