'use client';

import React, { useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface AgentUseCase {
  sector: string;
  title: string;
  body: string;
  href: string;
}

const USE_CASES: AgentUseCase[] = [
  {
    sector: 'Banking',
    title: 'Regulatory Filing Preparation Agent',
    body: 'Regulatory filings demand precision, consistency, and strict adherence to evolving compliance requirements.',
    href: 'https://www.lyzr.ai/blueprints/banking/regulatory-filing-preparation-agent/',
  },
  {
    sector: 'Insurance',
    title: 'Fraudulent Document Detection Agent',
    body: 'Analyzes submitted documents in real time, identifies signs of tampering or forgery, and helps teams make faster, more confident decisions.',
    href: 'https://www.lyzr.ai/blueprints/insurance/fraudulent-document-detection-agent/',
  },
  {
    sector: 'Finance',
    title: 'Treasury Forecasting Agent',
    body: 'Analyzes financial data, historical patterns, and market signals to deliver more accurate cash flow and treasury forecasts.',
    href: 'https://www.lyzr.ai/blueprints/finance/treasury-forecasting-agent/',
  },
  {
    sector: 'Legal',
    title: 'NDA Negotiator Agent',
    body: 'Automates the review, comparison, and negotiation process, ensuring compliance with company standards.',
    href: 'https://www.lyzr.ai/blueprints/legal/nda-negotiator-agent/',
  },
  {
    sector: 'Government',
    title: 'Citizen Service Request Agent',
    body: 'Helps public service teams automate intake, route requests intelligently, and improve response times with greater visibility.',
    href: 'https://www.lyzr.ai/blueprints/government/citizen-service-request-agent/',
  },
  {
    sector: 'IT',
    title: 'Cloud Cost Analyzer Agent',
    body: 'Continuously tracks, analyzes, and optimizes cloud spend across services and environments.',
    href: 'https://www.lyzr.ai/blueprints/it/cloud-cost-analyzer-agent/',
  },
  {
    sector: 'Procurement',
    title: 'Supplier Onboarding Agent',
    body: 'Automates document collection, verification, and approval workflows, cutting onboarding time while ensuring every supplier meets standards.',
    href: 'https://www.lyzr.ai/blueprints/finance/supplier-onboarding-agent/',
  },
  {
    sector: 'Insurance',
    title: 'Claims Severity Prediction Agent',
    body: 'Analyzes historical claims data, policy information, and risk factors to estimate claim severity early, enabling faster decisions.',
    href: 'https://www.lyzr.ai/blueprints/insurance/claims-severity-prediction-agent/',
  },
];

export const AgentUseCasesSection: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const scrollAmount = railRef.current.clientWidth * 0.75;
      railRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="agent-use-cases"
      className="py-20 lg:py-24 bg-neutral-50/60 border-b border-neutral-200 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
              <Layers size={14} className="text-neutral-700" />
              <span>Agent Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-950 tracking-tight">
              Agent use cases across enterprise workflows
            </h2>
          </div>

          {/* Prev / Next Scroll Buttons */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll use cases left"
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll use cases right"
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Use Cases Rail with clean padding on mobile & tablet, never stuck to viewport edge */}
        <div
          ref={railRef}
          id="ucRail"
          tabIndex={0}
          role="region"
          aria-label="Agent use cases, scrollable"
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none scroll-pl-1 py-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {USE_CASES.map((uc, index) => (
            <a
              key={`${uc.sector}-${index}`}
              href={uc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="uc-card shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-enterprise-xs hover:shadow-enterprise-md hover:border-neutral-900 hover:-translate-y-1 transition-all duration-300 group snap-start cursor-pointer"
            >
              <div>
                {/* Sector & Go Arrow */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200 group-hover:bg-[#E5FE54] group-hover:text-black group-hover:border-black/20 transition-colors">
                    {uc.sector}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-950 text-neutral-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight size={15} strokeWidth={2.2} />
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-neutral-900 transition-colors">
                  {uc.title}
                </h3>

                {/* Body */}
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
                  {uc.body}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors">
                <span>View Blueprint</span>
                <span className="text-neutral-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
