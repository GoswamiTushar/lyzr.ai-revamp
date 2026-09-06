'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

export interface ComplianceItem {
  id: string;
  badgeCode: string;
  name: string;
  scope: string;
  details: string;
  renderEmblem: () => React.ReactNode;
}

export const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: 'gdpr',
    badgeCode: 'EU-2016/679',
    name: 'GDPR COMPLIANT',
    scope: 'European Data Protection',
    details: 'Strict enforcement of data subject rights, EU data sovereignty, and Article 28 data processing compliance.',
    renderEmblem: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 50 + 38 * Math.cos(rad);
          const cy = 50 + 38 * Math.sin(rad);
          return (
            <polygon
              key={deg}
              points={`${cx},${cy - 2.8} ${cx + 0.8},${cy - 0.9} ${cx + 2.8},${cy - 0.9} ${cx + 1.2},${cy + 0.5} ${cx + 1.8},${cy + 2.5} ${cx},${cy + 1.2} ${cx - 1.8},${cy + 2.5} ${cx - 1.2},${cy + 0.5} ${cx - 2.8},${cy - 0.9} ${cx - 0.8},${cy - 0.9}`}
              fill="white"
            />
          );
        })}
        <path
          d="M43 43V38C43 34.134 46.134 31 50 31C53.866 31 57 34.134 57 38V43"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect x="40" y="43" width="20" height="15" rx="2.5" stroke="white" strokeWidth="2.2" />
        <circle cx="50" cy="48.5" r="1.5" fill="white" />
        <path d="M50 50V53" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <text
          x="50"
          y="67"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="900"
          letterSpacing="0.06em"
        >
          GDPR
        </text>
        <text
          x="50"
          y="74"
          textAnchor="middle"
          fill="white"
          fontSize="4.5"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          COMPLIANT
        </text>
      </svg>
    ),
  },
  {
    id: 'soc2',
    badgeCode: 'TYPE-II AUDITED',
    name: 'SOC 2 TYPE II',
    scope: 'Security & Availability',
    details: 'Independently audited AICPA Trust Services Criteria with continuous automated control monitoring.',
    renderEmblem: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
        <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="1.8" />
        <circle cx="50" cy="50" r="39" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
        <text
          x="50"
          y="45"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="900"
          letterSpacing="0.08em"
        >
          AICPA
        </text>
        <line x1="30" y1="51" x2="70" y2="51" stroke="white" strokeWidth="1.2" />
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="900"
          letterSpacing="0.06em"
        >
          SOC2
        </text>
      </svg>
    ),
  },
  {
    id: 'iso27001',
    badgeCode: 'ISO/IEC-27001',
    name: 'ISO 27001 CERTIFIED',
    scope: 'InfoSec Management',
    details: 'Certified baseline controls for end-to-end operational information security management systems (ISMS).',
    renderEmblem: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
        <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="1.8" />
        <polygon
          points="50,14 78,28 78,62 50,86 22,62 22,28"
          stroke="white"
          strokeWidth="1.6"
        />
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fill="white"
          fontSize="9.5"
          fontWeight="900"
          letterSpacing="0.06em"
        >
          ISO
        </text>
        <text
          x="50"
          y="59"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
          letterSpacing="0.04em"
        >
          27001
        </text>
      </svg>
    ),
  },
  {
    id: 'hipaa',
    badgeCode: 'HITECH READY',
    name: 'HIPAA READY',
    scope: 'Healthcare Data Privacy',
    details: 'Zero PHI persistence options with BAA availability, full data encryption in transit, and immutable access logs.',
    renderEmblem: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
        <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="1.8" />
        <path
          d="M44 26H56V44H74V56H56V74H44V56H26V44H44V26Z"
          fill="white"
          fillOpacity="0.12"
          stroke="white"
          strokeWidth="1.8"
        />
        <text
          x="50"
          y="52"
          textAnchor="middle"
          fill="white"
          fontSize="8.5"
          fontWeight="900"
          letterSpacing="0.06em"
        >
          HIPAA
        </text>
        <text
          x="50"
          y="61"
          textAnchor="middle"
          fill="white"
          fontSize="4.8"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          COMPLIANT
        </text>
      </svg>
    ),
  },
  {
    id: 'ccpa',
    badgeCode: 'CPRA ALIGNED',
    name: 'CCPA',
    scope: 'California Privacy Rights',
    details: 'Full consumer opt-out support, granular data mapping, and continuous privacy threshold compliance.',
    renderEmblem: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
        <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="1.8" />
        <circle cx="50" cy="50" r="39" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
        <path
          d="M42 35L48 41L58 29"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="900"
          letterSpacing="0.08em"
        >
          CCPA
        </text>
        <text
          x="50"
          y="63"
          textAnchor="middle"
          fill="white"
          fontSize="4.8"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          COMPLIANT
        </text>
      </svg>
    ),
  },
];

interface ComplianceCardProps {
  item: ComplianceItem;
  isActive?: boolean;
  isRevealed?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export const ComplianceCard: React.FC<ComplianceCardProps> = ({
  item,
  isActive = false,
  isRevealed = false,
  className = '',
  layout = 'vertical',
}) => {
  if (layout === 'horizontal') {
    return (
      <div
        className={`w-full relative group rounded-2xl p-6 lg:p-7 flex items-center gap-6 lg:gap-8 transition-all duration-300 backdrop-blur-xs select-none border ${
          isActive
            ? 'bg-[#1c1c1c] border-[#E5FE54]/70 shadow-[0_0_35px_rgba(229,254,84,0.12)] scale-[1.012]'
            : isRevealed
            ? 'bg-[#161616]/95 border-white/15 hover:border-[#E5FE54]/40 hover:bg-[#1a1a1a]'
            : 'bg-[#131313]/90 border-white/10 hover:border-[#E5FE54]/40 hover:bg-[#1a1a1a]'
        } ${className}`}
      >
        {/* Left: Emblem in badge container */}
        <div className={`w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-2xl bg-black/50 border flex items-center justify-center p-3 relative transition-all duration-300 ${
          isActive
            ? 'border-[#E5FE54]/40 scale-105 shadow-[0_0_20px_rgba(229,254,84,0.15)]'
            : 'border-white/5 group-hover:scale-105'
        }`}>
          <div className={`absolute inset-0 rounded-2xl blur-md transition-opacity duration-300 ${
            isActive ? 'bg-[#E5FE54]/20 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'
          }`} />
          <div className="w-full h-full relative z-10 flex items-center justify-center">
            {item.renderEmblem()}
          </div>
        </div>

        {/* Right: Content details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="w-full flex items-center justify-between text-xs font-mono mb-1.5">
            <span className={`tracking-wider font-semibold transition-colors duration-200 ${isActive ? 'text-[#E5FE54]' : 'text-neutral-400'}`}>
              {item.badgeCode}
            </span>
            <div className="flex items-center space-x-1.5">
              <CheckCircle size={14} className={`transition-colors duration-200 ${isActive ? 'text-[#E5FE54]' : 'text-emerald-400'}`} />
              <span className={`text-[10px] font-mono tracking-wider uppercase transition-colors duration-200 ${isActive ? 'text-[#E5FE54]' : 'text-emerald-400'}`}>
                Verified
              </span>
            </div>
          </div>

          <div className="my-0.5">
            <div className={`text-base lg:text-lg font-mono font-bold tracking-wider uppercase transition-colors duration-200 ${
              isActive ? 'text-[#E5FE54]' : 'text-white group-hover:text-[#E5FE54]'
            }`}>
              {item.name}
            </div>
            <div className="text-xs text-neutral-400 mt-0.5 font-sans">
              {item.scope}
            </div>
          </div>

          {/* Details paragraph: revealed on scroll (isActive or isRevealed) or hovered */}
          <div className="mt-2 pt-2 border-t border-white/5 w-full min-h-[40px] flex items-center">
            <p className={`text-xs leading-relaxed font-sans transition-all duration-300 ${
              isActive
                ? 'opacity-100 text-neutral-100 font-normal'
                : isRevealed
                ? 'opacity-85 text-neutral-300'
                : 'opacity-0 lg:group-hover:opacity-100 text-neutral-400'
            }`}>
              {item.details}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default Vertical Badge Card Layout (mobile/tablet horizontal track)
  return (
    <div
      className={`shrink-0 relative group rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center text-center justify-between transition-all duration-300 backdrop-blur-xs select-none border ${
        isActive
          ? 'bg-[#1c1c1c] border-[#E5FE54]/70 shadow-[0_0_30px_rgba(229,254,84,0.12)] scale-[1.015]'
          : 'bg-[#161616]/90 border-white/10 hover:border-[#E5FE54]/40 hover:bg-[#1a1a1a] hover:shadow-[0_0_20px_rgba(229,254,84,0.06)]'
      } ${className || 'w-[225px] sm:w-[255px] md:w-[280px] lg:w-auto h-auto min-h-0'}`}
    >
      {/* Top Code Badge & Verified Status */}
      <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono shrink-0 mb-1 sm:mb-1.5">
        <span className={`tracking-wider font-semibold transition-colors duration-200 ${isActive ? 'text-[#E5FE54]' : 'text-neutral-400'}`}>
          {item.badgeCode}
        </span>
        <div className="flex items-center space-x-1">
          <CheckCircle size={12} className={`transition-colors duration-200 ${isActive ? 'text-[#E5FE54]' : 'text-emerald-400'}`} />
          <span className={`text-[9px] font-mono tracking-wider uppercase transition-colors duration-200 ${isActive ? 'text-[#E5FE54]' : 'text-emerald-400'}`}>
            Verified
          </span>
        </div>
      </div>

      {/* SVG Emblem with subtle aura */}
      <div className={`w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 shrink-0 my-0.5 sm:my-1 relative flex items-center justify-center transition-transform duration-300 ${
        isActive ? 'scale-105' : 'group-hover:scale-105'
      }`}>
        <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 ${
          isActive ? 'bg-[#E5FE54]/20 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'
        }`} />
        {item.renderEmblem()}
      </div>

      {/* Middle Label & Scope */}
      <div className="mt-1 sm:mt-1.5 pt-1.5 sm:pt-2 border-t border-white/5 w-full shrink-0">
        <div className={`text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase transition-colors duration-200 ${
          isActive ? 'text-[#E5FE54]' : 'text-white group-hover:text-[#E5FE54]'
        }`}>
          {item.name}
        </div>
        <div className="text-[10px] sm:text-[10.5px] text-neutral-400 mt-0.5 font-sans truncate">
          {item.scope}
        </div>
      </div>

      {/* Detail Info: Always visible on mobile/tablet */}
      <div className="mt-1 sm:mt-1.5 pt-1 sm:pt-1.5 border-t border-white/5 w-full flex items-center justify-center">
        <p className={`text-[9.5px] sm:text-[10.5px] leading-snug sm:leading-relaxed font-sans transition-all duration-300 ${
          isActive
            ? 'opacity-100 text-neutral-100 font-normal'
            : isRevealed
            ? 'opacity-85 text-neutral-200'
            : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-neutral-300'
        }`}>
          {item.details}
        </p>
      </div>
    </div>
  );
};
