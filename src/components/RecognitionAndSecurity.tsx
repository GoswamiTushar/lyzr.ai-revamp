import React from 'react';
import { Presentation } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

export const RecognitionAndSecurity: React.FC = () => {
  const stages = SITE_DATA.featured_on_stage.items;

  return (
    <section id="recognition-section" className="py-16 bg-neutral-50/70 border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured On Stage */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-6">
            <Presentation size={14} className="text-neutral-700" />
            <span>Featured On Stage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stages.map((stage) => (
              <div
                key={stage.event}
                className="p-5 rounded-xl bg-white border border-neutral-200/90 shadow-enterprise-xs flex flex-col justify-between"
              >
                <div className="text-base font-bold text-neutral-950">{stage.event}</div>
                <div className="mt-2 text-xs text-neutral-600 font-medium">{stage.note}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
