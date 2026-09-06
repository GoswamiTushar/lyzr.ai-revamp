import React, { useState, useEffect, useRef } from 'react';

interface TypingHeadingProps {
  text: string;
  isDeveloperMode: boolean;
  className?: string;
  repeatDelay?: number; // Defaults to 5000ms (5 seconds)
}

export const TypingHeading: React.FC<TypingHeadingProps> = ({
  text,
  isDeveloperMode,
  className = '',
  repeatDelay = 5000,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isFirstMount = useRef(true);
  const [isInView, setIsInView] = useState(true);
  const [displayedText, setDisplayedText] = useState(text);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'waiting' | 'deleting'>('waiting');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen for optimized responsive animation speeds
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Observe when hero heading comes into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. When text or developer mode changes, reset and start typing if not first mount
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setDisplayedText(text);
      setPhase('waiting');
      return;
    }
    setDisplayedText('');
    if (isInView) {
      setPhase('typing');
    }
  }, [text, isDeveloperMode, isInView]);

  // 3. Typewriter animation loop with responsive speed (ultra-fast on mobile to prevent empty space)
  useEffect(() => {
    if (!isInView) return;

    let timeoutId: NodeJS.Timeout;

    if (phase === 'typing') {
      if (displayedText.length < text.length) {
        // High-velocity typing on mobile (8ms - 14ms per char) so headline completes in ~400ms without leaving empty space
        // Desktop uses crisp 20ms - 28ms typing
        const charDelay = isMobile
          ? 9 + Math.random() * 5
          : 22 + Math.random() * 8;
        timeoutId = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, charDelay);
      } else {
        // Finished typing the heading!
        setPhase('waiting');
      }
    } else if (phase === 'waiting') {
      // Hold completed text with blinking cursor for repeatDelay (or 4.5s on mobile), then repeat
      const holdTime = isMobile ? Math.min(repeatDelay, 4500) : repeatDelay;
      timeoutId = setTimeout(() => {
        setPhase('deleting');
      }, holdTime);
    } else if (phase === 'deleting') {
      // Snappy backspacing deletion before repeating
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, isMobile ? 8 : 14);
      } else {
        // Brief pause after deleting, then start typing again immediately
        timeoutId = setTimeout(() => {
          setPhase('typing');
        }, isMobile ? 180 : 300);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, phase, text, isInView, repeatDelay, isMobile]);

  return (
    <h1
      ref={containerRef}
      aria-label={text}
      className={`relative select-none ${className}`}
    >
      {/* 
        Zero-Layout-Shift Ghost Placeholder:
        Renders the entire target text invisibly in the normal document flow.
        This reserves the EXACT calculated multi-line height and width across all screen
        sizes (mobile, tablet, desktop) from character 0 to finish, preventing any
        layout shifts (CLS = 0) while the typewriter types or backspaces.
      */}
      <span
        aria-hidden="true"
        className="invisible pointer-events-none select-none block"
      >
        {text}
        {/* Reserve space for the cursor */}
        <span className="inline-block w-[3px] sm:w-[4px] lg:w-[5px] h-[0.85em] ml-1 sm:ml-1.5 align-middle" />
      </span>

      {/* 
        Active Typewriter Display Layer:
        Positioned absolutely over the ghost container, perfectly aligned
        with identical font properties and wrapping.
      */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 w-full block select-text"
      >
        <span>{displayedText}</span>
        {/* Blinking cursor with electric lime ambient glow */}
        <span
          className="inline-block w-[3px] sm:w-[4px] lg:w-[5px] h-[0.85em] bg-[#0A0A0A] ml-1 sm:ml-1.5 align-middle rounded-xs animate-caret-blink shadow-[0_0_8px_rgba(229,254,84,0.7)]"
        />
      </span>

      <span className="sr-only">{text}</span>
    </h1>
  );
};
