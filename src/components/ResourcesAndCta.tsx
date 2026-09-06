import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, FileText, Download, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

interface ResourcesAndCtaProps {
  onOpenDemo: () => void;
}

export const ResourcesAndCta: React.FC<ResourcesAndCtaProps> = ({ onOpenDemo }) => {
  const resources = SITE_DATA.resources_section;
  const cta = SITE_DATA.final_cta;

  return (
    <div>
      {/* Resources Section */}
      <section id="resources-section" className="py-24 bg-white border-b border-neutral-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-3xl mb-14"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#0A0A0A] text-[#E5FE54] px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase rounded-full border border-neutral-800 shadow-enterprise-xs">
                ACT 07 // KNOWLEDGE BASE
              </span>
              <span className="text-[12px] font-mono font-medium uppercase tracking-widest text-neutral-400">
                {resources.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-[-0.03em] mt-2 leading-[1.08]">
              {resources.headline}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {resources.description}
            </p>
          </motion.div>

          {/* Featured Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.featured.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-neutral-200/90 rounded-xl p-7 flex flex-col justify-between transition-all duration-200 shadow-enterprise-xs hover:shadow-enterprise-md hover:border-neutral-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-medium bg-neutral-50 border border-neutral-200 text-neutral-700 px-2.5 py-0.5 rounded-md">
                      {item.type.toUpperCase()}
                    </span>
                    <BookOpen size={16} className="text-neutral-400 group-hover:text-black transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-950 tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100">
                  <button
                    onClick={onOpenDemo}
                    className="text-xs font-semibold text-neutral-950 flex items-center space-x-1.5 transition-colors cursor-pointer group-hover:underline underline-offset-2"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final Cinematic Hero CTA Section */}
      <section id="final-cta-section" className="py-24 bg-white border-b border-neutral-200 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6"
        >
          
          <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#E5FE54] border border-neutral-800 px-3.5 py-1.5 rounded-full shadow-enterprise-xs">
            <span className="font-mono text-xs font-medium tracking-wider uppercase">
              EPILOGUE // SOVEREIGN HANDSHAKE
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold text-neutral-950 tracking-tight leading-tight max-w-4xl mx-auto">
            {cta.headline}
          </h2>

          <p className="text-base sm:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {cta.description}
          </p>

          {/* Terminal VPC Handshake Box */}
          <div className="max-w-xl mx-auto bg-[#0A0A0A] text-left text-white border border-neutral-800 rounded-xl p-4 font-mono text-xs shadow-enterprise-md">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
              <div className="flex items-center space-x-2 text-neutral-400">
                <Terminal size={13} className="text-[#E5FE54]" />
                <span>lyzr deploy --target=vpc-isolated</span>
              </div>
              <span className="text-[#E5FE54] text-[10px] font-semibold">READY</span>
            </div>
            <div className="text-neutral-400 space-y-0.5 text-[11px]">
              <div>&gt; Attaching IAM roles & KMS encryption keys... [DONE]</div>
              <div>&gt; Establishing zero-retention audit ledger... [DONE]</div>
              <div className="text-emerald-400 font-medium">&gt; Governed control plane live at 10.0.4.12:443</div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 font-semibold text-sm sm:text-base px-7 py-3 rounded-lg shadow-enterprise-xs hover:shadow-enterprise-sm active:scale-[0.99] transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Book an Enterprise Briefing</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="https://studio.lyzr.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A0A0A] hover:bg-[#222222] text-white border border-neutral-900 font-semibold text-sm sm:text-base px-7 py-3 rounded-lg shadow-enterprise-xs hover:shadow-enterprise-sm active:scale-[0.99] transition-all"
            >
              Try Lyzr Studio Free
            </a>
          </div>

          <div className="pt-8 text-xs font-medium text-neutral-500 flex flex-wrap items-center justify-center gap-6">
            <span>✓ Deployed in your VPC</span>
            <span>✓ Zero Data Retention</span>
            <span>✓ SOC 2 Type II Certified</span>
          </div>

        </motion.div>
      </section>
    </div>
  );
};
