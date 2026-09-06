'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Star, ArrowRight, ShieldCheck, Cpu, Terminal, Activity, Check } from 'lucide-react';
import { LyzrLogo } from './LyzrLogo';
import { SITE_DATA } from '../data/siteContent';

interface HeaderProps {
  onOpenDemo: () => void;
  onSelectSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemo, onSelectSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [hoveredMobileItem, setHoveredMobileItem] = useState<string | null>(null);
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
    setExpandedMobileCategory(null);
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
                    <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Cpu size={13} className="text-[#0A0A0A]" />
                      <span>Products</span>
                    </h4>
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
                    <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Terminal size={13} className="text-neutral-600" />
                      <span>Modules & OSS</span>
                    </h4>
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
                    <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      By Industry
                    </h4>
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
                    <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      By Function
                    </h4>
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

      {/* Mobile Animated Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden lg:hidden bg-white border-b border-neutral-200 shadow-enterprise-xl"
          >
            <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 sm:px-6">
              
              {/* Unique Interactive Telemetry Pill */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-4 bg-neutral-50 border border-neutral-200/90 rounded-xl p-3 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="relative flex items-center justify-center">
                    <span className={`w-2 h-2 rounded-full ${pingActive ? 'bg-[#E5FE54]' : 'bg-emerald-500'}`} />
                    <span
                      className={`absolute w-3.5 h-3.5 rounded-full ${
                        pingActive ? 'bg-[#E5FE54]/60 animate-ping' : 'bg-emerald-500/30 animate-pulse'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-neutral-700">
                    <span className="font-semibold text-neutral-950">LYZR CONTROL PLANE</span>
                    <span className="text-neutral-400 mx-1.5">•</span>
                    <span>VPC ONLINE</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTriggerPing}
                  className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-md text-[10px] font-semibold text-neutral-800 transition-all cursor-pointer shadow-enterprise-xs active:scale-95"
                >
                  <Activity size={11} className={pingActive ? 'text-[#E5FE54] animate-spin' : 'text-neutral-500'} />
                  <span>{pingActive ? 'Pinging...' : `${lastPingTime}ms`}</span>
                </button>
              </motion.div>

              {/* Navigation Items List with Staggered Fluid Motion */}
              <div className="flex flex-col space-y-1">
                
                {/* 1. Product (Expandable Sub-accordion) */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08, duration: 0.25 }}
                  className="border-b border-neutral-100"
                >
                  <div
                    onClick={() =>
                      setExpandedMobileCategory(expandedMobileCategory === 'product' ? null : 'product')
                    }
                    onMouseEnter={() => setHoveredMobileItem('product')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    className="flex items-center justify-between py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 cursor-pointer transition-colors relative group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          hoveredMobileItem === 'product' || expandedMobileCategory === 'product'
                            ? 'bg-[#E5FE54] scale-125'
                            : 'bg-neutral-300'
                        }`}
                      />
                      <span className="text-sm">Product</span>
                      <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
                        7 Layers
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedMobileCategory === 'product' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-neutral-400 group-hover:text-neutral-800" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedMobileCategory === 'product' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden pl-5 pr-2 pb-3 space-y-1.5 text-xs"
                      >
                        <button
                          onClick={() => scrollToSection('control-plane-section')}
                          className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                        >
                          <span>7-Layer Agent Control Plane</span>
                          <span className="text-[9px] font-mono font-bold bg-[#E5FE54]/40 px-1.5 py-0.5 rounded">
                            CORE
                          </span>
                        </button>
                        <button
                          onClick={() => scrollToSection('production-stats-section')}
                          className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                        >
                          <span>Sovereign VPC Engine</span>
                          <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            ZERO RETENTION
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 2. Solutions (Expandable Sub-accordion) */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12, duration: 0.25 }}
                  className="border-b border-neutral-100"
                >
                  <div
                    onClick={() =>
                      setExpandedMobileCategory(expandedMobileCategory === 'solutions' ? null : 'solutions')
                    }
                    onMouseEnter={() => setHoveredMobileItem('solutions')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    className="flex items-center justify-between py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 cursor-pointer transition-colors relative group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          hoveredMobileItem === 'solutions' || expandedMobileCategory === 'solutions'
                            ? 'bg-[#E5FE54] scale-125'
                            : 'bg-neutral-300'
                        }`}
                      />
                      <span className="text-sm">Solutions</span>
                      <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
                        Architecture
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedMobileCategory === 'solutions' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-neutral-400 group-hover:text-neutral-800" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedMobileCategory === 'solutions' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden pl-5 pr-2 pb-3 space-y-1.5 text-xs"
                      >
                        <button
                          onClick={() => scrollToSection('production-gap-section')}
                          className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                        >
                          <span>Productionization Gap</span>
                          <ArrowRight size={13} className="text-neutral-400" />
                        </button>
                        <button
                          onClick={() => scrollToSection('recognition-section')}
                          className="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-800 font-medium flex items-center justify-between"
                        >
                          <span>Security & Compliance</span>
                          <span className="text-[9px] font-mono text-neutral-500">SOC 2 / ISO</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 3. Developers */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16, duration: 0.25 }}
                  className="border-b border-neutral-100"
                >
                  <button
                    onClick={() => scrollToSection('production-gap-section')}
                    onMouseEnter={() => setHoveredMobileItem('developers')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    className="w-full py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          hoveredMobileItem === 'developers' ? 'bg-[#E5FE54] scale-125' : 'bg-neutral-300'
                        }`}
                      />
                      <span className="text-sm">Developers & The Chasm</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-700">
                      VS FRAMEWORKS →
                    </span>
                  </button>
                </motion.div>

                {/* 4. Security & Compliance */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                  className="border-b border-neutral-100"
                >
                  <button
                    onClick={() => scrollToSection('recognition-section')}
                    onMouseEnter={() => setHoveredMobileItem('resources')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    className="w-full py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          hoveredMobileItem === 'resources' ? 'bg-[#E5FE54] scale-125' : 'bg-neutral-300'
                        }`}
                      />
                      <span className="text-sm">Security & Compliance</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-700">
                      ENTERPRISE
                    </span>
                  </button>
                </motion.div>

                {/* 5. Pricing & Demo */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.24, duration: 0.25 }}
                  className="border-b border-neutral-100"
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDemo();
                    }}
                    onMouseEnter={() => setHoveredMobileItem('pricing')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    className="w-full py-3 px-2 rounded-xl text-left font-semibold text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          hoveredMobileItem === 'pricing' ? 'bg-[#E5FE54] scale-125' : 'bg-neutral-300'
                        }`}
                      />
                      <span className="text-sm">Pricing & Custom VPC Demo</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-900 bg-[#E5FE54]/30 px-2 py-0.5 rounded-full font-semibold border border-[#E5FE54]">
                      ENTERPRISE
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Unique Interactive CTA Button with Micro-Interaction */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                className="pt-5 flex flex-col space-y-2.5"
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemo();
                  }}
                  className="w-full bg-[#E5FE54] hover:bg-[#d9f33c] text-neutral-950 border border-black/10 py-3 px-4 rounded-xl text-center font-bold text-sm shadow-enterprise-sm hover:shadow-enterprise-md transition-all flex items-center justify-center space-x-2 group cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle animated highlight sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <span>Get started for free</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </motion.button>

                <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-neutral-500 font-mono">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck size={12} className="text-neutral-700" />
                    <span>Zero Data Retention</span>
                  </div>
                  <a
                    href="https://studio.lyzr.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-neutral-950 transition-colors"
                  >
                    Open Agent Studio ↗
                  </a>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

