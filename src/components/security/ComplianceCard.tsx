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
}

export const ComplianceCard: React.FC<ComplianceCardProps> = ({ item }) => {
  return (
    <div className="shrink-0 w-[240px] sm:w-[265px] md:w-[285px] lg:w-auto relative group bg-[#161616]/90 border border-white/10 hover:border-[#E5FE54]/50 rounded-2xl p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center text-center justify-between transition-all duration-300 backdrop-blur-xs hover:shadow-[0_0_25px_rgba(229,254,84,0.08)] hover:bg-[#1c1c1c] h-full max-h-[50dvh] sm:max-h-[54dvh] md:max-h-[58dvh] min-h-[290px] sm:min-h-[320px] md:min-h-[350px] lg:min-h-[345px]">
      {/* Top Code Badge */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5 sm:mb-2">
        <span className="tracking-wider text-neutral-400">{item.badgeCode}</span>
        <CheckCircle size={12} className="text-emerald-400 shrink-0" />
      </div>

      {/* SVG Emblem with subtle aura */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 my-1 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        {item.renderEmblem()}
      </div>

      {/* Middle Label & Scope */}
      <div className="mt-2 pt-2 border-t border-white/5 w-full">
        <div className="text-xs sm:text-[13px] font-mono font-bold tracking-wider text-white uppercase group-hover:text-[#E5FE54] transition-colors">
          {item.name}
        </div>
        <div className="text-[10.5px] sm:text-[11px] text-neutral-400 mt-0.5 font-sans">
          {item.scope}
        </div>
      </div>

      {/* Detail Info: Always visible by default on mobile & tablet; smoothly fades in on desktop with ZERO layout shift */}
      <div className="mt-2 pt-1.5 border-t border-white/5 w-full min-h-[44px] sm:min-h-[48px] flex items-center justify-center">
        <p className="text-[10px] sm:text-[11px] text-neutral-300 leading-relaxed font-sans opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
          {item.details}
        </p>
      </div>
    </div>
  );
};
