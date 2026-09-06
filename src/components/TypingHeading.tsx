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

  // 2. When text or developer mode changes, type once if mode was toggled
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setDisplayedText(text);
      setPhase('idle');
      return;
    }
    // Toggled mode: type out the new text smoothly
    setDisplayedText('');
    setPhase('typing');
  }, [text, isDeveloperMode]);

  // 3. One-shot typewriter animation when toggled
  useEffect(() => {
    if (phase !== 'typing') return;

    let timeoutId: NodeJS.Timeout;

    if (displayedText.length < text.length) {
      const charDelay = isMobile ? 12 : 20;
      timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, charDelay);
    } else {
      setPhase('idle');
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, phase, text, isMobile]);

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
