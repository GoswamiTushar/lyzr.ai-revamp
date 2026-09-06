import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const GovernedProductionStage: React.FC = () => {
  return (
    <div className="w-full flex-1 bg-[#0F0F0F] text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-between select-none">
      {/* Header Row: Calibrated min-height for pixel-perfect alignment across curtain */}
      <div className="min-h-[110px] sm:min-h-[125px] flex flex-col justify-start">
        <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2.5 sm:pb-3.5 h-[34px] sm:h-[38px]">
          <span className="inline-flex items-center bg-[#E5FE54]/15 text-[#E5FE54] text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase border border-[#E5FE54]/30 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
            LYZR GOVERNED PRODUCTION
          </span>
          <div className="flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs text-[#E5FE54] font-semibold bg-neutral-900 border border-neutral-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 whitespace-nowrap">
            <ShieldCheck size={12} className="text-[#E5FE54] shrink-0 sm:w-3.5 sm:h-3.5" />
            <span>Zero Data Egress</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mt-2.5 sm:mt-4 leading-snug min-h-[28px] sm:min-h-[36px] flex items-center">
          Deterministic, Isolated &amp; Continuous
        </h3>
        <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-400 mt-1 leading-relaxed font-normal min-h-[32px] sm:min-h-[40px] flex items-center">
          Sovereign VPC execution with Six Sigma simulation and continuous guardrails.
        </p>
      </div>

      {/* 3 Metrics Row: Explicit height matching curtain overlay */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 my-auto py-2">
        <div className="bg-white/[0.04] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between h-[96px] sm:h-[112px]">
          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E5FE54] tracking-tight h-[28px] sm:h-[36px] flex items-center">
            99.99%
          </div>
          <div className="h-[36px] sm:h-[42px] flex flex-col justify-end">
            <div className="text-[10px] sm:text-xs font-semibold text-white mt-0.5 sm:mt-1 truncate">
              Reliability Target
            </div>
            <div className="text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 leading-snug hidden sm:block truncate">
              Six Sigma simulated
            </div>
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between h-[96px] sm:h-[112px]">
          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E5FE54] tracking-tight h-[28px] sm:h-[36px] flex items-center">
            &lt; 1.2ms
          </div>
          <div className="h-[36px] sm:h-[42px] flex flex-col justify-end">
            <div className="text-[10px] sm:text-xs font-semibold text-white mt-0.5 sm:mt-1 truncate">
              Control Overhead
            </div>
            <div className="text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 leading-snug hidden sm:block truncate">
              Async tracing in VPC
            </div>
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3.5 flex flex-col justify-between h-[96px] sm:h-[112px]">
          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E5FE54] tracking-tight h-[28px] sm:h-[36px] flex items-center">
            100%
          </div>
          <div className="h-[36px] sm:h-[42px] flex flex-col justify-end">
            <div className="text-[10px] sm:text-xs font-semibold text-white mt-0.5 sm:mt-1 truncate">
              Audit Lineage
            </div>
            <div className="text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 leading-snug hidden sm:block truncate">
              Cryptographic hashes
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Chips: Fixed height & single row symmetry */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-neutral-800 h-[44px] sm:h-[48px] text-[10px] sm:text-xs text-neutral-300">
        <span className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 whitespace-nowrap">
          <CheckCircle2 size={11} className="text-[#E5FE54] shrink-0 sm:w-3 sm:h-3" /> Private VPC
        </span>
        <span className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 whitespace-nowrap">
          <CheckCircle2 size={11} className="text-[#E5FE54] shrink-0 sm:w-3 sm:h-3" /> Model Failover
        </span>
        <span className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md sm:rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 whitespace-nowrap">
          <CheckCircle2 size={11} className="text-[#E5FE54] shrink-0 sm:w-3 sm:h-3" /> SOC 2 / HIPAA
        </span>
      </div>
    </div>
  );
};
