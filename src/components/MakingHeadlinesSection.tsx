import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeadlineCard {
  id: string;
  name: string;
  bgColor: string;
  logo: React.ReactNode;
  subtitle: string;
  href: string;
}

export const MakingHeadlinesSection: React.FC = () => {
  const cards: HeadlineCard[] = [
    {
      id: 'cb-insights',
      name: 'CB Insights',
      bgColor: 'bg-[#5C3E42]',
      subtitle: 'Top 100 AI Startup',
      href: '#',
      logo: (
        <div className="flex items-center space-x-2.5">
          {/* CB Insights Grid Mark */}
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-white/90 rounded-xs" />
            <div className="bg-white/90 rounded-xs" />
            <div className="bg-white/90 rounded-xs" />
            <div className="bg-white/40 rounded-xs" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
            CBINSIGHTS
          </span>
        </div>
      ),
    },
    {
      id: 'gartner',
      name: 'Gartner',
      bgColor: 'bg-[#B84A39]',
      subtitle: 'Tech innovator in Agentic AI',
      href: '#',
      logo: (
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            Gartner<span className="text-white">.</span>
          </span>
        </div>
      ),
    },
    {
      id: 'aws',
      name: 'AWS',
      bgColor: 'bg-[#073B28]',
      subtitle: 'Gen AI Innovator 2025',
      href: '#',
      logo: (
        <div className="flex flex-col items-start">
          <span className="text-2xl sm:text-3xl font-black lowercase tracking-tighter text-white font-sans leading-none">
            aws
          </span>
          {/* Amazon smile arrow curve */}
          <svg className="w-10 h-3 text-[#FF9900] mt-1" viewBox="0 0 60 18" fill="none">
            <path
              d="M3 4C18 16 42 16 57 4"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M52 3L57 4L54 9"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 'g2',
      name: 'G2',
      bgColor: 'bg-[#161311]',
      subtitle: 'Top Agent Builder Software',
      href: '#',
      logo: (
        <div className="flex items-center space-x-2">
          {/* G2 Red/Orange Circular Badge or White Monochrome as in SS */}
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#D83B01] font-black text-lg tracking-tighter">
              G<span className="text-black text-xs align-top">2</span>
            </span>
          </div>
        </div>
      ),
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="making-headlines"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-neutral-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with mobile/tablet scroll controls */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight">
            Making Headlines
          </h2>

          {/* Prev / Next Scroll Buttons on mobile and tablet */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll headlines left"
              className="w-9 h-9 rounded-full border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll headlines right"
              className="w-9 h-9 rounded-full border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal scrollable carousel on mobile/tablet (< lg) | 4-Column Grid on desktop (lg+) */}
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Headlines list, horizontally scrollable on mobile"
          className="flex lg:grid overflow-x-auto lg:overflow-visible lg:grid-cols-4 gap-4 sm:gap-5 pb-3 lg:pb-0 snap-x snap-mandatory scroll-smooth focus:outline-none scroll-pl-1 py-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${card.name} - ${card.subtitle}`}
              className={`${card.bgColor} shrink-0 w-[260px] sm:w-[280px] lg:w-auto rounded-2xl p-6 sm:p-7 lg:p-8 h-[185px] sm:h-[200px] lg:h-[220px] flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-black/10 snap-start`}
            >
              {/* Top: Logo */}
              <div className="opacity-95 group-hover:opacity-100 transition-opacity">
                {card.logo}
              </div>

              {/* Bottom: Subtitle */}
              <div className="pt-4">
                <p className="text-white text-base sm:text-lg font-medium tracking-tight leading-snug">
                  {card.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
