'use client';

import React, { useState, useEffect, useRef } from 'react';

interface DeferredSectionProps {
  children: React.ReactNode;
  minHeight?: number | string;
  id?: string;
  rootMargin?: string;
  className?: string;
}

export const DeferredSection: React.FC<DeferredSectionProps> = ({
  children,
  minHeight = 600,
  id,
  rootMargin = '200px 0px',
  className = '',
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          // Yield to main thread so mounting heavy downstream components never blocks user input
          if ('requestIdleCallback' in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void, opt?: { timeout: number }) => void }).requestIdleCallback(
              () => setShouldRender(true),
              { timeout: 600 }
            );
          } else {
            setTimeout(() => setShouldRender(true), 40);
          }
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={
        shouldRender
          ? undefined
          : { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }
      }
    >
      {shouldRender ? children : null}
    </div>
  );
};
