'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    cloud: 'AWS',
    useCase: 'Dispute Resolution / BPO',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5FE54', '#111111', '#888888'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-enterprise-xl border border-neutral-200/90 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-500 hover:text-neutral-950 p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#E5FE54] border border-black/20" />
              <span className="font-semibold text-neutral-900">Enterprise Briefing</span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-950 tracking-tight">
              Talk to Lyzr Applied AI Engineers
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed font-normal">
              Discover how enterprises ship production-grade agents in under 8 weeks with complete governance, zero lock-in, and private VPC deployment.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-900 uppercase font-mono tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 focus:bg-white font-normal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 uppercase font-mono tracking-wider mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder="alex@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 focus:bg-white font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-900 uppercase font-mono tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 focus:bg-white font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 uppercase font-mono tracking-wider mb-1">
                    Environment
                  </label>
                  <select
                    value={formData.cloud}
                    onChange={(e) => setFormData({ ...formData, cloud: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 focus:bg-white font-normal font-mono text-xs"
                  >
                    <option value="AWS">AWS Bedrock / VPC</option>
                    <option value="Azure">Microsoft Azure</option>
                    <option value="GCP">Google Cloud Vertex</option>
                    <option value="On-Prem">Air-Gapped On-Prem</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 py-3 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-enterprise-xs hover:shadow-enterprise-sm active:scale-[0.99] transition-all"
                >
                  <span>Request Architectural Consultation</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 text-center flex items-center justify-center space-x-2 font-normal">
                <ShieldCheck size={14} className="text-neutral-700" />
                <span>NDA protected. Your enterprise IP and architecture remain strictly confidential.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full border border-black/10 bg-[#E5FE54] text-neutral-950 mx-auto flex items-center justify-center shadow-enterprise-sm">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-950 tracking-tight">
              Briefing Request Confirmed!
            </h3>
            <p className="text-sm text-neutral-600 max-w-sm mx-auto font-normal">
              Thank you, <strong>{formData.name}</strong>. A Lyzr Applied AI Architect will reach out to <strong>{formData.email}</strong> within 4 business hours to coordinate your custom architecture review for <strong>{formData.cloud}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 px-6 py-2.5 rounded-lg text-xs font-semibold shadow-enterprise-xs hover:shadow-enterprise-sm cursor-pointer font-mono"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
