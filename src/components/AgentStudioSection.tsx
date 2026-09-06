'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Sparkles, Cpu, GitBranch, Database, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

interface AgentStudioSectionProps {
  onOpenDemo: () => void;
}

export const AgentStudioSection: React.FC<AgentStudioSectionProps> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'prompt' | 'runtime'>('flow');
  const data = SITE_DATA.agent_studio_section;

  return (
    <section id="agent-studio-section" className="py-24 bg-white border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="bg-[#0A0A0A] text-[#E5FE54] px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase rounded-full border border-neutral-800 shadow-enterprise-xs">
              ACT 04 // THE WORKBENCH
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

        {/* Studio Workspace Simulation Canvas */}
        <div className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-10 shadow-enterprise-md">
          
          {/* Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-100">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-mono text-neutral-600 bg-neutral-50 px-3 py-1 border border-neutral-200 rounded-md">
                workspace://enterprise-dispute-resolution-agent.flow
              </span>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('flow')}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeTab === 'flow'
                    ? 'bg-[#0A0A0A] text-[#E5FE54] border-neutral-900 shadow-enterprise-xs'
                    : 'bg-white text-neutral-700 border-neutral-200/80 hover:border-neutral-400'
                }`}
              >
                Visual Workflow
              </button>
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeTab === 'prompt'
                    ? 'bg-[#0A0A0A] text-[#E5FE54] border-neutral-900 shadow-enterprise-xs'
                    : 'bg-white text-neutral-700 border-neutral-200/80 hover:border-neutral-400'
                }`}
              >
                Architect (No-Code)
              </button>
              <button
                onClick={() => setActiveTab('runtime')}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeTab === 'runtime'
                    ? 'bg-[#0A0A0A] text-[#E5FE54] border-neutral-900 shadow-enterprise-xs'
                    : 'bg-white text-neutral-700 border-neutral-200/80 hover:border-neutral-400'
                }`}
              >
                Live Production Trace
              </button>
            </div>
          </div>

          {/* Canvas Content based on tab */}
          {activeTab === 'flow' && (
            <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              
              {/* Node 1: Input & Ingestion */}
              <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-enterprise-xs relative">
                <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-500 mb-2 font-mono">
                  <Database size={14} className="text-neutral-900" />
                  <span>STEP 1: INGEST</span>
                </div>
                <h4 className="font-bold text-sm text-neutral-950">Knowledge & Context</h4>
                <p className="text-xs text-neutral-600 mt-1 font-normal leading-relaxed">
                  Salesforce CRM + SAP ERP + Core Banking DB via VPC peering.
                </p>
                <div className="mt-3 text-[10px] font-mono text-neutral-700 bg-neutral-50 px-2 py-0.5 border border-neutral-200 rounded font-medium">
                  ✓ Streaming sync active
                </div>
              </div>

              {/* Node 2: Cognis Memory & Routing */}
              <div className="bg-[#E5FE54]/5 border border-[#E5FE54] rounded-xl p-5 shadow-enterprise-sm relative">
                <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-900 mb-2 font-mono">
                  <Cpu size={14} className="text-neutral-900" />
                  <span>STEP 2: REASON</span>
                </div>
                <h4 className="font-bold text-sm text-neutral-950">Lyzr Cognis Memory</h4>
                <p className="text-xs text-neutral-600 mt-1 font-normal leading-relaxed">
                  Multi-agent orchestration, session state & reasoning engine.
                </p>
                <div className="mt-3 text-[10px] font-mono text-neutral-950 bg-[#E5FE54] px-2 py-0.5 border border-black/10 rounded font-semibold">
                  Zero Hallucination Guard
                </div>
              </div>

              {/* Node 3: Simulation & Guardrails */}
              <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-enterprise-xs relative">
                <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-500 mb-2 font-mono">
                  <Shield size={14} className="text-neutral-900" />
                  <span>STEP 3: GUARD</span>
                </div>
                <h4 className="font-bold text-sm text-neutral-950">PII Mask & Policy</h4>
                <p className="text-xs text-neutral-600 mt-1 font-normal leading-relaxed">
                  Real-time token scrubbing, compliance checks & risk veto.
                </p>
                <div className="mt-3 text-[10px] font-mono text-neutral-700 bg-neutral-50 px-2 py-0.5 border border-neutral-200 rounded font-medium">
                  SOC 2 / HIPAA enforced
                </div>
              </div>

              {/* Node 4: Action & Execution */}
              <div className="bg-[#0A0A0A] text-white border border-neutral-800 rounded-xl p-5 shadow-enterprise-sm relative">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#E5FE54] mb-2 font-mono">
                  <Zap size={14} className="text-[#E5FE54]" />
                  <span>STEP 4: EXECUTE</span>
                </div>
                <h4 className="font-bold text-sm text-white">Production Action</h4>
                <p className="text-xs text-neutral-300 mt-1 font-normal leading-relaxed">
                  Automated wire release, customer email, immutable audit log.
                </p>
                <div className="mt-3 text-[10px] font-mono text-[#E5FE54] font-medium">
                  Avg latency: 42ms
                </div>
              </div>

            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="py-8 max-w-2xl mx-auto space-y-4">
              <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-enterprise-xs">
                <span className="text-[11px] font-semibold font-mono uppercase tracking-wider text-neutral-900">
                  Lyzr Architect Plain English Compiler
                </span>
                <p className="text-sm font-medium text-neutral-800 mt-2 italic">
                  "Build an automated dispute resolution agent for corporate card chargebacks that checks transaction logs in Snowflake, verifies cardholder merchant history, assesses fraud probability, and drafts resolution memos."
                </p>
              </div>
              <div className="bg-[#0A0A0A] text-white border border-neutral-800 rounded-xl p-5 font-mono text-xs space-y-2 shadow-enterprise-md">
                <div className="text-neutral-400">// Compiling architecture to Lyzr DAG...</div>
                <div className="text-emerald-400 font-bold">✔ Generated 4 sub-agents: DataIngest, FraudRiskScorer, PolicyVerifier, MemoDraftAgent</div>
                <div className="text-[#E5FE54] font-bold">✔ Attached VPC Security Credentials & RBAC policies</div>
                <div className="text-neutral-300">Ready to deploy to staging in 1-click.</div>
              </div>
            </div>
          )}

          {activeTab === 'runtime' && (
            <div className="py-8 max-w-3xl mx-auto bg-[#0A0A0A] text-white border border-neutral-800 rounded-xl p-6 font-mono text-xs space-y-2.5 shadow-enterprise-md">
              <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2 font-bold">
                <span>RUN ID: #lyzr-prod-881923</span>
                <span className="text-[#E5FE54]">STATUS: COMPLETED (38ms)</span>
              </div>
              <div className="text-neutral-300">[13:21:04.102] Agent spawned via Webhook trigger</div>
              <div className="text-neutral-300">[13:21:04.118] Context retrieved from Cognis Memory (similarity: 0.94)</div>
              <div className="text-amber-300">[13:21:04.125] PII Sanitizer: Masked 2 Account numbers</div>
              <div className="text-emerald-300">[13:21:04.140] Resolution approved and signed with cryptographic audit token</div>
            </div>
          )}

          {/* Bottom Call to Action */}
          <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-neutral-600 font-normal">
              Join 500+ enterprises building high-reliability agents with Lyzr Studio.
            </span>
            <button
              onClick={onOpenDemo}
              className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 font-semibold px-5 py-2.5 rounded-lg shadow-enterprise-xs hover:shadow-enterprise-sm active:scale-[0.99] transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Launch Studio Free</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
