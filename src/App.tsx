'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Lenis from 'lenis';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustedLogos3DSection } from './components/TrustedLogos3DSection';
import { HeroStatisticsSection } from './components/HeroStatisticsSection';
import { CustomCursor } from './components/CustomCursor';
import { GlobalParallaxBackground } from './components/GlobalParallaxBackground';
import { DeferredSection } from './components/DeferredSection';
import { ArrowUp } from 'lucide-react';

// Code-split below-the-fold components for sub-second FCP & LCP
const ControlPlaneLayers = React.lazy(() =>
  import('./components/ControlPlaneLayers').then((m) => ({ default: m.ControlPlaneLayers }))
);
const ProductionStatsSection = React.lazy(() =>
  import('./components/ProductionStatsSection').then((m) => ({ default: m.ProductionStatsSection }))
);
const EnterpriseShowcaseSection = React.lazy(() =>
  import('./components/EnterpriseShowcaseSection').then((m) => ({ default: m.EnterpriseShowcaseSection }))
);
const ProductionizationGap = React.lazy(() =>
  import('./components/ProductionizationGap').then((m) => ({ default: m.ProductionizationGap }))
);
const EcosystemArchitectureSection = React.lazy(() =>
  import('./components/EcosystemArchitectureSection').then((m) => ({ default: m.EcosystemArchitectureSection }))
);
const AgentUseCasesSection = React.lazy(() =>
  import('./components/AgentUseCasesSection').then((m) => ({ default: m.AgentUseCasesSection }))
);
const SecurityGovernanceSection = React.lazy(() =>
  import('./components/SecurityGovernanceSection').then((m) => ({ default: m.SecurityGovernanceSection }))
);
const MakingHeadlinesSection = React.lazy(() =>
  import('./components/MakingHeadlinesSection').then((m) => ({ default: m.MakingHeadlinesSection }))
);
const Footer = React.lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const BookDemoModal = React.lazy(() =>
  import('./components/BookDemoModal').then((m) => ({ default: m.BookDemoModal }))
);

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState(true);

  // Initialize Lenis smooth scroll on fine pointer devices (mobile uses 100% native momentum scrolling)
  useEffect(() => {
    if (window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let lenisInstance: Lenis | null = null;

    try {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      let animationFrameId: number;

      function raf(time: number) {
        lenisInstance?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }

      animationFrameId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animationFrameId);
        lenisInstance?.destroy();
      };
    } catch {
      // safe fallback if Lenis encounters environment constraints
    }
  }, []);

  // Track scroll position for Back to Top (only re-renders when crossing 400px threshold)
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      setShowBackToTop((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#E5FE54] selection:text-black flex flex-col font-sans relative">
      
      {/* 1. Global Multi-Layer 3D Scroll Parallax Background (ambient meshes, floating orbs & guides) */}
      <GlobalParallaxBackground />

      {/* Top Announcement Bar */}
      <AnnouncementBar onAccessClick={() => scrollToId('control-plane-section')} />

      {/* Main Header Nav */}
      <Header
        onOpenDemo={() => setDemoModalOpen(true)}
        onSelectSection={scrollToId}
      />

      {/* Main Content Sections strictly adhering to provided JSON structure with 3D perspective depth */}
      <main className="flex-1 relative z-10" style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}>
        
        {/* 1. Hero Section (Headline, Subheadline, Developer Mode Switch, CTAs) */}
        <HeroSection
          isDeveloperMode={isDeveloperMode}
          onToggleDeveloperMode={setIsDeveloperMode}
          onOpenDemo={() => setDemoModalOpen(true)}
          onExploreLayers={() => scrollToId('control-plane-section')}
        />

        {/* 2. 3D Infinite Auto Scroll Client Logos (React Bits 3D Rolling Cylinder, Clean Adaptive) */}
        <TrustedLogos3DSection />

        {/* 3. Statistics Section (5 Dynamic Count-Up Key Metrics) */}
        <HeroStatisticsSection isDeveloperMode={isDeveloperMode} />

        {/* 4. Control Plane Layers (7 Layers Section) */}
        <DeferredSection id="control-plane-section" minHeight={800}>
          <Suspense fallback={null}>
            <ControlPlaneLayers onOpenDemo={() => setDemoModalOpen(true)} />
          </Suspense>
        </DeferredSection>

        {/* 5. Enterprise Agent Sovereignty & Production Stats */}
        <DeferredSection id="production-stats-section" minHeight={600}>
          <Suspense fallback={null}>
            <ProductionStatsSection onOpenDemo={() => setDemoModalOpen(true)} />
          </Suspense>
        </DeferredSection>

        {/* 5b. Enterprise Stories */}
        <DeferredSection id="enterprise-showcase-section" minHeight={600}>
          <Suspense fallback={null}>
            <EnterpriseShowcaseSection onOpenDemo={() => setDemoModalOpen(true)} />
          </Suspense>
        </DeferredSection>

        {/* 6. The Productionization Gap */}
        <DeferredSection id="production-gap-section" minHeight={700}>
          <Suspense fallback={null}>
            <ProductionizationGap onOpenDemo={() => setDemoModalOpen(true)} />
          </Suspense>
        </DeferredSection>

        {/* 6b. Ecosystem Architecture */}
        <DeferredSection id="ecosystem-architecture-section" minHeight={700}>
          <Suspense fallback={null}>
            <EcosystemArchitectureSection onOpenDemo={() => setDemoModalOpen(true)} />
          </Suspense>
        </DeferredSection>

        {/* 7. Agent Use Cases Rail */}
        <DeferredSection id="agent-use-cases-section" minHeight={500}>
          <Suspense fallback={null}>
            <AgentUseCasesSection />
          </Suspense>
        </DeferredSection>

        {/* 8. Enterprise Security & Governance */}
        <DeferredSection id="security-governance-section" minHeight={700}>
          <Suspense fallback={null}>
            <SecurityGovernanceSection />
          </Suspense>
        </DeferredSection>

        {/* 9. Making Headlines */}
        <DeferredSection id="making-headlines-section" minHeight={500}>
          <Suspense fallback={null}>
            <MakingHeadlinesSection />
          </Suspense>
        </DeferredSection>
      </main>

      {/* Global Footer */}
      <DeferredSection id="footer-section" minHeight={400}>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </DeferredSection>

      {/* Book Demo Modal - dynamically loaded on demand */}
      {demoModalOpen && (
        <Suspense fallback={null}>
          <BookDemoModal
            isOpen={demoModalOpen}
            onClose={() => setDemoModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full bg-white hover:bg-neutral-950 hover:text-[#E5FE54] border border-neutral-200 text-neutral-800 shadow-enterprise-md flex items-center justify-center transition-all duration-200 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={16} strokeWidth={2} />
        </button>
      )}

    </div>
  );
}
