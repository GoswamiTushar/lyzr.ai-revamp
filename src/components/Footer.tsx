'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { LyzrLogo } from './LyzrLogo';
import { SITE_DATA } from '../data/siteContent';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footer = SITE_DATA.footer;
  const footerRef = useRef<HTMLElement>(null);

  // Parallax scroll movement for the footer dot matrix and ambient orb
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });
  const dotParallaxY = useTransform(smoothProgress, [0, 1], [-80, 80]);
  const orbParallaxY = useTransform(smoothProgress, [0, 1], [70, -60]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      className="relative z-20 bg-[#0A0A0A] text-white pt-20 pb-12 border-t border-neutral-800 overflow-hidden"
    >
      {/* 1. Dotted Coordinate Matrix with Parallax Scroll Effect */}
      <motion.div
        style={{ y: dotParallaxY }}
        className="absolute inset-x-0 -top-48 -bottom-48 bg-dot-grid-dark pointer-events-none opacity-85"
        aria-hidden="true"
      />

      {/* 2. Floating Ambient Electric Lime Glow with Parallax Float */}
      <motion.div
        style={{ y: orbParallaxY }}
        className="absolute -top-20 right-1/4 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-[#E5FE54]/18 via-[#E5FE54]/5 to-transparent blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-neutral-800">
          
          <div className="lg:col-span-5 space-y-4">
            {/* Subtle backdrop-blur plate to ensure 100% crisp text readability over the dotted matrix */}
            <div className="p-4 -m-4 rounded-2xl bg-neutral-950/60 backdrop-blur-sm border border-white/5 inline-block">
              <div className="inline-block">
                <LyzrLogo size="lg" inverted />
              </div>
              <p className="text-sm text-neutral-300 max-w-sm leading-relaxed font-normal mt-3">
                Enterprise AI Agent Platform. Take your AI agents to production, faster.
              </p>
              <p className="text-xs text-neutral-400 font-mono mt-2">
                {footer.address}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-enterprise-xl relative overflow-hidden">
            {/* Soft ambient glow behind newsletter content */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#E5FE54]/12 blur-3xl pointer-events-none" />
            
            {/* Glowing neon focal indicator in top-right corner */}
            <div className="hidden sm:flex absolute top-6 right-6 w-9 h-9 rounded-full border border-[#E5FE54]/35 bg-[#E5FE54]/10 items-center justify-center shadow-[0_0_16px_rgba(229,254,84,0.25)] pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 ring-2 ring-[#E5FE54]" />
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white relative z-10">
              {footer.newsletter.title}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-normal leading-relaxed relative z-10">
              {footer.newsletter.description}
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2.5 relative z-10">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your enterprise email..."
                className="bg-black/70 backdrop-blur-md border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#E5FE54] focus:ring-1 focus:ring-[#E5FE54] flex-1 font-sans"
              />
              <button
                type="submit"
                className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 font-semibold px-6 py-3 rounded-xl shadow-enterprise-xs hover:shadow-enterprise-lime active:scale-[0.99] transition-all flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check size={16} />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>{footer.newsletter.cta}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* 6 Columns Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-16 border-b border-neutral-800 text-xs">
          
          {Object.entries(footer.columns).map(([colTitle, items]) => (
            <div key={colTitle} className="space-y-3">
              <h5 className="font-mono font-semibold text-white tracking-wider uppercase text-[11px] text-[#E5FE54]">
                {colTitle}
              </h5>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#hero"
                      className="text-neutral-400 hover:text-[#E5FE54] transition-colors block py-0.5 line-clamp-1 font-normal"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom copyright & status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="font-mono">
            © {new Date().getFullYear()} Lyzr AI Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
            <a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-white transition-colors">Security Overview</a>
            <span className="inline-flex items-center space-x-1.5 text-[#E5FE54]">
              <span className="w-1.5 h-1.5 rounded-none bg-[#E5FE54] animate-pulse" />
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
