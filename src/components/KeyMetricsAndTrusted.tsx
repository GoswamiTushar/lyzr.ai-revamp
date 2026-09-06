import React from 'react';
import { motion } from 'motion/react';
import { SITE_DATA } from '../data/siteContent';

export const KeyMetricsAndTrusted: React.FC = () => {
  const metrics = SITE_DATA.key_metrics_secondary;
  const trusted = SITE_DATA.trusted_by;

  return (
    <section className="py-16 bg-white border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Secondary Key Metrics 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 pb-14 border-b border-neutral-100">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight font-sans">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 font-medium leading-snug">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted By Enterprise Strip */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-400 shrink-0">
            {trusted.title}
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-neutral-800 font-bold">
            <span className="text-lg font-bold tracking-tight text-neutral-950">Google Cloud</span>
            <span className="text-lg font-bold tracking-tight lowercase text-neutral-900">aws</span>
            <span className="text-lg font-bold tracking-tight text-neutral-950">Microsoft</span>
            <span className="text-lg font-bold tracking-wider text-neutral-950">NVIDIA</span>
            <span className="text-base font-semibold text-neutral-800">Deloitte.</span>
            <span className="text-base font-bold text-neutral-800">Accenture</span>
            <span className="text-base font-semibold text-neutral-800">WTW</span>
          </div>
        </div>

      </div>
    </section>
  );
};
