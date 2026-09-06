'use client';

import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { SITE_DATA } from '../data/siteContent';

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [customiseModal, setCustomiseModal] = useState(false);
  const banner = SITE_DATA.site.cookie_banner;

  if (!isOpen) return null;

  return (
    <>
      <div
        id="cookie-consent-banner"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-enterprise-lg"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-900 font-mono">
            <ShieldCheck size={16} className="text-neutral-900" />
            <span>Cookie & Privacy Preferences</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-neutral-900 p-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Dismiss cookie notice"
          >
            <X size={14} />
          </button>
        </div>

        <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed font-normal">
          {banner.text}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-enterprise-xs hover:shadow-enterprise-sm transition-all cursor-pointer font-mono"
          >
            {banner.buttons[2]} {/* ACCEPT ALL */}
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer font-mono"
          >
            {banner.buttons[1]} {/* REJECT ALL */}
          </button>

          <button
            onClick={() => setCustomiseModal(true)}
            className="text-xs text-neutral-600 hover:text-neutral-950 font-medium underline px-2 py-1 cursor-pointer font-mono"
          >
            {banner.buttons[0]} {/* CUSTOMISE */}
          </button>
        </div>
      </div>

      {customiseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-enterprise-xl border border-neutral-200/90">
            <h4 className="text-base font-bold text-neutral-950">Customise Preferences</h4>
            <div className="space-y-3 text-xs text-neutral-800 font-normal">
              <label className="flex items-center justify-between">
                <span>Essential Platform Cookies</span>
                <input type="checkbox" checked disabled className="accent-black" />
              </label>
              <label className="flex items-center justify-between">
                <span>Performance & Observability</span>
                <input type="checkbox" defaultChecked className="accent-black" />
              </label>
              <label className="flex items-center justify-between">
                <span>Enterprise Telemetry</span>
                <input type="checkbox" defaultChecked className="accent-black" />
              </label>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setCustomiseModal(false);
                  setIsOpen(false);
                }}
                className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-enterprise-xs hover:shadow-enterprise-sm transition-all cursor-pointer font-mono"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
