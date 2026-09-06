'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Star, ArrowRight, ShieldCheck, Cpu, Terminal, Activity, Check } from 'lucide-react';
import { LyzrLogo } from './LyzrLogo';
import { SITE_DATA } from '../data/siteContent';
import { MobileNavDrawer } from './header/MobileNavDrawer';

interface HeaderProps {
  onOpenDemo: () => void;
  onSelectSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemo, onSelectSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [pingActive, setPingActive] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<number>(34);

  const nav = SITE_DATA.header.navigation;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (onSelectSection) {
      onSelectSection(id);
    }
  };

  const handleTriggerPing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPingActive(true);
    // Simulate varying enterprise latency
    const randomMs = Math.floor(Math.random() * 18) + 24;
    setLastPingTime(randomMs);
    setTimeout(() => {
      setPingActive(false);
    }, 1200);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/90 shadow-enterprise-xs py-3'
          : 'bg-white/95 border-b border-neutral-200/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="group block"
          >
            <LyzrLogo size="md" />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {/* Product / Platform Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('Platform')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              id="nav-product-btn"
              onClick={() => scrollToSection('control-plane-section')}
              className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors rounded-lg hover:bg-neutral-100/70 cursor-pointer"
            >
              <span>Product</span>
              <motion.div
                animate={{ rotate: activeDropdown === 'Platform' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} className="text-neutral-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'Platform' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 w-[540px] bg-white rounded-2xl shadow-enterprise-xl border border-neutral-200/90 p-6 grid grid-cols-2 gap-6"
                >
                  <div>
                    <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Cpu size={13} className="text-[#0A0A0A]" />
                      <span>Products</span>
                    </p>
                    <ul className="space-y-1.5">
                      {nav.Platform.Products.map((prod) => (
                        <li key={prod}>
                          <a
                            href="#control-plane-section"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection('control-plane-section');
                            }}
                            className="block text-xs font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-50 px-2.5 py-1.5 rounded-lg transition-colors group"
                          >
                            <span className="flex items-center justify-between">
                              <span>{prod}</span>
                              {prod.includes('(New)') && (
                                <span className="text-[9px] font-mono uppercase bg-[#E5FE54]/40 text-neutral-900 border border-black/10 px-1.5 py-0.5 rounded-full font-bold">
                                  NEW
                                </span>
                              )}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Terminal size={13} className="text-neutral-600" />
                      <span>Modules & OSS</span>
                    </p>
                    <ul className="space-y-1.5">
                      {nav.Platform.Modules.slice(0, 4).map((mod) => (
                        <li key={mod}>
                          <a
                            href="#control-plane-section"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection('control-plane-section');
                            }}
                            className="block text-xs font-medium text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            {mod}
                          </a>
                        </li>
                      ))}
                      <div className="pt-2.5 mt-2.5 border-t border-neutral-100">
                        <span className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                          Open Source
                        </span>
                        {nav.Platform['Open Source & Dev'].slice(0, 3).map((oss) => (
                          <span
                            key={oss}
                            className="block text-xs text-neutral-600 py-1 pl-2 hover:text-black hover:bg-neutral-50 rounded cursor-pointer transition-colors"
                            onClick={() => scrollToSection('control-plane-section')}
                          >
                            • {oss}
                          </span>
                        ))}
                      </div>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('Solutions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              id="nav-solutions-btn"
              onClick={() => scrollToSection('control-plane-section')}
              className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors rounded-lg hover:bg-neutral-100/70 cursor-pointer"
            >
              <span>Solutions</span>
              <motion.div
                animate={{ rotate: activeDropdown === 'Solutions' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} className="text-neutral-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'Solutions' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 w-[580px] bg-white rounded-2xl shadow-enterprise-xl border border-neutral-200/90 p-6 grid grid-cols-2 gap-6"
                >
                  <div>
                    <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      By Industry
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {nav.Solutions['By Industry'].map((ind) => (
                        <span
                          key={ind}
                          onClick={() => scrollToSection('production-gap-section')}
                          className="text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      By Function
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {nav.Solutions['By Function'].map((fn) => (
                        <span
                          key={fn}
                          onClick={() => scrollToSection('control-plane-section')}
                          className="text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
                        >
                          {fn}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Developers */}
          <button
            onClick={() => scrollToSection('production-gap-section')}
            className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors rounded-lg hover:bg-neutral-100/70 cursor-pointer"
          >
            Developers
          </button>

          {/* Security & Compliance */}
          <button
            onClick={() => scrollToSection('recognition-section')}
            className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors rounded-lg hover:bg-neutral-100/70 cursor-pointer"
          >
            Security & Trust
          </button>

          {/* Pricing */}
          <button
            onClick={onOpenDemo}
            className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors rounded-lg hover:bg-neutral-100/70 cursor-pointer"
          >
            Pricing & Demo
          </button>
        </nav>

        {/* Right CTAs (Desktop only - strictly hidden below lg: to prevent double buttons) */}
        <div className="hidden lg:flex items-center space-x-5">
          <a
            href="https://studio.lyzr.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            Agent Studio
          </a>

          <button
            id="header-talk-btn"
            onClick={onOpenDemo}
            className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 px-5 py-2 font-semibold text-[13px] rounded-lg border border-black/10 shadow-enterprise-xs hover:shadow-enterprise-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            Talk to Us
          </button>
        </div>

        {/* Mobile & Tablet Header Controls (Visible only below lg:) */}
        <div className="flex items-center space-x-2.5 lg:hidden">
          <button
            onClick={onOpenDemo}
            className="bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 px-3.5 py-1.5 font-semibold text-xs rounded-lg border border-black/10 shadow-enterprise-xs active:scale-[0.97] transition-all"
          >
            Talk to Us
          </button>

          {/* Interactive Animated Morphing Hamburger/Close Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 text-neutral-800 hover:text-black border border-neutral-200/90 rounded-xl bg-white shadow-enterprise-xs hover:border-neutral-300 focus:outline-none cursor-pointer transition-colors relative"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-5 h-[2px] bg-neutral-900 rounded-full origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="w-5 h-[2px] bg-neutral-900 rounded-full"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-5 h-[2px] bg-neutral-900 rounded-full origin-center"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Accordion Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenDemo={onOpenDemo}
        onSelectSection={scrollToSection}
      />
    </header>
  );
};
